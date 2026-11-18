/* Arefi ITPraxis – Kursübersicht: alle Lernstrecken an einem Ort, Registrierung neuer Kurse. */
(() => {
'use strict';
const list = window.ArefiCourses = window.ArefiCourses || [];
const L = () => (window.ServerLabApp ? window.ServerLabApp.locale() : 'fa');
const I = () => ({ fa: 0, de: 1, en: 2 }[L()]);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => L() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(n);
const NOBOOK = {
  fa: { book: 'یادداشت‌های من', bookPage: 'منبع یا صفحه', bookPh: 'مثلاً مستند سازنده یا صفحهٔ کتاب', notePh: 'نکته‌های مهم و تجربهٔ آزمایشگاه به زبان خودت؛ گذرواژه ننویس.' },
  de: { book: 'Meine Notizen', bookPage: 'Quelle oder Seite', bookPh: 'z. B. Herstellerdoku oder Buchseite', notePh: 'Wichtiges und Laborerfahrung in eigenen Worten – keine Kennwörter.' },
  en: { book: 'My notes', bookPage: 'Source or page', bookPh: 'e.g. vendor docs or book page', notePh: 'Key points and lab experience in your own words – no passwords.' }
};
// def: { id, group, title:[3], lead:[3], part:[[fa,de,en]...], shell, C }
window.ArefiCourseRegister = def => {
  const texts = {};
  ['fa', 'de', 'en'].forEach((l, k) => { texts[l] = Object.assign({}, NOBOOK[l], { title: def.title[k], lead: def.lead[k], part: def.part.map(p => p[k]) }); });
  const v = window.ArefiCourseView(def.C, { key: 'arefi-k-' + def.id, hash: 'k-' + def.id, shell: def.shell || 'Bash', texts });
  list.push({ id: def.id, hash: 'k-' + def.id, group: def.group || 0, title: def.title, lead: def.lead, view: v, count: def.C.modules.length });
};
const TX = {
  fa: { title: 'همهٔ دوره‌ها', lead: 'دوره‌های تخصصی برای کار تکنسین IT، هلپ‌دسک، ادمین سیستم و آزمون Fachinformatiker. هر ماژول دانش اصلی، تمرین عملی، عیب‌یابی گام‌به‌گام، راهنمای تصمیم و پرسش مصاحبه دارد.', of: 'از', mods: 'ماژول', open: 'باز کن', tools: 'ابزار تمرین', subnet: 'تمرین‌ساز Subnetting', subnetLead: 'محاسبهٔ شبکه، Broadcast، محدودهٔ میزبان و ماسک با سؤال‌های بی‌نهایت و بررسی فوری پاسخ.', groups: ['مرحلهٔ ۱: شروع کار در پشتیبانی IT', 'مرحلهٔ ۲: مدیریت سرور و سیستم', 'مرحلهٔ ۳: زیرساخت و شبکهٔ پیشرفته', 'مرحلهٔ ۴: عملیات، امنیت و اتوماسیون', 'مرحلهٔ ۵: آزمون Fachinformatiker'], order: 'ترتیب پیشنهادی یادگیری: از بالا به پایین. هر دوره را می‌توانی جداگانه هم شروع کنی.' },
  de: { title: 'Alle Lernstrecken', lead: 'Fachkurse für IT-Techniker, Helpdesk, Systemadministration und die Fachinformatiker-Prüfung. Jedes Modul enthält Kernwissen, Praxisübung, Fehlersuche Schritt für Schritt, Entscheidungshilfe und Interviewfragen.', of: 'von', mods: 'Modulen', open: 'Öffnen', tools: 'Übungswerkzeuge', subnet: 'Subnetting-Trainer', subnetLead: 'Netz-, Broadcast-, Host-Bereich und Maske berechnen – unbegrenzt viele Aufgaben mit sofortiger Prüfung.', groups: ['Stufe 1: Einstieg in den IT-Support', 'Stufe 2: Server- und Systemadministration', 'Stufe 3: Infrastruktur und Netzwerk-Vertiefung', 'Stufe 4: Betrieb, Sicherheit und Automatisierung', 'Stufe 5: Fachinformatiker-Prüfung'], order: 'Empfohlene Reihenfolge: von oben nach unten. Jede Lernstrecke lässt sich auch einzeln beginnen.' },
  en: { title: 'All courses', lead: 'Specialist courses for IT technicians, helpdesk, system administration and the German Fachinformatiker exam. Every module has core knowledge, a hands-on lab, step-by-step troubleshooting, a decision guide and interview questions.', of: 'of', mods: 'modules', open: 'Open', tools: 'Practice tools', subnet: 'Subnetting trainer', subnetLead: 'Work out network, broadcast, host range and mask – unlimited tasks with instant checking.', groups: ['Stage 1: Getting started in IT support', 'Stage 2: Server and system administration', 'Stage 3: Infrastructure and advanced networking', 'Stage 4: Operations, security and automation', 'Stage 5: Fachinformatiker exam'], order: 'Recommended order: top to bottom. Each course can also be started on its own.' }
};
const all = () => {
  const out = [];
  const ws = window.ArefiWSCourse, lx = window.ArefiLXCourse;
  if (ws && ws.stats) out.push({ hash: 'wscourse', group: 0, title: ['دورهٔ جامع Windows Server 2025', 'Lernstrecke Windows Server 2025', 'Windows Server 2025 course'], lead: ['۱۷ ماژول بر اساس موضوع‌های کتاب Rheinwerk: AD، GPO، DNS/DHCP، PKI، Hyper-V، امنیت.', '17 Module nach den Themen des Rheinwerk-Handbuchs: AD, GPO, DNS/DHCP, PKI, Hyper-V, Sicherheit.', '17 modules following the Rheinwerk handbook: AD, GPO, DNS/DHCP, PKI, Hyper-V, security.'], s: ws.stats() });
  if (lx && lx.stats) out.push({ hash: 'lxcourse', group: 0, title: ['دورهٔ جامع Linux Server', 'Lernstrecke Linux-Server', 'Linux Server course'], lead: ['۱۶ ماژول با Ubuntu Server 24.04: systemd، شبکه، SSH، وب، Samba، AD، Docker، Ansible.', '16 Module mit Ubuntu Server 24.04: systemd, Netzwerk, SSH, Web, Samba, AD, Docker, Ansible.', '16 modules on Ubuntu Server 24.04: systemd, networking, SSH, web, Samba, AD, Docker, Ansible.'], s: lx.stats() });
  list.forEach(c => out.push({ hash: c.hash, group: c.group, title: c.title, lead: c.lead, s: c.view.stats() }));
  return out;
};
// Empfohlene Lernreihenfolge: [hash, Stufe]
const ORDER = [['k-cli', 0], ['k-net', 0], ['wscourse', 1], ['lxcourse', 1], ['k-m365', 1], ['k-ccna', 2], ['k-infra', 2], ['k-ops', 3], ['k-dev', 3], ['k-modern', 3], ['k-ap', 4]];
const ordered = () => {
  const cs = all(), out = [];
  ORDER.forEach(([h, g], k) => { const c = cs.find(x => x.hash === h); if (c) out.push(Object.assign({}, c, { group: g, step: k + 1 })); });
  cs.filter(c => !ORDER.some(o => o[0] === c.hash)).forEach(c => out.push(Object.assign({}, c, { step: out.length + 1 })));
  return out;
};
const page = () => {
  const t = TX[L()], i = I(), cs = ordered();
  const groups = t.groups.map((g, gi) => {
    const items = cs.filter(c => c.group === gi);
    if (!items.length) return '';
    return `<section class="wsc-part"><h2>${esc(g)}</h2><ol class="wsc-list">${items.map(c => `<li><a class="wsc-card kh-card${c.s.done === c.s.total ? ' is-done' : ''}" href="#${c.hash}"><span class="wsc-no">${c.s.done === c.s.total ? "✓" : num(c.step)}</span><span class="wsc-ct"><b>${esc(c.title[i])}</b><small>${esc(c.lead[i])}</small><span class="wsc-meta"><span class="wsc-bar"><span style="width:${Math.round(c.s.done / c.s.total * 100)}%"></span></span>${num(c.s.done)} ${esc(t.of)} ${num(c.s.total)} ${esc(t.mods)}</span></span></a></li>`).join('')}</ol></section>`;
  }).join('');
  const tools = `<section class="wsc-part"><h2>${esc(t.tools)}</h2><ol class="wsc-list"><li><a class="wsc-card kh-card" href="#subnetz"><span class="wsc-ct"><b>${esc(t.subnet)}</b><small>${esc(t.subnetLead)}</small></span></a></li>${(window.ArefiExtraTools || []).map(x => `<li><a class="wsc-card kh-card" href="#${x.hash}"><span class="wsc-ct"><b>${esc(x.title[i])}</b><small>${esc(x.lead[i])}</small></span></a></li>`).join('')}</ol></section>`;
  return `<div class="wsc"><header class="wsc-head"><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p><p class="kh-order">${esc(t.order)}</p></header>${groups}${tools}</div>`;
};
const find = id => list.find(c => c.id === id);
window.ArefiCourseHub = {
  page,
  course: (id, focus) => { const c = find(id); return c ? c.view.page(focus) : page(); },
  mount: id => { const c = find(id); if (c) c.view.mount(); },
  title: id => { const c = find(id); return c ? c.title[I()] : TX[L()].title; },
  label: () => TX[L()].title,
  courses: ordered
};
})();
