/* Arefi ITPraxis – Lernstrecke Linux-Server, Teil 3 (Module 9–12). [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiLXCourse = window.ArefiLXCourse || { modules: [] };
C.modules.push(

{
  id: 'lx-backup', part: 3,
  title: ['پشتیبان‌گیری و بازیابی', 'Backup und Wiederherstellung', 'Backup and restore'],
  goal: ['با rsync و tar پشتیبان بگیری، قاعدهٔ 3-2-1 را پیاده کنی و مهم‌تر از همه، بازیابی را واقعاً آزمایش کنی.', 'Du sicherst mit rsync und tar, setzt die 3-2-1-Regel um und testest vor allem die Wiederherstellung wirklich.', 'Back up with rsync and tar, apply the 3-2-1 rule and above all actually test the restore.'],
  why: ['پشتیبانی که بازیابی‌اش آزمایش نشده، پشتیبان نیست. در برابر باج‌افزار فقط نسخهٔ جدا و آزمایش‌شده کمک می‌کند.', 'Ein Backup ohne getestete Wiederherstellung ist keines. Gegen Ransomware hilft nur eine getrennte, geprüfte Kopie.', 'A backup without a tested restore isn’t a backup. Against ransomware only a separate, verified copy helps.'],
  know: [
    ['3-2-1: سه نسخه، روی دو نوع رسانه، یکی بیرون از محل؛ بهتر یک نسخه Offline یا Immutable.', '3-2-1: drei Kopien, zwei Medientypen, eine außer Haus – besser eine offline oder unveränderbar.', '3-2-1: three copies, two media types, one off-site – ideally one offline or immutable.'],
    ['rsync -aAX --delete یک پوشه را با حفظ دسترسی و ACL همگام می‌کند؛ --dry-run اول نشان می‌دهد چه می‌شود.', 'rsync -aAX --delete spiegelt mit Rechten und ACLs; --dry-run zeigt vorher, was passiert.', 'rsync -aAX --delete mirrors with permissions and ACLs; --dry-run shows what will happen first.'],
    ['tar -czf آرشیو فشرده می‌سازد؛ با تاریخ در نام فایل نسخه‌ها از هم جدا می‌شوند.', 'tar -czf erzeugt komprimierte Archive; ein Datum im Namen trennt die Stände.', 'tar -czf makes compressed archives; a date in the name separates versions.'],
    ['پایگاه داده را با ابزار خودش پشتیبان بگیر (mysqldump، pg_dump)، نه با کپی فایل در حال اجرا.', 'Datenbanken mit ihrem Werkzeug sichern (mysqldump, pg_dump), nicht laufende Dateien kopieren.', 'Back up databases with their own tool (mysqldump, pg_dump), not by copying live files.'],
    ['ابزارهای مدرن مثل restic یا Borg رمزگذاری، حذف تکرار و نگهداری نسخه‌ها را دارند.', 'Moderne Werkzeuge wie restic oder Borg bieten Verschlüsselung, Deduplizierung und Aufbewahrungsregeln.', 'Modern tools like restic or Borg add encryption, deduplication and retention.']],
  lab: { vm: 'LNX01 (Ziel: /srv/daten aus dem Speicher-Modul)', shell: 'Bash',
    steps: [
      ['پوشهٔ /srv/buchhaltung را با rsync در /srv/daten/backup آینه کن؛ اول dry-run.', 'از /etc آرشیو tar با تاریخ بساز.', 'یک فایل را عمداً پاک کن و از پشتیبان بازیابی کن.', 'آرشیو را در /tmp/restore باز کن و با diff مقایسه کن.', 'اسکریپت را با timer روزانه ساعت ۱:۳۰ زمان‌بندی کن.'],
      ['/srv/buchhaltung per rsync nach /srv/daten/backup spiegeln – zuerst dry-run.', 'tar-Archiv von /etc mit Datum anlegen.', 'Eine Datei absichtlich löschen und aus dem Backup zurückholen.', 'Archiv nach /tmp/restore entpacken und mit diff vergleichen.', 'Per Timer täglich um 1:30 Uhr einplanen.'],
      ['Mirror /srv/buchhaltung to /srv/daten/backup with rsync – dry-run first.', 'Create a dated tar archive of /etc.', 'Delete a file on purpose and restore it from backup.', 'Extract the archive to /tmp/restore and compare with diff.', 'Schedule it with a timer daily at 1:30.']],
    code: 'sudo mkdir -p /srv/daten/backup/buchhaltung /srv/daten/backup/etc\nsudo rsync -aAX --delete --dry-run /srv/buchhaltung/ /srv/daten/backup/buchhaltung/\nsudo rsync -aAX --delete /srv/buchhaltung/ /srv/daten/backup/buchhaltung/\nsudo tar -czf /srv/daten/backup/etc/etc-$(date +%F).tar.gz -C / etc\nsudo rm /srv/buchhaltung/rechnung.txt\nsudo rsync -aAX /srv/daten/backup/buchhaltung/rechnung.txt /srv/buchhaltung/\nls -l /srv/buchhaltung\nmkdir -p /tmp/restore && sudo tar -xzf /srv/daten/backup/etc/etc-$(date +%F).tar.gz -C /tmp/restore\nsudo diff -rq /etc /tmp/restore/etc | head\n# Timer: OnCalendar=*-*-* 01:30:00, Persistent=true (wie im Skript-Modul)',
    checks: [
      ['dry-run قبل از همگام‌سازی واقعی دیده شد.', 'rechnung.txt با همان مالک، گروه و ACL بازیابی شد.', 'diff بین /etc و آرشیو فقط تفاوت‌های جزئی جدید دارد.', 'می‌دانی نسخهٔ خارج از محل (Off-site) در شرکت کجا باید باشد.'],
      ['dry-run wurde vor dem echten Lauf gesehen.', 'rechnung.txt ist mit Besitzer, Gruppe und ACL zurück.', 'diff zwischen /etc und Archiv zeigt nur neue Kleinigkeiten.', 'Du weißt, wo die Off-site-Kopie in einer Firma liegen sollte.'],
      ['The dry-run was seen before the real sync.', 'rechnung.txt is restored with owner, group and ACL.', 'diff between /etc and the archive shows only small new changes.', 'You know where a company’s off-site copy should live.']] },
  pitfalls: [
    ['پشتیبان روی همان دیسک یا همان سرور.', 'Backup auf derselben Platte oder demselben Server.', 'Backup on the same disk or server.'],
    ['rsync با --delete و مسیر اشتباه یا بدون «/» آخر.', 'rsync --delete mit falschem Pfad oder fehlendem Schrägstrich am Ende.', 'rsync --delete with a wrong path or missing trailing slash.'],
    ['هرگز بازیابی را آزمایش نکردن.', 'Die Wiederherstellung nie testen.', 'Never testing a restore.']],
  iv: [
    [['قاعدهٔ 3-2-1 را توضیح بده.', 'Erkläre die 3-2-1-Regel.', 'Explain the 3-2-1 rule.'], ['سه نسخه از داده، روی دو نوع رسانهٔ مختلف، و یک نسخه بیرون از محل.', 'Drei Kopien der Daten, auf zwei verschiedenen Medien, eine davon außer Haus.', 'Three copies of the data, on two different media, one off-site.']],
    [['فرق Backup و RAID چیست؟', 'Unterschied Backup und RAID?', 'Backup vs RAID?'], ['RAID در برابر خرابی دیسک کمک می‌کند ولی پاک شدن، باج‌افزار یا خطای کاربر را هم کپی می‌کند؛ Backup نسخهٔ جدا از گذشته است.', 'RAID schützt vor Plattenausfall, spiegelt aber Löschungen, Ransomware und Bedienfehler; ein Backup ist ein getrennter früherer Stand.', 'RAID covers disk failure but mirrors deletions, ransomware and user errors; a backup is a separate earlier copy.']],
    [['چطور مطمئن می‌شوی پشتیبان سالم است؟', 'Wie stellst du sicher, dass ein Backup taugt?', 'How do you know a backup is good?'], ['با بازیابی آزمایشی منظم روی سیستم جدا و بررسی محتوا، نه فقط پیام «موفق».', 'Durch regelmäßige Test-Wiederherstellungen auf einem getrennten System und Inhaltsprüfung, nicht nur die „Erfolgreich“-Meldung.', 'Regular test restores to a separate system and content checks, not just the “success” message.']]],
  sources: [['rsync(1)', 'https://manpages.ubuntu.com/manpages/noble/man1/rsync.1.html'], ['BSI – Datensicherung', 'https://www.bsi.bund.de/gs-kompendium'], ['restic documentation', 'https://restic.readthedocs.io/']]
},

{
  id: 'lx-web', part: 3,
  title: ['وب‌سرور nginx و TLS', 'Webserver nginx und TLS', 'nginx web server and TLS'],
  goal: ['با nginx یک سایت بسازی، Reverse Proxy تنظیم کنی، گواهی TLS بگذاری و Logهای دسترسی و خطا را بخوانی.', 'Du richtest mit nginx eine Website und einen Reverse Proxy ein, bindest ein TLS-Zertifikat ein und liest Access- und Error-Logs.', 'Set up a site and a reverse proxy with nginx, add a TLS certificate and read access and error logs.'],
  why: ['تقریباً هر برنامهٔ داخلی شرکت پشت یک وب‌سرور یا Reverse Proxy است. خطاهای 502 و گواهی منقضی‌شده تیکت‌های رایج‌اند.', 'Fast jede interne Anwendung steckt hinter einem Webserver oder Reverse Proxy. 502-Fehler und abgelaufene Zertifikate sind typische Tickets.', 'Almost every internal app sits behind a web server or reverse proxy. 502 errors and expired certificates are typical tickets.'],
  know: [
    ['هر سایت یک فایل در /etc/nginx/sites-available دارد و با پیوند در sites-enabled فعال می‌شود.', 'Jede Site hat eine Datei in /etc/nginx/sites-available und wird per Link in sites-enabled aktiv.', 'Each site has a file in /etc/nginx/sites-available and is enabled via a link in sites-enabled.'],
    ['قبل از reload همیشه nginx -t؛ reload بدون قطع اتصال‌ها تنظیمات را بارگذاری می‌کند.', 'Vor dem reload immer nginx -t; reload lädt ohne Verbindungsabbruch.', 'Always nginx -t before reload; reload applies without dropping connections.'],
    ['Reverse Proxy درخواست را با proxy_pass به برنامهٔ پشتی می‌فرستد؛ 502 یعنی برنامهٔ پشتی جواب نمی‌دهد.', 'Ein Reverse Proxy leitet per proxy_pass an das Backend weiter; 502 heißt: Backend antwortet nicht.', 'A reverse proxy forwards via proxy_pass to the backend; 502 means the backend isn’t answering.'],
    ['برای سایت عمومی Let’s Encrypt با certbot؛ در شبکهٔ داخلی گواهی از CA شرکت (مثلاً AD CS).', 'Öffentlich Let’s Encrypt mit certbot; intern ein Zertifikat der Firmen-CA (z. B. AD CS).', 'Public sites use Let’s Encrypt with certbot; internal sites a certificate from the company CA (e.g. AD CS).'],
    ['Logها در /var/log/nginx/access.log و error.log هستند.', 'Logs liegen in /var/log/nginx/access.log und error.log.', 'Logs are in /var/log/nginx/access.log and error.log.']],
  lab: { vm: 'LNX01', shell: 'Bash',
    steps: [
      ['سایت intranet.corp.example.test با یک صفحهٔ ساده بساز.', 'یک برنامهٔ آزمایشی روی پورت 8080 اجرا کن و /app را به آن Proxy کن.', 'یک گواهی خودامضا برای آزمایش بساز و HTTPS را فعال کن (در شرکت: گواهی از CA داخلی).', 'برنامهٔ پشتی را متوقف کن، خطای 502 را ببین و در error.log پیدا کن.', 'HTTP را به HTTPS هدایت کن.'],
      ['Site intranet.corp.example.test mit einer einfachen Seite anlegen.', 'Testanwendung auf Port 8080 starten und /app dorthin proxyen.', 'Zum Test ein selbstsigniertes Zertifikat erzeugen und HTTPS aktivieren (in der Firma: Zertifikat der internen CA).', 'Backend stoppen, 502 sehen und in error.log finden.', 'HTTP auf HTTPS umleiten.'],
      ['Create site intranet.corp.example.test with a simple page.', 'Run a test app on port 8080 and proxy /app to it.', 'Create a self-signed certificate for testing and enable HTTPS (in a company: certificate from the internal CA).', 'Stop the backend, see the 502 and find it in error.log.', 'Redirect HTTP to HTTPS.']],
    code: 'sudo mkdir -p /var/www/intranet && echo "<h1>Intranet</h1>" | sudo tee /var/www/intranet/index.html\nsudo openssl req -x509 -newkey rsa:3072 -nodes -days 90 -subj "/CN=intranet.corp.example.test" -addext "subjectAltName=DNS:intranet.corp.example.test" -keyout /etc/ssl/private/intranet.key -out /etc/ssl/certs/intranet.crt\nsudo tee /etc/nginx/sites-available/intranet >/dev/null <<\'EOF\'\nserver { listen 80; server_name intranet.corp.example.test; return 301 https://$host$request_uri; }\nserver {\n  listen 443 ssl; server_name intranet.corp.example.test;\n  ssl_certificate /etc/ssl/certs/intranet.crt; ssl_certificate_key /etc/ssl/private/intranet.key;\n  root /var/www/intranet;\n  location /app/ { proxy_pass http://127.0.0.1:8080/; proxy_set_header Host $host; }\n}\nEOF\nsudo ln -s /etc/nginx/sites-available/intranet /etc/nginx/sites-enabled/\nsudo nginx -t && sudo systemctl reload nginx\n(cd /tmp && python3 -m http.server 8080 --bind 127.0.0.1 &)\ncurl -kI https://127.0.0.1/app/ -H "Host: intranet.corp.example.test"\npkill -f "http.server 8080"; curl -kI https://127.0.0.1/app/ -H "Host: intranet.corp.example.test"   # 502\nsudo tail -n 3 /var/log/nginx/error.log',
    checks: [
      ['nginx -t موفق است و سایت با HTTPS جواب می‌دهد.', 'http:// با کد 301 به https:// هدایت می‌شود.', 'با برنامهٔ روشن /app کد 200 و با برنامهٔ خاموش 502 می‌دهد.', 'پیام «connect() failed» را در error.log پیدا کردی.'],
      ['nginx -t ist erfolgreich, die Site antwortet per HTTPS.', 'http:// leitet mit 301 auf https:// um.', '/app liefert 200 mit laufendem Backend und 502 ohne.', 'Du hast „connect() failed“ in error.log gefunden.'],
      ['nginx -t passes and the site answers over HTTPS.', 'http:// redirects with 301 to https://.', '/app returns 200 with the backend up and 502 without.', 'You found “connect() failed” in error.log.']] },
  pitfalls: [
    ['reload بدون nginx -t؛ با خطا همهٔ سایت‌ها از کار می‌افتند.', 'reload ohne nginx -t – ein Fehler legt alle Sites lahm.', 'Reload without nginx -t – one error takes down all sites.'],
    ['کلید خصوصی با دسترسی خواندن برای همه.', 'Privater Schlüssel für alle lesbar.', 'Private key readable by everyone.'],
    ['گواهی بدون SAN؛ مرورگرهای امروزی آن را رد می‌کنند.', 'Zertifikat ohne SAN – heutige Browser lehnen es ab.', 'A certificate without SAN – modern browsers reject it.']],
  iv: [
    [['خطای 502 Bad Gateway یعنی چه؟', 'Was bedeutet 502 Bad Gateway?', 'What does 502 Bad Gateway mean?'], ['Proxy کار می‌کند ولی برنامهٔ پشتی پاسخ نمی‌دهد یا خطا می‌دهد؛ سرویس پشتی و error.log را بررسی می‌کنم.', 'Der Proxy läuft, aber das Backend antwortet nicht oder fehlerhaft; ich prüfe Backend-Dienst und error.log.', 'The proxy works but the backend doesn’t answer properly; I check the backend service and error.log.']],
    [['reload و restart در nginx چه فرقی دارند؟', 'reload vs restart bei nginx?', 'nginx reload vs restart?'], ['reload تنظیمات را بدون قطع اتصال‌های جاری بارگذاری می‌کند؛ restart فرایند را کامل متوقف و دوباره روشن می‌کند.', 'reload lädt die Konfiguration ohne laufende Verbindungen zu kappen; restart beendet und startet den Prozess komplett.', 'reload applies config without dropping connections; restart fully stops and starts the process.']],
    [['گواهی سایت منقضی شده. چه می‌کنی؟', 'Das Zertifikat ist abgelaufen. Was tust du?', 'The certificate expired. What do you do?'], ['گواهی جدید می‌گیرم (certbot renew یا از CA داخلی)، جایگزین و reload می‌کنم و برای تمدید خودکار و هشدار برنامه می‌گذارم.', 'Neues Zertifikat besorgen (certbot renew oder interne CA), tauschen, reload, und automatische Erneuerung plus Warnung einrichten.', 'Get a new certificate (certbot renew or internal CA), replace it, reload, and set up auto-renewal plus alerting.']]],
  sources: [['nginx documentation', 'https://nginx.org/en/docs/'], ['Certbot', 'https://certbot.eff.org/'], ['Mozilla SSL Configuration Generator', 'https://ssl-config.mozilla.org/']]
},

{
  id: 'lx-fileserver', part: 3,
  title: ['فایل‌سرور با Samba و NFS', 'Dateiserver mit Samba und NFS', 'File server with Samba and NFS'],
  goal: ['یک Share با Samba برای کلاینت‌های ویندوز و یک Export با NFS برای لینوکس بسازی و دسترسی را محدود کنی.', 'Du stellst mit Samba eine Freigabe für Windows-Clients und mit NFS einen Export für Linux bereit und schränkst den Zugriff ein.', 'Provide a Samba share for Windows clients and an NFS export for Linux and restrict access.'],
  why: ['NASها و بسیاری از فایل‌سرورها پشت پرده Samba هستند. «درایو شبکه وصل نمی‌شود» تیکت روزانه است.', 'NAS-Geräte und viele Dateiserver nutzen intern Samba. „Netzlaufwerk verbindet nicht“ ist ein Alltagsticket.', 'NAS devices and many file servers run Samba under the hood. “Network drive won’t connect” is a daily ticket.'],
  know: [
    ['Samba پروتکل SMB ویندوز را ارائه می‌دهد؛ تنظیمات در /etc/samba/smb.conf و بررسی با testparm.', 'Samba spricht SMB wie Windows; Konfiguration in /etc/samba/smb.conf, Prüfung mit testparm.', 'Samba speaks SMB like Windows; config in /etc/samba/smb.conf, checked with testparm.'],
    ['کاربر Samba باید کاربر لینوکس هم باشد و با smbpasswd -a گذرواژهٔ SMB بگیرد (یا از AD بیاید).', 'Samba-Benutzer müssen Linux-Benutzer sein und per smbpasswd -a ein SMB-Kennwort erhalten (oder aus dem AD kommen).', 'Samba users must be Linux users with an SMB password via smbpasswd -a (or come from AD).'],
    ['دسترسی نهایی = دسترسی Share و دسترسی فایل‌سیستم لینوکس؛ هر دو باید درست باشند.', 'Wirksamer Zugriff = Freigaberecht und Linux-Dateirecht – beide müssen passen.', 'Effective access = share permission and Linux file permission – both must allow it.'],
    ['NFS برای کلاینت‌های لینوکس است؛ export در /etc/exports با محدودهٔ IP و root_squash.', 'NFS ist für Linux-Clients; Exporte in /etc/exports mit IP-Bereich und root_squash.', 'NFS is for Linux clients; exports in /etc/exports with an IP range and root_squash.'],
    ['SMB1 را هرگز فعال نکن؛ Samba جدید پیش‌فرض SMB2 به بالا دارد.', 'SMB1 nie aktivieren – aktuelle Samba-Versionen nutzen standardmäßig SMB2 und höher.', 'Never enable SMB1 – current Samba defaults to SMB2 and newer.']],
  lab: { vm: 'LNX01 + CL01', shell: 'Bash',
    steps: [
      ['Samba را نصب کن و Share «buchhaltung» را روی /srv/buchhaltung فقط برای گروه buchhaltung بساز.', 'برای anna گذرواژهٔ SMB بگذار.', 'از CL01 با \\\\10.20.0.30\\buchhaltung وصل شو.', 'NFS export فقط‌خواندنی /srv/daten/backup برای 10.20.0.0/24 بساز.', 'Share و export فعال را بررسی کن.'],
      ['Samba installieren und Freigabe „buchhaltung“ auf /srv/buchhaltung nur für die Gruppe buchhaltung anlegen.', 'Für anna ein SMB-Kennwort setzen.', 'Von CL01 \\\\10.20.0.30\\buchhaltung verbinden.', 'Nur-Lese-NFS-Export /srv/daten/backup für 10.20.0.0/24 anlegen.', 'Aktive Freigaben und Exporte prüfen.'],
      ['Install Samba and create share “buchhaltung” on /srv/buchhaltung for group buchhaltung only.', 'Set an SMB password for anna.', 'Connect from CL01 to \\\\10.20.0.30\\buchhaltung.', 'Create a read-only NFS export of /srv/daten/backup for 10.20.0.0/24.', 'Check active shares and exports.']],
    code: 'sudo apt install -y samba nfs-kernel-server\nsudo cp /etc/samba/smb.conf ~/lab/smb.conf.bak\nsudo tee -a /etc/samba/smb.conf >/dev/null <<\'EOF\'\n[buchhaltung]\n   path = /srv/buchhaltung\n   valid users = @buchhaltung\n   read only = no\n   create mask = 0660\n   directory mask = 2770\nEOF\ntestparm -s | grep -A5 buchhaltung\nsudo smbpasswd -a anna\nsudo systemctl restart smbd\nsmbclient -L //localhost -U anna\n# CL01 (PowerShell): New-PSDrive -Name B -PSProvider FileSystem -Root \\\\10.20.0.30\\buchhaltung -Credential anna\necho "/srv/daten/backup 10.20.0.0/24(ro,root_squash,no_subtree_check)" | sudo tee -a /etc/exports\nsudo exportfs -ra && sudo exportfs -v',
    checks: [
      ['testparm خطایی نشان نمی‌دهد.', 'anna از CL01 می‌تواند فایل بسازد؛ pruefer نمی‌تواند وصل شود.', 'فایل‌های جدید روی Share گروه buchhaltung دارند.', 'exportfs -v export فقط‌خواندنی را نشان می‌دهد.'],
      ['testparm zeigt keinen Fehler.', 'anna kann von CL01 Dateien anlegen, pruefer kann sich nicht verbinden.', 'Neue Dateien auf der Freigabe haben die Gruppe buchhaltung.', 'exportfs -v zeigt den Nur-Lese-Export.'],
      ['testparm shows no error.', 'anna can create files from CL01; pruefer cannot connect.', 'New files on the share have group buchhaltung.', 'exportfs -v shows the read-only export.']] },
  pitfalls: [
    ['guest ok = yes روی Share حساس.', 'guest ok = yes auf einer sensiblen Freigabe.', 'guest ok = yes on a sensitive share.'],
    ['فقط دسترسی Share را تنظیم کردن و فراموش کردن دسترسی لینوکس.', 'Nur Freigaberechte setzen und Linux-Rechte vergessen.', 'Setting only share permissions and forgetting Linux permissions.'],
    ['NFS export با * و no_root_squash.', 'NFS-Export mit * und no_root_squash.', 'NFS export with * and no_root_squash.']],
  iv: [
    [['فرق SMB و NFS؟', 'Unterschied SMB und NFS?', 'SMB vs NFS?'], ['SMB پروتکل اشتراک فایل ویندوز با احراز هویت کاربر است؛ NFS بیشتر برای لینوکس و یونیکس است و به طور سنتی بر اساس IP و UID کار می‌کند.', 'SMB ist das Windows-Freigabeprotokoll mit Benutzeranmeldung; NFS ist vor allem für Linux/Unix und arbeitet klassisch über IP und UID.', 'SMB is Windows’ sharing protocol with user auth; NFS is mainly for Linux/Unix and classically works by IP and UID.']],
    [['کاربر به Share وصل می‌شود ولی نمی‌تواند بنویسد. چرا؟', 'Benutzer verbindet sich, kann aber nicht schreiben. Warum?', 'User connects but can’t write. Why?'], ['یا read only در Share فعال است یا دسترسی لینوکس روی پوشه اجازهٔ نوشتن نمی‌دهد؛ هر دو را بررسی می‌کنم.', 'Entweder read only auf der Freigabe oder die Linux-Rechte erlauben kein Schreiben – beides prüfen.', 'Either read only on the share or Linux permissions block writing – check both.']],
    [['root_squash چیست؟', 'Was ist root_squash?', 'What is root_squash?'], ['root روی کلاینت NFS روی سرور به کاربر بی‌دسترسی nobody تبدیل می‌شود.', 'root auf dem NFS-Client wird auf dem Server zum rechtelosen Benutzer nobody.', 'root on the NFS client becomes the unprivileged user nobody on the server.']]],
  sources: [['Samba Wiki', 'https://wiki.samba.org/'], ['smb.conf(5)', 'https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html'], ['exports(5)', 'https://manpages.ubuntu.com/manpages/noble/man5/exports.5.html']]
},

{
  id: 'lx-ad', part: 3,
  title: ['اتصال لینوکس به Active Directory', 'Linux in Active Directory einbinden', 'Joining Linux to Active Directory'],
  goal: ['LNX01 را با realmd و SSSD به دامنهٔ corp.example.test وصل کنی، با کاربر دامنه وارد شوی و ورود را به یک گروه AD محدود کنی.', 'Du bindest LNX01 mit realmd und SSSD an corp.example.test an, meldest dich als Domänenbenutzer an und beschränkst den Login auf eine AD-Gruppe.', 'Join LNX01 to corp.example.test with realmd and SSSD, log in as a domain user and restrict logins to an AD group.'],
  why: ['شرکت‌ها حساب کاربری را یک بار در AD می‌سازند. سرور لینوکسی که به AD وصل است مدیریت کاربر و خروج کارمند را ساده و امن می‌کند.', 'Firmen pflegen Konten einmal im AD. Ein angebundener Linux-Server macht Benutzerverwaltung und Austritte einfach und sicher.', 'Companies manage accounts once in AD. A joined Linux server makes user management and offboarding simple and safe.'],
  know: [
    ['realm discover و realm join دامنه را پیدا و سرور را عضو می‌کنند؛ SSSD کاربران و گروه‌ها را از AD می‌خواند.', 'realm discover und realm join finden die Domäne und treten bei; SSSD liest Benutzer und Gruppen aus dem AD.', 'realm discover and realm join find the domain and join; SSSD reads users and groups from AD.'],
    ['پیش‌نیاز: DNS روی DC، زمان همگام (Kerberos حداکثر ۵ دقیقه اختلاف) و نام کامل میزبان.', 'Voraussetzungen: DNS auf den DC, synchrone Zeit (Kerberos erlaubt max. 5 Minuten) und vollständiger Hostname.', 'Prerequisites: DNS pointing to the DC, synced time (Kerberos allows max 5 minutes) and a full hostname.'],
    ['Kerberos با kinit تیکت می‌گیرد و klist آن را نشان می‌دهد.', 'Kerberos holt mit kinit ein Ticket, klist zeigt es an.', 'Kerberos gets a ticket with kinit; klist shows it.'],
    ['realm permit -g ورود را به گروه‌های مشخص محدود می‌کند؛ sudo را می‌توان به گروه AD داد.', 'realm permit -g erlaubt den Login nur bestimmten Gruppen; sudo lässt sich an eine AD-Gruppe binden.', 'realm permit -g limits login to specific groups; sudo can be bound to an AD group.'],
    ['pam_mkhomedir پوشهٔ خانه را در اولین ورود می‌سازد.', 'pam_mkhomedir legt das Home-Verzeichnis beim ersten Login an.', 'pam_mkhomedir creates the home directory on first login.']],
  lab: { vm: 'LNX01 + DC01', shell: 'Bash',
    steps: [
      ['نام میزبان را lnx01.corp.example.test بگذار و زمان را بررسی کن.', 'دامنه را پیدا کن و با حساب ادمین دامنه Join کن.', 'کاربر دامنه را با id پیدا کن و ساخت خودکار پوشهٔ خانه را فعال کن.', 'ورود را به گروه AD «Linux-Admins» محدود کن و به آن sudo بده.', 'با کاربر دامنه وارد شو و تیکت Kerberos را ببین.'],
      ['Hostname auf lnx01.corp.example.test setzen und Zeit prüfen.', 'Domäne finden und mit einem Domänen-Admin beitreten.', 'Domänenbenutzer mit id auflösen und automatische Home-Verzeichnisse aktivieren.', 'Login auf die AD-Gruppe „Linux-Admins“ beschränken und ihr sudo geben.', 'Als Domänenbenutzer anmelden und das Kerberos-Ticket ansehen.'],
      ['Set the hostname to lnx01.corp.example.test and check time.', 'Discover the domain and join with a domain admin.', 'Resolve a domain user with id and enable automatic home directories.', 'Restrict login to AD group “Linux-Admins” and grant it sudo.', 'Log in as a domain user and view the Kerberos ticket.']],
    code: 'sudo hostnamectl set-hostname lnx01.corp.example.test\ntimedatectl\nsudo apt install -y realmd sssd sssd-tools libnss-sss libpam-sss adcli samba-common-bin oddjob oddjob-mkhomedir packagekit krb5-user\nrealm discover corp.example.test\nsudo realm join -U Administrator corp.example.test\nrealm list\nid anna@corp.example.test\nsudo pam-auth-update --enable mkhomedir\nsudo realm deny --all && sudo realm permit -g "Linux-Admins@corp.example.test"\necho \'%linux-admins@corp.example.test ALL=(ALL) ALL\' | sudo tee /etc/sudoers.d/ad-linux-admins\nsudo chmod 440 /etc/sudoers.d/ad-linux-admins && sudo visudo -c\nssh anna@corp.example.test@10.20.0.30\nklist',
    checks: [
      ['realm list دامنه را با configured: kerberos-member نشان می‌دهد.', 'id anna@corp.example.test گروه‌های AD را نشان می‌دهد.', 'کاربر عضو Linux-Admins وارد می‌شود و دیگران رد می‌شوند.', 'klist تیکت krbtgt/CORP.EXAMPLE.TEST دارد.'],
      ['realm list zeigt die Domäne mit configured: kerberos-member.', 'id anna@corp.example.test zeigt AD-Gruppen.', 'Mitglieder von Linux-Admins kommen rein, andere nicht.', 'klist zeigt ein Ticket krbtgt/CORP.EXAMPLE.TEST.'],
      ['realm list shows the domain with configured: kerberos-member.', 'id anna@corp.example.test lists AD groups.', 'Members of Linux-Admins can log in, others are refused.', 'klist shows a krbtgt/CORP.EXAMPLE.TEST ticket.']] },
  pitfalls: [
    ['DNS سرور لینوکس روی DC نیست؛ realm discover چیزی پیدا نمی‌کند.', 'DNS zeigt nicht auf den DC – realm discover findet nichts.', 'DNS doesn’t point to the DC – realm discover finds nothing.'],
    ['اختلاف زمان بیش از ۵ دقیقه؛ Kerberos خطا می‌دهد.', 'Zeitabweichung über 5 Minuten – Kerberos scheitert.', 'Time skew over 5 minutes – Kerberos fails.'],
    ['اجازهٔ ورود به همهٔ کاربران دامنه.', 'Allen Domänenbenutzern den Login erlauben.', 'Allowing every domain user to log in.']],
  iv: [
    [['SSSD چه کاری انجام می‌دهد؟', 'Was macht SSSD?', 'What does SSSD do?'], ['هویت و احراز هویت را از AD یا LDAP به لینوکس می‌آورد و اطلاعات را Cache می‌کند تا ورود بدون اتصال هم ممکن باشد.', 'Es bringt Identitäten und Anmeldung aus AD oder LDAP ins Linux-System und cached sie, damit Logins auch offline gehen.', 'It brings identities and authentication from AD or LDAP into Linux and caches them so logins work offline too.']],
    [['چرا زمان برای Kerberos مهم است؟', 'Warum ist die Zeit für Kerberos wichtig?', 'Why does time matter for Kerberos?'], ['تیکت‌ها زمان‌دارند و برای جلوگیری از حملهٔ تکرار، اختلاف بیش از ۵ دقیقه پذیرفته نمی‌شود.', 'Tickets sind zeitgebunden; zum Schutz vor Replay werden über 5 Minuten Abweichung abgelehnt.', 'Tickets are time-bound; to stop replay attacks skew over 5 minutes is rejected.']],
    [['کاربر دامنه نمی‌تواند وارد لینوکس شود. چه بررسی می‌کنی؟', 'Domänenbenutzer kommt nicht auf Linux. Was prüfst du?', 'A domain user can’t log in to Linux. What do you check?'], ['realm list و permit، id کاربر، DNS و زمان، و journalctl -u sssd؛ در صورت نیاز Cache را با sss_cache -E پاک می‌کنم.', 'realm list und permit, id des Benutzers, DNS und Zeit sowie journalctl -u sssd; notfalls Cache mit sss_cache -E leeren.', 'realm list and permit, the user’s id, DNS and time, journalctl -u sssd; if needed clear the cache with sss_cache -E.']]],
  sources: [['Ubuntu Server – SSSD and Active Directory', 'https://documentation.ubuntu.com/server/'], ['realm(8)', 'https://manpages.ubuntu.com/manpages/noble/man8/realm.8.html'], ['SSSD documentation', 'https://sssd.io/']]
}
);
})();
