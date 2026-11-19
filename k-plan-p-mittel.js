/* Arefi ITPraxis – Projektmappe „Mittlere Firma“: 120 Mitarbeitende, Zentrale mit Produktion und eine Filiale.
   Fiktives Beispiel (Österreich, Vergleich mit Deutschland). Preise recherchiert 11/2026, PW = Planwert. */
(() => {
'use strict';
const P = window.ArefiPlanProjects = window.ArefiPlanProjects || [];
P.push({
  id: 'p-mittel', code: 'TPT-NET-2027', client: 'Traunfeld Präzisionstechnik GmbH, Linz und Wels (fiktives Beispiel)',
  size: ['شرکت متوسط', 'Mittlere Firma', 'Medium company'],
  title: ['شرکت متوسط: شبکهٔ تازه برای یک کارخانهٔ قطعه‌سازی با ۱۲۰ کارمند و یک شعبه', 'Mittlere Firma: Netzmodernisierung für einen Maschinenbauer mit 120 Mitarbeitenden und Filiale', 'Medium company: network modernisation for a machine builder with 120 staff and a branch'],
  lead: ['دفتر مرکزی سه طبقه دارد و یک سالن تولید با دستگاه‌های صنعتی (OT)، یک شعبهٔ فروش و خدمات هم در شهر دیگر است. هستهٔ دوتایی، فایروال دوتایی (HA)، دو اینترنت از دو شرکت، DMZ، VPN بین دو محل، کنترل ورود با 802.1X، جدا کردن شبکهٔ تولید و پایش. این شرکت طبق NISG 2026 احتمالاً «مؤسسهٔ مهم» است.', 'Die Zentrale hat drei Bürogeschosse und eine Fertigungshalle mit Maschinensteuerungen (OT); dazu kommt eine Vertriebs- und Servicefiliale. Redundanter Core, Firewall-Cluster, zwei Internetleitungen verschiedener Anbieter, DMZ, Standortvernetzung per VPN, Netzzugangskontrolle mit 802.1X, getrenntes Produktionsnetz und Monitoring. Das Unternehmen ist nach NISG 2026 voraussichtlich eine „wichtige Einrichtung“.', 'Headquarters has three office floors and a production hall with machine controls (OT), plus a sales and service branch. Redundant core, firewall cluster, two internet lines from different carriers, DMZ, site-to-site VPN, 802.1X access control, a separate production network and monitoring. Under Austria’s NISG 2026 the company is likely an “important entity”.'],
  facts: [
    [['کارفرما', 'Auftraggeber', 'Client'], 'Traunfeld Präzisionstechnik GmbH (Maschinenbau), Geschäftsführung und IT-Leitung'],
    [['کاربران و دستگاه‌ها', 'Nutzer und Geräte', 'Users and devices'], 'Zentrale 95, Filiale 25 Mitarbeitende; 120 PCs/Notebooks, 90 IP-Telefone, 14 Drucker, 30 Maschinensteuerungen, 12 Kameras'],
    [['محل', 'Standort', 'Site'], 'Zentrale Linz: EG, 1. OG, 2. OG, Fertigungshalle, Serverraum EG · Filiale Wels: 1 Etage'],
    [['هدف دسترس‌پذیری', 'Verfügbarkeitsziel', 'Availability target'], 'Zentrale 99,9 % (Internet, Server, Telefonie), Filiale 99,5 %'],
    [['بودجه', 'Budget', 'Budget'], 'Investition bis 75.000 € netto, laufende Kosten separat'],
    [['مدت', 'Dauer', 'Duration'], 'ca. 14 Wochen, Umstellung in Wellen ohne Produktionsstillstand'],
    [['نقش تو', 'Deine Rolle', 'Your role'], 'Netzwerktechniker im Projektteam eines IT-Systemhauses (Planung, Konfiguration, Abnahme)']
  ],
  docs: [

{ id: 'auftrag', ph: 'init',
  t: ['دستور پروژه', 'Projektauftrag', 'Project charter'],
  title: 'Projektauftrag Netzmodernisierung',
  why: ['در شرکت متوسط چند ذی‌نفع داریم: مدیریت، تولید، IT، شورای کارکنان. دستور پروژه هدف، مرز کار، بودجه و تصمیم‌گیرنده را روشن می‌کند تا بعداً هر کس خواستهٔ تازه‌ای آورد، معلوم باشد چه کسی تصمیم می‌گیرد.', 'In einer mittleren Firma gibt es mehrere Beteiligte: Geschäftsführung, Produktion, IT, Betriebsrat. Der Projektauftrag legt Ziel, Grenzen, Budget und Entscheider fest – kommt später ein neuer Wunsch, ist klar, wer entscheidet.', 'A medium company has several stakeholders: management, production, IT, works council. The charter fixes goal, scope, budget and decision-maker, so it is clear who decides when new wishes appear.'],
  body: [
    { kv: [
      ['Ausgangslage', 'Switches und Firewall 9 Jahre alt, ohne Herstellerpflege; ein flaches Netz für Büro und Fertigung; eine Internetleitung; Filiale per Fernwartungssoftware statt VPN'],
      ['Projektziel', 'Sicheres, redundantes Netz für Zentrale und Filiale; Fertigung getrennt; Betrieb dokumentiert und überwacht'],
      ['Umfang', 'Firewall, Core- und Access-Switches, WLAN, Standortvernetzung, Netzzugangskontrolle, Monitoring, Dokumentation, Schulung IT-Team'],
      ['Nicht im Umfang', 'Server- und Clienterneuerung, Telefonanlage (bleibt Cloud-Telefonie), Maschinensteuerungen selbst'],
      ['Budget', '75.000 € netto Investition; Freigabe durch Geschäftsführung'],
      ['Meilensteine', 'M1 Konzept freigegeben (Woche 3) · M2 Core und Firewall in Betrieb (Woche 7) · M3 alle Etagen umgestellt (Woche 11) · M4 Abnahme (Woche 14)'],
      ['Rollen', 'Auftraggeber: Geschäftsführung · Projektleitung: Systemhaus · fachlich: IT-Leitung, Fertigungsleitung · Betriebsrat: bei Protokollierung und 802.1X einbinden'],
      ['Abnahme', 'Messprotokoll gegen die Kriterien im Dokument „Leistung und Qualität“']
    ] }
  ] },

{ id: 'anforderungen', ph: 'def',
  t: ['نیازها و برداشت وضعیت', 'Ist-Aufnahme und Anforderungen', 'Current state and requirements'],
  title: 'Ist-Aufnahme und Anforderungen',
  why: ['برداشت وضعیت در شرکت متوسط یعنی فهرست کامل: هر سوئیچ، هر اتصال، هر دستگاه تولید، هر سرویسی که از بیرون در دسترس است. نیازها را با اولویت و روش آزمون بنویس تا در تحویل قابل سنجش باشند.', 'Die Ist-Aufnahme in einer mittleren Firma ist eine vollständige Liste: jeder Switch, jede Leitung, jede Maschine im Netz, jeder Dienst, der von außen erreichbar ist. Anforderungen bekommen Priorität und Prüfmethode, damit sie bei der Abnahme messbar sind.', 'The current-state survey in a medium company is a complete list: every switch, link, machine on the network and every service reachable from outside. Requirements get a priority and a test method so they can be measured at acceptance.'],
  body: [
    { h: 'Ist-Aufnahme' },
    { keep: 1, t: ['Bereich', 'Befund', 'Risiko'], r: [
      ['Switches', '9 Access-Switches unterschiedlicher Hersteller, 1 Gbit/s Backbone, keine Redundanz, End of Support', 'hoch'],
      ['Firewall', 'Einzelgerät ohne Schutzlizenz, Regeln „any-any“ zwischen Büro und Fertigung', 'sehr hoch'],
      ['Internet', '1 Glasfaserleitung 300/300, kein Ersatzweg', 'hoch'],
      ['Fertigung', '30 Steuerungen und 2 Bedien-PCs mit Windows 7 im Büronetz; Hersteller-Fernwartung über eigene Router', 'sehr hoch'],
      ['WLAN', '11 Consumer-APs, ein gemeinsames Kennwort seit 2021', 'hoch'],
      ['Filiale', 'Internet 100/20, Zugriff auf Zentrale per Fernwartungssoftware', 'mittel'],
      ['Doku', 'Netzplan von 2018, keine IP-Liste', 'mittel']
    ] },
    { h: 'Anforderungen' },
    { keep: 2, t: ['Nr.', 'Anforderung', 'Priorität', 'Prüfung'], r: [
      ['A01', 'Kein Einzelausfall von Firewall, Core oder Internetleitung legt die Zentrale still', 'Muss', 'Ausfalltests je Komponente'],
      ['A02', 'Fertigung (OT) vom Büronetz getrennt, nur definierte Verbindungen', 'Muss', 'Portscan aus Büro, Regelprüfung'],
      ['A03', 'Nur bekannte Geräte erhalten Netzzugang (802.1X), unbekannte landen in Quarantäne', 'Muss', 'fremdes Notebook anstecken'],
      ['A04', 'Filiale per VPN mit Ersatzweg angebunden', 'Muss', 'Glasfaser Filiale trennen'],
      ['A05', 'Backbone 10 Gbit/s zwischen Etagen und Serverraum', 'Muss', 'iperf3-Messung'],
      ['A06', 'Telefonie mit Priorität, Sprachqualität gut', 'Muss', 'Jitter, Verlust, Testgespräche'],
      ['A07', 'Gäste-WLAN mit Portal, getrennt', 'Muss', 'Gastgerät testen'],
      ['A08', 'Hersteller-Fernwartung der Maschinen nur freigegeben, zeitlich begrenzt und protokolliert', 'Muss', 'Testsitzung mit Freigabe'],
      ['A09', 'Zentrales Monitoring mit Alarm per E-Mail und SMS', 'Soll', 'Switchport abschalten, Alarm prüfen'],
      ['A10', 'Kundenportal aus dem Internet erreichbar, nicht im internen Netz', 'Soll', 'Portal von außen aufrufen, interne Netze unerreichbar'],
      ['A11', 'Dokumentation in NetBox, Netzpläne aktuell', 'Soll', 'Stichprobe 10 Ports'],
      ['A12', 'Anforderungen aus NISG 2026 berücksichtigt (Risikomanagement, Meldewege)', 'Muss', 'Checkliste mit IT-Leitung']
    ] }
  ] },

{ id: 'recht', ph: 'def',
  t: ['حقوقی (اتریش و آلمان)', 'Recht und Compliance (Österreich und Deutschland)', 'Law and compliance (Austria and Germany)'],
  title: 'Recht und Compliance – Österreich mit Vergleich Deutschland',
  why: ['در شرکت متوسط قانون مستقیماً طراحی را تغییر می‌دهد: NIS-2 گزارش رویداد و مدیریت ریسک می‌خواهد، شورای کارکنان روی ثبت لاگ و کنترل نظر دارد. این سند آموزشی است و جای مشاورهٔ حقوقی را نمی‌گیرد.', 'In einer mittleren Firma verändert Recht die Planung direkt: NIS-2 verlangt Risikomanagement und Meldewege, der Betriebsrat redet bei Protokollierung und Kontrolle mit. Dieses Dokument dient dem Lernen und ersetzt keine Rechtsberatung.', 'In a medium company law directly shapes the design: NIS-2 requires risk management and reporting, the works council has a say on logging and control. This document is for learning and does not replace legal advice.'],
  body: [
    { keep: 1, t: ['Thema', 'Österreich', 'Deutschland', 'Folge für die Planung'], r: [
      ['NIS-2', 'NISG 2026 seit 1.10.2026 in Kraft; Maschinenbau ist NIS-Sektor, ab mittlerer Größe (≥ 50 Beschäftigte oder > 10 Mio. € Umsatz) voraussichtlich „wichtige Einrichtung“; Registrierung, Risikomanagement, Meldepflichten', 'NIS2UmsuCG seit 6.12.2025 in Kraft (BSIG neu); Registrierung beim BSI; gleiche Sektor- und Größenlogik', 'Betroffenheit mit dem WKO-NIS-Check bzw. der BSI-Betroffenheitsprüfung klären und dokumentieren; Logging, Backup, Zugriffsschutz, Meldeprozess einplanen'],
      ['Meldepflicht', 'erheblicher Vorfall: Frühwarnung in 24 h, Meldung in 72 h, Abschlussbericht in einem Monat', 'gleiche Fristen', 'Kontaktliste, Rufbereitschaft und Meldevorlage im Betriebshandbuch'],
      ['Mitbestimmung', 'Kontrollmaßnahmen, die die Menschenwürde berühren, und Personaldatensysteme brauchen eine Betriebsvereinbarung (ArbVG §§ 96, 96a)', 'Mitbestimmung bei technischen Einrichtungen zur Leistungs- und Verhaltenskontrolle (BetrVG § 87 Abs. 1 Nr. 6)', 'Firewall-Berichte, Web-Filter, TLS-Prüfung und 802.1X-Protokolle vorab mit dem Betriebsrat regeln'],
      ['Datenschutz', 'DSGVO und DSG', 'DSGVO und BDSG', 'Protokolle zweckgebunden, Löschfrist 90 Tage, Zugriff nur Netzwerkteam; Auftragsverarbeitung mit Cloud-Diensten'],
      ['Vertrag', 'Werkvertrag (ABGB §§ 1165 ff.), Übernahme mit Protokoll; Gewährleistung 2 Jahre für bewegliche Sachen (ABGB § 933)', 'Werkvertrag (BGB §§ 631 ff.), Abnahme § 640; Mängelansprüche meist 2 Jahre (§ 634a)', 'Abnahmekriterien messbar im Vertrag; Wartungsvertrag getrennt'],
      ['Elektro und Verkabelung', 'Arbeiten an Starkstrom nur durch befugte Elektrofachkraft; Verkabelung nach ÖVE/ÖNORM EN 50173/50174', 'Elektrofachkraft; DIN EN 50173/50174', 'USV-Anschlüsse und Stromkreise durch Elektrobetrieb, Messprotokolle der Verkabelung verlangen']
    ] },
    { note: 'Für die Fertigung lohnt der Blick in die Normenreihe IEC 62443 (Zonen und Verbindungen in der Industrie-IT) und in die BSI-Bausteine der Schicht IND. Sie werden hier nur als Orientierung genannt, nicht als Zertifizierung.' }
  ],
  src: [['WKO – NIS-Gesetz 2026 (Überblick)', 'https://www.wko.at/oe/internetrecht/cybersicherheit-nis-2-richtlinie'], ['WKO – NIS-2 Übersicht und Betroffenheits-Check', 'https://www.wko.at/it-sicherheit/nis2-uebersicht'], ['BSI – NIS-2-regulierte Unternehmen', 'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/nis-2-regulierte-unternehmen_node.html'], ['BetrVG § 87', 'https://www.gesetze-im-internet.de/betrvg/__87.html']] },

{ id: 'netzplan', ph: 'plan',
  t: ['نقشهٔ شبکه (فیزیکی و منطقی)', 'Netzplan (physisch und logisch)', 'Network diagram (physical and logical)'],
  title: 'Netzplan: logische Struktur, Standorte und Verteiler',
  why: ['در اندازهٔ متوسط از «هستهٔ جمع‌شده» استفاده می‌کنیم: یک هستهٔ دوتایی که هم لایهٔ توزیع است، و سوئیچ‌های دسترسی در هر طبقه با دو اتصال به هسته. منطقه‌های پرخطر (تولید، مهمان، DMZ) gateway خود را روی فایروال دارند.', 'In dieser Größe nutzt man einen Collapsed Core: ein redundanter Core, der zugleich Verteilschicht ist, und Access-Switches je Etage mit zwei Uplinks. Zonen mit höherem Risiko (Fertigung, Gäste, DMZ) haben ihr Gateway auf der Firewall.', 'At this size you use a collapsed core: a redundant core that is also the distribution layer, and access switches per floor with two uplinks. Higher-risk zones (production, guests, DMZ) have their gateway on the firewall.'],
  body: [
    { topo: { w: 820, h: 520, n: [
      ['i1', 'cloud', 260, 40, 'Internet 1', 'Glasfaser 1 Gbit/s'],
      ['i2', 'cloud', 510, 40, 'Internet 2', 'Kabel 500/50'],
      ['fw', 'firewall', 385, 140, 'FW-Cluster', '2× XGS 2300 (HA)'],
      ['dmz', 'server', 660, 140, 'DMZ', 'Reverse-Proxy Portal'],
      ['core', 'l3switch', 385, 255, 'Core-Stack', '2× C1300-24XS'],
      ['srv', 'server', 110, 255, 'Server-Cluster', '2 Hosts, je 2× 10G'],
      ['acc', 'switch', 160, 375, 'Access Büro', '5× 48 PoE+ (EG–2. OG)'],
      ['hal', 'switch', 410, 375, 'Access Halle', 'OT-VLAN 70'],
      ['ap', 'ap', 160, 470, '18 Access Points', 'Wi-Fi 7, PoE+'],
      ['ot', 'pc', 410, 470, 'Maschinensteuerungen', 'Gateway auf FW'],
      ['br', 'firewall', 680, 375, 'Filiale Wels', 'XGS 108 + LTE'],
      ['bsw', 'switch', 680, 470, 'Access Filiale', '1× 48 PoE+, 4 APs']
    ], l: [['i1', 'fw', 'WAN1'], ['i2', 'fw', 'WAN2'], ['fw', 'dmz', 'DMZ'], ['fw', 'core', 'LAG, Transit-VLAN', 'double'], ['core', 'srv', '2× 10G je Host', 'double'], ['core', 'acc', '2× 10G je Switch', 'double'], ['core', 'hal', '2× 10G', 'double'], ['acc', 'ap', 'PoE+'], ['hal', 'ot', 'VLAN 70'], ['fw', 'br', 'IPsec über Internet', 'alt'], ['br', 'bsw', 'Trunk']] } },
    { h: 'Physischer Plan: Standorte und Verteiler' },
    { keep: 1, t: ['Ort', 'Inhalt', 'Anbindung', 'Hinweis'], r: [
      ['Serverraum EG (Rack 1 + 2, je 42 HE)', 'Firewall-Cluster, Core-Stack, Server-Cluster, USV 1 und 2, Patchfelder', 'Glasfaser OM4 zu allen Etagenverteilern', 'Klimatisierung, Brandmelder, Zutritt mit Protokoll'],
      ['Etagenverteiler 1. OG und 2. OG', 'je 1–2 Access-Switches, Patchfelder', '2× OM4 duplex je Switch (je ein Weg zu jedem Core-Member)', 'Trassen getrennt führen, wo möglich'],
      ['Verteiler EG', '2 Access-Switches', 'Kupfer-DAC/OM4 im Serverraum', 'Patchfelder beschriftet nach Raum-Dosen-Schema'],
      ['Fertigungshalle', '1 Access-Switch im Industrieschrank (Staub, Wärme)', '2× OM4 zum Serverraum', 'Schrank abschließbar, Lüfter mit Filter'],
      ['Filiale Wels', 'Firewall, 1 Access-Switch, LTE-Router, Wandverteiler 12 HE, kleine USV', 'Glasfaser 300/100 + LTE', 'Hausanschluss im Keller, Verteiler im Lager']
    ] },
    { h: 'Kernentscheidungen' },
    { keep: 1, t: ['Entscheidung', 'Begründung', 'Bezug'], r: [
      ['Collapsed Core mit 2 gestapelten L3-Switches statt 3 Schichten', 'Für 120 Nutzer und 1 Gebäude ausreichend, weniger Geräte, kurze Wege; Stack bleibt bei Ausfall eines Members aktiv', 'A01, A05'],
      ['Interne Zonen (Clients, Server, Voice, Print) routet der Core, Risikozonen (OT, Gäste, IoT, DMZ, MGMT) die Firewall', 'Leistung für Dateizugriffe, Kontrolle dort, wo Risiko ist; ACLs auf dem Core für Print und Voice', 'A02, A05'],
      ['Firewall-Cluster Aktiv/Passiv', 'Ein Firewall-Ausfall darf Internet, DMZ und Fertigungszugriff nicht unterbrechen', 'A01'],
      ['Zwei Internetleitungen unterschiedlicher Medien und Anbieter', 'Glasfaser und Kabel nutzen keine gemeinsame Trasse; Ersatz bei Bauarbeiten', 'A01'],
      ['Access-Switches einzeln, kalter Ersatz im Lager', 'Ein Switch-Ausfall betrifft nur eine Etage; Stack je Etage wäre teurer als der Nutzen', 'A01'],
      ['Hersteller gemischt (Firewall, Switches, APs)', 'Preis und Verfügbarkeit; dafür drei Verwaltungsoberflächen und mehr Doku – bewusst entschieden', '–']
    ] }
  ] },

{ id: 'ipplan', ph: 'plan',
  t: ['طرح VLAN و IP', 'VLAN- und IP-Plan', 'VLAN and IP plan'],
  title: 'VLAN- und IP-Plan für Zentrale und Filiale (IPv4 und IPv6)',
  why: ['با یک قاعدهٔ ثابت برای همهٔ محل‌ها، هر تکنسین از روی آدرس می‌فهمد دستگاه کجاست: اکتت دوم = محل، اکتت سوم = شمارهٔ VLAN. در کنار هر شبکه بنویس gateway کجاست (هسته یا فایروال)؛ این همان تصمیم امنیتی است.', 'Mit einer festen Regel für alle Standorte erkennt jede Technikerin an der Adresse, wo ein Gerät ist: zweites Oktett = Standort, drittes Oktett = VLAN-Nummer. Zu jedem Netz steht, wo das Gateway liegt (Core oder Firewall) – das ist die Sicherheitsentscheidung.', 'With one fixed rule for all sites, any technician sees from the address where a device is: second octet = site, third octet = VLAN number. Each network notes where its gateway lives (core or firewall) – that is the security decision.'],
  body: [
    { h: 'Zentrale Linz (Standort 20)' },
    { keep: 2, t: ['VLAN', 'Name', 'IPv4-Netz', 'Gateway auf', 'DHCP', 'IPv6-Präfix /64'], r: [
      ['10', 'CLIENTS-LAN', '10.20.10.0/24', 'Core', 'Windows-DHCP (Relay)', '2001:db8:20:10::/64'],
      ['11', 'CLIENTS-WLAN', '10.20.11.0/24', 'Core', 'Windows-DHCP (Relay)', '2001:db8:20:11::/64'],
      ['20', 'SERVER', '10.20.20.0/24', 'Core', 'statisch', '2001:db8:20:20::/64'],
      ['25', 'DMZ', '10.20.25.0/24', 'Firewall', 'statisch', '2001:db8:20:25::/64'],
      ['30', 'VOICE', '10.20.30.0/24', 'Core', 'Windows-DHCP', '2001:db8:20:30::/64'],
      ['40', 'PRINT', '10.20.40.0/24', 'Core (ACL)', 'Reservierungen', '2001:db8:20:40::/64'],
      ['50', 'GUEST', '10.20.50.0/24', 'Firewall', 'Firewall', '–'],
      ['60', 'IOT', '10.20.60.0/24', 'Firewall', 'Firewall', '–'],
      ['70', 'OT', '10.20.70.0/24', 'Firewall', 'statisch', '–'],
      ['90', 'QUARANTAENE', '10.20.90.0/24', 'Firewall', 'Firewall', '–'],
      ['99', 'MGMT', '10.20.99.0/24', 'Firewall', 'statisch', '2001:db8:20:99::/64'],
      ['255', 'TRANSIT Core–FW', '10.20.255.0/29', '–', 'statisch', '2001:db8:20:ff::/64'],
      ['999', 'BLACKHOLE', '–', '–', '–', '–']
    ], cap: 'IPv6-Beispielpräfixe aus dem Dokumentationsbereich 2001:db8::/32. Gast, IoT und OT bewusst nur IPv4, bis Geräte und Regeln IPv6 sicher unterstützen.' },
    { h: 'Filiale Wels (Standort 30)' },
    { keep: 2, t: ['VLAN', 'Name', 'IPv4-Netz', 'Gateway auf', 'DHCP', 'IPv6-Präfix /64'], r: [
      ['10', 'CLIENTS-LAN', '10.30.10.0/24', 'FW Filiale', 'FW Filiale', '2001:db8:30:10::/64'],
      ['11', 'CLIENTS-WLAN', '10.30.11.0/24', 'FW Filiale', 'FW Filiale', '2001:db8:30:11::/64'],
      ['30', 'VOICE', '10.30.30.0/24', 'FW Filiale', 'FW Filiale', '2001:db8:30:30::/64'],
      ['40', 'PRINT', '10.30.40.0/24', 'FW Filiale', 'Reservierungen', '–'],
      ['50', 'GUEST', '10.30.50.0/24', 'FW Filiale', 'FW Filiale', '–'],
      ['99', 'MGMT', '10.30.99.0/24', 'FW Filiale', 'statisch', '–']
    ] },
    { h: 'Dienste und Adresspools' },
    { kv: [
      ['DNS', 'Zwei Domänencontroller (10.20.20.11/.12); interne Zone corp.traunfeld.at; Filiale fragt über den Tunnel'],
      ['DHCP', 'Windows-DHCP mit Failover; Core als DHCP-Relay; Gäste, IoT und Quarantäne über die Firewall'],
      ['NTP', 'Domänencontroller (PDC) synchronisiert mit at.pool.ntp.org; Netzgeräte fragen die DCs'],
      ['VPN-Pools', 'VPN-USER 10.20.200.0/24, VPN-ADMIN 10.20.201.0/24'],
      ['Reserve', 'VLAN 12–19, 80–89 frei; Standort 40–49 für weitere Filialen']
    ] }
  ] },

{ id: 'erreichbarkeit', ph: 'plan',
  t: ['اتصال و دسترسی از بیرون', 'Erreichbarkeit: Internet, Standorte, Fernzugriff', 'Reachability: internet, sites, remote access'],
  title: 'Erreichbarkeit: Internet, Standortvernetzung, Fernzugriff und veröffentlichte Dienste',
  why: ['هر مسیر ورودی یا خروجی یک خطر و یک تصمیم است. اینجا برای هر ارتباط می‌نویسی از کدام مسیر می‌رود، اگر خراب شد مسیر دوم چیست و چه کسی اجازه دارد.', 'Jeder Weg hinein oder hinaus ist ein Risiko und eine Entscheidung. Hier steht für jede Verbindung, welchen Weg sie nimmt, was bei Ausfall der Ersatzweg ist und wer sie nutzen darf.', 'Every path in or out is a risk and a decision. Here you note for each connection which path it takes, what the fallback is and who may use it.'],
  body: [
    { keep: 1, t: ['Verbindung', 'Hauptweg', 'Ersatzweg', 'Zugang und Schutz'], r: [
      ['Zentrale → Internet', 'WAN1 Glasfaser 1 Gbit/s', 'WAN2 Kabel 500/50, automatische Umschaltung (Gateway-Überwachung)', 'Web-Schutz und IPS auf der Firewall'],
      ['Filiale → Zentrale (Server, Telefonie)', 'IPsec-Tunnel (IKEv2) Glasfaser Filiale ↔ WAN1 Zentrale', 'Tunnel über LTE Filiale ↔ WAN2 Zentrale', 'nur interne Netze, Regeln wie im Firmennetz'],
      ['Mitarbeitende unterwegs', 'Remote-Access-VPN (Client) mit MFA', 'zweite öffentliche Adresse (WAN2) im VPN-Profil', 'Pool VPN-USER, gleiche Regeln wie Clients'],
      ['IT-Administration von außen', 'Admin-VPN mit MFA, getrennter Pool', '–', 'nur Pool VPN-ADMIN erreicht MGMT'],
      ['Kunden → Kundenportal', 'HTTPS 443 auf WAN1 → Reverse-Proxy in der DMZ → Portalserver in der DMZ', 'DNS-Eintrag mit kurzer TTL auf WAN2 umstellbar', 'nur 443, Web-Application-Firewall, kein Weg ins LAN'],
      ['Maschinenhersteller → Steuerung', 'Fernwartungs-Gateway in eigener Zone, Sitzung nur nach Freigabe durch Fertigungsleitung', '–', 'zeitlich begrenzt, Aufzeichnung, Zugriff nur auf die eine Maschine'],
      ['Cloud-Dienste (Microsoft 365, Telefonie)', 'direkt über WAN1/WAN2', '–', 'Telefonie priorisiert (siehe Qualität)']
    ] },
    { h: 'Namen und Adressen nach außen' },
    { ul: [
      'Öffentliche DNS-Zone beim Provider: portal.traunfeld.at (A und AAAA), vpn.traunfeld.at; TTL 300 s für schnelles Umstellen.',
      'Intern löst portal.traunfeld.at auf die DMZ-Adresse auf (Split-DNS), damit interne Zugriffe nicht über das Internet laufen.',
      'Keine eingehenden Freigaben außer 443 (Portal) und den VPN-Diensten; Prüfung von außen mit Portscan nach jeder Änderung.'
    ] }
  ] },

{ id: 'sicherheit', ph: 'plan',
  t: ['امنیت: منطقه‌ها، ماتریس، کنترل ورود', 'Sicherheit: Zonen, Matrix, Netzzugangskontrolle', 'Security: zones, matrix, access control'],
  title: 'Sicherheitszonen, Firewall-Matrix, 802.1X und Härtung',
  why: ['امنیت در این اندازه سه لایه دارد: چه کسی وارد شبکه می‌شود (802.1X)، کدام منطقه با کدام حرف می‌زند (ماتریس)، و چه کسی می‌بیند چه اتفاقی افتاد (لاگ و پایش). شبکهٔ تولید مهم‌ترین منطقه است، چون معمولاً قدیمی‌ترین دستگاه‌ها را دارد.', 'Sicherheit hat in dieser Größe drei Schichten: Wer kommt ins Netz (802.1X), welche Zone darf mit welcher sprechen (Matrix), und wer sieht, was passiert ist (Protokoll und Monitoring). Die Fertigung ist die wichtigste Zone, weil dort meist die ältesten Geräte stehen.', 'Security at this size has three layers: who gets into the network (802.1X), which zone may talk to which (matrix), and who sees what happened (logs and monitoring). Production is the key zone because it usually holds the oldest devices.'],
  body: [
    { h: 'Firewall-Matrix (Auszug)' },
    { keep: 1, t: ['Von \\ Nach', 'Internet', 'SERVER', 'DMZ', 'OT', 'MGMT'], r: [
      ['CLIENTS (10/11)', 'Web über Proxy-Regeln, DNS nur zu DCs', 'AD, SMB, ERP-Client, Druckserver', 'Portal 443', '–', '–'],
      ['VPN-USER / Filiale', 'Filiale lokal ins Internet', 'wie Clients', 'Portal 443', '–', '–'],
      ['OT (70)', '–', 'nur Historian-Server, Port laut Hersteller', '–', 'intern', '–'],
      ['Bedien-PCs Fertigung', '–', 'Dateiablage Fertigung (SMB)', '–', 'Engineering-Protokolle zu den Steuerungen', '–'],
      ['Fernwartung Hersteller', 'Gateway baut ausgehend auf', '–', '–', 'nur freigegebene Maschine, nur in der Sitzung', '–'],
      ['DMZ (25)', 'Updates', 'nur Portal-Datenbank, ein Port', 'intern', '–', '–'],
      ['GUEST / IOT', 'Web (Gäste), Hersteller-Cloud (IoT)', '–', '–', '–', '–'],
      ['VPN-ADMIN', 'ja', 'Admin-Dienste', 'Admin-Dienste', 'nur Sprungserver', 'SSH, HTTPS, SNMP']
    ], cap: '„–“ = verboten (Default Deny). Jede Regel mit Zweck, Eigentümer und Prüfdatum; Prüfung halbjährlich.' },
    { h: 'Netzzugangskontrolle (802.1X)' },
    { keep: 1, t: ['Gerät', 'Verfahren', 'Ergebnis'], r: [
      ['Firmen-PCs und Notebooks', 'EAP-TLS mit Computerzertifikat aus der eigenen Zertifizierungsstelle, RADIUS über NPS', 'VLAN 10/11'],
      ['IP-Telefone', 'MAC-Authentifizierung (MAB) mit Geräteliste, Telefon-VLAN per LLDP-MED', 'VLAN 30'],
      ['Drucker', 'MAB mit Geräteliste', 'VLAN 40'],
      ['Unbekanntes Gerät', 'keine gültige Anmeldung', 'VLAN 90 Quarantäne: nur Hinweisseite'],
      ['Maschinen (Halle)', 'Ports fest im VLAN 70, Port-Security (1 MAC), unbenutzte Ports aus', 'VLAN 70']
    ] },
    { note: 'Einführung in zwei Schritten: zuerst Überwachungsmodus (Anmeldungen nur protokollieren), nach zwei Wochen ohne Fehler Durchsetzung. So wird kein Arbeitsplatz plötzlich gesperrt.' },
    { h: 'Härtung und Erkennung' },
    { ul: [
      'Verwaltung aller Netzgeräte nur aus VLAN 99 und VPN-ADMIN, Anmeldung mit persönlichen Konten über RADIUS und MFA.',
      'Firewall: IPS, Web-Schutz, TLS-Prüfung nur für ausgewählte Kategorien und nach Betriebsvereinbarung; Banking und Gesundheit ausgenommen.',
      'Syslog aller Geräte an einen Log-Server, Aufbewahrung 90 Tage; Alarm bei Admin-Anmeldung außerhalb der Arbeitszeit.',
      'Konfigurationen täglich automatisch gesichert und versioniert.',
      'DHCP-Snooping, Dynamic ARP Inspection und BPDU-Guard auf allen Access-Ports.',
      'Orientierung: BSI-Bausteine NET.1.1 (Netzarchitektur), NET.3.2 (Firewall), IND (Industrie) und IEC 62443 für die Fertigung.'
    ] }
  ] },

{ id: 'verfuegbarkeit', ph: 'plan',
  t: ['دسترس‌پذیری و افزونگی', 'Verfügbarkeit und Redundanz', 'Availability and redundancy'],
  title: 'Verfügbarkeitsrechnung, SPOF-Analyse, RTO und RPO',
  why: ['افزونگی پول می‌خواهد، پس باید ثابت کنی کجا لازم است. با حساب نشان بده کدام جزء هدف ۹۹٫۹٪ را خراب می‌کند و کجا یک دستگاه یدکی در انبار کافی است.', 'Redundanz kostet Geld, also musst du zeigen, wo sie nötig ist. Rechne vor, welche Komponente das Ziel 99,9 % verfehlen lässt und wo ein Ersatzgerät im Lager genügt.', 'Redundancy costs money, so you must show where it is needed. Calculate which component breaks the 99.9 % target and where a spare on the shelf is enough.'],
  body: [
    { keep: 1, t: ['Komponente', 'Annahme je Gerät', 'Aufbau', 'Begründung'], r: [
      ['Internet Glasfaser (Geschäftstarif)', '99,9 %', 'parallel mit Kabel 99,5 %', 'PW: Zusage im Geschäftskundenvertrag prüfen'],
      ['Firewall', '99,9 %', '2 Geräte Aktiv/Passiv', 'PW'],
      ['Core-Switch', '99,95 %', '2 Members im Stack', 'PW'],
      ['Access-Switch', '99,95 %', 'einzeln, Ersatz im Lager', 'PW'],
      ['Server-Host', '99,9 %', '2 Hosts im Cluster', 'PW'],
      ['Strom mit USV', '99,99 %', '2 USV an getrennten Stromkreisen, Geräte mit 2 Netzteilen', 'PW']
    ] },
    { h: 'Rechnung' },
    { pre: 'Parallel:  Firewall  1 − 0,001²          = 0,999999\n           Core      1 − 0,0005²         = 0,99999975\n           Internet  1 − 0,001 × 0,005   = 0,999995\n           Strom     1 − 0,0001²         = 0,99999999\n\nArbeitsplatz Zentrale → Internet:\n0,9995 (Access) × 0,99999975 × 0,999999 × 0,999995 × 0,99999999 = 0,99949 → 99,95 %  (≈ 4,4 h Ausfall pro Jahr)\n\nOhne jede Redundanz (1 FW, 1 Core, 1 Leitung, 1 USV):\n0,9995 × 0,9995 × 0,999 × 0,999 × 0,9999 = 0,99690 → 99,69 %  (≈ 27 h pro Jahr)  → Ziel 99,9 % verfehlt\n\nFiliale → Server Zentrale (Filiale: FW 99,9 %, Switch 99,95 %, Glasfaser 99,5 % ∥ LTE 98 %):\n0,9995 × 0,999 × 0,9999 × 0,999995 × 0,999999 × 0,99999975 × 0,999999 (Server) × 0,99999999 × 0,9999 = 0,99829 → 99,83 %' },
    { note: 'Ergebnis: Mit Redundanz erreicht die Zentrale 99,95 % (Ziel 99,9 %), die Filiale 99,83 % (Ziel 99,5 %). Der größte Restfaktor ist der einzelne Access-Switch je Etage – deshalb liegt ein vorkonfigurierter Ersatz im Lager (Tausch in 30 Minuten).' },
    { h: 'SPOF, RTO und RPO' },
    { keep: 1, t: ['Element', 'Auswirkung bei Ausfall', 'Maßnahme', 'RTO'], r: [
      ['Access-Switch einer Etage', 'eine Etage ohne Netz', 'Ersatzswitch im Lager, Konfiguration aus Sicherung', '30 min'],
      ['Glasfaser-Trasse Serverraum → Etage', 'eine Etage ohne Netz', 'zweiter Uplink über getrennte Trasse (wo baulich möglich)', 'sofort'],
      ['Serverraum (Brand, Wasser)', 'Zentrale ohne Server und Netz', 'Datensicherung außer Haus, Notfallplan, Ersatzhardware über Wartungsvertrag', '3 Arbeitstage'],
      ['Firewall-Konfiguration fehlerhaft', 'beide Cluster-Geräte betroffen', 'Änderung nur mit Freigabe, Sicherung vor jeder Änderung, Rückspielen', '1 h']
    ] },
    { p: 'RPO für Netzkonfigurationen: 24 h (tägliche automatische Sicherung). RPO für Server und Daten regelt das Datensicherungskonzept der IT.' }
  ] },

{ id: 'qualitaet', ph: 'plan',
  t: ['کیفیت و کارایی', 'Leistung und Qualität', 'Performance and quality'],
  title: 'Bandbreite, QoS, WLAN-Ausleuchtung und messbare Abnahmekriterien',
  why: ['«شبکه سریع است» معیار نیست. ظرفیت را از روی کاربران و برنامه‌ها حساب کن، برای تلفن اولویت بگذار و معیارهایی بنویس که با ابزار اندازه‌گیری می‌شوند. همین جدول بعداً پروتکل تحویل می‌شود.', '„Das Netz ist schnell“ ist kein Kriterium. Kapazität wird aus Nutzern und Anwendungen berechnet, Telefonie bekommt Vorrang, und die Kriterien sind mit Werkzeugen messbar. Genau diese Tabelle wird später das Abnahmeprotokoll.', '“The network is fast” is not a criterion. Capacity is calculated from users and applications, voice gets priority, and criteria are measurable with tools. This very table later becomes the acceptance protocol.'],
  body: [
    { h: 'Bandbreite Internet (Hauptzeit Zentrale)' },
    { keep: 1, t: ['Verkehr', 'Annahme', 'Bedarf'], r: [
      ['Cloud-Anwendungen und Web', '95 Nutzer × 2 Mbit/s (PW)', '190 Mbit/s'],
      ['Telefonie (Cloud)', '30 gleichzeitige Gespräche × ca. 0,1 Mbit/s je Richtung', '3 Mbit/s'],
      ['Videokonferenzen', '10 gleichzeitig × 4 Mbit/s (PW)', '40 Mbit/s'],
      ['Filiale über Tunnel', '25 Nutzer × 1 Mbit/s (PW)', '25 Mbit/s'],
      ['Summe mit Reserve (Faktor 1,5)', '', 'ca. 390 Mbit/s → Glasfaser 1 Gbit/s ausreichend; WAN2 500/50 trägt Notbetrieb mit Priorisierung']
    ] },
    { h: 'QoS-Klassen (Ende-zu-Ende)' },
    { keep: 1, t: ['Klasse', 'DSCP', 'Behandlung'], r: [
      ['Sprache', 'EF (46)', 'Vorrang, auf WAN max. 20 % reserviert'],
      ['Video', 'AF41 (34)', 'garantierter Anteil 25 %'],
      ['Steuerung Netz', 'CS6 (48)', 'Vorrang'],
      ['Standard', '0', 'Rest'],
      ['Hintergrund (Backups, Updates)', 'CS1 (8)', 'nur freie Kapazität']
    ], cap: 'Vertrauensgrenze: Access-Ports der Telefone übernehmen DSCP, alle anderen Ports setzen auf 0.' },
    { h: 'WLAN' },
    { ul: [
      'Planung mit Grundrissen (Vorabplanung), danach Messung vor Ort; Halle wegen Metall und Maschinen immer mit Messung.',
      'Ziel Büro: ≥ −67 dBm, Signal-Rausch-Abstand ≥ 25 dB; Halle: ≥ −70 dBm an allen Bedienplätzen.',
      'SSIDs: Firma (802.1X, VLAN 11), Gast (Portal, VLAN 50), IoT (WPA3-Personal, VLAN 60) – nicht mehr als drei.',
      'Kanalbreite 5 GHz: 40 MHz in dichten Bereichen, 6 GHz nur für fähige Geräte.'
    ] },
    { h: 'Abnahmekriterien' },
    { keep: 2, t: ['Nr.', 'Kriterium', 'Zielwert', 'Messmethode'], r: [
      ['Q1', 'Durchsatz Etage ↔ Serverraum', '≥ 9 Gbit/s', 'iperf3, 60 s, mehrere Streams'],
      ['Q2', 'Firewall-Ausfall (aktives Gerät ausschalten)', 'Unterbrechung ≤ 10 s, Telefonate laufen weiter', 'Dauerping und Testgespräch'],
      ['Q3', 'Ausfall Core-Member', 'Unterbrechung ≤ 5 s', 'Dauerping von jeder Etage'],
      ['Q4', 'Ausfall WAN1', 'Internet über WAN2 in ≤ 60 s', 'Leitung trennen, Zeit messen'],
      ['Q5', 'Sprachqualität', 'Jitter ≤ 30 ms, Verlust ≤ 1 %, Laufzeit ≤ 150 ms', 'Messung im Telefonie-Portal, 20 Testgespräche'],
      ['Q6', 'WLAN-Ausleuchtung', 'Büro ≥ −67 dBm, Halle ≥ −70 dBm', 'Messung vor Ort, Heatmap'],
      ['Q7', 'Netzzugangskontrolle', 'fremdes Gerät nur in Quarantäne', 'Test-Notebook ohne Zertifikat'],
      ['Q8', 'Monitoring', 'Alarm innerhalb 5 min', 'Uplink-Port abschalten']
    ] }
  ] },

{ id: 'kosten', ph: 'plan', cost: 1,
  t: ['فهرست تجهیزات، هزینه و TCO', 'Stückliste, Kosten und TCO', 'Bill of materials, cost and TCO'],
  title: 'Stückliste, Kosten (3 Varianten) und TCO über 5 Jahre – Preise netto',
  why: ['در پروژهٔ شرکتی قیمت‌ها بدون مالیات (netto) حساب می‌شوند. هزینهٔ پنج‌ساله نشان می‌دهد لایسنس، اینترنت و نگه‌داری از خرید دستگاه بزرگ‌ترند؛ مدیریت باید این را پیش از امضا ببیند.', 'In Firmenprojekten wird netto gerechnet. Die 5-Jahres-Kosten zeigen, dass Lizenzen, Internet und Wartung größer sind als der Gerätekauf – das muss die Geschäftsführung vor der Unterschrift sehen.', 'Company projects are calculated net. The 5-year cost shows that licences, internet and maintenance exceed the hardware purchase – management must see this before signing.'],
  body: [
    { h: 'Variante „Empfohlen“ – Investition (netto)' },
    { keep: 3, t: ['Pos.', 'Geräteklasse (Beispielmodell)', 'Menge', 'Einzelpreis', 'Gesamt', 'Quelle'], r: [
      ['1', 'Firewall Mittelklasse 1 HE (z. B. Sophos XGS 2300), Cluster', '2', '3.019,72 €', '6.039,44 €', 'R: Händler, netto, 11/2026'],
      ['2', 'Schutzlizenzen 12 Monate: Netzwerk- und Web-Schutz für das aktive Gerät', '1', '3.762,95 €', '3.762,95 €', 'R: Händler (1.657,91 € + 2.105,04 €), 11/2026; Bundle oft günstiger'],
      ['3', 'Firewall Filiale (z. B. Sophos XGS 108)', '1', '573,20 €', '573,20 €', 'R: Händler, 11/2026'],
      ['4', 'Schutzlizenz Filiale 12 Monate (Standard Protection)', '1', '266,88 €', '266,88 €', 'R: Händler, 11/2026'],
      ['5', 'Core-Switch L3, 24× 10G SFP+, stapelbar (z. B. Cisco C1300-24XS)', '2', '1.767,48 €', '3.534,96 €', 'R: Preisvergleich 2.103,30 € brutto, 11/2026'],
      ['6', 'Access-Switch 48× PoE+ 740 W, 4× 10G (z. B. Cisco C1300-48FP-4X)', '7', '1.815,54 €', '12.708,78 €', 'R: Händler, netto, 11/2026'],
      ['7', '10G-Module/Kabel (SFP+, kompatibel)', '40', '60,00 €', '2.400,00 €', 'PW'],
      ['8', 'Access Point Wi-Fi 7, PoE+ (z. B. Ubiquiti U7 Pro)', '22', '150,00 €', '3.300,00 €', 'R: siehe Mappe Kleine Firma'],
      ['9', 'USV 3.000 VA Rack (z. B. APC SMT3000RMI2UC)', '2', '1.919,24 €', '3.838,48 €', 'R: Handel 2.283,90 € brutto, 11/2026'],
      ['10', 'Rack 42 HE mit Zubehör', '2', '1.200,00 €', '2.400,00 €', 'PW'],
      ['11', 'LTE/5G-Router Filiale', '1', '400,00 €', '400,00 €', 'PW'],
      ['12', 'Neue Cat-6A-Anschlüsse (APs, Halle) inkl. Messung', '40', '180,00 €', '7.200,00 €', 'PW'],
      ['13', 'Glasfaser-Backbone OM4 je Etage inkl. Messung', '3', '900,00 €', '2.700,00 €', 'PW'],
      ['14', 'Planung, Konfiguration, Migration, Doku, Schulung', '220 h', '95,00 €', '20.900,00 €', 'PW'],
      ['', 'Summe netto', '', '', '70.024,69 €', ''],
      ['', 'zzgl. 20 % USt. (Österreich)', '', '', '14.004,94 €', ''],
      ['', 'Summe brutto', '', '', '84.029,63 €', '']
    ] },
    { note: 'Lizenz im Cluster: Ob das passive Gerät eigene Schutzlizenzen braucht, regelt das Lizenzmodell des Herstellers – im Angebot schriftlich bestätigen lassen. Hier ist nur die Hardware des Zweitgeräts angesetzt. Netzzugangskontrolle (NPS) und Monitoring (Open-Source) verursachen keine Lizenzkosten, nur Arbeitszeit.' },
    { h: 'Varianten im Vergleich' },
    { keep: 1, t: ['Variante', 'Inhalt', 'Investition (netto)', 'Verfügbarkeit Zentrale', 'Risiko'], r: [
      ['Budget', '1 Firewall, 1 Core-Switch, 1 USV, nur Glasfaser', 'ca. 63.300 €', '≈ 99,69 % – Ziel verfehlt', 'hoch'],
      ['Empfohlen', 'wie oben', '70.024,69 €', '≈ 99,95 %', 'gering'],
      ['Premium', 'Enterprise-Switches mit Herstellerwartung, NAC-Appliance, zusätzlicher Access-Stack je Etage', 'ca. 110.000 € (PW)', '≈ 99,99 %', 'sehr gering']
    ] },
    { h: 'TCO über 5 Jahre (Empfohlen, netto)' },
    { keep: 1, t: ['Kostenart', 'Rechnung', 'Betrag'], r: [
      ['Investition', 'siehe oben', '70.024,69 €'],
      ['Schutzlizenzen Jahre 2–5', '4 × (3.762,95 € + 266,88 €)', '16.119,32 €'],
      ['Internet Zentrale WAN1 + WAN2, Filiale + LTE', '60 × (450 + 90 + 120 + 20) € (PW)', '40.800,00 €'],
      ['Wartungsvertrag Systemhaus', '60 × 8 h × 95 € (PW)', '45.600,00 €'],
      ['Strom Netzkomponenten', '1,2 kW × 8.760 h × 5 J. × 0,25 €/kWh (PW)', '13.140,00 €'],
      ['USV-Akkus (1× Tausch)', '2 × 600 € (PW)', '1.200,00 €'],
      ['Summe TCO 5 Jahre', '', '186.884,01 € (≈ 3.115 € pro Monat, ≈ 26 € pro Mitarbeitendem und Monat)']
    ] }
  ],
  src: [['Sophos XGS 2300 – Händlerpreis und Lizenzen (avanet)', 'https://www.avanet.com/en/shop/sophos-xgs-2300/'], ['Sophos XGS 108 – Händlerpreis (avanet)', 'https://www.avanet.com/shop/sophos-firewall/xgs-108/'], ['Cisco C1300-24XS – Preisvergleich', 'https://www.preissuchmaschine.de/preisvergleich/cisco-catalyst-1300-24port-sfp-500000754762.html'], ['Cisco C1300-48FP-4X – Händlerpreis netto', 'https://upfront.e-nitiative.eu/product/details/cisco/communication-%26-networking/c1300-48fp-4x/0918X951?t=b'], ['APC SMT3000RMI2UC – Handelspreis', 'https://www.ebay.de/p/24024706804']] },

{ id: 'migration', ph: 'steu',
  t: ['برنامهٔ انتقال و بازگشت', 'Migrations- und Rollbackplan', 'Migration and rollback plan'],
  title: 'Umstellung in Wellen ohne Produktionsstillstand',
  why: ['شبکهٔ یک کارخانه را نمی‌شود یک‌باره عوض کرد. موج‌به‌موج کار کن، هر موج را جدا آزمون کن و برای هر موج راه بازگشت داشته باش. زمان کار را با تولید هماهنگ کن.', 'Das Netz einer Fabrik wird nicht auf einmal getauscht. Du arbeitest in Wellen, testest jede Welle einzeln und hast für jede Welle einen Rückweg. Zeiten werden mit der Fertigung abgestimmt.', 'A factory network is not replaced in one go. Work in waves, test each wave separately and keep a way back for each wave. Timing is agreed with production.'],
  body: [
    { keep: 1, t: ['Welle', 'Inhalt', 'Zeitfenster', 'Test', 'Rückweg'], r: [
      ['0', 'Bestand aufnehmen, NetBox befüllen, Konfiguration im Testaufbau vorbereiten', 'Woche 1–4', 'Konfiguration im Labor geprüft', '–'],
      ['1', 'Firewall-Cluster und Core parallel zum Altnetz aufbauen, Transit zum Altnetz', 'Samstag Woche 6', 'Internet und Server aus Testclient', 'Default-Route zurück auf alte Firewall'],
      ['2', 'Etagen EG, 1. OG, 2. OG je ein Abend: Switch tauschen, Ports nach Patchliste', 'Woche 7–9, ab 18 Uhr', 'Checkliste je Etage, 10 Arbeitsplätze testen', 'alter Switch bleibt bis zum Folgetag im Schrank'],
      ['3', 'Fertigungshalle: OT-VLAN und Firewall-Regeln', 'Betriebsurlaub oder Wochenende, mit Fertigungsleitung', 'jede Maschine einzeln durch Bediener geprüft', 'Regeln „Lernmodus“ protokollieren, nicht blockieren, bis Freigabe'],
      ['4', 'WLAN tauschen, 802.1X im Überwachungsmodus, nach 2 Wochen Durchsetzung', 'Woche 9–11', 'Anmeldeprotokoll ohne Fehler', 'Port-Profil zurück auf „offen“'],
      ['5', 'Filiale: Firewall, Switch, Tunnel', 'Freitagabend Woche 11', 'Telefonie und Server aus Filiale', 'alte Fernwartungslösung bleibt 2 Wochen bereit'],
      ['6', 'Altgeräte abbauen, Doku abschließen, Abnahme', 'Woche 12–14', 'Abnahmekriterien Q1–Q8', '–']
    ] },
    { note: 'Kommunikation: Jede Welle wird 3 Tage vorher per Mail angekündigt, mit Zeitfenster, Ansprechpartner und dem Satz, was Mitarbeitende am nächsten Morgen tun sollen, falls etwas nicht geht.' }
  ] },

{ id: 'betrieb', ph: 'abs',
  t: ['تحویل و بهره‌برداری', 'Betriebsübergabe', 'Handover to operations'],
  title: 'Betriebsübergabe: Monitoring, Sicherung, Pflege, Meldewege',
  why: ['پروژه تمام می‌شود، شبکه نه. تیم IT باید بداند چه چیزی پایش می‌شود، تنظیمات کجا ذخیره است، هر ماه چه به‌روزرسانی می‌شود و اگر رویداد امنیتی رخ داد چه کسی در ۲۴ ساعت گزارش می‌دهد.', 'Das Projekt endet, das Netz nicht. Das IT-Team muss wissen, was überwacht wird, wo Konfigurationen liegen, was monatlich aktualisiert wird und wer bei einem Sicherheitsvorfall innerhalb von 24 Stunden meldet.', 'The project ends, the network does not. The IT team must know what is monitored, where configurations live, what is updated monthly and who reports a security incident within 24 hours.'],
  body: [
    { keep: 1, t: ['Bereich', 'Regelung', 'Verantwortlich'], r: [
      ['Monitoring', 'Erreichbarkeit, Ports, CPU, Temperatur, PoE-Budget, USV, Tunnel, WAN-Qualität; Alarm per E-Mail und SMS', 'IT-Team, Bereitschaft'],
      ['Konfigurationssicherung', 'täglich automatisch, versioniert, zusätzlich vor jeder Änderung', 'IT-Team'],
      ['Updates', 'Firewall und Switches monatlich im Wartungsfenster (Dienstag 19–21 Uhr), kritische Lücken innerhalb 72 h', 'Systemhaus laut Vertrag'],
      ['Änderungen', 'Änderungsantrag mit Risiko und Rückweg, Freigabe IT-Leitung', 'IT-Leitung'],
      ['Doku', 'NetBox (Geräte, Ports, IP, VLAN), Netzpläne, Firewall-Regelwerk mit Eigentümern', 'IT-Team'],
      ['Lebenszyklus', 'Herstellerpflege je Gerät notiert; Austausch spätestens bei Ende der Sicherheitsupdates', 'IT-Leitung'],
      ['Sicherheitsvorfall', 'Erkennen → Bewerten → bei erheblichem Vorfall Frühwarnung an die Behörde in 24 h, Meldung in 72 h, Abschlussbericht in einem Monat', 'Geschäftsführung, IT-Leitung']
    ] },
    { h: 'Übergabeunterlagen' },
    { ul: ['Netzpläne logisch und physisch, VLAN- und IP-Plan, Patchlisten je Verteiler', 'Firewall-Regelwerk mit Zweck und Eigentümer', 'Messprotokolle Verkabelung, WLAN-Heatmaps, Abnahmeprotokoll Q1–Q8', 'Notfallkarten: Ausfall Firewall, Switch, Internet, Strom', 'Schulungsnachweis IT-Team (2 Termine)'] }
  ] }

  ]
});
})();
