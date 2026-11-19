/* Plattform-Anbindung.
   Desktop (lokaler Host auf 127.0.0.1:18764): Lebenszeichen an den Host, damit er sich nach dem Schließen des Fensters beendet.
   Web-App (PWA): Offline-Speicher per Service Worker, Installationsknopf, Hinweis bei neuer Version. */
(() => {
'use strict';
const isHost = location.host === '127.0.0.1:18764';
const lang = () => { const l = document.documentElement.lang; return l === 'de' || l === 'en' ? l : 'fa'; };
const T = (fa, de, en) => lang() === 'de' ? de : lang() === 'en' ? en : fa;

if (isHost) {
 const ping = () => fetch('/api/ping', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: '{}', keepalive: true }).catch(() => {});
 ping(); setInterval(ping, 15000);
 document.addEventListener('visibilitychange', () => { if (!document.hidden) ping(); });
 window.addEventListener('pagehide', () => { try { navigator.sendBeacon('/api/bye', new Blob(['{}'], { type: 'text/plain' })); } catch {} });
 window.ArefiPWA = { install() {}, canInstall: () => false };
 return;
}

let deferred = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; const b = document.getElementById('pwa-install'); if (b) b.hidden = false; });
window.ArefiPWA = {
 canInstall: () => !!deferred,
 async install() { if (!deferred) return; deferred.prompt(); try { await deferred.userChoice; } catch {} deferred = null; const b = document.getElementById('pwa-install'); if (b) b.hidden = true; }
};

