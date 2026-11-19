/* Arefi ITPraxis – Lernstrecke Netzwerkplanung und Projektmanagement: Registrierung. Projektmappen in k-plan-p-*.js. */
(() => {
'use strict';
const C = window.ArefiKPlan = window.ArefiKPlan || { modules: [] };
window.ArefiCourseRegister({
  id: 'plan', group: 2, shell: 'PowerShell', C,
  title: ['طراحی و برنامه‌ریزی شبکه: خانه، شرکت کوچک، متوسط و بزرگ', 'Netzwerke planen: Privat, kleine, mittlere und große Firma', 'Planning networks: home, small, medium and large company'],
  lead: [
    'شبکه را همان‌طور یاد بگیر که شرکت‌ها از تکنسین می‌خواهند: نیاز را بپرس، نقشهٔ شبکه بکش، VLAN و آدرس IP را طرح کن، اتصال از بیرون، امنیت و دسترس‌پذیری را حساب کن، کیفیت را با عدد تعریف کن، هزینه و TCO را با قیمت‌های بررسی‌شده بنویس و کار را تحویل بده. چهار پروژهٔ کامل داری: خانه با دفتر خانگی، شرکت کوچک (۱۸ نفر)، شرکت متوسط (۱۲۰ نفر با کارخانه و شعبه) و شرکت بزرگ (۸۰۰ نفر، دو دیتاسنتر، شش شعبه)؛ هر کدام با همان ده بخش، و یک پوشهٔ مقایسه که همه را کنار هم نشان می‌دهد. هر سند نمونهٔ کامل و قالب خالی دارد. درس‌های این فصل روش هر بخش را قدم‌به‌قدم آموزش می‌دهند.',
    'Netzplanung so lernen, wie Firmen sie von Technikerinnen und Technikern erwarten: Bedarf aufnehmen, Netzplan zeichnen, VLANs und IP-Adressen planen, Erreichbarkeit, Sicherheit und Verfügbarkeit bewerten, Qualität mit Zahlen festlegen, Kosten und TCO mit recherchierten Preisen rechnen und übergeben. Vier vollständige Projekte: Privat mit Home-Office, kleine Firma (18 Personen), mittlere Firma (120, mit Fertigung und Filiale) und große Firma (800, zwei Rechenzentren, sechs Filialen) – jedes mit denselben zehn Planungsbereichen – plus eine Vergleichsmappe, die alle nebeneinander zeigt. Jedes Dokument gibt es als Musterlösung und als leere Vorlage. Die Lektionen dieses Kapitels lehren die Methode jedes Bereichs Schritt für Schritt.',
    'Learn network planning the way companies expect it from technicians: gather needs, draw the network diagram, plan VLANs and IP addresses, assess reachability, security and availability, define quality with numbers, calculate cost and TCO with researched prices and hand over. Four complete projects: home with home office, small company (18 people), medium company (120, with production and a branch) and large company (800, two data centres, six branches) – each with the same ten planning areas – plus a comparison folder showing them side by side. Every document comes as a model solution and a blank template. The lessons in this chapter teach the method of each area step by step.'
  ],
  part: [['بخش ۱: روش‌های فنی برنامه‌ریزی شبکه', 'Teil 1: Technische Planungsmethoden', 'Part 1: Technical planning methods'], ['بخش ۲: روش‌های مدیریت پروژه و حقوق', 'Teil 2: Projektmanagement und Recht', 'Part 2: Project management and law']],
  projects: window.ArefiPlanProjects || []
});
})();
