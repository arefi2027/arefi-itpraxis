/* Arefi ITPraxis – Netzwerkstellen: Rolle, Kompetenzen, Österreich-Kapitel, typische Netzwerkstörungen im Betrieb und Interviewfragen.
   Grundlage: aktuelle Stellenanzeigen für Netzwerk- und Systemtechnik in Deutschland und Österreich (Stand 11/2026). Gleiches Format wie work-data.js. */
window.LAB = window.LAB || {};
(() => {
const J = window.LAB.workJobs = window.LAB.workJobs || {};

/* ---------- Rolle ---------- */
(J.roles = J.roles || []).push({ id: 'net',
 must: ['s-tcpip', 's-net2', 's-netsw', 's-netops', 's-netsec', 's-netplan', 's-hw', 's-ticket', 's-comm', 's-esc'],
 plus: ['s-netproj', 's-linux', 's-ps', 's-virt', 's-itil', 's-backup'],
 de: { t: 'Netzwerktechniker/-in (Junior)', sum: 'Du betreust LAN, WLAN, Firewall und VPN an einem oder mehreren Standorten: Störungen eingrenzen, Switches und Access Points tauschen und einrichten, Netz- und IP-Pläne aktuell halten und bei Rollouts mitarbeiten. In Anzeigen oft dazu: Herstellerwissen (z. B. Cisco, HPE Aruba, LANCOM, Fortinet, Sophos, Barracuda), Führerschein B und Einsätze vor Ort.', day: ['Netzwerkstörungen mit Ping, Traceroute, Switch-Log und Wireshark eingrenzen', 'VLANs, Trunks und Ports nach Plan einrichten und dokumentieren', 'Access Points und Switches tauschen, PoE-Budget und Verkabelung prüfen', 'Firewall-Regeln und VPN-Zugänge nach Freigabe ändern', 'Netzplan, IP-Plan und Inventar aktuell halten', 'Rollouts mit Wartungsfenster und Rückfallplan begleiten'] },
 en: { t: 'Network technician (junior)', sum: 'You look after LAN, Wi-Fi, firewall and VPN at one or more sites: narrow down faults, replace and configure switches and access points, keep network and IP plans up to date and help with rollouts. Ads often add vendor knowledge (e.g. Cisco, HPE Aruba, LANCOM, Fortinet, Sophos, Barracuda), a driving licence and on-site work.', day: ['Narrow down network faults with ping, traceroute, switch logs and Wireshark', 'Configure and document VLANs, trunks and ports according to the plan', 'Replace access points and switches, check PoE budget and cabling', 'Change firewall rules and VPN access after approval', 'Keep the network diagram, IP plan and inventory up to date', 'Support rollouts with a maintenance window and rollback plan'] },
 fa: { t: 'تکنسین شبکه (تازه‌کار)', sum: 'LAN، WLAN، Firewall و VPN را در یک یا چند شعبه پشتیبانی می‌کنی: خرابی را محدود می‌کنی، سوئیچ و Access Point را عوض و تنظیم می‌کنی، نقشهٔ شبکه و طرح IP را به‌روز نگه می‌داری و در اجرای پروژه‌ها همکاری می‌کنی. آگهی‌ها معمولاً این‌ها را هم می‌خواهند: شناخت سازنده‌ها (مثلاً Cisco، HPE Aruba، LANCOM، Fortinet، Sophos، Barracuda)، گواهی‌نامهٔ رانندگی B و کار در محل.', day: ['محدود کردن خرابی شبکه با Ping، Traceroute، لاگ سوئیچ و Wireshark', 'تنظیم و مستندسازی VLAN، Trunk و پورت‌ها طبق نقشه', 'تعویض Access Point و سوئیچ، بررسی بودجهٔ PoE و کابل‌کشی', 'تغییر قوانین Firewall و دسترسی VPN پس از تأیید', 'به‌روز نگه داشتن نقشهٔ شبکه، طرح IP و فهرست تجهیزات', 'همراهی اجرای پروژه با پنجرهٔ نگهداری و طرح بازگشت'] }
});
const addPlus = (role, ids) => { const r = J.roles.find(x => x.id === role); if (r) ids.forEach(id => { if (!r.plus.includes(id) && !r.must.includes(id)) r.plus.push(id); }); };
addPlus('admin', ['s-netplan', 's-netops']);
addPlus('fisi', ['s-netplan', 's-netproj']);
addPlus('onsite', ['s-netops']);

/* ---------- Kompetenzen (kurs: verlinkt Kapitel des Lehrbuchs) ---------- */
(J.skills = J.skills || []).push(
 { id: 's-netsw', g: 'network', kurs: ['k-net/net-vlan', 'k-net/net-stp-lacp'], lessons: ['vendor-switches'], cases: ['loop'], de: 'Switches einrichten: VLANs, Trunks, Spanning Tree, LACP und Portschutz', en: 'Configure switches: VLANs, trunks, spanning tree, LACP and port protection', fa: 'تنظیم سوئیچ: VLAN، Trunk، Spanning Tree، LACP و محافظت پورت' },
 { id: 's-netops', g: 'network', kurs: ['k-tools/tools-wireshark', 'k-tools/tools-iperf', 'k-tools/tools-nmap'], cases: ['slowlink', 'rogue-dhcp'], de: 'Netzwerkstörungen mit Messwerten belegen: Wireshark, iPerf, Nmap, Switch-Zähler', en: 'Back up network faults with measurements: Wireshark, iPerf, Nmap, switch counters', fa: 'اثبات خرابی شبکه با اندازه‌گیری: Wireshark، iPerf، Nmap و شمارنده‌های سوئیچ' },
 { id: 's-netplan', g: 'network', kurs: ['k-plan/plan-bedarf', 'k-plan/plan-vlanip', 'k-plan/plan-kosten'], cases: ['poe'], de: 'Netze planen und dokumentieren: Netzplan, VLAN- und IP-Plan, PoE-Budget, Kosten', en: 'Plan and document networks: diagram, VLAN and IP plan, PoE budget, cost', fa: 'طراحی و مستندسازی شبکه: نقشه، طرح VLAN و IP، بودجهٔ PoE و هزینه' },
 { id: 's-netsec', g: 'security', kurs: ['k-net/net-firewall', 'k-plan/plan-sicherheit'], lessons: ['firewall-lab'], cases: ['dot1x', 'vpn-subnet'], de: 'Firewall, VPN und Netzzugang (802.1X, MAB) betreuen', en: 'Look after firewall, VPN and network access control (802.1X, MAB)', fa: 'پشتیبانی Firewall، VPN و کنترل ورود به شبکه (802.1X و MAB)' },
 { id: 's-netproj', g: 'process', kurs: ['k-plan/plan-projekt', 'k-plan/plan-zeit', 'k-plan/plan-umsetzung'], de: 'Rollouts mitplanen: Zeitplan, Wartungsfenster, Rückfallplan, Abnahme', en: 'Help plan rollouts: schedule, maintenance window, rollback plan, acceptance', fa: 'همکاری در برنامه‌ریزی اجرا: زمان‌بندی، پنجرهٔ نگهداری، طرح بازگشت و تحویل' }
);

/* ---------- Wissenskapitel Österreich ---------- */
(J.topics = J.topics || []).push({ id: 'at',
 de: { t: 'Jobsuche in Österreich: Gehalt im Inserat, Kollektivvertrag, Lehrabschluss', html: `
<p>Die meisten Inhalte dieser App gelten für Deutschland und Österreich. Bei der Jobsuche in Österreich gibt es einige Besonderheiten.</p>
<h4>Gehalt im Stelleninserat</h4>
<p>Jedes Stelleninserat in Österreich muss das Mindestentgelt laut Kollektivvertrag (oder anderer Regelung) nennen und angeben, ob eine Überzahlung möglich ist (§ 9 Abs. 2 Gleichbehandlungsgesetz). „Ab 3.200 € brutto pro Monat, Bereitschaft zur Überzahlung“ heißt also: Das ist die Untergrenze, darüber wird verhandelt.</p>
<ul><li>Monatsgehälter werden meist 14-mal im Jahr ausbezahlt (Urlaubs- und Weihnachtsgeld laut Kollektivvertrag). Vergleiche Angebote aus Deutschland daher über das Jahresbrutto.</li><li>Viele IT-Firmen fallen unter den IT-Kollektivvertrag („Kollektivvertrag für Angestellte von Unternehmen im Bereich Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik“). IT-Stellen in Industrie, Handel oder Elektro haben oft einen anderen KV. Gehaltstabellen veröffentlichen WKO und Gewerkschaft GPA.</li><li>Frage im Gespräch nach Kollektivvertrag, Einstufung und ob Rufbereitschaft, Überstunden und Fahrzeiten extra bezahlt werden oder im All-in-Gehalt enthalten sind.</li></ul>
<h4>Was Anzeigen in Österreich zusätzlich oft verlangen</h4>
<ul><li>Führerschein B und Bereitschaft für Einsätze bei Kunden oder an mehreren Standorten.</li><li>Sehr gutes Deutsch und gutes Englisch (Herstellerdokumentation, internationale Firmen).</li><li>Herstellerwissen, das häufig genannt wird: Microsoft 365, Cisco, HPE Aruba, LANCOM, Fortinet, Sophos, Barracuda, Palo Alto, Veeam.</li><li>Abgeschlossene Ausbildung (Lehrabschluss, HTL, Kolleg, Studium) oder gleichwertige Praxis mit Nachweisen.</li></ul>
<h4>Lehrabschluss als Erwachsene/r nachholen</h4>
<p>Der Lehrberuf Informationstechnologie dauert vier Jahre und hat die Schwerpunkte Systemtechnik und Betriebstechnik (Ausbildungsordnung BGBl. II Nr. 222/2018). Mit genug einschlägiger Praxis kann man die Lehrabschlussprüfung auch ohne Lehrvertrag als außerordentliche Prüfung ablegen (§ 23 Abs. 5 Berufsausbildungsgesetz). Sie besteht aus Theorie, einer praktischen Prüfarbeit und einem Fachgespräch.</p>
<ul><li>Vorbereitungskurse bieten zum Beispiel WIFI und BFI an; die Wirtschaftskammer veröffentlicht einen Themenkatalog zur Vorbereitung.</li><li>Frag deine AMS-Beratung, ob ein Vorbereitungskurs gefördert werden kann.</li><li>Vergleiche den Themenkatalog mit deinem Stand in der Kompetenz-Checkliste oben; Hardware, Netzwerk, Server und Sicherheit übst du in dieser App.</li></ul>
<h4>Wo suchen</h4>
<ul><li>AMS „alle jobs“ (jobs.ams.at): AMS-Stellen und Stellen aus dem Internet in einer Suche, ohne Registrierung.</li><li>AMS eJob-Room für ein eigenes Bewerbungsprofil.</li><li>Jobbörsen wie karriere.at und StepStone sowie die Karriereseiten von IT-Dienstleistern in deiner Region.</li></ul>
<p class="micro">Stand 11/2026, allgemeine Information, keine Rechtsberatung. Quellen: WKO „Angabe des Mindestentgelts im Stelleninserat“ (wko.at), RIS: BGBl. II Nr. 222/2018 (ris.bka.gv.at), WKO-Themenkatalog Lehrabschlussprüfung Informationstechnologie, AMS „alle jobs“ (ams.at).</p>` },
 en: { t: 'Job hunting in Austria: salary in the ad, collective agreement, apprenticeship exam', html: `
<p>Most content in this app applies to Germany and Austria. Job hunting in Austria has a few special features.</p>
<h4>Salary in the job ad</h4>
<p>Every job ad in Austria must state the minimum pay under the collective agreement (or another rule) and say whether more may be paid (§ 9 (2) Equal Treatment Act, GlBG). "From €3,200 gross per month, willing to pay more" therefore means: this is the floor, and you negotiate above it.</p>
<ul><li>Monthly salaries are usually paid 14 times a year (holiday and Christmas bonus under the collective agreement). Compare offers from Germany by annual gross pay.</li><li>Many IT companies fall under the IT collective agreement (for employees of companies providing services in automatic data processing and information technology). IT jobs in industry, retail or electrical trades often have a different agreement. The WKO and the GPA union publish the salary tables.</li><li>In the interview, ask about the collective agreement, your grade, and whether on-call duty, overtime and travel time are paid extra or included in an all-in salary.</li></ul>
<h4>What Austrian ads often ask for in addition</h4>
<ul><li>A category B driving licence and willingness to work at customer sites or several locations.</li><li>Very good German and good English (vendor documentation, international companies).</li><li>Vendor knowledge that is often named: Microsoft 365, Cisco, HPE Aruba, LANCOM, Fortinet, Sophos, Barracuda, Palo Alto, Veeam.</li><li>Completed training (apprenticeship, HTL, college, degree) or equivalent experience with evidence.</li></ul>
<h4>Taking the apprenticeship exam as an adult</h4>
<p>The apprenticeship in information technology takes four years and has the specialisations system technology and operational technology (training regulation BGBl. II No. 222/2018). With enough relevant experience you can take the final apprenticeship exam (LAP) without an apprenticeship contract as an extraordinary exam (§ 23 (5) Vocational Training Act). It consists of theory, a practical exam task and a technical interview.</p>
<ul><li>Preparation courses are offered for example by WIFI and BFI; the Chamber of Commerce publishes a topic catalogue for preparation.</li><li>Ask your AMS adviser whether a preparation course can be funded.</li><li>Compare the topic catalogue with your status in the skills checklist above; you practise hardware, networking, servers and security in this app.</li></ul>
<h4>Where to search</h4>
<ul><li>AMS "alle jobs" (jobs.ams.at): AMS vacancies and jobs from the internet in one search, no registration.</li><li>AMS eJob-Room for your own applicant profile.</li><li>Job boards such as karriere.at and StepStone, plus the career pages of IT service providers in your region.</li></ul>
<p class="micro">As of 11/2026, general information, not legal advice. Sources: WKO "Angabe des Mindestentgelts im Stelleninserat" (wko.at), RIS: BGBl. II No. 222/2018 (ris.bka.gv.at), WKO topic catalogue for the IT apprenticeship exam, AMS "alle jobs" (ams.at).</p>` },
 fa: { t: 'کاریابی در اتریش: حقوق در آگهی، قرارداد جمعی (KV) و آزمون پایان دورهٔ کارآموزی', html: `
<p>بیشتر محتوای این برنامه برای آلمان و اتریش معتبر است. کاریابی در اتریش چند ویژگی خاص دارد.</p>
<h4>حقوق در آگهی شغلی</h4>
<p>هر آگهی شغلی در اتریش باید حداقل حقوق طبق قرارداد جمعی (Kollektivvertrag) یا مقررات دیگر را بنویسد و بگوید آیا پرداخت بیشتر ممکن است (بند ۲ مادهٔ ۹ قانون برابری رفتار، GlBG). پس «از ۳٬۲۰۰ یورو ناخالص در ماه، با آمادگی برای پرداخت بیشتر» یعنی: این کف حقوق است و دربارهٔ بالاتر از آن مذاکره می‌شود.</p>
<ul><li>حقوق ماهانه معمولاً ۱۴ بار در سال پرداخت می‌شود (پاداش مرخصی و کریسمس طبق قرارداد جمعی). پیشنهادهای آلمان را با حقوق ناخالص سالانه مقایسه کن.</li><li>بسیاری از شرکت‌های IT زیر قرارداد جمعی IT هستند («قرارداد جمعی کارمندان شرکت‌های خدمات پردازش خودکار داده و فناوری اطلاعات»). شغل‌های IT در صنعت، بازرگانی یا برق اغلب قرارداد جمعی دیگری دارند. جدول حقوق را WKO و اتحادیهٔ GPA منتشر می‌کنند.</li><li>در مصاحبه بپرس کدام قرارداد جمعی، کدام رده، و آیا آماده‌به‌کاری، اضافه‌کاری و زمان رفت‌وآمد جداگانه پرداخت می‌شود یا در حقوق All-in است.</li></ul>
<h4>آگهی‌های اتریش اغلب این‌ها را هم می‌خواهند</h4>
<ul><li>گواهی‌نامهٔ رانندگی B و آمادگی برای کار نزد مشتری یا در چند شعبه.</li><li>آلمانی خیلی خوب و انگلیسی خوب (مستندات سازنده‌ها، شرکت‌های بین‌المللی).</li><li>شناخت سازنده‌هایی که زیاد نام برده می‌شوند: Microsoft 365، Cisco، HPE Aruba، LANCOM، Fortinet، Sophos، Barracuda، Palo Alto، Veeam.</li><li>آموزش تمام‌شده (کارآموزی Lehre، HTL، Kolleg، دانشگاه) یا تجربهٔ هم‌ارز با مدرک.</li></ul>
<h4>گرفتن مدرک کارآموزی در بزرگسالی</h4>
<p>رشتهٔ کارآموزی فناوری اطلاعات (Informationstechnologie) چهار سال است و دو گرایش دارد: فناوری سیستم (Systemtechnik) و فناوری عملیات (Betriebstechnik)؛ آیین‌نامهٔ آموزش BGBl. II Nr. 222/2018. با تجربهٔ کافی در همین کار می‌توانی آزمون پایان دوره (LAP) را بدون قرارداد کارآموزی، به‌صورت آزمون فوق‌العاده بدهی (بند ۵ مادهٔ ۲۳ قانون آموزش حرفه‌ای، BAG). آزمون از بخش نظری، یک کار عملی و یک گفت‌وگوی تخصصی تشکیل می‌شود.</p>
<ul><li>دوره‌های آمادگی را مثلاً WIFI و BFI برگزار می‌کنند؛ اتاق بازرگانی (WKO) فهرست موضوع‌های آزمون را منتشر می‌کند.</li><li>از مشاور خود در AMS بپرس آیا هزینهٔ دورهٔ آمادگی قابل پشتیبانی است.</li><li>فهرست موضوع‌ها را با وضعیتت در چک‌لیست مهارت‌ها در بالا مقایسه کن؛ سخت‌افزار، شبکه، سرور و امنیت را در همین برنامه تمرین می‌کنی.</li></ul>
<h4>کجا جست‌وجو کنی</h4>
<ul><li>«alle jobs» از AMS (jobs.ams.at): آگهی‌های AMS و آگهی‌های اینترنت در یک جست‌وجو، بدون ثبت‌نام.</li><li>eJob-Room از AMS برای ساختن پروفایل درخواست‌کننده.</li><li>سایت‌های کاریابی مثل karriere.at و StepStone و صفحهٔ استخدام شرکت‌های خدمات IT در منطقهٔ خودت.</li></ul>
<p class="micro">وضعیت ۱۱/۲۰۲۶، اطلاعات عمومی و نه مشاورهٔ حقوقی. منابع: WKO «Angabe des Mindestentgelts im Stelleninserat» (wko.at)، RIS: BGBl. II Nr. 222/2018 (ris.bka.gv.at)، فهرست موضوع‌های آزمون LAP فناوری اطلاعات از WKO، «alle jobs» از AMS (ams.at).</p>` }
});

/* ---------- Interviewfragen für Netzwerkstellen ---------- */
(J.interview = J.interview || []).push(
 { id: 'loop-iv', kind: 'tech', link: 'case:loop',
  de: { q: 'Im ganzen Stockwerk fällt plötzlich das Netz aus, die LEDs am Switch blinken alle hektisch. Was vermuten Sie und was tun Sie?', want: 'Netzwerkgrundlagen (Schleife, Spanning Tree) und richtiges Vorgehen bei vielen Betroffenen.', a: 'Viele Betroffene heißt hohe Priorität: Team informieren, Major Incident eröffnen. Das Bild passt zu einer Netzwerkschleife. Am Switch prüfe ich Broadcast-Zähler, Topologiewechsel und Log, finde den Port und folge dem Kabel; oft steckt ein Kabel doppelt in einem Mini-Switch. Ich entferne es, prüfe, dass sich das Netz erholt, dokumentiere und schlage BPDU Guard und Storm Control auf den Access-Ports als Change vor.' },
  en: { q: 'Suddenly the whole floor loses the network and all switch LEDs flash wildly. What do you suspect and what do you do?', want: 'Network basics (loop, spanning tree) and the right approach when many users are affected.', a: 'Many affected users means high priority: inform the team, open a major incident. The picture fits a network loop. On the switch I check broadcast counters, topology changes and the log, find the port and follow the cable; often one cable is plugged twice into a mini switch. I remove it, check the network recovers, document it and propose BPDU Guard and storm control on access ports as a change.' },
  fa: { q: 'ناگهان شبکهٔ کل طبقه قطع می‌شود و همهٔ چراغ‌های سوئیچ تند چشمک می‌زنند. چه حدسی می‌زنی و چه می‌کنی؟', want: 'پایه‌های شبکه (حلقه و Spanning Tree) و روش درست وقتی کاربران زیادی گرفتارند.', a: 'وقتی افراد زیادی گرفتارند، اولویت بالاست: تیم را خبر می‌کنم و Major Incident باز می‌کنم. این نشانه‌ها با حلقهٔ شبکه (Loop) جور است. روی سوئیچ شمارندهٔ Broadcast، تغییرات توپولوژی و لاگ را می‌بینم، پورت را پیدا می‌کنم و کابل را دنبال می‌کنم؛ اغلب یک کابل دو سرش در یک سوئیچ کوچک است. آن را جدا می‌کنم، بازگشت شبکه را می‌سنجم، مستند می‌کنم و BPDU Guard و Storm Control را روی پورت‌های Access به‌عنوان Change پیشنهاد می‌دهم.' } },
 { id: 'speed-iv', kind: 'tech', link: 'case:slowlink',
  de: { q: 'Ein Benutzer sagt: „Das Netz ist langsam.“ Wie finden und belegen Sie die Ursache?', want: 'Strukturierte Fehlersuche mit Messwerten statt Vermutungen.', a: 'Zuerst frage ich nach: seit wann, was genau ist langsam, nur er oder mehrere, Kabel oder WLAN. Dann messe ich: Link-Geschwindigkeit am Adapter, Fehlerzähler am Switch-Port und Durchsatz mit iPerf3 zu einem Testserver. Mit der Tauschmethode ändere ich jeweils nur eine Sache: Kabel, Port, Dock. Den Wert vorher und nachher schreibe ich ins Ticket, damit der Fall belegt ist.' },
  en: { q: 'A user says: "The network is slow." How do you find and prove the cause?', want: 'Structured troubleshooting with measurements instead of guesses.', a: 'First I ask: since when, what exactly is slow, only them or several people, cable or Wi-Fi. Then I measure: link speed on the adapter, error counters on the switch port and throughput with iPerf3 to a test server. With the swap method I change only one thing at a time: cable, port, dock. I write the before and after values into the ticket so the case is proven.' },
  fa: { q: 'کاربری می‌گوید: «شبکه کند است.» علت را چطور پیدا و ثابت می‌کنی؟', want: 'عیب‌یابی منظم با اندازه‌گیری به‌جای حدس.', a: 'اول می‌پرسم: از کی، دقیقاً چه چیزی کند است، فقط او یا چند نفر، کابل یا WLAN. بعد اندازه می‌گیرم: سرعت لینک روی کارت شبکه، شمارندهٔ خطا روی پورت سوئیچ و توان عبور با iPerf3 تا یک سرور آزمایشی. با روش جایگزینی هر بار فقط یک چیز را عوض می‌کنم: کابل، پورت یا Dock. عدد پیش و پس را در تیکت می‌نویسم تا مورد ثابت شود.' } },
 { id: 'plan-iv', kind: 'tech', link: 'kurs:k-plan/plan-bedarf',
  de: { q: 'Sie sollen das Netz für eine Firma mit 40 Arbeitsplätzen neu planen. Wie gehen Sie vor?', want: 'Strukturiertes Vorgehen von den Anforderungen bis zur Übergabe.', a: 'Zuerst nehme ich die Anforderungen auf: Arbeitsplätze, Geräte, Standorte, nötige Verfügbarkeit, Sicherheit, Budget und rechtliche Pflichten. Daraus entsteht ein Netzplan mit VLANs, zum Beispiel Clients, Server, Drucker, Telefonie, Gäste und Verwaltung, und ein IP-Plan. Ich prüfe PoE-Budget, Verkabelung, WLAN-Abdeckung und USV, rechne Anschaffung und Betriebskosten und lege einen Zeitplan mit Wartungsfenster und Rückfallplan fest. Am Ende stehen Tests, Abnahme und eine Dokumentation für den Betrieb.' },
  en: { q: 'You are asked to plan the network for a company with 40 workstations from scratch. How do you proceed?', want: 'A structured approach from requirements to handover.', a: 'First I gather requirements: workstations, devices, sites, required availability, security, budget and legal duties. From that I create a network diagram with VLANs, for example clients, servers, printers, telephony, guests and management, and an IP plan. I check PoE budget, cabling, Wi-Fi coverage and UPS, calculate purchase and running costs and set a schedule with a maintenance window and rollback plan. It ends with tests, acceptance and documentation for operations.' },
  fa: { q: 'از تو می‌خواهند شبکهٔ شرکتی با ۴۰ میز کار را از نو طراحی کنی. چطور پیش می‌روی؟', want: 'روش منظم از نیازها تا تحویل.', a: 'اول نیازها را جمع می‌کنم: تعداد میزها، دستگاه‌ها، شعبه‌ها، دسترس‌پذیری لازم، امنیت، بودجه و تکلیف‌های قانونی. از آن نقشهٔ شبکه با VLANها می‌سازم، مثلاً کلاینت‌ها، سرورها، چاپگرها، تلفن، مهمان و مدیریت، و یک طرح IP. بودجهٔ PoE، کابل‌کشی، پوشش WLAN و UPS را بررسی می‌کنم، هزینهٔ خرید و نگهداری را حساب می‌کنم و زمان‌بندی با پنجرهٔ نگهداری و طرح بازگشت می‌گذارم. در پایان آزمون، تحویل و مستندات برای راهبری می‌آید.' } }
);

/* ---------- Typische Netzwerkstörungen im Betrieb ---------- */
window.LAB.workCases = (window.LAB.workCases || []).concat([
{
 id: 'loop', area: 'network', fixArea: 'netz', prio: 1, roles: ['onsite', 'admin', 'net'], lessons: ['networking', 'vendor-switches'], ch: ['k-net/net-stp-lacp', 'k-plan/plan-sicherheit'],
 cmd: '! Cisco IOS: Wo laufen Broadcasts und Topologiewechsel auf?\nshow interfaces counters\nshow spanning-tree detail | include ieee|occurr|from\nshow logging | include LOOP|BPDU|err-disable\n! Schutz nach der Reparatur (nur Access-Ports, als Change):\ninterface range gi1/0/1-44\n spanning-tree portfast\n spanning-tree bpduguard enable\n storm-control broadcast level 1.00',
 de: {
  t: 'Ganzes Stockwerk ohne Netz, Switch-LEDs blinken hektisch',
  msg: '„Seit zehn Minuten geht im 2. Stock gar nichts mehr: kein Internet, kein Drucker, Teams bricht ab. Im 1. Stock läuft alles.“',
  ask: ['Seit wann genau, und betrifft es alle Arbeitsplätze im Stockwerk oder nur einen Raum?', 'Wurde heute etwas umgebaut oder angesteckt (Umzug, neuer Drucker, kleiner Switch unter dem Tisch)?', 'Blinken am Etagenverteiler oder an einem Mini-Switch alle Port-LEDs gleichzeitig und schnell?', 'Funktionieren WLAN-Geräte im selben Stockwerk?'],
  steps: ['Als P1 behandeln: viele Benutzer betroffen. Team informieren und einen Major Incident eröffnen.', 'Am Etagenswitch Zähler und Log prüfen: sehr hohe Broadcast-Raten, „MAC flapping“ oder viele Topologiewechsel deuten auf eine Schleife.', 'Über die Topologiewechsel („from …“) den Port finden und dem Kabel bis zum Ende folgen.', 'Vor Ort die Ursache suchen: oft ein Patchkabel, das mit beiden Enden im selben Mini-Switch oder in zwei Wanddosen steckt.', 'Kabel oder Mini-Switch entfernen oder den Port abschalten; prüfen, dass die Broadcast-Rate sofort fällt.', 'Dauerhaft absichern: PortFast mit BPDU Guard und Storm Control auf den Access-Ports als Change beantragen, nicht genehmigte Mini-Switches einziehen.'],
  fix: 'Ein Mitarbeiter hatte beim Umstecken ein Patchkabel von seinem Mini-Switch zurück in die zweite Wanddose gesteckt. Auf den Access-Ports war kein Schleifenschutz aktiv, so entstand eine Schleife. Kabel entfernt, das Netz lief sofort wieder; danach wurde BPDU Guard auf allen Access-Ports eingerichtet.',
  verify: 'Broadcast-Zähler am Etagenswitch wieder normal, keine neuen Topologiewechsel im Log, Ping von drei Arbeitsplätzen zum Gateway ohne Verlust, Teams-Testanruf stabil.',
  note: 'MI-0412 2. OG ohne Netz 09:40–10:05. Ursache: Schleife über Mini-Switch Raum 2.14 (Kabel zwischen Dose 2.14-03 und 2.14-04). Kabel entfernt, Mini-Switch eingezogen. Folge-Change CHG-0419: PortFast, BPDU Guard, Storm Control auf Access-Ports. Gelöst.',
  say: '„Das Netz läuft wieder. Ein versehentlich doppelt eingestecktes Kabel hat den ganzen Stock lahmgelegt. Bitte keine eigenen Switches anschließen oder Kabel umstecken – rufen Sie uns einfach an.“',
  esc: 'Sofort an das Netzwerkteam, wenn du keinen Zugriff auf die Switches hast, mehrere Stockwerke betroffen sind oder die Schleife über Uplink- bzw. Core-Ports läuft.',
  boss: 'Bei vielen Betroffenen zuerst den Betrieb wiederherstellen und informieren, danach die Ursache dauerhaft abstellen und als Change dokumentieren.'
 },
 en: {
  t: 'Whole floor without network, switch LEDs flashing wildly',
  msg: '"For ten minutes nothing has worked on the 2nd floor: no internet, no printer, Teams keeps dropping. The 1st floor is fine."',
  ask: ['Since when exactly, and does it affect every desk on the floor or only one room?', 'Was anything moved or plugged in today (move, new printer, small switch under a desk)?', 'Are all port LEDs on the floor distributor or a mini switch flashing fast and in sync?', 'Do Wi-Fi devices on the same floor work?'],
  steps: ['Treat it as P1: many users affected. Inform the team and open a major incident.', 'Check counters and log on the floor switch: very high broadcast rates, "MAC flapping" or many topology changes point to a loop.', 'Use the topology changes ("from …") to find the port and follow the cable to its end.', 'Find the cause on site: often a patch cable with both ends in the same mini switch or in two wall sockets.', 'Remove the cable or mini switch or shut the port; check that the broadcast rate drops immediately.', 'Secure it for good: request PortFast with BPDU Guard and storm control on access ports as a change, collect unapproved mini switches.'],
  fix: 'While re-plugging, an employee had connected a patch cable from his mini switch back into the second wall socket. No loop protection was active on the access ports, so a loop formed. Cable removed, the network worked again at once; afterwards BPDU Guard was enabled on all access ports.',
  verify: 'Broadcast counters on the floor switch back to normal, no new topology changes in the log, ping from three desks to the gateway without loss, Teams test call stable.',
  note: 'MI-0412 2nd floor without network 09:40–10:05. Cause: loop via mini switch room 2.14 (cable between sockets 2.14-03 and 2.14-04). Cable removed, mini switch collected. Follow-up change CHG-0419: PortFast, BPDU Guard, storm control on access ports. Resolved.',
  say: '"The network is back. A cable that was accidentally plugged in twice brought the whole floor down. Please don\'t connect your own switches or re-plug cables – just call us."',
  esc: 'Immediately to the network team if you have no access to the switches, several floors are affected or the loop runs over uplink or core ports.',
  boss: 'With many affected users, restore service and inform people first, then remove the cause for good and document it as a change.'
 },
 fa: {
  t: 'شبکهٔ کل طبقه قطع است و چراغ‌های سوئیچ تند چشمک می‌زنند',
  msg: '«ده دقیقه است در طبقهٔ دوم هیچ چیز کار نمی‌کند: اینترنت نیست، چاپگر نیست، Teams قطع می‌شود. طبقهٔ اول مشکلی ندارد.»',
  ask: ['دقیقاً از کی، و همهٔ میزهای طبقه گرفتارند یا فقط یک اتاق؟', 'امروز چیزی جابه‌جا یا وصل شده است (اسباب‌کشی، چاپگر تازه، سوئیچ کوچک زیر میز)؟', 'روی سوئیچ طبقه یا یک سوئیچ کوچک، همهٔ چراغ‌های پورت با هم و تند چشمک می‌زنند؟', 'دستگاه‌های WLAN در همین طبقه کار می‌کنند؟'],
  steps: ['آن را P1 بدان: کاربران زیادی گرفتارند. تیم را خبر کن و Major Incident باز کن.', 'روی سوئیچ طبقه شمارنده‌ها و لاگ را ببین: Broadcast بسیار زیاد، «MAC flapping» یا تغییرات پیاپی توپولوژی نشانهٔ حلقه است.', 'با کمک تغییرات توپولوژی («from …») پورت را پیدا کن و کابل را تا انتها دنبال کن.', 'علت را در محل پیدا کن: اغلب یک کابل Patch که دو سرش در یک سوئیچ کوچک یا در دو پریز دیواری است.', 'کابل یا سوئیچ کوچک را جدا کن یا پورت را خاموش کن؛ ببین که Broadcast فوراً پایین می‌آید.', 'برای همیشه ایمن کن: PortFast با BPDU Guard و Storm Control را روی پورت‌های Access به‌صورت Change درخواست کن و سوئیچ‌های کوچک بی‌مجوز را جمع کن.'],
  fix: 'یکی از همکاران هنگام جابه‌جایی، یک کابل Patch را از سوئیچ کوچکش دوباره به پریز دیواری دوم زده بود. روی پورت‌های Access محافظت در برابر حلقه فعال نبود و حلقه ساخته شد. کابل جدا شد و شبکه فوراً برگشت؛ بعد BPDU Guard روی همهٔ پورت‌های Access فعال شد.',
  verify: 'شمارندهٔ Broadcast روی سوئیچ طبقه عادی است، تغییر توپولوژی تازه‌ای در لاگ نیست، Ping از سه میز تا Gateway بدون افت است و تماس آزمایشی Teams پایدار است.',
  note: 'MI-0412 طبقهٔ دوم بی‌شبکه ۰۹:۴۰ تا ۱۰:۰۵. علت: حلقه از راه سوئیچ کوچک اتاق 2.14 (کابل میان پریز 2.14-03 و 2.14-04). کابل جدا و سوئیچ کوچک جمع شد. Change بعدی CHG-0419: PortFast، BPDU Guard و Storm Control روی پورت‌های Access. حل شد.',
  say: '«شبکه برگشت. یک کابل که اشتباهی دو بار وصل شده بود کل طبقه را از کار انداخت. لطفاً سوئیچ شخصی وصل نکنید و کابل‌ها را جابه‌جا نکنید؛ کافی است به ما زنگ بزنید.»',
  esc: 'فوراً به تیم شبکه، اگر به سوئیچ‌ها دسترسی نداری، چند طبقه گرفتارند یا حلقه از پورت‌های Uplink یا Core می‌گذرد.',
  boss: 'وقتی افراد زیادی گرفتارند، اول کار را برگردان و خبر بده، بعد علت را برای همیشه برطرف کن و به‌صورت Change مستند کن.'
 }
},
{
 id: 'rogue-dhcp', area: 'network', fixArea: 'netz', prio: 2, roles: ['helpdesk', 'onsite', 'admin', 'net'], lessons: ['dhcp', 'networking'], ch: ['k-net/net-subnet', 'k-plan/plan-sicherheit'],
 cmd: 'ipconfig /all | findstr /i "DHCP IPv4 Gateway"\narp -a | findstr 192.168.0.1\n! Cisco: Port der fremden MAC finden und DHCP Snooping einschalten (Change)\nshow mac address-table address 9c53.22aa.0f10\nip dhcp snooping\nip dhcp snooping vlan 10\ninterface gi1/0/48\n ip dhcp snooping trust',
 de: {
  t: 'Mehrere PCs bekommen 192.168.0.x und kein Internet',
  msg: '„Seit der Mittagspause kommen drei von uns nicht mehr ins Netzlaufwerk und ins Internet. Neustart hilft nicht.“',
  ask: ['Wie viele Arbeitsplätze, in welchem Raum oder Stockwerk?', 'Hat jemand ein eigenes Gerät angesteckt (WLAN-Router, Repeater, Testgerät)?', 'Welche IP-Adresse, welches Gateway und welchen DHCP-Server zeigt ipconfig /all?', 'Geht es über WLAN oder an einem anderen Anschluss?'],
  steps: ['Bei einem betroffenen PC ipconfig /all lesen und Adresse, Gateway und „DHCP-Server“ notieren.', 'Mit dem IP-Plan vergleichen: Das Firmennetz nutzt 10.20.10.0/24; 192.168.0.x mit Gateway 192.168.0.1 gehört nicht dazu, also antwortet ein fremder DHCP-Server.', 'Die MAC-Adresse des fremden Servers mit arp -a ermitteln und am Switch in der MAC-Tabelle den Port suchen.', 'Gerät abstecken oder Port abschalten; die betroffenen PCs mit ipconfig /release und ipconfig /renew neu versorgen.', 'Gerät dem Besitzer zurückgeben, sachlich erklären und die Teamleitung informieren.', 'Dauerhaft: DHCP Snooping auf den Access-Switches einschalten und nur die Ports zum echten DHCP-Server als vertrauenswürdig markieren (Change).'],
  fix: 'Ein Kollege hatte seinen privaten WLAN-Router an die Wanddose gesteckt, weil das WLAN im Raum schwach ist. Der Router verteilte als DHCP-Server Adressen aus 192.168.0.0/24. Router abgesteckt, PCs neu versorgt; DHCP Snooping wurde danach eingeführt und ein zusätzlicher Access Point geplant.',
  verify: 'Alle betroffenen PCs haben wieder Adressen aus 10.20.10.0/24 mit Gateway 10.20.10.1, Netzlaufwerk und Internet funktionieren, die Leases erscheinen im DHCP-Server.',
  note: 'INC-0533 3 PCs Raum 1.07 mit 192.168.0.x. Ursache: privater WLAN-Router an Dose 1.07-02 als fremder DHCP-Server. Router entfernt, Benutzer informiert, ipconfig /renew an 3 PCs. Folge: DHCP Snooping (CHG-0540), AP-Abdeckung Raum 1.07 prüfen. Gelöst.',
  say: '„Ein privater Router hat Ihren PCs falsche Adressen gegeben. Wir haben ihn abgesteckt, jetzt läuft alles wieder. Wenn das WLAN zu schwach ist, melden Sie das bitte – wir prüfen dann einen zusätzlichen Access Point.“',
  esc: 'An die IT-Sicherheit, wenn das fremde Gerät niemandem zugeordnet werden kann oder versteckt angeschlossen war; an das Netzwerkteam für DHCP Snooping.',
  boss: 'Fremde Geräte im Firmennetz ernst nehmen: Gerät und Ursache dokumentieren, Benutzer sachlich aufklären und eine technische Sperre vorschlagen.'
 },
 en: {
  t: 'Several PCs get 192.168.0.x and no internet',
  msg: '"Since the lunch break three of us can\'t reach the network drive or the internet. Restarting doesn\'t help."',
  ask: ['How many desks, in which room or floor?', 'Did anyone plug in their own device (Wi-Fi router, repeater, test device)?', 'Which IP address, gateway and DHCP server does ipconfig /all show?', 'Does it work over Wi-Fi or on another socket?'],
  steps: ['On an affected PC read ipconfig /all and note address, gateway and "DHCP server".', 'Compare with the IP plan: the company network uses 10.20.10.0/24; 192.168.0.x with gateway 192.168.0.1 is not part of it, so a foreign DHCP server is answering.', 'Get the MAC address of the foreign server with arp -a and look up the port in the switch MAC table.', 'Unplug the device or shut the port; renew the affected PCs with ipconfig /release and ipconfig /renew.', 'Return the device to its owner, explain calmly and inform the team lead.', 'For good: enable DHCP snooping on the access switches and mark only the ports towards the real DHCP server as trusted (change).'],
  fix: 'A colleague had plugged his private Wi-Fi router into the wall socket because Wi-Fi in the room is weak. The router handed out addresses from 192.168.0.0/24 as a DHCP server. Router unplugged, PCs renewed; DHCP snooping was introduced afterwards and an extra access point planned.',
  verify: 'All affected PCs have addresses from 10.20.10.0/24 with gateway 10.20.10.1 again, network drive and internet work, the leases appear in the DHCP server.',
  note: 'INC-0533 3 PCs room 1.07 with 192.168.0.x. Cause: private Wi-Fi router on socket 1.07-02 acting as rogue DHCP server. Router removed, user informed, ipconfig /renew on 3 PCs. Follow-up: DHCP snooping (CHG-0540), check AP coverage room 1.07. Resolved.',
  say: '"A private router gave your PCs wrong addresses. We unplugged it and everything works again. If the Wi-Fi is too weak, please report it – we will look into an additional access point."',
  esc: 'To IT security if the foreign device cannot be assigned to anyone or was connected in a hidden way; to the network team for DHCP snooping.',
  boss: 'Take foreign devices on the company network seriously: document device and cause, inform the user calmly and propose a technical block.'
 },
 fa: {
  t: 'چند رایانه نشانی 192.168.0.x می‌گیرند و اینترنت ندارند',
  msg: '«از بعد از ناهار سه نفر از ما به درایو شبکه و اینترنت دسترسی نداریم. راه‌اندازی دوباره هم فایده ندارد.»',
  ask: ['چند میز، در کدام اتاق یا طبقه؟', 'کسی دستگاه شخصی وصل کرده است (روتر WLAN، تقویت‌کننده، دستگاه آزمایشی)؟', 'ipconfig /all چه نشانی IP، چه Gateway و چه سرور DHCP نشان می‌دهد؟', 'با WLAN یا از پریز دیگر کار می‌کند؟'],
  steps: ['روی یکی از رایانه‌های گرفتار ipconfig /all را بخوان و نشانی، Gateway و «DHCP Server» را یادداشت کن.', 'با طرح IP مقایسه کن: شبکهٔ شرکت 10.20.10.0/24 است؛ 192.168.0.x با Gateway 192.168.0.1 جزو آن نیست، پس یک سرور DHCP بیگانه جواب می‌دهد.', 'نشانی MAC آن سرور را با arp -a پیدا کن و پورتش را در جدول MAC سوئیچ بیاب.', 'دستگاه را جدا کن یا پورت را خاموش کن؛ رایانه‌های گرفتار را با ipconfig /release و ipconfig /renew دوباره نشانی بده.', 'دستگاه را به صاحبش برگردان، آرام توضیح بده و سرپرست تیم را خبر کن.', 'برای همیشه: DHCP Snooping را روی سوئیچ‌های Access روشن کن و فقط پورت‌های رو به سرور DHCP واقعی را قابل‌اعتماد (trusted) بگذار (Change).'],
  fix: 'یکی از همکاران روتر WLAN شخصی‌اش را به پریز دیواری زده بود، چون WLAN اتاق ضعیف است. روتر به‌عنوان سرور DHCP نشانی‌هایی از 192.168.0.0/24 پخش می‌کرد. روتر جدا و رایانه‌ها دوباره نشانی گرفتند؛ بعد DHCP Snooping راه افتاد و یک Access Point اضافه برنامه‌ریزی شد.',
  verify: 'همهٔ رایانه‌های گرفتار دوباره نشانی از 10.20.10.0/24 با Gateway 10.20.10.1 دارند، درایو شبکه و اینترنت کار می‌کنند و Leaseها در سرور DHCP دیده می‌شوند.',
  note: 'INC-0533 سه رایانه در اتاق 1.07 با 192.168.0.x. علت: روتر WLAN شخصی روی پریز 1.07-02 به‌عنوان سرور DHCP بیگانه. روتر جدا شد، کاربر آگاه شد، ipconfig /renew روی ۳ رایانه. پیگیری: DHCP Snooping (CHG-0540)، بررسی پوشش AP در اتاق 1.07. حل شد.',
  say: '«یک روتر شخصی به رایانه‌هایتان نشانی اشتباه داده بود. آن را جدا کردیم و حالا همه چیز کار می‌کند. اگر WLAN ضعیف است، لطفاً خبر بدهید تا یک Access Point اضافه بررسی کنیم.»',
  esc: 'به امنیت IT، اگر دستگاه بیگانه به هیچ‌کس تعلق ندارد یا پنهانی وصل شده بود؛ به تیم شبکه برای DHCP Snooping.',
  boss: 'دستگاه بیگانه در شبکهٔ شرکت را جدی بگیر: دستگاه و علت را مستند کن، کاربر را آرام آگاه کن و یک مانع فنی پیشنهاد بده.'
 }
},
{
 id: 'slowlink', area: 'network', fixArea: 'netz', prio: 3, roles: ['helpdesk', 'onsite', 'net'], lessons: ['networking', 'hardware'], ch: ['k-cli/cli-cabling', 'k-tools/tools-iperf', 'k-plan/plan-physik'],
 cmd: 'Get-NetAdapter | Select-Object Name,Status,LinkSpeed,FullDuplex\n# Durchsatz zum Testserver messen (dort läuft „iperf3 -s“)\niperf3 -c 10.20.30.15 -t 10\n! Cisco: Geschwindigkeit, Duplex und Fehler am Port\nshow interfaces gi1/0/17 | include duplex|errors|CRC',
 de: {
  t: 'Dateien vom Server laden ewig, das Netz wirkt „zäh“',
  msg: '„Seit ich an den neuen Platz umgezogen bin, dauert das Öffnen der CAD-Dateien Minuten. Bei der Kollegin nebenan geht es schnell.“',
  ask: ['Seit wann genau, und was hat sich geändert (Platz, Kabel, Dock)?', 'Ist nur das Öffnen großer Dateien langsam oder alles?', 'Kabel oder WLAN? Hängt ein Dock oder ein USB-Netzwerkadapter dazwischen?', 'Ist es mit demselben Notebook am Nachbarplatz auch langsam?'],
  steps: ['Link-Geschwindigkeit am Gerät ablesen (Get-NetAdapter): 100 Mbit/s statt 1 Gbit/s ist ein deutlicher Hinweis.', 'Am Switch-Port Geschwindigkeit, Duplex und Fehlerzähler (CRC, Input Errors) prüfen.', 'Tauschmethode: anderes Patchkabel, anderer Port, Notebook ohne Dock – immer nur eine Sache ändern.', 'Durchsatz vorher und nachher mit iPerf3 messen, damit die Verbesserung belegt ist.', 'Liegt es an der Wanddose: Dose und Verlegekabel mit einem Kabeltester prüfen lassen. Fehlen zwei Adernpaare, schafft die Verbindung nur 100 Mbit/s.', 'Defekte Dose mit Raum- und Dosennummer an Haustechnik oder Elektriker melden und im Netzplan als defekt markieren.'],
  fix: 'Die Wanddose 3.02-05 war fehlerhaft aufgelegt: zwei Adernpaare hatten keinen Kontakt, daher nur 100 Mbit/s mit vielen CRC-Fehlern. Benutzer vorübergehend an Dose 3.02-06 angeschlossen (1 Gbit/s, keine Fehler), Dose zur Reparatur gemeldet.',
  verify: 'Link 1 Gbit/s Vollduplex, iPerf3 vorher 94 Mbit/s, nachher 940 Mbit/s, Fehlerzähler am Port bleiben bei 0, CAD-Datei öffnet in wenigen Sekunden.',
  note: 'INC-0611 langsamer Zugriff Platz 3.02. Ursache: Dose 3.02-05 nur 100 Mbit/s (2 Adernpaare ohne Kontakt, CRC-Fehler an gi1/0/17). Umgesteckt auf 3.02-06, iPerf3 94 → 940 Mbit/s. Dose an Haustechnik (Auftrag 2231). Gelöst, Folgeauftrag offen.',
  say: '„Ihre Netzwerkdose war defekt und hat nur ein Zehntel der Geschwindigkeit geschafft. Ich habe Sie an die Dose daneben angeschlossen; die alte wird repariert. Jetzt sollte alles wieder schnell sein.“',
  esc: 'An Haustechnik oder Elektriker für Arbeiten an der festen Verkabelung; an das Netzwerkteam, wenn der Switch-Port selbst Fehler zeigt oder viele Plätze betroffen sind.',
  boss: 'Mit Messwerten statt Gefühl arbeiten: Link-Geschwindigkeit und Durchsatz vorher und nachher dokumentieren, damit der Fall nachvollziehbar ist.'
 },
 en: {
  t: 'Loading files from the server takes forever, the network feels "sluggish"',
  msg: '"Since I moved to the new desk, opening the CAD files takes minutes. For my colleague next to me it is fast."',
  ask: ['Since when exactly, and what changed (desk, cable, dock)?', 'Is only opening large files slow, or everything?', 'Cable or Wi-Fi? Is there a dock or USB network adapter in between?', 'Is it slow with the same notebook at the neighbouring desk too?'],
  steps: ['Read the link speed on the device (Get-NetAdapter): 100 Mbit/s instead of 1 Gbit/s is a clear hint.', 'Check speed, duplex and error counters (CRC, input errors) on the switch port.', 'Swap method: different patch cable, different port, notebook without dock – change only one thing at a time.', 'Measure throughput before and after with iPerf3 so the improvement is proven.', 'If the wall socket is the cause: have the socket and installed cable checked with a cable tester. If two pairs are missing, the link only manages 100 Mbit/s.', 'Report the faulty socket with room and socket number to facilities or the electrician and mark it as faulty in the network diagram.'],
  fix: 'Wall socket 3.02-05 was terminated incorrectly: two wire pairs had no contact, so only 100 Mbit/s with many CRC errors. User temporarily connected to socket 3.02-06 (1 Gbit/s, no errors), socket reported for repair.',
  verify: 'Link 1 Gbit/s full duplex, iPerf3 before 94 Mbit/s, after 940 Mbit/s, error counters on the port stay at 0, the CAD file opens in a few seconds.',
  note: 'INC-0611 slow access desk 3.02. Cause: socket 3.02-05 only 100 Mbit/s (2 pairs without contact, CRC errors on gi1/0/17). Moved to 3.02-06, iPerf3 94 → 940 Mbit/s. Socket passed to facilities (order 2231). Resolved, follow-up open.',
  say: '"Your network socket was faulty and only managed a tenth of the speed. I connected you to the socket next to it; the old one will be repaired. Everything should be fast again now."',
  esc: 'To facilities or the electrician for work on the fixed cabling; to the network team if the switch port itself shows errors or many desks are affected.',
  boss: 'Work with measurements, not gut feeling: document link speed and throughput before and after so the case can be followed.'
 },
 fa: {
  t: 'بارگیری فایل از سرور خیلی طول می‌کشد و شبکه «کند» به نظر می‌رسد',
  msg: '«از وقتی به میز تازه رفته‌ام، باز کردن فایل‌های CAD چند دقیقه طول می‌کشد. برای همکار کناری‌ام سریع است.»',
  ask: ['دقیقاً از کی، و چه چیزی عوض شده (میز، کابل، Dock)؟', 'فقط باز کردن فایل‌های بزرگ کند است یا همه چیز؟', 'کابل یا WLAN؟ Dock یا کارت شبکهٔ USB در میان هست؟', 'با همین نوت‌بوک سر میز کناری هم کند است؟'],
  steps: ['سرعت لینک را روی دستگاه بخوان (Get-NetAdapter): ۱۰۰ مگابیت به‌جای ۱ گیگابیت نشانهٔ روشنی است.', 'روی پورت سوئیچ سرعت، Duplex و شمارنده‌های خطا (CRC و Input Errors) را بررسی کن.', 'روش جایگزینی: کابل Patch دیگر، پورت دیگر، نوت‌بوک بدون Dock؛ هر بار فقط یک چیز را عوض کن.', 'توان عبور را پیش و پس با iPerf3 اندازه بگیر تا بهبود ثابت شود.', 'اگر پریز دیواری مقصر است: پریز و کابل ثابت را با تستر کابل بررسی کن. اگر دو زوج سیم وصل نباشند، لینک فقط ۱۰۰ مگابیت می‌گیرد.', 'پریز خراب را با شمارهٔ اتاق و پریز به واحد تأسیسات یا برق‌کار گزارش بده و در نقشهٔ شبکه خراب علامت بزن.'],
  fix: 'پریز دیواری 3.02-05 درست بسته نشده بود: دو زوج سیم تماس نداشتند، پس فقط ۱۰۰ مگابیت با خطاهای CRC فراوان. کاربر موقتاً به پریز 3.02-06 وصل شد (۱ گیگابیت، بدون خطا) و پریز برای تعمیر گزارش شد.',
  verify: 'لینک ۱ گیگابیت Full Duplex، iPerf3 پیش از تعمیر ۹۴ و پس از آن ۹۴۰ مگابیت، شمارنده‌های خطای پورت صفر می‌مانند و فایل CAD در چند ثانیه باز می‌شود.',
  note: 'INC-0611 دسترسی کند میز 3.02. علت: پریز 3.02-05 فقط ۱۰۰ مگابیت (۲ زوج بدون تماس، خطای CRC روی gi1/0/17). جابه‌جا به 3.02-06، iPerf3 از ۹۴ به ۹۴۰ مگابیت. پریز به تأسیسات (سفارش 2231). حل شد، پیگیری باز.',
  say: '«پریز شبکهٔ شما خراب بود و فقط یک‌دهم سرعت را می‌داد. شما را به پریز کناری وصل کردم و پریز قبلی تعمیر می‌شود. حالا باید همه چیز دوباره سریع باشد.»',
  esc: 'به تأسیسات یا برق‌کار برای کار روی کابل‌کشی ثابت؛ به تیم شبکه، اگر خود پورت سوئیچ خطا نشان می‌دهد یا میزهای زیادی گرفتارند.',
  boss: 'با عدد کار کن، نه با حس: سرعت لینک و توان عبور را پیش و پس مستند کن تا مورد قابل پیگیری باشد.'
 }
},
{
 id: 'poe', area: 'network', fixArea: 'netz', prio: 2, roles: ['onsite', 'admin', 'net'], lessons: ['vendor-switches'], ch: ['k-plan/plan-physik', 'k-net/net-wlan'],
 cmd: '! Cisco: PoE-Budget und Verbrauch pro Port\nshow power inline\nshow power inline gi1/0/24 detail\nshow logging | include ILPOWER\n! HPE Aruba CX (Beispiel)\nshow power-over-ethernet',
 de: {
  t: 'Neue Access Points oder IP-Telefone bleiben dunkel',
  msg: '„Wir haben im Lager vier neue Access Points montiert. Zwei leuchten, zwei bleiben aus. Die Kabel sind neu.“',
  ask: ['An welchem Switch und welchen Ports hängen die Geräte?', 'Welches Modell genau, und welchen Leistungsbedarf nennt das Datenblatt?', 'Hängen am selben Switch weitere PoE-Geräte, zum Beispiel Kameras oder Telefone?', 'Leuchtet die Port-LED am Switch? Läuft das Gerät mit einem PoE-Injektor?'],
  steps: ['Am Switch das PoE-Budget ansehen: verfügbare Leistung, verbrauchte Leistung, Reserve.', 'Port-Status der dunklen Geräte prüfen: abgeschaltet wegen fehlender Leistung, Fehler oder gar kein Link.', 'Im Log nach PoE-Meldungen suchen (zu wenig Leistung, Überlast).', 'Gegenprobe: Gerät mit PoE-Injektor am selben Kabel testen. Läuft es, ist das Kabel in Ordnung und das Budget das Problem.', 'Kurzfristig: Geräte auf einen Switch mit freier PoE-Leistung verteilen oder Port-Prioritäten setzen (Access Points vor unkritischen Geräten).', 'Dauerhaft: PoE-Budget im Netzplan nachrechnen und einen Switch mit größerem Netzteil oder einen zweiten Switch einplanen.'],
  fix: 'Der Lager-Switch hat 195 W PoE-Budget. Kameras und Telefone belegten schon 140 W; vier Access Points mit je bis zu 25 W hätten 100 W gebraucht. Sechs Kameras (zusammen 78 W) wurden auf den zweiten Switch umgesteckt, jetzt laufen alle Access Points mit 33 W Reserve. Für weitere Geräte wurde ein Switch mit 370 W beantragt.',
  verify: 'Alle vier Access Points sind im Controller online, show power inline zeigt mehr als 30 W Reserve, keine PoE-Meldungen im Log, die WLAN-Messung im Lager zeigt die geplante Abdeckung.',
  note: 'INC-0702 AP-L03/L04 ohne Strom. Ursache: PoE-Budget SW-LAGER-1 (195 W) erschöpft. 6 Kameras auf SW-LAGER-2 umgesteckt, alle APs online, Reserve 33 W. Beschaffungsantrag Switch 370 W PoE. Netzplan und PoE-Rechnung aktualisiert. Gelöst.',
  say: '„Die Access Points sind in Ordnung, der Switch hatte nur nicht genug Strom für alle Geräte. Ich habe die Last verteilt, jetzt laufen alle. Für weitere Geräte bestellen wir einen stärkeren Switch.“',
  esc: 'An Netzwerkteam oder Beschaffung, wenn Hardware fehlt; an den Elektriker, wenn im Verteilerschrank keine Steckdose oder USV-Leistung mehr frei ist.',
  boss: 'Neue Geräte nicht nur „anstecken“: Leistungsbedarf vorher mit dem PoE-Budget abgleichen und den Netzplan aktuell halten.'
 },
 en: {
  t: 'New access points or IP phones stay dark',
  msg: '"We mounted four new access points in the warehouse. Two light up, two stay off. The cables are new."',
  ask: ['On which switch and ports are the devices connected?', 'Which model exactly, and what power does the data sheet state?', 'Are other PoE devices on the same switch, for example cameras or phones?', 'Is the port LED on the switch lit? Does the device run with a PoE injector?'],
  steps: ['Look at the PoE budget on the switch: available power, used power, reserve.', 'Check the port status of the dark devices: off due to missing power, faulty, or no link at all.', 'Search the log for PoE messages (not enough power, overload).', 'Cross-check: test the device with a PoE injector on the same cable. If it runs, the cable is fine and the budget is the problem.', 'Short term: move devices to a switch with free PoE power or set port priorities (access points before non-critical devices).', 'For good: recalculate the PoE budget in the network plan and plan a switch with a larger power supply or a second switch.'],
  fix: 'The warehouse switch has a 195 W PoE budget. Cameras and phones already used 140 W; four access points at up to 25 W each would have needed 100 W. Six cameras (78 W together) were moved to the second switch; now all access points run with 33 W reserve. A switch with 370 W was requested for further devices.',
  verify: 'All four access points are online in the controller, show power inline shows more than 30 W reserve, no PoE messages in the log, the Wi-Fi survey in the warehouse shows the planned coverage.',
  note: 'INC-0702 AP-L03/L04 without power. Cause: PoE budget SW-LAGER-1 (195 W) exhausted. 6 cameras moved to SW-LAGER-2, all APs online, reserve 33 W. Purchase request switch 370 W PoE. Network diagram and PoE calculation updated. Resolved.',
  say: '"The access points are fine, the switch just did not have enough power for all devices. I spread the load and now all of them run. We are ordering a stronger switch for further devices."',
  esc: 'To the network team or purchasing if hardware is missing; to the electrician if the distribution cabinet has no free socket or UPS capacity left.',
  boss: 'Do not just "plug in" new devices: check their power needs against the PoE budget first and keep the network plan up to date.'
 },
 fa: {
  t: 'Access Pointها یا تلفن‌های IP تازه روشن نمی‌شوند',
  msg: '«در انبار چهار Access Point تازه نصب کردیم. دو تا روشن‌اند و دو تا خاموش می‌مانند. کابل‌ها نو هستند.»',
  ask: ['دستگاه‌ها به کدام سوئیچ و کدام پورت‌ها وصل‌اند؟', 'دقیقاً کدام مدل، و برگهٔ مشخصات چه توانی می‌خواهد؟', 'روی همان سوئیچ دستگاه‌های PoE دیگری هم هست، مثلاً دوربین یا تلفن؟', 'چراغ پورت روی سوئیچ روشن است؟ دستگاه با PoE Injector کار می‌کند؟'],
  steps: ['بودجهٔ PoE سوئیچ را ببین: توان موجود، توان مصرف‌شده و ذخیره.', 'وضعیت پورت دستگاه‌های خاموش را بررسی کن: خاموش به‌خاطر کمبود توان، خطا یا اصلاً بدون لینک.', 'در لاگ دنبال پیام‌های PoE بگرد (کمبود توان، اضافه‌بار).', 'آزمون متقابل: دستگاه را با PoE Injector روی همان کابل امتحان کن. اگر کار کرد، کابل سالم است و مشکل بودجه است.', 'فوری: دستگاه‌ها را میان سوئیچ‌هایی با توان آزاد پخش کن یا اولویت پورت بگذار (Access Pointها پیش از دستگاه‌های کم‌اهمیت).', 'برای همیشه: بودجهٔ PoE را در نقشهٔ شبکه دوباره حساب کن و سوئیچی با منبع تغذیهٔ بزرگ‌تر یا یک سوئیچ دوم برنامه‌ریزی کن.'],
  fix: 'سوئیچ انبار ۱۹۵ وات بودجهٔ PoE دارد. دوربین‌ها و تلفن‌ها از قبل ۱۴۰ وات می‌گرفتند؛ چهار Access Point هر کدام تا ۲۵ وات، روی هم ۱۰۰ وات لازم داشتند. شش دوربین (روی هم ۷۸ وات) به سوئیچ دوم منتقل شدند و حالا همهٔ Access Pointها با ۳۳ وات ذخیره کار می‌کنند. برای دستگاه‌های بعدی سوئیچی با ۳۷۰ وات درخواست شد.',
  verify: 'هر چهار Access Point در Controller آنلاین‌اند، show power inline بیش از ۳۰ وات ذخیره نشان می‌دهد، پیام PoE در لاگ نیست و اندازه‌گیری WLAN در انبار پوشش برنامه‌ریزی‌شده را نشان می‌دهد.',
  note: 'INC-0702 AP-L03/L04 بدون برق. علت: بودجهٔ PoE سوئیچ SW-LAGER-1 (۱۹۵ وات) تمام شده بود. ۶ دوربین به SW-LAGER-2 منتقل شد، همهٔ APها آنلاین، ذخیره ۳۳ وات. درخواست خرید سوئیچ با ۳۷۰ وات PoE. نقشهٔ شبکه و محاسبهٔ PoE به‌روز شد. حل شد.',
  say: '«Access Pointها سالم‌اند؛ فقط سوئیچ برای همهٔ دستگاه‌ها برق کافی نداشت. بار را پخش کردم و حالا همه کار می‌کنند. برای دستگاه‌های بعدی یک سوئیچ قوی‌تر سفارش می‌دهیم.»',
  esc: 'به تیم شبکه یا واحد خرید، اگر سخت‌افزار کم است؛ به برق‌کار، اگر در رک دیگر پریز برق یا ظرفیت UPS آزاد نیست.',
  boss: 'دستگاه تازه را فقط «وصل» نکن: نیاز توانش را پیش از آن با بودجهٔ PoE مقایسه کن و نقشهٔ شبکه را به‌روز نگه دار.'
 }
},
{
 id: 'dot1x', area: 'network', fixArea: 'netz', prio: 2, roles: ['admin', 'net'], lessons: ['vendor-switches', 'firewall-lab'], ch: ['k-plan/plan-sicherheit', 'k-net/net-vlan'],
 cmd: '! Cisco IOS: Anmeldestatus am Port\nshow access-session interface gi1/0/12 details\nshow mac address-table interface gi1/0/12\n! Port für Geräte ohne 802.1X: erst 802.1X, dann MAB\n! (die MAC-Adresse muss im RADIUS-Server, z. B. NPS, freigegeben sein)\ninterface gi1/0/12\n authentication order dot1x mab\n authentication priority dot1x mab\n mab',
 de: {
  t: 'Nach Einführung von 802.1X: Drucker und Telefone ohne Netz',
  msg: '„Seit heute Morgen druckt im Erdgeschoss niemand mehr. Die PCs funktionieren, nur der große Kopierer ist ‚offline‘.“',
  ask: ['Welche Geräte sind betroffen: nur Drucker und Telefone oder auch PCs?', 'Wurde über Nacht etwas am Netz geändert (Change, Wartungsfenster)?', 'Zeigt der Drucker in seinem Menü eine IP-Adresse an?', 'An welchem Switch-Port hängt der Drucker (Dosennummer, Patchliste)?'],
  steps: ['Change-Kalender prüfen: Über Nacht wurde 802.1X im Erdgeschoss eingeschaltet.', 'Port-Status ansehen: Der Drucker kann sich nicht per 802.1X anmelden (kein Zertifikat, kein Anmeldeprogramm), der Port bleibt gesperrt.', 'Im RADIUS-Server (z. B. Microsoft NPS) die abgelehnten Anfragen und den Grund lesen.', 'Lösung nach Sicherheitskonzept: Für Geräte ohne 802.1X MAC Authentication Bypass (MAB) mit eigener Regel und eigenem VLAN nutzen, zum Beispiel einem Drucker-VLAN.', 'MAC-Adresse des Druckers in die vorgesehene Gruppe im RADIUS-Server eintragen und am Port die Reihenfolge „erst 802.1X, dann MAB“ setzen.', 'Vor dem nächsten Stockwerk alle Geräte ohne 802.1X aus dem Inventar erfassen, damit nichts mehr ausfällt.'],
  fix: 'Beim Rollout war der Port des Kopierers auf „nur 802.1X“ gestellt worden, MAB fehlte. MAB am Port aktiviert, MAC-Adresse in die NPS-Gruppe „Drucker“ eingetragen; der Kopierer landet im Drucker-VLAN 30 und druckt wieder.',
  verify: 'show access-session zeigt „Authorized“ mit Methode MAB und VLAN 30, Testdruck von zwei PCs erfolgreich, keine Ablehnungen mehr im NPS-Protokoll für diese MAC-Adresse.',
  note: 'INC-0801 Kopierer EG offline nach CHG-0790 (802.1X EG). Ursache: Port gi1/0/12 ohne MAB. MAB ergänzt, MAC in NPS-Gruppe Drucker, VLAN 30. Testdruck OK. Liste der Geräte ohne 802.1X für OG1/OG2 an Netzwerkteam. Gelöst.',
  say: '„Wir haben über Nacht die Netzsicherheit verbessert, dabei wurde der Kopierer vergessen. Er ist jetzt freigeschaltet und druckt wieder. Danke für die schnelle Meldung.“',
  esc: 'An Netzwerk- oder Sicherheitsteam, wenn du keine Rechte am RADIUS-Server hast oder viele Geräte betroffen sind; Rückfall nach Changeplan, wenn kritische Geräte (Zutritt, Telefone) ausfallen.',
  boss: 'Sicherheitsmaßnahmen nicht einfach abschalten, sondern nach Konzept ergänzen: Ausnahmen gezielt, dokumentiert und in einem eigenen VLAN.'
 },
 en: {
  t: 'After introducing 802.1X: printers and phones without network',
  msg: '"Since this morning nobody on the ground floor can print. The PCs work, only the big copier is \'offline\'."',
  ask: ['Which devices are affected: only printers and phones, or PCs too?', 'Was anything changed on the network overnight (change, maintenance window)?', 'Does the printer show an IP address in its menu?', 'Which switch port is the printer connected to (socket number, patch list)?'],
  steps: ['Check the change calendar: 802.1X was switched on for the ground floor overnight.', 'Look at the port status: the printer cannot authenticate with 802.1X (no certificate, no supplicant), so the port stays blocked.', 'Read the rejected requests and the reason in the RADIUS server (e.g. Microsoft NPS).', 'Fix according to the security concept: for devices without 802.1X use MAC Authentication Bypass (MAB) with its own rule and its own VLAN, for example a printer VLAN.', 'Add the printer\'s MAC address to the intended group in the RADIUS server and set the order "802.1X first, then MAB" on the port.', 'Before the next floor, list all devices without 802.1X from the inventory so nothing fails again.'],
  fix: 'During the rollout the copier\'s port had been set to "802.1X only"; MAB was missing. MAB enabled on the port, MAC address added to the NPS group "Printers"; the copier lands in printer VLAN 30 and prints again.',
  verify: 'show access-session shows "Authorized" with method MAB and VLAN 30, test prints from two PCs succeed, no more rejections in the NPS log for this MAC address.',
  note: 'INC-0801 copier ground floor offline after CHG-0790 (802.1X ground floor). Cause: port gi1/0/12 without MAB. MAB added, MAC in NPS group Printers, VLAN 30. Test print OK. List of devices without 802.1X for 1st/2nd floor sent to network team. Resolved.',
  say: '"We improved network security overnight and the copier was forgotten. It is enabled now and prints again. Thanks for reporting it so quickly."',
  esc: 'To the network or security team if you have no rights on the RADIUS server or many devices are affected; roll back according to the change plan if critical devices (access control, phones) fail.',
  boss: 'Do not simply switch security measures off; extend them according to the concept: exceptions targeted, documented and in their own VLAN.'
 },
 fa: {
  t: 'پس از راه‌اندازی 802.1X: چاپگر و تلفن‌ها شبکه ندارند',
  msg: '«از امروز صبح در طبقهٔ همکف هیچ‌کس نمی‌تواند چاپ کند. رایانه‌ها کار می‌کنند، فقط دستگاه کپی بزرگ «آفلاین» است.»',
  ask: ['کدام دستگاه‌ها گرفتارند: فقط چاپگر و تلفن یا رایانه‌ها هم؟', 'دیشب در شبکه چیزی عوض شده است (Change، پنجرهٔ نگهداری)؟', 'چاپگر در منوی خودش نشانی IP نشان می‌دهد؟', 'چاپگر به کدام پورت سوئیچ وصل است (شمارهٔ پریز، فهرست Patch)؟'],
  steps: ['تقویم Changeها را ببین: دیشب 802.1X برای طبقهٔ همکف روشن شده است.', 'وضعیت پورت را ببین: چاپگر نمی‌تواند با 802.1X وارد شود (گواهی و نرم‌افزار ورود ندارد)، پس پورت بسته می‌ماند.', 'در سرور RADIUS (مثلاً Microsoft NPS) درخواست‌های ردشده و علتشان را بخوان.', 'راه‌حل طبق طرح امنیتی: برای دستگاه‌های بدون 802.1X از MAC Authentication Bypass (MAB) با قانون و VLAN جداگانه استفاده کن، مثلاً VLAN چاپگرها.', 'نشانی MAC چاپگر را در گروه تعیین‌شده در سرور RADIUS بگذار و روی پورت ترتیب «اول 802.1X، بعد MAB» را تنظیم کن.', 'پیش از طبقهٔ بعدی همهٔ دستگاه‌های بدون 802.1X را از فهرست تجهیزات استخراج کن تا دیگر چیزی از کار نیفتد.'],
  fix: 'هنگام اجرا، پورت دستگاه کپی روی «فقط 802.1X» گذاشته شده بود و MAB نبود. MAB روی پورت فعال شد و نشانی MAC در گروه NPS «Drucker» ثبت شد؛ دستگاه کپی در VLAN 30 چاپگرها قرار می‌گیرد و دوباره چاپ می‌کند.',
  verify: 'show access-session وضعیت «Authorized» با روش MAB و VLAN 30 نشان می‌دهد، چاپ آزمایشی از دو رایانه موفق است و برای این نشانی MAC دیگر رد درخواستی در لاگ NPS نیست.',
  note: 'INC-0801 دستگاه کپی همکف پس از CHG-0790 (802.1X همکف) آفلاین. علت: پورت gi1/0/12 بدون MAB. MAB اضافه شد، MAC در گروه Drucker در NPS، VLAN 30. چاپ آزمایشی درست. فهرست دستگاه‌های بدون 802.1X برای طبقهٔ اول و دوم به تیم شبکه داده شد. حل شد.',
  say: '«دیشب امنیت شبکه را بهتر کردیم و دستگاه کپی از قلم افتاده بود. حالا مجاز شده و دوباره چاپ می‌کند. ممنون که زود خبر دادید.»',
  esc: 'به تیم شبکه یا امنیت، اگر روی سرور RADIUS دسترسی نداری یا دستگاه‌های زیادی گرفتارند؛ بازگشت طبق طرح Change، اگر دستگاه‌های حیاتی (درِ ورود، تلفن‌ها) از کار افتاده‌اند.',
  boss: 'تدبیر امنیتی را خاموش نکن؛ آن را طبق طرح کامل کن: استثنا هدفمند، مستند و در VLAN جداگانه.'
 }
},
{
 id: 'vpn-subnet', area: 'network', fixArea: 'fern', prio: 3, roles: ['helpdesk', 'admin', 'net'], lessons: ['networking', 'firewall-lab'], ch: ['k-net/net-vpn', 'k-plan/plan-vlanip'],
 cmd: 'ipconfig | findstr /i "IPv4 Subnet Gateway"\nroute print -4\n# Welche Schnittstelle wählt Windows für den Server?\nFind-NetRoute -RemoteIPAddress 192.168.1.20 | Select-Object InterfaceAlias,NextHop -First 1\nTest-NetConnection 192.168.1.20 -Port 445',
 de: {
  t: 'Homeoffice: VPN verbunden, aber Server nicht erreichbar',
  msg: '„Das VPN sagt ‚Verbunden‘, Outlook geht, aber das Netzlaufwerk und die Warenwirtschaft kommen nicht.“',
  ask: ['Funktioniert es mit einem anderen Internetzugang, zum Beispiel dem Handy-Hotspot?', 'Welche IP-Adresse hat das Notebook zu Hause (ipconfig)?', 'Gibt es zu Hause seit Kurzem einen neuen Router?', 'Betrifft es nur Sie oder auch Kollegen im Homeoffice?'],
  steps: ['Mit ipconfig die Heimadresse ablesen: 192.168.1.x.', 'Mit dem IP-Plan der Firma vergleichen: Der Server liegt ebenfalls in 192.168.1.0/24. Das Notebook hält das Ziel für „lokal“ und schickt die Pakete ins Heimnetz statt in den Tunnel.', 'Mit route print bzw. Find-NetRoute bestätigen, welche Schnittstelle für die Server-Adresse gewählt wird.', 'Sofortmaßnahme: Handy-Hotspot nutzen oder im Heimrouter ein anderes Netz einstellen lassen, zum Beispiel 192.168.50.0/24.', 'Dauerhafte Lösung als Problem an das Netzwerkteam melden: Firmennetze nicht in typischen Heimnetzen planen (192.168.0.0/24, 192.168.1.0/24, 192.168.178.0/24), sondern zum Beispiel in 10.x.y.0/24.'],
  fix: 'Der neue Heimrouter der Benutzerin nutzt 192.168.1.0/24 – genau das Netz der Firmenserver. Nach Umstellung des Heimrouters auf 192.168.50.0/24 lief der Zugriff wieder über den Tunnel. Das Netzwerkteam plant, die Server in ein 10er-Netz umzuziehen.',
  verify: 'Find-NetRoute zeigt für 192.168.1.20 die VPN-Schnittstelle, Netzlaufwerk und Warenwirtschaft öffnen, Test-NetConnection auf Port 445 ist erfolgreich.',
  note: 'INC-0915 Homeoffice: VPN verbunden, Server nicht erreichbar. Ursache: Heimnetz 192.168.1.0/24 = Firmen-Servernetz. Heimrouter auf 192.168.50.0/24 umgestellt, Zugriff OK. Problem PRB-0044: Readressierung des Servernetzes (Überschneidung mit Heimnetzen). Gelöst.',
  say: '„Ihr neuer Router zu Hause verwendet zufällig dieselben Adressen wie unsere Server, deshalb hat Ihr Laptop den falschen Weg genommen. Nach der kleinen Umstellung geht alles wieder.“',
  esc: 'An das Netzwerkteam, wenn mehrere Homeoffice-Benutzer betroffen sind oder die VPN-Konfiguration (Routen, Split Tunnel) geändert werden muss.',
  boss: 'Die eigentliche Ursache im Netzdesign erkennen und als Problem melden, statt nur jeden Einzelfall zu lösen.'
 },
 en: {
  t: 'Home office: VPN connected, but server not reachable',
  msg: '"The VPN says \'Connected\', Outlook works, but the network drive and the ERP system don\'t."',
  ask: ['Does it work with another internet connection, for example the phone hotspot?', 'Which IP address does the notebook have at home (ipconfig)?', 'Is there a new router at home recently?', 'Does it affect only you or colleagues working from home too?'],
  steps: ['Read the home address with ipconfig: 192.168.1.x.', 'Compare with the company IP plan: the server is also in 192.168.1.0/24. The notebook treats the target as "local" and sends the packets into the home network instead of the tunnel.', 'Confirm with route print or Find-NetRoute which interface is chosen for the server address.', 'Immediate measure: use the phone hotspot or have a different network set on the home router, for example 192.168.50.0/24.', 'Report the permanent fix as a problem to the network team: do not plan company networks in typical home ranges (192.168.0.0/24, 192.168.1.0/24, 192.168.178.0/24) but for example in 10.x.y.0/24.'],
  fix: 'The user\'s new home router uses 192.168.1.0/24 – exactly the network of the company servers. After switching the home router to 192.168.50.0/24, access went through the tunnel again. The network team plans to move the servers into a 10.x network.',
  verify: 'Find-NetRoute shows the VPN interface for 192.168.1.20, network drive and ERP open, Test-NetConnection on port 445 succeeds.',
  note: 'INC-0915 home office: VPN connected, server unreachable. Cause: home network 192.168.1.0/24 = company server network. Home router changed to 192.168.50.0/24, access OK. Problem PRB-0044: re-address server network (overlap with home networks). Resolved.',
  say: '"Your new router at home happens to use the same addresses as our servers, so your laptop took the wrong path. After the small change everything works again."',
  esc: 'To the network team if several home-office users are affected or the VPN configuration (routes, split tunnel) has to be changed.',
  boss: 'Recognise the real cause in the network design and report it as a problem instead of only solving each individual case.'
 },
 fa: {
  t: 'دورکاری: VPN وصل است ولی سرور در دسترس نیست',
  msg: '«VPN می‌گوید «وصل شد»، Outlook کار می‌کند، ولی درایو شبکه و نرم‌افزار انبار و فروش باز نمی‌شوند.»',
  ask: ['با اینترنت دیگری، مثلاً Hotspot گوشی، کار می‌کند؟', 'نوت‌بوک در خانه چه نشانی IP دارد (ipconfig)؟', 'به‌تازگی در خانه روتر تازه‌ای گذاشته‌اید؟', 'فقط شما گرفتارید یا همکاران دورکار هم؟'],
  steps: ['با ipconfig نشانی خانه را بخوان: 192.168.1.x.', 'با طرح IP شرکت مقایسه کن: سرور هم در 192.168.1.0/24 است. نوت‌بوک مقصد را «محلی» می‌داند و بسته‌ها را به‌جای تونل به شبکهٔ خانه می‌فرستد.', 'با route print یا Find-NetRoute مطمئن شو کدام رابط برای نشانی سرور انتخاب می‌شود.', 'اقدام فوری: از Hotspot گوشی استفاده کن یا بخواه روی روتر خانه شبکهٔ دیگری تنظیم شود، مثلاً 192.168.50.0/24.', 'راه‌حل ماندگار را به‌صورت Problem به تیم شبکه گزارش بده: شبکهٔ شرکت را در بازه‌های رایج خانگی (192.168.0.0/24، 192.168.1.0/24، 192.168.178.0/24) نگذارند، بلکه مثلاً در 10.x.y.0/24.'],
  fix: 'روتر تازهٔ خانهٔ کاربر از 192.168.1.0/24 استفاده می‌کند؛ دقیقاً همان شبکهٔ سرورهای شرکت. پس از تغییر روتر خانه به 192.168.50.0/24، دسترسی دوباره از تونل رفت. تیم شبکه برنامه دارد سرورها را به یک شبکهٔ 10.x ببرد.',
  verify: 'Find-NetRoute برای 192.168.1.20 رابط VPN را نشان می‌دهد، درایو شبکه و نرم‌افزار باز می‌شوند و Test-NetConnection روی پورت 445 موفق است.',
  note: 'INC-0915 دورکاری: VPN وصل، سرور در دسترس نیست. علت: شبکهٔ خانه 192.168.1.0/24 همان شبکهٔ سرورهای شرکت است. روتر خانه به 192.168.50.0/24 تغییر کرد، دسترسی درست شد. Problem PRB-0044: نشانی‌دهی دوبارهٔ شبکهٔ سرورها (هم‌پوشانی با شبکه‌های خانگی). حل شد.',
  say: '«روتر تازهٔ خانهٔ شما اتفاقاً همان نشانی‌های سرورهای ما را به کار می‌برد، برای همین لپ‌تاپتان راه اشتباه را می‌رفت. با این تغییر کوچک همه چیز دوباره کار می‌کند.»',
  esc: 'به تیم شبکه، اگر چند کاربر دورکار گرفتارند یا پیکربندی VPN (مسیرها، Split Tunnel) باید عوض شود.',
  boss: 'علت اصلی را در طراحی شبکه ببین و به‌صورت Problem گزارش بده، به‌جای اینکه فقط هر مورد را جداگانه حل کنی.'
 }
}
]);
})();
