/* Arefi ITPraxis – Vertiefung Lernstrecke Linux-Server, Module 12–16 (AD-Anbindung, Docker, Ansible, Monitoring, Sicherheit). [fa, de, en] */
(() => {
'use strict';
const R = String.raw;
window.ArefiPlus(window.ArefiLXCourse, {

'lx-ad': {
  know: [
    ['SSSD اطلاعات کاربران و گروه‌ها را Cache می‌کند؛ بعد از تغییر عضویت در AD، sudo sss_cache -E را بزن تا لینوکس اطلاعات تازه را بخواند. وضعیت اتصال را sssctl domain-status نشان می‌دهد.', 'SSSD speichert Benutzer und Gruppen zwischen; nach Gruppenänderungen in AD sudo sss_cache -E ausführen, damit Linux die neuen Daten liest. sssctl domain-status zeigt den Verbindungsstatus.', 'SSSD caches users and groups; after group changes in AD run sudo sss_cache -E so Linux reads fresh data. sssctl domain-status shows the connection status.'],
    ['پیش‌نیازهای پیوستن: نام کامل میزبان (hostnamectl)، DNS به سمت DC تا رکوردهای SRV پیدا شوند، و اختلاف زمان کمتر از ۵ دقیقه. اوبونتو با systemd-timesyncd زمان را هماهنگ می‌کند؛ DC را منبع NTP آن قرار بده.', 'Voraussetzungen für den Beitritt: vollständiger Hostname (hostnamectl), DNS auf den DC, damit die SRV-Einträge gefunden werden, und weniger als 5 Minuten Zeitabweichung. Ubuntu synchronisiert per systemd-timesyncd; den DC als NTP-Quelle eintragen.', 'Join prerequisites: full host name (hostnamectl), DNS pointing to the DC so SRV records are found, and less than 5 minutes time skew. Ubuntu syncs time with systemd-timesyncd; set the DC as its NTP source.'],
    ['وقتی سرور از رده خارج می‌شود، قبل از خاموش کردن realm leave بزن تا حساب کامپیوتر در AD پاک یا غیرفعال شود؛ وگرنه حساب‌های کهنه در AD جمع می‌شوند.', 'Wird ein Server außer Betrieb genommen, vor dem Abschalten realm leave ausführen, damit das Computerkonto in AD entfernt oder deaktiviert wird – sonst sammeln sich verwaiste Konten.', 'When decommissioning a server, run realm leave before shutting down so the computer account in AD is removed or disabled – otherwise stale accounts accumulate.']
  ],
  code: R`# Vertiefung: AD-Anbindung prüfen
realm list
sudo sssctl domain-status corp.example.test
id anna@corp.example.test
getent passwd anna@corp.example.test
sudo sss_cache -E                                    # Cache leeren
sudo journalctl -u sssd --since "30 min ago" --no-pager | tail -n 20
resolvectl query -t SRV _ldap._tcp.corp.example.test
timedatectl timesync-status
sudo klist -k /etc/krb5.keytab | head               # Schlüssel des Computerkontos
# Server außer Betrieb nehmen: sudo realm leave corp.example.test`,
  trouble: [
    [['realm join شکست می‌خورد.', 'realm join scheitert.', 'realm join fails.'],
     ['realm discover -v corp.example.test خطا را دقیق‌تر نشان می‌دهد. سه علت اصلی: DNS به DC اشاره نمی‌کند (رکوردهای SRV پیدا نمی‌شوند)، اختلاف ساعت با DC، یا حساب و رمز بدون حق اضافه کردن کامپیوتر. نام میزبان هم باید کامل و یکتا باشد.', 'realm discover -v corp.example.test zeigt den Fehler genauer. Drei Hauptursachen: DNS zeigt nicht auf den DC (SRV-Einträge fehlen), Zeitabweichung zum DC oder ein Konto ohne Recht, Computer hinzuzufügen. Der Hostname muss vollständig und eindeutig sein.', 'realm discover -v corp.example.test shows the error in detail. Three main causes: DNS does not point to the DC (SRV records not found), time skew with the DC, or an account without the right to add computers. The host name must be complete and unique.']],
    [['کاربر AD با وجود رمز درست هنگام ورود «Permission denied» می‌گیرد.', 'AD-Benutzer bekommt bei der Anmeldung „Permission denied“, obwohl das Kennwort stimmt.', 'AD user gets “Permission denied” at login although the password is right.'],
     ['realm permit فقط گروه‌های مشخص را اجازه می‌دهد: realm list بخش permitted را نشان می‌دهد. کاربر عضو آن گروه است؟ اگر تازه اضافه شده، sss_cache -E. لاگ sssd و ‎/var/log/auth.log علت دقیق (مثلاً «access denied by access_provider») را می‌گویند.', 'realm permit lässt nur bestimmte Gruppen zu: realm list zeigt den Abschnitt permitted. Ist der Benutzer Mitglied? Wurde er gerade hinzugefügt, sss_cache -E. Das sssd-Log und /var/log/auth.log nennen den genauen Grund (etwa „access denied by access_provider“).', 'realm permit only allows specific groups: realm list shows the permitted section. Is the user a member? If just added, sss_cache -E. The sssd log and /var/log/auth.log give the exact reason (e.g. “access denied by access_provider”).']],
    [['id anna@corp.example.test پیام «no such user» می‌دهد.', 'id anna@corp.example.test meldet „no such user“.', 'id anna@corp.example.test reports “no such user”.'],
     ['sssd اجرا می‌شود؟ (systemctl status sssd). sssctl domain-status می‌گوید دامنه Online است؟ اگر Offline است، DNS، فایروال تا DC (پورت‌های 88، 389، 445) و زمان را بررسی کن. نام کاربر را دقیقاً با قالب تنظیم‌شده (کوتاه یا کامل) بنویس.', 'Läuft sssd (systemctl status sssd)? Meldet sssctl domain-status die Domäne als online? Wenn offline: DNS, Firewall zum DC (Ports 88, 389, 445) und Zeit prüfen. Den Benutzernamen genau im eingestellten Format (kurz oder vollständig) angeben.', 'Is sssd running (systemctl status sssd)? Does sssctl domain-status show the domain online? If offline: check DNS, firewall to the DC (ports 88, 389, 445) and time. Enter the user name exactly in the configured format (short or fully qualified).']]
  ],
  decide: [
    [['realmd و SSSD یا Winbind؟', 'realmd mit SSSD oder Winbind?', 'realmd with SSSD or Winbind?'],
     ['SSSD برای ورود کاربران AD به سرور لینوکس (SSH، sudo) استاندارد اوبونتو است. Winbind وقتی سرور فایل Samba باید عضو دامنه باشد و مجوزهای ویندوزی را کامل بفهمد.', 'SSSD ist unter Ubuntu Standard für die Anmeldung von AD-Benutzern am Linux-Server (SSH, sudo). Winbind, wenn ein Samba-Dateiserver Domänenmitglied sein und Windows-Rechte vollständig verstehen soll.', 'SSSD is the Ubuntu standard for AD users logging in to a Linux server (SSH, sudo). Winbind when a Samba file server must be a domain member and fully understand Windows permissions.']],
    [['ورود با نام کوتاه یا نام کامل (user@domain)؟', 'Anmeldung mit Kurzname oder vollem Namen (user@domain)?', 'Login with short name or full name (user@domain)?'],
     ['با یک دامنه، نام کوتاه (use_fully_qualified_names = False در sssd.conf) برای کاربران راحت‌تر است. با چند دامنه یا خطر تداخل با کاربران محلی، نام کامل بماند. انتخاب را برای همهٔ سرورها یکسان کن.', 'Bei einer Domäne ist der Kurzname (use_fully_qualified_names = False in sssd.conf) bequemer. Bei mehreren Domänen oder Kollisionsgefahr mit lokalen Benutzern beim vollen Namen bleiben. Die Wahl auf allen Servern einheitlich halten.', 'With one domain the short name (use_fully_qualified_names = False in sssd.conf) is more convenient. With several domains or risk of clashing with local users, keep full names. Keep the choice consistent across all servers.']]
  ],
  iv: [
    [['کاربر AD تازه به گروه Linux-Admins اضافه شده ولی sudo ندارد. چرا؟', 'Ein AD-Benutzer wurde gerade zu Linux-Admins hinzugefügt, hat aber kein sudo. Warum?', 'An AD user was just added to Linux-Admins but has no sudo. Why?'],
     ['SSSD هنوز عضویت قدیمی را در Cache دارد و نشست کاربر هم گروه‌های قدیمی را. sudo sss_cache -E روی سرور، بعد کاربر خارج و دوباره وارد شود. با id بررسی کن که گروه دیده می‌شود و نام گروه در sudoers.d دقیقاً همان است.', 'SSSD hat noch die alte Mitgliedschaft im Cache, und die Sitzung des Benutzers die alten Gruppen. sudo sss_cache -E auf dem Server, dann ab- und wieder anmelden. Mit id prüfen, dass die Gruppe sichtbar ist und der Gruppenname in sudoers.d genau übereinstimmt.', 'SSSD still has the old membership cached and the user’s session the old groups. Run sudo sss_cache -E on the server, then log out and in again. Check with id that the group is visible and that the group name in sudoers.d matches exactly.']]
  ]
},

'lx-docker': {
  know: [
    ['نکتهٔ امنیتی مهم: Docker برای پورت‌های منتشرشده (ports) قانون iptables خودش را می‌سازد و از ufw عبور می‌کند. اگر سرویس فقط پشت Reverse Proxy لازم است، آن را روی 127.0.0.1 منتشر کن (‎"127.0.0.1:3001:3001").', 'Wichtiger Sicherheitspunkt: Docker legt für veröffentlichte Ports (ports) eigene iptables-Regeln an und umgeht damit ufw. Wird ein Dienst nur hinter dem Reverse Proxy gebraucht, auf 127.0.0.1 veröffentlichen ("127.0.0.1:3001:3001").', 'Important security point: Docker creates its own iptables rules for published ports and bypasses ufw. If a service is only needed behind the reverse proxy, publish it on 127.0.0.1 ("127.0.0.1:3001:3001").'],
    ['docker logs، docker inspect (وضعیت و تعداد Restart) و docker exec -it برای ورود به کانتینر سه ابزار اصلی عیب‌یابی‌اند. docker system df نشان می‌دهد Imageها، کانتینرها و Volumeها چقدر جا گرفته‌اند.', 'docker logs, docker inspect (Status und Anzahl Neustarts) und docker exec -it zum Betreten des Containers sind die drei wichtigsten Diagnosewerkzeuge. docker system df zeigt den Platz von Images, Containern und Volumes.', 'docker logs, docker inspect (state and restart count) and docker exec -it to enter the container are the three main diagnostic tools. docker system df shows the space used by images, containers and volumes.'],
    ['پشتیبان کانتینر یعنی پشتیبان Volume یا پوشهٔ داده به‌علاوهٔ فایل compose.yaml؛ خود کانتینر دوباره ساخته می‌شود. داده‌های پایگاه داده داخل کانتینر را مثل سرور معمولی با Dump پشتیبان بگیر.', 'Container sichern heißt: Volume oder Datenordner plus compose.yaml sichern; der Container selbst wird neu erzeugt. Datenbanken im Container wie auf normalen Servern per Dump sichern.', 'Backing up containers means backing up the volume or data folder plus compose.yaml; the container itself is recreated. Back up databases in containers with a dump, as on normal servers.']
  ],
  code: R`# Vertiefung: Container-Betrieb und Fehlersuche (Projekt ~/kuma)
cd ~/kuma
sudo docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
sudo docker logs --tail 50 kuma-kuma-1
sudo docker inspect --format '{{.State.Status}} Neustarts={{.RestartCount}} Exit={{.State.ExitCode}}' kuma-kuma-1
sudo docker exec -it kuma-kuma-1 sh -c 'df -h /app/data'
sudo docker system df
sudo docker image prune -f                           # nur ungenutzte Images, keine Volumes
# Volume sichern:
sudo docker run --rm -v kuma_kuma-data:/data -v "$PWD":/backup alpine tar czf /backup/kuma-data.tgz -C /data .
ls -lh kuma-data.tgz
# Container-Logs begrenzen: /etc/docker/daemon.json
#   { "log-driver": "json-file", "log-opts": { "max-size": "10m", "max-file": "3" } }`,
  trouble: [
    [['کانتینر مدام ری‌استارت می‌شود (Restarting).', 'Container startet ständig neu (Restarting).', 'Container keeps restarting.'],
     ['docker logs آخرین خطا را نشان می‌دهد و docker inspect کد خروج را. علت‌های رایج: متغیر محیطی یا فایل تنظیمات ناقص، پورت اشغال، مجوز Volume یا پایگاه دادهٔ در دسترس نبودن. تا علت پیدا نشده Image یا Volume را پاک نکن.', 'docker logs zeigt den letzten Fehler, docker inspect den Exit-Code. Häufige Ursachen: fehlende Umgebungsvariable oder Konfiguration, belegter Port, Rechte am Volume oder nicht erreichbare Datenbank. Image oder Volume nicht löschen, bevor die Ursache klar ist.', 'docker logs shows the last error, docker inspect the exit code. Common causes: missing environment variable or configuration, port in use, volume permissions or unreachable database. Do not delete the image or volume before the cause is clear.']],
    [['پورت یک کانتینر از شبکه در دسترس است، با اینکه ufw باید آن را ببندد.', 'Ein Containerport ist aus dem Netz erreichbar, obwohl ufw ihn sperren soll.', 'A container port is reachable from the network although ufw should block it.'],
     ['Docker قانون‌های iptables خودش را جلوتر از ufw می‌گذارد. در compose پورت را روی 127.0.0.1 منتشر کن و دسترسی بیرونی را از Reverse Proxy بده، یا قانون‌ها را در زنجیرهٔ DOCKER-USER تعریف کن. بعد از تغییر از بیرون با nc -zv آزمایش کن.', 'Docker setzt eigene iptables-Regeln vor ufw. In compose den Port auf 127.0.0.1 veröffentlichen und den Zugriff von außen über den Reverse Proxy geben oder Regeln in der Kette DOCKER-USER definieren. Nach der Änderung von außen mit nc -zv testen.', 'Docker places its own iptables rules before ufw. Publish the port on 127.0.0.1 in compose and provide outside access via the reverse proxy, or define rules in the DOCKER-USER chain. Test from outside with nc -zv after the change.']],
    [['‎/var/lib/docker دیسک را پر می‌کند.', '/var/lib/docker füllt die Platte.', '/var/lib/docker fills the disk.'],
     ['docker system df سهم هر بخش را می‌دهد. Imageهای بی‌استفاده و Build Cache را پاک کن (docker image prune، docker builder prune). لاگ‌های JSON کانتینرها اغلب مقصرند: max-size در daemon.json. ‎docker system prune --volumes را فقط وقتی بزن که مطمئنی داده‌ای در Volumeهای بی‌استفاده نیست.', 'docker system df zeigt die Anteile. Ungenutzte Images und Build-Cache entfernen (docker image prune, docker builder prune). Oft sind JSON-Logs der Container schuld: max-size in daemon.json. docker system prune --volumes nur, wenn sicher ist, dass in ungenutzten Volumes keine Daten mehr gebraucht werden.', 'docker system df shows the shares. Remove unused images and build cache (docker image prune, docker builder prune). Container JSON logs are often the culprit: max-size in daemon.json. Run docker system prune --volumes only when you are sure no data in unused volumes is still needed.']]
  ],
  decide: [
    [['Volume یا Bind Mount؟', 'Volume oder Bind Mount?', 'Volume or bind mount?'],
     ['Volume برای دادهٔ برنامه (پایگاه داده، فایل‌های برنامه)؛ Docker مدیریتش می‌کند و قابل‌حمل است. Bind Mount وقتی باید فایل‌ها را مستقیم از میزبان ویرایش یا با ابزار پشتیبان موجود ذخیره کنی (تنظیمات، گواهی).', 'Volume für Anwendungsdaten (Datenbank, Programmdateien) – von Docker verwaltet und portabel. Bind Mount, wenn Dateien direkt am Host bearbeitet oder mit dem vorhandenen Backupwerkzeug gesichert werden sollen (Konfiguration, Zertifikate).', 'Volume for application data (database, program files) – managed by Docker and portable. Bind mount when files must be edited directly on the host or backed up with the existing backup tool (configuration, certificates).']],
    [['تگ latest یا نسخهٔ ثابت؟', 'Tag latest oder feste Version?', 'latest tag or pinned version?'],
     ['در تولید همیشه نسخهٔ ثابت (مثلاً ‎:1 یا ‎:1.23.4) تا به‌روزرسانی برنامه‌ریزی‌شده و قابل برگشت باشد. latest فقط برای آزمایش. به‌روزرسانی: یادداشت‌های نسخه، پشتیبان Volume، pull، up -d و بررسی لاگ.', 'In Produktion immer eine feste Version (etwa :1 oder :1.23.4), damit Updates geplant und umkehrbar sind. latest nur zum Testen. Update: Versionshinweise lesen, Volume sichern, pull, up -d, Logs prüfen.', 'In production always a pinned version (e.g. :1 or :1.23.4) so updates are planned and reversible. latest only for testing. Update: read release notes, back up the volume, pull, up -d, check logs.']]
  ],
  iv: [
    [['چرا عضویت در گروه docker تقریباً برابر root است؟', 'Warum ist die Gruppe docker praktisch gleich root?', 'Why is the docker group practically equal to root?'],
     ['چون هر عضو می‌تواند کانتینری با Mount کردن ‎/ میزبان اجرا کند و به‌عنوان root همهٔ فایل‌ها را تغییر دهد. پس فقط Adminها عضو شوند؛ بقیه با sudo برای فرمان‌های مشخص یا Docker بدون root.', 'Weil jedes Mitglied einen Container mit eingehängtem / des Hosts starten und als root alle Dateien ändern kann. Daher nur Admins aufnehmen; andere per sudo für bestimmte Befehle oder rootless Docker.', 'Because any member can start a container with the host’s / mounted and change every file as root. So only admins should be members; others via sudo for specific commands or rootless Docker.']]
  ]
},

'lx-ansible': {
  know: [
    ['فرمان‌های Ad-hoc برای پرسش سریع از همهٔ سرورها مفیدند: ansible linux -m ansible.builtin.setup -a "filter=ansible_distribution*" یا فضای دیسک همه. برای تغییر دائمی همیشه Playbook.', 'Ad-hoc-Befehle sind praktisch für schnelle Abfragen auf allen Servern: ansible linux -m ansible.builtin.setup -a "filter=ansible_distribution*" oder der Plattenplatz aller. Für dauerhafte Änderungen immer ein Playbook.', 'Ad-hoc commands are handy for quick queries across all servers: ansible linux -m ansible.builtin.setup -a "filter=ansible_distribution*" or disk space everywhere. For permanent changes always a playbook.'],
    ['‎--limit اجرای Playbook را به یک سرور یا گروه محدود می‌کند و ‎--syntax-check خطاهای YAML را پیش از اجرا پیدا می‌کند؛ اول روی یک سرور آزمایش کن، بعد همه.', '--limit beschränkt ein Playbook auf einen Server oder eine Gruppe, --syntax-check findet YAML-Fehler vor dem Lauf – zuerst an einem Server testen, dann an allen.', '--limit restricts a playbook to one server or group, --syntax-check finds YAML errors before the run – test on one server first, then all.'],
    ['ansible-doc نام ماژول توضیح و مثال کامل می‌دهد؛ به‌جای جست‌وجوی اینترنت اول همین را ببین تا مطمئن شوی با نسخهٔ نصب‌شده جور است.', 'ansible-doc modulname liefert Beschreibung und Beispiele – zuerst dort nachsehen statt im Internet, damit es zur installierten Version passt.', 'ansible-doc module_name gives a description and examples – check there first instead of the internet so it matches the installed version.']
  ],
  code: R`# Vertiefung: Ansible sicher einsetzen (Steuerknoten LNX01)
cd ~/ansible
ansible-inventory -i inventory.ini --graph
ansible -i inventory.ini linux -m ansible.builtin.setup -a 'filter=ansible_distribution*'
ansible -i inventory.ini linux -b -K -m ansible.builtin.shell -a 'df -h / | tail -n1'
ansible-playbook -i inventory.ini basis.yml --syntax-check
ansible-playbook -i inventory.ini basis.yml -K --limit lnx02 --check --diff
ansible-doc ansible.builtin.copy | head -n 30
ansible-vault create geheim.yml                      # Kennwörter verschlüsselt ablegen`,
  trouble: [
    [['میزبان UNREACHABLE گزارش می‌شود.', 'Host meldet UNREACHABLE.', 'Host reports UNREACHABLE.'],
     ['Ansible از SSH استفاده می‌کند: اول دستی ssh admin@10.20.0.31 را آزمایش کن. اگر دستی کار می‌کند، ansible_host، ansible_user و کلید در Inventory را بررسی کن. اولین اتصال ممکن است به‌خاطر پذیرش کلید میزبان متوقف شود.', 'Ansible nutzt SSH: zuerst von Hand ssh admin@10.20.0.31 testen. Geht das, ansible_host, ansible_user und Schlüssel im Inventory prüfen. Die erste Verbindung kann an der Bestätigung des Hostschlüssels hängen.', 'Ansible uses SSH: test ssh admin@10.20.0.31 manually first. If that works, check ansible_host, ansible_user and the key in the inventory. The first connection may stop at host key confirmation.']],
    [['«Missing sudo password» یا become شکست می‌خورد.', '„Missing sudo password“ oder become scheitert.', '“Missing sudo password” or become fails.'],
     ['با ‎-K رمز sudo را بپرس یا برای کاربر Ansible قانون sudo مناسب بگذار. اگر sudo روی مقصد فقط برخی فرمان‌ها را مجاز می‌کند، become برای ماژول‌های دیگر شکست می‌خورد؛ sudo -l -U admin روی مقصد را ببین.', 'Mit -K das sudo-Kennwort abfragen oder für den Ansible-Benutzer eine passende sudo-Regel anlegen. Erlaubt sudo auf dem Ziel nur bestimmte Befehle, scheitert become bei anderen Modulen – sudo -l -U admin auf dem Ziel prüfen.', 'Use -K to ask for the sudo password or add a suitable sudo rule for the Ansible user. If sudo on the target allows only certain commands, become fails for other modules – check sudo -l -U admin on the target.']],
    [['یک Task در هر اجرا «changed» گزارش می‌دهد.', 'Ein Task meldet bei jedem Lauf „changed“.', 'A task reports “changed” on every run.'],
     ['معمولاً shell یا command به‌جای ماژول مناسب است؛ این‌ها نمی‌دانند چیزی واقعاً تغییر کرده یا نه. ماژول مخصوص (apt، copy، lineinfile، service) را استفاده کن یا creates یا changed_when تعیین کن تا Playbook Idempotent شود.', 'Meist shell oder command statt eines passenden Moduls – diese wissen nicht, ob sich wirklich etwas geändert hat. Das passende Modul nutzen (apt, copy, lineinfile, service) oder creates bzw. changed_when setzen, damit das Playbook idempotent wird.', 'Usually shell or command instead of a proper module – they do not know whether anything really changed. Use the proper module (apt, copy, lineinfile, service) or set creates or changed_when so the playbook becomes idempotent.']]
  ],
  decide: [
    [['ماژول یا shell؟', 'Modul oder shell?', 'Module or shell?'],
     ['همیشه اول ماژول: Idempotent است، ‎--check و ‎--diff را پشتیبانی می‌کند و خوانا است. shell فقط وقتی ماژولی نیست، و آن هم با changed_when و تست دقیق.', 'Immer zuerst ein Modul: idempotent, unterstützt --check und --diff und ist lesbar. shell nur, wenn es kein Modul gibt – dann mit changed_when und gründlichem Test.', 'Always a module first: idempotent, supports --check and --diff and is readable. shell only when no module exists – then with changed_when and thorough testing.']],
    [['کی ارزش خودکارسازی دارد؟', 'Wann lohnt sich Automatisierung?', 'When is automation worth it?'],
     ['وقتی کاری بیش از دو بار یا روی بیش از چند سرور تکرار می‌شود، یا اشتباه دستی در آن پرهزینه است (سخت‌سازی، کاربرها، تنظیمات پایه). کار یک‌باره و آزمایشی را دستی و مستند انجام بده.', 'Wenn sich eine Aufgabe mehr als zweimal oder auf mehr als wenigen Servern wiederholt oder ein manueller Fehler teuer ist (Härtung, Benutzer, Basiskonfiguration). Einmalige Experimente von Hand und dokumentiert.', 'When a task repeats more than twice or on more than a few servers, or when a manual error is expensive (hardening, users, base configuration). One-off experiments by hand and documented.']]
  ],
  iv: [
    [['Idempotent در Ansible یعنی چه و چطور آن را آزمایش می‌کنی؟', 'Was heißt idempotent in Ansible und wie testest du es?', 'What does idempotent mean in Ansible and how do you test it?'],
     ['یعنی اجرای چندباره همان نتیجه را می‌دهد و فقط تغییر لازم انجام می‌شود. Playbook را دو بار اجرا می‌کنم؛ در بار دوم باید changed=0 باشد. اگر نیست، Taskهای shell یا command را بررسی و به ماژول تبدیل می‌کنم.', 'Mehrfaches Ausführen ergibt dasselbe Ergebnis, es wird nur Nötiges geändert. Ich führe das Playbook zweimal aus – beim zweiten Mal muss changed=0 sein. Sonst prüfe ich shell- oder command-Tasks und ersetze sie durch Module.', 'Running it several times gives the same result and only necessary changes are made. I run the playbook twice – the second time must show changed=0. Otherwise I check shell or command tasks and replace them with modules.']]
  ]
},

'lx-monitoring': {
  know: [
    ['در top یا vmstat ستون wa (یا iowait) زمان انتظار CPU برای دیسک است. Load بالا با CPU بیکار و wa بالا یعنی گلوگاه دیسک یا Storage، نه پردازنده.', 'In top oder vmstat ist wa (iowait) die Zeit, in der die CPU auf die Platte wartet. Hohe Load bei untätiger CPU und hohem wa heißt: Engpass bei Platte oder Storage, nicht beim Prozessor.', 'In top or vmstat, wa (iowait) is the time the CPU waits for the disk. High load with an idle CPU and high wa means a disk or storage bottleneck, not the processor.'],
    ['وقتی حافظه تمام شود، OOM Killer کرنل یک پروسس (اغلب بزرگ‌ترین) را می‌کشد؛ سرویس «بی‌دلیل» متوقف می‌شود. journalctl -k | grep -i oom آن را نشان می‌دهد.', 'Ist der Speicher erschöpft, beendet der OOM-Killer des Kernels einen Prozess (oft den größten) – ein Dienst stoppt „grundlos“. journalctl -k | grep -i oom zeigt das.', 'When memory runs out, the kernel’s OOM killer terminates a process (often the largest) – a service stops “for no reason”. journalctl -k | grep -i oom shows it.'],
    ['sysstat با sar داده‌های گذشته را نگه می‌دارد (بعد از فعال‌سازی). برای سؤال «دیشب ساعت ۲ چه شد؟» sar -u یا sar -r با زمان مشخص.', 'sysstat speichert mit sar historische Werte (nach dem Aktivieren). Für „Was war heute Nacht um 2 Uhr?“ sar -u oder sar -r mit Zeitangabe.', 'sysstat keeps historical data with sar (once enabled). For “what happened at 2 a.m. last night?” use sar -u or sar -r with a time range.']
  ],
  code: R`# Vertiefung: Engpass finden
uptime ; nproc
vmstat 1 5                                           # Spalte wa = Warten auf Platte
free -h
journalctl -k --no-pager | grep -iE 'out of memory|oom' | tail -n 5
ps -eo state,pid,cmd | grep '^D' | head             # Prozesse, die auf I/O hängen
pidstat 1 3 | head -n 20
iostat -xz 1 2 | tail -n 15
sudo systemctl enable --now sysstat
sar -u 1 3
sudo journalctl --vacuum-size=300M                   # Journal verkleinern`,
  trouble: [
    [['Load Average خیلی بالاست اما CPU تقریباً بیکار است.', 'Load Average sehr hoch, CPU aber kaum ausgelastet.', 'Load average very high, but CPU barely used.'],
     ['Load پروسس‌های منتظر دیسک یا شبکه را هم می‌شمارد. با vmstat ستون wa و با ps پروسس‌های در حالت D را ببین. علت‌های رایج: دیسک یا Storage کند، اشتراک NFS در دسترس نیست، پشتیبان سنگین هم‌زمان. iostat -xz نشان می‌دهد کدام دیسک ‎%util نزدیک ۱۰۰ دارد.', 'Load zählt auch Prozesse, die auf Platte oder Netz warten. Mit vmstat die Spalte wa und mit ps Prozesse im Zustand D prüfen. Häufige Ursachen: langsame Platte oder Storage, nicht erreichbare NFS-Freigabe, gleichzeitiges schweres Backup. iostat -xz zeigt, welche Platte nahe 100 % %util hat.', 'Load also counts processes waiting for disk or network. Check the wa column with vmstat and processes in state D with ps. Common causes: slow disk or storage, unreachable NFS share, heavy backup at the same time. iostat -xz shows which disk is near 100% %util.']],
    [['یک سرویس شب بدون پیام خطا متوقف شده است.', 'Ein Dienst wurde nachts ohne Fehlermeldung beendet.', 'A service was terminated overnight without an error message.'],
     ['journalctl -k را برای OOM بررسی کن. اگر OOM بوده، ببین کدام پروسس حافظه را گرفته (pidstat -r، sar -r برای همان زمان): نشت حافظه، Cache بیش از حد پایگاه داده یا رشد بار. راه‌حل: محدود کردن برنامه، حافظهٔ بیشتر یا جدا کردن سرویس‌ها. Restart=on-failure فقط راه موقت است.', 'journalctl -k auf OOM prüfen. War es OOM, ermitteln, welcher Prozess den Speicher belegte (pidstat -r, sar -r für diese Zeit): Speicherleck, zu großer Datenbank-Cache oder wachsende Last. Lösung: Anwendung begrenzen, mehr RAM oder Dienste trennen. Restart=on-failure ist nur eine Übergangslösung.', 'Check journalctl -k for OOM. If it was OOM, find which process took the memory (pidstat -r, sar -r for that time): memory leak, oversized database cache or growing load. Fix: limit the application, add RAM or separate services. Restart=on-failure is only a workaround.']],
    [['هشدار پایش «دیسک ۹۰٪» مدام می‌آید و می‌رود.', 'Monitoringalarm „Platte 90 %“ kommt und geht ständig.', 'Monitoring alert “disk 90%” keeps flapping.'],
     ['یک کار زمان‌بندی‌شده (پشتیبان، فشرده‌سازی لاگ) موقتاً فضا را پر می‌کند. علت را با زمان هشدارها پیدا کن، فایل‌های موقت را به جای دیگر ببر یا فضا را بزرگ کن، و در پایش آستانهٔ هشدار و زمان تأخیر (مثلاً ۱۰ دقیقه) بگذار تا هشدار بی‌مورد نیاید.', 'Eine geplante Aufgabe (Backup, Logkomprimierung) füllt vorübergehend den Platz. Ursache über die Alarmzeiten finden, temporäre Dateien auslagern oder vergrößern und im Monitoring Schwelle und Verzögerung (etwa 10 Minuten) setzen, damit keine unnötigen Alarme kommen.', 'A scheduled job (backup, log compression) temporarily fills the space. Find the cause from the alert times, move temporary files elsewhere or enlarge the disk, and set threshold and delay (e.g. 10 minutes) in monitoring to avoid needless alerts.']]
  ],
  decide: [
    [['آستانهٔ هشدار را چطور تعیین کنم؟', 'Wie Alarmschwellen festlegen?', 'How to set alert thresholds?'],
     ['دیسک: هشدار ۸۰٪ و بحرانی ۹۰٪ (یا بر اساس روند رشد). Load: بیش از تعداد هسته‌ها برای ۱۵ دقیقه. هر هشداری باید یک اقدام مشخص داشته باشد؛ هشداری که کسی به آن واکنش نشان نمی‌دهد را حذف یا تنظیم کن.', 'Platte: Warnung 80 %, kritisch 90 % (oder nach Wachstumstrend). Load: über der Kernzahl für 15 Minuten. Jeder Alarm braucht eine klare Handlung; Alarme, auf die niemand reagiert, entfernen oder anpassen.', 'Disk: warning 80%, critical 90% (or based on growth trend). Load: above the core count for 15 minutes. Every alert needs a clear action; remove or tune alerts nobody reacts to.']],
    [['کدام ابزار پایش؟', 'Welches Monitoringwerkzeug?', 'Which monitoring tool?'],
     ['Uptime Kuma برای در دسترس بودن سرویس‌ها و صفحهٔ وضعیت ساده. Checkmk یا Zabbix برای پایش کامل سرور، شبکه و سخت‌افزار با Agent و SNMP. Prometheus با Grafana برای متریک‌ها در محیط کانتینر و ابر.', 'Uptime Kuma für Erreichbarkeit von Diensten und eine einfache Statusseite. Checkmk oder Zabbix für vollständiges Monitoring von Servern, Netz und Hardware mit Agent und SNMP. Prometheus mit Grafana für Metriken in Container- und Cloudumgebungen.', 'Uptime Kuma for service availability and a simple status page. Checkmk or Zabbix for full monitoring of servers, network and hardware with agents and SNMP. Prometheus with Grafana for metrics in container and cloud environments.']]
  ],
  iv: [
    [['Load Average برابر ۸ روی سروری با ۴ هسته: بد است؟', 'Load Average 8 auf einem Server mit 4 Kernen – schlecht?', 'Load average 8 on a 4-core server – bad?'],
     ['یعنی به‌طور متوسط دو برابر توان پردازنده کار در صف است، اما باید دید منتظر CPU‌اند یا دیسک. با top یا vmstat سهم us و sy را در برابر wa می‌بینم. اگر wa بالاست، مشکل دیسک است و هستهٔ بیشتر کمکی نمی‌کند.', 'Im Mittel wartet doppelt so viel Arbeit, wie die CPU schafft – aber man muss sehen, ob auf CPU oder Platte gewartet wird. Mit top oder vmstat vergleiche ich us und sy mit wa. Ist wa hoch, ist es die Platte, und mehr Kerne helfen nicht.', 'On average twice as much work is queued as the CPU can handle – but you must see whether it waits for CPU or disk. With top or vmstat I compare us and sy with wa. If wa is high it is the disk, and more cores do not help.']]
  ]
},

'lx-security': {
  know: [
    ['قبل از ufw enable همیشه اول SSH را از شبکهٔ Admin مجاز کن؛ ترتیب قوانین مهم است و ufw status numbered آن را نشان می‌دهد. قانون اشتباه را با شماره حذف کن (ufw delete شماره) بعد از بررسی دقیق.', 'Vor ufw enable immer zuerst SSH aus dem Admin-Netz erlauben; die Reihenfolge der Regeln zählt, ufw status numbered zeigt sie. Eine falsche Regel nach genauer Prüfung per Nummer löschen (ufw delete nummer).', 'Before ufw enable always allow SSH from the admin network first; rule order matters and ufw status numbered shows it. Delete a wrong rule by number (ufw delete number) after careful checking.'],
    ['ورودهای موفق (Accepted) و ناموفق در ‎/var/log/auth.log یا journalctl -u ssh هستند. ورود موفق از IP ناشناس مهم‌تر از هزاران تلاش ناموفق است.', 'Erfolgreiche (Accepted) und fehlgeschlagene Anmeldungen stehen in /var/log/auth.log oder journalctl -u ssh. Eine erfolgreiche Anmeldung von unbekannter IP ist wichtiger als Tausende Fehlversuche.', 'Successful (Accepted) and failed logins are in /var/log/auth.log or journalctl -u ssh. A successful login from an unknown IP matters more than thousands of failed attempts.'],
    ['برنامه‌های SUID با حق root اجرا می‌شوند؛ فهرست آن‌ها را یک بار ثبت کن تا مورد تازه و مشکوک دیده شود. Ubuntu Pro (رایگان برای تعداد کمی دستگاه) به‌روزرسانی امنیتی گسترده‌تر (ESM) و Livepatch می‌دهد.', 'SUID-Programme laufen mit Root-Rechten; ihre Liste einmal festhalten, damit neue, verdächtige auffallen. Ubuntu Pro (für wenige Geräte kostenlos) liefert erweiterte Sicherheitsupdates (ESM) und Livepatch.', 'SUID programs run with root rights; record their list once so new suspicious ones stand out. Ubuntu Pro (free for a few machines) provides extended security updates (ESM) and Livepatch.']
  ],
  code: R`# Vertiefung: Sicherheitslage prüfen
sudo ufw status verbose
sudo grep -c 'Failed password' /var/log/auth.log
sudo grep 'Accepted' /var/log/auth.log | tail -n 5
last -n 10
sudo ss -tulpn | awk 'NR>1 {print $5, $7}'
sudo find / -xdev -perm -4000 -type f 2>/dev/null | sort > ~/lab/suid-$(date +%F).txt
wc -l ~/lab/suid-*.txt
sudo journalctl -k --no-pager | grep -i apparmor | grep -i denied | tail -n 5
pro status 2>/dev/null | head -n 15
# Regel löschen (Nummer vorher prüfen!): sudo ufw status numbered ; sudo ufw delete 5`,
  trouble: [
    [['بعد از ufw enable اتصال SSH قطع شد.', 'Nach ufw enable ist die SSH-Verbindung weg.', 'After ufw enable the SSH connection is gone.'],
     ['قانون SSH نبوده یا محدودهٔ IP آن شبکهٔ تو را شامل نمی‌شود. از کنسول Hypervisor وارد شو، ufw allow from شبکهٔ‌Admin to any port 22 proto tcp و بعد ufw status numbered. در آینده همیشه اول قانون SSH و یک نشست دوم.', 'Die SSH-Regel fehlte oder ihr IP-Bereich deckt dein Netz nicht ab. Über die Hypervisor-Konsole anmelden, ufw allow from admin-netz to any port 22 proto tcp und dann ufw status numbered. Künftig immer zuerst die SSH-Regel und eine zweite Sitzung.', 'The SSH rule was missing or its IP range does not include your network. Log in via the hypervisor console, run ufw allow from admin-network to any port 22 proto tcp, then ufw status numbered. In future always the SSH rule first and a second session.']],
    [['در auth.log یک ورود موفق از IP ناشناس دیده می‌شود.', 'In auth.log steht eine erfolgreiche Anmeldung von einer unbekannten IP.', 'auth.log shows a successful login from an unknown IP.'],
     ['این را حادثه فرض کن: سرور را خاموش نکن (شواهد در حافظه از بین می‌رود)، آن را از شبکه جدا یا با فایروال محدود کن، زمان و لاگ‌ها را حفظ کن و فوراً به سرپرست یا تیم امنیت گزارش بده. کلید یا رمز آن حساب را فقط طبق دستور تیم امنیت عوض کن.', 'Als Vorfall behandeln: Server nicht ausschalten (Spuren im Speicher gehen verloren), vom Netz trennen oder per Firewall abschotten, Zeitpunkt und Logs sichern und sofort an Leitung oder Sicherheitsteam melden. Schlüssel oder Kennwort des Kontos nur nach Anweisung des Sicherheitsteams ändern.', 'Treat as an incident: do not power off (memory evidence is lost), isolate it from the network or with the firewall, secure the time and logs and report immediately to your lead or security team. Change the account’s key or password only as the security team instructs.']],
    [['بعد از تغییر یک مسیر، برنامه دیگر اجرا نمی‌شود؛ در لاگ Kernel پیام apparmor="DENIED" هست.', 'Nach Änderung eines Pfades startet eine Anwendung nicht mehr; im Kernel-Log steht apparmor="DENIED".', 'After changing a path an application no longer starts; the kernel log shows apparmor="DENIED".'],
     ['پروفایل AppArmor آن برنامه فقط مسیرهای قبلی را مجاز می‌داند. پیام DENIED مسیر و دسترسی رد شده را می‌گوید. پروفایل را برای مسیر جدید تکمیل کن (فایل local در ‎/etc/apparmor.d/local) و apparmor_parser -r. خاموش کردن AppArmor راه‌حل نیست.', 'Das AppArmor-Profil der Anwendung erlaubt nur die alten Pfade. Die DENIED-Meldung nennt Pfad und verweigerten Zugriff. Profil für den neuen Pfad ergänzen (lokale Datei in /etc/apparmor.d/local) und apparmor_parser -r. AppArmor abschalten ist keine Lösung.', 'The application’s AppArmor profile only allows the old paths. The DENIED message names the path and denied access. Extend the profile for the new path (local file in /etc/apparmor.d/local) and run apparmor_parser -r. Disabling AppArmor is not a solution.']]
  ],
  decide: [
    [['با وقت کم، اول کدام سخت‌سازی لینوکس؟', 'Wenig Zeit – welche Linux-Härtung zuerst?', 'Little time – which Linux hardening first?'],
     ['۱) به‌روزرسانی امنیتی خودکار، ۲) SSH فقط با کلید و بدون root، ۳) فایروال با deny incoming و فقط پورت‌های لازم، ۴) حذف سرویس‌ها و بسته‌های بی‌استفاده، ۵) پشتیبان آزموده، ۶) پایش ورودها و هشدار. Lynis برای فهرست بقیهٔ کارها.', '1) automatische Sicherheitsupdates, 2) SSH nur mit Schlüssel und ohne root, 3) Firewall mit deny incoming und nur nötigen Ports, 4) unbenutzte Dienste und Pakete entfernen, 5) getestetes Backup, 6) Anmeldungen überwachen und alarmieren. Lynis für die restliche Liste.', '1) automatic security updates, 2) SSH key-only without root, 3) firewall with deny incoming and only required ports, 4) remove unused services and packages, 5) tested backup, 6) monitor logins and alert. Lynis for the rest of the list.']],
    [['فایروال میزبان (ufw) یا فایروال شبکه؟', 'Host-Firewall (ufw) oder Netzwerkfirewall?', 'Host firewall (ufw) or network firewall?'],
     ['هر دو. فایروال شبکه مناطق را جدا می‌کند (DMZ، سرورها، کلاینت‌ها)؛ ufw آخرین لایه روی خود سرور است و وقتی کسی از داخل همان شبکه حمله کند هم محافظت می‌کند.', 'Beides. Die Netzwerkfirewall trennt Zonen (DMZ, Server, Clients); ufw ist die letzte Schicht auf dem Server selbst und schützt auch, wenn jemand aus demselben Netz angreift.', 'Both. The network firewall separates zones (DMZ, servers, clients); ufw is the last layer on the server itself and also protects when someone attacks from the same network.']]
  ],
  iv: [
    [['گزارش Lynis صد پیشنهاد دارد. کدام را اول انجام می‌دهی؟', 'Lynis liefert hundert Vorschläge. Welche setzt du zuerst um?', 'Lynis gives a hundred suggestions. Which do you implement first?'],
     ['آن‌هایی که بیشترین ریسک را با کمترین خطر خرابی کم می‌کنند: به‌روزرسانی‌ها، SSH، فایروال، حذف سرویس‌های بی‌استفاده. هر تغییر را اول روی سرور آزمایشی، با پشتیبان و ثبت در تیکت Change؛ بعد دوباره Lynis و مقایسهٔ امتیاز.', 'Die mit dem größten Risikogewinn und der geringsten Gefahr, etwas zu zerstören: Updates, SSH, Firewall, unbenutzte Dienste entfernen. Jede Änderung zuerst am Testserver, mit Backup und Change-Ticket; danach Lynis erneut und den Wert vergleichen.', 'Those with the biggest risk reduction and lowest chance of breaking something: updates, SSH, firewall, removing unused services. Every change first on a test server, with backup and change ticket; then run Lynis again and compare the score.']]
  ]
}

});
})();
