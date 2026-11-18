/* Arefi ITPraxis – Projektmappen-Ansicht: Projekte mit Dokumenten nach DIN-69901-Phasen, Muster/Vorlage, Druck. */
(() => {
'use strict';
const L = () => (window.ServerLabApp && window.ServerLabApp.locale ? window.ServerLabApp.locale() : (document.documentElement.lang || 'de'));
const I = () => ({ fa: 0, de: 1, en: 2 }[L()] ?? 1);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => L() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(n);
const KEY = 'arefi-proj';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };

const PH = [
  ['init', ['مرحلهٔ ۱: آغاز (Initialisierung)', 'Phase 1: Initialisierung', 'Phase 1: Initiation']],
  ['def', ['مرحلهٔ ۲: تعریف (Definition)', 'Phase 2: Definition', 'Phase 2: Definition']],
  ['plan', ['مرحلهٔ ۳: برنامه‌ریزی (Planung)', 'Phase 3: Planung', 'Phase 3: Planning']],
  ['steu', ['مرحلهٔ ۴: کنترل و اجرا (Steuerung)', 'Phase 4: Steuerung', 'Phase 4: Control']],
  ['abs', ['مرحلهٔ ۵: پایان (Abschluss)', 'Phase 5: Abschluss', 'Phase 5: Closure']],
  ['ihk', ['آزمون IHK: پروژهٔ عملی', 'IHK-Prüfung: betriebliche Projektarbeit', 'IHK exam: company project']]
];
const TX = {
  fa: { folder: 'پوشهٔ پروژه', docs: 'سندها', facts: 'مشخصات پروژه', sample: 'نمونهٔ کامل', tpl: 'قالب خالی برای تمرین', printDoc: 'چاپ یا PDF این سند', printAll: 'چاپ کل پوشه', why: 'این سند چرا لازم است و به چه دقت کنی؟', done: 'این سند را کامل خواندم و فهمیدم', prev: 'سند قبلی', next: 'سند بعدی', back: 'بازگشت به دوره', of: 'از', read: 'سند خوانده شد', lang: 'سندهای پروژه مثل کار واقعی و آزمون IHK به آلمانی‌اند؛ توضیح‌ها به زبان برنامه.', pw: 'PW = مقدار برنامه‌ریزی/تخمین برای تمرین؛ در پروژهٔ واقعی با پیشنهاد قیمت جایگزین شود. R = قیمت جست‌وجوشده با تاریخ و منبع.', fill: 'اینجا خودت بنویس …', draw: 'نقشهٔ شبکه را اینجا بکش (مثلاً با draw.io) و ضمیمه کن.', sources: 'منابع', overview: 'فهرست سندها' },
  de: { folder: 'Projektmappe', docs: 'Dokumente', facts: 'Projektdaten', sample: 'Musterlösung', tpl: 'Vorlage zum Ausfüllen', printDoc: 'Dokument drucken / als PDF', printAll: 'Ganze Mappe drucken', why: 'Wozu dient dieses Dokument und worauf achtest du?', done: 'Dokument durchgearbeitet und verstanden', prev: 'Vorheriges Dokument', next: 'Nächstes Dokument', back: 'Zurück zur Lernstrecke', of: 'von', read: 'Dokumenten durchgearbeitet', lang: 'Projektunterlagen sind wie im Berufsalltag und in der IHK-Prüfung auf Deutsch; Erklärungen in der App-Sprache.', pw: 'PW = Planwert/Schätzung für die Übung – im echten Projekt durch Angebote ersetzen. R = recherchierter Richtpreis mit Datum und Quelle.', fill: 'Hier eigenen Text eintragen …', draw: 'Netzplan hier zeichnen (z. B. mit draw.io) und beilegen.', sources: 'Quellen', overview: 'Dokumentenübersicht' },
  en: { folder: 'Project folder', docs: 'Documents', facts: 'Project data', sample: 'Model solution', tpl: 'Blank template', printDoc: 'Print / save this document as PDF', printAll: 'Print whole folder', why: 'What is this document for and what should you watch?', done: 'I have worked through and understood this document', prev: 'Previous document', next: 'Next document', back: 'Back to course', of: 'of', read: 'documents worked through', lang: 'Project documents are in German, as in real work and the IHK exam; explanations follow the app language.', pw: 'PW = planning value/estimate for the exercise – replace with real quotes in a real project. R = researched reference price with date and source.', fill: 'Write your own text here …', draw: 'Draw the network plan here (e.g. with draw.io) and attach it.', sources: 'Sources', overview: 'Document overview' }
};
const T = () => TX[L()] || TX.de;

const NUM = /^[−+≈-]?\s?[\d.]+(,\d+)?\s?(€|%|h|W|AT|TB|Mbit\/s)?$/, SUM = /^(Summe|Nutzwert$)/;
/* Blöcke: {h} {p} {ul} {ol} {t:[kopf], r:[[...]], keep:n (Vorlage behält n Spalten), cap} {kv:[[k,v]]} {topo} {note} {pre} {sig:[rolle,...]} */
function block(b, tpl, title) {
  const t = T();
  if (b.h) return `<h3>${esc(b.h)}</h3>`;
  if (b.note) return `<p class="pv-note">${esc(b.note)}</p>`;
  if (b.p) return tpl ? `<p class="pv-fill">${esc(t.fill)}</p>` : `<p>${esc(b.p)}</p>`;
  if (b.ul || b.ol) {
    const tag = b.ul ? 'ul' : 'ol', items = b.ul || b.ol;
    return `<${tag}>${(tpl ? ['', '', ''] : items).map(x => `<li>${tpl ? '<span class="pv-line"></span>' : esc(x)}</li>`).join('')}</${tag}>`;
  }
  if (b.kv) return `<table class="pv-tab pv-kv"><tbody>${b.kv.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${tpl ? '' : esc(v)}</td></tr>`).join('')}</tbody></table>`;
  if (b.t) {
    const kc = b.keep | 0, rows = tpl ? (kc ? b.r.map(r => r.map((c, j) => j < kc ? c : '')) : Array.from({ length: Math.max(3, Math.min(b.r.length, 8)) }, () => b.t.map(() => ''))) : b.r;
    return `<div class="pv-scroll"><table class="pv-tab">${b.cap ? `<caption>${esc(b.cap)}</caption>` : ''}<thead><tr>${b.t.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr${r.some(c => SUM.test(c)) ? ' class="pv-sum"' : ''}>${r.map(c => `<td${NUM.test(c) ? ' class="pv-n"' : ''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  if (b.topo) return tpl ? `<div class="pv-draw">${esc(t.draw)}</div>` : `<figure class="pv-topo">${window.ArefiTopo ? window.ArefiTopo.svg(b.topo, title) : ''}</figure>`;
  if (b.pre) return tpl ? `<p class="pv-fill">${esc(t.fill)}</p>` : `<pre class="pv-pre" dir="ltr"><code>${esc(b.pre)}</code></pre>`;
  if (b.sig) return `<div class="pv-sig">${b.sig.map(r => `<div><span></span><small>${esc(r)}</small></div>`).join('')}</div>`;
  return '';
}
function docBody(P, d, tpl) {
  return `<article class="pv-paper" lang="de" dir="ltr"><header class="pv-paperhead"><span>${esc(P.client)}</span><span>${esc(P.code)} · ${esc(d.no)}</span></header><h2>${esc(d.title)}</h2>${d.body.map(b => block(b, tpl, d.title)).join('')}${!tpl && d.src ? `<p class="pv-src"><b>${esc(T().sources)}:</b> ${d.src.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(n)}</a>`).join(' · ')}</p>` : ''}</article>`;
}
function numbered(P) { let k = 0; P.docs.forEach(d => { k += 1; d.no = 'D' + String(k).padStart(2, '0'); }); }

function view(P, cfg, docId) {
  numbered(P);
  const t = T(), i = I(), st = load()[P.id] || {}, tpl = !!st.tpl, done = st.d || {};
  const cnt = P.docs.filter(d => done[d.id]).length;
  const k = Math.max(0, P.docs.findIndex(d => d.id === docId));
  const d = P.docs[k], prev = P.docs[k - 1], next = P.docs[k + 1];
  const href = x => `#${cfg.hash}/${P.id}--${x.id}`;
  const nav = PH.map(([ph, lab]) => {
    const ds = P.docs.filter(x => x.ph === ph);
    if (!ds.length) return '';
    return `<li><b>${esc(lab[i])}</b><ol>${ds.map(x => `<li><a href="${href(x)}"${x === d ? ' aria-current="page"' : ''}>${done[x.id] ? '✓ ' : ''}${esc(x.t[i])}</a></li>`).join('')}</ol></li>`;
  }).join('');
  return `<div class="wsc pv" data-pv="${esc(P.id)}" data-doc="${esc(d.id)}">
<p class="wsc-crumb"><a href="#${cfg.hash}">${esc(t.back)}</a> / ${esc(t.folder)}</p>
<header class="wsc-head pv-head"><h1>${esc(P.title[i])}</h1><p>${esc(P.lead[i])}</p>
<table class="pv-tab pv-facts"><caption>${esc(t.facts)}</caption><tbody>${P.facts.map(f => `<tr><th scope="row">${esc(f[0][i])}</th><td dir="ltr" lang="de">${esc(f[1])}</td></tr>`).join('')}</tbody></table>
<div class="pv-tools"><div class="pv-seg" role="group"><button type="button" data-pv-mode="0" aria-pressed="${!tpl}">${esc(t.sample)}</button><button type="button" data-pv-mode="1" aria-pressed="${tpl}">${esc(t.tpl)}</button></div><button type="button" class="btn secondary" data-pv-print="doc">${esc(t.printDoc)}</button><button type="button" class="btn secondary" data-pv-print="all">${esc(t.printAll)}</button></div>
<p class="micro">${num(cnt)} ${esc(t.of)} ${num(P.docs.length)} ${esc(t.read)} · ${esc(t.lang)}</p></header>
<div class="pv-grid"><nav class="pv-nav" aria-label="${esc(t.overview)}"><ol>${nav}</ol></nav>
<div class="pv-main"><section class="pv-why"><h2>${esc(t.why)}</h2><p>${esc(d.why[i])}</p><p class="micro"><bdi dir="ltr">${esc(d.no)}</bdi> · <bdi>${esc(PH.find(p => p[0] === d.ph)[1][i])}</bdi></p></section>
${d.cost ? `<p class="pv-note pv-pw">${esc(t.pw)}</p>` : ''}
<div id="pv-doc">${docBody(P, d, tpl)}</div>
<label class="pv-done"><input type="checkbox" data-pv-done ${done[d.id] ? 'checked' : ''}> ${esc(t.done)}</label>
<nav class="wsc-nav">${prev ? `<a class="btn secondary" href="${href(prev)}">${L() === 'fa' ? '→' : '←'} ${esc(t.prev)}</a>` : '<span></span>'}${next ? `<a class="btn" href="${href(next)}">${esc(t.next)} ${L() === 'fa' ? '←' : '→'}</a>` : ''}</nav></div></div></div>`;
}

function printHtml(html) {
  let box = document.getElementById('pv-print');
  if (!box) { box = document.createElement('div'); box.id = 'pv-print'; document.body.appendChild(box); }
  box.innerHTML = html;
  document.body.classList.add('pv-printing');
  const done = () => { document.body.classList.remove('pv-printing'); box.innerHTML = ''; window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  window.print();
}
function mount(P) {
  const root = document.querySelector('.pv[data-pv]');
  if (!root || root.dataset.pv !== P.id) return;
  const docId = root.dataset.doc;
  const upd = fn => { const all = load(); const cur = all[P.id] || {}; fn(cur); all[P.id] = cur; save(all); };
  root.addEventListener('click', e => {
    const m = e.target.closest('[data-pv-mode]');
    if (m) { upd(c => { c.tpl = m.dataset.pvMode === '1'; }); window.dispatchEvent(new HashChangeEvent('hashchange')); return; }
    const pr = e.target.closest('[data-pv-print]');
    if (pr) {
      const tpl = !!(load()[P.id] || {}).tpl;
      numbered(P);
      const list = pr.dataset.pvPrint === 'all' ? P.docs : P.docs.filter(d => d.id === docId);
      printHtml(list.map(d => docBody(P, d, tpl)).join(''));
    }
  });
  root.addEventListener('change', e => {
    if (!e.target.matches('[data-pv-done]')) return;
    upd(c => { c.d = c.d || {}; c.d[docId] = e.target.checked; });
  });
}
const stats = P => { const d = (load()[P.id] || {}).d || {}; return { done: P.docs.filter(x => d[x.id]).length, total: P.docs.length }; };
window.ArefiProjectView = { view, mount, stats };
})();
