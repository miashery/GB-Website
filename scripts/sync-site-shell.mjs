import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const appUrl = 'https://webapp.gigglesbloom.com';
const pageThemes = {
  'play.html': 'page-themed page-play',
  'workshops.html': 'page-themed page-bloomlab',
  'social-lab.html': 'page-themed page-community',
  'social-lab-community-wellbeing.html': 'page-themed page-community',
  'wellbeing.html': 'page-themed page-support',
  'privacy.html': 'page-themed page-neutral',
  'journal.html': 'page-themed page-journal',
  'events.html': 'page-themed page-events',
  'workspaces.html': 'page-themed page-work',
  'library.html': 'page-themed page-books',
  'food.html': 'page-themed page-cafe',
  'membership.html': 'page-themed page-membership',
  'contact.html': 'page-themed page-visit',
  'kadikoy.html': 'page-themed page-kadikoy',
  'kurtkoy.html': 'page-themed page-kurtkoy',
};

const primaryNav = [
  { href: 'play.html', tr: 'Oyun', en: 'Play' },
  { href: 'workshops.html', tr: 'BloomLab', en: 'BloomLab' },
  { href: 'social-lab.html', tr: 'Topluluk', en: 'Community', also: ['social-lab-community-wellbeing.html', 'wellbeing.html'] },
  { href: 'journal.html', tr: 'Journal', en: 'Journal' },
  { href: 'food.html', tr: 'Kafe & Kitap', en: 'Cafe & Books', also: ['library.html'] },
  { href: 'membership.html', tr: 'Üyelik', en: 'Membership' },
  { href: 'contact.html', tr: 'Ziyaret', en: 'Visit', also: ['kadikoy.html', 'kurtkoy.html', 'privacy.html'] },
];

const drawerNav = [
  ...primaryNav.slice(0, 4),
  { href: 'events.html', tr: 'Etkinlikler', en: 'Events' },
  { href: 'workspaces.html', tr: 'Çalışma Alanı', en: 'Workspaces' },
  { href: 'library.html', tr: 'Kitaplar', en: 'Books' },
  { href: 'food.html', tr: 'Kafe', en: 'Cafe' },
  ...primaryNav.slice(5),
  { href: 'kadikoy.html', tr: 'Kadıköy', en: 'Kadıköy' },
  { href: 'kurtkoy.html', tr: 'Kurtköy', en: 'Kurtköy' },
];

function label(item) {
  if (item.tr === item.en) return item.en;
  return `<span class="tr-only">${item.tr}</span><span class="en-only">${item.en}</span>`;
}

function isActive(item, page) {
  return item.href === page || item.also?.includes(page);
}

function links(items, page) {
  return items.map((item) => {
    const active = isActive(item, page);
    return `<a href="${item.href}"${active ? ' class="active" aria-current="page"' : ''}>${label(item)}</a>`;
  }).join('\n        ');
}

function header(page) {
  return `<!-- GB-SHELL:HEADER:START -->
<header class="header" data-site-shell="header">
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="Giggles & Bloom home">
      <img class="brand-logo" src="assets/redesign/logo-wordmark.png" alt="Giggles & Bloom">
      <span class="brand-location">Kadıköy &amp; Kurtköy<br>İstanbul</span>
    </a>
    <nav class="nav" aria-label="Primary navigation">
        ${links(primaryNav, page)}
    </nav>
    <div class="header-actions">
      <a class="btn-login" href="${appUrl}/auth/signin"><span class="tr-only">Giriş</span><span class="en-only">Sign in</span></a>
      <a class="btn-join" href="${appUrl}/auth/signup"><span class="tr-only">Katıl</span><span class="en-only">Join</span></a>
      <button class="lang-sw" id="ls" type="button" onclick="gt()" aria-label="Türkçe ve İngilizce arasında geçiş yap"><span class="ll t">TR</span><span class="ll e">EN</span><span class="lk" aria-hidden="true"></span></button>
      <button class="hamburger" id="hamburger" type="button" aria-label="Menüyü aç" aria-controls="mobileNav" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="gb-announcement" role="status">
  <span class="announcement-dot" aria-hidden="true"></span>
  <span class="tr-only">Kurtköy açık: çocuk kitapçısı, aile kafesi ve kitaplardan doğan küçük deneyimler.</span>
  <span class="en-only">Kurtköy is open: children’s bookshop, family cafe and small experiences born from books.</span>
</div>
<div class="mobile-nav" id="mobileNav" aria-hidden="true">
  <div class="mobile-nav-inner" role="dialog" aria-modal="true" aria-label="Site menu">
    <div class="mobile-nav-head">
      <img src="assets/redesign/logo-wordmark.png" alt="Giggles & Bloom">
      <button class="mobile-nav-close" id="mobileNavClose" type="button" aria-label="Menüyü kapat">×</button>
    </div>
    <nav class="nav-links" aria-label="Mobile navigation">
        ${links(drawerNav, page)}
    </nav>
    <div class="mobile-nav-actions">
      <a class="btn-login" href="${appUrl}/auth/signin"><span class="tr-only">Giriş</span><span class="en-only">Sign in</span></a>
      <a class="btn-join" href="${appUrl}/auth/signup"><span class="tr-only">Katıl</span><span class="en-only">Join</span></a>
    </div>
  </div>
</div>
<!-- GB-SHELL:HEADER:END -->`;
}

