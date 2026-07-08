const APP_URL = window.GB_APP_URL || 'https://webapp.gigglesbloom.com';
const CONTACT_LINKS = {
  instagramMain: 'https://www.instagram.com/gigglesandbloom/',
  instagramKadikoy: 'https://www.instagram.com/gigglesandbloom.kadikoy/',
  instagramKurtkoy: 'https://www.instagram.com/gigglesandbloom.kurtkoy/',
  mapKadikoy: 'https://maps.app.goo.gl/wf5DHk16UqNkESe5A',
  mapKurtkoy: 'https://maps.app.goo.gl/iQE29KZyHXt4ZJNN6',
  phoneDisplay: '(+90) 0 553 345 65 67',
  phoneTel: '+905533456567',
};
const MINI_ICONS = {
  pin: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/></svg>',
  map: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z"/><path d="M9 4v14M15 6v14"/></svg>',
  instagram: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3"/><circle cx="16.5" cy="7.5" r=".8"/></svg>',
};
const DESKTOP_NAV_ITEMS = [
  { href: 'play.html', tr: 'Oyun', en: 'Play' },
  { href: 'workshops.html', tr: 'BloomLab', en: 'BloomLab' },
  { href: 'social-lab.html', tr: 'Topluluk', en: 'Community', activeFor: ['social-lab.html', 'social-lab-community-wellbeing.html', 'wellbeing.html'] },
  { href: 'journal.html', tr: 'Journal', en: 'Journal' },
  { href: 'food.html', tr: 'Kafe & Kitap', en: 'Café & Books', activeFor: ['food.html', 'cafe.html', 'library.html'] },
  { href: 'membership.html', tr: 'Üyelik', en: 'Membership' },
  { href: 'contact.html', tr: 'Ziyaret', en: 'Visit', activeFor: ['contact.html', 'kadikoy.html', 'kurtkoy.html'] },
];
const DRAWER_NAV_ITEMS = [
  { href: 'play.html', tr: 'Oyun', en: 'Play' },
  { href: 'workshops.html', tr: 'BloomLab', en: 'BloomLab' },
  { href: 'social-lab.html', tr: 'Topluluk', en: 'Community', activeFor: ['social-lab.html', 'social-lab-community-wellbeing.html'] },
  { href: 'wellbeing.html', tr: 'Destek', en: 'Support' },
  { href: 'journal.html', tr: 'Journal', en: 'Journal' },
  { href: 'events.html', tr: 'Etkinlikler', en: 'Events' },
  { href: 'workspaces.html', tr: 'Çalışma', en: 'Work' },
  { href: 'library.html', tr: 'Kitaplık', en: 'Books' },
  { href: 'food.html', tr: 'Kafe', en: 'Café', activeFor: ['food.html', 'cafe.html'] },
  { href: 'membership.html', tr: 'Üyelik', en: 'Membership' },
  { href: 'contact.html', tr: 'Ziyaret', en: 'Visit' },
  { href: 'kadikoy.html', tr: 'Kadıköy', en: 'Kadıköy' },
  { href: 'kurtkoy.html', tr: 'Kurtköy', en: 'Kurtköy' },
];
const PUBLIC_CARD_ICONS = {
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5h10a3 3 0 0 1 3 3v12H8a3 3 0 0 0-3 3z"/><path d="M5 4.5v15"/><path d="M9 8h5M9 11h6"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v3M17 3v3M4.5 8.5h15"/><rect x="4.5" y="5" width="15" height="15" rx="3"/><path d="M8 12h3M13 12h3M8 16h3"/></svg>',
  cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h10v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M15 9h2.2a2.3 2.3 0 0 1 0 4.6H15"/><path d="M6 20h10"/></svg>',
  flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8.5c-1.4-3.2-5.8-2.5-5.8.9 0 2 2.2 3.2 4 3.5-2.4 1.8-2.3 5.4.7 6.2 2 .5 3.2-1.5 3.6-3.4 1.2 2.5 4.8 2.7 5.8-.2.7-2-1.3-3.4-3.3-3.8 2.7-1.4 2.9-5.2-.1-6.3-2-.8-3.6 1.1-4.9 3.1z"/><circle cx="12" cy="12" r="1.4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M9 12h6"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M3.5 19a6 6 0 0 1 12 0"/><path d="M16.5 10.5a2.4 2.4 0 1 0 0-4.8"/><path d="M17 14a4.7 4.7 0 0 1 3.5 4.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 18.5 6v5.4c0 4-2.7 7.6-6.5 9.1-3.8-1.5-6.5-5.1-6.5-9.1V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c.9 2.8 2.7 4.6 5.5 5.5-2.8.9-4.6 2.7-5.5 5.5-.9-2.8-2.7-4.6-5.5-5.5 2.8-.9 4.6-2.7 5.5-5.5z"/><path d="M5.5 14.5c.45 1.35 1.3 2.2 2.6 2.65-1.3.45-2.15 1.3-2.6 2.65-.45-1.35-1.3-2.2-2.6-2.65 1.3-.45 2.15-1.3 2.6-2.65z"/></svg>',
  workspace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="11" rx="2"/><path d="M9 20h6M12 16v4"/></svg>',
};
let gl = 'tr';
let feedData = null;
let journalData = null;
let journalDegraded = false;
let activeMenuBranch = 'all';

function ga(lang) {
  gl = lang;
  document.documentElement.setAttribute('lang', gl);

  const switcher = document.getElementById('ls');
  if (switcher) switcher.classList.toggle('en', gl === 'en');

  try {
    localStorage.setItem('gb_lang', gl);
  } catch (error) {}
  try {
    document.cookie = 'gb_lang=' + gl + ';path=/;max-age=31536000;SameSite=Lax';
  } catch (error) {}

  renderDynamicContent();
}

function gt() {
  ga(gl === 'tr' ?'en' : 'tr');
}

document.addEventListener('DOMContentLoaded', function() {
  applyPageThemeClass();
  normalizeHeaderNav();
  applyRedesignBranding();
  preparePwaShell();
  ensureMobileNav();
  normalizeFooter();
  enhancePublicCardIcons();

  try {
    const savedLang = localStorage.getItem('gb_lang');
    const cookieLang = (document.cookie.match(/(?:^|;\s*)gb_lang=(tr|en)\b/) || [])[1];
    if (savedLang === 'en' || (!savedLang && cookieLang === 'en')) ga('en');
  } catch (error) {}

  updateYears();
  wireAccountButtons();
  revealOnScroll();
  wireMobileNav();

  if (
    document.getElementById('dynamic-feed') ||
    document.getElementById('play-availability') ||
    document.getElementById('menu-highlights') ||
    document.querySelector('[data-branch-hours-card]')
  ) {
    loadDynamicFeed();
  }

  if (document.querySelector('[data-experience-rate]')) {
    loadExperienceRates();
  }

  if (document.querySelector('[data-bookshop-field], [data-bookshop-price]')) {
    loadBookshopExperience();
  }

  if (document.getElementById('membership-grid')) {
    loadMembershipPackages();
  }

  if (document.getElementById('journal-highlights')) {
    loadJournalHighlights();
  }

  wireEventRequestForms();
});

function normalizeHeaderNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  nav.setAttribute('aria-label', 'Primary');
  nav.innerHTML = navItemsHtml(DESKTOP_NAV_ITEMS, current);
  nav.setAttribute('data-gb-nav-ready', '1');
}

function navItemsHtml(items, current) {
  return items.map(function(item) {
    const active = navItemIsActive(item, current);
    return '<a' + (active ? ' class="active"' : '') + ' href="' + item.href + '">' + navItemLabel(item) + '</a>';
  }).join('');
}

function applyPageThemeClass() {
  const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const themeByPage = {
    'play.html': 'page-play',
    'workshops.html': 'page-bloomlab',
    'social-lab.html': 'page-community',
    'social-lab-community-wellbeing.html': 'page-community',
    'wellbeing.html': 'page-support',
    'journal.html': 'page-journal',
    'events.html': 'page-events',
    'workspaces.html': 'page-work',
    'library.html': 'page-books',
    'food.html': 'page-cafe',
    'cafe.html': 'page-cafe',
    'membership.html': 'page-membership',
    'contact.html': 'page-visit',
    'kadikoy.html': 'page-visit',
    'kurtkoy.html': 'page-kurtkoy',
  };
  const theme = themeByPage[current];
  if (theme) document.body.classList.add('page-themed', theme);
}

function navItemIsActive(item, current) {
  if (current === item.href.toLowerCase()) return true;
  return Array.isArray(item.activeFor) && item.activeFor.some(function(path) {
    return current === path.toLowerCase();
  });
}

function navItemLabel(item) {
  if (item.tr === item.en) return escapeHtml(item.en);
  return '<span class="tr-only">' + escapeHtml(item.tr) + '</span><span class="en-only">' + escapeHtml(item.en) + '</span>';
}

