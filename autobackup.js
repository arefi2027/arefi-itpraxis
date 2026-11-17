/* Automatic progress backup to a file the learner chooses once (Edge File System Access API).
   The file has the same format as "Export JSON", so the normal import can restore it. */
(() => {
'use strict';
const KEY = 'serverlab.v1', DB = 'arefi-backup', STORE = 'handles', ID = 'progress', FLAG = 'arefi-backup-file';
const isApp = location.host === '127.0.0.1:18764';
const lang = () => document.documentElement.lang || 'fa';
const T = (fa, de, en) => lang() === 'de' ? de : lang() === 'en' ? en : fa;
const supported = 'showSaveFilePicker' in window && 'indexedDB' in window;
let handle = null, status = 'off', lastSaved = null, timer = null, lastError = '', configuredName = '';

function db() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
async function idb(mode, fn) {
  const d = await db();
  return new Promise((resolve, reject) => {
    const tx = d.transaction(STORE, mode), req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(req && req.result);
    tx.onerror = () => reject(tx.error);
  });
}
const loadHandle = () => idb('readonly', s => s.get(ID));
const storeHandle = h => idb('readwrite', s => s.put(h, ID));
const dropHandle = () => idb('readwrite', s => s.delete(ID));

async function permission(ask) {
  if (!handle) return false;
  const opts = { mode: 'readwrite' };
  try {
    if (await handle.queryPermission(opts) === 'granted') return true;
    return ask ? await handle.requestPermission(opts) === 'granted' : false;
  } catch { return false; }
}

async function writeNow() {
  timer = null;
  if (!handle || status !== 'on') return;
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return;
    const w = await handle.createWritable();
    await w.write(new Blob([JSON.stringify(JSON.parse(data), null, 2)], { type: 'application/json' }));
    await w.close();
    lastSaved = new Date(); lastError = '';
  } catch (e) {
    lastError = String(e && e.message || e);
    status = 'paused';
  }
  render();
}
function schedule() { if (status === 'on') { clearTimeout(timer); timer = setTimeout(writeNow, 1500); } }

const originalSet = Storage.prototype.setItem;
Storage.prototype.setItem = function (k, v) {
  originalSet.call(this, k, v);
  if (this === window.localStorage && k === KEY) schedule();
};

async function setup() {
  try {
    const h = await window.showSaveFilePicker({
      suggestedName: 'arefi-itpraxis-sicherung.json',
      types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
    });
    handle = h; await storeHandle(h); configuredName = h.name; try { localStorage.setItem(FLAG, h.name); } catch {}
    status = 'on'; await writeNow();
  } catch (e) { if (e && e.name !== 'AbortError') { lastError = String(e.message || e); render(); } }
}
async function resume() {
  // The stored handle is only read after a click, never during startup.
  if (!handle) { try { handle = await loadHandle() || null; } catch { handle = null; } }
  if (!handle) { await stop(); return; }
  if (await permission(true)) { status = 'on'; await writeNow(); } else render();
}
async function stop() { try { await dropHandle(); } catch {} try { localStorage.removeItem(FLAG); } catch {} handle = null; configuredName = ''; status = 'off'; lastSaved = null; render(); }

function time(d) {
  try { return d.toLocaleString(lang() === 'fa' ? 'fa-IR' : lang(), { dateStyle: 'short', timeStyle: 'short' }); }
  catch { return d.toISOString(); }
}
function card() {
  const name = (handle ? handle.name : configuredName).replace(/[<>&"]/g, '');
  let body, buttons;
  if (!supported) {
    body = T('این مرورگر ذخیرهٔ خودکار در فایل را پشتیبانی نمی‌کند. از «دریافت JSON» استفاده کن.',
      'Dieser Browser unterstützt keine automatische Dateisicherung. Nutze „JSON exportieren“.',
      'This browser does not support automatic file backup. Use “Export JSON”.');
    buttons = '';
  } else if (status === 'on') {
    body = T(`هر تغییر در فایل <b dir="ltr">${name}</b> ذخیره می‌شود.`, `Jede Änderung wird in <b>${name}</b> gespeichert.`, `Every change is saved to <b>${name}</b>.`) +
      (lastSaved ? ' ' + T('آخرین ذخیره: ', 'Zuletzt gespeichert: ', 'Last saved: ') + time(lastSaved) : '');
    buttons = `<button class="btn secondary" data-autobackup="stop">${T('توقف ذخیرهٔ خودکار', 'Automatische Sicherung beenden', 'Stop automatic backup')}</button>`;
  } else if (status === 'paused') {
    body = T(`ذخیره در <b dir="ltr">${name}</b> متوقف است. برای ادامه یک بار اجازه بده.`, `Die Sicherung in <b>${name}</b> ist pausiert. Erlaube den Zugriff einmal, um fortzufahren.`, `Backup to <b>${name}</b> is paused. Allow access once to continue.`);
    buttons = `<button class="btn" data-autobackup="resume">${T('ادامهٔ ذخیرهٔ خودکار', 'Sicherung fortsetzen', 'Resume backup')}</button><button class="btn secondary" data-autobackup="stop">${T('حذف تنظیم', 'Einstellung entfernen', 'Remove setting')}</button>`;
  } else {
    body = T('یک فایل انتخاب کن، مثلاً در OneDrive یا روی USB. از آن پس هر تغییر خودکار در آن ذخیره می‌شود. با «وارد کردن JSON» می‌توانی آن را برگردانی.',
      'Wähle einmal eine Datei, zum Beispiel in OneDrive oder auf einem USB-Stick. Danach wird jede Änderung automatisch dort gespeichert. Mit „JSON importieren“ stellst du sie wieder her.',
      'Choose a file once, for example in OneDrive or on a USB stick. After that every change is saved there automatically. Use “Import JSON” to restore it.');
    buttons = `<button class="btn" data-autobackup="setup">${T('انتخاب فایل پشتیبان', 'Sicherungsdatei wählen', 'Choose backup file')}</button>`;
  }
  const err = lastError ? `<p class="micro" role="alert">${T('خطا: ', 'Fehler: ', 'Error: ')}${lastError.replace(/[<>&]/g, '')}</p>` : '';
  return `<section class="card autobackup-card" id="autobackup" style="margin-top:24px"><h2>${T('ذخیرهٔ خودکار در فایل', 'Automatische Sicherung in eine Datei', 'Automatic backup to a file')}</h2><p>${body}</p>${err}<div class="autobackup-actions">${buttons}</div></section>`;
}
function render() {
  const old = document.getElementById('autobackup');
  const exportBtn = document.querySelector('main [data-action="export"]');
  if (!exportBtn) { if (old) old.remove(); banner(); return; }
  const host = exportBtn.closest('section') || exportBtn.parentElement;
  const html = card();
  banner();
  if (old) { old.outerHTML = html; return; }
  host.insertAdjacentHTML('afterend', html);
}
function banner() {
  let el = document.getElementById('autobackup-banner');
  if (status !== 'paused') { if (el) el.remove(); return; }
  const html = `<div id="autobackup-banner" role="status"><span>${T('ذخیرهٔ خودکار متوقف است.', 'Automatische Sicherung pausiert.', 'Automatic backup is paused.')}</span><button class="btn" data-autobackup="resume">${T('ادامه', 'Fortsetzen', 'Resume')}</button></div>`;
  if (el) el.outerHTML = html; else document.body.insertAdjacentHTML('beforeend', html);
}
function appWording() {
  if (!isApp || lang() !== 'fa') return;
  const m = document.querySelector('.top-meta');
  if (!m) return;
  for (const n of m.childNodes) if (n.nodeType === 3 && n.textContent.includes('مرورگر')) n.textContent = 'ذخیرهٔ پیشرفت روی همین رایانه';
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-autobackup]');
  if (!b) return;
  const a = b.dataset.autobackup;
  if (a === 'setup') setup(); else if (a === 'resume') resume(); else if (a === 'stop') stop();
});

async function init() {
  if (supported) {
    try { configuredName = localStorage.getItem(FLAG) || ''; } catch {}
    if (configuredName) status = 'paused';
  }
  const main = document.querySelector('main');
  if (main) new MutationObserver(() => { if (!document.getElementById('autobackup')) render(); appWording(); }).observe(main, { childList: true });
  new MutationObserver(() => { render(); appWording(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render(); appWording(); banner();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
