/* Arefi ITPraxis – Kurs Cisco-Netzwerke (CCNA-Niveau), Teil 3 (Sicherheit, IPv6 und WLAN, Fehlersuche und Automatisierung). Eigene Inhalte, keine Cisco-Unterlagen. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKCcna = window.ArefiKCcna || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'ccna-sec', part: 3,
  title: ['امنیت شبکه: ACL، Port Security، DHCP Snooping و Dynamic ARP Inspection', 'Netzwerksicherheit: ACLs, Port Security, DHCP Snooping und Dynamic ARP Inspection', 'Network security: ACLs, port security, DHCP snooping and dynamic ARP inspection'],
  goal: ['دسترسی بین VLANها و به مدیریت را با ACL محدود کنی، پورت‌های کاربر را با Port Security ببندی، سرورهای DHCP جعلی را با DHCP Snooping و جعل ARP را با DAI متوقف کنی و نتیجه را با شمارنده‌ها ثابت کنی.', 'Du beschränkst Zugriffe zwischen VLANs und aufs Management per ACL, sicherst Benutzerports mit Port Security, stoppst falsche DHCP-Server mit DHCP Snooping und ARP-Spoofing mit DAI und belegst das Ergebnis mit Zählern.', 'You restrict access between VLANs and to management with ACLs, lock user ports with port security, stop rogue DHCP servers with DHCP snooping and ARP spoofing with DAI, and prove the result with counters.'],
  why: ['بیشتر حمله‌های داخلی از یک پورت شبکهٔ آزاد شروع می‌شوند: روتر خانگی که DHCP می‌دهد، لپ‌تاپ مهاجم با جعل ARP یا دسترسی کاربر عادی به صفحهٔ مدیریت سوئیچ. این ابزارها روی هر سوئیچ Cisco هست و در ممیزی‌های امنیتی (مثلاً ISO 27001) پرسیده می‌شوند.', 'Viele interne Angriffe beginnen an einer offenen Netzwerkdose: ein Heimrouter, der DHCP verteilt, ein Angreifer-Notebook mit ARP-Spoofing oder ein normaler Benutzer auf der Management-Oberfläche eines Switches. Diese Werkzeuge hat jeder Cisco-Switch, und Sicherheitsaudits (z. B. ISO 27001) fragen danach.', 'Many internal attacks start at an open wall port: a home router handing out DHCP, an attacker laptop doing ARP spoofing or a normal user on a switch’s management page. Every Cisco switch has these tools, and security audits (e.g. ISO 27001) ask about them.'],
  know: [
    ['ACL فهرست قوانین permit و deny است که از بالا به پایین بررسی می‌شود؛ اولین تطابق برنده است و در انتها یک deny any پنهان وجود دارد. پس قانون‌های خاص بالا، کلی پایین، و حداقل یک permit لازم است. هر اینترفیس در هر جهت فقط یک ACL برای IPv4 دارد.', 'Eine ACL ist eine Liste aus permit- und deny-Regeln, die von oben nach unten geprüft wird; der erste Treffer gewinnt, und am Ende steht ein unsichtbares deny any. Spezielle Regeln also oben, allgemeine unten, und mindestens ein permit. Pro Schnittstelle und Richtung gibt es genau eine IPv4-ACL.', 'An ACL is a list of permit and deny rules checked top to bottom; the first match wins and an invisible deny any sits at the end. So specific rules go on top, general ones at the bottom, and at least one permit is needed. Each interface has exactly one IPv4 ACL per direction.'],
    ['ACL استاندارد (1 تا 99 یا نام‌دار) فقط آدرس مبدأ را می‌بیند و نزدیک مقصد گذاشته می‌شود. ACL توسعه‌یافته (100 تا 199 یا نام‌دار) مبدأ، مقصد، پروتکل و پورت را می‌بیند و نزدیک مبدأ گذاشته می‌شود تا ترافیک ناخواسته زود حذف شود. ACL نام‌دار با شمارهٔ خط ویرایش می‌شود و در کار روزانه بهتر است.', 'Standard-ACLs (1 bis 99 oder benannt) sehen nur die Quelladresse und gehören nah ans Ziel. Erweiterte ACLs (100 bis 199 oder benannt) sehen Quelle, Ziel, Protokoll und Port und gehören nah an die Quelle, damit unerwünschter Verkehr früh verworfen wird. Benannte ACLs lassen sich per Zeilennummer bearbeiten und sind im Alltag besser.', 'Standard ACLs (1 to 99 or named) only see the source address and go close to the destination. Extended ACLs (100 to 199 or named) see source, destination, protocol and port and go close to the source so unwanted traffic is dropped early. Named ACLs can be edited by sequence number and are better day to day.'],
    ['Wildcard برعکس ماسک است: 0 یعنی بیت باید مطابق باشد، 1 یعنی مهم نیست. 0.0.0.255 یک /24 است، host 10.1.1.5 همان 10.1.1.5 0.0.0.0 و any همان 0.0.0.0 255.255.255.255. برای محدود کردن SSH به دستگاه، ACL را با access-class روی line vty بگذار نه روی اینترفیس.', 'Die Wildcard ist die umgekehrte Maske: 0 heißt Bit muss passen, 1 heißt egal. 0.0.0.255 ist ein /24, host 10.1.1.5 entspricht 10.1.1.5 0.0.0.0, any entspricht 0.0.0.0 255.255.255.255. Um SSH auf das Gerät zu beschränken, die ACL per access-class auf line vty legen, nicht auf eine Schnittstelle.', 'A wildcard is the inverted mask: 0 means the bit must match, 1 means don’t care. 0.0.0.255 is a /24, host 10.1.1.5 equals 10.1.1.5 0.0.0.0, any equals 0.0.0.0 255.255.255.255. To restrict SSH to the device, apply the ACL with access-class on line vty, not on an interface.'],
    ['Port Security تعداد MACهای مجاز روی یک پورت Access را محدود می‌کند: switchport port-security، maximum 2 (کامپیوتر و تلفن)، mac-address sticky برای یادگیری و ذخیره، و violation shutdown (پیش‌فرض، err-disabled)، restrict (حذف و لاگ) یا protect (فقط حذف). بررسی با show port-security interface.', 'Port Security begrenzt die erlaubten MAC-Adressen an einem Access-Port: switchport port-security, maximum 2 (PC und Telefon), mac-address sticky zum Lernen und Speichern, violation shutdown (Standard, err-disabled), restrict (verwerfen und loggen) oder protect (nur verwerfen). Prüfen mit show port-security interface.', 'Port security limits the allowed MAC addresses on an access port: switchport port-security, maximum 2 (PC and phone), mac-address sticky to learn and save, and violation shutdown (default, err-disabled), restrict (drop and log) or protect (drop only). Verify with show port-security interface.'],
    ['DHCP Snooping فقط از پورت‌های trust (Uplink به سمت سرور DHCP یا Gateway) پیام‌های Offer و Ack را می‌پذیرد و بقیه را حذف می‌کند؛ روتر خانگی کاربر دیگر آدرس نمی‌دهد. همزمان یک جدول Binding از IP، MAC، VLAN و پورت می‌سازد. وقتی Relay روی روتر است، معمولاً no ip dhcp snooping information option لازم است تا Option 82 درخواست‌ها را خراب نکند.', 'DHCP Snooping akzeptiert Offer und Ack nur von trust-Ports (Uplink Richtung DHCP-Server oder Gateway) und verwirft den Rest – der Heimrouter des Benutzers verteilt keine Adressen mehr. Nebenbei entsteht eine Binding-Tabelle aus IP, MAC, VLAN und Port. Läuft das Relay auf einem Router, ist meist no ip dhcp snooping information option nötig, damit Option 82 die Anfragen nicht verdirbt.', 'DHCP snooping only accepts Offer and Ack from trusted ports (uplink toward the DHCP server or gateway) and drops the rest – the user’s home router can no longer hand out addresses. It also builds a binding table of IP, MAC, VLAN and port. When the relay runs on a router, no ip dhcp snooping information option is usually needed so option 82 doesn’t break the requests.'],
    ['Dynamic ARP Inspection پاسخ‌های ARP را با جدول DHCP Snooping مقایسه می‌کند و ARP جعلی (Man-in-the-Middle) را حذف می‌کند: ip arp inspection vlan 10,20 و trust روی Uplink. دستگاه‌های با IP ثابت (پرینتر، سرور) در جدول نیستند و به ARP ACL یا Binding دستی نیاز دارند. پورت‌های بی‌استفاده را shutdown کن و در یک VLAN بی‌استفاده بگذار.', 'Dynamic ARP Inspection vergleicht ARP-Antworten mit der DHCP-Snooping-Tabelle und verwirft gefälschte ARP-Pakete (Man-in-the-Middle): ip arp inspection vlan 10,20 und trust auf dem Uplink. Geräte mit fester IP (Drucker, Server) stehen nicht in der Tabelle und brauchen eine ARP-ACL oder manuelle Bindings. Unbenutzte Ports per shutdown abschalten und in ein ungenutztes VLAN legen.', 'Dynamic ARP inspection checks ARP replies against the DHCP snooping table and drops forged ARP (man-in-the-middle): ip arp inspection vlan 10,20 and trust on the uplink. Devices with static IPs (printers, servers) are not in the table and need an ARP ACL or manual bindings. Shut unused ports and put them in an unused VLAN.']
  ],
  lab: {
    vm: 'Packet Tracer: Topologie aus ccna-vlan und ccna-svc (R1, SW1, PC10, PC20, SRV1), zusätzlich ein Admin-PC 192.168.99.50', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['یک ACL توسعه‌یافته به نام VLAN20-IN روی R1 بساز: VLAN 20 به شبکهٔ مدیریت 99 دسترسی ندارد، به SRV1 فقط DNS و HTTPS و به اینترنت آزاد است. آن را ورودی روی G0/0/1.20 بگذار.', 'یک ACL استاندارد MGMT-SSH بساز که فقط Admin-PC را مجاز می‌کند و با access-class روی line vty سوئیچ و روتر بگذار.', 'روی پورت‌های کاربر SW1 Port Security با حداکثر ۲ MAC، sticky و violation restrict فعال کن. بعد یک PC دیگر را از طریق هاب به همان پورت وصل کن و شمارندهٔ نقض را ببین.', 'DHCP Snooping را برای VLANهای 10 و 20 روشن کن و Uplink G0/1 را trust کن. یک Server-PT دوم با DHCP در VLAN 10 بگذار و ببین کلاینت‌ها از آن آدرس نمی‌گیرند.', 'اگر نسخهٔ Packet Tracer تو پشتیبانی می‌کند، DAI را برای VLAN 10 فعال کن. در پایان شمارنده‌های show access-lists و show port-security را مستند کن.'],
      ['Auf R1 eine erweiterte ACL VLAN20-IN anlegen: VLAN 20 darf nicht ins Management-Netz 99, zu SRV1 nur DNS und HTTPS, ins Internet frei. Eingehend an G0/0/1.20 anwenden.', 'Eine Standard-ACL MGMT-SSH anlegen, die nur den Admin-PC erlaubt, und per access-class auf line vty von Switch und Router legen.', 'Auf den Benutzerports von SW1 Port Security mit maximal 2 MACs, sticky und violation restrict aktivieren. Dann über einen Hub einen weiteren PC an denselben Port hängen und den Verletzungszähler beobachten.', 'DHCP Snooping für VLAN 10 und 20 aktivieren, Uplink G0/1 als trust. Einen zweiten Server-PT mit DHCP in VLAN 10 stellen und sehen, dass Clients von ihm keine Adresse bekommen.', 'Wenn deine Packet-Tracer-Version es unterstützt, DAI für VLAN 10 aktivieren. Zum Schluss die Zähler aus show access-lists und show port-security dokumentieren.'],
      ['On R1 create an extended ACL VLAN20-IN: VLAN 20 may not reach management network 99, may reach SRV1 only for DNS and HTTPS, and the internet freely. Apply it inbound on G0/0/1.20.', 'Create a standard ACL MGMT-SSH that permits only the admin PC and apply it with access-class on line vty of the switch and router.', 'On the SW1 user ports enable port security with at most 2 MACs, sticky and violation restrict. Then attach another PC to the same port through a hub and watch the violation counter.', 'Enable DHCP snooping for VLANs 10 and 20 and trust uplink G0/1. Add a second Server-PT with DHCP in VLAN 10 and see that clients get no address from it.', 'If your Packet Tracer version supports it, enable DAI for VLAN 10. Finally document the counters from show access-lists and show port-security.']
    ],
    code: R`! ===== R1: erweiterte ACL fuer VLAN 20 =====
configure terminal
ip access-list extended VLAN20-IN
 remark Technik darf nicht ins Management-Netz
 10 deny ip 192.168.20.0 0.0.0.255 192.168.99.0 0.0.0.255
 remark Zum Server nur DNS und HTTPS
 20 permit udp 192.168.20.0 0.0.0.255 host 192.168.10.10 eq domain
 30 permit tcp 192.168.20.0 0.0.0.255 host 192.168.10.10 eq 443
 40 deny ip 192.168.20.0 0.0.0.255 host 192.168.10.10
 remark DHCP-Relay braucht Broadcasts an den Router
 50 permit udp any any eq bootps
 60 permit ip 192.168.20.0 0.0.0.255 any
 exit
interface g0/0/1.20
 ip access-group VLAN20-IN in
 exit

! ===== R1 und SW1: SSH nur vom Admin-PC =====
ip access-list standard MGMT-SSH
 permit host 192.168.99.50
 exit
line vty 0 15
 access-class MGMT-SSH in
 exit
end

! ===== SW1: Port Security, DHCP Snooping, DAI =====
configure terminal
interface range fa0/1 - 23
 switchport port-security
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 exit
ip dhcp snooping
ip dhcp snooping vlan 10,20
no ip dhcp snooping information option
interface g0/1
 ip dhcp snooping trust
 ip arp inspection trust
 exit
ip arp inspection vlan 10
interface fa0/24
 description ungenutzt
 switchport mode access
 switchport access vlan 999
 shutdown
end

! ===== Pruefen =====
show access-lists
show ip interface g0/0/1.20 | include access list
show port-security
show port-security interface fa0/1
show ip dhcp snooping
show ip dhcp snooping binding
show ip arp inspection vlan 10`,
    checks: [
      ['PC20 به 192.168.99.2 دسترسی ندارد، اما به اینترنت و به وب SRV1 دسترسی دارد و هنوز آدرس DHCP می‌گیرد.', 'شمارنده‌های show access-lists برای خط deny افزایش می‌یابد.', 'SSH از Admin-PC کار می‌کند و از PC10 رد می‌شود.', 'سرور DHCP جعلی هیچ آدرسی نمی‌دهد و show ip dhcp snooping binding کلاینت‌های واقعی را نشان می‌دهد.'],
      ['PC20 erreicht 192.168.99.2 nicht, aber das Internet und die Webseite von SRV1, und bekommt weiter eine DHCP-Adresse.', 'Die Zähler in show access-lists steigen für die deny-Zeile.', 'SSH vom Admin-PC klappt, von PC10 wird es abgewiesen.', 'Der falsche DHCP-Server vergibt keine Adresse, show ip dhcp snooping binding zeigt die echten Clients.'],
      ['PC20 cannot reach 192.168.99.2 but reaches the internet and the SRV1 website and still gets a DHCP address.', 'The counters in show access-lists increase for the deny line.', 'SSH from the admin PC works and is refused from PC10.', 'The rogue DHCP server hands out no address and show ip dhcp snooping binding lists the real clients.']
    ]
  },
  trouble: [
    [['بعد از گذاشتن ACL، کل VLAN قطع است.', 'Nach dem Anwenden der ACL ist das ganze VLAN tot.', 'After applying the ACL the whole VLAN is dead.'],
     ['deny any پنهان در انتها همه‌چیز را حذف می‌کند: permit پایانی فراموش شده یا ACL در جهت اشتباه (out به جای in) گذاشته شده. show access-lists شمارنده‌ها را نشان می‌دهد. در شبکهٔ واقعی تغییر ACL را با reload in 10 به‌عنوان نجات انجام بده و بعد reload cancel.', 'Das unsichtbare deny any am Ende verwirft alles: Das abschließende permit fehlt oder die ACL hängt in der falschen Richtung (out statt in). show access-lists zeigt die Zähler. Im echten Netz ACL-Änderungen mit reload in 10 als Rettungsanker machen und danach reload cancel.', 'The invisible deny any at the end drops everything: the final permit is missing or the ACL is applied in the wrong direction (out instead of in). show access-lists shows the counters. In a real network make ACL changes with reload in 10 as a safety net, then reload cancel.']],
    [['کلاینت‌های VLAN 20 بعد از ACL دیگر آدرس DHCP نمی‌گیرند.', 'Clients in VLAN 20 bekommen nach der ACL keine DHCP-Adresse mehr.', 'Clients in VLAN 20 no longer get a DHCP address after the ACL.'],
     ['درخواست اول DHCP از 0.0.0.0 به 255.255.255.255 است و با قانون permit ip 192.168.20.0 … مطابق نیست. یک خط permit udp any any eq bootps بالاتر اضافه کن.', 'Die erste DHCP-Anfrage geht von 0.0.0.0 an 255.255.255.255 und passt nicht zu permit ip 192.168.20.0 …. Eine Zeile permit udp any any eq bootps weiter oben ergänzen.', 'The first DHCP request goes from 0.0.0.0 to 255.255.255.255 and doesn’t match permit ip 192.168.20.0 …. Add a line permit udp any any eq bootps higher up.']],
    [['بعد از فعال کردن DHCP Snooping هیچ کلاینتی آدرس نمی‌گیرد.', 'Nach Aktivieren von DHCP Snooping bekommt kein Client mehr eine Adresse.', 'After enabling DHCP snooping no client gets an address.'],
     ['Uplink به سمت Gateway یا سرور trust نیست، یا سوئیچ Option 82 اضافه می‌کند و Relay روی روتر بسته را رد می‌کند. ip dhcp snooping trust روی Uplink و no ip dhcp snooping information option. با show ip dhcp snooping statistics حذف‌ها را ببین.', 'Der Uplink Richtung Gateway oder Server ist nicht trust, oder der Switch fügt Option 82 ein und das Relay auf dem Router verwirft das Paket. ip dhcp snooping trust auf dem Uplink und no ip dhcp snooping information option. Mit show ip dhcp snooping statistics die Verwürfe ansehen.', 'The uplink toward the gateway or server is not trusted, or the switch inserts option 82 and the relay on the router drops the packet. Set ip dhcp snooping trust on the uplink and no ip dhcp snooping information option. Look at drops with show ip dhcp snooping statistics.']],
    [['بعد از فعال کردن DAI، پرینتر با IP ثابت دیگر قابل دسترسی نیست.', 'Nach Aktivieren von DAI ist der Drucker mit fester IP nicht mehr erreichbar.', 'After enabling DAI the printer with a static IP is no longer reachable.'],
     ['دستگاه IP ثابت در جدول Snooping نیست و ARP آن حذف می‌شود. یک ARP ACL با arp access-list و ip arp inspection filter بساز یا پرینتر را با رزرو DHCP آدرس‌دهی کن.', 'Geräte mit fester IP stehen nicht in der Snooping-Tabelle, ihr ARP wird verworfen. Eine ARP-ACL mit arp access-list und ip arp inspection filter anlegen oder den Drucker per DHCP-Reservierung adressieren.', 'Static-IP devices are not in the snooping table and their ARP is dropped. Create an ARP ACL with arp access-list and ip arp inspection filter, or address the printer with a DHCP reservation.']]
  ],
  decide: [
    [['ACL روی روتر یا فایروال؟', 'ACL auf dem Router oder Firewall?', 'ACL on the router or a firewall?'],
     ['ACL بدون حالت است و پاسخ‌ها را هم باید در نظر بگیری؛ برای جداسازی ساده بین VLANها و محافظت از مدیریت خوب است. برای اینترنت، مهمان‌ها و قوانین پیچیده با حالت، لاگ و شناسایی برنامه از فایروال استفاده کن.', 'ACLs sind zustandslos, Antwortverkehr musst du mitdenken; gut für einfache Trennung zwischen VLANs und Schutz des Managements. Für Internet, Gäste und komplexe Regeln mit Zustand, Protokollierung und Anwendungserkennung eine Firewall nutzen.', 'ACLs are stateless and you must account for return traffic; good for simple separation between VLANs and protecting management. For internet, guests and complex rules with state, logging and application awareness use a firewall.']],
    [['Port Security یا 802.1X؟', 'Port Security oder 802.1X?', 'Port security or 802.1X?'],
     ['Port Security ساده است اما MAC را می‌شود جعل کرد و جابه‌جایی دستگاه کار اضافی دارد. 802.1X با RADIUS (مثلاً NPS یا Cisco ISE) کاربر یا دستگاه را با گواهی احراز هویت می‌کند و VLAN را پویا می‌دهد؛ برای شرکت‌های بزرگ‌تر استاندارد است.', 'Port Security ist einfach, aber MACs lassen sich fälschen und Umzüge machen Arbeit. 802.1X mit RADIUS (z. B. NPS oder Cisco ISE) authentifiziert Benutzer oder Gerät per Zertifikat und weist VLANs dynamisch zu – Standard in größeren Firmen.', 'Port security is simple, but MACs can be spoofed and moves create work. 802.1X with RADIUS (e.g. NPS or Cisco ISE) authenticates users or devices with certificates and assigns VLANs dynamically – the standard in larger companies.']]
  ],
  pitfalls: [
    ['ویرایش ACL شماره‌دار با no access-list 100 و پاک شدن همهٔ خطوط.', 'Eine nummerierte ACL mit no access-list 100 bearbeiten und damit alle Zeilen löschen.', 'Editing a numbered ACL with no access-list 100 and deleting every line.'],
    ['اعمال ACL روی اینترفیس از راه دور بدون reload in به‌عنوان راه نجات.', 'Eine ACL aus der Ferne ohne reload in als Rettungsanker anwenden.', 'Applying an ACL remotely without reload in as a safety net.'],
    ['فعال کردن DHCP Snooping بدون trust روی Uplink.', 'DHCP Snooping ohne trust auf dem Uplink aktivieren.', 'Enabling DHCP snooping without trusting the uplink.']
  ],
  iv: [
    [['ACL استاندارد و توسعه‌یافته را کجا قرار می‌دهی و چرا؟', 'Wo platzierst du Standard- und erweiterte ACLs und warum?', 'Where do you place standard and extended ACLs and why?'],
     ['استاندارد نزدیک مقصد، چون فقط مبدأ را می‌شناسد و نزدیک مبدأ دسترسی‌های مجاز دیگر را هم می‌بندد. توسعه‌یافته نزدیک مبدأ، چون دقیق است و ترافیک ناخواسته زودتر حذف می‌شود.', 'Standard nah am Ziel, weil sie nur die Quelle kennt und nah an der Quelle auch erlaubte Zugriffe blockieren würde. Erweitert nah an der Quelle, weil sie genau ist und unerwünschter Verkehr früh verworfen wird.', 'Standard near the destination, because it only knows the source and near the source would also block allowed access. Extended near the source, because it is precise and unwanted traffic is dropped early.']],
    [['DHCP Snooping در برابر چه چیزی محافظت می‌کند؟', 'Wovor schützt DHCP Snooping?', 'What does DHCP snooping protect against?'],
     ['در برابر سرور DHCP جعلی یا اشتباهی که به کلاینت Gateway یا DNS نادرست می‌دهد، و حملهٔ گرسنگی DHCP. جدول Binding آن پایهٔ DAI و IP Source Guard است.', 'Vor falschen oder versehentlichen DHCP-Servern, die Clients ein falsches Gateway oder DNS geben, und vor DHCP Starvation. Seine Binding-Tabelle ist die Grundlage für DAI und IP Source Guard.', 'Against rogue or accidental DHCP servers giving clients a wrong gateway or DNS, and against DHCP starvation. Its binding table is the basis for DAI and IP Source Guard.']],
    [['پورت با Port Security err-disabled شده. چه می‌کنی؟', 'Ein Port ist durch Port Security err-disabled. Was tust du?', 'A port is err-disabled by port security. What do you do?'],
     ['با show port-security interface و لاگ می‌بینم کدام MAC نقض کرده و با کاربر علت را روشن می‌کنم (هاب، سوئیچ کوچک، دستگاه جدید). بعد MAC قدیمی sticky را در صورت نیاز پاک و پورت را با shutdown/no shutdown فعال می‌کنم.', 'Mit show port-security interface und Log sehe ich, welche MAC verletzt hat, und kläre die Ursache mit dem Benutzer (Hub, Mini-Switch, neues Gerät). Dann lösche ich bei Bedarf die alte sticky-MAC und aktiviere den Port mit shutdown/no shutdown.', 'With show port-security interface and the log I see which MAC violated and clarify the cause with the user (hub, small switch, new device). Then I clear the old sticky MAC if needed and re-enable the port with shutdown/no shutdown.']]
  ],
  sources: [
    ['Cisco – Configure Commonly Used IP ACLs', 'https://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html'],
    ['RFC 826 – An Ethernet Address Resolution Protocol', 'https://www.rfc-editor.org/rfc/rfc826']
  ]
},

{
  id: 'ccna-v6wlan', part: 3,
  title: ['IPv6 روی روتر Cisco و شبکهٔ بی‌سیم با WLC', 'IPv6 auf Cisco-Routern und WLAN mit Wireless LAN Controller', 'IPv6 on Cisco routers and wireless with a WLAN controller'],
  goal: ['کنار IPv4 شبکه را Dual-Stack کنی، SLAAC و مسیر ثابت IPv6 را راه بیندازی و یک شبکهٔ بی‌سیم شرکتی با Controller، چند SSID، VLAN جدا و WPA2/WPA3 بسازی.', 'Du machst das Netz neben IPv4 dual-stack-fähig, richtest SLAAC und statische IPv6-Routen ein und baust ein Firmen-WLAN mit Controller, mehreren SSIDs, getrennten VLANs und WPA2/WPA3.', 'You make the network dual-stack alongside IPv4, set up SLAAC and static IPv6 routes, and build a company WLAN with a controller, several SSIDs, separate VLANs and WPA2/WPA3.'],
  why: ['ارائه‌دهندگان اینترنت در آلمان و اتریش بیشتر و بیشتر IPv6 می‌دهند و Windows به‌طور پیش‌فرض IPv6 را ترجیح می‌دهد. بی‌سیم هم امروز شبکهٔ اصلی بیشتر کاربران است؛ تیکت‌های «Wi-Fi کند است» یا «مهمان به شبکهٔ داخلی دسترسی دارد» روزانه پیش می‌آیند.', 'Provider in Deutschland und Österreich liefern immer häufiger IPv6, und Windows bevorzugt IPv6 standardmäßig. WLAN ist heute für die meisten Benutzer das Hauptnetz; Tickets wie „WLAN ist langsam“ oder „Gäste sehen das interne Netz“ kommen täglich.', 'ISPs in Germany and Austria increasingly deliver IPv6, and Windows prefers IPv6 by default. Wireless is now the main network for most users; tickets like “Wi-Fi is slow” or “guests can see the internal network” come up daily.'],
  know: [
    ['آدرس IPv6 ۱۲۸ بیتی است و در ۸ گروه هگز نوشته می‌شود؛ صفرهای ابتدای گروه حذف و یک بار رشتهٔ صفرها با :: کوتاه می‌شود. LAN همیشه /64 است. انواع مهم: Global Unicast (2000::/3)، Link-Local (fe80::/10، روی هر اینترفیس خودکار)، Unique Local (fc00::/7) و Multicast (ff00::/8). IPv6 Broadcast ندارد. 2001:db8::/32 برای مستندات و آزمایشگاه است.', 'Eine IPv6-Adresse hat 128 Bit in 8 Hexgruppen; führende Nullen pro Gruppe entfallen, eine Nullfolge wird einmal mit :: gekürzt. LANs sind immer /64. Wichtige Typen: Global Unicast (2000::/3), Link-Local (fe80::/10, auf jeder Schnittstelle automatisch), Unique Local (fc00::/7) und Multicast (ff00::/8). IPv6 kennt keinen Broadcast. 2001:db8::/32 ist für Dokumentation und Labore.', 'An IPv6 address has 128 bits in 8 hex groups; leading zeros per group are dropped and one run of zeros is shortened once with ::. LANs are always /64. Key types: global unicast (2000::/3), link-local (fe80::/10, automatic on every interface), unique local (fc00::/7) and multicast (ff00::/8). IPv6 has no broadcast. 2001:db8::/32 is for documentation and labs.'],
    ['روی IOS: ipv6 unicast-routing (بدون آن روتر IPv6 را مسیریابی نمی‌کند و Router Advertisement نمی‌فرستد)، ipv6 address 2001:db8:10::1/64 روی اینترفیس و ipv6 address fe80::1 link-local برای Gateway قابل‌خواندن. بررسی: show ipv6 interface brief و show ipv6 route.', 'Unter IOS: ipv6 unicast-routing (ohne das routet der Router kein IPv6 und sendet keine Router Advertisements), ipv6 address 2001:db8:10::1/64 an der Schnittstelle und ipv6 address fe80::1 link-local für ein lesbares Gateway. Prüfen: show ipv6 interface brief und show ipv6 route.', 'On IOS: ipv6 unicast-routing (without it the router neither routes IPv6 nor sends router advertisements), ipv6 address 2001:db8:10::1/64 on the interface and ipv6 address fe80::1 link-local for a readable gateway. Verify: show ipv6 interface brief and show ipv6 route.'],
    ['SLAAC: کلاینت با Router Advertisement پیشوند و Gateway (آدرس Link-Local روتر) را می‌گیرد و خودش شناسهٔ میزبان را می‌سازد (EUI-64 یا تصادفی برای حریم خصوصی). DNS از طریق RDNSS در RA یا DHCPv6 بدون حالت (ipv6 nd other-config-flag) می‌آید. DHCPv6 با حالت آدرس را مثل DHCP کلاسیک ثبت می‌کند. Android از DHCPv6 با حالت پشتیبانی نمی‌کند.', 'SLAAC: Der Client lernt per Router Advertisement Präfix und Gateway (Link-Local-Adresse des Routers) und bildet die Host-ID selbst (EUI-64 oder zufällig zum Datenschutz). DNS kommt per RDNSS im RA oder zustandslosem DHCPv6 (ipv6 nd other-config-flag). Zustandsbehaftetes DHCPv6 vergibt und protokolliert Adressen wie klassisches DHCP. Android unterstützt kein zustandsbehaftetes DHCPv6.', 'SLAAC: the client learns prefix and gateway (the router’s link-local address) from the router advertisement and builds its own host ID (EUI-64 or random for privacy). DNS comes via RDNSS in the RA or stateless DHCPv6 (ipv6 nd other-config-flag). Stateful DHCPv6 assigns and records addresses like classic DHCP. Android does not support stateful DHCPv6.'],
    ['در شبکهٔ شرکتی Access Pointهای سبک (Lightweight) با پروتکل CAPWAP (UDP 5246 کنترل و 5247 داده) به WLC وصل می‌شوند؛ پیکربندی، کانال، توان و رومینگ مرکزی است. هر WLAN یک SSID است که به یک اینترفیس یا VLAN روی کنترلر نگاشت می‌شود؛ لینک WLC به سوئیچ Trunk است. AP در حالت Local روی پورت Access است، در FlexConnect معمولاً روی Trunk.', 'Im Firmennetz verbinden sich Lightweight-Access-Points per CAPWAP (UDP 5246 Steuerung, 5247 Daten) mit dem WLC; Konfiguration, Kanäle, Sendeleistung und Roaming sind zentral. Jedes WLAN ist eine SSID, die auf eine Schnittstelle bzw. ein VLAN am Controller abgebildet wird; der Link WLC–Switch ist ein Trunk. Ein AP im Local Mode hängt an einem Access-Port, im FlexConnect-Modus meist an einem Trunk.', 'In company networks lightweight access points connect to the WLC via CAPWAP (UDP 5246 control, 5247 data); configuration, channels, power and roaming are central. Each WLAN is an SSID mapped to an interface or VLAN on the controller; the WLC–switch link is a trunk. An AP in local mode sits on an access port, in FlexConnect mode usually on a trunk.'],
    ['امنیت: WPA2-Personal یا WPA3-Personal (SAE) با رمز مشترک برای خانه و مهمان؛ WPA2/WPA3-Enterprise با 802.1X و RADIUS برای کارمندان، چون هر کاربر یا دستگاه جدا احراز هویت می‌شود و خروج کارمند تغییر رمز همه را لازم نمی‌کند. WEP و WPA قدیمی شکسته‌اند. شبکهٔ مهمان در VLAN جدا با ACL یا فایروال فقط به اینترنت.', 'Sicherheit: WPA2- oder WPA3-Personal (SAE) mit gemeinsamem Schlüssel für Zuhause und Gäste; WPA2/WPA3-Enterprise mit 802.1X und RADIUS für Mitarbeitende, weil jeder Benutzer oder jedes Gerät einzeln authentifiziert wird und ein Austritt keinen Schlüsseltausch für alle erfordert. WEP und altes WPA sind gebrochen. Gäste in eigenem VLAN mit ACL oder Firewall nur ins Internet.', 'Security: WPA2 or WPA3-Personal (SAE) with a shared key for home and guests; WPA2/WPA3-Enterprise with 802.1X and RADIUS for staff, because each user or device authenticates separately and someone leaving doesn’t force a key change for everyone. WEP and old WPA are broken. Guests in their own VLAN with an ACL or firewall to the internet only.'],
    ['فرکانس: ۲٫۴ گیگاهرتز برد بیشتر اما فقط سه کانال بدون هم‌پوشانی (۱، ۶، ۱۱) و تداخل زیاد دارد. ۵ گیگاهرتز کانال‌های بیشتر و سرعت بالاتر با برد کمتر و ۶ گیگاهرتز (Wi-Fi 6E و 7) طیف تمیز و فقط با WPA3 دارد. «Wi-Fi کند» بیشتر وقت‌ها از تداخل کانال، فاصله، دیوار یا تعداد زیاد کاربر روی یک AP است، نه از اینترنت.', 'Frequenz: 2,4 GHz hat mehr Reichweite, aber nur drei überlappungsfreie Kanäle (1, 6, 11) und viele Störungen. 5 GHz bietet mehr Kanäle und Tempo bei geringerer Reichweite, 6 GHz (Wi-Fi 6E und 7) ein sauberes Spektrum, nur mit WPA3. „WLAN ist langsam“ liegt meist an Kanalüberlappung, Abstand, Wänden oder zu vielen Benutzern pro AP, nicht am Internet.', 'Frequency: 2.4 GHz has more range but only three non-overlapping channels (1, 6, 11) and lots of interference. 5 GHz offers more channels and speed with less range, 6 GHz (Wi-Fi 6E and 7) a clean spectrum, WPA3 only. “Wi-Fi is slow” is usually channel overlap, distance, walls or too many users per AP, not the internet.']
  ],
  lab: {
    vm: 'Packet Tracer: R1, R2 (ISR4331), SW1 (2960), WLC1 (WLC-2504), LAP1 (LAP-PT oder 3702i), Laptop mit WLAN-Karte', shell: 'Cisco IOS (CLI-Tab) und WLC-Weboberfläche',
    steps: [
      ['روی R1 و R2 مسیریابی IPv6 را فعال کن. لینک بین آن‌ها 2001:db8:12::/64 و LANها 2001:db8:10::/64 و 2001:db8:20::/64 است. Gateway را fe80::1 بگذار.', 'برای هر طرف یک مسیر ثابت IPv6 و روی R1 مسیر پیش‌فرض ::/0 بساز. PCها را روی IPv6 Automatic بگذار و آدرس SLAAC را بررسی کن.', 'WLC1 را با یک لینک Trunk به SW1 وصل کن، اینترفیس مدیریت را در VLAN 99 بگذار و LAP1 را به یک پورت Access در VLAN 99 بزن تا به WLC وصل شود.', 'در وب WLC دو WLAN بساز: «Firma» با WPA2-Enterprise (یا WPA2-PSK اگر RADIUS نداری) روی VLAN 10 و «Gast» با WPA2-PSK روی VLAN 30. روی SRV1 یک استخر DHCP برای 192.168.30.0/24 و روی R1 ساب‌اینترفیس VLAN 30 و یک ACL برای جلوگیری از دسترسی مهمان به شبکهٔ داخلی بساز.', 'Laptop را به هر دو SSID وصل کن و بررسی کن در Gast به اینترنت (یا R2) می‌رسد اما به 192.168.10.0/24 نمی‌رسد.'],
      ['Auf R1 und R2 IPv6-Routing aktivieren. Link dazwischen 2001:db8:12::/64, LANs 2001:db8:10::/64 und 2001:db8:20::/64. Gateway jeweils fe80::1.', 'Je Seite eine statische IPv6-Route, auf R1 zusätzlich die Default Route ::/0. PCs auf IPv6 Automatic stellen und die SLAAC-Adresse prüfen.', 'WLC1 per Trunk an SW1 anschließen, Management-Schnittstelle in VLAN 99, LAP1 an einen Access-Port in VLAN 99 stecken, damit er sich am WLC anmeldet.', 'In der WLC-Weboberfläche zwei WLANs anlegen: „Firma“ mit WPA2-Enterprise (oder WPA2-PSK ohne RADIUS) auf VLAN 10 und „Gast“ mit WPA2-PSK auf VLAN 30. Auf SRV1 einen DHCP-Pool für 192.168.30.0/24, auf R1 eine Subschnittstelle für VLAN 30 und eine ACL gegen Zugriff der Gäste aufs interne Netz.', 'Den Laptop mit beiden SSIDs verbinden und prüfen: Im Gast-WLAN erreicht er das Internet (bzw. R2), aber nicht 192.168.10.0/24.'],
      ['Enable IPv6 routing on R1 and R2. Link between them 2001:db8:12::/64, LANs 2001:db8:10::/64 and 2001:db8:20::/64. Gateway fe80::1 on each.', 'Add one static IPv6 route per side and on R1 also the default route ::/0. Set the PCs to IPv6 Automatic and check the SLAAC address.', 'Connect WLC1 to SW1 with a trunk, put the management interface in VLAN 99 and plug LAP1 into an access port in VLAN 99 so it joins the WLC.', 'In the WLC web interface create two WLANs: “Firma” with WPA2-Enterprise (or WPA2-PSK without RADIUS) on VLAN 10 and “Gast” with WPA2-PSK on VLAN 30. Add a DHCP pool for 192.168.30.0/24 on SRV1, and on R1 a VLAN 30 subinterface and an ACL that keeps guests out of the internal network.', 'Connect the laptop to both SSIDs and check that on Gast it reaches the internet (or R2) but not 192.168.10.0/24.']
    ],
    code: R`! ===== R1: IPv6 =====
configure terminal
ipv6 unicast-routing
interface g0/0/1.10
 ipv6 address 2001:db8:10::1/64
 ipv6 address fe80::1 link-local
interface g0/0/0
 ipv6 address 2001:db8:12::1/64
 ipv6 address fe80::1 link-local
 exit
ipv6 route 2001:db8:20::/64 2001:db8:12::2
ipv6 route ::/0 2001:db8:12::2
end

! ===== R2: IPv6 =====
configure terminal
ipv6 unicast-routing
interface g0/0/0
 ipv6 address 2001:db8:12::2/64
 ipv6 address fe80::2 link-local
interface g0/0/1
 ipv6 address 2001:db8:20::1/64
 ipv6 address fe80::1 link-local
 exit
ipv6 route 2001:db8:10::/64 2001:db8:12::1
end

! ===== R1: Gast-VLAN 30 nur ins Internet =====
configure terminal
interface g0/0/1.30
 encapsulation dot1Q 30
 ip address 192.168.30.1 255.255.255.0
 ip helper-address 192.168.10.10
 ip access-group GAST-IN in
 exit
ip access-list extended GAST-IN
 permit udp any any eq bootps
 permit udp 192.168.30.0 0.0.0.255 host 192.168.10.10 eq domain
 deny ip 192.168.30.0 0.0.0.255 10.0.0.0 0.255.255.255
 deny ip 192.168.30.0 0.0.0.255 172.16.0.0 0.15.255.255
 deny ip 192.168.30.0 0.0.0.255 192.168.0.0 0.0.255.255
 permit ip 192.168.30.0 0.0.0.255 any
end

! ===== SW1: WLC-Trunk und AP-Port =====
configure terminal
vlan 30
 name GAST
interface fa0/20
 description WLC1
 switchport mode trunk
 switchport trunk allowed vlan 10,30,99
interface fa0/21
 description LAP1 (Local Mode)
 switchport mode access
 switchport access vlan 99
 spanning-tree portfast
end
! WLC (Weboberflaeche): WLANs > Create New > SSID Firma / Gast,
! Interface jeweils auf VLAN 10 bzw. 30, Security WPA2 + PSK oder 802.1X

! ===== Pruefen =====
show ipv6 interface brief
show ipv6 route
ping 2001:db8:20::1
show cdp neighbors`,
    checks: [
      ['PC در LAN 10 یک آدرس 2001:db8:10:: با SLAAC و Gateway fe80::1 می‌گیرد و به 2001:db8:20::1 پینگ می‌زند.', 'LAP1 در وب WLC زیر Wireless با وضعیت Registered دیده می‌شود.', 'Laptop در SSID Gast آدرسی از 192.168.30.0/24 می‌گیرد و به شبکهٔ 192.168.10.0/24 دسترسی ندارد.', 'می‌توانی توضیح بدهی چرا برای کارمندان WPA2/WPA3-Enterprise بهتر از PSK است.'],
      ['Ein PC im LAN 10 erhält per SLAAC eine Adresse aus 2001:db8:10:: mit Gateway fe80::1 und pingt 2001:db8:20::1.', 'LAP1 erscheint in der WLC-Oberfläche unter Wireless als registriert.', 'Der Laptop bekommt im Gast-WLAN eine Adresse aus 192.168.30.0/24 und erreicht 192.168.10.0/24 nicht.', 'Du kannst erklären, warum für Mitarbeitende WPA2/WPA3-Enterprise besser ist als PSK.'],
      ['A PC in LAN 10 gets a 2001:db8:10:: address via SLAAC with gateway fe80::1 and pings 2001:db8:20::1.', 'LAP1 shows as registered under Wireless in the WLC interface.', 'On the Gast SSID the laptop gets an address from 192.168.30.0/24 and cannot reach 192.168.10.0/24.', 'You can explain why WPA2/WPA3-Enterprise is better than PSK for staff.']
    ]
  },
  trouble: [
    [['کلاینت فقط آدرس fe80:: دارد و آدرس Global نمی‌گیرد.', 'Client hat nur eine fe80::-Adresse und bekommt keine globale.', 'Client only has an fe80:: address and gets no global one.'],
     ['روتر Router Advertisement نمی‌فرستد: ipv6 unicast-routing فراموش شده، اینترفیس IPv6 Global با /64 ندارد یا ipv6 nd ra suppress فعال است. روی کلاینت ipconfig یا ip -6 addr، روی روتر show ipv6 interface و بخش ND را ببین.', 'Der Router sendet kein Router Advertisement: ipv6 unicast-routing fehlt, die Schnittstelle hat keine globale /64-Adresse oder ipv6 nd ra suppress ist aktiv. Am Client ipconfig bzw. ip -6 addr, am Router show ipv6 interface mit dem ND-Abschnitt prüfen.', 'The router sends no router advertisement: ipv6 unicast-routing is missing, the interface has no global /64 or ipv6 nd ra suppress is active. On the client check ipconfig or ip -6 addr, on the router show ipv6 interface and its ND section.']],
    [['AP روشن است اما به WLC وصل نمی‌شود.', 'AP ist an, verbindet sich aber nicht mit dem WLC.', 'AP is powered but does not join the WLC.'],
     ['AP باید IP بگیرد (DHCP در VLAN مدیریت AP) و WLC را پیدا کند (همان زیرشبکه، DHCP Option 43 یا نام DNS CISCO-CAPWAP-CONTROLLER). UDP 5246 و 5247 نباید در ACL بسته باشد. در شبکهٔ واقعی تفاوت نسخه یا گواهی منقضی هم دلیل رایج است.', 'Der AP braucht eine IP (DHCP im AP-Management-VLAN) und muss den WLC finden (gleiches Subnetz, DHCP Option 43 oder DNS-Name CISCO-CAPWAP-CONTROLLER). UDP 5246 und 5247 dürfen nicht per ACL blockiert sein. Im echten Netz sind auch Versionskonflikte oder abgelaufene Zertifikate häufig.', 'The AP needs an IP (DHCP in the AP management VLAN) and must find the WLC (same subnet, DHCP option 43 or DNS name CISCO-CAPWAP-CONTROLLER). UDP 5246 and 5247 must not be blocked by an ACL. In real networks version mismatches or expired certificates are also common.']],
    [['کاربر می‌گوید Wi-Fi در اتاق جلسه کند است و قطع و وصل می‌شود.', 'Benutzer meldet: WLAN im Besprechungsraum langsam und bricht ab.', 'User reports Wi-Fi in the meeting room is slow and drops.'],
     ['قدرت سیگنال (RSSI بهتر از ‎-67 dBm) و نسبت سیگنال به نویز را با ابزار تحلیل بسنج، ببین کلاینت روی ۲٫۴ یا ۵ گیگاهرتز است، تعداد کلاینت روی AP و کانال‌های همسایه را بررسی کن. اغلب راه‌حل تغییر کانال، کاهش توان، Band Steering یا AP اضافه است.', 'Signalstärke (RSSI besser als ‑67 dBm) und Signal-Rausch-Abstand mit einem Analysewerkzeug messen, prüfen, ob der Client auf 2,4 oder 5 GHz ist, Clients pro AP und Nachbarkanäle ansehen. Oft hilft Kanalwechsel, weniger Sendeleistung, Band Steering oder ein zusätzlicher AP.', 'Measure signal strength (RSSI better than ‑67 dBm) and signal-to-noise with an analysis tool, check whether the client is on 2.4 or 5 GHz, look at clients per AP and neighboring channels. Often a channel change, lower power, band steering or an extra AP helps.']],
    [['پینگ IPv6 بین دو LAN کار نمی‌کند اما هر روتر LAN خودش را می‌بیند.', 'IPv6-Ping zwischen den LANs scheitert, jeder Router erreicht aber sein eigenes LAN.', 'IPv6 ping between the LANs fails, but each router reaches its own LAN.'],
     ['show ipv6 route: مسیر به LAN دور در هر دو روتر هست؟ Next-Hop درست است؟ اگر Next-Hop آدرس Link-Local است، اینترفیس خروجی هم باید در فرمان باشد. فایروال ویندوز ICMPv6 را هم بررسی کن.', 'show ipv6 route: Gibt es auf beiden Routern die Route ins entfernte LAN, stimmt der Next-Hop? Ist der Next-Hop eine Link-Local-Adresse, muss die Ausgangsschnittstelle mit im Befehl stehen. Auch die Windows-Firewall für ICMPv6 prüfen.', 'show ipv6 route: is the route to the remote LAN on both routers and is the next-hop right? If the next-hop is a link-local address, the exit interface must be in the command too. Also check the Windows firewall for ICMPv6.']]
  ],
  decide: [
    [['SLAAC یا DHCPv6 با حالت؟', 'SLAAC oder zustandsbehaftetes DHCPv6?', 'SLAAC or stateful DHCPv6?'],
     ['SLAAC با DNS از طریق RA یا DHCPv6 بدون حالت با همهٔ دستگاه‌ها، از جمله Android، کار می‌کند و برای بیشتر شبکه‌ها کافی است. DHCPv6 با حالت وقتی لازم است که باید بدانی کدام آدرس به کدام دستگاه داده شده، و آن هم فقط برای کلاینت‌های پشتیبانی‌شده.', 'SLAAC mit DNS per RA oder zustandslosem DHCPv6 funktioniert mit allen Geräten inklusive Android und reicht für die meisten Netze. Zustandsbehaftetes DHCPv6 nur, wenn nachvollziehbar sein muss, welche Adresse welches Gerät hat – und nur für unterstützte Clients.', 'SLAAC with DNS via RA or stateless DHCPv6 works with all devices including Android and is enough for most networks. Stateful DHCPv6 only when you must track which address belongs to which device – and only for supported clients.']],
    [['AP مستقل، WLC سخت‌افزاری یا مدیریت ابری؟', 'Autonomer AP, Hardware-WLC oder Cloud-Verwaltung?', 'Autonomous AP, hardware WLC or cloud management?'],
     ['یک یا دو AP در دفتر کوچک: مستقل یا ابری کافی است. از چند AP به بالا با رومینگ و سیاست یکسان: کنترلر (سخت‌افزاری، مجازی یا داخل سوئیچ) یا مدیریت ابری مثل Meraki. ابری ساده‌تر است اما هزینهٔ اشتراک و وابستگی به اینترنت دارد.', 'Ein oder zwei APs im kleinen Büro: autonom oder Cloud reicht. Ab mehreren APs mit Roaming und einheitlichen Richtlinien: Controller (Hardware, virtuell oder im Switch) oder Cloud-Verwaltung wie Meraki. Cloud ist einfacher, kostet aber Lizenzen und hängt am Internet.', 'One or two APs in a small office: autonomous or cloud is enough. From several APs with roaming and uniform policy: a controller (hardware, virtual or embedded in the switch) or cloud management such as Meraki. Cloud is simpler but costs subscriptions and depends on the internet.']]
  ],
  pitfalls: [
    ['فراموش کردن ipv6 unicast-routing و تعجب از اینکه کلاینت فقط fe80 دارد.', 'ipv6 unicast-routing vergessen und sich wundern, warum Clients nur fe80 haben.', 'Forgetting ipv6 unicast-routing and wondering why clients only have fe80.'],
    ['شبکهٔ مهمان در همان VLAN کارمندان یا بدون ACL.', 'Gast-WLAN im selben VLAN wie die Mitarbeitenden oder ohne ACL.', 'Guest Wi-Fi in the same VLAN as staff or without an ACL.'],
    ['بالا بردن توان همهٔ APها به حداکثر برای «پوشش بهتر» و ایجاد تداخل.', 'Alle APs auf maximale Sendeleistung stellen „für bessere Abdeckung“ und damit Störungen erzeugen.', 'Turning all APs to maximum power “for better coverage” and creating interference.']
  ],
  iv: [
    [['آدرس 2001:0db8:0000:0000:0000:0000:0000:0010 را کوتاه بنویس.', 'Kürze 2001:0db8:0000:0000:0000:0000:0000:0010.', 'Shorten 2001:0db8:0000:0000:0000:0000:0000:0010.'],
     ['2001:db8::10 — صفرهای ابتدای هر گروه حذف و طولانی‌ترین رشتهٔ گروه‌های صفر یک بار با :: جایگزین می‌شود.', '2001:db8::10 – führende Nullen je Gruppe entfallen, die längste Folge von Nullgruppen wird einmal durch :: ersetzt.', '2001:db8::10 – leading zeros per group are dropped and the longest run of zero groups is replaced once by ::.']],
    [['SLAAC چطور کار می‌کند؟', 'Wie funktioniert SLAAC?', 'How does SLAAC work?'],
     ['کلاینت آدرس Link-Local می‌سازد، Router Solicitation می‌فرستد، از Router Advertisement پیشوند /64 و Gateway را می‌گیرد، شناسهٔ میزبان را خودش می‌سازد و با DAD بررسی می‌کند تکراری نیست.', 'Der Client bildet eine Link-Local-Adresse, sendet Router Solicitation, lernt aus dem Router Advertisement das /64-Präfix und das Gateway, bildet die Host-ID selbst und prüft per DAD, dass sie eindeutig ist.', 'The client forms a link-local address, sends a router solicitation, learns the /64 prefix and gateway from the router advertisement, builds its host ID itself and checks uniqueness with DAD.']],
    [['چرا شبکهٔ کارمندان WPA2/WPA3-Enterprise است و نه PSK؟', 'Warum Mitarbeiter-WLAN mit WPA2/WPA3-Enterprise statt PSK?', 'Why staff Wi-Fi with WPA2/WPA3-Enterprise instead of PSK?'],
     ['هر کاربر یا دستگاه جدا با RADIUS احراز هویت می‌شود، دسترسی تک‌تک قابل لغو و ثبت است، کلید هر جلسه جداست و با خروج یک نفر لازم نیست رمز همه عوض شود. VLAN هم می‌تواند پویا اختصاص یابد.', 'Jeder Benutzer oder jedes Gerät meldet sich einzeln über RADIUS an, Zugriffe lassen sich einzeln sperren und protokollieren, jede Sitzung hat eigene Schlüssel, und bei einem Austritt muss nicht für alle das Kennwort geändert werden. VLANs können dynamisch zugewiesen werden.', 'Each user or device authenticates individually via RADIUS, access can be revoked and logged one by one, every session has its own keys, and someone leaving doesn’t force a password change for everyone. VLANs can be assigned dynamically.']]
  ],
  sources: [
    ['RFC 4291 – IP Version 6 Addressing Architecture', 'https://www.rfc-editor.org/rfc/rfc4291'],
    ['RFC 4862 – IPv6 Stateless Address Autoconfiguration', 'https://www.rfc-editor.org/rfc/rfc4862'],
    ['RFC 5415 – CAPWAP Protocol Specification', 'https://www.rfc-editor.org/rfc/rfc5415'],
    ['Wi-Fi Alliance – Security', 'https://www.wi-fi.org/discover-wi-fi/security']
  ]
},

{
  id: 'ccna-ts', part: 3,
  title: ['عیب‌یابی ساختاریافته، اتوماسیون شبکه و آمادگی آزمون', 'Strukturierte Fehlersuche, Netzwerkautomatisierung und Prüfungsvorbereitung', 'Structured troubleshooting, network automation and exam preparation'],
  goal: ['خرابی‌های واقعی را با روش لایه‌به‌لایه و فرمان‌های show درست پیدا کنی، نتیجه را مثل یک تیکت مستند کنی، اصول اتوماسیون (REST API، JSON، NETCONF/RESTCONF، Ansible، Python) را بفهمی و برای آزمون CCNA برنامه‌ریزی کنی.', 'Du findest echte Fehler mit einem schichtweisen Vorgehen und den richtigen show-Befehlen, dokumentierst sie wie ein Ticket, verstehst die Grundlagen der Automatisierung (REST-API, JSON, NETCONF/RESTCONF, Ansible, Python) und planst deine CCNA-Vorbereitung.', 'You find real faults with a layer-by-layer method and the right show commands, document them like a ticket, understand automation basics (REST API, JSON, NETCONF/RESTCONF, Ansible, Python) and plan your CCNA preparation.'],
  why: ['در مصاحبه و در کار، چیزی که تکنسین خوب را از ضعیف جدا می‌کند حفظ کردن فرمان نیست، بلکه روش است: فرضیه، آزمون، نتیجه و مستندسازی. اتوماسیون هم دیگر اختیاری نیست؛ پشتیبان‌گیری از کانفیگ و تغییرات انبوه با اسکریپت انجام می‌شود.', 'In Vorstellungsgespräch und Alltag trennt nicht das Auswendiglernen von Befehlen gute von schwachen Technikern, sondern das Vorgehen: Hypothese, Test, Ergebnis und Dokumentation. Automatisierung ist nicht mehr optional; Konfigurationssicherung und Massenänderungen laufen per Skript.', 'In interviews and at work, what separates good technicians from weak ones is not memorized commands but method: hypothesis, test, result and documentation. Automation is no longer optional; config backups and bulk changes run as scripts.'],
  know: [
    ['روش‌ها: پایین به بالا (از کابل و لایهٔ ۱ تا برنامه)، بالا به پایین (از برنامه)، تقسیم و تسخیر (از لایهٔ ۳ با ping شروع کن و بسته به نتیجه بالا یا پایین برو) و دنبال کردن مسیر بسته از مبدأ تا مقصد. همیشه اول بپرس «چه چیزی تغییر کرده؟» و دامنه را مشخص کن: یک کاربر، یک VLAN یا همه.', 'Methoden: Bottom-up (vom Kabel auf Schicht 1 bis zur Anwendung), Top-down (von der Anwendung), Divide and Conquer (mit ping auf Schicht 3 beginnen, je nach Ergebnis hoch oder runter) und dem Paketweg von Quelle zu Ziel folgen. Immer zuerst fragen: „Was hat sich geändert?“ und den Umfang klären – ein Benutzer, ein VLAN oder alle.', 'Methods: bottom-up (from the cable at layer 1 to the application), top-down (from the application), divide and conquer (start at layer 3 with ping and move up or down depending on the result) and following the packet path from source to destination. Always ask first “what changed?” and scope it – one user, one VLAN or everyone.'],
    ['لایهٔ ۱ و ۲: show interfaces status (connected، notconnect، err-disabled، سرعت و Duplex)، show interfaces g0/1 با CRC، input errors و late collisions (کابل خراب یا Duplex mismatch)، show mac address-table address MAC برای یافتن پورت دستگاه، show vlan brief و show interfaces trunk.', 'Schicht 1 und 2: show interfaces status (connected, notconnect, err-disabled, Speed und Duplex), show interfaces g0/1 mit CRC, input errors und late collisions (defektes Kabel oder Duplex-Mismatch), show mac address-table address MAC zum Finden des Geräteports, show vlan brief und show interfaces trunk.', 'Layers 1 and 2: show interfaces status (connected, notconnect, err-disabled, speed and duplex), show interfaces g0/1 with CRC, input errors and late collisions (bad cable or duplex mismatch), show mac address-table address MAC to find a device’s port, show vlan brief and show interfaces trunk.'],
    ['لایهٔ ۳ و بالاتر: show ip interface brief، show ip route آدرس، show ip arp، ping و traceroute گسترده با آدرس مبدأ (ping 192.168.30.10 source g0/0/1)، show ip ospf neighbor، show access-lists و show ip nat translations. debug فقط محدود، با terminal monitor و برای مدت کوتاه؛ در پایان undebug all.', 'Schicht 3 und darüber: show ip interface brief, show ip route Adresse, show ip arp, erweitertes ping und traceroute mit Quelladresse (ping 192.168.30.10 source g0/0/1), show ip ospf neighbor, show access-lists und show ip nat translations. debug nur gezielt, mit terminal monitor und kurz; danach undebug all.', 'Layer 3 and up: show ip interface brief, show ip route address, show ip arp, extended ping and traceroute with a source address (ping 192.168.30.10 source g0/0/1), show ip ospf neighbor, show access-lists and show ip nat translations. debug only targeted, with terminal monitor and briefly; then undebug all.'],
    ['شبکهٔ مبتنی بر کنترلر سه صفحه را جدا می‌کند: Data Plane (ارسال بسته)، Control Plane (تصمیم مسیر، مثل OSPF) و Management Plane (SSH، SNMP، API). کنترلرهایی مثل Catalyst Center (DNA Center) از طریق Southbound API دستگاه‌ها را و از Northbound REST API برنامه‌ها را سرویس می‌دهند.', 'Controllerbasierte Netze trennen drei Ebenen: Data Plane (Pakete weiterleiten), Control Plane (Wegentscheidung, z. B. OSPF) und Management Plane (SSH, SNMP, API). Controller wie Catalyst Center (DNA Center) steuern Geräte über Southbound-APIs und bieten Anwendungen eine Northbound-REST-API.', 'Controller-based networks separate three planes: data plane (forwarding packets), control plane (path decisions such as OSPF) and management plane (SSH, SNMP, API). Controllers like Catalyst Center (DNA Center) drive devices through southbound APIs and offer applications a northbound REST API.'],
    ['REST API با HTTP کار می‌کند: GET خواندن، POST ساختن، PUT/PATCH تغییر و DELETE حذف؛ کدهای 200، 201، 401، 404 و 500. داده معمولاً JSON است: شیء در {}، فهرست در []، کلید و مقدار. NETCONF (SSH پورت 830، XML) و RESTCONF (HTTPS، JSON یا XML) پیکربندی را بر اساس مدل‌های YANG ساخت‌یافته رد و بدل می‌کنند.', 'REST-APIs nutzen HTTP: GET lesen, POST anlegen, PUT/PATCH ändern, DELETE löschen; Statuscodes 200, 201, 401, 404, 500. Daten sind meist JSON: Objekt in {}, Liste in [], Schlüssel und Wert. NETCONF (SSH Port 830, XML) und RESTCONF (HTTPS, JSON oder XML) tauschen Konfiguration strukturiert nach YANG-Modellen aus.', 'REST APIs use HTTP: GET read, POST create, PUT/PATCH change, DELETE remove; status codes 200, 201, 401, 404, 500. Data is usually JSON: object in {}, list in [], key and value. NETCONF (SSH port 830, XML) and RESTCONF (HTTPS, JSON or XML) exchange configuration in structured form based on YANG models.'],
    ['ابزارها: Ansible بدون عامل با SSH و Playbookهای YAML و مجموعهٔ cisco.ios کانفیگ را یکسان و قابل تکرار می‌کند. Python با Netmiko برای اجرای show و پشتیبان‌گیری انبوه مناسب است. Packet Tracer اتصال SSH از بیرون ندارد؛ برای تمرین اتوماسیون از Cisco Modeling Labs، GNS3/EVE-NG با تصویر IOS قانونی یا Sandbox رایگان Cisco DevNet استفاده کن.', 'Werkzeuge: Ansible arbeitet agentenlos über SSH mit YAML-Playbooks und der Collection cisco.ios und macht Konfigurationen einheitlich und wiederholbar. Python mit Netmiko eignet sich für show-Befehle und Massensicherungen. Packet Tracer erlaubt kein SSH von außen; zum Automatisierungsüben Cisco Modeling Labs, GNS3/EVE-NG mit legalem IOS-Image oder die kostenlosen Cisco-DevNet-Sandboxes nutzen.', 'Tools: Ansible works agentless over SSH with YAML playbooks and the cisco.ios collection and makes configurations consistent and repeatable. Python with Netmiko suits show commands and bulk backups. Packet Tracer allows no SSH from outside; to practice automation use Cisco Modeling Labs, GNS3/EVE-NG with a legal IOS image or the free Cisco DevNet sandboxes.']
  ],
  lab: {
    vm: 'Packet Tracer: Gesamttopologie aus den Modulen ccna-vlan bis ccna-sec; für den Python-Teil eine Linux-VM mit Zugang zu einem echten oder virtuellen IOS-Gerät', shell: 'Cisco IOS (CLI-Tab) und Python 3',
    steps: [
      ['از یک همکار یا خودت بخواه بدون گفتن، پنج خطا در توپولوژی بگذارد: یک پورت در VLAN اشتباه، یک VLAN حذف‌شده از Trunk، یک ماسک اشتباه روی ساب‌اینترفیس، یک اینترفیس OSPF پسیو روی لینک بین روترها و یک خط deny در ACL.', 'برای هر خطا یک تیکت بنویس: علامت دقیق، دامنه (چه کسی و از کی) و آخرین تغییر.', 'با روش تقسیم و تسخیر شروع کن: از کلاینت ping به Gateway، بعد به مقصد. با فرمان‌های همان لایه علت را پیدا کن، فقط یک تغییر در هر بار بده و دوباره آزمایش کن.', 'برای هر خطا در تیکت علت، فرمان‌هایی که آن را ثابت کرد، راه‌حل و آزمون بعدی را بنویس.', 'در صورت دسترسی به یک دستگاه IOS واقعی یا مجازی، اسکریپت Python پایین را اجرا کن تا از کانفیگ پشتیبان بگیرد و خروجی show ip interface brief را ذخیره کند.'],
      ['Lass eine Kollegin oder dich selbst ohne Ansage fünf Fehler in die Topologie einbauen: ein Port im falschen VLAN, ein vom Trunk entferntes VLAN, eine falsche Maske an einer Subschnittstelle, eine passive OSPF-Schnittstelle auf einem Router-Link und eine deny-Zeile in einer ACL.', 'Für jeden Fehler ein Ticket schreiben: genaues Symptom, Umfang (wer, seit wann) und letzte Änderung.', 'Mit Divide and Conquer beginnen: vom Client ping zum Gateway, dann zum Ziel. Mit Befehlen der jeweiligen Schicht die Ursache finden, immer nur eine Änderung vornehmen und erneut testen.', 'Im Ticket je Fehler Ursache, beweisende Befehle, Lösung und Nachtest notieren.', 'Wenn ein echtes oder virtuelles IOS-Gerät erreichbar ist, das Python-Skript unten ausführen: Es sichert die Konfiguration und speichert die Ausgabe von show ip interface brief.'],
      ['Have a colleague or yourself build five faults into the topology without telling: a port in the wrong VLAN, a VLAN removed from a trunk, a wrong mask on a subinterface, a passive OSPF interface on a router link and a deny line in an ACL.', 'Write a ticket for each fault: exact symptom, scope (who, since when) and the last change.', 'Start with divide and conquer: from the client ping the gateway, then the destination. Find the cause with the commands of that layer, make only one change at a time and test again.', 'In each ticket note the cause, the commands that proved it, the fix and the retest.', 'If a real or virtual IOS device is reachable, run the Python script below: it backs up the configuration and saves the output of show ip interface brief.']
    ],
    code: R`! ===== Diagnosereihenfolge in IOS =====
! Schicht 1/2
show interfaces status
show interfaces status err-disabled
show interfaces g0/1 | include errors|CRC|duplex
show mac address-table address 0060.2f12.3456
show vlan brief
show interfaces trunk
! Schicht 3
show ip interface brief
show ip route 192.168.30.10
show ip arp
ping 192.168.30.10 source g0/0/1
traceroute 192.168.30.10
show ip ospf neighbor
show ip ospf interface brief
! Dienste und Filter
show access-lists
show ip nat translations
show ip dhcp binding
! Gezielt debuggen und wieder beenden
terminal monitor
debug ip ospf adj
undebug all

# ===== Python 3 mit Netmiko (Linux-VM, nicht Packet Tracer) =====
# pip install netmiko
from datetime import date
from getpass import getpass
from netmiko import ConnectHandler

geraete = ["192.168.99.2", "192.168.99.1"]
benutzer = input("Benutzer: ")
kennwort = getpass("Kennwort: ")

for ip in geraete:
    verbindung = ConnectHandler(device_type="cisco_ios", host=ip,
                                username=benutzer, password=kennwort)
    name = verbindung.find_prompt().strip("#>")
    konfig = verbindung.send_command("show running-config")
    status = verbindung.send_command("show ip interface brief")
    with open(f"{name}_{date.today()}.cfg", "w", encoding="utf-8") as f:
        f.write(konfig)
    print(name, "gesichert")
    print(status)
    verbindung.disconnect()`,
    checks: [
      ['هر پنج خطا پیدا و رفع شده و هر کدام تیکت کامل با علت و فرمان اثبات دارد.', 'برای هر خطا گفته‌ای در کدام لایه بود و چرا روش انتخابی تو سریع‌تر به آن رسید.', 'می‌توانی یک پاسخ JSON نمونه را بخوانی و GET، POST، PUT و DELETE را توضیح بدهی.', 'اسکریپت پشتیبان‌گیری را اجرا کرده‌ای یا دست‌کم می‌دانی کجا و با چه دستگاهی آن را آزمایش می‌کنی.'],
      ['Alle fünf Fehler sind gefunden und behoben, jeder mit vollständigem Ticket samt Ursache und Beweisbefehl.', 'Zu jedem Fehler kannst du sagen, auf welcher Schicht er lag und warum dein Vorgehen schnell dorthin führte.', 'Du kannst eine JSON-Beispielantwort lesen und GET, POST, PUT und DELETE erklären.', 'Du hast das Sicherungsskript ausgeführt oder weißt zumindest, wo und mit welchem Gerät du es testest.'],
      ['All five faults are found and fixed, each with a complete ticket including cause and proving command.', 'For each fault you can say which layer it was on and why your method got there quickly.', 'You can read a sample JSON response and explain GET, POST, PUT and DELETE.', 'You have run the backup script, or at least know where and against which device you will test it.']
    ]
  },
  trouble: [
    [['کاربر کند است و show interfaces روی پورتش CRC و late collision زیاد نشان می‌دهد.', 'Benutzer ist langsam, show interfaces zeigt an seinem Port viele CRC-Fehler und late collisions.', 'User is slow and show interfaces on the port shows many CRC errors and late collisions.'],
     ['late collision تقریباً همیشه Duplex mismatch است (یک طرف full، طرف دیگر half). هر دو طرف را auto یا هر دو را یکسان ثابت کن. CRC بدون collision یعنی کابل، پچ پنل یا پریز خراب؛ با کابل دیگر یا تستر بسنج.', 'Late collisions bedeuten fast immer Duplex-Mismatch (eine Seite full, die andere half). Beide Seiten auf auto oder beide gleich fest setzen. CRC ohne Kollisionen deutet auf Kabel, Patchfeld oder Dose; mit anderem Kabel oder Tester prüfen.', 'Late collisions almost always mean a duplex mismatch (one side full, the other half). Set both sides to auto or both to the same fixed value. CRC without collisions points to the cable, patch panel or wall port; test with another cable or a tester.']],
    [['پینگ از روتر کار می‌کند اما از کلاینت نه.', 'Ping vom Router klappt, vom Client nicht.', 'Ping from the router works, from the client it doesn’t.'],
     ['پینگ روتر به‌طور پیش‌فرض از آدرس اینترفیس خروجی است، نه از LAN کلاینت. با ping مقصد source اینترفیس-LAN تکرار کن؛ اگر حالا شکست بخورد، مسیر برگشت به LAN یا ACL یا NAT مشکل دارد.', 'Der Router pingt standardmäßig von der Ausgangsschnittstelle, nicht aus dem Client-LAN. Mit ping Ziel source LAN-Schnittstelle wiederholen; scheitert es jetzt, fehlt der Rückweg ins LAN oder eine ACL bzw. NAT stört.', 'By default the router pings from the exit interface, not from the client LAN. Repeat with ping destination source LAN-interface; if it now fails, the return path to the LAN is missing or an ACL or NAT interferes.']],
    [['بعد از debug، کنسول روتر پاسخ نمی‌دهد.', 'Nach einem debug reagiert die Router-Konsole nicht mehr.', 'After a debug the router console stops responding.'],
     ['debug پرحجم (مثلاً debug ip packet) CPU را پر می‌کند. undebug all را حتی اگر خروجی روی صفحه است تایپ کن، یا از SSH دوم وارد شو. در آینده debug را محدود به یک ACL یا یک همسایه کن و logging console را کم کن.', 'Ein umfangreiches debug (z. B. debug ip packet) lastet die CPU aus. undebug all tippen, auch wenn Ausgabe darüber läuft, oder über eine zweite SSH-Sitzung anmelden. Künftig debug auf eine ACL oder einen Nachbarn begrenzen und logging console reduzieren.', 'A heavy debug (e.g. debug ip packet) saturates the CPU. Type undebug all even while output scrolls, or log in through a second SSH session. In future limit debug to an ACL or one neighbor and reduce logging console.']]
  ],
  decide: [
    [['Ansible یا اسکریپت Python؟', 'Ansible oder Python-Skript?', 'Ansible or a Python script?'],
     ['Ansible برای وضعیت مطلوب و تکرارپذیر (همهٔ سوئیچ‌ها NTP، بنر و SNMP یکسان داشته باشند) و برای تیم‌هایی که برنامه‌نویس نیستند. Python وقتی منطق خاص، گزارش یا ترکیب با API دیگری لازم است. هر دو را در Git نگه دار.', 'Ansible für einen wiederholbaren Sollzustand (alle Switches gleiche NTP-, Banner- und SNMP-Einstellungen) und für Teams ohne Programmierschwerpunkt. Python, wenn eigene Logik, Berichte oder die Verknüpfung mit anderen APIs nötig sind. Beides in Git verwalten.', 'Ansible for a repeatable desired state (all switches with the same NTP, banner and SNMP) and for teams without a programming focus. Python when you need custom logic, reports or integration with other APIs. Keep both in Git.']],
    [['Packet Tracer کافی است یا آزمایشگاه دیگر لازم است؟', 'Reicht Packet Tracer oder brauche ich ein anderes Labor?', 'Is Packet Tracer enough or do I need another lab?'],
     ['برای مبانی CCNA، VLAN، STP، OSPF، ACL و NAT کافی و سبک است. برای رفتار واقعی IOS، اتوماسیون، debug کامل و شبیه‌سازی‌های بزرگ‌تر: Cisco Modeling Labs، GNS3 یا EVE-NG یا چند سوئیچ و روتر کارکردهٔ ارزان.', 'Für CCNA-Grundlagen, VLAN, STP, OSPF, ACL und NAT reicht es und ist leicht. Für echtes IOS-Verhalten, Automatisierung, vollständiges debug und größere Szenarien: Cisco Modeling Labs, GNS3 oder EVE-NG oder ein paar günstige gebrauchte Switches und Router.', 'For CCNA basics, VLAN, STP, OSPF, ACL and NAT it is enough and lightweight. For real IOS behavior, automation, full debug and larger scenarios: Cisco Modeling Labs, GNS3 or EVE-NG, or a few cheap used switches and routers.']]
  ],
  pitfalls: [
    ['تغییر چند تنظیم همزمان و ندانستن کدام مشکل را حل کرد.', 'Mehrere Einstellungen gleichzeitig ändern und nicht wissen, welche geholfen hat.', 'Changing several settings at once and not knowing which one fixed it.'],
    ['ذخیرهٔ رمز در اسکریپت یا فرستادن کانفیگ با رمز به Git عمومی.', 'Kennwörter im Skript speichern oder Konfigurationen mit Kennwörtern in ein öffentliches Git hochladen.', 'Storing passwords in scripts or pushing configs with passwords to a public Git.'],
    ['حفظ کردن پاسخ‌های آزمون به‌جای ساختن آزمایشگاه؛ در سؤال‌های شبیه‌سازی و در مصاحبه فوراً معلوم می‌شود.', 'Prüfungsfragen auswendig lernen statt Labore zu bauen – in Simulationsfragen und im Vorstellungsgespräch fällt das sofort auf.', 'Memorizing exam answers instead of building labs – it shows immediately in simulation questions and interviews.']
  ],
  iv: [
    [['کاربری می‌گوید «اینترنت کار نمی‌کند». قدم‌های تو چیست؟', 'Ein Benutzer sagt „Das Internet geht nicht“. Wie gehst du vor?', 'A user says “the internet doesn’t work”. What are your steps?'],
     ['دامنه را می‌پرسم (فقط او یا همه، کدام برنامه، از کی). بعد ipconfig: آدرس 169.254 یعنی DHCP. ping به Gateway، به یک IP عمومی و به یک نام: IP جواب دهد و نام نه یعنی DNS. traceroute محل قطع را نشان می‌دهد و در آخر NAT، فایروال یا پروکسی.', 'Ich kläre den Umfang (nur er oder alle, welche Anwendung, seit wann). Dann ipconfig: 169.254 heißt DHCP. Ping zum Gateway, zu einer öffentlichen IP und zu einem Namen: IP klappt, Name nicht, heißt DNS. traceroute zeigt den Abbruchpunkt, zuletzt NAT, Firewall oder Proxy.', 'I clarify the scope (just him or everyone, which application, since when). Then ipconfig: 169.254 means DHCP. Ping the gateway, a public IP and a name: IP works but name fails means DNS. traceroute shows where it stops, and finally NAT, firewall or proxy.']],
    [['فرق REST API و NETCONF چیست؟', 'Unterschied zwischen REST-API und NETCONF?', 'Difference between a REST API and NETCONF?'],
     ['REST روی HTTP/HTTPS با متدهای GET، POST، PUT و DELETE و معمولاً JSON است و برای کنترلرها و سرویس‌ها رایج است. NETCONF روی SSH پورت 830 با XML و مدل‌های YANG کار می‌کند و تراکنش و تأیید تغییر دارد. RESTCONF همان مدل‌های YANG را روی HTTPS می‌دهد.', 'REST läuft über HTTP/HTTPS mit GET, POST, PUT und DELETE und meist JSON und ist bei Controllern und Diensten üblich. NETCONF läuft über SSH Port 830 mit XML und YANG-Modellen und kennt Transaktionen und Commit. RESTCONF bietet dieselben YANG-Modelle über HTTPS.', 'REST runs over HTTP/HTTPS with GET, POST, PUT and DELETE and usually JSON, common for controllers and services. NETCONF runs over SSH port 830 with XML and YANG models and supports transactions and commit. RESTCONF offers the same YANG models over HTTPS.']],
    [['برای آزمون CCNA چطور آماده می‌شوی؟', 'Wie bereitest du dich auf die CCNA-Prüfung vor?', 'How do you prepare for the CCNA exam?'],
     ['فهرست رسمی موضوعات آزمون را مبنا می‌گیرم، هر موضوع را در آزمایشگاه می‌سازم و خراب می‌کنم، Subnetting را تا زیر یک دقیقه برای هر سؤال تمرین می‌کنم، آزمون‌های زمان‌دار از منابع قانونی می‌زنم و نقاط ضعف را با یادداشت دنبال می‌کنم.', 'Grundlage ist die offizielle Liste der Prüfungsthemen. Jedes Thema baue und zerstöre ich im Labor, übe Subnetting bis unter eine Minute pro Aufgabe, mache zeitgebundene Übungstests aus legalen Quellen und verfolge Schwächen mit Notizen.', 'I use the official exam topics list as the basis, build and break every topic in the lab, practice subnetting to under a minute per question, take timed practice tests from legitimate sources and track weak spots with notes.']]
  ],
  sources: [
    ['Cisco Learning Network – CCNA exam topics (v1.1)', 'https://learningnetwork.cisco.com/s/ccna-exam-topics'],
    ['Cisco Learning Network – CCNA v2.0 exam topics', 'https://learningnetwork.cisco.com/s/ccna-v2-exam-topics'],
    ['RFC 8040 – RESTCONF Protocol', 'https://www.rfc-editor.org/rfc/rfc8040'],
    ['RFC 6241 – Network Configuration Protocol (NETCONF)', 'https://www.rfc-editor.org/rfc/rfc6241'],
    ['Ansible – cisco.ios collection', 'https://docs.ansible.com/ansible/latest/collections/cisco/ios/index.html'],
    ['Netmiko (GitHub)', 'https://github.com/ktbyers/netmiko']
  ]
}

);
})();
