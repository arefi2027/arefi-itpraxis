/* Arefi ITPraxis – Netzwerkdiagramme (SVG) für Laborübungen.
   topo = { w, h, n: [[id, typ, x, y, name, unterzeile]], l: [[a, b, beschriftung, stil]] }
   Typen: router, switch, l3switch, pc, laptop, server, cloud, firewall, ap, wlc
   Stile: '' (normal), 'alt' (gestrichelt, Backup/blockiert), 'double' (gebündelt), 'wifi' (Funk) */
(() => {
'use strict';
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arrow = (x1, y1, x2, y2) => {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 4.5;
  return `<path class="tp-ic-l" d="M${x1} ${y1} L${x2} ${y2} M${x2} ${y2} L${(x2 - s * Math.cos(a - .6)).toFixed(1)} ${(y2 - s * Math.sin(a - .6)).toFixed(1)} M${x2} ${y2} L${(x2 - s * Math.cos(a + .6)).toFixed(1)} ${(y2 - s * Math.sin(a + .6)).toFixed(1)}"/>`;
};
const ICON = {
  router: () => `<circle class="tp-ic tp-rt" r="21"/>${arrow(-11, -11, -3, -3)}${arrow(11, 11, 3, 3)}${arrow(-3, 3, -11, 11)}${arrow(3, -3, 11, -11)}`,
  switch: () => `<rect class="tp-ic tp-sw" x="-27" y="-15" width="54" height="30" rx="6"/>${arrow(-16, -5, 16, -5)}${arrow(16, 5, -16, 5)}`,
  l3switch: () => `<rect class="tp-ic tp-l3" x="-27" y="-15" width="54" height="30" rx="6"/>${arrow(-16, -5, 16, -5)}${arrow(16, 5, -16, 5)}<circle class="tp-dot" cx="21" cy="-15" r="5"/>`,
  pc: () => `<rect class="tp-ic tp-host" x="-18" y="-16" width="36" height="24" rx="3"/><path class="tp-ic-l" d="M-6 13 H6 M0 8 V13"/>`,
  laptop: () => `<rect class="tp-ic tp-host" x="-16" y="-14" width="32" height="20" rx="2"/><path class="tp-ic tp-host" d="M-22 7 H22 L18 12 H-18 Z"/>`,
  server: () => `<rect class="tp-ic tp-srv" x="-14" y="-20" width="28" height="40" rx="3"/><path class="tp-ic-l" d="M-8 -11 H8 M-8 -4 H8 M-8 3 H8"/><circle class="tp-dot" cx="0" cy="13" r="2.5"/>`,
  cloud: () => `<path class="tp-ic tp-cloud" d="M-24 10 C-34 10 -34 -6 -22 -6 C-22 -18 -4 -22 2 -12 C8 -20 24 -16 22 -4 C34 -4 34 10 22 10 Z"/>`,
  firewall: () => `<rect class="tp-ic tp-fw" x="-22" y="-16" width="44" height="32" rx="3"/><path class="tp-ic-l" d="M-22 -5 H22 M-22 6 H22 M-8 -16 V-5 M8 -16 V-5 M0 -5 V6 M-14 6 V16 M14 6 V16"/>`,
  ap: () => `<circle class="tp-ic tp-ap" r="9"/><path class="tp-wave" d="M-15 -9 A18 18 0 0 1 15 -9 M-21 -15 A26 26 0 0 1 21 -15"/>`,
  wlc: () => `<rect class="tp-ic tp-wlc" x="-26" y="-14" width="52" height="28" rx="5"/><text class="tp-in" y="4">WLC</text>`
};
const R = { router: 24, switch: 18, l3switch: 18, pc: 18, laptop: 16, server: 22, cloud: 14, firewall: 18, ap: 12, wlc: 16 };
function svg(topo, title) {
  const N = {}; topo.n.forEach(n => { N[n[0]] = n; });
  const links = topo.l.map(([a, b, lab, st]) => {
    const A = N[a], B = N[b]; if (!A || !B) return '';
    const [x1, y1, x2, y2] = [A[2], A[3], B[2], B[3]];
    let line;
    if (st === 'double') {
      const dx = y2 - y1, dy = x1 - x2, L = Math.hypot(dx, dy) || 1, o = 4;
      line = `<line class="tp-link" x1="${x1 + dx / L * o}" y1="${y1 + dy / L * o}" x2="${x2 + dx / L * o}" y2="${y2 + dy / L * o}"/><line class="tp-link" x1="${x1 - dx / L * o}" y1="${y1 - dy / L * o}" x2="${x2 - dx / L * o}" y2="${y2 - dy / L * o}"/>`;
    } else line = `<line class="tp-link${st === 'alt' ? ' tp-alt' : st === 'wifi' ? ' tp-wifi' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    // Beschriftung zwischen Textblock des oberen und Symbol des unteren Knotens platzieren
    let f = .5;
    if (Math.abs(y2 - y1) > 60) {
      const top = y1 < y2 ? A : B, bot = y1 < y2 ? B : A;
      const ya = top[3] + (R[top[1]] || 18) + (top[5] ? 34 : 20), yb = bot[3] - (R[bot[1]] || 18);
      const yt = (ya + yb) / 2; f = Math.min(.8, Math.max(.2, (yt - y1) / (y2 - y1)));
    }
    const mx = x1 + (x2 - x1) * f, my = y1 + (y2 - y1) * f;
    const tl = lab ? `<g class="tp-lab" transform="translate(${mx} ${my})"><rect x="${-(String(lab).length * 3.15 + 6)}" y="-9" width="${String(lab).length * 6.3 + 12}" height="18" rx="4"/><text y="4">${esc(lab)}</text></g>` : '';
    return line + tl;
  }).join('');
  const nodes = topo.n.map(([id, ty, x, y, name, sub]) => {
    const ic = (ICON[ty] || ICON.pc)(), r = R[ty] || 18;
    return `<g class="tp-node" transform="translate(${x} ${y})">${ic}<text class="tp-name" y="${r + 15}">${esc(name || id)}</text>${sub ? `<text class="tp-sub" y="${r + 29}">${esc(sub)}</text>` : ''}</g>`;
  }).join('');
  return `<figure class="tp-fig"><svg class="tp" viewBox="0 0 ${topo.w} ${topo.h}" role="img" aria-label="${esc(title)}" dir="ltr">${links}${nodes}</svg><figcaption>${esc(title)}</figcaption></figure>`;
}
window.ArefiTopo = { svg };
})();
