/* Arefi ITPraxis – Suche über alle Lernstrecken (Strg+K oder /) und Umschalter hell/dunkel. */
(() => {
'use strict';
const lang = () => document.documentElement.lang || 'fa';
const I = () => ({ fa: 0, de: 1, en: 2 }[lang()] ?? 0);
const T = k => ({
  search: ['جست‌وجو', 'Suchen', 'Search'],
  ph: ['جست‌وجو در همهٔ دوره‌ها: فرمان، موضوع، پیام خطا…', 'Alle Lernstrecken durchsuchen: Befehl, Thema, Fehlermeldung …', 'Search all courses: command, topic, error message…'],
  none: ['نتیجه‌ای پیدا نشد. واژهٔ کوتاه‌تر یا نام فرمان را امتحان کن.', 'Nichts gefunden. Probiere ein kürzeres Wort oder einen Befehlsnamen.', 'No results. Try a shorter word or a command name.'],
  hint: ['دست‌کم ۲ حرف بنویس. ↑↓ برای حرکت، Enter برای باز کردن، Esc برای بستن.', 'Mindestens 2 Zeichen. ↑↓ wählen, Enter öffnen, Esc schließen.', 'At least 2 characters. ↑↓ to move, Enter to open, Esc to close.'],
  close: ['بستن', 'Schließen', 'Close'],
  dark: ['حالت تیره', 'Dunkles Design', 'Dark mode'],
  light: ['حالت روشن', 'Helles Design', 'Light mode'],
  hits: ['نتیجه', 'Treffer', 'results']
})[k][I()];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ').replace(/[ًٌٍَُِّْ]/g, '');

// Index je Sprache, einmal aufgebaut
const cache = {};
const sources = () => {
  const out = [];
  if (window.ArefiWSCourse) out.push(['wscourse', window.ArefiWSCourse]);
  if (window.ArefiLXCourse) out.push(['lxcourse', window.ArefiLXCourse]);
  Object.keys(window).filter(k => /^ArefiK[A-Z]/.test(k) && window[k] && Array.isArray(window[k].modules)).forEach(k => out.push(['k-' + k.slice(6).toLowerCase(), window[k]]));
  return out;
};
const index = () => {
  const i = I(); if (cache[i]) return cache[i];
  const titles = {}; (window.ArefiCourseHub && window.ArefiCourseHub.courses ? window.ArefiCourseHub.courses() : []).forEach(c => { titles[c.hash] = c.title[i]; });
  const list = [];
  sources().forEach(([hash, C]) => C.modules.forEach(m => {
    const pick = x => Array.isArray(x) ? x[i] : '';
    const parts = [
      [pick(m.title), 6], [pick(m.goal), 2],
      [(m.know || []).map(pick).join(' \n '), 1],
      [m.lab ? m.lab.code : '', 3],
      [(m.trouble || []).map(t => pick(t[0]) + ' ' + pick(t[1])).join(' \n '), 2],
      [(m.decide || []).map(t => pick(t[0]) + ' ' + pick(t[1])).join(' \n '), 1],
      [(m.iv || []).map(t => pick(t[0]) + ' ' + pick(t[1])).join(' \n '), 1]
    ];
    list.push({ hash: hash + '/' + m.id, title: pick(m.title), course: titles[hash] || hash, parts: parts.map(([t, w]) => [t, norm(t), w]) });
  }));
  return (cache[i] = list);
};
const search = q => {
  const terms = norm(q).split(/\s+/).filter(t => t.length > 1);
  if (!terms.length) return [];
  const res = [];
  index().forEach(e => {
    let score = 0, ok = true, snip = null;
    for (const t of terms) {
      let hit = false;
      e.parts.forEach(([raw, n, w], k) => {
        const p = n.indexOf(t);
        if (p >= 0) { hit = true; score += w * (k === 0 ? 3 : 1); if (!snip && k > 0) snip = [raw, p, t.length]; }
      });
      if (!hit) { ok = false; break; }
    }
    if (ok) res.push({ e, score, snip });
  });
  return res.sort((a, b) => b.score - a.score).slice(0, 40);
};
const snippet = s => {
  if (!s) return '';
  const [raw, p, len] = s; const a = Math.max(0, p - 60), b = Math.min(raw.length, p + len + 80);
  return (a ? '… ' : '') + esc(raw.slice(a, p)) + '<mark>' + esc(raw.slice(p, p + len)) + '</mark>' + esc(raw.slice(p + len, b)) + (b < raw.length ? ' …' : '');
};

// Dialog
let dlg, input, out, count;
const build = () => {
  dlg = document.createElement('dialog'); dlg.className = 'ax-search';
  dlg.innerHTML = `<form method="dialog" class="ax-s-head"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg><input type="search" autocomplete="off" spellcheck="false"><button class="ax-s-close" value="close" type="submit"></button></form><p class="ax-s-hint"></p><p class="ax-s-count" role="status" aria-live="polite"></p><ol class="ax-s-list"></ol>`;
  document.body.appendChild(dlg);
  input = dlg.querySelector('input'); out = dlg.querySelector('.ax-s-list'); count = dlg.querySelector('.ax-s-count');
  input.addEventListener('input', run);
  dlg.addEventListener('keydown', e => {
    const links = [...out.querySelectorAll('a')]; const k = links.indexOf(document.activeElement);
    if (e.key === 'Escape') { e.preventDefault(); dlg.close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); (links[k + 1] || links[0])?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (k <= 0) input.focus(); else links[k - 1].focus(); }
    else if (e.key === 'Enter' && document.activeElement === input) { e.preventDefault(); links[0]?.click(); }
  });
  out.addEventListener('click', e => { if (e.target.closest('a')) dlg.close(); });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
};
const run = () => {
  const q = input.value.trim();
  if (q.length < 2) { out.innerHTML = ''; count.textContent = ''; return; }
  const r = search(q);
  count.textContent = r.length ? `${r.length} ${T('hits')}` : T('none');
  out.innerHTML = r.map(({ e, snip }) => `<li><a href="#${esc(e.hash)}"><b>${esc(e.title)}</b><small>${esc(e.course)}</small>${snip ? `<span>${snippet(snip)}</span>` : ''}</a></li>`).join('');
};
const open = () => {
  if (!dlg) build();
  dlg.setAttribute('dir', lang() === 'fa' ? 'rtl' : 'ltr'); dlg.setAttribute('lang', lang());
  input.placeholder = T('ph'); input.setAttribute('aria-label', T('search'));
  dlg.querySelector('.ax-s-close').textContent = T('close'); dlg.querySelector('.ax-s-hint').textContent = T('hint');
  if (!dlg.open) dlg.showModal(); input.select(); run();
};

// Werkzeuge in der Kopfzeile
const setTheme = th => { document.documentElement.setAttribute('data-theme', th); try { localStorage.setItem('arefi-theme', th); } catch {} label(); };
let tools;
const label = () => {
  if (!tools) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const sb = tools.querySelector('.ax-t-search'), tb = tools.querySelector('.ax-t-theme');
  sb.querySelector('span').textContent = T('search'); sb.title = T('search') + ' (Ctrl+K)';
  tb.setAttribute('aria-pressed', String(dark)); tb.title = dark ? T('light') : T('dark'); tb.setAttribute('aria-label', tb.title);
};
const mount = () => {
  const bar = document.querySelector('.topbar'); if (!bar || bar.querySelector('.ax-tools')) return;
  tools = document.createElement('div'); tools.className = 'ax-tools';
  tools.innerHTML = `<button type="button" class="ax-t-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg><span></span><kbd>Ctrl K</kbd></button><button type="button" class="ax-t-theme"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="ax-moon" d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/><g class="ax-sun"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></g></svg></button>`;
  bar.appendChild(tools);
  tools.querySelector('.ax-t-search').addEventListener('click', open);
  tools.querySelector('.ax-t-theme').addEventListener('click', () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
  label();
  new MutationObserver(() => { label(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
};
addEventListener('keydown', e => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '') || (e.target && e.target.isContentEditable);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
  else if (e.key === '/' && !typing) { e.preventDefault(); open(); }
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
window.ArefiSearch = { open, search, setTheme };
})();
