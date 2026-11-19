/* Arbeitswelt-Bereich: Alltagsfälle im Support, Firmenerwartungen, Bewerbung und Praxisbezug in Lektionen.
   Inhalte: work-data.js. Fortschritt: state.work im normalen Lernstand (Export, Import, automatische Sicherung). */
(() => {
'use strict';
const D = window.LAB;
const CASES = D.workCases || [], J = D.workJobs || {}, LES = D.workLessons || {};
const lang = () => { const l = document.documentElement.lang; return l === 'de' || l === 'en' ? l : 'fa'; };
const T = (fa, de, en) => lang() === 'de' ? de : lang() === 'en' ? en : fa;
const L = o => (o && (o[lang()] || o.de)) || '';
const E = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => lang() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(n);
const app = () => window.ServerLabApp;
const RATE_MAX = 2;

/* ---------- state ---------- */
function blank() { return { cases: {}, skills: {}, iv: {}, role: 'helpdesk', area: 'all', sr: {}, vocab: {}, profile: { name: '' } }; }
function sanitize(w) {
 const out = blank();
 if (!w || typeof w !== 'object') return out;
 for (const c of CASES) if (w.cases?.[c.id] === true) out.cases[c.id] = true;
 for (const s of J.skills || []) { const v = w.skills?.[s.id]; if (Number.isInteger(v) && v >= 0 && v <= RATE_MAX) out.skills[s.id] = v; }
 for (const q of J.interview || []) if (w.iv?.[q.id] === true) out.iv[q.id] = true;
 if ((J.roles || []).some(r => r.id === w.role)) out.role = w.role;
 if (w.area === 'all' || (J.areas && w.area in J.areas)) out.area = w.area;
 for (const c of CASES) { const x = w.sr?.[c.id]; if (x && Number.isFinite(Date.parse(x.due)) && Number.isInteger(x.ivl) && x.ivl >= 1 && x.ivl <= 60 && Number.isInteger(x.n) && x.n >= 0) out.sr[c.id] = { due: x.due, ivl: x.ivl, n: Math.min(x.n, 999) }; }
 const vn = (D.workGerman?.vocab || []).length; for (const [k, v] of Object.entries(w.vocab || {})) if (/^\d+$/.test(k) && +k < vn && v === true) out.vocab[k] = true;
 if (typeof w.profile?.name === 'string') out.profile.name = w.profile.name.slice(0, 80);
 return out;
}
function ws() { const st = app()?.state(); if (!st) return blank(); if (!st.work) st.work = blank(); const b = blank(); for (const k of Object.keys(b)) if (st.work[k] === undefined) st.work[k] = b[k]; return st.work; }
function persist() { app()?.save(); }

/* ---------- small building blocks ---------- */
const lessonTitle = id => { const m = D.modules.find(x => x.id === id); if (!m) return id; return lang() === 'fa' ? m.title : (D.locales[lang()]?.[id]?.title || m.title); };
const caseById = id => CASES.find(c => c.id === id);
function linkFor(ref) {
 const [kind, id] = String(ref).split(':');
 if (kind === 'case') { const c = caseById(id); return c ? `<a class="text-link" href="#support/${id}">${E(L(c).t)}</a>` : ''; }
 if (kind === 'mod') return `<a class="text-link" href="#mod/${id}">${E(lessonTitle(id))}</a>`;
 if (kind === 'topic') { const t = (J.topics || []).find(x => x.id === id); return t ? `<a class="text-link" href="#jobs/${id}">${E(L(t).t)}</a>` : ''; }
 if (kind === 'kurs') { const x = window.ArefiBook && window.ArefiBook.modRef(id); return x ? `<a class="text-link" href="${x.href}">${E((x.no ? x.no + ' ' : '') + x.t)}</a>` : ''; }
 if (kind === 'page') return `<a class="text-link" href="#${id}">${E(T('انتظار شرکت‌ها', 'Was Firmen erwarten', 'What employers expect'))}</a>`;
 return '';
}
function command(code, label) {
 return `<div class="command"><div class="command-head"><span>${E(label)}</span><button type="button" class="copy-btn" data-action="copy">${T('کپی', 'Kopieren', 'Copy')}</button></div><pre dir="ltr"><code>${E(code)}</code></pre></div>`;
}
const dirAttr = () => lang() === 'fa' ? ' dir="rtl"' : '';

/* ---------- page: everyday support cases ---------- */
function casesProgress() { const w = ws(); const n = CASES.filter(c => w.cases[c.id]).length; return { n, total: CASES.length }; }
/* „Genau so reparierst du es“: wo, was eingeben, worauf achten (Daten in work-run.js) */
function runHtml(c) {
 const rows = ((window.LAB || {}).workRun || {})[c.id], W = (window.LAB || {}).workRunWhere || {};
 if (!rows || !rows.length) return '';
 const pick = a => T(a[2], a[0], a[1]);
 return `<section class="work-run"><h3>${T('دقیقاً چطور تعمیر کنی: کجا، چه بنویسی، به چه نگاه کنی', 'Genau so reparierst du es: wo, was eingeben, worauf achten', 'Exactly how to fix it: where, what to enter, what to look for')}</h3>
<p class="micro">${T('نام‌ها، نشانی‌ها و شماره‌ها نمونه‌اند؛ آن‌ها را با محیط خودت عوض کن. فرمان‌هایی را که چیزی را تغییر می‌دهند فقط با مجوز و تأیید اجرا کن.', 'Namen, Adressen und Nummern sind Beispiele – an deine Umgebung anpassen. Befehle, die etwas ändern, nur mit Berechtigung und Freigabe ausführen.', 'Names, addresses and numbers are examples – adapt them to your environment. Run commands that change something only with permission and approval.')}</p>
<ol class="work-run-list">${(() => { const seen = new Set(); return rows.map(([w, inp, look]) => {
  const full = W[w] ? pick(W[w]) : w, where = seen.has(w) ? full.split(' – ')[0] : full; seen.add(w);
  const body = typeof inp === 'string' ? command(inp, where) : `<div class="work-run-do"><span class="work-run-where">${E(where)}</span><p>${E(pick(inp))}</p></div>`;
  return `<li>${body}<p class="work-run-look"><b>${T('به این نگاه کن:', 'Darauf achten:', 'Look for:')}</b> ${E(pick(look))}</p></li>`;
 }).join(''); })()}</ol></section>`;
}
function caseCard(c, open) {
 const d = L(c), w = ws(), done = !!w.cases[c.id];
 const lessons = (c.lessons || []).filter(id => D.modules.some(m => m.id === id));
 return `<details class="card work-case${done ? ' done' : ''}" id="case-${c.id}" data-area="${c.area}" data-roles="${c.roles.join(' ')}"${open ? ' open' : ''}>
<summary><span class="work-case-title">${E(d.t)}</span><span class="work-tags"><span class="work-tag area-${c.area}">${E(L(J.areas[c.area]))}</span><span class="work-tag prio-${c.prio}">${E(L(J.prio[c.prio]))}</span>${done ? `<span class="work-tag ok">✓ ${T('بلدم', 'Kann ich', 'I can do this')}</span>` : ''}</span></summary>
<div class="work-case-body">
<blockquote class="work-msg">${E(d.msg)}</blockquote>
<div class="work-grid">
<section><h3>${T('۱. اول بپرس', '1. Zuerst nachfragen', '1. Ask first')}</h3><ul>${d.ask.map(x => `<li>${E(x)}</li>`).join('')}</ul></section>
<section><h3>${T('۲. قدم‌به‌قدم بررسی کن', '2. Schritt für Schritt prüfen', '2. Check step by step')}</h3><ol>${d.steps.map(x => `<li>${E(x)}</li>`).join('')}</ol></section>
</div>
${runHtml(c) || (c.cmd ? command(c.cmd, T('فرمان‌های نمونه · نام‌ها را با محیط خودت تطبیق بده', 'Beispielbefehle · Namen an deine Umgebung anpassen', 'Example commands · adapt names to your environment')) : '')}
<div class="work-grid">
<section><h3>${T('۳. علت و راه‌حل', '3. Ursache und Lösung', '3. Cause and fix')}</h3><p>${E(d.fix)}</p></section>
<section><h3>${T('۴. نتیجه را بسنج', '4. Ergebnis prüfen', '4. Verify the result')}</h3><p>${E(d.verify)}</p></section>
</div>
<section class="work-note"><h3>${T('نمونهٔ یادداشت تیکت', 'Musternotiz im Ticket', 'Sample ticket note')}</h3><p>${E(d.note)}</p></section>
<section class="work-say"><h3>${T('به کاربر چه بگویی', 'So sagst du es dem Benutzer', 'What to tell the user')}</h3><p>${E(d.say)}</p></section>
<div class="work-grid">
<section><h3>${T('کی ارجاع بدهی', 'Eskalieren, wenn …', 'Escalate when …')}</h3><p>${E(d.esc)}</p></section>
<section class="work-boss"><h3>${T('انتظار کارفرما', 'Das erwartet der Arbeitgeber', 'What the employer expects')}</h3><p>${E(d.boss)}</p></section>
</div>
${lessons.length ? `<p class="work-links"><b>${T('در آزمایشگاه تمرین کن:', 'Im Lab üben:', 'Practise in the lab:')}</b> ${lessons.map(id => linkFor('mod:' + id)).join(' · ')}</p>` : ''}
${(c.ch || []).length && window.ArefiBook ? `<p class="work-links"><b>${T('در فصل‌ها عمیق‌تر شو:', 'Im Kapitel vertiefen:', 'Go deeper in the chapter:')}</b> ${c.ch.map(r => window.ArefiBook.modRef(r)).filter(Boolean).map(x => `<a class="text-link" href="${x.href}">${E((x.no ? x.no + ' ' : '') + x.t)}</a>`).join(' · ')}</p>` : ''}
<label class="work-check"><input type="checkbox" data-work-case="${c.id}" ${done ? 'checked' : ''}> ${T('این مورد را بدون راهنما توضیح می‌دهم و حل می‌کنم.', 'Ich kann diesen Fall ohne Vorlage erklären und lösen.', 'I can explain and solve this case without the guide.')}</label>
</div></details>`;
}
function supportPage(r) {
 const w = ws(), p = casesProgress();
 const areas = ['all', ...Object.keys(J.areas)];
 const target = r?.focus && caseById(r.focus);
 if (target && w.area !== 'all' && target.area !== w.area) w.area = 'all';
 const list = CASES.filter(c => w.area === 'all' || c.area === w.area);
 return `<div class="eyebrow">${T('تیکت‌های واقعی کار روزانه', 'Echte Tickets aus dem Arbeitsalltag', 'Real tickets from daily work')}</div>
<h1>${T('مشکلات روزمرهٔ پشتیبانی IT', 'Alltagsfälle im IT-Support', 'Everyday IT support cases')}</h1>
<p class="page-description">${T('این‌ها همان تیکت‌هایی‌اند که در هفتهٔ اول کار می‌گیری. هر مورد نشان می‌دهد چه بپرسی، به چه ترتیبی بسنجی، چه بنویسی، به کاربر چه بگویی و کارفرما از تو چه انتظاری دارد.', 'Das sind die Tickets, die du in der ersten Arbeitswoche bekommst. Jeder Fall zeigt, was du fragst, in welcher Reihenfolge du prüfst, was du dokumentierst, was du dem Benutzer sagst und was der Arbeitgeber von dir erwartet.', 'These are the tickets you get in your first week on the job. Each case shows what to ask, in which order to check, what to document, what to tell the user and what the employer expects from you.')}</p>
<section class="card work-method"><h2>${T('هر تیکت را این‌طور جلو ببر', 'So arbeitest du jedes Ticket ab', 'How to work every ticket')}</h2><ol>${(L(J.method) || []).map(x => `<li>${E(x)}</li>`).join('')}</ol><p class="micro">${linkFor('topic:itil')} · ${linkFor('topic:ticket')} · ${linkFor('topic:comm')}</p></section>
<div class="work-toolbar">
<div class="work-filters" role="group" aria-label="${T('فیلتر موضوع', 'Thema filtern', 'Filter by topic')}">${areas.map(a => `<button type="button" data-work-area="${a}" class="${w.area === a ? 'active' : ''}" aria-pressed="${w.area === a}">${a === 'all' ? T('همه', 'Alle', 'All') : E(L(J.areas[a]))}</button>`).join('')}</div>
<p class="work-progress" role="status">${T(`${num(p.n)} از ${num(p.total)} مورد را بلدی`, `${p.n} von ${p.total} Fällen sicher`, `${p.n} of ${p.total} cases mastered`)}</p>
</div>
<div class="work-case-list">${list.map(c => caseCard(c, r?.focus === c.id)).join('')}</div>`;
}

/* ---------- page: what employers expect ---------- */
function role() { const w = ws(); return (J.roles || []).find(r => r.id === w.role) || J.roles[0]; }
function rateLabel(v) { return [T('هنوز نه', 'Noch nicht', 'Not yet'), T('با کمک', 'Mit Hilfe', 'With help'), T('مستقل', 'Selbstständig', 'Independently')][v]; }
function skillLinks(s) {
 const refs = [...(s.kurs || []).map(id => 'kurs:' + id), ...(s.lessons || []).map(id => 'mod:' + id), ...(s.cases || []).map(id => 'case:' + id)];
 if (s.topic) refs.push('topic:' + s.topic);
 if (s.gap) refs.push('topic:' + s.gap);
 return refs.map(linkFor).filter(Boolean).slice(0, 4).join(' · ');
}
function gapSummary(r) {
 const w = ws(), must = r.must.map(id => J.skills.find(s => s.id === id)).filter(Boolean);
 const sure = must.filter(s => w.skills[s.id] === 2).length, help = must.filter(s => w.skills[s.id] === 1).length;
 const open = must.filter(s => (w.skills[s.id] ?? 0) < 2).sort((a, b) => (w.skills[a.id] ?? 0) - (w.skills[b.id] ?? 0)).slice(0, 5);
 return `<section class="card work-summary"><h2>${T('وضعیت تو برای این نقش', 'Dein Stand für diese Rolle', 'Your status for this role')}</h2>
<div class="work-meter" aria-hidden="true"><span style="width:${Math.round(100 * sure / must.length)}%"></span><span class="help" style="width:${Math.round(100 * help / must.length)}%"></span></div>
<p>${T(`از ${num(must.length)} مهارت اصلی: ${num(sure)} مستقل، ${num(help)} با کمک، ${num(must.length - sure - help)} هنوز نه.`, `Von ${must.length} Kernkompetenzen: ${sure} selbstständig, ${help} mit Hilfe, ${must.length - sure - help} noch nicht.`, `Of ${must.length} core skills: ${sure} independently, ${help} with help, ${must.length - sure - help} not yet.`)}</p>
${open.length ? `<h3>${T('بعدی را این‌ها تمرین کن', 'Als Nächstes üben', 'Practise next')}</h3><ul class="work-next">${open.map(s => `<li><b>${E(L(s))}</b><br><span class="micro">${skillLinks(s)}</span></li>`).join('')}</ul>` : `<p><b>${T('همهٔ مهارت‌های اصلی را مستقل علامت زده‌ای. حالا بخش مصاحبه را تمرین کن.', 'Alle Kernkompetenzen sind als selbstständig markiert. Übe jetzt das Vorstellungsgespräch.', 'All core skills are marked independent. Now practise the interview.')}</b> <a class="text-link" href="#interview">${T('مصاحبه', 'Zum Interview', 'Go to interview')}</a></p>`}
<p class="micro">${T('ارزیابی را صادقانه انجام بده: «مستقل» یعنی می‌توانی آن را بدون راهنما انجام دهی و توضیح بدهی.', 'Bewerte ehrlich: „Selbstständig“ heißt, du kannst es ohne Anleitung ausführen und erklären.', 'Rate honestly: "independently" means you can do and explain it without a guide.')}</p></section>`;
}
function skillTable(r) {
 const w = ws(), groups = Object.keys(J.groups);
 return groups.map(g => {
  const rows = J.skills.filter(s => s.g === g);
  return `<section class="card work-skills"><h2>${E(L(J.groups[g]))}</h2>${rows.map(s => {
   const rel = r.must.includes(s.id) ? 'must' : r.plus.includes(s.id) ? 'plus' : 'other';
   const v = w.skills[s.id] ?? 0;
   return `<div class="work-skill rel-${rel}"><div class="work-skill-text"><span class="work-tag ${rel}">${rel === 'must' ? T('ضروری', 'Pflicht', 'Required') : rel === 'plus' ? T('امتیاز', 'Pluspunkt', 'Plus') : T('عمومی', 'Allgemein', 'General')}</span> <b>${E(L(s))}</b>${s.gap ? ` <span class="work-tag gap">${T('در آزمایشگاه VirtualBox نیست', 'Nicht im VirtualBox-Lab', 'Not in the VirtualBox lab')}</span>` : ''}<div class="micro">${skillLinks(s)}</div></div>
<div class="work-rate" role="radiogroup" aria-label="${E(L(s))}">${[0, 1, 2].map(i => `<button type="button" role="radio" aria-checked="${v === i}" class="${v === i ? 'active r' + i : ''}" data-work-skill="${s.id}" data-v="${i}">${rateLabel(i)}</button>`).join('')}</div></div>`;
  }).join('')}</section>`;
 }).join('');
}
function topicCard(t, open) {
 const d = L(t);
 return `<details class="card work-topic" id="topic-${t.id}"${open ? ' open' : ''}><summary><h3>${E(d.t)}</h3></summary><div class="work-topic-body"${dirAttr()}>${d.html}</div></details>`;
}
function jobsPage(r) {
 const w = ws(), rr = role(), d = L(rr);
 return `<div class="eyebrow">${T('بر اساس آگهی‌های شغلی امروز آلمان و اتریش', 'Auf Grundlage aktueller Stellenanzeigen in Deutschland und Österreich', 'Based on current job ads in Germany and Austria')}</div>
<h1>${T('شرکت‌ها از تکنسین IT چه انتظاری دارند', 'Was Firmen von IT-Technikern erwarten', 'What companies expect from IT technicians')}</h1>
<p class="page-description">${T('آگهی‌های پشتیبانی و مدیریت سیستم تقریباً همیشه این‌ها را می‌خواهند: Windows 10/11، Active Directory، Microsoft 365 با Entra ID و Intune، شبکه (TCP/IP، DNS، DHCP)، سامانهٔ تیکت و ITIL، آگاهی امنیتی، مستندسازی و ارتباط خوب به آلمانی و انگلیسی. آگهی‌های شبکه افزون بر این سوئیچینگ و VLAN، Firewall و VPN، WLAN، اندازه‌گیری با ابزارها و طراحی و مستندسازی شبکه را می‌خواهند. نقش خودت را انتخاب کن و صادقانه بسنج کجا هستی.', 'Anzeigen für Support und Systemadministration verlangen fast immer: Windows 10/11, Active Directory, Microsoft 365 mit Entra ID und Intune, Netzwerk (TCP/IP, DNS, DHCP), Ticketsystem und ITIL, Sicherheitsbewusstsein, Dokumentation und gute Kommunikation auf Deutsch und Englisch. Netzwerkstellen verlangen zusätzlich Switching und VLANs, Firewall und VPN, WLAN, Messen mit Werkzeugen sowie Netzplanung und Dokumentation. Wähle deine Zielrolle und schätze ehrlich ein, wo du stehst.', 'Support and system administration ads almost always ask for: Windows 10/11, Active Directory, Microsoft 365 with Entra ID and Intune, networking (TCP/IP, DNS, DHCP), ticket system and ITIL, security awareness, documentation and good communication in German and English. Network jobs additionally ask for switching and VLANs, firewall and VPN, Wi-Fi, measuring with tools, and network planning and documentation. Pick your target role and rate honestly where you stand.')}</p>
<div class="lesson-modes work-roles">${J.roles.map(x => `<button type="button" data-work-role="${x.id}" class="${rr.id === x.id ? 'active' : ''}" aria-pressed="${rr.id === x.id}">${E(L(x).t)}</button>`).join('')}</div>
<div class="work-role-grid">
<section class="card"><h2>${E(d.t)}</h2><p>${E(d.sum)}</p><h3>${T('روز کاری معمول', 'Typischer Arbeitstag', 'Typical working day')}</h3><ul>${d.day.map(x => `<li>${E(x)}</li>`).join('')}</ul></section>
${gapSummary(rr)}
</div>
<h2 class="work-section-title">${T('چک‌لیست مهارت‌ها', 'Kompetenz-Checkliste', 'Skills checklist')}</h2>
${skillTable(rr)}
<h2 class="work-section-title">${T('دانشی که در آزمایشگاه نیست ولی خواسته می‌شود', 'Wissen, das im Lab fehlt, aber verlangt wird', 'Knowledge the lab lacks but employers ask for')}</h2>
${(J.topics || []).map(t => topicCard(t, r?.focus === t.id)).join('')}`;
}

/* ---------- page: applying and interview ---------- */
function interviewPage() {
 const w = ws(), qs = J.interview || [];
 const done = qs.filter(q => w.iv[q.id]).length;
 const kinds = Object.keys(J.kinds);
 return `<div class="eyebrow">${T('آمادگی برای گفت‌وگوی استخدامی', 'Vorbereitung auf das Vorstellungsgespräch', 'Preparing for the job interview')}</div>
<h1>${T('درخواست کار و مصاحبه', 'Bewerbung und Vorstellungsgespräch', 'Applying and interviews')}</h1>
<p class="page-description">${T('این پرسش‌ها در مصاحبهٔ پشتیبانی و مدیریت سیستم رایج‌اند. اول خودت بلند جواب بده، بعد پاسخ نمونه را باز کن و آن را با کلمات خودت و با یک مثال از آزمایشگاهت بگو. در پرسش‌های خرابی، پاسخ خوب با پرسش شروع می‌شود (از کی؟ چه کسانی گرفتارند؟ چه چیزی تغییر کرده؟)؛ در مصاحبه می‌توانی این پرسش‌ها را بلند از مصاحبه‌کننده هم بپرسی. پاسخ نمونه را حفظ نکن.', 'Diese Fragen sind in Gesprächen für Support und Systemadministration üblich. Antworte zuerst laut selbst, öffne dann die Musterantwort und formuliere sie mit eigenen Worten und einem Beispiel aus deinem Lab. Bei Störungsfragen beginnt eine gute Antwort mit Rückfragen (Seit wann? Wer ist betroffen? Was wurde geändert?); im Gespräch darfst du sie auch laut stellen: „Darf ich zuerst kurz nachfragen …?“ Lerne die Musterantwort nicht auswendig.', 'These questions are common in support and system administration interviews. Answer out loud yourself first, then open the sample answer and say it in your own words with an example from your lab. For fault questions a good answer starts with questions (Since when? Who is affected? What changed?); in the interview you may ask them out loud: "May I ask a few questions first?" Do not memorise the sample.')}</p>
<p class="work-progress" role="status">${T(`${num(done)} از ${num(qs.length)} پرسش تمرین شده`, `${done} von ${qs.length} Fragen geübt`, `${done} of ${qs.length} questions practised`)}</p>
${kinds.map(k => `<h2 class="work-section-title">${E(L(J.kinds[k]))}</h2>${qs.filter(q => q.kind === k).map(q => { const d = L(q); return `<details class="card work-iv${w.iv[q.id] ? ' done' : ''}" id="iv-${q.id}"><summary><span class="work-iv-q">${E(d.q)}</span></summary><div class="work-case-body"><p class="micro"><b>${T('چه چیزی سنجیده می‌شود:', 'Das will der Arbeitgeber prüfen:', 'What the employer checks:')}</b> ${E(d.want)}</p><section class="work-say"><h3>${T('پاسخ نمونه', 'Musterantwort', 'Sample answer')}</h3><p>${E(d.a)}</p></section>${q.link ? `<p class="work-links"><b>${T('بیشتر:', 'Vertiefen:', 'Go deeper:')}</b> ${linkFor(q.link)}</p>` : ''}<label class="work-check"><input type="checkbox" data-work-iv="${q.id}" ${w.iv[q.id] ? 'checked' : ''}> ${T('این را بلند و با مثال خودم تمرین کردم.', 'Ich habe das laut und mit eigenem Beispiel geübt.', 'I practised this out loud with my own example.')}</label></div></details>`; }).join('')}`).join('')}
${window.ArefiTraining ? window.ArefiTraining.portfolioCard() : ''}
<section class="card work-topic-body"${dirAttr()}><h2>${E(L(J.cv).t)}</h2>${L(J.cv).html}</section>`;
}

/* ---------- lesson box ---------- */
function lessonBox(id) {
 const x = LES[id]; if (!x) return '';
 const d = L(x), cases = CASES.filter(c => (c.lessons || []).includes(id));
 return `<section class="card work-lesson" id="work-lesson"><h2>${T('مأموریت تو در محیط کار', 'Dein Auftrag im Arbeitsalltag', 'Your task in the workplace')}</h2>
<p class="work-lesson-task">${E(d.task)}</p>
<dl class="work-lesson-grid"><div><dt>${T('چرا شرکت‌ها این را لازم دارند', 'Wozu Firmen das brauchen', 'Why companies need this')}</dt><dd>${E(d.why)}</dd></div><div><dt>${T('مشکل رایج روزانه', 'Typische Störung im Alltag', 'Typical everyday fault')}</dt><dd>${E(d.daily)}</dd></div><div><dt>${T('انتظار کارفرما', 'Das erwartet der Arbeitgeber', 'What the employer expects')}</dt><dd>${E(d.boss)}</dd></div></dl>
${cases.length ? `<p class="work-links"><b>${T('موارد واقعی پشتیبانی مرتبط:', 'Passende Alltagsfälle:', 'Related support cases:')}</b> ${cases.map(c => linkFor('case:' + c.id)).join(' · ')}</p>` : ''}</section>`;
}
function injectLessonBox() {
 const m = location.hash.match(/^#mod\/([\w-]+)$/);
 const old = document.getElementById('work-lesson');
 if (!m) { if (old) old.remove(); return; }
 if (old) return;
 const html = lessonBox(m[1]); if (!html) return;
 const anchor = document.querySelector('main .lesson-modes') || document.querySelector('main .lesson-layout');
 if (anchor) anchor.insertAdjacentHTML('beforebegin', html);
}

/* ---------- focus after navigation ---------- */
function focusTarget() {
 const m = location.hash.match(/^#(support|jobs)\/([\w-]+)$/); if (!m) return;
 const el = document.getElementById((m[1] === 'support' ? 'case-' : 'topic-') + m[2]);
 if (el) { el.open = true; el.scrollIntoView({ block: 'start' }); el.querySelector('summary')?.focus({ preventScroll: true }); }
}

/* ---------- events ---------- */
function rerender() { const y = window.scrollY; app()?.render(); window.scrollTo(0, y); }
document.addEventListener('change', e => {
 const t = e.target;
 if (t.matches('[data-work-case]')) { ws().cases[t.dataset.workCase] = t.checked || undefined; if (!t.checked) delete ws().cases[t.dataset.workCase]; persist(); const card = t.closest('.work-case'); card?.classList.toggle('done', t.checked); const pr = document.querySelector('.work-progress'); if (pr) { const p = casesProgress(); pr.textContent = T(`${num(p.n)} از ${num(p.total)} مورد را بلدی`, `${p.n} von ${p.total} Fällen sicher`, `${p.n} of ${p.total} cases mastered`); } }
 if (t.matches('[data-work-iv]')) { if (t.checked) ws().iv[t.dataset.workIv] = true; else delete ws().iv[t.dataset.workIv]; persist(); t.closest('.work-iv')?.classList.toggle('done', t.checked); const qs = J.interview || [], n = qs.filter(q => ws().iv[q.id]).length; const pr = document.querySelector('.work-progress'); if (pr) pr.textContent = T(`${num(n)} از ${num(qs.length)} پرسش تمرین شده`, `${n} von ${qs.length} Fragen geübt`, `${n} of ${qs.length} questions practised`); }
});
document.addEventListener('click', e => {
 const b = e.target.closest('[data-work-area],[data-work-role],[data-work-skill]'); if (!b) return;
 const w = ws();
 if (b.dataset.workArea) { w.area = b.dataset.workArea; persist(); rerender(); }
 else if (b.dataset.workRole) { w.role = b.dataset.workRole; persist(); rerender(); }
 else if (b.dataset.workSkill) { w.skills[b.dataset.workSkill] = Number(b.dataset.v); persist(); rerender(); }
});

function page(name, r) {
 const html = name === 'support' ? supportPage(r) : name === 'jobs' ? jobsPage(r) : name === 'interview' ? interviewPage() : window.ArefiTraining.page(name, r);
 setTimeout(focusTarget, 0);
 return `<div class="work-page"${dirAttr()}>${html}</div>`;
}

function init() {
 const main = document.querySelector('main');
 if (main) new MutationObserver(() => injectLessonBox()).observe(main, { childList: true });
 injectLessonBox();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

window.ArefiWork = { lessonBox, page, sanitize, ws, persist, rerender, T, L, E, num, lang, linkFor, command, caseById, lessonTitle, dirAttr };
})();
