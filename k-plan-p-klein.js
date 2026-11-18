/* Arefi ITPraxis – Projektmappe „Kleine Firma“: Ingenieurbüro Brandt & Partner (fiktiv). Musterdokumente auf Deutsch, Erklärungen fa/de/en. Eigene Inhalte. */
(() => {
'use strict';
const PR = window.ArefiPlanProjects = window.ArefiPlanProjects || [];
PR.push({
  id: 'p-klein', code: 'BP-NET-2027', client: 'Ingenieurbüro Brandt & Partner (fiktives Beispiel)',
  size: ['شرکت کوچک', 'Kleine Firma', 'Small company'],
  title: ['شرکت کوچک: شبکهٔ جدید برای دفتر مهندسی Brandt & Partner با ۱۸ کارمند', 'Kleine Firma: Neues Netzwerk für das Ingenieurbüro Brandt & Partner (18 Mitarbeitende)', 'Small company: new network for the engineering office Brandt & Partner (18 staff)'],
  lead: ['دفتر به ساختمان تازه‌ای با دو طبقه می‌رود. شبکه، WLAN، فایروال، پشتیبان‌گیری و دسترسی دورکاری از صفر طراحی، اجرا و تحویل می‌شود؛ همه طبق مراحل DIN 69901.', 'Das Büro zieht in neue Räume auf zwei Etagen. Netzwerk, WLAN, Firewall, Datensicherung und Home-Office-Zugang werden neu geplant, umgesetzt und abgenommen – vollständig nach den Phasen der DIN 69901.', 'The office moves to new premises on two floors. Network, Wi-Fi, firewall, backup and home-office access are planned, built and handed over from scratch – fully along the DIN 69901 phases.'],
  facts: [
    [['کارفرما', 'Auftraggeber', 'Client'], 'Ingenieurbüro Brandt & Partner, Geschäftsführung: Dipl.-Ing. K. Brandt'],
    [['کاربران و دستگاه‌ها', 'Nutzer und Geräte', 'Users and devices'], '18 Mitarbeitende, 18 PCs/Notebooks, 18 IP-Telefone, 4 MFP, 2 Plotter, NAS, Lizenzserver'],
    [['محل', 'Standort', 'Site'], '1 Standort, 2 Etagen, ca. 420 m², Technikraum im EG'],
    [['هدف دسترس‌پذیری', 'Verfügbarkeitsziel', 'Availability target'], '99,5 % für Internet und Dateidienste'],
    [['بودجه', 'Budget', 'Budget'], '25.000 € netto (Investition), Betrieb separat'],
    [['مدت', 'Dauer', 'Duration'], '31 Arbeitstage, Start Montag KW 2/2027'],
    [['نقش تو', 'Deine Rolle', 'Your role'], 'Projektleitung und Netzwerkplanung beim IT-Dienstleister NordNetz IT (fiktiv)']
  ],
  docs: [

  /* ---------- Phase 1: Initialisierung ---------- */
  { id: 'auftrag', ph: 'init', t: ['دستور پروژه (Projektauftrag)', 'Projektauftrag', 'Project charter'], title: 'Projektauftrag (Projektsteckbrief)',
    why: ['این سند پروژه را رسمی می‌کند: چه کسی سفارش می‌دهد، هدف، محدوده، بودجه، زمان و مسئول. بدون امضای آن کار شروع نکن؛ هر اختلاف بعدی به این سند برمی‌گردد.', 'Der Projektauftrag macht das Vorhaben offiziell: Auftraggeber, Ziel, Umfang, Budget, Termin und Verantwortliche. Ohne unterschriebenen Auftrag nicht starten – jeder spätere Streit führt auf dieses Dokument zurück.', 'The charter makes the project official: sponsor, goal, scope, budget, deadline and owners. Do not start without a signed charter – every later dispute goes back to this document.'],
    body: [
      { kv: [['Projektname', 'Neuaufbau Netzwerk Standort Hafenstraße'], ['Projektnummer', 'BP-NET-2027'], ['Auftraggeber', 'Ingenieurbüro Brandt & Partner, K. Brandt (Geschäftsführung)'], ['Auftragnehmer', 'NordNetz IT GmbH'], ['Projektleitung', 'Projektleitung NordNetz IT (du)'], ['Ansprechperson Kunde', 'S. Wagner (Büroleitung)'], ['Start / Ende', 'KW 2/2027 / spätestens KW 8/2027 (Einzug 15.02.2027)'], ['Budget', '25.000 € netto Investition inkl. 10 % Reserve']] },
      { h: 'Ausgangslage' },
      { p: 'Das Büro zieht im Februar 2027 von der Altstadt in angemietete, unverkabelte Neubauräume. Das alte Netz besteht aus einem Consumer-Router, unverwalteten Switches und einem NAS ohne externe Sicherung. Es gibt keine Netztrennung; Gäste nutzen dasselbe WLAN wie das Personal.' },
      { h: 'Projektziele (SMART)' },
      { ol: ['Bis zum Einzug am 15.02.2027 ist ein strukturiert verkabeltes, segmentiertes Netz (7 VLANs) betriebsbereit.', 'Internet und Dateidienste erreichen im ersten Betriebsjahr eine Verfügbarkeit von mindestens 99,5 %.', 'Gäste und Gebäudetechnik haben nachweislich keinen Zugriff auf interne Systeme (Test im Abnahmeprotokoll).', 'Alle 18 Mitarbeitenden können sich per VPN mit MFA aus dem Home-Office verbinden.', 'Die Investition bleibt unter 25.000 € netto.'] },
      { h: 'Projektumfang' },
      { ul: ['Im Umfang: Netzkonzept, Beschaffung, Vorkonfiguration, Installation von Firewall, Switches, WLAN, USV und NAS-Netzanbindung, Internet-Redundanz, VPN, Tests, Dokumentation, Einweisung.', 'Nicht im Umfang: Elektroinstallation 230 V, Neuanschaffung von PCs, Umzug der Möbel, Telefonie-Vertrag (vorhandene Cloud-Telefonie und IP-Telefone werden weiterverwendet).', 'Schnittstellen: Elektro-Fachbetrieb (Verkabelung), Provider (Glasfaser), Vermieter (Technikraum, Brandschutz).'] },
      { sig: ['Auftraggeber (Datum, Unterschrift)', 'Projektleitung Auftragnehmer (Datum, Unterschrift)'] }
    ] },

  { id: 'stakeholder', ph: 'init', t: ['تحلیل ذی‌نفعان', 'Stakeholderanalyse', 'Stakeholder analysis'], title: 'Stakeholderanalyse',
    why: ['هر کسی که روی پروژه اثر دارد یا از آن اثر می‌گیرد را فهرست می‌کنی: نفوذ، علاقه، انتظار و نحوهٔ ارتباط. پروژه‌های شبکه بیشتر به‌خاطر فراموش کردن آدم‌ها شکست می‌خورند تا به‌خاطر فن.', 'Du erfasst alle, die das Projekt beeinflussen oder davon betroffen sind: Einfluss, Interesse, Erwartung und Kommunikationsweg. Netzwerkprojekte scheitern häufiger an vergessenen Menschen als an Technik.', 'You list everyone who influences or is affected by the project: influence, interest, expectation and communication channel. Network projects fail more often because of forgotten people than because of technology.'],
    body: [
      { keep: 2, t: ['Stakeholder', 'Rolle', 'Einfluss', 'Interesse', 'Erwartung / Befürchtung', 'Maßnahme'], r: [
        ['K. Brandt', 'Geschäftsführung, Auftraggeber', 'hoch', 'hoch', 'Termin halten, Kosten', 'Lenkungsrunde 14-tägig, Entscheidungsvorlagen'],
        ['S. Wagner', 'Büroleitung, Ansprechperson', 'mittel', 'hoch', 'Wenig Störung im Alltag', 'Wöchentlicher Statusbericht, Kanal für Rückfragen'],
        ['Mitarbeitende (18)', 'Nutzer', 'gering', 'mittel', 'Alles funktioniert am ersten Tag', 'Info-Mail vor Umzug, Kurzanleitung VPN/WLAN'],
        ['CAD-Team (5)', 'Schlüsselnutzer', 'mittel', 'hoch', 'Lizenzserver und große Dateien schnell', 'Tests mit echten Projektdaten'],
        ['Elektro-Fachbetrieb', 'Lieferant Verkabelung', 'mittel', 'mittel', 'Klare Dosenpläne', 'Leistungsverzeichnis, Baubesprechung'],
        ['Provider', 'Lieferant Glasfaser', 'hoch', 'gering', 'Termin für Hausanschluss', 'Früh bestellen, Eskalationskontakt'],
        ['Vermieter', 'Gebäude', 'mittel', 'gering', 'Brandschutz, Bohrungen', 'Genehmigung vor Durchbrüchen'],
        ['Datenschutzbeauftragte/r (extern)', 'Beratung', 'mittel', 'mittel', 'DSGVO-konforme Protokollierung', 'Abstimmung Log-Konzept']
      ] },
      { note: 'Regel: Hoher Einfluss + hohes Interesse = eng einbinden; hoher Einfluss + geringes Interesse = zufriedenstellen (z. B. Provider); geringer Einfluss + hohes Interesse = informieren.' }
    ] },

  { id: 'ist', ph: 'init', t: ['برداشت وضعیت فعلی', 'Ist-Aufnahme', 'Current-state survey'], title: 'Ist-Aufnahme',
    why: ['قبل از طراحی باید بدانی چه چیزی وجود دارد: دستگاه‌ها، سرویس‌ها، قراردادها، مشکلات. هر چیزی که اینجا نبینی، روز مهاجرت غافلگیرت می‌کند.', 'Vor der Planung musst du wissen, was existiert: Geräte, Dienste, Verträge, Probleme. Alles, was du hier übersiehst, überrascht dich am Umzugstag.', 'Before planning you must know what exists: devices, services, contracts, problems. Anything you miss here will surprise you on migration day.'],
    body: [
      { keep: 1, t: ['Bereich', 'Ist-Zustand', 'Bewertung'], r: [
        ['Internet', 'VDSL 100/40, dynamische IP, kein Backup', 'zu langsam für CAD-Cloud-Sync, Single Point of Failure'],
        ['Router/Firewall', 'Consumer-Router mit NAT, Firmware 2 Jahre alt', 'keine Segmentierung, keine VPN-MFA'],
        ['Switches', '3 unverwaltete 8-Port-Switches', 'kein VLAN, keine Überwachung'],
        ['WLAN', '1 Router-WLAN, Kennwort seit 2021 unverändert, Gäste im selben Netz', 'Sicherheitsrisiko'],
        ['Server/NAS', 'NAS 2 Schächte, RAID 1, 6 TB belegt von 8 TB, Sicherung auf USB-Platte (unregelmäßig)', 'Kapazität knapp, kein externes Backup'],
        ['Telefonie', 'Cloud-Telefonie, 18 IP-Telefone mit PoE-Netzteilen', 'weiterverwenden, PoE vom Switch'],
        ['Clients', 'Windows 11, Microsoft 365 Business Premium, Intune', 'gut, MFA vorhanden'],
        ['Drucker', '4 MFP, 2 Plotter, feste IPs ohne Doku', 'IP-Plan nötig'],
        ['Dokumentation', 'keine Netzdoku, Kennwörter in Excel', 'Kennwortsafe einführen']
      ] },
      { h: 'Datenbasis für die Planung' },
      { ul: ['Datenvolumen: 6 TB Projektdaten, Wachstum ca. 1,2 TB pro Jahr (Angabe CAD-Team).', 'Spitzenlast: CAD-Dateien bis 2 GB, 5 Personen gleichzeitig.', 'Grundriss Neubau: 2 Etagen je ca. 210 m², Technikraum EG, Kabelkanäle laut Bauplan vorhanden.'] }
    ] },

  /* ---------- Phase 2: Definition ---------- */
  { id: 'lastenheft', ph: 'def', t: ['Lastenheft (خواسته‌های مشتری)', 'Lastenheft', 'Requirements specification (client)'], title: 'Lastenheft (Auszug)',
    why: ['Lastenheft را مشتری می‌نویسد (یا با کمک تو): «چه چیزی» لازم است، نه «چطور». هر خواسته باید قابل‌بررسی باشد تا بعداً در تحویل سنجیده شود.', 'Das Lastenheft beschreibt aus Sicht des Kunden, WAS gebraucht wird – nicht WIE. Jede Anforderung muss prüfbar sein, damit sie bei der Abnahme gemessen werden kann.', 'The client writes the requirements specification (often with your help): WHAT is needed, not HOW. Every requirement must be testable so it can be measured at acceptance.'],
    body: [
      { keep: 1, t: ['Nr.', 'Anforderung', 'Priorität'], r: [
        ['L01', 'Jeder Arbeitsplatz hat 2 kabelgebundene Netzanschlüsse.', 'muss'],
        ['L02', 'WLAN in allen Büros und Besprechungsräumen, auch für Gäste (getrennt).', 'muss'],
        ['L03', 'Internetausfall darf die Arbeit höchstens wenige Minuten unterbrechen.', 'muss'],
        ['L04', 'Gäste und Gebäudetechnik dürfen nicht auf Firmendaten zugreifen.', 'muss'],
        ['L05', 'Zugriff aus dem Home-Office mit sicherer Anmeldung.', 'muss'],
        ['L06', 'Projektdaten täglich gesichert, eine Kopie außer Haus.', 'muss'],
        ['L07', 'Telefonie mit guter Sprachqualität auch bei großen Downloads.', 'muss'],
        ['L08', 'Kurzer Stromausfall darf Netz und NAS nicht beschädigen.', 'muss'],
        ['L09', 'Erweiterbar für 30 Mitarbeitende ohne Neukauf der Kernkomponenten.', 'soll'],
        ['L10', 'Einfache Verwaltung, Wartung durch Dienstleister aus der Ferne.', 'soll'],
        ['L11', 'Investition höchstens 25.000 € netto.', 'muss']
      ] }
    ] },

  { id: 'pflichtenheft', ph: 'def', t: ['Pflichtenheft و معیارهای تحویل', 'Pflichtenheft mit Abnahmekriterien', 'Functional specification with acceptance criteria'], title: 'Pflichtenheft mit messbaren Abnahmekriterien',
    why: ['Pflichtenheft را پیمانکار می‌نویسد: هر خواستهٔ Lastenheft چطور اجرا می‌شود و با چه عدد قابل‌اندازه‌گیری پذیرفته می‌شود. این مهم‌ترین سند برای تحویل حقوقی است.', 'Das Pflichtenheft schreibt der Auftragnehmer: WIE jede Anforderung umgesetzt wird und mit welchem messbaren Kriterium sie abgenommen wird. Es ist das wichtigste Dokument für die rechtliche Abnahme.', 'The contractor writes the functional specification: HOW each requirement is implemented and the measurable criterion for acceptance. It is the key document for legal acceptance.'],
    body: [
      { keep: 1, t: ['Bezug', 'Umsetzung', 'Abnahmekriterium (messbar)'], r: [
        ['L01', '48 Anschlüsse Cat 6A, Klasse EA, sternförmig zum Technikraum, nach DIN EN 50173/50174', '48/48 Permanent-Link-Messungen bestanden, Messprotokoll liegt vor'],
        ['L02', '3 Wi-Fi-7-Access-Points (PoE+), SSIDs „BP-Intern“ (WPA3, Schlüssel nur per Intune-Profil auf Firmengeräten) und „BP-Gast“ (Captive Portal, Client-Isolation)', 'Signal ≥ −67 dBm an allen 24 Messpunkten'],
        ['L03', 'Glasfaser 500/200 Mbit/s plus 5G/LTE-Backup, automatischer Failover in der Firewall', 'Umschaltzeit < 60 s, Test durch Trennen der Glasfaser'],
        ['L04', '7 VLANs, Firewall-Matrix (Dokument D14), Gast/IoT nur Internet', 'Zugriffstest aus VLAN 50/60 auf 10.10.20.10 schlägt fehl'],
        ['L05', 'Remote-Access-VPN mit MFA (bevorzugt Anmeldung über Microsoft Entra ID, sonst TOTP der Firewall)', '3 Testnutzer verbinden sich erfolgreich, ohne MFA keine Verbindung'],
        ['L06', 'NAS-Snapshots stündlich, Sicherung nachts auf zweites Ziel außer Haus (verschlüsselt)', 'Testwiederherstellung einer Datei und eines Ordners erfolgreich'],
        ['L07', 'Voice-VLAN 30, QoS DSCP EF (46) priorisiert', 'Testtelefonat während 400-Mbit/s-Download ohne Aussetzer'],
        ['L08', 'USV 1.500 VA im Rack, NAS fährt bei Akku < 40 % geordnet herunter', 'Netztrennung 10 min ohne Ausfall, Shutdown-Signal getestet'],
        ['L09', '2 × 24-Port-PoE-Switches, 10G-Uplinks, Reserve 30 % Ports und PoE', 'Portbelegung ≤ 70 % bei Abnahme'],
        ['L10', 'Cloud-Verwaltung bzw. Fernzugang nur über VPN aus Admin-Netz', 'Admin-Zugang nur aus VLAN 99/VPN-Admin möglich'],
        ['L11', 'Kostenplan D18', 'Abrechnung ≤ 25.000 € netto zzgl. genehmigter Änderungen']
      ] }
    ] },

  { id: 'risiken', ph: 'def', t: ['امکان‌سنجی و ریسک', 'Machbarkeit und Risikoanalyse', 'Feasibility and risk analysis'], title: 'Machbarkeit und Risikoanalyse',
    why: ['قبل از قول دادن بررسی می‌کنی که پروژه از نظر فنی، زمانی و مالی شدنی است، و ریسک‌ها را با احتمال × اثر نمره می‌دهی. هر ریسک بالا باید اقدام و مسئول داشته باشد.', 'Bevor du zusagst, prüfst du technische, zeitliche und wirtschaftliche Machbarkeit und bewertest Risiken mit Wahrscheinlichkeit × Auswirkung. Jedes hohe Risiko braucht eine Maßnahme und eine verantwortliche Person.', 'Before committing you check technical, schedule and financial feasibility and score risks as probability × impact. Every high risk needs a measure and an owner.'],
    body: [
      { kv: [['Technisch', 'machbar – Standardkomponenten, bekannte Technik'], ['Zeitlich', 'kritisch – Glasfaser-Bereitstellung und Lieferzeiten bestimmen den Termin'], ['Wirtschaftlich', 'machbar – Plan 20.739 € netto bei Budget 25.000 €'], ['Personell', 'machbar – 1 Projektleitung, 1 Techniker, Fachbetrieb für Verkabelung']] },
      { t: ['Nr.', 'Risiko', 'W (1–5)', 'A (1–5)', 'W×A', 'Maßnahme', 'Verantwortlich'], r: [
        ['R1', 'Glasfaseranschluss nicht rechtzeitig', '3', '5', '15', 'Sofort bestellen, LTE/5G als Übergangslösung', 'Projektleitung'],
        ['R2', 'Lieferverzug Hardware', '2', '4', '8', 'Bestellung am Tag der Freigabe, Alternativmodell benannt', 'Einkauf'],
        ['R3', 'Verkabelung fehlerhaft', '2', '4', '8', 'Messprotokoll als Abnahmebedingung', 'Fachbetrieb'],
        ['R4', 'Datenverlust bei Migration NAS', '1', '5', '5', 'Vollsicherung vorher, Prüfsummen', 'Techniker'],
        ['R5', 'Mitarbeitende am Einzugstag ohne Zugang', '2', '3', '6', 'Testlauf mit 3 Pilotnutzern, Kurzanleitung', 'Projektleitung'],
        ['R6', 'Betriebsrat/Datenschutz lehnt Web-Protokollierung ab', '2', '2', '4', 'Log-Konzept vorab abstimmen', 'Projektleitung']
      ] },
      { note: 'Bewertung: W×A ≥ 12 = hoch (sofort handeln), 6–11 = mittel (beobachten, Maßnahme planen), ≤ 5 = gering.' }
    ] },

  { id: 'recht', ph: 'def', t: ['حقوقی و انطباق', 'Recht und Compliance', 'Law and compliance'], title: 'Recht und Compliance',
    why: ['شبکه فقط فن نیست: DSGVO، حقوق شورای کارکنان، NIS-2 و قرارداد کار (Werkvertrag) روی طراحی اثر دارند. این سند آموزشی است و جای مشاورهٔ حقوقی را نمی‌گیرد.', 'Ein Netzwerk ist nicht nur Technik: DSGVO, Betriebsverfassung, NIS-2 und das Vertragsrecht beeinflussen die Planung. Dieses Dokument dient dem Lernen und ersetzt keine Rechtsberatung.', 'A network is not only technology: GDPR, works-council rights, NIS-2 and contract law shape the design. This document is for learning and does not replace legal advice.'],
    body: [
      { keep: 1, t: ['Thema', 'Bewertung für dieses Projekt', 'Folge für die Planung'], r: [
        ['DSGVO', 'Firewall-, VPN- und WLAN-Protokolle enthalten personenbezogene Daten (IP, Benutzername).', 'Zweckbindung, Löschfrist 30 Tage, Zugriff nur Admins, Auftragsverarbeitungsverträge mit Cloud-Diensten (Firewall-Verwaltung, Microsoft 365).'],
        ['BetrVG § 87 Abs. 1 Nr. 6', 'Gilt, wenn ein Betriebsrat besteht: Mitbestimmung bei technischen Einrichtungen, die Verhalten oder Leistung überwachen können.', 'Web-Berichte nur anonymisiert, Regelung vorab abstimmen (hier: kein Betriebsrat, Information aller Mitarbeitenden).'],
        ['NIS-2 / BSIG', '18 Mitarbeitende, Ingenieurdienstleistung: nach erster Einschätzung nicht betroffen.', 'Ergebnis mit der BSI-Betroffenheitsprüfung dokumentieren; BSI-Empfehlungen trotzdem freiwillig nutzen.'],
        ['Vertrag', 'Werkvertrag: geschuldet ist ein funktionierendes Netz (Erfolg).', 'Abnahme nach § 640 BGB mit Protokoll; Vergütung wird bei Abnahme fällig (§ 641 BGB).'],
        ['Elektrosicherheit', 'Arbeiten an 230 V nur durch Elektrofachkraft.', 'USV-Anschluss und Steckdosenkreise im Technikraum durch Elektro-Fachbetrieb.']
      ] }
    ],
    src: [['BetrVG § 87', 'https://www.gesetze-im-internet.de/betrvg/__87.html'], ['BGB § 640', 'https://www.gesetze-im-internet.de/bgb/__640.html'], ['BSI – NIS-2-regulierte Unternehmen', 'https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/nis-2-regulierte-unternehmen_node.html']] },

  /* ---------- Phase 3: Planung ---------- */
  { id: 'handbuch', ph: 'plan', t: ['دفترچهٔ پروژه (Projekthandbuch)', 'Projekthandbuch', 'Project handbook'], title: 'Projekthandbuch',
    why: ['Projekthandbuch قواعد بازی پروژه است: چه کسی چه تصمیمی می‌گیرد، چطور گزارش می‌دهیم، تغییرها چطور تأیید می‌شوند و سندها کجا هستند. در پروژهٔ کوچک چند صفحه کافی است.', 'Das Projekthandbuch legt die Spielregeln fest: wer entscheidet was, wie berichtet wird, wie Änderungen genehmigt werden und wo Dokumente liegen. In kleinen Projekten genügen wenige Seiten.', 'The project handbook sets the rules: who decides what, how reporting works, how changes are approved and where documents live. A few pages are enough for a small project.'],
    body: [
      { h: '1 Organisation (RACI)' },
      { keep: 1, t: ['Aufgabe', 'Geschäftsführung', 'Büroleitung', 'Projektleitung', 'Techniker', 'Fachbetrieb'], r: [
        ['Projektauftrag freigeben', 'A', 'C', 'R', 'I', '–'],
        ['Netzkonzept erstellen', 'I', 'C', 'A', 'R', '–'],
        ['Verkabelung ausführen', '–', 'I', 'A', 'C', 'R'],
        ['Konfiguration und Tests', '–', 'I', 'A', 'R', '–'],
        ['Änderungen genehmigen', 'A', 'C', 'R', 'I', 'I'],
        ['Abnahme', 'A', 'R', 'R', 'C', 'C']
      ], cap: 'R = durchführend, A = verantwortlich/entscheidet, C = konsultiert, I = informiert' },
      { h: '2 Kommunikation' },
      { ul: ['Kick-off: KW 2, Montag, 60 min, alle Beteiligten.', 'Statusbericht: wöchentlich freitags per E-Mail (Vorlage D23).', 'Lenkungsrunde: 14-tägig, 30 min, Geschäftsführung + Projektleitung.', 'Eskalation: Projektleitung → Geschäftsführung Auftragnehmer → Geschäftsführung Kunde, jeweils innerhalb von 24 h.'] },
      { h: '3 Änderungsverfahren' },
      { ol: ['Änderungswunsch schriftlich (Vorlage D24).', 'Projektleitung bewertet Kosten, Termin, Risiko in max. 2 Arbeitstagen.', 'Geschäftsführung Kunde genehmigt oder lehnt ab.', 'Erst nach Genehmigung umsetzen; Nachtrag im Kostenplan.'] },
      { h: '4 Qualität, Ablage, Werkzeuge' },
      { ul: ['Abnahmekriterien siehe Pflichtenheft D05, Testplan D22.', 'Ablage: Projektordner im Teams-Kanal „BP-NET-2027“, Versionierung im Dateinamen (v1.0, v1.1).', 'Zugangsdaten nur im Kennwortsafe, niemals in E-Mails.', 'Werkzeuge: draw.io (Pläne), GanttProject (Termine), Messgerät des Fachbetriebs.'] }
    ] },

  { id: 'psp', ph: 'plan', t: ['ساختار شکست کار (PSP)', 'Projektstrukturplan', 'Work breakdown structure'], title: 'Projektstrukturplan (PSP, phasenorientiert)',
    why: ['PSP کل کار را به بسته‌های کاری کوچک و قابل‌مسئولیت می‌شکند. هر چیزی که در PSP نیست، در زمان‌بندی و بودجه هم نیست.', 'Der PSP zerlegt die gesamte Arbeit in kleine, verantwortbare Arbeitspakete. Was nicht im PSP steht, fehlt später auch in Terminplan und Budget.', 'The WBS breaks all work into small work packages with an owner. What is not in the WBS is also missing from schedule and budget.'],
    body: [
      { keep: 2, t: ['PSP-Code', 'Teilaufgabe / Arbeitspaket', 'Aufwand (h)', 'Verantwortlich'], r: [
        ['1', 'Projektmanagement', '10', 'Projektleitung'],
        ['2.1', 'Ist-Aufnahme', '4', 'Techniker'],
        ['2.2', 'Anforderungen, Lastenheft-Workshop', '4', 'Projektleitung'],
        ['2.3', 'Netzkonzept, VLAN/IP-Plan, Firewall-Matrix', '10', 'Projektleitung'],
        ['2.4', 'Pflichtenheft', '4', 'Projektleitung'],
        ['3.1', 'Angebote einholen, Nutzwertanalyse', '3', 'Projektleitung'],
        ['3.2', 'Bestellung, Wareneingang', '2', 'Techniker'],
        ['4.1', 'Verkabelung (Fachbetrieb, extern)', '–', 'Fachbetrieb'],
        ['4.2', 'Technikraum, Rack, USV', '4', 'Techniker'],
        ['4.3', 'Glasfaser-Bereitstellung (Provider, extern)', '–', 'Provider'],
        ['5.1', 'Vorkonfiguration im Labor', '8', 'Techniker'],
        ['5.2', 'Installation vor Ort', '6', 'Techniker'],
        ['5.3', 'Migration NAS, Umschaltung', '6', 'Techniker'],
        ['6', 'Tests und Abnahme', '5', 'Projektleitung'],
        ['7', 'Dokumentation, Übergabe, Einweisung', '8', 'Projektleitung']
      ], cap: 'Summe interner Aufwand: 74 h (davon 64 h abrechenbar, 10 h Projektmanagement im Festpreis)' }
    ] },

  { id: 'netzplan', ph: 'plan', t: ['شبکهٔ زمان‌بندی و مسیر بحرانی', 'Netzplantechnik (kritischer Pfad)', 'Network diagram and critical path'], title: 'Netzplantechnik: Vorgangsliste, Zeiten und kritischer Pfad',
    why: ['اینجا «Netzplan» یعنی نمودار زمان‌بندی، نه نقشهٔ شبکه. با FAZ/FEZ (زودترین آغاز/پایان) و SAZ/SEZ (دیرترین) پیدا می‌کنی کدام کارها بی‌ذخیره‌اند؛ هر روز تأخیر در آن‌ها کل پروژه را عقب می‌اندازد. این موضوع در آزمون IHK زیاد می‌آید.', 'Hier bedeutet „Netzplan“ den Ablaufplan, nicht den Netzwerkplan. Mit FAZ/FEZ (frühester Anfang/Ende) und SAZ/SEZ (spätester) findest du die Vorgänge ohne Puffer: Jeder Tag Verzug dort verschiebt das ganze Projekt. Das Thema kommt in der IHK-Prüfung häufig.', 'Here “Netzplan” means the schedule network, not the network diagram. With earliest/latest start and finish you find activities without float: every day of delay there delays the whole project. This is a frequent IHK exam topic.'],
    body: [
      { keep: 4, t: ['Vorgang', 'Bezeichnung', 'Dauer (AT)', 'Vorgänger', 'FAZ', 'FEZ', 'SAZ', 'SEZ', 'GP', 'FP'], r: [
        ['A', 'Ist-Aufnahme und Anforderungen', '3', '–', '0', '3', '0', '3', '0', '0'],
        ['B', 'Netzkonzept und Pflichtenheft', '4', 'A', '3', '7', '3', '7', '0', '0'],
        ['C', 'Angebote und Bestellung', '2', 'B', '7', '9', '7', '9', '0', '0'],
        ['D', 'Lieferzeit Hardware', '10', 'C', '9', '19', '9', '19', '0', '0'],
        ['E', 'Verkabelung (Fachbetrieb)', '8', 'B', '7', '15', '14', '22', '7', '7'],
        ['F', 'Glasfaser-Bereitstellung (Provider)', '15', 'A', '3', '18', '9', '24', '6', '6'],
        ['G', 'Vorkonfiguration im Labor', '3', 'D', '19', '22', '19', '22', '0', '0'],
        ['H', 'Installation Technikraum und Rack', '2', 'E, G', '22', '24', '22', '24', '0', '0'],
        ['I', 'Inbetriebnahme Internet und Firewall', '1', 'F, H', '24', '25', '24', '25', '0', '0'],
        ['J', 'Umschaltung und Umzug', '2', 'I', '25', '27', '25', '27', '0', '0'],
        ['K', 'Tests und Abnahme', '2', 'J', '27', '29', '27', '29', '0', '0'],
        ['L', 'Dokumentation und Übergabe', '2', 'K', '29', '31', '29', '31', '0', '0']
      ], cap: 'AT = Arbeitstage, Zählung ab 0. GP = Gesamtpuffer (SAZ − FAZ), FP = freier Puffer (FAZ Nachfolger − FEZ).' },
      { h: 'Rechenweg' },
      { ul: ['Vorwärtsrechnung: FAZ = größtes FEZ aller Vorgänger, FEZ = FAZ + Dauer. Beispiel H: max(FEZ E = 15, FEZ G = 22) = 22.', 'Rückwärtsrechnung: SEZ = kleinstes SAZ aller Nachfolger, SAZ = SEZ − Dauer. Beispiel B: min(SAZ C = 7, SAZ E = 14) = 7.', 'Kritischer Pfad (GP = 0): A → B → C → D → G → H → I → J → K → L = 31 AT.', 'Erkenntnis: Die Hardware-Lieferzeit liegt auf dem kritischen Pfad. Die Glasfaser hat nur 6 AT Puffer – bei üblichen Provider-Verzögerungen das größte Terminrisiko (R1).'] }
    ] },

  { id: 'termine', ph: 'plan', t: ['زمان‌بندی و نقطه‌های عطف', 'Termin- und Meilensteinplan', 'Schedule and milestones'], title: 'Termin- und Meilensteinplan',
    why: ['زمان‌بندی نتیجهٔ Netzplan را روی تقویم می‌برد و نقطه‌های عطف (Meilensteine) را مشخص می‌کند؛ هر Meilenstein یک تصمیم یا نتیجهٔ قابل‌بررسی است، نه فقط یک تاریخ.', 'Der Terminplan überträgt den Netzplan auf den Kalender und legt Meilensteine fest. Jeder Meilenstein ist ein prüfbares Ergebnis oder eine Entscheidung, nicht nur ein Datum.', 'The schedule maps the network diagram onto the calendar and sets milestones. Each milestone is a verifiable result or decision, not just a date.'],
    body: [
      { keep: 1, t: ['Woche', 'Vorgänge', 'Meilenstein'], r: [
        ['KW 2', 'A Ist-Aufnahme, Kick-off, Glasfaser bestellt (F startet)', '–'],
        ['KW 3', 'B Netzkonzept, Pflichtenheft; C Angebote', 'M1: Pflichtenheft freigegeben (AT 7); M2: Bestellung (AT 9)'],
        ['KW 4', 'D Lieferzeit; E Verkabelung beginnt', '–'],
        ['KW 5', 'D Lieferzeit; E Verkabelung, Messung', 'Verkabelung gemessen (AT 15)'],
        ['KW 6', 'G Vorkonfiguration; F Glasfaser bereit (spätestens AT 24)', 'M3: Hardware vorkonfiguriert (AT 22)'],
        ['KW 7', 'H Installation, I Inbetriebnahme, J Umschaltung (Wochenende 13./14.02.)', 'M4: Go-live (AT 27)'],
        ['KW 8', 'K Tests und Abnahme, L Übergabe', 'M5: Abnahme (AT 29); M6: Projektabschluss (AT 31)']
      ] },
      { note: 'Kalenderhinweis: Die Umschaltung J liegt bewusst am Wochenende vor dem Einzug; die zwei Einsatztage zählen im Netzplan als 2 AT.' }
    ] },

  { id: 'konzept', ph: 'plan', t: ['طرح شبکه و توپولوژی', 'Netzwerkkonzept und Topologie', 'Network concept and topology'], title: 'Netzwerkkonzept und logischer Netzplan',
    why: ['این همان «نقشهٔ شبکه» است: اجزای اصلی، اتصال‌ها و تصمیم‌های کلیدی با دلیل. هر تصمیم باید به یک خواستهٔ Lastenheft برگردد.', 'Das ist der eigentliche Netzwerkplan: Hauptkomponenten, Verbindungen und Kernentscheidungen mit Begründung. Jede Entscheidung muss sich auf eine Anforderung im Lastenheft zurückführen lassen.', 'This is the actual network plan: main components, links and key decisions with reasons. Every decision must trace back to a requirement.'],
    body: [
      { topo: { w: 760, h: 445, n: [
        ['inet', 'cloud', 330, 45, 'Internet', 'Glasfaser 500/200'], ['lte', 'router', 590, 45, 'LTE/5G-Router', 'Backup WAN2'],
        ['fw', 'firewall', 380, 150, 'FW01', 'UTM-Firewall'],
        ['sw1', 'switch', 230, 260, 'SW01 (EG)', '24x PoE+, 10G'], ['sw2', 'switch', 540, 260, 'SW02 (OG)', '24x PoE+, 10G'],
        ['nas', 'server', 70, 260, 'NAS01', 'VLAN 20'],
        ['ap1', 'ap', 110, 380, 'AP01/AP02', 'EG'], ['pc', 'pc', 300, 380, 'Arbeitsplätze', 'VLAN 10 + 30'],
        ['ap3', 'ap', 470, 380, 'AP03', 'OG'], ['pr', 'pc', 650, 380, 'MFP/Plotter', 'VLAN 40']
      ], l: [
        ['inet', 'fw', 'WAN1', ''], ['lte', 'fw', 'WAN2', 'alt'], ['fw', 'sw1', 'Trunk', ''], ['sw1', 'sw2', '2x10G LAG', 'double'],
        ['sw1', 'nas', '', ''], ['sw1', 'ap1', '', ''], ['sw1', 'pc', '', ''], ['sw2', 'ap3', '', ''], ['sw2', 'pr', '', '']
      ] } },
      { h: 'Kernentscheidungen' },
      { t: ['Entscheidung', 'Begründung', 'Bezug'], r: [
        ['Collapsed Core: Firewall routet zwischen VLANs', 'Für 18 Nutzer ausreichend, eine zentrale Regelstelle, keine Layer-3-Switches nötig', 'L04, L10'],
        ['2 Switches (SW01 zentral im EG, SW02 im OG über 2×10G-LAG) statt eines 48-Port-Switches', 'Kurze Kabelwege je Etage; Ausfall von SW02 betrifft nur das OG. SW01 bleibt zentraler Punkt – deshalb liegt ein vorkonfigurierter Ersatzswitch im Lager', 'L03, L09'],
        ['Internet-Redundanz über LTE/5G statt zweiter Festnetzleitung', 'Günstig, anderes Übertragungsmedium (keine gemeinsame Baustelle)', 'L03, L11'],
        ['WLAN „BP-Intern“ mit WPA3-Personal (SAE), Schlüssel nur über Intune-Profil verteilt und halbjährlich gewechselt', 'Kein eigener RADIUS-Server nötig, Mitarbeitende kennen den Schlüssel nicht. Ab ca. 30 Personen Wechsel auf WPA3-Enterprise (EAP-TLS) einplanen', 'L02, L04, L11'],
        ['Management-VLAN 99, Verwaltung nur über VPN-Admin', 'Angriffsfläche klein, BSI NET.1.2', 'L10']
      ] }
    ] },

  { id: 'ipplan', ph: 'plan', t: ['طرح VLAN و IP', 'VLAN- und IP-Plan', 'VLAN and IP plan'], title: 'VLAN- und IP-Plan (IPv4 und IPv6) mit DHCP, DNS und NTP',
    why: ['هر VLAN یک هدف، یک زیرشبکهٔ IPv4 و یک /64 در IPv6 دارد. با قاعدهٔ منظم (شمارهٔ VLAN = اکتت سوم) پیدا کردن خطا سریع‌تر است. IPv6 را از اول برنامه‌ریزی کن، نه بعداً.', 'Jedes VLAN hat einen Zweck, ein IPv4-Subnetz und ein IPv6-/64. Mit einer festen Regel (VLAN-Nummer = drittes Oktett) geht die Fehlersuche schneller. IPv6 von Anfang an planen, nicht nachträglich.', 'Each VLAN has a purpose, an IPv4 subnet and an IPv6 /64. A fixed rule (VLAN number = third octet) speeds up troubleshooting. Plan IPv6 from the start, not later.'],
    body: [
      { keep: 2, t: ['VLAN', 'Name', 'IPv4-Netz', 'Gateway', 'DHCP-Bereich', 'IPv6-Präfix (/64)', 'Hinweis'], r: [
        ['10', 'CLIENTS', '10.10.10.0/24', '10.10.10.1', '.100–.199', '2001:db8:4a1c:3610::/64', 'PCs, Notebooks (SLAAC)'],
        ['20', 'SERVER', '10.10.20.0/24', '10.10.20.1', 'statisch', '2001:db8:4a1c:3620::/64', 'NAS01 .10, LIC01 .11'],
        ['30', 'VOICE', '10.10.30.0/24', '10.10.30.1', '.100–.199', '2001:db8:4a1c:3630::/64', 'IP-Telefone, QoS EF'],
        ['40', 'PRINT', '10.10.40.0/24', '10.10.40.1', 'Reservierungen', '2001:db8:4a1c:3640::/64', 'MFP .11–.14, Plotter .21–.22'],
        ['50', 'GUEST', '10.10.50.0/24', '10.10.50.1', '.20–.250', '2001:db8:4a1c:3650::/64', 'nur Internet, Client-Isolation'],
        ['60', 'IOT', '10.10.60.0/24', '10.10.60.1', '.100–.199', '2001:db8:4a1c:3660::/64', 'Zutritt, Klima, Beamer'],
        ['99', 'MGMT', '10.10.99.0/24', '10.10.99.1', 'statisch', '2001:db8:4a1c:3699::/64', 'SW01 .2, SW02 .3, USV .5, AP .21–.23']
      ], cap: 'IPv6: Beispielpräfix aus dem Dokumentationsbereich 2001:db8::/32; real vergibt der Provider ein /56, daraus ein /64 je VLAN (VLAN-Nummer im 4. Block).' },
      { h: 'Dienste' },
      { kv: [['DHCP', 'Firewall je VLAN; Lease 8 h Clients, 1 h Gäste; Reservierungen für Drucker'], ['DNS', 'Firewall als Resolver; interne Zone intern.brandt-partner.de (Subdomain der eigenen Domain, nicht .local)'], ['NTP', 'Firewall synchronisiert mit ptbtime1.ptb.de und ptbtime2.ptb.de, verteilt Zeit an alle VLANs'], ['IPv6', 'Router Advertisements je VLAN, SLAAC, Firewall filtert IPv6 genauso wie IPv4'], ['Reserve', 'VLAN 70–89 frei für Erweiterungen (z. B. Kameras, Labor)']] }
    ] },

  { id: 'sicherheit', ph: 'plan', t: ['منطقه‌های امنیتی و ماتریس فایروال', 'Sicherheitszonen und Firewall-Matrix', 'Security zones and firewall matrix'], title: 'Sicherheitszonen und Firewall-Matrix',
    why: ['ماتریس فایروال روشن می‌کند چه کسی با چه کسی و با کدام پورت حق ارتباط دارد. پیش‌فرض «ممنوع» است؛ هر اجازه باید دلیل و مالک داشته باشد. این‌ها اصول بخش‌های NET.1.1 و NET.3.2 در IT-Grundschutz هم هست.', 'Die Firewall-Matrix klärt, wer mit wem über welche Dienste sprechen darf. Standard ist „verboten“; jede Freigabe braucht Begründung und Eigentümer. Das entspricht den Grundsätzen der Grundschutz-Bausteine NET.1.1 und NET.3.2.', 'The firewall matrix states who may talk to whom on which services. The default is “deny”; every permission needs a reason and an owner, in line with IT-Grundschutz NET.1.1 and NET.3.2.'],
    body: [
      { keep: 1, t: ['Von \\ Nach', 'Internet', 'SERVER (20)', 'PRINT (40)', 'VOICE (30)', 'MGMT (99)'], r: [
        ['CLIENTS (10)', 'HTTP/S, DNS über FW', 'SMB 445, Lizenz 27000–27009', 'IPP 631, 9100', '–', '–'],
        ['VPN-Nutzer', 'über Firmenleitung (Full Tunnel)', 'SMB 445, Lizenz', 'IPP 631', '–', '–'],
        ['VPN-Admin', 'ja', 'alle Admin-Dienste', 'HTTPS', 'HTTPS', 'SSH, HTTPS'],
        ['VOICE (30)', 'SIP-TLS 5061, RTP laut Anbieter', '–', '–', 'intern', '–'],
        ['GUEST (50)', 'HTTP/S, DNS', '–', '–', '–', '–'],
        ['IOT (60)', 'nur Hersteller-Cloud (FQDN-Liste)', '–', '–', '–', '–'],
        ['SERVER (20)', 'Updates, Offsite-Backup HTTPS', '–', 'SMTP-Scan-Ablage', '–', '–']
      ], cap: '„–“ = verboten (Default Deny). Alle Regeln mit Name, Zweck, Eigentümer und Prüfdatum in der Firewall dokumentiert.' },
      { h: 'Weitere Härtung' },
      { ul: ['Admin-Oberflächen nur aus MGMT/VPN-Admin, nie aus dem Internet.', 'Firmware-Updates monatlich im Wartungsfenster, Konfigurationssicherung wöchentlich verschlüsselt.', 'IPS und Web-Schutz für CLIENTS und GUEST aktiv; Berichte nur anonymisiert (siehe D07).', 'Unbenutzte Switchports deaktiviert und im VLAN 999 (Blackhole).'] }
    ],
    src: [['BSI – IT-Grundschutz-Kompendium', 'https://www.bsi.bund.de/gs-kompendium']] },

  { id: 'verfuegbarkeit', ph: 'plan', t: ['دسترس‌پذیری و افزونگی', 'Verfügbarkeit und Redundanz', 'Availability and redundancy'], title: 'Verfügbarkeitsberechnung und Single Points of Failure',
    why: ['با حساب نشان می‌دهی که طرح به هدف ۹۹٫۵٪ می‌رسد. اجزای پشت سر هم ضرب می‌شوند؛ اجزای موازی با فرمول ۱ − (۱ − A۱)(۱ − A۲). عددهای فرضی را همیشه علامت بزن.', 'Du weist rechnerisch nach, dass die Lösung das Ziel von 99,5 % erreicht. Komponenten in Reihe werden multipliziert, parallele mit 1 − (1 − A1)(1 − A2). Angenommene Werte immer kennzeichnen.', 'You prove by calculation that the design meets the 99.5 % target. Components in series are multiplied; parallel ones use 1 − (1 − A1)(1 − A2). Always label assumed values.'],
    body: [
      { keep: 1, t: ['Komponente', 'Annahme Verfügbarkeit', 'Begründung der Annahme'], r: [
        ['Glasfaser', '99,5 %', 'PW: übliche Zusage im Geschäftskundentarif, im Vertrag prüfen'],
        ['LTE/5G', '98,0 %', 'PW: ohne Zusage, Funkversorgung vor Ort gemessen'],
        ['Firewall', '99,9 %', 'PW: Einzelgerät, Ersatz innerhalb eines Werktags'],
        ['Switch', '99,95 %', 'PW: lüfterlos, aber Einzelgerät je Etage'],
        ['Strom mit USV', '99,99 %', 'PW: USV überbrückt kurze Ausfälle']
      ] },
      { h: 'Rechnung (Pfad Arbeitsplatz → Internet)' },
      { pre: 'Internet parallel:  1 − (1 − 0,995) × (1 − 0,98) = 1 − 0,005 × 0,02 = 0,9999\nGesamt mit Backup:  0,9999 × 0,999 × 0,9995 × 0,9999 = 0,99830  → 99,83 %\nGesamt ohne Backup: 0,9999 × 0,999 × 0,9995 × 0,995  = 0,99341  → 99,34 %\nArbeitsplatz im OG (zusätzlich SW02): 0,99830 × 0,9995 = 0,99780 → 99,78 %\n\nAusfallzeit pro Jahr (8.760 h):\nmit Backup:  (1 − 0,99830) × 8.760 h ≈ 14,9 h\nohne Backup: (1 − 0,99341) × 8.760 h ≈ 57,7 h' },
      { note: 'Ergebnis: Ohne LTE/5G-Backup wird das Ziel 99,5 % verfehlt (99,34 %). Mit Backup liegt die Lösung bei 99,83 % – die Investition in den Backup-Router ist damit fachlich begründet.' },
      { h: 'Single Points of Failure und Gegenmaßnahmen' },
      { keep: 1, t: ['SPOF', 'Auswirkung', 'Gegenmaßnahme'], r: [
        ['Firewall', 'Gesamtes Netz ohne Internet und Routing', 'Konfigurationssicherung, Herstelleraustausch am nächsten Werktag, dokumentierte Wiederherstellung (RTO 4 h)'],
        ['SW01 (EG, zentral)', 'Gesamtes Netz ohne Verbindung, weil Firewall, NAS und SW02 an SW01 hängen', 'Vorkonfigurierter Ersatzswitch im Lager, Konfiguration aus Sicherung (RTO 2 h)'],
        ['NAS', 'Keine Projektdaten', 'Snapshots, nächtliche Offsite-Sicherung, Wiederherstellung getestet (RPO 24 h, RTO 8 h)']
      ] }
    ] },

  { id: 'physik', ph: 'plan', t: ['کابل‌کشی، اتاق فنی، PoE و UPS', 'Verkabelung, Technikraum, PoE und USV', 'Cabling, equipment room, PoE and UPS'], title: 'Physische Infrastruktur: Verkabelung, Technikraum, PoE-Budget, USV',
    why: ['لایهٔ فیزیکی پایهٔ همه‌چیز است: کابل‌کشی طبق DIN EN 50173/50174، رک، برق، خنک‌سازی و حفاظت در برابر آتش. بودجهٔ PoE و ظرفیت UPS را حساب کن، حدس نزن.', 'Die physische Ebene trägt alles: Verkabelung nach DIN EN 50173/50174, Rack, Strom, Kühlung, Brandschutz. PoE-Budget und USV-Leistung werden gerechnet, nicht geschätzt.', 'The physical layer carries everything: cabling per DIN EN 50173/50174, rack, power, cooling, fire protection. PoE budget and UPS capacity are calculated, not guessed.'],
    body: [
      { h: 'Verkabelung' },
      { ul: ['48 Anschlüsse Cat 6A (Klasse EA), max. 90 m Permanent Link, sternförmig zum 24-HE-Schrank im Technikraum.', 'Beschriftung: Etage-Raum-Dose-Port (z. B. 1-104-02-A) identisch an Dose und Patchfeld.', 'Abnahme mit Messprotokoll je Link durch den Fachbetrieb (Pflicht laut Pflichtenheft).', 'Brandschutz: Durchführungen durch Brandabschnitte nur mit zugelassener Abschottung (Vermieter/Fachbetrieb).'] },
      { h: 'PoE-Budget (je Switch 370 W)' },
      { keep: 2, t: ['Switch', 'Verbraucher', 'Planleistung', 'Summe', 'Reserve'], r: [
        ['SW01 (EG)', '10 Telefone à 7 W + 2 APs à 25 W', '70 W + 50 W', '120 W', '250 W (68 %)'],
        ['SW02 (OG)', '8 Telefone à 7 W + 1 AP à 25 W', '56 W + 25 W', '81 W', '289 W (78 %)']
      ], cap: 'PW: Planwerte; vor Bestellung mit den PoE-Klassen in den Datenblättern abgleichen.' },
      { h: 'USV-Auslegung' },
      { keep: 1, t: ['Gerät', 'Leistung (PW)'], r: [['Firewall', '20 W'], ['2 Switches inkl. PoE-Last', '2 × 30 W + 201 W = 261 W'], ['NAS', '45 W'], ['LTE/5G-Router', '10 W'], ['Lizenzserver (Mini-PC)', '35 W'], ['Summe', 'ca. 371 W']] },
      { p: 'Gewählt: Line-Interactive-USV 1.500 VA / 1.000 W im Rack. Bei 371 W liegt die Last bei rund 37 %; laut Herstellerangaben hält dieses Modell bei halber Last etwa 25 Minuten, bei geringerer Last entsprechend länger. Ziel: 15 Minuten Überbrückung, danach geordnetes Herunterfahren des NAS über Netzwerk-Signal.' },
      { h: 'Technikraum' },
      { ul: ['Eigener abschließbarer Raum, Zutritt nur IT und Geschäftsführung (Schlüsselliste).', 'Wärmelast ca. 0,4 kW: Abluft ausreichend, Temperaturfühler mit Alarm per E-Mail über USV-Netzwerkkarte.', 'Eigener Stromkreis mit Fehlerstromschutz durch Elektro-Fachbetrieb.'] }
    ],
    src: [['BSI – IT-Grundschutz-Kompendium (Baustein INF.12 Verkabelung)', 'https://www.bsi.bund.de/gs-kompendium'], ['APC SMT1500RMI2UC – Laufzeit bei halber Last (happyware)', 'https://happyware.com/uk-en/apc-smt1500rmi2uc']] },

  { id: 'wlan', ph: 'plan', t: ['WLAN، تلفن و QoS', 'WLAN, Telefonie und QoS', 'Wi-Fi, telephony and QoS'], title: 'WLAN-Planung, Telefonie und Quality of Service',
    why: ['WLAN را با نقشهٔ ساختمان برنامه‌ریزی کن و بعد از نصب اندازه بگیر. تلفن به تأخیر حساس است؛ با VLAN جدا و اولویت DSCP EF از کیفیت تماس محافظت می‌کنی.', 'WLAN wird anhand des Grundrisses geplant und nach der Installation gemessen. Telefonie ist laufzeitempfindlich: Eigenes VLAN und Priorisierung mit DSCP EF schützen die Sprachqualität.', 'Plan Wi-Fi with the floor plan and measure after installation. Voice is delay-sensitive: a separate VLAN and DSCP EF priority protect call quality.'],
    body: [
      { keep: 1, t: ['AP', 'Ort', 'Abdeckung', 'Kanäle (Plan)'], r: [
        ['AP01', 'EG Großraum Mitte', 'ca. 130 m²', '5 GHz Kanal 36, 6 GHz automatisch'],
        ['AP02', 'EG Besprechung/Empfang', 'ca. 80 m²', '5 GHz Kanal 52'],
        ['AP03', 'OG Flur Mitte', 'ca. 210 m²', '5 GHz Kanal 100']
      ] },
      { ul: ['SSIDs: „BP-Intern“ (WPA3-Personal/SAE, Schlüssel per Intune-Profil, VLAN 10), „BP-Gast“ (Captive Portal mit Wochencode, VLAN 50, Client-Isolation).', 'Sendeleistung manuell begrenzt, damit Geräte nicht an entfernten APs „kleben“.', 'Messung nach Installation: 24 Messpunkte, Ziel ≥ −67 dBm (Kriterium aus D05).'] },
      { h: 'QoS' },
      { ul: ['Telefone markieren Sprache mit DSCP 46 (EF) und Signalisierung mit DSCP 24/26.', 'Switches vertrauen DSCP auf Telefonports; Firewall priorisiert EF auf der WAN-Schnittstelle (Bandbreite für Sprache reserviert: 10 Mbit/s).', 'Test: Telefonat während eines Downloads mit 400 Mbit/s (Kriterium L07).'] }
    ] },

  { id: 'kosten', ph: 'plan', cost: 1, t: ['فهرست تجهیزات، هزینه و TCO', 'Stückliste, Kosten und TCO', 'Bill of materials, cost and TCO'], title: 'Stückliste, Kostenplan (3 Varianten) und TCO über 5 Jahre',
    why: ['قیمت دستگاه تنها هزینه نیست: لایسنس سالانه، باتری UPS، اینترنت، برق و نگه‌داری در ۵ سال اغلب از خرید بیشترند. سه گزینه به مشتری اجازهٔ انتخاب آگاهانه می‌دهد.', 'Der Gerätepreis ist nicht alles: Jahreslizenzen, USV-Akkus, Internet, Strom und Wartung übersteigen über 5 Jahre oft die Anschaffung. Drei Varianten ermöglichen dem Kunden eine bewusste Entscheidung.', 'The device price is not everything: annual licences, UPS batteries, internet, power and maintenance often exceed the purchase over 5 years. Three variants let the client decide consciously.'],
    body: [
      { h: 'Variante „Empfohlen“ – Investition (netto)' },
      { keep: 3, t: ['Pos.', 'Geräteklasse (Beispielmodell)', 'Menge', 'Einzelpreis', 'Gesamt', 'Quelle'], r: [
        ['1', 'UTM-Firewall für bis ca. 25 Nutzer (z. B. Sophos XGS 107)', '1', '648,90 €', '648,90 €', 'R: Händlerpreisliste, 11/2026'],
        ['2', 'Firewall-Schutzlizenz 12 Monate (Standard Protection)', '1', '375,30 €', '375,30 €', 'R: Händlerpreisliste (Verlängerung), 11/2026'],
        ['3', '24-Port-PoE+-Switch 370 W, 4× SFP+ (z. B. HPE Aruba Instant On 1930)', '2', '420,00 €', '840,00 €', 'R: ca. 500 € brutto im Handel, 11/2026'],
        ['4', 'Wi-Fi-7-Access-Point, PoE+, 2,5 GbE (z. B. Ubiquiti U7 Pro)', '3', '150,00 €', '450,00 €', 'R: 160 € brutto Herstellershop, Handel bis ca. 195 €, 11/2026'],
        ['5', 'NAS 4 Schächte (z. B. Synology DS925+)', '1', '549,00 €', '549,00 €', 'R: UVP netto'],
        ['6', 'NAS-Festplatten 4 × 8 TB (herstellerkompatibel)', '4', '250,00 €', '1.000,00 €', 'PW'],
        ['7', 'USV 1.500 VA / 1.000 W Rack (z. B. APC SMT1500RMI2UC)', '1', '756,00 €', '756,00 €', 'PW: Handelspreise schwanken stark (ca. 700–1.090 € brutto)'],
        ['8', 'LTE/5G-Business-Router', '1', '400,00 €', '400,00 €', 'PW'],
        ['9', 'Netzwerkschrank 24 HE, Patchfelder, Kleinteile', '1', '1.000,00 €', '1.000,00 €', 'PW'],
        ['10', 'Verkabelung Cat 6A inkl. Messung (Fachbetrieb)', '48', '180,00 €', '8.640,00 €', 'PW'],
        ['11', 'Planung, Konfiguration, Migration, Doku (NordNetz IT)', '64 h', '95,00 €', '6.080,00 €', 'PW'],
        ['', 'Summe netto', '', '', '20.739,20 €', ''],
        ['', 'zzgl. 19 % USt.', '', '', '3.940,45 €', ''],
        ['', 'Summe brutto', '', '', '24.679,65 €', '']
      ] },
      { note: 'Achtung bei NAS: Für die Modellreihe 2025 hatte der Hersteller zunächst nur eigene Festplatten voll unterstützt; seit DSM 7.3 (Oktober 2025) sind Laufwerke anderer Hersteller wieder nutzbar. Trotzdem vor der Bestellung die Kompatibilitätsliste prüfen. AP und Switch stammen hier von verschiedenen Herstellern: zwei Verwaltungsoberflächen – bewusst in Kauf genommen (Preis, Verfügbarkeit).' },
      { h: 'Varianten im Vergleich' },
      { keep: 1, t: ['Variante', 'Inhalt', 'Investition (netto)', 'Verfügbarkeit', 'Risiko'], r: [
        ['Budget', 'Router-Firewall ohne Schutzlizenz, 1 Switch, kein LTE-Backup, keine USV, Cat 6', 'ca. 14.500 € (PW)', '≈ 99,3 % – Ziel verfehlt', 'hoch'],
        ['Empfohlen', 'wie oben', '20.739,20 €', '≈ 99,8 %', 'gering'],
        ['Premium', 'Firewall-Cluster (2 Geräte), 2 USV, 4 APs, NAS + Offsite-Appliance', 'ca. 30.000 € (PW)', '≈ 99,9 %', 'sehr gering']
      ] },
      { h: 'TCO über 5 Jahre (Variante Empfohlen, netto)' },
      { keep: 1, t: ['Kostenart', 'Rechnung', 'Betrag'], r: [
        ['Investition', 'siehe oben', '20.739,20 €'],
        ['Firewall-Lizenz Jahre 2–5', '4 × 375,30 €', '1.501,20 €'],
        ['USV-Akkutausch (1×, nach ca. 3–5 Jahren)', 'Ersatzbatterie laut Händler', '343,99 €'],
        ['Glasfaser-Geschäftsanschluss', '60 × 150 € (PW)', '9.000,00 €'],
        ['LTE/5G-Datentarif', '60 × 15 € (PW)', '900,00 €'],
        ['Wartungsvertrag Dienstleister', '60 × 2 h × 95 € (PW)', '11.400,00 €'],
        ['Strom Netzkomponenten', '0,4 kW × 8.760 h × 5 J. × 0,30 €/kWh (PW)', '5.256,00 €'],
        ['Summe TCO 5 Jahre', '', '49.140,39 € (≈ 819 € pro Monat)']
      ] }
    ],
    src: [['Sophos XGS 107, Hardware – Händlerpreisliste', 'https://software-express.de/preislisten/sophos/sophos-15487'], ['Sophos Standard Protection for XGS 107, Renewal 12 Monate', 'https://software-express.de/preislisten/sophos/sophos-25525'], ['HPE Aruba Instant On 1930 24G PoE 370W – Handelspreis', 'https://arvutitark.ee/en/network-devices/switches/hpe-aruba-ion-1930-24g-4sfp-370w-sw-1260674'], ['Ubiquiti U7 Pro – Herstellershop EU', 'https://eu.store.ui.com/eu/en/pro/products/u7-pro'], ['Synology DS925+ – UVP (Notebookcheck)', 'https://www.notebookcheck.com/Synology-bringt-neuen-Netzwerkspeicher-mit-Erweiterungsoptionen-und-schnellem-Ethernet-und-Festplatten-Restriktionen.1000401.0.html'], ['Synology DSM 7.3 – Drittanbieter-Festplatten wieder erlaubt (PCGH)', 'https://www.pcgameshardware.de/Festplatte-Hardware-255553/News/Diskstation-Manager-7-3-Synology-Update-NAS-1483806/'], ['APC SMT1500RMI2UC – Laufzeit (happyware)', 'https://happyware.com/uk-en/apc-smt1500rmi2uc'], ['APC Ersatzbatterie SMT1500RMI2U/C (Bechtle)', 'https://www.bechtle.com/de-en/shop/apc-battery-smart-ups-smt1500rmi2u-c--4494363--p']] },

  { id: 'nutzwert', ph: 'plan', t: ['تحلیل سودمندی (انتخاب فایروال)', 'Nutzwertanalyse', 'Weighted scoring (firewall choice)'], title: 'Nutzwertanalyse: Auswahl der Firewall',
    why: ['با Nutzwertanalyse تصمیم را شفاف و قابل‌دفاع می‌کنی: معیارها با وزن، امتیاز ۱ تا ۱۰، حاصل‌ضرب و جمع. وقتی نتیجه نزدیک است، بگو و معیار تعیین‌کننده را توضیح بده.', 'Mit der Nutzwertanalyse wird eine Entscheidung nachvollziehbar: Kriterien mit Gewichtung, Punkte 1–10, gewichtete Summe. Liegen Ergebnisse knapp beieinander, sagst du das offen und nennst das ausschlaggebende Kriterium.', 'Weighted scoring makes a decision traceable: weighted criteria, scores 1–10, weighted sum. If results are close, say so and name the deciding criterion.'],
    body: [
      { t: ['Kriterium', 'Gewicht', 'A: Sophos XGS 107', 'B: FortiGate (Einstiegsklasse)', 'C: OPNsense auf Appliance'], r: [
        ['Sicherheitsfunktionen', '30 %', '8 → 240', '8 → 240', '6 → 180'],
        ['Verwaltung/Bedienung', '20 %', '8 → 160', '7 → 140', '5 → 100'],
        ['Kosten über 5 Jahre', '20 %', '6 → 120', '6 → 120', '9 → 180'],
        ['Support/Partner vor Ort', '15 %', '8 → 120', '7 → 105', '5 → 75'],
        ['Leistung/Reserve', '15 %', '6 → 90', '8 → 120', '7 → 105'],
        ['Nutzwert', '100 %', '730', '725', '640']
      ], keep: 1, cap: 'Punkte: Beispielbewertung des Projektteams (1 = schlecht, 10 = sehr gut).' },
      { p: 'Ergebnis: A und B liegen fast gleichauf (730 zu 725). Ausschlaggebend ist das Know-how des Dienstleisters mit Variante A und die zentrale Verwaltung mehrerer Kunden. Variante C ist am günstigsten, verlangt aber mehr eigenes Fachwissen im Betrieb.' }
    ] },

  { id: 'angebot', ph: 'plan', t: ['پیشنهاد قیمت و محاسبه', 'Angebot und Kalkulation', 'Quotation and calculation'], title: 'Angebot (Auszug) und Kalkulation',
    why: ['پیشنهاد قیمت باید روشن بگوید چه چیزی شامل است و چه نیست، اعتبار تا کی است و پرداخت چطور است. محاسبه پشت آن با هزینه‌ها، سربار و سود قیمت را قابل‌دفاع می‌کند.', 'Ein Angebot sagt klar, was enthalten ist und was nicht, wie lange es gilt und wie bezahlt wird. Die Kalkulation dahinter (Kosten, Gemeinkosten, Gewinn) macht den Preis begründbar.', 'A quotation states clearly what is and is not included, how long it is valid and how payment works. The calculation behind it (costs, overhead, profit) makes the price defensible.'],
    body: [
      { kv: [['Angebotsnummer', 'A-2027-0012'], ['Gültig bis', '31.01.2027'], ['Leistung', 'Netzwerk-Neuaufbau laut Pflichtenheft v1.0 als Werkleistung'], ['Preis', '20.739,20 € netto zzgl. USt. (Positionen siehe D18)'], ['Zahlung', '40 % bei Auftrag, 60 % nach Abnahme, 14 Tage netto'], ['Nicht enthalten', 'Elektroinstallation 230 V, Möbelumzug, Endgeräte, Provider-Entgelte'], ['Änderungen', 'nach schriftlichem Änderungsantrag zu 95 €/h bzw. Materialpreis']] },
      { h: 'Kalkulation Dienstleistung (vereinfacht)' },
      { keep: 1, t: ['Posten', 'Rechnung', 'Betrag'], r: [
        ['Personalkosten intern', '64 h × 48 € Kostensatz (PW)', '3.072,00 €'],
        ['Gemeinkosten (Fahrzeug, Werkzeug, Verwaltung)', '60 % auf Personalkosten (PW)', '1.843,20 €'],
        ['Selbstkosten', '', '4.915,20 €'],
        ['Gewinnzuschlag', '23,7 % (PW)', '1.164,80 €'],
        ['Angebotspreis Dienstleistung', '= 64 h × 95 €', '6.080,00 €']
      ] }
    ] },

  { id: 'migration', ph: 'plan', t: ['برنامهٔ مهاجرت و بازگشت', 'Migrations- und Rollbackplan', 'Migration and rollback plan'], title: 'Migrations-, Cutover- und Rollbackplan',
    why: ['روز تغییر با یک فهرست دقیق دقیقه‌به‌دقیقه اجرا می‌شود؛ برای هر گام نقطهٔ «برگشت» تعریف کن. اگر معیار برگشت رسید، بدون بحث برمی‌گردی.', 'Der Umschalttag läuft nach einer genauen Schrittliste; für jeden Schritt gibt es einen Rückfallpunkt. Wird ein Abbruchkriterium erreicht, wird ohne Diskussion zurückgerollt.', 'Cutover day follows an exact step list with a fallback point for each step. If an abort criterion is reached, you roll back without debate.'],
    body: [
      { t: ['Zeit', 'Schritt', 'Prüfung', 'Rollback'], r: [
        ['Fr 16:00', 'Vollsicherung altes NAS, Prüfsummenliste', 'Sicherung vollständig', 'nicht nötig'],
        ['Fr 18:00', 'Altes Büro: Nutzer abgemeldet, NAS schreibgeschützt', 'keine offenen Dateien', 'NAS wieder freigeben'],
        ['Sa 08:00', 'Daten auf NAS01 übertragen (Rsync/Hyper Backup)', 'Prüfsummen identisch', 'altes NAS bleibt führend'],
        ['Sa 12:00', 'Firewall, Switches, APs im Technikraum aktiv; Internet über Glasfaser', 'Tests T01–T08 grün', 'LTE als Internet, Fehlersuche'],
        ['Sa 15:00', 'Telefone und Drucker umziehen, Pilot-Tests mit 3 Nutzern', 'Telefonat, Druck, VPN ok', 'Telefonie per Rufumleitung auf Handys'],
        ['So 10:00', 'Abschlusstests, Info-Mail an alle', 'Testplan vollständig', 'Go/No-Go-Entscheidung 14:00'],
        ['Mo 07:30', 'Vor-Ort-Support (Hypercare) bis Mittwoch', 'Tickets erfasst', '–']
      ] },
      { note: 'Abbruchkriterium: Sind Projektdaten bis So 14:00 nicht vollständig und geprüft verfügbar, bleibt das alte NAS bis zur Klärung führend (Zugriff per VPN).' }
    ] },

  { id: 'testplan', ph: 'plan', t: ['برنامهٔ آزمون', 'Testplan', 'Test plan'], title: 'Testplan',
    why: ['هر معیار تحویل یک آزمون مشخص با گام‌ها و نتیجهٔ مورد انتظار دارد. آزمون را قبل از اجرا بنویس، نه بعد از آن.', 'Jedes Abnahmekriterium hat einen Testfall mit Schritten und erwartetem Ergebnis. Tests werden vor der Umsetzung geschrieben, nicht danach.', 'Each acceptance criterion has a test case with steps and an expected result. Write tests before implementation, not after.'],
    body: [
      { keep: 2, t: ['Test', 'Kriterium', 'Durchführung', 'Erwartet'], r: [
        ['T01', 'L01 Verkabelung', 'Messprotokolle Fachbetrieb prüfen', '48/48 bestanden'],
        ['T02', 'L02 WLAN', 'Messung an 24 Punkten (Grundriss)', '≥ −67 dBm überall'],
        ['T03', 'L03 Failover', 'Glasfaser am Abschlusspunkt trennen, Dauerping 1.1.1.1', 'Umschaltung < 60 s'],
        ['T04', 'L04 Trennung', 'Aus VLAN 50 und 60: Test-NetConnection 10.10.20.10 -Port 445', 'keine Verbindung'],
        ['T05', 'L05 VPN', '3 Testnutzer mit/ohne MFA', 'nur mit MFA erfolgreich'],
        ['T06', 'L06 Sicherung', 'Datei und Ordner aus Sicherung wiederherstellen', 'Inhalt identisch'],
        ['T07', 'L07 Sprachqualität', 'Telefonat während 400-Mbit/s-Download', 'keine Aussetzer'],
        ['T08', 'L08 USV', 'Netzstecker USV 10 min ziehen', 'kein Ausfall, Shutdown-Signal bei Schwelle'],
        ['T09', 'Leistung', 'iperf3 Client ↔ NAS kabelgebunden', '≥ 900 Mbit/s'],
        ['T10', 'L10 Verwaltung', 'Admin-Zugriff aus VLAN 10', 'verweigert']
      ] }
    ] },

  /* ---------- Phase 4: Steuerung ---------- */
  { id: 'status', ph: 'steu', t: ['گزارش وضعیت', 'Statusbericht', 'Status report'], title: 'Statusbericht KW 4 (Projektwoche 3)',
    why: ['گزارش وضعیت در یک نگاه می‌گوید پروژه کجاست: چراغ زمان، هزینه و کیفیت، کارهای انجام‌شده، گام بعد، ریسک‌ها و تصمیم‌های لازم. صادق باش؛ زرد زودهنگام بهتر از قرمز دیرهنگام است.', 'Der Statusbericht zeigt auf einen Blick, wo das Projekt steht: Ampel für Termine, Kosten und Qualität, Erledigtes, nächste Schritte, Risiken und nötige Entscheidungen. Ehrlich bleiben – frühes Gelb ist besser als spätes Rot.', 'The status report shows at a glance where the project stands: traffic lights for time, cost and quality, done, next steps, risks and needed decisions. Be honest – early amber beats late red.'],
    body: [
      { keep: 1, t: ['Bereich', 'Ampel', 'Kommentar'], r: [
        ['Termine', 'GELB', 'Provider meldet Glasfaser 5 AT später; Puffer 6 AT – knapp, aber Endtermin hält'],
        ['Kosten', 'GRÜN', 'Bestellungen 6.019,20 € netto wie geplant'],
        ['Qualität', 'GRÜN', 'Pflichtenheft freigegeben, Verkabelung begonnen'],
        ['Umfang', 'GELB', 'Änderungsantrag CR-01 (Besprechungsraum) liegt zur Entscheidung vor']
      ] },
      { kv: [['Erledigt', 'M1 Pflichtenheft (AT 7), M2 Bestellung (AT 9), Kick-off, Glasfaser bestellt'], ['Nächste Schritte', 'Verkabelung abschließen und messen, Vorkonfiguration vorbereiten'], ['Risiken', 'R1 Glasfaser (W↑): Eskalation beim Provider, LTE als Übergang vorbereitet'], ['Entscheidung nötig', 'CR-01 bis Mittwoch KW 5 (Geschäftsführung)']] }
    ] },

  { id: 'aenderung', ph: 'steu', t: ['درخواست تغییر', 'Änderungsantrag (Change Request)', 'Change request'], title: 'Änderungsantrag CR-01',
    why: ['هر خواستهٔ تازه بعد از تأیید برنامه یک تغییر است. با فرم رسمی اثرش روی هزینه، زمان و ریسک روشن می‌شود و کارفرما آگاهانه تصمیم می‌گیرد؛ این از «خزش دامنه» جلوگیری می‌کند.', 'Jeder neue Wunsch nach der Planfreigabe ist eine Änderung. Das Formular macht Auswirkung auf Kosten, Termin und Risiko sichtbar, der Auftraggeber entscheidet bewusst – so wird schleichende Umfangserweiterung vermieden.', 'Every new wish after plan approval is a change. The form shows the impact on cost, time and risk so the client decides consciously – this prevents scope creep.'],
    body: [
      { kv: [['Antragsteller/in', 'S. Wagner (Büroleitung), 27.01.2027'], ['Beschreibung', 'Großer Besprechungsraum OG: 4 zusätzliche Netzanschlüsse und ein eigener Access Point für Videokonferenzen mit bis zu 20 Gästen'], ['Grund', 'Kundenpräsentationen mit Videokonferenz, WLAN-Last im Raum'], ['Auswirkung Kosten', '4 × 180 € + 1 AP 150 € + 3 h × 95 € = 1.155,00 € netto'], ['Auswirkung Termin', 'keine – Verkabelung läuft noch, AP wird parallel konfiguriert'], ['Auswirkung Risiko', 'gering; PoE-Budget SW02 steigt auf 106 W (ausreichend)'], ['Empfehlung Projektleitung', 'genehmigen'], ['Entscheidung', 'genehmigt am 29.01.2027, K. Brandt']] },
      { sig: ['Auftraggeber', 'Projektleitung'] }
    ] },

  /* ---------- Phase 5: Abschluss ---------- */
  { id: 'messung', ph: 'abs', t: ['پروتکل آزمون و اندازه‌گیری', 'Test- und Messprotokoll', 'Test and measurement report'], title: 'Test- und Messprotokoll',
    why: ['نتیجهٔ واقعی هر آزمون را با تاریخ، ابزار و آزمایشگر ثبت می‌کنی. این مدرک پایهٔ تحویل است؛ «کار می‌کند» بدون عدد مدرک نیست.', 'Hier steht das tatsächliche Ergebnis jedes Tests mit Datum, Messmittel und Prüfer. Es ist die Grundlage der Abnahme; „funktioniert“ ohne Zahl ist kein Nachweis.', 'This records the actual result of each test with date, instrument and tester. It is the basis for acceptance; “it works” without a number is not evidence.'],
    body: [
      { keep: 1, t: ['Test', 'Ergebnis', 'Status', 'Prüfer/Datum'], r: [
        ['T01', '52/52 Links bestanden (inkl. CR-01), Messprotokolle als PDF', 'bestanden', 'Fachbetrieb, 05.02.'],
        ['T02', 'schwächster Messpunkt −63 dBm (Archiv OG)', 'bestanden', 'Techniker, 15.02.'],
        ['T03', 'Umschaltung auf LTE nach 38 s, zurück nach 41 s', 'bestanden', 'Techniker, 14.02.'],
        ['T04', 'Verbindung aus VLAN 50/60 auf 10.10.20.10:445 blockiert, Firewall-Log vorhanden', 'bestanden', 'Projektleitung, 14.02.'],
        ['T05', '3/3 mit MFA verbunden, ohne MFA abgewiesen', 'bestanden', 'Projektleitung, 14.02.'],
        ['T06', 'Ordner „Projekt 2026-17“ wiederhergestellt, Prüfsummen identisch', 'bestanden', 'Techniker, 15.02.'],
        ['T07', 'Telefonat 5 min während Download, keine Aussetzer', 'bestanden', 'S. Wagner, 15.02.'],
        ['T08', '10 min ohne Netz, Last 36 %, Restlaufzeit 29 min angezeigt', 'bestanden', 'Techniker, 13.02.'],
        ['T09', '941 Mbit/s Client → NAS', 'bestanden', 'Techniker, 15.02.'],
        ['T10', 'Admin-Zugriff aus VLAN 10 verweigert', 'bestanden', 'Projektleitung, 14.02.']
      ] }
    ] },

  { id: 'abnahme', ph: 'abs', t: ['پروتکل تحویل (Abnahme)', 'Abnahmeprotokoll', 'Acceptance protocol'], title: 'Abnahmeprotokoll (Werkvertrag)',
    why: ['با امضای Abnahme کارفرما تأیید می‌کند که کار طبق قرارداد است؛ طبق § 640 BGB به‌خاطر ایراد جزئی نمی‌توان تحویل را رد کرد و پرداخت با تحویل سررسید می‌شود. ایرادها را با مهلت رفع ثبت کن.', 'Mit der Abnahme bestätigt der Auftraggeber die vertragsgemäße Leistung. Nach § 640 BGB kann sie wegen unwesentlicher Mängel nicht verweigert werden; die Vergütung wird mit der Abnahme fällig. Mängel mit Frist festhalten.', 'With acceptance the client confirms the work meets the contract. Under § 640 BGB it cannot be refused for insignificant defects, and payment falls due on acceptance. Record defects with a deadline.'],
    body: [
      { kv: [['Projekt', 'BP-NET-2027, Netzwerk-Neuaufbau'], ['Grundlage', 'Pflichtenheft v1.0, CR-01'], ['Datum/Ort', '18.02.2027, Hafenstraße'], ['Teilnehmende', 'K. Brandt, S. Wagner, Projektleitung NordNetz IT']] },
      { keep: 1, t: ['Prüfpunkt', 'Ergebnis'], r: [['Abnahmekriterien L01–L11', 'erfüllt (Messprotokoll D25)'], ['Dokumentation übergeben', 'ja (Netzplan, IP-Plan, Firewall-Matrix, Messprotokolle, Betriebshandbuch)'], ['Einweisung', 'ja, 2 h am 17.02. (Büroleitung, 2 Keyuser)'], ['Zugangsdaten', 'im Kennwortsafe des Kunden hinterlegt']] },
      { t: ['Mangel', 'Einstufung', 'Frist'], r: [['Beschriftung an 2 Dosen (OG 2.07) fehlt', 'unwesentlich', '25.02.2027']] },
      { p: 'Die Leistung wird mit dem oben genannten unwesentlichen Mangel abgenommen. Die Gewährleistungsfrist beginnt mit dem heutigen Tag.' },
      { sig: ['Auftraggeber', 'Auftragnehmer'] }
    ],
    src: [['BGB § 640 Abnahme', 'https://www.gesetze-im-internet.de/bgb/__640.html'], ['BGB § 641 Fälligkeit der Vergütung', 'https://www.gesetze-im-internet.de/bgb/__641.html']] },

  { id: 'uebergabe', ph: 'abs', t: ['تحویل به بهره‌برداری', 'Betriebsübergabe', 'Handover to operations'], title: 'Betriebsübergabe und Betriebshandbuch (Auszug)',
    why: ['پروژه با تحویل تمام می‌شود ولی شبکه سال‌ها کار می‌کند. پایش، پشتیبان‌گیری، به‌روزرسانی، تاریخ پایان پشتیبانی و قراردادها باید روشن باشند، وگرنه امنیت کم‌کم از بین می‌رود.', 'Das Projekt endet mit der Übergabe, das Netz läuft jahrelang weiter. Monitoring, Sicherungen, Updates, Support-Enddaten und Verträge müssen geklärt sein, sonst verfällt die Sicherheit schleichend.', 'The project ends at handover, the network runs for years. Monitoring, backups, updates, end-of-support dates and contracts must be clear, otherwise security erodes over time.'],
    body: [
      { keep: 1, t: ['Bereich', 'Regelung', 'Verantwortlich'], r: [
        ['Monitoring', 'Firewall-, USV- und NAS-Meldungen per E-Mail an Wartungspostfach; Temperaturalarm Technikraum', 'NordNetz IT'],
        ['Konfigurationssicherung', 'Firewall und Switches wöchentlich verschlüsselt auf NAS + Offsite', 'NordNetz IT'],
        ['Datensicherung', 'Snapshots stündlich, Offsite nachts; Wiederherstellungstest quartalsweise', 'NordNetz IT / Büroleitung'],
        ['Updates', 'Firmware monatlich im Wartungsfenster Di 19–21 Uhr', 'NordNetz IT'],
        ['Lebenszyklus', 'Support-Enddaten aller Geräte im Inventar; Lizenzablauf Firewall mit 60 Tagen Vorwarnung', 'NordNetz IT'],
        ['Zugänge', 'Kennwortsafe des Kunden, Admin-Konten personalisiert, MFA', 'Büroleitung'],
        ['Wartungsvertrag', '2 h/Monat, Reaktionszeit 4 h werktags', 'NordNetz IT']
      ] },
      { h: 'Übergebene Unterlagen' },
      { ul: ['Logischer und physischer Netzplan (draw.io + PDF)', 'VLAN- und IP-Plan, Firewall-Matrix, Portbelegung je Switch', 'Messprotokolle Verkabelung und WLAN', 'Inventar mit Seriennummern, Garantie- und Support-Enddaten', 'Notfallhandbuch-Auszug (D28)'] }
    ] },

  { id: 'notfall', ph: 'abs', t: ['دفترچهٔ اضطراری', 'Notfallhandbuch (Auszug)', 'Emergency manual (extract)'], title: 'Notfallhandbuch (Auszug)',
    why: ['در بحران کسی فرصت فکر کردن ندارد. برای هر سناریو مشخص کن چه کسی، چه کاری، به چه ترتیبی و با چه هدف زمانی (RTO) انجام می‌دهد. ساختار BSI 200-4 راهنمای خوبی است.', 'Im Notfall hat niemand Zeit zum Nachdenken. Für jedes Szenario steht fest, wer was in welcher Reihenfolge mit welchem Zeitziel (RTO) tut. BSI-Standard 200-4 bietet einen guten Rahmen.', 'In an emergency nobody has time to think. For every scenario it is fixed who does what, in which order, with which time target (RTO). BSI standard 200-4 is a good framework.'],
    body: [
      { keep: 1, t: ['Szenario', 'Sofortmaßnahme', 'Wiederanlauf', 'RTO'], r: [
        ['Glasfaser ausgefallen', 'automatisch LTE/5G; Provider-Störung melden', 'Rückschaltung automatisch', '1 min'],
        ['Firewall defekt', 'Dienstleister anrufen; Notbetrieb nicht möglich', 'Ersatzgerät, Konfiguration aus Sicherung', '4 h'],
        ['Switch defekt', 'SW02: OG arbeitet per WLAN über AP01/AP02 im EG; SW01: Gesamtausfall', 'Ersatzswitch aus Lager, Konfiguration aus Sicherung einspielen', '2 h'],
        ['Stromausfall > 15 min', 'USV-Alarm, NAS fährt automatisch herunter', 'nach Netzwiederkehr Startreihenfolge: Firewall, Switches, NAS', '30 min nach Netz'],
        ['Verdacht auf Ransomware', 'betroffene Geräte vom Netz, Internet am WAN trennen, Geschäftsführung + Dienstleister informieren', 'Wiederherstellung aus unveränderlichen Snapshots nach Freigabe', 'laut Lage']
      ] },
      { kv: [['Notfallkontakte', 'Dienstleister-Hotline, Provider-Störungsnummer, Geschäftsführung, Datenschutzbeauftragte/r (Meldepflicht prüfen)'], ['Aufbewahrung', 'ausgedruckt im Technikraum und bei der Geschäftsführung']] }
    ],
    src: [['BSI-Standard 200-4 Business Continuity Management', 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/BSI-Standards/BSI-Standard-200-4-Business-Continuity-Management/bsi-standard-200-4_Business_Continuity_Management_node.html']] },

  { id: 'abschluss', ph: 'abs', t: ['گزارش پایانی و درس‌ها', 'Projektabschlussbericht', 'Project closure report'], title: 'Projektabschlussbericht und Lessons Learned',
    why: ['گزارش پایانی برنامه را با واقعیت مقایسه می‌کند (زمان، هزینه، کیفیت) و درس‌ها را برای پروژهٔ بعدی ثبت می‌کند. پروژه فقط وقتی تمام است که این گزارش پذیرفته شود.', 'Der Abschlussbericht vergleicht Plan und Ist (Termine, Kosten, Qualität) und hält Lehren für das nächste Projekt fest. Erst mit seiner Annahme ist das Projekt formal beendet.', 'The closure report compares plan and actual (time, cost, quality) and records lessons for the next project. The project is formally finished only when it is accepted.'],
    body: [
      { keep: 1, t: ['Kennzahl', 'Plan', 'Ist', 'Abweichung'], r: [
        ['Dauer', '31 AT', '31 AT', '0 (Glasfaser-Verzug im Puffer aufgefangen)'],
        ['Kosten netto', '20.739,20 € + CR-01 1.155,00 € = 21.894,20 €', '21.580,00 €', '−314,20 € (−1,4 %)'],
        ['Abnahmekriterien', '11', '11 erfüllt', '1 unwesentlicher Mangel, behoben am 23.02.'],
        ['Interner Aufwand', '74 h', '79 h', '+5 h (WLAN-Feinjustierung)']
      ] },
      { h: 'Lessons Learned' },
      { ul: ['Glasfaser am ersten Projekttag bestellen – der Puffer von 6 AT wurde zu 5 AT verbraucht.', 'Grundriss für die WLAN-Planung früh in Maßstab anfordern; die Feinjustierung kostete 5 h.', 'Pilotnutzer am Umzugswochenende haben drei Druckerprobleme vor Montag gefunden – beibehalten.', 'Vorlage für Änderungsanträge hat Diskussionen verkürzt – im Standardprozess aufnehmen.'] },
      { sig: ['Auftraggeber', 'Projektleitung'] }
    ] },

  /* ---------- IHK ---------- */
  { id: 'ihkantrag', ph: 'ihk', t: ['Projektantrag برای IHK', 'IHK-Projektantrag', 'IHK project application'], title: 'Projektantrag (Fachinformatiker/-in Systemintegration, 40 Stunden)',
    why: ['پروژهٔ IHK برای Systemintegration حداکثر ۴۰ ساعت با مستندات است؛ پس یک زیرپروژهٔ مستقل از پروژهٔ بزرگ انتخاب می‌کنی. فرم و جزئیات دقیق را از IHK خودت بگیر؛ این نمونه ساختار رایج را نشان می‌دهد.', 'Das IHK-Projekt in der Fachrichtung Systemintegration umfasst höchstens 40 Stunden inklusive Dokumentation – daher wählst du ein eigenständiges Teilprojekt. Formular und Details gibt deine IHK vor; dieses Muster zeigt den üblichen Aufbau.', 'The IHK project for system integration is at most 40 hours including documentation, so you pick a self-contained sub-project. Your IHK provides the exact form; this sample shows the usual structure.'],
    body: [
      { kv: [['Projektbezeichnung', 'Planung und Einführung eines segmentierten Firmennetzes mit Gäste-WLAN und Internet-Redundanz für das Ingenieurbüro Brandt & Partner'], ['Projektumfeld', 'IT-Dienstleister NordNetz IT, Kunde mit 18 Mitarbeitenden, Umzug in neue Büroräume'], ['Ist-Zustand', 'Flaches Netz ohne Segmentierung, Gäste im Firmennetz, ein Internetanschluss ohne Ausfallsicherung'], ['Soll-Zustand', '7 VLANs mit Firewall-Regeln nach Default-Deny, getrenntes Gäste-WLAN, automatischer LTE/5G-Failover, dokumentierte Tests'], ['Abgrenzung', 'Verkabelung (Fachbetrieb), NAS-Datenmigration und VPN sind nicht Teil der Prüfungsleistung'], ['Schnittstellen', 'Geschäftsführung (Freigaben), Fachbetrieb (Messprotokolle), Provider']] },
      { keep: 1, t: ['Phase', 'Tätigkeiten', 'Stunden'], r: [
        ['Analyse', 'Ist-Aufnahme, Anforderungen, Soll-Konzept-Ziele', '5'],
        ['Planung', 'VLAN/IP-Plan, Firewall-Matrix, Failover-Konzept, Nutzwertanalyse, Wirtschaftlichkeit', '9'],
        ['Umsetzung', 'Konfiguration Firewall, Switches, WLAN, Failover', '14'],
        ['Test und Abnahme', 'Testfälle T03, T04, T10, Abnahmegespräch', '4'],
        ['Dokumentation', 'Projektdokumentation, Kundendokumentation', '8'],
        ['Summe', '', '40']
      ] }
    ] },

  { id: 'ihkdoku', ph: 'ihk', t: ['مستندات پروژهٔ IHK', 'IHK-Projektdokumentation', 'IHK project documentation'], title: 'Projektdokumentation: Gliederung und Musterabschnitt',
    why: ['مستندات IHK روند کار تو را نشان می‌دهد: تصمیم‌ها با دلیل، انحراف‌ها و صرفه‌جویی اقتصادی. حجم و قالب دقیق را برگهٔ راهنمای IHK خودت تعیین می‌کند.', 'Die IHK-Dokumentation zeigt dein Vorgehen: Entscheidungen mit Begründung, Abweichungen und Wirtschaftlichkeit. Umfang und Form legt das Merkblatt deiner IHK fest.', 'The IHK documentation shows how you worked: decisions with reasons, deviations and economic justification. Your IHK guideline sets length and format.'],
    body: [
      { ol: ['Einleitung: Projektumfeld, Projektziel, Begründung, Schnittstellen, Abgrenzung', 'Projektplanung: Phasen, Zeitplanung (Soll/Ist), Ressourcen, Entwicklungsprozess', 'Analyse: Ist-Analyse, Wirtschaftlichkeitsanalyse (Make-or-Buy, Amortisation), Anforderungen', 'Entwurf: Netzkonzept, VLAN/IP-Plan, Firewall-Matrix, Nutzwertanalyse', 'Implementierung: Konfigurationsschritte (Auszüge, keine Kennwörter)', 'Abnahme und Tests: Testfälle, Ergebnisse, Abnahmeprotokoll', 'Fazit: Soll-Ist-Vergleich, Lessons Learned, Ausblick', 'Anhang: Netzpläne, Testprotokolle, Kundendokumentation, Glossar'] },
      { h: 'Musterabschnitt 3.2 Wirtschaftlichkeitsbetrachtung (Auszug)' },
      { p: 'Ein Internetausfall stoppt im Ingenieurbüro Cloud-Synchronisation, Telefonie und Lizenzprüfung. Bei 18 Mitarbeitenden und angenommenen internen Kosten von 60 € je Stunde (PW) kostet eine Ausfallstunde rund 1.080 €. Der LTE/5G-Failover senkt die rechnerische Ausfallzeit von 57,7 h auf 14,9 h pro Jahr (vgl. D15). Die vermiedenen Kosten betragen damit theoretisch bis zu 42,8 h × 1.080 € ≈ 46.200 € pro Jahr. Dem stehen 400 € Investition und 180 € Tarifkosten pro Jahr gegenüber; die Maßnahme amortisiert sich daher bereits mit der ersten vermiedenen Ausfallstunde. Annahme: Ein Ausfall betrifft alle Mitarbeitenden vollständig – in der Praxis ist der Effekt kleiner, das Ergebnis bleibt aber eindeutig.' }
    ] },

  { id: 'ihkfragen', ph: 'ihk', t: ['پرسش‌های گفت‌وگوی تخصصی', 'Fachgespräch: Leitfragen', 'Expert interview: guiding questions'], title: 'Präsentation und Fachgespräch: typische Leitfragen',
    why: ['در گفت‌وگوی تخصصی ممتحن‌ها می‌خواهند بدانند تو تصمیم‌ها را فهمیده‌ای. برای هر پرسش جوابی کوتاه با عدد و دلیل از پروژهٔ خودت آماده کن.', 'Im Fachgespräch wollen die Prüfenden sehen, dass du deine Entscheidungen verstanden hast. Bereite zu jeder Frage eine kurze Antwort mit Zahl und Begründung aus deinem Projekt vor.', 'In the expert interview the examiners want to see that you understood your decisions. Prepare a short answer with a number and a reason from your own project for each question.'],
    body: [
      { ol: ['Warum haben Sie die Firewall als zentrales Routing zwischen den VLANs gewählt und keinen Layer-3-Switch?', 'Wie haben Sie die Verfügbarkeit von 99,83 % berechnet, und welche Annahmen sind am unsichersten?', 'Was passiert technisch beim Failover, und warum dauert er 38 Sekunden?', 'Warum haben Sie WPA3-Personal mit Intune-Verteilung gewählt und nicht WPA3-Enterprise – und ab wann würden Sie wechseln?', 'Wie verhindern Sie, dass Gäste interne Drucker sehen?', 'Welche Rolle spielt DSCP EF für die Telefonie, und wo wird es ausgewertet?', 'Wie sind Sie vorgegangen, als die Glasfaser-Bereitstellung sich verzögerte?', 'Was hätten Sie mit 20 % weniger Budget weggelassen, und mit welchem Risiko?', 'Welche Datenschutzfragen entstehen durch Firewall-Protokolle?', 'Wie stellen Sie sicher, dass das Netz nach Projektende sicher bleibt?'] }
    ] }
  ]
});
})();
