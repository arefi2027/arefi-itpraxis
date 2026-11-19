/* Arefi ITPraxis – Vergleichsmappe: die vier Netztypen (Privat, Klein, Mittel, Groß) je Planungsbereich nebeneinander.
   Alle Zahlen stammen aus den vier Projektmappen. */
(() => {
'use strict';
const P = window.ArefiPlanProjects = window.ArefiPlanProjects || [];
const go = id => ({ go: [['Privat', '#k-plan/p-privat--' + (id.privat || id.all)], ['Kleine Firma', '#k-plan/p-klein--' + (id.klein || id.all)], ['Mittlere Firma', '#k-plan/p-mittel--' + (id.mittel || id.all)], ['Große Firma', '#k-plan/p-gross--' + (id.gross || id.all)]] });
const H = ['Bereich', 'Privat / Home-Office', 'Kleine Firma (18)', 'Mittlere Firma (120)', 'Große Firma (800)'];
P.push({
  id: 'p-vergleich', code: 'VERGLEICH', client: 'Arefi ITPraxis – Vergleich der Musterprojekte',
  size: ['مقایسه', 'Vergleich', 'Comparison'],
  title: ['مقایسهٔ چهار نوع شبکه: خانه، کوچک، متوسط، بزرگ', 'Vergleich der vier Netztypen: Privat, Klein, Mittel, Groß', 'Comparing the four network types: home, small, medium, large'],
  lead: ['هر ده بخش برنامه‌ریزی، برای هر چهار نوع شبکه، کنار هم. اینجا می‌بینی وقتی شرکت بزرگ‌تر می‌شود چه چیزی عوض می‌شود و چرا: VLAN، اتصال از بیرون، امنیت، دسترس‌پذیری، کیفیت، هزینه، بهره‌برداری و قانون. از هر خانه می‌توانی مستقیم به سند کامل همان پروژه بروی.', 'Alle zehn Planungsbereiche für alle vier Netztypen nebeneinander. Hier siehst du, was sich mit wachsender Größe ändert und warum: VLAN, Erreichbarkeit, Sicherheit, Verfügbarkeit, Qualität, Kosten, Betrieb und Recht. Von jeder Zeile geht es direkt zum vollständigen Dokument der jeweiligen Mappe.', 'All ten planning areas for all four network types side by side. See what changes as the organisation grows and why: VLANs, reachability, security, availability, quality, cost, operations and law. Each row links straight to the full document of that folder.'],
  facts: [
    [['محتوا', 'Inhalt', 'Content'], 'Vergleichstabellen aus den Mappen Privat, Kleine Firma, Mittlere Firma und Große Firma'],
    [['استفاده', 'Verwendung', 'Use'], 'Lernen (Muster erkennen), Vorbereitung auf Vorstellungsgespräche, Grundlage für Angebote']
  ],
  docs: [

{ id: 'ueberblick', ph: 'cmp',
  t: ['نمای کلی', 'Überblick', 'Overview'],
  title: 'Überblick: vier Netztypen auf einen Blick',
  why: ['این جدول را به خاطر بسپار: در مصاحبه اغلب می‌پرسند «برای ۲۰ نفر چه می‌سازی و برای ۵۰۰ نفر چه؟». پاسخ خوب از نیاز شروع می‌کند و می‌گوید با بزرگ شدن چه چیزی دوتایی، جدا و پایش می‌شود.', 'Merke dir diese Tabelle: Im Vorstellungsgespräch kommt oft „Was baust du für 20 Leute und was für 500?“. Eine gute Antwort beginnt beim Bedarf und sagt, was mit wachsender Größe doppelt, getrennt und überwacht wird.', 'Remember this table: interviews often ask “what do you build for 20 people and what for 500?”. A good answer starts from the need and says what becomes redundant, separated and monitored as size grows.'],
  body: [
    { keep: 1, t: H, r: [
      ['Nutzer und Geräte', '4 Personen, ca. 27 Geräte', '18 Mitarbeitende, ca. 50 Geräte', '120 Mitarbeitende, ca. 280 Geräte', '800 Mitarbeitende, ca. 2.100 Geräte'],
      ['Standorte', '1 Haus, 2 Etagen', '1 Büro, 2 Etagen', 'Zentrale mit Halle + 1 Filiale', 'Zentrale (2 Gebäude), 2 Rechenzentren, 6 Filialen'],
      ['Architektur', 'Router mit Mesh', 'Collapsed Core auf der Firewall', 'Collapsed Core mit L3-Stack', 'Drei Schichten + SD-WAN'],
      ['Internet', '1 Leitung + Handy-Hotspot', 'Glasfaser + LTE/5G', '2 Leitungen, 2 Anbieter', '2 Provider mit BGP; Filialen Glasfaser + 5G'],
      ['Verfügbarkeit Ziel → Ergebnis', '99,5 % → 99,88 %', '99,5 % → 99,83 %', '99,9 % → 99,95 %', '99,9 % → 99,92–99,95 %'],
      ['Sicherheit im Kern', 'Gastnetz, Router-Härtung', 'Zonen, Firewall-Matrix, WPA3', '+ 802.1X, getrennte Fertigung, Monitoring', '+ NAC mit Profilen, ZTNA, PAM, SIEM/SOC'],
      ['Recht', 'Home-Office-Regeln, Kameras', 'DSGVO, Werkvertrag', '+ NIS-2 (wichtige Einrichtung), Betriebsvereinbarung', '+ zwei Länder, Leitungshaftung, Lieferkette'],
      ['Investition', '865,37 € brutto', '20.739,20 € netto', '70.024,69 € netto', '395.074,81 € netto'],
      ['TCO 5 Jahre', '3.943,87 €', '49.140,39 €', '186.884,01 €', '1.422.724,61 €'],
      ['TCO pro Nutzer und Monat', '≈ 16 € je Person', '≈ 46 €', '≈ 26 €', '≈ 30 €'],
      ['Dauer', '1 Tag', '31 Arbeitstage', '14 Wochen', '9 Monate'],
      ['Deine typische Rolle', 'IT-Techniker allein vor Ort', 'Projektleitung beim Dienstleister', 'Netzwerktechniker im Team', 'Engineer in einem Teilprojekt']
    ] },
    { note: 'Was du daraus lernst: Kleine Netze sind pro Nutzer am teuersten, weil Grundkosten (Firewall, Lizenz, Wartung) auf wenige Köpfe verteilt werden. Große Netze werden durch Sicherheitsüberwachung und zweites Rechenzentrum wieder teurer – dafür sinkt das Risiko eines langen Stillstands.' },
    go({ all: 'netzplan', klein: 'konzept' })
  ] },

{ id: 'netzplan', ph: 'cmp',
  t: ['نقشهٔ شبکه و معماری', 'Netzplan und Architektur', 'Network diagram and architecture'],
  title: 'Netzplan und Architektur im Vergleich',
  why: ['با بزرگ شدن شبکه، لایه‌ها از هم جدا می‌شوند: اول یک روتر همه کار را می‌کند، بعد فایروال مسیریابی می‌کند، بعد یک هستهٔ لایهٔ ۳، و در آخر هسته، توزیع و دسترسی جدا.', 'Mit wachsender Größe werden Aufgaben getrennt: Erst macht ein Router alles, dann routet die Firewall, dann ein Layer-3-Core, zuletzt sind Core, Distribution und Access eigene Schichten.', 'As networks grow, jobs are separated: first one router does everything, then the firewall routes, then a layer-3 core, finally core, distribution and access become separate layers.'],
  body: [
    { keep: 1, t: H, r: [
      ['Topologie', 'Stern um den Router, Mesh-Repeater', 'Stern: 2 Switches, Firewall in der Mitte', 'Collapsed Core, Access je Etage mit 2 Uplinks', 'Core – Distribution je Gebäude – Access; Filialen per Overlay'],
      ['Routing zwischen Netzen', 'Router (Gastnetz getrennt)', 'Firewall', 'Core für interne Zonen, Firewall für Risikozonen', 'Distribution/Core (OSPF), Firewalls für Zonen, BGP nach außen'],
      ['Switches', '1 kleiner VLAN-Switch', '2× 24 Port PoE+', '2 Core + 7 Access à 48 PoE+', '2 Core/RZ + 4 Distribution + 26 Access'],
      ['WLAN', '1 Router + 1 Repeater (oder 2 APs)', '3 APs', '22 APs inkl. Halle', '70 APs inkl. Lager und Kühlhaus'],
      ['Verkabelung', '2 neue Leitungen ins OG', 'strukturierte Verkabelung Cat 6A, 48 Anschlüsse', 'Glasfaser-Backbone, 40 neue Anschlüsse', 'Campus-Glasfaser, Gebäude B neu'],
      ['Doku-Werkzeug', 'Papier + Foto', 'Netzplan-Zeichnung + Tabellen', 'NetBox + Zeichnung', 'NetBox, Pläne automatisch erzeugt']
    ] },
    go({ all: 'netzplan', klein: 'konzept' })
  ] },

{ id: 'ipplan', ph: 'cmp',
  t: ['VLAN و آدرس IP', 'VLAN und IP-Plan', 'VLAN and IP plan'],
  title: 'VLAN- und IP-Plan im Vergleich',
  why: ['قاعدهٔ آدرس‌دهی با اندازه رشد می‌کند: در خانه دو شبکه کافی است، در شرکت کوچک «شمارهٔ VLAN = اکتت سوم»، و در شرکت بزرگ کد محل هم به آدرس اضافه می‌شود.', 'Die Adressregel wächst mit: Zu Hause reichen zwei Netze, in der kleinen Firma gilt „VLAN-Nummer = drittes Oktett“, in großen Netzen kommt der Standortcode dazu.', 'The addressing rule grows with size: at home two networks are enough, in a small company “VLAN number = third octet”, in large networks the site code is added.'],
  body: [
    { keep: 1, t: H, r: [
      ['Anzahl Netze', 'A: 2 (Heim, Gast) · B: 5 VLANs', '7 VLANs', '13 VLANs Zentrale + 6 Filiale', '9 VLANs je Standort + RZ-Zonen'],
      ['Schema IPv4', '192.168.178/179.0/24 bzw. 10.0.VLAN.0/24', '10.10.VLAN.0/24', '10.Standort.VLAN.0/24', '10.Standortcode.VLAN.0/24, /16 je Standort'],
      ['IPv6', 'Präfix vom Provider, /64 je Netz', '/64 je VLAN aus dem /56 des Providers', '/48 je Standort, /64 je VLAN', 'eigenes Präfix über LIR, /48 je Standort'],
      ['DHCP und DNS', 'Router', 'Firewall', 'Windows-DHCP mit Failover, DCs', 'DCs in beiden RZ, DHCP zentral'],
      ['Routing', '–', 'statisch', 'statisch + Transit-VLAN zur Firewall', 'OSPF intern, BGP über SD-WAN und zu Providern'],
      ['Reserve', 'ausreichend', 'VLAN 70–89 frei', 'VLAN 12–19, 80–89; Standortcodes 40–49', 'Standortcodes für weitere Filialen']
    ] },
    go({ all: 'ipplan' })
  ] },

{ id: 'erreichbarkeit', ph: 'cmp',
  t: ['اتصال و دسترسی از بیرون', 'Erreichbarkeit', 'Reachability'],
  title: 'Erreichbarkeit im Vergleich',
  why: ['هرچه شرکت بزرگ‌تر، راه‌های ورود بیشتر می‌شود: کارکنان، شعبه‌ها، مشتریان، پیمانکاران. قاعده ثابت است: هیچ پورتی بدون دلیل باز نیست و هر راه، جایگزین و کنترل دارد.', 'Je größer die Firma, desto mehr Wege hinein: Mitarbeitende, Filialen, Kunden, Dienstleister. Die Regel bleibt gleich: kein offener Port ohne Grund, und jeder Weg hat Ersatz und Kontrolle.', 'The larger the company, the more ways in: staff, branches, customers, contractors. The rule stays the same: no open port without reason, and every path has a fallback and a control.'],
  body: [
    { keep: 1, t: H, r: [
      ['Internet', 'Glasfaser 500/100', 'Glasfaser 500/200', 'Glasfaser 1 Gbit/s', '2 × 10 Gbit/s über BGP'],
      ['Ersatzweg', 'Handy-Hotspot (manuell)', 'LTE/5G (automatisch)', 'Kabel anderer Anbieter (automatisch)', 'zweiter Provider (automatisch, BFD)'],
      ['Mitarbeitende von außen', 'WireGuard in der FRITZ!Box; Firmen-VPN des Arbeitgebers', 'VPN mit MFA', 'VPN mit MFA, Admin-VPN getrennt', 'ZTNA je Anwendung, kein Netzzugang'],
      ['Standorte', '–', '–', 'IPsec Zentrale – Filiale mit LTE-Ersatz', 'SD-WAN mit zwei Hubs'],
      ['Veröffentlichte Dienste', 'keine', 'keine', 'Kundenportal über DMZ', 'Portal und EDI in DMZ, auch in RZ 2'],
      ['Dienstleister', '–', '–', 'Fernwartungs-Gateway mit Freigabe', 'PAM mit Aufzeichnung'],
      ['Typischer Stolperstein', 'DS-Lite/Carrier-NAT', 'Carrier-NAT im LTE-Tarif', 'Split-DNS vergessen', 'Präfixfilter und RPKI']
    ] },
    go({ all: 'erreichbarkeit' })
  ] },

{ id: 'sicherheit', ph: 'cmp',
  t: ['امنیت', 'Sicherheit', 'Security'],
  title: 'Sicherheit im Vergleich',
  why: ['اصل‌ها در همهٔ اندازه‌ها یکی است: جداسازی، حداقل دسترسی، به‌روزرسانی، ثبت رویداد. فقط ابزار و میزان خودکارسازی بالا می‌رود.', 'Die Grundsätze sind in jeder Größe gleich: Trennung, minimale Rechte, Updates, Protokollierung. Nur Werkzeuge und Automatisierung wachsen.', 'The principles are the same at every size: separation, least privilege, updates, logging. Only tools and automation grow.'],
  body: [
    { keep: 1, t: H, r: [
      ['Zonen', 'Heim und Gast (A) bzw. 4 VLANs (B)', '7 VLANs', '13 Zonen inkl. OT und Quarantäne', 'Vorlage je Standort + RZ-Segmentierung'],
      ['Regeln', 'Router-Standard, Gastisolation', 'Matrix mit Default Deny', 'Matrix, halbjährliche Prüfung', 'Regeln als Code, versioniert'],
      ['Netzzugang', '–', 'unbenutzte Ports im Blackhole-VLAN', '802.1X EAP-TLS + MAB, Quarantäne', 'NAC mit Profilierung und Gerätezustand'],
      ['WLAN-Anmeldung', 'WPA3-Personal', 'WPA3-Personal, Schlüssel per Profil', '802.1X', '802.1X, schnelles Roaming'],
      ['Verwaltung', 'Router-Kennwort, Bestätigung per Taste', 'MGMT-VLAN, VPN-Admin', 'RADIUS-Anmeldung mit MFA', 'PAM-Sprungserver'],
      ['Erkennung', '–', 'Firewall-Berichte', 'Syslog 90 Tage, Alarme', 'SIEM, SOC 24/7'],
      ['Geräte mit Risiko', 'Smart-Geräte im Gastnetz', 'IoT-VLAN', 'Fertigung mit Gateway auf der Firewall', 'OT und Scanner getrennt, Hersteller nur über PAM']
    ] },
    go({ all: 'sicherheit' })
  ] },

{ id: 'verfuegbarkeit', ph: 'cmp',
  t: ['دسترس‌پذیری', 'Verfügbarkeit', 'Availability'],
  title: 'Verfügbarkeit im Vergleich',
  why: ['در همهٔ اندازه‌ها یک چیز تکرار می‌شود: بزرگ‌ترین عامل باقی‌مانده سوئیچ دسترسی است که تکی است. راه‌حل معمولاً دستگاه یدکی است، نه دوتایی کردن همه چیز.', 'In allen Größen wiederholt sich eines: Der größte Restfaktor ist der einzelne Access-Switch. Die Lösung ist meist ein Ersatzgerät, nicht alles doppelt.', 'One thing repeats at every size: the largest remaining factor is the single access switch. The answer is usually a spare, not doubling everything.'],
  body: [
    { keep: 1, t: H, r: [
      ['Ziel', '99,5 % (Home-Office-Tage)', '99,5 %', '99,9 %', '99,9 %'],
      ['Ergebnis', '99,88 % (≈ 10,5 h/Jahr)', '99,83 % (≈ 15 h), OG 99,78 %', '99,95 % (≈ 4,4 h)', '99,92–99,95 %'],
      ['Doppelt vorhanden', 'nur Internetweg', 'nur Internetweg', 'Firewall, Core, Internet, USV', 'alles bis zur Distribution, Firewall-Paare auch in Filialen'],
      ['Größter Restfaktor', 'Router', 'zentraler Switch, Firewall', 'Access-Switch je Etage', 'Access-Switch'],
      ['Strom', 'kleine USV', 'USV 1.500 VA', '2 USV an getrennten Kreisen', 'RZ-USV, Filial-USV'],
      ['Wenn der Standort ausfällt', 'Konfigurationssicherung', 'Ersatzswitch, Datensicherung außer Haus', 'Datensicherung außer Haus, RTO 3 Tage', 'zweites Rechenzentrum, RTO 4 h, RPO 15 min']
    ] },
    { note: 'Rechenregel überall gleich: in Reihe multiplizieren, parallel 1 − (1 − A1) × (1 − A2), Ausfallzeit = (1 − A) × 8.760 h.' },
    go({ all: 'verfuegbarkeit' })
  ] },

{ id: 'qualitaet', ph: 'cmp',
  t: ['کیفیت و کارایی', 'Leistung und Qualität', 'Performance and quality'],
  title: 'Leistung und Qualität im Vergleich',
  why: ['کیفیت یعنی عدد قابل اندازه‌گیری. در خانه یک تست سرعت و یک تماس تصویری کافی است؛ در شرکت بزرگ هر معیار به یک زیرپروژه و یک ابزار اندازه‌گیری وصل است.', 'Qualität heißt messbare Zahl. Zu Hause genügen Speedtest und Testanruf; im großen Unternehmen gehört jedes Kriterium zu einem Teilprojekt und einem Messwerkzeug.', 'Quality means a measurable number. At home a speed test and a test call suffice; in a large company every criterion belongs to a sub-project and a measuring tool.'],
  body: [
    { keep: 1, t: H, r: [
      ['Bandbreite Spitzenzeit', 'ca. 124 Mbit/s → Tarif 500/100 reicht', 'Tarif 500/200', 'ca. 390 Mbit/s → 1 Gbit/s', '2 × 10 Gbit/s, Auslastung < 40 %'],
      ['WLAN-Ziel', '≥ −67 dBm in allen Räumen', '≥ −67 dBm an 24 Messpunkten', 'Büro ≥ −67 dBm, Halle ≥ −70 dBm', 'Roaming < 50 ms mit Handscanner'],
      ['Priorisierung', 'Firmen-Notebook als Echtzeitanwendung', 'Sprache DSCP EF, 10 Mbit/s reserviert', '5 Klassen (EF, AF41, CS6, Standard, CS1)', 'wie Mittel + Anwendungsregeln im SD-WAN'],
      ['Beispiel-Kriterium', 'Videokonferenz während 4K-Stream', 'Umschaltung LTE < 60 s', 'Firewall-Ausfall ≤ 10 s', 'Provider-Ausfall < 30 s, DR ≤ 4 h'],
      ['Werkzeuge', 'Speedtest, FRITZ!App WLAN, ping, nmap', 'Kabelmessgerät, WLAN-App, Testanrufe', 'iperf3, Heatmap, Telefonie-Portal', 'externe Monitore, DR-Test, Scanner-Messung']
    ] },
    go({ all: 'qualitaet', klein: 'pflichtenheft' })
  ] },

{ id: 'kosten', ph: 'cmp',
  t: ['هزینه', 'Kosten', 'Cost'],
  title: 'Kosten und TCO im Vergleich',
  why: ['قیمت خرید فقط شروع است. در هر چهار پروژه هزینهٔ جاری پنج‌ساله از خرید بیشتر است. در شرکت‌ها همیشه netto حساب کن و برای مشتری خصوصی brutto.', 'Der Kaufpreis ist nur der Anfang. In allen vier Projekten sind die laufenden Kosten über 5 Jahre höher als die Anschaffung. Firmen rechnen netto, Privatkunden brutto.', 'The purchase price is only the start. In all four projects the 5-year running costs exceed the purchase. Companies are calculated net, private clients gross.'],
  body: [
    { keep: 1, t: H, r: [
      ['Investition', '865,37 € brutto (Variante A), 1.009,18 € (B)', '20.739,20 € netto', '70.024,69 € netto', '395.074,81 € netto'],
      ['davon Arbeitszeit', '255 € (3 h)', '6.080 € (64 h)', '20.900 € (220 h)', '133.000 € (1.400 h)'],
      ['TCO 5 Jahre', '3.943,87 €', '49.140,39 €', '186.884,01 €', '1.422.724,61 €'],
      ['pro Nutzer und Monat', '≈ 16 € je Person', '≈ 46 €', '≈ 26 €', '≈ 30 €'],
      ['größter Block über 5 Jahre', 'Internet', 'Wartung und Internet', 'Wartung und Internet', 'Internet/Colocation und SOC'],
      ['Preisbasis', 'brutto, recherchiert 11/2026', 'netto, 19 % USt. (DE)', 'netto, 20 % USt. (AT)', 'netto, 20 % USt. (AT)']
    ] },
    { note: 'Preise sind Momentaufnahmen mit Quelle und Datum. Vor einem echten Angebot immer neu prüfen; bei Enterprise-Herstellern verbindliche Angebote von zwei Händlern einholen.' },
    go({ all: 'kosten' })
  ] },

{ id: 'betrieb', ph: 'cmp',
  t: ['بهره‌برداری', 'Betrieb', 'Operations'],
  title: 'Betrieb im Vergleich',
  why: ['بعد از تحویل، کار روزمره شروع می‌شود. هرچه شبکه بزرگ‌تر، فرایندها رسمی‌تر: از یک برگهٔ عیب‌یابی برای خانواده تا مرکز پایش شبانه‌روزی و هیئت تأیید تغییرات.', 'Nach der Übergabe beginnt der Alltag. Je größer das Netz, desto formaler die Prozesse: vom Störungszettel für die Familie bis zur Überwachung rund um die Uhr und dem Change Advisory Board.', 'After handover daily work starts. The larger the network, the more formal the processes: from a troubleshooting sheet for the family to round-the-clock monitoring and a change advisory board.'],
  body: [
    { keep: 1, t: H, r: [
      ['Überwachung', '–', 'Wartungsvertrag, Firewall-Meldungen', 'Monitoring mit Alarm per Mail und SMS', 'NOC und SOC 24/7'],
      ['Updates', 'automatisch', 'monatlich im Wartungsfenster', 'monatlich, kritische Lücken in 72 h', 'monatlich, Schwachstellenscan'],
      ['Konfigurationssicherung', 'Datei beim Kunden', 'wöchentlich verschlüsselt', 'täglich, versioniert', 'Regeln und Vorlagen als Code'],
      ['Änderungen', '–', 'mit Kunde abgestimmt', 'Änderungsantrag, Freigabe IT-Leitung', 'Change Advisory Board'],
      ['Störungsmeldung', 'Störungszettel', 'Hotline Dienstleister', 'Rufbereitschaft', 'Service Desk, Prioritäten'],
      ['Meldepflichten', '–', '–', 'NIS-2: 24 h / 72 h / 1 Monat', 'NIS-2 in zwei Ländern, jährliche Übung']
    ] },
    go({ all: 'betrieb', klein: 'uebergabe' })
  ] },

{ id: 'recht', ph: 'cmp',
  t: ['حقوقی', 'Recht', 'Law'],
  title: 'Recht im Vergleich (Deutschland und Österreich)',
  why: ['قانون با اندازهٔ شرکت سنگین‌تر می‌شود. NIS-2 از اندازهٔ متوسط و فقط در بخش‌های مشخص اعمال می‌شود؛ حفاظت داده و حقوق کارکنان همیشه. این جدول آموزشی است، نه مشاورهٔ حقوقی.', 'Recht wird mit der Größe schwerer. NIS-2 gilt ab mittlerer Größe und nur in bestimmten Sektoren; Datenschutz und Mitbestimmung immer. Die Tabelle dient dem Lernen, nicht der Rechtsberatung.', 'Law gets heavier with size. NIS-2 applies from medium size and only in certain sectors; data protection and employee rights always. The table is for learning, not legal advice.'],
  body: [
    { keep: 1, t: H, r: [
      ['Datenschutz', 'Firmendaten bleiben Sache des Arbeitgebers; Kameras nur eigenes Grundstück', 'Protokolle zweckgebunden, Löschfrist 30 Tage', 'Löschfrist 90 Tage, Auftragsverarbeitung Cloud', '+ Auftragsverarbeitung mit SOC und Colocation'],
      ['Mitbestimmung', '–', 'kein Betriebsrat, Information aller', 'Betriebsvereinbarung (ArbVG §§ 96, 96a / BetrVG § 87)', 'auf Konzernebene, zwei Länder'],
      ['NIS-2', 'nicht betroffen', 'nach Einschätzung nicht betroffen', 'wichtige Einrichtung (Maschinenbau)', 'wichtige Einrichtung in AT und DE (Lebensmittelgroßhandel)'],
      ['Vertrag', 'Auftrag mit Privatkunde', 'Werkvertrag, Abnahme', 'Werkvertrag, Übernahme mit Protokoll', 'Programmvertrag, SLAs mit Providern'],
      ['Besonderheit', 'Routerfreiheit / eigenes Gerät beim Provider klären', 'Elektroarbeiten nur durch Fachkraft', 'IEC 62443 als Orientierung für die Fertigung', 'Lieferkettensicherheit, Leitungshaftung']
    ] },
    go({ all: 'recht' })
  ] }

  ]
});
})();
