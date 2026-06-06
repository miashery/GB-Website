const APP_URL = window.GB_APP_URL || 'https://giggles-bloom.vercel.app';
const CONTACT_LINKS = {
  instagramMain: 'https://www.instagram.com/gigglesandbloom/',
  instagramKadikoy: 'https://www.instagram.com/gigglesandbloom.kadikoy/',
  instagramKurtkoy: 'https://www.instagram.com/gigglesandbloom.kurtkoy/',
  mapKadikoy: 'https://maps.app.goo.gl/wf5DHk16UqNkESe5A',
  mapKurtkoy: 'https://maps.app.goo.gl/iQE29KZyHXt4ZJNN6',
};
const MINI_ICONS = {
  pin: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/></svg>',
  map: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z"/><path d="M9 4v14M15 6v14"/></svg>',
  instagram: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3"/><circle cx="16.5" cy="7.5" r=".8"/></svg>',
};
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
  enhancePublicCardIcons();

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

  if (document.querySelector('[data-experience-rate]')) {
    loadExperienceRates();
  }

  if (document.getElementById('membership-grid')) {
    loadMembershipPackages();
  }

  wireEventRequestForms();
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
    theme.content = '#2D6F8A';
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

  document.querySelectorAll('[data-app-path]').forEach(function(el) {
    const path = el.getAttribute('data-app-path') || '/';
    el.href = APP_URL + path;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function wireEventRequestForms() {
  document.querySelectorAll('[data-event-request-form]').forEach(function(form) {
    const status = form.querySelector('[data-event-request-status]');
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      if (status) {
        status.textContent = gl === 'tr' ? 'Gönderiliyor...' : 'Sending...';
        status.className = 'form-status';
      }

      const data = new FormData(form);
      const payload = {
        source: 'public_site',
        locale: gl,
        branch_id: data.get('branch_id'),
        event_type: data.get('event_type'),
        requester_name: data.get('requester_name'),
        requester_phone: data.get('requester_phone'),
        requester_email: data.get('requester_email'),
        child_name: data.get('child_name'),
        child_age: data.get('child_age'),
        age_range: data.get('age_range'),
        expected_children_count: Number(data.get('expected_children_count') || 0),
        expected_adults_count: Number(data.get('expected_adults_count') || 0),
        preferred_date: data.get('preferred_date'),
        preferred_time_window: data.get('preferred_time_window'),
        food_cafe_needs: data.get('food_cafe_needs'),
        cake_notes: data.get('cake_notes'),
        play_area_needed: data.get('play_area_needed') === 'on',
        guided_activity_needed: data.get('guided_activity_needed') === 'on',
        workspace_needed: data.get('workspace_needed') === 'on',
        budget_range: data.get('budget_range'),
        notes: data.get('notes'),
        kvkk_contact_consent: data.get('kvkk_contact_consent') === 'on',
        company_website: data.get('company_website') || '',
      };

      try {
        const response = await fetch(APP_URL + '/api/public/event-requests', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = await response.json().catch(function() { return {}; });
        if (!response.ok) throw new Error(body.error || 'Request failed');
        form.reset();
        if (status) {
          status.textContent = gl === 'tr'
            ? 'Talebiniz alındı. Ekibimiz sizinle iletişime geçecek.'
            : 'Request received. Our team will contact you.';
          status.className = 'form-status success';
        }
      } catch (error) {
        if (status) {
          status.textContent = gl === 'tr'
            ? 'Talep gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.'
            : 'Could not send the request. Please check the details and try again.';
          status.className = 'form-status error';
        }
      }
    });
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

function enhancePublicCardIcons() {
  const headings = document.querySelectorAll([
    '.clean-card-grid .card h4',
    '.g.g4 > .card h4',
  ].join(','));

  headings.forEach(function(heading, index) {
    if (heading.dataset.gbIconReady === '1') return;

    stripLeadingClipart(heading);

    const icon = document.createElement('span');
    icon.className = 'gb-card-icon gb-card-icon-' + ((index % 6) + 1);
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c.9 2.8 2.7 4.6 5.5 5.5-2.8.9-4.6 2.7-5.5 5.5-.9-2.8-2.7-4.6-5.5-5.5 2.8-.9 4.6-2.7 5.5-5.5Z"/><path d="M5.5 14.5c.45 1.35 1.3 2.2 2.6 2.65-1.3.45-2.15 1.3-2.6 2.65-.45-1.35-1.3-2.2-2.6-2.65 1.3-.45 2.15-1.3 2.6-2.65Z"/><path d="M18.5 15c.35 1.05 1 1.7 2 2-.95.35-1.6 1-2 2-.35-1-1-1.65-2-2 1-.3 1.65-.95 2-2Z"/></svg>';
    heading.insertBefore(icon, heading.firstChild);
    heading.dataset.gbIconReady = '1';
  });
}

function stripLeadingClipart(heading) {
  const first = heading.firstChild;
  if (!first || first.nodeType !== Node.TEXT_NODE) return;

  const cleaned = first.nodeValue.replace(/^[\s\u00a0]*(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|\uFE0F)+\s*/u, '');
  if (cleaned.trim()) {
    first.nodeValue = cleaned;
  } else {
    first.remove();
  }
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
        '<h5><span class="tr-only">Yardım</span><span class="en-only">Help</span></h5>' +
        '<a href="contact.html"><span class="tr-only">Hakkımızda</span><span class="en-only">About</span></a>' +
        '<a href="privacy.html"><span class="tr-only">Veri &amp; Gizlilik</span><span class="en-only">Data &amp; Privacy</span></a>' +
        '<a href="contact.html"><span class="tr-only">İletişim</span><span class="en-only">Contact</span></a>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5><span class="tr-only">Şubeler</span><span class="en-only">Branches</span></h5>' +
        '<div class="footer-branches">' +
          footerBranchRow('Kadıköy', CONTACT_LINKS.mapKadikoy, CONTACT_LINKS.instagramKadikoy) +
          footerBranchRow('Kurtköy', CONTACT_LINKS.mapKurtkoy, CONTACT_LINKS.instagramKurtkoy) +
          '<a class="footer-main-social" href="' + CONTACT_LINKS.instagramMain + '" target="_blank" rel="noopener">' + MINI_ICONS.instagram + '<span>@gigglesandbloom</span></a>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom"><div>&copy; <span data-year></span> Giggles &amp; Bloom &mdash; Kadıköy &amp; Kurtköy, İstanbul</div></div>';
  updateYears();
}

function footerBranchRow(label, mapUrl, instagramUrl) {
  return '<div class="footer-branch-row">' +
    '<span class="footer-branch-label">' + MINI_ICONS.pin + '<span>' + escapeHtml(label) + '</span></span>' +
    '<span class="footer-branch-actions">' +
      '<a href="' + mapUrl + '" target="_blank" rel="noopener" aria-label="' + escapeHtml(label) + ' Google Maps">' + MINI_ICONS.map + '<span>Map</span></a>' +
      '<a href="' + instagramUrl + '" target="_blank" rel="noopener" aria-label="' + escapeHtml(label) + ' Instagram">' + MINI_ICONS.instagram + '<span>IG</span></a>' +
    '</span>' +
  '</div>';
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

async function loadExperienceRates() {
  try {
    const res = await fetch(APP_URL + '/api/public/experience-offerings', {
      mode: 'cors',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    renderExperienceRates(data.offerings || []);
  } catch (error) {
    renderExperienceRates([]);
  }
}

function renderExperienceRates(offerings) {
  const byKey = {};
  offerings.forEach(function(item) {
    byKey[item.branch_id + ':' + item.offering_key] = item;
  });

  document.querySelectorAll('[data-experience-rate]').forEach(function(el) {
    const key = el.getAttribute('data-experience-rate') || '';
    const locale = el.getAttribute('data-rate-locale') || gl;
    const offering = byKey[key];
    if (!offering) return;
    el.textContent = experienceRateText(offering, locale);
  });
}

function experienceRateText(offering, locale) {
  const isTr = locale === 'tr';
  const price = Number(offering.price_kurus);
  const priceText = Number.isFinite(price) && price > 0
    ? (isTr ? '₺' : 'TRY ') + Math.round(price / 100).toLocaleString(isTr ? 'tr-TR' : 'en-GB')
    : '';

  if (offering.mode === 'paid' && priceText) {
    if (offering.offering_key === 'open_play') {
      return isTr ? priceText + ' aynı gün açık oyun erişimi' : priceText + ' same-day open play access';
    }
    if (offering.offering_key === 'play_workshop') {
      return isTr ? 'Atölye fiyatı: ' + priceText : 'Workshop price: ' + priceText;
    }
    if (offering.offering_key === 'workspace') {
      return isTr ? 'Çalışma alanı fiyatı: ' + priceText : 'Workspace price: ' + priceText;
    }
    return isTr ? 'Fiyat: ' + priceText : 'Price: ' + priceText;
  }

  if (offering.mode === 'complimentary_with_purchase') {
    return isTr ? 'Kapasiteye bağlı olarak alışverişle ücretsiz' : 'Complimentary with purchase, subject to capacity';
  }
  if (offering.mode === 'complimentary') {
    return isTr ? 'Ücretsiz, kapasiteye bağlı' : 'Complimentary, subject to capacity';
  }
  return isTr ? 'Fiyat/talep bilgisi için ekiple görüşün' : 'Ask the team for price/request details';
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
  renderBranches(feedData.playAvailability || []);
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

async function loadMembershipPackages() {
  try {
    const res = await fetch(APP_URL + '/api/public/memberships', {
      mode: 'cors',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    renderMembershipGrid(data.tiers || []);
  } catch (error) {
    renderMembershipFallback();
  }
}

const GB_TIER_ICONS = {
  leaf: '<span class="gb-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20c-3.5-1.2-6-4.5-6-8.3C5 6.4 9.3 3 19 3c0 9.7-3.4 14-8.7 14H8"/><path d="M7 17c2.5-3.6 5.4-6.1 9-8"/></svg></span>',
  sun: '<span class="gb-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg></span>',
  rocket: '<span class="gb-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.1.9-1.7 2.5-1.5 4 1.5.2 3.1-.4 4-1.5"/><path d="M14 4.5c2.3-.8 4.3-.7 5.5-.2.5 1.2.6 3.2-.2 5.5-1 2.9-3.2 5.9-6.5 8.2l-6.8-6.8c2.3-3.3 5.3-5.5 8-6.7Z"/><path d="M15 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"/><path d="M7.5 13.5 5 14l-1.5-1.5 3-2.2M10.5 16.5 10 19l1.5 1.5 2.2-3"/></svg></span>',
  laptop: '<span class="gb-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2.5 19h19"/><path d="M8 19h8"/></svg></span>',
  crown: '<span class="gb-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z"/><path d="M6 19h12"/></svg></span>',
};

function membershipIconKey(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return '';
  if (normalized === 'leaf' || normalized === '\u{1F33F}' || normalized.includes('flex')) return 'leaf';
  if (normalized === 'sun' || normalized === '\u2600\ufe0f' || normalized === '\u2600' || normalized.includes('weekend')) return 'sun';
  if (normalized === 'rocket' || normalized === '\u{1F680}' || normalized.includes('explorer')) return 'rocket';
  if (normalized === 'laptop' || normalized === '\u{1F4BB}' || normalized.includes('remote')) return 'laptop';
  if (normalized === 'crown' || normalized === '\u{1F451}' || normalized.includes('all-access')) return 'crown';
  return '';
}

function tierIconHtml(value) {
  const key = membershipIconKey(value);
  return key ? '<div class="tier-icon">' + GB_TIER_ICONS[key] + '</div>' : '';
}

function renderMembershipGrid(tiers) {
  const container = document.getElementById('membership-grid');
  if (!container) return;

  if (!tiers.length) {
    renderMembershipFallback();
    return;
  }

  const isTr = gl === 'tr';
  container.innerHTML = tiers.map(function(tier) {
    const name = isTr ? tier.name_tr : tier.name_en;
    const desc = isTr ? tier.description_tr : tier.description_en;
    const features = (isTr ? tier.features_tr : tier.features_en) || [];
    const badge = isTr ? tier.badge_tr : tier.badge_en;
    const cta = isTr ? tier.cta_tr : tier.cta_en;
    const price = Math.round(tier.price_monthly / 100).toLocaleString(isTr ? 'tr-TR' : 'en-GB');
    const isFeatured = tier.is_featured;
    const isPremium = tier.color === 'gold';

    return '<div class="tier-card' + (isFeatured ? ' featured' : '') + (isPremium && !isFeatured ? ' premium' : '') + '">' +
      (badge ? '<div class="tier-badge">' + escapeHtml(badge) + '</div>' : '') +
      tierIconHtml(tier.icon || tier.name_en || tier.name_tr) +
      '<div class="tier-name">' + escapeHtml(name || '') + '</div>' +
      '<div class="tier-price">&#8378;' + price + '<span> / ' + (isTr ? 'ay' : 'mo') + '</span></div>' +
      (desc ? '<p>' + escapeHtml(desc) + '</p>' : '') +
      (features.length
        ? '<ul class="tier-features">' + features.map(function(f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('') + '</ul>'
        : '') +
      '<a class="btn ' + (isPremium ? 'btn-gold' : 'btn-p') + '" data-tier-cta href="' + APP_URL + '/auth/signup">' +
        escapeHtml(cta || (isTr ? 'Başla' : 'Get started')) +
      '</a>' +
    '</div>';
  }).join('');

  // Re-wire CTA links since they were just rendered
  container.querySelectorAll('[data-tier-cta]').forEach(function(el) {
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function renderMembershipFallback() {
  const container = document.getElementById('membership-grid');
  if (!container) return;
  const isTr = gl === 'tr';

  const fallbackTiers = [
    { name: isTr ? 'Esnek Aile Paketi' : 'Flex Family', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Üye erişimi ve dönemsel avantajlar', 'Esnek rezervasyon ritmi', 'Haklar aylık sıfırlanır'] : ['Member access and seasonal advantages', 'Flexible booking rhythm', 'Benefits reset monthly'], icon: 'leaf', cta: isTr ? 'Flex ile Başla' : 'Start with Flex', featured: false, premium: false },
    { name: isTr ? 'Hafta Sonu Aile' : 'Weekend Family', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Hafta sonu aile ritmi', 'Uygunluk oldukça öncelikli rezervasyon', 'Kapasite ve şube kuralları geçerli'] : ['Weekend family rhythm', 'Priority booking where available', 'Capacity and branch rules apply'], icon: 'sun', cta: isTr ? 'Hafta Sonu' : 'Weekend', featured: false, premium: false },
    { name: 'Workshop Explorer', price: isTr ? 'Canlı detay' : 'Live details', badge: isTr ? 'En Popüler' : 'Most Popular', features: isTr ? ['Atölye odaklı aylık kullanım', 'Uzman ve gelişim programlarına erişim', 'Haklar devretmez'] : ['Workshop-focused monthly use', 'Access to expert and growth programmes', 'Benefits do not roll over'], icon: 'rocket', cta: isTr ? 'Explorer ile Başla' : 'Start Explorer', featured: true, premium: false },
    { name: 'Remote + Play', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Çalışma alanı + oyun birlikte', 'Çocuk oyun alanı uygunluğa bağlı', 'Şube kapasitesi geçerlidir'] : ['Workspace and play together', 'Child play area subject to availability', 'Branch capacity applies'], icon: 'laptop', cta: 'Remote + Play', featured: false, premium: false },
    { name: 'All-Access', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['En geniş üyelik kapsamı', 'Adil kullanım ve kapasite kuralları', 'Haklar aylık sıfırlanır'] : ['Broadest membership scope', 'Fair-use and capacity rules apply', 'Benefits reset monthly'], icon: 'crown', cta: 'All-Access', featured: false, premium: true },
  ];

  const note = isTr
    ? 'Canlı paket bilgileri yüklenemediğinde gösterilen güvenli özet. Aylık haklar devretmez; kullanım kapasite, uygunluk ve üyelik koşullarına bağlıdır.'
    : 'Safe summary shown when live package data cannot load. Monthly benefits do not roll over; use depends on capacity, availability, and membership terms.';

  container.innerHTML = fallbackTiers.map(function(t) {
    return '<div class="tier-card' + (t.featured ? ' featured' : '') + (t.premium ? ' premium' : '') + '">' +
      (t.badge ? '<div class="tier-badge">' + escapeHtml(t.badge) + '</div>' : '') +
      tierIconHtml(t.icon) +
      '<div class="tier-name">' + escapeHtml(t.name) + '</div>' +
      '<div class="tier-price">' + escapeHtml(t.price) + '</div>' +
      '<ul class="tier-features">' + t.features.map(function(f) { return '<li>' + escapeHtml(f) + '</li>'; }).join('') + '</ul>' +
      '<a class="btn ' + (t.premium ? 'btn-gold' : 'btn-p') + '" href="' + APP_URL + '/auth/signup" target="_blank" rel="noopener">' + escapeHtml(t.cta) + '</a>' +
    '</div>';
  }).join('') + '<p class="feed-empty" style="grid-column:1/-1">' + escapeHtml(note) + '</p>';
}

function renderBranches(branches) {
  if (!branches || !branches.length) return;
  const isTr = gl === 'tr';

  // 1. Hero stack
  const heroStack = document.getElementById('branch-hero-stack');
  if (heroStack) {
    const portalCard = heroStack.querySelector('.card:last-child');
    const branchCards = branches.map(function(b) {
      const dotCls = b.branch_id === 'kadikoy' ? 'd-sage' : 'd-gold';
      const badge = isTr ? b.badge_tr : b.badge_en;
      const desc = isTr ? b.description_tr : b.description_en;
      const district = b.address_district || (b.branch_id === 'kadikoy' ? 'Kadıköy' : 'Kurtköy');
      const links = branchContactLinks(b.branch_id);

      return '<div class="card hero-branch-card">' +
        '<div class="badge"><span class="dot ' + dotCls + '"></span>' + escapeHtml(badge || '') + '</div>' +
        '<p style="font-size:.83rem;color:var(--mid);line-height:1.6">' +
          '<strong>' + (b.floor_area_sqm || 0) + 'm²</strong> — ' + escapeHtml(desc || '') +
        '</p>' +
        '<div class="micro-location">' + escapeHtml(district) + ', İstanbul</div>' +
        '<div class="btns" style="margin-top:10px">' +
          '<a class="btn" href="' + links.map + '" target="_blank" rel="noopener">Google Maps</a>' +
          '<a class="btn" href="' + links.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
        '</div>' +
      '</div>';
    }).join('');

    heroStack.innerHTML = branchCards + (portalCard ? portalCard.outerHTML : '');
    wireAccountButtons(); // Re-wire the portal button
  }

  // 2. Stats
  const statSqm = document.getElementById('stat-sqm');
  if (statSqm) {
    const main = branches.find(function(b) { return b.branch_id === 'kadikoy'; }) || branches[0];
    statSqm.innerHTML = '<div class="s-num">' + (main.floor_area_sqm || 0) + '<span style="font-size:1rem">m²</span></div>' +
      '<div class="s-label">' + escapeHtml(isTr ? main.name_tr : main.name_en) + '</div>';
  }
  const statCount = document.getElementById('stat-branches');
  if (statCount) {
    statCount.innerHTML = '<div class="s-num">' + branches.length + '</div>' +
      '<div class="s-label"><span class="tr-only">İstanbul Şubesi</span><span class="en-only">Istanbul Locations</span></div>';
  }

  // 3. Hours
  const hoursGrid = document.getElementById('branch-hours-grid');
  if (hoursGrid) {
    hoursGrid.innerHTML = branches.map(function(b) {
      const email = b.email || 'info@ggbloom.org';
      const links = branchContactLinks(b.branch_id);
      const hours = (b.opening_time && b.closing_time)
        ? escapeHtml(b.opening_time.slice(0, 5)) + ' — ' + escapeHtml(b.closing_time.slice(0, 5))
        : '09:00 — 19:00';
      return '<div class="hours-card">' +
        '<h4>' + escapeHtml(isTr ? b.name_tr : b.name_en) + '</h4>' +
        '<div class="hours-row"><span class="day">' + (isTr ? 'Her gün' : 'Daily') + '</span><span class="time">' + hours + '</span></div>' +
        '<div style="margin-top:12px;font-size:.78rem;color:var(--muted)">E-mail: <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></div>' +
        '<div class="btns" style="margin-top:10px">' +
          '<a class="btn" href="' + links.map + '" target="_blank" rel="noopener">Google Maps</a>' +
          '<a class="btn" href="' + links.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
        '</div>' +
      '</div>';
    }).join('');
  }
}

function branchContactLinks(branchId) {
  if (branchId === 'kadikoy') {
    return {
      instagram: CONTACT_LINKS.instagramKadikoy,
      map: CONTACT_LINKS.mapKadikoy,
    };
  }
  if (branchId === 'kurtkoy') {
    return {
      instagram: CONTACT_LINKS.instagramKurtkoy,
      map: CONTACT_LINKS.mapKurtkoy,
    };
  }
  return {
    instagram: CONTACT_LINKS.instagramMain,
    map: CONTACT_LINKS.mapKadikoy,
  };
}

function branchLabel(branchId) {
  if (feedData && feedData.playAvailability) {
    const b = feedData.playAvailability.find(function(x) { return x.branch_id === branchId; });
    if (b) return gl === 'tr' ? b.name_tr : b.name_en;
  }
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
