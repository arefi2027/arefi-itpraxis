/* Arefi ITPraxis Service Worker 2.1.0 · 14b6fbfc23bd */
const CACHE = 'arefi-itpraxis-2.1.0-14b6fbfc23bd';
const ASSETS = ["./", "app.css", "app.js", "arefi-icon.svg", "autobackup.js", "brand.js", "commands.js", "content.js", "desktop.js", "enterprise.js", "fonts/Neometric-Bold.woff", "fonts/Neometric-Regular.woff", "fonts/Neometric-SemiBold.woff", "fonts/OFL.txt", "fonts/Pinar-Bold.woff2", "fonts/Pinar-Medium.woff2", "fonts/Pinar-Regular.woff2", "fonts/Pinar-SemiBold.woff2", "fonts/PortadaTextARA-Bold.woff", "fonts/PortadaTextARA-Book.woff", "fonts/PortadaTextARA-Regular.woff", "fonts/PortadaTextARA-Semibold.woff", "fonts/Rokh-Bold.woff", "fonts/Rokh-Regular.woff", "fonts/Rokh-SemiBold.woff", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-192.png", "icons/maskable-512.png", "index.html", "infrastructure.js", "languages.js", "learning.js", "lesson.css", "lessonview.js", "locale-data.js", "manifest.webmanifest", "platform.js", "support-linux.js", "training.js", "work-data.js", "workplace.js"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('arefi-itpraxis-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.endsWith('/version.json')) { e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); return; }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; })).catch(() => caches.match('./index.html')));
});