const footer = `<!-- GB-SHELL:FOOTER:START -->
<footer data-site-shell="footer">
  <div class="footer-inner">
    <div class="footer-intro">
      <img src="assets/redesign/logo-wordmark.png" alt="Giggles & Bloom">
      <p><span class="tr-only">Görünmez yükü hafifletmek için varız. Aileler için sıcak, güven öncelikli bir üçüncü alan.</span><span class="en-only">We exist to lighten the invisible load. A warm, trust-first third space for families.</span></p>
      <a class="footer-phone" href="tel:+905533456567">(+90) 0 553 345 65 67</a>
    </div>
    <div class="footer-col">
      <h2><span class="tr-only">Keşfet</span><span class="en-only">Explore</span></h2>
      <a href="play.html"><span class="tr-only">Oyun</span><span class="en-only">Play</span></a>
      <a href="workshops.html">BloomLab</a>
      <a href="social-lab.html"><span class="tr-only">Topluluk &amp; Destek</span><span class="en-only">Community &amp; Support</span></a>
      <a href="events.html"><span class="tr-only">Etkinlikler</span><span class="en-only">Events</span></a>
      <a href="journal.html">Journal</a>
    </div>
    <div class="footer-col">
      <h2><span class="tr-only">G&B Dünyası</span><span class="en-only">G&B worlds</span></h2>
      <a href="library.html"><span class="tr-only">Kitaplar</span><span class="en-only">Books</span></a>
      <a href="food.html"><span class="tr-only">Kafe</span><span class="en-only">Cafe</span></a>
      <a href="workspaces.html"><span class="tr-only">Çalışma Alanları</span><span class="en-only">Workspaces</span></a>
      <a href="membership.html"><span class="tr-only">Üyelik</span><span class="en-only">Membership</span></a>
      <a href="contact.html"><span class="tr-only">Ziyaret</span><span class="en-only">Visit</span></a>
    </div>
    <div class="footer-col footer-branches">
      <h2><span class="tr-only">Şubeler</span><span class="en-only">Branches</span></h2>
      <a href="kadikoy.html">Kadıköy</a>
      <a href="kurtkoy.html">Kurtköy</a>
      <a href="https://www.instagram.com/gigglesandbloom/" target="_blank" rel="noopener">@gigglesandbloom</a>
      <a href="contact.html"><span class="tr-only">Haritalar &amp; iletişim</span><span class="en-only">Maps &amp; contact</span></a>
    </div>
    <div class="footer-col">
      <h2><span class="tr-only">Hesap &amp; Gizlilik</span><span class="en-only">Account &amp; privacy</span></h2>
      <a href="${appUrl}/auth/signup"><span class="tr-only">Katıl</span><span class="en-only">Join</span></a>
      <a href="${appUrl}/auth/signin"><span class="tr-only">Giriş</span><span class="en-only">Sign in</span></a>
      <a href="privacy.html"><span class="tr-only">Veri &amp; Gizlilik</span><span class="en-only">Data &amp; Privacy</span></a>
      <button class="footer-privacy-button" type="button" onclick="gbOpenPrivacyPreferences()"><span class="tr-only">Gizlilik tercihleri</span><span class="en-only">Privacy choices</span></button>
    </div>
  </div>
  <div class="footer-bottom">© <span data-year></span> Giggles &amp; Bloom — Kadıköy &amp; Kurtköy, İstanbul</div>
</footer>
<!-- GB-SHELL:FOOTER:END -->`;

const pages = readdirSync(root)
  .filter((name) => extname(name) === '.html')
  .filter((name) => !name.startsWith('google'))
  .filter((name) => readFileSync(join(root, name), 'utf8').includes('assets/site.js'));

for (const page of pages) {
  const path = join(root, page);
  const currentHtml = readFileSync(path, 'utf8');
  let html = currentHtml;
  const shellPattern = /(?:<!-- GB-SHELL:HEADER:START -->\s*)*<header\b[\s\S]*?<main\b/i;
  if (!shellPattern.test(html)) throw new Error(`${page}: header/main shell boundary not found`);
  html = html.replace(shellPattern, `${header(page)}\n<main`);
  const footerPattern = /(?:<!-- GB-SHELL:FOOTER:START -->\s*)?<footer\b[\s\S]*?<\/footer>(?:\s*<!-- GB-SHELL:FOOTER:END -->)?/i;
  if (!footerPattern.test(html)) throw new Error(`${page}: footer not found`);
  html = html.replace(footerPattern, footer);
  html = html.replace(/<meta\s+name=["']theme-color["']\s+content=["'][^"']+["']\s*\/?>/gi, '<meta name="theme-color" content="#496394">');
  if (!html.includes('assets/design-system.css')) {
    html = html.replace(/(<link\s+rel=["']stylesheet["']\s+href=["']assets\/site\.css["']\s*\/?>)/i, '$1\n<link rel="stylesheet" href="assets/design-system.css">');
  }
  const requestedTheme = pageThemes[page] || (page === 'index.html' ? 'home-design-v3' : 'page-themed page-neutral');
  html = html.replace(/<body(?:\s+class=["'][^"']*["'])?\s*>/i, `<body class="${requestedTheme}">`);
  if (html !== currentHtml) writeFileSync(path, html, 'utf8');
}

console.log(`Synchronized the canonical public shell across ${pages.length} pages.`);
