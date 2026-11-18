/* Arefi ITPraxis – einheitliche Lektionsansicht (fa/de/en) und RTL-Textpflege */
window.ArefiLessonFactory = function (H) {
'use strict';
const { uiLocale, num, mixed, esc, icon, modules, sources, lm, ms, trackFor, lt, missingPrerequisites, completed, independent, units, size, learningMeta, quizHTML, completionHTML, languageLesson, badge, localTitle, recommend, selectedTrack } = H;
const FA = () => uiLocale() === 'fa';
const T = (fa, de, en) => FA() ? fa : uiLocale() === 'de' ? de : en;
const N = v => FA() ? num(v) : String(v);
const txt = v => esc(v);

/* ---------- Schritttext in lesbare Abschnitte zerlegen ---------- */
const ABBR = [/\bz\. B\./g, /\bd\. h\./g, /\bu\. a\./g, /\bz\. T\./g, /\bi\. d\. R\./g];
function splitSentences(html) {
  let s = html;
  ABBR.forEach(r => { s = s.replace(r, m => m.replace(/ /g, ' ')); });
  return s.split(/(?<=[.!?؟])\s+(?=[A-ZÄÖÜ؀-ۿ„"«<])/).map(x => x.trim()).filter(Boolean);
}
function structureStep(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html || '';
  [...tpl.content.children].forEach(p => {
    if (p.tagName !== 'P') return;
    const parts = splitSentences(p.innerHTML);
    if (parts.length < 2) return;
    const ul = document.createElement('ul');
    ul.className = 'lv-points';
    ul.innerHTML = parts.map(x => `<li>${x}</li>`).join('');
    p.replaceWith(ul);
  });
  return tpl.innerHTML;
}

/* ---------- Bausteine ---------- */
function cmd(s) {
  const label = s.label || T('Windows PowerShell · با دسترسی مدیر', 'Windows PowerShell · als Administrator', 'Windows PowerShell · as administrator');
  return `<div class="command lv-command"><div class="command-head"><span>${esc(label)}</span><button type="button" class="copy-btn" data-action="copy">${icon('copy')}${T('کپی فرمان', 'Kopieren', 'Copy')}</button></div><pre dir="ltr"><code>${esc(s.code)}</code></pre></div>`;
}
function stepBody(x) {
  return `<div class="lv-block"><h4 class="lv-label">${T('چه کار کنی', 'So gehst du vor', 'What to do')}</h4><div class="lv-text">${structureStep(x.html)}</div></div>`
    + (x.code ? `<div class="lv-block"><h4 class="lv-label">${T('فرمان', 'Befehl', 'Command')}</h4>${cmd(x)}</div>` : '')
    + (x.expect ? `<div class="lv-expect" role="note"><span class="lv-expect-icon">${icon('check')}</span><div><b>${T('نشانهٔ موفقیت', 'So erkennst du den Erfolg', 'How you know it worked')}</b><p>${txt(x.expect)}</p></div></div>` : '');
}
function phases(m, s, d) {
  const lastStep = d.steps.length - 1;
  const done = {
    learn: completed(m) || s.step === lastStep || s.tasks.some(Boolean),
    check: completed(m),
    practice: independent(m)
  };
  const list = [
    ['learn', T('بفهم و اجرا کن', 'Verstehen und ausführen', 'Understand and execute'), T(`${N(d.steps.length)} گام راهنمایی‌شده`, `${d.steps.length} geführte Schritte`, `${d.steps.length} guided steps`)],
    ['check', T('نتیجه را بررسی کن', 'Ergebnis prüfen', 'Verify the result'), T(`${N(m.tasks.length)} معیار و آزمون کوتاه`, `${m.tasks.length} Kriterien und Wissenscheck`, `${m.tasks.length} criteria and a quiz`)],
    ['practice', T('بدون راهنما حل کن', 'Selbstständig lösen', 'Solve independently'), T('مهارت را ثابت کن', 'Fähigkeit nachweisen', 'Prove the skill')]
  ];
  return `<nav class="lv-phases" aria-label="${T('مراحل درس', 'Ablauf der Lektion', 'Lesson flow')}"><ol>${list.map(([id, title, sub], k) =>
    `<li class="${s.mode === id ? 'is-active' : ''} ${done[id] ? 'is-done' : ''}"><button type="button" data-action="lesson-mode" data-id="${id}" data-module="${m.id}" aria-pressed="${s.mode === id}"${s.mode === id ? ' aria-current="step"' : ''}><span class="lv-phase-no">${done[id] && s.mode !== id ? icon('check') : N(k + 1)}</span><span class="lv-phase-txt"><b>${title}</b><small>${sub}</small></span></button></li>`).join('')}</ol></nav>`;
}
function learnView(m, s, d) {
  const j = Math.min(s.step, d.steps.length - 1), x = d.steps[j], last = d.steps.length - 1;
  const pct = Math.round((j + 1) / d.steps.length * 100);
  return `<div class="lv-learn">
<ol class="lv-outline" aria-label="${T('گام‌های درس', 'Schritte der Lektion', 'Lesson steps')}">${d.steps.map((st, k) =>
    `<li class="${k === j ? 'is-current' : k < j ? 'is-seen' : ''}"><button type="button" data-action="lesson-step" data-id="${k}" data-module="${m.id}" aria-pressed="${k === j}"${k === j ? ' aria-current="step"' : ''}><span class="lv-dot">${k < j ? icon('check') : N(k + 1)}</span><span class="lv-otitle">${txt(st.title)}</span></button></li>`).join('')}</ol>
<article class="lv-step">
<div class="lv-step-top"><span class="lv-count">${T(`گام ${N(j + 1)} از ${N(d.steps.length)}`, `Schritt ${j + 1} von ${d.steps.length}`, `Step ${j + 1} of ${d.steps.length}`)}</span><span class="lv-bar" aria-hidden="true"><span style="width:${pct}%"></span></span></div>
<h2 class="lv-step-title">${txt(x.title)}</h2>
${stepBody(x)}
<div class="lv-nav">${j > 0 ? `<button class="btn secondary" data-action="lesson-step" data-id="${j - 1}" data-module="${m.id}">${T('گام قبلی', 'Zurück', 'Back')}</button>` : '<span></span>'}${j < last ? `<button class="btn" data-action="lesson-step" data-id="${j + 1}" data-module="${m.id}">${T('گام بعد', 'Nächster Schritt', 'Next step')} ${icon('arrow')}</button>` : `<button class="btn" data-action="lesson-mode" data-id="check" data-module="${m.id}">${T('بررسی نتیجه', 'Ergebnis prüfen', 'Verify the result')} ${icon('check')}</button>`}</div>
<p class="lv-hint">${T('جابه‌جایی میان گام‌ها فقط جای مطالعه را ذخیره می‌کند؛ موفقیت VM را تأیید نمی‌کند.', 'Das Weiterblättern speichert nur deine Leseposition. Es bestätigt nicht, dass die VM richtig läuft.', 'Moving between steps only saves your reading position. It does not confirm that the VM works.')}</p>
</article></div>`;
}
function checkView(m, s, d) {
  return `<div class="lv-section-head"><h2>${T('معیارهای پذیرش', 'Abnahmekriterien', 'Acceptance criteria')}</h2><p>${T('هر معیار را فقط بعد از دیدن نتیجهٔ واقعی روی VM تیک بزن. سایت VM تو را نمی‌بیند.', 'Hake ein Kriterium erst ab, wenn du das echte Ergebnis auf deiner VM gesehen hast. Die Website sieht deine VM nicht.', 'Tick a criterion only after you have seen the real result on your VM. The website cannot see your VM.')}</p></div>
<div class="lv-criteria">${d.tasks.map((task, k) => `<label class="task-row lv-criterion"><input type="checkbox" data-task="${k}" data-module="${m.id}" ${s.tasks[k] ? 'checked' : ''}><span>${txt(task)}</span></label>`).join('')}</div>`;
}
function practiceView(m, s, d) {
  const meta = FA() ? learningMeta[m.id] : null;
  const task = meta ? esc(meta.challenge.task) : esc(d.goal);
  const proof = meta ? esc(meta.challenge.proof) : esc(T('', 'Alle Abnahmekriterien ohne Anleitung erfüllt und in eigenen Worten erklärt: Was hast du getan, warum hat es funktioniert, wie hast du es getestet?', 'All acceptance criteria met without the guide and explained in your own words: what you did, why it worked and how you tested it.'));
  const hint = meta ? esc(meta.challenge.hint) : esc(T('', 'Lies den passenden Schritt erst, wenn du festhängst. Notiere vor Änderungen den alten Wert und nimm nur deine eigene Teständerung zurück.', 'Read the matching step only when stuck. Record the previous value before a change and undo only your own test change.'));
  return `<div class="lv-section-head"><h2>${T('راهنما را ببند و مسئله را حل کن', 'Anleitung schließen und selbst lösen', 'Close the guide and solve it yourself')}</h2></div>
<div class="lv-task"><h4 class="lv-label">${T('مسئله', 'Aufgabe', 'Task')}</h4><p>${task}</p></div>
<div class="lv-expect"><span class="lv-expect-icon">${icon('check')}</span><div><b>${T('شاهد لازم', 'Nachweis', 'Evidence')}</b><p>${proof}</p></div></div>
<details class="learning-details lv-more"><summary>${T('فقط اگر گیر کردی: راهنمای کوتاه', 'Nur wenn du festhängst: kurzer Hinweis', 'Only if stuck: a short hint')}</summary><p>${hint}</p>${meta ? `<p>${esc(meta.challenge.reset)}</p>` : ''}</details>
<label class="note-label" for="reflection">${T('به زبان خودت: چرا این راه‌حل کار کرد؟', 'In eigenen Worten: Warum hat deine Lösung funktioniert?', 'In your own words: why did your solution work?')}</label>
<textarea id="reflection" data-reflection="${m.id}" maxlength="6000">${esc(s.reflection)}</textarea>
<p class="micro" id="reflection-status">${T('توضیح تو خودکار نمره‌گذاری نمی‌شود.', 'Deine Erklärung wird nicht automatisch bewertet.', 'Your explanation is not graded automatically.')}</p>
<button class="btn ${independent(m) ? 'secondary' : ''}" data-action="challenge" data-module="${m.id}">${independent(m) ? T('باز کردن دوبارهٔ تأیید', 'Bestätigung wieder öffnen', 'Reopen confirmation') : T('نتیجهٔ مستقل را بررسی کرده‌ام', 'Ich habe das selbstständige Ergebnis geprüft', 'I verified the independent result')}</button>
<p class="micro" id="challenge-status" role="status">${independent(m) ? '✓' : T('اول بخش «بررسی نتیجه» را کامل کن.', 'Erfordert zuerst den Abschnitt „Ergebnis prüfen“.', 'Requires the “Verify the result” section first.')}</p>`;
}
function faultCard(m) {
  const meta = FA() ? learningMeta[m.id] : null;
  const rows = meta
    ? `<div class="lv-fault-grid"><div><h4 class="lv-label">${T('نشانه', '', '')}</h4><p>${esc(meta.fault.symptom)}</p></div><div><h4 class="lv-label">${T('اولین بررسی', '', '')}</h4><p>${esc(meta.fault.first)}</p></div></div>`
    : '';
  const steps = [
    T('کدام ماشین و کدام کاربر؟', 'Richtige VM und richtiger Benutzer?', 'Right VM and right user?'),
    T('خروجی واقعی با مقدار مورد انتظار کجا فرق دارد؟', 'Wo weicht die echte Ausgabe vom erwarteten Ergebnis ab?', 'Where does the real output differ from the expected result?'),
    T('پیش‌نیاز، نام، IP، مسیر، پورت و مجوز را جدا بررسی کن.', 'Voraussetzung, Name, IP, DNS, Route, Port, Dienst und Rechte einzeln prüfen.', 'Check prerequisites, name, IP, DNS, route, port, service and permissions separately.'),
    T('هر بار فقط یک تغییر؛ سپس دوباره آزمون کن و نتیجه را ثبت کن.', 'Immer nur eine Sache ändern, erneut testen und das Ergebnis notieren.', 'Change one thing at a time, retest and write down the result.')
  ];
  return `<section class="card lv-fault"><h2>${T('اگر نتیجه فرق داشت', 'Wenn das Ergebnis abweicht', 'If the result differs')}</h2>${rows}<ol class="lv-checklist">${steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>`;
}
function whyCard(m) {
  const meta = FA() ? learningMeta[m.id] : null;
  if (!meta) return '';
  return `<details class="card learning-details lv-why"><summary>${T('چرا این درس لازم است؟ و واژه‌های مهم', '', '')}</summary><p>${esc(meta.why)}</p><dl class="term-list">${meta.terms.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl></details>`;
}
function aside(m, s) {
  const pct = Math.round(units(m) / size(m) * 100);
  const notePh = T('ماشین، فرمان، خروجی واقعی، مشکل و راه‌حل؛ گذرواژه ننویس.', 'VM, Befehl, echte Ausgabe, Problem und nächster Schritt. Keine Kennwörter.', 'VM, command, real output, problem and next step. No passwords.');
  const pack = window.LAB.languagePacks?.[m.id];
  const terms = !FA() && pack ? `<section class="card lv-side-card"><h3>${T('', 'Begriffe dieser Lektion', 'Terms in this lesson')}</h3><dl class="lv-terms">${pack.terms.map(x => `<div><dt>${esc(x[uiLocale()])}</dt><dd lang="${uiLocale() === 'de' ? 'en' : 'de'}">${esc(x[uiLocale() === 'de' ? 'en' : 'de'])}</dd></div>`).join('')}</dl><a href="#languages">${T('', 'Sprachtraining', 'Language practice')}</a></section>` : '';
  return `<aside class="task-panel lv-aside">
<section class="card lv-side-card lv-progress"><h3>${T('پیشرفت این درس', 'Dein Fortschritt', 'Your progress')}</h3>
<div class="lv-pct"><b>${FA() ? num(pct) + '٪' : pct + ' %'}</b><span id="module-points">${FA() ? `${num(units(m))} از ${num(size(m))} معیار` : `${units(m)}/${size(m)} ${T('', 'Kriterien erfüllt', 'criteria complete')}`}</span></div>
<div class="track"><span id="module-bar" style="width:${pct}%"></span></div>
<p class="micro">${T('فرمان‌ها از این سایت اجرا نمی‌شوند. پیش از هر فرمان ماشین، حساب و شبکه را کنترل کن.', 'Die Website führt keine Befehle aus. Prüfe vor jedem Befehl VM, Konto und Netzwerk.', 'The website runs no commands. Check VM, account and network before each command.')}</p>
<button class="btn secondary lv-ai" data-action="ai-from-lesson" data-module="${m.id}" data-step="${s.step}">${T('پرسش از مربی KI', 'KI-Tutor fragen', 'Ask the AI tutor')}</button></section>
<section class="card lv-side-card"><label class="note-label" for="module-note">${T('شاهد اجرا و نقطهٔ توقف', 'Nachweis und Haltepunkt', 'Evidence and stopping point')}</label><textarea id="module-note" data-note="${m.id}" maxlength="12000" placeholder="${esc(notePh)}">${esc(s.note)}</textarea><p id="note-status" class="micro">${T('فقط در این مرورگر و فایل پشتیبان تو ذخیره می‌شود.', 'Gespeichert in diesem Browser und in deiner Sicherung.', 'Stored in this browser and in your backup.')}</p></section>
${FA() ? languageLesson(m, true) : terms}
<details class="card learning-details lv-side-card"><summary>${T('منابع رسمی', 'Offizielle Quellen', 'Official references')}</summary>${m.sources.map(k => `<p><a href="${esc(sources[k].url)}" target="_blank" rel="noopener noreferrer">${esc(sources[k].name || k)} ↗</a></p>`).join('')}</details>
</aside>`;
}

/* ---------- Seite ---------- */
function page(i) {
  const m = modules[i], d = lm(m), s = ms(m), t = trackFor(m.id);
  const missing = missingPrerequisites(m.id, id => completed(modules.find(x => x.id === id)));
  const pos = t.modules.indexOf(m.id);
  const trackName = FA() ? esc(t.title) : esc(lt(t));
  const next = completed(m) ? recommend(selectedTrack().id, id => completed(modules.find(x => x.id === id))) : null;
  const box = window.ArefiWork?.lessonBox ? window.ArefiWork.lessonBox(m.id) : '';
  const view = s.mode === 'check' ? checkView(m, s, d) : s.mode === 'practice' ? practiceView(m, s, d) : learnView(m, s, d);
  return `<div class="lv">
<div class="crumb"><a href="#">${T('مسیرها', 'Lernpfade', 'Tracks')}</a><span>/</span><span>${trackName}</span><span>/</span><span>${T(`درس ${N(pos + 1)} از ${N(t.modules.length)}`, `Lektion ${pos + 1} von ${t.modules.length}`, `Lesson ${pos + 1} of ${t.modules.length}`)}</span></div>
<header class="lv-head">
<h1>${txt(d.title)}</h1>
<p class="lv-goal">${txt(d.goal)}</p>
<ul class="lv-meta"><li>${icon('clock')}${T(`حدود ${N(m.minutes)} دقیقه`, `ca. ${m.minutes} Minuten`, `about ${m.minutes} minutes`)}</li><li>${icon('server')}<bdi dir="ltr">${esc(m.where)}</bdi></li><li>${badge(m)}</li></ul>
${missing.length ? `<p class="lv-prereq"><b>${T('اول آماده کن:', 'Zuerst vorbereiten:', 'Prepare first:')}</b> ${missing.map(id => `<a href="#mod/${id}">${txt(localTitle(id))}</a>`).join(FA() ? '، ' : ', ')}</p>` : ''}
</header>
${phases(m, s, d)}
<div class="lesson-layout lv-layout"><div class="lesson-content">
${box}
<section class="card lesson-work lv-work" id="lesson-work" tabindex="-1">${view}</section>
${s.mode === 'check' ? quizHTML(m) : ''}
${whyCard(m)}
${faultCard(m)}
<details class="card learning-details lv-full"><summary>${T('همهٔ گام‌ها در یک صفحه (برای مرور)', 'Alle Schritte auf einer Seite (zum Nachschlagen)', 'All steps on one page (for reference)')}</summary>${d.steps.map((x, k) => `<article class="lv-full-step"><h3><span class="lv-dot">${N(k + 1)}</span>${txt(x.title)}</h3>${stepBody(x)}</article>`).join('')}</details>
<div id="completion">${completionHTML(m, i)}</div>
<div class="lesson-bottom"><a class="btn secondary" href="#">${T('بازگشت به مسیر', 'Zurück zum Lernpfad', 'Back to track')}</a>${next ? `<a class="btn" href="#mod/${next.target}">${T('درس بعدی: ', 'Nächste Lektion: ', 'Next lesson: ')}${txt(localTitle(next.target))}</a>` : ''}</div>
</div>${aside(m, s)}</div></div>`;
}

return { page, structureStep };
};

(function () {
'use strict';
const FA = () => (window.ServerLabApp ? window.ServerLabApp.locale() : document.documentElement.lang) === 'fa';
/* ---------- Persisch: lateinische Begriffe als LTR-Inseln ---------- */
const RUN = /(?:~\/|[\/~$])?[A-Za-z0-9](?:[^\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF«»\n.;!?]|[.;!?](?=[^\s\u0600-\u06FF]))*[A-Za-z0-9)\]+%\/?!]|[A-Za-z0-9]/g;
const SKIP = new Set(['PRE', 'CODE', 'BDI', 'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'KBD', 'SVG']);
function isolateLatin(root) {
  if (!root || !FA()) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!/[A-Za-z0-9]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      for (let e = n.parentElement; e && e !== root; e = e.parentElement) {
        if (SKIP.has(e.tagName) || e.getAttribute('dir') === 'ltr') return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => {
    const v = n.nodeValue; RUN.lastIndex = 0;
    if (!RUN.test(v)) return; RUN.lastIndex = 0;
    const frag = document.createDocumentFragment(); let last = 0, mm;
    while ((mm = RUN.exec(v))) {
      let run = mm[0];
      while (/[.,;:]$/.test(run) || (run.endsWith(')') && !run.includes('('))) run = run.slice(0, -1);
      if (!run) continue;
      if (mm.index > last) frag.append(v.slice(last, mm.index));
      const b = document.createElement('bdi'); b.dir = 'ltr'; b.textContent = run; frag.append(b);
      last = mm.index + run.length; RUN.lastIndex = last;
    }
    if (last < v.length) frag.append(v.slice(last));
    /* In Flex-/Grid-Containern würde jedes Stück ein eigenes Item (z. B. summary mit space-between). */
    const par = n.parentElement;
    if (par && /flex|grid/.test(getComputedStyle(par).display)) {
      const box = document.createElement('span'); box.className = 'bidi-text'; box.append(frag); n.replaceWith(box);
    } else n.replaceWith(frag);
  });
}
function hook() {
  const main = document.querySelector('main');
  if (!main) return;
  const run = () => isolateLatin(main);
  new MutationObserver(run).observe(main, { childList: true });
  run();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hook); else hook();

window.ArefiIsolateLatin = isolateLatin;
})();
