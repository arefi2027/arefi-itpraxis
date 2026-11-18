/* Arefi ITPraxis – Lernstrecke Werkzeugkasten: Registrierung und Werkzeugkatalog. */
(() => {
'use strict';
const P3 = 'Windows / macOS / Linux';
window.ArefiCourseRegister({
  id: 'tools', group: 1, shell: 'PowerShell', C: window.ArefiKTools,
  title: ['جعبه‌ابزار IT: نرم‌افزارهای ضروری و طرز کار دقیق با آن‌ها', 'Werkzeugkasten für IT-Profis: wichtige Software und ihr genauer Einsatz', 'IT toolbox: essential software and how to use it properly'],
  lead: ['فهرست نرم‌افزارهای مهم هر کارشناس IT، از Wireshark و iPerf3 تا Nmap، Sysinternals، PuTTY و آزمون آنلاین فایروال؛ برای هر ابزار: کاربرد، منبع رسمی، و برای ابزارهای اصلی آموزش عملی گام‌به‌گام با عیب‌یابی و آزمونک. فقط در شبکه و سیستم خودت یا با مجوز به کار ببر.', 'Die wichtigste Software für IT-Fachleute – von Wireshark und iPerf3 über Nmap, Sysinternals und PuTTY bis zum Online-Firewall-Test. Zu jedem Werkzeug Zweck und offizielle Quelle, zu den zentralen Werkzeugen eine praktische Schritt-für-Schritt-Anleitung mit Fehlersuche und Wissenscheck. Nur im eigenen Netz und auf eigenen Systemen oder mit Freigabe einsetzen.', 'The most important software for IT professionals – from Wireshark and iPerf3 to Nmap, Sysinternals, PuTTY and online firewall tests. For every tool its purpose and official source, and for the key tools a hands-on step-by-step tutorial with troubleshooting and a knowledge check. Only use them on your own network and systems or with permission.'],
  part: [['بخش ۱: تحلیل شبکه', 'Teil 1: Netzwerk analysieren', 'Part 1: Analysing the network'], ['بخش ۲: محیط کار و دسترسی از راه دور', 'Teil 2: Arbeitsplatz und Fernzugriff', 'Part 2: Workplace and remote access'], ['بخش ۳: ابزارهای آنلاین', 'Teil 3: Online-Prüfwerkzeuge', 'Part 3: Online check tools']],
  catalog: {
    cats: [
      ['تحلیل شبکه', 'Netzwerkanalyse', 'Network analysis'],
      ['دسترسی از راه دور', 'Fernzugriff', 'Remote access'],
      ['عیب‌یابی ویندوز', 'Windows-Diagnose', 'Windows diagnostics'],
      ['جعبه‌ابزار و سخت‌افزار', 'Toolkit und Hardware', 'Toolkit and hardware'],
      ['آزمون آنلاین', 'Online-Prüfung', 'Online checks'],
      ['آزمایشگاه و مستندسازی', 'Labor und Dokumentation', 'Lab and documentation']
    ],
    lic: [
      ['متن‌باز و رایگان', 'Open Source, kostenlos', 'Open source, free'],
      ['رایگان (Freeware)', 'Freeware', 'Freeware'],
      ['سرویس وب رایگان', 'Kostenloser Webdienst', 'Free web service'],
      ['بخشی از ویندوز', 'In Windows enthalten', 'Included in Windows'],
      ['رایگان از مایکروسافت', 'Kostenlos von Microsoft', 'Free from Microsoft'],
      ['رایگان فقط برای استفادهٔ غیرتجاری (نسخهٔ Pro برای شرکت‌ها)', 'Kostenlos nur für nicht-kommerzielle Nutzung (Pro-Version für Firmen)', 'Free for non-commercial use only (Pro version for companies)']
    ],
    items: [
      ['Wireshark', 0, ['ضبط ترافیک و تحلیل پروتکل با فیلتر؛ استاندارد عیب‌یابی شبکه.', 'Mitschnitt und Protokollanalyse mit Filtern – der Standard der Netzwerk-Fehlersuche.', 'Capture and protocol analysis with filters – the standard for network troubleshooting.'], P3, 0, 'https://www.wireshark.org/', 'tools-wireshark'],
      ['tcpdump / tshark', 0, ['ضبط ترافیک روی سرور بدون رابط گرافیکی؛ فایل را بعداً در Wireshark باز کن.', 'Mitschnitt auf Servern ohne Oberfläche; Datei später in Wireshark öffnen.', 'Capture on servers without a GUI; open the file later in Wireshark.'], 'Linux / macOS', 0, 'https://www.tcpdump.org/', 'tools-wireshark'],
      ['iPerf3', 0, ['اندازه‌گیری توان عبوری، Jitter و اتلاف بسته بین دو نقطه.', 'Durchsatz, Jitter und Paketverlust zwischen zwei Punkten messen.', 'Measure throughput, jitter and packet loss between two points.'], P3, 0, 'https://software.es.net/iperf/', 'tools-iperf'],
      ['mtr / pathping', 0, ['اتلاف و تأخیر را برای هر گام مسیر نشان می‌دهد.', 'Zeigt Verlust und Laufzeit für jeden Hop des Pfads.', 'Shows loss and latency for every hop of the path.'], 'Linux (mtr) / Windows (pathping)', 0, 'https://manpages.ubuntu.com/manpages/noble/man8/mtr.8.html', 'tools-iperf'],
      ['Nmap', 0, ['پیدا کردن میزبان‌ها، پورت‌های باز و نسخهٔ سرویس‌ها در شبکهٔ خودی.', 'Hosts, offene Ports und Dienstversionen im eigenen Netz finden.', 'Find hosts, open ports and service versions on your own network.'], P3, 0, 'https://nmap.org/', 'tools-nmap'],
      ['Angry IP Scanner', 0, ['نمای سریع و گرافیکی از IPهای مشغول در یک بازه.', 'Schnelle grafische Übersicht, welche IPs in einem Bereich belegt sind.', 'Quick graphical overview of which IPs in a range are in use.'], P3, 0, 'https://angryip.org/', 'tools-nmap'],
      ['OpenSSH-Client', 1, ['ssh، scp و sftp با کلید؛ در ویندوز ۱۰ و ۱۱ موجود است.', 'ssh, scp und sftp mit Schlüsseln – in Windows 10 und 11 enthalten.', 'ssh, scp and sftp with keys – included in Windows 10 and 11.'], P3, 3, 'https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse', 'tools-remote'],
      ['PuTTY', 1, ['کلاینت SSH و کنسول سریال با نشست‌های ذخیره‌شده؛ PuTTYgen و Pageant.', 'SSH-Client und serielle Konsole mit gespeicherten Sitzungen; PuTTYgen und Pageant.', 'SSH client and serial console with saved sessions; PuTTYgen and Pageant.'], 'Windows / Linux', 0, 'https://www.chiark.greenend.org.uk/~sgtatham/putty/', 'tools-remote'],
      ['WinSCP', 1, ['انتقال فایل با SFTP و SCP با رابط گرافیکی و اسکریپت.', 'Dateiübertragung per SFTP und SCP mit Oberfläche und Skripting.', 'File transfer via SFTP and SCP with a GUI and scripting.'], 'Windows', 0, 'https://winscp.net/eng/index.php', 'tools-remote'],
      ['Quick Assist', 1, ['کمک از راه دور به کاربر با رضایت و کد یک‌بارمصرف؛ اپ Microsoft Store.', 'Remotehilfe für Benutzer mit Zustimmung und Einmalcode; App aus dem Microsoft Store.', 'Remote help for users with consent and a one-time code; Microsoft Store app.'], 'Windows', 4, 'https://learn.microsoft.com/en-us/windows/client-management/client-tools/quick-assist', 'tools-remote'],
      ['Sysinternals Suite', 2, ['Process Explorer، Autoruns، TCPView، Process Monitor، PsExec و BGInfo.', 'Process Explorer, Autoruns, TCPView, Process Monitor, PsExec und BGInfo.', 'Process Explorer, Autoruns, TCPView, Process Monitor, PsExec and BGInfo.'], 'Windows', 4, 'https://learn.microsoft.com/en-us/sysinternals/downloads/', 'tools-sysinternals'],
      ['PowerShell 7', 2, ['خودکارسازی و مدیریت روی همهٔ سیستم‌عامل‌ها.', 'Automatisierung und Verwaltung auf allen Plattformen.', 'Automation and management on every platform.'], P3, 0, 'https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows', ''],
      ['Windows Terminal', 2, ['زبانه‌ها برای PowerShell، CMD، WSL و SSH در یک پنجره.', 'Tabs für PowerShell, CMD, WSL und SSH in einem Fenster.', 'Tabs for PowerShell, CMD, WSL and SSH in one window.'], 'Windows', 0, 'https://learn.microsoft.com/en-us/windows/terminal/', ''],
      ['Ventoy', 3, ['فلش چندبوتی: ISOها را فقط کپی کن.', 'Multiboot-USB-Stick: ISOs einfach kopieren.', 'Multiboot USB stick: simply copy ISOs.'], 'Windows / Linux', 0, 'https://www.ventoy.net/', 'tools-usbkit'],
      ['Rufus', 3, ['ساخت فلش قابل بوت از یک Image، مثلاً نصب ویندوز.', 'Bootfähigen Stick aus einem Image erstellen, z. B. Windows-Installation.', 'Create a bootable stick from one image, e.g. Windows setup.'], 'Windows', 0, 'https://rufus.ie/', 'tools-usbkit'],
      ['CrystalDiskInfo', 3, ['وضعیت SMART دیسک HDD و SSD را نشان می‌دهد.', 'Zeigt den SMART-Zustand von HDDs und SSDs.', 'Shows the SMART health of HDDs and SSDs.'], 'Windows', 0, 'https://crystalmark.info/en/download/', 'tools-usbkit'],
      ['HWiNFO', 3, ['جزئیات سخت‌افزار و حسگرها (دما، ولتاژ، فن).', 'Hardwaredetails und Sensoren (Temperatur, Spannung, Lüfter).', 'Hardware details and sensors (temperature, voltage, fans).'], 'Windows', 5, 'https://www.hwinfo.com/', 'tools-usbkit'],
      ['KeePassXC', 3, ['گاوصندوق رمز متن‌باز با سازندهٔ رمز و TOTP.', 'Open-Source-Kennwortsafe mit Kennwortgenerator und TOTP.', 'Open-source password safe with password generator and TOTP.'], P3, 0, 'https://keepassxc.org/', 'tools-usbkit'],
      ['7-Zip', 3, ['آرشیوها، و باز کردن فایل‌های ISO و WIM.', 'Archive sowie ISO- und WIM-Dateien öffnen.', 'Archives and opening ISO and WIM files.'], 'Windows / Linux', 0, 'https://www.7-zip.org/', ''],
      ['Notepad++', 3, ['ویرایشگر سبک برای لاگ، پیکربندی و اسکریپت.', 'Schlanker Editor für Logs, Konfigurationen und Skripte.', 'Lightweight editor for logs, configuration and scripts.'], 'Windows', 0, 'https://notepad-plus-plus.org/', ''],
      ['GRC ShieldsUP!', 4, ['آزمون آنلاین پورت و فایروال برای IPv4 عمومی خودت.', 'Online-Port- und Firewall-Test der eigenen öffentlichen IPv4.', 'Online port and firewall test of your own public IPv4.'], 'Browser', 2, 'https://www.grc.com/shieldsup', 'tools-online-fw'],
      ['Qualys SSL Labs', 4, ['نمره‌دهی پیکربندی TLS یک سرور عمومی.', 'Bewertet die TLS-Konfiguration eines öffentlichen Servers.', 'Grades the TLS configuration of a public server.'], 'Browser', 2, 'https://www.ssllabs.com/ssltest/', 'tools-online-web'],
      ['MXToolbox', 4, ['بررسی MX، SPF، DMARC و فهرست‌های سیاه ایمیل.', 'Prüft MX, SPF, DMARC und Mail-Blacklists.', 'Checks MX, SPF, DMARC and mail blacklists.'], 'Browser', 2, 'https://mxtoolbox.com/', 'tools-online-web'],
      ['crt.sh', 4, ['جست‌وجوی گواهی‌های صادرشده در Certificate Transparency.', 'Sucht ausgestellte Zertifikate in Certificate-Transparency-Logs.', 'Searches issued certificates in Certificate Transparency logs.'], 'Browser', 2, 'https://crt.sh/', 'tools-online-web'],
      ['Mozilla SSL Config Generator', 4, ['پیکربندی امن TLS برای nginx، Apache و سرورهای دیگر.', 'Sichere TLS-Konfiguration für nginx, Apache und andere Server.', 'Secure TLS configuration for nginx, Apache and other servers.'], 'Browser', 2, 'https://ssl-config.mozilla.org/', 'tools-online-web'],
      ['VirusTotal', 4, ['بررسی Hash، URL یا فایل با چندین اسکنر؛ فایل محرمانه بارگذاری نکن.', 'Hash, URL oder Datei mit vielen Scannern prüfen – keine vertraulichen Dateien hochladen.', 'Check a hash, URL or file with many scanners – never upload confidential files.'], 'Browser', 2, 'https://www.virustotal.com/', 'tools-online-web'],
      ['Have I Been Pwned', 4, ['آیا ایمیل یا رمز در نشت‌های شناخته‌شده هست؟', 'Sind E-Mail-Adresse oder Kennwort in bekannten Datenlecks?', 'Are an e-mail address or password in known breaches?'], 'Browser', 2, 'https://haveibeenpwned.com/', 'tools-online-web'],
      ['VirtualBox', 5, ['ماشین‌های مجازی برای آزمایشگاه خودت.', 'Virtuelle Maschinen für dein eigenes Lab.', 'Virtual machines for your own lab.'], P3, 0, 'https://www.virtualbox.org/', ''],
      ['draw.io (diagrams.net)', 5, ['کشیدن نقشهٔ شبکه و نمودار برای مستندسازی.', 'Netzwerkpläne und Diagramme für die Dokumentation zeichnen.', 'Draw network plans and diagrams for documentation.'], 'Browser / ' + P3, 0, 'https://www.drawio.com/', ''],
      ['Visual Studio Code', 5, ['ویرایشگر اسکریپت با Git و Remote-SSH.', 'Skripteditor mit Git und Remote-SSH.', 'Script editor with Git and Remote-SSH.'], P3, 4, 'https://code.visualstudio.com/', '']
    ]
  }
});
})();
