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
