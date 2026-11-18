/* Arefi ITPraxis – Marke (Logo, Wortmarke) und Startseite mit Berufszielen. */
(() => {
const lang = () => document.documentElement.lang || 'fa';
const t = (fa, de, en) => lang() === 'de' ? de : lang() === 'en' ? en : fa;
const I = () => ({ fa: 0, de: 1, en: 2 }[lang()] ?? 0);
const num = n => lang() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : String(n);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Schild-A-Bildmarke: Schildspitze = Spitze des A, Kupfer-Querbalken
let uid = 0;
const mark = (cls = '') => {
  const k = 'am' + (++uid);
  return `<svg class="${cls}" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><defs><linearGradient id="${k}g" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stop-color="#2A63A3"/><stop offset="1" stop-color="#14325C"/></linearGradient><linearGradient id="${k}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F2A35B"/><stop offset="1" stop-color="#D4772C"/></linearGradient><clipPath id="${k}s"><path d="M128 12 L224 44 V120 C224 180 186 226 128 248 C70 226 32 180 32 120 V44 Z"/></clipPath></defs><path d="M128 12 L224 44 V120 C224 180 186 226 128 248 C70 226 32 180 32 120 V44 Z" fill="url(#${k}g)"/><g clip-path="url(#${k}s)"><path fill-rule="evenodd" fill="#F4F7FA" d="M128 12 L38 262 L218 262 Z M128 106.4 L72 262 L184 262 Z"/><rect x="76" y="158" width="104" height="24" fill="url(#${k}c)"/></g><path d="M128 12 L224 44 V120 C224 180 186 226 128 248 C70 226 32 180 32 120 V44 Z" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="4"/></svg>`;
};

// Zuletzt geöffnete Lernstrecke merken (für „Weiterlernen“)
const LAST = 'arefi-last';
const remember = () => {
  const h = location.hash.slice(1);
  if (/^(k-[a-z0-9]+|wscourse|lxcourse)(\/[a-z0-9-]+)?$/.test(h)) { try { localStorage.setItem(LAST, h); } catch {} }
};
addEventListener('hashchange', remember); remember();

// Berufsziele mit Kursreihenfolge
const PATHS = [
  { id: 'helpdesk', c: ['k-cli', 'k-net', 'k-m365', 'k-ops'],
    title: ['هلپ‌دسک و پشتیبانی سطح ۱', 'Helpdesk und 1st-Level-Support', 'Helpdesk and 1st-level support'],
    who: ['برای شروع: پشتیبانی کاربر، حل تیکت، کلاینت‌ها و Microsoft 365.', 'Der Einstieg: Benutzer unterstützen, Tickets lösen, Clients und Microsoft 365 betreuen.', 'The way in: support users, solve tickets, look after clients and Microsoft 365.'] },
  { id: 'tech', c: ['k-cli', 'k-net', 'wscourse', 'k-infra', 'k-m365'],
    title: ['تکنسین IT و پشتیبانی سطح ۲', 'IT-Techniker und 2nd-Level', 'IT technician and 2nd level'],
    who: ['سرور، شبکه و زیرساخت را در محل نگه داری و عیب‌یابی کن.', 'Server, Netzwerk und Infrastruktur vor Ort betreuen und reparieren.', 'Run and repair servers, network and infrastructure on site.'] },
  { id: 'fisi', c: ['k-net', 'wscourse', 'lxcourse', 'k-dev', 'k-ops', 'k-ap'],
    title: ['Fachinformatiker Systemintegration', 'Fachinformatiker Systemintegration', 'Fachinformatiker Systemintegration'],
    who: ['دورهٔ آموزش حرفه‌ای یا بازآموزی تا آزمون AP1 و AP2.', 'Ausbildung oder Umschulung bis zur Abschlussprüfung AP1 und AP2.', 'Apprenticeship or retraining up to the AP1 and AP2 exams.'] },
  { id: 'netz', c: ['k-net', 'k-ccna', 'k-infra', 'k-ops'],
    title: ['مدیر شبکه', 'Netzwerkadministration', 'Network administration'],
    who: ['سوئیچینگ، مسیریابی، امنیت و اتوماسیون در سطح CCNA.', 'Switching, Routing, Sicherheit und Automatisierung auf CCNA-Niveau.', 'Switching, routing, security and automation at CCNA level.'] },
  { id: 'cloud', c: ['lxcourse', 'k-dev', 'k-modern', 'k-m365'],
    title: ['مدیر ابر و پلتفرم (DevOps)', 'Cloud- und Plattformadministration (DevOps)', 'Cloud and platform administration (DevOps)'],
    who: ['لینوکس، کانتینر، Infrastructure as Code، Pipeline، پایش و ابر.', 'Linux, Container, Infrastructure as Code, Pipelines, Monitoring und Cloud.', 'Linux, containers, infrastructure as code, pipelines, monitoring and cloud.'] }
];

const courses = () => (window.ArefiCourseHub && window.ArefiCourseHub.courses ? window.ArefiCourseHub.courses() : []);

const hero = () => {
  const cs = courses(), i = I();
  const total = cs.reduce((a, c) => a + c.s.total, 0), done = cs.reduce((a, c) => a + c.s.done, 0);
  let last = ''; try { last = localStorage.getItem(LAST) || ''; } catch {}
  const lastCourse = last && cs.find(c => last === c.hash || last.startsWith(c.hash + '/'));
  const first = cs.find(c => c.s.done < c.s.total) || cs[0];
  const cta = lastCourse
    ? `<a class="ax-cta" href="#${esc(last)}">${t('ادامهٔ یادگیری', 'Weiterlernen', 'Continue learning')}<small>${esc(lastCourse.title[i])}</small></a>`
    : first ? `<a class="ax-cta" href="#${esc(first.hash)}">${t('با مرحلهٔ ۱ شروع کن', 'Mit Stufe 1 beginnen', 'Start with stage 1')}<small>${esc(first.title[i])}</small></a>` : '';
  const pct = total ? Math.round(done / total * 100) : 0;
  const facts = [
    [num(total), t('ماژول عملی', 'Praxismodule', 'hands-on modules')],
    [num(cs.length), t('دورهٔ آموزشی', 'Lernstrecken', 'courses')],
    [num(3), t('زبان: فارسی، آلمانی، انگلیسی', 'Sprachen: Deutsch, Persisch, Englisch', 'languages: German, Persian, English')]
  ];
  if (done) facts.push([num(pct) + '%', t('از کل مسیر انجام شده', 'des Gesamtwegs geschafft', 'of the whole path done')]);
  return `<section class="ax-hero" aria-labelledby="ax-h">
  <div class="ax-hero-text">
    <div class="ax-lockup" dir="ltr">${mark('ax-mark')}<div><b>Arefi <span>ITPraxis</span></b><small>Lernen wie im echten IT-Job</small></div></div>
    <h1 id="ax-h">${t('IT را همان‌طور یاد بگیر که در کار واقعی پیش می‌آید.', 'Lerne IT so, wie sie im Job passiert.', 'Learn IT the way it happens on the job.')}</h1>
    <p>${t('هر ماژول: دانش اصلی، تمرین در آزمایشگاه، عیب‌یابی مثل تیکت واقعی، راهنمای تصمیم و پرسش مصاحبه. از هلپ‌دسک تا Cisco و آزمون Fachinformatiker.', 'Jedes Modul: Kernwissen, Laborübung, Fehlersuche wie im echten Ticket, Entscheidungshilfe und Interviewfragen. Vom Helpdesk bis Cisco und zur Fachinformatiker-Prüfung.', 'Every module: core knowledge, a lab exercise, troubleshooting like a real ticket, a decision guide and interview questions. From helpdesk to Cisco and the Fachinformatiker exam.')}</p>
    <div class="ax-actions">${cta}<a class="ax-cta2" href="#kurse">${t('همهٔ دوره‌ها به ترتیب', 'Alle Lernstrecken in Reihenfolge', 'All courses in order')}</a></div>
    <ul class="ax-facts">${facts.map(f => `<li><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ul>
  </div>
  <svg class="ax-net" viewBox="0 0 400 360" aria-hidden="true" focusable="false"><g stroke="#2FB4A8" stroke-opacity=".45" stroke-width="2" fill="none"><path d="M60 70 L170 40 L300 90 L360 200 L250 300 L120 260 L60 70 M170 40 L210 170 L300 90 M210 170 L360 200 M210 170 L250 300 M210 170 L120 260 M60 70 L210 170"/></g><g fill="#0F2340" stroke="#2FB4A8" stroke-width="3"><circle cx="60" cy="70" r="9"/><circle cx="170" cy="40" r="9"/><circle cx="300" cy="90" r="9"/><circle cx="360" cy="200" r="9"/><circle cx="250" cy="300" r="9"/><circle cx="120" cy="260" r="9"/></g><circle cx="210" cy="170" r="16" fill="#D4772C"/><circle cx="210" cy="170" r="30" fill="none" stroke="#D4772C" stroke-opacity=".35" stroke-width="2"/></svg>
</section>`;
};

const paths = () => {
  const cs = courses(), i = I();
  if (!cs.length) return '';
  const cards = PATHS.map(p => {
    const list = p.c.map(h => cs.find(c => c.hash === h)).filter(Boolean);
    const tot = list.reduce((a, c) => a + c.s.total, 0), dn = list.reduce((a, c) => a + c.s.done, 0);
    const next = list.find(c => c.s.done < c.s.total);
    return `<article class="ax-path"><h3>${esc(p.title[i])}</h3><p>${esc(p.who[i])}</p>
      <ol>${list.map(c => `<li class="${c.s.done === c.s.total ? 'is-done' : ''}"><a href="#${c.hash}">${esc(c.title[i])}</a><span>${num(c.s.done)}/${num(c.s.total)}</span></li>`).join('')}</ol>
      <div class="ax-bar" role="img" aria-label="${num(dn)} / ${num(tot)}"><span style="width:${tot ? Math.round(dn / tot * 100) : 0}%"></span></div>
      ${next ? `<a class="ax-next" href="#${next.hash}">${t('قدم بعدی', 'Nächster Schritt', 'Next step')}: ${esc(next.title[i])}</a>` : `<span class="ax-next">${t('این مسیر کامل شد', 'Dieses Ziel ist geschafft', 'This path is complete')}</span>`}
    </article>`;
  }).join('');
  return `<section class="ax-paths"><h2>${t('هدف شغلی‌ات را انتخاب کن', 'Wähle dein Berufsziel', 'Choose your career goal')}</h2><p>${t('هر مسیر دوره‌های لازم را به ترتیب درست نشان می‌دهد. پیشرفت در همهٔ مسیرها مشترک است.', 'Jeder Weg zeigt die nötigen Lernstrecken in sinnvoller Reihenfolge. Der Fortschritt zählt für alle Wege gemeinsam.', 'Each path lists the courses you need in a sensible order. Progress counts across all paths.')}</p><div class="ax-path-grid">${cards}</div></section>`;
};

function apply(r) {
  const brand = document.querySelector('.brand');
  if (brand) brand.innerHTML = `<span class="arefi-symbol">${mark()}</span><span class="arefi-wordmark" dir="ltr">Arefi <em>ITPraxis</em><span>Lernen wie im echten IT-Job</span></span>`;
  document.title = document.title.replace(/ServerLab|Arefi IT Lab/g, 'Arefi ITPraxis');
  const footer = document.querySelector('footer span');
  if (footer) footer.textContent = t('Arefi ITPraxis · یادگیری مثل کار واقعی IT', 'Arefi ITPraxis · Lernen wie im echten IT-Job', 'Arefi ITPraxis · Learn like on a real IT job');
  const workspace = document.querySelector('.workspace-label');
  if (workspace) workspace.textContent = t('آکادمی عملی IT', 'Deine IT-Praxisakademie', 'Your hands-on IT academy');
  if (r.page === 'path') {
    const main = document.querySelector('main');
    main.insertAdjacentHTML('afterbegin', hero() + paths());
  }
}
window.ArefiBrand = { apply, mark };
})();
