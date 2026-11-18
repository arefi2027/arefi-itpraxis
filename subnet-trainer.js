/* Arefi ITPraxis – interaktiver Subnetting-Trainer (IPv4). Unbegrenzte Aufgaben, sofortige Prüfung, Lösungsweg. */
(() => {
'use strict';
const KEY = 'arefi-subnet';
const L = () => (window.ServerLabApp ? window.ServerLabApp.locale() : 'fa');
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => L() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(n);
const ip = s => `<bdi dir="ltr" class="sn-ip">${esc(s)}</bdi>`;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };

// ---------- Rechenkern ----------
const norm = s => String(s || '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٫,]/g, '.').replace(/\s+/g, '');
const ip2n = s => { const p = norm(s).split('.'); if (p.length !== 4 || p.some(x => !/^\d{1,3}$/.test(x) || +x > 255)) return null; return ((+p[0] << 24) >>> 0) + (+p[1] << 16) + (+p[2] << 8) + +p[3]; };
const n2ip = n => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
const maskN = p => (p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0);
const calc = (n, p) => { const m = maskN(p), net = (n & m) >>> 0, bc = (net | (~m >>> 0)) >>> 0; return { net, bc, mask: m, first: p >= 31 ? net : net + 1, last: p >= 31 ? bc : bc - 1, hosts: p === 32 ? 1 : p === 31 ? 2 : Math.pow(2, 32 - p) - 2 }; };
const parsePrefix = s => { s = norm(s).replace(/^\//, ''); if (/^\d{1,2}$/.test(s) && +s <= 32) return +s; const m = ip2n(s); if (m === null) return null; for (let p = 0; p <= 32; p++) if (maskN(p) === m) return p; return null; };
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const randIp = () => { const r = rnd(0, 2); return r === 0 ? `10.${rnd(0, 255)}.${rnd(0, 255)}.${rnd(1, 254)}` : r === 1 ? `172.${rnd(16, 31)}.${rnd(0, 255)}.${rnd(1, 254)}` : `192.168.${rnd(0, 255)}.${rnd(1, 254)}`; };

// ---------- Texte ----------
const TX = {
  fa: { title: 'تمرین‌ساز Subnetting', lead: 'هر بار یک سؤال تازه. اول خودت در ذهن یا روی کاغذ حساب کن، بعد «بررسی» را بزن. روش حل هر سؤال مرحله به مرحله نشان داده می‌شود. پاسخ‌ها را با رقم لاتین یا فارسی بنویس.', modes: ['تحلیل آدرس', 'Prefix برای تعداد میزبان', 'هم‌شبکه یا نه؟', 'ماشین‌حساب'], streak: 'پاسخ کامل درست پشت سر هم', best: 'بهترین رکورد', total: 'کل پاسخ‌ها', task: 'سؤال', address: 'آدرس', net: 'آدرس شبکه', bc: 'Broadcast', first: 'اولین میزبان', last: 'آخرین میزبان', hosts: 'تعداد میزبان', mask: 'ماسک (نقطه‌دار)', check: 'بررسی', next: 'سؤال بعدی', ok: 'درست', wrong: 'درست نیست؛ پاسخ درست', allOk: 'آفرین، همهٔ پاسخ‌ها درست است.', some: 'چند پاسخ اشتباه است. روش حل را بخوان و سؤال بعدی را امتحان کن.', how: 'روش حل', needHosts: n => `یک شبکه برای ${n} میزبان لازم است. کوچک‌ترین Prefix مناسب چیست؟`, prefix: 'Prefix یا ماسک', same: 'آیا این دو آدرس در یک شبکه‌اند؟', yes: 'بله، یک شبکه', no: 'نه، دو شبکه', calcPh: 'مثلاً 10.20.1.70/27 یا 10.20.1.70 255.255.255.224', calcBtn: 'حساب کن', invalid: 'ورودی معتبر نیست. نمونه: 192.168.10.77/27', reset: 'صفر کردن آمار', back: 'همهٔ دوره‌ها',
    steps: (p, oct, blk, mv) => oct < 0 ? [`ماسک /${p} در اکتت‌های کامل تمام می‌شود؛ بخش میزبان از اکتت ${p / 8 + 1} شروع می‌شود.`] : [`/${p} یعنی ماسک در اکتت ${oct + 1} به عدد ${mv} می‌رسد.`, `اندازهٔ بلوک = 256 − ${mv} = ${blk}. شبکه‌ها در این اکتت مضرب ${blk} هستند.`],
    stepsEnd: (o, from, to) => `عدد اکتت آدرس (${o}) بین ${from} و ${to} است؛ پس آدرس شبکه با ${from} و Broadcast با ${to} در این اکتت ساخته می‌شود و اکتت‌های بعدی به‌ترتیب 0 و 255 می‌شوند.`,
    hostsStep: p => `تعداد میزبان = 2^(32−${p}) − 2 (آدرس شبکه و Broadcast کم می‌شوند).`,
    needStep: (n, p, h) => `دنبال کوچک‌ترین توان ۲ هستیم که منهای ۲ دست‌کم ${n} شود: 2^${32 - p} − 2 = ${h}. پس /${p}.`,
    sameStep: (a, b) => `شبکهٔ اولی ${a} و شبکهٔ دومی ${b} است.` },
  de: { title: 'Subnetting-Trainer', lead: 'Jedes Mal eine neue Aufgabe. Erst im Kopf oder auf Papier rechnen, dann „Prüfen“. Der Lösungsweg wird Schritt für Schritt gezeigt.', modes: ['Adresse analysieren', 'Präfix für Hostanzahl', 'Gleiches Netz?', 'Rechner'], streak: 'Komplett richtige Aufgaben in Folge', best: 'Bestwert', total: 'Aufgaben gesamt', task: 'Aufgabe', address: 'Adresse', net: 'Netzadresse', bc: 'Broadcast', first: 'Erster Host', last: 'Letzter Host', hosts: 'Anzahl Hosts', mask: 'Maske (gepunktet)', check: 'Prüfen', next: 'Nächste Aufgabe', ok: 'richtig', wrong: 'nicht richtig – Lösung', allOk: 'Sehr gut, alles richtig.', some: 'Einige Antworten sind falsch. Lies den Lösungsweg und versuch die nächste Aufgabe.', how: 'Lösungsweg', needHosts: n => `Ein Netz soll ${n} Hosts aufnehmen. Welches ist das kleinste passende Präfix?`, prefix: 'Präfix oder Maske', same: 'Liegen diese beiden Adressen im selben Netz?', yes: 'Ja, selbes Netz', no: 'Nein, verschiedene Netze', calcPh: 'z. B. 10.20.1.70/27 oder 10.20.1.70 255.255.255.224', calcBtn: 'Berechnen', invalid: 'Ungültige Eingabe. Beispiel: 192.168.10.77/27', reset: 'Statistik zurücksetzen', back: 'Alle Lernstrecken',
    steps: (p, oct, blk, mv) => oct < 0 ? [`Die Maske /${p} endet an einer Oktettgrenze; der Hostanteil beginnt im ${p / 8 + 1}. Oktett.`] : [`/${p} bedeutet: im ${oct + 1}. Oktett hat die Maske den Wert ${mv}.`, `Blockgröße = 256 − ${mv} = ${blk}. Die Netze liegen in diesem Oktett bei Vielfachen von ${blk}.`],
    stepsEnd: (o, from, to) => `Der Oktettwert der Adresse (${o}) liegt zwischen ${from} und ${to}; also Netzadresse mit ${from}, Broadcast mit ${to} in diesem Oktett, folgende Oktette 0 bzw. 255.`,
    hostsStep: p => `Hosts = 2^(32−${p}) − 2 (Netz- und Broadcastadresse abziehen).`,
    needStep: (n, p, h) => `Gesucht ist die kleinste Zweierpotenz, die minus 2 mindestens ${n} ergibt: 2^${32 - p} − 2 = ${h}. Also /${p}.`,
    sameStep: (a, b) => `Netz der ersten Adresse: ${a}, der zweiten: ${b}.` },
  en: { title: 'Subnetting trainer', lead: 'A new task every time. Work it out in your head or on paper first, then press “Check”. The solution path is shown step by step.', modes: ['Analyse an address', 'Prefix for host count', 'Same network?', 'Calculator'], streak: 'Fully correct tasks in a row', best: 'Best streak', total: 'Tasks total', task: 'Task', address: 'Address', net: 'Network address', bc: 'Broadcast', first: 'First host', last: 'Last host', hosts: 'Number of hosts', mask: 'Mask (dotted)', check: 'Check', next: 'Next task', ok: 'correct', wrong: 'not correct – answer', allOk: 'Well done, everything is correct.', some: 'Some answers are wrong. Read the solution and try the next task.', how: 'Solution', needHosts: n => `A subnet must hold ${n} hosts. What is the smallest suitable prefix?`, prefix: 'Prefix or mask', same: 'Are these two addresses in the same network?', yes: 'Yes, same network', no: 'No, different networks', calcPh: 'e.g. 10.20.1.70/27 or 10.20.1.70 255.255.255.224', calcBtn: 'Calculate', invalid: 'Invalid input. Example: 192.168.10.77/27', reset: 'Reset statistics', back: 'All courses',
    steps: (p, oct, blk, mv) => oct < 0 ? [`The /${p} mask ends on an octet boundary; the host part starts in octet ${p / 8 + 1}.`] : [`/${p} means the mask value in octet ${oct + 1} is ${mv}.`, `Block size = 256 − ${mv} = ${blk}. Networks in this octet are multiples of ${blk}.`],
    stepsEnd: (o, from, to) => `The address octet (${o}) lies between ${from} and ${to}; so the network uses ${from} and the broadcast ${to} in this octet, following octets 0 and 255.`,
    hostsStep: p => `Hosts = 2^(32−${p}) − 2 (subtract network and broadcast).`,
    needStep: (n, p, h) => `Find the smallest power of two that minus 2 is at least ${n}: 2^${32 - p} − 2 = ${h}. So /${p}.`,
    sameStep: (a, b) => `Network of the first address: ${a}, of the second: ${b}.` }
};
const T = () => TX[L()];
const iso = () => { const r = document.querySelector('.sn'); if (r && window.ArefiIsolateLatin) window.ArefiIsolateLatin(r); };

// ---------- Erklärung ----------
const explain = (n, p) => {
  const t = T(), r = calc(n, p);
  if (p % 8 === 0) return [...t.steps(p, -1), t.hostsStep(p)];
  const oct = Math.floor(p / 8), blk = Math.pow(2, 8 * (oct + 1) - p), mv = 256 - blk;
  const o = (n >>> (8 * (3 - oct))) & 255, from = Math.floor(o / blk) * blk;
  return [...t.steps(p, oct, blk, mv), t.stepsEnd(o, from, from + blk - 1), t.hostsStep(p)];
};

// ---------- Zustand ----------
let mode = 0, task = null, answered = false;
const newTask = () => {
  answered = false;
  if (mode === 0) { const p = rnd(16, 30); task = { ip: randIp(), p }; }
  else if (mode === 1) { const pool = [2, 5, 10, 14, 20, 28, 30, 45, 50, 60, 62, 90, 100, 120, 126, 150, 200, 250, 254, 300, 400, 500, 510, 600, 1000, 1500, 2000, 4000]; task = { n: pool[rnd(0, pool.length - 1)] }; }
  else if (mode === 2) {
    const p = rnd(20, 29), a = ip2n(randIp()), r = calc(a, p), size = r.bc - r.net + 1;
    const same = Math.random() < 0.5;
    let b = same ? r.net + rnd(1, size - 2) : (Math.random() < 0.5 ? r.bc + rnd(1, Math.min(size, 40)) : r.net - rnd(1, Math.min(size, 40)));
    b = b >>> 0; task = { a, b, p };
  } else task = null;
};

const stats = () => { const s = load(); return { streak: s.streak || 0, best: s.best || 0, total: s.total || 0 }; };
const record = ok => { const s = load(); s.total = (s.total || 0) + 1; s.streak = ok ? (s.streak || 0) + 1 : 0; s.best = Math.max(s.best || 0, s.streak); save(s); };

const statsHTML = () => { const t = T(), s = stats(); return `<div class="sn-stats" id="sn-stats"><div><b>${num(s.streak)}</b><span>${esc(t.streak)}</span></div><div><b>${num(s.best)}</b><span>${esc(t.best)}</span></div><div><b>${num(s.total)}</b><span>${esc(t.total)}</span></div></div>`; };
const field = (id, label) => `<label class="sn-field"><span>${esc(label)}</span><input id="sn-${id}" dir="ltr" inputmode="decimal" autocomplete="off" spellcheck="false"><small class="sn-res" id="sn-r-${id}" role="status"></small></label>`;

const taskHTML = () => {
  const t = T();
  if (mode === 0) return `<p class="sn-q">${esc(t.address)}: ${ip(task.ip + '/' + task.p)}</p><div class="sn-grid">${field('net', t.net)}${field('bc', t.bc)}${field('first', t.first)}${field('last', t.last)}${field('hosts', t.hosts)}${field('mask', t.mask)}</div>`;
  if (mode === 1) return `<p class="sn-q">${esc(t.needHosts(num(task.n)))}</p><div class="sn-grid">${field('pfx', t.prefix)}</div>`;
  if (mode === 2) return `<p class="sn-q">${esc(t.same)}</p><p class="sn-pair">${ip(n2ip(task.a) + '/' + task.p)}<span>·</span>${ip(n2ip(task.b) + '/' + task.p)}</p><div class="sn-yn"><button type="button" class="btn secondary" data-sn-yn="1">${esc(t.yes)}</button><button type="button" class="btn secondary" data-sn-yn="0">${esc(t.no)}</button></div>`;
  return `<form class="sn-calc" id="sn-calc"><label class="sn-field sn-wide"><span>${esc(t.address)}</span><input id="sn-calc-in" dir="ltr" placeholder="${esc(t.calcPh)}" autocomplete="off" spellcheck="false"></label><button class="btn" type="submit">${esc(t.calcBtn)}</button></form><div id="sn-calc-out" role="status"></div>`;
};

const body = () => {
  const t = T();
  const actions = mode === 3 ? '' : `<div class="sn-actions"><button type="button" class="btn" id="sn-check"${mode === 2 ? ' hidden' : ''}>${esc(t.check)}</button><button type="button" class="btn secondary" id="sn-next">${esc(t.next)}</button></div>`;
  return `${taskHTML()}${actions}<div id="sn-feedback" role="status"></div>`;
};

const page = () => {
  const t = T();
  if (!task && mode !== 3) newTask();
  return `<div class="wsc sn"><div class="crumb"><a href="#kurse">${esc(t.back)}</a><span>/</span><span>${esc(t.title)}</span></div>
<header class="wsc-head"><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p></header>
${statsHTML()}
<div class="sn-tabs" role="tablist">${t.modes.map((m, k) => `<button type="button" role="tab" aria-selected="${k === mode}" class="sn-tab${k === mode ? ' active' : ''}" data-sn-mode="${k}">${esc(m)}</button>`).join('')}</div>
<section class="card wsc-sec sn-card" id="sn-body">${body()}</section>
<p class="micro"><button type="button" class="text-link" id="sn-reset">${esc(t.reset)}</button></p></div>`;
};

const tableHTML = (n, p) => {
  const t = T(), r = calc(n, p);
  const rows = [[t.address, n2ip(n) + '/' + p], [t.mask, n2ip(r.mask)], [t.net, n2ip(r.net)], [t.bc, n2ip(r.bc)], [t.first, n2ip(r.first)], [t.last, n2ip(r.last)], [t.hosts, String(r.hosts)]];
  return `<table class="sn-table"><tbody>${rows.map(([a, b]) => `<tr><th>${esc(a)}</th><td>${ip(b)}</td></tr>`).join('')}</tbody></table><h3>${esc(t.how)}</h3><ol class="sn-how">${explain(n, p).map(x => `<li>${esc(x)}</li>`).join('')}</ol>`;
};

const mark = (id, ok, right) => { const t = T(), el = document.getElementById('sn-r-' + id), inp = document.getElementById('sn-' + id); if (!el) return; inp.classList.toggle('sn-ok', ok); inp.classList.toggle('sn-bad', !ok); el.innerHTML = ok ? `✓ ${esc(t.ok)}` : `✗ ${esc(t.wrong)}: ${ip(right)}`; };

const check = () => {
  if (answered || !task) return;
  const t = T(); let all = true; let how = [];
  const val = id => (document.getElementById('sn-' + id) || {}).value || '';
  if (mode === 0) {
    const n = ip2n(task.ip), r = calc(n, task.p);
    const exp = { net: n2ip(r.net), bc: n2ip(r.bc), first: n2ip(r.first), last: n2ip(r.last), mask: n2ip(r.mask) };
    Object.keys(exp).forEach(k => { const ok = ip2n(val(k)) !== null && ip2n(val(k)) === ip2n(exp[k]); mark(k, ok, exp[k]); all = all && ok; });
    const hk = norm(val('hosts')) === String(r.hosts); mark('hosts', hk, String(r.hosts)); all = all && hk;
    how = explain(n, task.p);
  } else if (mode === 1) {
    let p = 32; while (p > 0 && (Math.pow(2, 32 - p) - 2) < task.n) p--;
    const h = Math.pow(2, 32 - p) - 2, ok = parsePrefix(val('pfx')) === p;
    mark('pfx', ok, '/' + p + ' = ' + n2ip(maskN(p))); all = ok; how = [t.needStep(task.n, p, h)];
  }
  answered = true; record(all); feedback(all, how);
};
const feedback = (all, how) => {
  const t = T();
  document.getElementById('sn-feedback').innerHTML = `<p class="sn-msg ${all ? 'ok' : 'bad'}">${esc(all ? t.allOk : t.some)}</p>${how.length ? `<h3>${esc(t.how)}</h3><ol class="sn-how">${how.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}`;
  const st = document.getElementById('sn-stats'); if (st) st.outerHTML = statsHTML();
  const c = document.getElementById('sn-check'); if (c) c.disabled = true;
  const nx = document.getElementById('sn-next'); if (nx) nx.focus();
  iso();
};
const answerYN = yes => {
  if (answered || !task) return;
  const t = T(), ra = calc(task.a, task.p), rb = calc(task.b, task.p), same = ra.net === rb.net, ok = (yes === same);
  answered = true; record(ok);
  document.querySelectorAll('[data-sn-yn]').forEach(b => { b.disabled = true; if ((b.dataset.snYn === '1') === same) b.classList.add('sn-right'); });
  feedback(ok, [t.sameStep(n2ip(ra.net) + '/' + task.p, n2ip(rb.net) + '/' + task.p), ...explain(task.a, task.p).slice(0, -1)]);
};
const runCalc = () => {
  const t = T(), raw = (document.getElementById('sn-calc-in') || {}).value || '', s = norm(raw.replace(/\s+/, ' ')), out = document.getElementById('sn-calc-out');
  let ipS, p;
  const m = raw.trim().split(/\s+|\//).filter(Boolean);
  if (m.length === 2) { ipS = m[0]; p = parsePrefix(m[1]); }
  const n = ipS ? ip2n(ipS) : null;
  out.innerHTML = (n === null || p === null || p === undefined) ? `<p class="sn-msg bad">${esc(t.invalid)}</p>` : tableHTML(n, p);
  iso();
  void s;
};

const rerender = () => { const b = document.getElementById('sn-body'); if (b) { b.innerHTML = body(); iso(); const f = b.querySelector('input'); if (f) f.focus(); } };
const mount = () => {
  const root = document.querySelector('.sn');
  if (!root) return;
  root.addEventListener('click', e => {
    const md = e.target.closest('[data-sn-mode]');
    if (md) { mode = +md.dataset.snMode; newTask(); root.querySelectorAll('.sn-tab').forEach((x, k) => { x.classList.toggle('active', k === mode); x.setAttribute('aria-selected', String(k === mode)); }); rerender(); return; }
    if (e.target.closest('#sn-check')) { check(); return; }
    if (e.target.closest('#sn-next')) { newTask(); rerender(); return; }
    const yn = e.target.closest('[data-sn-yn]'); if (yn) { answerYN(yn.dataset.snYn === '1'); return; }
    if (e.target.closest('#sn-reset')) { save({}); const st = document.getElementById('sn-stats'); if (st) st.outerHTML = statsHTML(); }
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('.sn-grid input')) { e.preventDefault(); answered ? (newTask(), rerender()) : check(); } });
  root.addEventListener('submit', e => { if (e.target.id === 'sn-calc') { e.preventDefault(); runCalc(); } });
};

window.ArefiSubnet = { page, mount, _calc: calc, _ip2n: ip2n, _n2ip: n2ip, _parsePrefix: parsePrefix };
})();
