/* Arefi ITPraxis – Kurs Cisco-Netzwerke (CCNA-Niveau), Teil 2 (statisches Routing, OSPF, Netzdienste). Eigene Inhalte, keine Cisco-Unterlagen. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKCcna = window.ArefiKCcna || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'ccna-route', part: 2,
  title: ['جدول مسیریابی، مسیر ثابت، مسیر پیش‌فرض و مسیر پشتیبان', 'Routing-Tabelle, statische Routen, Default Route und Backup-Route', 'Routing table, static routes, default route and backup route'],
  goal: ['جدول مسیریابی روتر را بخوانی و بفهمی چرا یک بسته کدام مسیر را می‌رود؛ سه روتر را با مسیر ثابت به هم وصل کنی، مسیر پیش‌فرض بسازی و یک مسیر پشتیبان (Floating Static) را آزمایش کنی.', 'Du liest die Routing-Tabelle und verstehst, warum ein Paket welchen Weg nimmt; du verbindest drei Router mit statischen Routen, legst eine Default Route an und testest eine Backup-Route (Floating Static).', 'You read the routing table and understand why a packet takes which path; you connect three routers with static routes, add a default route and test a backup route (floating static).'],
  why: ['«از شعبه به سرور نمی‌رسم» معمولاً یعنی مسیری کم است، مسیر برگشت وجود ندارد یا مسیر اشتباهی ترجیح داده شده. کسی که جدول مسیریابی را مثل روتر می‌خواند، این تیکت‌ها را بدون حدس حل می‌کند.', '„Von der Filiale komme ich nicht zum Server“ heißt meist: Eine Route fehlt, der Rückweg fehlt oder eine falsche Route wird bevorzugt. Wer die Routing-Tabelle liest wie der Router, löst solche Tickets ohne Raten.', '“I can’t reach the server from the branch” usually means a route is missing, the return path is missing or a wrong route is preferred. Anyone who reads the routing table the way the router does solves these tickets without guessing.'],
  know: [
    ['کدهای جدول در show ip route: C شبکهٔ مستقیماً وصل، L آدرس خود اینترفیس (/32)، S مسیر ثابت، O مسیر OSPF و ستاره (*) کاندید مسیر پیش‌فرض. عدد داخل کروشه مثل [110/2] یعنی Administrative Distance و Metric.', 'Codes in show ip route: C direkt verbundenes Netz, L eigene Schnittstellenadresse (/32), S statische Route, O OSPF-Route, Sternchen (*) Kandidat für die Default Route. Die Zahl in Klammern wie [110/2] steht für Administrative Distance und Metrik.', 'Codes in show ip route: C directly connected network, L the interface’s own address (/32), S static route, O OSPF route, asterisk (*) default route candidate. The bracket value such as [110/2] means administrative distance and metric.'],
    ['روتر برای هر بسته طولانی‌ترین تطابق پیشوند را انتخاب می‌کند: برای مقصد 10.1.1.5، مسیر 10.1.1.0/24 بر 10.1.0.0/16 و هر دو بر 0.0.0.0/0 مقدم‌اند؛ مهم نیست کدام پروتکل آن‌ها را آورده است.', 'Der Router wählt pro Paket den längsten passenden Präfix: Für Ziel 10.1.1.5 schlägt 10.1.1.0/24 die Route 10.1.0.0/16, und beide schlagen 0.0.0.0/0 – egal, welches Protokoll sie gelernt hat.', 'For every packet the router picks the longest matching prefix: for destination 10.1.1.5, 10.1.1.0/24 beats 10.1.0.0/16 and both beat 0.0.0.0/0 – no matter which protocol learned them.'],
    ['فقط وقتی دو منبع دقیقاً همان پیشوند را می‌دهند، Administrative Distance تصمیم می‌گیرد: Connected 0، Static 1، eBGP 20، EIGRP 90، OSPF 110، RIP 120، iBGP 200. کمتر یعنی قابل‌اعتمادتر. Metric فقط بین مسیرهای یک پروتکل مقایسه می‌شود.', 'Nur wenn zwei Quellen exakt denselben Präfix liefern, entscheidet die Administrative Distance: Connected 0, Static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120, iBGP 200. Kleiner heißt vertrauenswürdiger. Die Metrik wird nur innerhalb eines Protokolls verglichen.', 'Only when two sources offer exactly the same prefix does administrative distance decide: connected 0, static 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120, iBGP 200. Lower is more trusted. Metric is only compared within one protocol.'],
    ['مسیر ثابت: ip route شبکه ماسک آدرس-بعدی. روی اترنت آدرس Next-Hop بده (یا اینترفیس به همراه Next-Hop)، نه فقط اینترفیس؛ وگرنه روتر برای هر مقصد ARP می‌پرسد. مسیر پیش‌فرض ip route 0.0.0.0 0.0.0.0 … همهٔ مقصدهای ناشناخته را به سمت ISP یا فایروال می‌فرستد.', 'Statische Route: ip route Netz Maske Next-Hop. Bei Ethernet die Next-Hop-Adresse angeben (oder Schnittstelle plus Next-Hop), nicht nur die Schnittstelle – sonst fragt der Router für jedes Ziel per ARP. Die Default Route ip route 0.0.0.0 0.0.0.0 … schickt alle unbekannten Ziele Richtung Provider oder Firewall.', 'Static route: ip route network mask next-hop. On Ethernet give the next-hop address (or interface plus next-hop), not only the interface – otherwise the router ARPs for every destination. The default route ip route 0.0.0.0 0.0.0.0 … sends all unknown destinations toward the ISP or firewall.'],
    ['Floating Static مسیری با AD بالاتر (مثلاً 200) است که فقط وقتی مسیر اصلی از جدول حذف شود فعال می‌شود. محدودیت: مسیر ثابت فقط وقتی حذف می‌شود که اینترفیس محلی down شود یا Next-Hop دیگر قابل حل نباشد؛ خرابی پشت یک سوئیچ یا در شبکهٔ ISP را نمی‌بیند. برای آن IP SLA با track یا یک پروتکل مسیریابی لازم است.', 'Eine Floating Static Route hat eine höhere AD (z. B. 200) und wird erst aktiv, wenn die Hauptroute aus der Tabelle verschwindet. Grenze: Eine statische Route verschwindet nur, wenn die lokale Schnittstelle down geht oder der Next-Hop nicht mehr auflösbar ist; einen Ausfall hinter einem Switch oder beim Provider sieht sie nicht. Dafür braucht man IP SLA mit track oder ein Routingprotokoll.', 'A floating static route has a higher AD (e.g. 200) and only becomes active when the primary route leaves the table. Limit: a static route only disappears when the local interface goes down or the next-hop becomes unresolvable; it does not see a failure behind a switch or inside the ISP. That needs IP SLA with track or a routing protocol.'],
    ['هر ارتباط دو جهت دارد. بیشتر خطاهای «پینگ نمی‌رود» مسیر برگشت ندارند: روتر مقصد نمی‌داند پاسخ را به کجا بفرستد. با traceroute از هر دو طرف و show ip route آدرس‌مقصد (مثلاً show ip route 192.168.30.10) مسیر انتخاب‌شده را ببین.', 'Jede Verbindung hat zwei Richtungen. Bei den meisten „Ping geht nicht“-Fällen fehlt der Rückweg: Der Zielrouter weiß nicht, wohin er antworten soll. Mit traceroute von beiden Seiten und show ip route Zieladresse (z. B. show ip route 192.168.30.10) die gewählte Route prüfen.', 'Every connection has two directions. In most “ping fails” cases the return path is missing: the destination router doesn’t know where to send the reply. Use traceroute from both sides and show ip route destination (e.g. show ip route 192.168.30.10) to see the chosen route.']
  ],
  lab: {
    vm: 'Packet Tracer: R1, R2, R3 (ISR4331), SW-A, SW-C (2960), PC-A, PC-C', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['R1 G0/0/0 را به R2 G0/0/0 (10.0.12.0/30)، R2 G0/0/1 را به R3 G0/0/1 (10.0.23.0/30) و برای مسیر پشتیبان R1 G0/0/2 را مستقیم به R3 G0/0/2 (10.0.13.0/30) وصل کن. LAN A روی R1 G0/0/1 = 192.168.10.0/24، LAN C روی R3 G0/0/0 = 192.168.30.0/24.', 'همهٔ آدرس‌ها را بزن و با show ip interface brief مطمئن شو اینترفیس‌ها up/up هستند. ببین که در جدول هر روتر فقط C و L هست.', 'روی هر سه روتر مسیرهای ثابت به LANهای دور بساز. فراموش نکن R2 هم هر دو LAN را می‌خواهد.', 'روی R1 و R3 مسیر پشتیبان از طریق لینک مستقیم با AD 200 اضافه کن. با یک Loopback روی R3 (203.0.113.1) اینترنت را شبیه‌سازی کن و روی R1 مسیر پیش‌فرض بساز.', 'از PC-A به PC-C traceroute بزن، بعد R1 G0/0/0 را shutdown کن و ببین مسیر پشتیبان در جدول ظاهر می‌شود و پینگ ادامه دارد.'],
      ['R1 G0/0/0 mit R2 G0/0/0 (10.0.12.0/30), R2 G0/0/1 mit R3 G0/0/1 (10.0.23.0/30) und für den Backup-Weg R1 G0/0/2 direkt mit R3 G0/0/2 (10.0.13.0/30) verbinden. LAN A an R1 G0/0/1 = 192.168.10.0/24, LAN C an R3 G0/0/0 = 192.168.30.0/24.', 'Alle Adressen setzen, mit show ip interface brief prüfen, dass alles up/up ist. Sieh nach: Jede Tabelle enthält nur C- und L-Einträge.', 'Auf allen drei Routern statische Routen zu den entfernten LANs anlegen. R2 braucht ebenfalls beide LANs.', 'Auf R1 und R3 eine Backup-Route über den Direktlink mit AD 200 ergänzen. Mit einem Loopback auf R3 (203.0.113.1) das Internet simulieren und auf R1 eine Default Route setzen.', 'Von PC-A zu PC-C tracert ausführen, dann R1 G0/0/0 per shutdown abschalten und beobachten, wie die Backup-Route in der Tabelle erscheint und der Ping weiterläuft.'],
      ['Connect R1 G0/0/0 to R2 G0/0/0 (10.0.12.0/30), R2 G0/0/1 to R3 G0/0/1 (10.0.23.0/30) and for the backup path R1 G0/0/2 directly to R3 G0/0/2 (10.0.13.0/30). LAN A on R1 G0/0/1 = 192.168.10.0/24, LAN C on R3 G0/0/0 = 192.168.30.0/24.', 'Configure all addresses and check with show ip interface brief that everything is up/up. Note that each table only has C and L entries.', 'On all three routers add static routes to the remote LANs. R2 needs both LANs too.', 'On R1 and R3 add a backup route over the direct link with AD 200. Simulate the internet with a loopback on R3 (203.0.113.1) and add a default route on R1.', 'Run tracert from PC-A to PC-C, then shutdown R1 G0/0/0 and watch the backup route appear in the table while the ping keeps working.']
    ],
    code: R`! ===== R1 =====
configure terminal
interface g0/0/0
 ip address 10.0.12.1 255.255.255.252
 no shutdown
interface g0/0/1
 ip address 192.168.10.1 255.255.255.0
 no shutdown
interface g0/0/2
 description Backup-Link zu R3
 ip address 10.0.13.1 255.255.255.252
 no shutdown
 exit
ip route 192.168.30.0 255.255.255.0 10.0.12.2
ip route 192.168.30.0 255.255.255.0 10.0.13.2 200
ip route 0.0.0.0 0.0.0.0 10.0.12.2
ip route 0.0.0.0 0.0.0.0 10.0.13.2 200
end

! ===== R2 =====
configure terminal
interface g0/0/0
 ip address 10.0.12.2 255.255.255.252
 no shutdown
interface g0/0/1
 ip address 10.0.23.1 255.255.255.252
 no shutdown
 exit
ip route 192.168.10.0 255.255.255.0 10.0.12.1
ip route 192.168.30.0 255.255.255.0 10.0.23.2
ip route 0.0.0.0 0.0.0.0 10.0.23.2
end

! ===== R3 =====
configure terminal
interface g0/0/0
 ip address 192.168.30.1 255.255.255.0
 no shutdown
interface g0/0/1
 ip address 10.0.23.2 255.255.255.252
 no shutdown
interface g0/0/2
 ip address 10.0.13.2 255.255.255.252
 no shutdown
interface loopback0
 description Simuliertes Internet
 ip address 203.0.113.1 255.255.255.255
 exit
ip route 192.168.10.0 255.255.255.0 10.0.23.1
ip route 192.168.10.0 255.255.255.0 10.0.13.1 200
end

! ===== Pruefen =====
show ip route
show ip route static
show ip route 192.168.30.10
traceroute 192.168.30.10
! Ausfall testen (auf R1):
! interface g0/0/0
!  shutdown`,
    checks: [
      ['PC-A به PC-C و به 203.0.113.1 پینگ می‌زند.', 'show ip route روی R1 مسیر 192.168.30.0/24 را با [1/0] از طریق 10.0.12.2 نشان می‌دهد، نه از طریق مسیر پشتیبان.', 'بعد از shutdown روی R1 G0/0/0 مسیر با [200/0] از طریق 10.0.13.2 ظاهر می‌شود و پینگ بعد از چند ثانیه ادامه دارد.', 'بعد از no shutdown مسیر اصلی خودکار برمی‌گردد و می‌توانی توضیح بدهی چرا.'],
      ['PC-A pingt PC-C und 203.0.113.1.', 'show ip route auf R1 zeigt 192.168.30.0/24 mit [1/0] über 10.0.12.2, nicht über die Backup-Route.', 'Nach shutdown an R1 G0/0/0 erscheint die Route mit [200/0] über 10.0.13.2, der Ping läuft nach wenigen Sekunden weiter.', 'Nach no shutdown kehrt die Hauptroute automatisch zurück und du kannst erklären, warum.'],
      ['PC-A pings PC-C and 203.0.113.1.', 'show ip route on R1 shows 192.168.30.0/24 with [1/0] via 10.0.12.2, not via the backup route.', 'After shutdown on R1 G0/0/0 the route with [200/0] via 10.0.13.2 appears and the ping continues after a few seconds.', 'After no shutdown the primary route returns automatically and you can explain why.']
    ]
  },
  trouble: [
    [['پینگ از PC-A به PC-C با Request timed out شکست می‌خورد اما traceroute تا R3 می‌رسد.', 'Ping von PC-A zu PC-C scheitert mit Request timed out, tracert kommt aber bis R3.', 'Ping from PC-A to PC-C fails with Request timed out, but tracert reaches R3.'],
     ['مسیر رفت درست است و مسیر برگشت کم است. روی R3 و R2 show ip route 192.168.10.0 را بزن. همچنین Gateway روی PC-C و فایروال ویندوز (ICMP) را بررسی کن.', 'Der Hinweg stimmt, der Rückweg fehlt. Auf R3 und R2 show ip route 192.168.10.0 ausführen. Außerdem Gateway auf PC-C und die Windows-Firewall (ICMP) prüfen.', 'The forward path is fine and the return path is missing. Run show ip route 192.168.10.0 on R3 and R2. Also check the gateway on PC-C and the Windows firewall (ICMP).']],
    [['پیام Destination host unreachable از خود روتر.', 'Meldung Destination host unreachable vom Router selbst.', 'Message Destination host unreachable from the router itself.'],
     ['روتر هیچ مسیری به آن مقصد ندارد (نه مسیر خاص، نه پیش‌فرض). show ip route مقصد را بزن؛ اگر «Network not in table» است مسیر یا مسیر پیش‌فرض را اضافه کن.', 'Der Router hat keine Route zum Ziel (weder spezifisch noch Default). show ip route Ziel ausführen; bei „Network not in table“ Route oder Default Route ergänzen.', 'The router has no route to the destination (neither specific nor default). Run show ip route destination; on “Network not in table” add a route or default route.']],
    [['مسیر ثابت در کانفیگ هست اما در جدول دیده نمی‌شود.', 'Statische Route steht in der Konfiguration, erscheint aber nicht in der Tabelle.', 'Static route is in the configuration but not in the table.'],
     ['Next-Hop قابل دسترس نیست: اینترفیس به سمت آن down است یا Next-Hop در هیچ شبکهٔ متصل نیست (غلط تایپی یا ماسک اشتباه). show ip interface brief و ping به Next-Hop.', 'Der Next-Hop ist nicht erreichbar: Die Schnittstelle dorthin ist down oder der Next-Hop liegt in keinem verbundenen Netz (Tippfehler oder falsche Maske). show ip interface brief und ping zum Next-Hop.', 'The next-hop is unreachable: the interface toward it is down or the next-hop is in no connected network (typo or wrong mask). show ip interface brief and ping the next-hop.']],
    [['ISP قطع است اما ترافیک همچنان به لینک اصلی می‌رود و مسیر پشتیبان فعال نمی‌شود.', 'Der Provider ist ausgefallen, der Verkehr geht aber weiter auf die Hauptleitung, die Backup-Route wird nicht aktiv.', 'The ISP is down, but traffic still goes to the primary link and the backup route never activates.'],
     ['اینترفیس محلی up است (مثلاً به مودم وصل است) پس مسیر ثابت حذف نمی‌شود. با IP SLA یک آدرس پشت ISP را پینگ کن و مسیر اصلی را با track به نتیجه وابسته کن، یا از مسیریابی پویا استفاده کن.', 'Die lokale Schnittstelle bleibt up (z. B. am Modem), also verschwindet die statische Route nicht. Per IP SLA eine Adresse hinter dem Provider anpingen und die Hauptroute per track daran koppeln oder dynamisches Routing nutzen.', 'The local interface stays up (e.g. connected to a modem), so the static route never leaves. Use IP SLA to ping an address behind the ISP and tie the primary route to it with track, or use dynamic routing.']]
  ],
  decide: [
    [['مسیر ثابت یا پروتکل مسیریابی؟', 'Statisch oder Routingprotokoll?', 'Static or a routing protocol?'],
     ['مسیر ثابت: شعبهٔ کوچک با یک خروجی، مسیر پیش‌فرض به ISP، ارتباط با شبکهٔ شریک. پروتکل پویا (مثلاً OSPF): از حدود چهار روتر یا وقتی مسیر جایگزین باید خودکار و بدون IP SLA کار کند.', 'Statisch: kleine Filiale mit einem Ausgang, Default Route zum Provider, Anbindung an Partnernetze. Dynamisch (z. B. OSPF): ab etwa vier Routern oder wenn Ausweichwege automatisch und ohne IP SLA greifen sollen.', 'Static: small branch with one exit, default route to the ISP, connections to partner networks. Dynamic (e.g. OSPF): from about four routers or when alternate paths must switch automatically without IP SLA.']],
    [['برای لینک بین دو روتر /30 یا /31؟', 'Für Router-zu-Router-Links /30 oder /31?', '/30 or /31 for router-to-router links?'],
     ['/30 همه‌جا پشتیبانی می‌شود و برای یادگیری و آزمون روشن است. /31 (RFC 3021) نصف آدرس مصرف می‌کند و روی IOSهای جدید پشتیبانی می‌شود؛ در شبکه‌های بزرگ رایج است. مهم این است که یک طرح ثابت داشته باشی و مستند کنی.', '/30 wird überall unterstützt und ist für Lernen und Prüfung eindeutig. /31 (RFC 3021) spart die Hälfte und wird von aktuellen IOS-Versionen unterstützt, in großen Netzen üblich. Wichtig ist ein einheitliches, dokumentiertes Schema.', '/30 is supported everywhere and clear for learning and exams. /31 (RFC 3021) uses half the addresses and is supported on current IOS, common in large networks. What matters is one consistent, documented scheme.']]
  ],
  pitfalls: [
    ['فقط مسیر رفت را ساختن و مسیر برگشت را فراموش کردن.', 'Nur den Hinweg konfigurieren und den Rückweg vergessen.', 'Configuring only the forward path and forgetting the return path.'],
    ['مسیر ثابت فقط با اینترفیس خروجی روی اترنت.', 'Statische Route nur mit Ausgangsschnittstelle auf Ethernet.', 'Static route with only the exit interface on Ethernet.'],
    ['اعتماد به Floating Static برای خرابی‌هایی که اینترفیس محلی را down نمی‌کنند.', 'Sich bei Ausfällen, die die lokale Schnittstelle nicht down setzen, auf eine Floating Static Route verlassen.', 'Relying on a floating static route for failures that don’t bring the local interface down.']
  ],
  iv: [
    [['روتر چطور بین دو مسیر به یک مقصد انتخاب می‌کند؟', 'Wie wählt ein Router zwischen zwei Routen zum selben Ziel?', 'How does a router choose between two routes to the same destination?'],
     ['اول طولانی‌ترین پیشوند. اگر پیشوند دقیقاً یکی است، کمترین Administrative Distance. اگر هر دو از یک پروتکل‌اند، کمترین Metric؛ و در تساوی Metric پخش بار بین مسیرها (ECMP).', 'Zuerst der längste Präfix. Bei exakt gleichem Präfix die kleinste Administrative Distance. Kommen beide aus demselben Protokoll, die kleinste Metrik; bei gleicher Metrik Lastverteilung (ECMP).', 'First the longest prefix. For an identical prefix the lowest administrative distance. If both come from the same protocol the lowest metric; with equal metrics load sharing (ECMP).']],
    [['Floating Static Route چیست؟', 'Was ist eine Floating Static Route?', 'What is a floating static route?'],
     ['مسیر ثابتی با AD بالاتر از مسیر اصلی که در حالت عادی در جدول نیست و فقط وقتی مسیر اصلی حذف شود جایگزین می‌شود؛ مثلاً لینک LTE پشتیبان.', 'Eine statische Route mit höherer AD als die Hauptroute; sie steht normal nicht in der Tabelle und springt erst ein, wenn die Hauptroute verschwindet – etwa für einen LTE-Backup-Link.', 'A static route with a higher AD than the primary; normally not in the table, it only takes over when the primary route disappears – for example an LTE backup link.']],
    [['کاربر می‌گوید سرور در شبکهٔ دیگر در دسترس نیست. چطور پیش می‌روی؟', 'Ein Benutzer erreicht einen Server in einem anderen Netz nicht. Wie gehst du vor?', 'A user cannot reach a server in another network. How do you proceed?'],
     ['IP، ماسک و Gateway کاربر، پینگ به Gateway، traceroute به سرور تا جایی که قطع می‌شود، روی آن روتر show ip route مقصد و بعد مسیر برگشت از سمت سرور. در آخر فایروال یا ACL.', 'IP, Maske und Gateway des Benutzers, Ping zum Gateway, traceroute zum Server bis zum Abbruch, auf diesem Router show ip route Ziel, dann den Rückweg von der Serverseite. Zuletzt Firewall oder ACL.', 'User IP, mask and gateway, ping the gateway, traceroute to the server until it stops, show ip route destination on that router, then the return path from the server side. Finally firewall or ACL.']]
  ],
  sources: [
    ['Cisco – Understand Administrative Distance', 'https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html'],
    ['RFC 1812 – Requirements for IP Version 4 Routers', 'https://www.rfc-editor.org/rfc/rfc1812'],
    ['RFC 3021 – Using 31-Bit Prefixes on IPv4 Point-to-Point Links', 'https://www.rfc-editor.org/rfc/rfc3021']
  ]
},

{
  id: 'ccna-ospf', part: 2,
  title: ['OSPFv2 تک‌ناحیه‌ای: همسایگی، هزینه، DR/BDR و عیب‌یابی', 'OSPFv2 Single-Area: Nachbarschaften, Kosten, DR/BDR und Fehlersuche', 'Single-area OSPFv2: neighbors, cost, DR/BDR and troubleshooting'],
  goal: ['مسیرهای ثابت را با OSPF جایگزین کنی، همسایگی‌ها را برقرار و بررسی کنی، با هزینه مسیر را عمداً تغییر دهی، مسیر پیش‌فرض را از طریق OSPF پخش کنی و دلایل رایج برقرار نشدن همسایگی را پیدا کنی.', 'Du ersetzt die statischen Routen durch OSPF, baust Nachbarschaften auf und prüfst sie, lenkst Wege gezielt über die Kosten, verteilst die Default Route per OSPF und findest die typischen Gründe für fehlende Nachbarschaften.', 'You replace the static routes with OSPF, build and verify neighbor relationships, steer paths deliberately with cost, distribute the default route via OSPF and find the typical reasons neighbors don’t form.'],
  why: ['OSPF رایج‌ترین پروتکل مسیریابی داخلی در شرکت‌ها و در محور آزمون CCNA است. بیشتر خطاها به چند علت محدود برمی‌گردد: ناحیه، زیرشبکه، تایمر، احراز هویت، MTU یا passive-interface اشتباه.', 'OSPF ist das verbreitetste interne Routingprotokoll in Unternehmen und Schwerpunkt der CCNA-Prüfung. Die meisten Fehler haben wenige Ursachen: Area, Subnetz, Timer, Authentifizierung, MTU oder falsches passive-interface.', 'OSPF is the most common internal routing protocol in companies and a focus of the CCNA exam. Most faults come down to a few causes: area, subnet, timers, authentication, MTU or a wrong passive-interface.'],
  know: [
    ['OSPF یک پروتکل Link-State است: هر روتر وضعیت لینک‌هایش را با LSA به همه می‌دهد، همه یک نقشهٔ یکسان (LSDB) دارند و هر روتر با الگوریتم Dijkstra (SPF) کوتاه‌ترین مسیر را خودش حساب می‌کند. AD آن 110 است.', 'OSPF ist ein Link-State-Protokoll: Jeder Router verteilt den Zustand seiner Links per LSA, alle haben dieselbe Karte (LSDB), und jeder Router berechnet mit Dijkstra (SPF) selbst die kürzesten Wege. Die AD ist 110.', 'OSPF is a link-state protocol: each router floods the state of its links in LSAs, all share the same map (LSDB), and each router computes shortest paths itself with Dijkstra (SPF). Its AD is 110.'],
    ['Router ID شناسهٔ ۳۲ بیتی روتر است: اول router-id دستی، بعد بالاترین آدرس Loopback، بعد بالاترین آدرس اینترفیس فعال. همیشه دستی تعیین کن؛ تغییر آن فقط بعد از clear ip ospf process اعمال می‌شود. دو روتر با Router ID یکسان همسایه نمی‌شوند.', 'Die Router-ID ist die 32-Bit-Kennung: zuerst manuelle router-id, dann höchste Loopback-Adresse, dann höchste aktive Schnittstellenadresse. Immer manuell setzen; eine Änderung greift erst nach clear ip ospf process. Zwei Router mit gleicher ID werden keine Nachbarn.', 'The router ID is the 32-bit identifier: first a manual router-id, then the highest loopback address, then the highest active interface address. Always set it manually; a change only applies after clear ip ospf process. Two routers with the same ID never become neighbors.'],
    ['شرط‌های همسایگی: ناحیهٔ یکسان، زیرشبکه و ماسک یکسان، تایمر Hello/Dead یکسان (پیش‌فرض اترنت ۱۰ و ۴۰ ثانیه)، احراز هویت یکسان، Router ID متفاوت، و اینترفیس غیرPassive. MTU متفاوت همسایگی را در حالت EXSTART/EXCHANGE نگه می‌دارد.', 'Bedingungen für Nachbarschaft: gleiche Area, gleiches Subnetz und gleiche Maske, gleiche Hello/Dead-Timer (Ethernet-Standard 10 und 40 Sekunden), gleiche Authentifizierung, unterschiedliche Router-ID und keine passive Schnittstelle. Unterschiedliche MTU hält die Nachbarschaft in EXSTART/EXCHANGE fest.', 'Neighbor requirements: same area, same subnet and mask, same hello/dead timers (Ethernet default 10 and 40 seconds), same authentication, different router IDs and a non-passive interface. An MTU mismatch keeps the adjacency stuck in EXSTART/EXCHANGE.'],
    ['هزینه = پهنای باند مرجع تقسیم بر پهنای باند اینترفیس. مرجع پیش‌فرض 100 Mbit/s است، پس FastEthernet، گیگابیت و ۱۰ گیگ همه هزینهٔ ۱ دارند. روی همهٔ روترها auto-cost reference-bandwidth 100000 (۱۰۰ گیگ) بزن یا هزینه را با ip ospf cost روی اینترفیس تعیین کن.', 'Kosten = Referenzbandbreite geteilt durch Schnittstellenbandbreite. Standardreferenz ist 100 Mbit/s, also haben FastEthernet, Gigabit und 10 Gigabit alle Kosten 1. Auf allen Routern auto-cost reference-bandwidth 100000 (100 Gbit/s) setzen oder Kosten mit ip ospf cost pro Schnittstelle festlegen.', 'Cost = reference bandwidth divided by interface bandwidth. The default reference is 100 Mbit/s, so FastEthernet, gigabit and 10 gigabit all cost 1. Set auto-cost reference-bandwidth 100000 (100 Gbit/s) on all routers or set cost per interface with ip ospf cost.'],
    ['در شبکه‌های Multi-Access مثل اترنت یک DR و یک BDR انتخاب می‌شوند (بالاترین Priority، بعد بالاترین Router ID) تا همه فقط با آن‌ها همسایگی کامل (FULL) داشته باشند؛ بین بقیه حالت 2WAY/DROTHER طبیعی است. انتخاب غیرپیش‌دستانه است. روی لینک دوطرفه بین دو روتر ip ospf network point-to-point انتخاب DR را حذف و همگرایی را سریع‌تر می‌کند.', 'Auf Multi-Access-Netzen wie Ethernet werden ein DR und ein BDR gewählt (höchste Priorität, dann höchste Router-ID), damit alle nur mit ihnen FULL-Nachbarschaften haben; dazwischen ist 2WAY/DROTHER normal. Die Wahl ist nicht präemptiv. Auf einem Link zwischen genau zwei Routern entfernt ip ospf network point-to-point die DR-Wahl und beschleunigt die Konvergenz.', 'On multi-access networks like Ethernet a DR and BDR are elected (highest priority, then highest router ID) so everyone only needs FULL adjacencies with them; 2WAY/DROTHER between the others is normal. The election is non-preemptive. On a link between exactly two routers, ip ospf network point-to-point removes the DR election and speeds convergence.'],
    ['پیکربندی: router ospf 1، router-id، و فعال کردن شبکه‌ها با network شبکه wildcard area 0 یا روی اینترفیس با ip ospf 1 area 0. passive-interface روی اینترفیس‌های LAN جلوی ارسال Hello به کاربران را می‌گیرد ولی شبکه را تبلیغ می‌کند. default-information originate مسیر پیش‌فرض موجود روتر مرزی را در OSPF پخش می‌کند.', 'Konfiguration: router ospf 1, router-id und Netze aktivieren mit network Netz Wildcard area 0 oder an der Schnittstelle mit ip ospf 1 area 0. passive-interface auf LAN-Schnittstellen verhindert Hellos zu Benutzern, kündigt das Netz aber weiter an. default-information originate verteilt die vorhandene Default Route des Randrouters per OSPF.', 'Configuration: router ospf 1, router-id and enabling networks with network address wildcard area 0 or per interface with ip ospf 1 area 0. passive-interface on LAN interfaces stops hellos toward users but still advertises the network. default-information originate distributes the edge router’s existing default route via OSPF.']
  ],
  lab: {
    vm: 'Packet Tracer: Topologie aus ccna-route (R1, R2, R3, Backup-Link R1–R3)', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['روی هر سه روتر همهٔ ip route ها را با no ip route … پاک کن، فقط مسیر پیش‌فرض R3 به سمت «اینترنت» بماند (یک Loopback برای ISP یا مسیر به Null0 برای آزمایش).', 'OSPF فرایند 1 را با Router ID ثابت (1.1.1.1، 2.2.2.2، 3.3.3.3) و پهنای باند مرجع 100000 روی هر سه روتر بساز.', 'همهٔ شبکه‌ها را در area 0 فعال کن و اینترفیس‌های LAN را passive کن. لینک‌های بین روترها را point-to-point کن.', 'روی R3 مسیر پیش‌فرض را با default-information originate پخش کن.', 'همسایگی‌ها و جدول را بررسی کن. بعد هزینهٔ لینک مستقیم R1–R3 را بالا ببر و ببین مسیر به R2 تغییر می‌کند.'],
      ['Auf allen drei Routern die ip route-Einträge mit no ip route … entfernen; nur die Default Route von R3 Richtung „Internet“ bleibt (Loopback als Provider oder für den Test Route nach Null0).', 'OSPF-Prozess 1 mit fester Router-ID (1.1.1.1, 2.2.2.2, 3.3.3.3) und Referenzbandbreite 100000 auf allen drei Routern anlegen.', 'Alle Netze in area 0 aktivieren, LAN-Schnittstellen passiv setzen, Router-zu-Router-Links als point-to-point.', 'Auf R3 die Default Route per default-information originate verteilen.', 'Nachbarschaften und Tabelle prüfen. Dann die Kosten des Direktlinks R1–R3 erhöhen und beobachten, wie der Weg über R2 wechselt.'],
      ['On all three routers remove the ip route entries with no ip route …; only R3’s default route toward the “internet” stays (a loopback as ISP or a route to Null0 for testing).', 'Create OSPF process 1 with fixed router IDs (1.1.1.1, 2.2.2.2, 3.3.3.3) and reference bandwidth 100000 on all three routers.', 'Enable all networks in area 0, make LAN interfaces passive and router-to-router links point-to-point.', 'On R3 distribute the default route with default-information originate.', 'Check neighbors and the table. Then raise the cost of the direct R1–R3 link and watch the path move via R2.']
    ],
    code: R`! ===== R1 =====
configure terminal
no ip route 192.168.30.0 255.255.255.0 10.0.12.2
no ip route 192.168.30.0 255.255.255.0 10.0.13.2 200
no ip route 0.0.0.0 0.0.0.0 10.0.12.2
no ip route 0.0.0.0 0.0.0.0 10.0.13.2 200
interface range g0/0/0 , g0/0/2
 ip ospf network point-to-point
 exit
router ospf 1
 router-id 1.1.1.1
 auto-cost reference-bandwidth 100000
 network 10.0.12.0 0.0.0.3 area 0
 network 10.0.13.0 0.0.0.3 area 0
 network 192.168.10.0 0.0.0.255 area 0
 passive-interface g0/0/1
end

! ===== R2 =====
configure terminal
no ip route 192.168.10.0 255.255.255.0 10.0.12.1
no ip route 192.168.30.0 255.255.255.0 10.0.23.2
no ip route 0.0.0.0 0.0.0.0 10.0.23.2
interface range g0/0/0 - 1
 ip ospf network point-to-point
 exit
router ospf 1
 router-id 2.2.2.2
 auto-cost reference-bandwidth 100000
 network 10.0.12.0 0.0.0.3 area 0
 network 10.0.23.0 0.0.0.3 area 0
end

! ===== R3 =====
configure terminal
no ip route 192.168.10.0 255.255.255.0 10.0.23.1
no ip route 192.168.10.0 255.255.255.0 10.0.13.1 200
ip route 0.0.0.0 0.0.0.0 Null0
interface range g0/0/1 - 2
 ip ospf network point-to-point
 exit
router ospf 1
 router-id 3.3.3.3
 auto-cost reference-bandwidth 100000
 network 10.0.23.0 0.0.0.3 area 0
 network 10.0.13.0 0.0.0.3 area 0
 network 192.168.30.0 0.0.0.255 area 0
 network 203.0.113.1 0.0.0.0 area 0
 passive-interface g0/0/0
 default-information originate
end
! Hinweis: Null0 dient nur als Labor-Default; im echten Netz zeigt sie zum Provider.

! ===== Pruefen =====
show ip ospf neighbor
show ip ospf interface brief
show ip protocols
show ip route ospf

! ===== Wegsteuerung (R1 und R3) =====
! interface g0/0/2
!  ip ospf cost 5000`,
    checks: [
      ['show ip ospf neighbor روی R1 دو همسایه با وضعیت FULL نشان می‌دهد.', 'روی R1 مسیر 192.168.30.0/24 با کد O و یک مسیر O*E2 0.0.0.0/0 دیده می‌شود.', 'با بالا بردن هزینهٔ لینک مستقیم، traceroute از PC-A مسیر را از طریق R2 نشان می‌دهد.', 'با show ip ospf interface brief نشان می‌دهی اینترفیس LAN پسیو است و همسایه‌ای ندارد.'],
      ['show ip ospf neighbor auf R1 zeigt zwei Nachbarn im Zustand FULL.', 'Auf R1 erscheint 192.168.30.0/24 mit Code O und eine Route O*E2 0.0.0.0/0.', 'Nach Erhöhen der Kosten des Direktlinks zeigt tracert von PC-A den Weg über R2.', 'Mit show ip ospf interface brief zeigst du, dass die LAN-Schnittstelle passiv ist und keine Nachbarn hat.'],
      ['show ip ospf neighbor on R1 shows two neighbors in state FULL.', 'On R1 192.168.30.0/24 appears with code O plus a route O*E2 0.0.0.0/0.', 'After raising the direct link cost, tracert from PC-A shows the path via R2.', 'With show ip ospf interface brief you show the LAN interface is passive and has no neighbors.']
    ]
  },
  trouble: [
    [['show ip ospf neighbor خالی است.', 'show ip ospf neighbor ist leer.', 'show ip ospf neighbor is empty.'],
     ['show ip ospf interface brief: آیا اینترفیس اصلاً در OSPF است (wildcard در network درست است؟) و passive نیست؟ بعد در show ip ospf interface g0/0/0 ناحیه، تایمرها و نوع شبکه را در دو طرف مقایسه کن و زیرشبکه و ماسک را بسنج.', 'show ip ospf interface brief: Ist die Schnittstelle überhaupt in OSPF (Wildcard im network-Befehl korrekt?) und nicht passiv? Dann in show ip ospf interface g0/0/0 Area, Timer und Netztyp beider Seiten vergleichen sowie Subnetz und Maske prüfen.', 'show ip ospf interface brief: is the interface in OSPF at all (is the wildcard in the network command right?) and not passive? Then compare area, timers and network type on both sides in show ip ospf interface g0/0/0 and check subnet and mask.']],
    [['همسایه در وضعیت EXSTART یا EXCHANGE گیر کرده است.', 'Nachbar hängt in EXSTART oder EXCHANGE.', 'Neighbor stuck in EXSTART or EXCHANGE.'],
     ['تقریباً همیشه MTU متفاوت است، مثلاً یک طرف ۱۵۰۰ و طرف دیگر Subinterface یا تونل با MTU کمتر. show interface را مقایسه و ip mtu را یکسان کن. ip ospf mtu-ignore فقط راه موقت است.', 'Fast immer unterschiedliche MTU, z. B. 1500 auf der einen Seite und Subschnittstelle oder Tunnel mit kleinerer MTU auf der anderen. show interface vergleichen und ip mtu angleichen. ip ospf mtu-ignore ist nur ein Notbehelf.', 'Almost always an MTU mismatch, e.g. 1500 on one side and a subinterface or tunnel with a smaller MTU on the other. Compare show interface and align ip mtu. ip ospf mtu-ignore is only a workaround.']],
    [['پیام OSPF-4-DUP_RTRID در لاگ.', 'Meldung OSPF-4-DUP_RTRID im Log.', 'Message OSPF-4-DUP_RTRID in the log.'],
     ['دو روتر Router ID یکسان دارند (اغلب بعد از کپی کردن کانفیگ). router-id را یکتا کن و clear ip ospf process را در زمان کم‌کار اجرا کن؛ همسایگی‌ها کوتاه قطع می‌شوند.', 'Zwei Router haben dieselbe Router-ID (oft nach kopierter Konfiguration). router-id eindeutig setzen und clear ip ospf process in einem ruhigen Moment ausführen – Nachbarschaften fallen kurz weg.', 'Two routers share a router ID (often after copying a config). Make router-id unique and run clear ip ospf process at a quiet time – adjacencies drop briefly.']],
    [['شبکهٔ LAN یک روتر در بقیهٔ روترها دیده نمی‌شود، با اینکه همسایگی FULL است.', 'Das LAN eines Routers fehlt bei den anderen, obwohl die Nachbarschaft FULL ist.', 'One router’s LAN is missing on the others even though the adjacency is FULL.'],
     ['شبکه با network یا ip ospf area فعال نشده یا اینترفیس LAN down است (مثلاً هیچ دستگاهی به سوئیچ وصل نیست). show ip protocols بخش Routing for Networks و show ip ospf interface brief را ببین.', 'Das Netz wurde nicht per network oder ip ospf area aktiviert oder die LAN-Schnittstelle ist down (z. B. nichts am Switch). show ip protocols, Abschnitt Routing for Networks, und show ip ospf interface brief prüfen.', 'The network was not enabled with network or ip ospf area, or the LAN interface is down (e.g. nothing connected to the switch). Check show ip protocols under Routing for Networks and show ip ospf interface brief.']]
  ],
  decide: [
    [['دستور network یا ip ospf area روی اینترفیس؟', 'network-Befehl oder ip ospf area an der Schnittstelle?', 'network command or ip ospf area on the interface?'],
     ['ip ospf روی اینترفیس صریح‌تر است و اشتباه wildcard ندارد؛ در کانفیگ اینترفیس همه‌چیز یک‌جا دیده می‌شود. network با wildcard در آزمون و شبکه‌های قدیمی رایج است. در یک شبکه یکی را انتخاب کن و ترکیب نکن.', 'ip ospf an der Schnittstelle ist eindeutiger und ohne Wildcard-Fehler; alles steht in der Schnittstellenkonfiguration. network mit Wildcard ist in Prüfungen und älteren Netzen üblich. Pro Netz eine Methode wählen, nicht mischen.', 'ip ospf on the interface is more explicit and avoids wildcard mistakes; everything sits in the interface config. network with a wildcard is common in exams and older networks. Pick one method per network, don’t mix.']],
    [['یک ناحیه یا چند ناحیه؟', 'Eine Area oder mehrere?', 'One area or several?'],
     ['تا چند ده روتر یک area 0 ساده و کافی است. چند ناحیه برای شبکه‌های بزرگ‌تر لازم است تا LSDB کوچک بماند و خلاصه‌سازی روی ABR انجام شود؛ همهٔ ناحیه‌ها باید به area 0 وصل باشند.', 'Bis zu einigen Dutzend Routern reicht eine area 0. Mehrere Areas lohnen sich in größeren Netzen, damit die LSDB klein bleibt und am ABR zusammengefasst wird; alle Areas müssen an area 0 hängen.', 'Up to a few dozen routers one area 0 is simple and sufficient. Multiple areas pay off in larger networks to keep the LSDB small and summarize at the ABR; every area must connect to area 0.']]
  ],
  pitfalls: [
    ['تغییر reference-bandwidth فقط روی بعضی روترها؛ هزینه‌ها ناسازگار می‌شوند.', 'reference-bandwidth nur auf einigen Routern ändern – die Kosten passen nicht mehr zusammen.', 'Changing reference-bandwidth on only some routers – costs no longer match.'],
    ['passive-interface default بدون no passive-interface روی لینک‌های بین روترها.', 'passive-interface default ohne no passive-interface auf den Router-Links.', 'passive-interface default without no passive-interface on the router links.'],
    ['wildcard اشتباه (مثلاً 255.255.255.0 به جای 0.0.0.255) در دستور network.', 'Falsche Wildcard (z. B. 255.255.255.0 statt 0.0.0.255) im network-Befehl.', 'A wrong wildcard (e.g. 255.255.255.0 instead of 0.0.0.255) in the network command.']
  ],
  iv: [
    [['چرا دو روتر OSPF همسایه نمی‌شوند؟ پنج علت بگو.', 'Warum werden zwei OSPF-Router keine Nachbarn? Nenne fünf Gründe.', 'Why don’t two OSPF routers become neighbors? Name five reasons.'],
     ['ناحیهٔ متفاوت، زیرشبکه یا ماسک متفاوت، تایمر Hello/Dead متفاوت، احراز هویت ناهماهنگ، Router ID تکراری، اینترفیس passive و برای وضعیت EXSTART اختلاف MTU.', 'Unterschiedliche Area, Subnetz oder Maske, Hello/Dead-Timer, nicht passende Authentifizierung, doppelte Router-ID, passive Schnittstelle, und bei EXSTART eine MTU-Abweichung.', 'Different area, subnet or mask, hello/dead timers, mismatched authentication, duplicate router ID, passive interface, and for EXSTART an MTU mismatch.']],
    [['چرا روی همه‌جا reference-bandwidth را عوض می‌کنی؟', 'Warum änderst du die reference-bandwidth überall?', 'Why change reference-bandwidth everywhere?'],
     ['با مرجع پیش‌فرض 100 Mbit/s همهٔ لینک‌های سریع هزینهٔ ۱ دارند و OSPF فرقی بین ۱ و ۱۰ گیگ نمی‌بیند. باید روی همهٔ روترها یکسان باشد.', 'Mit der Standardreferenz von 100 Mbit/s kosten alle schnellen Links 1, OSPF unterscheidet 1 und 10 Gbit/s nicht. Der Wert muss auf allen Routern gleich sein.', 'With the default 100 Mbit/s reference all fast links cost 1 and OSPF can’t tell 1 from 10 Gbit/s. The value must be identical on all routers.']],
    [['DR و BDR چیست و کجا وجود ندارد؟', 'Was sind DR und BDR und wo gibt es sie nicht?', 'What are DR and BDR and where do they not exist?'],
     ['در شبکه‌های Multi-Access یک روتر مرکزی و پشتیبانش هستند تا تعداد همسایگی‌های کامل و تبادل LSA کم شود. روی لینک point-to-point انتخاب DR انجام نمی‌شود.', 'Auf Multi-Access-Netzen sind sie zentraler Router und Stellvertreter, damit weniger FULL-Nachbarschaften und LSA-Austausch nötig sind. Auf point-to-point-Links gibt es keine DR-Wahl.', 'On multi-access networks they are the central router and its backup, reducing FULL adjacencies and LSA exchange. On point-to-point links there is no DR election.']]
  ],
  sources: [
    ['RFC 2328 – OSPF Version 2', 'https://www.rfc-editor.org/rfc/rfc2328'],
    ['Cisco – OSPF Design Guide', 'https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html']
  ]
},

{
  id: 'ccna-svc', part: 2,
  title: ['سرویس‌های شبکه روی IOS: DHCP و Relay، NAT/PAT، NTP، Syslog و CDP/LLDP', 'Netzdienste unter IOS: DHCP und Relay, NAT/PAT, NTP, Syslog und CDP/LLDP', 'Network services on IOS: DHCP and relay, NAT/PAT, NTP, syslog and CDP/LLDP'],
  goal: ['روی روتر DHCP راه‌اندازی کنی و درخواست‌های VLAN دیگر را به سرور مرکزی Relay کنی، دسترسی اینترنت را با PAT بدهی، زمان همهٔ دستگاه‌ها را با NTP یکسان کنی، لاگ‌ها را به سرور Syslog بفرستی و همسایه‌ها را با CDP و LLDP پیدا کنی.', 'Du richtest DHCP auf dem Router ein und leitest Anfragen anderer VLANs per Relay an einen zentralen Server, gibst Internetzugang per PAT, synchronisierst die Uhrzeit aller Geräte per NTP, schickst Logs an einen Syslog-Server und findest Nachbarn mit CDP und LLDP.', 'You set up DHCP on the router and relay requests from other VLANs to a central server, provide internet access with PAT, synchronize all device clocks with NTP, send logs to a syslog server and discover neighbors with CDP and LLDP.'],
  why: ['«اینترنت ندارم» و «آدرس IP نمی‌گیرم» از پرتکرارترین تیکت‌ها هستند و اغلب به DHCP Relay، استخر پر یا NAT برمی‌گردند. بدون زمان درست، لاگ‌ها و گواهی‌ها بی‌ارزش‌اند و Kerberos در دامنه شکست می‌خورد.', '„Kein Internet“ und „Ich bekomme keine IP-Adresse“ gehören zu den häufigsten Tickets und liegen oft an DHCP-Relay, vollem Pool oder NAT. Ohne korrekte Uhrzeit sind Logs und Zertifikate wertlos, und Kerberos in der Domäne scheitert.', '“No internet” and “I don’t get an IP address” are among the most frequent tickets and often trace back to DHCP relay, a full pool or NAT. Without correct time, logs and certificates are worthless and Kerberos in the domain fails.'],
  know: [
    ['DHCP با چهار پیام DORA کار می‌کند: Discover (Broadcast از کلاینت)، Offer، Request و Ack. روی IOS: ip dhcp excluded-address برای آدرس‌های ثابت (Gateway، پرینتر، سرور)، بعد ip dhcp pool با network، default-router، dns-server و domain-name. بررسی با show ip dhcp binding و show ip dhcp pool.', 'DHCP arbeitet mit DORA: Discover (Broadcast vom Client), Offer, Request, Ack. Unter IOS: ip dhcp excluded-address für feste Adressen (Gateway, Drucker, Server), dann ip dhcp pool mit network, default-router, dns-server und domain-name. Prüfen mit show ip dhcp binding und show ip dhcp pool.', 'DHCP works with DORA: Discover (broadcast from the client), Offer, Request, Ack. On IOS: ip dhcp excluded-address for static addresses (gateway, printers, servers), then ip dhcp pool with network, default-router, dns-server and domain-name. Verify with show ip dhcp binding and show ip dhcp pool.'],
    ['Broadcast از روتر عبور نمی‌کند. وقتی سرور DHCP (مثلاً Windows Server) در VLAN دیگری است، روی Gateway همان VLAN کلاینت ip helper-address آدرس-سرور بزن. روتر درخواست را Unicast می‌کند و آدرس Gateway را در فیلد giaddr می‌گذارد تا سرور از Scope درست آدرس بدهد.', 'Broadcasts passieren keinen Router. Steht der DHCP-Server (z. B. Windows Server) in einem anderen VLAN, auf dem Gateway des Client-VLANs ip helper-address Serveradresse setzen. Der Router leitet per Unicast weiter und trägt seine Gateway-Adresse in giaddr ein, damit der Server aus dem richtigen Bereich vergibt.', 'Broadcasts don’t cross routers. If the DHCP server (e.g. Windows Server) is in another VLAN, set ip helper-address server-address on the gateway of the client VLAN. The router forwards by unicast and puts its gateway address into giaddr so the server assigns from the right scope.'],
    ['NAT آدرس خصوصی (RFC 1918: 10/8، 172.16/12، 192.168/16) را به آدرس عمومی ترجمه می‌کند. PAT یا NAT Overload همهٔ کلاینت‌ها را پشت یک آدرس عمومی با شمارهٔ پورت جدا می‌برد: ACL برای آدرس‌های داخلی، ip nat inside و ip nat outside روی اینترفیس‌ها و ip nat inside source list … interface … overload. Static NAT برای سروری که از بیرون باید در دسترس باشد.', 'NAT übersetzt private Adressen (RFC 1918: 10/8, 172.16/12, 192.168/16) in öffentliche. PAT bzw. NAT Overload bringt alle Clients über eine öffentliche Adresse mit getrennten Portnummern ins Internet: ACL für die internen Adressen, ip nat inside und ip nat outside an den Schnittstellen und ip nat inside source list … interface … overload. Static NAT für Server, die von außen erreichbar sein müssen.', 'NAT translates private addresses (RFC 1918: 10/8, 172.16/12, 192.168/16) into public ones. PAT or NAT overload puts all clients behind one public address with separate port numbers: an ACL for the inside addresses, ip nat inside and ip nat outside on the interfaces, and ip nat inside source list … interface … overload. Static NAT for servers that must be reachable from outside.'],
    ['NTP همهٔ دستگاه‌ها را با یک منبع زمان هماهنگ می‌کند: ntp server آدرس، clock timezone CET 1 و clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00 برای آلمان و اتریش. وضعیت را با show ntp status و show ntp associations بررسی کن؛ همگام شدن چند دقیقه طول می‌کشد.', 'NTP gleicht alle Geräte mit einer Zeitquelle ab: ntp server Adresse, clock timezone CET 1 und clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00 für Deutschland und Österreich. Zustand mit show ntp status und show ntp associations prüfen; die Synchronisierung dauert einige Minuten.', 'NTP aligns all devices with one time source: ntp server address, clock timezone CET 1 and clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00 for Germany and Austria. Check with show ntp status and show ntp associations; synchronization takes a few minutes.'],
    ['سطوح Syslog از ۰ تا ۷: 0 Emergency، 1 Alert، 2 Critical، 3 Error، 4 Warning، 5 Notification، 6 Informational و 7 Debugging. logging host آدرس و logging trap 5 (یا warnings) سطح ۰ تا آن عدد را به سرور می‌فرستد. با service timestamps log datetime msec localtime هر پیام زمان دقیق دارد.', 'Syslog-Stufen 0 bis 7: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notification, 6 Informational, 7 Debugging. logging host Adresse und logging trap 5 (oder warnings) senden die Stufen 0 bis zu diesem Wert an den Server. Mit service timestamps log datetime msec localtime trägt jede Meldung einen genauen Zeitstempel.', 'Syslog levels 0 to 7: 0 emergency, 1 alert, 2 critical, 3 error, 4 warning, 5 notification, 6 informational, 7 debugging. logging host address and logging trap 5 (or warnings) send levels 0 up to that value to the server. service timestamps log datetime msec localtime gives every message an exact timestamp.'],
    ['CDP (مخصوص Cisco) و LLDP (استاندارد IEEE 802.1AB) همسایهٔ مستقیم را با نام، مدل، پورت و آدرس مدیریتی نشان می‌دهند: show cdp neighbors detail و show lldp neighbors. برای مستندسازی و یافتن پورت عالی‌اند، اما روی پورت‌های رو به اینترنت یا مهمان خاموششان کن چون اطلاعات دستگاه را لو می‌دهند.', 'CDP (Cisco-eigen) und LLDP (Standard IEEE 802.1AB) zeigen direkte Nachbarn mit Name, Modell, Port und Management-Adresse: show cdp neighbors detail und show lldp neighbors. Ideal für Dokumentation und Portsuche, an Internet- oder Gastports aber abschalten, weil sie Geräteinformationen preisgeben.', 'CDP (Cisco-specific) and LLDP (standard IEEE 802.1AB) show directly connected neighbors with name, model, port and management address: show cdp neighbors detail and show lldp neighbors. Great for documentation and finding ports, but turn them off on internet or guest ports because they reveal device details.']
  ],
  lab: {
    vm: 'Packet Tracer: R1 (Router-on-a-Stick aus ccna-vlan), SRV1 (Server-PT 192.168.10.10), R3 als Provider-Seite', shell: 'Cisco IOS (CLI-Tab)',
    steps: [
      ['روی R1 برای VLAN 10 یک استخر DHCP بساز و آدرس‌های ۱ تا ۲۰ را مستثنا کن. PC10 را روی DHCP بگذار و آدرس گرفتن را بررسی کن.', 'روی SRV1 سرویس DHCP را با استخر 192.168.20.0/24 و Gateway 192.168.20.1 فعال کن و روی R1 G0/0/1.20 دستور ip helper-address 192.168.10.10 بزن. PC20 باید از سرور آدرس بگیرد.', 'لینک R1 G0/0/0 به سمت ISP را outside و ساب‌اینترفیس‌ها را inside کن و PAT را برای 192.168.0.0/16 فعال کن.', 'روی SRV1 سرویس‌های NTP و Syslog را روشن کن. روی R1 و SW1 منطقهٔ زمانی، NTP و ارسال لاگ را تنظیم کن.', 'با show cdp neighbors و show lldp neighbors همسایه‌ها را مستند کن و CDP را روی اینترفیس رو به ISP خاموش کن.'],
      ['Auf R1 einen DHCP-Pool für VLAN 10 anlegen, Adressen .1 bis .20 ausschließen. PC10 auf DHCP stellen und die Adressvergabe prüfen.', 'Auf SRV1 den DHCP-Dienst mit Pool 192.168.20.0/24 und Gateway 192.168.20.1 aktivieren, auf R1 G0/0/1.20 ip helper-address 192.168.10.10 setzen. PC20 muss seine Adresse vom Server bekommen.', 'R1 G0/0/0 Richtung Provider als outside, Subschnittstellen als inside markieren und PAT für 192.168.0.0/16 aktivieren.', 'Auf SRV1 die Dienste NTP und Syslog einschalten. Auf R1 und SW1 Zeitzone, NTP und Logweiterleitung einrichten.', 'Mit show cdp neighbors und show lldp neighbors die Nachbarn dokumentieren und CDP auf der Provider-Schnittstelle abschalten.'],
      ['On R1 create a DHCP pool for VLAN 10 and exclude addresses .1 to .20. Set PC10 to DHCP and check the lease.', 'On SRV1 enable the DHCP service with pool 192.168.20.0/24 and gateway 192.168.20.1, and on R1 G0/0/1.20 set ip helper-address 192.168.10.10. PC20 must get its address from the server.', 'Mark R1 G0/0/0 toward the ISP as outside and the subinterfaces as inside, and enable PAT for 192.168.0.0/16.', 'On SRV1 turn on the NTP and syslog services. On R1 and SW1 configure time zone, NTP and log forwarding.', 'Document neighbors with show cdp neighbors and show lldp neighbors, and turn CDP off on the ISP-facing interface.']
    ],
    code: R`! ===== R1: DHCP fuer VLAN 10 =====
configure terminal
ip dhcp excluded-address 192.168.10.1 192.168.10.20
ip dhcp pool VLAN10
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 192.168.10.10
 domain-name lab.local
 exit

! ===== R1: DHCP-Relay fuer VLAN 20 =====
interface g0/0/1.20
 ip helper-address 192.168.10.10
 exit

! ===== R1: PAT ins Internet =====
ip access-list standard NAT-INNEN
 permit 192.168.0.0 0.0.255.255
 exit
interface g0/0/0
 ip address 203.0.113.2 255.255.255.252
 ip nat outside
 no cdp enable
 no shutdown
interface g0/0/1.10
 ip nat inside
interface g0/0/1.20
 ip nat inside
 exit
ip nat inside source list NAT-INNEN interface g0/0/0 overload
ip route 0.0.0.0 0.0.0.0 203.0.113.1

! ===== R1 und SW1: Zeit und Logging =====
clock timezone CET 1
clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00
ntp server 192.168.10.10
service timestamps log datetime msec localtime
logging host 192.168.10.10
logging trap warnings
lldp run
end

! ===== Pruefen =====
show ip dhcp binding
show ip dhcp pool
show ip nat translations
show ip nat statistics
show ntp status
show logging
show cdp neighbors detail
show lldp neighbors`,
    checks: [
      ['PC10 آدرسی از ۲۱ به بعد از R1 و PC20 آدرسی از SRV1 می‌گیرد و هر دو Gateway درست دارند.', 'بعد از پینگ از PC10 به 203.0.113.1، در show ip nat translations ترجمه با آدرس 203.0.113.2 و شمارهٔ پورت دیده می‌شود.', 'show ntp status وضعیت synchronized نشان می‌دهد و show clock زمان محلی درست است.', 'shutdown و no shutdown روی یک اینترفیس در لاگ‌های SRV1 با زمان دقیق ظاهر می‌شود.'],
      ['PC10 erhält eine Adresse ab .21 von R1, PC20 eine Adresse von SRV1, beide mit korrektem Gateway.', 'Nach Ping von PC10 zu 203.0.113.1 zeigt show ip nat translations eine Übersetzung auf 203.0.113.2 mit Portnummer.', 'show ntp status zeigt synchronized und show clock die richtige Ortszeit.', 'shutdown und no shutdown einer Schnittstelle erscheinen mit genauem Zeitstempel im Log von SRV1.'],
      ['PC10 gets an address from .21 upward from R1, PC20 an address from SRV1, both with the right gateway.', 'After pinging 203.0.113.1 from PC10, show ip nat translations shows a translation to 203.0.113.2 with a port number.', 'show ntp status shows synchronized and show clock the right local time.', 'shutdown and no shutdown on an interface appear with an exact timestamp in the SRV1 log.']
    ]
  },
  trouble: [
    [['کلاینت آدرس 169.254.x.x (APIPA) می‌گیرد.', 'Client bekommt eine Adresse 169.254.x.x (APIPA).', 'Client gets a 169.254.x.x address (APIPA).'],
     ['هیچ Offer نرسیده است. در VLAN کلاینت: ip helper-address روی Gateway درست است؟ سرور یا Scope برای آن شبکه فعال است و پر نشده (show ip dhcp pool)؟ پورت در VLAN درست است؟ اگر DHCP Snooping فعال است Uplink باید trust باشد.', 'Es kam kein Offer an. Im Client-VLAN: Stimmt ip helper-address am Gateway? Ist Server bzw. Bereich für dieses Netz aktiv und nicht voll (show ip dhcp pool)? Ist der Port im richtigen VLAN? Bei aktivem DHCP Snooping muss der Uplink trust sein.', 'No offer arrived. In the client VLAN: is ip helper-address correct on the gateway? Is the server or scope for that network active and not full (show ip dhcp pool)? Is the port in the right VLAN? With DHCP snooping on, the uplink must be trusted.']],
    [['کلاینت‌ها شبکهٔ داخلی را می‌بینند اما اینترنت ندارند.', 'Clients erreichen das interne Netz, aber nicht das Internet.', 'Clients reach the internal network but not the internet.'],
     ['show ip nat translations خالی است؟ ip nat inside/outside روی اینترفیس درست نیست یا ACL شبکهٔ کلاینت را شامل نمی‌شود. اگر ترجمه هست، مسیر پیش‌فرض یا DNS را بررسی کن (پینگ به IP عمومی در برابر پینگ به نام).', 'Ist show ip nat translations leer? Dann stimmt ip nat inside/outside an den Schnittstellen nicht oder die ACL erfasst das Client-Netz nicht. Gibt es Übersetzungen, Default Route oder DNS prüfen (Ping auf öffentliche IP gegenüber Ping auf Namen).', 'Is show ip nat translations empty? Then ip nat inside/outside on the interfaces is wrong or the ACL doesn’t cover the client network. If translations exist, check the default route or DNS (ping a public IP versus ping a name).']],
    [['زمان روی سوئیچ‌ها هر کدام چیز دیگری است و لاگ‌ها قابل مقایسه نیستند.', 'Jeder Switch hat eine andere Uhrzeit, Logs lassen sich nicht vergleichen.', 'Every switch shows a different time and logs can’t be compared.'],
     ['show ntp associations: سرور قابل دسترسی است (ping) و UDP 123 در فایروال باز است؟ برای همگام شدن چند دقیقه صبر کن. منطقهٔ زمانی و تابستانی را روی همهٔ دستگاه‌ها یکسان کن.', 'show ntp associations: Ist der Server erreichbar (ping) und UDP 123 in der Firewall offen? Einige Minuten auf die Synchronisierung warten. Zeitzone und Sommerzeit auf allen Geräten gleich setzen.', 'show ntp associations: is the server reachable (ping) and UDP 123 open in the firewall? Wait a few minutes for sync. Set time zone and summer time identically on all devices.']],
    [['بعد از تغییر ACL مربوط به NAT، اتصال‌های قدیمی هنوز همان رفتار را دارند.', 'Nach Änderung der NAT-ACL verhalten sich bestehende Verbindungen wie vorher.', 'After changing the NAT ACL, existing connections behave as before.'],
     ['ترجمه‌های فعال در جدول می‌مانند تا Timeout شوند. با clear ip nat translation * پاک کن؛ در شبکهٔ واقعی این کار همهٔ اتصال‌های جاری را قطع می‌کند، پس در زمان مناسب.', 'Aktive Übersetzungen bleiben bis zum Timeout in der Tabelle. Mit clear ip nat translation * löschen – im echten Netz trennt das alle laufenden Verbindungen, also zu einem passenden Zeitpunkt.', 'Active translations stay in the table until they time out. Clear them with clear ip nat translation * – in a real network that drops all current connections, so do it at a suitable time.']]
  ],
  decide: [
    [['DHCP روی روتر یا روی Windows Server؟', 'DHCP auf dem Router oder auf Windows Server?', 'DHCP on the router or on Windows Server?'],
     ['دفتر کوچک یا شعبه بدون سرور: روتر یا فایروال کافی است. در شبکهٔ دامنه با DNS پویا، رزرو، Failover و گزارش: Windows Server یا یک سرور DHCP مرکزی، و روتر فقط Relay.', 'Kleines Büro oder Filiale ohne Server: Router oder Firewall reicht. Im Domänennetz mit dynamischem DNS, Reservierungen, Failover und Auswertung: Windows Server oder ein zentraler DHCP-Server, der Router macht nur Relay.', 'Small office or branch without a server: router or firewall is enough. In a domain network with dynamic DNS, reservations, failover and reporting: Windows Server or a central DHCP server, with the router only relaying.']],
    [['CDP یا LLDP؟', 'CDP oder LLDP?', 'CDP or LLDP?'],
     ['در محیط فقط Cisco، CDP اطلاعات بیشتری می‌دهد و پیش‌فرض روشن است. با تلفن، Access Point و سوئیچ سازندگان دیگر LLDP لازم است. هر دو را روی پورت‌های مهمان و اینترنت خاموش کن.', 'In reinen Cisco-Umgebungen liefert CDP mehr Details und ist standardmäßig aktiv. Mit Telefonen, Access Points und Switches anderer Hersteller braucht man LLDP. Beide an Gast- und Internetports abschalten.', 'In pure Cisco environments CDP gives more detail and is on by default. With phones, access points and other vendors’ switches you need LLDP. Turn both off on guest and internet ports.']]
  ],
  pitfalls: [
    ['فراموش کردن ip dhcp excluded-address و دادن آدرس Gateway یا پرینتر به کلاینت.', 'ip dhcp excluded-address vergessen und Gateway- oder Druckeradressen an Clients vergeben.', 'Forgetting ip dhcp excluded-address and handing the gateway or printer addresses to clients.'],
    ['ip helper-address روی اینترفیس سمت سرور به جای Gateway کلاینت.', 'ip helper-address auf der Serverseite statt am Client-Gateway.', 'Putting ip helper-address on the server side instead of the client gateway.'],
    ['logging trap debugging روی سرور Syslog و غرق شدن در پیام.', 'logging trap debugging an den Syslog-Server senden und in Meldungen ertrinken.', 'Sending logging trap debugging to the syslog server and drowning in messages.']
  ],
  iv: [
    [['DHCP Relay چطور کار می‌کند؟', 'Wie funktioniert DHCP-Relay?', 'How does DHCP relay work?'],
     ['Gateway کلاینت Broadcast DHCP را دریافت می‌کند و به آدرس ip helper-address به‌صورت Unicast می‌فرستد. آدرس خودش را در giaddr می‌گذارد تا سرور Scope درست را انتخاب کند و پاسخ را برمی‌گرداند.', 'Das Client-Gateway empfängt den DHCP-Broadcast und leitet ihn per Unicast an die ip helper-address weiter. Es trägt seine Adresse in giaddr ein, damit der Server den richtigen Bereich wählt, und reicht die Antwort zurück.', 'The client gateway receives the DHCP broadcast and forwards it by unicast to the ip helper-address. It puts its own address in giaddr so the server picks the right scope, and relays the reply back.']],
    [['فرق Static NAT و PAT چیست؟', 'Unterschied zwischen Static NAT und PAT?', 'Difference between static NAT and PAT?'],
     ['Static NAT یک آدرس داخلی را ثابت به یک آدرس عمومی وصل می‌کند و از بیرون هم قابل دسترسی است، برای سرور. PAT خیلی از کلاینت‌ها را با شمارهٔ پورت متفاوت پشت یک آدرس عمومی می‌برد؛ فقط ارتباطی که از داخل شروع شده برمی‌گردد.', 'Static NAT bindet eine interne Adresse fest an eine öffentliche und ist von außen erreichbar – für Server. PAT bringt viele Clients mit unterschiedlichen Ports hinter eine öffentliche Adresse; nur von innen begonnene Verbindungen kommen zurück.', 'Static NAT maps one inside address permanently to one public address and is reachable from outside – for servers. PAT puts many clients behind one public address with different ports; only connections started from inside come back.']],
    [['چرا NTP در شبکهٔ دامنه حیاتی است؟', 'Warum ist NTP im Domänennetz kritisch?', 'Why is NTP critical in a domain network?'],
     ['Kerberos به‌طور پیش‌فرض بیش از پنج دقیقه اختلاف زمان را نمی‌پذیرد و ورود شکست می‌خورد. لاگ‌ها برای تحلیل حادثه فقط با زمان یکسان قابل مقایسه‌اند و اعتبار گواهی‌ها هم به زمان بستگی دارد.', 'Kerberos akzeptiert standardmäßig höchstens fünf Minuten Zeitabweichung, sonst scheitert die Anmeldung. Logs sind nur mit gleicher Zeit für die Vorfallsanalyse vergleichbar, und auch die Gültigkeit von Zertifikaten hängt an der Uhr.', 'Kerberos by default tolerates at most five minutes of clock skew, otherwise logon fails. Logs are only comparable for incident analysis with consistent time, and certificate validity depends on the clock as well.']]
  ],
  sources: [
    ['RFC 2131 – Dynamic Host Configuration Protocol', 'https://www.rfc-editor.org/rfc/rfc2131'],
    ['RFC 3022 – Traditional IP Network Address Translator', 'https://www.rfc-editor.org/rfc/rfc3022'],
    ['RFC 5905 – Network Time Protocol Version 4', 'https://www.rfc-editor.org/rfc/rfc5905'],
    ['RFC 5424 – The Syslog Protocol', 'https://www.rfc-editor.org/rfc/rfc5424']
  ]
}

);
})();
