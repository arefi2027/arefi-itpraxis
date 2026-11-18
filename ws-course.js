/* Arefi ITPraxis – Lernstrecke Windows Server 2025: Konfiguration der gemeinsamen Kursansicht. */
(() => {
'use strict';
const C = window.ArefiWSCourse = window.ArefiWSCourse || { modules: [] };
const pick = (l, k) => ({
  fa: { title: 'دورهٔ جامع Windows Server 2025', lead: 'این دوره بر اساس موضوع‌های کتاب «Windows Server 2025 – Das umfassende Handbuch» (Rheinwerk) مرتب شده است. توضیح‌ها، تمرین‌ها و پرسش‌ها نوشتهٔ خود این برنامه‌اند و بر پایهٔ مستندات رسمی Microsoft؛ متن کتاب در برنامه نیست. هنگام خواندن کتاب، شمارهٔ صفحه و یادداشتت را در هر ماژول ثبت کن.', part: ['بخش ۱: پایه و هویت', 'بخش ۲: هویت، سیاست و سرویس‌های شبکه', 'بخش ۳: فایل، گواهی، مجازی‌سازی و وب', 'بخش ۴: بهره‌برداری، دسترسی، ابر و امنیت'] },
  de: { title: 'Lernstrecke Windows Server 2025', lead: 'Diese Lernstrecke folgt den Themen des Buchs „Windows Server 2025 – Das umfassende Handbuch“ (Rheinwerk). Erklärungen, Übungen und Fragen sind eigene Inhalte dieses Programms auf Basis der offiziellen Microsoft-Dokumentation; Buchtext ist nicht enthalten. Trage beim Lesen in jedem Modul die Buchseite und deine Notizen ein.', part: ['Teil 1: Grundlagen und Identität', 'Teil 2: Identität, Richtlinien und Netzdienste', 'Teil 3: Dateien, Zertifikate, Virtualisierung und Web', 'Teil 4: Betrieb, Zugriff, Cloud und Sicherheit'] },
  en: { title: 'Windows Server 2025 course', lead: 'This course follows the topics of the book “Windows Server 2025 – Das umfassende Handbuch” (Rheinwerk). Explanations, exercises and questions are this app’s own content based on official Microsoft documentation; no book text is included. While reading, record the book pages and your notes in each module.', part: ['Part 1: Foundations and identity', 'Part 2: Identity, policy and network services', 'Part 3: Files, certificates, virtualization and web', 'Part 4: Operations, access, cloud and security'] }
})[l];
const v = window.ArefiCourseView(C, { key: 'arefi-ws-course', hash: 'wscourse', shell: 'PowerShell', texts: { fa: pick('fa'), de: pick('de'), en: pick('en') } });
C.page = v.page; C.mount = v.mount;
})();
