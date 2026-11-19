/* Arefi ITPraxis – Projektmappe „Privat / Home-Office“: Heimnetz einer Familie mit Home-Office-Arbeitsplatz.
   Fiktives Beispiel. Preise recherchiert 11/2026 (Quelle je Position), PW = Planwert (Annahme). */
(() => {
'use strict';
const P = window.ArefiPlanProjects = window.ArefiPlanProjects || [];
P.push({
  id: 'p-privat', code: 'HN-HUBER-2027', client: 'Familie Huber, Graz (fiktives Beispiel)',
  size: ['خانه و دفتر خانگی', 'Privat / Home-Office', 'Home / home office'],
  title: ['شبکهٔ خانگی: خانهٔ دوطبقهٔ خانوادهٔ Huber با یک میز کار دورکاری', 'Privat: Heimnetz der Familie Huber mit Home-Office-Arbeitsplatz', 'Home: network for the Huber family house with a home-office desk'],
  lead: ['چهار نفر، یک خانهٔ دوطبقه، یک لپ‌تاپ شرکت برای دورکاری و ده‌ها دستگاه هوشمند. هدف: WLAN خوب در همهٔ اتاق‌ها، تماس تصویری بدون قطعی، و جدا بودن لپ‌تاپ شرکت، مهمان‌ها و دستگاه‌های هوشمند از هم. دو گزینه را مقایسه می‌کنی: FRITZ!Box با شبکهٔ مهمان، یا UniFi با VLAN واقعی.', 'Vier Personen, ein Haus mit zwei Etagen, ein Firmen-Notebook im Home-Office und dutzende Smart-Geräte. Ziel: gutes WLAN in allen Räumen, Videokonferenzen ohne Abbrüche und eine saubere Trennung von Firmen-Notebook, Gästen und Smart-Geräten. Du vergleichst zwei Varianten: FRITZ!Box mit Gastnetz oder UniFi mit echten VLANs.', 'Four people, a two-storey house, a company notebook for home office and dozens of smart devices. Goal: good Wi-Fi in every room, video calls without drop-outs and clean separation of the company notebook, guests and smart devices. You compare two variants: FRITZ!Box with guest network or UniFi with real VLANs.'],
  facts: [
    [['کارفرما', 'Auftraggeber', 'Client'], 'Familie Huber (2 Erwachsene, 2 Kinder); Frau Huber arbeitet 3 Tage pro Woche im Home-Office'],
    [['کاربران و دستگاه‌ها', 'Nutzer und Geräte', 'Users and devices'], '4 Personen, 1 Firmen-Notebook, 2 private PCs/Notebooks, 6 Smartphones/Tablets, 2 Smart-TVs, 1 Spielkonsole, 3 Kameras, 9 Smart-Home-Geräte'],
    [['محل', 'Standort', 'Site'], 'Einfamilienhaus, 2 Etagen, ca. 160 m², Glasfaser-Hausanschluss im Keller'],
    [['هدف دسترس‌پذیری', 'Verfügbarkeitsziel', 'Availability target'], 'Home-Office-Tage: Internet ≥ 99,5 % (Ausfall höchstens ca. 44 h pro Jahr)'],
    [['بودجه', 'Budget', 'Budget'], 'bis 1.000 € brutto inkl. Einrichtung'],
    [['مدت', 'Dauer', 'Duration'], '1 Tag vor Ort (Samstag), Vorbereitung 2 h'],
    [['نقش تو', 'Deine Rolle', 'Your role'], 'IT-Techniker eines kleinen IT-Dienstleisters, Auftrag „Home-Office-Check und Heimnetz“']
  ],
  docs: [

{ id: 'steckbrief', ph: 'init',
  t: ['شناسنامهٔ پروژه', 'Projektsteckbrief', 'Project brief'],
  title: 'Projektsteckbrief: Heimnetz mit Home-Office',
  why: ['حتی یک کار کوچک خانگی هم یک صفحه شناسنامه لازم دارد: چه چیزی تحویل می‌دهی، چه چیزی نه، و با چه معیاری می‌گویی «تمام شد». بیشتر دعواها با مشتری خصوصی از همین مرزهای نانوشته می‌آید.', 'Auch ein kleiner Privatauftrag braucht eine Seite Steckbrief: Was lieferst du, was nicht, und woran erkennt man, dass es fertig ist? Die meisten Streitfälle mit Privatkunden entstehen aus unausgesprochenen Grenzen.', 'Even a small home job needs a one-page brief: what you deliver, what you do not, and how everyone knows it is finished. Most disputes with private clients come from unwritten boundaries.'],
  body: [
    { kv: [
      ['Projekt', 'Neuaufbau Heimnetz mit getrenntem Home-Office-Zugang'],
      ['Ausgangslage', 'Provider-Modem mit eingebautem WLAN im Keller; im Obergeschoss schwaches WLAN; Videokonferenzen brechen ab; alle Geräte im selben Netz'],
      ['Ziel', 'Stabiles Internet und WLAN in allen Räumen, Firmen-Notebook getrennt von privaten Geräten, Gäste und Smart-Geräte isoliert'],
      ['Nicht Teil des Auftrags', 'Einrichtung des Firmen-Notebooks (macht die IT des Arbeitgebers), Elektroarbeiten, Smart-Home-Automationen'],
      ['Budget', 'bis 1.000 € brutto inkl. Arbeitszeit'],
      ['Termin', 'Samstag, 1 Arbeitstag vor Ort; Internetunterbrechung höchstens 2 h'],
      ['Abnahme', 'gemeinsamer Rundgang mit Messprotokoll (siehe Betrieb und Übergabe)']
    ] },
    { h: 'Ziele (SMART)' },
    { ul: [
      'WLAN-Signal in allen Wohnräumen und im Arbeitszimmer ≥ −67 dBm, gemessen am Übergabetag.',
      'Firmen-Notebook per LAN-Kabel angeschlossen, Download ≥ 250 Mbit/s und Upload ≥ 40 Mbit/s am Arbeitsplatz.',
      'Firmen-Notebook, Gäste und Smart-Geräte erreichen sich gegenseitig nicht (Test mit Ping und Portscan).',
      'Familie kann Internetstörung mit dem Störungszettel selbst eingrenzen.'
    ] }
  ] },

{ id: 'anforderungen', ph: 'def',
  t: ['نیازها و برداشت وضعیت', 'Ist-Aufnahme und Anforderungen', 'Current state and requirements'],
  title: 'Ist-Aufnahme und Anforderungen',
  why: ['اول ببین چه هست، بعد بپرس چه لازم است. هر نیاز را قابل آزمون بنویس؛ «WLAN خوب» آزمون‌پذیر نیست، «≥ −67 dBm در اتاق کار» هست.', 'Erst aufnehmen, was da ist, dann fragen, was gebraucht wird. Jede Anforderung muss prüfbar sein: „gutes WLAN“ ist nicht prüfbar, „≥ −67 dBm im Arbeitszimmer“ schon.', 'First record what exists, then ask what is needed. Every requirement must be testable: “good Wi-Fi” is not, “≥ −67 dBm in the study” is.'],
  body: [
    { h: 'Ist-Aufnahme (Besichtigung)' },
    { keep: 1, t: ['Bereich', 'Befund', 'Bewertung'], r: [
      ['Internet', 'Glasfaser 500/100 Mbit/s, Provider-Modem mit Router und WLAN im Keller', 'Leitung ausreichend, Standort des WLAN schlecht'],
      ['WLAN', 'Keller −58 dBm, EG Wohnzimmer −71 dBm, OG Arbeitszimmer −82 dBm (Messung mit Smartphone-App)', 'OG nicht versorgt'],
      ['Verkabelung', 'Leerrohr vom Keller ins EG (Wohnzimmer), keine Leitung ins OG', 'eine Leitung ins OG über Leerrohr im Treppenhaus möglich'],
      ['Geräte', '27 Geräte im selben Netz, Kameras mit Standardpasswort, Router-Firmware 2 Jahre alt', 'hohes Risiko'],
      ['Home-Office', 'Firmen-Notebook im WLAN, Arbeitgeber-VPN (IPsec) bricht im OG ab', 'Hauptproblem des Kunden']
    ] },
    { h: 'Anforderungen' },
    { keep: 2, t: ['Nr.', 'Anforderung', 'Priorität', 'Prüfung'], r: [
      ['A01', 'Arbeitsplatz im OG per LAN-Kabel, ≥ 250/40 Mbit/s', 'Muss', 'Speedtest am Notebook'],
      ['A02', 'WLAN ≥ −67 dBm in allen Wohnräumen', 'Muss', 'Messung an 8 Punkten'],
      ['A03', 'Firmen-Notebook getrennt von privaten Geräten', 'Muss', 'Ping und Portscan in beide Richtungen'],
      ['A04', 'Gäste-WLAN ohne Zugriff auf das Heimnetz, Zugang per QR-Code', 'Muss', 'Test mit Gast-Smartphone'],
      ['A05', 'Kameras und Smart-Home-Geräte isoliert, nur Hersteller-Cloud erlaubt', 'Soll', 'Portscan aus dem Familiennetz'],
      ['A06', 'Internet-Ersatz bei Leitungsstörung an Home-Office-Tagen', 'Soll', 'Glasfaser abziehen, Videokonferenz läuft weiter'],
      ['A07', 'Kurze Stromausfälle überbrücken (Router, Switch)', 'Soll', 'Stecker der USV ziehen, Laufzeit messen'],
      ['A08', 'Fernzugriff der Familie auf Fotos (NAS optional) ohne offene Ports', 'Kann', 'Zugriff über Mobilfunk testen'],
      ['A09', 'Kinderschutz: Zeitlimits und Filter für die Kindergeräte', 'Kann', 'Profil am Kindertablet prüfen']
    ] }
  ] },

{ id: 'recht', ph: 'def',
  t: ['حقوقی (آلمان و اتریش)', 'Recht (Deutschland und Österreich)', 'Law (Germany and Austria)'],
  title: 'Recht und Datenschutz im Heimnetz – Deutschland und Österreich',
  why: ['در خانه هم قانون هست: داده‌های کارفرما روی لپ‌تاپ شرکت، دوربینی که خیابان را می‌بیند، و کنترل اینترنت بچه‌ها. این سند آموزشی است و جای مشاورهٔ حقوقی را نمی‌گیرد.', 'Auch zu Hause gilt Recht: Firmendaten auf dem Notebook, eine Kamera, die die Straße filmt, die Internetkontrolle für Kinder. Dieses Dokument dient dem Lernen und ersetzt keine Rechtsberatung.', 'Law applies at home too: employer data on the notebook, a camera filming the street, internet control for children. This document is for learning and does not replace legal advice.'],
  body: [
    { keep: 1, t: ['Thema', 'Deutschland', 'Österreich', 'Folge für die Planung'], r: [
      ['Firmendaten im Home-Office', 'Arbeitgeber bleibt nach DSGVO verantwortlich; Vorgaben stehen meist in einer Homeoffice-Richtlinie', 'ebenso DSGVO und DSG; Telearbeit (früher Home-Office): Arbeitgeber stellt die nötigen digitalen Arbeitsmittel bereit oder ersetzt die Kosten (AVRAG § 2h)', 'Firmen-Notebook in eigenes Netz, Regeln des Arbeitgebers erfragen, keine Eingriffe am Firmengerät'],
      ['Kameras', 'nur eigenes Grundstück filmen; öffentlicher Raum und Nachbargrund tabu (DSGVO)', 'ebenso; Bildaufnahmen zusätzlich nach DSG §§ 12–13', 'Kamerawinkel prüfen, Aufnahmen nur lokal oder verschlüsselt speichern'],
      ['Eigener Router', 'Routerfreiheit: eigenes Gerät am Netzabschluss erlaubt', 'beim Provider klären, ob ein eigenes Gerät direkt angeschlossen werden darf', 'im Zweifel eigenes Gerät hinter dem Provider-Modem betreiben'],
      ['Gäste-WLAN', 'Gäste nur ins getrennte Gastnetz', 'ebenso', 'Gastnetz mit Client-Isolation, kein Zugriff aufs Heimnetz'],
      ['Kinderschutz', 'Eltern entscheiden; Filter ersetzen keine Begleitung', 'ebenso', 'Zeitprofile und Filter für Kindergeräte, offen mit den Kindern besprechen']
    ] },
    { note: 'Privathaushalte fallen nicht unter NIS-2. Der Arbeitgeber kann aber Mindestanforderungen an das Home-Office stellen (z. B. eigenes Netz, aktuelle Router-Firmware) – diese vor der Planung abfragen.' }
  ],
  src: [['DSGVO (EUR-Lex)', 'https://eur-lex.europa.eu/eli/reg/2016/679/oj'], ['Telearbeit und Home-Office in Österreich seit 2025 (DRdA infas)', 'https://www.drda.at/infas/2024/417/42/Vom-Homeoffice-zur-Telearbeit--Was-aendert-sich-2025']] },

{ id: 'netzplan', ph: 'plan',
  t: ['نقشهٔ شبکه (فیزیکی و منطقی)', 'Netzplan (physisch und logisch)', 'Network diagram (physical and logical)'],
  title: 'Netzplan: logisch (zwei Varianten) und physisch (Raumplan)',
  why: ['نقشهٔ منطقی نشان می‌دهد کدام دستگاه در کدام شبکه است و چه چیزی از کجا عبور می‌کند. نقشهٔ فیزیکی (پلان اتاق‌ها) نشان می‌دهد دستگاه کجا نصب و کابل از کجا کشیده می‌شود. هر دو را لازم داری.', 'Der logische Plan zeigt, welches Gerät in welchem Netz ist und welcher Verkehr wo durchläuft. Der physische Plan (Raumplan) zeigt, wo Geräte hängen und wo Kabel verlaufen. Du brauchst beide.', 'The logical plan shows which device is in which network and where traffic flows. The physical plan (room plan) shows where devices are mounted and where cables run. You need both.'],
  body: [
    { h: 'Variante A (empfohlen): FRITZ!Box mit Mesh und Gastnetz' },
    { topo: { w: 760, h: 430, n: [
      ['inet', 'cloud', 380, 40, 'Internet', 'Glasfaser 500/100'],
      ['ont', 'router', 380, 135, 'Glasfaser-Modem (ONT)', 'Keller · Provider'],
      ['fb', 'router', 380, 240, 'FRITZ!Box 7690', 'EG Flur · Router, WLAN, Firewall'],
      ['hs', 'laptop', 650, 135, 'Handy-Hotspot', 'Ersatz bei Störung'],
      ['sw', 'switch', 200, 340, 'Switch 8 Port', 'OG · Privat-PC, Drucker'],
      ['nb', 'laptop', 60, 240, 'Firmen-Notebook', 'OG Arbeitszimmer'],
      ['rep', 'ap', 600, 340, 'FRITZ!Repeater 1700', 'OG Flur · Mesh'],
      ['fam', 'pc', 380, 410, 'Familiengeräte', 'Heimnetz'],
      ['iot', 'pc', 700, 410, 'Kameras, Smart-Home', 'Gast-WLAN „Huber-Gast“']
    ], l: [['inet', 'ont', 'Glasfaser'], ['ont', 'fb', 'LAN 2,5 Gbit/s'], ['hs', 'fb', 'WLAN-Uplink', 'alt'], ['fb', 'sw', 'LAN 2 · Heimnetz'], ['fb', 'nb', 'LAN 4 · Gastnetz'], ['fb', 'rep', 'Mesh', 'wifi'], ['fb', 'fam', 'WLAN/LAN'], ['rep', 'iot', 'Gast-WLAN', 'wifi']] } },
    { note: 'Trennung in Variante A: Die FRITZ!Box kennt keine frei einstellbaren VLANs. Sie bietet aber ein vom Heimnetz getrenntes Gastnetz (WLAN und LAN-Anschluss 4). Firmen-Notebook und Smart-Geräte kommen ins Gastnetz und sind damit vom Familiennetz getrennt. Grenze: Notebook und Smart-Geräte teilen sich dann dasselbe Gastnetz – daher „Gastgeräte dürfen untereinander kommunizieren“ ausschalten.' },
    { h: 'Variante B: UniFi mit echten VLANs' },
    { topo: { w: 760, h: 400, n: [
      ['inet', 'cloud', 380, 40, 'Internet', 'Glasfaser 500/100'],
      ['ont', 'router', 380, 130, 'Glasfaser-Modem (ONT)', 'Keller'],
      ['gw', 'firewall', 380, 225, 'UniFi Cloud Gateway Ultra', 'Router, Firewall, VLANs'],
      ['sw', 'switch', 380, 320, 'Switch Lite 8 PoE', 'Trunk VLAN 10–40, 99'],
      ['ap1', 'ap', 150, 320, 'U7 Lite EG', 'SSIDs je VLAN'],
      ['ap2', 'ap', 610, 320, 'U7 Lite OG', 'SSIDs je VLAN'],
      ['nb', 'laptop', 250, 390, 'Firmen-Notebook', 'VLAN 20'],
      ['tv', 'pc', 510, 390, 'Kameras, TV', 'VLAN 30']
    ], l: [['inet', 'ont', 'Glasfaser'], ['ont', 'gw', 'WAN'], ['gw', 'sw', 'Trunk'], ['sw', 'ap1', 'PoE · Trunk'], ['sw', 'ap2', 'PoE · Trunk'], ['sw', 'nb', 'Access VLAN 20'], ['sw', 'tv', 'Access VLAN 30']] } },
    { h: 'Physischer Plan (Raumplan)' },
    { keep: 2, t: ['Raum', 'Gerät', 'Anschluss', 'Hinweis'], r: [
      ['Keller, Technikecke', 'Glasfaser-Modem (ONT), USV', 'Glasfaser vom Provider', 'ONT bleibt Eigentum des Providers'],
      ['EG Flur (Mitte des Hauses)', 'FRITZ!Box 7690', 'Cat-6A-Leitung vom Keller im vorhandenen Leerrohr', 'zentral und erhöht für gute WLAN-Abdeckung'],
      ['OG Arbeitszimmer', 'Firmen-Notebook (Dose OG-AZ-1), Switch 8 Port für Privat-PC und Drucker (Dose OG-AZ-2)', 'zwei neue Cat-6A-Leitungen EG → OG im Leerrohr Treppenhaus', 'OG-AZ-1 an LAN 4 (Gastnetz), OG-AZ-2 an LAN 2 (Heimnetz); Dosen beschriften'],
      ['OG Flur', 'FRITZ!Repeater 1700', 'Steckdose, Mesh über Funk', 'Position mit FRITZ!App WLAN gewählt'],
      ['Wohnzimmer', 'Smart-TV, Spielkonsole', 'WLAN', 'später LAN-Dose möglich']
    ] },
    { h: 'Kernentscheidungen' },
    { keep: 1, t: ['Entscheidung', 'Begründung', 'Bezug'], r: [
      ['Router aus dem Keller ins EG verlegen', 'Ein Keller-Standort schwächt das WLAN in allen Etagen; Mitte des Hauses ist günstiger', 'A02'],
      ['Arbeitsplatz per Kabel statt WLAN', 'Kabel ist stabiler und hat kaum Schwankungen – entscheidend für VPN und Videokonferenz', 'A01'],
      ['Variante A als Empfehlung', 'Einfach zu bedienen, Familie kennt die Oberfläche, Updates automatisch; Variante B nur, wenn echte Trennung von Notebook und Smart-Geräten verlangt wird', 'A03–A05'],
      ['Handy-Hotspot statt zweiter Leitung', 'Ersatz für wenige Stunden reicht, keine Zusatzkosten', 'A06']
    ] }
  ] },

{ id: 'ipplan', ph: 'plan',
  t: ['طرح شبکه‌ها، VLAN و IP', 'VLAN- und IP-Plan', 'VLAN and IP plan'],
  title: 'Netze, VLANs und IP-Adressen für beide Varianten',
  why: ['حتی در خانه هر شبکه یک نام، یک محدودهٔ آدرس و یک هدف دارد. وقتی بعداً کسی زنگ می‌زند «اینترنت تلویزیون قطع است»، با این جدول فوراً می‌دانی دستگاه کجاست.', 'Auch zu Hause hat jedes Netz einen Namen, einen Adressbereich und einen Zweck. Ruft später jemand an „der Fernseher hat kein Internet“, weißt du mit dieser Tabelle sofort, wo das Gerät hängt.', 'Even at home every network has a name, an address range and a purpose. When someone later calls “the TV has no internet”, this table tells you at once where the device lives.'],
  body: [
    { h: 'Variante A: FRITZ!Box' },
    { keep: 2, t: ['Netz', 'Zweck', 'IPv4', 'DHCP', 'Geräte'], r: [
      ['Heimnetz', 'Familie', '192.168.178.0/24', '.20–.200', 'PCs, Handys, Tablets, TV, Konsole'],
      ['Gastnetz', 'Firmen-Notebook (LAN 4), Smart-Geräte und Besuch (Gast-WLAN „Huber-Gast“)', '192.168.179.0/24', 'automatisch', 'Notebook, Kameras, Steckdosen, Gastgeräte']
    ] },
    { note: 'Schwäche von Variante A: Die FRITZ!Box hat nur ein Gastnetz. Gäste, Smart-Geräte und Firmen-Notebook teilen es. Deshalb im Gastzugang „Gastgeräte dürfen untereinander kommunizieren“ deaktivieren. Wer echte Trennung braucht, wählt Variante B.' },
    { h: 'Variante B: UniFi mit VLANs' },
    { keep: 2, t: ['VLAN', 'Name', 'IPv4-Netz', 'Gateway', 'DHCP', 'WLAN (SSID)'], r: [
      ['1', 'MGMT (UniFi-Geräte)', '10.0.1.0/24', '10.0.1.1', 'statisch', '–'],
      ['10', 'FAMILIE', '10.0.10.0/24', '10.0.10.1', '.20–.200', 'Huber'],
      ['20', 'HOMEOFFICE', '10.0.20.0/24', '10.0.20.1', '.20–.50', '– (nur Kabel)'],
      ['30', 'IOT', '10.0.30.0/24', '10.0.30.1', '.20–.200', 'Huber-IoT (nur 2,4 GHz möglich)'],
      ['40', 'GAST', '10.0.40.0/24', '10.0.40.1', '.20–.200', 'Huber-Gast (Client-Isolation)']
    ], cap: 'Regel: VLAN-Nummer = drittes Oktett. IPv6: vom Provider delegiertes Präfix (oft /56), je VLAN ein /64.' },
    { h: 'Dienste' },
    { kv: [
      ['DNS', 'Router als Resolver; optional DNS-over-TLS zu einem Anbieter mit Filter für Kindergeräte'],
      ['DHCP', 'Router; feste Adressen nur für Drucker und NAS (Reservierung, nicht am Gerät eingetragen)'],
      ['Zeit', 'Router holt Zeit aus dem Internet (NTP) und verteilt sie'],
      ['IPv6', 'eingeschaltet lassen; Firewall filtert eingehenden IPv6-Verkehr wie IPv4']
    ] }
  ] },

{ id: 'erreichbarkeit', ph: 'plan',
  t: ['اتصال و دسترسی از بیرون', 'Erreichbarkeit: Internet, VPN, Fernzugriff', 'Reachability: internet, VPN, remote access'],
  title: 'Erreichbarkeit: Internet, Firmen-VPN und Fernzugriff ohne offene Ports',
  why: ['«در دسترس بودن» یعنی چه کسی از کجا به چه چیزی وصل می‌شود: لپ‌تاپ به VPN شرکت، خانواده از بیرون به عکس‌ها. پورت باز روی روتر خانگی بزرگ‌ترین خطر است؛ VPN جایش را می‌گیرد.', 'Erreichbarkeit heißt: Wer kommt von wo an was heran? Das Notebook ins Firmen-VPN, die Familie von unterwegs an die Fotos. Offene Ports am Heimrouter sind das größte Risiko – ein VPN ersetzt sie.', 'Reachability means who reaches what from where: the notebook into the company VPN, the family from outside to the photos. Open ports on a home router are the biggest risk; a VPN replaces them.'],
  body: [
    { keep: 1, t: ['Verbindung', 'Weg', 'Voraussetzung', 'Prüfung'], r: [
      ['Familie → Internet', 'Heimnetz → FRITZ!Box → ONT → Provider', 'Internetzugang „Externes Modem oder Router“ mit Glasfaser-Modem', 'Speedtest, Webseiten im EG und OG'],
      ['Firmen-Notebook → Firmen-VPN', 'Gastnetz-Port → FRITZ!Box → Internet → VPN-Gateway der Firma', 'VPN nutzt meist UDP 500/4500 (IPsec) oder TCP/UDP 443; FRITZ!Box lässt ausgehend alles durch', 'VPN-Verbindung aufbauen, Firmenportal öffnen, Videokonferenz 10 min'],
      ['Familie unterwegs → Fotos/NAS', 'WireGuard-VPN in der FRITZ!Box, App auf dem Handy', 'erreichbare Adresse von außen (öffentliche IPv4 oder IPv6), MyFRITZ!-Adresse', 'Handy im Mobilfunk: Verbindung aufbauen, Ordner öffnen'],
      ['Hersteller-Cloud → Kameras', 'Kamera baut ausgehende Verbindung zur Cloud auf', 'keine Portfreigabe, kein UPnP', 'Kamerabild in der App über Mobilfunk']
    ] },
    { h: 'Stolperstein DS-Lite und CGNAT' },
    { p: 'Viele Kabel- und manche Glasfaseranschlüsse liefern keine eigene öffentliche IPv4-Adresse (DS-Lite oder Carrier-Grade-NAT). Dann ist das Heimnetz aus dem Internet über IPv4 nicht erreichbar, und ein VPN von unterwegs scheitert, wenn das Handy nur IPv4 hat. Lösungen: beim Provider eine öffentliche IPv4-Adresse anfragen, oder VPN über IPv6 nutzen, wenn beide Seiten IPv6 haben. Ausgehende Verbindungen (Firmen-VPN, Cloud) funktionieren trotzdem.' },
    { h: 'Was ausdrücklich nicht gemacht wird' },
    { ul: ['Keine Portfreigaben für Kameras, NAS oder Router-Oberfläche.', 'UPnP für alle Geräte aus; nur die Spielkonsole bekommt es, wenn ein Spiel es nachweislich braucht.', 'Kein Fernzugriff auf die Router-Oberfläche aus dem Internet ohne VPN.'] }
  ] },

{ id: 'sicherheit', ph: 'plan',
  t: ['امنیت و جداسازی', 'Sicherheit und Trennung', 'Security and separation'],
  title: 'Sicherheitszonen, Kommunikationsmatrix und Härtung des Routers',
  why: ['دوربین ارزان با رمز پیش‌فرض و لپ‌تاپ شرکت نباید در یک شبکه باشند. جدول ارتباط‌ها می‌گوید کدام بخش با کدام بخش حرف می‌زند؛ هر چیزی که در جدول نیست، ممنوع است.', 'Eine billige Kamera mit Standardpasswort und das Firmen-Notebook gehören nicht in dasselbe Netz. Die Kommunikationsmatrix legt fest, welche Zone mit welcher sprechen darf; alles andere ist verboten.', 'A cheap camera with a default password and the company notebook do not belong in the same network. The matrix states which zone may talk to which; everything else is denied.'],
  body: [
    { h: 'Kommunikationsmatrix (Variante B, in Variante A sinngemäß)' },
    { keep: 1, t: ['Von \\ Nach', 'Internet', 'FAMILIE', 'HOMEOFFICE', 'IOT', 'GAST', 'Router-Verwaltung'], r: [
      ['FAMILIE', 'ja', 'ja', '–', 'nur App-Steuerung (z. B. TV-Cast) freigegeben', '–', 'nur Eltern-PC'],
      ['HOMEOFFICE', 'ja (Firmen-VPN)', '–', '–', '–', '–', '–'],
      ['IOT', 'nur Hersteller-Cloud', '–', '–', '–', '–', '–'],
      ['GAST', 'ja', '–', '–', '–', '– (Client-Isolation)', '–']
    ], cap: '„–“ = gesperrt. Antworten auf erlaubte Verbindungen sind automatisch erlaubt (zustandsbehaftete Firewall).' },
    { h: 'Härtung' },
    { ul: [
      'Router-Kennwort neu, lang (≥ 16 Zeichen), im Passwortmanager der Eltern; Zwei-Faktor-Bestätigung für wichtige Einstellungen eingeschaltet.',
      'Automatische Updates für Router und Repeater aktiv; Kameras und Smart-Geräte auf aktuelle Firmware, Standardpasswörter geändert.',
      'WLAN mit WPA3 (Übergangsmodus WPA2/WPA3 nur, solange alte Geräte es brauchen); WPS-PIN aus.',
      'UPnP und automatische Portfreigaben aus; Fernzugang nur per VPN.',
      'Konfiguration der FRITZ!Box verschlüsselt sichern (Datei mit Kennwort) und beim Kunden ablegen.',
      'Kindergeräte mit Zugangsprofil (Zeitlimit, Filter).'
    ] }
  ],
  src: [['BSI – Router, WLAN und VPN sicher einrichten', 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Router-WLAN-VPN/router-wlan-vpn_node.html']] },

{ id: 'verfuegbarkeit', ph: 'plan',
  t: ['دسترس‌پذیری', 'Verfügbarkeit', 'Availability'],
  title: 'Verfügbarkeit: Rechnung, Schwachstellen, Ersatzweg',
  why: ['تعرفهٔ اینترنت خانگی معمولاً هیچ تضمینی برای دسترس‌پذیری ندارد. با یک حساب ساده نشان می‌دهی که روزهای دورکاری بدون مسیر جایگزین به هدف نمی‌رسند.', 'Privattarife enthalten meist keine zugesicherte Verfügbarkeit. Mit einer einfachen Rechnung zeigst du, dass die Home-Office-Tage ohne Ersatzweg das Ziel verfehlen.', 'Home tariffs usually guarantee no availability. A simple calculation shows that home-office days miss the target without a fallback path.'],
  body: [
    { keep: 1, t: ['Komponente', 'Annahme', 'Begründung'], r: [
      ['Glasfaser (Privattarif)', '99,5 %', 'PW: keine Zusage im Vertrag, Erfahrungswert'],
      ['Handy-Hotspot', '98,0 %', 'PW: Mobilfunkversorgung im Haus gemessen (4 Balken im OG)'],
      ['FRITZ!Box', '99,9 %', 'PW: Einzelgerät, Ersatz beim Händler in 1–2 Tagen'],
      ['Strom mit kleiner USV', '99,99 %', 'PW: USV überbrückt kurze Ausfälle']
    ] },
    { h: 'Rechnung (Arbeitsplatz → Internet)' },
    { pre: 'Ohne Ersatzweg:   0,995 × 0,999 × 0,9999                 = 0,99391 → 99,39 %\nAusfall pro Jahr:  (1 − 0,99391) × 8.760 h               ≈ 53,4 h\n\nMit Handy-Hotspot: 1 − (1 − 0,995) × (1 − 0,98)          = 0,9999\nGesamt:            0,9999 × 0,999 × 0,9999               = 0,99880 → 99,88 %\nAusfall pro Jahr:  (1 − 0,99880) × 8.760 h               ≈ 10,5 h' },
    { note: 'Ergebnis: Ohne Ersatzweg wird das Ziel 99,5 % verfehlt. Der Handy-Hotspot kostet nichts extra und hebt die Verfügbarkeit auf ca. 99,9 %. Wichtig: Der Umstieg ist manuell (Notebook mit Hotspot verbinden) – im Störungszettel beschreiben.' },
    { h: 'Schwachstellen (Single Points of Failure)' },
    { keep: 1, t: ['SPOF', 'Auswirkung', 'Gegenmaßnahme'], r: [
      ['FRITZ!Box', 'kein Internet, kein WLAN', 'Konfigurationssicherung; alter Provider-Router bleibt als Notlösung im Keller'],
      ['Leitung EG → OG', 'Arbeitsplatz ohne Kabel', 'Notebook kann ins WLAN des Repeaters (schwächer, aber nutzbar)'],
      ['Strom', 'Router und ONT aus', 'USV 750 VA für ONT und Router (Laufzeit gemessen, siehe Übergabe)']
    ] }
  ] },

{ id: 'qualitaet', ph: 'plan',
  t: ['کیفیت و کارایی', 'Leistung und Qualität', 'Performance and quality'],
  title: 'Bandbreitenbedarf, WLAN-Qualität, Priorisierung und Abnahmekriterien',
  why: ['کیفیت را با عدد تعریف کن: چند مگابیت، چند dBm، چند میلی‌ثانیه. بعد همین عددها را در روز تحویل اندازه بگیر. مشتری چیزی را قبول می‌کند که دیده و اندازه گرفته است.', 'Qualität wird mit Zahlen festgelegt: wie viele Mbit/s, wie viel dBm, wie viele Millisekunden. Genau diese Werte misst du am Übergabetag. Der Kunde akzeptiert, was gemessen und gezeigt wurde.', 'Define quality with numbers: how many Mbit/s, how many dBm, how many milliseconds. Measure exactly these on handover day. The client accepts what was measured and shown.'],
  body: [
    { h: 'Bandbreitenbedarf zur Hauptzeit (Abend, Home-Office-Tag)' },
    { keep: 1, t: ['Nutzung', 'Gleichzeitig', 'Download je Nutzung', 'Upload je Nutzung', 'Summe Download'], r: [
      ['Videokonferenz HD (Firmen-Notebook)', '1', '4 Mbit/s', '4 Mbit/s', '4 Mbit/s'],
      ['Streaming 4K', '2', '25 Mbit/s', '–', '50 Mbit/s'],
      ['Online-Spiel und Updates Konsole', '1', '50 Mbit/s', '5 Mbit/s', '50 Mbit/s'],
      ['Surfen, Social Media, Cloud-Fotos', '4', '5 Mbit/s', '5 Mbit/s', '20 Mbit/s'],
      ['Summe', '', '', 'ca. 29 Mbit/s', '124 Mbit/s']
    ], cap: 'Alle Werte PW nach üblichen Herstellerangaben. Mit Reserve (Faktor 2) reicht 300/50 Mbit/s; der vorhandene Tarif 500/100 ist ausreichend.' },
    { h: 'WLAN und Priorisierung' },
    { ul: [
      'Ziel ≥ −67 dBm in allen Wohnräumen; Messung mit FRITZ!App WLAN an 8 festgelegten Punkten.',
      '5-GHz-Band bevorzugen; Smart-Geräte, die nur 2,4 GHz können, ins Gast-WLAN „Huber-Gast“.',
      'Priorisierung in der FRITZ!Box: Firmen-Notebook als „Echtzeitanwendung“; Konsole-Downloads als „Hintergrundanwendung“.'
    ] },
    { h: 'Abnahmekriterien' },
    { keep: 2, t: ['Nr.', 'Kriterium', 'Zielwert', 'Messmethode'], r: [
      ['Q1', 'Durchsatz am Arbeitsplatz (Kabel)', '≥ 250/40 Mbit/s', 'Speedtest des Providers, 3 Messungen'],
      ['Q2', 'Latenz zum Firmen-VPN-Gateway', '≤ 30 ms', 'ping, 100 Pakete'],
      ['Q3', 'WLAN-Signal alle Wohnräume', '≥ −67 dBm', 'FRITZ!App WLAN, 8 Punkte'],
      ['Q4', 'Videokonferenz während 4K-Streaming', 'kein Abbruch, kein Standbild', '10-min-Testanruf'],
      ['Q5', 'Trennung der Netze', 'kein Zugriff in gesperrten Richtungen', 'ping und Portscan (nmap)'],
      ['Q6', 'USV-Laufzeit ONT + Router', '≥ 15 min', 'Netzstecker ziehen, Zeit stoppen']
    ] }
  ] },

{ id: 'kosten', ph: 'plan', cost: 1,
  t: ['هزینه و TCO', 'Stückliste, Kosten und TCO', 'Bill of materials, cost and TCO'],
  title: 'Stückliste, Kosten (zwei Varianten) und TCO über 5 Jahre – Preise brutto',
  why: ['مشتری خصوصی قیمت با مالیات را می‌پردازد؛ پس قیمت‌ها brutto هستند. هزینهٔ پنج‌ساله (اینترنت، برق، باتری UPS) را هم نشان بده تا مقایسه منصفانه باشد.', 'Privatkunden zahlen inklusive Umsatzsteuer, deshalb stehen hier Bruttopreise. Zeig auch die Kosten über 5 Jahre (Internet, Strom, USV-Akku), damit der Vergleich fair ist.', 'Private clients pay including VAT, so prices here are gross. Also show the 5-year cost (internet, power, UPS battery) for a fair comparison.'],
  body: [
    { h: 'Variante A (empfohlen): FRITZ!Box' },
    { keep: 3, t: ['Pos.', 'Gerät (Beispielmodell)', 'Menge', 'Einzelpreis', 'Gesamt', 'Quelle'], r: [
      ['1', 'WLAN-Router Wi-Fi 7 mit Mesh (FRITZ!Box 7690)', '1', '279,00 €', '279,00 €', 'R: Preisvergleich, 11/2026 (UVP 329 €)'],
      ['2', 'Mesh-Repeater Wi-Fi 7 (FRITZ!Repeater 1700)', '1', '99,00 €', '99,00 €', 'R: Handel, 11/2026 (UVP 119 €)'],
      ['3', 'Switch 8 Port, VLAN-fähig (TP-Link TL-SG108E)', '1', '29,99 €', '29,99 €', 'R: Händler, 11/2026'],
      ['4', 'USV 750 VA mit Schuko-Dosen (APC BX750MI-GR)', '1', '92,38 €', '92,38 €', 'R: Preisvergleich, 11/2026'],
      ['5', '2 Cat-6A-Leitungen EG → OG, 2 Dosen, Patchkabel', '1', '110,00 €', '110,00 €', 'PW'],
      ['6', 'Arbeitszeit IT-Techniker', '3 h', '85,00 €', '255,00 €', 'PW'],
      ['', 'Summe brutto', '', '', '865,37 €', '']
    ] },
    { h: 'Variante B: UniFi mit VLANs' },
    { keep: 3, t: ['Pos.', 'Gerät (Beispielmodell)', 'Menge', 'Einzelpreis', 'Gesamt', 'Quelle'], r: [
      ['1', 'Gateway mit Firewall und VLANs (UniFi Cloud Gateway Ultra)', '1', '95,00 €', '95,00 €', 'R: Herstellershop EU, 11/2026'],
      ['2', 'Switch 8 Port, 4× PoE+ 52 W (UniFi Switch Lite 8 PoE)', '1', '105,00 €', '105,00 €', 'R: Herstellershop EU, 11/2026'],
      ['3', 'Access Point Wi-Fi 7 (UniFi U7 Lite)', '2', '105,90 €', '211,80 €', 'R: Händler, 11/2026'],
      ['4', 'USV 750 VA (APC BX750MI-GR)', '1', '92,38 €', '92,38 €', 'R: Preisvergleich, 11/2026'],
      ['5', 'Cat-6A-Leitung, Dosen, Patchkabel', '1', '80,00 €', '80,00 €', 'PW'],
      ['6', 'Arbeitszeit IT-Techniker (VLANs, Regeln, Test)', '5 h', '85,00 €', '425,00 €', 'PW'],
      ['', 'Summe brutto', '', '', '1.009,18 €', '']
    ] },
    { note: 'Variante B liegt knapp über dem Budget von 1.000 €. Optional kommt ein Bedrohungsfilter-Abo des Herstellers dazu (89 € pro Jahr) – nicht eingerechnet. Das Glasfaser-Modem bleibt in beiden Varianten das Gerät des Providers.' },
    { h: 'TCO über 5 Jahre' },
    { keep: 1, t: ['Kostenart', 'Rechnung', 'Variante A', 'Variante B'], r: [
      ['Anschaffung und Einrichtung', 'siehe oben', '865,37 €', '1.009,18 €'],
      ['Internet 500/100', '60 × 45 € (PW)', '2.700,00 €', '2.700,00 €'],
      ['Strom Netzgeräte', 'A: 25 W, B: 30 W × 8.760 h × 5 J. × 0,30 €/kWh (PW)', '328,50 €', '394,20 €'],
      ['USV-Akku (1× Tausch)', 'PW', '50,00 €', '50,00 €'],
      ['Summe TCO 5 Jahre', '', '3.943,87 € (≈ 66 € pro Monat)', '4.153,38 € (≈ 69 € pro Monat)']
    ] }
  ],
  src: [['FRITZ!Box 7690 – Preisvergleich (geizhals)', 'https://geizhals.de/3201358'], ['FRITZ!Box 7690 – UVP (mobiFlip)', 'https://www.mobiflip.de/?p=449995'], ['FRITZ!Repeater 1700 – UVP 119 € (mobiFlip)', 'https://www.mobiflip.de/fritzrepeater-1700-startet-in-den-markt-kostet-119-euro/'], ['FRITZ!Repeater 1700 – Handelspreis 99 € (nextpit)', 'https://www.nextpit.de/deals/endlich-stabiles-internet-fritz-repeater-1700-knackt-preismarke'], ['TP-Link TL-SG108E – Händlerpreis', 'https://www.wlan-shop24.de/tplink-tl-sg108e-desktop-gigabit-switch-8-port'], ['APC BX750MI-GR – Preisvergleich', 'https://www.guenstiger.de/Produkt/APC/Back_UPS_BX_750VA_BX750MI_GR.html'], ['UniFi Cloud Gateway Ultra – Herstellershop EU', 'https://eu.store.ui.com/eu/en/products/ucg-ultra?c=FI'], ['UniFi Switch Lite 8 PoE – Herstellershop EU', 'https://eu.store.ui.com/eu/en/products/usw-lite-8-poe'], ['UniFi U7 Lite – Händlerpreis', 'https://www.arvutitark.ee/en/network-devices/routers/ap-ubiquiti-unifi-u7-lite-1435634']] },

{ id: 'umsetzung', ph: 'steu',
  t: ['اجرا گام‌به‌گام', 'Umsetzung Schritt für Schritt', 'Implementation step by step'],
  title: 'Umsetzung Variante A – Ablauf am Einbautag mit Rückfallplan',
  why: ['ترتیب درست کار، زمان قطعی اینترنت را کوتاه نگه می‌دارد. قبل از هر تغییر یک راه بازگشت داشته باش: تنظیمات قدیمی را ذخیره کن و روتر قدیمی را تا پایان آزمون‌ها نگه دار.', 'Die richtige Reihenfolge hält die Internetunterbrechung kurz. Vor jeder Änderung brauchst du einen Rückweg: alte Einstellungen sichern und den alten Router bis zum Ende der Tests aufbewahren.', 'The right order keeps the internet outage short. Before any change you need a way back: save the old settings and keep the old router until all tests pass.'],
  body: [
    { h: 'Vorbereitung (zu Hause, 2 h)' },
    { ol: ['Zugangsdaten und Anschlussart beim Provider klären (Modem bleibt, eigener Router dahinter).', 'FRITZ!Box auf aktuelles FRITZ!OS bringen, Kennwort und Zwei-Faktor-Bestätigung setzen.', 'WLAN-Namen und Kennwörter festlegen, QR-Codes für Gast- und IoT-WLAN drucken.'] },
    { h: 'Einbautag' },
    { ol: [
      'Bestandsaufnahme fotografieren, Konfiguration des alten Routers sichern (Rückfallplan).',
      'Leitung Keller → EG prüfen, neue Leitung EG → OG im Leerrohr einziehen, Dosen auflegen und mit Kabeltester prüfen.',
      'USV im Keller anschließen, ONT und FRITZ!Box daran.',
      'FRITZ!Box: Internet → Zugangsdaten → „Externes Modem oder Router“ über den WAN-Anschluss; Internet testen (Unterbrechung endet hier).',
      'WLAN → Funknetz: Name „Huber“, WPA2/WPA3; WPS-PIN aus.',
      'WLAN → Gastzugang: Gast-WLAN „Huber-Gast“ aktivieren, „Gastgeräte dürfen untereinander kommunizieren“ aus; LAN-Gastzugang auf LAN 4 aktivieren.',
      'Dose OG-AZ-1 an LAN 4 (Gastnetz) für das Firmen-Notebook, Dose OG-AZ-2 an LAN 2 mit Switch für Privat-PC und Drucker.',
      'Repeater 1700 per Connect-Taste ins Mesh, Position mit FRITZ!App WLAN optimieren.',
      'Smart-Geräte und Kameras ins Gast-WLAN „Huber-Gast“ umziehen, Standardpasswörter ändern.',
      'Internet → Filter → Priorisierung: Firmen-Notebook als Echtzeitanwendung.',
      'Internet → Freigaben → VPN (WireGuard): Zugang für die Handys der Eltern einrichten.',
      'Zugangsprofile für die Kindergeräte anlegen.',
      'System → Sicherung: Konfiguration mit Kennwort sichern, Datei an den Kunden übergeben.'
    ] },
    { note: 'Hinweis zu Schritt 7: Die FRITZ!Box kann keine VLANs auf einzelne Switchports verteilen. Deshalb bekommt das Firmen-Notebook eine eigene Leitung direkt zu LAN 4 (Gastnetz). Im Leerrohr ist Platz für zwei Leitungen – beide werden eingezogen.' },
    { h: 'Rückfallplan' },
    { ul: ['Funktioniert das Internet nach 30 Minuten nicht: alten Router wieder anschließen (Konfiguration ist gesichert), Störung beim Provider melden.', 'Repeater-Mesh instabil: Repeater per LAN-Kabel anbinden (LAN-Brücke) statt per Funk.'] }
  ] },

{ id: 'betrieb', ph: 'abs',
  t: ['تحویل و نگه‌داری', 'Übergabe und Betrieb', 'Handover and operations'],
  title: 'Messprotokoll, Übergabe an die Familie und Störungszettel',
  why: ['کار وقتی تمام است که مشتری بتواند بدون تو با آن زندگی کند: عددهای اندازه‌گیری‌شده، رمزها در جای امن، و یک برگهٔ ساده برای وقتی که اینترنت قطع می‌شود.', 'Fertig ist die Arbeit, wenn der Kunde ohne dich damit leben kann: gemessene Werte, Kennwörter an sicherem Ort und ein einfacher Zettel für den Fall, dass das Internet weg ist.', 'The job is finished when the client can live with it without you: measured values, passwords stored safely and a simple sheet for when the internet is down.'],
  body: [
    { h: 'Messprotokoll (Übergabetag)' },
    { keep: 3, t: ['Nr.', 'Kriterium', 'Zielwert', 'Gemessen', 'Ergebnis'], r: [
      ['Q1', 'Durchsatz Arbeitsplatz', '≥ 250/40 Mbit/s', '468/94 Mbit/s', 'erfüllt'],
      ['Q2', 'Latenz Firmen-VPN', '≤ 30 ms', '14 ms', 'erfüllt'],
      ['Q3', 'WLAN alle Wohnräume', '≥ −67 dBm', 'schlechtester Punkt −64 dBm (OG Bad)', 'erfüllt'],
      ['Q4', 'Videokonferenz + 4K-Stream', 'kein Abbruch', '10 min ohne Störung', 'erfüllt'],
      ['Q5', 'Trennung der Netze', 'kein Zugriff', 'Familien-PC erreicht Notebook und Kameras nicht', 'erfüllt'],
      ['Q6', 'USV-Laufzeit', '≥ 15 min', '41 min', 'erfüllt']
    ] },
    { h: 'Übergabe' },
    { ul: ['Netzplan und Netztabelle ausgedruckt im Technikfach.', 'Kennwörter (Router, WLAN, Gast, Kameras) im Passwortmanager der Eltern; Papierkopie im versiegelten Umschlag.', 'Konfigurationssicherung der FRITZ!Box auf USB-Stick und in der Cloud der Familie.', 'Kurze Einweisung: Gast-QR-Code, Kinderprofile, Hotspot im Störungsfall.'] },
    { h: 'Störungszettel für die Familie' },
    { ol: ['Betrifft es alle Geräte oder nur eines? Nur eines: Gerät neu starten, WLAN aus- und einschalten.', 'Alle Geräte: Leuchtet an der FRITZ!Box „Internet/Fon“ bzw. „Online“? Nein: ONT und FRITZ!Box 30 s stromlos machen, erst ONT, nach 2 min FRITZ!Box einschalten.', 'Weiter gestört: Störungsseite des Providers auf dem Handy (Mobilfunk) prüfen, Störung melden.', 'Home-Office-Tag: Firmen-Notebook mit dem Handy-Hotspot verbinden, VPN neu starten.', 'Nach 1 Tag immer noch gestört: IT-Techniker anrufen (Nummer auf dem Zettel).'] },
    { h: 'Wartung' },
    { kv: [['Updates', 'automatisch (Router, Repeater); Kameras und Smart-Geräte halbjährlich prüfen'], ['Kennwörter', 'Gast-WLAN-Kennwort jährlich wechseln'], ['Lebensdauer', 'Router nach Ende der Herstellerpflege ersetzen; USV-Akku nach ca. 3–5 Jahren']] }
  ] }

  ]
});
})();
