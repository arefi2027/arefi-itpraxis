(() => {
'use strict';

const content = {
 de: {
  title: 'Praxisauftrag: Die Teamfreigabe ist nicht erreichbar',
  summary: 'Bearbeite einen Supportfall als 25-Minuten-Einstieg. Du kannst mit den Beispielbefunden am Bildschirm arbeiten.',
  open: 'Praxisauftrag öffnen', courses: 'Alle Kurse', home: 'Lernpfade', evidence: 'Befunde zum Fall', review: 'Bewertungsraster für die Besprechung',
  task: 'Eine Person im Vertrieb kann vom Testclient CL01 die Freigabe auf SRV01 nicht öffnen. Ein anderes Teammitglied kann weiterarbeiten. Der Auftrag lautet, die Störung einzugrenzen, den nächsten sicheren Schritt zu begründen und eine Übergabe zu schreiben.',
  clues: ['Der Name SRV01 löst auf CL01 zur erwarteten IPv4-Adresse auf.', 'CL01 erreicht den SMB-Port von SRV01.', 'Beim Öffnen der Freigabe meldet Windows „Zugriff verweigert“.'],
  steps: ['Halte die Auswirkung und den betroffenen Benutzerkreis fest. Formuliere eine Rückfrage, die den Umfang der Störung klärt.', 'Ordne die Befunde ein. Nenne eine wahrscheinliche Ursache und einen rein lesenden Prüfschritt. Halte fest, wer ihn ausführen darf.', 'Schreibe eine kurze Übergabe mit Befund, nächstem Schritt und einer Prüfung nach einer genehmigten Änderung.'],
  rubric: ['Auswirkung und betroffener Benutzerkreis sind dokumentiert.', 'Die Diagnose stützt sich auf die Befunde. Effektive Berechtigungen oder Gruppenmitgliedschaft werden gezielt geprüft.', 'Die Maßnahme setzt eine Freigabe voraus und erhält das Prinzip der geringsten Rechte.', 'Der Nachtest sieht Zugriff für berechtigte und weiterhin verweigerten Zugriff für unberechtigte Testkonten vor.'],
  scoring: 'Je Kriterium einen Punkt vergeben, wenn es in der Übergabe nachvollziehbar erfüllt ist. Besprecht offene Kriterien und überarbeitet die Übergabe.',
  next: 'Weitere Supportfälle', lab: 'Mit Befehlen üben: Fall Netzlaufwerk'
 },
 en: {
  title: 'Practice assignment: The team share is inaccessible',
  summary: 'Work through a support case in 25 minutes. You can start on screen with the sample findings.',
  open: 'Open practice assignment', courses: 'All courses', home: 'Learning paths', evidence: 'Case findings', review: 'Assessment rubric',
  task: 'A member of the sales team cannot open a share on SRV01 from test client CL01. Another team member can still work. Narrow down the issue, justify the next safe step, and write a handover.',
  clues: ['CL01 resolves SRV01 to its expected IPv4 address.', 'CL01 can reach the SMB port on SRV01.', 'Windows reports “Access denied” when opening the share.'],
  steps: ['Record the impact and who is affected. Write one question that clarifies the scope of the incident.', 'Interpret the findings. Name one likely cause and a read-only check. Specify who is allowed to perform it.', 'Write a short handover with the finding, next step, and a test to run after an approved change.'],
  rubric: ['The impact and affected users are documented.', 'The diagnosis follows from the findings and proposes a targeted check of effective permissions or group membership.', 'The proposed action requires approval and preserves least privilege.', 'The follow-up test checks that authorized test accounts can access the share and unauthorized ones are still denied.'],
  scoring: 'Award one point for each criterion the handover clearly meets. Discuss any gaps and revise the handover.',
  next: 'More support cases', lab: 'Practise with commands: network drive case'
 },
 fa: {
  title: 'تمرین عملی: پوشهٔ مشترک تیم باز نمی‌شود',
  summary: 'در ۲۵ دقیقه یک تیکت پشتیبانی را بررسی کن. برای شروع می‌توانی از یافته‌های نمونه در همین صفحه استفاده کنی.',
  open: 'باز کردن تمرین عملی', courses: 'همهٔ دوره‌ها', home: 'مسیرهای یادگیری', evidence: 'یافته‌های تیکت', review: 'معیارهای ارزیابی',
  task: 'یکی از کارکنان فروش نمی‌تواند از رایانهٔ آزمایشی CL01 پوشهٔ مشترک روی SRV01 را باز کند. یکی دیگر از اعضای تیم همچنان دسترسی دارد. محدودهٔ اختلال را مشخص کن، قدم بعدی را با دلیل توضیح بده و یادداشت تحویل تیکت بنویس.',
  clues: ['نام SRV01 در CL01 به نشانی IPv4 مورد انتظار تبدیل می‌شود.', 'پورت SMB سرور SRV01 از CL01 در دسترس است.', 'هنگام باز کردن پوشه، ویندوز پیام «دسترسی رد شد» نشان می‌دهد.'],
  steps: ['اثر اختلال و کاربران درگیر را ثبت کن. یک سؤال بنویس که به روشن شدن محدودهٔ اختلال کمک کند.', 'یافته‌ها را تفسیر کن. یک علت محتمل و یک بررسی بدون تغییر تنظیمات پیشنهاد بده. مشخص کن چه کسی مجاز به انجام بررسی است.', 'یادداشت کوتاهی بنویس که یافته، قدم بعدی و آزمون پس از تغییر تأییدشده را مشخص کند.'],
  rubric: ['اثر اختلال و کاربران درگیر ثبت شده‌اند.', 'تشخیص بر اساس یافته‌هاست و بررسی دسترسی مؤثر یا عضویت در گروه را پیشنهاد می‌دهد.', 'اقدام پیشنهادی نیاز به تأیید دارد و اصل حداقل دسترسی را رعایت می‌کند.', 'آزمون نهایی دسترسی حساب آزمایشی مجاز و رد دسترسی حساب غیرمجاز را بررسی می‌کند.'],
  scoring: 'برای هر معیاری که در یادداشت به‌روشنی برآورده شده یک امتیاز بدهید. موارد ناقص را بررسی و یادداشت را اصلاح کنید.',
  next: 'تیکت‌های بیشتر', lab: 'تمرین با فرمان‌ها: مورد درایو شبکه'
 }
};

function card(locale) {
 const t = content[locale];
 return `<section class="card practice-start" aria-labelledby="practice-start-title">
 <div><h2 id="practice-start-title">${t.title}</h2><p>${t.summary}</p></div>
 <div class="practice-actions"><a class="btn" href="#auftrag">${t.open}</a><a class="btn secondary" href="#kurse">${t.courses}</a></div>
 </section>`;
}

function page(locale) {
 const t = content[locale];
 const items = lines => lines.map(line => `<li>${line}</li>`).join('');
 return `<a class="text-link" href="#">${t.home}</a>
 <h1>${t.title}</h1><p class="page-description">${t.summary}</p>
 <section class="card practice-assignment"><p>${t.task}</p>
 <details open><summary>${t.evidence}</summary><ul>${items(t.clues)}</ul></details>
 <ol>${items(t.steps)}</ol>
 <details><summary>${t.review}</summary><ul>${items(t.rubric)}</ul><p>${t.scoring}</p></details>
 <div class="practice-actions"><a class="btn" href="#support/netdrive">${t.lab}</a><a class="btn secondary" href="#support">${t.next}</a></div></section>`;
}

const SEARCH = {
 de: ['Fehler sofort lösen', 'Fehlermeldung oder Code eingeben', 'z. B. Zugriff verweigert, 0x80070005, AADSTS53003, 169.254', 'Lösung finden', 'Führt direkt zum passenden Fall mit den ersten Prüfschritten. Überall auch mit Strg+K.'],
 en: ['Fix an error now', 'Enter an error message or code', 'e.g. Access denied, 0x80070005, AADSTS53003, 169.254', 'Find the fix', 'Takes you straight to the matching case with the first checks. Also anywhere with Ctrl+K.'],
 fa: ['حل فوری خطا', 'پیام خطا یا کد را بنویس', 'مثلاً دسترسی رد شد، 0x80070005، AADSTS53003، 169.254', 'پیدا کردن راه‌حل', 'مستقیم به مورد مربوط با اولین قدم‌های بررسی می‌رسی. همه‌جا با Ctrl+K هم می‌شود.']
};
function search(locale) {
 const t = SEARCH[locale] || SEARCH.fa;
 return `<form class="card fault-search" data-fault-search role="search"><h2>${t[0]}</h2><label for="fault-q">${t[1]}</label><div class="fault-row"><input id="fault-q" type="search" autocomplete="off" placeholder="${t[2]}"><button class="btn" type="submit">${t[3]}</button></div><p class="micro">${t[4]}</p></form>`;
}
document.addEventListener('submit', e => {
 const f = e.target.closest('[data-fault-search]');
 if (!f) return;
 e.preventDefault();
 const v = (f.querySelector('#fault-q')?.value || '').trim();
 try { if (v) sessionStorage.setItem('arefi-bk-q', v); } catch {}
 location.hash = '#stoerung';
});

window.ArefiTrainingStart = { card, page, search };
})();
