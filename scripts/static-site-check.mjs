import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(path);
    return [path];
  });
}

function cleanReference(value) {
  return value.trim().split("#")[0].split("?")[0];
}

function isExternalOrRuntime(value) {
  return (
    !value ||
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("data:") ||
    value.startsWith("javascript:") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.includes("${") ||
    value.includes("{{")
  );
}

function isRewriteBacked(pathname) {
  return (
    /^\/journal\/[^/]+$/.test(pathname) ||
    /^\/workshops\/[^/]+(?:\/companion)?$/.test(pathname) ||
    pathname.startsWith("/api/public/workshop-companion/") ||
    pathname === "/_vercel/insights/script.js" ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/brand/") ||
    pathname === "/favicon.svg" ||
    pathname === "/icon.svg" ||
    pathname === "/journal-sitemap.xml"
  );
}

function resolveLocalReference(sourceFile, rawReference) {
  const reference = cleanReference(rawReference);
  if (!reference || isExternalOrRuntime(reference)) return null;
  if (reference.startsWith("/")) {
    if (reference === "/") return join(root, "index.html");
    if (isRewriteBacked(reference)) return null;
    return join(root, reference.slice(1));
  }
  return resolve(dirname(sourceFile), reference);
}

const htmlFiles = [
  ...readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name) === ".html")
    .map((entry) => join(root, entry.name)),
  ...filesUnder(join(root, "corporate")).filter((path) => extname(path) === ".html"),
];

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  const label = relative(root, file).replaceAll("\\", "/");

  const isVerificationFile = /^google[a-z0-9]+\.html$/i.test(label);
  if (!isVerificationFile) {
    for (const required of [/<html[^>]+lang=/i, /<meta[^>]+name=["']viewport["']/i, /<title>[^<]+<\/title>/i]) {
      if (!required.test(content)) errors.push(`${label}: missing required document metadata (${required}).`);
    }
  }

  const references = [...content.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const reference of references) {
    const target = resolveLocalReference(file, reference);
    if (target && !existsSync(normalize(target))) {
      errors.push(`${label}: missing local target '${reference}'.`);
    }
  }
}

const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
const rewriteSources = new Set((vercel.rewrites || []).map((item) => item.source));
for (const source of [
  "/journal-sitemap.xml",
  "/journal/:slug",
  "/workshops/:id",
  "/workshops/:id/companion",
  "/api/public/workshop-companion/:path*",
  "/_next/:path*",
  "/brand/:path*",
  "/favicon.svg",
  "/icon.svg",
]) {
  if (!rewriteSources.has(source)) errors.push(`vercel.json: missing required rewrite '${source}'.`);
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const [, rawUrl] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(rawUrl);
  if (url.hostname !== "www.gigglesbloom.com") {
    errors.push(`sitemap.xml: unexpected host '${url.hostname}'.`);
    continue;
  }
  const pathname = decodeURIComponent(url.pathname);
  if (pathname === "/" || isRewriteBacked(pathname)) continue;
  const target = join(root, pathname.slice(1));
  if (!existsSync(target)) errors.push(`sitemap.xml: '${pathname}' has no static file or approved rewrite.`);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
for (const sitemapUrl of [
  "https://www.gigglesbloom.com/sitemap.xml",
  "https://www.gigglesbloom.com/journal-sitemap.xml",
]) {
  if (!robots.includes(sitemapUrl)) errors.push(`robots.txt: missing '${sitemapUrl}'.`);
}

const serviceWorker = readFileSync(join(root, "sw.js"), "utf8");
for (const coreAsset of [
  "./index.html",
  "./journal.html",
  "./workshops.html",
  "./assets/site.css",
  "./assets/site.js",
  "./assets/favicon.svg",
]) {
  if (!serviceWorker.includes(`'${coreAsset}'`)) errors.push(`sw.js: core cache is missing '${coreAsset}'.`);
  const localPath = join(root, coreAsset.slice(2));
  if (!existsSync(localPath)) errors.push(`sw.js: cached asset '${coreAsset}' does not exist.`);
}

if (!/const CACHE_NAME = 'gb-public-v\d+';/.test(serviceWorker)) {
  warnings.push("sw.js: cache name does not use the expected versioned gb-public-vN format.");
}

for (const warning of warnings) console.warn(`WARNING: ${warning}`);
if (errors.length) {
  console.error(`Static site check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Static site check passed (${htmlFiles.length} HTML files, local assets, sitemap, robots, service worker, and dynamic rewrites verified).`,
);
