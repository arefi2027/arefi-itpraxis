/* Training: Schicht-Simulator mit Wiederholung, Deutsch im IT-Job, Bewerbungsnachweis.
   Nutzt Inhalte aus work-data.js und den Speicher aus workplace.js (state.work). */
(() => {
'use strict';
const W = () => window.ArefiWork;
const D = window.LAB, CASES = D.workCases || [], G = D.workGerman || { phrases: [], mails: [], vocab: [] };
const T = (...a) => W().T(...a), E = v => W().E(v), L = o => W().L(o), num = n => W().num(n), lang = () => W().lang();
const DAY = 86400000;

/* ---------- spaced repetition ---------- */
function srOf(id) { return W().ws().sr[id]; }
function isDue(id, now = Date.now()) { const x = srOf(id); return !x || Date.parse(x.due) <= now; }
function rate(id, grade) {
 const w = W().ws(), x = w.sr[id] || { ivl: 1, n: 0 };
 const ivl = grade === 'hard' ? 1 : grade === 'ok' ? Math.max(3, Math.min(30, Math.round(x.ivl * 1.6))) : Math.max(7, Math.min(60, x.ivl * 2.5 | 0));
 w.sr[id] = { due: new Date(Date.now() + ivl * DAY).toISOString(), ivl, n: x.n + 1 };
 if (grade === 'sure' && x.n >= 1) w.cases[id] = true;
 W().persist();
}
function pickShift() {
 const now = Date.now(), w = W().ws();
 const due = CASES.filter(c => w.sr[c.id] && Date.parse(w.sr[c.id].due) <= now).sort((a, b) => Date.parse(w.sr[a.id].due) - Date.parse(w.sr[b.id].due));
 const fresh = CASES.filter(c => !w.sr[c.id]);
 const pool = [...due, ...shuffle(fresh)];
 const rest = shuffle(CASES.filter(c => !pool.includes(c)));
 return [...pool, ...rest].slice(0, 3).map(c => c.id);
}
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- shift session (kept in memory; ratings are persisted) ---------- */
let S = null;
function startShift(ids) { S = { ids: ids || pickShift(), i: 0, step: 0, order: null, checked: false, answers: {}, done: [] }; }
function cur() { return CASES.find(c => c.id === S.ids[S.i]); }
function dueCount() { return CASES.filter(c => W().ws().sr[c.id] && isDue(c.id)).length; }
function stepLabels() { return [T('پرسش‌ها', 'Rückfragen', 'Questions'), T('ترتیب بررسی', 'Reihenfolge', 'Order'), T('یادداشت تیکت', 'Ticketnotiz', 'Ticket note'), T('جمله به آلمانی', 'Satz auf Deutsch', 'German sentence'), T('ارزیابی', 'Bewertung', 'Rating')]; }

function shiftIntro() {
 const w = W().ws(), seen = Object.keys(w.sr).length, d = dueCount();
 return `<div class="eyebrow">${T('یادگیری با انجام، نه با خواندن', 'Lernen durch Tun, nicht durch Lesen', 'Learn by doing, not by reading')}</div>
<h1>${T('تمرین شیفت پشتیبانی', 'Schicht-Training im Support', 'Support shift training')}</h1>
<p class="page-description">${T('هر شیفت سه تیکت دارد. اول خودت پاسخ می‌دهی، بعد با پاسخ نمونه مقایسه می‌کنی. پژوهش‌های یادگیری نشان می‌دهند یادآوری فعال و تکرار با فاصله، بهتر از دوباره خواندن در ذهن می‌ماند. برای همین موردهای دشوار زودتر و موردهای آسان دیرتر برمی‌گردند.', 'Jede Schicht hat drei Tickets. Du antwortest zuerst selbst und vergleichst dann mit der Musterlösung. Lernforschung zeigt: Aktives Abrufen und Wiederholen mit Abstand bleibt besser im Gedächtnis als erneutes Lesen. Deshalb kommen schwere Fälle früher wieder, leichte später.', 'Each shift has three tickets. You answer first and then compare with the sample. Learning research shows that active recall and spaced repetition stick better than re-reading. That is why hard cases return sooner and easy ones later.')}</p>
<div class="work-role-grid"><section class="card"><h2>${T('وضعیت تو', 'Dein Stand', 'Your status')}</h2><p>${T(`${num(seen)} از ${num(CASES.length)} مورد را دست‌کم یک بار تمرین کرده‌ای. ${num(d)} مورد برای تکرار رسیده است.`, `${seen} von ${CASES.length} Fällen mindestens einmal geübt. ${d} Fälle sind zur Wiederholung fällig.`, `${seen} of ${CASES.length} cases practised at least once. ${d} cases are due for review.`)}</p><button class="btn" type="button" data-train="start">${T('شروع شیفت (۳ تیکت)', 'Schicht starten (3 Tickets)', 'Start shift (3 tickets)')}</button></section>
<section class="card"><h2>${T('هر تیکت در پنج قدم', 'Jedes Ticket in fünf Schritten', 'Every ticket in five steps')}</h2><ol>${stepLabels().map(x => `<li>${E(x)}</li>`).join('')}</ol><p class="micro">${T('متن‌هایت فقط در همین جلسه می‌مانند؛ ارزیابی‌ها ذخیره می‌شوند.', 'Deine Texte bleiben nur in dieser Sitzung; die Bewertungen werden gespeichert.', 'Your texts stay only in this session; ratings are saved.')}</p></section></div>`;
}
function ta(id, ph, l) { return `<textarea id="${id}" class="train-text" rows="5" maxlength="4000"${l ? ` lang="${l}" dir="ltr"` : ''} placeholder="${E(ph)}">${E(S.answers[id] || '')}</textarea>`; }
function reveal(open, html) { return open ? `<div class="train-sample">${html}</div>` : ''; }
function shiftStep() {
 const c = cur(), d = L(c), de = c.de, step = S.step, labels = stepLabels();
 const head = `<div class="train-head"><span class="work-progress">${T(`تیکت ${num(S.i + 1)} از ${num(S.ids.length)}`, `Ticket ${S.i + 1} von ${S.ids.length}`, `Ticket ${S.i + 1} of ${S.ids.length}`)}</span><ol class="train-steps">${labels.map((x, i) => `<li class="${i < step ? 'done' : i === step ? 'now' : ''}">${E(x)}</li>`).join('')}</ol></div>
<section class="card"><div class="work-tags"><span class="work-tag area-${c.area}">${E(L(D.workJobs.areas[c.area]))}</span><span class="work-tag prio-${c.prio}">${E(L(D.workJobs.prio[c.prio]))}</span></div><h2>${E(d.t)}</h2><blockquote class="work-msg">${E(d.msg)}</blockquote>${lang() !== 'de' ? `<p class="micro" lang="de" dir="ltr"><b>Deutsch:</b> ${E(de.msg)}</p>` : ''}</section>`;
 let body = '';
 if (step === 0) body = `<section class="card"><h3>${T('پیش از هر کاری از کاربر چه می‌پرسی؟ دست‌کم سه پرسش بنویس.', 'Was fragst du den Benutzer, bevor du etwas tust? Schreibe mindestens drei Fragen.', 'What do you ask the user before doing anything? Write at least three questions.')}</h3>${ta('a0', T('۱. …\n۲. …\n۳. …', '1. …\n2. …\n3. …', '1. …\n2. …\n3. …'))}
<button class="btn secondary" type="button" data-train="check">${T('مقایسه با نمونه', 'Mit Muster vergleichen', 'Compare with sample')}</button>${reveal(S.checked, `<h3>${T('پرسش‌های نمونه', 'Musterfragen', 'Sample questions')}</h3><ul>${d.ask.map(x => `<li>${E(x)}</li>`).join('')}</ul>`)}</section>`;
 if (step === 1) {
  if (!S.order) S.order = shuffle(d.steps.map((_, i) => i));
  const ok = S.checked ? S.order.map((v, i) => v === i) : null;
  body = `<section class="card"><h3>${T('قدم‌ها را به ترتیب درست بچین. با دکمه‌های بالا و پایین جابه‌جا کن.', 'Bringe die Prüfschritte in die richtige Reihenfolge. Verschiebe mit den Pfeilen.', 'Put the steps in the right order. Move them with the arrows.')}</h3>
<ol class="train-order">${S.order.map((v, i) => `<li class="${ok ? (ok[i] ? 'ok' : 'bad') : ''}"><span>${E(d.steps[v])}</span><span class="train-move"><button type="button" data-train="up" data-i="${i}" aria-label="${T('بالا', 'Nach oben', 'Move up')}" ${i === 0 ? 'disabled' : ''}>↑</button><button type="button" data-train="down" data-i="${i}" aria-label="${T('پایین', 'Nach unten', 'Move down')}" ${i === S.order.length - 1 ? 'disabled' : ''}>↓</button></span></li>`).join('')}</ol>
<button class="btn secondary" type="button" data-train="check">${T('بررسی ترتیب', 'Reihenfolge prüfen', 'Check order')}</button>${S.checked ? `<p class="train-result">${ok.every(Boolean) ? T('عالی، ترتیب کاملاً درست است.', 'Sehr gut, die Reihenfolge stimmt vollständig.', 'Very good, the order is completely correct.') : T(`${num(ok.filter(Boolean).length)} از ${num(ok.length)} درست. موارد قرمز را جابه‌جا کن و دوباره بسنج.`, `${ok.filter(Boolean).length} von ${ok.length} richtig. Verschiebe die roten Schritte und prüfe erneut.`, `${ok.filter(Boolean).length} of ${ok.length} correct. Move the red steps and check again.`)}</p>` : ''}</section>`;
 }
 if (step === 2) {
  const items = [T('نشانه و پیام خطا', 'Symptom und Fehlermeldung', 'Symptom and error message'), T('چه کسی و از کی', 'Wer betroffen, seit wann', 'Who is affected, since when'), T('بررسی‌ها با نتیجه', 'Prüfungen mit Ergebnis', 'Checks with result'), T('علت', 'Ursache', 'Cause'), T('راه‌حل', 'Lösung', 'Fix'), T('آزمون پایانی', 'Abschlusstest', 'Final test')];
  body = `<section class="card"><h3>${T('فرض کن مشکل حل شده. یادداشت تیکت را طوری بنویس که همکار بدون پرسش ادامه دهد.', 'Angenommen, das Problem ist gelöst. Schreibe die Ticketnotiz so, dass eine Kollegin ohne Rückfrage weiterarbeiten kann.', 'Assume the problem is solved. Write the ticket note so a colleague can continue without asking.')}</h3>${ta('a2', T('نشانه… / درگیرها… / بررسی‌ها… / علت… / راه‌حل… / آزمون…', 'Symptom … / Betroffen … / Geprüft … / Ursache … / Lösung … / Test …', 'Symptom … / Affected … / Checked … / Cause … / Fix … / Test …'))}
<fieldset class="train-checklist"><legend>${T('خودت بسنج: یادداشتت این‌ها را دارد؟', 'Selbstcheck: Enthält deine Notiz …', 'Self-check: does your note contain …')}</legend>${items.map((x, i) => `<label><input type="checkbox" data-train-chk="${i}"> ${E(x)}</label>`).join('')}</fieldset>
<button class="btn secondary" type="button" data-train="check">${T('دیدن یادداشت نمونه', 'Musternotiz zeigen', 'Show sample note')}</button>${reveal(S.checked, `<h3>${T('یادداشت نمونه', 'Musternotiz', 'Sample note')}</h3><p class="train-note">${E(d.note)}</p>${lang() !== 'de' ? `<p class="train-note" lang="de" dir="ltr"><b>Deutsch:</b> ${E(de.note)}</p>` : ''}`)}</section>`;
 }
 if (step === 3) body = `<section class="card"><h3>${T('به آلمانی بنویس به کاربر چه می‌گویی: علت را ساده بگو و قدم بعدی را روشن کن.', 'Schreibe auf Deutsch, was du dem Benutzer sagst: Ursache einfach erklären und nächsten Schritt nennen.', 'Write in German what you tell the user: explain the cause simply and name the next step.')}</h3>${ta('a3', 'Ich habe … geprüft. Die Ursache war … Bitte …', 'de')}
<p class="micro">${T('واژه‌های کمکی در بخش «آلمانی در محیط کار IT» هستند.', 'Hilfreiche Wörter findest du unter „Deutsch im IT-Job“.', 'Helpful words are under "German for IT jobs".')} <a class="text-link" href="#deutsch">${T('آلمانی در محیط کار', 'Deutsch im IT-Job', 'German for IT jobs')}</a></p>
<button class="btn secondary" type="button" data-train="check">${T('مقایسه با جملهٔ نمونه', 'Mit Mustersatz vergleichen', 'Compare with sample')}</button>${reveal(S.checked, `<h3>${T('نمونه به آلمانی', 'Muster auf Deutsch', 'Sample in German')}</h3><p lang="de" dir="ltr">${E(de.say)}</p>${lang() !== 'de' ? `<p class="micro">${E(d.say)}</p>` : ''}`)}</section>`;
 if (step === 4) body = `<section class="card"><h3>${T('این مورد چقدر برایت آسان بود؟', 'Wie sicher warst du bei diesem Fall?', 'How confident were you with this case?')}</h3>
<div class="work-grid"><section class="work-boss"><h3>${T('انتظار کارفرما', 'Das erwartet der Arbeitgeber', 'What the employer expects')}</h3><p>${E(d.boss)}</p></section><section><h3>${T('کی ارجاع بدهی', 'Eskalieren, wenn …', 'Escalate when …')}</h3><p>${E(d.esc)}</p></section></div>
<div class="train-rate"><button class="btn secondary" type="button" data-train="rate" data-g="hard">${T('سخت بود · فردا دوباره', 'Schwer · morgen wieder', 'Hard · again tomorrow')}</button><button class="btn secondary" type="button" data-train="rate" data-g="ok">${T('با فکر کردن · چند روز دیگر', 'Mit Nachdenken · in einigen Tagen', 'With thought · in a few days')}</button><button class="btn" type="button" data-train="rate" data-g="sure">${T('مطمئن · خیلی بعدتر', 'Sicher · viel später', 'Confident · much later')}</button></div>
<p class="micro">${T('اگر دو بار «مطمئن» بزنی، مورد در بخش مشکلات روزمره به‌عنوان «بلدم» علامت می‌خورد.', 'Nach zweimal „Sicher“ wird der Fall in den Alltagsfällen als „Kann ich“ markiert.', 'After rating "confident" twice, the case is marked "I can do this" in everyday cases.')}</p></section>`;
 const nav = step < 4 ? `<div class="train-nav">${step > 0 ? `<button class="btn secondary" type="button" data-train="back">${T('قبلی', 'Zurück', 'Back')}</button>` : ''}<button class="btn" type="button" data-train="next">${T('قدم بعد', 'Weiter', 'Next')}</button><a class="text-link" href="#support/${c.id}">${T('دیدن راه‌حل کامل', 'Komplette Lösung ansehen', 'View full solution')}</a></div>` : '';
 return head + body + nav;
}
function shiftDone() {
 return `<h1>${T('شیفت تمام شد', 'Schicht beendet', 'Shift complete')}</h1><section class="card"><p>${T('آفرین. هر چند روز یک شیفت کوتاه بهتر از یک جلسهٔ طولانی است.', 'Gut gemacht. Alle paar Tage eine kurze Schicht wirkt besser als eine lange Sitzung.', 'Well done. A short shift every few days works better than one long session.')}</p><ul>${S.done.map(id => `<li>${E(L(W().caseById(id)).t)} · ${T('دوباره در', 'wieder in', 'again in')} ${num(W().ws().sr[id]?.ivl || 1)} ${T('روز', 'Tagen', 'days')}</li>`).join('')}</ul><button class="btn" type="button" data-train="start">${T('شیفت بعدی', 'Nächste Schicht', 'Next shift')}</button> <a class="btn secondary" href="#interview">${T('تمرین مصاحبه', 'Interview üben', 'Practise interview')}</a></section>`;
}
function shiftPage() {
 if (!S) return shiftIntro();
 if (S.i >= S.ids.length) return shiftDone();
 return `<h1 class="visually-hidden">${T('تمرین شیفت', 'Schicht-Training', 'Shift training')}</h1>` + shiftStep();
}

/* ---------- German for IT jobs ---------- */
const EN = D.workEnglish || { phrases: [], mails: [], vocab: [] };
const LANGS = { de: { data: G, key: 'vocab', name: 'Deutsch' }, en: { data: EN, key: 'vocabEn', name: 'English' } };
const VS = { de: { mode: 'list', idx: null, show: false }, en: { mode: 'list', idx: null, show: false } };
function known(code) { const w = W().ws(); if (!w[LANGS[code].key]) w[LANGS[code].key] = {}; return w[LANGS[code].key]; }
function vocabQuiz(code) {
 const V = LANGS[code].data.vocab, st = VS[code], k = known(code), open = V.map((_, i) => i).filter(i => !k[i]);
 if (!open.length) return `<p>${T('همهٔ واژه‌ها را بلدی. عالی!', 'Du kennst alle Wörter. Sehr gut!', 'You know all the words. Very good!')}</p><button class="btn secondary" type="button" data-train="vocab-reset" data-l="${code}">${T('از نو', 'Neu beginnen', 'Start again')}</button>`;
 if (st.idx === null || k[st.idx]) st.idx = open[Math.floor(Math.random() * open.length)];
 const v = V[st.idx], hint = lang() === 'fa' ? v[2] : v[1], n = V.length - open.length;
 const say = code === 'de' ? T('آلمانی‌اش را بلند بگو، بعد ببین.', 'Sag es laut auf Deutsch, dann aufdecken.', 'Say it out loud in German, then reveal.') : T('انگلیسی‌اش را بلند بگو، بعد ببین.', 'Sag es laut auf Englisch, dann aufdecken.', 'Say it out loud in English, then reveal.');
 return `<div class="train-flash"><p class="micro">${T(`${num(n)} از ${num(V.length)} واژه را بلدی`, `${n} von ${V.length} Wörtern sicher`, `${n} of ${V.length} words known`)}</p><p class="train-flash-q">${E(hint)}</p><p class="micro">${say}</p>${st.show ? `<p class="train-flash-a" lang="${code}" dir="ltr">${E(v[0])}</p><div class="train-rate"><button class="btn secondary" type="button" data-train="vocab-again" data-l="${code}">${T('هنوز نه', 'Noch nicht', 'Not yet')}</button><button class="btn" type="button" data-train="vocab-known" data-l="${code}">${T('بلدم', 'Kann ich', 'I know it')}</button></div>` : `<button class="btn" type="button" data-train="vocab-show" data-l="${code}">${T('نشان بده', 'Aufdecken', 'Reveal')}</button>`}</div>`;
}
const HEAD = {
 de: () => `<div class="eyebrow">${T('مانع شمارهٔ یک در استخدام', 'Hürde Nummer eins bei der Einstellung', 'The number one hiring hurdle')}</div>
<h1>${T('آلمانی در محیط کار IT', 'Deutsch im IT-Job', 'German for IT jobs')}</h1>
<p class="page-description">${T('در پژوهش Bitkom سال ۲۰۲۶، شرکت‌ها کمبود دانش زبان آلمانی را بیش از هر مانع دیگری دلیل پر نشدن جای خالی IT دانسته‌اند. بسیاری از آگهی‌های پشتیبانی آلمانی C1 می‌خواهند. این جمله‌ها را بلند تمرین کن تا در تلفن بی‌مکث بیایند.', 'In der Bitkom-Studie 2026 nennen Unternehmen fehlende Deutschkenntnisse häufiger als jede andere Hürde bei der Besetzung von IT-Stellen. Viele Support-Anzeigen verlangen Deutsch auf C1-Niveau. Übe diese Sätze laut, bis sie am Telefon ohne Pause kommen.', 'In the 2026 Bitkom study, companies name missing German skills more often than any other hurdle in filling IT jobs. Many support ads require German at C1 level. Practise these phrases out loud until they come without pause on the phone.')}</p>`,
 en: () => `<div class="eyebrow">${T('زبان دوم کاری در بسیاری از تیم‌های IT', 'Zweite Arbeitssprache in vielen IT-Teams', 'The second working language in many IT teams')}</div>
<h1>${T('انگلیسی در محیط کار IT', 'Englisch im IT-Job', 'English for IT jobs')}</h1>
<p class="page-description">${T('پیام‌های خطا، مستندات، پشتیبانی سازنده‌ها و همکاران بین‌المللی انگلیسی‌اند. بسیاری از آگهی‌های IT در اتریش و آلمان دانش خوب انگلیسی گفتاری و نوشتاری می‌خواهند. این جمله‌ها را بلند تمرین کن و ایمیل‌ها را با داده‌های خودت بازنویسی کن.', 'Fehlermeldungen, Dokumentation, Herstellersupport und internationale Kolleginnen und Kollegen sind auf Englisch. Viele IT-Stellenanzeigen in Österreich und Deutschland verlangen gute Englischkenntnisse in Wort und Schrift. Übe diese Sätze laut und schreibe die E-Mails mit deinen eigenen Angaben nach.', 'Error messages, documentation, vendor support and international colleagues all use English. Many IT job ads in Austria and Germany ask for good spoken and written English. Practise these phrases out loud and rewrite the emails with your own details.')}</p>`
};
function langPage(code) {
 const X = LANGS[code], P = X.data, st = VS[code], other = lang() === 'fa' ? 2 : 1, tr = lang() !== code;
 const foot = code === 'de'
  ? `<p class="micro">${T('برای جمله‌های هر مورد پشتیبانی به آلمانی، «تمرین شیفت» را باز کن.', 'Für die deutschen Sätze zu jedem Supportfall öffne das Schicht-Training.', 'For the German sentences of each support case, open the shift training.')} <a class="text-link" href="#shift">${T('تمرین شیفت', 'Schicht-Training', 'Shift training')}</a></p>`
  : `<p class="micro">${T('دستورها، نام گزینه‌ها و متن خطا را عیناً به انگلیسی نگه دار؛ آن‌ها را ترجمه نکن.', 'Befehle, Menünamen und Fehlertexte bleiben im Original auf Englisch; übersetze sie nicht.', 'Keep commands, menu names and error texts in the original English; do not translate them.')}</p>`;
 const sib = code === 'de' ? ['english', T('انگلیسی در محیط کار IT', 'Englisch im IT-Job', 'English for IT jobs')] : ['deutsch', T('آلمانی در محیط کار IT', 'Deutsch im IT-Job', 'German for IT jobs')];
 const terms = code === 'de' ? T('اصطلاحات هر درس به آلمانی', 'Fachbegriffe jeder Lektion auf Deutsch', 'Terms of each lesson in German') : T('اصطلاحات هر درس به انگلیسی', 'Fachbegriffe jeder Lektion auf Englisch', 'Terms of each lesson in English');
 return `${HEAD[code]()}
<div class="lesson-modes work-roles">${[['list', T('جمله‌ها و ایمیل', 'Sätze und E-Mails', 'Phrases and emails')], ['quiz', T('آزمون واژه‌ها', 'Wortschatz-Test', 'Vocabulary test')], ['table', T('فهرست واژه‌ها', 'Wortliste', 'Word list')]].map(([id, t]) => `<button type="button" data-train="vmode" data-l="${code}" data-m="${id}" class="${st.mode === id ? 'active' : ''}" aria-pressed="${st.mode === id}">${E(t)}</button>`).join('')}</div>
${st.mode === 'list' ? P.phrases.map(p => `<section class="card train-phrases"><h2>${E(L(p.t))}</h2><ul>${p.items.map(x => `<li><span lang="${code}" dir="ltr"><b>${E(x[0])}</b></span>${tr ? `<br><span class="micro">${E(x[other])}</span>` : ''}</li>`).join('')}</ul></section>`).join('') + `<h2 class="work-section-title">${T('نمونه‌های ایمیل', 'E-Mail-Vorlagen', 'Email templates')}</h2>` + P.mails.map(m => `<details class="card work-topic"><summary><h3>${E(L(m.t))}</h3></summary><div class="work-topic-body"><pre class="train-mail" lang="${code}" dir="ltr">${E(m[code])}</pre></div></details>`).join('') : ''}
${st.mode === 'quiz' ? `<section class="card">${vocabQuiz(code)}</section>` : ''}
${st.mode === 'table' ? `<section class="card table-wrap"><table><thead><tr><th>${X.name}</th><th>${lang() === 'fa' ? 'فارسی' : code === 'de' ? 'English' : 'Deutsch'}</th></tr></thead><tbody>${P.vocab.map(v => `<tr><td lang="${code}" dir="ltr">${E(v[0])}</td><td>${E(v[other])}</td></tr>`).join('')}</tbody></table></section>` : ''}
${foot}
<p class="micro"><a class="text-link" href="#${sib[0]}">${E(sib[1])}</a> · <a class="text-link" href="#languages" data-train="lterms" data-l="${code}">${E(terms)}</a></p>`;
}

/* ---------- application portfolio (printable, German) ---------- */
function portfolioCard() {
 const w = W().ws();
 return `<section class="card work-portfolio"><h2>${T('مدرک تمرین برای درخواست کار (PDF)', 'Lernnachweis für die Bewerbung (PDF)', 'Practice record for applications (PDF)')}</h2><p>${T('از درس‌های کامل‌شده، موارد پشتیبانی و ارزیابی مهارت‌هایت یک صفحهٔ آلمانی می‌سازد. در پنجرهٔ چاپ «Save as PDF» را انتخاب کن و آن را به درخواستت پیوست کن یا در مصاحبه همراه ببر.', 'Erstellt aus abgeschlossenen Lektionen, Supportfällen und deiner Kompetenzeinschätzung eine deutsche Übersicht. Wähle im Druckfenster „Als PDF speichern“ und lege sie der Bewerbung bei oder nimm sie zum Gespräch mit.', 'Creates a German overview from completed lessons, support cases and your skills self-assessment. Choose "Save as PDF" in the print dialog and attach it to your application or bring it to the interview.')}</p>
<label for="pf-name">${T('نام تو (روی سند)', 'Dein Name (auf dem Dokument)', 'Your name (on the document)')}</label><input id="pf-name" class="search" maxlength="80" value="${E(w.profile.name)}" autocomplete="name">
<button class="btn" type="button" data-train="portfolio">${T('ساختن و چاپ', 'Erstellen und drucken', 'Create and print')}</button><p class="micro">${T('فقط آنچه خودت تأیید کرده‌ای می‌آید. صادق بمان؛ در مصاحبه دربارهٔ آن پرسیده می‌شود.', 'Es erscheint nur, was du selbst bestätigt hast. Bleib ehrlich; im Gespräch wird danach gefragt.', 'Only what you confirmed yourself appears. Stay honest; you will be asked about it in the interview.')}</p></section>`;
}
function portfolioHTML() {
 const w = W().ws(), A = window.ServerLabApp, J = D.workJobs;
 const mods = A.modules(), done = mods.filter(m => A.completed(m.id));
 const deTitle = id => D.locales.de?.[id]?.title || id;
 const cases = CASES.filter(c => w.cases[c.id]);
 const practised = CASES.filter(c => w.sr[c.id] && !w.cases[c.id]);
 const sure = J.skills.filter(s => w.skills[s.id] === 2), help = J.skills.filter(s => w.skills[s.id] === 1);
 const role = J.roles.find(r => r.id === w.role) || J.roles[0];
 const today = new Date().toLocaleDateString('de-DE');
 const list = (arr, f) => arr.length ? `<ul>${arr.map(x => `<li>${E(f(x))}</li>`).join('')}</ul>` : '<p>–</p>';
 return `<article lang="de" dir="ltr" class="pf-doc"><header><h1>Praktischer Lernnachweis IT-Support und Systemadministration</h1><p><b>${E(w.profile.name || '')}</b> · Stand ${today} · Zielrolle: ${E(role.de.t)}</p></header>
<p>Selbstständig aufgebautes und dokumentiertes Übungslabor (VirtualBox) mit Windows Server 2025, Windows 11 und Ubuntu Server. Alle Angaben sind Selbstbestätigungen aus der Lernsoftware Arefi ITPraxis; Nachweise und Notizen können im Gespräch gezeigt werden.</p>
<h2>Abgeschlossene praktische Lektionen (${done.length} von ${mods.length})</h2>${list(done, m => deTitle(m.id))}
<h2>Supportfälle sicher beherrscht (${cases.length} von ${CASES.length})</h2>${list(cases, c => c.de.t)}
${practised.length ? `<h2>Weitere geübte Supportfälle</h2>${list(practised, c => c.de.t)}` : ''}
<h2>Kompetenzen – selbstständig</h2>${list(sure, s => s.de)}
<h2>Kompetenzen – mit Unterstützung</h2>${list(help, s => s.de)}
<h2>Vorbereitung Vorstellungsgespräch</h2><p>${Object.keys(w.iv).length} von ${(J.interview || []).length} typischen Fachfragen mündlich geübt.</p>
<footer><p>Erstellt mit Arefi ITPraxis · ${today}</p></footer></article>`;
}
function printPortfolio() {
 const name = document.getElementById('pf-name'); if (name) { W().ws().profile.name = name.value.trim().slice(0, 80); W().persist(); }
 let host = document.getElementById('pf-print'); if (host) host.remove();
 document.body.insertAdjacentHTML('beforeend', `<div id="pf-print">${portfolioHTML()}</div>`);
 document.body.classList.add('printing-portfolio');
 const done = () => { document.body.classList.remove('printing-portfolio'); document.getElementById('pf-print')?.remove(); window.removeEventListener('afterprint', done); };
 window.addEventListener('afterprint', done);
 window.print();
 setTimeout(() => { if (document.body.classList.contains('printing-portfolio') && !matchMedia('print').matches) done(); }, 60000);
}

/* ---------- events ---------- */
function saveText() { if (!S) return; for (const id of ['a0', 'a2', 'a3']) { const el = document.getElementById(id); if (el) S.answers[id] = el.value; } }
function redraw() { saveText(); W().rerender(); }
document.addEventListener('click', e => {
 const b = e.target.closest('[data-train]'); if (!b) return;
 const a = b.dataset.train;
 if (a === 'start') { startShift(); redraw(); window.scrollTo(0, 0); return; }
 if (a === 'check') { S.checked = true; redraw(); return; }
 if (a === 'next') { saveText(); S.step++; S.checked = false; redraw(); window.scrollTo(0, 0); return; }
 if (a === 'back') { saveText(); S.step--; S.checked = false; redraw(); return; }
 if (a === 'up' || a === 'down') { const i = +b.dataset.i, j = a === 'up' ? i - 1 : i + 1; [S.order[i], S.order[j]] = [S.order[j], S.order[i]]; S.checked = false; redraw(); setTimeout(() => document.querySelector(`[data-train="${a}"][data-i="${j}"]`)?.focus(), 0); return; }
 if (a === 'rate') { const id = S.ids[S.i]; rate(id, b.dataset.g); S.done.push(id); S.i++; S.step = 0; S.order = null; S.checked = false; S.answers = {}; redraw(); window.scrollTo(0, 0); return; }
 const lc = LANGS[b.dataset.l] ? b.dataset.l : 'de', st = VS[lc];
 if (a === 'vmode') { st.mode = b.dataset.m; st.show = false; redraw(); return; }
 if (a === 'vocab-show') { st.show = true; redraw(); return; }
 if (a === 'vocab-known') { if (st.idx !== null) known(lc)[st.idx] = true; W().persist(); st.idx = null; st.show = false; redraw(); return; }
 if (a === 'vocab-again') { st.idx = null; st.show = false; redraw(); return; }
 if (a === 'vocab-reset') { W().ws()[LANGS[lc].key] = {}; W().persist(); st.idx = null; redraw(); return; }
 if (a === 'lterms') { const ap = window.ServerLabApp, s0 = ap?.state(); if (s0?.languages) { s0.languages.target = lc; ap.save(); } return; }
 if (a === 'portfolio') { printPortfolio(); return; }
});

window.ArefiTraining = { page: name => name === 'shift' ? shiftPage() : name === 'english' ? langPage('en') : langPage('de'), portfolioCard };
})();
