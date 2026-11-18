/* Arefi ITPraxis – Hilfsfunktion: ergänzt Kursmodule um Kernwissen, Laborbefehle, Fehlersuche, Entscheidungshilfe und Interviewfragen. */
window.ArefiPlus = function (C, P) {
  'use strict';
  if (!C || !C.modules) return;
  C.modules.forEach(m => {
    const p = P[m.id]; if (!p) return;
    if (p.know) m.know.push(...p.know);
    if (p.code) m.lab.code = m.lab.code.replace(/\s+$/, '') + '\n\n' + p.code.trim();
    if (p.trouble) m.trouble = (m.trouble || []).concat(p.trouble);
    if (p.decide) m.decide = (m.decide || []).concat(p.decide);
    if (p.pitfalls) m.pitfalls.push(...p.pitfalls);
    if (p.iv) m.iv.push(...p.iv);
    if (p.sources) m.sources.push(...p.sources);
  });
};
