/* Arefi ITPraxis – Praxisübungen der Gerätebibliothek (fa/de/en).
   Jede Übung: kleine echte Konfigurationsaufgabe im Labor, Musterlösung, Prüfung und abhakbare Erfolgskriterien.
   Alle Adressen stammen aus Dokumentations- bzw. Laborbereichen. Nie ungeprüft auf Produktivgeräte übertragen. */
(() => {
'use strict';
window.ArefiHardwareExercises = {

c9200: {
  menu: 'CLI → configure terminal → vlan 30 / interface Gi1/0/5',
  heading: ['تمرین: VLAN مهمان برای Access Point', 'Übung: Gäste-VLAN für einen Access Point', 'Exercise: guest VLAN for an access point'],
  goal: [
    'برای Access Point مهمان، VLAN 30 با نام GAESTE بساز، پورت Gi1/0/5 را به آن بده و تنظیمات را ذخیره کن.',
    'Lege für den Gäste-Access-Point VLAN 30 „GAESTE“ an, weise Port Gi1/0/5 zu und speichere die Konfiguration.',
    'Create VLAN 30 “GAESTE” for the guest access point, assign port Gi1/0/5 and save the configuration.'],
  steps: [
    ['با show vlan brief بررسی کن که VLAN 30 هنوز وجود ندارد.', 'VLAN 30 را بساز و نام بده.', 'روی Gi1/0/5 توضیح بنویس، حالت Access و VLAN 30 را تنظیم کن.', 'portfast را فقط روی پورت دستگاه پایانی فعال کن.', 'نتیجه را بررسی و running-config را در startup-config ذخیره کن.'],
    ['Mit show vlan brief prüfen, dass VLAN 30 noch nicht existiert.', 'VLAN 30 anlegen und benennen.', 'Gi1/0/5 beschreiben, Access-Modus und VLAN 30 setzen.', 'PortFast nur auf diesem Endgeräte-Port aktivieren.', 'Ergebnis prüfen und running-config in die startup-config sichern.'],
    ['Check with show vlan brief that VLAN 30 does not exist yet.', 'Create and name VLAN 30.', 'Describe Gi1/0/5, set access mode and VLAN 30.', 'Enable PortFast on this edge port only.', 'Verify, then copy running-config to startup-config.']],
  code: 'configure terminal\nvlan 30\n name GAESTE\nexit\ninterface GigabitEthernet1/0/5\n description Gaeste-AP\n switchport mode access\n switchport access vlan 30\n spanning-tree portfast\n no shutdown\nend\nshow vlan brief\nshow interfaces GigabitEthernet1/0/5 switchport\ncopy running-config startup-config',
  verify: 'show vlan brief\nshow interfaces GigabitEthernet1/0/5 switchport\nshow startup-config | include vlan 30',
  checks: [
    ['VLAN 30 با نام GAESTE در show vlan brief دیده می‌شود.', 'Gi1/0/5 زیر VLAN 30 فهرست شده است.', 'خروجی switchport عبارت Access Mode VLAN: 30 را نشان می‌دهد.', 'تنظیمات بعد از ذخیره در startup-config هست.'],
    ['VLAN 30 „GAESTE“ erscheint in show vlan brief.', 'Gi1/0/5 ist unter VLAN 30 aufgeführt.', 'switchport-Ausgabe zeigt „Access Mode VLAN: 30“.', 'Konfiguration steht nach dem Speichern in der startup-config.'],
    ['VLAN 30 “GAESTE” appears in show vlan brief.', 'Gi1/0/5 is listed under VLAN 30.', 'switchport output shows “Access Mode VLAN: 30”.', 'The configuration is in startup-config after saving.']],
  caution: ['اگر Gi1/0/5 روی دستگاه تو Uplink است، پورت دیگری انتخاب کن.', 'Ist Gi1/0/5 bei dir ein Uplink, einen anderen freien Port wählen.', 'If Gi1/0/5 is an uplink on your switch, pick another free port.']
},

c8200: {
  menu: 'CLI → configure terminal → ip dhcp pool',
  heading: ['تمرین: DHCP برای شبکهٔ آزمایشگاه', 'Übung: DHCP für das Labornetz', 'Exercise: DHCP for the lab network'],
  goal: [
    'روتر باید به کلاینت‌های شبکهٔ 192.0.2.0/24 آدرس بدهد؛ آدرس‌های ۱ تا ۲۰ برای سرور و پرینتر رزرو بمانند.',
    'Der Router soll Clients im Netz 192.0.2.0/24 Adressen geben; .1 bis .20 bleiben für Server und Drucker reserviert.',
    'The router should hand out addresses in 192.0.2.0/24; .1 to .20 stay reserved for servers and printers.'],
  steps: [
    ['مطمئن شو در این شبکه DHCP دیگری فعال نیست.', 'محدودهٔ ۱ تا ۲۰ را مستثنا کن.', 'Pool با شبکه، Gateway، DNS و مدت اجاره بساز.', 'یک کلاینت را وصل کن و Binding را ببین.'],
    ['Sicherstellen, dass im Netz kein anderer DHCP-Server läuft.', 'Bereich .1–.20 ausschließen.', 'Pool mit Netz, Gateway, DNS und Lease-Dauer anlegen.', 'Einen Client anschließen und das Binding prüfen.'],
    ['Make sure no other DHCP server runs on this network.', 'Exclude .1–.20.', 'Create the pool with network, gateway, DNS and lease time.', 'Connect a client and check the binding.']],
  code: 'configure terminal\nip dhcp excluded-address 192.0.2.1 192.0.2.20\nip dhcp pool LAB-LAN\n network 192.0.2.0 255.255.255.0\n default-router 192.0.2.1\n dns-server 192.0.2.10\n lease 1\nend\nshow ip dhcp pool\nshow ip dhcp binding\ncopy running-config startup-config',
  verify: 'show ip dhcp pool LAB-LAN\nshow ip dhcp binding\nshow ip dhcp conflict',
  checks: [
    ['show ip dhcp pool شبکهٔ 192.0.2.0/24 را نشان می‌دهد.', 'کلاینت آدرسی بین 192.0.2.21 و 192.0.2.254 گرفته است.', 'Gateway و DNS کلاینت درست است (ipconfig /all).', 'show ip dhcp conflict خالی است.'],
    ['show ip dhcp pool zeigt das Netz 192.0.2.0/24.', 'Der Client hat eine Adresse zwischen .21 und .254.', 'Gateway und DNS am Client stimmen (ipconfig /all).', 'show ip dhcp conflict ist leer.'],
    ['show ip dhcp pool shows 192.0.2.0/24.', 'The client got an address between .21 and .254.', 'Client gateway and DNS are correct (ipconfig /all).', 'show ip dhcp conflict is empty.']],
  caution: ['دو DHCP Server در یک شبکه باعث قطعی کاربران می‌شود.', 'Zwei DHCP-Server im selben Netz führen zu Ausfällen bei Benutzern.', 'Two DHCP servers on one network cause user outages.']
},

fortigate: {
  menu: 'CLI → config firewall address / config firewall policy',
  heading: ['تمرین: فقط HTTPS و DNS برای یک کامپیوتر', 'Übung: Nur HTTPS und DNS für einen PC', 'Exercise: HTTPS and DNS only for one PC'],
  goal: [
    'برای کامپیوتر آزمایشی 192.0.2.50 یک Address Object و یک Policy بساز که فقط HTTPS و DNS به اینترنت اجازه دارد و ثبت می‌شود.',
    'Lege für den Labor-PC 192.0.2.50 ein Adressobjekt und eine Policy an, die nur HTTPS und DNS ins Internet erlaubt und protokolliert.',
    'Create an address object and a policy for lab PC 192.0.2.50 that only allows HTTPS and DNS to the internet, with logging.'],
  steps: [
    ['از تنظیمات Backup بگیر (System → Configuration → Backup).', 'نام واقعی رابط‌های LAN و WAN را در Network → Interfaces پیدا کن.', 'Address Object با نام LAB-PC بساز.', 'Policy با سرویس HTTPS و DNS، NAT و Log بساز.', 'ترتیب Policy را بررسی کن: باید بالای قانون‌های کلی‌تر باشد.'],
    ['Konfigurations-Backup erstellen (System → Configuration → Backup).', 'Echte LAN-/WAN-Interfacenamen unter Network → Interfaces ermitteln.', 'Adressobjekt LAB-PC anlegen.', 'Policy mit HTTPS und DNS, NAT und Logging anlegen.', 'Reihenfolge prüfen: Die Regel muss vor allgemeineren Regeln stehen.'],
    ['Back up the configuration (System → Configuration → Backup).', 'Find the real LAN/WAN interface names under Network → Interfaces.', 'Create address object LAB-PC.', 'Create the policy with HTTPS and DNS, NAT and logging.', 'Check the order: the rule must sit above broader rules.']],
  code: 'config firewall address\n    edit "LAB-PC"\n        set subnet 192.0.2.50 255.255.255.255\n    next\nend\nconfig firewall policy\n    edit 0\n        set name "LAB-PC-to-WEB"\n        set srcintf "internal"\n        set dstintf "wan1"\n        set srcaddr "LAB-PC"\n        set dstaddr "all"\n        set service "HTTPS" "DNS"\n        set schedule "always"\n        set action accept\n        set nat enable\n        set logtraffic all\n    next\nend',
  verify: 'show firewall policy\nGUI: Log & Report > Forward Traffic (Filter: Source 192.0.2.50)',
  checks: [
    ['Policy با نام LAB-PC-to-WEB در فهرست دیده می‌شود.', 'باز کردن یک سایت HTTPS از کامپیوتر آزمایشی کار می‌کند.', 'Ping یا HTTP ساده از همان کامپیوتر رد می‌شود.', 'در Forward Traffic شمارهٔ همین Policy دیده می‌شود.'],
    ['Policy „LAB-PC-to-WEB“ steht in der Liste.', 'Eine HTTPS-Webseite vom Labor-PC lädt.', 'Ping oder einfaches HTTP vom selben PC wird nicht erlaubt.', 'Forward Traffic zeigt die ID genau dieser Policy.'],
    ['Policy “LAB-PC-to-WEB” is in the list.', 'An HTTPS website loads from the lab PC.', 'Ping or plain HTTP from the same PC is not allowed.', 'Forward Traffic shows this policy’s ID.']],
  caution: ['نام رابط‌ها (internal، lan، port1، wan1) در هر مدل فرق می‌کند؛ اول نام واقعی را بخوان.', 'Interfacenamen (internal, lan, port1, wan1) unterscheiden sich je nach Modell; zuerst die echten Namen ablesen.', 'Interface names (internal, lan, port1, wan1) differ by model; read the real names first.']
},

aruba: {
  menu: 'CLI → configure terminal → interface 1/1/24 → vlan trunk',
  heading: ['تمرین: Uplink از نوع Trunk', 'Übung: Uplink als Trunk', 'Exercise: uplink as a trunk'],
  goal: [
    'پورت 1/1/24 را Trunk کن که فقط VLAN 10 و 20 را عبور دهد و VLAN 1 را Native نگه دارد؛ بعد تنظیمات را ذخیره کن.',
    'Konfiguriere Port 1/1/24 als Trunk, der nur VLAN 10 und 20 überträgt, mit VLAN 1 als Native VLAN; danach speichern.',
    'Configure port 1/1/24 as a trunk carrying only VLANs 10 and 20, with VLAN 1 as native VLAN; then save.'],
  steps: [
    ['VLAN 20 را بساز (VLAN 10 از درس قبل وجود دارد).', 'تنظیمات طرف مقابل Uplink را یادداشت کن.', 'Native VLAN و VLANهای مجاز را روی 1/1/24 تنظیم کن.', 'با write memory ذخیره کن و دو طرف را مقایسه کن.'],
    ['VLAN 20 anlegen (VLAN 10 existiert aus der vorigen Lektion).', 'Einstellungen der Gegenseite des Uplinks notieren.', 'Native VLAN und erlaubte VLANs auf 1/1/24 setzen.', 'Mit write memory speichern und beide Seiten vergleichen.'],
    ['Create VLAN 20 (VLAN 10 exists from the previous topic).', 'Note the settings of the uplink’s other side.', 'Set native and allowed VLANs on 1/1/24.', 'Save with write memory and compare both sides.']],
  code: 'configure terminal\nvlan 20\n name GAESTE\nexit\ninterface 1/1/24\n description Uplink-Core\n no shutdown\n vlan trunk native 1\n vlan trunk allowed 10,20\nexit\nwrite memory\nshow running-config interface 1/1/24\nshow vlan',
  verify: 'show running-config interface 1/1/24\nshow vlan\nshow lldp neighbor-info',
  checks: [
    ['running-config پورت 1/1/24 عبارت vlan trunk allowed 10,20 را دارد.', 'show vlan پورت 1/1/24 را در VLAN 10 و 20 نشان می‌دهد.', 'LLDP سوئیچ طرف مقابل را نشان می‌دهد.', 'بعد از write memory تغییرات ذخیره شده‌اند.'],
    ['Die running-config von 1/1/24 enthält „vlan trunk allowed 10,20“.', 'show vlan zeigt 1/1/24 in VLAN 10 und 20.', 'LLDP zeigt den Nachbar-Switch.', 'Nach write memory sind die Änderungen gespeichert.'],
    ['running-config of 1/1/24 contains “vlan trunk allowed 10,20”.', 'show vlan lists 1/1/24 in VLANs 10 and 20.', 'LLDP shows the neighbouring switch.', 'Changes are saved after write memory.']],
  caution: ['اگر از راه دور از طریق همین Uplink وصل هستی، ممکن است دسترسی‌ات قطع شود؛ از Console استفاده کن.', 'Bist du über genau diesen Uplink verbunden, kannst du dich aussperren; Konsole nutzen.', 'If you are connected through this uplink you may lock yourself out; use the console.']
},

dell: {
  menu: 'iDRAC → iDRAC Settings → Users → Local Users',
  heading: ['تمرین: کاربر شخصی به جای root', 'Übung: Persönliches Konto statt root', 'Exercise: personal account instead of root'],
  goal: [
    'برای خودت یک کاربر iDRAC با نام شخصی بساز تا کار مدیریتی قابل ردیابی باشد، و گذرواژهٔ پیش‌فرض root را بررسی کن.',
    'Lege ein persönliches iDRAC-Konto an, damit Admin-Arbeit nachvollziehbar ist, und prüfe das Standardkennwort von root.',
    'Create a personal iDRAC account so admin work is traceable, and check the default root password.'],
  steps: [
    ['در iDRAC Settings → Users یک شمارهٔ کاربر خالی (مثلاً 3) پیدا کن.', 'نام کاربری شخصی و گذرواژهٔ قوی بگذار؛ فقط به اندازهٔ نیاز دسترسی بده.', 'با کاربر جدید وارد شو.', 'اگر root هنوز گذرواژهٔ پیش‌فرض دارد، طبق دستور سرپرست آن را عوض کن.'],
    ['Unter iDRAC Settings → Users einen freien Benutzerplatz (z. B. 3) wählen.', 'Persönlichen Namen und starkes Kennwort setzen; nur nötige Rechte vergeben.', 'Mit dem neuen Konto anmelden.', 'Hat root noch das Standardkennwort, nach Vorgabe der Leitung ändern.'],
    ['Pick a free user slot (e.g. 3) under iDRAC Settings → Users.', 'Set a personal name and strong password; grant only needed rights.', 'Sign in with the new account.', 'If root still has the default password, change it as your lead specifies.']],
  code: '# GUI: iDRAC Settings > Users > Local Users > Add\n# Alternative with RACADM (never store the password in scripts):\nracadm get iDRAC.Users.3\nracadm set iDRAC.Users.3.UserName techniker\nracadm set iDRAC.Users.3.Password <strong-password>\nracadm set iDRAC.Users.3.Privilege 0x1ff\nracadm set iDRAC.Users.3.Enable 1\nracadm get iDRAC.Users.3',
  verify: 'iDRAC: Maintenance > Lifecycle Log (sign-in of the new account)\nracadm get iDRAC.Users.3',
  checks: [
    ['کاربر جدید در فهرست Local Users فعال است.', 'ورود با کاربر جدید موفق است.', 'ورود در Lifecycle Log با نام کاربر جدید ثبت شده است.', 'گذرواژه در هیچ فایل یا اسکریپتی ذخیره نشده است.'],
    ['Das neue Konto ist unter Local Users aktiv.', 'Anmeldung mit dem neuen Konto klappt.', 'Das Lifecycle Log zeigt die Anmeldung unter dem neuen Namen.', 'Das Kennwort steht in keiner Datei und keinem Skript.'],
    ['The new account is enabled under Local Users.', 'Sign-in with the new account works.', 'The Lifecycle Log shows the sign-in under the new name.', 'The password is not stored in any file or script.']],
  caution: ['0x1ff یعنی دسترسی کامل مدیر؛ برای کاربر عادی فقط دسترسی لازم را بده.', '0x1ff bedeutet volle Administratorrechte; für normale Konten nur nötige Rechte vergeben.', '0x1ff means full administrator rights; give normal accounts only what they need.']
},

opnsense: {
  menu: 'Firewall → Aliases / Firewall → Rules → GUEST',
  heading: ['تمرین: شبکهٔ مهمان فقط به اینترنت', 'Übung: Gästenetz nur ins Internet', 'Exercise: guest network to internet only'],
  goal: [
    'کاربران شبکهٔ مهمان باید به اینترنت برسند ولی به هیچ شبکهٔ داخلی (آدرس‌های خصوصی) دسترسی نداشته باشند.',
    'Gäste sollen ins Internet kommen, aber kein internes Netz (private Adressbereiche) erreichen.',
    'Guests should reach the internet but no internal network (private address ranges).'],
  steps: [
    ['Alias با نام PRIVATE_NETS و سه محدودهٔ خصوصی بساز.', 'قانون ۱: اجازهٔ DNS به خود فایروال.', 'قانون ۲: مسدود کردن مقصد PRIVATE_NETS.', 'قانون ۳: اجازهٔ بقیهٔ ترافیک به اینترنت.', 'Apply را بزن و از یک کلاینت مهمان آزمایش کن.'],
    ['Alias PRIVATE_NETS mit den drei privaten Bereichen anlegen.', 'Regel 1: DNS zur Firewall selbst erlauben.', 'Regel 2: Ziel PRIVATE_NETS blockieren.', 'Regel 3: restlichen Verkehr ins Internet erlauben.', 'Apply klicken und mit einem Gast-Client testen.'],
    ['Create alias PRIVATE_NETS with the three private ranges.', 'Rule 1: allow DNS to the firewall itself.', 'Rule 2: block destination PRIVATE_NETS.', 'Rule 3: allow remaining traffic to the internet.', 'Click Apply and test from a guest client.']],
  code: 'Firewall > Aliases > Add\n  Name: PRIVATE_NETS   Type: Network(s)\n  Content: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16\nFirewall > Rules > GUEST (order top to bottom):\n  1) Pass   Source: GUEST net  Destination: This Firewall  Port: 53 (DNS)\n  2) Block  Source: GUEST net  Destination: PRIVATE_NETS   Log: an\n  3) Pass   Source: GUEST net  Destination: any\nApply changes',
  verify: 'Firewall > Log Files > Live View (Filter: GUEST)\nClient: nslookup example.com · ping 192.168.1.1 (must fail)',
  checks: [
    ['کلاینت مهمان سایت‌های اینترنتی را باز می‌کند.', 'Ping به یک آدرس داخلی (مثلاً 192.168.1.1) شکست می‌خورد.', 'Live View برای این تلاش قانون Block را نشان می‌دهد.', 'ترتیب قانون‌ها: DNS، Block، Pass.'],
    ['Der Gast-Client öffnet Internetseiten.', 'Ping auf eine interne Adresse (z. B. 192.168.1.1) scheitert.', 'Live View zeigt dafür die Block-Regel.', 'Regelreihenfolge: DNS, Block, Pass.'],
    ['The guest client opens internet sites.', 'Ping to an internal address (e.g. 192.168.1.1) fails.', 'Live View shows the block rule for it.', 'Rule order: DNS, block, pass.']],
  caution: ['ترتیب مهم است: اگر قانون Pass بالاتر باشد، شبکهٔ داخلی باز می‌ماند.', 'Die Reihenfolge zählt: Steht die Pass-Regel oben, ist das interne Netz offen.', 'Order matters: if the pass rule is on top, the internal network stays open.']
},

'mikrotik-hex': {
  menu: 'WinBox / WebFig → IP → Services',
  heading: ['تمرین: امن کردن دسترسی مدیریتی', 'Übung: Verwaltungszugang absichern', 'Exercise: secure management access'],
  goal: [
    'سرویس‌های ناامن (Telnet، FTP، HTTP، API) را خاموش کن و WinBox و SSH را فقط از شبکهٔ مدیریت مجاز کن.',
    'Unsichere Dienste (Telnet, FTP, HTTP, API) abschalten und WinBox/SSH nur aus dem Verwaltungsnetz erlauben.',
    'Disable insecure services (Telnet, FTP, HTTP, API) and allow WinBox/SSH only from the management network.'],
  steps: [
    ['با /ip service print وضعیت فعلی را ثبت کن.', 'مطمئن شو خودت از 192.168.88.0/24 وصل هستی (پیش‌فرض hEX).', 'سرویس‌های ناامن را غیرفعال کن.', 'WinBox و SSH را به شبکهٔ مدیریت محدود کن.', 'یک اتصال تازه با WinBox آزمایش کن، قبل از بستن اتصال فعلی.'],
    ['Ist-Zustand mit /ip service print festhalten.', 'Sicherstellen, dass du aus 192.168.88.0/24 verbunden bist (hEX-Standard).', 'Unsichere Dienste deaktivieren.', 'WinBox und SSH auf das Verwaltungsnetz beschränken.', 'Neue WinBox-Verbindung testen, bevor du die aktuelle schließt.'],
    ['Record the current state with /ip service print.', 'Make sure you connect from 192.168.88.0/24 (hEX default).', 'Disable insecure services.', 'Restrict WinBox and SSH to the management network.', 'Test a new WinBox session before closing the current one.']],
  code: '/ip service print\n/ip service disable telnet\n/ip service disable ftp\n/ip service disable www\n/ip service disable api\n/ip service disable api-ssl\n/ip service set winbox address=192.168.88.0/24\n/ip service set ssh address=192.168.88.0/24\n/ip service print',
  verify: '/ip service print\n# Test: telnet 192.168.88.1 must fail, WinBox must work',
  checks: [
    ['telnet، ftp، www، api و api-ssl در فهرست با X (غیرفعال) نشان داده می‌شوند.', 'WinBox و SSH فقط آدرس 192.168.88.0/24 را دارند.', 'اتصال تازهٔ WinBox از شبکهٔ مدیریت کار می‌کند.', 'Telnet به روتر شکست می‌خورد.'],
    ['telnet, ftp, www, api, api-ssl sind als deaktiviert (X) markiert.', 'WinBox und SSH haben nur 192.168.88.0/24 als erlaubte Adresse.', 'Neue WinBox-Verbindung aus dem Verwaltungsnetz klappt.', 'Telnet zum Router scheitert.'],
    ['telnet, ftp, www, api, api-ssl are marked disabled (X).', 'WinBox and SSH only allow 192.168.88.0/24.', 'A new WinBox session from the management network works.', 'Telnet to the router fails.']],
  caution: ['با خاموش کردن www، WebFig از راه HTTP بسته می‌شود؛ اگر فقط با WebFig کار می‌کنی، اول www-ssl را تنظیم کن.', 'Mit „www“ wird WebFig über HTTP abgeschaltet; arbeitest du nur mit WebFig, zuerst www-ssl einrichten.', 'Disabling “www” turns off WebFig over HTTP; if you only use WebFig, set up www-ssl first.']
},

edgerouter4: {
  menu: 'CLI → configure → set service dhcp-server',
  heading: ['تمرین: LAN آزمایشگاه با DHCP', 'Übung: Labor-LAN mit DHCP', 'Exercise: lab LAN with DHCP'],
  goal: [
    'به eth1 آدرس 192.0.2.1/24 بده و برای این شبکه DHCP با محدودهٔ .100 تا .150 بساز.',
    'eth1 die Adresse 192.0.2.1/24 geben und für dieses Netz DHCP mit dem Bereich .100–.150 einrichten.',
    'Give eth1 the address 192.0.2.1/24 and set up DHCP for this network with range .100–.150.'],
  steps: [
    ['بررسی کن eth1 در جای دیگری استفاده نشده است.', 'وارد حالت configure شو و آدرس eth1 را بده.', 'Shared Network با Subnet، Gateway، DNS و محدوده بساز.', 'commit و save کن.', 'کلاینت را به eth1 وصل کن و Leases را ببین.'],
    ['Prüfen, dass eth1 nicht anderweitig genutzt wird.', 'In den configure-Modus wechseln und eth1 adressieren.', 'Shared Network mit Subnetz, Gateway, DNS und Bereich anlegen.', 'commit und save ausführen.', 'Client an eth1 anschließen und Leases prüfen.'],
    ['Check that eth1 is not used elsewhere.', 'Enter configure mode and address eth1.', 'Create a shared network with subnet, gateway, DNS and range.', 'Run commit and save.', 'Connect a client to eth1 and check the leases.']],
  code: 'configure\nset interfaces ethernet eth1 address 192.0.2.1/24\nset interfaces ethernet eth1 description LAB-LAN\nset service dhcp-server shared-network-name LAB authoritative enable\nset service dhcp-server shared-network-name LAB subnet 192.0.2.0/24 default-router 192.0.2.1\nset service dhcp-server shared-network-name LAB subnet 192.0.2.0/24 dns-server 192.0.2.1\nset service dhcp-server shared-network-name LAB subnet 192.0.2.0/24 start 192.0.2.100 stop 192.0.2.150\ncommit\nsave\nexit\nshow dhcp leases',
  verify: 'show interfaces\nshow dhcp leases\nshow dhcp statistics',
  checks: [
    ['show interfaces برای eth1 آدرس 192.0.2.1/24 را نشان می‌دهد.', 'کلاینت آدرسی بین .100 و .150 گرفته است.', 'show dhcp leases کلاینت را نشان می‌دهد.', 'بعد از save و ری‌استارت تنظیمات باقی می‌مانند.'],
    ['show interfaces zeigt 192.0.2.1/24 an eth1.', 'Der Client hat eine Adresse zwischen .100 und .150.', 'show dhcp leases listet den Client.', 'Nach save überlebt die Konfiguration einen Neustart.'],
    ['show interfaces shows 192.0.2.1/24 on eth1.', 'The client got an address between .100 and .150.', 'show dhcp leases lists the client.', 'After save the configuration survives a reboot.']],
  caution: ['بدون save تغییرات بعد از ری‌استارت از بین می‌روند؛ commit-confirm برای تغییرات از راه دور امن‌تر است.', 'Ohne save ist alles nach einem Neustart weg; für Fernänderungen ist commit-confirm sicherer.', 'Without save everything is lost on reboot; commit-confirm is safer for remote changes.']
},

paloalto: {
  menu: 'CLI → configure → set rulebase security rules',
  heading: ['تمرین: قانون امنیتی بر اساس Application', 'Übung: Sicherheitsregel nach Application', 'Exercise: application-based security rule'],
  goal: [
    'برای کامپیوتر 192.0.2.50 قانونی بساز که فقط web-browsing و ssl را با پورت‌های استاندارد اجازه دهد، و با test security-policy-match بررسی کن.',
    'Für PC 192.0.2.50 eine Regel anlegen, die nur web-browsing und ssl auf Standardports erlaubt, und mit test security-policy-match prüfen.',
    'Create a rule for PC 192.0.2.50 allowing only web-browsing and ssl on default ports, then check it with test security-policy-match.'],
  steps: [
    ['نام Zoneها را در Network → Zones بخوان.', 'قانون را با application و service application-default بساز.', 'Log at Session End را فعال نگه دار.', 'commit کن.', 'با test security-policy-match ببین کدام قانون انتخاب می‌شود.'],
    ['Zonennamen unter Network → Zones ablesen.', 'Regel mit application und service application-default anlegen.', 'Log at Session End aktiv lassen.', 'commit ausführen.', 'Mit test security-policy-match prüfen, welche Regel greift.'],
    ['Read zone names under Network → Zones.', 'Create the rule with application and service application-default.', 'Keep Log at Session End enabled.', 'Run commit.', 'Use test security-policy-match to see which rule matches.']],
  code: 'configure\nset rulebase security rules LAB-WEB from trust to untrust source 192.0.2.50 destination any application [ web-browsing ssl ] service application-default action allow\nset rulebase security rules LAB-WEB log-end yes\ncommit\nexit\ntest security-policy-match from trust to untrust source 192.0.2.50 destination 198.51.100.10 protocol 6 destination-port 443 application ssl',
  verify: 'show running security-policy\nMonitor > Logs > Traffic (Rule: LAB-WEB)',
  checks: [
    ['commit بدون خطا انجام شد.', 'test security-policy-match قانون LAB-WEB را نشان می‌دهد.', 'در Traffic Log ترافیک ssl با قانون LAB-WEB دیده می‌شود.', 'قانون بالای قانون‌های کلی‌تر قرار دارد.'],
    ['commit lief ohne Fehler.', 'test security-policy-match zeigt LAB-WEB.', 'Das Traffic-Log zeigt ssl-Verkehr mit Regel LAB-WEB.', 'Die Regel steht vor allgemeineren Regeln.'],
    ['commit completed without errors.', 'test security-policy-match returns LAB-WEB.', 'The traffic log shows ssl traffic with rule LAB-WEB.', 'The rule sits above broader rules.']],
  caution: ['نام Zoneهای trust و untrust فقط نمونه است؛ قانون‌ها از بالا به پایین بررسی می‌شوند و اولین تطابق اعمال می‌شود.', 'trust/untrust sind Beispielnamen; Regeln werden von oben nach unten geprüft, die erste passende gilt.', 'trust/untrust are example names; rules are evaluated top-down and the first match wins.']
},

'hpe-ilo': {
  menu: 'iLO → Administration → User Administration',
  heading: ['تمرین: کاربر iLO با کمترین دسترسی', 'Übung: iLO-Konto mit minimalen Rechten', 'Exercise: least-privilege iLO account'],
  goal: [
    'برای همکار پشتیبانی یک کاربر iLO بساز که فقط بتواند وارد شود، Remote Console ببیند و سرور را Reset کند؛ نه تنظیمات iLO و نه کاربران را تغییر دهد.',
    'Für einen Support-Kollegen ein iLO-Konto anlegen, das sich anmelden, die Remote Console nutzen und den Server neu starten darf – aber weder iLO-Einstellungen noch Benutzer ändert.',
    'Create an iLO account for a support colleague that can sign in, use the remote console and reset the server, but cannot change iLO settings or users.'],
  steps: [
    ['در User Administration گزینهٔ New را بزن.', 'نام کاربری شخصی و گذرواژهٔ قوی بگذار.', 'فقط Login، Remote Console و Virtual Power and Reset را انتخاب کن.', 'Configure iLO Settings و Administer User Accounts را خاموش بگذار.', 'با کاربر جدید وارد شو و آزمایش کن که تنظیمات قابل تغییر نیستند.'],
    ['In User Administration auf New klicken.', 'Persönlichen Namen und starkes Kennwort setzen.', 'Nur Login, Remote Console und Virtual Power and Reset wählen.', 'Configure iLO Settings und Administer User Accounts aus lassen.', 'Mit dem neuen Konto anmelden und prüfen, dass Einstellungen gesperrt sind.'],
    ['In User Administration click New.', 'Set a personal name and strong password.', 'Select only Login, Remote Console and Virtual Power and Reset.', 'Leave Configure iLO Settings and Administer User Accounts off.', 'Sign in with the new account and check that settings are locked.']],
  code: 'GUI: iLO > Administration > User Administration > New\n  Login Name: support-<name>\n  Privileges: [x] Login  [x] Remote Console  [x] Virtual Power and Reset\n              [ ] Configure iLO Settings  [ ] Administer User Accounts\n              [ ] Virtual Media  [ ] Host BIOS\nAdd User',
  verify: 'iLO > Information > Security Log / iLO Event Log (sign-in)\nWith the new account: settings pages are greyed out',
  checks: [
    ['کاربر جدید در فهرست با همان دسترسی‌ها دیده می‌شود.', 'ورود و Remote Console با کاربر جدید کار می‌کند.', 'صفحه‌های تنظیمات iLO برای این کاربر قفل هستند.', 'ورود در Event Log ثبت شده است.'],
    ['Das neue Konto steht mit genau diesen Rechten in der Liste.', 'Anmeldung und Remote Console klappen mit dem neuen Konto.', 'iLO-Einstellungsseiten sind für dieses Konto gesperrt.', 'Die Anmeldung steht im Event Log.'],
    ['The new account is listed with exactly these rights.', 'Sign-in and remote console work with the new account.', 'iLO settings pages are locked for this account.', 'The sign-in appears in the event log.']],
  caution: ['نام دقیق دسترسی‌ها به نسخهٔ Firmware بستگی دارد؛ iLO را فقط در شبکهٔ مدیریت جدا نگه دار.', 'Rechte-Bezeichnungen hängen von der Firmware ab; iLO nur im getrennten Verwaltungsnetz betreiben.', 'Privilege names depend on firmware; keep iLO on a separate management network only.']
},

'unifi-switch': {
  menu: 'UniFi Network → Settings → Networks / Devices → Ports',
  heading: ['تمرین: شبکهٔ مهمان روی یک پورت سوئیچ', 'Übung: Gästenetz auf einem Switch-Port', 'Exercise: guest network on a switch port'],
  goal: [
    'شبکهٔ مجازی «Gaeste» با VLAN 30 بساز و پورت ۵ سوئیچ را برای Access Point مهمان روی آن تنظیم کن.',
    'Virtuelles Netz „Gaeste“ mit VLAN 30 anlegen und Port 5 des Switches für den Gäste-Access-Point darauf setzen.',
    'Create virtual network “Gaeste” with VLAN 30 and set switch port 5 to it for the guest access point.'],
  steps: [
    ['در Settings → Networks یک Network جدید با VLAN ID 30 بساز.', 'Gateway و DHCP را طبق طرح شبکه تنظیم کن (یا فقط VLAN اگر Gateway دیگری است).', 'در Devices → Switch → Ports پورت ۵ را باز کن.', 'Native VLAN / Network را روی Gaeste بگذار و Apply کن.', 'دستگاه را وصل کن و آدرس IP آن را بررسی کن.'],
    ['Unter Settings → Networks ein neues Netz mit VLAN-ID 30 anlegen.', 'Gateway und DHCP nach Netzplan setzen (oder nur VLAN, wenn ein anderes Gateway zuständig ist).', 'Unter Devices → Switch → Ports Port 5 öffnen.', 'Native VLAN / Network auf Gaeste setzen und Apply.', 'Gerät anschließen und seine IP-Adresse prüfen.'],
    ['Create a new network with VLAN ID 30 under Settings → Networks.', 'Set gateway and DHCP per the network plan (or VLAN only if another gateway is responsible).', 'Open port 5 under Devices → Switch → Ports.', 'Set Native VLAN / Network to Gaeste and apply.', 'Connect the device and check its IP address.']],
  code: 'Settings > Networks > New Virtual Network\n  Name: Gaeste   VLAN ID: 30\n  (Gateway/Subnet/DHCP per network plan)\nDevices > [Switch] > Ports > Port 5\n  Native VLAN / Network: Gaeste\n  Tagged VLAN Management: Block All\nApply Changes',
  verify: 'Devices > [Switch] > Ports > Port 5 (Network: Gaeste)\nClient Devices > Client: network Gaeste, IP from the VLAN 30 range',
  checks: [
    ['شبکهٔ Gaeste با VLAN 30 در فهرست Networks هست.', 'پورت ۵ شبکهٔ Gaeste را نشان می‌دهد.', 'دستگاه وصل‌شده آدرسی از محدودهٔ VLAN 30 دارد.', 'Uplink سوئیچ هنوز وصل است و VLAN 30 را عبور می‌دهد.'],
    ['Netz „Gaeste“ mit VLAN 30 steht unter Networks.', 'Port 5 zeigt Netzwerk Gaeste.', 'Das angeschlossene Gerät hat eine IP aus dem VLAN-30-Bereich.', 'Der Switch-Uplink ist weiter online und überträgt VLAN 30.'],
    ['Network “Gaeste” with VLAN 30 is under Networks.', 'Port 5 shows network Gaeste.', 'The connected device has an IP from the VLAN 30 range.', 'The switch uplink is still online and carries VLAN 30.']],
  caution: ['پورت Uplink سوئیچ را تغییر نده؛ در غیر این صورت سوئیچ از Controller جدا می‌شود.', 'Den Uplink-Port des Switches nicht ändern, sonst verliert der Switch den Controller.', 'Do not change the switch’s uplink port or it will lose the controller.']
},

synology: {
  menu: 'DSM → Hyper Backup → + → Data backup task',
  heading: ['تمرین: پشتیبان رمزگذاری‌شده روی USB و آزمایش بازیابی', 'Übung: Verschlüsseltes Backup auf USB und Wiederherstellungstest', 'Exercise: encrypted USB backup and restore test'],
  goal: [
    'برای پوشهٔ مشترک «Buchhaltung» یک کار Hyper Backup روی دیسک USB با رمزگذاری، زمان‌بندی شبانه و نگهداری نسخه‌ها بساز و یک فایل را آزمایشی بازیابی کن.',
    'Für den freigegebenen Ordner „Buchhaltung“ eine Hyper-Backup-Aufgabe auf eine USB-Festplatte mit Verschlüsselung, nächtlichem Zeitplan und Versionsrotation anlegen und eine Datei testweise wiederherstellen.',
    'Create a Hyper Backup task for shared folder “Buchhaltung” to a USB disk with encryption, nightly schedule and version rotation, then restore one file as a test.'],
  steps: [
    ['Hyper Backup را از Package Center نصب و باز کن.', 'دکمهٔ + را بزن و Data backup task را انتخاب کن؛ مقصد Local Shared Folder & External Storage و سپس دیسک USB است.', 'پوشهٔ Buchhaltung را انتخاب کن.', 'زمان‌بندی شبانه، Integrity check و Client-side encryption را فعال کن؛ رمز را در گاوصندوق رمز نگه دار.', 'Rotation را روی Smart Recycle بگذار، Back up now بزن و یک فایل را در جای دیگر بازیابی کن.'],
    ['Hyper Backup aus dem Paket-Zentrum installieren und öffnen.', '+ → Data backup task → Local Shared Folder & External Storage → USB-Laufwerk.', 'Ordner Buchhaltung auswählen.', 'Nächtlichen Zeitplan, Integritätsprüfung und Client-side encryption aktivieren; Kennwort im Passwort-Tresor ablegen.', 'Rotation „Smart Recycle“ wählen, Back up now und eine Datei an anderer Stelle wiederherstellen.'],
    ['Install and open Hyper Backup from Package Center.', '+ → Data backup task → Local Shared Folder & External Storage → USB disk.', 'Select the Buchhaltung folder.', 'Enable nightly schedule, integrity check and client-side encryption; store the password in a password vault.', 'Choose Smart Recycle rotation, run Back up now and restore one file to another location.']],
  code: 'Hyper Backup > + > Data backup task\n  Destination: Local Shared Folder & External Storage > usbshare1\n  Data: Buchhaltung\n  Task: Backup-Buchhaltung-USB\n  [x] Enable task notification\n  [x] Enable backup schedule: daily 22:00\n  [x] Enable integrity check\n  [x] Enable client-side encryption (store password in a vault!)\n  Rotation: Smart Recycle\nBack up now\nTest: Backup Explorer > select file > Copy to … (different folder)',
  verify: 'Hyper Backup > Task: status “Success”, time of last backup\nRestored file opens correctly',
  checks: [
    ['کار پشتیبان با وضعیت Success تمام شد.', 'زمان‌بندی، رمزگذاری و Rotation در تنظیمات کار فعال‌اند.', 'یک فایل در پوشهٔ دیگری بازیابی شد و درست باز می‌شود.', 'رمز رمزگذاری جدا از NAS نگهداری می‌شود.'],
    ['Die Sicherung endete mit Status „Success“.', 'Zeitplan, Verschlüsselung und Rotation sind in der Aufgabe aktiv.', 'Eine Datei wurde an anderer Stelle wiederhergestellt und öffnet sich korrekt.', 'Das Verschlüsselungskennwort liegt getrennt vom NAS.'],
    ['The backup finished with status “Success”.', 'Schedule, encryption and rotation are enabled in the task.', 'A file was restored to another location and opens correctly.', 'The encryption password is kept separately from the NAS.']],
  caution: ['بدون رمز رمزگذاری، پشتیبان قابل بازیابی نیست؛ فایل را روی پوشهٔ اصلی بازیابی نکن.', 'Ohne Verschlüsselungskennwort ist das Backup nicht wiederherstellbar; nie über den Originalordner zurückspielen.', 'Without the encryption password the backup cannot be restored; never restore over the original folder.']
}
};
})();
