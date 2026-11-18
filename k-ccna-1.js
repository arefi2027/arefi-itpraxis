/* Arefi ITPraxis – Kurs Cisco-Netzwerke (CCNA-Niveau), Teil 1 (IOS, VLAN, STP und EtherChannel). Eigene Inhalte, keine Cisco-Unterlagen. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKCcna = window.ArefiKCcna || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'ccna-ios', part: 1,
  title: ['Cisco IOS: پیکربندی پایه، ذخیره و دسترسی امن با SSH', 'Cisco IOS: Grundkonfiguration, Speichern und sicherer Zugang per SSH', 'Cisco IOS: basic configuration, saving and secure SSH access'],
  goal: ['در Packet Tracer یک روتر و یک سوئیچ را از صفر پیکربندی کنی: نام، رمزها، بنر، آدرس مدیریتی، SSH نسخهٔ ۲ و ذخیرهٔ دائمی پیکربندی؛ طوری که بعد از ری‌استارت هم کار کند.', 'Du richtest in Packet Tracer einen Router und einen Switch von null ein: Name, Kennwörter, Banner, Management-Adresse, SSH Version 2 und dauerhaftes Speichern – so, dass alles einen Neustart übersteht.', 'In Packet Tracer you configure a router and a switch from scratch: name, passwords, banner, management address, SSH version 2 and permanent saving – so everything survives a reload.'],
  why: ['در هر شرکت، اولین کار با دستگاه نو همین پیکربندی پایه است. دستگاهی که با Telnet یا بدون رمز قابل دسترسی است یک حفرهٔ امنیتی است و پیکربندی ذخیره‌نشده بعد از قطع برق از بین می‌رود؛ هر دو خطای رایج تکنسین تازه‌کارند.', 'In jeder Firma ist die Grundkonfiguration der erste Schritt mit einem neuen Gerät. Ein Gerät, das per Telnet oder ohne Kennwort erreichbar ist, ist eine Sicherheitslücke, und eine ungespeicherte Konfiguration ist nach dem nächsten Stromausfall weg – beides typische Anfängerfehler.', 'In every company the basic configuration is the first step with a new device. A device reachable via Telnet or without a password is a security hole, and an unsaved configuration is gone after the next power cut – both typical beginner mistakes.'],
  know: [
    ['حالت‌های IOS: User EXEC با علامت > فقط برای دیدن است، Privileged EXEC با # (فرمان enable) برای show کامل و ذخیره، Global Configuration با configure terminal و حالت‌های زیرمجموعه مثل (config-if)# برای یک اینترفیس. exit یک سطح برمی‌گردد و end یا Ctrl+Z مستقیم به حالت #.', 'IOS-Modi: User EXEC mit > nur zum Ansehen, Privileged EXEC mit # (Befehl enable) für alle show-Befehle und das Speichern, Global Configuration mit configure terminal und Untermodi wie (config-if)# für eine Schnittstelle. exit geht eine Ebene zurück, end oder Strg+Z direkt in den #-Modus.', 'IOS modes: User EXEC with > is view-only, Privileged EXEC with # (command enable) for all show commands and saving, Global Configuration with configure terminal and sub-modes like (config-if)# for one interface. exit goes back one level, end or Ctrl+Z straight to # mode.'],
    ['دو پیکربندی وجود دارد: running-config در RAM که هر فرمان فوراً در آن اعمال می‌شود، و startup-config در NVRAM که هنگام روشن شدن خوانده می‌شود. فقط copy running-config startup-config (یا کوتاه wr) تغییرات را دائمی می‌کند. در شبکهٔ واقعی قبل از تغییر بزرگ یک نسخه از پیکربندی را روی سرور TFTP/SCP یا در سیستم مستندسازی نگه دار.', 'Es gibt zwei Konfigurationen: running-config im RAM, in der jeder Befehl sofort wirkt, und startup-config im NVRAM, die beim Einschalten geladen wird. Erst copy running-config startup-config (kurz wr) macht Änderungen dauerhaft. Im echten Netz vor größeren Änderungen eine Kopie auf einem TFTP-/SCP-Server oder in der Dokumentation ablegen.', 'There are two configurations: running-config in RAM, where every command takes effect immediately, and startup-config in NVRAM, loaded at power-on. Only copy running-config startup-config (short wr) makes changes permanent. In a real network keep a copy on a TFTP/SCP server or in your documentation before larger changes.'],
    ['رمزها: enable secret هش می‌شود و همیشه به جای enable password به کار می‌رود. service password-encryption فقط رمزهای ساده را با Type 7 پنهان می‌کند که در چند ثانیه قابل بازگشت است؛ پس جای رمز واقعی نیست. کاربر محلی با username admin privilege 15 secret … و login local روی خط‌ها بهتر از یک رمز مشترک است.', 'Kennwörter: enable secret wird gehasht und ersetzt immer enable password. service password-encryption verschleiert Klartext-Kennwörter nur mit Typ 7, der in Sekunden umkehrbar ist – kein echter Schutz. Ein lokaler Benutzer mit username admin privilege 15 secret … und login local auf den Lines ist besser als ein gemeinsames Line-Kennwort.', 'Passwords: enable secret is hashed and always replaces enable password. service password-encryption only obscures plain passwords with Type 7, which is reversible in seconds – not real protection. A local user with username admin privilege 15 secret … and login local on the lines beats one shared line password.'],
    ['برای SSH چهار چیز لازم است: hostname غیرپیش‌فرض، ip domain-name، کلید RSA دست‌کم ۲۰۴۸ بیت با crypto key generate rsa و کاربر محلی. بعد روی line vty 0 15 فرمان‌های login local و transport input ssh را بزن تا Telnet بسته شود. ip ssh version 2 نسخهٔ قدیمی و ناامن ۱ را خاموش می‌کند.', 'SSH braucht vier Dinge: einen eigenen Hostnamen, ip domain-name, einen RSA-Schlüssel mit mindestens 2048 Bit über crypto key generate rsa und einen lokalen Benutzer. Dann auf line vty 0 15 login local und transport input ssh setzen, damit Telnet geschlossen ist. ip ssh version 2 schaltet die unsichere Version 1 ab.', 'SSH needs four things: a non-default hostname, ip domain-name, an RSA key of at least 2048 bits via crypto key generate rsa and a local user. Then set login local and transport input ssh on line vty 0 15 so Telnet is closed. ip ssh version 2 turns off the insecure version 1.'],
    ['سوئیچ لایهٔ ۲ برای مدیریت یک SVI (اینترفیس مجازی VLAN) با آدرس IP و یک ip default-gateway لازم دارد؛ بدون Gateway فقط از همان شبکه قابل دسترسی است. در show ip interface brief وضعیت administratively down یعنی no shutdown فراموش شده و down/down یعنی کابل یا طرف مقابل مشکل دارد.', 'Ein Layer-2-Switch braucht zur Verwaltung eine SVI (virtuelle VLAN-Schnittstelle) mit IP-Adresse und ein ip default-gateway; ohne Gateway ist er nur aus dem eigenen Netz erreichbar. In show ip interface brief bedeutet administratively down: no shutdown fehlt; down/down: Kabel oder Gegenstelle haben ein Problem.', 'A Layer 2 switch needs an SVI (virtual VLAN interface) with an IP address and an ip default-gateway for management; without the gateway it is only reachable from its own subnet. In show ip interface brief, administratively down means no shutdown is missing; down/down means a cable or far-end problem.'],
    ['کمک‌های روزمره: ? فرمان‌ها و پارامترهای ممکن را نشان می‌دهد، Tab فرمان را کامل می‌کند، do اجرای show در حالت پیکربندی را ممکن می‌کند، show running-config | section line vty فقط بخش مربوط را نشان می‌دهد و no ip domain-lookup جلوی انتظار طولانی بعد از غلط تایپی را می‌گیرد.', 'Alltagshilfen: ? zeigt mögliche Befehle und Parameter, Tab vervollständigt, do erlaubt show-Befehle im Konfigurationsmodus, show running-config | section line vty zeigt nur den passenden Abschnitt, und no ip domain-lookup verhindert lange Wartezeiten nach Tippfehlern.', 'Everyday helpers: ? lists possible commands and parameters, Tab completes, do runs show commands in configuration mode, show running-config | section line vty shows only the matching section, and no ip domain-lookup prevents long waits after typos.'],
    ['این دوره مستقل است و محتوای آن خودنوشته است. Cisco® و CCNA® علامت‌های تجاری Cisco Systems هستند؛ این دوره با Cisco ارتباطی ندارد و آموزش رسمی Cisco نیست. Packet Tracer را رایگان با حساب Cisco Networking Academy (netacad.com) دریافت می‌کنی؛ آزمایش‌ها با نسخهٔ ۸٫۲ و جدیدتر نوشته شده‌اند.', 'Diese Lernstrecke ist unabhängig und selbst geschrieben. Cisco® und CCNA® sind Marken von Cisco Systems; der Kurs steht in keiner Verbindung zu Cisco und ist keine offizielle Cisco-Schulung. Packet Tracer gibt es kostenlos mit einem Konto der Cisco Networking Academy (netacad.com); die Labore sind für Version 8.2 und neuer geschrieben.', 'This course is independent and self-written. Cisco® and CCNA® are trademarks of Cisco Systems; the course is not affiliated with Cisco and is not official Cisco training. Packet Tracer is free with a Cisco Networking Academy account (netacad.com); the labs are written for version 8.2 and later.']
  ],
  lab: {
    vm: 'Packet Tracer: R1 (ISR4331), SW1 (2960-24TT), PC1', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['R1 و SW1 و PC1 را بگذار. R1 G0/0/0 را به SW1 G0/1 و PC1 را به SW1 Fa0/1 وصل کن. به PC1 آدرس 192.168.10.10/24 با Gateway 192.168.10.1 بده.', 'روی SW1 نام، رمز enable، کاربر محلی، بنر و تنظیمات کنسول را وارد کن؛ بعد کلید RSA (۲۰۴۸ بیت) و SSH نسخهٔ ۲ را فعال کن.', 'SVI مدیریتی سوئیچ و Default Gateway را تنظیم کن و Telnet را با transport input ssh ببند.', 'روی R1 همین پایه را بزن و اینترفیس G0/0/0 را با 192.168.10.1/24 روشن کن.', 'هر دو دستگاه را ذخیره کن، با reload ری‌استارت کن و از Command Prompt در PC1 با ssh -l admin 192.168.10.2 وارد شو.'],
      ['R1, SW1 und PC1 platzieren. R1 G0/0/0 mit SW1 G0/1 und PC1 mit SW1 Fa0/1 verbinden. PC1 bekommt 192.168.10.10/24 mit Gateway 192.168.10.1.', 'Auf SW1 Name, enable secret, lokalen Benutzer, Banner und Konsoleneinstellungen setzen; danach RSA-Schlüssel (2048 Bit) und SSH Version 2 aktivieren.', 'Management-SVI des Switches und Default Gateway einrichten, Telnet mit transport input ssh schließen.', 'Auf R1 dieselbe Basis setzen und G0/0/0 mit 192.168.10.1/24 aktivieren.', 'Beide Geräte speichern, mit reload neu starten und vom Command Prompt auf PC1 mit ssh -l admin 192.168.10.2 anmelden.'],
      ['Place R1, SW1 and PC1. Connect R1 G0/0/0 to SW1 G0/1 and PC1 to SW1 Fa0/1. Give PC1 192.168.10.10/24 with gateway 192.168.10.1.', 'On SW1 set name, enable secret, local user, banner and console settings; then enable an RSA key (2048 bit) and SSH version 2.', 'Configure the switch management SVI and default gateway, close Telnet with transport input ssh.', 'Apply the same baseline on R1 and bring up G0/0/0 with 192.168.10.1/24.', 'Save both devices, restart with reload and log in from the PC1 Command Prompt with ssh -l admin 192.168.10.2.']
    ],
    code: R`! ===== SW1 =====
enable
configure terminal
hostname SW1
no ip domain-lookup
enable secret Lab!Enable2026
username admin privilege 15 secret Lab!Admin2026
service password-encryption
banner motd # Zugriff nur fuer autorisierte Personen #
line console 0
 login local
 logging synchronous
 exec-timeout 10 0
 exit
ip domain-name lab.local
crypto key generate rsa
! Frage "How many bits in the modulus" mit 2048 beantworten
ip ssh version 2
line vty 0 15
 login local
 transport input ssh
 exec-timeout 10 0
 exit
interface vlan 1
 ip address 192.168.10.2 255.255.255.0
 no shutdown
 exit
ip default-gateway 192.168.10.1
end
copy running-config startup-config

! ===== R1 =====
enable
configure terminal
hostname R1
no ip domain-lookup
enable secret Lab!Enable2026
username admin privilege 15 secret Lab!Admin2026
ip domain-name lab.local
crypto key generate rsa
ip ssh version 2
line vty 0 4
 login local
 transport input ssh
 exit
interface g0/0/0
 description LAN zu SW1
 ip address 192.168.10.1 255.255.255.0
 no shutdown
end
copy running-config startup-config

! ===== Pruefen =====
show ip interface brief
show ip ssh
show running-config | section line vty
show version | include uptime|Configuration register`,
    checks: [
      ['show ip ssh روی هر دو دستگاه SSH Enabled – version 2.0 نشان می‌دهد.', 'از PC1 با SSH به SW1 و R1 وارد می‌شوی و Telnet رد می‌شود.', 'بعد از reload نام دستگاه و آدرس‌ها هنوز سر جایشان هستند.', 'در show running-config هیچ رمز متن ساده‌ای دیده نمی‌شود و enable secret هش شده است.'],
      ['show ip ssh zeigt auf beiden Geräten SSH Enabled – version 2.0.', 'Von PC1 kommst du per SSH auf SW1 und R1, Telnet wird abgewiesen.', 'Nach reload sind Hostname und Adressen noch vorhanden.', 'In show running-config steht kein Klartext-Kennwort, enable secret ist gehasht.'],
      ['show ip ssh shows SSH Enabled – version 2.0 on both devices.', 'From PC1 you reach SW1 and R1 via SSH, Telnet is refused.', 'After reload the hostname and addresses are still there.', 'show running-config contains no plain-text password and enable secret is hashed.']
    ]
  },
  trouble: [
    [['پیام % Invalid input detected at ^ marker.', 'Meldung % Invalid input detected at ^ marker.', 'Message % Invalid input detected at ^ marker.'],
     ['علامت ^ دقیقاً جای خطا را نشان می‌دهد: غلط تایپی یا حالت اشتباه. با ? بررسی کن کدام فرمان در این حالت مجاز است؛ مثلاً show در حالت (config) فقط با do کار می‌کند.', 'Das ^ zeigt genau auf den Fehler: Tippfehler oder falscher Modus. Mit ? prüfen, welche Befehle hier erlaubt sind; show funktioniert im (config)-Modus zum Beispiel nur mit do.', 'The ^ points exactly at the error: a typo or the wrong mode. Use ? to see which commands are allowed here; for example show only works in (config) mode with do.']],
    [['بعد از یک غلط تایپی، دستگاه چند ثانیه با Translating… domain server قفل می‌شود.', 'Nach einem Tippfehler hängt das Gerät sekundenlang mit Translating… domain server.', 'After a typo the device hangs for seconds with Translating… domain server.'],
     ['IOS کلمهٔ ناشناخته را نام میزبان فرض می‌کند و دنبال DNS می‌گردد. با Ctrl+Shift+6 قطع کن و no ip domain-lookup را در پیکربندی بگذار.', 'IOS hält das unbekannte Wort für einen Hostnamen und fragt DNS. Mit Strg+Umschalt+6 abbrechen und no ip domain-lookup konfigurieren.', 'IOS treats the unknown word as a hostname and queries DNS. Abort with Ctrl+Shift+6 and configure no ip domain-lookup.']],
    [['SSH با Connection refused یا قطع فوری رد می‌شود.', 'SSH wird mit Connection refused oder sofortigem Abbruch abgelehnt.', 'SSH is rejected with Connection refused or an immediate disconnect.'],
     ['show ip ssh: اگر SSH غیرفعال است کلید RSA ساخته نشده (اول hostname و ip domain-name لازم است). show run | section line vty: login local بدون username یا transport input telnet رایج‌ترین علت‌اند. در نهایت دسترسی IP و Gateway را با ping بسنج.', 'show ip ssh: Ist SSH deaktiviert, fehlt der RSA-Schlüssel (vorher Hostname und ip domain-name setzen). show run | section line vty: login local ohne username oder transport input telnet sind die häufigsten Ursachen. Zuletzt IP-Erreichbarkeit und Gateway per ping prüfen.', 'show ip ssh: if SSH is disabled, the RSA key is missing (set hostname and ip domain-name first). show run | section line vty: login local without a username or transport input telnet are the usual causes. Finally test IP reachability and the gateway with ping.']],
    [['بعد از ری‌استارت پیکربندی خالی است.', 'Nach dem Neustart ist die Konfiguration leer.', 'After a restart the configuration is empty.'],
     ['یا ذخیره نشده بود (copy running-config startup-config) یا Configuration register از بازیابی رمز روی 0x2142 مانده و NVRAM نادیده گرفته می‌شود. در show version ببین و با config-register 0x2102 برگردان.', 'Entweder wurde nicht gespeichert (copy running-config startup-config) oder das Configuration Register steht nach einer Kennwort-Wiederherstellung noch auf 0x2142 und ignoriert NVRAM. In show version prüfen und mit config-register 0x2102 zurücksetzen.', 'Either it was not saved (copy running-config startup-config) or the configuration register is still 0x2142 after password recovery and NVRAM is ignored. Check show version and reset with config-register 0x2102.']]
  ],
  decide: [
    [['Telnet، SSH یا فقط کنسول؟', 'Telnet, SSH oder nur Konsole?', 'Telnet, SSH or console only?'],
     ['در محیط واقعی هرگز Telnet؛ همه‌چیز متن ساده است. SSH نسخهٔ ۲ با کاربر شخصی و در شبکه‌های بزرگ‌تر با AAA از طریق RADIUS یا TACACS+ تا هر ورود ثبت شود. کنسول برای نصب اول و حالت اضطراری است.', 'Im echten Betrieb nie Telnet – alles im Klartext. SSH Version 2 mit persönlichen Konten, in größeren Netzen über AAA mit RADIUS oder TACACS+, damit jede Anmeldung protokolliert wird. Konsole für Erstinstallation und Notfall.', 'Never Telnet in production – everything is plain text. SSH version 2 with personal accounts, in larger networks through AAA with RADIUS or TACACS+ so every login is logged. Console for initial setup and emergencies.']],
    [['مدیریت در VLAN 1 یا VLAN جداگانه؟', 'Management im VLAN 1 oder eigenem VLAN?', 'Management in VLAN 1 or a separate VLAN?'],
     ['در آزمایشگاه اول VLAN 1 ساده‌تر است، اما در شرکت مدیریت در یک VLAN جداگانه (مثلاً 99) با ACL قرار می‌گیرد و VLAN 1 برای کاربران و مدیریت استفاده نمی‌شود. در ماژول بعدی همین را می‌سازی.', 'Im ersten Labor ist VLAN 1 einfacher, im Unternehmen liegt das Management aber in einem eigenen VLAN (z. B. 99) mit ACL, und VLAN 1 wird weder für Benutzer noch für Management genutzt. Das baust du im nächsten Modul.', 'In the first lab VLAN 1 is simpler, but in a company management lives in a separate VLAN (e.g. 99) with an ACL, and VLAN 1 is used neither for users nor management. You build that in the next module.']]
  ],
  pitfalls: [
    ['ذخیره نکردن بعد از کار و از دست دادن همه‌چیز در ری‌استارت بعدی.', 'Nicht speichern und beim nächsten Neustart alles verlieren.', 'Not saving and losing everything at the next restart.'],
    ['استفاده از enable password یا اعتماد به service password-encryption به‌عنوان رمزنگاری واقعی.', 'enable password verwenden oder service password-encryption für echte Verschlüsselung halten.', 'Using enable password or treating service password-encryption as real encryption.'],
    ['transport input ssh را زدن قبل از اینکه کلید RSA و کاربر محلی آماده باشد؛ از راه دور قفل می‌شوی.', 'transport input ssh setzen, bevor RSA-Schlüssel und lokaler Benutzer existieren – du sperrst dich aus der Ferne aus.', 'Setting transport input ssh before the RSA key and local user exist – you lock yourself out remotely.']
  ],
  iv: [
    [['فرق running-config و startup-config چیست؟', 'Was ist der Unterschied zwischen running-config und startup-config?', 'What is the difference between running-config and startup-config?'],
     ['running-config در RAM پیکربندی فعال است و هر فرمان فوراً در آن اثر دارد؛ startup-config در NVRAM هنگام بوت بارگذاری می‌شود. با copy running-config startup-config تغییرات دائمی می‌شوند.', 'running-config liegt im RAM, ist aktiv und ändert sich mit jedem Befehl sofort; startup-config liegt im NVRAM und wird beim Booten geladen. Mit copy running-config startup-config werden Änderungen dauerhaft.', 'running-config is in RAM, active and changes immediately with every command; startup-config is in NVRAM and loaded at boot. copy running-config startup-config makes changes permanent.']],
    [['چطور SSH را روی یک سوئیچ فعال می‌کنی؟', 'Wie aktivierst du SSH auf einem Switch?', 'How do you enable SSH on a switch?'],
     ['hostname و ip domain-name، crypto key generate rsa با ۲۰۴۸ بیت، ip ssh version 2، username با secret، و روی line vty فرمان‌های login local و transport input ssh. برای دسترسی از شبکهٔ دیگر SVI و ip default-gateway هم لازم است.', 'hostname und ip domain-name, crypto key generate rsa mit 2048 Bit, ip ssh version 2, username mit secret und auf line vty login local und transport input ssh. Für Zugriff aus anderen Netzen braucht der Switch zusätzlich SVI und ip default-gateway.', 'hostname and ip domain-name, crypto key generate rsa with 2048 bits, ip ssh version 2, a username with secret, and on line vty login local and transport input ssh. For access from other subnets the switch also needs an SVI and ip default-gateway.']],
    [['در show ip interface brief وضعیت administratively down و down یعنی چه؟', 'Was bedeuten administratively down und down in show ip interface brief?', 'What do administratively down and down mean in show ip interface brief?'],
     ['administratively down یعنی اینترفیس با shutdown خاموش است و no shutdown لازم دارد. down/down یعنی لایهٔ فیزیکی برقرار نیست: کابل، پورت مقابل یا خود طرف دیگر.', 'administratively down heißt: Die Schnittstelle ist per shutdown abgeschaltet und braucht no shutdown. down/down heißt: Keine physische Verbindung – Kabel, Gegenport oder Gegenstelle prüfen.', 'administratively down means the interface is shut down and needs no shutdown. down/down means no physical link – check the cable, the far-end port or the peer device.']]
  ],
  sources: [
    ['Cisco Networking Academy – Cisco Packet Tracer', 'https://www.netacad.com/cisco-packet-tracer'],
    ['Cisco Learning Network – CCNA exam topics', 'https://learningnetwork.cisco.com/s/ccna-exam-topics'],
    ['RFC 4253 – The Secure Shell (SSH) Transport Layer Protocol', 'https://www.rfc-editor.org/rfc/rfc4253']
  ]
},

{
  id: 'ccna-vlan', part: 1,
  title: ['VLAN، Trunk با 802.1Q و مسیریابی بین VLANها', 'VLANs, Trunks mit 802.1Q und Inter-VLAN-Routing', 'VLANs, 802.1Q trunks and inter-VLAN routing'],
  goal: ['شبکهٔ یک دفتر را با VLANهای جدا برای کارمندان، فنی و مدیریت تقسیم کنی، Trunk امن بسازی و ترافیک بین VLANها را یک بار با Router-on-a-Stick و یک بار با سوئیچ لایهٔ ۳ مسیریابی کنی.', 'Du teilst ein Büronetz in getrennte VLANs für Büro, Technik und Management, baust einen sicheren Trunk und routest zwischen den VLANs einmal mit Router-on-a-Stick und einmal mit einem Layer-3-Switch.', 'You split an office network into separate VLANs for office, engineering and management, build a secure trunk and route between the VLANs once with router-on-a-stick and once with a Layer 3 switch.'],
  why: ['تقریباً همهٔ تیکت‌های «کامپیوتر یا پرینتر به شبکه وصل نمی‌شود» در شرکت‌ها به پورتی در VLAN اشتباه یا VLANی که روی Trunk مجاز نیست ختم می‌شود. کسی که VLAN را می‌فهمد این خطاها را در چند دقیقه پیدا می‌کند.', 'Ein großer Teil der Tickets „PC oder Drucker kommt nicht ins Netz“ endet bei einem Port im falschen VLAN oder einem VLAN, das auf dem Trunk nicht erlaubt ist. Wer VLANs versteht, findet solche Fehler in Minuten.', 'A large share of “PC or printer can’t get on the network” tickets ends at a port in the wrong VLAN or a VLAN not allowed on a trunk. Anyone who understands VLANs finds these faults in minutes.'],
  know: [
    ['هر VLAN یک دامنهٔ Broadcast و معمولاً یک زیرشبکهٔ IP جداست. دستگاه‌های دو VLAN بدون روتر یا سوئیچ لایهٔ ۳ با هم حرف نمی‌زنند. شماره‌ها از ۱ تا ۴۰۹۴ هستند؛ VLAN 1 پیش‌فرض است و بهتر است برای کاربران و مدیریت استفاده نشود.', 'Jedes VLAN ist eine eigene Broadcast-Domäne und meist ein eigenes IP-Subnetz. Geräte in zwei VLANs sprechen ohne Router oder Layer-3-Switch nicht miteinander. Gültig sind 1 bis 4094; VLAN 1 ist Standard und sollte weder für Benutzer noch für Management genutzt werden.', 'Each VLAN is its own broadcast domain and usually its own IP subnet. Devices in two VLANs cannot talk without a router or Layer 3 switch. Valid IDs are 1 to 4094; VLAN 1 is the default and should not be used for users or management.'],
    ['پورت Access فقط یک VLAN دارد و فریم بدون برچسب می‌فرستد (switchport mode access و switchport access vlan 10). برای تلفن IP یک Voice VLAN جدا روی همان پورت با switchport voice vlan اضافه می‌شود.', 'Ein Access-Port gehört zu genau einem VLAN und sendet ungetaggt (switchport mode access, switchport access vlan 10). Für IP-Telefone kommt am selben Port ein eigenes Voice-VLAN mit switchport voice vlan dazu.', 'An access port belongs to exactly one VLAN and sends untagged frames (switchport mode access, switchport access vlan 10). For IP phones a separate voice VLAN is added on the same port with switchport voice vlan.'],
    ['Trunk چند VLAN را روی یک لینک می‌برد و به هر فریم یک برچسب ۴ بایتی IEEE 802.1Q با شمارهٔ VLAN اضافه می‌کند. فقط Native VLAN بدون برچسب می‌رود؛ آن را روی یک VLAN بی‌استفاده (مثلاً 999) و در دو طرف یکسان بگذار و با switchport trunk allowed vlan فقط VLANهای لازم را مجاز کن.', 'Ein Trunk transportiert mehrere VLANs über einen Link und fügt jedem Frame ein 4-Byte-Tag nach IEEE 802.1Q mit der VLAN-ID hinzu. Nur das Native VLAN läuft ungetaggt; setze es auf ein unbenutztes VLAN (z. B. 999), auf beiden Seiten gleich, und erlaube mit switchport trunk allowed vlan nur benötigte VLANs.', 'A trunk carries several VLANs over one link and adds a 4-byte IEEE 802.1Q tag with the VLAN ID to each frame. Only the native VLAN is untagged; set it to an unused VLAN (e.g. 999), identical on both sides, and allow only the needed VLANs with switchport trunk allowed vlan.'],
    ['DTP پروتکل مذاکرهٔ Trunk مخصوص Cisco است. حالت‌های خودکار (dynamic auto/desirable) را کنار بگذار، Trunk را صریح با switchport mode trunk بساز و با switchport nonegotiate مذاکره را خاموش کن. روی بعضی مدل‌ها مثل 3560 قبل از آن switchport trunk encapsulation dot1q لازم است.', 'DTP ist Ciscos Trunk-Aushandlung. Verzichte auf die automatischen Modi (dynamic auto/desirable), setze Trunks explizit mit switchport mode trunk und schalte die Aushandlung mit switchport nonegotiate ab. Bei manchen Modellen wie dem 3560 ist vorher switchport trunk encapsulation dot1q nötig.', 'DTP is Cisco’s trunk negotiation. Avoid the automatic modes (dynamic auto/desirable), set trunks explicitly with switchport mode trunk and turn negotiation off with switchport nonegotiate. Some models such as the 3560 first need switchport trunk encapsulation dot1q.'],
    ['مسیریابی بین VLANها دو راه دارد: Router-on-a-Stick با یک لینک Trunk به روتر و یک ساب‌اینترفیس برای هر VLAN (encapsulation dot1Q 10)؛ ارزان اما همهٔ ترافیک از یک لینک می‌گذرد. یا سوئیچ لایهٔ ۳ با ip routing و یک SVI برای هر VLAN؛ سریع و استاندارد در شبکه‌های شرکتی.', 'Inter-VLAN-Routing geht auf zwei Wegen: Router-on-a-Stick mit einem Trunk zum Router und einer Subschnittstelle je VLAN (encapsulation dot1Q 10) – günstig, aber aller Verkehr läuft über einen Link. Oder Layer-3-Switch mit ip routing und einer SVI je VLAN – schnell und Standard im Firmennetz.', 'Inter-VLAN routing works two ways: router-on-a-stick with one trunk to the router and one subinterface per VLAN (encapsulation dot1Q 10) – cheap, but all traffic crosses one link. Or a Layer 3 switch with ip routing and one SVI per VLAN – fast and the standard in company networks.'],
    ['فرمان‌های بررسی: show vlan brief (کدام پورت در کدام VLAN)، show interfaces trunk (Trunkها، Native VLAN، VLANهای مجاز و فعال)، show interfaces fa0/5 switchport (حالت واقعی پورت) و روی روتر show ip interface brief برای ساب‌اینترفیس‌ها.', 'Prüfbefehle: show vlan brief (welcher Port in welchem VLAN), show interfaces trunk (Trunks, Native VLAN, erlaubte und aktive VLANs), show interfaces fa0/5 switchport (tatsächlicher Portmodus) und am Router show ip interface brief für die Subschnittstellen.', 'Verification: show vlan brief (which port in which VLAN), show interfaces trunk (trunks, native VLAN, allowed and active VLANs), show interfaces fa0/5 switchport (actual port mode) and on the router show ip interface brief for the subinterfaces.']
  ],
  lab: {
    vm: 'Packet Tracer: R1 (ISR4331), SW1 (2960-24TT), PC10, PC20', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['R1 G0/0/1 را به SW1 G0/1 وصل کن. PC10 را به Fa0/1 و PC20 را به Fa0/13 بزن. PC10: 192.168.10.10/24 با Gateway .1، PC20: 192.168.20.10/24 با Gateway .1.', 'روی SW1 چهار VLAN بساز: 10 دفتر، 20 فنی، 99 مدیریت و 999 به‌عنوان Native بی‌استفاده. پورت‌های Fa0/1 تا 12 را در VLAN 10 و 13 تا 23 را در VLAN 20 بگذار.', 'G0/1 را Trunk صریح با Native VLAN 999، فهرست VLANهای مجاز 10,20,99 و بدون DTP کن. SVI مدیریت را در VLAN 99 بساز و VLAN 1 را خاموش کن.', 'روی R1 برای هر VLAN یک ساب‌اینترفیس با برچسب dot1Q و آدرس .1 بساز.', 'از PC10 به PC20 و به 192.168.99.2 پینگ بزن و خروجی show vlan brief و show interfaces trunk را بررسی کن.'],
      ['R1 G0/0/1 mit SW1 G0/1 verbinden. PC10 an Fa0/1, PC20 an Fa0/13. PC10: 192.168.10.10/24 mit Gateway .1, PC20: 192.168.20.10/24 mit Gateway .1.', 'Auf SW1 vier VLANs anlegen: 10 Büro, 20 Technik, 99 Management, 999 als ungenutztes Native VLAN. Fa0/1 bis 12 in VLAN 10, Fa0/13 bis 23 in VLAN 20.', 'G0/1 als expliziten Trunk mit Native VLAN 999, erlaubten VLANs 10,20,99 und ohne DTP. Management-SVI in VLAN 99 anlegen, VLAN 1 abschalten.', 'Auf R1 je VLAN eine Subschnittstelle mit dot1Q-Tag und Adresse .1 anlegen.', 'Von PC10 zu PC20 und zu 192.168.99.2 pingen, show vlan brief und show interfaces trunk prüfen.'],
      ['Connect R1 G0/0/1 to SW1 G0/1. PC10 on Fa0/1, PC20 on Fa0/13. PC10: 192.168.10.10/24 with gateway .1, PC20: 192.168.20.10/24 with gateway .1.', 'On SW1 create four VLANs: 10 office, 20 engineering, 99 management, 999 as unused native VLAN. Fa0/1 to 12 into VLAN 10, Fa0/13 to 23 into VLAN 20.', 'Make G0/1 an explicit trunk with native VLAN 999, allowed VLANs 10,20,99 and no DTP. Create the management SVI in VLAN 99 and shut VLAN 1.', 'On R1 create one subinterface per VLAN with a dot1Q tag and address .1.', 'Ping from PC10 to PC20 and to 192.168.99.2, check show vlan brief and show interfaces trunk.']
    ],
    code: R`! ===== SW1 =====
configure terminal
vlan 10
 name BUERO
vlan 20
 name TECHNIK
vlan 99
 name MGMT
vlan 999
 name NATIVE-UNGENUTZT
 exit
interface range fa0/1 - 12
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
interface range fa0/13 - 23
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast
interface g0/1
 description Trunk zu R1
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,99
 switchport nonegotiate
interface vlan 1
 shutdown
interface vlan 99
 ip address 192.168.99.2 255.255.255.0
 no shutdown
 exit
ip default-gateway 192.168.99.1
end

! ===== R1: Router-on-a-Stick =====
configure terminal
interface g0/0/1
 no shutdown
interface g0/0/1.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
interface g0/0/1.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
interface g0/0/1.99
 encapsulation dot1Q 99
 ip address 192.168.99.1 255.255.255.0
end

! ===== Variante: Layer-3-Switch (3560/3650) statt R1 =====
! ip routing
! interface vlan 10
!  ip address 192.168.10.1 255.255.255.0
! interface vlan 20
!  ip address 192.168.20.1 255.255.255.0

! ===== Pruefen =====
show vlan brief
show interfaces trunk
show interfaces g0/1 switchport
show ip interface brief`,
    checks: [
      ['PC10 به PC20 پینگ می‌زند و tracert نشان می‌دهد ترافیک از 192.168.10.1 می‌گذرد.', 'show interfaces trunk فقط VLANهای 10,20,99 را مجاز و Native را 999 نشان می‌دهد.', 'show vlan brief پورت‌ها را درست در VLAN 10 و 20 نشان می‌دهد و VLAN 1 هیچ پورت کاربری ندارد.', 'سوئیچ از VLAN 20 روی 192.168.99.2 قابل دسترسی است (بعداً با ACL محدود می‌شود).'],
      ['PC10 pingt PC20, tracert zeigt den Weg über 192.168.10.1.', 'show interfaces trunk zeigt nur 10,20,99 als erlaubt und Native VLAN 999.', 'show vlan brief zeigt die Ports korrekt in VLAN 10 und 20, VLAN 1 hat keine Benutzerports.', 'Der Switch ist aus VLAN 20 unter 192.168.99.2 erreichbar (später per ACL eingeschränkt).'],
      ['PC10 pings PC20, tracert shows the path via 192.168.10.1.', 'show interfaces trunk shows only 10,20,99 allowed and native VLAN 999.', 'show vlan brief shows the ports correctly in VLAN 10 and 20, VLAN 1 has no user ports.', 'The switch is reachable from VLAN 20 at 192.168.99.2 (restricted by ACL later).']
    ]
  },
  trouble: [
    [['کامپیوتر IP درست دارد اما Gateway را پینگ نمی‌کند.', 'PC hat korrekte IP, erreicht aber das Gateway nicht.', 'PC has the correct IP but cannot reach the gateway.'],
     ['show vlan brief: پورت در VLAN درست است؟ show interfaces trunk: آن VLAN روی Trunk مجاز و فعال است؟ روی روتر برچسب dot1Q ساب‌اینترفیس با شمارهٔ VLAN یکی است و اینترفیس اصلی no shutdown دارد؟', 'show vlan brief: Ist der Port im richtigen VLAN? show interfaces trunk: Ist das VLAN auf dem Trunk erlaubt und aktiv? Am Router: Passt das dot1Q-Tag der Subschnittstelle zur VLAN-ID, hat die physische Schnittstelle no shutdown?', 'show vlan brief: is the port in the right VLAN? show interfaces trunk: is the VLAN allowed and active on the trunk? On the router: does the subinterface dot1Q tag match the VLAN ID, and is the physical interface no shutdown?']],
    [['پورت در VLAN است اما show vlan brief آن را نشان نمی‌دهد یا پورت inactive است.', 'Port wurde einem VLAN zugewiesen, erscheint aber nicht in show vlan brief oder ist inactive.', 'Port was assigned to a VLAN but does not appear in show vlan brief or is inactive.'],
     ['خود VLAN روی این سوئیچ ساخته نشده یا پاک شده است. با vlan 10 دوباره بساز؛ پورت خودکار فعال می‌شود. پاک کردن VLAN همهٔ پورت‌هایش را غیرفعال می‌کند.', 'Das VLAN existiert auf diesem Switch nicht oder wurde gelöscht. Mit vlan 10 neu anlegen, der Port wird automatisch aktiv. Ein gelöschtes VLAN legt alle seine Ports still.', 'The VLAN does not exist on this switch or was deleted. Recreate it with vlan 10 and the port becomes active automatically. Deleting a VLAN disables all its ports.']],
    [['پیام CDP-4-NATIVE_VLAN_MISMATCH در کنسول.', 'Meldung CDP-4-NATIVE_VLAN_MISMATCH auf der Konsole.', 'Message CDP-4-NATIVE_VLAN_MISMATCH on the console.'],
     ['Native VLAN در دو سر Trunk متفاوت است و ترافیک بدون برچسب در VLAN اشتباه می‌افتد. در هر دو طرف switchport trunk native vlan 999 را یکسان کن.', 'Das Native VLAN ist an beiden Trunk-Enden verschieden; ungetaggter Verkehr landet im falschen VLAN. Auf beiden Seiten switchport trunk native vlan 999 gleich setzen.', 'The native VLAN differs at the two trunk ends and untagged traffic lands in the wrong VLAN. Set switchport trunk native vlan 999 identically on both sides.']],
    [['Trunk بین دو سوئیچ بالا نمی‌آید.', 'Trunk zwischen zwei Switches kommt nicht hoch.', 'Trunk between two switches does not come up.'],
     ['show interfaces g0/1 switchport: یک طرف Access یا dynamic auto است و طرف دیگر nonegotiate؟ هر دو طرف را صریح Trunk کن. روی 3560 اول encapsulation dot1q لازم است، وگرنه فرمان mode trunk رد می‌شود.', 'show interfaces g0/1 switchport: Ist eine Seite Access oder dynamic auto und die andere nonegotiate? Beide Seiten explizit auf Trunk setzen. Beim 3560 zuerst encapsulation dot1q, sonst wird mode trunk abgelehnt.', 'show interfaces g0/1 switchport: is one side access or dynamic auto and the other nonegotiate? Set both sides explicitly to trunk. On a 3560 set encapsulation dot1q first, otherwise mode trunk is rejected.']]
  ],
  decide: [
    [['Router-on-a-Stick یا سوئیچ لایهٔ ۳؟', 'Router-on-a-Stick oder Layer-3-Switch?', 'Router-on-a-stick or Layer 3 switch?'],
     ['دفتر کوچک با ترافیک کم بین VLANها: Router-on-a-Stick یا فایروال کافی است. وقتی ترافیک داخلی زیاد است یا VLANهای زیادی داری: سوئیچ لایهٔ ۳ با SVI؛ روتر یا فایروال فقط برای خروج به اینترنت و WAN.', 'Kleines Büro mit wenig Verkehr zwischen VLANs: Router-on-a-Stick oder Firewall reicht. Viel interner Verkehr oder viele VLANs: Layer-3-Switch mit SVIs, Router oder Firewall nur für Internet und WAN.', 'Small office with little inter-VLAN traffic: router-on-a-stick or a firewall is enough. Heavy internal traffic or many VLANs: Layer 3 switch with SVIs, router or firewall only for internet and WAN.']],
    [['VLANها را بر اساس چه تقسیم کنی؟', 'Wonach VLANs aufteilen?', 'How should VLANs be divided?'],
     ['بر اساس نقش و نیاز امنیتی، نه ساختمان: کاربران، مهمان‌ها، تلفن، پرینتر، سرور، مدیریت و دستگاه‌های IoT. هر VLAN یک زیرشبکهٔ مستند با شماره‌گذاری قابل فهم (VLAN 20 = 192.168.20.0/24).', 'Nach Rolle und Schutzbedarf, nicht nach Gebäude: Benutzer, Gäste, Telefonie, Drucker, Server, Management, IoT. Jedes VLAN bekommt ein dokumentiertes Subnetz mit nachvollziehbarem Schema (VLAN 20 = 192.168.20.0/24).', 'By role and protection need, not building: users, guests, voice, printers, servers, management, IoT. Each VLAN gets a documented subnet with a clear scheme (VLAN 20 = 192.168.20.0/24).']]
  ],
  pitfalls: [
    ['استفاده از VLAN 1 برای مدیریت یا Native VLAN.', 'VLAN 1 für Management oder als Native VLAN nutzen.', 'Using VLAN 1 for management or as the native VLAN.'],
    ['اجازه دادن همهٔ VLANها روی Trunk به جای فهرست مشخص.', 'Alle VLANs auf dem Trunk erlauben statt einer festen Liste.', 'Allowing all VLANs on a trunk instead of a fixed list.'],
    ['switchport trunk allowed vlan 30 بدون کلمهٔ add؛ فهرست قبلی پاک می‌شود و همهٔ VLANهای دیگر قطع می‌شوند.', 'switchport trunk allowed vlan 30 ohne add eingeben – die bisherige Liste wird ersetzt und alle anderen VLANs fallen aus.', 'Typing switchport trunk allowed vlan 30 without add – the existing list is replaced and all other VLANs drop.']
  ],
  iv: [
    [['فرق پورت Access و Trunk چیست؟', 'Was ist der Unterschied zwischen Access- und Trunk-Port?', 'What is the difference between an access and a trunk port?'],
     ['Access یک VLAN دارد و فریم بدون برچسب می‌فرستد، برای کامپیوتر و پرینتر. Trunk چند VLAN را با برچسب 802.1Q بین سوئیچ‌ها، روتر، هایپروایزر یا Access Point می‌برد؛ فقط Native VLAN بدون برچسب است.', 'Access gehört zu einem VLAN und sendet ungetaggt – für PC und Drucker. Trunk trägt mehrere VLANs mit 802.1Q-Tag zwischen Switches, Router, Hypervisor oder Access Point; nur das Native VLAN ist ungetaggt.', 'Access belongs to one VLAN and sends untagged – for PCs and printers. A trunk carries several VLANs with 802.1Q tags between switches, routers, hypervisors or access points; only the native VLAN is untagged.']],
    [['VLAN جدید روی Trunk موجود چطور اضافه می‌شود؟', 'Wie fügst du ein neues VLAN zu einem bestehenden Trunk hinzu?', 'How do you add a new VLAN to an existing trunk?'],
     ['با switchport trunk allowed vlan add 30 روی هر دو طرف و ساختن VLAN روی همهٔ سوئیچ‌های مسیر. بدون add فهرست جایگزین می‌شود و قطعی ایجاد می‌کنی.', 'Mit switchport trunk allowed vlan add 30 auf beiden Seiten und das VLAN auf allen Switches im Pfad anlegen. Ohne add wird die Liste ersetzt und du verursachst einen Ausfall.', 'With switchport trunk allowed vlan add 30 on both sides, and create the VLAN on every switch in the path. Without add the list is replaced and you cause an outage.']],
    [['Native VLAN چیست و چرا آن را عوض می‌کنی؟', 'Was ist das Native VLAN und warum änderst du es?', 'What is the native VLAN and why change it?'],
     ['VLANی که روی Trunk بدون برچسب می‌رود. با گذاشتن آن روی یک VLAN بی‌استفاده، خطر VLAN Hopping با برچسب دوگانه و ورود اشتباه ترافیک به VLAN 1 کم می‌شود.', 'Das VLAN, das auf dem Trunk ungetaggt läuft. Setzt man es auf ein ungenutztes VLAN, sinkt das Risiko von VLAN Hopping per Double Tagging und von Verkehr, der versehentlich in VLAN 1 landet.', 'The VLAN carried untagged on the trunk. Moving it to an unused VLAN reduces the risk of VLAN hopping via double tagging and of traffic accidentally landing in VLAN 1.']]
  ],
  sources: [
    ['Cisco Networking Academy – Cisco Packet Tracer', 'https://www.netacad.com/cisco-packet-tracer'],
    ['Cisco – Configure InterVLAN Routing on Layer 3 Switches', 'https://www.cisco.com/c/en/us/support/docs/lan-switching/inter-vlan-routing/41860-howto-L3-intervlanrouting.html']
  ]
},

{
  id: 'ccna-stp', part: 1,
  title: ['Spanning Tree (RSTP)، PortFast، BPDU Guard و EtherChannel', 'Spanning Tree (RSTP), PortFast, BPDU Guard und EtherChannel', 'Spanning Tree (RSTP), PortFast, BPDU Guard and EtherChannel'],
  goal: ['شبکهٔ سوئیچ با مسیرهای اضافی بسازی بدون اینکه حلقه ایجاد شود: Root Bridge را خودت تعیین کنی، پورت‌های کاربر را سریع و امن کنی و دو لینک موازی را با LACP به یک لینک منطقی تبدیل کنی.', 'Du baust ein Switch-Netz mit redundanten Wegen ohne Schleifen: Du legst die Root Bridge selbst fest, machst Benutzerports schnell und sicher und bündelst zwei parallele Links per LACP zu einem logischen Link.', 'You build a switched network with redundant paths but no loops: choose the root bridge yourself, make user ports fast and safe and bundle two parallel links into one logical link with LACP.'],
  why: ['یک کابل که کاربر برای «سرعت بیشتر» بین دو پریز شبکه وصل می‌کند می‌تواند کل طبقه را با طوفان Broadcast از کار بیندازد. STP درست پیکربندی‌شده و BPDU Guard همین را جلوگیری می‌کنند. EtherChannel همزمان پهنای باند و افزونگی می‌دهد.', 'Ein Kabel, das ein Benutzer „für mehr Tempo“ zwischen zwei Netzwerkdosen steckt, kann mit einem Broadcast-Sturm ein ganzes Stockwerk lahmlegen. Richtig konfiguriertes STP und BPDU Guard verhindern genau das. EtherChannel bringt gleichzeitig Bandbreite und Redundanz.', 'One cable a user plugs between two wall ports “for more speed” can take down a whole floor with a broadcast storm. Correctly configured STP and BPDU Guard prevent exactly that. EtherChannel adds bandwidth and redundancy at the same time.'],
  know: [
    ['اترنت مکانیزم TTL ندارد؛ در یک حلقهٔ لایهٔ ۲ فریم‌های Broadcast بی‌پایان می‌چرخند، جدول MAC مدام عوض می‌شود (MAC flapping) و CPU سوئیچ‌ها پر می‌شود. STP با مسدود کردن پورت‌های اضافی یک درخت بدون حلقه می‌سازد و هنگام خرابی لینک، پورت مسدود را باز می‌کند.', 'Ethernet hat kein TTL: In einer Layer-2-Schleife kreisen Broadcasts endlos, die MAC-Tabelle springt ständig (MAC Flapping) und die Switch-CPUs laufen voll. STP blockiert redundante Ports, bildet einen schleifenfreien Baum und öffnet bei einem Linkausfall den blockierten Port.', 'Ethernet has no TTL: in a Layer 2 loop broadcasts circle forever, the MAC table keeps changing (MAC flapping) and switch CPUs max out. STP blocks redundant ports to form a loop-free tree and unblocks a port when a link fails.'],
    ['انتخاب Root Bridge: کمترین Bridge ID برنده است؛ یعنی کمترین Priority (پیش‌فرض 32768 به‌علاوهٔ شمارهٔ VLAN) و در تساوی کمترین MAC. اگر کاری نکنی، معمولاً قدیمی‌ترین سوئیچ با کمترین MAC Root می‌شود. Root را عمداً روی سوئیچ Core یا Distribution با spanning-tree vlan 10 root primary یا Priority 4096 بگذار.', 'Root-Bridge-Wahl: Die niedrigste Bridge-ID gewinnt – zuerst die Priorität (Standard 32768 plus VLAN-Nummer), bei Gleichstand die kleinste MAC. Ohne Eingriff wird oft der älteste Switch mit der kleinsten MAC Root. Lege die Root bewusst auf Core oder Distribution mit spanning-tree vlan 10 root primary oder Priorität 4096.', 'Root bridge election: the lowest bridge ID wins – first priority (default 32768 plus the VLAN number), then the lowest MAC on a tie. Left alone, the oldest switch with the lowest MAC often becomes root. Place the root deliberately on the core or distribution switch with spanning-tree vlan 10 root primary or priority 4096.'],
    ['نقش پورت‌ها در RSTP (IEEE 802.1w، روی Cisco با spanning-tree mode rapid-pvst): Root Port بهترین مسیر هر سوئیچ به Root، Designated Port پورت فرستنده در هر سگمنت و Alternate/Backup پورت مسدود آماده. RSTP به‌جای ۳۰ تا ۵۰ ثانیهٔ STP قدیمی در حد ثانیه همگرا می‌شود.', 'Portrollen bei RSTP (IEEE 802.1w, bei Cisco spanning-tree mode rapid-pvst): Root Port als bester Weg jedes Switches zur Root, Designated Port als sendender Port je Segment, Alternate/Backup als blockierter Reserveport. RSTP konvergiert in Sekunden statt 30 bis 50 Sekunden beim klassischen STP.', 'Port roles in RSTP (IEEE 802.1w, on Cisco spanning-tree mode rapid-pvst): the root port is each switch’s best path to the root, the designated port forwards on each segment, alternate/backup are blocked standby ports. RSTP converges in seconds instead of the 30 to 50 seconds of classic STP.'],
    ['PortFast پورت‌های انتهایی (کامپیوتر، پرینتر، تلفن) را فوراً به Forwarding می‌برد تا DHCP و ورود به دامنه زمان‌بر نشود. همیشه با BPDU Guard: اگر روی چنین پورتی BPDU برسد (یعنی کسی سوئیچ وصل کرده)، پورت err-disabled می‌شود. هرگز PortFast روی لینک بین سوئیچ‌ها نزن.', 'PortFast schaltet Endgeräteports (PC, Drucker, Telefon) sofort in Forwarding, damit DHCP und Domänenanmeldung nicht hängen. Immer zusammen mit BPDU Guard: Kommt dort ein BPDU an – jemand hat einen Switch angesteckt –, geht der Port in err-disabled. Nie PortFast auf Links zwischen Switches.', 'PortFast moves end-device ports (PC, printer, phone) straight to forwarding so DHCP and domain logon don’t stall. Always pair it with BPDU Guard: if a BPDU arrives there – someone plugged in a switch – the port goes err-disabled. Never use PortFast on links between switches.'],
    ['EtherChannel تا ۸ لینک فیزیکی هم‌سرعت را یک Port-Channel منطقی می‌کند؛ STP آن را یک لینک می‌بیند و هیچ‌کدام مسدود نمی‌شود. LACP استاندارد IEEE (حالت active/passive) را به حالت on بدون مذاکره ترجیح بده. سرعت، Duplex، حالت Trunk و VLANهای مجاز روی همهٔ عضوها باید یکسان باشد.', 'EtherChannel bündelt bis zu 8 gleich schnelle physische Links zu einem logischen Port-Channel; STP sieht einen Link und blockiert keinen. LACP nach IEEE (Modi active/passive) ist dem Modus on ohne Aushandlung vorzuziehen. Geschwindigkeit, Duplex, Trunk-Modus und erlaubte VLANs müssen auf allen Mitgliedern gleich sein.', 'EtherChannel bundles up to 8 equal-speed physical links into one logical port-channel; STP sees one link and blocks none. Prefer the IEEE standard LACP (active/passive modes) over mode on without negotiation. Speed, duplex, trunk mode and allowed VLANs must be identical on all members.'],
    ['EtherChannel ترافیک را بر اساس هش (مثلاً src-dst-ip) بین لینک‌ها پخش می‌کند؛ یک جریان همیشه روی یک لینک می‌ماند، پس یک انتقال فایل تنها از سرعت یک لینک بیشتر نمی‌شود. بررسی با show etherchannel summary: پرچم SU برای Port-Channel و P برای عضو فعال درست است.', 'EtherChannel verteilt Verkehr per Hash (z. B. src-dst-ip) auf die Links; ein einzelner Datenstrom bleibt immer auf einem Link, eine einzelne Dateiübertragung wird also nicht schneller als ein Link. Prüfen mit show etherchannel summary: SU beim Port-Channel und P bei aktiven Mitgliedern ist korrekt.', 'EtherChannel spreads traffic across links by hash (e.g. src-dst-ip); one flow always stays on one link, so a single file transfer never exceeds one link’s speed. Check with show etherchannel summary: SU on the port-channel and P on active members is correct.']
  ],
  lab: {
    vm: 'Packet Tracer: DSW1, DSW2 (3560-24PS), ASW1 (2960-24TT), PC1', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['DSW1 و DSW2 را با دو کابل (G0/1 و G0/2) به هم وصل کن. ASW1 G0/1 را به DSW1 Fa0/1 و ASW1 G0/2 را به DSW2 Fa0/1 بزن تا یک مثلث با حلقه ساخته شود. VLANهای 10,20,99 را روی هر سه بساز.', 'روی هر سه سوئیچ Rapid PVST+ را فعال کن. DSW1 را Root اصلی و DSW2 را Root پشتیبان برای همهٔ VLANها کن.', 'دو لینک بین DSW1 و DSW2 را با LACP به Port-Channel 1 تبدیل کن و آن را Trunk کن. لینک‌های ASW1 را هم Trunk کن.', 'روی ASW1 پورت‌های کاربر را Access در VLAN 10 با PortFast و BPDU Guard کن.', 'نتیجه را با show spanning-tree و show etherchannel summary بررسی کن. یک سوئیچ اضافی به پورت کاربر ASW1 وصل کن و err-disabled شدن پورت را ببین.'],
      ['DSW1 und DSW2 mit zwei Kabeln (G0/1 und G0/2) verbinden. ASW1 G0/1 an DSW1 Fa0/1, ASW1 G0/2 an DSW2 Fa0/1 – so entsteht ein Dreieck mit Schleife. VLANs 10,20,99 auf allen drei anlegen.', 'Auf allen drei Switches Rapid PVST+ aktivieren. DSW1 wird primäre, DSW2 sekundäre Root für alle VLANs.', 'Die zwei Links DSW1–DSW2 per LACP zu Port-Channel 1 bündeln und als Trunk konfigurieren. Die Links von ASW1 ebenfalls als Trunk.', 'Auf ASW1 Benutzerports als Access in VLAN 10 mit PortFast und BPDU Guard.', 'Mit show spanning-tree und show etherchannel summary prüfen. Einen zusätzlichen Switch an einen Benutzerport von ASW1 stecken und das err-disabled beobachten.'],
      ['Connect DSW1 and DSW2 with two cables (G0/1 and G0/2). ASW1 G0/1 to DSW1 Fa0/1, ASW1 G0/2 to DSW2 Fa0/1 – this forms a triangle with a loop. Create VLANs 10,20,99 on all three.', 'Enable Rapid PVST+ on all three switches. DSW1 becomes primary root, DSW2 secondary root for all VLANs.', 'Bundle the two DSW1–DSW2 links into port-channel 1 with LACP and make it a trunk. Make the ASW1 uplinks trunks too.', 'On ASW1 make user ports access in VLAN 10 with PortFast and BPDU Guard.', 'Check with show spanning-tree and show etherchannel summary. Plug an extra switch into an ASW1 user port and watch it go err-disabled.']
    ],
    code: R`! ===== Alle drei Switches =====
configure terminal
spanning-tree mode rapid-pvst
vlan 10
vlan 20
vlan 99
 exit

! ===== DSW1 (primaere Root) =====
spanning-tree vlan 10,20,99 root primary
interface range g0/1 - 2
 switchport trunk encapsulation dot1q
 switchport mode trunk
 channel-group 1 mode active
interface port-channel 1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,99
interface fa0/1
 description Uplink zu ASW1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,99
 spanning-tree guard root
end

! ===== DSW2 (sekundaere Root) =====
! wie DSW1, aber:
! spanning-tree vlan 10,20,99 root secondary

! ===== ASW1 (Access) =====
configure terminal
interface range g0/1 - 2
 switchport mode trunk
 switchport trunk allowed vlan 10,20,99
interface range fa0/1 - 24
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable
end

! ===== Pruefen =====
show spanning-tree vlan 10
show spanning-tree root
show etherchannel summary
show interfaces status err-disabled

! Port nach Ursachenbeseitigung wieder aktivieren
! interface fa0/5
!  shutdown
!  no shutdown`,
    checks: [
      ['show spanning-tree root برای VLANهای 10,20,99 روی DSW1 عبارت This bridge is the root را نشان می‌دهد.', 'show etherchannel summary روی Po1 پرچم SU و روی هر دو عضو P نشان می‌دهد.', 'روی ASW1 دقیقاً یکی از دو Uplink در حالت Alternate/Blocking است.', 'وصل کردن یک سوئیچ به پورت کاربر آن پورت را err-disabled می‌کند و بعد از برداشتن سوئیچ و shutdown/no shutdown دوباره کار می‌کند.'],
      ['show spanning-tree root zeigt für VLAN 10,20,99 auf DSW1 This bridge is the root.', 'show etherchannel summary zeigt Po1 mit SU und beide Mitglieder mit P.', 'Auf ASW1 ist genau einer der zwei Uplinks Alternate/Blocking.', 'Ein Switch am Benutzerport setzt den Port in err-disabled; nach Entfernen und shutdown/no shutdown läuft er wieder.'],
      ['show spanning-tree root shows This bridge is the root on DSW1 for VLANs 10,20,99.', 'show etherchannel summary shows Po1 with SU and both members with P.', 'On ASW1 exactly one of the two uplinks is alternate/blocking.', 'A switch on a user port puts the port into err-disabled; after removing it and shutdown/no shutdown it works again.']
    ]
  },
  trouble: [
    [['پورت کاربر ناگهان کار نمی‌کند و چراغ آن نارنجی یا خاموش است.', 'Benutzerport geht plötzlich nicht, LED orange oder aus.', 'User port suddenly stops working, LED amber or off.'],
     ['show interfaces status err-disabled و show logging علت را نشان می‌دهند، مثلاً bpduguard یا psecure-violation. اول علت (سوئیچ یا هاب کوچک کاربر) را بردار، بعد shutdown و no shutdown. فقط فعال کردن دوباره بدون حذف علت، خطا را تکرار می‌کند.', 'show interfaces status err-disabled und show logging zeigen die Ursache, z. B. bpduguard oder psecure-violation. Erst die Ursache (Mini-Switch oder Hub des Benutzers) entfernen, dann shutdown und no shutdown. Nur wieder einschalten wiederholt den Fehler.', 'show interfaces status err-disabled and show logging show the cause, e.g. bpduguard or psecure-violation. Remove the cause (the user’s small switch or hub) first, then shutdown and no shutdown. Re-enabling without removing the cause just repeats the error.']],
    [['کل شبکه کند است، چراغ همهٔ پورت‌ها بی‌وقفه چشمک می‌زند و لاگ پر از MAC flapping است.', 'Ganzes Netz extrem langsam, alle Port-LEDs blinken dauernd, Log voller MAC-Flapping-Meldungen.', 'Whole network extremely slow, all port LEDs blink constantly, log full of MAC flapping messages.'],
     ['حلقهٔ لایهٔ ۲ است. اگر STP خاموش شده یا روی دستگاه غیرمدیریتی کار نمی‌کند، لینک مشکوک را فیزیکی قطع کن، با show mac address-table و show interfaces counters پورتی که ترافیک غیرعادی دارد را پیدا کن و BPDU Guard و Storm Control را روی پورت‌های کاربر فعال کن.', 'Eine Layer-2-Schleife. Ist STP aus oder läuft über ein unverwaltetes Gerät, den verdächtigen Link physisch trennen, mit show mac address-table und show interfaces counters den Port mit auffälligem Verkehr finden und BPDU Guard sowie Storm Control auf Benutzerports aktivieren.', 'A Layer 2 loop. If STP is off or runs through an unmanaged device, physically pull the suspicious link, find the port with abnormal traffic via show mac address-table and show interfaces counters, and enable BPDU Guard and storm control on user ports.']],
    [['Port-Channel بالا نمی‌آید یا عضوها پرچم s (suspended) یا I دارند.', 'Port-Channel kommt nicht hoch oder Mitglieder zeigen s (suspended) oder I.', 'Port-channel does not come up or members show s (suspended) or I.'],
     ['تنظیمات عضوها یکسان نیست (سرعت، Duplex، Trunk، VLAN مجاز) یا یک طرف LACP و طرف دیگر on یا PAgP است. show etherchannel summary و show interfaces fa0/1 switchport را در دو طرف مقایسه کن، اختلاف را رفع کن و channel-group را دوباره بزن.', 'Die Mitglieder sind nicht gleich konfiguriert (Speed, Duplex, Trunk, erlaubte VLANs) oder eine Seite nutzt LACP, die andere on bzw. PAgP. show etherchannel summary und show interfaces fa0/1 switchport auf beiden Seiten vergleichen, Unterschiede beheben, channel-group neu setzen.', 'Members are not configured identically (speed, duplex, trunk, allowed VLANs) or one side uses LACP and the other on or PAgP. Compare show etherchannel summary and show interfaces fa0/1 switchport on both sides, fix the differences and reapply channel-group.']],
    [['کامپیوترها بعد از روشن شدن تا ۳۰ ثانیه آدرس DHCP نمی‌گیرند.', 'PCs bekommen nach dem Einschalten bis zu 30 Sekunden keine DHCP-Adresse.', 'PCs get no DHCP address for up to 30 seconds after power-on.'],
     ['پورت بدون PortFast از مراحل Listening/Learning می‌گذرد. روی پورت‌های انتهایی spanning-tree portfast به همراه BPDU Guard بزن یا سراسری spanning-tree portfast default.', 'Ohne PortFast durchläuft der Port Listening/Learning. Auf Endgeräteports spanning-tree portfast mit BPDU Guard setzen oder global spanning-tree portfast default.', 'Without PortFast the port passes through listening/learning. Set spanning-tree portfast with BPDU Guard on edge ports or globally spanning-tree portfast default.']]
  ],
  decide: [
    [['LACP، PAgP یا حالت on؟', 'LACP, PAgP oder Modus on?', 'LACP, PAgP or mode on?'],
     ['LACP: استاندارد، با سرور، فایروال و سوئیچ‌های دیگر سازندگان هم کار می‌کند و لینک خراب را تشخیص می‌دهد. PAgP فقط Cisco است. on هیچ مذاکره‌ای ندارد و با خطای کابل‌کشی حلقه می‌سازد؛ فقط وقتی طرف مقابل LACP پشتیبانی نمی‌کند.', 'LACP: Standard, funktioniert mit Servern, Firewalls und anderen Herstellern und erkennt fehlerhafte Links. PAgP ist nur Cisco. on verhandelt nichts und erzeugt bei Fehlverkabelung Schleifen – nur, wenn die Gegenseite kein LACP kann.', 'LACP: standard, works with servers, firewalls and other vendors and detects faulty links. PAgP is Cisco-only. on negotiates nothing and creates loops on miscabling – only when the far end can’t do LACP.']],
    [['Root Bridge کجا باشد؟', 'Wo soll die Root Bridge stehen?', 'Where should the root bridge be?'],
     ['روی سوئیچ مرکزی (Core یا Distribution) که بیشترین ترافیک از آن می‌گذرد، با یک Root پشتیبان روی سوئیچ مرکزی دوم. اگر Gateway VLAN روی سوئیچ لایهٔ ۳ است، Root همان VLAN را همان‌جا بگذار تا مسیر کوتاه بماند.', 'Auf dem zentralen Switch (Core oder Distribution), über den der meiste Verkehr läuft, mit sekundärer Root auf dem zweiten zentralen Switch. Liegt das VLAN-Gateway auf einem Layer-3-Switch, gehört die Root dieses VLANs dorthin, damit der Weg kurz bleibt.', 'On the central switch (core or distribution) carrying most traffic, with a secondary root on the second central switch. If the VLAN gateway is on a Layer 3 switch, put that VLAN’s root there too so the path stays short.']]
  ],
  pitfalls: [
    ['خاموش کردن STP «چون شبکه کند بود».', 'STP abschalten, „weil das Netz langsam war“.', 'Turning STP off “because the network was slow”.'],
    ['PortFast بدون BPDU Guard یا PortFast روی Uplink.', 'PortFast ohne BPDU Guard oder auf einem Uplink.', 'PortFast without BPDU Guard or on an uplink.'],
    ['تغییر تنظیمات Trunk روی یک عضو Port-Channel به جای خود اینترفیس Port-Channel.', 'Trunk-Einstellungen an einem einzelnen Mitglied statt am Port-Channel-Interface ändern.', 'Changing trunk settings on a single member instead of on the port-channel interface.']
  ],
  iv: [
    [['چرا شبکهٔ لایهٔ ۲ به STP نیاز دارد؟', 'Warum braucht ein Layer-2-Netz STP?', 'Why does a Layer 2 network need STP?'],
     ['اترنت TTL ندارد. با مسیر اضافی، Broadcastها بی‌پایان می‌چرخند و طوفان Broadcast و ناپایداری جدول MAC ایجاد می‌شود. STP پورت‌های اضافی را مسدود می‌کند و هنگام خرابی دوباره باز می‌کند.', 'Ethernet hat kein TTL. Bei redundanten Wegen kreisen Broadcasts endlos, es entstehen Broadcast-Stürme und instabile MAC-Tabellen. STP blockiert redundante Ports und öffnet sie bei Ausfall wieder.', 'Ethernet has no TTL. With redundant paths broadcasts circle forever, causing broadcast storms and unstable MAC tables. STP blocks redundant ports and reopens them on failure.']],
    [['BPDU Guard چه می‌کند؟', 'Was macht BPDU Guard?', 'What does BPDU Guard do?'],
     ['اگر روی پورت PortFast یک BPDU دریافت شود، پورت را err-disabled می‌کند. این جلوی وصل شدن سوئیچ ناشناس و ایجاد حلقه یا تغییر Root را می‌گیرد.', 'Empfängt ein PortFast-Port ein BPDU, setzt BPDU Guard ihn in err-disabled. Das verhindert fremde Switches, Schleifen und eine ungewollte Root-Änderung.', 'If a PortFast port receives a BPDU, BPDU Guard puts it into err-disabled. This stops rogue switches, loops and unwanted root changes.']],
    [['EtherChannel با دو لینک یک گیگابیتی، یک کپی فایل را به ۲ گیگابیت می‌رساند؟', 'Macht ein EtherChannel aus zwei 1-Gbit-Links eine einzelne Dateikopie 2 Gbit/s schnell?', 'Does an EtherChannel of two 1 Gbit links make a single file copy run at 2 Gbit/s?'],
     ['نه. توزیع بر اساس هش جریان است و یک جریان روی یک لینک می‌ماند. مزیت در مجموع ترافیک چند کاربر و در افزونگی است.', 'Nein. Die Verteilung erfolgt per Hash pro Datenstrom, ein Strom bleibt auf einem Link. Der Vorteil liegt im Gesamtverkehr vieler Benutzer und in der Redundanz.', 'No. Distribution is per-flow hash and one flow stays on one link. The benefit is aggregate traffic from many users and redundancy.']]
  ],
  sources: [
    ['Cisco – Understand Rapid Spanning Tree Protocol (802.1w)', 'https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html']
  ]
}

);
})();
