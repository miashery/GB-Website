// ── Config ────────────────────────────────────────────────────────────────
const APP_URL = 'https://giggles-bloom.vercel.app';
let gl = 'tr';

// ── Language ──────────────────────────────────────────────────────────────
function ga(l) {
  gl = l;
  document.documentElement.setAttribute('lang', gl);
  const s = document.getElementById('ls');
  if (s) s.classList.toggle('en', gl === 'en');
  try { localStorage.setItem('gb_lang', gl) } catch(e) {}
  renderFeedLabels();
}
function gt() { ga(gl === 'tr' ? 'en' : 'tr') }

document.addEventListener('DOMContentLoaded', function() {
  try { const s = localStorage.getItem('gb_lang'); if (s === 'en') ga('en') } catch(e) {}
  const y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll('.btn-login').forEach(function(el) {
    el.addEventListener('click', function() { window.open(APP_URL + '/auth/signin', '_blank', 'noopener'); });
  });
  document.querySelectorAll('.btn-join').forEach(function(el) {
    el.addEventListener('click', function() { window.open(APP_URL + '/auth/signup', '_blank', 'noopener'); });
  });
  document.querySelectorAll('[data-tier-cta]').forEach(function(el) {
    el.href = APP_URL + '/auth/signup'; el.target = '_blank'; el.rel = 'noopener';
  });

  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.fi').forEach(function(el) { obs.observe(el); });

  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  const navClose   = document.getElementById('mobileNavClose');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() { mobileNav.classList.add('open'); });
    if (navClose) navClose.addEventListener('click', function() { mobileNav.classList.remove('open'); });
    mobileNav.addEventListener('click', function(e) { if (e.target === mobileNav) mobileNav.classList.remove('open'); });
  }

  if (document.getElementById('dynamic-feed')) loadDynamicFeed();
});

// ── Dynamic Feed ──────────────────────────────────────────────────────────
let _feedData = null;

async function loadDynamicFeed() {
  const container = document.getElementById('dynamic-feed');
  if (!container) return;
  container.innerHTML = '<div class="feed-loading"><div class="feed-spinner"></div><span>' + (gl==='tr' ? 'Yükleniyor…' : 'Loading…') + '</span></div>';
  try {
    const res = await fetch(APP_URL + '/api/public/upcoming', { mode: 'cors', headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    _feedData = data;
    renderFeed(container, data);
  } catch(err) {
    _feedData = null;
    renderFeedFallback(container);
  }
}

function renderFeed(container, data) {
  const isTr = gl === 'tr';
  const items = [];
  if (data.events && data.events.length) {
    data.events.slice(0,3).forEach(function(ev) {
      items.push({ type:'event', title: isTr ? ev.name_tr : ev.name_en, date: formatDate(ev.starts_at), branch: ev.branch_id==='kadikoy'?'Kadıköy':'Kurtköy' });
    });
  }
  if (data.workshops && data.workshops.length) {
    data.workshops.slice(0,3).forEach(function(ws) {
      items.push({ type:'workshop', title: isTr ? ws.name_tr : ws.name_en, date: formatDate(ws.starts_at), branch: ws.branch_id==='kadikoy'?'Kadıköy':'Kurtköy' });
    });
  }
  if (!items.length) { renderFeedFallback(container); return; }
  container.innerHTML = items.map(function(item) {
    const tag = item.type==='event' ? (gl==='tr'?'Etkinlik':'Event') : (gl==='tr'?'Atölye':'Workshop');
    const cls = item.type==='event' ? 'coral' : '';
    return '<a class="feed-card" href="' + (item.type==='event'?'events.html':'workshops.html') + '" style="text-decoration:none;color:inherit">' +
      '<span class="fc-tag ' + cls + '">' + tag + '</span>' +
      '<h4>' + item.title + '</h4>' +
      '<div class="fc-meta">' + item.date + '</div>' +
      '<div class="fc-branch">📍 ' + item.branch + '</div>' +
      '</a>';
  }).join('');
}

function renderFeedFallback(container) {
  const isTr = gl === 'tr';
  const p = [
    { type:'workshop', titleTr:'STEM Keşif Serisi — Bahar Dönemi', titleEn:'STEM Discovery Series — Spring Term', metaTr:'Pazartesi & Çarşamba', metaEn:'Mondays & Wednesdays', branch:'Kadıköy' },
    { type:'workshop', titleTr:'Ebeveyn Ustalık Sınıfı', titleEn:'Parenting Masterclass', metaTr:'Cumartesi sabahları', metaEn:'Saturday mornings', branch:'Kadıköy' },
    { type:'event', titleTr:'Yazar Buluşması — Aylık', titleEn:'Author Meetup — Monthly', metaTr:'Her ayın son Cuma', metaEn:'Last Friday each month', branch:'Kurtköy' },
  ];
  container.innerHTML = p.map(function(item) {
    const tag = item.type==='event'?(isTr?'Etkinlik':'Event'):(isTr?'Atölye':'Workshop');
    const cls = item.type==='event'?'coral':'';
    return '<a class="feed-card" href="' + (item.type==='event'?'events.html':'workshops.html') + '" style="text-decoration:none;color:inherit">' +
      '<span class="fc-tag ' + cls + '">' + tag + '</span>' +
      '<h4>' + (isTr?item.titleTr:item.titleEn) + '</h4>' +
      '<div class="fc-meta">' + (isTr?item.metaTr:item.metaEn) + '</div>' +
      '<div class="fc-branch">📍 ' + item.branch + '</div>' +
      '</a>';
  }).join('');
}

function renderFeedLabels() {
  const container = document.getElementById('dynamic-feed');
  if (!container) return;
  if (_feedData) renderFeed(container, _feedData);
  else renderFeedFallback(container);
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(gl==='tr'?'tr-TR':'en-GB', { day:'numeric', month:'long', weekday:'short', hour:'2-digit', minute:'2-digit' });
  } catch(e) { return iso }
}
