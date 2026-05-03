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

  renderFeedLabels();
}

function gt() {
  ga(gl === 'tr' ? 'en' : 'tr');
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    const savedLang = localStorage.getItem('gb_lang');
    if (savedLang === 'en') ga('en');
  } catch (error) {}

  const year = document.getElementById('yr');
  if (year) year.textContent = String(new Date().getFullYear());

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

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navClose = document.getElementById('mobileNavClose');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      mobileNav.classList.add('open');
    });

    if (navClose) {
      navClose.addEventListener('click', function() {
        mobileNav.classList.remove('open');
      });
    }

    mobileNav.addEventListener('click', function(event) {
      if (event.target === mobileNav) mobileNav.classList.remove('open');
    });
  }

  if (document.getElementById('dynamic-feed')) loadDynamicFeed();
});

async function loadDynamicFeed() {
  const container = document.getElementById('dynamic-feed');
  if (!container) return;

  container.innerHTML = '<div class="feed-loading"><div class="feed-spinner"></div><span>' + (gl === 'tr' ? 'Yükleniyor...' : 'Loading...') + '</span></div>';

  try {
    const res = await fetch(APP_URL + '/api/public/upcoming', {
      mode: 'cors',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('API ' + res.status);

    feedData = await res.json();
    renderFeed(container, feedData);
  } catch (error) {
    feedData = null;
    renderFeedFallback(container);
  }
}

function renderFeed(container, data) {
  const isTr = gl === 'tr';
  const items = [];

  if (data.events && data.events.length) {
    data.events.slice(0, 3).forEach(function(event) {
      items.push({
        type: 'event',
        title: isTr ? event.name_tr : event.name_en,
        date: formatDate(event.starts_at),
        branch: branchLabel(event.branch_id),
      });
    });
  }

  if (data.workshops && data.workshops.length) {
    data.workshops.slice(0, 3).forEach(function(workshop) {
      items.push({
        type: 'workshop',
        title: isTr ? workshop.name_tr : workshop.name_en,
        date: formatDate(workshop.starts_at),
        branch: branchLabel(workshop.branch_id),
      });
    });
  }

  if (!items.length) {
    renderFeedFallback(container);
    return;
  }

  container.innerHTML = items.map(renderFeedCard).join('');
}

function renderFeedFallback(container) {
  const isTr = gl === 'tr';
  const fallbackItems = [
    {
      type: 'workshop',
      title: isTr ? 'STEM Keşif Serisi - Bahar Dönemi' : 'STEM Discovery Series - Spring Term',
      date: isTr ? 'Pazartesi ve Çarşamba' : 'Mondays and Wednesdays',
      branch: 'Kadıköy',
    },
    {
      type: 'workshop',
      title: isTr ? 'Ebeveyn Ustalık Sınıfı' : 'Parenting Masterclass',
      date: isTr ? 'Cumartesi sabahları' : 'Saturday mornings',
      branch: 'Kadıköy',
    },
    {
      type: 'event',
      title: isTr ? 'Yazar Buluşması - Aylık' : 'Author Meetup - Monthly',
      date: isTr ? 'Her ayın son Cuma günü' : 'Last Friday each month',
      branch: 'Kurtköy',
    },
  ];

  container.innerHTML = fallbackItems.map(renderFeedCard).join('');
}

function renderFeedCard(item) {
  const tag = item.type === 'event'
    ? (gl === 'tr' ? 'Etkinlik' : 'Event')
    : (gl === 'tr' ? 'Atolye' : 'Workshop');
  const cls = item.type === 'event' ? 'coral' : '';
  const href = item.type === 'event' ? 'events.html' : 'workshops.html';

  return '<a class="feed-card" href="' + href + '" style="text-decoration:none;color:inherit">' +
    '<span class="fc-tag ' + cls + '">' + escapeHtml(tag) + '</span>' +
    '<h4>' + escapeHtml(item.title || '') + '</h4>' +
    '<div class="fc-meta">' + escapeHtml(item.date || '') + '</div>' +
    '<div class="fc-branch">Location: ' + escapeHtml(item.branch || '') + '</div>' +
    '</a>';
}

function renderFeedLabels() {
  const container = document.getElementById('dynamic-feed');
  if (!container) return;
  if (feedData) renderFeed(container, feedData);
  else renderFeedFallback(container);
}

function branchLabel(branchId) {
  if (branchId === 'kadikoy') return 'Kadıköy';
  if (branchId === 'kurtkoy') return 'Kurtköy';
  return branchId || '';
}

function formatDate(iso) {
  if (!iso) return '';

  try {
    const date = new Date(iso);
    return date.toLocaleDateString(gl === 'tr' ? 'tr-TR' : 'en-GB', {
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
