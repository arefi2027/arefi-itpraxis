/* Arefi ITPraxis – Werkzeugkasten, Teil 1: Netzwerk analysieren (Wireshark/tcpdump, iPerf3/mtr, Nmap). Eigene Inhalte. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKTools = window.ArefiKTools || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'tools-wireshark', part: 1,
  title: ['Wireshark و tcpdump: ضبط و خواندن ترافیک شبکه', 'Wireshark und tcpdump: Netzwerkverkehr mitschneiden und lesen', 'Wireshark and tcpdump: capture and read network traffic'],
  goal: ['ترافیک را هدفمند ضبط کنی (فیلتر ضبط)، با فیلتر نمایش مشکل را پیدا کنی (DHCP، DNS، دست‌دادن TCP، ارسال دوباره) و روی سرور لینوکس با tcpdump ضبط کنی و فایل را در Wireshark تحلیل کنی.', 'Du schneidest Verkehr gezielt mit (Capture-Filter), findest Probleme mit Anzeige-Filtern (DHCP, DNS, TCP-Handshake, Retransmissions) und zeichnest auf Linux-Servern mit tcpdump auf, um die Datei in Wireshark auszuwerten.', 'You capture traffic selectively (capture filters), find problems with display filters (DHCP, DNS, TCP handshake, retransmissions) and capture on Linux servers with tcpdump to analyse the file in Wireshark.'],
  why: ['وقتی Ping کار می‌کند ولی «برنامه گیر می‌کند»، فقط ضبط ترافیک نشان می‌دهد چه کسی جواب نمی‌دهد: کلاینت، DNS، سرور یا فایروال. Wireshark تقریباً در همهٔ آگهی‌های شغلی شبکه و پشتیبانی خواسته می‌شود.', 'Wenn Ping geht, aber „die Anwendung hängt“, zeigt nur der Mitschnitt, wer schweigt: Client, DNS, Server oder Firewall. Wireshark wird in fast jeder Netzwerk- und Support-Stellenanzeige verlangt.', 'When ping works but “the application hangs”, only a capture shows who stays silent: client, DNS, server or firewall. Wireshark is asked for in almost every network and support job advert.'],
  know: [
    ['فیلتر ضبط (BPF، قبل از شروع، مثل host 10.20.0.10 and port 53) حجم داده را کم می‌کند؛ فیلتر نمایش (بعد از ضبط، مثل dns، dhcp یا tcp.port == 443) فقط پنهان می‌کند. نحو آن‌ها فرق دارد: port 53 در برابر udp.port == 53.', 'Capture-Filter (BPF, vor dem Start, z. B. host 10.20.0.10 and port 53) verkleinern die Datenmenge; Anzeige-Filter (nach dem Mitschnitt, z. B. dns, dhcp oder tcp.port == 443) blenden nur aus. Die Syntax unterscheidet sich: port 53 gegenüber udp.port == 53.', 'Capture filters (BPF, set before starting, e.g. host 10.20.0.10 and port 53) reduce the amount of data; display filters (after capturing, e.g. dns, dhcp or tcp.port == 443) only hide packets. The syntax differs: port 53 versus udp.port == 53.'],
    ['فیلترهای نمایش مهم: ip.addr == 10.20.0.30، dns.flags.rcode != 0 (خطای DNS)، tcp.flags.syn == 1 && tcp.flags.ack == 0 (تلاش برای اتصال)، tcp.analysis.retransmission، tcp.flags.reset == 1، http.request و tls.handshake.type == 1 (Client Hello با نام سرور).', 'Wichtige Anzeige-Filter: ip.addr == 10.20.0.30, dns.flags.rcode != 0 (DNS-Fehler), tcp.flags.syn == 1 && tcp.flags.ack == 0 (Verbindungsversuche), tcp.analysis.retransmission, tcp.flags.reset == 1, http.request und tls.handshake.type == 1 (Client Hello mit Servername).', 'Important display filters: ip.addr == 10.20.0.30, dns.flags.rcode != 0 (DNS errors), tcp.flags.syn == 1 && tcp.flags.ack == 0 (connection attempts), tcp.analysis.retransmission, tcp.flags.reset == 1, http.request and tls.handshake.type == 1 (Client Hello with server name).'],
    ['Follow > TCP Stream یک گفت‌وگو را به‌صورت متن نشان می‌دهد؛ Statistics > Conversations و Protocol Hierarchy نشان می‌دهند چه کسی بیشترین ترافیک را دارد؛ Analyze > Expert Information هشدارهایی مثل Retransmission و Zero Window را فهرست می‌کند.', 'Follow > TCP Stream zeigt eine Unterhaltung als Text; Statistics > Conversations und Protocol Hierarchy zeigen, wer am meisten spricht; Analyze > Expert Information listet Warnungen wie Retransmissions und Zero Window.', 'Follow > TCP Stream shows one conversation as text; Statistics > Conversations and Protocol Hierarchy show who talks most; Analyze > Expert Information lists warnings such as retransmissions and zero window.'],
    ['دست‌دادن TCP: SYN، SYN/ACK، ACK. اگر به SYN با RST جواب داده شود، پورت بسته است؛ اگر هیچ جوابی نیاید، معمولاً فایروال آن را فیلتر می‌کند. DHCP چهار مرحله دارد: Discover، Offer، Request، ACK (DORA).', 'TCP-Handshake: SYN, SYN/ACK, ACK. Kommt auf ein SYN ein RST, ist der Port geschlossen; kommt nichts, filtert meist eine Firewall. DHCP hat vier Schritte: Discover, Offer, Request, ACK (DORA).', 'TCP handshake: SYN, SYN/ACK, ACK. If a SYN is answered with RST, the port is closed; if nothing comes back, a firewall usually filters it. DHCP has four steps: Discover, Offer, Request, ACK (DORA).'],
    ['روی سرور بدون رابط گرافیکی از tcpdump استفاده کن: sudo tcpdump -i eth0 -nn -w /tmp/x.pcap host 10.20.0.100 and port 80. با -c تعداد را محدود کن و با -r بخوان؛ فایل را با scp یا WinSCP بیاور و در Wireshark باز کن. tshark نسخهٔ خط فرمان Wireshark است.', 'Auf Servern ohne Oberfläche nutzt du tcpdump: sudo tcpdump -i eth0 -nn -w /tmp/x.pcap host 10.20.0.100 and port 80. Mit -c begrenzt du die Anzahl, mit -r liest du; die Datei holst du per scp oder WinSCP und öffnest sie in Wireshark. tshark ist die Kommandozeilen-Version von Wireshark.', 'On servers without a GUI use tcpdump: sudo tcpdump -i eth0 -nn -w /tmp/x.pcap host 10.20.0.100 and port 80. Limit the count with -c, read with -r; fetch the file with scp or WinSCP and open it in Wireshark. tshark is the command-line version of Wireshark.'],
    ['قانون و حریم خصوصی: فقط در شبکهٔ خودت یا با اجازهٔ صریح ضبط کن. فایل‌های ضبط داده‌های شخصی و گاهی رمز (در پروتکل‌های رمزنشده) دارند؛ آن‌ها را رمزگذاری‌شده نگه دار و بعد از تحلیل پاک کن. در شرکت‌ها مجوز مسئول حفاظت داده و در صورت وجود شورای کارکنان لازم است.', 'Recht und Datenschutz: Nur im eigenen Netz oder mit ausdrücklicher Freigabe mitschneiden. Mitschnitte enthalten personenbezogene Daten und bei unverschlüsselten Protokollen sogar Kennwörter; verschlüsselt ablegen und nach der Analyse löschen. In Firmen sind Datenschutz und gegebenenfalls der Betriebsrat einzubeziehen.', 'Law and privacy: only capture on your own network or with explicit permission. Captures contain personal data and, for unencrypted protocols, even passwords; store them encrypted and delete them after analysis. In companies involve data protection and, where applicable, the works council.']
  ],
  lab: {
    vm: 'CL01 (Windows 11) mit Wireshark, LNX01 (Ubuntu Server 24.04) mit tcpdump', shell: 'PowerShell + Bash',
    steps: [
      ['Wireshark را از wireshark.org با Npcap روی CL01 نصب کن و کارت شبکهٔ آزمایشگاه را انتخاب کن.', 'فیلتر ضبط port 53 or port 67 or port 68 را بگذار و ضبط را شروع کن.', 'در PowerShell فرمان‌های بخش CL01 را اجرا کن (تمدید DHCP، پرسش DNS، آزمون پورت).', 'ضبط را متوقف کن؛ با فیلتر dhcp چهار مرحلهٔ DORA و با dns پرسش، پاسخ و زمان پاسخ (dns.time) را پیدا کن.', 'ضبط تازه‌ای با فیلتر host 10.20.0.30 شروع کن و Test-NetConnection به پورت ۲۲ و ۸۱ را اجرا کن؛ SYN/ACK را با RST مقایسه کن.', 'روی LNX01 با tcpdump سی بسته از پورت ۲۲ ضبط کن، فایل را با scp به CL01 بیاور و در Wireshark باز کن.', 'نتیجه را در گزارش تیکت خلاصه کن (چه، کی، کدام فیلتر، نتیجه) و فایل‌های ضبط را پاک کن.'],
      ['Wireshark von wireshark.org mit Npcap auf CL01 installieren und den Lab-Netzwerkadapter auswählen.', 'Capture-Filter port 53 or port 67 or port 68 setzen und den Mitschnitt starten.', 'In PowerShell die Befehle aus dem CL01-Abschnitt ausführen (DHCP erneuern, DNS-Abfrage, Porttest).', 'Mitschnitt stoppen; mit dem Filter dhcp die vier DORA-Schritte und mit dns Anfrage, Antwort und Antwortzeit (dns.time) finden.', 'Neuen Mitschnitt mit Filter host 10.20.0.30 starten und Test-NetConnection auf Port 22 und 81 ausführen; SYN/ACK mit RST vergleichen.', 'Auf LNX01 mit tcpdump 30 Pakete auf Port 22 aufzeichnen, Datei per scp auf CL01 holen und in Wireshark öffnen.', 'Ergebnis im Ticketbericht zusammenfassen (was, wann, welcher Filter, Ergebnis) und die Mitschnitte löschen.'],
      ['Install Wireshark from wireshark.org with Npcap on CL01 and select the lab network adapter.', 'Set the capture filter port 53 or port 67 or port 68 and start capturing.', 'Run the commands from the CL01 section in PowerShell (renew DHCP, DNS query, port test).', 'Stop the capture; with the filter dhcp find the four DORA steps and with dns the query, the response and the response time (dns.time).', 'Start a new capture with the filter host 10.20.0.30 and run Test-NetConnection to port 22 and 81; compare SYN/ACK with RST.', 'On LNX01 capture 30 packets on port 22 with tcpdump, copy the file to CL01 with scp and open it in Wireshark.', 'Summarise the result in the ticket report (what, when, which filter, result) and delete the capture files.']
    ],
    code: R`# --- CL01 (PowerShell als Administrator), waehrend Wireshark mitschneidet ---
ipconfig /release
ipconfig /renew
Clear-DnsClientCache
Resolve-DnsName dc01.corp.example.test
Resolve-DnsName gibtesnicht.corp.example.test
Test-NetConnection 10.20.0.30 -Port 22
Test-NetConnection 10.20.0.30 -Port 81

# Anzeige-Filter in Wireshark (Filterzeile oben):
#   dhcp
#   dns && dns.flags.response == 1
#   dns.flags.rcode != 0
#   ip.addr == 10.20.0.30 && tcp.flags.syn == 1
#   tcp.flags.reset == 1
#   tcp.analysis.retransmission

# --- LNX01 (Bash) ---
sudo DEBIAN_FRONTEND=noninteractive apt install -y tcpdump tshark
ip -br addr
sudo tcpdump -i any -nn -c 30 -w /tmp/ssh.pcap 'tcp port 22'
sudo tcpdump -nn -r /tmp/ssh.pcap | head
sudo tshark -r /tmp/ssh.pcap -q -z conv,tcp

# --- CL01: Datei holen, danach auf beiden Seiten loeschen ---
# scp admin@10.20.0.30:/tmp/ssh.pcap $env:USERPROFILE\Desktop\
# ssh admin@10.20.0.30 "sudo rm /tmp/ssh.pcap"`,
    checks: [
      ['با فیلتر dhcp چهار بستهٔ Discover، Offer، Request و ACK با همان Transaction ID دیده می‌شوند.', 'برای نام ناموجود، dns.flags.rcode != 0 پاسخی با No such name (NXDOMAIN) نشان می‌دهد.', 'پورت ۲۲ دست‌دادن کامل و پورت ۸۱ پاسخ RST یا هیچ پاسخی نشان می‌دهد و می‌توانی فرق «بسته» و «فیلترشده» را توضیح بدهی.', 'فایل tcpdump از LNX01 در Wireshark باز می‌شود و همان اتصال‌ها را نشان می‌دهد.'],
      ['Im Filter dhcp sind Discover, Offer, Request und ACK mit derselben Transaction ID zu sehen.', 'Für den nicht vorhandenen Namen zeigt dns.flags.rcode != 0 eine Antwort No such name (NXDOMAIN).', 'Port 22 zeigt den vollständigen Handshake, Port 81 ein RST oder keine Antwort, und du kannst den Unterschied zwischen „geschlossen“ und „gefiltert“ erklären.', 'Die tcpdump-Datei von LNX01 öffnet sich in Wireshark und zeigt dieselben Verbindungen.'],
      ['With the filter dhcp you see Discover, Offer, Request and ACK with the same transaction ID.', 'For the non-existent name, dns.flags.rcode != 0 shows a No such name (NXDOMAIN) response.', 'Port 22 shows the complete handshake, port 81 an RST or no answer, and you can explain the difference between “closed” and “filtered”.', 'The tcpdump file from LNX01 opens in Wireshark and shows the same connections.']
    ]
  },
  trouble: [
    [['Wireshark هیچ کارت شبکه‌ای نشان نمی‌دهد (No interfaces found).', 'Wireshark zeigt keine Schnittstellen an (No interfaces found).', 'Wireshark shows no interfaces (No interfaces found).'],
     ['Npcap نصب نیست یا سرویس آن اجرا نمی‌شود. Wireshark را با Npcap دوباره نصب کن و در صورت نیاز با حق مدیر اجرا کن. در لینوکس کاربر را به گروه wireshark اضافه کن و دوباره وارد شو.', 'Npcap fehlt oder der Dienst läuft nicht. Wireshark mit Npcap neu installieren und bei Bedarf als Administrator starten. Unter Linux den Benutzer zur Gruppe wireshark hinzufügen und neu anmelden.', 'Npcap is missing or its service is not running. Reinstall Wireshark with Npcap and run it as administrator if needed. On Linux add the user to the wireshark group and log in again.']],
    [['فقط ترافیک خودِ رایانه دیده می‌شود، نه دستگاه‌های دیگر.', 'Man sieht nur den eigenen Verkehr, nicht den anderer Geräte.', 'Only your own traffic is visible, not that of other devices.'],
     ['Switch بستهٔ Unicast را فقط به پورت مقصد می‌فرستد. از Port Mirroring (SPAN) روی Switch، ضبط مستقیم روی سرور یا یک TAP استفاده کن؛ برای WLAN حالت Monitor لازم است.', 'Ein Switch leitet Unicast nur an den Zielport weiter. Port-Mirroring (SPAN) am Switch, Mitschnitt direkt auf dem Server oder einen TAP verwenden; im WLAN ist der Monitor-Modus nötig.', 'A switch forwards unicast only to the destination port. Use port mirroring (SPAN) on the switch, capture directly on the server or use a TAP; on Wi-Fi monitor mode is required.']],
    [['فایل ضبط خیلی بزرگ است و Wireshark کند می‌شود.', 'Der Mitschnitt ist riesig und Wireshark wird langsam.', 'The capture is huge and Wireshark becomes slow.'],
     ['به‌جای فقط فیلتر نمایش، فیلتر ضبط بگذار؛ از بافر حلقه‌ای (Ring Buffer) یا tcpdump -C و -W استفاده کن و اگر فقط سرآیندها لازم است طول ضبط را با -s 128 محدود کن.', 'Capture-Filter statt nur Anzeige-Filter setzen; Ringpuffer oder tcpdump -C und -W verwenden und mit -s 128 die Schnappschusslänge begrenzen, wenn nur Header gebraucht werden.', 'Use capture filters instead of display filters only; use a ring buffer or tcpdump -C and -W and limit the snapshot length with -s 128 if only headers are needed.']]
  ],
  decide: [
    [['Wireshark یا tcpdump؟', 'Wireshark oder tcpdump?', 'Wireshark or tcpdump?'],
     ['Wireshark برای تحلیل با رابط گرافیکی روی رایانهٔ ادمین؛ tcpdump یا tshark روی سرورهای بدون رابط گرافیکی و برای ضبط طولانی. فایل را بعداً در Wireshark تحلیل کن.', 'Wireshark für die Analyse mit Oberfläche auf dem Admin-PC; tcpdump oder tshark auf Servern ohne Oberfläche und für lange Mitschnitte. Die Datei anschließend in Wireshark auswerten.', 'Wireshark for analysis with a GUI on the admin PC; tcpdump or tshark on servers without a GUI and for long captures. Analyse the file afterwards in Wireshark.']],
    [['کجا ضبط کنم؟', 'Wo schneide ich mit?', 'Where do I capture?'],
     ['تا حد ممکن نزدیک به مشکل: هم‌زمان روی کلاینت و روی سرور. اگر کلاینت SYN می‌فرستد ولی سرور چیزی نمی‌بیند، مشکل بین آن‌هاست (فایروال، مسیریابی).', 'So nah wie möglich am Problem: gleichzeitig auf dem Client und auf dem Server. Sendet der Client SYN, der Server sieht aber nichts, liegt das Problem dazwischen (Firewall, Routing).', 'As close to the problem as possible: on the client and on the server at the same time. If the client sends SYN but the server sees nothing, the problem lies in between (firewall, routing).']]
  ],
  pitfalls: [
    ['ضبط در شبکهٔ تولیدی بدون مجوز و بدون برنامهٔ پاک‌کردن فایل.', 'Mitschnitt im Produktivnetz ohne Freigabe und ohne Löschkonzept.', 'Capturing on a production network without permission and without a deletion plan.'],
    ['قاطی کردن نحو فیلتر ضبط و فیلتر نمایش.', 'Syntax von Capture- und Anzeige-Filter verwechseln.', 'Mixing up capture filter and display filter syntax.'],
    ['از «خط‌های قرمز در Wireshark» فوراً خطای شبکه نتیجه گرفتن؛ چند Retransmission تکی طبیعی است.', 'Aus „roten Zeilen in Wireshark“ sofort einen Netzwerkfehler ableiten; einzelne Retransmissions sind normal.', 'Concluding a network fault from “red lines in Wireshark”; a few single retransmissions are normal.']
  ],
  iv: [
    [['Ping کار می‌کند ولی وب‌سایت باز نمی‌شود. Wireshark چه کمکی می‌کند؟', 'Ping geht, aber die Webseite lädt nicht. Wie hilft Wireshark?', 'Ping works but the website does not load. How does Wireshark help?'],
     ['ضبط با فیلتر روی IP سرور: آیا DNS جواب می‌دهد؟ دست‌دادن TCP کامل است؟ Client Hello و Server Hello در TLS هست؟ جایی که قطع می‌شود نشان می‌دهد مشکل از DNS، فایروال یا برنامه است.', 'Mitschnitt mit Filter auf die Server-IP: Antwortet DNS? Ist der TCP-Handshake vollständig? Gibt es TLS Client Hello und Server Hello? Wo es abbricht, zeigt, ob DNS, Firewall oder Anwendung schuld ist.', 'Capture filtered on the server IP: does DNS answer? Is the TCP handshake complete? Are there TLS Client Hello and Server Hello? Where it stops shows whether DNS, firewall or application is to blame.']],
    [['فرق فیلتر ضبط و فیلتر نمایش چیست؟', 'Unterschied zwischen Capture-Filter und Anzeige-Filter?', 'Difference between capture filter and display filter?'],
     ['فیلتر ضبط (BPF) قبل از ضبط تعیین می‌کند چه چیزی ذخیره شود؛ فیلتر نمایش در دادهٔ ضبط‌شده فقط پنهان می‌کند. نحو آن‌ها متفاوت است.', 'Der Capture-Filter (BPF) bestimmt vor dem Mitschnitt, was gespeichert wird; der Anzeige-Filter blendet in vorhandenen Daten nur aus. Die Syntax ist verschieden.', 'The capture filter (BPF) decides before capturing what is stored; the display filter only hides packets in existing data. The syntax differs.']],
    [['در ضبط، پورت بسته و پورت فیلترشده را چطور تشخیص می‌دهی؟', 'Woran erkennst du im Mitschnitt einen geschlossenen und einen gefilterten Port?', 'How do you recognise a closed and a filtered port in a capture?'],
     ['بسته: SYN و بلافاصله RST/ACK. فیلترشده: SYN بدون پاسخ و تکرار SYN، گاهی پیام ICMP unreachable.', 'Geschlossen: SYN und sofort RST/ACK. Gefiltert: SYN ohne Antwort und wiederholte SYNs, manchmal ICMP unreachable.', 'Closed: SYN and immediately RST/ACK. Filtered: SYN without answer and repeated SYNs, sometimes ICMP unreachable.']]
  ],
  sources: [
    ['Wireshark User’s Guide', 'https://www.wireshark.org/docs/wsug_html/'],
    ['tcpdump(1) man page', 'https://www.tcpdump.org/manpages/tcpdump.1.html']
  ]
},

{
  id: 'tools-iperf', part: 1,
  title: ['iPerf3 و mtr: اندازه‌گیری پهنای باند، اتلاف بسته و مسیر', 'iPerf3 und mtr: Bandbreite, Paketverlust und Pfad messen', 'iPerf3 and mtr: measure bandwidth, packet loss and path'],
  goal: ['توان عبوری TCP و Jitter و اتلاف UDP را بین دو رایانه به‌صورت تکرارپذیر اندازه بگیری، هر دو جهت را بسنجی و با mtr یا pathping بخشی از مسیر را که اتلاف دارد پیدا کنی.', 'Du misst TCP-Durchsatz sowie UDP-Jitter und -Verlust zwischen zwei Rechnern reproduzierbar, prüfst beide Richtungen und findest mit mtr oder pathping den Abschnitt, auf dem Verluste entstehen.', 'You measure TCP throughput and UDP jitter and loss between two machines reproducibly, test both directions and use mtr or pathping to find the section of the path where loss occurs.'],
  why: ['«شبکه کند است» رایج‌ترین تیکت مبهم است. با عدد به‌جای حس، WLAN، کابل، پورت Switch، VPN و اینترنت را از هم جدا می‌کنی و می‌توانی برای شرکت اینترنت مدرک بفرستی.', '„Das Netz ist langsam“ ist das häufigste vage Ticket. Mit Messwerten statt Gefühl unterscheidest du WLAN, Kabel, Switchport, VPN und Internet und kannst dem Provider Belege liefern.', '“The network is slow” is the most common vague ticket. With measurements instead of feelings you separate Wi-Fi, cable, switch port, VPN and internet and can give the provider evidence.'],
  know: [
    ['iperf3 با سرور (iperf3 -s، پورت 5201/TCP) و کلاینت (iperf3 -c مقصد) کار می‌کند. پیش‌فرض: کلاینت ده ثانیه TCP می‌فرستد. -R جهت را برعکس می‌کند، --bidir هر دو جهت را هم‌زمان می‌سنجد، -P 4 چهار جریان موازی، -t 30 مدت و -J خروجی JSON.', 'iperf3 arbeitet mit Server (iperf3 -s, Port 5201/TCP) und Client (iperf3 -c ZIEL). Standard: Der Client sendet 10 s TCP. -R kehrt die Richtung um, --bidir misst beide gleichzeitig, -P 4 nutzt vier parallele Streams, -t 30 die Dauer, -J liefert JSON.', 'iperf3 works with a server (iperf3 -s, port 5201/TCP) and a client (iperf3 -c TARGET). Default: the client sends TCP for 10 s. -R reverses the direction, --bidir measures both at once, -P 4 uses four parallel streams, -t 30 sets the duration and -J outputs JSON.'],
    ['آزمون UDP: iperf3 -c مقصد -u -b 50M مقدار Jitter و Lost/Total را نشان می‌دهد؛ برای VoIP و ویدئو مهم است. بدون -b جریان UDP فقط ۱ مگابیت بر ثانیه است.', 'UDP-Test: iperf3 -c ZIEL -u -b 50M zeigt Jitter und Lost/Total; wichtig für VoIP und Video. Ohne -b sendet UDP nur 1 Mbit/s.', 'UDP test: iperf3 -c TARGET -u -b 50M shows jitter and lost/total; important for VoIP and video. Without -b UDP sends only 1 Mbit/s.'],
    ['تفسیر: گیگابیت اترنت در عمل حدود ۹۳۰ تا ۹۴۰ مگابیت TCP می‌دهد؛ حدود ۹۴ مگابیت نشانهٔ اتصال ۱۰۰ مگابیتی است (کابل، پورت، Duplex). نوسان زیاد نشانهٔ WLAN یا بار زیاد است و ستون Retr (ارسال دوباره) اتلاف را نشان می‌دهد.', 'Deutung: Gigabit-Ethernet liefert real etwa 930–940 Mbit/s TCP; rund 94 Mbit/s deutet auf eine 100-Mbit-Verbindung (Kabel, Port, Duplex). Starke Schwankungen deuten auf WLAN oder Überlast, die Spalte Retr (Retransmissions) zeigt Verluste.', 'Interpretation: gigabit Ethernet really delivers about 930–940 Mbit/s TCP; around 94 Mbit/s points to a 100 Mbit link (cable, port, duplex). Strong fluctuation points to Wi-Fi or overload, and the Retr column (retransmissions) shows loss.'],
    ['mtr ترکیب traceroute و ping است: mtr -rwzbc 100 مقصد. اتلاف فقط در یک گام میانی که تا مقصد ادامه ندارد معمولاً محدودیت ICMP روتر است و مشکل نیست؛ اتلافی که از یک گام تا مقصد می‌ماند محل مشکل را نشان می‌دهد. در ویندوز: pathping.', 'mtr kombiniert traceroute und ping: mtr -rwzbc 100 ZIEL. Verlust nur auf einem Zwischenhop, der nicht bis zum Ziel anhält, ist meist ICMP-Ratenbegrenzung des Routers und kein Problem; Verlust, der ab einem Hop bis zum Ziel bleibt, zeigt die Problemstelle. Unter Windows: pathping.', 'mtr combines traceroute and ping: mtr -rwzbc 100 TARGET. Loss only at one intermediate hop that does not continue to the target is usually router ICMP rate limiting and not a problem; loss that persists from a hop to the target shows the problem spot. On Windows: pathping.'],
    ['قواعد اندازه‌گیری: زمان و بار را ثبت کن، برای مقایسه کابل به‌جای WLAN، دست‌کم سه اجرا. پورت 5201 را فقط برای اندازه‌گیری باز کن و بعد ببند. از سرورهای عمومی iperf فقط با اجازه و کم استفاده کن.', 'Messregeln: Uhrzeit und Last dokumentieren, zum Vergleich Kabel statt WLAN, mindestens drei Läufe. Port 5201 nur für die Messung öffnen und danach schließen. Öffentliche iperf-Server nur mit Erlaubnis und sparsam nutzen.', 'Measurement rules: record time and load, use cable instead of Wi-Fi for comparison, at least three runs. Open port 5201 only for the measurement and close it afterwards. Use public iperf servers only with permission and sparingly.'],
    ['برای VPN و اینترنت: اول مقدار پایه در LAN، بعد از طریق VPN، بعد اینترنت. مشکل MTU را با ping -M do -s 1472 (لینوکس) یا ping -f -l 1472 (ویندوز) بررسی کن.', 'Bei VPN und Internet: erst den Basiswert im LAN, dann über VPN, dann Internet. MTU-Probleme mit ping -M do -s 1472 (Linux) oder ping -f -l 1472 (Windows) prüfen.', 'For VPN and internet: first the LAN baseline, then over the VPN, then the internet. Check MTU problems with ping -M do -s 1472 (Linux) or ping -f -l 1472 (Windows).']
  ],
  lab: {
    vm: 'LNX01 als iperf3-Server; Client: zweite Linux-VM oder WSL (Ubuntu) auf CL01', shell: 'Bash',
    steps: [
      ['روی LNX01 بسته‌های iperf3 و mtr را نصب کن، پورت 5201 (TCP و UDP) را در ufw فقط برای شبکهٔ آزمایشگاه باز کن و سرور را اجرا کن.', 'روی کلاینت (VM لینوکس دوم یا WSL روی CL01) همان بسته‌ها را نصب کن.', 'آزمون TCP ده‌ثانیه‌ای، بعد با -R و بعد با -P 4 را اجرا کن و عددها را یادداشت کن.', 'آزمون UDP با -b 100M را اجرا کن و Jitter و اتلاف را یادداشت کن.', 'روی LNX01 با tc netem تأخیر ۳۰ میلی‌ثانیه و اتلاف ۲٪ بساز، اندازه‌گیری را تکرار کن و بعد netem را حذف کن.', 'با mtr یا pathping مسیر را به یک مقصد اینترنتی بررسی کن و اتلاف را تفسیر کن.', 'گزارش اندازه‌گیری بنویس، سرور را متوقف کن و قاعده‌های فایروال را پاک کن.'],
      ['Auf LNX01 iperf3 und mtr installieren, Port 5201 (TCP und UDP) in ufw nur für das Labnetz öffnen und den Server starten.', 'Auf dem Client (zweite Linux-VM oder WSL auf CL01) dieselben Pakete installieren.', 'TCP-Test über 10 s, dann mit -R und dann mit -P 4 ausführen und die Werte notieren.', 'UDP-Test mit -b 100M ausführen und Jitter und Verlust notieren.', 'Auf LNX01 mit tc netem 30 ms Verzögerung und 2 % Verlust erzeugen, die Messung wiederholen und netem danach entfernen.', 'Mit mtr oder pathping den Pfad zu einem Internetziel prüfen und den Verlust deuten.', 'Messprotokoll schreiben, Server beenden und die Firewall-Regeln löschen.'],
      ['On LNX01 install iperf3 and mtr, open port 5201 (TCP and UDP) in ufw only for the lab network and start the server.', 'Install the same packages on the client (second Linux VM or WSL on CL01).', 'Run a 10 s TCP test, then with -R and then with -P 4 and note the values.', 'Run a UDP test with -b 100M and note jitter and loss.', 'On LNX01 add 30 ms delay and 2 % loss with tc netem, repeat the measurement and remove netem afterwards.', 'Check the path to an internet target with mtr or pathping and interpret the loss.', 'Write a measurement report, stop the server and delete the firewall rules.']
    ],
    code: R`# --- LNX01: Server ---
sudo apt install -y iperf3 mtr-tiny
sudo ufw allow from 10.20.0.0/24 to any port 5201 proto tcp
sudo ufw allow from 10.20.0.0/24 to any port 5201 proto udp
iperf3 -s

# --- Client: zweite Linux-VM oder WSL auf CL01 (PowerShell: wsl --install -d Ubuntu-24.04) ---
sudo apt install -y iperf3 mtr-tiny
iperf3 -c 10.20.0.30                # Client -> Server, TCP, 10 s
iperf3 -c 10.20.0.30 -R             # Server -> Client
iperf3 -c 10.20.0.30 -P 4 -t 20     # vier parallele Streams
iperf3 -c 10.20.0.30 -u -b 100M     # UDP: Jitter und Verlust
iperf3 -c 10.20.0.30 -J > messung.json

# --- LNX01, zweites Terminal: Engpass simulieren und wieder entfernen ---
IF=$(ip -o -4 addr show | awk '/10\.20\.0\.30\//{print $2}')
sudo tc qdisc add dev "$IF" root netem delay 30ms loss 2%
#   ... Client-Messungen wiederholen ...
sudo tc qdisc del dev "$IF" root

# --- Pfad und Verlust (mit Internetzugang) ---
mtr -rwzbc 100 9.9.9.9
ping -M do -s 1472 -c 3 9.9.9.9
# Windows (PowerShell):  pathping -n -q 50 9.9.9.9

# --- Aufraeumen auf LNX01 (Server mit Strg+C beenden) ---
sudo ufw delete allow from 10.20.0.0/24 to any port 5201 proto tcp
sudo ufw delete allow from 10.20.0.0/24 to any port 5201 proto udp`,
    checks: [
      ['عددهای TCP در هر دو جهت و با -P 4 یادداشت شده‌اند و فرقشان را توضیح داده‌ای.', 'آزمون UDP مقدار Jitter بر حسب میلی‌ثانیه و Lost/Total بر حسب درصد را نشان می‌دهد.', 'با netem توان TCP به‌وضوح کم و Retr زیاد می‌شود و بعد از حذف آن مقدارها عادی می‌شوند.', 'گزارش زمان، مسیر (LAN یا WSL)، فرمان‌ها، سه اجرا و نتیجه‌گیری را دارد.'],
      ['TCP-Werte beider Richtungen und mit -P 4 sind notiert, der Unterschied ist erklärt.', 'Der UDP-Test zeigt Jitter in ms und Lost/Total in Prozent.', 'Mit netem sinkt der TCP-Durchsatz deutlich und Retr steigt; nach dem Entfernen sind die Werte wieder normal.', 'Das Protokoll nennt Uhrzeit, Weg (LAN oder WSL), Befehle, drei Läufe und die Schlussfolgerung.'],
      ['TCP values for both directions and with -P 4 are noted and the difference is explained.', 'The UDP test shows jitter in ms and lost/total in percent.', 'With netem TCP throughput drops clearly and Retr rises; after removing it the values are normal again.', 'The report states time, path (LAN or WSL), commands, three runs and the conclusion.']
    ]
  },
  trouble: [
    [['iperf3: unable to connect to server (Connection refused یا timed out).', 'iperf3: unable to connect to server (Connection refused oder timed out).', 'iperf3: unable to connect to server (connection refused or timed out).'],
     ['سرور اجرا نمی‌شود، IP اشتباه است یا فایروال (ufw یا ویندوز) پورت 5201 را می‌بندد. با ss -ltnp | grep 5201 روی سرور و Test-NetConnection -Port 5201 روی کلاینت بررسی کن.', 'Der Server läuft nicht, die IP ist falsch oder eine Firewall (ufw oder Windows) blockiert Port 5201. Mit ss -ltnp | grep 5201 auf dem Server und Test-NetConnection -Port 5201 auf dem Client prüfen.', 'The server is not running, the IP is wrong or a firewall (ufw or Windows) blocks port 5201. Check with ss -ltnp | grep 5201 on the server and Test-NetConnection -Port 5201 on the client.']],
    [['نتیجه همیشه حدود ۹۴ مگابیت بر ثانیه است.', 'Das Ergebnis liegt immer bei etwa 94 Mbit/s.', 'The result is always about 94 Mbit/s.'],
     ['اتصال ۱۰۰ مگابیتی است: کابل (فقط دو جفت سیم سالم)، پورت Switch یا Duplex، تنظیم کارت شبکه. سرعت لینک را با ethtool در لینوکس یا Get-NetAdapter (LinkSpeed) در ویندوز بررسی کن.', 'Es ist eine 100-Mbit-Verbindung: Kabel (nur zwei intakte Adernpaare), Switchport oder Duplex, Adaptereinstellung. Linkgeschwindigkeit mit ethtool (Linux) oder Get-NetAdapter (LinkSpeed) unter Windows prüfen.', 'It is a 100 Mbit link: cable (only two intact pairs), switch port or duplex, adapter setting. Check the link speed with ethtool (Linux) or Get-NetAdapter (LinkSpeed) on Windows.']],
    [['mtr در گام ۴ اتلاف ۶۰٪ نشان می‌دهد ولی مقصد ۰٪ است.', 'mtr zeigt 60 % Verlust auf Hop 4, das Ziel aber 0 %.', 'mtr shows 60 % loss at hop 4 but 0 % at the target.'],
     ['این محدودیت پاسخ ICMP در آن روتر است و اتلاف واقعی نیست. فقط اتلافی مهم است که تا مقصد ادامه دارد.', 'Das ist die ICMP-Ratenbegrenzung dieses Routers und kein echter Verlust. Zählt nur Verlust, der bis zum Ziel anhält.', 'That is ICMP rate limiting on that router, not real loss. Only loss that continues to the target matters.']]
  ],
  decide: [
    [['آزمون TCP یا UDP؟', 'TCP- oder UDP-Test?', 'TCP or UDP test?'],
     ['TCP برای توان عبوری انتقال فایل و پشتیبان‌گیری؛ UDP با نرخ ثابت برای VoIP و ویدئو تا Jitter و اتلاف دیده شوند.', 'TCP für den Durchsatz von Dateiübertragung und Backup; UDP mit fester Rate für VoIP und Video, um Jitter und Verlust zu sehen.', 'TCP for the throughput of file transfer and backup; UDP at a fixed rate for VoIP and video to see jitter and loss.']],
    [['iperf3 در شبکهٔ شرکت یا Speedtest در مرورگر؟', 'iperf3 im Firmennetz oder Speedtest im Browser?', 'iperf3 on the company network or a browser speed test?'],
     ['Speedtest فقط تا سرور اینترنتی یک ارائه‌دهنده را می‌سنجد؛ iperf3 دقیقاً همان مسیری را می‌سنجد که می‌خواهی بررسی کنی (شعبه تا مرکز داده، VLAN، VPN).', 'Ein Speedtest misst nur bis zum Internetserver eines Anbieters; iperf3 misst genau die Strecke, die du prüfen willst (Standort–Rechenzentrum, VLAN, VPN).', 'A speed test only measures to a provider’s internet server; iperf3 measures exactly the path you want to check (site to data centre, VLAN, VPN).']]
  ],
  pitfalls: [
    ['فقط یک جهت را اندازه گرفتن؛ عدم تقارن (مثلاً خطای Duplex) دیده نمی‌شود.', 'Nur eine Richtung messen; Asymmetrie (z. B. Duplex-Fehler) bleibt unentdeckt.', 'Measuring only one direction; asymmetry (e.g. duplex errors) stays hidden.'],
    ['اندازه‌گیری روی WLAN را مدرکی برای شبکهٔ کابلی دانستن.', 'Eine WLAN-Messung als Beleg für das Kabelnetz verwenden.', 'Using a Wi-Fi measurement as evidence for the wired network.'],
    ['پورت 5201 را برای همیشه باز گذاشتن یا سرورهای عمومی را بدون اجازه شلوغ کردن.', 'Port 5201 dauerhaft offen lassen oder öffentliche Server ohne Erlaubnis belasten.', 'Leaving port 5201 open permanently or loading public servers without permission.']
  ],
  iv: [
    [['یک شعبه از کندی شبکه شکایت دارد. چطور پیش می‌روی؟', 'Ein Standort klagt über langsames Netz. Wie gehst du vor?', 'A branch complains about a slow network. How do you proceed?'],
     ['مقدار پایه در LAN با iperf3 و کابل، بعد مسیر تا مرکز داده یا VPN در هر دو جهت، UDP برای اتلاف و mtr برای مسیر؛ نتیجه را با زمان ثبت و هدفمند ارجاع می‌دهم.', 'Basiswert im LAN mit iperf3 per Kabel, dann die Strecke zum Rechenzentrum oder VPN in beiden Richtungen, UDP für Verlust und mtr für den Pfad; Ergebnis mit Uhrzeit dokumentieren und gezielt eskalieren.', 'Baseline on the LAN with iperf3 over cable, then the path to the data centre or VPN in both directions, UDP for loss and mtr for the path; document the result with time stamps and escalate in a targeted way.']],
    [['Jitter یعنی چه؟', 'Was bedeutet Jitter?', 'What does jitter mean?'],
     ['نوسان زمان رسیدن بسته‌ها. برای تماس صوتی Jitter زیاد باعث قطع‌شدن صدا می‌شود؛ رهنمودهای رایج کمتر از حدود ۳۰ میلی‌ثانیه Jitter و کمتر از ۱٪ اتلاف را هدف می‌گیرند.', 'Die Schwankung der Paketlaufzeit. Bei Telefonie führt hoher Jitter zu abgehacktem Ton; gängige Richtwerte zielen auf weniger als etwa 30 ms Jitter und unter 1 % Verlust.', 'The variation in packet delay. For voice calls high jitter causes choppy audio; common guidelines aim for less than about 30 ms jitter and under 1 % loss.']],
    [['چرا iperf3 با -P 4 عدد بیشتری از یک جریان نشان می‌دهد؟', 'Warum zeigt iperf3 mit -P 4 mehr als mit einem Stream?', 'Why does iperf3 show more with -P 4 than with one stream?'],
     ['یک جریان TCP با اندازهٔ پنجره و تأخیر محدود می‌شود (حاصل‌ضرب پهنای باند در تأخیر)؛ چند جریان خط را بهتر پر می‌کنند.', 'Ein einzelner TCP-Stream wird durch Fenstergröße und Latenz begrenzt (Bandbreiten-Verzögerungs-Produkt); mehrere Streams füllen die Leitung besser.', 'A single TCP stream is limited by window size and latency (bandwidth-delay product); several streams fill the link better.']]
  ],
  sources: [
    ['iperf3 documentation (ESnet)', 'https://software.es.net/iperf/'],
    ['mtr(8) – Ubuntu Manpage', 'https://manpages.ubuntu.com/manpages/noble/man8/mtr.8.html'],
    ['tc-netem(8) – Ubuntu Manpage', 'https://manpages.ubuntu.com/manpages/noble/man8/tc-netem.8.html']
  ]
},

{
  id: 'tools-nmap', part: 1,
  title: ['Nmap: فهرست‌برداری از شبکهٔ خودی و بررسی قاعده‌های فایروال', 'Nmap: eigene Netze inventarisieren und Firewall-Regeln prüfen', 'Nmap: inventory your own networks and verify firewall rules'],
  goal: ['دستگاه‌های فعال آزمایشگاه را پیدا کنی، پورت‌های باز و نسخهٔ سرویس‌ها را بررسی کنی، نتیجه را با مجوزهای برنامه‌ریزی‌شدهٔ فایروال مقایسه کنی و تفاوت‌ها را مستند کنی؛ فقط با اجازه.', 'Du findest aktive Geräte im eigenen Labnetz, prüfst offene Ports und Dienstversionen, vergleichst das Ergebnis mit den geplanten Firewall-Freigaben und dokumentierst Abweichungen – nur mit Freigabe.', 'You find active devices on your own lab network, check open ports and service versions, compare the result with the planned firewall rules and document deviations – only with permission.'],
  why: ['فهرست و کنترل: «چه دستگاه‌هایی در شبکه‌اند و کدام سرویس‌ها باز است؟» مقایسهٔ وضعیت مطلوب و واقعی بعد از هر تغییر فایروال بخشی از تحویل درست کار است.', 'Inventar und Kontrolle: „Welche Geräte hängen im Netz, welche Dienste sind offen?“ Der Soll-Ist-Abgleich nach jeder Firewall-Änderung gehört zu einer sauberen Abnahme.', 'Inventory and control: “Which devices are on the network, which services are open?” Comparing target and actual state after every firewall change is part of a clean acceptance.'],
  know: [
    ['قانون: فقط سیستم‌های خودت یا با مجوز کتبی (محدوده، بازهٔ زمانی، مسئول) را اسکن کن. نفوذ بدون مجوز در آلمان جرم است (از جمله § 202a StGB) و اسکن می‌تواند در دستگاه‌ها اختلال ایجاد کند. قواعد شرکت را رعایت کن.', 'Recht: Nur eigene Systeme oder mit schriftlicher Freigabe (Scope, Zeitfenster, Ansprechperson) scannen. Unbefugtes Eindringen ist in Deutschland strafbar (u. a. § 202a StGB), und Scans können Geräte stören. Firmenrichtlinien beachten.', 'Law: only scan your own systems or with written permission (scope, time window, contact person). Unauthorised intrusion is a criminal offence in Germany (e.g. § 202a StGB) and scans can disrupt devices. Follow company policy.'],
    ['کشف میزبان: nmap -sn 10.20.0.0/24 (در LAN با ARP). اسکن پورت: nmap 10.20.0.30 (هزار پورت رایج TCP)، -p- همهٔ پورت‌ها، -sV نسخهٔ سرویس، -O سیستم‌عامل (با sudo)، -sU UDP که کند است.', 'Host Discovery: nmap -sn 10.20.0.0/24 (im LAN per ARP). Portscan: nmap 10.20.0.30 (Top-1000-TCP-Ports), -p- alle Ports, -sV Dienstversionen, -O Betriebssystem (mit sudo), -sU UDP (langsam).', 'Host discovery: nmap -sn 10.20.0.0/24 (ARP on the LAN). Port scan: nmap 10.20.0.30 (top 1000 TCP ports), -p- all ports, -sV service versions, -O operating system (with sudo), -sU UDP (slow).'],
    ['وضعیت پورت: open (سرویس جواب می‌دهد)، closed (در دسترس ولی بدون سرویس، RST)، filtered (بی‌پاسخ، معمولاً فایروال). با -Pn حتی بدون پاسخ Ping اسکن می‌شود؛ فایروال ویندوز معمولاً ICMP را می‌بندد.', 'Portzustände: open (Dienst antwortet), closed (erreichbar, kein Dienst, RST), filtered (keine Antwort, meist Firewall). Mit -Pn wird auch ohne Ping-Antwort gescannt; die Windows-Firewall blockiert ICMP oft.', 'Port states: open (service answers), closed (reachable, no service, RST), filtered (no answer, usually a firewall). -Pn scans even without a ping reply; the Windows firewall often blocks ICMP.'],
    ['خروجی را ذخیره کن: -oN متن، -oX XML، -oA همهٔ قالب‌ها. ndiff دو اسکن XML را مقایسه می‌کند (مطلوب و واقعی، قبل و بعد).', 'Ausgabe sichern: -oN Text, -oX XML, -oA alle Formate. ndiff vergleicht zwei XML-Scans (Soll/Ist, vorher/nachher).', 'Save output: -oN text, -oX XML, -oA all formats. ndiff compares two XML scans (target/actual, before/after).'],
    ['ملایم اسکن کن: -T3 (پیش‌فرض) به‌جای -T5، فقط پورت‌های لازم و بازهٔ زمانی هماهنگ‌شده. چاپگر، کنترلرهای صنعتی قدیمی (OT) و سیستم تلفن ممکن است به اسکن حساس باشند.', 'Schonend scannen: -T3 (Standard) statt -T5, nur benötigte Ports und abgesprochene Zeitfenster. Drucker, alte Steuerungen (OT) und Telefonanlagen können empfindlich reagieren.', 'Scan gently: -T3 (default) instead of -T5, only the ports you need and an agreed time window. Printers, old industrial controllers (OT) and phone systems can react badly.'],
    ['بدون Nmap: Test-NetConnection -Port در ویندوز و nc -zv در لینوکس یک پورت را بررسی می‌کنند. Angry IP Scanner و Zenmap جایگزین‌های گرافیکی‌اند.', 'Ohne Nmap: Test-NetConnection -Port unter Windows und nc -zv unter Linux prüfen einzelne Ports. Angry IP Scanner und Zenmap sind grafische Alternativen.', 'Without Nmap: Test-NetConnection -Port on Windows and nc -zv on Linux check single ports. Angry IP Scanner and Zenmap are graphical alternatives.']
  ],
  lab: {
    vm: 'LNX01 (Ubuntu) als Scanner; DC01, SRV01 und CL01 als Ziele im Labnetz 10.20.0.0/24', shell: 'Bash',
    steps: [
      ['مجوز را کتبی ثبت کن: محدوده 10.20.0.0/24، بازهٔ زمانی و خودت به‌عنوان مسئول.', 'nmap را نصب کن، اسکن Ping بزن و فهرست را با جدول ماشین‌های آزمایشگاه مقایسه کن.', 'DC01 و SRV01 را با -sV اسکن کن و پورت‌های رایج کنترلر دامنه (53، 88، 135، 389، 445، 636، 3268) را به نقششان ربط بده.', 'بازهٔ DHCP کلاینت‌ها را یک بار عادی و یک بار با -Pn اسکن کن و فرق را با فایروال ویندوز توضیح بده.', 'روی LNX01 یک سرویس آزمایشی روی ۸۰۸۰ اجرا کن، اسکن را در XML ذخیره کن، سرویس را متوقف کن، دوباره اسکن کن و با ndiff مقایسه کن.', 'یک پورت را بدون Nmap با nc یا Test-NetConnection بررسی کن.', 'گزارش مطلوب و واقعی با محدوده، زمان، فرمان‌ها و تفاوت‌ها بنویس.'],
      ['Freigabe schriftlich festhalten: Scope 10.20.0.0/24, Zeitfenster und du selbst als Verantwortliche oder Verantwortlicher.', 'nmap installieren, Ping-Scan durchführen und die Liste mit der Lab-Tabelle vergleichen.', 'DC01 und SRV01 mit -sV scannen und typische Domänencontroller-Ports (53, 88, 135, 389, 445, 636, 3268) ihrer Rolle zuordnen.', 'Den DHCP-Bereich der Clients einmal normal und einmal mit -Pn scannen und den Unterschied mit der Windows-Firewall erklären.', 'Auf LNX01 einen Testdienst auf 8080 starten, den Scan als XML speichern, den Dienst stoppen, erneut scannen und mit ndiff vergleichen.', 'Einen Port ohne Nmap mit nc oder Test-NetConnection prüfen.', 'Soll-Ist-Bericht mit Scope, Zeit, Befehlen und Abweichungen schreiben.'],
      ['Record the permission in writing: scope 10.20.0.0/24, time window and yourself as the person responsible.', 'Install nmap, run a ping scan and compare the list with the lab machine table.', 'Scan DC01 and SRV01 with -sV and map typical domain controller ports (53, 88, 135, 389, 445, 636, 3268) to their role.', 'Scan the client DHCP range once normally and once with -Pn and explain the difference with the Windows firewall.', 'Start a test service on 8080 on LNX01, save the scan as XML, stop the service, scan again and compare with ndiff.', 'Check one port without Nmap using nc or Test-NetConnection.', 'Write a target/actual report with scope, time, commands and deviations.']
    ],
    code: R`sudo apt install -y nmap ndiff netcat-openbsd
nmap -sn 10.20.0.0/24
sudo nmap -sV -T3 10.20.0.10 10.20.0.20 -oA ~/scan-server
nmap -T3 --top-ports 100 10.20.0.100-199
nmap -Pn -T3 --top-ports 100 10.20.0.100-199

# Soll/Ist mit einem Testdienst auf LNX01
python3 -m http.server 8080 >/dev/null 2>&1 &
nmap -p 22,80,8080 10.20.0.30 -oX ~/vorher.xml
kill %1
nmap -p 22,80,8080 10.20.0.30 -oX ~/nachher.xml
ndiff ~/vorher.xml ~/nachher.xml

# Einzelne Ports ohne Nmap
nc -zv 10.20.0.10 389
# Windows (PowerShell):  Test-NetConnection 10.20.0.10 -Port 389`,
    checks: [
      ['اسکن Ping همهٔ VMهای روشن را پیدا می‌کند و برای نبودن بقیه دلیل داری (خاموش، ICMP بسته).', 'برای DC01 دست‌کم پورت‌های 53، 88، 389 و 445 با نام سرویس open هستند.', 'ndiff نشان می‌دهد پورت 8080 از open به closed تغییر کرده است.', 'گزارش مطلوب و واقعی با محدوده، زمان، فرمان‌ها و تفاوت‌ها آماده است.'],
      ['Der Ping-Scan findet alle laufenden VMs, und für fehlende hast du eine Erklärung (aus, ICMP gesperrt).', 'Für DC01 sind mindestens 53, 88, 389 und 445 mit Dienstname als open aufgeführt.', 'ndiff zeigt, dass Port 8080 von open zu closed gewechselt ist.', 'Der Soll-Ist-Bericht mit Scope, Zeit, Befehlen und Abweichungen liegt vor.'],
      ['The ping scan finds all running VMs, and you can explain any missing ones (off, ICMP blocked).', 'For DC01 at least 53, 88, 389 and 445 are listed as open with service names.', 'ndiff shows that port 8080 changed from open to closed.', 'The target/actual report with scope, time, commands and deviations is ready.']
    ]
  },
  trouble: [
    [['همهٔ پورت‌ها filtered هستند و میزبان خاموش به نظر می‌رسد.', 'Alle Ports sind filtered und der Host scheint aus zu sein.', 'All ports are filtered and the host seems down.'],
     ['فایروال میزبان مسدود می‌کند. -Pn را به کار ببر، پروفایل فایروال (Domain، Private، Public) را بررسی کن و مسیریابی یا ACL بین دو شبکه را کنترل کن.', 'Die Host-Firewall blockiert. -Pn verwenden, das Firewall-Profil (Domäne, Privat, Öffentlich) prüfen und Routing oder ACLs dazwischen kontrollieren.', 'The host firewall blocks. Use -Pn, check the firewall profile (domain, private, public) and verify routing or ACLs in between.']],
    [['اسکن خیلی طول می‌کشد.', 'Der Scan dauert extrem lange.', 'The scan takes extremely long.'],
     ['UDP یا -p- روی میزبان‌های زیاد کند است. پورت‌ها را محدود کن (--top-ports)، فهرست میزبان را کوچک کن و در شبکهٔ تولیدی با -T5 «سریع» نکن.', 'UDP oder -p- auf vielen Hosts ist langsam. Ports einschränken (--top-ports), die Hostliste verkleinern und im Produktivnetz nicht mit -T5 „beschleunigen“.', 'UDP or -p- on many hosts is slow. Limit ports (--top-ports), shrink the host list and do not “speed up” with -T5 on production networks.']],
    [['تیم امنیت به‌خاطر اسکن پورت هشدار می‌دهد.', 'Das Sicherheitsteam meldet einen Alarm wegen des Portscans.', 'The security team raises an alert about the port scan.'],
     ['اسکن را از قبل اعلام کن و IP مبدأ و بازهٔ زمانی را بگو. استثنای IDS یا EDR فقط موقت باشد. هشدار نشان می‌دهد نظارت کار می‌کند.', 'Scans vorher anmelden und Quell-IP sowie Zeitfenster mitteilen. Ausnahmen in IDS oder EDR nur zeitlich begrenzt. Der Alarm zeigt, dass die Überwachung funktioniert.', 'Announce scans in advance with source IP and time window. IDS or EDR exceptions only temporarily. The alert shows that monitoring works.']]
  ],
  decide: [
    [['Nmap یا Angry IP Scanner؟', 'Nmap oder Angry IP Scanner?', 'Nmap or Angry IP Scanner?'],
     ['Angry IP Scanner برای نمای سریع اینکه کدام IPها مشغول‌اند (رابط گرافیکی)؛ Nmap برای سرویس‌ها، نسخه‌ها، بررسی فایروال و گزارش.', 'Angry IP Scanner für eine schnelle Übersicht, welche IPs belegt sind (Oberfläche); Nmap für Dienste, Versionen, Firewall-Prüfung und Berichte.', 'Angry IP Scanner for a quick overview of which IPs are in use (GUI); Nmap for services, versions, firewall checks and reports.']],
    [['اسکن از داخل LAN یا از بیرون؟', 'Scan aus dem LAN oder von außen?', 'Scan from the LAN or from outside?'],
     ['از داخل می‌بینی کارکنان به چه چیزی دسترسی دارند؛ از بیرون (اینترنت) می‌بینی مهاجم چه می‌بیند. برای نمای بیرونی از آزمون آنلاین یا اسکن خارجی سفارش‌داده‌شده استفاده کن (ماژول آزمون آنلاین فایروال).', 'Von innen siehst du, was Mitarbeitende erreichen; von außen (Internet), was Angreifer sehen. Für die Außensicht einen Online-Test oder einen beauftragten externen Scan nutzen (Modul Online-Firewall-Test).', 'From inside you see what staff can reach; from outside (internet) what attackers see. For the outside view use an online test or a commissioned external scan (online firewall test module).']]
  ],
  pitfalls: [
    ['اسکن بدون مجوز یا بیرون از محدوده (زیرشبکهٔ اشتباه).', 'Scannen ohne Freigabe oder außerhalb des Scopes (falsches Subnetz).', 'Scanning without permission or outside the scope (wrong subnet).'],
    ['filtered را مساوی «امن» دانستن؛ ممکن است سرویس از شبکه‌های دیگر در دسترس باشد.', '„filtered“ mit „sicher“ gleichsetzen; der Dienst kann aus anderen Netzen erreichbar sein.', 'Equating “filtered” with “secure”; the service may be reachable from other networks.'],
    ['گزینه‌های تهاجمی (-A، -T5، اسکریپت‌ها) روی دستگاه‌های حساس.', 'Aggressive Optionen (-A, -T5, Skripte) auf empfindliche Geräte loslassen.', 'Running aggressive options (-A, -T5, scripts) against sensitive devices.']
  ],
  iv: [
    [['open، closed و filtered یعنی چه؟', 'Was bedeuten open, closed und filtered?', 'What do open, closed and filtered mean?'],
     ['open: سرویسی جواب می‌دهد. closed: میزبان در دسترس است ولی سرویسی نیست (RST). filtered: پاسخی نمی‌آید، معمولاً فایروال بسته را دور می‌اندازد.', 'open: Ein Dienst antwortet. closed: Host erreichbar, aber kein Dienst (RST). filtered: keine Antwort, meist verwirft eine Firewall das Paket.', 'open: a service answers. closed: host reachable but no service (RST). filtered: no answer, usually a firewall drops the packet.']],
    [['بعد از تغییر فایروال چطور بررسی می‌کنی که درست کار می‌کند؟', 'Wie prüfst du nach einer Firewall-Änderung, ob sie wirkt?', 'How do you check after a firewall change that it works?'],
     ['فهرست مطلوب، اسکن قبل و بعد از منطقهٔ مبدأ درست، مقایسه با ndiff و Test-NetConnection برای پورت‌های تکی؛ نتیجه را مستند می‌کنم.', 'Soll-Liste, Scan vorher und nachher aus der richtigen Quellzone, Vergleich mit ndiff und Test-NetConnection für einzelne Ports; Ergebnis dokumentieren.', 'Target list, scan before and after from the right source zone, compare with ndiff and Test-NetConnection for single ports; document the result.']],
    [['آیا می‌توان در شبکهٔ شرکت Nmap اجرا کرد؟', 'Darf man Nmap im Firmennetz einsetzen?', 'May you use Nmap on a company network?'],
     ['فقط با مأموریت یا مجوز، محدوده و بازهٔ زمانی مشخص و با اطلاع تیم امنیت.', 'Nur mit Auftrag oder Freigabe, festgelegtem Scope und Zeitfenster und mit Information an das Sicherheitsteam.', 'Only with a mandate or permission, a defined scope and time window and with the security team informed.']]
  ],
  sources: [
    ['Nmap Documentation', 'https://nmap.org/docs.html'],
    ['Nmap Network Scanning (offizielles Buch, teils frei)', 'https://nmap.org/book/']
  ]
}

);
})();
