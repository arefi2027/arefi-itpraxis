/* Arefi ITPraxis – gemeinsame Ansicht für Lernstrecken (Windows Server, Linux-Server). */
window.ArefiCourseView = function (C, cfg) {
'use strict';
const KEY = cfg.key;
const L = () => (window.ServerLabApp ? window.ServerLabApp.locale() : 'fa');
const I = () => ({ fa: 0, de: 1, en: 2 }[L()]);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => L() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(n);
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
const st = id => { const a = load()[id] || {}; return { c: Array.isArray(a.c) ? a.c : [], page: a.page || '', note: a.note || '' }; };
const done = m => { const s = st(m.id); return m.lab.checks[0].every((_, k) => s.c[k]); };
const prog = m => { const s = st(m.id); return m.lab.checks[0].filter((_, k) => s.c[k]).length; };
// Wissenscheck: aus Fehlersuche (Symptom → passende Lösung) und Entscheidungshilfe erzeugt
const hash = str => { let h = 2166136261; for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const order = (n, seed) => { const a = [...Array(n).keys()]; let x = seed || 1; for (let k = n - 1; k > 0; k--) { x = Math.imul(x ^ (x >>> 15), 2246822519) >>> 0; const j = x % (k + 1); [a[k], a[j]] = [a[j], a[k]]; } return a; };
const quizOf = m => {
  const qs = [];
  const tr = (m.trouble || []).filter(x => Array.isArray(x[0]) && Array.isArray(x[1]));
  if (tr.length >= 2) tr.forEach((x, k) => qs.push({ kind: 'tr', q: x[0], opts: tr.map(y => y[1]), ok: k }));
  const de = (m.decide || []).filter(x => Array.isArray(x[0]) && Array.isArray(x[1]));
  if (de.length) {
    const others = C.modules.filter(o => o.id !== m.id).flatMap(o => (o.decide || []).map(y => y[1]));
    de.forEach((x, k) => {
      const pool = de.filter((_, j) => j !== k).map(y => y[1]);
      const extra = others.length ? [others[hash(m.id + k) % others.length], others[hash(m.id + k + 'b') % others.length]] : [];
      const opts = [x[1], ...pool, ...extra].filter((v, j, a) => a.indexOf(v) === j).slice(0, 3);
      qs.push({ kind: 'de', q: x[0], opts, ok: 0 });
    });
  }
  return qs.map((q, n) => { const o = order(q.opts.length, hash(m.id + ':' + n)); return { kind: q.kind, q: q.q, opts: o.map(j => q.opts[j]), ok: o.indexOf(q.ok) }; });
};
const qres = id => { const a = load()[id] || {}; return a.q && typeof a.q.s === 'number' ? a.q : null; };
const qpass = m => { const r = qres(m.id); if (!quizOf(m).length) return true; return !!(r && r.t && r.s / r.t >= 0.75); };


const TX = {
  fa: { title: 'دورهٔ جامع Windows Server 2025', lead: 'این دوره بر اساس موضوع‌های کتاب «Windows Server 2025 – Das umfassende Handbuch» (Rheinwerk) مرتب شده است. توضیح‌ها، تمرین‌ها و پرسش‌ها نوشتهٔ خود این برنامه‌اند و بر پایهٔ مستندات رسمی Microsoft؛ متن کتاب در برنامه نیست. هنگام خواندن کتاب، شمارهٔ صفحه و یادداشتت را در هر ماژول ثبت کن.', overall: 'پیشرفت دوره', of: 'از', modules: 'ماژول', part: ['بخش ۱: پایه و هویت', 'بخش ۲: هویت، سیاست و سرویس‌های شبکه', 'بخش ۳: فایل، گواهی، مجازی‌سازی و وب', 'بخش ۴: بهره‌برداری، دسترسی، ابر و امنیت'], module: 'ماژول', doneTag: 'انجام شد', bookTag: 'صفحهٔ کتاب', why: 'چرا در کار مهم است', know: 'دانش اصلی', lab: 'تمرین عملی در آزمایشگاه', vm: 'ماشین', steps: 'مراحل', solution: 'نمایش فرمان‌ها (اول خودت امتحان کن)', copy: 'کپی فرمان', criteria: 'معیارهای موفقیت', criteriaSub: 'فقط بعد از دیدن نتیجهٔ واقعی تیک بزن.', allDone: 'این ماژول کامل شد.', pitfalls: 'اشتباه‌های رایج در کار', iv: 'پرسش‌های مصاحبهٔ کاری', answer: 'پاسخ نمونه', book: 'کتاب و یادداشت من', bookPage: 'صفحه در کتاب', bookPh: 'مثلاً ۲۱۴–۲۳۰', note: 'یادداشت من (خودکار ذخیره می‌شود)', notePh: 'نکته‌های مهم از کتاب و آزمایشگاه به زبان خودت؛ گذرواژه ننویس.', saved: 'ذخیره شد', sources: 'منابع رسمی', back: 'همهٔ ماژول‌ها', prev: 'ماژول قبلی', next: 'ماژول بعدی', storage: 'پیشرفت و یادداشت‌های این دوره در همین مرورگر ذخیره می‌شوند.', start: 'شروع کن', cont: 'ادامه بده', trouble: 'عیب‌یابی: نشانه ← علت و راه‌حل', troubleSub: 'از بالا به پایین بررسی کن؛ هر بار فقط یک چیز را تغییر بده و دوباره آزمایش کن.', decide: 'راهنمای تصمیم: کی چه چیزی؟', symptom: 'نشانه', fix: 'علت و راه‌حل' },
  de: { title: 'Lernstrecke Windows Server 2025', lead: 'Diese Lernstrecke folgt den Themen des Buchs „Windows Server 2025 – Das umfassende Handbuch“ (Rheinwerk). Erklärungen, Übungen und Fragen sind eigene Inhalte dieses Programms auf Basis der offiziellen Microsoft-Dokumentation; Buchtext ist nicht enthalten. Trage beim Lesen in jedem Modul die Buchseite und deine Notizen ein.', overall: 'Fortschritt der Lernstrecke', of: 'von', modules: 'Modulen', part: ['Teil 1: Grundlagen und Identität', 'Teil 2: Identität, Richtlinien und Netzdienste', 'Teil 3: Dateien, Zertifikate, Virtualisierung und Web', 'Teil 4: Betrieb, Zugriff, Cloud und Sicherheit'], module: 'Modul', doneTag: 'erledigt', bookTag: 'Buchseite', why: 'Warum das im Job zählt', know: 'Kernwissen', lab: 'Praxisübung im Labor', vm: 'Maschine', steps: 'Arbeitsschritte', solution: 'Befehle anzeigen (erst selbst versuchen)', copy: 'Kopieren', criteria: 'Erfolgskriterien', criteriaSub: 'Erst abhaken, wenn du das echte Ergebnis gesehen hast.', allDone: 'Modul abgeschlossen.', pitfalls: 'Typische Fehler im Alltag', iv: 'Fragen aus Vorstellungsgesprächen', answer: 'Musterantwort', book: 'Buch und meine Notizen', bookPage: 'Seiten im Buch', bookPh: 'z. B. 214–230', note: 'Meine Notiz (wird automatisch gespeichert)', notePh: 'Wichtiges aus Buch und Labor in eigenen Worten – keine Kennwörter.', saved: 'Gespeichert', sources: 'Offizielle Quellen', back: 'Alle Module', prev: 'Vorheriges Modul', next: 'Nächstes Modul', storage: 'Fortschritt und Notizen dieser Lernstrecke werden in diesem Browser gespeichert.', start: 'Starten', cont: 'Weitermachen', trouble: 'Fehlersuche: Symptom → Ursache und Lösung', troubleSub: 'Von oben nach unten prüfen; immer nur eine Sache ändern und erneut testen.', decide: 'Entscheidungshilfe: Wann was?', symptom: 'Symptom', fix: 'Ursache und Lösung' },
  en: { title: 'Windows Server 2025 course', lead: 'This course follows the topics of the book “Windows Server 2025 – Das umfassende Handbuch” (Rheinwerk). Explanations, exercises and questions are this app’s own content based on official Microsoft documentation; no book text is included. While reading, record the book pages and your notes in each module.', overall: 'Course progress', of: 'of', modules: 'modules', part: ['Part 1: Foundations and identity', 'Part 2: Identity, policy and network services', 'Part 3: Files, certificates, virtualization and web', 'Part 4: Operations, access, cloud and security'], module: 'Module', doneTag: 'done', bookTag: 'Book pages', why: 'Why it matters on the job', know: 'Core knowledge', lab: 'Hands-on lab exercise', vm: 'Machine', steps: 'Steps', solution: 'Show commands (try it yourself first)', copy: 'Copy', criteria: 'Success criteria', criteriaSub: 'Tick only after seeing the real result.', allDone: 'Module complete.', pitfalls: 'Common mistakes at work', iv: 'Job interview questions', answer: 'Sample answer', book: 'Book and my notes', bookPage: 'Pages in the book', bookPh: 'e.g. 214–230', note: 'My note (saved automatically)', notePh: 'Key points from book and lab in your own words – no passwords.', saved: 'Saved', sources: 'Official sources', back: 'All modules', prev: 'Previous module', next: 'Next module', storage: 'Progress and notes for this course are stored in this browser.', start: 'Start', cont: 'Continue', trouble: 'Troubleshooting: symptom → cause and fix', troubleSub: 'Work top to bottom; change one thing at a time and test again.', decide: 'Decision guide: when to use what', symptom: 'Symptom', fix: 'Cause and fix' }
};
const QX = {
  fa: { quiz: 'آزمونک ماژول', quizSub: 'هر پرسش یک پاسخ درست دارد. برای قبولی دست‌کم ۷۵٪ لازم است.', qTr: 'این نشانه با کدام علت و راه‌حل جور است؟', qDe: 'بهترین تصمیم کدام است؟', check: 'بررسی پاسخ‌ها', retry: 'دوباره', passed: 'قبول شدی', failed: 'هنوز نه؛ بخش عیب‌یابی را دوباره بخوان و دوباره امتحان کن.', score: 'امتیاز', answerAll: 'به همهٔ پرسش‌ها پاسخ بده.', quizTag: 'آزمونک', quizzes: 'آزمونک‌های قبول‌شده', cert: 'گواهی پایان دوره', certLocked: 'گواهی وقتی آماده می‌شود که همهٔ ماژول‌ها کامل و همهٔ آزمونک‌ها قبول شده باشند.', certName: 'نام و نام خانوادگی روی گواهی', certBtn: 'ساختن گواهی', print: 'چاپ یا ذخیره به‌صورت PDF', close: 'بستن', cTitle: 'گواهی پایان دوره', cIntro: 'بدین‌وسیله تأیید می‌شود که', cDid: 'دورهٔ آموزشی زیر را با موفقیت به پایان رسانده است:', cMods: 'ماژول عملی با آزمایشگاه', cAvg: 'میانگین آزمونک‌ها', cDate: 'تاریخ', cId: 'شناسه', cNote: 'تمرین‌های آزمایشگاهی را خود فراگیر انجام داده و تأیید کرده است؛ آزمونک‌ها در برنامه به‌طور خودکار ارزیابی شده‌اند. این گواهی مدرک دولتی، IHK یا مدرک رسمی سازندگان نیست. نام‌های تجاری متعلق به صاحبانشان است.' },
  de: { quiz: 'Wissenscheck', quizSub: 'Jede Frage hat genau eine richtige Antwort. Bestanden ab 75 %.', qTr: 'Welche Ursache und Lösung passt zu diesem Symptom?', qDe: 'Welche Entscheidung ist richtig?', check: 'Antworten prüfen', retry: 'Neu versuchen', passed: 'Bestanden', failed: 'Noch nicht bestanden – lies die Fehlersuche noch einmal und versuche es erneut.', score: 'Ergebnis', answerAll: 'Bitte alle Fragen beantworten.', quizTag: 'Wissenscheck', quizzes: 'Wissenschecks bestanden', cert: 'Lernnachweis', certLocked: 'Der Lernnachweis wird frei, wenn alle Module abgeschlossen und alle Wissenschecks bestanden sind.', certName: 'Vor- und Nachname auf dem Nachweis', certBtn: 'Lernnachweis erstellen', print: 'Drucken oder als PDF speichern', close: 'Schließen', cTitle: 'Lernnachweis', cIntro: 'Hiermit wird bestätigt, dass', cDid: 'die folgende Lernstrecke erfolgreich abgeschlossen hat:', cMods: 'Praxismodule mit Laborübung', cAvg: 'Durchschnitt der Wissenschecks', cDate: 'Datum', cId: 'Kennung', cNote: 'Die Laborübungen wurden selbstständig durchgeführt und von der lernenden Person bestätigt; die Wissenschecks wurden in der App automatisch ausgewertet. Dieser Nachweis ist kein staatlicher, IHK- oder Herstellerabschluss. Genannte Marken gehören ihren Inhabern.' },
  en: { quiz: 'Knowledge check', quizSub: 'Each question has exactly one correct answer. Pass mark 75 %.', qTr: 'Which cause and fix matches this symptom?', qDe: 'Which decision is right?', check: 'Check answers', retry: 'Try again', passed: 'Passed', failed: 'Not passed yet – reread the troubleshooting section and try again.', score: 'Score', answerAll: 'Please answer all questions.', quizTag: 'Quiz', quizzes: 'knowledge checks passed', cert: 'Certificate of completion', certLocked: 'The certificate unlocks when all modules are complete and all knowledge checks are passed.', certName: 'First and last name on the certificate', certBtn: 'Create certificate', print: 'Print or save as PDF', close: 'Close', cTitle: 'Certificate of completion', cIntro: 'This is to confirm that', cDid: 'has successfully completed the following course:', cMods: 'hands-on modules with lab exercises', cAvg: 'Average knowledge check score', cDate: 'Date', cId: 'Reference', cNote: 'The lab exercises were carried out and confirmed by the learner; the knowledge checks were scored automatically in the app. This certificate is not a state, chamber (IHK) or vendor qualification. Trademarks belong to their owners.' }
};
Object.keys(TX).forEach(l => Object.assign(TX[l], QX[l]));
Object.keys(TX).forEach(l => Object.assign(TX[l], (cfg.texts || {})[l] || {}));
const T = () => TX[L()];

/* Werkzeugkatalog (optional, cfg.catalog): filterbare Liste mit Zweck, Plattform, Lizenz, offizieller Seite und Anleitung */
const CAT = {
  fa: { title: 'فهرست ابزارها', intro: 'نرم‌افزارهای مهم برای کار روزانهٔ IT، با کاربرد، سیستم‌عامل، نوع مجوز و لینک رسمی. برای ابزارهایی که «آموزش» دارند، تمرین گام‌به‌گام در همین دوره هست. فقط از سایت رسمی دانلود کن.', all: 'همه', site: 'سایت رسمی', tut: 'آموزش در این دوره', count: 'ابزار' },
  de: { title: 'Werkzeugliste', intro: 'Wichtige Software für den IT-Alltag mit Zweck, Plattform, Lizenz und offizieller Seite. Werkzeuge mit „Anleitung“ übst du Schritt für Schritt in dieser Lernstrecke. Nur von der offiziellen Seite herunterladen.', all: 'Alle', site: 'Offizielle Seite', tut: 'Anleitung in dieser Lernstrecke', count: 'Werkzeuge' },
  en: { title: 'Tool list', intro: 'Important software for everyday IT work with purpose, platform, licence and official site. Tools marked “tutorial” are practised step by step in this course. Only download from the official site.', all: 'All', site: 'Official site', tut: 'Tutorial in this course', count: 'tools' }
};
const PJ = {
  fa: { title: 'پوشه‌های پروژه: از برنامه‌ریزی تا تحویل', intro: 'هر پوشه یک پروژهٔ کامل شبکه است با نمونه‌سندهای برنامه‌ریزی، اجرا، آزمون و تحویل. برای تحویل رسمی، مقررات اتاق بازرگانی و صنایع (IHK) مربوط به خودت را بررسی کن؛ نمونهٔ کامل را بخوان، بعد قالب خالی را خودت پر کن.', open: 'باز کردن پوشه', docs: 'سند' },
  de: { title: 'Projektmappen: von der Planung bis zur Abnahme', intro: 'Jede Mappe ist ein vollständiges Netzwerkprojekt mit Beispieldokumenten für Planung, Umsetzung, Test und Abnahme. Für eine Einreichung gelten die Vorgaben deiner zuständigen IHK. Lies die Musterlösung und fülle danach die Vorlage selbst aus.', open: 'Mappe öffnen', docs: 'Dokumenten' },
  en: { title: 'Project folders: from planning to acceptance', intro: 'Each folder is a complete network project with sample documents for planning, implementation, testing and acceptance. For submissions, follow your responsible IHK’s requirements. Read the model solution, then fill in the blank template yourself.', open: 'Open folder', docs: 'documents' }
};
function projHtml() {
  if (!cfg.projects || !cfg.projects.length || !window.ArefiProjectView) return '';
  const i = I(), c = PJ[L()];
  return `<section class="pv-list" aria-labelledby="pv-h"><h2 id="pv-h">${esc(c.title)}</h2><p class="micro">${esc(c.intro)}</p><ul>${cfg.projects.map(P => { const s = window.ArefiProjectView.stats(P); return `<li><a class="pv-card" href="#${cfg.hash}/${P.id}"><span class="pv-size">${esc(P.size[i])}</span><b>${esc(P.title[i])}</b><small>${esc(P.lead[i])}</small><span class="wsc-meta"><span class="wsc-bar"><span style="width:${Math.round(s.done / s.total * 100)}%"></span></span>${num(s.done)} ${esc(T().of)} ${num(s.total)} ${esc(c.docs)}</span></a></li>`; }).join('')}</ul></section>`;
}
function catHtml() {
  const K = cfg.catalog;
  if (!K) return '';
  const i = I(), c = CAT[L()];
  const chips = [`<button type="button" class="axk-chip" data-axk="all" aria-pressed="true">${esc(c.all)} (${num(K.items.length)})</button>`]
    .concat(K.cats.map((n, k) => `<button type="button" class="axk-chip" data-axk="${k}" aria-pressed="false">${esc(n[i])} (${num(K.items.filter(x => x[1] === k).length)})</button>`)).join('');
  const items = K.items.map(([name, cat, purpose, plat, lic, url, mod]) => {
    const mt = mod && C.modules.find(m => m.id === mod);
    return `<li class="axk-tool" data-cat="${cat}"><div class="axk-top"><b dir="ltr">${esc(name)}</b><span class="axk-tag">${esc(K.cats[cat][i])}</span></div><p>${esc(purpose[i])}</p><div class="axk-meta"><span dir="ltr">${esc(plat)}</span><span>${esc(K.lic[lic][i])}</span></div><div class="axk-links"><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(c.site)} ↗</a>${mt ? `<a href="#${cfg.hash}/${mod}">${esc(c.tut)}: ${esc(mt.title[i].split(':')[0])}</a>` : ''}</div></li>`;
  }).join('');
  return `<section class="axk-cat" aria-labelledby="axk-h"><h2 id="axk-h">${esc(c.title)} <small>${num(K.items.length)} ${esc(c.count)}</small></h2><p class="micro">${esc(c.intro)}</p><div class="axk-chips" role="group" aria-label="${esc(c.title)}">${chips}</div><ul class="axk-list">${items}</ul></section>`;
}

// Verweise eines Moduls auf Dokumente der Projektmappen (Lernstrecke Netzplanung)
function seeHtml(m) {
  if (!m.see || !m.see.length || !window.ArefiPlanProjects) return '';
  const i = ({ fa: 0, de: 1, en: 2 }[L()] ?? 0);
  const items = m.see.map(ref => {
    const [pid, did] = ref.split('--');
    const P = window.ArefiPlanProjects.find(p => p.id === pid); if (!P) return '';
    const d = (P.docs || []).find(x => x.id === did); if (!d) return '';
    return `<li><a href="#k-plan/${esc(ref)}">${esc(d.t[i])}</a> <span class="micro">(${esc(P.title[i].split(':')[0])})</span></li>`;
  }).join('');
  if (!items) return '';
  const h = ['در پروژهٔ نمونه ببین', 'Im Musterprojekt ansehen', 'See it in the sample project'][i];
  const sub = ['همین روش در یک پوشهٔ پروژهٔ واقعی با عددها و جدول‌های کامل:', 'Dieselbe Methode in einer echten Projektmappe mit vollständigen Zahlen und Tabellen:', 'The same method in a real project folder with complete figures and tables:'][i];
  return `<section class="card wsc-sec wsc-see"><h2>${esc(h)}</h2><p class="micro">${esc(sub)}</p><ul class="wsc-src">${items}</ul></section>`;
}
function quizHtml(m) {
  const t = T(), i = I(), qs = quizOf(m); if (!qs.length) return '';
  const r = qres(m.id);
  const res = r ? `${t.score}: ${num(r.s)}/${num(r.t)} – ${r.s / r.t >= 0.75 ? t.passed : t.failed}` : '';
  return `<section class="card wsc-sec wsc-quiz" id="wsc-quiz"><h2>${esc(t.quiz)}</h2><p class="micro">${esc(t.quizSub)}</p><form id="wsc-qform" novalidate>${qs.map((q, n) => `<fieldset class="wsc-q" data-ok="${q.ok}"><legend><span class="wsc-qn">${num(n + 1)}</span><small>${esc(q.kind === 'tr' ? t.qTr : t.qDe)}</small><b>${esc(q.q[i])}</b></legend>${q.opts.map((o, j) => `<label class="wsc-qo"><input type="radio" name="q${n}" value="${j}"><span>${esc(o[i])}</span></label>`).join('')}</fieldset>`).join('')}<div class="wsc-qbar"><button class="btn" type="submit">${esc(t.check)}</button><p id="wsc-qres" class="${r ? (r.s / r.t >= 0.75 ? 'is-pass' : 'is-fail') : ''}" role="status" aria-live="polite">${esc(res)}</p></div></form></section>`;
}
const CERT_NAME = 'arefi-cert-name';
function certHtml() {
  const t = T(), M = C.modules, nd = M.filter(done).length, nq = M.filter(qpass).length;
  if (!M.length) return '';
  if (nd < M.length || nq < M.length) return `<section class="card wsc-cert is-locked"><h2>${esc(t.cert)}</h2><p>${esc(t.certLocked)}</p><p class="micro">${num(nd)}/${num(M.length)} ${esc(t.modules)} · ${num(nq)}/${num(M.length)} ${esc(t.quizzes)}</p></section>`;
  let name = ''; try { name = localStorage.getItem(CERT_NAME) || ''; } catch {}
  return `<section class="card wsc-cert"><h2>${esc(t.cert)}</h2><label class="note-label" for="wsc-cname">${esc(t.certName)}</label><div class="wsc-cert-row"><input id="wsc-cname" class="wsc-input" maxlength="80" value="${esc(name)}" autocomplete="name"><button type="button" class="btn" id="wsc-cbtn">${esc(t.certBtn)}</button></div></section>`;
}
function openCert(name) {
  const t = T(), M = C.modules, rs = M.map(m => qres(m.id)).filter(Boolean);
  const avg = rs.length ? Math.round(rs.reduce((a, r) => a + r.s / r.t, 0) / rs.length * 100) : 100;
  const d = new Date(), loc = { fa: 'fa-IR', de: 'de-DE', en: 'en-GB' }[L()];
  const date = d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' });
  const ref = 'ITP-' + cfg.hash.replace(/^k-/, '').toUpperCase() + '-' + d.toISOString().slice(0, 10).replace(/-/g, '') + '-' + (hash(name + cfg.hash + d.toDateString()) % 65536).toString(16).toUpperCase().padStart(4, '0');
  const mark = window.ArefiBrand && window.ArefiBrand.mark ? window.ArefiBrand.mark('axc-mark') : '';
  const el = document.createElement('div'); el.id = 'ax-cert'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
  el.setAttribute('dir', L() === 'fa' ? 'rtl' : 'ltr'); el.setAttribute('lang', L());
  el.innerHTML = `<div class="axc-tools"><button type="button" class="btn" data-c="print">${esc(t.print)}</button><button type="button" class="btn secondary" data-c="close">${esc(t.close)}</button></div>
<article class="axc-page"><div class="axc-frame">
<header class="axc-head" dir="ltr">${mark}<div><b>Arefi <span>ITPraxis</span></b><small>Lernen wie im echten IT-Job</small></div></header>
<h1>${esc(t.cTitle)}</h1><p class="axc-intro">${esc(t.cIntro)}</p><p class="axc-name">${esc(name)}</p><p class="axc-intro">${esc(t.cDid)}</p><p class="axc-course">${esc(t.title)}</p>
<dl class="axc-facts"><div><dt>${esc(t.cMods)}</dt><dd>${num(M.length)}</dd></div><div><dt>${esc(t.cAvg)}</dt><dd>${num(avg)} %</dd></div><div><dt>${esc(t.cDate)}</dt><dd>${esc(date)}</dd></div><div><dt>${esc(t.cId)}</dt><dd dir="ltr">${esc(ref)}</dd></div></dl>
<p class="axc-note">${esc(t.cNote)}</p></div></article>`;
  document.body.appendChild(el); document.body.classList.add('cert-open');
  const close = () => { el.remove(); document.body.classList.remove('cert-open'); };
  el.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; if (b.dataset.c === 'print') window.print(); else close(); });
  el.querySelector('[data-c="print"]').focus();
  const onKey = e => { if (e.key === 'Escape') { close(); removeEventListener('keydown', onKey); } }; addEventListener('keydown', onKey);
}
function overview() {
  const t = T(), M = C.modules, n = M.filter(done).length;
  if (!M.length) return `<div class="wsc"><header class="wsc-head"><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p></header>${catHtml()}${projHtml()}</div>`;
  const next = M.find(m => !done(m)) || M[0];
  const parts = t.part.map((_, x) => x + 1).map(p => `<section class="wsc-part"><h2>${esc(t.part[p - 1])}</h2><ol class="wsc-list">${M.map((m, k) => [m, k]).filter(([m]) => m.part === p).map(([m, k]) => {
    const s = st(m.id), pr = prog(m), tot = m.lab.checks[0].length;
    return `<li><a class="wsc-card${done(m) ? ' is-done' : ''}" href="#${cfg.hash}/${m.id}"><span class="wsc-no">${done(m) ? '✓' : num(k + 1)}</span><span class="wsc-ct"><b>${esc(m.title[I()])}</b><small>${esc(m.goal[I()])}</small><span class="wsc-meta"><span class="wsc-bar"><span style="width:${Math.round(pr / tot * 100)}%"></span></span>${num(pr)} ${esc(t.of)} ${num(tot)}${qres(m.id) && qpass(m) ? ` · ${esc(t.quizTag)} ✓` : ''}${s.page ? ` · ${esc(t.bookTag)} ${esc(s.page)}` : ''}</span></span></a></li>`;
  }).join('')}</ol></section>`).join('');
  return `<div class="wsc"><header class="wsc-head"><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p>
<div class="wsc-overall"><div><b>${num(n)} ${esc(t.of)} ${num(M.length)}</b> <span>${esc(t.modules)}</span></div><span class="wsc-bar wsc-bar-lg"><span style="width:${Math.round(n / M.length * 100)}%"></span></span><a class="btn" href="#${cfg.hash}/${next.id}">${esc(n ? t.cont : t.start)}: ${esc(next.title[I()])}</a></div>
<p class="micro">${num(M.filter(qpass).length)} ${esc(t.of)} ${num(M.length)} ${esc(t.quizzes)} · ${esc(t.storage)}</p></header>${catHtml()}${projHtml()}${parts}${certHtml()}</div>`;
}

