const APP_URL = 'https://giggles-bloom.vercel.app';
let gl = 'tr';
let feedData = null;

function ga(lang) {
  gl = lang;
  document.documentElement.setAttribute('lang', gl);

  const switcher = document.getElementById('ls');
  if (switcher) switcher.classList.toggle('en', gl === 'en');

  try {
    localStorage.setItem('gb_lang', gl);
  } catch (error) {}

  renderDynamicContent();
}

function gt() {
  ga(gl === 'tr' ?'en' : 'tr');
}

document.addEventListener('DOMContentLoaded', function() {
  preparePwaShell();
  ensureMobileNav();
  normalizeFooter();

  try {
    const savedLang = localStorage.getItem('gb_lang');
    if (savedLang === 'en') ga('en');
  } catch (error) {}

  updateYears();
  wireAccountButtons();
  revealOnScroll();
  wireMobileNav();

  if (
    document.getElementById('dynamic-feed') ||
    document.getElementById('play-availability') ||
    document.getElementById('menu-highlights')
  ) {
    loadDynamicFeed();
  }
});

function preparePwaShell() {
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = 'manifest.webmanifest';
    document.head.appendChild(manifest);
  }

  if (!document.querySelector('meta[name="theme-color"]')) {
    const theme = document.createElement('meta');
    theme.name = 'theme-color';
    theme.content = '#7a9e7e';
    document.head.appendChild(theme);
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').catch(function() {});
    });
  }
}

function updateYears() {
  document.querySelectorAll('#yr, [data-year]').forEach(function(el) {
    el.textContent = String(new Date().getFullYear());
  });
}

function wireAccountButtons() {
  document.querySelectorAll('.btn-login').forEach(function(el) {
    el.addEventListener('click', function() {
      window.open(APP_URL + '/auth/signin', '_blank', 'noopener');
    });
  });

  document.querySelectorAll('.btn-join').forEach(function(el) {
    el.addEventListener('click', function() {
      window.open(APP_URL + '/auth/signup', '_blank', 'noopener');
    });
  });

  document.querySelectorAll('[data-tier-cta]').forEach(function(el) {
    el.href = APP_URL + '/auth/signup';
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function revealOnScroll() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fi').forEach(function(el) { el.classList.add('visible'); });
    return;
  }

  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('.fi').forEach(function(el) {
    obs.observe(el);
  });
}

function ensureMobileNav() {
  const headerActions = document.querySelector('.header-actions');
  const nav = document.querySelector('.nav');
  if (!headerActions || !nav) return;

  let hamburger = document.getElementById('hamburger');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.id = 'hamburger';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    headerActions.appendChild(hamburger);
  }

  if (document.getElementById('mobileNav')) return;

  const drawer = document.createElement('div');
  drawer.className = 'mobile-nav';
  drawer.id = 'mobileNav';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML =
    '<div class="mobile-nav-inner" role="dialog" aria-modal="true" aria-label="Site menu">' +
      '<button class="mobile-nav-close" id="mobileNavClose" type="button" aria-label="Close menu">x</button>' +
      '<div class="mobile-nav-brand">Giggles &amp; Bloom</div>' +
      '<div class="nav-links">' + nav.innerHTML + '</div>' +
      '<div class="mobile-nav-actions">' +
        '<button class="btn-login" type="button"><span class="tr-only">Giriş Yap</span><span class="en-only">Sign In</span></button>' +
        '<button class="btn-join" type="button"><span class="tr-only">Üye Ol</span><span class="en-only">Join</span></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(drawer);
}

function wireMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navClose = document.getElementById('mobileNavClose');
  if (!hamburger || !mobileNav) return;

  function close() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
  }

  hamburger.addEventListener('click', function() {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
  });

  if (navClose) navClose.addEventListener('click', close);

  mobileNav.addEventListener('click', function(event) {
    if (event.target === mobileNav) close();
  });

  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') close();
  });
}

function normalizeFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML =
    '<div class="footer-inner">' +
      '<div>' +
        '<div class="footer-brand">Giggles &amp; Bloom</div>' +
        '<div class="footer-note"><span class="tr-only">Görünmez yükü hafifletmek için buradayız.</span><span class="en-only">We exist to lighten the invisible load.</span></div>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5><span class="tr-only">Keşfet</span><span class="en-only">Explore</span></h5>' +
        '<a href="workshops.html"><span class="tr-only">Atölyeler</span><span class="en-only">Workshops</span></a>' +
        '<a href="play.html"><span class="tr-only">Oyun</span><span class="en-only">Play</span></a>' +
        '<a href="food.html"><span class="tr-only">Kafe</span><span class="en-only">Cafe</span></a>' +
        '<a href="membership.html"><span class="tr-only">Üyelik</span><span class="en-only">Membership</span></a>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5><span class="tr-only">Hesap</span><span class="en-only">Account</span></h5>' +
        '<a href="' + APP_URL + '/auth/signup" target="_blank" rel="noopener"><span class="tr-only">Üye Ol</span><span class="en-only">Join</span></a>' +
        '<a href="' + APP_URL + '/auth/signin" target="_blank" rel="noopener"><span class="tr-only">Giriş Yap</span><span class="en-only">Sign In</span></a>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5><span class="tr-only">Yardim</span><span class="en-only">Help</span></h5>' +
        '<a href="contact.html"><span class="tr-only">Hakkımızda</span><span class="en-only">About</span></a>' +
        '<a href="privacy.html"><span class="tr-only">Veri &amp; Gizlilik</span><span class="en-only">Data &amp; Privacy</span></a>' +
        '<a href="contact.html"><span class="tr-only">İletişim</span><span class="en-only">Contact</span></a>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom"><div>&copy; <span data-year></span> Giggles &amp; Bloom &mdash; Kadıköy &amp; Kurtköy, Istanbul</div></div>';
  updateYears();
}