function getSiteAssetPath(fileName) {
  const script = document.querySelector('script[src$="assets/site.js"], script[src*="assets/site.js?"]');
  const scriptSrc = script ? script.getAttribute('src') : 'assets/site.js';
  const base = scriptSrc.replace(/site\.js(?:\?.*)?$/, '');
  return base + fileName.replace(/^assets\//, '');
}

function applyRedesignBranding() {
  const logoSrc = getSiteAssetPath('redesign/logo-wordmark.png');
  document.querySelectorAll('.brand img, .brand-logo').forEach(function(img) {
    img.src = logoSrc;
    img.alt = 'Giggles & Bloom';
  });

  document.querySelectorAll('meta[name="theme-color"]').forEach(function(meta) {
    meta.content = '#496394';
  });
}

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
    theme.content = '#496394';
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

function wireAccountButton(selector, path) {
  document.querySelectorAll(selector).forEach(function(btn) {
    var el = btn;
    if (el.tagName !== 'A') {
      var a = document.createElement('a');
      a.className = el.className;
      a.innerHTML = el.innerHTML;
      var aria = el.getAttribute('aria-label');
      if (aria) a.setAttribute('aria-label', aria);
      el.parentNode.replaceChild(a, el);
      el = a;
    }
    el.href = APP_URL + path;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function wireAccountButtons() {
  wireAccountButton('.btn-login', '/auth/signin');
  wireAccountButton('.btn-join', '/auth/signup');

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

function setRequestFormValue(form, name, value) {
  const field = form.querySelector('[name="' + name + '"]');
  if (!field) return;
  if (field.type === 'checkbox') {
    field.checked = Boolean(value);
    return;
  }
  field.value = value;
}

function localizeStoryStopRequestForm(form) {
  const card = form.closest('.form-card');
  if (!card) return;

  const heading = card.querySelector('.sec-h');
  if (heading) {
    heading.innerHTML = '<span class="tr-only">Hikâye Durağı veya kitapçı ziyareti talebi</span><span class="en-only">Story Stop or bookshop visit request</span>';
  }

  const desc = card.querySelector('.desc');
  if (desc) {
    desc.innerHTML = '<span class="tr-only">Kurtköy çocuk kitapçısı, Hikâye Pasaportu, haftalık tema veya kitap önerileri hakkında bilgi almak için ulaşabileceğimiz bilgileri bırakın.</span><span class="en-only">Leave reachable details for Kurtköy bookshop, Story Passport, weekly theme, or book recommendation questions.</span>';
  }
}

function prefillEventRequestForm(form) {
  const params = new URLSearchParams(window.location.search);
  const branch = params.get('branch');
  const type = params.get('type');
  const storyStop = params.get('story_stop') === '1';

  if (branch) setRequestFormValue(form, 'branch_id', branch);
  if (type) setRequestFormValue(form, 'event_type', type);

  if (!storyStop) return;

  localizeStoryStopRequestForm(form);
  setRequestFormValue(form, 'branch_id', 'kurtkoy');
  setRequestFormValue(form, 'event_type', 'other');
  setRequestFormValue(form, 'expected_children_count', '0');
  setRequestFormValue(form, 'expected_adults_count', '1');
  setRequestFormValue(form, 'play_area_needed', false);
  setRequestFormValue(form, 'guided_activity_needed', false);
  setRequestFormValue(form, 'workspace_needed', false);

  const notes = form.querySelector('[name="notes"]');
  if (notes && !notes.value.trim()) {
    notes.value = 'Kurtköy Hikâye Durağı / Hikâye Pasaportu hakkında bilgi almak ve kitapçı ziyareti planlamak istiyorum. / I would like information about the Kurtköy Story Stop / Story Passport and planning a bookshop visit.';
  }
}

function wireEventRequestForms() {
  document.querySelectorAll('[data-event-request-form]').forEach(function(form) {
    prefillEventRequestForm(form);
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
        source_detail: new URLSearchParams(window.location.search).get('story_stop') === '1' ? 'story_stop_interest' : '',
        story_passport_interest: new URLSearchParams(window.location.search).get('story_stop') === '1',
        starter_offer_interest: new URLSearchParams(window.location.search).get('story_stop') === '1',
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
    '.g.g3 > .card h4',
    '.track-card h3',
    '.feature-card h3',
    '.info-card strong',
  ].join(','));

  headings.forEach(function(heading, index) {
    if (heading.dataset.gbIconReady === '1') return;
    if (heading.closest('.diff-card, .tier-card, .hero .card, footer')) return;

    stripLeadingClipart(heading);

    const icon = document.createElement('span');
    icon.className = 'gb-card-icon gb-card-icon-' + ((index % 6) + 1);
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = iconForHeading(heading);
    heading.insertBefore(icon, heading.firstChild);
    heading.dataset.gbIconReady = '1';
  });

  document.querySelectorAll('.info-card .ic-icon').forEach(function(icon, index) {
    icon.classList.add('gb-card-icon', 'gb-card-icon-' + (((index + 2) % 6) + 1));
    icon.innerHTML = PUBLIC_CARD_ICONS.spark;
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

function iconForHeading(heading) {
  const text = (heading.textContent || '').toLocaleLowerCase('tr');
  if (/kitap|kütüphane|library|book|reading|yazar|author/.test(text)) return PUBLIC_CARD_ICONS.book;
  if (/kafe|cafe|coffee|kahve|menü|menu|meal|snack|içecek|drink|diyet|diet/.test(text)) return PUBLIC_CARD_ICONS.cup;
  if (/doğum|birthday|etkinlik|event|rezervasyon|booking|calendar|takvim|schedule|program/.test(text)) return PUBLIC_CARD_ICONS.calendar;
  if (/destek|support|privacy|gizlilik|mahremiyet|wellbeing|psychology|psikoloji|parent|ebeveyn/.test(text)) return PUBLIC_CARD_ICONS.heart;
  if (/topluluk|community|social|partner|okul|group|grup|aile|family/.test(text)) return PUBLIC_CARD_ICONS.people;
  if (/güven|safe|kvkk|consent|onay/.test(text)) return PUBLIC_CARD_ICONS.shield;
  if (/çalışma|workspace|cowork|work|station/.test(text)) return PUBLIC_CARD_ICONS.workspace;
  if (/oyun|play|mini|guided|giggle/.test(text)) return PUBLIC_CARD_ICONS.flower;
  return PUBLIC_CARD_ICONS.spark;
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

  const existingDrawer = document.getElementById('mobileNav');
  if (existingDrawer) {
    syncMobileNav(existingDrawer, nav);
    return;
  }

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
        '<a class="btn-login" href="' + APP_URL + '/auth/signin" target="_blank" rel="noopener"><span class="tr-only">Giriş Yap</span><span class="en-only">Sign In</span></a>' +
        '<a class="btn-join" href="' + APP_URL + '/auth/signup" target="_blank" rel="noopener"><span class="tr-only">Üye Ol</span><span class="en-only">Join</span></a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(drawer);
  syncMobileNav(drawer, nav);
}

function syncMobileNav(drawer, nav) {
  const links = drawer.querySelector('.nav-links');
  const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (links) links.innerHTML = navItemsHtml(DRAWER_NAV_ITEMS, current);

  let actions = drawer.querySelector('.mobile-nav-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'mobile-nav-actions';
    const inner = drawer.querySelector('.mobile-nav-inner') || drawer;
    inner.appendChild(actions);
  }

  actions.innerHTML =
    '<a class="btn-login" href="' + APP_URL + '/auth/signin" target="_blank" rel="noopener"><span class="tr-only">Giriş Yap</span><span class="en-only">Sign In</span></a>' +
    '<a class="btn-join" href="' + APP_URL + '/auth/signup" target="_blank" rel="noopener"><span class="tr-only">Üye Ol</span><span class="en-only">Join</span></a>';
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
        '<div class="footer-note"><span class="tr-only">Görünmez yükü hafifletmek için varız. Aileler için sıcak, güven öncelikli bir üçüncü alan.</span><span class="en-only">We exist to lighten the invisible load. A warm, trust-first third space for families.</span></div>' +
        '<a class="footer-phone" href="tel:' + CONTACT_LINKS.phoneTel + '">' + CONTACT_LINKS.phoneDisplay + '</a>' +
      '</div>' +
      '<div class="footer-col">' +
        '<h5><span class="tr-only">Keşfet</span><span class="en-only">Explore</span></h5>' +
        '<a href="play.html"><span class="tr-only">Giggles: Oyun</span><span class="en-only">Giggles: Play</span></a>' +
        '<a href="workshops.html"><span class="tr-only">BloomLab</span><span class="en-only">BloomLab</span></a>' +
        '<a href="social-lab.html"><span class="tr-only">Topluluk &amp; Destek</span><span class="en-only">Community &amp; Support</span></a>' +
        '<a href="events.html"><span class="tr-only">İş &amp; Etkinlikler</span><span class="en-only">Work &amp; Events</span></a>' +
        '<a href="journal.html">Journal</a>' +
        '<a href="library.html"><span class="tr-only">Kitaplık</span><span class="en-only">Books</span></a>' +
        '<a href="food.html"><span class="tr-only">Kafe &amp; Restoran</span><span class="en-only">Cafe &amp; Restaurant</span></a>' +
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
          footerBranchRow('Kadıköy', 'kadikoy.html', CONTACT_LINKS.mapKadikoy, CONTACT_LINKS.instagramKadikoy) +
          footerBranchRow('Kurtköy', 'kurtkoy.html', CONTACT_LINKS.mapKurtkoy, CONTACT_LINKS.instagramKurtkoy) +
          '<a class="footer-main-social" href="' + CONTACT_LINKS.instagramMain + '" target="_blank" rel="noopener">' + MINI_ICONS.instagram + '<span>@gigglesandbloom</span></a>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom"><div>&copy; <span data-year></span> Giggles &amp; Bloom &mdash; Kadıköy &amp; Kurtköy, İstanbul</div></div>';
  updateYears();
}

function footerBranchRow(label, pageUrl, mapUrl, instagramUrl) {
  return '<div class="footer-branch-row">' +
    '<a class="footer-branch-label" href="' + pageUrl + '">' + MINI_ICONS.pin + '<span>' + escapeHtml(label) + '</span></a>' +
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
    const [upcoming, workshopSessions] = await Promise.all([
      fetchJson(APP_URL + '/api/public/upcoming'),
      fetchJson(APP_URL + '/api/public/workshop-sessions?limit=12').catch(function() {
        return { sessions: [] };
      }),
    ]);

    feedData = Object.assign({}, upcoming, {
      workshopSessions: workshopSessions.sessions || [],
    });
    renderDynamicContent();
  } catch (error) {
    feedData = null;
    renderDynamicFallback();
  }
}

async function fetchJson(url) {
  const res = await fetch(url, {
    mode: 'cors',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error('API ' + res.status);
  return res.json();
}

async function loadJournalHighlights() {
  try {
    const data = await fetchJson(APP_URL + '/api/public/journal?limit=6');
    journalData = (data && data.articles) || [];
    journalDegraded = data && data.degraded === true;
    renderJournalHighlights(journalData, journalDegraded);
  } catch (error) {
    journalData = [];
    journalDegraded = true;
    renderJournalHighlights(journalData, journalDegraded);
  }
}

function journalArticleCopy(article) {
  const isTr = gl === 'tr';
  return {
    title: isTr ? (article.title_tr || article.title_en) : (article.title_en || article.title_tr),
    summary: isTr
      ? (article.summary_tr || article.seo_line_tr || article.summary_en || article.seo_line_en)
      : (article.summary_en || article.seo_line_en || article.summary_tr || article.seo_line_tr),
    evidence: isTr ? (article.evidence_label_tr || article.evidence_label_en) : (article.evidence_label_en || article.evidence_label_tr),
    type: journalTypeLabel(article.content_type, isTr),
  };
}

function journalTypeLabel(type, isTr) {
  const labels = {
    article: { tr: 'Makale', en: 'Article' },
    parent_guide: { tr: 'Aile rehberi', en: 'Family guide' },
    practice_note: { tr: 'G&B notu', en: 'G&B note' },
    seasonal_parent_guide: { tr: 'Dönemsel rehber', en: 'Seasonal guide' },
    faq: { tr: 'SSS', en: 'FAQ' },
    visual_guide: { tr: 'Görsel rehber', en: 'Visual guide' },
    video: { tr: 'Video notları', en: 'Video notes' },
    podcast: { tr: 'Podcast notları', en: 'Podcast notes' },
  };
  return isTr ? (labels[type] && labels[type].tr) || type : (labels[type] && labels[type].en) || type;
}

function renderJournalHighlights(articles, degraded) {
  const container = document.getElementById('journal-highlights');
  if (!container) return;
  const isTr = gl === 'tr';
  const items = Array.isArray(articles) ? articles.filter(function(article) {
    return article && article.slug && article.title_en && article.title_tr;
  }) : [];

  if (!items.length) {
    container.innerHTML =
      '<div class="journal-empty">' +
        '<strong>' + escapeHtml(degraded ? (isTr ? 'Journal rafı yenileniyor.' : 'The Journal shelf is refreshing.') : (isTr ? 'Journal rafı yavaş yavaş doluyor.' : 'The Journal shelf is slowly filling.')) + '</strong>' +
        '<span>' + escapeHtml(degraded ? (isTr ? 'Yayınlanmış yazılar kısa süre içinde yeniden görünecek. Bu sırada G&B dünyalarını keşfedebilirsiniz.' : 'Published articles should appear again shortly. In the meantime, you can explore the G&B worlds.') : (isTr ? 'İlk yazılar hazırlandıkça burada aileler için sakin, kaynaklı ve iki dilli bir bilgi alanı oluşacak.' : 'As the first pieces are prepared, this will become a calm, sourced, bilingual knowledge space for families.')) + '</span>' +
      '</div>';
    return;
  }

  container.innerHTML = items.slice(0, 6).map(function(article) {
    const copy = journalArticleCopy(article);
    const href = '/journal/' + encodeURIComponent(article.slug) + '?lang=' + encodeURIComponent(gl);
    const meta = [
      copy.type,
      copy.evidence,
      article.reading_minutes ? (isTr ? article.reading_minutes + ' dk' : article.reading_minutes + ' min') : null,
    ].filter(Boolean);
    return '<a class="journal-card" href="' + href + '">' +
      '<span class="journal-card-kicker">' + escapeHtml(meta.join(' · ')) + '</span>' +
      '<strong>' + escapeHtml(copy.title || 'G&B Journal') + '</strong>' +
      (copy.summary ? '<p>' + escapeHtml(copy.summary) + '</p>' : '') +
      '<span class="journal-card-link">' + escapeHtml(isTr ? 'Oku →' : 'Read →') + '</span>' +
    '</a>';
  }).join('');
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

async function loadBookshopExperience() {
  try {
    const data = await fetchJson(APP_URL + '/api/public/bookshop-experience?branch_id=kurtkoy');
    renderBookshopExperience(data || {});
  } catch (error) {
    renderBookshopFallback();
  }
}

function renderBookshopExperience(data) {
  if (!data || data.enabled === false) {
    renderBookshopFallback();
    return;
  }

  const settings = data.settings || {};
  const theme = data.live_theme || {};
  setLocalizedBookshopField('bookshop-campaign', settings.public_tagline_tr, settings.public_tagline_en);
  setBookshopHeading(settings.public_heading_tr, settings.public_heading_en);
  setLocalizedBookshopField(
    'bookshop-intro',
    polishedBookshopIntro(settings.public_intro_tr, 'tr'),
    polishedBookshopIntro(settings.public_intro_en, 'en')
  );
  setLocalizedBookshopField('bookshop-story-label', settings.story_stop_label_tr, settings.story_stop_label_en);
  setLocalizedBookshopField('bookshop-passport-label', settings.passport_label_tr, settings.passport_label_en);

  const hasPublicTheme = hasPositiveBookshopTheme(theme);
  const displayTheme = hasPublicTheme ? theme : upbeatBookshopFallbackTheme();
  setLocalizedBookshopField('bookshop-theme-title', displayTheme.title_tr, displayTheme.title_en);
  setLocalizedBookshopField(
    'bookshop-theme-summary',
    displayTheme.public_summary_tr || displayTheme.book_focus_tr || displayTheme.experience_prompt_tr,
    displayTheme.public_summary_en || displayTheme.book_focus_en || displayTheme.experience_prompt_en
  );
  setLocalizedBookshopField('bookshop-theme-focus', displayTheme.book_focus_tr, displayTheme.book_focus_en);
  setLocalizedBookshopField('bookshop-experience-prompt', displayTheme.experience_prompt_tr, displayTheme.experience_prompt_en);
  setLocalizedBookshopField('bookshop-passport-task', displayTheme.passport_task_tr, displayTheme.passport_task_en);
  setLocalizedBookshopField('bookshop-starter-item', displayTheme.starter_item_name_tr, displayTheme.starter_item_name_en);

  const price = Number(displayTheme.starter_price_kurus || settings.starter_price_kurus);
  if (Number.isFinite(price) && price > 0) {
    document.querySelectorAll('[data-bookshop-price]').forEach(function(el) {
      el.textContent = '₺' + Math.round(price / 100).toLocaleString('tr-TR');
    });
  }
}

function setBookshopHeading(trText, enText) {
  const tr = polishedBookshopHeading(trText, 'tr');
  const en = polishedBookshopHeading(enText, 'en');
  document.querySelectorAll('[data-bookshop-field="bookshop-heading"]').forEach(function(el) {
    el.innerHTML =
      '<span class="tr-only">' + tr.main + '<br><em>' + tr.accent + '.</em></span>' +
      '<span class="en-only">' + en.main + '<br><em>' + en.accent + '.</em></span>';
  });
}

function polishedBookshopHeading(text, locale) {
  const fallback = locale === 'tr'
    ? 'Giggles & Bloom Kurtköy — Çocuk Kitapçısı ve Aile Kafesi'
    : "Giggles & Bloom Kurtköy — Children's Bookshop and Family Café";
  const value = String(text || fallback)
    .replace(/\bKurtkoy\b/g, 'Kurtköy')
    .replace(/\bCafe\b/g, 'Café')
    .trim();
  const parts = value.split(/\s+[—-]\s+/);
  if (parts.length >= 2) {
    return {
      main: escapeHtml(parts[0].trim()),
      accent: escapeHtml(parts.slice(1).join(' — ').replace(/[.。]+$/, '').trim()),
    };
  }
  return {
    main: escapeHtml(locale === 'tr' ? 'Giggles & Bloom Kurtköy' : 'Giggles & Bloom Kurtköy'),
    accent: escapeHtml(value.replace(/[.。]+$/, '')),
  };
}

function polishedBookshopIntro(text, locale) {
  const value = String(text || '').trim();
  const oldTr = 'Çocuk kitapları, aile kafesi ve kitaplardan doğan küçük deneyimler.';
  const oldEn = "Children's books, family cafe, and small experiences born from books.";
  if (!value || value === oldTr || value === oldEn) {
    return locale === 'tr'
      ? 'Kurtköy’de çocuk kitapları ilk durak. Aile kafesi, Mini Oyun Köşesi ve haftalık Hikâye Durağı; seçilen kitabı çocuğun keşfedebileceği, anlatabileceği ve hatırlayacağı sıcak bir küçük deneyime dönüştürür.'
      : 'At Kurtköy, children’s books are the starting point. The family café, Mini Play Corner and weekly Story Stop turn each chosen book into a warm little experience children can explore, talk about and remember.';
  }
  return value;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function(char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char] || char;
  });
}

function renderBookshopFallback() {
  const theme = upbeatBookshopFallbackTheme();
  setLocalizedBookshopField('bookshop-campaign', 'Kitaplardan Deneyime', 'From Books to Experiences');
  setLocalizedBookshopField('bookshop-story-label', 'Bu Haftanın Hikâye Durağı', "This Week's Story Stop");
  setLocalizedBookshopField('bookshop-passport-label', 'Hikâye Pasaportu', 'Story Passport');
  setLocalizedBookshopField('bookshop-theme-title', theme.title_tr, theme.title_en);
  setLocalizedBookshopField('bookshop-theme-summary', theme.public_summary_tr, theme.public_summary_en);
  setLocalizedBookshopField('bookshop-theme-focus', theme.book_focus_tr, theme.book_focus_en);
  setLocalizedBookshopField('bookshop-experience-prompt', theme.experience_prompt_tr, theme.experience_prompt_en);
  setLocalizedBookshopField('bookshop-passport-task', theme.passport_task_tr, theme.passport_task_en);
  setLocalizedBookshopField('bookshop-starter-item', theme.starter_item_name_tr, theme.starter_item_name_en);
  document.querySelectorAll('[data-bookshop-price]').forEach(function(el) {
    el.textContent = '₺150';
  });
}

function upbeatBookshopFallbackTheme() {
  return {
    title_tr: 'Bu hafta raftan yeni bir hikâye doğuyor',
    title_en: 'A new story is taking shape on the shelf',
    public_summary_tr: 'Kurtköy ekibi bu haftanın Hikâye Durağı’nı raftaki kitaplar ve çocukların ilgisine göre hazırlıyor. Bugün uğrayın; çocuklar bir kitap seçsin, ilk Hikâye Pasaportu anısını alsın.',
    public_summary_en: 'The Kurtköy team is shaping this week’s Story Stop from the books on the shelf and what children are noticing. Visit today; children can choose a book and collect a first Story Passport moment.',
    book_focus_tr: 'Raf keşfi: çocukların bugün seçtiği kitaplar yarının temasını kurar.',
    book_focus_en: 'Shelf discovery: the books children choose today help shape tomorrow’s theme.',
    experience_prompt_tr: 'Bir kitap seç, kapağına bak, küçük bir soru sor ve hikâyeyi birlikte başlat.',
    experience_prompt_en: 'Choose a book, look at the cover, ask one small question, and begin the story together.',
    passport_task_tr: 'İlk damga veya küçük çizim anı ile Hikâye Pasaportuna başla.',
    passport_task_en: 'Begin the Story Passport with a first stamp or small drawing moment.',
    starter_item_name_tr: 'Küçük kitap keşfi',
    starter_item_name_en: 'Small book discovery',
    starter_price_kurus: 15000,
  };
}

function hasPositiveBookshopTheme(theme) {
  const title = [theme && theme.title_tr, theme && theme.title_en].filter(Boolean).join(' ');
  const summary = [
    theme && theme.public_summary_tr,
    theme && theme.public_summary_en,
    theme && theme.book_focus_tr,
    theme && theme.book_focus_en,
    theme && theme.experience_prompt_tr,
    theme && theme.experience_prompt_en,
  ].filter(Boolean).join(' ');
  if (!title.trim() && !summary.trim()) return false;
  return !negativeBookshopText(title + ' ' + summary);
}

function negativeBookshopText(text) {
  return /\b(no theme|no live|none|empty|not ready|negative|low footfall|no sales|failed|closed|disabled|placeholder|test)\b|tema yok|satış yok|hazır değil|kapalı|negatif|düşük trafik|test/i.test(text || '');
}

function setLocalizedBookshopField(field, trText, enText) {
  if (!trText && !enText) return;
  document.querySelectorAll('[data-bookshop-field="' + field + '"]').forEach(function(el) {
    const trEl = el.querySelector('.tr-only');
    const enEl = el.querySelector('.en-only');
    if (trEl && trText) trEl.textContent = trText;
    if (enEl && enText) enEl.textContent = enText;
    if (!trEl && !enEl) el.textContent = gl === 'tr' ? (trText || enText || '') : (enText || trText || '');
  });
}

function renderDynamicContent() {
  if (document.getElementById('journal-highlights') && Array.isArray(journalData)) {
    renderJournalHighlights(journalData, journalDegraded);
  }

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

function isBloomLabFeedPage() {
  return /(?:^|\/)workshops(?:\.html)?\/?$/.test(window.location.pathname || '');
}

function isEventsFeedPage() {
  return /(?:^|\/)events(?:\.html)?\/?$/.test(window.location.pathname || '');
}

function isPlayProgrammeKind(kind) {
  return kind === 'play_guided_moment' || kind === 'play_workshop';
}

function bloomLabFallbackItems(isTr) {
  return [
    {
      type: 'workshop',
      tag: isTr ? 'BloomLab' : 'BloomLab',
      tagClass: 'lav',
      title: isTr ? 'Özel Atölye Programı' : 'Special Workshop Programme',
      date: isTr ? 'Takvim yakında' : 'Schedule coming soon',
      branch: isTr ? 'Kadıköy / Kurtköy' : 'Kadıköy / Kurtköy',
    },
    {
      type: 'workshop',
      tag: isTr ? 'Seri' : 'Series',
      tagClass: 'gold',
      title: isTr ? 'Yapılandırılmış Seri Atölyeleri' : 'Structured Series Workshops',
      date: isTr ? 'Planlama aşamasında' : 'In planning',
      branch: isTr ? 'Programa göre' : 'By programme',
    },
    {
      type: 'workshop',
      tag: isTr ? 'Topluluk' : 'Community',
      tagClass: 'coral',
      title: isTr ? 'Aile, yetişkin ve topluluk oturumları' : 'Family, adult, and community sessions',
      date: isTr ? 'Özel talep alınır' : 'Requests welcome',
      branch: isTr ? 'Programa göre' : 'By programme',
    },
  ];
}

function renderFeed(container, data) {
  const isTr = gl === 'tr';
  const items = [];
  const bloomLabPage = isBloomLabFeedPage();
  const eventsPage = isEventsFeedPage();
  const workshopSessions = (data.workshopSessions || []).filter(function(session) {
    return !bloomLabPage || !isPlayProgrammeKind(session.programme_kind);
  });

  if (!eventsPage) workshopSessions.slice(0, 4).forEach(function(session) {
    items.push({
      type: 'workshop-session',
      tag: isTr ? session.category_tr : session.category_en,
      tagClass: session.programme_kind === 'play_guided_moment' || session.programme_kind === 'play_workshop'
        ? 'coral'
        : session.programme_kind === 'public_event'
          ? 'gold'
          : '',
      title: isTr ? session.title_tr : session.title_en,
      date: formatDate(session.starts_at),
      branch: isTr ? session.branch_name_tr : session.branch_name_en,
      price: publicSessionPriceText(session),
      seats: sessionSeatText(session),
      badges: isTr ? session.badges_tr : session.badges_en,
    });
  });

  const eventItems = bloomLabPage
    ? (data.events || []).filter(function(event) {
        const name = ((isTr ? event.name_tr : event.name_en) || '').toLocaleLowerCase('tr');
        return /atölye|workshop|bloom|seri|series|talk|konuş|topluluk|community/.test(name);
      })
    : (data.events || []);

  eventItems.slice(0, eventsPage ? 6 : (items.length ? 2 : 3)).forEach(function(event) {
    items.push({
      type: 'event',
      title: isTr ?event.name_tr : event.name_en,
      date: formatEventDateRange(event),
      branch: branchLabel(event.branch_id),
      seats: publicEventSeatText(event),
      badges: event.is_ongoing ? [isTr ? 'Devam ediyor' : 'Happening now'] : [],
      href: event.detail_path ? APP_URL + event.detail_path : 'events.html',
    });
  });

  if (!items.length && bloomLabPage) {
    items.push.apply(items, bloomLabFallbackItems(isTr));
  }

  if (!items.length && eventsPage) {
    container.innerHTML = '<div class="feed-empty">' + escapeHtml(isTr ?'Yayına alınmış etkinlikler yakında burada görünecek.' : 'Published events will appear here soon.') + '</div>';
    return;
  }

  if (!items.length) (data.workshops || []).slice(0, 3).forEach(function(workshop) {
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
  const tag = item.tag || (item.type === 'event'
    ?(gl === 'tr' ?'Etkinlik' : 'Event')
    : (gl === 'tr' ?'Atölye' : 'Workshop'));
  const cls = item.tagClass || (item.type === 'event' ?'coral' : '');
  const href = item.href || (item.type === 'event' ?'events.html' : 'workshops.html');
  const badges = Array.isArray(item.badges) && item.badges.length
    ? '<div class="fc-badges">' + item.badges.slice(0, 2).map(function(badge) {
        return '<span>' + escapeHtml(badge) + '</span>';
      }).join('') + '</div>'
    : '';
  const details = [item.seats, item.price].filter(Boolean).map(function(detail) {
    return '<span>' + escapeHtml(detail) + '</span>';
  }).join('');

  return '<a class="feed-card" href="' + href + '" style="text-decoration:none;color:inherit">' +
    '<span class="fc-tag ' + cls + '">' + escapeHtml(tag) + '</span>' +
    badges +
    '<h4>' + escapeHtml(item.title || '') + '</h4>' +
    '<div class="fc-meta">' + escapeHtml(item.date || '') + '</div>' +
    (details ? '<div class="fc-details">' + details + '</div>' : '') +
    '<div class="fc-branch">' + escapeHtml(gl === 'tr' ?'Şube: ' : 'Location: ') + escapeHtml(item.branch || '') + '</div>' +
    '</a>';
}

function publicSessionPriceText(session) {
  const price = Number(session.price_kurus);
  if (!Number.isFinite(price)) return gl === 'tr' ? 'Fiyat/talep bilgisi' : 'Price on request';
  if (price <= 0) return gl === 'tr' ? 'Ücretsiz veya dahil' : 'Free or included';
  return formatPrice(price);
}

function sessionSeatText(session) {
  const capacity = Number(session.capacity);
  const remaining = Number(session.remaining);
  if (!Number.isFinite(capacity) || capacity <= 0) return '';
  if (remaining <= 0) return gl === 'tr' ? 'Doldu' : 'Full';
  return gl === 'tr'
    ? remaining + '/' + capacity + ' yer'
    : remaining + '/' + capacity + ' seats';
}

function publicEventSeatText(event) {
  const capacity = Number(event.total_capacity);
  const remaining = Number(event.remaining_capacity);
  if (!Number.isFinite(capacity) || capacity <= 0 || event.remaining_capacity === null || event.remaining_capacity === undefined) return '';
  const suffix = event.is_multi_day
    ? (gl === 'tr' ? 'toplam yer' : 'total seats')
    : (gl === 'tr' ? 'yer' : 'seats');
  if (Number.isFinite(remaining) && remaining <= 0) return gl === 'tr' ? 'Toplam kapasite dolu' : 'Total capacity full';
  return gl === 'tr'
    ? remaining + '/' + capacity + ' ' + suffix
    : remaining + '/' + capacity + ' ' + suffix;
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

  renderMenuBranchFilters(items);

  if (!items.length) {
    container.innerHTML = '<p class="feed-empty">' + escapeHtml(gl === 'tr' ?'Menü yakında yayınlanacak.' : 'Menu highlights coming soon.') + '</p>';
    return;
  }

  const visibleItems = activeMenuBranch === 'all'
    ? items
    : items.filter(function(item) {
        return (item.branch_id || item.branchId || '') === activeMenuBranch;
      });

  if (!visibleItems.length) {
    container.innerHTML = '<p class="feed-empty">' + escapeHtml(gl === 'tr' ?'Bu şube için canlı ürün yakında yayınlanacak.' : 'Live items for this branch are coming soon.') + '</p>';
    return;
  }

  container.innerHTML = visibleItems.slice(0, 6).map(function(item) {
    const isTr = gl === 'tr';
    const name = isTr ? item.name_tr : item.name_en;
    const desc = isTr ? item.description_tr : item.description_en;
    const branchId = item.branch_id || item.branchId || '';
    const branchName = branchLabel(branchId);
    const branchScope = branchName
      ? (isTr ? branchName + ' şubesi' : branchName + ' branch')
      : (isTr ? 'Şubeye göre değişebilir' : 'May vary by branch');
    return '<div class="menu-card">' +
      '<div class="mc-top"><strong>' + escapeHtml(name || '') + '</strong><span>' + escapeHtml(formatPrice(item.price)) + '</span></div>' +
      '<div class="menu-branch">' + escapeHtml(branchScope) + '</div>' +
      (desc ?'<p>' + escapeHtml(desc) + '</p>' : '') +
    '</div>';
  }).join('');
}

function renderMenuBranchFilters(items) {
  const grid = document.getElementById('menu-highlights');
  if (!grid) return;

  let controls = document.getElementById('menu-branch-filters');
  if (!controls) {
    controls = document.createElement('div');
    controls.id = 'menu-branch-filters';
    controls.className = 'menu-branch-filter';
    grid.parentNode.insertBefore(controls, grid);
  }

  const counts = items.reduce(function(acc, item) {
    const branchId = item.branch_id || item.branchId || '';
    if (branchId) acc[branchId] = (acc[branchId] || 0) + 1;
    acc.all += 1;
    return acc;
  }, { all: 0 });

  const options = [
    { id: 'all', tr: 'Tüm şubeler', en: 'All branches' },
    { id: 'kadikoy', tr: 'Kadıköy', en: 'Kadıköy' },
    { id: 'kurtkoy', tr: 'Kurtköy', en: 'Kurtköy' },
  ];

  controls.innerHTML = options.map(function(option) {
    const count = counts[option.id] || 0;
    const disabled = option.id !== 'all' && count === 0;
    const active = activeMenuBranch === option.id;
    const label = gl === 'tr' ? option.tr : option.en;
    return '<button class="menu-branch-filter-button' + (active ? ' active' : '') + '" type="button" data-menu-branch="' + option.id + '"' + (disabled ? ' disabled' : '') + '>' +
      '<span>' + escapeHtml(label) + '</span>' +
      '<small>' + escapeHtml(String(count)) + '</small>' +
    '</button>';
  }).join('');

  controls.querySelectorAll('[data-menu-branch]').forEach(function(button) {
    button.addEventListener('click', function() {
      activeMenuBranch = button.getAttribute('data-menu-branch') || 'all';
      renderMenuHighlights(items);
    });
  });
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
    { name: isTr ? 'Esnek Aile Paketi' : 'Flex Family Pass', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Üye erişimi ve dönemsel avantajlar', 'Esnek rezervasyon ritmi', 'Haklar aylık sıfırlanır'] : ['Member access and seasonal advantages', 'Flexible booking rhythm', 'Benefits reset monthly'], icon: 'leaf', cta: isTr ? 'Flex ile Başla' : 'Start with Flex', featured: false, premium: false },
    { name: isTr ? 'Hafta Sonu Aile Paketi' : 'Weekend Family Pass', price: isTr ? 'Canlı detay' : 'Live details', features: isTr ? ['Hafta sonu aile ritmi', 'Uygunluk oldukça öncelikli rezervasyon', 'Kapasite ve şube kuralları geçerli'] : ['Weekend family rhythm', 'Priority booking where available', 'Capacity and branch rules apply'], icon: 'sun', cta: isTr ? 'Hafta Sonu' : 'Weekend', featured: false, premium: false },
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
    const portalCard = heroStack.querySelector('[data-hero-portal-card]') || heroStack.querySelector('.card:last-child');
    const branchCards = branches.map(function(b) {
      const dotCls = b.branch_id === 'kadikoy' ? 'd-sage' : 'd-gold';
      const badge = isTr ? b.badge_tr : b.badge_en;
      const desc = isTr ? b.description_tr : b.description_en;
      const district = publicBranchDistrict(b);
      const links = branchContactLinks(b.branch_id);

      return '<div class="card hero-branch-card">' +
        '<div class="badge"><span class="dot ' + dotCls + '"></span>' + escapeHtml(badge || '') + '</div>' +
        '<p style="font-size:.83rem;color:var(--mid);line-height:1.6">' +
          '<strong>' + (b.floor_area_sqm || 0) + 'm²</strong> — ' + escapeHtml(desc || '') +
        '</p>' +
        '<div class="micro-location">' + escapeHtml(district) + ', İstanbul</div>' +
        '<div class="btns" style="margin-top:10px">' +
          '<a class="btn ' + (b.branch_id === 'kurtkoy' ? 'btn-gold' : 'btn-p') + '" href="' + links.page + '">' + (isTr ? 'Şube sayfası →' : 'Branch guide →') + '</a>' +
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
      return '<div class="hours-card">' +
        '<h4>' + escapeHtml(isTr ? b.name_tr : b.name_en) + '</h4>' +
        branchHoursRowsHtml(b) +
        '<div class="visit-contact-line">E-mail: <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></div>' +
        '<div class="visit-contact-line"><span class="tr-only">Telefon:</span><span class="en-only">Phone:</span> <a href="tel:' + CONTACT_LINKS.phoneTel + '">' + CONTACT_LINKS.phoneDisplay + '</a></div>' +
        '<div class="visit-card-links">' +
          '<a href="' + links.page + '">' + (isTr ? 'Şube sayfası' : 'Branch guide') + '</a>' +
          '<a href="' + links.map + '" target="_blank" rel="noopener">Google Maps</a>' +
          '<a href="' + links.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
        '</div>' +
        branchNoticeHtml(b) +
      '</div>';
    }).join('');
  }

  document.querySelectorAll('[data-branch-hours-card]').forEach(function(card) {
    const branchId = card.getAttribute('data-branch-hours-card');
    const branch = branches.find(function(b) { return b.branch_id === branchId; });
    if (!branch) return;

    const rows = card.querySelector('[data-branch-hours-rows]');
    if (rows) rows.innerHTML = branchHoursRowsHtml(branch);

    const notice = card.querySelector('[data-branch-notice]');
    if (notice) {
      const text = branchNoticeText(branch);
      if (text) {
        notice.textContent = text;
        notice.hidden = false;
      } else {
        notice.hidden = true;
      }
    }
  });
}

const BRANCH_WEEK_DAYS = [
  { day: 'monday', tr: 'Pazartesi', en: 'Monday' },
  { day: 'tuesday', tr: 'Salı', en: 'Tuesday' },
  { day: 'wednesday', tr: 'Çarşamba', en: 'Wednesday' },
  { day: 'thursday', tr: 'Perşembe', en: 'Thursday' },
  { day: 'friday', tr: 'Cuma', en: 'Friday' },
  { day: 'saturday', tr: 'Cumartesi', en: 'Saturday' },
  { day: 'sunday', tr: 'Pazar', en: 'Sunday' },
];

function fallbackWeeklyHours(branchId) {
  const hours = branchId === 'kadikoy'
    ? [['09:00', '20:00'], ['09:00', '20:00'], ['09:00', '20:00'], ['09:00', '20:00'], ['09:00', '20:00'], ['09:00', '21:00'], ['10:00', '19:00']]
    : [['09:00', '19:00'], ['09:00', '19:00'], ['09:00', '19:00'], ['09:00', '19:00'], ['09:00', '19:00'], ['09:00', '20:00'], ['10:00', '18:00']];

  return BRANCH_WEEK_DAYS.map(function(day, index) {
    return { day: day.day, is_open: true, opens: hours[index][0], closes: hours[index][1] };
  });
}

function normalizeBranchWeeklyHours(branch) {
  const raw = Array.isArray(branch.weekly_hours) && branch.weekly_hours.length
    ? branch.weekly_hours
    : fallbackWeeklyHours(branch.branch_id);
  const byDay = raw.reduce(function(acc, row) {
    if (row && row.day) acc[row.day] = row;
    return acc;
  }, {});

  return BRANCH_WEEK_DAYS.map(function(day) {
    const row = byDay[day.day] || {};
    const isOpen = row.is_open !== false;
    return {
      day: day.day,
      labelTr: day.tr,
      labelEn: day.en,
      is_open: isOpen,
      opens: isOpen ? shortTime(row.opens || branch.opening_time || '09:00') : '',
      closes: isOpen ? shortTime(row.closes || branch.closing_time || '19:00') : '',
    };
  });
}

function branchHoursRowsHtml(branch) {
  const rows = normalizeBranchWeeklyHours(branch);
  const grouped = [];
  rows.forEach(function(row) {
    const key = row.is_open ? row.opens + '-' + row.closes : 'closed';
    const previous = grouped[grouped.length - 1];
    if (previous && previous.key === key) {
      previous.rows.push(row);
    } else {
      grouped.push({ key: key, rows: [row], is_open: row.is_open, opens: row.opens, closes: row.closes });
    }
  });

  return grouped.map(function(group) {
    const dayLabel = dayRangeLabel(group.rows);
    const timeLabel = group.is_open
      ? escapeHtml(group.opens + ' — ' + group.closes)
      : escapeHtml(gl === 'tr' ? 'Kapalı' : 'Closed');
    return '<div class="hours-row"><span class="day">' + escapeHtml(dayLabel) + '</span><span class="time">' + timeLabel + '</span></div>';
  }).join('');
}

function dayRangeLabel(rows) {
  if (!rows.length) return '';
  if (rows.length === 1) return gl === 'tr' ? rows[0].labelTr : rows[0].labelEn;

  const first = rows[0];
  const last = rows[rows.length - 1];
  if (first.day === 'monday' && last.day === 'friday' && rows.length === 5) {
    return gl === 'tr' ? 'Pazartesi — Cuma' : 'Monday — Friday';
  }
  if (first.day === 'saturday' && last.day === 'sunday' && rows.length === 2) {
    return gl === 'tr' ? 'Hafta sonu' : 'Weekend';
  }
  return (gl === 'tr' ? first.labelTr + ' — ' + last.labelTr : first.labelEn + ' — ' + last.labelEn);
}

function branchNoticeText(branch) {
  return (gl === 'tr' ? branch.public_notice_tr : branch.public_notice_en) ||
    branch.public_notice_tr ||
    branch.public_notice_en ||
    '';
}

function branchNoticeHtml(branch) {
  const text = branchNoticeText(branch);
  return text ? '<div class="branch-hours-notice">' + escapeHtml(text) + '</div>' : '';
}

function shortTime(value) {
  return String(value || '').slice(0, 5) || '09:00';
}

function publicBranchDistrict(branch) {
  if (!branch) return '';
  if (branch.branch_id === 'kadikoy') return 'Fikirtepe, Kadıköy';
  if (branch.branch_id === 'kurtkoy') return 'Kurtköy, Pendik';
  return branch.address_district || '';
}

function branchContactLinks(branchId) {
  if (branchId === 'kadikoy') {
    return {
      page: 'kadikoy.html',
      instagram: CONTACT_LINKS.instagramKadikoy,
      map: CONTACT_LINKS.mapKadikoy,
    };
  }
  if (branchId === 'kurtkoy') {
    return {
      page: 'kurtkoy.html',
      instagram: CONTACT_LINKS.instagramKurtkoy,
      map: CONTACT_LINKS.mapKurtkoy,
    };
  }
  return {
    page: 'contact.html',
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

function formatEventDateRange(event) {
  if (!event || !event.starts_at) return '';
  if (!event.ends_at || istanbulDateKey(event.starts_at) === istanbulDateKey(event.ends_at)) {
    return formatDate(event.starts_at);
  }
  return formatShortDate(event.starts_at) + ' - ' + formatShortDate(event.ends_at);
}

function formatShortDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(gl === 'tr' ? 'tr-TR' : 'en-GB', {
      timeZone: 'Europe/Istanbul',
      day: 'numeric',
      month: 'short',
    });
  } catch (error) {
    return iso || '';
  }
}

function istanbulDateKey(iso) {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Istanbul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(iso));
  } catch (error) {
    return iso || '';
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
