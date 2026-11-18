/* Arefi ITPraxis – Lernstrecke Netzwerkplanung und Projektmanagement: Registrierung. Projektmappen in k-plan-p-*.js. */
(() => {
'use strict';
const C = window.ArefiKPlan = window.ArefiKPlan || { modules: [] };
window.ArefiCourseRegister({
  id: 'plan', group: 2, shell: 'PowerShell', C,
  title: ['برنامه‌ریزی شبکه و مدیریت پروژه: از سفارش مشتری تا تحویل', 'Netzwerkplanung und Projektmanagement: vom Kundenauftrag bis zur Abnahme', 'Network planning and project management: from client order to acceptance'],
  lead: [
    'پروژه‌های واقعی شبکه مثل کار در یک شرکت خدمات IT: برای هر اندازهٔ شرکت یک پوشهٔ کامل با نقشهٔ شبکه، طرح VLAN و IP، منطقه‌های امنیتی و ماتریس فایروال، محاسبهٔ دسترس‌پذیری، کابل‌کشی، PoE و UPS، هزینه و TCO، و همهٔ سندهای مدیریت پروژه طبق مراحل DIN 69901: دستور پروژه، Lastenheft و Pflichtenheft، Projekthandbuch، PSP، Netzplantechnik، گزارش وضعیت، درخواست تغییر، پروتکل تحویل و گزارش پایانی؛ به‌اضافهٔ Projektantrag و Projektdokumentation برای آزمون IHK. هر سند هم نمونهٔ کامل دارد و هم قالب خالی برای تمرین. این نسخه: پوشهٔ کامل «شرکت کوچک»؛ ماژول‌های روش و پوشه‌های خصوصی، متوسط، بزرگ و سناریوهای ویژه در راه‌اند.',
    'Echte Netzwerkprojekte wie beim IT-Dienstleister: Für jede Unternehmensgröße eine vollständige Projektmappe mit Netzplan, VLAN- und IP-Plan, Sicherheitszonen und Firewall-Matrix, Verfügbarkeitsrechnung, Verkabelung, PoE und USV, Kosten und TCO sowie allen Projektdokumenten nach den Phasen der DIN 69901: Projektauftrag, Lasten- und Pflichtenheft, Projekthandbuch, PSP, Netzplantechnik, Statusbericht, Änderungsantrag, Abnahmeprotokoll und Abschlussbericht – dazu Projektantrag und Projektdokumentation für die IHK-Prüfung. Jedes Dokument gibt es als Musterlösung und als leere Vorlage. Diese Version: vollständige Mappe „Kleine Firma“; Methodenmodule und die Mappen Privat, Mittel, Groß sowie Sonderszenarien folgen.',
    'Real network projects as at an IT service provider: for every company size a complete project folder with network plan, VLAN and IP plan, security zones and firewall matrix, availability calculation, cabling, PoE and UPS, cost and TCO, plus all project documents along the DIN 69901 phases: charter, requirements and functional specification, project handbook, WBS, network diagram technique, status report, change request, acceptance protocol and closure report – and the project application and documentation for the German IHK exam. Every document comes as a model solution and as a blank template. This version: complete “small company” folder; method modules and the private, medium, large and special-scenario folders follow.'
  ],
  part: [['بخش ۱: روش‌های فنی برنامه‌ریزی شبکه', 'Teil 1: Technische Planungsmethoden', 'Part 1: Technical planning methods'], ['بخش ۲: روش‌های مدیریت پروژه و حقوق', 'Teil 2: Projektmanagement und Recht', 'Part 2: Project management and law']],
  projects: window.ArefiPlanProjects || []
});
})();