function moduleView(id) {
  const t = T(), i = I(), M = C.modules, k = M.findIndex(m => m.id === id);
  if (k < 0) return overview();
  const m = M[k], s = st(m.id), tot = m.lab.checks[0].length, pr = prog(m);
  const prev = M[k - 1], next = M[k + 1];
  return `<div class="wsc wsc-mod" data-wsc="${m.id}">
<div class="crumb"><a href="#${cfg.hash}">${esc(t.title)}</a><span>/</span><span>${esc(t.module)} ${num(k + 1)} ${esc(t.of)} ${num(M.length)}</span></div>
<header class="wsc-head"><p class="wsc-partname">${esc(t.part[m.part - 1])}</p><h1>${esc(m.title[i])}</h1><p class="wsc-goal">${esc(m.goal[i])}</p></header>
<div class="wsc-grid"><div class="wsc-main">
<section class="card wsc-sec"><h2>${esc(t.why)}</h2><p>${esc(m.why[i])}</p></section>
<section class="card wsc-sec"><h2>${esc(t.know)}</h2><ul class="wsc-know">${m.know.map(x => `<li>${esc(x[i])}</li>`).join('')}</ul></section>
<section class="card wsc-sec wsc-lab"><h2>${esc(t.lab)}</h2><p class="wsc-vm"><b>${esc(t.vm)}:</b> <bdi dir="ltr">${esc(m.lab.vm)}</bdi></p>${m.lab.topo && window.ArefiTopo ? window.ArefiTopo.svg(m.lab.topo, ({ fa: 'نقشهٔ شبکهٔ آزمایشگاه', de: 'Netzplan des Labors', en: 'Lab network diagram' })[L()] || 'Lab network diagram') : ''}
<h3>${esc(t.steps)}</h3><ol>${m.lab.steps[i].map(x => `<li>${esc(x)}</li>`).join('')}</ol>
<details class="wsc-sol"><summary>${esc(t.solution)}</summary><div class="command"><div class="command-head"><span>${esc(m.lab.shell || cfg.shell || "PowerShell")}</span><button type="button" class="copy-btn" data-action="copy">${esc(t.copy)}</button></div><pre dir="ltr"><code>${esc(m.lab.code)}</code></pre></div></details>
<h3>${esc(t.criteria)} <span class="wsc-count" id="wsc-count">${num(pr)} ${esc(t.of)} ${num(tot)}</span></h3><p class="micro">${esc(t.criteriaSub)}</p>
${m.lab.checks[i].map((c, j) => `<label class="wsc-check"><input type="checkbox" data-wsc-check="${j}" ${s.c[j] ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}
<p class="wsc-done" id="wsc-done" role="status"${pr === tot ? '' : ' hidden'}>${esc(t.allDone)}</p></section>
${m.trouble && m.trouble.length ? `<section class="card wsc-sec wsc-trouble"><h2>${esc(t.trouble)}</h2><p class="micro">${esc(t.troubleSub)}</p>${m.trouble.map(q => `<div class="wsc-tr"><p class="wsc-sym"><b>${esc(t.symptom)}:</b> ${esc(q[0][i])}</p><p class="wsc-fix"><b>${esc(t.fix)}:</b> ${esc(q[1][i])}</p></div>`).join('')}</section>` : ''}${m.decide && m.decide.length ? `<section class="card wsc-sec wsc-decide"><h2>${esc(t.decide)}</h2><dl>${m.decide.map(q => `<div><dt>${esc(q[0][i])}</dt><dd>${esc(q[1][i])}</dd></div>`).join('')}</dl></section>` : ''}<section class="card wsc-sec"><h2>${esc(t.pitfalls)}</h2><ul class="wsc-pit">${m.pitfalls.map(x => `<li>${esc(x[i])}</li>`).join('')}</ul></section>
${seeHtml(m)}<section class="card wsc-sec"><h2>${esc(t.iv)}</h2>${m.iv.map(q => `<details class="wsc-iv"><summary>${esc(q[0][i])}</summary><p><b>${esc(t.answer)}:</b> ${esc(q[1][i])}</p></details>`).join('')}</section>
${quizHtml(m)}<nav class="wsc-nav">${prev ? `<a class="btn secondary" href="#${cfg.hash}/${prev.id}">${esc(t.prev)}</a>` : '<span></span>'}<a class="btn secondary" href="#${cfg.hash}">${esc(t.back)}</a>${next ? `<a class="btn" href="#${cfg.hash}/${next.id}">${esc(t.next)}</a>` : '<span></span>'}</nav>
</div><aside class="wsc-aside">
<section class="card wsc-sec"><h2>${esc(t.book)}</h2><label class="note-label" for="wsc-page">${esc(t.bookPage)}</label><input id="wsc-page" class="wsc-input" maxlength="40" value="${esc(s.page)}" placeholder="${esc(t.bookPh)}">
<label class="note-label" for="wsc-note">${esc(t.note)}</label><textarea id="wsc-note" maxlength="8000" placeholder="${esc(t.notePh)}">${esc(s.note)}</textarea><p class="micro" id="wsc-saved" role="status"></p></section>
<section class="card wsc-sec"><h2>${esc(t.sources)}</h2><ul class="wsc-src">${m.sources.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer" dir="ltr">${esc(n)} ↗</a></li>`).join('')}</ul></section>
</aside></div></div>`;
}

const rtlArrows = h => L() === 'fa' ? h.split(/(<pre[\s\S]*?<\/pre>)/).map((x, k) => k % 2 ? x : x.replace(/→/g, '←')).join('') : h;
const projOf = id => { const m = /^(p-[a-z0-9]+)(?:--([a-z0-9-]+))?$/.exec(id || ''); if (!m || !cfg.projects) return null; const P = cfg.projects.find(x => x.id === m[1]); return P ? { P, doc: m[2] || '' } : null; };
C.page = id => { const pj = projOf(id); if (pj && window.ArefiProjectView) return window.ArefiProjectView.view(pj.P, cfg, pj.doc); return rtlArrows(id ? moduleView(id) : overview()); };
C.stats = () => {
  let d = C.modules.filter(done).length, n = C.modules.length;
  if (cfg.projects && window.ArefiProjectView) cfg.projects.forEach(P => { const s = window.ArefiProjectView.stats(P); d += s.done; n += s.total; });
  const U = { fa: ['سند', 'ماژول و سند'], de: ['Dokumenten', 'Modulen und Dokumenten'], en: ['documents', 'modules and documents'] }[L()] || ['', ''];
  return cfg.projects && cfg.projects.length ? { done: d, total: n, unit: C.modules.length ? U[1] : U[0] } : { done: d, total: n };
};
C.mount = () => {
  const cb = document.getElementById('wsc-cbtn');
  if (cb) cb.addEventListener('click', () => {
    const inp = document.getElementById('wsc-cname'), name = inp.value.trim().slice(0, 80);
    if (!name) { inp.focus(); return; }
    try { localStorage.setItem(CERT_NAME, name); } catch {}
    openCert(name);
  });
  const pvr = document.querySelector('.pv[data-pv]');
  if (pvr && cfg.projects && window.ArefiProjectView) { const P = cfg.projects.find(x => x.id === pvr.dataset.pv); if (P) window.ArefiProjectView.mount(P); return; }
  const kc = document.querySelector('.axk-cat');
  if (kc) kc.addEventListener('click', e => {
    const b = e.target.closest('[data-axk]');
    if (!b) return;
    const v = b.dataset.axk;
    kc.querySelectorAll('[data-axk]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    kc.querySelectorAll('.axk-tool').forEach(li => { li.hidden = v !== 'all' && li.dataset.cat !== v; });
  });
  const root = document.querySelector('.wsc-mod');
  if (!root) return;
  const id = root.dataset.wsc, m = C.modules.find(x => x.id === id), t = T();
  const upd = fn => { const all = load(); const cur = all[id] || {}; fn(cur); all[id] = cur; save(all); };
  root.addEventListener('change', e => {
    const cb = e.target.closest('[data-wsc-check]');
    if (!cb) return;
    upd(cur => { cur.c = Array.isArray(cur.c) ? cur.c : []; cur.c[+cb.dataset.wscCheck] = cb.checked; });
    const pr = prog(m), tot = m.lab.checks[0].length;
    document.getElementById('wsc-count').textContent = `${num(pr)} ${t.of} ${num(tot)}`;
    document.getElementById('wsc-done').hidden = pr < tot;
  });
  const qf = root.querySelector('#wsc-qform');
  if (qf) qf.addEventListener('submit', e => {
    e.preventDefault();
    const out = root.querySelector('#wsc-qres'), fs = [...qf.querySelectorAll('.wsc-q')];
    if (qf.dataset.checked) { qf.reset(); qf.querySelectorAll('.wsc-qo').forEach(l => l.classList.remove('is-ok', 'is-bad')); delete qf.dataset.checked; qf.querySelector('button').textContent = t.check; out.textContent = ''; out.className = ''; return; }
    const ans = fs.map(f => { const c = f.querySelector('input:checked'); return c ? +c.value : -1; });
    if (ans.includes(-1)) { out.textContent = t.answerAll; out.className = 'is-fail'; return; }
    let sc = 0;
    fs.forEach((f, n) => { const ok = +f.dataset.ok; if (ans[n] === ok) sc++; f.querySelectorAll('.wsc-qo').forEach((l, j) => { l.classList.toggle('is-ok', j === ok); l.classList.toggle('is-bad', j === ans[n] && j !== ok); }); });
    upd(cur => { cur.q = { s: sc, t: fs.length, at: Date.now() }; });
    const pass = sc / fs.length >= 0.75;
    out.textContent = `${t.score}: ${num(sc)}/${num(fs.length)} – ${pass ? t.passed : t.failed}`; out.className = pass ? 'is-pass' : 'is-fail';
    qf.dataset.checked = '1'; qf.querySelector('button').textContent = t.retry;
  });
  let timer;
  const savedMsg = () => { const el = document.getElementById('wsc-saved'); if (el) { el.textContent = t.saved; clearTimeout(timer); timer = setTimeout(() => { el.textContent = ''; }, 1500); } };
  root.querySelector('#wsc-page').addEventListener('input', e => { upd(cur => { cur.page = e.target.value.slice(0, 40); }); savedMsg(); });
  root.querySelector('#wsc-note').addEventListener('input', e => { upd(cur => { cur.note = e.target.value.slice(0, 8000); }); savedMsg(); });
};
return { page: C.page, mount: C.mount, stats: C.stats };
};
