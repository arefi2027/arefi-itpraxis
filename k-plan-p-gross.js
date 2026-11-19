/* Arefi ITPraxis – Projektmappe „Große Firma“: 800 Mitarbeitende, Zentrale mit Campus, zwei Rechenzentren, sechs Filialen.
   Fiktives Beispiel (Österreich mit deutscher Tochter). Preise recherchiert 11/2026, PW = Planwert. */
(() => {
'use strict';
const P = window.ArefiPlanProjects = window.ArefiPlanProjects || [];
P.push({
  id: 'p-gross', code: 'KLG-NET-2027', client: 'Kaltenbrunn Lebensmittelgroßhandel AG, Wien (fiktives Beispiel)',
  size: ['شرکت بزرگ', 'Große Firma', 'Large company'],
  title: ['شرکت بزرگ: شبکهٔ یک عمده‌فروشی مواد غذایی با ۸۰۰ کارمند، دو دیتاسنتر و شش شعبه', 'Große Firma: Netz eines Lebensmittelgroßhändlers mit 800 Mitarbeitenden, zwei Rechenzentren und sechs Filialen', 'Large company: network of a food wholesaler with 800 staff, two data centres and six branches'],
  lead: ['دفتر مرکزی در وین با دو ساختمان و یک دیتاسنتر، یک دیتاسنتر دوم در مرکز داده‌ای اجاره‌ای، و شش شعبه با انبار در اتریش و آلمان. طراحی سه‌لایه، دو اینترنت با BGP، SD-WAN برای شعبه‌ها، کنترل ورود با پروفایل دستگاه، ZTNA، پایش امنیتی شبانه‌روزی و انطباق با NIS-2 در دو کشور. این پوشه نشان می‌دهد پروژهٔ بزرگ به چند زیرپروژه تقسیم می‌شود.', 'Zentrale in Wien mit zwei Gebäuden und Rechenzentrum, ein zweites Rechenzentrum in einer Colocation, sechs Filialen mit Lager in Österreich und Deutschland. Drei-Schichten-Design, zwei Provider mit BGP, SD-WAN für die Filialen, Netzzugangskontrolle mit Geräteprofilen, ZTNA, Sicherheitsüberwachung rund um die Uhr und NIS-2 in zwei Ländern. Die Mappe zeigt auch, wie ein großes Vorhaben in Teilprojekte zerlegt wird.', 'Headquarters in Vienna with two buildings and a data centre, a second data centre in a colocation, six branches with warehouses in Austria and Germany. Three-tier design, two providers with BGP, SD-WAN for branches, access control with device profiling, ZTNA, round-the-clock security monitoring and NIS-2 in two countries. The folder also shows how a large undertaking is split into sub-projects.'],
  facts: [
    [['کارفرما', 'Auftraggeber', 'Client'], 'Kaltenbrunn Lebensmittelgroßhandel AG (Wien) und Tochter Kaltenbrunn Handel GmbH (Deutschland); CIO als Programmverantwortlicher'],
    [['کاربران و دستگاه‌ها', 'Nutzer und Geräte', 'Users and devices'], '800 Mitarbeitende; ca. 900 PCs/Notebooks, 600 Telefone, 250 Handscanner, 80 Drucker, 150 Sensoren Kühlhaus, 120 Kameras'],
    [['محل', 'Standort', 'Site'], 'Zentrale Wien (Gebäude A und B, RZ 1), RZ 2 in Colocation, 4 Filialen in Österreich, 2 in Deutschland'],
    [['هدف دسترس‌پذیری', 'Verfügbarkeitsziel', 'Availability target'], 'Zentrale und Rechenzentrum 99,9 %, jede Filiale 99,9 % in der Betriebszeit; Disaster Recovery RTO 4 h, RPO 15 min für das Warenwirtschaftssystem'],
    [['بودجه', 'Budget', 'Budget'], 'Investition 400.000 € netto, freigegeben vom Vorstand'],
    [['مدت', 'Dauer', 'Duration'], '9 Monate, Programm mit 7 Teilprojekten'],
    [['نقش تو', 'Deine Rolle', 'Your role'], 'Netzwerkengineer im Teilprojekt „Filialen und SD-WAN“, Mitarbeit in Konzept und Abnahme']
  ],
  docs: [

{ id: 'auftrag', ph: 'init',
  t: ['دستور برنامه و زیرپروژه‌ها', 'Programmauftrag und Teilprojekte', 'Programme charter and sub-projects'],
  title: 'Programmauftrag mit Teilprojekten',
  why: ['پروژهٔ بزرگ را یک نفر نمی‌تواند کامل در سر نگه دارد. «برنامه» چند زیرپروژه با مدیر، بودجه و نقطهٔ عطف جدا دارد و وابستگی‌ها را نشان می‌دهد. تو به‌عنوان تکنسین معمولاً در یکی از زیرپروژه‌ها کار می‌کنی.', 'Ein großes Vorhaben passt nicht in einen Kopf. Ein Programm hat mehrere Teilprojekte mit eigener Leitung, eigenem Budget und eigenen Meilensteinen und zeigt die Abhängigkeiten. Als Technikerin arbeitest du meist in einem der Teilprojekte.', 'A large undertaking does not fit in one head. A programme has several sub-projects with their own lead, budget and milestones and shows the dependencies. As a technician you usually work in one of them.'],
  body: [
    { kv: [
      ['Programmziel', 'Einheitliches, sicheres und redundantes Netz für alle Standorte; NIS-2-Anforderungen in Österreich und Deutschland erfüllt'],
      ['Anlass', 'Netztechnik am Ende der Herstellerpflege, zwei Ransomware-Vorfälle in der Branche, NIS-2-Pflichten, Ausfall der einzigen Internetleitung im Vorjahr (9 h)'],
      ['Lenkung', 'Lenkungsausschuss monatlich (Vorstand Finanzen, CIO, Leitung Logistik, Betriebsrat als Gast bei Mitbestimmungsthemen)'],
      ['Budget', '400.000 € netto Investition, Betriebskosten im IT-Budget']
    ] },
    { h: 'Teilprojekte' },
    { keep: 2, t: ['TP', 'Inhalt', 'Abhängig von', 'Meilenstein'], r: [
      ['TP1', 'Internet-Edge: zwei Provider, BGP, Firewall-Cluster, DMZ', '–', 'Monat 2'],
      ['TP2', 'Core und RZ 1, Anbindung RZ 2', 'TP1', 'Monat 3'],
      ['TP3', 'Campus Gebäude A und B (Verteilung, Access, WLAN)', 'TP2', 'Monat 5'],
      ['TP4', 'Filialen mit SD-WAN: Pilot Linz, dann 2 Filialen pro Monat', 'TP1, TP2', 'Monat 8'],
      ['TP5', 'Netzzugangskontrolle mit Geräteprofilen', 'TP3', 'Monat 7'],
      ['TP6', 'Protokollierung, SIEM, Anbindung Security Operations Center', 'TP1', 'Monat 6'],
      ['TP7', 'Doku, Betriebsprozesse, Schulung, Übergabe', 'alle', 'Monat 9']
    ] }
  ] },

{ id: 'anforderungen', ph: 'def',
  t: ['نیازها', 'Anforderungen', 'Requirements'],
  title: 'Anforderungen an das Netz der Gruppe',
  why: ['در شرکت بزرگ نیازها از چند طرف می‌آید: کسب‌وکار (انبار نباید بایستد)، قانون (NIS-2)، امنیت و مالی. هر نیاز یک شماره دارد تا در هر سند بعدی به آن ارجاع داده شود.', 'In einem großen Unternehmen kommen Anforderungen aus mehreren Richtungen: Geschäft (das Lager darf nicht stehen), Recht (NIS-2), Sicherheit und Finanzen. Jede Anforderung bekommt eine Nummer, damit jedes spätere Dokument darauf verweisen kann.', 'In a large company requirements come from several directions: business (the warehouse must not stop), law (NIS-2), security and finance. Each requirement gets a number so every later document can refer to it.'],
  body: [
    { keep: 2, t: ['Nr.', 'Anforderung', 'Quelle', 'Prüfung'], r: [
      ['G01', 'Kein Einzelausfall (Gerät, Leitung, Provider, RZ-Raum) stoppt die Warenwirtschaft länger als 4 h', 'Logistik, Vorstand', 'DR-Test RZ 1 → RZ 2'],
      ['G02', 'Filialen arbeiten bei Ausfall eines Weges weiter (Glasfaser oder 5G)', 'Logistik', 'Leitung trennen, Scanner prüfen'],
      ['G03', 'Handscanner im Lager: Roaming ohne Abbruch, auch in Regalgängen und Kühlbereichen', 'Logistik', 'Begehung mit Scanner-App'],
      ['G04', 'Nur bekannte und gesunde Geräte im Netz; Profilierung für Drucker, Scanner, Sensoren', 'Sicherheit', 'unbekanntes Gerät, veraltetes Notebook'],
      ['G05', 'Fernzugriff auf Anwendungen ohne Netzzugriff (ZTNA), Admin-Zugang nur über Sprungserver mit Aufzeichnung', 'Sicherheit', 'Test mit Mitarbeiter- und Dienstleisterkonto'],
      ['G06', 'Alle Sicherheitsereignisse zentral gesammelt, 24/7 bewertet, Meldefristen einhaltbar', 'NIS-2', 'Testereignis bis zur Meldung durchspielen'],
      ['G07', 'Eigene öffentliche Adressen, Umschalten zwischen Providern ohne DNS-Änderung', 'IT', 'Provider A trennen'],
      ['G08', 'Kühltechnik und Lagertechnik (OT) getrennt, nur Hersteller-Fernwartung mit Freigabe', 'Sicherheit, Lieferanten', 'Regelprüfung, Testsitzung'],
      ['G09', 'Einheitliche Standortvorlage: jede neue Filiale in 2 Tagen betriebsbereit', 'IT', 'Rollout-Zeit der Filialen 3–6'],
      ['G10', 'Dokumentation automatisch aktuell (Inventar, IP, Ports)', 'Betrieb', 'Abgleich Ist und NetBox']
    ] }
  ] },

{ id: 'recht', ph: 'def',
  t: ['حقوقی (اتریش و آلمان)', 'Recht und Compliance (Österreich und Deutschland)', 'Law and compliance (Austria and Germany)'],
  title: 'Recht und Compliance in zwei Ländern',
  why: ['شرکتی که در دو کشور فعال است، با دو قانون ملی NIS-2 سروکار دارد و مدیرانش شخصاً مسئول‌اند. شبکه باید ثبت رویداد، گزارش‌دهی و امنیت زنجیرهٔ تأمین را ممکن کند. این سند آموزشی است و جای مشاورهٔ حقوقی را نمی‌گیرد.', 'Ein Unternehmen in zwei Ländern hat zwei nationale NIS-2-Gesetze, und die Geschäftsleitung haftet persönlich. Das Netz muss Protokollierung, Meldewege und Lieferkettensicherheit ermöglichen. Dieses Dokument dient dem Lernen und ersetzt keine Rechtsberatung.', 'A company in two countries faces two national NIS-2 laws, and management is personally liable. The network must enable logging, reporting and supply-chain security. This document is for learning and does not replace legal advice.'],
  body: [
    { keep: 1, t: ['Thema', 'Österreich (AG)', 'Deutschland (Tochter GmbH)', 'Folge für die Planung'], r: [
      ['Betroffenheit NIS-2', 'NISG 2026: Großhandel mit Lebensmitteln ist NIS-Sektor (Lebensmittel: Produktion, Verarbeitung, Vertrieb); große Einrichtung → „wichtige Einrichtung“; Registrierung bei der Behörde', 'NIS2UmsuCG/BSIG: gleiche Sektorlogik; Registrierung im BSI-Portal', 'Betroffenheit je Gesellschaft dokumentieren; zwei Meldewege vorbereiten'],
      ['Leitungspflichten', 'Geschäftsleitung billigt Risikomaßnahmen, überwacht sie und nimmt an Schulungen teil', 'ebenso (BSIG neu)', 'Jährlicher Sicherheitsbericht an den Vorstand, Schulungsnachweise'],
      ['Meldefristen', 'Frühwarnung 24 h, Meldung 72 h, Abschlussbericht 1 Monat', 'gleich', 'SOC-Vertrag mit Fristen, Vorlagen, Rufbereitschaft'],
      ['Lieferkette', 'Sicherheit bei Dienstleistern und Lieferanten ist Teil des Risikomanagements', 'gleich', 'Fernwartung nur über kontrollierten Zugang; Sicherheitsanforderungen in Verträgen'],
      ['Mitbestimmung', 'Betriebsvereinbarung für Kontrollsysteme und Personaldatensysteme (ArbVG §§ 96, 96a)', 'Mitbestimmung (BetrVG § 87 Abs. 1 Nr. 6), ggf. Gesamt- oder Konzernbetriebsrat', 'SIEM, NAC, Web-Filter und Kameras vorab regeln; Auswertungen rollenbasiert'],
      ['Datenschutz', 'DSGVO, DSG; Bildaufnahmen nach DSG §§ 12–13', 'DSGVO, BDSG; Videoüberwachung nach § 4 BDSG', 'Auftragsverarbeitung mit SOC- und Colocation-Anbieter (Art. 28 DSGVO), Löschkonzept für Protokolle'],
      ['Verträge mit Providern', 'Service Level (Verfügbarkeit, Entstörzeit) schriftlich, Strafzahlungen bei Verfehlen', 'gleich', 'SLA-Werte direkt in die Verfügbarkeitsrechnung übernehmen']
    ] }
  ],
  src: [['WKO – NIS-Gesetz 2026', 'https://www.wko.at/oe/internetrecht/cybersicherheit-nis-2-richtlinie'], ['BSI – NIS-2-regulierte Unternehmen', 'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/nis-2-regulierte-unternehmen_node.html'], ['NIS-2-Richtlinie (EU) 2022/2555 (EUR-Lex)', 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj']] },

{ id: 'netzplan', ph: 'plan',
  t: ['نقشهٔ شبکه (فیزیکی و منطقی)', 'Netzplan (physisch und logisch)', 'Network diagram (physical and logical)'],
  title: 'Netzplan: Drei-Schichten-Campus, zwei Rechenzentren, SD-WAN',
  why: ['در اندازهٔ بزرگ لایه‌ها جدا می‌شوند: دسترسی، توزیع، هسته. هر لایه یک کار دارد و خرابی در یکی به بقیه سرایت نمی‌کند. شعبه‌ها از یک الگوی ثابت ساخته می‌شوند تا نصب شعبهٔ تازه سریع و بی‌خطا باشد.', 'In dieser Größe werden die Schichten getrennt: Access, Distribution, Core. Jede Schicht hat eine Aufgabe, und ein Fehler in einer Schicht breitet sich nicht aus. Filialen werden nach einer festen Vorlage gebaut, damit eine neue Filiale schnell und fehlerfrei entsteht.', 'At this size the layers are separated: access, distribution, core. Each layer has one job and a fault in one does not spread. Branches follow a fixed template so a new branch is built quickly and without errors.'],
  body: [
    { topo: { w: 860, h: 560, n: [
      ['a', 'cloud', 250, 40, 'Provider A', 'BGP, 10 Gbit/s'],
      ['b', 'cloud', 520, 40, 'Provider B', 'BGP, 10 Gbit/s'],
      ['fw', 'firewall', 385, 145, 'Edge-Firewall-Cluster', '2× XGS 4300'],
      ['dmz', 'server', 690, 145, 'DMZ', 'Portal, EDI, Mail-Relay'],
      ['core', 'l3switch', 385, 260, 'Core + RZ 1', '2× C9500, 25/100G'],
      ['rz', 'server', 110, 260, 'RZ 1 Server/Storage', 'Gebäude B'],
      ['rz2', 'firewall', 720, 260, 'RZ 2 (Colocation)', 'Replikation, DR'],
      ['da', 'switch', 220, 375, 'Distribution A', '2× C1300-24XS'],
      ['db', 'switch', 520, 375, 'Distribution B', '2× C1300-24XS'],
      ['aa', 'switch', 220, 480, 'Access A', '8× 48 PoE+, 24 APs'],
      ['ab', 'switch', 520, 480, 'Access B', '6× 48 PoE+, 16 APs'],
      ['fil', 'router', 760, 430, 'Filialen 1–6', 'FW-Paar, Glasfaser + 5G']
    ], l: [['a', 'fw', 'eBGP'], ['b', 'fw', 'eBGP'], ['fw', 'dmz', 'DMZ'], ['fw', 'core', 'LAG, OSPF', 'double'], ['core', 'rz', '25G je Host', 'double'], ['core', 'rz2', '2× 10G Mietleitung', 'double'], ['core', 'da', '2× 10G', 'double'], ['core', 'db', '2× 10G (LWL Campus)', 'double'], ['da', 'aa', '2× 10G je Switch', 'double'], ['db', 'ab', '2× 10G je Switch', 'double'], ['fw', 'fil', 'SD-WAN-Tunnel (Hub 1)', 'alt'], ['rz2', 'fil', 'SD-WAN-Tunnel (Hub 2)', 'alt']] } },
    { h: 'Filialvorlage (gleich für alle 6 Filialen)' },
    { keep: 1, t: ['Baustein', 'Inhalt', 'Grund'], r: [
      ['WAN', 'Glasfaser 300/100 + 5G-Router, beide aktiv', 'unterschiedliche Medien'],
      ['Firewall', 'Paar (Aktiv/Passiv) mit SD-WAN, Tunnel zu Hub 1 (Zentrale) und Hub 2 (RZ 2)', 'Verfügbarkeitsziel 99,9 %'],
      ['Switches', '2× 48 PoE+ (Büro und Lager), je 2 Uplinks', 'Lager-APs und Scanner-Ladestationen'],
      ['WLAN', '5 APs, davon 2 für Kühlbereich in Schutzgehäuse', 'Scanner-Roaming'],
      ['Strom', 'USV 1.500 VA für Netz, Laufzeit ≥ 30 min', 'kurze Ausfälle'],
      ['Konfiguration', 'aus Vorlage erzeugt (Standortnummer, Adressen), Inbetriebnahme mit Zero-Touch', 'G09']
    ] },
    { h: 'Kernentscheidungen' },
    { keep: 1, t: ['Entscheidung', 'Begründung', 'Bezug'], r: [
      ['Drei Schichten in der Zentrale', 'Zwei Gebäude mit getrennten Verteilern; Fehler bleiben im Gebäude; Erweiterung ohne Core-Umbau', 'G01'],
      ['Core zugleich RZ-Aggregation', 'Server und Storage mit 25 Gbit/s direkt am Core; spart eine Schicht im RZ', 'G01'],
      ['BGP mit eigenem Präfix bei zwei Providern', 'Umschalten ohne DNS-Änderung, eingehende Dienste bleiben erreichbar', 'G07'],
      ['SD-WAN mit zwei Hubs', 'Fällt Zentrale oder RZ 1 aus, laufen Filialen über RZ 2 weiter', 'G01, G02'],
      ['Firewall-Paare auch in Filialen', 'Mit Einzelgerät nur 99,82 % – Ziel 99,9 % verfehlt; Mehrkosten gering', 'G02'],
      ['Gleiche Switch-Familie für Distribution und Access', 'eine Bedienoberfläche, Ersatzteile austauschbar', 'G09']
    ] }
  ] },

{ id: 'ipplan', ph: 'plan',
  t: ['طرح آدرس، VLAN و مسیریابی', 'Adress-, VLAN- und Routingplan', 'Address, VLAN and routing plan'],
  title: 'Standortcodes, VLAN-Vorlage, Adressen und Routing',
  why: ['با ده‌ها شبکه، قاعده از جدول مهم‌تر است: هر محل یک کد دارد و یک بلوک /16 در IPv4 و /48 در IPv6. با این قاعده مسیرها خلاصه می‌شوند و هر تکنسین از روی آدرس، محل را می‌شناسد.', 'Bei dutzenden Netzen ist die Regel wichtiger als die Tabelle: Jeder Standort hat einen Code und einen Block /16 (IPv4) und /48 (IPv6). So lassen sich Routen zusammenfassen, und jede Technikerin erkennt den Standort an der Adresse.', 'With dozens of networks the rule matters more than the table: each site has a code and one /16 (IPv4) and /48 (IPv6) block. Routes can be summarised and any technician recognises the site from the address.'],
  body: [
    { h: 'Standortcodes' },
    { keep: 2, t: ['Code', 'Standort', 'IPv4', 'IPv6'], r: [
      ['11', 'Zentrale Gebäude A', '10.11.0.0/16', '2001:db8:11::/48'],
      ['12', 'Zentrale Gebäude B', '10.12.0.0/16', '2001:db8:12::/48'],
      ['100', 'RZ 1 (Gebäude B)', '10.100.0.0/16', '2001:db8:100::/48'],
      ['110', 'RZ 2 (Colocation)', '10.110.0.0/16', '2001:db8:110::/48'],
      ['201–204', 'Filialen Österreich', '10.201.0.0/16 – 10.204.0.0/16', '2001:db8:201::/48 – 2001:db8:204::/48'],
      ['211–212', 'Filialen Deutschland', '10.211.0.0/16, 10.212.0.0/16', '2001:db8:211::/48, 2001:db8:212::/48']
    ], cap: 'Beispielpräfixe aus dem Dokumentationsbereich. Real: eigenes IPv6-Präfix über einen LIR (z. B. /44), daraus ein /48 je Standort.' },
    { h: 'VLAN-Vorlage je Standort (drittes Oktett = VLAN)' },
    { keep: 2, t: ['VLAN', 'Name', 'Netz (Beispiel Filiale 201)', 'Gateway'], r: [
      ['10', 'CLIENTS-LAN', '10.201.10.0/24', 'Firewall Filiale / Distribution Zentrale'],
      ['11', 'CLIENTS-WLAN', '10.201.11.0/24', 'wie oben'],
      ['30', 'VOICE', '10.201.30.0/24', 'wie oben'],
      ['40', 'PRINT', '10.201.40.0/24', 'wie oben'],
      ['50', 'GUEST', '10.201.50.0/24', 'Firewall, lokaler Internetausgang'],
      ['65', 'SCANNER', '10.201.65.0/24', 'Firewall'],
      ['70', 'OT (Kühl- und Lagertechnik)', '10.201.70.0/24', 'Firewall'],
      ['90', 'QUARANTAENE', '10.201.90.0/24', 'Firewall'],
      ['99', 'MGMT', '10.201.99.0/24', 'Firewall']
    ] },
    { p: 'RZ-Netze (nur Code 100 und 110): Server-Zonen WEB 10.100.21.0/24, APP 10.100.22.0/24, DB 10.100.23.0/24, BACKUP 10.100.24.0/24, STORAGE 10.100.25.0/24 (nicht geroutet), MGMT-RZ 10.100.99.0/24.' },
    { h: 'Routing' },
    { kv: [
      ['Intern', 'OSPF Area 0 zwischen Edge-Firewall, Core und Distribution; Distribution fasst je Gebäude zu /16 zusammen'],
      ['Filialen', 'SD-WAN-Overlay, Routen per BGP über die Tunnel; jede Filiale meldet nur ihr /16'],
      ['Internet', 'eBGP zu Provider A und B; eigenes IPv4-/24 und IPv6-/48 werden an beide angekündigt; Standardroute von beiden'],
      ['Schutz', 'Präfixfilter auf allen BGP-Sitzungen, RPKI-Ursprungsprüfung (ROA für eigene Präfixe angelegt), BFD für schnelles Umschalten']
    ] }
  ] },

{ id: 'erreichbarkeit', ph: 'plan',
  t: ['اتصال و دسترسی از بیرون', 'Erreichbarkeit: Internet, Standorte, Partner, Fernzugriff', 'Reachability: internet, sites, partners, remote access'],
  title: 'Erreichbarkeit: BGP, SD-WAN, Partneranbindung und Zero-Trust-Zugang',
  why: ['در شرکت بزرگ «دسترسی» چند لایه دارد: اینترنت با دو اپراتور، شعبه‌ها با SD-WAN، شرکای تجاری با EDI، کارکنان با ZTNA و پیمانکاران با دسترسی کنترل‌شده. برای هر کدام مسیر اصلی، مسیر جایگزین و کنترل را مشخص کن.', 'In einem großen Unternehmen hat Erreichbarkeit mehrere Ebenen: Internet über zwei Provider, Filialen per SD-WAN, Geschäftspartner per EDI, Mitarbeitende per ZTNA und Dienstleister über kontrollierten Zugang. Für jede Ebene stehen Hauptweg, Ersatzweg und Kontrolle fest.', 'In a large company reachability has several levels: internet via two providers, branches via SD-WAN, partners via EDI, staff via ZTNA and contractors via controlled access. Each level needs a main path, a fallback and a control.'],
  body: [
    { keep: 1, t: ['Verbindung', 'Hauptweg', 'Ersatzweg', 'Kontrolle'], r: [
      ['Zentrale ↔ Internet', 'Provider A (BGP)', 'Provider B (BGP), Umschalten automatisch mit BFD', 'Edge-Firewall, IPS, Web-Schutz'],
      ['Filiale ↔ Zentrale/RZ', 'SD-WAN über Glasfaser zu Hub 1', '5G zu Hub 1, beide Wege zu Hub 2', 'Anwendungsregeln: Warenwirtschaft und Telefonie bevorzugt über besten Weg'],
      ['Filiale ↔ Microsoft 365', 'lokaler Internetausgang der Filiale', 'über Hub', 'nur freigegebene Cloud-Dienste lokal, Rest über Zentrale'],
      ['Lieferanten/Kunden ↔ EDI', 'SFTP/AS2 auf DMZ-Gateway, feste Partneradressen', 'Gateway auch in RZ 2', 'nur Partner-IP, Zertifikate, Protokollierung'],
      ['Mitarbeitende unterwegs', 'ZTNA: Zugriff je Anwendung nach Identität und Gerätezustand', '–', 'MFA, kein Netzzugriff, nur freigegebene Apps'],
      ['IT-Administration', 'Sprungserver mit Aufzeichnung (PAM), Zugang über ZTNA', '–', 'persönliche Admin-Konten, Freigabe pro Sitzung'],
      ['Wartung Kühltechnik', 'Hersteller über PAM auf eine definierte Anlage', '–', 'Zeitfenster, Freigabe durch Standortleitung, Aufzeichnung'],
      ['Kunden ↔ Bestellportal', 'HTTPS über Web-Application-Firewall in der DMZ', 'Portal-Instanz in RZ 2', 'nur 443, Bot- und DDoS-Schutz beim Provider']
    ] },
    { h: 'Namensauflösung' },
    { ul: ['Öffentliches DNS bei zwei unabhängigen DNS-Anbietern (sekundär), DNSSEC aktiv.', 'Intern: AD-integriertes DNS in RZ 1 und RZ 2; Filialen fragen die nächstgelegenen DCs über das Overlay.', 'Split-DNS für Portal und EDI, damit interner Verkehr nicht über das Internet läuft.'] }
  ] },

{ id: 'sicherheit', ph: 'plan',
  t: ['امنیت: منطقه‌ها، Zero Trust، پایش', 'Sicherheit: Zonen, Zero Trust, Überwachung', 'Security: zones, zero trust, monitoring'],
  title: 'Sicherheitsarchitektur: Segmentierung, NAC, ZTNA, PAM, SIEM/SOC',
  why: ['در اندازهٔ بزرگ مهاجم به‌احتمال زیاد یک‌جا وارد می‌شود؛ سؤال این است که چقدر جلو می‌رود و چقدر زود دیده می‌شود. بخش‌بندی، کنترل ورود، دسترسی حداقلی و پایش شبانه‌روزی همین دو سؤال را جواب می‌دهند.', 'In dieser Größe kommt ein Angreifer wahrscheinlich irgendwo hinein; die Frage ist, wie weit er kommt und wie schnell man ihn sieht. Segmentierung, Zugangskontrolle, minimale Rechte und Überwachung rund um die Uhr beantworten genau diese Fragen.', 'At this size an attacker will probably get in somewhere; the question is how far they get and how quickly they are seen. Segmentation, access control, least privilege and round-the-clock monitoring answer exactly that.'],
  body: [
    { keep: 1, t: ['Baustein', 'Umsetzung', 'Wogegen', 'Bezug'], r: [
      ['Segmentierung', 'Zonen je Standort (Vorlage), RZ in Web/App/DB/Backup/Storage getrennt, Regeln zwischen Server-Zonen', 'Ausbreitung nach einem Einbruch', 'G01, G08'],
      ['Netzzugangskontrolle', '802.1X EAP-TLS für Firmengeräte; Profilierung für Drucker, Scanner, Sensoren; Gerätezustand (Patches, Virenschutz) als Bedingung', 'fremde und unsichere Geräte', 'G04'],
      ['ZTNA', 'Anwendungszugriff statt VPN-Netzzugriff, Prüfung von Identität und Gerät bei jedem Zugriff', 'gestohlene Zugangsdaten, kompromittierte Heimgeräte', 'G05'],
      ['Privilegierter Zugang', 'Sprungserver mit Sitzungsaufzeichnung, Freigabe pro Sitzung, getrennte Admin-Konten', 'Missbrauch von Admin-Rechten, Dienstleisterzugang', 'G05, G08'],
      ['SIEM und SOC', 'Protokolle aller Firewalls, Switches, NAC, AD und Server zentral; externer SOC bewertet 24/7', 'unbemerkte Angriffe, versäumte Meldefristen', 'G06'],
      ['Backup-Schutz', 'Backup-Netz nur vom Backup-Server erreichbar, unveränderliche Kopie in RZ 2', 'Ransomware', 'G01'],
      ['Schwachstellen', 'monatlicher Scan aller Netze, kritische Lücken in 72 h schließen', 'bekannte Lücken', 'G06']
    ] },
    { h: 'Zonenmatrix (Grundsatz)' },
    { keep: 1, t: ['Von \\ Nach', 'Internet', 'RZ-APP', 'RZ-DB', 'OT', 'MGMT'], r: [
      ['CLIENTS (alle Standorte)', 'Web über Schutzregeln', 'Anwendungsports', '–', '–', '–'],
      ['SCANNER', '–', 'nur Lager-App-Server', '–', '–', '–'],
      ['RZ-WEB (DMZ)', 'Updates', 'nur API-Port', '–', '–', '–'],
      ['RZ-APP', 'Updates über Proxy', 'intern', 'nur Datenbankport', '–', '–'],
      ['OT', '–', 'nur Monitoring-Server Kühlung', '–', 'intern', '–'],
      ['PAM-Sprungserver', '–', 'Admin', 'Admin', 'Admin (mit Freigabe)', 'SSH, HTTPS']
    ], cap: '„–“ = verboten. Regeln werden als Code verwaltet, geprüft und versioniert.' },
    { note: 'Orientierung: BSI-Bausteine NET.1.1, NET.3.2, OPS.1.1.5 (Protokollierung), DER.1 (Detektion), NIST SP 800-207 (Zero Trust). Die Bausteine dienen der Orientierung, nicht der Zertifizierung.' }
  ],
  src: [['NIST SP 800-207 – Zero Trust Architecture', 'https://csrc.nist.gov/pubs/sp/800/207/final'], ['BSI – IT-Grundschutz-Kompendium', 'https://www.bsi.bund.de/gs-kompendium']] },

{ id: 'verfuegbarkeit', ph: 'plan',
  t: ['دسترس‌پذیری و بازیابی از فاجعه', 'Verfügbarkeit und Disaster Recovery', 'Availability and disaster recovery'],
  title: 'Verfügbarkeitsrechnung, zweites Rechenzentrum, RTO und RPO',
  why: ['در شرکت بزرگ دو سؤال جداست: خرابی یک دستگاه (افزونگی جواب می‌دهد) و از دست رفتن کل یک مکان (دیتاسنتر دوم جواب می‌دهد). برای هر دو عدد هدف و آزمون لازم است.', 'In einem großen Unternehmen sind zwei Fragen getrennt: der Ausfall eines Geräts (Redundanz) und der Verlust eines ganzen Standorts (zweites Rechenzentrum). Für beide braucht es Zielwerte und Tests.', 'In a large company two questions are separate: one device failing (redundancy answers) and losing a whole site (a second data centre answers). Both need target values and tests.'],
  body: [
    { keep: 1, t: ['Element', 'Annahme', 'Aufbau'], r: [
      ['Provider A und B', 'je 99,9 % (SLA)', 'parallel über BGP'],
      ['Edge-Firewall', '99,9 % je Gerät', 'Cluster'],
      ['Core, Distribution', '99,95 % je Gerät', 'je 2 Geräte'],
      ['Access-Switch', '99,95 %', 'einzeln, Ersatz je Standort'],
      ['Anwendungs-Cluster RZ', '99,99 %', 'N+1 Hosts'],
      ['Filiale WAN', 'Glasfaser 99,5 %, 5G 98 %', 'parallel (SD-WAN)'],
      ['Filial-Firewall', '99,9 % je Gerät', 'Paar']
    ] },
    { h: 'Rechnung' },
    { pre: 'Zentrale → Internet:\n0,9995 × (1−0,0005²) × (1−0,0005²) × (1−0,001²) × (1−0,001²) × (1−0,0001²) = 0,99950 → 99,95 %\n\nZentrale → Anwendung RZ 1:\n0,9995 × (1−0,0005²) × (1−0,0005²) × 0,9999 × (1−0,0001²) = 0,99940 → 99,94 %\n\nFiliale → Anwendung RZ 1:\nmit Firewall-Paar:  0,9995 × 0,999999 × 0,9999 × 0,999999 × 0,999999 × 0,99999975 × 0,9999 × 0,99999999 × 0,9999 = 0,99920 → 99,92 %\nmit Einzel-Firewall: dieselbe Kette mit 0,999 statt 0,999999                                      = 0,99820 → 99,82 %' },
    { note: 'Ergebnis: Alle Ziele (99,9 %) werden erreicht – in den Filialen aber nur mit Firewall-Paar. Der verbleibende größte Einzelfaktor ist überall der Access-Switch; Ersatzgeräte liegen an jedem Standort.' },
    { h: 'Disaster Recovery' },
    { keep: 1, t: ['Szenario', 'Reaktion', 'RTO', 'RPO'], r: [
      ['Ausfall RZ 1 (Brand, Strom, Wasser)', 'Warenwirtschaft in RZ 2 starten, SD-WAN nutzt Hub 2, BGP-Ankündigung aus RZ 2', '4 h', '15 min (asynchrone Replikation)'],
      ['Ausfall Zentrale komplett', 'Filialen arbeiten über RZ 2 weiter; Mitarbeitende der Zentrale über ZTNA von zu Hause', '4 h', '15 min'],
      ['Ransomware im RZ', 'Netz isolieren, Wiederherstellung aus unveränderlicher Sicherung', '48 h', '24 h'],
      ['Ausfall eines Providers', 'automatisch über BGP', '< 1 min', '–']
    ] },
    { p: 'DR-Test zweimal jährlich mit Protokoll; Ergebnis geht an den Vorstand (Nachweis für NIS-2).' }
  ] },

{ id: 'qualitaet', ph: 'plan',
  t: ['کیفیت، ظرفیت و معیار تحویل', 'Kapazität, Qualität und Abnahme', 'Capacity, quality and acceptance'],
  title: 'Kapazitätsplanung, QoS, WLAN im Lager und Abnahmekriterien',
  why: ['ظرفیت را برای سه سال آینده حساب کن، نه امروز. در انبار WLAN سخت‌ترین بخش است: قفسه‌های فلزی، سقف بلند و سردخانه. معیارهای تحویل در شرکت بزرگ برای هر زیرپروژه جدا اندازه‌گیری می‌شوند.', 'Kapazität wird für die nächsten drei Jahre geplant, nicht für heute. Im Lager ist WLAN der schwierigste Teil: Metallregale, hohe Decken, Kühlhaus. Abnahmekriterien werden je Teilprojekt gemessen.', 'Plan capacity for the next three years, not for today. In the warehouse Wi-Fi is the hardest part: metal racks, high ceilings, cold store. Acceptance criteria are measured per sub-project.'],
  body: [
    { keep: 1, t: ['Strecke', 'Auslegung', 'Begründung'], r: [
      ['Access → Distribution', '2× 10G je Access-Switch (48× 1G): Überbuchung 2,4 : 1', 'üblich für Büro und Lager'],
      ['Distribution → Core', '2× 10G je Distribution-Switch, aufrüstbar auf 25G', 'Gebäude-Summe mit Reserve'],
      ['Server → Core', '2× 25G je Host', 'Virtualisierung und Backup'],
      ['Zentrale → Internet', '2× 10 Gbit/s, Auslastung zur Spitzenzeit unter 40 %', 'Cloud-Dienste, Filialen über Hub'],
      ['Filiale → Overlay', 'Glasfaser 300/100, 5G als Ersatz', 'Warenwirtschaft, Telefonie, Scanner']
    ] },
    { h: 'WLAN im Lager' },
    { ul: ['Messung vor Ort mit Handscanner-Modell, nicht nur mit Notebook: Scanner haben schwächere Antennen.', 'APs zwischen den Regalgängen, Richtantennen in Gängen > 40 m; Kühlhaus mit APs in beheizten Schutzgehäusen.', 'Roaming-Ziel: Wechsel zwischen APs < 50 ms (schnelles Roaming 802.11r), keine Abbrüche in der Scanner-App.'] },
    { h: 'Abnahmekriterien (Auszug)' },
    { keep: 2, t: ['Nr.', 'Kriterium', 'Zielwert', 'Messmethode', 'TP'], r: [
      ['Q1', 'Ausfall Provider A', 'Umschalten < 30 s (BFD), eingehender Dienst erreichbar', 'Leitung trennen, externer Monitor', 'TP1'],
      ['Q2', 'Ausfall Core-Member', 'Unterbrechung ≤ 2 s', 'Dauerping aus beiden Gebäuden', 'TP2'],
      ['Q3', 'DR-Umschaltung RZ 1 → RZ 2', 'Warenwirtschaft nutzbar in ≤ 4 h', 'geplanter DR-Test', 'TP2'],
      ['Q4', 'Filiale: Glasfaser trennen', 'Scanner und Telefonie laufen weiter', 'Test in Pilotfiliale', 'TP4'],
      ['Q5', 'Roaming im Lager', '< 50 ms, 0 Abbrüche in 30 min Fahrt', 'Messung mit Scanner', 'TP3, TP4'],
      ['Q6', 'Unbekanntes Gerät', 'nur Quarantäne', 'Test-Gerät', 'TP5'],
      ['Q7', 'Sicherheitsereignis', 'SOC meldet sich ≤ 15 min', 'angekündigtes Testereignis', 'TP6'],
      ['Q8', 'Neue Filiale aus Vorlage', 'betriebsbereit in ≤ 2 Tagen', 'Rollout Filiale 3', 'TP4']
    ] }
  ] },

{ id: 'kosten', ph: 'plan', cost: 1,
  t: ['فهرست تجهیزات، هزینه و TCO', 'Stückliste, Kosten und TCO', 'Bill of materials, cost and TCO'],
  title: 'Stückliste, Kosten und TCO über 5 Jahre – Preise netto',
  why: ['در پروژهٔ بزرگ، کار انسانی و هزینه‌های جاری از دستگاه‌ها بزرگ‌ترند: برنامه‌ریزی و اجرا، اینترنت، مرکز داده، پایش امنیتی. هیئت‌مدیره این عدد پنج‌ساله را برای تصمیم لازم دارد.', 'In großen Projekten sind Arbeit und laufende Kosten größer als die Geräte: Planung und Umsetzung, Internet, Colocation, Sicherheitsüberwachung. Der Vorstand braucht diese 5-Jahres-Zahl für die Entscheidung.', 'In large projects labour and running costs exceed hardware: planning and delivery, internet, colocation, security monitoring. The board needs this 5-year figure to decide.'],
  body: [
    { keep: 3, t: ['Pos.', 'Geräteklasse (Beispielmodell)', 'Menge', 'Einzelpreis', 'Gesamt', 'Quelle'], r: [
      ['1', 'Edge-Firewall Oberklasse (z. B. Sophos XGS 4300), Cluster', '2', '8.662,28 €', '17.324,56 €', 'R: Händler, netto, 11/2026'],
      ['2', 'Schutzlizenz Edge 12 Monate (Standard Protection)', '1', '6.698,22 €', '6.698,22 €', 'R: Händler, 11/2026'],
      ['3', 'Firewall RZ 2 (z. B. Sophos XGS 2300), Cluster', '2', '3.019,72 €', '6.039,44 €', 'R: Händler, 11/2026'],
      ['4', 'Lizenzen RZ 2 (Netzwerk- und Web-Schutz)', '1', '3.762,95 €', '3.762,95 €', 'R: Händler, 11/2026'],
      ['5', 'Filial-Firewalls (z. B. Sophos XGS 108), 6 Paare', '12', '573,20 €', '6.878,40 €', 'R: Händler, 11/2026'],
      ['6', 'Schutzlizenzen Filialen 12 Monate', '6', '266,88 €', '1.601,28 €', 'R: Händler, 11/2026'],
      ['7', 'Core/RZ-Switch 24× 25G, 4× 100G (z. B. Cisco C9500-24Y4C)', '2', '15.930,00 €', '31.860,00 €', 'R: Händler, netto, 11/2026'],
      ['8', 'Pflicht-Software-Abo des Herstellers für Core-Switches (5 J.)', '2', '4.000,00 €', '8.000,00 €', 'PW: Angebot einholen'],
      ['9', 'Distribution 24× 10G (z. B. Cisco C1300-24XS)', '4', '1.767,48 €', '7.069,92 €', 'R: siehe Mappe Mittel'],
      ['10', 'Access 48× PoE+ (z. B. Cisco C1300-48FP-4X)', '26', '1.815,54 €', '47.204,04 €', 'R: siehe Mappe Mittel'],
      ['11', 'Module und Kabel 10/25G', '160', '60,00 €', '9.600,00 €', 'PW'],
      ['12', 'Access Points Wi-Fi 7 (z. B. Ubiquiti U7 Pro)', '70', '150,00 €', '10.500,00 €', 'R: siehe Mappe Kleine Firma'],
      ['13', 'Netzzugangskontrolle mit Profilierung (ca. 1.500 Geräte)', '1', '35.000,00 €', '35.000,00 €', 'PW: Herstellerangebot'],
      ['14', 'Log-/SIEM-Plattform (Server, Speicher)', '1', '8.000,00 €', '8.000,00 €', 'PW'],
      ['15', 'USV RZ 10 kVA', '2', '6.500,00 €', '13.000,00 €', 'PW'],
      ['16', 'USV Filialen 1.500 VA', '6', '756,00 €', '4.536,00 €', 'PW (siehe Mappe Kleine Firma)'],
      ['17', 'Racks und Verteiler', '10', '1.200,00 €', '12.000,00 €', 'PW'],
      ['18', 'Cat-6A-Anschlüsse Gebäude B inkl. Messung', '120', '180,00 €', '21.600,00 €', 'PW'],
      ['19', 'Glasfaser Campus A ↔ B, zwei Trassen', '1', '6.000,00 €', '6.000,00 €', 'PW'],
      ['20', '5G-Router Filialen', '6', '400,00 €', '2.400,00 €', 'PW'],
      ['21', 'Eigenes Präfix über LIR, BGP-Einrichtung', '1', '3.000,00 €', '3.000,00 €', 'PW'],
      ['22', 'Planung, Programmleitung, Umsetzung, Tests, Doku', '1.400 h', '95,00 €', '133.000,00 €', 'PW'],
      ['', 'Summe netto', '', '', '395.074,81 €', ''],
      ['', 'zzgl. 20 % USt.', '', '', '79.014,96 €', ''],
      ['', 'Summe brutto', '', '', '474.089,77 €', '']
    ] },
    { note: 'Bei Enterprise-Herstellern weichen Listenpreise und Projektpreise stark ab (Rabatte, Pflicht-Abos). Für Core-Switches und NAC deshalb immer verbindliche Angebote von zwei Händlern einholen.' },
    { h: 'TCO über 5 Jahre (netto)' },
    { keep: 1, t: ['Kostenart', 'Rechnung', 'Betrag'], r: [
      ['Investition', 'siehe oben', '395.074,81 €'],
      ['Schutzlizenzen Jahre 2–5', '4 × (6.698,22 + 3.762,95 + 6 × 266,88) €', '48.249,80 €'],
      ['Internet, Colocation, Filialleitungen, IPv4-Miete', '60 × (2 × 1.800 + 2.500 + 6 × 180 + 130) € (PW)', '438.600,00 €'],
      ['Externer SOC (24/7)', '60 × 4.000 € (PW)', '240.000,00 €'],
      ['Wartungsvertrag Netz', '60 × 40 h × 95 € (PW)', '228.000,00 €'],
      ['Strom Netz (ohne Colocation)', '6 kW × 8.760 h × 5 J. × 0,25 €/kWh (PW)', '65.700,00 €'],
      ['USV-Akkus', '2 × 2.500 € + 6 × 350 € (PW)', '7.100,00 €'],
      ['Summe TCO 5 Jahre', '', '1.422.724,61 € (≈ 23.700 € pro Monat, ≈ 30 € pro Mitarbeitendem und Monat)']
    ] }
  ],
  src: [['Sophos XGS 4300 – Händlerpreis und Bundles (avanet)', 'https://www.avanet.com/shop/sophos-firewall/xgs-4300/'], ['Sophos XGS 2300 – Händlerpreis (avanet)', 'https://www.avanet.com/en/shop/sophos-xgs-2300/'], ['Sophos XGS 108 – Händlerpreis (avanet)', 'https://www.avanet.com/shop/sophos-firewall/xgs-108/'], ['Cisco C9500-24Y4C – Händlerpreis netto', 'https://servermall.com/de/catalog/hardware/cisco-catalyst-c9500-24y4c-a/']] },

{ id: 'migration', ph: 'steu',
  t: ['برنامهٔ اجرا و شعبهٔ آزمایشی', 'Rollout-Plan mit Pilotfiliale', 'Rollout plan with pilot branch'],
  title: 'Rollout: Reihenfolge der Teilprojekte, Pilot und Wellen',
  why: ['در شرکت بزرگ هیچ تغییری یک‌باره در همهٔ محل‌ها انجام نمی‌شود. اول یک شعبهٔ آزمایشی، بعد درس‌ها را در الگو اعمال کن و سپس موج‌به‌موج پیش برو. هر موج «نقطهٔ توقف» دارد.', 'In einem großen Unternehmen wird nichts an allen Standorten gleichzeitig umgestellt. Erst eine Pilotfiliale, dann die Erkenntnisse in die Vorlage übernehmen, danach in Wellen weiter. Jede Welle hat einen Haltepunkt.', 'In a large company nothing changes at all sites at once. First a pilot branch, then feed the lessons into the template, then proceed in waves. Every wave has a stop point.'],
  body: [
    { keep: 1, t: ['Monat', 'Schritt', 'Haltepunkt (Go/No-Go)'], r: [
      ['1–2', 'TP1: Provider, BGP, Edge-Cluster parallel zum Altnetz; Präfix ankündigen', 'Q1 bestanden'],
      ['2–3', 'TP2: Core und RZ, Server-Uplinks am Wochenende; RZ 2 anbinden', 'Q2 bestanden, DR-Vorabtest'],
      ['3–5', 'TP3: Gebäude B, dann Gebäude A, je Etage ein Abend', 'Fehlerquote < 1 % der Ports am Folgetag'],
      ['4', 'TP4 Pilot: Filiale Linz mit Vorlage, 2 Wochen Beobachtung', 'Q4, Q5, Q8 bestanden; Vorlage angepasst'],
      ['5–8', 'TP4 Rollout: 2 Filialen pro Monat, Deutschland zuletzt', 'jede Filiale einzeln abgenommen'],
      ['5–7', 'TP5: NAC im Überwachungsmodus, dann Durchsetzung standortweise', '2 Wochen ohne Fehlanmeldungen'],
      ['3–6', 'TP6: Protokollquellen anbinden, SOC-Übergabe', 'Q7 bestanden'],
      ['9', 'TP7: Abbau Altnetz, Übergabe an Betrieb, Lessons Learned', 'Abnahme Programm']
    ] }
  ] },

{ id: 'betrieb', ph: 'abs',
  t: ['بهره‌برداری و فرایندها', 'Betrieb und Prozesse', 'Operations and processes'],
  title: 'Betriebsmodell: NOC, SOC, Prozesse, Lebenszyklus',
  why: ['شبکهٔ بزرگ بدون فرایند از کنترل خارج می‌شود: چه کسی رویداد را می‌بیند، چه کسی تغییر را تأیید می‌کند، کی دستگاه‌ها عوض می‌شوند. این سند تیم بهره‌برداری را برای کار روزمره آماده می‌کند.', 'Ein großes Netz ohne Prozesse gerät außer Kontrolle: Wer sieht Ereignisse, wer genehmigt Änderungen, wann werden Geräte ersetzt? Dieses Dokument macht das Betriebsteam für den Alltag bereit.', 'A large network without processes gets out of control: who sees events, who approves changes, when devices are replaced. This document prepares the operations team for daily work.'],
  body: [
    { keep: 1, t: ['Prozess', 'Regelung', 'Rolle'], r: [
      ['Überwachung (NOC)', 'Verfügbarkeit, Leistung, Kapazität, Tunnel und BGP; Bereitschaft 24/7 für Prio-1-Störungen', 'Netzwerkteam'],
      ['Sicherheitsüberwachung (SOC)', 'externer SOC mit Vertrag: Erkennung, Bewertung, Eskalation in 15 min', 'Dienstleister, CISO'],
      ['Störungen (Incident)', 'Ticket, Priorität nach Auswirkung, Kommunikation an Standorte', 'Service Desk'],
      ['Änderungen (Change)', 'Antrag, Risikobewertung, Freigabe im Change Advisory Board, Rückweg Pflicht', 'CAB'],
      ['Problemanalyse', 'wiederkehrende Störungen auf Ursache prüfen', 'Netzwerkteam'],
      ['Kapazität', 'Quartalsbericht Auslastung, Planung 12 Monate voraus', 'Netzwerkteam'],
      ['Lebenszyklus', 'Inventar mit Ende der Herstellerpflege; Austauschplan 5 Jahre', 'IT-Leitung'],
      ['NIS-2', 'Meldeprozess in beiden Ländern, jährliche Übung, Bericht an Vorstand', 'CISO, Vorstand']
    ] },
    { h: 'Übergabeunterlagen' },
    { ul: ['Netzpläne je Standort aus NetBox erzeugt', 'Filialvorlage (Konfigurationsvorlagen, Checkliste Inbetriebnahme)', 'Regelwerke als Code im Versionsverwaltungssystem', 'Notfallhandbuch je Szenario (Provider, Core, RZ, Ransomware)', 'Abnahmeprotokolle aller Teilprojekte', 'Schulungsnachweise Betriebsteam'] }
  ] }

  ]
});
})();