async function loadDynamicFeed() {
  const feed = document.getElementById('dynamic-feed');
  if (feed) {
    feed.innerHTML = '<div class="feed-loading"><div class="feed-spinner"></div><span>' + escapeHtml(gl === 'tr' ?'Yükleniyor...' : 'Loading...') + '</span></div>';
  }

  try {
    const res = await fetch(APP_URL + '/api/public/upcoming', {
      mode: 'cors',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('API ' + res.status);

    feedData = await res.json();
    renderDynamicContent();
  } catch (error) {
    feedData = null;
    renderDynamicFallback();
  }
}

function renderDynamicContent() {
  if (!feedData) {
    renderDynamicFallback();
    return;
  }

  const feed = document.getElementById('dynamic-feed');
  if (feed) renderFeed(feed, feedData);
  renderPlayAvailability(feedData.playAvailability || []);
  renderMenuHighlights(feedData.menuHighlights || []);
}

function renderFeed(container, data) {
  const isTr = gl === 'tr';
  const items = [];

  (data.events || []).slice(0, 3).forEach(function(event) {
    items.push({
      type: 'event',
      title: isTr ?event.name_tr : event.name_en,
      date: formatDate(event.starts_at),
      branch: branchLabel(event.branch_id),
    });
  });

  (data.workshops || []).slice(0, 3).forEach(function(workshop) {
    items.push({
      type: 'workshop',
      title: isTr ?workshop.name_tr : workshop.name_en,
      date: workshop.starts_at ?formatDate(workshop.starts_at) : (isTr ?'Takvim yakında' : 'Schedule coming soon'),
      branch: branchLabel(workshop.branch_id),
    });
  });

  if (!items.length) {
    container.innerHTML = '<div class="feed-empty">' + escapeHtml(isTr ?'Yakında yeni programlar yayınlanacak.' : 'New programmes will be published soon.') + '</div>';
    return;
  }

  container.innerHTML = items.map(renderFeedCard).join('');
}

function renderDynamicFallback() {
  const feed = document.getElementById('dynamic-feed');
  if (feed) {
    const isTr = gl === 'tr';
    const fallbackItems = [
      { type: 'workshop', title: isTr ?'STEM Keşif Serisi' : 'STEM Discovery Series', date: isTr ?'Takvim yakında' : 'Schedule coming soon', branch: 'Kadıköy' },
      { type: 'workshop', title: isTr ?'Ebeveyn Ustalık Sınıfı' : 'Parenting Masterclass', date: isTr ?'Sezonluk program' : 'Seasonal programme', branch: 'Kadıköy' },
      { type: 'event', title: isTr ?'Topluluk Buluşmaları' : 'Community Gatherings', date: isTr ?'Aylık' : 'Monthly', branch: 'Kurtköy' },
    ];
    feed.innerHTML = fallbackItems.map(renderFeedCard).join('');
  }

  renderPlayAvailability([]);
  renderMenuHighlights([]);
}

function renderFeedCard(item) {
  const tag = item.type === 'event'
    ?(gl === 'tr' ?'Etkinlik' : 'Event')
    : (gl === 'tr' ?'Atölye' : 'Workshop');
  const cls = item.type === 'event' ?'coral' : '';
  const href = item.type === 'event' ?'events.html' : 'workshops.html';

  return '<a class="feed-card" href="' + href + '" style="text-decoration:none;color:inherit">' +
    '<span class="fc-tag ' + cls + '">' + escapeHtml(tag) + '</span>' +
    '<h4>' + escapeHtml(item.title || '') + '</h4>' +
    '<div class="fc-meta">' + escapeHtml(item.date || '') + '</div>' +
    '<div class="fc-branch">' + escapeHtml(gl === 'tr' ?'Şube: ' : 'Location: ') + escapeHtml(item.branch || '') + '</div>' +
    '</a>';
}

function renderPlayAvailability(items) {
  const container = document.getElementById('play-availability');
  if (!container) return;

  const fallback = [
    { branch_id: 'kadikoy', status: 'available', remaining_today: null },
    { branch_id: 'kurtkoy', status: 'limited', remaining_today: null },
  ];
  const list = items.length ?items : fallback;

  container.innerHTML = list.map(function(item) {
    const label = branchLabel(item.branch_id) || (gl === 'tr' ?item.name_tr : item.name_en);
    const cls = item.status === 'full' ?'full' : item.status === 'limited' ?'limited' : 'available';
    return '<div class="availability-card ' + cls + '">' +
      '<div><strong>' + escapeHtml(label) + '</strong><span>' + escapeHtml(availabilityText(item.status, item.remaining_today)) + '</span></div>' +
      '<a class="btn btn-sm btn-secondary" href="contact.html">' + escapeHtml(gl === 'tr' ?'Giriş Talebi' : 'Request Entry') + '</a>' +
    '</div>';
  }).join('');
}

function availabilityText(status, remaining) {
  if (status === 'full') return gl === 'tr' ?'Bugün dolu' : 'Full today';
  if (status === 'limited') {
    if (Number.isFinite(remaining)) return gl === 'tr' ?'Sınırlı yer: ' + remaining : 'Limited: ' + remaining + ' spots';
    return gl === 'tr' ?'Sınırlı yer' : 'Limited availability';
  }
  if (status === 'enquire') return gl === 'tr' ?'Bilgi alın' : 'Enquire';
  if (Number.isFinite(remaining)) return gl === 'tr' ?'Müsait: ' + remaining : 'Available: ' + remaining + ' spots';
  return gl === 'tr' ?'Müsait' : 'Available';
}

function renderMenuHighlights(items) {
  const container = document.getElementById('menu-highlights');
  if (!container) return;

  if (!items.length) {
    container.innerHTML = '<p class="feed-empty">' + escapeHtml(gl === 'tr' ?'Menü yakında yayınlanacak.' : 'Menu highlights coming soon.') + '</p>';
    return;
  }

  container.innerHTML = items.slice(0, 6).map(function(item) {
    const name = gl === 'tr' ?item.name_tr : item.name_en;
    const desc = gl === 'tr' ?item.description_tr : item.description_en;
    return '<div class="menu-card">' +
      '<div class="mc-top"><strong>' + escapeHtml(name || '') + '</strong><span>' + escapeHtml(formatPrice(item.price)) + '</span></div>' +
      (desc ?'<p>' + escapeHtml(desc) + '</p>' : '') +
    '</div>';
  }).join('');
}

function branchLabel(branchId) {
  if (branchId === 'kadikoy') return 'Kadıköy';
  if (branchId === 'kurtkoy') return 'Kurtköy';
  return branchId || '';
}

function formatPrice(kurus) {
  const value = Number(kurus);
  if (!Number.isFinite(value)) return '';
  return '₺' + Math.round(value / 100).toLocaleString(gl === 'tr' ?'tr-TR' : 'en-GB');
}

function formatDate(iso) {
  if (!iso) return '';

  try {
    const date = new Date(iso);
    return date.toLocaleDateString(gl === 'tr' ?'tr-TR' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return iso;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