/* iPhone und iPad: Safari kennt kein beforeinstallprompt. Darum eine eigene Anleitung „Zum Home-Bildschirm“. */
const UA = navigator.userAgent || '';
const IOS = /iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const IPAD = /iPad/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const STANDALONE = () => navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
const INAPP = /FBAN|FBAV|Instagram|Line\/|Telegram|WhatsApp|GSA\/|LinkedInApp|Snapchat/i.test(UA);
const HINT = 'arefi-ios-hint';
const SHARE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5"/><path d="M7 10H5.5A1.5 1.5 0 0 0 4 11.5v8A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5H17"/></svg>';
const ADD = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8.5v7M8.5 12h7"/></svg>';
function iosGuide(force) {
 if (document.getElementById('ios-install')) return;
 if (!force) { try { const v = localStorage.getItem(HINT); if (v === 'never' || (v && Date.now() < +v)) return; } catch {} }
 const dev = IPAD ? 'iPad' : 'iPhone';
 const steps = INAPP ? [T('این صفحه داخل یک برنامهٔ دیگر باز شده است. از منوی آن برنامه «باز کردن در Safari» را بزن.', 'Diese Seite ist in einer anderen App geöffnet. Wähle im Menü dieser App „In Safari öffnen“.', 'This page is open inside another app. Choose “Open in Safari” from that app’s menu.'), T('بعد در Safari دکمهٔ اشتراک‌گذاری ' + SHARE + ' را بزن (در iOS 26 اول روی «…» کنار نشانی).', 'Tippe dann in Safari auf Teilen ' + SHARE + ' (unter iOS 26 zuerst auf „…“ neben der Adresse).', 'Then tap Share ' + SHARE + ' in Safari (on iOS 26 first tap “…” next to the address).'), T('«افزودن به صفحهٔ اصلی» ' + ADD + ' را انتخاب کن و «افزودن» را بزن.', '„Zum Home-Bildschirm“ ' + ADD + ' wählen und „Hinzufügen“ tippen.', 'Choose “Add to Home Screen” ' + ADD + ' and tap “Add”.')]
  : [T('دکمهٔ اشتراک‌گذاری ' + SHARE + ' را بزن. در iOS 26 اول روی «…» کنار نوار نشانی بزن، بعد «اشتراک‌گذاری».', 'Tippe auf Teilen ' + SHARE + '. Unter iOS 26 zuerst auf „…“ neben der Adressleiste, dann „Teilen“.', 'Tap Share ' + SHARE + '. On iOS 26 first tap “…” next to the address bar, then “Share”.'), T('پایین‌تر برو و «افزودن به صفحهٔ اصلی» ' + ADD + ' را انتخاب کن.', 'Etwas nach unten wischen und „Zum Home-Bildschirm“ ' + ADD + ' wählen.', 'Scroll down and choose “Add to Home Screen” ' + ADD + '.'), T('گزینهٔ «باز کردن به‌عنوان برنامهٔ وب» را روشن بگذار و «افزودن» را بزن. نماد ITPraxis روی صفحهٔ اصلی می‌آید.', '„Als Web-App öffnen“ eingeschaltet lassen und „Hinzufügen“ tippen. Das ITPraxis-Symbol erscheint auf dem Home-Bildschirm.', 'Leave “Open as Web App” switched on and tap “Add”. The ITPraxis icon appears on your Home Screen.')];
 document.body.insertAdjacentHTML('beforeend', `<div id="ios-install" role="dialog" aria-modal="false" aria-labelledby="ios-install-t"><div class="ios-sheet"><img src="icons/icon-180.png" alt="" width="52" height="52"><div class="ios-body"><h2 id="ios-install-t">${T('ITPraxis را روی ' + dev + ' نصب کن', 'ITPraxis auf dem ' + dev + ' installieren', 'Install ITPraxis on your ' + dev)}</h2><p>${T('مثل یک برنامه از صفحهٔ اصلی باز می‌شود، تمام‌صفحه و آفلاین کار می‌کند و خودش به‌روز می‌شود.', 'Startet wie eine App vom Home-Bildschirm, im Vollbild, offline und aktualisiert sich selbst.', 'Opens like an app from the Home Screen, full screen, works offline and updates itself.')}</p><ol>${steps.map(x => `<li>${x}</li>`).join('')}</ol><div class="ios-actions"><button type="button" class="btn" data-ios="later">${T('بعداً', 'Später', 'Later')}</button><button type="button" class="btn secondary" data-ios="never">${T('دیگر نشان نده', 'Nicht mehr anzeigen', 'Don’t show again')}</button></div></div></div></div>`);
 const box = document.getElementById('ios-install');
 box.addEventListener('click', e => { const b = e.target.closest('[data-ios]'); if (!b) return; try { localStorage.setItem(HINT, b.dataset.ios === 'never' ? 'never' : String(Date.now() + 7 * 864e5)); } catch {} box.remove(); });
}
window.ArefiPWA.ios = { device: IOS ? (IPAD ? 'ipad' : 'iphone') : '', standalone: STANDALONE, guide: () => iosGuide(true) };
if (IOS && !STANDALONE()) window.addEventListener('load', () => setTimeout(() => iosGuide(false), 2500));

function banner() {
 if (document.getElementById('pwa-update')) return;
 document.body.insertAdjacentHTML('beforeend', `<div id="pwa-update" role="status"><span>${T('نسخهٔ تازهٔ Arefi ITPraxis آماده است.', 'Eine neue Version von Arefi ITPraxis ist bereit.', 'A new version of Arefi ITPraxis is ready.')}</span><button class="btn" type="button" id="pwa-reload">${T('به‌روزرسانی', 'Aktualisieren', 'Update')}</button></div>`);
 document.getElementById('pwa-reload').addEventListener('click', () => { navigator.serviceWorker.getRegistration().then(r => { if (r && r.waiting) r.waiting.postMessage('skip'); else location.reload(); }); });
}
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
 window.addEventListener('load', async () => {
  try {
   const reg = await navigator.serviceWorker.register('sw.js');
   if (reg.waiting && navigator.serviceWorker.controller) banner();
   reg.addEventListener('updatefound', () => { const w = reg.installing; if (!w) return; w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) banner(); }); });
   setInterval(() => reg.update().catch(() => {}), 3600000);
  } catch {}
 });
 let reloaded = false;
 navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloaded) return; reloaded = true; location.reload(); });
}
})();
