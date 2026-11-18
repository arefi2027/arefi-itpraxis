/* Arefi ITPraxis – Lernstrecke Linux-Server, Teil 2 (Module 5–8). [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiLXCourse = window.ArefiLXCourse || { modules: [] };
C.modules.push(

{
  id: 'lx-users', part: 2,
  title: ['کاربران، گروه‌ها و دسترسی‌ها', 'Benutzer, Gruppen und Rechte', 'Users, groups and permissions'],
  goal: ['کاربر و گروه بسازی، دسترسی rwx را بخوانی و تنظیم کنی، پوشهٔ گروهی با setgid و ACL بسازی و sudo را محدود بدهی.', 'Du legst Benutzer und Gruppen an, liest und setzt rwx-Rechte, baust einen Gruppenordner mit setgid und ACLs und vergibst sudo gezielt.', 'Create users and groups, read and set rwx permissions, build a group folder with setgid and ACLs and grant sudo narrowly.'],
  why: ['اکثر مشکلات «Permission denied» از دسترسی اشتباه می‌آیند و دسترسی زیاد خطر امنیتی است. اصل کمترین دسترسی در هر مصاحبه پرسیده می‌شود.', 'Die meisten „Permission denied“-Fälle sind falsche Rechte, zu viele Rechte sind ein Sicherheitsrisiko. Least Privilege kommt in jedem Gespräch.', 'Most “Permission denied” cases are wrong permissions, and too many permissions are a risk. Least privilege comes up in every interview.'],
  know: [
    ['هر فایل مالک، گروه و سه دسته دسترسی دارد: u/g/o با r=4، w=2، x=1؛ مثلاً 750 یعنی مالک همه، گروه خواندن و اجرا، بقیه هیچ.', 'Jede Datei hat Besitzer, Gruppe und drei Rechteblöcke u/g/o mit r=4, w=2, x=1; 750 heißt: Besitzer alles, Gruppe lesen+ausführen, andere nichts.', 'Every file has owner, group and three blocks u/g/o with r=4, w=2, x=1; 750 means owner all, group read+execute, others nothing.'],
    ['useradd/adduser کاربر می‌سازد، usermod -aG به گروه اضافه می‌کند (بدون -a گروه‌های قبلی پاک می‌شوند)، passwd گذرواژه می‌گذارد.', 'adduser legt Benutzer an, usermod -aG fügt Gruppen hinzu (ohne -a gehen die alten verloren), passwd setzt das Kennwort.', 'adduser creates users, usermod -aG adds groups (without -a old groups are lost), passwd sets the password.'],
    ['بیت setgid روی پوشه باعث می‌شود فایل‌های جدید گروه پوشه را بگیرند؛ sticky bit (مثل /tmp) جلوی پاک کردن فایل دیگران را می‌گیرد.', 'Das setgid-Bit auf einem Ordner vererbt dessen Gruppe an neue Dateien; das Sticky-Bit (wie /tmp) verhindert das Löschen fremder Dateien.', 'setgid on a folder makes new files inherit its group; the sticky bit (like /tmp) stops users deleting others’ files.'],
    ['ACL با setfacl و getfacl دسترسی دقیق‌تر به یک کاربر یا گروه دیگر می‌دهد، بدون تغییر مالک.', 'ACLs (setfacl/getfacl) geben einzelnen weiteren Benutzern oder Gruppen Rechte, ohne den Besitzer zu ändern.', 'ACLs (setfacl/getfacl) grant extra users or groups rights without changing the owner.'],
    ['sudo را با visudo یا فایلی در /etc/sudoers.d تنظیم کن و فقط فرمان‌های لازم را بده.', 'sudo nur per visudo oder Datei in /etc/sudoers.d einrichten und nur die nötigen Befehle erlauben.', 'Configure sudo only via visudo or a file in /etc/sudoers.d and allow only the needed commands.']],
  lab: { vm: 'LNX01', shell: 'Bash',
    steps: [
      ['گروه «buchhaltung» و دو کاربر anna و ben بساز.', 'پوشهٔ /srv/buchhaltung با مالک root:buchhaltung، دسترسی 2770 بساز.', 'با anna فایلی بساز و بررسی کن گروه فایل buchhaltung است.', 'با ACL به کاربر «pruefer» فقط دسترسی خواندن بده.', 'به ben اجازه بده فقط nginx را ری‌استارت کند.'],
      ['Gruppe „buchhaltung“ und die Benutzer anna und ben anlegen.', '/srv/buchhaltung mit Besitzer root:buchhaltung und Rechten 2770 anlegen.', 'Als anna eine Datei anlegen und prüfen, dass die Gruppe buchhaltung ist.', 'Per ACL dem Benutzer „pruefer“ nur Leserechte geben.', 'ben erlauben, nur nginx neu zu starten.'],
      ['Create group “buchhaltung” and users anna and ben.', 'Create /srv/buchhaltung owned by root:buchhaltung with mode 2770.', 'Create a file as anna and confirm its group is buchhaltung.', 'Give user “pruefer” read-only access via ACL.', 'Allow ben to restart nginx only.']],
    code: 'sudo groupadd buchhaltung\nsudo adduser --gecos "" anna && sudo adduser --gecos "" ben && sudo adduser --gecos "" pruefer\nsudo usermod -aG buchhaltung anna && sudo usermod -aG buchhaltung ben\nsudo mkdir -p /srv/buchhaltung\nsudo chown root:buchhaltung /srv/buchhaltung && sudo chmod 2770 /srv/buchhaltung\nsudo -u anna touch /srv/buchhaltung/rechnung.txt && ls -l /srv/buchhaltung\nsudo apt install -y acl\nsudo setfacl -m u:pruefer:rx /srv/buchhaltung\nsudo setfacl -m u:pruefer:r /srv/buchhaltung/rechnung.txt\ngetfacl /srv/buchhaltung\necho "ben ALL=(root) /usr/bin/systemctl restart nginx" | sudo tee /etc/sudoers.d/ben-nginx\nsudo chmod 440 /etc/sudoers.d/ben-nginx && sudo visudo -c\nsudo -l -U ben',
    checks: [
      ['ls -l نشان می‌دهد rechnung.txt گروه buchhaltung دارد.', 'pruefer می‌تواند بخواند ولی نمی‌تواند بنویسد.', 'visudo -c پیام «parsed OK» می‌دهد.', 'sudo -l -U ben فقط فرمان nginx را نشان می‌دهد.'],
      ['ls -l zeigt rechnung.txt mit Gruppe buchhaltung.', 'pruefer kann lesen, aber nicht schreiben.', 'visudo -c meldet „parsed OK“.', 'sudo -l -U ben zeigt nur den nginx-Befehl.'],
      ['ls -l shows rechnung.txt with group buchhaltung.', 'pruefer can read but not write.', 'visudo -c reports “parsed OK”.', 'sudo -l -U ben lists only the nginx command.']] },
  pitfalls: [
    ['chmod 777 برای «حل سریع» مشکل دسترسی.', 'chmod 777 als „schnelle Lösung“.', 'chmod 777 as a “quick fix”.'],
    ['usermod -G بدون -a؛ کاربر از گروه sudo بیرون می‌افتد.', 'usermod -G ohne -a – der Benutzer fliegt aus der sudo-Gruppe.', 'usermod -G without -a – the user drops out of the sudo group.'],
    ['ویرایش /etc/sudoers بدون visudo؛ یک خطای تایپی sudo را برای همه قفل می‌کند.', '/etc/sudoers ohne visudo bearbeiten – ein Tippfehler sperrt sudo für alle.', 'Editing /etc/sudoers without visudo – one typo locks sudo for everyone.']],
  iv: [
    [['chmod 640 یعنی چه؟', 'Was bedeutet chmod 640?', 'What does chmod 640 mean?'], ['مالک خواندن و نوشتن، گروه فقط خواندن، بقیه هیچ.', 'Besitzer lesen und schreiben, Gruppe nur lesen, andere nichts.', 'Owner read/write, group read only, others nothing.']],
    [['کاربر بعد از اضافه شدن به گروه هنوز دسترسی ندارد. چرا؟', 'Ein Benutzer hat nach dem Gruppenbeitritt noch keinen Zugriff. Warum?', 'A user still lacks access after joining a group. Why?'], ['عضویت گروه هنگام ورود خوانده می‌شود؛ باید یک بار خارج و دوباره وارد شود یا newgrp بزند.', 'Gruppen werden beim Login gelesen; neu anmelden oder newgrp verwenden.', 'Groups are read at login; log out and in again or use newgrp.']],
    [['ACL کی لازم است؟', 'Wann braucht man ACLs?', 'When do you need ACLs?'], ['وقتی علاوه بر مالک و یک گروه، کاربر یا گروه دیگری هم دسترسی متفاوت لازم دارد.', 'Wenn neben Besitzer und einer Gruppe weitere Benutzer oder Gruppen andere Rechte brauchen.', 'When users or groups beyond the owner and one group need different rights.']]],
  sources: [['chmod(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/chmod.1.html'], ['setfacl(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/setfacl.1.html'], ['sudoers(5)', 'https://manpages.ubuntu.com/manpages/noble/man5/sudoers.5.html']]
},

{
  id: 'lx-network', part: 2,
  title: ['شبکه با netplan و عیب‌یابی', 'Netzwerk mit netplan und Fehlersuche', 'Networking with netplan and troubleshooting'],
  goal: ['آدرس IP ثابت را با netplan تنظیم کنی، اتصال، مسیر، DNS و پورت‌ها را مرحله به مرحله بررسی کنی.', 'Du setzt eine feste IP mit netplan und prüfst Verbindung, Route, DNS und Ports Schritt für Schritt.', 'Set a static IP with netplan and check link, route, DNS and ports step by step.'],
  why: ['سرور باید آدرس ثابت داشته باشد و «اینترنت ندارد» یا «به سرور نمی‌رسم» هر روز در Helpdesk پیش می‌آید.', 'Server brauchen feste Adressen, und „kein Netz“ oder „Server nicht erreichbar“ kommt im Helpdesk täglich vor.', 'Servers need fixed addresses, and “no network” or “server unreachable” happens daily on the helpdesk.'],
  know: [
    ['Ubuntu Server شبکه را در فایل‌های YAML در /etc/netplan تعریف می‌کند؛ netplan try تغییر را با بازگشت خودکار آزمایش می‌کند.', 'Ubuntu Server beschreibt das Netz in YAML-Dateien unter /etc/netplan; netplan try testet mit automatischem Zurückrollen.', 'Ubuntu Server defines networking in YAML under /etc/netplan; netplan try tests with automatic rollback.'],
    ['ip a آدرس‌ها، ip r مسیرها و ip link وضعیت کارت شبکه را نشان می‌دهد (ifconfig قدیمی است).', 'ip a zeigt Adressen, ip r Routen, ip link den Linkstatus (ifconfig ist veraltet).', 'ip a shows addresses, ip r routes, ip link link state (ifconfig is legacy).'],
    ['DNS در Ubuntu از systemd-resolved می‌آید؛ resolvectl status سرور DNS فعلی را نشان می‌دهد.', 'DNS kommt unter Ubuntu von systemd-resolved; resolvectl status zeigt den aktiven DNS-Server.', 'DNS on Ubuntu comes from systemd-resolved; resolvectl status shows the active DNS server.'],
    ['ss -tulpn پورت‌های باز و برنامهٔ پشت آن‌ها را نشان می‌دهد.', 'ss -tulpn zeigt offene Ports und das Programm dahinter.', 'ss -tulpn shows listening ports and the program behind them.'],
    ['ترتیب عیب‌یابی: کارت و کابل، IP، Gateway، DNS، پورت سرویس، فایروال.', 'Fehlersuche in Reihenfolge: Link, IP, Gateway, DNS, Dienstport, Firewall.', 'Troubleshoot in order: link, IP, gateway, DNS, service port, firewall.']],
  lab: { vm: 'LNX01', shell: 'Bash',
    steps: [
      ['نام کارت شبکه را پیدا کن.', 'فایل netplan برای 10.20.0.30/24 با Gateway 10.20.0.1 و DNS روی DC01 بنویس.', 'با netplan try اعمال و تأیید کن.', 'زنجیرهٔ عیب‌یابی را اجرا کن: Gateway، DC01، نام دامنه، اینترنت.', 'پورت‌های باز سرور را فهرست کن.'],
      ['Namen der Netzwerkkarte ermitteln.', 'netplan-Datei für 10.20.0.30/24, Gateway 10.20.0.1 und DNS auf DC01 schreiben.', 'Mit netplan try anwenden und bestätigen.', 'Prüfkette ausführen: Gateway, DC01, Domänenname, Internet.', 'Offene Ports des Servers auflisten.'],
      ['Find the network interface name.', 'Write a netplan file for 10.20.0.30/24, gateway 10.20.0.1 and DNS on DC01.', 'Apply with netplan try and confirm.', 'Run the check chain: gateway, DC01, domain name, internet.', 'List the server’s open ports.']],
    code: 'ip -br link\nsudo tee /etc/netplan/50-lab.yaml >/dev/null <<\'EOF\'\nnetwork:\n  version: 2\n  ethernets:\n    eth0:\n      dhcp4: false\n      addresses: [10.20.0.30/24]\n      routes:\n        - to: default\n          via: 10.20.0.1\n      nameservers:\n        addresses: [10.20.0.10]\n        search: [corp.example.test]\nEOF\nsudo chmod 600 /etc/netplan/50-lab.yaml\nsudo netplan try\nip -br a && ip r\nping -c2 10.20.0.1 && ping -c2 10.20.0.10\nresolvectl status | grep -A2 "DNS Servers"\nresolvectl query dc01.corp.example.test\nsudo ss -tulpn',
    checks: [
      ['ip a آدرس 10.20.0.30/24 را نشان می‌دهد.', 'ip r مسیر default via 10.20.0.1 دارد.', 'نام dc01.corp.example.test به 10.20.0.10 ترجمه می‌شود.', 'می‌دانی کدام برنامه روی پورت 22 و 80 گوش می‌دهد.'],
      ['ip a zeigt 10.20.0.30/24.', 'ip r enthält default via 10.20.0.1.', 'dc01.corp.example.test löst auf 10.20.0.10 auf.', 'Du weißt, welches Programm auf Port 22 und 80 lauscht.'],
      ['ip a shows 10.20.0.30/24.', 'ip r has default via 10.20.0.1.', 'dc01.corp.example.test resolves to 10.20.0.10.', 'You know which program listens on ports 22 and 80.']] },
  pitfalls: [
    ['فاصله‌گذاری اشتباه YAML با Tab؛ netplan خطا می‌دهد.', 'Tabs oder falsche Einrückung in YAML – netplan bricht ab.', 'Tabs or wrong indentation in YAML – netplan fails.'],
    ['netplan apply از راه دور بدون try؛ اگر اشتباه باشد اتصال SSH قطع می‌شود.', 'netplan apply per SSH ohne try – bei einem Fehler ist die Verbindung weg.', 'netplan apply over SSH without try – one mistake and the session is gone.'],
    ['ویرایش مستقیم /etc/resolv.conf؛ systemd-resolved آن را بازنویسی می‌کند.', '/etc/resolv.conf direkt bearbeiten – systemd-resolved überschreibt sie.', 'Editing /etc/resolv.conf directly – systemd-resolved overwrites it.']],
  iv: [
    [['سرور ping به IP دارد ولی به نام نه. مشکل کجاست؟', 'Ping auf IP geht, auf Namen nicht. Wo liegt das Problem?', 'Ping by IP works, by name doesn’t. Where’s the problem?'], ['در DNS: با resolvectl status سرور DNS و با resolvectl query یا dig نام را بررسی می‌کنم.', 'Bei DNS: resolvectl status für den DNS-Server, resolvectl query oder dig für den Namen.', 'DNS: resolvectl status for the server, resolvectl query or dig for the name.']],
    [['چطور می‌بینی کدام سرویس روی پورتی گوش می‌دهد؟', 'Wie siehst du, welcher Dienst auf einem Port lauscht?', 'How do you see which service listens on a port?'], ['با sudo ss -tulpn یا sudo lsof -i :پورت.', 'Mit sudo ss -tulpn oder sudo lsof -i :port.', 'With sudo ss -tulpn or sudo lsof -i :port.']],
    [['netplan try چه فایده‌ای دارد؟', 'Wozu netplan try?', 'Why netplan try?'], ['تنظیمات را اعمال می‌کند و اگر در ۱۲۰ ثانیه تأیید نکنی به حالت قبل برمی‌گردد؛ مناسب کار از راه دور.', 'Es wendet an und rollt zurück, wenn du nicht binnen 120 Sekunden bestätigst – ideal aus der Ferne.', 'It applies and rolls back unless confirmed within 120 seconds – ideal for remote work.']]],
  sources: [['Netplan documentation', 'https://netplan.readthedocs.io/'], ['Ubuntu Server – Networking', 'https://documentation.ubuntu.com/server/'], ['ss(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/ss.8.html']]
},

{
  id: 'lx-ssh', part: 2,
  title: ['SSH امن و دسترسی از راه دور', 'Sicheres SSH und Fernzugriff', 'Secure SSH and remote access'],
  goal: ['با کلید SSH وارد شوی، ورود با گذرواژه و root را ببندی، فایل منتقل کنی و تلاش‌های ناموفق را در Log ببینی.', 'Du meldest dich per SSH-Schlüssel an, sperrst Kennwort- und root-Login, überträgst Dateien und siehst Fehlversuche im Log.', 'Log in with an SSH key, disable password and root login, transfer files and see failed attempts in the log.'],
  why: ['SSH درِ اصلی هر سرور لینوکسی است. سرور با ورود گذرواژه‌ای در اینترنت در چند دقیقه هدف حملهٔ Brute-Force می‌شود.', 'SSH ist die Haustür jedes Linux-Servers. Ein Server mit Kennwort-Login im Internet wird binnen Minuten per Brute Force angegriffen.', 'SSH is the front door of every Linux server. A server with password login on the internet gets brute-forced within minutes.'],
  know: [
    ['کلید Ed25519 را روی کامپیوتر خودت بساز؛ کلید خصوصی هرگز از دستگاهت خارج نمی‌شود و فقط کلید عمومی به سرور می‌رود.', 'Ed25519-Schlüssel auf dem eigenen Rechner erzeugen; der private Schlüssel verlässt ihn nie, nur der öffentliche kommt auf den Server.', 'Create an Ed25519 key on your own machine; the private key never leaves it, only the public key goes to the server.'],
    ['تنظیمات اضافی را در /etc/ssh/sshd_config.d/ بگذار؛ PasswordAuthentication no و PermitRootLogin no.', 'Eigene Einstellungen in /etc/ssh/sshd_config.d/ ablegen: PasswordAuthentication no und PermitRootLogin no.', 'Put your settings in /etc/ssh/sshd_config.d/: PasswordAuthentication no and PermitRootLogin no.'],
    ['قبل از ری‌استارت با sshd -t تنظیمات را بررسی کن و یک نشست دوم را باز نگه دار.', 'Vor dem Neustart mit sshd -t prüfen und eine zweite Sitzung offen lassen.', 'Validate with sshd -t before restarting and keep a second session open.'],
    ['scp و rsync -e ssh فایل منتقل می‌کنند؛ ssh -L تونل پورت می‌سازد.', 'scp und rsync -e ssh übertragen Dateien; ssh -L baut Porttunnel.', 'scp and rsync -e ssh transfer files; ssh -L builds port tunnels.'],
    ['fail2ban بعد از چند تلاش ناموفق IP را موقتاً مسدود می‌کند.', 'fail2ban sperrt IPs nach mehreren Fehlversuchen vorübergehend.', 'fail2ban temporarily bans IPs after repeated failures.']],
  lab: { vm: 'LNX01 + CL01', shell: 'Bash',
    steps: [
      ['روی CL01 کلید Ed25519 بساز و به LNX01 کپی کن.', 'ورود با کلید را آزمایش کن.', 'فایل hardening با غیرفعال کردن گذرواژه و root بساز، با sshd -t بررسی و ssh را ری‌استارت کن.', 'از نشست دوم آزمایش کن که ورود با گذرواژه رد می‌شود.', 'fail2ban را نصب کن و وضعیت jail مربوط به sshd را ببین.'],
      ['Auf CL01 einen Ed25519-Schlüssel erzeugen und auf LNX01 kopieren.', 'Schlüssel-Login testen.', 'Härtungsdatei ohne Kennwort- und root-Login anlegen, mit sshd -t prüfen, ssh neu starten.', 'Aus einer zweiten Sitzung prüfen, dass Kennwort-Login abgelehnt wird.', 'fail2ban installieren und den sshd-Jail ansehen.'],
      ['On CL01 create an Ed25519 key and copy it to LNX01.', 'Test key login.', 'Create a hardening file without password and root login, check with sshd -t, restart ssh.', 'From a second session confirm password login is refused.', 'Install fail2ban and view the sshd jail.']],
    code: '# CL01 (PowerShell oder Bash)\nssh-keygen -t ed25519 -C "admin@cl01"\nssh-copy-id admin@10.20.0.30      # Windows: type $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh admin@10.20.0.30 "cat >> ~/.ssh/authorized_keys"\nssh admin@10.20.0.30\n# LNX01\nsudo tee /etc/ssh/sshd_config.d/10-haertung.conf >/dev/null <<\'EOF\'\nPasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin no\nMaxAuthTries 3\nEOF\nsudo sshd -t && sudo systemctl restart ssh\n# zweite Sitzung testen:\nssh -o PubkeyAuthentication=no admin@10.20.0.30   # -> Permission denied\nsudo apt install -y fail2ban\nsudo fail2ban-client status sshd',
    checks: [
      ['ورود با کلید بدون پرسیدن گذرواژهٔ سرور کار می‌کند.', 'sshd -t هیچ خطایی نمی‌دهد.', 'ورود با گذرواژه «Permission denied» می‌دهد.', 'fail2ban-client وضعیت jail sshd را نشان می‌دهد.'],
      ['Schlüssel-Login fragt kein Serverkennwort.', 'sshd -t meldet keinen Fehler.', 'Kennwort-Login liefert „Permission denied“.', 'fail2ban-client zeigt den sshd-Jail.'],
      ['Key login asks for no server password.', 'sshd -t reports no error.', 'Password login returns “Permission denied”.', 'fail2ban-client shows the sshd jail.']] },
  pitfalls: [
    ['غیرفعال کردن گذرواژه قبل از آزمایش کلید؛ خودت را بیرون قفل می‌کنی.', 'Kennwort-Login abschalten, bevor der Schlüssel getestet ist – du sperrst dich aus.', 'Disabling password login before testing the key – you lock yourself out.'],
    ['کلید خصوصی بدون Passphrase یا کپی آن روی سرور.', 'Privater Schlüssel ohne Passphrase oder auf den Server kopiert.', 'A private key without passphrase or copied onto the server.'],
    ['دسترسی نادرست به ~/.ssh؛ SSH کلید را نادیده می‌گیرد (باید 700 و 600 باشد).', 'Falsche Rechte auf ~/.ssh – SSH ignoriert den Schlüssel (700 bzw. 600 nötig).', 'Wrong permissions on ~/.ssh – SSH ignores the key (needs 700 and 600).']],
  iv: [
    [['چرا ورود با کلید امن‌تر از گذرواژه است؟', 'Warum ist Schlüssel-Login sicherer als Kennwort?', 'Why is key login safer than a password?'], ['کلید را نمی‌شود حدس زد یا Brute-Force کرد و کلید خصوصی هیچ‌وقت از شبکه رد نمی‌شود.', 'Ein Schlüssel lässt sich nicht erraten oder per Brute Force knacken, und der private Teil geht nie übers Netz.', 'A key can’t be guessed or brute-forced and the private part never crosses the network.']],
    [['SSH بعد از تغییر تنظیمات کار نمی‌کند. چه می‌کنی؟', 'SSH geht nach einer Änderung nicht mehr. Was tust du?', 'SSH breaks after a change. What do you do?'], ['از نشست باز یا کنسول VM وارد می‌شوم، sshd -t و journalctl -u ssh را می‌خوانم و فایل را اصلاح می‌کنم.', 'Über die offene Sitzung oder die VM-Konsole anmelden, sshd -t und journalctl -u ssh lesen, Datei korrigieren.', 'Use the open session or the VM console, read sshd -t and journalctl -u ssh, fix the file.']],
    [['تونل SSH را کی استفاده می‌کنی؟', 'Wann nutzt du einen SSH-Tunnel?', 'When do you use an SSH tunnel?'], ['وقتی سرویسی فقط روی localhost سرور است، مثلاً پایگاه داده، و می‌خواهم امن از دستگاهم به آن برسم.', 'Wenn ein Dienst nur auf localhost des Servers lauscht, etwa eine Datenbank, und ich ihn sicher erreichen will.', 'When a service listens only on the server’s localhost, e.g. a database, and I want secure access.']]],
  sources: [['sshd_config(5)', 'https://manpages.ubuntu.com/manpages/noble/man5/sshd_config.5.html'], ['Ubuntu Server – OpenSSH', 'https://documentation.ubuntu.com/server/'], ['fail2ban', 'https://github.com/fail2ban/fail2ban']]
},

{
  id: 'lx-scripting', part: 2,
  title: ['اسکریپت‌نویسی Bash و زمان‌بندی', 'Bash-Skripte und Zeitsteuerung', 'Bash scripting and scheduling'],
  goal: ['اسکریپت Bash امن با متغیر، شرط، حلقه و کد خروج بنویسی و آن را با cron یا systemd timer زمان‌بندی کنی.', 'Du schreibst sichere Bash-Skripte mit Variablen, Bedingungen, Schleifen und Exit-Codes und planst sie mit cron oder systemd-Timer.', 'Write safe Bash scripts with variables, conditions, loops and exit codes and schedule them with cron or a systemd timer.'],
  why: ['کارهای تکراری مثل پاک کردن Log، گزارش فضای دیسک یا پشتیبان‌گیری باید خودکار شوند. اسکریپت ساده مهارتی است که در آگهی‌ها زیاد دیده می‌شود.', 'Wiederkehrendes wie Logbereinigung, Plattenbericht oder Sicherung gehört automatisiert. Einfache Skripte stehen in vielen Stellenanzeigen.', 'Repetitive jobs like log cleanup, disk reports or backups should be automated. Simple scripting appears in many job ads.'],
  know: [
    ['خط اول #!/usr/bin/env bash و بعد set -euo pipefail؛ اسکریپت در اولین خطا متوقف می‌شود.', 'Erste Zeile #!/usr/bin/env bash, dann set -euo pipefail – das Skript stoppt beim ersten Fehler.', 'First line #!/usr/bin/env bash, then set -euo pipefail – the script stops on the first error.'],
    ['متغیرها را همیشه در "" بگذار ("$file")؛ فاصله در نام فایل در غیر این صورت اسکریپت را خراب می‌کند.', 'Variablen immer in "" setzen ("$file") – sonst zerlegen Leerzeichen in Dateinamen das Skript.', 'Always quote variables ("$file") – otherwise spaces in file names break the script.'],
    ['کد خروج 0 یعنی موفق؛ $? آخرین کد را دارد و if از آن استفاده می‌کند.', 'Exit-Code 0 bedeutet Erfolg; $? enthält den letzten Code, if wertet ihn aus.', 'Exit code 0 means success; $? holds the last code and if evaluates it.'],
    ['crontab -e کار زمان‌دار کاربر را تنظیم می‌کند: دقیقه ساعت روز ماه روزهفته.', 'crontab -e plant Aufgaben: Minute Stunde Tag Monat Wochentag.', 'crontab -e schedules jobs: minute hour day month weekday.'],
    ['systemd timer همراه با یک service: Log در journal، اجرای جاافتاده با Persistent=true.', 'systemd-Timer mit zugehörigem Service: Log im Journal, verpasste Läufe mit Persistent=true.', 'A systemd timer with its service: logs in the journal, missed runs with Persistent=true.']],
  lab: { vm: 'LNX01', shell: 'Bash',
    steps: [
      ['اسکریپت /usr/local/bin/plattencheck.sh بنویس که اگر فضای / بیش از ۸۰٪ پر باشد هشدار در journal بنویسد.', 'آن را اجرایی کن و دستی آزمایش کن.', 'یک service و timer بساز که هر ساعت اجرا شود.', 'timer را فعال کن و زمان اجرای بعدی را ببین.', 'خروجی اجرا را در journal بخوان.'],
      ['Skript /usr/local/bin/plattencheck.sh schreiben, das bei über 80 % Belegung von / eine Warnung ins Journal schreibt.', 'Ausführbar machen und manuell testen.', 'Service und Timer anlegen, die stündlich laufen.', 'Timer aktivieren und nächsten Lauf anzeigen.', 'Ausgabe im Journal lesen.'],
      ['Write /usr/local/bin/plattencheck.sh that logs a warning to the journal if / is over 80% full.', 'Make it executable and test it manually.', 'Create a service and timer that run hourly.', 'Enable the timer and show the next run.', 'Read the output in the journal.']],
    code: 'sudo tee /usr/local/bin/plattencheck.sh >/dev/null <<\'EOF\'\n#!/usr/bin/env bash\nset -euo pipefail\nlimit="${1:-80}"\nused=$(df --output=pcent / | tail -n1 | tr -dc \'0-9\')\nif [ "$used" -ge "$limit" ]; then\n  logger -t plattencheck -p user.warning "Root-Dateisystem ${used}% voll (Grenze ${limit}%)"\n  exit 1\nfi\nlogger -t plattencheck "OK: ${used}% belegt"\nEOF\nsudo chmod 755 /usr/local/bin/plattencheck.sh\n/usr/local/bin/plattencheck.sh 80; echo "Exit: $?"\nprintf "[Unit]\\nDescription=Plattencheck\\n[Service]\\nType=oneshot\\nExecStart=/usr/local/bin/plattencheck.sh 80\\n" | sudo tee /etc/systemd/system/plattencheck.service\nprintf "[Unit]\\nDescription=Plattencheck stuendlich\\n[Timer]\\nOnCalendar=hourly\\nPersistent=true\\n[Install]\\nWantedBy=timers.target\\n" | sudo tee /etc/systemd/system/plattencheck.timer\nsudo systemctl daemon-reload && sudo systemctl enable --now plattencheck.timer\nsystemctl list-timers plattencheck.timer\njournalctl -t plattencheck -n 5 --no-pager',
    checks: [
      ['اسکریپت دستی اجرا می‌شود و کد خروج را نشان می‌دهد.', 'list-timers زمان اجرای بعدی را نشان می‌دهد.', 'journalctl -t plattencheck پیام OK یا هشدار دارد.', 'با مقدار 1 به عنوان حد، هشدار و Exit 1 می‌گیری.'],
      ['Das Skript läuft manuell und zeigt den Exit-Code.', 'list-timers zeigt den nächsten Lauf.', 'journalctl -t plattencheck enthält OK oder eine Warnung.', 'Mit Grenze 1 kommt eine Warnung und Exit 1.'],
      ['The script runs manually and shows its exit code.', 'list-timers shows the next run.', 'journalctl -t plattencheck contains OK or a warning.', 'With limit 1 you get a warning and exit 1.']] },
  pitfalls: [
    ['متغیر بدون "" و rm -rf "$DIR/" وقتی DIR خالی است؛ می‌تواند همه‌چیز را پاک کند.', 'Unquotierte Variablen und rm -rf $DIR/ bei leerem DIR – kann alles löschen.', 'Unquoted variables and rm -rf $DIR/ with an empty DIR – can wipe everything.'],
    ['cron با PATH محدود اجرا می‌شود؛ مسیر کامل فرمان‌ها را بنویس.', 'cron läuft mit minimalem PATH – vollständige Befehlspfade verwenden.', 'cron runs with a minimal PATH – use full command paths.'],
    ['گذرواژه داخل اسکریپت.', 'Kennwörter im Skript.', 'Passwords inside the script.']],
  iv: [
    [['set -euo pipefail چه می‌کند؟', 'Was bewirkt set -euo pipefail?', 'What does set -euo pipefail do?'], ['-e در خطا متوقف می‌کند، -u متغیر تعریف‌نشده را خطا می‌داند و pipefail خطای وسط Pipe را هم می‌گیرد.', '-e stoppt bei Fehlern, -u behandelt undefinierte Variablen als Fehler, pipefail erkennt Fehler mitten in Pipes.', '-e stops on errors, -u treats unset variables as errors, pipefail catches failures inside pipes.']],
    [['cron یا systemd timer؟', 'cron oder systemd-Timer?', 'cron or systemd timer?'], ['cron ساده و همه‌جا هست؛ timer Log در journal، وابستگی، اجرای جاافتاده و محدودیت منابع دارد.', 'cron ist einfach und überall; Timer bieten Journal-Logs, Abhängigkeiten, Nachholen verpasster Läufe und Ressourcengrenzen.', 'cron is simple and everywhere; timers offer journal logs, dependencies, catch-up of missed runs and resource limits.']],
    [['0 2 * * 1-5 در cron یعنی چه؟', 'Was bedeutet 0 2 * * 1-5 in cron?', 'What does 0 2 * * 1-5 mean in cron?'], ['ساعت ۲:۰۰ بامداد، دوشنبه تا جمعه.', 'Um 2:00 Uhr nachts, Montag bis Freitag.', 'At 2:00 a.m., Monday to Friday.']]],
  sources: [['GNU Bash manual', 'https://www.gnu.org/software/bash/manual/'], ['systemd.timer(5)', 'https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html'], ['ShellCheck', 'https://www.shellcheck.net/']]
}
);
})();
