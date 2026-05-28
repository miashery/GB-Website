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
      (tier.icon ? '<div class="tier-icon">' + escapeHtml(tier.icon) + '</div>' : '') +
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
    { name: isTr ? 'Esnek Aile Paketi' : 'Flex Family', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Üye erişimi ve dönemsel avantajlar', 'Esnek rezervasyon ritmi', 'Haklar aylık sıfırlanır'] : ['Member access and seasonal advantages', 'Flexible booking rhythm', 'Benefits reset monthly'], icon: '🌿', cta: isTr ? 'Flex ile Başla' : 'Start with Flex', featured: false, premium: false },
    { name: isTr ? 'Hafta Sonu Aile' : 'Weekend Family', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Hafta sonu aile ritmi', 'Uygunluk oldukça öncelikli rezervasyon', 'Kapasite ve şube kuralları geçerli'] : ['Weekend family rhythm', 'Priority booking where available', 'Capacity and branch rules apply'], icon: '☀️', cta: isTr ? 'Hafta Sonu' : 'Weekend', featured: false, premium: false },
    { name: 'Workshop Explorer', price: isTr ? 'Canlı detay' : 'Live details', badge: isTr ? 'En Popüler' : 'Most Popular', features: isTr ? ['Atölye odaklı aylık kullanım', 'Uzman ve gelişim programlarına erişim', 'Haklar devretmez'] : ['Workshop-focused monthly use', 'Access to expert and growth programmes', 'Benefits do not roll over'], icon: '🚀', cta: isTr ? 'Explorer ile Başla' : 'Start Explorer', featured: true, premium: false },
    { name: 'Remote + Play', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Çalışma alanı + oyun birlikte', 'Çocuk oyun alanı uygunluğa bağlı', 'Şube kapasitesi geçerlidir'] : ['Workspace and play together', 'Child play area subject to availability', 'Branch capacity applies'], icon: '💻', cta: 'Remote + Play', featured: false, premium: false },
    { name: 'All-Access', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['En geniş üyelik kapsamı', 'Adil kullanım ve kapasite kuralları', 'Haklar aylık sıfırlanır'] : ['Broadest membership scope', 'Fair-use and capacity rules apply', 'Benefits reset monthly'], icon: '👑', cta: 'All-Access', featured: false, premium: true },
  ];

  const note = isTr
    ? 'Canlı paket bilgileri yüklenemediğinde gösterilen güvenli özet. Aylık haklar devretmez; kullanım kapasite, uygunluk ve üyelik koşullarına bağlıdır.'
    : 'Safe summary shown when live package data cannot load. Monthly benefits do not roll over; use depends on capacity, availability, and membership terms.';

  container.innerHTML = fallbackTiers.map(function(t) {
    return '<div class="tier-card' + (t.featured ? ' featured' : '') + (t.premium ? ' premium' : '') + '">' +
      (t.badge ? '<div class="tier-badge">' + escapeHtml(t.badge) + '</div>' : '') +
      '<div class="tier-icon">' + escapeHtml(t.icon) + '</div>' +
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

      return '<div class="card hero-branch-card">' +
        '<div class="badge"><span class="dot ' + dotCls + '"></span>' + escapeHtml(badge || '') + '</div>' +
        '<p style="font-size:.83rem;color:var(--mid);line-height:1.6">' +
          '<strong>' + (b.floor_area_sqm || 0) + 'm²</strong> — ' + escapeHtml(desc || '') +
        '</p>' +
        '<div class="micro-location">' + escapeHtml(district) + ', İstanbul</div>' +
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
      const hours = (b.opening_time && b.closing_time)
        ? escapeHtml(b.opening_time.slice(0, 5)) + ' — ' + escapeHtml(b.closing_time.slice(0, 5))
        : '09:00 — 19:00';
      return '<div class="hours-card">' +
        '<h4>' + escapeHtml(isTr ? b.name_tr : b.name_en) + '</h4>' +
        '<div class="hours-row"><span class="day">' + (isTr ? 'Her gun' : 'Daily') + '</span><span class="time">' + hours + '</span></div>' +
        '<div style="margin-top:12px;font-size:.78rem;color:var(--muted)">E-mail: <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></div>' +
      '</div>';
    }).join('');
  }
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
