/* Arefi ITPraxis – Herstellerinformationen, aus offiziellen Herstellerseiten zusammengefasst (eigene Formulierung).
   Stand der Recherche: 17.11.2026. Immer offline im Programm verfügbar; Quellen sind je Gerät angegeben.
   Reihenfolge je Eintrag: [fa, de, en]. */
(() => {
'use strict';
window.ArefiHardwareInfo = {
checked: '2026-11-17',
devices: {

c9200: {
  facts: [
    ['اولین دسترسی از طریق Console یا WebUI (پیکربندی Day 0) است. برای پیکربندی با WebUI، به پرسش «initial configuration dialog» در Console پاسخ نده.', 'Erstzugang über die Konsole oder die WebUI (Day-0-Einrichtung). Für die Einrichtung per WebUI die Frage „initial configuration dialog“ an der Konsole unbeantwortet lassen.', 'First access is via the console or the WebUI (day-0 setup). To use the WebUI for day-0, leave the “initial configuration dialog” prompt on the console unanswered.'],
    ['کاربر WebUI برای تغییر تنظیمات به Privilege Level 15 نیاز دارد؛ با سطح پایین‌تر فقط مشاهده ممکن است.', 'Für Konfigurationsänderungen in der WebUI braucht das Konto Privilegstufe 15; mit niedrigerer Stufe ist nur Überwachung möglich.', 'A WebUI account needs privilege level 15 to change configuration; lower levels can only monitor.'],
    ['به‌روزرسانی نرم‌افزار از طریق WebUI از IOS XE 17.9.1 به بعد پشتیبانی می‌شود.', 'Software-Updates über die WebUI werden ab IOS XE 17.9.1 unterstützt.', 'Software upgrades through the WebUI are supported from IOS XE 17.9.1.'],
    ['پورت مدیریت جدا GigabitEthernet0/0 نام دارد و با پورت‌های داده مثل Gi1/0/1 فرق می‌کند.', 'Der getrennte Management-Port heißt GigabitEthernet0/0 und ist nicht dasselbe wie Datenports wie Gi1/0/1.', 'The separate management port is GigabitEthernet0/0, distinct from data ports such as Gi1/0/1.'],
    ['تغییرات فقط بعد از copy running-config startup-config بعد از ری‌استارت باقی می‌مانند.', 'Änderungen überstehen einen Neustart erst nach copy running-config startup-config.', 'Changes survive a reboot only after copy running-config startup-config.']],
  sources: [['Cisco: Manage Catalyst 9000 Switches Using the Web UI', 'https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9600-series-switches/221613-manage-catalyst-9000-switches-using-the.html'], ['Cisco Catalyst 9200 – Konfigurationsanleitungen', 'https://www.cisco.com/c/en/us/support/switches/catalyst-9200-r-series-switches/products-installation-and-configuration-guides-list.html']]
},

c8200: {
  facts: [
    ['Catalyst 8200 پورت مدیریت جدا (Out-of-Band) ندارد؛ مدیریت از طریق Console یا یکی از رابط‌های معمولی انجام می‌شود.', 'Der Catalyst 8200 hat keinen getrennten Out-of-Band-Managementport; verwaltet wird über die Konsole oder ein normales Interface.', 'The Catalyst 8200 has no out-of-band management port; manage it via the console or a regular interface.'],
    ['در تنظیمات کارخانه، GigabitEthernet0/0/0 آدرس را با DHCP می‌گیرد و پورت‌های دیگر IP ندارند.', 'In der Werkskonfiguration holt sich GigabitEthernet0/0/0 eine Adresse per DHCP; die anderen Ports haben keine IP.', 'In the factory configuration GigabitEthernet0/0/0 is a DHCP client; the other ports have no IP address.'],
    ['دستگاه می‌تواند در حالت کلاسیک (Autonomous) یا به‌عنوان دستگاه SD-WAN با Controller کار کند؛ قبل از کار حالت آن را بررسی کن.', 'Das Gerät läuft entweder klassisch (Autonomous Mode) oder als SD-WAN-Gerät mit Controller; vor der Arbeit den Modus prüfen.', 'The device runs either classically (autonomous mode) or as a controller-managed SD-WAN device; check the mode before working.'],
    ['تنظیمات فعلی را با show running-config ببین و تغییرات را با copy running-config startup-config ذخیره کن.', 'Aktuelle Konfiguration mit show running-config ansehen, Änderungen mit copy running-config startup-config sichern.', 'View the current configuration with show running-config and save changes with copy running-config startup-config.']],
  sources: [['Cisco Catalyst 8200 Series Edge Platforms – FAQ', 'https://www.cisco.com/c/en/us/products/collateral/routers/catalyst-8200-series-edge-platforms/catalyst-8200-series-edge-platforms-faq.html'], ['Cisco Catalyst 8200 – Data Sheet', 'https://www.cisco.com/c/en/us/products/collateral/routers/catalyst-8200-series-edge-platforms/nb-06-cat8200-series-edge-plat-ds-cte-en.html']]
},

fortigate: {
  facts: [
    ['Policyها از بالا به پایین بررسی می‌شوند؛ اولین Policy منطبق اجرا می‌شود و بقیه دیگر بررسی نمی‌شوند.', 'Policies werden von oben nach unten geprüft; die erste passende wird angewendet, alle weiteren nicht mehr.', 'Policies are checked top-down; the first match is applied and the rest are not evaluated.'],
    ['در انتهای فهرست، Policy ضمنی شمارهٔ 0 (Implicit Deny) همهٔ ترافیک دیگر را بی‌صدا رد می‌کند؛ فقط Log آن قابل تغییر است.', 'Am Ende steht die implizite Deny-Policy 0, die übrigen Verkehr still verwirft; an ihr lässt sich nur das Logging ändern.', 'At the end, implicit deny policy 0 silently drops everything else; only its logging can be changed.'],
    ['توصیهٔ Fortinet: قانون‌های دقیق‌تر بالا، کمترین دسترسی لازم، و all/any فقط برای مسیر اینترنت.', 'Fortinet empfiehlt: spezifische Regeln nach oben, nur nötige Rechte vergeben, „all/any“ nur für den Weg ins Internet.', 'Fortinet recommends specific rules at the top, least privilege, and all/any only for internet-bound traffic.'],
    ['از FortiOS 7.2.4، گزینهٔ match-vip در Deny Policyهای جدید به‌طور پیش‌فرض فعال است.', 'Ab FortiOS 7.2.4 ist match-vip in neuen Deny-Policies standardmäßig aktiv.', 'From FortiOS 7.2.4, match-vip is enabled by default in new deny policies.']],
  sources: [['Fortinet: Best Practices – Policies (FortiOS 7.4)', 'https://docs2.fortinet.com/document/fortigate/7.4.0/best-practices/862226'], ['Fortinet: How policy order works on FortiGate', 'https://community.fortinet.com/t5/FortiGate/Technical-Tip-How-policy-order-works-on-FortiGate/ta-p/207381'], ['FortiOS 7.6.6: Configuring a firewall policy', 'https://docs.fortinet.com/document/fortigate/7.6.6/administration-guide/826586/configuring-a-firewall-policy']]
},

aruba: {
  facts: [
    ['سری 6100 یک سوئیچ Layer 2 برای لبهٔ شبکه است؛ برای IP مدیریتی و ترافیک خود سوئیچ، Source Interface را در نظر بگیر.', 'Die 6100 ist ein Layer-2-Access-Switch; für Management-IP und eigenen Verkehr des Switches das Source-Interface beachten.', 'The 6100 is a layer-2 access switch; mind the source interface for the management IP and switch-originated traffic.'],
    ['در حالت کارخانه، VLAN 1 آدرس را با DHCP می‌گیرد و همهٔ پورت‌ها Access در VLAN 1 هستند.', 'Im Werkszustand bezieht VLAN 1 per DHCP eine Adresse, und alle Ports sind Access-Ports in VLAN 1.', 'In factory state VLAN 1 gets an address via DHCP and all ports are access ports in VLAN 1.'],
    ['دسترسی از طریق Console، WebUI، REST API، اپ موبایل Aruba CX یا Zero-Touch-Provisioning ممکن است.', 'Zugang über Konsole, WebUI, REST-API, die Aruba-CX-Mobil-App oder Zero-Touch-Provisioning.', 'Access via console, WebUI, REST API, the Aruba CX mobile app or zero-touch provisioning.'],
    ['حساب admin از ابتدا وجود دارد؛ در اولین ورود برای آن گذرواژه بگذار. فراموشی گذرواژه فقط با Service OS یا بازگشت به تنظیمات کارخانه حل می‌شود.', 'Das Konto admin ist ab Werk vorhanden; beim ersten Login ein Kennwort setzen. Ein vergessenes Kennwort lässt sich nur über das Service-OS oder einen Werksreset zurücksetzen.', 'The admin account exists from the factory; set a password at first login. A forgotten password can only be reset via the service OS or a factory reset.'],
    ['تغییرات را با write memory ذخیره کن.', 'Änderungen mit write memory speichern.', 'Save changes with write memory.']],
  sources: [['HPE Aruba: AOS-CX CLI Reference 6000/6100', 'https://arubanetworking.hpe.com/techdocs/AOS-CX/10.15/PDF/cli_6000-6100.pdf'], ['HPE Aruba: AOS-CX Security Guide 4100i/6000/6100', 'https://arubanetworking.hpe.com/techdocs/AOS-CX/10.10/PDF/security_4100i-6000-6100.pdf'], ['HPE Airheads: 6100 Static IPs', 'https://airheads.hpe.com/discussion/6100-static-ips']]
},

dell: {
  facts: [
    ['iDRAC بسته به سفارش، آدرس را با DHCP می‌گیرد یا آدرس پیش‌فرض 192.168.0.120 را دارد. تنظیم شبکه با F2 هنگام روشن شدن (iDRAC Settings) هم ممکن است.', 'iDRAC holt sich je nach Bestellung eine Adresse per DHCP oder nutzt die Standardadresse 192.168.0.120. Netzwerk lässt sich auch mit F2 beim Start (iDRAC Settings) einstellen.', 'Depending on the order, iDRAC uses DHCP or the default address 192.168.0.120. Network settings can also be set with F2 during boot (iDRAC Settings).'],
    ['نام کاربری root است. سرورهای جدید گذرواژهٔ تصادفی و یکتا دارند که روی برچسب بیرون‌کشیدنی Service Tag در جلوی دستگاه چاپ شده است.', 'Benutzername ist root. Neuere Server haben ein zufälliges, einmaliges Kennwort auf dem ausziehbaren Service-Tag-Schild vorn am Gehäuse.', 'The user name is root. Newer servers have a unique random password printed on the pull-out service tag at the front.'],
    ['گذرواژهٔ قدیمی calvin فقط وقتی هست که هنگام سفارش انتخاب شده باشد؛ Dell تغییر فوری آن را توصیه می‌کند. گزینهٔ Force Change Password تغییر گذرواژه را در اولین ورود اجباری می‌کند.', 'Das alte Kennwort „calvin“ gibt es nur, wenn es bei der Bestellung gewählt wurde; Dell empfiehlt, es sofort zu ändern. „Force Change Password“ erzwingt die Änderung beim ersten Login.', 'The legacy password “calvin” exists only if chosen at order time; Dell recommends changing it at once. “Force Change Password” forces a change at first login.'],
    ['علاوه بر Web، دسترسی با SSH و RACADM هم ممکن است.', 'Neben der Weboberfläche ist der Zugriff per SSH und RACADM möglich.', 'Besides the web interface, SSH and RACADM access are available.'],
    ['Lifecycle Controller از طریق iDRAC برای به‌روزرسانی Firmware و نصب سیستم‌عامل استفاده می‌شود.', 'Der Lifecycle Controller wird über iDRAC für Firmware-Updates und die Betriebssystem-Installation genutzt.', 'The Lifecycle Controller, reached through iDRAC, is used for firmware updates and OS installation.']],
  sources: [['Dell: iDRAC – Standard-Benutzername und Kennwort', 'https://www.dell.com/support/kbdoc/en-us/000133536'], ['Dell: PowerEdge Server Initial Start-up Guide', 'https://www.dell.com/support/kbdoc/000123958/dell-poweredge-server-start-up-guide'], ['Dell PowerEdge R350 – Handbücher (Deutsch)', 'https://www.dell.com/support/product-details/de-de/product/poweredge-r350/resources/manuals']]
},

opnsense: {
  facts: [
    ['ترتیب پردازش: قانون‌های سیستمی، سپس Floating، سپس گروه‌های Interface و در آخر قانون‌های هر Interface.', 'Verarbeitungsreihenfolge: Systemregeln, dann Floating, dann Interface-Gruppen, zuletzt die Regeln einzelner Interfaces.', 'Processing order: system rules, then floating, then interface groups, finally per-interface rules.'],
    ['قانون‌ها به‌طور پیش‌فرض quick هستند: اولین قانون منطبق برنده است. بدون quick، آخرین قانون منطبق اعمال می‌شود.', 'Regeln sind standardmäßig „quick“: Die erste passende Regel gewinnt. Ohne quick gilt die letzte passende.', 'Rules are “quick” by default: the first match wins. Without quick, the last match applies.'],
    ['اگر هیچ قانونی منطبق نشود، قانون پیش‌فرض Deny ترافیک را رد می‌کند.', 'Passt keine Regel, verwirft die Standard-Deny-Regel den Verkehr.', 'If no rule matches, the default deny rule drops the traffic.'],
    ['فایروال Stateful است؛ به‌طور پیش‌فرض ۱۰٪ حافظه برای Stateها رزرو می‌شود (Firewall → Settings).', 'Die Firewall arbeitet zustandsbehaftet; standardmäßig sind 10 % des Arbeitsspeichers für States reserviert (Firewall → Settings).', 'The firewall is stateful; by default 10 % of memory is reserved for states (Firewall → Settings).'],
    ['Alias فهرست نام‌دار از شبکه‌ها، میزبان‌ها یا پورت‌هاست و قانون‌ها را ساده‌تر می‌کند.', 'Aliase sind benannte Listen von Netzen, Hosts oder Ports und machen Regeln übersichtlicher.', 'Aliases are named lists of networks, hosts or ports that keep rules readable.']],
  sources: [['OPNsense Manual: Rules', 'https://docs.opnsense.org/manual/firewall.html'], ['OPNsense Manual: Aliases', 'https://docs.opnsense.org/manual/aliases.html']]
},

'mikrotik-hex': {
  facts: [
    ['ether1 پورت اینترنت (WAN) است؛ کامپیوتر را به یکی از پورت‌های دیگر وصل کن. بیشتر روترها با تنظیمات پیش‌فرض شامل DHCP Server و Firewall پایه می‌آیند.', 'ether1 ist der Internet-Port (WAN); den PC an einen der anderen Ports anschließen. Die meisten Router kommen mit Standardkonfiguration inklusive DHCP-Server und Basis-Firewall.', 'ether1 is the internet (WAN) port; connect the PC to another port. Most routers ship with a default configuration including a DHCP server and basic firewall.'],
    ['ورود با کاربر admin؛ گذرواژه یا خالی است یا روی برچسب دستگاه چاپ شده. پس از DHCP، روتر در 192.168.88.1 در دسترس است. ابزار: WinBox یا WebFig.', 'Login mit admin; das Kennwort ist leer oder steht auf dem Geräteaufkleber. Danach ist der Router unter 192.168.88.1 erreichbar. Werkzeuge: WinBox oder WebFig.', 'Log in as admin; the password is blank or printed on the device label. The router is then reachable at 192.168.88.1. Tools: WinBox or WebFig.'],
    ['اولین قدم امنیتی: گذرواژهٔ قوی، ساختن کاربر مدیر جدید، آزمایش ورود و سپس حذف کاربر پیش‌فرض admin.', 'Erste Sicherheitsschritte: starkes Kennwort, neuen Admin anlegen, Anmeldung testen, dann den Standardbenutzer admin entfernen.', 'First security steps: strong password, create a new admin, test the login, then remove the default admin user.'],
    ['قانون‌های پیش‌فرض Firewall را نگه دار؛ MAC-Telnet و MAC-WinBox را فقط روی LAN مجاز کن و Neighbor Discovery را روی WAN خاموش کن.', 'Standard-Firewallregeln behalten; MAC-Telnet und MAC-WinBox nur im LAN erlauben und Nachbarerkennung auf dem WAN abschalten.', 'Keep the default firewall rules; allow MAC-Telnet and MAC-WinBox only on the LAN and disable neighbour discovery on the WAN.'],
    ['سرویس‌های بدون استفاده (telnet، FTP، www، API) را خاموش کن. MikroTik این راهنما را منجمد کرده و راهنمای جدید در manual.mikrotik.com است.', 'Ungenutzte Dienste (telnet, FTP, www, API) abschalten. MikroTik hat diese Anleitung eingefroren; das neue Handbuch liegt unter manual.mikrotik.com.', 'Disable unused services (telnet, FTP, www, API). MikroTik has frozen this guide; the new manual is at manual.mikrotik.com.']],
  sources: [['MikroTik: First Time Configuration', 'https://help.mikrotik.com/docs/spaces/ROS/pages/328151/First+Time+Configuration'], ['MikroTik RouterOS Manual (neu)', 'https://manual.mikrotik.com/']]
},

edgerouter4: {
  facts: [
    ['در حالت کارخانه eth0 آدرس ثابت 192.168.1.1 دارد و eth1 کلاینت DHCP است. رابط وب: https://192.168.1.1', 'Im Werkszustand hat eth0 die feste Adresse 192.168.1.1, eth1 ist DHCP-Client. Weboberfläche: https://192.168.1.1', 'In factory state eth0 has the static address 192.168.1.1 and eth1 is a DHCP client. Web interface: https://192.168.1.1'],
    ['ورود پیش‌فرض ubnt / ubnt است؛ Ubiquiti قویاً توصیه می‌کند یک حساب شخصی با گذرواژهٔ قوی بسازی.', 'Standardlogin ist ubnt / ubnt; Ubiquiti empfiehlt dringend ein eigenes Konto mit starkem Kennwort.', 'Default login is ubnt / ubnt; Ubiquiti strongly recommends your own account with a strong password.'],
    ['CLI دو حالت دارد: Operational Mode با علامت $ برای نمایش وضعیت، و Configuration Mode با # (با دستور configure) برای تغییرات.', 'Die CLI hat zwei Modi: Operational Mode ($) zum Anzeigen und Configuration Mode (#, über configure) für Änderungen.', 'The CLI has two modes: operational mode ($) for status and configuration mode (#, via configure) for changes.'],
    ['commit تغییرات را فعال می‌کند و save آن‌ها را برای بعد از ری‌استارت ذخیره می‌کند.', 'commit aktiviert Änderungen, save sichert sie dauerhaft über einen Neustart hinaus.', 'commit activates changes; save stores them so they survive a reboot.'],
    ['Wizard پیش‌فرض LAN را 192.168.1.1/24 با DHCP Server فعال تنظیم می‌کند؛ توصیه شده مودم اینترنت در حالت Bridge باشد.', 'Der Standard-Assistent setzt das LAN auf 192.168.1.1/24 mit aktivem DHCP-Server; empfohlen wird, das Provider-Modem in den Bridge-Modus zu setzen.', 'The default wizard sets the LAN to 192.168.1.1/24 with the DHCP server enabled; putting the ISP modem in bridge mode is recommended.']],
  sources: [['Ubiquiti: Beginners Guide to EdgeRouter', 'https://help.uisp.com/hc/en-us/articles/22591094474135-EdgeRouter-Beginners-Guide-to-EdgeRouter'], ['Ubiquiti: EdgeRouter – Configuration and Operational Mode', 'https://help.uisp.com/hc/en-us/articles/22591199766551-EdgeRouter-Configuration-and-Operational-Mode'], ['Ubiquiti: EdgeRouter – How to Configure an Interface', 'https://help.uisp.com/hc/en-us/articles/22591218187543-EdgeRouter-How-to-Configure-an-Interface']]
},

paloalto: {
  facts: [
    ['فایروال در حالت اولیه قانونی به نام rule1 دارد که همهٔ ترافیک از Trust به Untrust را اجازه می‌دهد؛ آن را حذف یا اصلاح کن.', 'Im Auslieferungszustand gibt es die Regel rule1, die allen Verkehr von Trust nach Untrust erlaubt; löschen oder anpassen.', 'Out of the box, rule1 allows all traffic from trust to untrust; delete or adapt it.'],
    ['قانون‌ها به ترتیب بررسی می‌شوند و اولین قانون منطبق اعمال می‌شود؛ پس قانون‌های دقیق‌تر باید بالاتر باشند.', 'Regeln werden der Reihe nach geprüft, die erste passende gilt; spezifische Regeln gehören deshalb nach oben.', 'Rules are evaluated in order and the first match applies, so specific rules belong on top.'],
    ['قانون‌های پیش‌فرض پایین فهرست: ترافیک داخل یک Zone مجاز و بین Zoneها ممنوع است.', 'Die Standardregeln ganz unten erlauben Verkehr innerhalb einer Zone und verbieten Verkehr zwischen Zonen.', 'The default rules at the bottom allow intrazone and deny interzone traffic.'],
    ['Service را روی application-default بگذار تا Applicationها فقط روی پورت‌های استاندارد خود مجاز باشند.', 'Service auf application-default lassen, damit Anwendungen nur auf ihren Standardports erlaubt sind.', 'Keep service set to application-default so applications are only allowed on their standard ports.'],
    ['Log به‌طور پیش‌فرض در پایان Session ثبت می‌شود. Authentication Policy قبل از Security Policy بررسی می‌شود.', 'Protokolliert wird standardmäßig am Sitzungsende. Die Authentication Policy wird vor der Security Policy ausgewertet.', 'Logging defaults to session end. Authentication policy is evaluated before security policy.']],
  sources: [['PAN-OS 11.1: Create a Security Policy Rule', 'https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-policy/create-a-security-policy-rule'], ['PAN-OS 11.0: Create a Security Policy Rule', 'https://docs.paloaltonetworks.com/pan-os/11-0/pan-os-admin/policy/security-policy/create-a-security-policy-rule']]
},

'hpe-ilo': {
  facts: [
    ['کاربر پیش‌فرض Administrator است و گذرواژهٔ یکتای هر سرور روی برچسب بیرون‌کشیدنی Serial Label (iLO Default Network Settings) چاپ شده است.', 'Standardbenutzer ist Administrator; das individuelle Kennwort jedes Servers steht auf dem ausziehbaren Seriennummernschild (iLO Default Network Settings).', 'The default user is Administrator; each server’s unique password is printed on the pull-out serial label (iLO default network settings).'],
    ['نام DNS پیش‌فرض iLO از ILO به‌همراه شمارهٔ سریال سرور ساخته می‌شود.', 'Der Standard-DNS-Name von iLO besteht aus „ILO“ plus der Seriennummer des Servers.', 'The default iLO DNS name is “ILO” followed by the server serial number.'],
    ['راهنمای iLO 6 پیکربندی، به‌روزرسانی و کار با سرورهای ProLiant را توضیح می‌دهد؛ نسخه‌های جدید Firmware امنیت ورود (مثلاً احراز هویت دومرحله‌ای) را گسترش داده‌اند.', 'Das iLO-6-Handbuch beschreibt Einrichtung, Aktualisierung und Betrieb von ProLiant-Servern; neuere Firmware erweitert die Anmeldesicherheit, etwa um Zwei-Faktor-Authentifizierung.', 'The iLO 6 guide covers configuring, updating and operating ProLiant servers; newer firmware extends sign-in security, e.g. two-factor authentication.'],
    ['API در iLO 6 کاملاً Redfish است؛ API قدیمی پیش از Redfish حذف شده است.', 'Die Programmierschnittstelle von iLO 6 ist vollständig Redfish-konform; die alte Vor-Redfish-API wurde entfernt.', 'The iLO 6 API is fully Redfish-conformant; the older pre-Redfish API was removed.'],
    ['iLO را فقط در شبکهٔ مدیریتی جدا قرار بده و هرگز مستقیم در اینترنت در دسترس نگذار.', 'iLO nur in einem getrennten Verwaltungsnetz betreiben und nie direkt aus dem Internet erreichbar machen.', 'Run iLO only on a separate management network and never expose it directly to the internet.']],
  sources: [['HPE iLO Documentation Map', 'https://support.hpe.com/docs/display/public/ilo-server-lifecycle/'], ['HPE iLO 6 Redfish – Adapting from iLO 5', 'https://servermanagementportal.ext.hpe.com/docs/redfishservices/ilos/ilo6/ilo6_adaptation'], ['HPE Community: Built-in iLO credentials (ProLiant Gen11)', 'https://community.hpe.com/t5/proliant-servers-ml-dl-sl/built-in-ilo-credentials-for-proliant-dl360-server/td-p/7204129']]
},

'unifi-switch': {
  facts: [
    ['سوئیچ UniFi از طریق اپ UniFi Network مدیریت می‌شود: در Devices دستگاه را Adopt کن.', 'Der UniFi-Switch wird über die App UniFi Network verwaltet: unter Devices das Gerät „adoptieren“.', 'The UniFi switch is managed in the UniFi Network app: adopt it under Devices.'],
    ['چراغ سفید ثابت یعنی حالت کارخانه و منتظر Adoption؛ آبی ثابت یعنی Adopt شده و درست کار می‌کند.', 'Dauerhaft weiß bedeutet Werkszustand und wartet auf Adoption; dauerhaft blau bedeutet adoptiert und betriebsbereit.', 'Steady white means factory state, waiting for adoption; steady blue means adopted and working.'],
    ['دکمهٔ Reset: فشار کوتاه = ری‌استارت؛ نگه داشتن بیش از ۵ ثانیه = بازگشت به تنظیمات کارخانه.', 'Reset-Taste: kurz drücken = Neustart; länger als 5 Sekunden halten = Werkseinstellungen.', 'Reset button: short press = restart; hold over 5 seconds = factory defaults.'],
    ['گزینهٔ Forget در UniFi Network دستگاه را از Console جدا و به حالت کارخانه برمی‌گرداند.', '„Forget“ in UniFi Network löst das Gerät von der Konsole und setzt es auf Werkseinstellungen zurück.', '“Forget” in UniFi Network removes the device from the console and restores factory defaults.'],
    ['Ubiquiti به اطلاعات ورود کاربران دسترسی ندارد؛ اگر مالک هم دسترسی نداشته باشد، باید همه‌چیز Reset و از نو راه‌اندازی شود.', 'Ubiquiti hat keinen Zugriff auf Zugangsdaten; ohne Zugang auch des Eigentümers müssen alle Geräte zurückgesetzt und neu eingerichtet werden.', 'Ubiquiti has no access to credentials; if even the owner has no access, all devices must be reset and set up again.']],
  sources: [['Ubiquiti: How to Reset UniFi Devices to Factory Defaults', 'https://help.ui.com/hc/en-us/articles/205143490'], ['Ubiquiti: UniFi Password Recovery and Ownership Transfer', 'https://help.ui.com/hc/en-us/articles/14275946860311'], ['Ubiquiti: USW-24 Quick Start Guide', 'https://dl.ubnt.com/qsg/USW-24/USW-24_EN.html']]
},

synology: {
  facts: [
    ['Hyper Backup می‌تواند روی پوشهٔ محلی، دیسک USB، Synology دیگر، File Server و سرویس‌های Cloud پشتیبان بگیرد.', 'Hyper Backup sichert auf lokale Freigaben, USB-Laufwerke, ein anderes Synology-NAS, Dateiserver und Cloud-Dienste.', 'Hyper Backup can back up to local shared folders, USB disks, another Synology NAS, file servers and cloud services.'],
    ['Hyper Backup از DSM 6.0 به بعد کار می‌کند؛ نسخه‌های 4.x آن به DSM 7.2 یا جدیدتر نیاز دارند.', 'Hyper Backup läuft ab DSM 6.0; die Versionen 4.x benötigen DSM 7.2 oder neuer.', 'Hyper Backup runs on DSM 6.0 and later; versions 4.x require DSM 7.2 or newer.'],
    ['پشتیبان‌های چندنسخه‌ای در قالب ویژهٔ Synology (.hbk) هستند و فقط با Hyper Backup، Hyper Backup Explorer یا Hyper Backup Vault خوانده می‌شوند.', 'Mehrversionen-Sicherungen liegen im Synology-eigenen Format (.hbk) und sind nur mit Hyper Backup, Hyper Backup Explorer oder Hyper Backup Vault lesbar.', 'Multi-version backups use Synology’s own format (.hbk) and can only be read with Hyper Backup, Hyper Backup Explorer or Hyper Backup Vault.'],
    ['برای بازیابی تک‌فایل، Backup Explorer (آیکون ذره‌بین) را باز کن؛ اگر رمزگذاری سمت کلاینت فعال باشد، گذرواژه لازم است.', 'Für einzelne Dateien den Backup Explorer (Lupen-Symbol) öffnen; bei clientseitiger Verschlüsselung wird das Kennwort verlangt.', 'To restore single files open Backup Explorer (magnifier icon); with client-side encryption the password is required.'],
    ['اگر مقصد یک NAS دیگر Synology است، روی آن Hyper Backup Vault نصب کن.', 'Ist das Ziel ein anderes Synology-NAS, muss dort Hyper Backup Vault installiert sein.', 'If the destination is another Synology NAS, install Hyper Backup Vault there.']],
  sources: [['Synology: Hyper Backup auf lokale Freigabe oder USB (Deutsch)', 'https://kb.synology.com/de-de/DSM/tutorial/How_to_back_up_your_data_to_local_shared_folders_or_USB_with_Hyper_Backup'], ['Synology: Back up your Synology NAS', 'https://www.synology.com/knowledgebase/DSMUC/help/DSMUC/Tutorial/backup_backup'], ['Synology: Hyper Backup – Release Notes', 'https://www.synology.com/releaseNote/HyperBackup']]
}
}};
})();
