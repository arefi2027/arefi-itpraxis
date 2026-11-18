/* Arefi ITPraxis – Lehrbuch-Struktur: Inhaltsverzeichnis, gegliederte Seitenleiste und Störungshandbuch. */
(() => {
'use strict';
const L = () => { try { return window.ServerLabApp.locale(); } catch { return 'fa'; } };
const I = () => ({ fa: 0, de: 1, en: 2 })[L()] ?? 0;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const num = n => L() === 'fa' ? String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).replace(/\./g, '٫') : String(n);
const pick = a => Array.isArray(a) ? a[I()] : a;
const ICON = id => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

/* ---------- Aufbau des Buches: Teile → Kapitel ---------- */
const PARTS = [
 { id: 'p1', t: ['شروع و روش کار', 'Einstieg und Arbeitsweise', 'Getting started and working method'],
   lead: ['پیش از هر چیز: چطور با این برنامه یاد بگیری، آزمایشگاه خودت را بسازی و هر مشکل را با یک روش ثابت حل کنی.', 'Bevor es losgeht: wie du mit diesem Programm lernst, dein Übungslabor aufbaust und jedes Problem mit derselben Methode löst.', 'Before anything else: how to learn with this program, build your practice lab and solve every problem with one consistent method.'],
   roles: ['helpdesk', 'onsite', 'admin'],
   ch: [
    { h: 'guide', t: ['راهنمای شروع و برنامهٔ یادگیری', 'Einstieg und Lernplan', 'Getting started and study plan'], g: ['می‌دانی از کجا شروع کنی و هر هفته چه چیزی را تمرین کنی.', 'Du weißt, wo du anfängst und was du jede Woche übst.', 'You know where to start and what to practise each week.'] },
    { h: 'lab', t: ['آزمایشگاه تمرینی خودت', 'Dein Übungslabor', 'Your practice lab'], g: ['ماشین‌های مجازی، شبکه و نام‌گذاری آزمایشگاه را می‌سازی.', 'Du baust VMs, Netz und Namensschema deines Labors auf.', 'You build the VMs, network and naming scheme of your lab.'] },
    { h: 'stoerung/methode', t: ['روش عیب‌یابی منظم', 'Systematische Fehlersuche', 'Systematic troubleshooting'], g: ['هر مشکل را در شش گام حل می‌کنی و می‌دانی کی باید ارجاع بدهی.', 'Du löst jedes Problem in sechs Schritten und weißt, wann du eskalierst.', 'You solve any problem in six steps and know when to escalate.'] },
    { h: 'k-tools', t: ['جعبه‌ابزار متخصص IT', 'Werkzeugkasten für IT-Profis', 'IT professional toolbox'], g: ['Wireshark، iPerf، Nmap، Sysinternals و ابزارهای آنلاین را درست به کار می‌بری.', 'Du setzt Wireshark, iPerf, Nmap, Sysinternals und Online-Prüfwerkzeuge richtig ein.', 'You use Wireshark, iPerf, Nmap, Sysinternals and online checkers correctly.'] }
   ] },
 { id: 'p2', t: ['محیط کار، دستگاه‌ها و Microsoft 365', 'Arbeitsplatz, Endgeräte und Microsoft 365', 'Workplace, devices and Microsoft 365'],
   lead: ['هستهٔ کار پشتیبانی سطح ۱ و تکنسین حضوری: کامپیوتر، لپ‌تاپ، لوازم جانبی، حساب کاربری و Microsoft 365. بیشتر تیکت‌های روزانه از همین بخش است.', 'Der Kern von 1st-Level-Support und Vor-Ort-Technik: PC, Notebook, Peripherie, Benutzerkonto und Microsoft 365. Hier entsteht der Großteil der täglichen Tickets.', 'The core of first-level support and on-site work: PC, notebook, peripherals, user account and Microsoft 365. Most daily tickets come from here.'],
   roles: ['helpdesk', 'onsite'],
   ch: [
    { h: 'k-cli', t: ['پشتیبانی کامپیوتر و لپ‌تاپ', 'PC- und Notebook-Support', 'PC and notebook support'], g: ['سخت‌افزار را عیب‌یابی می‌کنی، ویندوز را نجات می‌دهی، نرم‌افزار را توزیع و کامپیوتر را تعویض می‌کنی.', 'Du diagnostizierst Hardware, rettest Windows, verteilst Software und tauschst PCs aus.', 'You diagnose hardware, rescue Windows, deploy software and replace PCs.'] },
    { h: 'k-m365', t: ['Microsoft 365، Entra ID و Intune', 'Microsoft 365, Entra ID und Intune', 'Microsoft 365, Entra ID and Intune'], g: ['کاربر، MFA، صندوق پستی، Teams، OneDrive و دستگاه‌های Intune را مدیریت می‌کنی.', 'Du verwaltest Benutzer, MFA, Postfächer, Teams, OneDrive und Intune-Geräte.', 'You manage users, MFA, mailboxes, Teams, OneDrive and Intune devices.'] },
    { h: 'hardware', t: ['کتابخانهٔ تجهیزات', 'Gerätebibliothek', 'Hardware library'], g: ['تجهیزات رایج شرکت‌ها، رابط‌ها و قطعه‌ها را می‌شناسی.', 'Du kennst übliche Firmengeräte, Anschlüsse und Bauteile.', 'You know common business devices, ports and components.'] },
    { h: 'support', t: ['مشکلات روزمرهٔ پشتیبانی', 'Alltagsfälle im Support', 'Everyday support cases'], g: ['واقعی‌ترین تیکت‌ها را از پرسش اول تا یادداشت تیکت حل می‌کنی.', 'Du löst die häufigsten echten Tickets von der ersten Frage bis zur Ticketnotiz.', 'You solve the most common real tickets from the first question to the ticket note.'] },
    { h: 'shift', t: ['تمرین شیفت پشتیبانی', 'Schicht-Training im Support', 'Support shift training'], g: ['چند تیکت هم‌زمان را اولویت‌بندی و زیر فشار زمان کار می‌کنی.', 'Du priorisierst mehrere Tickets gleichzeitig und arbeitest unter Zeitdruck.', 'You prioritise several tickets at once and work under time pressure.'] }
   ] },
 { id: 'p3', t: ['شبکه', 'Netzwerk', 'Networking'],
   lead: ['از آدرس IP و VLAN تا روتر Cisco و برنامه‌ریزی کامل شبکهٔ یک شرکت. هر تکنسین باید بتواند «اینترنت نیست» را لایه‌به‌لایه بررسی کند.', 'Von IP-Adresse und VLAN bis zum Cisco-Router und zur vollständigen Netzplanung einer Firma. Jede Technikerin muss „kein Internet“ Schicht für Schicht prüfen können.', 'From IP address and VLAN to Cisco routers and the complete network plan of a company. Every technician must be able to check “no internet” layer by layer.'],
   roles: ['onsite', 'admin', 'fisi'],
   ch: [
    { h: 'k-net', t: ['شبکه و ذخیره‌ساز برای ادمین', 'Netzwerk und Speicher für Admins', 'Networking and storage for admins'], g: ['RAID، NAS، Subnetting، IPv6، VLAN، مسیریابی، VPN، فایروال و WLAN شرکتی را پیاده می‌کنی.', 'Du setzt RAID, NAS, Subnetting, IPv6, VLAN, Routing, VPN, Firewall und Firmen-WLAN um.', 'You implement RAID, NAS, subnetting, IPv6, VLANs, routing, VPN, firewall and enterprise Wi-Fi.'] },
    { h: 'subnetz', t: ['تمرین‌ساز Subnetting', 'Subnetting-Trainer', 'Subnetting trainer'], g: ['زیرشبکه را بدون ماشین‌حساب و سریع حساب می‌کنی.', 'Du rechnest Subnetze schnell und ohne Taschenrechner.', 'You calculate subnets quickly without a calculator.'] },
    { h: 'k-ccna', t: ['Cisco CCNA به‌صورت عملی', 'Cisco CCNA praxisnah', 'Hands-on Cisco CCNA'], g: ['سوئیچ و روتر Cisco را پیکربندی، امن و عیب‌یابی می‌کنی.', 'Du konfigurierst, sicherst und prüfst Cisco-Switches und -Router.', 'You configure, secure and troubleshoot Cisco switches and routers.'] },
    { h: 'k-plan', t: ['برنامه‌ریزی شبکه و مدیریت پروژه', 'Netzwerkplanung und Projektmanagement', 'Network planning and project management'], g: ['شبکهٔ یک شرکت را طبق DIN 69901 برنامه‌ریزی، اجرا و تحویل می‌دهی.', 'Du planst, baust und übergibst ein Firmennetz nach DIN 69901.', 'You plan, build and hand over a company network following DIN 69901.'] }
   ] },
 { id: 'p4', t: ['سرور و سرویس‌ها', 'Server und Dienste', 'Servers and services'],
   lead: ['گام بعدی از پشتیبانی به سمت ادمین سیستم: Active Directory، DNS، DHCP، فایل، چاپ و لینوکس؛ همه در آزمایشگاه خودت.', 'Der Schritt vom Support zur Systemadministration: Active Directory, DNS, DHCP, Datei, Druck und Linux – alles in deinem eigenen Labor.', 'The step from support to system administration: Active Directory, DNS, DHCP, files, printing and Linux – all in your own lab.'],
   roles: ['admin', 'fisi'],
   ch: [
    { h: '', t: ['مسیر آزمایشگاهی Windows Server', 'Praxispfad Windows Server im Labor', 'Windows Server lab path'], g: ['دامنه، کاربر، دسترسی، پشتیبان‌گیری و عملیات را قدم‌به‌قدم در آزمایشگاه می‌سازی.', 'Du baust Domäne, Benutzer, Rechte, Sicherung und Betrieb Schritt für Schritt im Labor auf.', 'You build domain, users, permissions, backup and operations step by step in the lab.'] },
    { h: 'wscourse', t: ['Windows Server 2025', 'Windows Server 2025', 'Windows Server 2025'], g: ['همهٔ نقش‌های مهم Windows Server را با جزئیات می‌شناسی و عیب‌یابی می‌کنی.', 'Du kennst alle wichtigen Rollen von Windows Server im Detail und behebst ihre Fehler.', 'You know all important Windows Server roles in detail and fix their faults.'] },
    { h: 'lxcourse', t: ['سرور لینوکس', 'Linux-Server', 'Linux server'], g: ['Ubuntu Server را نصب، امن، خودکار و پایش می‌کنی.', 'Du installierst, härtest, automatisierst und überwachst Ubuntu Server.', 'You install, harden, automate and monitor Ubuntu Server.'] },
    { h: 'praxis', t: ['مأموریت‌های عملی', 'Praktische Tickets', 'Practical tickets'], g: ['بدون راهنمای کامل، نتیجهٔ قابل تحویل می‌سازی.', 'Du lieferst ein prüfbares Ergebnis ohne vollständige Anleitung.', 'You deliver a verifiable result without a full guide.'] }
   ] },
 { id: 'p5', t: ['دیتاسنتر، مجازی‌سازی و پشتیبان‌گیری', 'Rechenzentrum, Virtualisierung und Backup', 'Data centre, virtualisation and backup'],
   lead: ['جایی که سرورها اجرا می‌شوند و داده‌ها نجات پیدا می‌کنند: Proxmox، VMware، Veeam، پایش و اتاق سرور.', 'Wo Server laufen und Daten gerettet werden: Proxmox, VMware, Veeam, Monitoring und Serverraum.', 'Where servers run and data is rescued: Proxmox, VMware, Veeam, monitoring and the server room.'],
   roles: ['admin', 'fisi'],
   ch: [
    { h: 'k-infra', t: ['مجازی‌سازی، پشتیبان‌گیری و پایش', 'Virtualisierung, Backup und Monitoring', 'Virtualisation, backup and monitoring'], g: ['ماشین مجازی می‌سازی، پشتیبان می‌گیری، بازگردانی را آزمایش و سرویس‌ها را پایش می‌کنی.', 'Du betreibst VMs, sicherst, testest die Wiederherstellung und überwachst Dienste.', 'You run VMs, back up, test restores and monitor services.'] },
    { h: 'room', t: ['برنامه‌ریزی اتاق سرور', 'Serverraum planen', 'Planning the server room'], g: ['رک، برق، UPS و خنک‌سازی را حساب و برنامه‌ریزی می‌کنی.', 'Du berechnest und planst Rack, Strom, USV und Kühlung.', 'You calculate and plan rack, power, UPS and cooling.'] }
   ] },
 { id: 'p6', t: ['عملیات IT و امنیت', 'IT-Betrieb und Sicherheit', 'IT operations and security'],
   lead: ['روال‌های حرفه‌ای که شرکت‌ها انتظار دارند: ITIL، نوشتن تیکت، امنیت کلاینت، قانون، رخداد امنیتی، ایمیل، چاپگر و تلفن.', 'Die professionellen Abläufe, die Firmen erwarten: ITIL, Tickets, Endpunktsicherheit, Recht, Sicherheitsvorfälle, E-Mail, Druck und Telefonie.', 'The professional routines companies expect: ITIL, tickets, endpoint security, law, security incidents, email, printing and telephony.'],
   roles: ['helpdesk', 'admin', 'fisi'],
   ch: [
    { h: 'k-ops', t: ['عملیات، امنیت و سرویس‌ها', 'Betrieb, Sicherheit und Dienste', 'Operations, security and services'], g: ['طبق ITIL کار می‌کنی، رخداد امنیتی را درست مدیریت و ایمیل، چاپ و VoIP را عیب‌یابی می‌کنی.', 'Du arbeitest nach ITIL, behandelst Sicherheitsvorfälle richtig und behebst Fehler bei E-Mail, Druck und VoIP.', 'You work by ITIL, handle security incidents correctly and fix email, print and VoIP problems.'] }
   ] },
 { id: 'p7', t: ['خودکارسازی و Cloud', 'Automatisierung und Cloud', 'Automation and cloud'],
   lead: ['کارهای تکراری را خودکار کن و با Cloud آشنا شو: PowerShell، Python، SQL، Azure، Git، Terraform، Docker و Kubernetes.', 'Wiederkehrende Arbeit automatisieren und die Cloud verstehen: PowerShell, Python, SQL, Azure, Git, Terraform, Docker und Kubernetes.', 'Automate repetitive work and understand the cloud: PowerShell, Python, SQL, Azure, Git, Terraform, Docker and Kubernetes.'],
   roles: ['admin'],
   ch: [
    { h: 'k-dev', t: ['داده، اسکریپت و Cloud', 'Daten, Skripte und Cloud', 'Data, scripts and cloud'], g: ['با SQL، PowerShell و Python کار را خودکار و منابع Azure را مدیریت می‌کنی.', 'Du automatisierst mit SQL, PowerShell und Python und verwaltest Azure-Ressourcen.', 'You automate with SQL, PowerShell and Python and manage Azure resources.'] },
    { h: 'k-modern', t: ['زیرساخت مدرن', 'Moderne Infrastruktur', 'Modern infrastructure'], g: ['Git، IaC، CI/CD، کانتینر، پایش، SIEM و Zero Trust را به کار می‌بری.', 'Du nutzt Git, IaC, CI/CD, Container, Observability, SIEM und Zero Trust.', 'You use Git, IaC, CI/CD, containers, observability, SIEM and Zero Trust.'] }
   ] },
 { id: 'p8', t: ['شغل، زبان و آزمون', 'Beruf, Sprache und Prüfung', 'Career, language and exam'],
   lead: ['از دانش به استخدام: انتظار واقعی شرکت‌ها، مصاحبه، آلمانی کاری و آزمون نهایی Fachinformatiker.', 'Vom Wissen zur Anstellung: echte Erwartungen der Firmen, Bewerbung, Deutsch im Job und Abschlussprüfung Fachinformatiker.', 'From knowledge to a job: what employers really expect, interviews, German at work and the Fachinformatiker final exam.'],
   roles: ['helpdesk', 'onsite', 'admin', 'fisi'],
   ch: [
    { h: 'jobs', t: ['انتظار شرکت‌ها', 'Was Firmen erwarten', 'What employers expect'], g: ['می‌دانی هر شغل دقیقاً چه مهارتی می‌خواهد و چه چیزی هنوز کم داری.', 'Du weißt, welche Fähigkeiten jede Rolle verlangt und was dir noch fehlt.', 'You know what each role requires and what you still lack.'] },
    { h: 'interview', t: ['درخواست کار و مصاحبه', 'Bewerbung und Interview', 'Applying and interviews'], g: ['رزومه را هدفمند می‌نویسی و به پرسش‌های فنی و رفتاری جواب روشن می‌دهی.', 'Du schreibst gezielte Bewerbungen und beantwortest Fach- und Verhaltensfragen klar.', 'You write targeted applications and answer technical and behavioural questions clearly.'] },
    { h: 'deutsch', t: ['آلمانی در محیط کار IT', 'Deutsch im IT-Job', 'German for IT jobs'], g: ['با کاربر، همکار و مدیر به آلمانی روشن و مؤدبانه حرف می‌زنی و می‌نویسی.', 'Du sprichst und schreibst klar und höflich mit Benutzern, Kollegen und Vorgesetzten.', 'You speak and write clearly and politely with users, colleagues and managers.'] },
    { h: 'languages', t: ['زبان IT به انگلیسی و آلمانی', 'IT-Sprachen Englisch und Deutsch', 'IT language in English and German'], g: ['اصطلاحات هر درس را به انگلیسی و آلمانی به کار می‌بری.', 'Du verwendest die Fachbegriffe jeder Lektion auf Englisch und Deutsch.', 'You use each lesson’s terms in English and German.'] },
    { h: 'k-ap', t: ['آزمون نهایی Fachinformatiker', 'Abschlussprüfung Fachinformatiker', 'Fachinformatiker final exam'], g: ['ساختار آزمون، حساب‌ها، WiSo و پروژهٔ آزمون را می‌شناسی.', 'Du kennst Aufbau, Rechenaufgaben, WiSo und das Prüfungsprojekt.', 'You know the structure, calculations, WiSo and the exam project.'] },
    { h: 'apquiz', t: ['آزمون تمرینی AP', 'AP-Übungsquiz', 'AP practice quiz'], g: ['پرسش‌های شبیه آزمون را با زمان تمرین می‌کنی.', 'Du übst prüfungsnahe Fragen mit Zeitlimit.', 'You practise exam-like questions against the clock.'] },
    { h: 'career', t: ['آمادگی شغلی', 'Berufsvorbereitung', 'Job preparation'], g: ['تمرین‌هایت را به شواهد قابل‌نمایش برای کارفرما تبدیل می‌کنی.', 'Du machst aus deinen Übungen vorzeigbare Nachweise für Arbeitgeber.', 'You turn your exercises into evidence you can show employers.'] }
   ] }
];
const APPENDIX = [
 { h: 'stoerung', icon: 'check', t: ['دفترچهٔ عیب‌یابی', 'Störungshandbuch', 'Troubleshooting handbook'] },
 { h: 'referenz', icon: 'book', t: ['فرمان‌ها و واژه‌نامه', 'Befehle und Begriffe', 'Commands and terms'] },
 { h: 'kurse', icon: 'grid', t: ['همهٔ دوره‌ها', 'Alle Lernstrecken', 'All courses'] },
 { h: 'assistant', icon: 'terminal', t: ['مربی KI', 'KI-Tutor', 'AI tutor'] },
 { h: 'desktop', icon: 'down', t: ['نصب و به‌روزرسانی', 'Installieren und Updates', 'Install and updates'] }
];
const ROLES = { helpdesk: ['هلپ‌دسک', 'Helpdesk', 'Helpdesk'], onsite: ['تکنسین حضوری', 'Vor-Ort-Technik', 'On-site technician'], admin: ['ادمین سیستم', 'Systemadministration', 'System administrator'], fisi: ['آزمون FISI', 'FISI-Prüfung', 'FISI exam'] };

const TX = {
 fa: { toc: 'فهرست مطالب', fix: 'حل یک مشکل', cont: 'ادامهٔ یادگیری', part: 'بخش', appx: 'پیوست‌ها', appxLead: 'برای جست‌وجو و مراجعهٔ سریع، نه برای خواندن پشت سر هم.',
  title: 'Arefi ITPraxis به‌شکل یک کتاب درسی', lead: 'همهٔ دوره‌ها، تمرین‌ها و مشکلات واقعی در یک ترتیب روشن: از محیط کار و دستگاه‌ها تا شبکه، سرور، دیتاسنتر، امنیت و آمادگی برای استخدام. ترتیب بخش‌ها همان ترتیبی است که شرکت‌ها از یک تکنسین IT انتظار دارند.',
  rule: 'هر فصل یک قاعدهٔ ثابت دارد', ruleSteps: ['هدف: بعد از فصل چه کاری بلدی', 'دانش: فقط آنچه در کار لازم است', 'آزمایشگاه: خودت انجام می‌دهی', 'عیب‌یابی: نشانه، علت، راه‌حل', 'سنجش: آزمونک و تمرین مستقل'],
  facts: ['بخش', 'فصل', 'درس', 'مشکل با راه‌حل'], next: 'ادامه از اینجا', allDone: 'همهٔ فصل‌ها را تمام کرده‌ای.', forRoles: 'مهم برای:', lessons: 'درس', cases: 'مورد', trouble: 'مشکل', docs: 'سند', sections: 'بخش‌های این فصل', tool: 'ابزار تمرین', pagek: 'صفحهٔ تمرین', open: 'باز کن', done: 'تمام‌شده' },
 de: { toc: 'Inhaltsverzeichnis', fix: 'Störung lösen', cont: 'Weiterlernen', part: 'Teil', appx: 'Anhang', appxLead: 'Zum Nachschlagen und schnellen Finden, nicht zum Durchlesen.',
  title: 'Arefi ITPraxis als Lehrbuch', lead: 'Alle Lernstrecken, Übungen und echten Störungen in einer klaren Reihenfolge: vom Arbeitsplatz über Netzwerk, Server und Rechenzentrum bis zu Sicherheit und Bewerbung. Die Reihenfolge der Teile folgt dem, was Firmen von IT-Technikerinnen und -Technikern erwarten.',
  rule: 'Jedes Kapitel folgt derselben Regel', ruleSteps: ['Ziel: was du danach kannst', 'Wissen: nur was der Job braucht', 'Labor: du machst es selbst', 'Störungen: Symptom, Ursache, Lösung', 'Prüfung: Wissenscheck und freie Übung'],
  facts: ['Teile', 'Kapitel', 'Lektionen', 'Störungen mit Lösung'], next: 'Hier weiterlesen', allDone: 'Du hast alle Kapitel abgeschlossen.', forRoles: 'Wichtig für:', lessons: 'Lektionen', cases: 'Fälle', trouble: 'Störungen', docs: 'Dokumente', sections: 'Abschnitte dieses Kapitels', tool: 'Übungswerkzeug', pagek: 'Übungsseite', open: 'Öffnen', done: 'abgeschlossen' },
 en: { toc: 'Table of contents', fix: 'Solve a problem', cont: 'Continue learning', part: 'Part', appx: 'Appendix', appxLead: 'For looking things up quickly, not for reading front to back.',
  title: 'Arefi ITPraxis as a textbook', lead: 'All courses, exercises and real faults in one clear order: from the workplace through networking, servers and the data centre to security and getting hired. The order of the parts follows what companies expect from an IT technician.',
  rule: 'Every chapter follows the same rule', ruleSteps: ['Goal: what you can do afterwards', 'Knowledge: only what the job needs', 'Lab: you do it yourself', 'Troubleshooting: symptom, cause, fix', 'Check: quiz and independent exercise'],
  facts: ['parts', 'chapters', 'lessons', 'faults with a fix'], next: 'Continue here', allDone: 'You have completed every chapter.', forRoles: 'Important for:', lessons: 'lessons', cases: 'cases', trouble: 'faults', docs: 'documents', sections: 'Sections of this chapter', tool: 'Practice tool', pagek: 'Practice page', open: 'Open', done: 'completed' }
};
const T = () => TX[L()] || TX.fa;

/* ---------- Datenquellen ---------- */
const COURSE = { 'k-cli': 'ArefiKCli', 'k-net': 'ArefiKNet', 'k-m365': 'ArefiKM365', 'k-tools': 'ArefiKTools', 'k-ccna': 'ArefiKCcna', 'k-plan': 'ArefiKPlan', 'k-infra': 'ArefiKInfra', 'k-ops': 'ArefiKOps', 'k-dev': 'ArefiKDev', 'k-modern': 'ArefiKModern', 'k-ap': 'ArefiKAp', wscourse: 'ArefiWSCourse', lxcourse: 'ArefiLXCourse' };
const KEYOF = h => h === 'wscourse' ? 'arefi-ws-course' : h === 'lxcourse' ? 'arefi-lx-course' : 'arefi-' + h;
const store = k => { try { return JSON.parse(localStorage.getItem(k) || '{}') || {}; } catch { return {}; } };
const modDone = (h, m) => { const a = store(KEYOF(h))[m.id] || {}, c = Array.isArray(a.c) ? a.c : []; return !!(m.lab && m.lab.checks && m.lab.checks[0] && m.lab.checks[0].every((_, k) => c[k])); };
const LAB = () => window.LAB || {};
const pathTitle = m => L() === 'fa' ? m.title : ((LAB().locales || {})[L()] || {})[m.id]?.title || m.title;
const caseDone = id => { try { return !!window.ArefiWork.ws().cases[id]; } catch { return false; } };
const caseTitle = c => (c[L()] || c.de || {}).t || c.id;

// Abschnitte eines Kapitels: [{t, href, done}] und Kennzahlen
function sectionsOf(ch) {
 const h = ch.h;
 if (COURSE[h]) {
  const C = window[COURSE[h]];
  const M = (C && C.modules) || [];
  const base = h;
  let secs = M.map(m => ({ t: pick(m.title), href: '#' + base + '/' + m.id, done: modDone(h, m) }));
  let trouble = h === 'k-ap' ? 0 : M.reduce((n, m) => n + ((m.trouble && m.trouble.length) || 0), 0), unit = 'lessons';
  if (h === 'k-plan' && window.ArefiPlanProjects && window.ArefiProjectView) {
   const P = window.ArefiPlanProjects;
   secs = secs.concat(P.map(p => { const s = window.ArefiProjectView.stats(p); return { t: pick(p.title), href: '#k-plan/' + p.id, done: s.total > 0 && s.done === s.total, sub: s.done + '/' + s.total }; }));
   unit = M.length ? 'lessons' : 'docs';
   return { secs, trouble, unit, count: M.length || P.reduce((n, p) => n + p.docs.length, 0), done: secs.filter(x => x.done).length };
  }
  return { secs, trouble, unit, count: secs.length, done: secs.filter(x => x.done).length };
 }
 if (h === '') {
  const M = LAB().modules || [];
  const app = window.ServerLabApp;
  const secs = M.map(m => ({ t: pathTitle(m), href: '#mod/' + m.id, done: !!(app && app.completed && app.completed(m.id)) }));
  return { secs, trouble: 0, unit: 'lessons', count: secs.length, done: secs.filter(x => x.done).length };
 }
 if (h === 'support') {
  const W = LAB().workCases || [];
  const secs = W.map(c => ({ t: caseTitle(c), href: '#support/' + c.id, done: caseDone(c.id) }));
  return { secs, trouble: W.length, unit: 'cases', count: W.length, done: secs.filter(x => x.done).length };
 }
 return { secs: [], trouble: 0, unit: ['subnetz', 'apquiz', 'room'].includes(h) ? 'tool' : 'page', count: 0, done: 0 };
}
const chNo = (pi, ci) => num((pi + 1) + '.' + (ci + 1));

/* ---------- Seitenleiste ---------- */
let navLang = '';
function buildNav() {
 const nav = document.querySelector('.sidebar nav');
 if (!nav) return;
 const t = T();
 navLang = L();
 nav.classList.add('bk-nav');
 nav.innerHTML = `<div class="bk-pins">
<a href="#inhalt" data-bk="inhalt">${ICON('book')}<span>${esc(t.toc)}</span></a>
<a href="#stoerung" data-bk="stoerung" class="bk-pin-fix">${ICON('check')}<span>${esc(t.fix)}</span></a>
<a href="#" data-bk="home">${ICON('grid')}<span>${esc(t.cont)}</span></a>
</div>
${PARTS.map((p, pi) => `<details class="bk-group" data-part="${p.id}"><summary><span class="bk-gno">${num(pi + 1)}</span><span class="bk-gt">${esc(pick(p.t))}</span></summary><div class="bk-gl">${p.ch.map((c, ci) => `<a href="#${c.h}" data-bk="${c.h || 'path'}"><span class="bk-cn">${chNo(pi, ci)}</span><span>${esc(pick(c.t))}</span></a>`).join('')}</div></details>`).join('')}
<details class="bk-group" data-part="appx"><summary><span class="bk-gno">+</span><span class="bk-gt">${esc(t.appx)}</span></summary><div class="bk-gl">${APPENDIX.filter(a => a.h !== 'stoerung').map(a => `<a href="#${a.h}" data-bk="${a.h}">${ICON(a.icon)}<span>${esc(pick(a.t))}</span></a>`).join('')}</div></details>`;
}
// Welche Kapitel-Kennung gehört zur aktuellen Adresse?
function currentKey() {
 const h = location.hash.slice(1);
 if (h === '' ) return 'home';
 if (h === 'inhalt') return 'inhalt';
 if (h === 'stoerung/methode') return 'stoerung/methode';
 if (/^stoerung/.test(h)) return 'stoerung';
 if (/^mod\//.test(h) || ['guide2', 'catalog', 'review'].includes(h)) return 'path';
 const keys = PARTS.flatMap(p => p.ch.map(c => c.h)).concat(APPENDIX.map(a => a.h)).filter(Boolean).sort((a, b) => b.length - a.length);
 return keys.find(k => h === k || h.startsWith(k + '/')) || '';
}
function sync() {
 if (navLang !== L()) buildNav();
 const key = currentKey();
 document.querySelectorAll('.bk-nav [data-bk]').forEach(a => {
  const on = a.dataset.bk === key;
  a.classList.toggle('active', on);
  if (on) { a.setAttribute('aria-current', 'page'); const g = a.closest('details'); if (g) g.open = true; } else a.removeAttribute('aria-current');
 });
}

/* ---------- Inhaltsverzeichnis ---------- */
function tocPage() {
 const t = T();
 let nCh = 0, nLes = 0, nTr = 0, next = null;
 const parts = PARTS.map((p, pi) => {
  const rows = p.ch.map((c, ci) => {
   nCh++;
   const s = sectionsOf(c);
   if (s.unit === 'lessons') nLes += s.count;
   nTr += s.trouble;
   const pct = s.secs.length ? Math.round(100 * s.done / s.secs.length) : 0;
   if (!next && s.secs.length && s.done < s.secs.length) next = { c, no: chNo(pi, ci) };
   const meta = s.unit === 'tool' ? t.tool : s.unit === 'page' ? t.pagek : `${num(s.count)} ${t[s.unit]}${s.trouble && s.unit !== 'cases' ? (L() === 'fa' ? '، ' : ' · ') + num(s.trouble) + ' ' + t.trouble : ''}`;
   const secs = s.secs.length ? `<details class="bk-secs"><summary>${esc(t.sections)} <span>${num(s.done)}/${num(s.secs.length)}</span></summary><ol>${s.secs.map((x, k) => `<li${x.done ? ' class="is-done"' : ''}><a href="${x.href}"><span class="bk-sn">${chNo(pi, ci)}${num('.' + (k + 1))}</span><span class="bk-st">${esc(x.t)}</span>${x.done ? `<span class="bk-ok" aria-label="${esc(t.done)}">✓</span>` : ''}</a></li>`).join('')}</ol></details>` : '';
   return `<li class="bk-ch${s.secs.length && s.done === s.secs.length ? ' is-done' : ''}"><a class="bk-chl" href="#${c.h}"><span class="bk-cn">${chNo(pi, ci)}</span><span class="bk-ct"><b>${esc(pick(c.t))}</b><small>${esc(pick(c.g))}</small></span><span class="bk-meta">${esc(meta)}${s.secs.length ? `<span class="bk-bar" role="img" aria-label="${num(pct)}%"><i style="width:${pct}%"></i></span>` : ''}</span></a>${secs}</li>`;
  }).join('');
  return `<section class="bk-part" id="teil-${pi + 1}" aria-labelledby="bk-p${pi + 1}"><header class="bk-ph"><span class="bk-pno" aria-hidden="true">${num(pi + 1)}</span><div><p class="bk-pk">${esc(t.part)} ${num(pi + 1)}</p><h2 id="bk-p${pi + 1}">${esc(pick(p.t))}</h2><p>${esc(pick(p.lead))}</p><p class="bk-roles"><span>${esc(t.forRoles)}</span>${p.roles.map(r => `<span class="bk-role">${esc(pick(ROLES[r]))}</span>`).join('')}</p></div></header><ol class="bk-chs">${rows}</ol></section>`;
 }).join('');
 const appx = `<section class="bk-part bk-appx"><header class="bk-ph"><span class="bk-pno" aria-hidden="true">+</span><div><p class="bk-pk">${esc(t.appx)}</p><h2>${esc(t.appx)}</h2><p>${esc(t.appxLead)}</p></div></header><ul class="bk-appl">${APPENDIX.map(a => `<li><a href="#${a.h}">${ICON(a.icon)}<span>${esc(pick(a.t))}</span></a></li>`).join('')}</ul></section>`;
 const nextBox = next ? `<a class="bk-next" href="#${next.c.h}"><span>${esc(t.next)}</span><b><span class="bk-nno">${next.no}</span> ${esc(pick(next.c.t))}</b></a>` : `<p class="bk-next">${esc(t.allDone)}</p>`;
 return `<div class="bk"><header class="bk-head"><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p><ul class="bk-facts"><li><b>${num(PARTS.length)}</b><span>${esc(t.facts[0])}</span></li><li><b>${num(nCh)}</b><span>${esc(t.facts[1])}</span></li><li><b>${num(nLes)}</b><span>${esc(t.facts[2])}</span></li><li><b>${num(nTr)}</b><span>${esc(t.facts[3])}</span></li></ul></header>
<section class="bk-rule"><h2>${esc(t.rule)}</h2><ol>${t.ruleSteps.map(x => { const [a, b] = x.split(': '); return `<li><b>${esc(a)}</b><span>${esc(b || '')}</span></li>`; }).join('')}</ol></section>
${nextBox}${parts}${appx}</div>`;
}

/* ---------- Störungshandbuch ---------- */
const AREAS = {
 konto: ['حساب، ورود و MFA', 'Konto, Anmeldung und MFA', 'Accounts, sign-in and MFA'],
 client: ['ویندوز کلاینت و نرم‌افزار', 'Windows-Client und Software', 'Windows client and software'],
 hardware: ['سخت‌افزار و میز کار', 'Hardware und Arbeitsplatz', 'Hardware and workplace'],
 druck: ['چاپ و اسکن', 'Drucken und Scannen', 'Printing and scanning'],
 netz: ['شبکه، WLAN و کابل‌کشی', 'Netzwerk, WLAN und Verkabelung', 'Network, Wi-Fi and cabling'],
 fern: ['VPN و دسترسی از راه دور', 'VPN und Fernzugriff', 'VPN and remote access'],
 mail: ['ایمیل، Teams و Microsoft 365', 'E-Mail, Teams und Microsoft 365', 'Email, Teams and Microsoft 365'],
 server: ['ویندوز سرور، AD، DNS و DHCP', 'Windows Server, AD, DNS und DHCP', 'Windows Server, AD, DNS and DHCP'],
 linux: ['سرور لینوکس', 'Linux-Server', 'Linux server'],
 virt: ['مجازی‌سازی، ذخیره‌ساز و پشتیبان', 'Virtualisierung, Speicher und Backup', 'Virtualisation, storage and backup'],
 sicher: ['امنیت و رخدادها', 'Sicherheit und Vorfälle', 'Security and incidents'],
 betrieb: ['عملیات، پایش و خودکارسازی', 'Betrieb, Monitoring und Automatisierung', 'Operations, monitoring and automation']
};
// Zuordnung der Module zu Störungsbereichen
const MOD_AREA = {
 'cli-hw': 'hardware', 'cli-boot': 'client', 'cli-perf': 'client', 'cli-deploy': 'client', 'cli-profile': 'client', 'cli-remote': 'fern', 'cli-periph': 'hardware', 'cli-cabling': 'netz', 'cli-asset': 'hardware',
 'net-raid': 'virt', 'net-storage': 'virt', 'net-vpn': 'fern',
 'm365-entra': 'konto', 'm365-mfa': 'konto', 'm365-exchange': 'mail', 'm365-collab': 'mail', 'm365-intune': 'client', 'm365-autopilot': 'client',
 'tools-sysinternals': 'client', 'tools-remote': 'fern', 'tools-usbkit': 'hardware', 'tools-online-web': 'mail',
 'ops-itil': 'betrieb', 'ops-ticket': 'betrieb', 'sec-endpoint': 'sicher', 'sec-compliance': 'sicher', 'sec-incident': 'sicher', 'svc-mail': 'mail', 'svc-print': 'druck', 'svc-voip': 'netz',
 'mon-checkmk': 'betrieb', 'mon-snmp': 'betrieb', 'mod-siem': 'sicher', 'mod-zt': 'sicher',
 'ws-auth': 'konto', 'ws-hybrid': 'konto', 'ws-pki': 'sicher', 'ws-hyperv': 'virt', 'ws-remote': 'fern', 'ws-monitor': 'betrieb', 'ws-security': 'sicher'
};
const COURSE_AREA = { 'k-cli': 'client', 'k-net': 'netz', 'k-m365': 'mail', 'k-tools': 'netz', 'k-ccna': 'netz', 'k-infra': 'virt', 'k-ops': 'betrieb', 'k-dev': 'betrieb', 'k-modern': 'betrieb', wscourse: 'server', lxcourse: 'linux' };
const CASE_AREA = { password: 'konto', mfa: 'konto', onboarding: 'konto', offboarding: 'konto', outlook: 'mail', sharedmailbox: 'mail', 'teams-av': 'mail', onedrive: 'mail', ndr: 'mail', nonet: 'netz', netdrive: 'server', vpn: 'fern', wlan: 'netz', slowpc: 'client', bitlocker: 'client', dock: 'hardware', software: 'client', printer: 'druck', phishing: 'sicher', major: 'betrieb' };
const CASE_BY_AREA = { account: 'konto', m365: 'mail', onboarding: 'konto', network: 'netz', device: 'client', print: 'druck', security: 'sicher', process: 'betrieb' };

function chapterOf(h) { for (let pi = 0; pi < PARTS.length; pi++) { const ci = PARTS[pi].ch.findIndex(c => c.h === h); if (ci >= 0) return { no: chNo(pi, ci), t: pick(PARTS[pi].ch[ci].t) }; } return { no: '', t: '' }; }
function fixIndex() {
 const out = { cases: [], quick: [] };
 (LAB().workCases || []).forEach(c => { const d = c[L()] || c.de; out.cases.push({ area: c.fixArea || CASE_AREA[c.id] || CASE_BY_AREA[c.area] || 'betrieb', id: c.id, t: d.t, msg: d.msg, prio: c.prio, done: caseDone(c.id), text: [d.t, d.msg, d.fix, (d.steps || []).join(' ')].join(' ') }); });
 Object.keys(COURSE).forEach(h => {
  if (h === 'k-ap' || h === 'k-plan') return;
  const C = window[COURSE[h]]; if (!C || !C.modules) return;
  const ch = chapterOf(h);
  C.modules.forEach((m, k) => (m.trouble || []).forEach(tr => { if (!Array.isArray(tr) || tr.length < 2) return; const sym = pick(tr[0]), fix = pick(tr[1]); if (!sym) return; out.quick.push({ area: MOD_AREA[m.id] || COURSE_AREA[h], sym, fix, href: '#' + h + '/' + m.id, where: (ch.no ? ch.no + num('.' + (k + 1)) + ' · ' : '') + pick(m.title), text: sym + ' ' + fix + ' ' + pick(m.title) }); }));
 });
 return out;
}
const FX = {
 fa: { title: 'دفترچهٔ عیب‌یابی: از نشانه تا راه‌حل', lead: 'همهٔ مشکل‌های این برنامه در یک جا: موردهای کامل پشتیبانی با پرسش، گام‌ها، راه‌حل، یادداشت تیکت و جملهٔ مناسب برای کاربر؛ به‌اضافهٔ تشخیص‌های کوتاه از همهٔ فصل‌ها. اول روش را بخوان، بعد نشانه را جست‌وجو کن.',
  method: 'روش: شش گام برای هر مشکل', steps: [['مشکل را دقیق ثبت کن', 'چه کسی، کدام دستگاه، از کی، چه چیزی تغییر کرده؟ متن خطا را کلمه‌به‌کلمه یا با عکس صفحه ثبت کن. پیش از هر تغییر، از داده‌های مهم پشتیبان بگیر.'], ['علت محتمل را حدس بزن', 'از ساده و رایج شروع کن: برق و کابل، شبکه، سرویس، برنامه و در آخر دسترسی کاربر. لایه‌به‌لایه جلو برو.'], ['حدس را بی‌خطر آزمایش کن', 'یک بررسی کوچک که چیزی را خراب نمی‌کند. اگر حدس تأیید نشد، حدس تازه بزن یا ارجاع بده.'], ['برنامهٔ رفع را بچین', 'اثر کار روی دیگران، زمان مناسب، راه بازگشت و تأیید لازم را از قبل روشن کن.'], ['رفع کن و همراه کاربر بسنج', 'راه‌حل را اجرا کن، با حساب خود کاربر آزمایش کن و کاری کن که مشکل دوباره پیش نیاید.'], ['ثبت کن', 'علت، راه‌حل و آزمون را در تیکت بنویس. اگر تکراری است، مقالهٔ دانش بساز.']],
  quick: 'دو دقیقهٔ اول', quickList: ['فقط یک نفر گرفتار است یا چند نفر؟ اگر چند نفر، احتمالاً سرویس مرکزی خراب است: اولویت بالا و خبر به تیم.', 'از دیروز چه عوض شده؟ به‌روزرسانی، گذرواژهٔ تازه، جابه‌جایی میز، کابل تازه.', 'متن دقیق خطا را بخوان یا از آن عکس بگیر.', 'برق، کابل، باتری، WLAN، حالت هواپیما و ساعت دستگاه را نگاه کن.', 'با دستگاه، مرورگر یا حساب دیگری کار می‌کند؟ این مرز «دستگاه، حساب یا سرویس» را روشن می‌کند.', 'راه‌اندازی دوباره فقط بعد از ثبت شواهد.'],
  esc: 'کی فوراً ارجاع بدهی', escList: ['چند نفر یا یک سرویس مهم از کار افتاده است (P1/P2).', 'نشانهٔ حمله: ایمیل فیشینگ باز شده، فایل‌ها رمز شده‌اند، ورودهای ناشناس.', 'داده در خطر است یا کار نیاز به دسترسی بیشتر از حد تو دارد.', 'بعد از زمان تعیین‌شده در شرکت (مثلاً ۳۰ دقیقه) پیشرفتی نکرده‌ای.'],
  search: 'نشانه را بنویس', ph: 'مثلاً: چاپگر چاپ نمی‌کند، اینترنت قطع است، حساب قفل شده', all: 'همه', hits: 'نتیجه', none: 'چیزی پیدا نشد. واژهٔ کوتاه‌تر یا هم‌معنی را امتحان کن.', casesH: 'موردهای کامل', quickH: 'تشخیص‌های کوتاه از فصل‌ها', openCase: 'باز کردن مورد کامل', inChapter: 'در فصل', fixL: 'راه‌حل:' },
 de: { title: 'Störungshandbuch: vom Symptom zur Lösung', lead: 'Alle Störungen dieses Programms an einem Ort: ausführliche Supportfälle mit Rückfragen, Prüfschritten, Lösung, Ticketnotiz und Formulierung für den Benutzer, dazu Kurzdiagnosen aus allen Kapiteln. Lies zuerst die Methode, dann suche nach dem Symptom.',
  method: 'Methode: sechs Schritte für jede Störung', steps: [['Problem genau erfassen', 'Wer, welches Gerät, seit wann, was hat sich geändert? Fehlermeldung wörtlich oder als Screenshot festhalten. Vor jeder Änderung wichtige Daten sichern.'], ['Wahrscheinliche Ursache vermuten', 'Einfach und häufig zuerst: Strom und Kabel, Netzwerk, Dienst, Anwendung, zuletzt Benutzerrechte. Schicht für Schicht vorgehen.'], ['Vermutung gefahrlos testen', 'Eine kleine Prüfung, die nichts kaputt macht. Bestätigt sie sich nicht, neue Vermutung bilden oder eskalieren.'], ['Lösungsplan festlegen', 'Auswirkung auf andere, passender Zeitpunkt, Rückweg und nötige Freigabe vorher klären.'], ['Umsetzen und mit dem Benutzer prüfen', 'Lösung ausführen, mit dem Konto des Benutzers testen und dafür sorgen, dass es nicht wieder passiert.'], ['Dokumentieren', 'Ursache, Lösung und Test ins Ticket schreiben. Bei Wiederholung einen Wissensartikel anlegen.']],
  quick: 'Die ersten zwei Minuten', quickList: ['Betrifft es nur eine Person oder viele? Bei vielen ist meist ein zentraler Dienst gestört: hohe Priorität, Team informieren.', 'Was hat sich seit gestern geändert? Update, neues Kennwort, Umzug, neues Kabel.', 'Fehlermeldung genau lesen oder fotografieren.', 'Strom, Kabel, Akku, WLAN, Flugmodus und Uhrzeit des Geräts prüfen.', 'Geht es mit anderem Gerät, Browser oder Konto? Das trennt Gerät, Konto und Dienst.', 'Neustart erst, nachdem die Spuren gesichert sind.'],
  esc: 'Sofort eskalieren, wenn …', escList: ['mehrere Personen oder ein wichtiger Dienst ausgefallen sind (P1/P2).', 'Anzeichen eines Angriffs: Phishing-Mail geöffnet, Dateien verschlüsselt, unbekannte Anmeldungen.', 'Daten in Gefahr sind oder die Arbeit mehr Rechte braucht, als du hast.', 'du nach der in der Firma festgelegten Zeit (z. B. 30 Minuten) nicht weiterkommst.'],
  search: 'Symptom beschreiben', ph: 'z. B. Drucker druckt nicht, kein Internet, Konto gesperrt', all: 'Alle', hits: 'Treffer', none: 'Nichts gefunden. Versuche ein kürzeres Wort oder ein Synonym.', casesH: 'Ausführliche Fälle', quickH: 'Kurzdiagnosen aus den Kapiteln', openCase: 'Ausführlichen Fall öffnen', inChapter: 'Kapitel', fixL: 'Lösung:' },
 en: { title: 'Troubleshooting handbook: from symptom to fix', lead: 'Every fault in this program in one place: detailed support cases with questions to ask, checks, fix, ticket note and what to tell the user, plus short diagnoses from every chapter. Read the method first, then search for the symptom.',
  method: 'Method: six steps for every fault', steps: [['Capture the problem precisely', 'Who, which device, since when, what changed? Record the error message word for word or as a screenshot. Back up important data before any change.'], ['Suspect a probable cause', 'Simple and common first: power and cable, network, service, application, then user permissions. Work layer by layer.'], ['Test the theory safely', 'A small check that breaks nothing. If it is not confirmed, form a new theory or escalate.'], ['Plan the fix', 'Clarify impact on others, the right time, the way back and any approval beforehand.'], ['Fix and verify with the user', 'Apply the fix, test with the user’s own account and make sure it does not happen again.'], ['Document', 'Write cause, fix and test into the ticket. For repeat issues create a knowledge article.']],
  quick: 'The first two minutes', quickList: ['Is it one person or many? If many, a central service is usually down: high priority, inform the team.', 'What changed since yesterday? Update, new password, desk move, new cable.', 'Read the exact error message or take a photo.', 'Check power, cable, battery, Wi-Fi, flight mode and the device clock.', 'Does it work with another device, browser or account? That separates device, account and service.', 'Restart only after you have saved the evidence.'],
  esc: 'Escalate immediately when …', escList: ['several people or an important service are down (P1/P2).', 'there are signs of an attack: phishing mail opened, files encrypted, unknown sign-ins.', 'data is at risk or the work needs more rights than you have.', 'you make no progress within the time set by the company (e.g. 30 minutes).'],
  search: 'Describe the symptom', ph: 'e.g. printer does not print, no internet, account locked', all: 'All', hits: 'results', none: 'Nothing found. Try a shorter word or a synonym.', casesH: 'Detailed cases', quickH: 'Short diagnoses from the chapters', openCase: 'Open detailed case', inChapter: 'Chapter', fixL: 'Fix:' }
};
const prioTag = p => `<span class="work-tag prio-${p}" dir="ltr">P${p}</span>`;
function fixPage(focus) {
 const f = FX[L()] || FX.fa, ix = fixIndex();
 const counts = {}; Object.keys(AREAS).forEach(a => { counts[a] = ix.cases.filter(x => x.area === a).length + ix.quick.filter(x => x.area === a).length; });
 const total = ix.cases.length + ix.quick.length;
 const areaSec = a => {
  const cs = ix.cases.filter(x => x.area === a), qs = ix.quick.filter(x => x.area === a);
  if (!cs.length && !qs.length) return '';
  return `<section class="bk-fa" data-area="${a}" id="fa-${a}"><h2>${esc(pick(AREAS[a]))} <span class="bk-fan">${num(cs.length + qs.length)}</span></h2>
${cs.length ? `<h3>${esc(f.casesH)}</h3><ul class="bk-cases">${cs.map(x => `<li data-q="${esc(x.text.toLowerCase())}"><a class="bk-case${x.done ? ' is-done' : ''}" href="#support/${x.id}"><span class="bk-case-t"><b>${esc(x.t)}</b>${prioTag(x.prio)}${x.done ? '<span class="bk-ok">✓</span>' : ''}</span><span class="bk-case-msg">${esc(x.msg)}</span><span class="bk-case-go">${esc(f.openCase)}</span></a></li>`).join('')}</ul>` : ''}
${qs.length ? `<h3>${esc(f.quickH)}</h3><ul class="bk-quick">${qs.map(x => `<li data-q="${esc(x.text.toLowerCase())}"><details><summary>${esc(x.sym)}</summary><p><b>${esc(f.fixL)}</b> ${esc(x.fix)}</p><a class="text-link" href="${x.href}">${esc(f.inChapter)} ${esc(x.where)}</a></details></li>`).join('')}</ul>` : ''}</section>`;
 };
 return `<div class="bk bk-fixp"><header class="bk-head"><h1>${esc(f.title)}</h1><p>${esc(f.lead)}</p></header>
<section class="bk-method" id="methode" tabindex="-1"><h2>${esc(f.method)}</h2><ol class="bk-steps">${f.steps.map((s, k) => `<li><span class="bk-stn">${num(k + 1)}</span><b>${esc(s[0])}</b><p>${esc(s[1])}</p></li>`).join('')}</ol>
<div class="bk-two"><section class="bk-box"><h3>${esc(f.quick)}</h3><ul>${f.quickList.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section><section class="bk-box bk-box-esc"><h3>${esc(f.esc)}</h3><ul>${f.escList.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section></div></section>
<section class="bk-finder" aria-label="${esc(f.search)}"><label for="bk-q">${esc(f.search)}</label><input id="bk-q" type="search" autocomplete="off" placeholder="${esc(f.ph)}">
<div class="bk-chips" role="group" aria-label="${esc(f.search)}"><button type="button" class="axk-chip" data-fa="all" aria-pressed="${!AREAS[focus]}">${esc(f.all)} <span>${num(total)}</span></button>${Object.keys(AREAS).filter(a => counts[a]).map(a => `<button type="button" class="axk-chip" data-fa="${a}" aria-pressed="${focus === a}">${esc(pick(AREAS[a]))} <span>${num(counts[a])}</span></button>`).join('')}</div>
<p class="bk-hits" id="bk-hits" aria-live="polite"></p></section>
<div id="bk-results">${Object.keys(AREAS).map(areaSec).join('')}</div><p class="bk-none" id="bk-none" hidden>${esc(f.none)}</p></div>`;
}
function mountFix(focus) {
 const f = FX[L()] || FX.fa;
 const q = document.querySelector('#bk-q'), hits = document.querySelector('#bk-hits'), none = document.querySelector('#bk-none');
 if (!q) return;
 let area = AREAS[focus] ? focus : 'all';
 const apply = () => {
  const words = q.value.toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').split(/\s+/).filter(Boolean);
  let n = 0;
  document.querySelectorAll('.bk-fa').forEach(sec => {
   let m = 0;
   const inArea = area === 'all' || sec.dataset.area === area;
   sec.querySelectorAll('li[data-q]').forEach(li => { const ok = inArea && words.every(w => li.dataset.q.includes(w)); li.hidden = !ok; if (ok) m++; });
   sec.querySelectorAll('h3').forEach(h => { const list = h.nextElementSibling; h.hidden = !list || ![...list.children].some(li => !li.hidden); });
   sec.hidden = m === 0; n += m;
   const fan = sec.querySelector('.bk-fan'); if (fan) fan.textContent = num(m);
   if (words.length && m && m <= 3) sec.querySelectorAll('li:not([hidden]) details').forEach(d => { d.open = true; });
  });
  hits.textContent = num(n) + ' ' + f.hits;
  none.hidden = n > 0;
 };
 q.addEventListener('input', apply);
 document.querySelectorAll('[data-fa]').forEach(b => b.addEventListener('click', () => {
  area = b.dataset.fa;
  document.querySelectorAll('[data-fa]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  apply();
 }));
 apply();
 if (focus === 'methode') { const m = document.querySelector('#methode'); if (m) { m.scrollIntoView({ block: 'start' }); m.focus({ preventScroll: true }); } }
}

function modRef(ref) {
 const [h, id] = String(ref).split('/');
 const C = window[COURSE[h]];
 if (!C || !C.modules) return null;
 const k = C.modules.findIndex(m => m.id === id);
 if (k < 0) return null;
 const ch = chapterOf(h);
 return { href: '#' + h + '/' + id, no: ch.no ? ch.no + num('.' + (k + 1)) : '', t: pick(C.modules[k].title) };
}
window.ArefiBook = {
 modRef,
 page: (name, focus) => name === 'inhalt' ? tocPage() : fixPage(focus || ''),
 mount: (name, focus) => { if (name === 'stoerung') mountFix(focus || ''); },
 sync,
 label: name => name === 'inhalt' ? T().toc : (FX[L()] || FX.fa).title.split(':')[0],
 parts: () => PARTS,
 chapter: chapterOf
};
})();
