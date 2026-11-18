/* Arefi ITPraxis – Lernstrecke Linux-Server: Konfiguration der gemeinsamen Kursansicht. */
(() => {
'use strict';
const C = window.ArefiLXCourse = window.ArefiLXCourse || { modules: [] };
const texts = {
  fa: { title: 'دورهٔ جامع Linux Server', lead: 'این دوره بر اساس موضوع‌های کتاب «Linux-Server – Das umfassende Handbuch» (Rheinwerk) مرتب شده است. توضیح‌ها، تمرین‌ها و پرسش‌ها نوشتهٔ خود این برنامه‌اند و بر پایهٔ مستندات رسمی Ubuntu، Debian و سازندگان نرم‌افزار؛ متن کتاب در برنامه نیست. آزمایشگاه: LNX01 با Ubuntu Server 24.04 LTS، آدرس 10.20.0.30، در همان دامنهٔ دورهٔ ویندوز سرور. هنگام خواندن کتاب، شمارهٔ صفحه و یادداشتت را در هر ماژول ثبت کن.', part: ['بخش ۱: پایهٔ سیستم', 'بخش ۲: کاربر، شبکه، دسترسی و خودکارسازی ساده', 'بخش ۳: سرویس‌های شبکه و دامنه', 'بخش ۴: Container، خودکارسازی، پایش و امنیت'] },
  de: { title: 'Lernstrecke Linux-Server', lead: 'Diese Lernstrecke folgt den Themen des Buchs „Linux-Server – Das umfassende Handbuch“ (Rheinwerk). Erklärungen, Übungen und Fragen sind eigene Inhalte dieses Programms auf Basis der offiziellen Dokumentation von Ubuntu, Debian und den Softwareherstellern; Buchtext ist nicht enthalten. Labor: LNX01 mit Ubuntu Server 24.04 LTS unter 10.20.0.30 in derselben Domäne wie die Windows-Server-Lernstrecke. Trage beim Lesen in jedem Modul die Buchseite und deine Notizen ein.', part: ['Teil 1: Systemgrundlagen', 'Teil 2: Benutzer, Netzwerk, Zugriff und Skripte', 'Teil 3: Netzdienste und Domäne', 'Teil 4: Container, Automatisierung, Monitoring und Sicherheit'] },
  en: { title: 'Linux Server course', lead: 'This course follows the topics of the book “Linux-Server – Das umfassende Handbuch” (Rheinwerk). Explanations, exercises and questions are this app’s own content based on official Ubuntu, Debian and vendor documentation; no book text is included. Lab: LNX01 running Ubuntu Server 24.04 LTS at 10.20.0.30, in the same domain as the Windows Server course. While reading, record the book pages and your notes in each module.', part: ['Part 1: System foundations', 'Part 2: Users, networking, access and scripting', 'Part 3: Network services and the domain', 'Part 4: Containers, automation, monitoring and security'] }
};
const v = window.ArefiCourseView(C, { key: 'arefi-lx-course', hash: 'lxcourse', shell: 'Bash', texts });
C.page = v.page; C.mount = v.mount;
})();
