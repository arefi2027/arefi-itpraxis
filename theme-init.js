/* Arefi ITPraxis – Farbschema vor dem ersten Zeichnen setzen (verhindert helles Aufblitzen). */
(() => { let t = null; try { t = localStorage.getItem('arefi-theme'); } catch {}
  if (t !== 'dark' && t !== 'light') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t); })();
