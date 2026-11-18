/* Arefi ITPraxis – Werkzeugkasten, Teil 3: Online-Prüfwerkzeuge (Firewall/Ports von außen; Web, E-Mail, Zertifikate). Eigene Inhalte. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKTools = window.ArefiKTools || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'tools-online-fw', part: 3,
  title: ['آزمون آنلاین فایروال و پورت: اینترنت از اتصال تو چه می‌بیند؟', 'Online-Firewall- und Porttest: Was sieht das Internet von deinem Anschluss?', 'Online firewall and port test: what does the internet see of your connection?'],
  goal: ['از بیرون بررسی کنی کدام پورت‌های اتصال اینترنت تو در دسترس‌اند (مثلاً با GRC ShieldsUP!)، نتیجه را با Port Forwardingهای روتر یا فایروال مقایسه کنی، UPnP و IPv6 را کنترل کنی و اصلاح‌ها را مستند کنی.', 'Du prüfst von außen, welche Ports deines Anschlusses erreichbar sind (z. B. mit GRC ShieldsUP!), vergleichst das mit den Portfreigaben im Router oder in der Firewall, kontrollierst UPnP und IPv6 und dokumentierst Korrekturen.', 'You check from outside which ports of your connection are reachable (e.g. with GRC ShieldsUP!), compare that with the port forwards on the router or firewall, check UPnP and IPv6 and document corrections.'],
  why: ['بسیاری از نفوذها با Port Forwardingهای فراموش‌شده شروع می‌شوند (RDP، NAS، دوربین). از داخل همه‌چیز بی‌خطر به نظر می‌رسد؛ فقط آزمون از بیرون حقیقت را نشان می‌دهد.', 'Viele Einbrüche beginnen mit vergessenen Portfreigaben (RDP, NAS, Kamera). Von innen sieht alles harmlos aus – nur der Test von außen zeigt die Wahrheit.', 'Many break-ins start with forgotten port forwards (RDP, NAS, camera). From inside everything looks harmless – only the test from outside shows the truth.'],
  know: [
    ['نمای داخل و بیرون: اسکن در LAN نشان می‌دهد کارکنان به چه چیزی می‌رسند؛ آنچه مهاجم می‌بیند فقط با آزمون از بیرون روی IP عمومی معلوم می‌شود؛ IPv4 و IPv6 را جدا بررسی کن.', 'Innen- und Außensicht: Ein Scan im LAN zeigt, was Mitarbeitende erreichen; was Angreifer sehen, zeigt nur ein Test von außen gegen die öffentliche IP – IPv4 und IPv6 getrennt prüfen.', 'Inside and outside view: a scan on the LAN shows what staff can reach; what attackers see only a test from outside against the public IP reveals – check IPv4 and IPv6 separately.'],
    ['GRC ShieldsUP! (grc.com) IPv4 عمومی همان اتصالی را که از آن صفحه را باز کرده‌ای بررسی می‌کند: Common Ports و All Service Ports (۱ تا ۱۰۵۶). نتیجه: Stealth (بی‌پاسخ)، Closed (پاسخ می‌دهد ولی بسته است)، Open (باز؛ اگر عمدی نیست خطرناک است). فقط اتصال خودت را آزمایش کن.', 'GRC ShieldsUP! (grc.com) prüft die öffentliche IPv4 der Verbindung, von der aus du die Seite aufrufst: Common Ports und All Service Ports (1–1056). Ergebnis: Stealth (keine Antwort), Closed (antwortet, geschlossen), Open (offen – gefährlich, wenn nicht gewollt). Nur den eigenen Anschluss testen.', 'GRC ShieldsUP! (grc.com) tests the public IPv4 of the connection you open the page from: Common Ports and All Service Ports (1–1056). Result: Stealth (no answer), Closed (answers, closed), Open (open – dangerous if not intended). Only test your own connection.'],
    ['دلایل رایج پورت باز: Port Forwarding در روتر، UPnP که خودکار پورت باز می‌کند (کنسول بازی، NAS، دوربین)، میزبان DMZ، اجازه‌های IPv6 در روتر و دسترسی از راه دور خود روتر (۴۴۳ یا ۸۴۴۳).', 'Typische Ursachen offener Ports: Portweiterleitung im Router, UPnP öffnet Ports automatisch (Konsole, NAS, Kamera), DMZ-Host, IPv6-Freigaben im Router und der Fernzugang des Routers selbst (443 oder 8443).', 'Typical causes of open ports: port forwarding on the router, UPnP opening ports automatically (console, NAS, camera), DMZ host, IPv6 permissions on the router and the router’s own remote access (443 or 8443).'],
    ['بررسی روتر و فایروال: فهرست Port Forwardingها، خاموش کردن UPnP اگر لازم نیست، دسترسی از راه دور روتر فقط با VPN، Firmware به‌روز. پیش‌فرض «ورودی ممنوع»؛ استثناها با مالک و تاریخ انقضا مستند شوند.', 'Router und Firewall prüfen: Liste der Portfreigaben, UPnP abschalten, wenn nicht nötig, Fernwartung des Routers nur über VPN, Firmware aktuell. Standard „eingehend verboten“; Ausnahmen mit Eigentümer und Ablaufdatum dokumentieren.', 'Check router and firewall: list of port forwards, switch off UPnP if not needed, router remote management only via VPN, current firmware. Default “deny inbound”; document exceptions with owner and expiry date.'],
    ['بررسی متقابل: از بیرون (هات‌اسپات موبایل) با Test-NetConnection یا nc روی IP عمومی خودت. در CGNAT یا DS-Lite، IPv4 عمومی مال ارائه‌دهنده است؛ آن وقت آزمون، ارائه‌دهنده را نشان می‌دهد نه تو را.', 'Gegenprobe: von außen (Handy-Hotspot) mit Test-NetConnection oder nc auf die eigene öffentliche IP. Bei CGNAT oder DS-Lite gehört die öffentliche IPv4 dem Provider; dann zeigt der Test den Provider, nicht dich.', 'Cross-check: from outside (mobile hotspot) with Test-NetConnection or nc against your own public IP. With CGNAT or DS-Lite the public IPv4 belongs to the provider; then the test shows the provider, not you.'],
    ['در شرکت‌ها سطح حملهٔ بیرونی باید منظم بررسی شود: اسکنر آسیب‌پذیری، جست‌وجوی IPهای خودی در Shodan یا Censys، تست نفوذ با قرارداد. نتیجه‌ها به سیستم تیکت بروند.', 'In Unternehmen die externe Angriffsfläche regelmäßig prüfen: Schwachstellenscanner, Abfrage der eigenen IPs bei Shodan oder Censys, Pentest mit Auftrag. Ergebnisse ins Ticketsystem.', 'In companies check the external attack surface regularly: vulnerability scanner, looking up your own IPs on Shodan or Censys, a commissioned penetration test. Results go into the ticket system.']
  ],
  lab: {
    vm: 'Eigener Internetanschluss mit Heimrouter (z. B. Fritz!Box), CL01 oder dein PC, Smartphone-Hotspot für die Gegenprobe', shell: 'PowerShell',
    steps: [
      ['IPv4 و IPv6 عمومی را با فرمان پیدا کن و با آدرس WAN روتر مقایسه کن (CGNAT را تشخیص بده: 100.64.0.0/10 در سمت WAN).', 'ShieldsUP! را در grc.com باز کن، Proceed را بزن و Common Ports و All Service Ports را آزمایش کن؛ از نتیجه عکس بگیر.', 'در روتر Port Forwardingها، UPnP، دسترسی از راه دور و اجازه‌های IPv6 را فهرست کن.', 'برای آزمایش یک Port Forwarding (TCP 8080 به رایانهٔ آزمایشی با سرویس وب) بساز و آزمون را تکرار کن؛ باید Open شود.', 'از هات‌اسپات با Test-NetConnection روی IP عمومی خودت بررسی متقابل کن.', 'Forwarding و قاعدهٔ فایروال را پاک کن، اگر UPnP لازم نیست خاموشش کن و دوباره آزمایش کن؛ باید Stealth یا Closed شود.', 'گزارش قبل و بعد، اقدام‌ها و تاریخ را بنویس.'],
      ['Öffentliche IPv4 und IPv6 mit dem Befehl ermitteln und mit der WAN-Adresse des Routers vergleichen (CGNAT erkennen: 100.64.0.0/10 auf der WAN-Seite).', 'ShieldsUP! auf grc.com öffnen, Proceed klicken und Common Ports sowie All Service Ports testen; Ergebnis als Screenshot sichern.', 'Im Router Portfreigaben, UPnP, Fernzugang und IPv6-Freigaben auflisten.', 'Testweise eine Portfreigabe (TCP 8080 auf einen Testrechner mit Webdienst) anlegen und den Test wiederholen – er muss Open zeigen.', 'Gegenprobe über den Hotspot mit Test-NetConnection auf die eigene öffentliche IP.', 'Freigabe und Firewall-Regel löschen, UPnP abschalten, wenn nicht gebraucht, und erneut testen – Ergebnis Stealth oder Closed.', 'Bericht vorher/nachher mit Maßnahmen und Datum schreiben.'],
      ['Find the public IPv4 and IPv6 with the command and compare them with the router’s WAN address (recognise CGNAT: 100.64.0.0/10 on the WAN side).', 'Open ShieldsUP! on grc.com, click Proceed and test Common Ports and All Service Ports; save a screenshot of the result.', 'On the router list port forwards, UPnP, remote access and IPv6 permissions.', 'Create a test port forward (TCP 8080 to a test machine with a web service) and repeat the test – it must show Open.', 'Cross-check from the hotspot with Test-NetConnection against your own public IP.', 'Delete the forward and the firewall rule, switch off UPnP if not needed and test again – the result must be Stealth or Closed.', 'Write a before/after report with actions and date.']
    ],
    code: R`# Oeffentliche Adressen dieses Anschlusses
Invoke-RestMethod https://api.ipify.org
Invoke-RestMethod https://api64.ipify.org

# Was lauscht auf diesem PC? (Innensicht)
Get-NetTCPConnection -State Listen | Sort-Object LocalPort |
  Select-Object LocalAddress, LocalPort, @{n='Prozess'; e={ (Get-Process -Id $_.OwningProcess).ProcessName }} -Unique

# Testdienst fuer die Freigabe (zweites Fenster, Python installiert)
#   python -m http.server 8080
# Windows-Firewall nur fuer den Test oeffnen
New-NetFirewallRule -DisplayName 'LAB-Test-8080' -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -Profile Private

# Gegenprobe vom Hotspot-Geraet: eigene oeffentliche IP einsetzen
Test-NetConnection 203.0.113.25 -Port 8080

# Aufraeumen: Regel loeschen, Portfreigabe im Router loeschen, Test wiederholen
Remove-NetFirewallRule -DisplayName 'LAB-Test-8080'`,
    checks: [
      ['IPv4 و IPv6 عمومی یادداشت شده و دربارهٔ CGNAT (بله یا نه) دلیل آورده‌ای.', 'ShieldsUP! با Forwarding آزمایشی پورت ۸۰۸۰ را Open و بعد از حذف آن Stealth یا Closed نشان داد.', 'فهرست همهٔ اجازه‌های روتر (همراه UPnP و IPv6) با تصمیم «بماند» یا «حذف شود» آماده است.', 'قاعدهٔ LAB-Test-8080 و Forwarding آزمایشی حذف شده‌اند و Get-NetFirewallRule -DisplayName LAB-Test-8080 چیزی پیدا نمی‌کند.'],
      ['Öffentliche IPv4 und IPv6 sind notiert und CGNAT (ja oder nein) ist begründet.', 'ShieldsUP! zeigte mit der Testfreigabe Port 8080 als Open und nach dem Löschen als Stealth oder Closed.', 'Die Liste aller Router-Freigaben (inklusive UPnP und IPv6) mit der Entscheidung behalten oder löschen liegt vor.', 'Regel LAB-Test-8080 und Testfreigabe sind gelöscht; Get-NetFirewallRule -DisplayName LAB-Test-8080 findet nichts mehr.'],
      ['Public IPv4 and IPv6 are noted and CGNAT (yes or no) is justified.', 'ShieldsUP! showed port 8080 as Open with the test forward and as Stealth or Closed after deleting it.', 'The list of all router permissions (including UPnP and IPv6) with the decision keep or delete is ready.', 'Rule LAB-Test-8080 and the test forward are deleted; Get-NetFirewallRule -DisplayName LAB-Test-8080 finds nothing.']
    ]
  },
  trouble: [
    [['ShieldsUP! پورت‌هایی را باز نشان می‌دهد که تو باز نکرده‌ای.', 'ShieldsUP! zeigt offene Ports, die du nicht freigegeben hast.', 'ShieldsUP! shows open ports you did not forward.'],
     ['اجازه‌های UPnP، دسترسی از راه دور روتر یا DMZ را بررسی کن؛ در روتر بخش UPnP و Forwarding را ببین، دستگاه مربوط را پیدا و تنظیمش را خاموش کن.', 'UPnP-Freigaben, Fernzugang des Routers oder DMZ prüfen; im Router unter UPnP und Freigaben nachsehen, das betreffende Gerät finden und die Einstellung abschalten.', 'Check UPnP forwards, the router’s remote access or a DMZ; look under UPnP and forwarding in the router, find the device concerned and switch the setting off.']],
    [['Forwarding ساخته شده ولی آزمون باز هم Stealth است.', 'Freigabe angelegt, der Test zeigt trotzdem Stealth.', 'Forward created, but the test still shows Stealth.'],
     ['CGNAT یا DS-Lite (بدون IPv4 عمومی)، فایروال ویندوز می‌بندد، سرویس فقط روی 127.0.0.1 گوش می‌دهد یا رایانهٔ مقصد اشتباه است (IP از DHCP عوض شده).', 'CGNAT oder DS-Lite (keine öffentliche IPv4), die Windows-Firewall blockiert, der Dienst lauscht nur auf 127.0.0.1 oder der Zielrechner ist falsch (DHCP-IP hat sich geändert).', 'CGNAT or DS-Lite (no public IPv4), the Windows firewall blocks, the service only listens on 127.0.0.1 or the target machine is wrong (DHCP IP changed).']],
    [['آزمون IPv4 تمیز است ولی دستگاه باز هم از اینترنت در دسترس است.', 'Der IPv4-Test ist sauber, das Gerät ist trotzdem aus dem Internet erreichbar.', 'The IPv4 test is clean but the device is still reachable from the internet.'],
     ['اجازهٔ IPv6 است. فایروال IPv6 روتر و اجازه‌ها را بررسی کن و از بیرون روی IPv6 آزمایش کن.', 'Es ist eine IPv6-Freigabe. IPv6-Firewall und Freigaben im Router prüfen und von außen über IPv6 testen.', 'It is an IPv6 permission. Check the router’s IPv6 firewall and permissions and test from outside over IPv6.']]
  ],
  decide: [
    [['Port Forwarding یا VPN؟', 'Portfreigabe oder VPN?', 'Port forwarding or VPN?'],
     ['برای دسترسی از راه دور به سرویس‌های داخلی (NAS، RDP، دوربین) از VPN (WireGuard یا IPsec) استفاده کن نه Forwarding؛ Forwarding فقط برای سرویس‌هایی که عمداً عمومی‌اند، با نرم‌افزار به‌روز و پایش.', 'Für Fernzugriff auf interne Dienste (NAS, RDP, Kamera) VPN (WireGuard oder IPsec) statt Portfreigabe; Freigaben nur für bewusst öffentliche Dienste mit aktueller Software und Überwachung.', 'For remote access to internal services (NAS, RDP, camera) use a VPN (WireGuard or IPsec) instead of port forwarding; forwards only for deliberately public services with current software and monitoring.']],
    [['UPnP روشن یا خاموش؟', 'UPnP an oder aus?', 'UPnP on or off?'],
     ['خاموش، مگر دستگاهی واقعاً به آن نیاز داشته باشد (مثلاً کنسول)؛ آن وقت فهرست اجازه‌های UPnP را منظم بررسی کن.', 'Aus, außer ein Gerät braucht es nachweislich (z. B. eine Konsole) – dann die Liste der UPnP-Freigaben regelmäßig prüfen.', 'Off, unless a device demonstrably needs it (e.g. a console) – then review the list of UPnP forwards regularly.']]
  ],
  pitfalls: [
    ['آزمون آنلاین IPهای دیگران (همسایه، مشتری بدون قرارداد).', 'Fremde IPs (Nachbarn, Kunden ohne Auftrag) online testen lassen.', 'Having other people’s IPs (neighbours, customers without a contract) tested online.'],
    ['فقط IPv4 را بررسی کردن و IPv6 را فراموش کردن.', 'Nur IPv4 prüfen und IPv6 vergessen.', 'Checking only IPv4 and forgetting IPv6.'],
    ['حذف نکردن Forwarding و قاعدهٔ فایروال آزمایشی بعد از آزمون.', 'Testfreigabe und Firewall-Regel nach dem Test nicht entfernen.', 'Not removing the test forward and firewall rule after the test.']
  ],
  iv: [
    [['چطور بررسی می‌کنی کدام سرویس‌های یک شرکت از اینترنت در دسترس‌اند؟', 'Wie prüfst du, welche Dienste einer Firma aus dem Internet erreichbar sind?', 'How do you check which services of a company are reachable from the internet?'],
     ['فهرست IPها و دامنه‌های عمومی، اسکن بیرونی با قرارداد، ابزارهای آنلاین، مقایسه با قاعده‌های فایروال و ثبت تفاوت‌ها به‌عنوان تیکت.', 'Liste der öffentlichen IPs und Domains, externer Scan mit Auftrag, Online-Dienste, Abgleich mit den Firewall-Regeln und Abweichungen als Tickets erfassen.', 'List of public IPs and domains, an external scan with a contract, online services, comparison with the firewall rules and deviations recorded as tickets.']],
    [['Stealth، Closed و Open یعنی چه؟', 'Was bedeuten Stealth, Closed und Open?', 'What do Stealth, Closed and Open mean?'],
     ['Stealth: هیچ پاسخی، فایروال بسته را دور می‌اندازد. Closed: دستگاه پاسخ می‌دهد که سرویسی نیست. Open: سرویسی از اینترنت در دسترس است.', 'Stealth: keine Antwort, die Firewall verwirft. Closed: das Gerät antwortet, dass kein Dienst läuft. Open: ein Dienst ist aus dem Internet erreichbar.', 'Stealth: no answer, the firewall drops packets. Closed: the device answers that no service runs. Open: a service is reachable from the internet.']],
    [['چرا RDP مستقیم در اینترنت خطرناک است؟', 'Warum ist RDP direkt im Internet gefährlich?', 'Why is RDP directly on the internet dangerous?'],
     ['حملهٔ حدس رمز، آسیب‌پذیری‌های جدی (مثل BlueKeep) و راه ورود رایج باج‌افزار؛ به‌جای آن VPN یا RD Gateway با MFA.', 'Passwort-Rateangriffe, schwere Schwachstellen (z. B. BlueKeep) und ein häufiger Einstieg für Ransomware; stattdessen VPN oder RD-Gateway mit MFA.', 'Password guessing attacks, severe vulnerabilities (e.g. BlueKeep) and a common ransomware entry point; use a VPN or RD Gateway with MFA instead.']]
  ],
  sources: [
    ['GRC ShieldsUP! (Online-Porttest)', 'https://www.grc.com/shieldsup'],
    ['New-NetFirewallRule (Microsoft Learn)', 'https://learn.microsoft.com/en-us/powershell/module/netsecurity/new-netfirewallrule']
  ]
},

{
  id: 'tools-online-web', part: 3,
  title: ['ابزارهای آنلاین برای وب، ایمیل و گواهی‌ها', 'Online-Prüfwerkzeuge für Web, E-Mail und Zertifikate', 'Online check tools for web, e-mail and certificates'],
  goal: ['پیکربندی TLS (SSL Labs)، سرآیندهای امنیتی (Mozilla HTTP Observatory)، رکوردهای DNS و ایمیل (MX، SPF، DKIM، DMARC با MXToolbox و Resolve-DnsName) و صدور گواهی‌ها (crt.sh) را بررسی کنی و با VirusTotal و Have I Been Pwned مطابق حفاظت داده کار کنی.', 'Du prüfst TLS-Konfiguration (SSL Labs), Sicherheits-Header (Mozilla HTTP Observatory), DNS- und Mail-Einträge (MX, SPF, DKIM, DMARC mit MXToolbox und Resolve-DnsName) und Zertifikatsausstellungen (crt.sh) und gehst datenschutzgerecht mit VirusTotal und Have I Been Pwned um.', 'You check TLS configuration (SSL Labs), security headers (Mozilla HTTP Observatory), DNS and mail records (MX, SPF, DKIM, DMARC with MXToolbox and Resolve-DnsName) and certificate issuance (crt.sh), and use VirusTotal and Have I Been Pwned in a privacy-compliant way.'],
  why: ['ایمیل‌ها به Spam می‌روند، مرورگر هشدار گواهی می‌دهد، مشتری «نمرهٔ A در SSL» می‌خواهد؛ با ابزارهای آنلاین درست در چند دقیقه تشخیص قابل‌اتکا داری.', 'Mails landen im Spam, Browser zeigen Zertifikatswarnungen, ein Kunde fragt nach „SSL-Note A“ – mit den richtigen Online-Prüfern hast du in Minuten eine belastbare Diagnose.', 'Mails end up in spam, browsers show certificate warnings, a customer asks for an “SSL grade A” – with the right online checkers you have a reliable diagnosis in minutes.'],
  know: [
    ['Qualys SSL Labs Server Test پیکربندی TLS عمومی را نمره می‌دهد (A+ تا F): زنجیرهٔ گواهی، پروتکل‌ها (TLS 1.2 و 1.3)، Cipherها و HSTS. گزینهٔ Do not show the results on the boards را بزن. فقط سرورهای عمومی.', 'Qualys SSL Labs Server Test bewertet die öffentliche TLS-Konfiguration (A+ bis F): Zertifikatskette, Protokolle (TLS 1.2 und 1.3), Cipher und HSTS. „Do not show the results on the boards“ anhaken. Nur öffentlich erreichbare Server.', 'Qualys SSL Labs Server Test grades the public TLS configuration (A+ to F): certificate chain, protocols (TLS 1.2 and 1.3), ciphers and HSTS. Tick “Do not show the results on the boards”. Only publicly reachable servers.'],
    ['Mozilla HTTP Observatory سرآیندهای امنیتی مثل Content-Security-Policy، Strict-Transport-Security و X-Content-Type-Options را بررسی می‌کند؛ ssl-config.mozilla.org پیکربندی مناسب سرور (nginx، Apache) را می‌سازد.', 'Mozilla HTTP Observatory prüft Sicherheits-Header wie Content-Security-Policy, Strict-Transport-Security und X-Content-Type-Options; ssl-config.mozilla.org erzeugt passende Serverkonfigurationen (nginx, Apache).', 'Mozilla HTTP Observatory checks security headers such as Content-Security-Policy, Strict-Transport-Security and X-Content-Type-Options; ssl-config.mozilla.org generates suitable server configurations (nginx, Apache).'],
    ['تحویل ایمیل: MX، SPF (TXT با v=spf1)، DKIM (selector._domainkey) و DMARC (TXT در _dmarc با p=none، quarantine یا reject). MXToolbox این‌ها و فهرست‌های سیاه را بررسی می‌کند؛ محلی با Resolve-DnsName -Type TXT یا dig.', 'E-Mail-Zustellung: MX, SPF (TXT mit v=spf1), DKIM (selector._domainkey) und DMARC (TXT unter _dmarc mit p=none, quarantine oder reject). MXToolbox prüft diese und Blacklists; lokal mit Resolve-DnsName -Type TXT oder dig.', 'E-mail delivery: MX, SPF (TXT with v=spf1), DKIM (selector._domainkey) and DMARC (TXT under _dmarc with p=none, quarantine or reject). MXToolbox checks these and blacklists; locally use Resolve-DnsName -Type TXT or dig.'],
    ['crt.sh در لاگ‌های Certificate Transparency جست‌وجو می‌کند: چه گواهی‌هایی برای دامنهٔ تو صادر شده است؟ برای برنامه‌ریزی انقضا و کشف صدورهای ناشناخته مفید است، ولی نام‌های میزبان داخلی را هم عمومی می‌کند؛ هنگام نام‌گذاری دقت کن.', 'crt.sh durchsucht Certificate-Transparency-Logs: Welche Zertifikate wurden für deine Domain ausgestellt? Hilft bei der Ablaufplanung und zeigt unbekannte Ausstellungen, macht aber auch interne Hostnamen öffentlich – bei der Benennung beachten.', 'crt.sh searches Certificate Transparency logs: which certificates were issued for your domain? It helps with expiry planning and reveals unknown issuance, but it also makes internal host names public – keep that in mind when naming.'],
    ['VirusTotal فایل یا URL را با ده‌ها اسکنر بررسی می‌کند. توجه: فایل‌های بارگذاری‌شده برای کاربران پولی قابل دریافت‌اند؛ سند محرمانه بارگذاری نکن و اول فقط Hash SHA-256 را جست‌وجو کن.', 'VirusTotal prüft Dateien oder URLs mit Dutzenden Scannern. Achtung: Hochgeladene Dateien sind für zahlende Nutzer abrufbar – keine vertraulichen Dokumente hochladen, zuerst nur den SHA-256-Hash suchen.', 'VirusTotal checks files or URLs with dozens of scanners. Caution: uploaded files can be downloaded by paying users – never upload confidential documents, first search only for the SHA-256 hash.'],
    ['Have I Been Pwned نشان می‌دهد آیا نشانی ایمیلی در نشت‌های شناخته‌شده هست؛ شرکت‌ها می‌توانند دامنهٔ خود را تأیید و پایش کنند. Pwned Passwords رمز را با k-Anonymity بررسی می‌کند (فقط پیشوند Hash فرستاده می‌شود).', 'Have I Been Pwned zeigt, ob E-Mail-Adressen in bekannten Datenlecks vorkommen; Firmen können ihre Domain verifizieren und überwachen. Pwned Passwords prüft Kennwörter per k-Anonymität (nur ein Hash-Präfix wird gesendet).', 'Have I Been Pwned shows whether e-mail addresses appear in known breaches; companies can verify and monitor their domain. Pwned Passwords checks passwords using k-anonymity (only a hash prefix is sent).']
  ],
  lab: {
    vm: 'CL01 oder dein PC mit Internetzugang; eigene Domain oder eine große öffentliche Website', shell: 'PowerShell',
    steps: [
      ['SSL Labs را برای دامنهٔ خودت یا یک وب‌سایت عمومی بزرگ اجرا کن (Do not show … را بزن) و نمره، پروتکل‌ها و تاریخ انقضای گواهی را یادداشت کن.', 'همان گواهی را با PowerShell بخوان و صادرکننده و انقضا را مقایسه کن.', 'HTTP Observatory را برای همان سایت اجرا کن و سرآیندهای ناموجود را یادداشت کن.', 'MX، SPF و DMARC یک دامنه را با Resolve-DnsName بپرس و با MXToolbox SuperTool مقایسه کن.', 'در crt.sh گواهی‌های دامنه را فهرست کن و صادرکننده و اعتبار را ببین.', 'برای یک فایل دانلودشده SHA-256 بساز و در VirusTotal فقط Hash را جست‌وجو کن.', 'گزارش با اقدام‌ها بنویس (مثلاً فعال‌کردن HSTS، تغییر DMARC از none به quarantine).'],
      ['SSL Labs für deine eigene Domain oder eine große öffentliche Website ausführen („Do not show …“ anhaken) und Note, Protokolle und Zertifikatsablauf notieren.', 'Dasselbe Zertifikat mit PowerShell auslesen und Aussteller sowie Ablauf vergleichen.', 'HTTP Observatory für dieselbe Seite ausführen und fehlende Header notieren.', 'MX, SPF und DMARC einer Domain mit Resolve-DnsName abfragen und mit dem MXToolbox SuperTool vergleichen.', 'In crt.sh die Zertifikate der Domain auflisten und Aussteller sowie Gültigkeit ansehen.', 'Für eine heruntergeladene Datei den SHA-256 berechnen und bei VirusTotal nur den Hash suchen.', 'Bericht mit Maßnahmen schreiben (z. B. HSTS aktivieren, DMARC von none auf quarantine).'],
      ['Run SSL Labs for your own domain or a large public website (tick “Do not show …”) and note grade, protocols and certificate expiry.', 'Read the same certificate with PowerShell and compare issuer and expiry.', 'Run HTTP Observatory for the same site and note missing headers.', 'Query MX, SPF and DMARC of a domain with Resolve-DnsName and compare with the MXToolbox SuperTool.', 'List the domain’s certificates in crt.sh and look at issuer and validity.', 'Compute the SHA-256 of a downloaded file and search only for the hash on VirusTotal.', 'Write a report with actions (e.g. enable HSTS, move DMARC from none to quarantine).']
    ],
    code: R`$domain = 'example.org'   # eigene Domain einsetzen

# DNS und E-Mail
Resolve-DnsName $domain -Type MX
Resolve-DnsName $domain -Type TXT | Where-Object { $_.Strings -match 'v=spf1' }
Resolve-DnsName "_dmarc.$domain" -Type TXT

# Zertifikat einer Website auslesen (Aussteller, Ablauf, Protokoll)
$tcp = [System.Net.Sockets.TcpClient]::new($domain, 443)
$ssl = [System.Net.Security.SslStream]::new($tcp.GetStream(), $false, { $true })   # nur zum Auslesen
$ssl.AuthenticateAsClient($domain)
$cert = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new($ssl.RemoteCertificate)
$cert | Select-Object Subject, Issuer, NotBefore, NotAfter
'Protokoll: ' + $ssl.SslProtocol
$ssl.Dispose(); $tcp.Dispose()

# Sicherheits-Header ansehen
(Invoke-WebRequest "https://$domain" -Method Head -UseBasicParsing).Headers

# Hash statt Datei: SHA-256 berechnen und den Wert bei VirusTotal suchen
(Get-FileHash "$env:USERPROFILE\Downloads\datei.exe" -Algorithm SHA256).Hash`,
    checks: [
      ['نمرهٔ SSL Labs، نسخه‌های TLS و انقضای گواهی با خروجی PowerShell می‌خوانند.', 'MX، SPF و DMARC دامنه یادداشت و با MXToolbox مقایسه شده‌اند.', 'در crt.sh آخرین گواهی‌های دامنه با صادرکننده و تاریخ پیدا شده‌اند.', 'برای فایل آزمایشی فقط Hash در VirusTotal جست‌وجو شد و فایلی بارگذاری نشد.'],
      ['SSL-Labs-Note, TLS-Versionen und Zertifikatsablauf passen zur PowerShell-Ausgabe.', 'MX, SPF und DMARC der Domain sind notiert und mit MXToolbox abgeglichen.', 'In crt.sh sind die letzten Zertifikate der Domain mit Aussteller und Datum gefunden.', 'Für die Testdatei wurde bei VirusTotal nur der Hash gesucht, keine Datei hochgeladen.'],
      ['SSL Labs grade, TLS versions and certificate expiry match the PowerShell output.', 'MX, SPF and DMARC of the domain are noted and compared with MXToolbox.', 'The latest certificates of the domain with issuer and date were found in crt.sh.', 'Only the hash of the test file was searched on VirusTotal; no file was uploaded.']
    ]
  },
  trouble: [
    [['مرورگر خطای گواهی می‌دهد و SSL Labs می‌گوید Chain issues: Incomplete.', 'Der Browser meldet einen Zertifikatsfehler, SSL Labs zeigt Chain issues: Incomplete.', 'The browser reports a certificate error and SSL Labs shows Chain issues: Incomplete.'],
     ['گواهی میانی در پیکربندی سرور نیست؛ fullchain را به کار ببر. بعضی مرورگرها آن را خودشان کامل می‌کنند ولی کلاینت‌های دیگر (Java، curl، ایمیل) نه.', 'Das Zwischenzertifikat fehlt in der Serverkonfiguration; fullchain verwenden. Manche Browser ergänzen es selbst, andere Clients (Java, curl, Mail) nicht.', 'The intermediate certificate is missing from the server configuration; use the full chain. Some browsers complete it themselves, other clients (Java, curl, mail) do not.']],
    [['ایمیل‌ها نزد گیرنده در Spam می‌افتند.', 'Mails landen beim Empfänger im Spam.', 'Mails end up in the recipient’s spam folder.'],
     ['SPF همهٔ فرستنده‌ها را ندارد (مثلاً سرویس خبرنامه)، DKIM نیست یا Selector اشتباه است، DMARC وجود ندارد. با MXToolbox و سرآیند Authentication-Results بررسی کن و فهرست سیاه را هم ببین.', 'SPF enthält nicht alle Absender (z. B. Newsletter-Dienst), DKIM fehlt oder der Selector ist falsch, DMARC fehlt. Mit MXToolbox und dem Header Authentication-Results prüfen und Blacklists kontrollieren.', 'SPF does not include all senders (e.g. a newsletter service), DKIM is missing or the selector is wrong, DMARC is missing. Check with MXToolbox and the Authentication-Results header and check blacklists.']],
    [['SSL Labs نمی‌تواند سرور را آزمایش کند.', 'SSL Labs kann den Server nicht testen.', 'SSL Labs cannot test the server.'],
     ['سرور عمومی نیست، فایروال یا مسدودسازی جغرافیایی، فقط IPv6 یا پورت دیگر. سرورهای داخلی را با ابزار خودت (PowerShell بالا یا openssl s_client) بررسی کن.', 'Der Server ist nicht öffentlich erreichbar, Firewall oder Geo-Sperre, nur IPv6 oder ein anderer Port. Interne Server mit eigenen Werkzeugen prüfen (PowerShell oben oder openssl s_client).', 'The server is not publicly reachable, firewall or geo-blocking, IPv6 only or another port. Check internal servers with your own tools (the PowerShell above or openssl s_client).']]
  ],
  decide: [
    [['فایل را در VirusTotal بارگذاری کنم یا فقط Hash را جست‌وجو کنم؟', 'Datei bei VirusTotal hochladen oder nur den Hash suchen?', 'Upload the file to VirusTotal or only search the hash?'],
     ['پیش‌فرض: فقط Hash. بارگذاری فقط برای فایل‌های مشکوک غیرمحرمانه و طبق سیاست امنیتی؛ در صورت تردید تیم امنیت یا Sandbox.', 'Standard: nur der Hash. Hochladen nur für nicht vertrauliche, verdächtige Dateien gemäß Sicherheitsrichtlinie; im Zweifel Security-Team oder Sandbox.', 'Default: hash only. Upload only non-confidential suspicious files according to security policy; when in doubt involve the security team or a sandbox.']],
    [['DMARC را فوراً روی reject بگذارم؟', 'DMARC sofort auf reject setzen?', 'Set DMARC to reject straight away?'],
     ['اول p=none با گزارش (rua) و تحلیل، همهٔ فرستنده‌های مجاز را در SPF و DKIM بیاور، بعد quarantine و بعد reject.', 'Erst p=none mit Berichten (rua) auswerten, alle legitimen Absender in SPF und DKIM aufnehmen, dann quarantine, dann reject.', 'First p=none with reports (rua) and analysis, include all legitimate senders in SPF and DKIM, then quarantine, then reject.']]
  ],
  pitfalls: [
    ['بارگذاری فایل‌های محرمانه در VirusTotal.', 'Vertrauliche Dateien zu VirusTotal hochladen.', 'Uploading confidential files to VirusTotal.'],
    ['ساختن چند رکورد SPF برای یک دامنه (نامعتبر است؛ فقط یک رکورد v=spf1 مجاز است).', 'Mehrere SPF-Einträge für eine Domain anlegen (ungültig – nur ein v=spf1-Eintrag ist erlaubt).', 'Creating several SPF records for one domain (invalid – only one v=spf1 record is allowed).'],
    ['نتیجهٔ آزمون‌های عمومی را بررسی امنیتی کامل معرفی کردن.', 'Ergebnisse öffentlicher Tests als vollständige Sicherheitsprüfung verkaufen.', 'Presenting results of public tests as a complete security audit.']
  ],
  iv: [
    [['مشتری می‌گوید ایمیل‌هایش به Spam می‌رود. چه چیزی را بررسی می‌کنی؟', 'Eine Kundin sagt, ihre Mails landen im Spam. Was prüfst du?', 'A customer says her mails go to spam. What do you check?'],
     ['SPF، DKIM، DMARC، Reverse DNS (PTR) سرور ایمیل، فهرست‌های سیاه، سرآیند Authentication-Results و محتوا و لینک‌ها.', 'SPF, DKIM, DMARC, Reverse-DNS (PTR) des Mailservers, Blacklists, den Header Authentication-Results sowie Inhalt und Links.', 'SPF, DKIM, DMARC, reverse DNS (PTR) of the mail server, blacklists, the Authentication-Results header and content and links.']],
    [['Certificate Transparency چیست؟', 'Was ist Certificate Transparency?', 'What is Certificate Transparency?'],
     ['لاگ‌های عمومی همهٔ گواهی‌هایی که CAهای مورد اعتماد صادر می‌کنند؛ هر کس می‌تواند ببیند چه گواهی‌هایی برای یک دامنه وجود دارد (مثلاً با crt.sh).', 'Öffentliche Logs aller von vertrauenswürdigen CAs ausgestellten Zertifikate; jeder kann prüfen, welche Zertifikate für eine Domain existieren (z. B. mit crt.sh).', 'Public logs of all certificates issued by trusted CAs; anyone can check which certificates exist for a domain (e.g. with crt.sh).']],
    [['گواهی را بدون مرورگر چطور بررسی می‌کنی؟', 'Wie prüfst du ein Zertifikat ohne Browser?', 'How do you check a certificate without a browser?'],
     ['با PowerShell (SslStream) یا openssl s_client -connect میزبان:443 -servername میزبان؛ انقضا، زنجیره و پروتکل‌ها را می‌بینم.', 'Mit PowerShell (SslStream) oder openssl s_client -connect host:443 -servername host; Ablauf, Kette und Protokolle ansehen.', 'With PowerShell (SslStream) or openssl s_client -connect host:443 -servername host; look at expiry, chain and protocols.']]
  ],
  sources: [
    ['Qualys SSL Labs – SSL Server Test', 'https://www.ssllabs.com/ssltest/'],
    ['Mozilla SSL Configuration Generator', 'https://ssl-config.mozilla.org/'],
    ['crt.sh – Certificate Search', 'https://crt.sh/']
  ]
}

);
})();
