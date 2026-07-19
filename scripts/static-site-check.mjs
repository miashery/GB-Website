import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
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
    /^\/menu\/[^/]+$/.test(pathname) ||
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
  const usesPublicRuntime = content.includes("assets/site.js");

  if (content.includes("https://giggles-bloom.vercel.app")) {
    errors.push(`${label}: uses the retired temporary webapp hostname.`);
  }

  if (/Fraunces|DM Sans/i.test(content)) {
    errors.push(`${label}: uses a retired public-site font.`);
  }

  if (/class=["'][^"']*\bsite-header\b/i.test(content)) {
    errors.push(`${label}: uses the retired runtime header class.`);
  }

  const classTokens = [...content.matchAll(/class=["']([^"']*)["']/gi)]
    .flatMap((match) => match[1].split(/\s+/).filter(Boolean));
  if (classTokens.some((token) => token === "pt" || token === "sub")) {
    errors.push(`${label}: uses retired page-title classes; use page-hero and page-intro.`);
  }

  if (/Ã.|Ä.|Å./u.test(content)) {
    errors.push(`${label}: contains likely mojibake; keep Turkish copy as UTF-8.`);
  }

  if (usesPublicRuntime) {
    for (const requiredShell of [
      'data-site-shell="header"',
      'data-site-shell="footer"',
      'href="assets/design-system.css"',
      'src="assets/redesign/logo-wordmark.png"',
      '<meta name="theme-color" content="#496394">',
    ]) {
      if (!content.includes(requiredShell)) errors.push(`${label}: canonical public shell is missing '${requiredShell}'.`);
    }

    const headerStarts = [...content.matchAll(/GB-SHELL:HEADER:START/g)].length;
    const footerStarts = [...content.matchAll(/GB-SHELL:FOOTER:START/g)].length;
    if (headerStarts !== 1) errors.push(`${label}: expected one canonical header marker, found ${headerStarts}.`);
    if (footerStarts !== 1) errors.push(`${label}: expected one canonical footer marker, found ${footerStarts}.`);

    const activeLinks = [...content.matchAll(/aria-current=["']page["']/g)].length;
    if (activeLinks > 3) errors.push(`${label}: has ${activeLinks} active navigation links; expected at most desktop + mobile section + branch.`);
  }

  if (content.includes('/_vercel/insights/script.js')) {
    errors.push(`${label}: loads analytics directly instead of waiting for optional consent.`);
  }

  if (/\son[a-z]+\s*=/i.test(content)) {
    errors.push(`${label}: contains an inline event handler that the strict CSP will block.`);
  }

  for (const script of content.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attributes = script[1] || "";
    const body = script[2] || "";
    if (/\bsrc\s*=/i.test(attributes)) continue;
    if (/\btype=["']application\/ld\+json["']/i.test(attributes)) continue;
    if (body.trim()) errors.push(`${label}: contains executable inline JavaScript; move it to assets/site.js.`);
  }

  for (const [iframe] of content.matchAll(/<iframe\b[^>]*>/gi)) {
    if (!iframe.includes("google.com/maps/embed")) continue;
    if (!/\bdata-external-service=["']google-maps["']/i.test(iframe)) {
      errors.push(`${label}: Google Maps iframe is missing the external-service consent marker.`);
    }
    if (!/\bdata-src=["']https:\/\/www\.google\.com\/maps\/embed/i.test(iframe)) {
      errors.push(`${label}: Google Maps iframe must keep its URL in data-src until consent.`);
    }
    if (/(?:^|\s)src\s*=/i.test(iframe)) {
      errors.push(`${label}: Google Maps iframe loads before external-content consent.`);
    }
  }

  if (content.includes("&scaron;")) {
    errors.push(`${label}: contains the non-Turkish š entity; use ş instead.`);
  }

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
const staticHeaderEntry = (vercel.headers || []).find((entry) => entry.source.includes("(?!journal/"));
const globalHeaders = new Map((staticHeaderEntry?.headers || [])
  .map((header) => [header.key, header.value]));
for (const header of [
  "Strict-Transport-Security",
  "Referrer-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Permissions-Policy",
]) {
  if (!globalHeaders.has(header)) errors.push(`vercel.json: missing public security header '${header}'.`);
}

const csp = globalHeaders.get("Content-Security-Policy") || "";
for (const directive of ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "script-src-attr 'none'"]) {
  if (!csp.includes(directive)) errors.push(`vercel.json: static CSP is missing '${directive}'.`);
}
if (/script-src[^;]*'unsafe-inline'/.test(csp)) {
  errors.push("vercel.json: static script-src must not allow unsafe-inline.");
}

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  const label = relative(root, file).replaceAll("\\", "/");
  for (const match of content.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const hash = `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`;
    if (!csp.includes(hash)) errors.push(`${label}: JSON-LD hash ${hash} is missing from the static CSP.`);
  }
}

const rewriteSources = new Set((vercel.rewrites || []).map((item) => item.source));
for (const source of [
  "/journal-sitemap.xml",
  "/journal/:slug",
  "/workshops/:id",
  "/workshops/:id/companion",
  "/menu/:branch",
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
  "./assets/tokens.css",
  "./assets/design-system.css",
  "./assets/site.js",
  "./assets/favicon.svg",
  "./assets/redesign/logo-wordmark.png",
]) {
  if (!serviceWorker.includes(`'${coreAsset}'`)) errors.push(`sw.js: core cache is missing '${coreAsset}'.`);
  const localPath = join(root, coreAsset.slice(2));
  if (!existsSync(localPath)) errors.push(`sw.js: cached asset '${coreAsset}' does not exist.`);
}

if (!/const CACHE_NAME = 'gb-public-v\d+';/.test(serviceWorker)) {
  warnings.push("sw.js: cache name does not use the expected versioned gb-public-vN format.");
}

const siteScript = readFileSync(join(root, "assets", "site.js"), "utf8");
if (/Fraunces|DM Sans/i.test(siteScript)) errors.push("assets/site.js: uses a retired public-site font.");
if (/Ã.|Ä.|Å./u.test(siteScript)) errors.push("assets/site.js: contains likely mojibake; keep Turkish copy as UTF-8.");
for (const retiredShellFunction of [
  "normalizeHeaderNav",
  "applyRedesignBranding",
  "ensureMobileNav",
  "normalizeFooter",
]) {
  if (siteScript.includes(retiredShellFunction)) {
    errors.push(`assets/site.js: retired runtime shell function '${retiredShellFunction}' must not return.`);
  }
}

const publicCss = readFileSync(join(root, "assets", "site.css"), "utf8");
if (/Fraunces|DM Sans/i.test(publicCss)) errors.push("assets/site.css: uses a retired public-site font.");

const designSystemCss = readFileSync(join(root, "assets", "design-system.css"), "utf8");
if (/#[0-9a-f]{3,8}\b/i.test(designSystemCss)) {
  errors.push("assets/design-system.css: raw hex colour found; add it to assets/tokens.css first.");
}
for (const privacyContract of [
  "gb_privacy_preferences",
  "initPrivacyControls",
  "loadOptionalAnalytics",
  "prepareExternalContent",
]) {
  if (!siteScript.includes(privacyContract)) {
    errors.push(`assets/site.js: privacy control contract is missing '${privacyContract}'.`);
  }
}

const privacyNotice = readFileSync(join(root, "privacy.html"), "utf8");
for (const noticeTopic of ["Vercel", "Google Maps", "Supabase", "Resend", "KVKK", "GDPR"]) {
  if (!privacyNotice.includes(noticeTopic)) {
    errors.push(`privacy.html: notice is missing the '${noticeTopic}' disclosure.`);
  }
}

const securityContactPath = join(root, ".well-known", "security.txt");
if (!existsSync(securityContactPath)) {
  errors.push(".well-known/security.txt is missing.");
} else {
  const securityContact = readFileSync(securityContactPath, "utf8");
  for (const marker of [
    "Contact: mailto:info@ggbloom.org",
    "Canonical: https://www.gigglesbloom.com/.well-known/security.txt",
    "Policy: https://www.gigglesbloom.com/privacy.html",
  ]) {
    if (!securityContact.includes(marker)) errors.push(`security.txt: missing '${marker}'.`);
  }
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
