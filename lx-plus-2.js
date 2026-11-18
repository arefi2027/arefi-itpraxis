/* Arefi ITPraxis – Vertiefung Lernstrecke Linux-Server, Module 7–11 (SSH, Skripte, Backup, nginx, Samba/NFS). [fa, de, en] */
(() => {
'use strict';
const R = String.raw;
window.ArefiPlus(window.ArefiLXCourse, {

'lx-ssh': {
  know: [
    ['اگر مجوز ‎~/.ssh یا authorized_keys بیش از حد باز باشد (مثلاً 777)، sshd کلید را نادیده می‌گیرد. درست: پوشه 700 و فایل 600، با مالکیت خود کاربر.', 'Sind ~/.ssh oder authorized_keys zu offen (etwa 777), ignoriert sshd den Schlüssel. Richtig: Ordner 700, Datei 600, Besitzer ist der Benutzer selbst.', 'If ~/.ssh or authorized_keys are too open (e.g. 777), sshd ignores the key. Correct: folder 700, file 600, owned by the user.'],
    ['ssh -v نشان می‌دهد کلاینت کدام کلید را پیشنهاد می‌دهد و سرور چرا رد می‌کند؛ روی سرور journalctl -u ssh دلیل را از طرف سرور می‌گوید. sshd -T تنظیمات واقعاً فعال را نشان می‌دهد.', 'ssh -v zeigt, welchen Schlüssel der Client anbietet und warum der Server ablehnt; auf dem Server nennt journalctl -u ssh den Grund. sshd -T zeigt die tatsächlich wirksame Konfiguration.', 'ssh -v shows which key the client offers and why the server refuses; on the server journalctl -u ssh gives the server’s reason. sshd -T shows the effective configuration.'],
    ['هشدار «REMOTE HOST IDENTIFICATION HAS CHANGED» یعنی کلید سرور عوض شده است: نصب دوباره یا IP جدید، یا حملهٔ میانی. اثرانگشت را از راه دیگری (کنسول، همکار) بررسی کن و فقط بعد با ssh-keygen -R ورودی قدیمی را پاک کن.', 'Die Warnung „REMOTE HOST IDENTIFICATION HAS CHANGED“ heißt: Der Serverschlüssel hat sich geändert – Neuinstallation, neue IP oder ein Angriff. Fingerabdruck auf anderem Weg prüfen (Konsole, Kollege) und erst dann mit ssh-keygen -R den alten Eintrag entfernen.', 'The warning “REMOTE HOST IDENTIFICATION HAS CHANGED” means the server key changed: reinstall, new IP or an attack. Verify the fingerprint another way (console, colleague) and only then remove the old entry with ssh-keygen -R.']
  ],
  code: R`# Vertiefung: SSH-Anmeldung debuggen (CL01 und LNX01)
# CL01:
ssh -v admin@10.20.0.30 2>&1 | grep -E "Offering|Authenticated|denied"
# LNX01:
sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin|maxauthtries|allowusers'
ls -ld ~/.ssh ; ls -l ~/.ssh/authorized_keys
chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub          # Fingerabdruck des Servers
journalctl -u ssh --since today --no-pager | tail -n 20
sudo fail2ban-client status sshd
# eigene IP versehentlich gesperrt:
# sudo fail2ban-client set sshd unbanip 10.20.0.50
# CL01: Kurzname in ~/.ssh/config
#   Host lnx01
#     HostName 10.20.0.30
#     User admin`,
  trouble: [
    [['«Permission denied (publickey)».', '„Permission denied (publickey)“.', '“Permission denied (publickey)”.'],
     ['ترتیب: نام کاربری درست است؟ ssh -v کدام کلید را پیشنهاد می‌دهد؟ کلید عمومی همان کلید در authorized_keys کاربر مقصد هست؟ مجوز ‎~/.ssh و فایل درست است؟ روی سرور journalctl -u ssh پیام دقیق (مثلاً «bad ownership or modes») و محدودیت AllowUsers یا AllowGroups را نشان می‌دهد.', 'Reihenfolge: Stimmt der Benutzername? Welchen Schlüssel bietet ssh -v an? Steht genau dieser öffentliche Schlüssel in authorized_keys des Zielbenutzers? Stimmen die Rechte von ~/.ssh und Datei? Auf dem Server zeigt journalctl -u ssh die genaue Meldung (etwa „bad ownership or modes“) und Einschränkungen per AllowUsers oder AllowGroups.', 'In order: is the user name right? Which key does ssh -v offer? Is exactly that public key in the target user’s authorized_keys? Are the permissions of ~/.ssh and the file right? On the server journalctl -u ssh shows the exact message (e.g. “bad ownership or modes”) and AllowUsers or AllowGroups restrictions.']],
    [['بعد از تغییر sshd هیچ‌کس نمی‌تواند وارد سرور شود.', 'Nach einer Änderung an sshd kommt niemand mehr auf den Server.', 'After an sshd change nobody can access the server.'],
     ['از کنسول Hypervisor یا iDRAC/iLO وارد شو، فایل تازه در ‎/etc/ssh/sshd_config.d را اصلاح یا موقتاً جابه‌جا کن، sshd -t و systemctl restart ssh. پیشگیری: قبل از Restart همیشه sshd -t و یک نشست دوم باز تا ورود جدید را آزمایش کنی.', 'Über Hypervisor-Konsole oder iDRAC/iLO anmelden, die neue Datei in /etc/ssh/sshd_config.d korrigieren oder vorübergehend verschieben, sshd -t und systemctl restart ssh. Vorbeugen: vor jedem Neustart sshd -t und eine zweite Sitzung offen lassen, um die neue Anmeldung zu testen.', 'Log in via the hypervisor console or iDRAC/iLO, fix or temporarily move the new file in /etc/ssh/sshd_config.d, run sshd -t and systemctl restart ssh. Prevention: always sshd -t before a restart and keep a second session open to test a new login.']],
    [['fail2ban آدرس IP خود Admin را مسدود کرده است.', 'fail2ban hat die eigene Admin-IP gesperrt.', 'fail2ban banned your own admin IP.'],
     ['از کامپیوتر دیگر یا کنسول: sudo fail2ban-client set sshd unbanip IP. برای جلوگیری، شبکهٔ Adminها را در ignoreip در فایل ‎/etc/fail2ban/jail.local بگذار. بعد ببین چرا ورودها شکست خورده‌اند (کلید اشتباه در یک اسکریپت؟).', 'Von einem anderen Rechner oder der Konsole: sudo fail2ban-client set sshd unbanip IP. Zur Vorbeugung das Admin-Netz als ignoreip in /etc/fail2ban/jail.local eintragen. Dann klären, warum die Anmeldungen scheiterten (falscher Schlüssel in einem Skript?).', 'From another computer or the console: sudo fail2ban-client set sshd unbanip IP. To prevent it, add the admin network as ignoreip in /etc/fail2ban/jail.local. Then find out why logins failed (wrong key in a script?).']]
  ],
  decide: [
    [['کلید مشترک تیم یا کلید برای هر نفر؟', 'Gemeinsamer Teamschlüssel oder Schlüssel pro Person?', 'Shared team key or one key per person?'],
     ['همیشه برای هر نفر کلید جدا با Passphrase (و ssh-agent برای راحتی). با رفتن یک نفر فقط کلید او از authorized_keys حذف می‌شود؛ کلید مشترک قابل ردیابی نیست.', 'Immer ein eigener Schlüssel pro Person mit Passphrase (und ssh-agent für Komfort). Geht jemand, wird nur sein Schlüssel aus authorized_keys entfernt; ein gemeinsamer Schlüssel ist nicht nachvollziehbar.', 'Always a separate key per person with a passphrase (and ssh-agent for convenience). When someone leaves, only their key is removed from authorized_keys; a shared key is not traceable.']],
    [['SSH را از اینترنت باز کنم؟', 'SSH aus dem Internet öffnen?', 'Open SSH to the internet?'],
     ['ترجیحاً نه: VPN یا یک Bastion Host. اگر لازم است: فقط کلید، بدون ورود root، fail2ban، محدود به IPهای مشخص در فایروال و پایش لاگ. تغییر پورت امنیت واقعی نمی‌دهد، فقط نویز لاگ را کم می‌کند.', 'Möglichst nein: VPN oder ein Bastion-Host. Wenn nötig: nur Schlüssel, kein Root-Login, fail2ban, in der Firewall auf bestimmte IPs begrenzt und Logüberwachung. Ein anderer Port bringt keine echte Sicherheit, nur weniger Lognoise.', 'Preferably not: VPN or a bastion host. If necessary: keys only, no root login, fail2ban, limited to specific IPs in the firewall and log monitoring. Changing the port gives no real security, it only reduces log noise.']]
  ],
  iv: [
    [['همکار نمی‌تواند با کلیدش وارد شود. چه اطلاعاتی از او می‌خواهی و چه چیزی را بررسی می‌کنی؟', 'Ein Kollege kommt mit seinem Schlüssel nicht rein. Was fragst du ab, was prüfst du?', 'A colleague cannot log in with his key. What do you ask, what do you check?'],
     ['خروجی ssh -v او (کدام کلید و کدام کاربر)، و زمان تلاش. روی سرور journalctl -u ssh همان زمان، وجود کلید عمومی او در authorized_keys کاربر مقصد، مجوزهای ‎~/.ssh و تنظیمات AllowUsers یا AllowGroups با sshd -T.', 'Seine Ausgabe von ssh -v (welcher Schlüssel, welcher Benutzer) und den Zeitpunkt. Auf dem Server journalctl -u ssh zu dieser Zeit, ob sein öffentlicher Schlüssel in authorized_keys des Zielbenutzers steht, Rechte von ~/.ssh und AllowUsers bzw. AllowGroups per sshd -T.', 'His ssh -v output (which key, which user) and the time. On the server journalctl -u ssh at that time, whether his public key is in the target user’s authorized_keys, permissions of ~/.ssh and AllowUsers or AllowGroups via sshd -T.']]
  ]
},

'lx-scripting': {
  know: [
    ['shellcheck اشتباه‌های رایج Bash (متغیر بدون نقل‌قول، فرمان اشتباه) را پیش از اجرا پیدا می‌کند؛ bash -x اسکریپت را خط‌به‌خط با مقادیر واقعی نشان می‌دهد.', 'shellcheck findet typische Bash-Fehler (Variablen ohne Anführungszeichen, falsche Befehle) vor der Ausführung; bash -x zeigt das Skript Zeile für Zeile mit echten Werten.', 'shellcheck finds common Bash mistakes (unquoted variables, wrong commands) before running; bash -x shows the script line by line with real values.'],
    ['Cron محیط حداقلی دارد: PATH کوتاه، بدون متغیرهای شل تو و بدون پوشهٔ کاری. در Cron همیشه مسیر کامل بنویس و خروجی را به لاگ بفرست (‎>> /var/log/x.log 2>&1)؛ وگرنه خطا دیده نمی‌شود.', 'Cron hat eine minimale Umgebung: kurzer PATH, keine Variablen deiner Shell, kein Arbeitsordner. In Cron immer volle Pfade verwenden und die Ausgabe ins Log leiten (>> /var/log/x.log 2>&1) – sonst bleiben Fehler unsichtbar.', 'Cron has a minimal environment: short PATH, none of your shell variables, no working directory. Always use full paths in cron and send output to a log (>> /var/log/x.log 2>&1) – otherwise errors stay invisible.'],
    ['با trap \'…\' EXIT کار پاک‌سازی (مثلاً حذف فایل موقت) حتی در صورت خطا انجام می‌شود؛ با mktemp فایل موقت امن بساز.', 'Mit trap \'…\' EXIT läuft das Aufräumen (etwa temporäre Datei löschen) auch bei einem Fehler; mit mktemp eine sichere temporäre Datei anlegen.', 'With trap \'…\' EXIT clean-up (e.g. deleting a temp file) runs even on error; create safe temp files with mktemp.']
  ],
  code: R`# Vertiefung: Skripte prüfen und robust machen
sudo apt install -y shellcheck
shellcheck /usr/local/bin/plattencheck.sh
bash -x /usr/local/bin/plattencheck.sh 80            # jede Zeile sichtbar
systemd-analyze calendar "Mon..Fri 06:30"            # OnCalendar-Ausdruck prüfen
systemctl list-timers --all | head
file /usr/local/bin/plattencheck.sh                  # „with CRLF“ = Windows-Zeilenenden
# Muster: Aufräumen mit trap
cat > ~/lab/muster.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT
df -h > "$tmp"
grep -E ' /$' "$tmp" || echo "Root-Dateisystem nicht gefunden"
EOF
bash ~/lab/muster.sh`,
  trouble: [
    [['اسکریپت دستی اجرا می‌شود اما با Cron نه.', 'Skript läuft von Hand, aber nicht per Cron.', 'Script works manually but not from cron.'],
     ['در Cron محیط فرق دارد: مسیر کامل برنامه‌ها و فایل‌ها را بنویس، خروجی و خطا را به یک لاگ بفرست و ببین. مجوز اجرا و کاربری که Cron با آن اجرا می‌شود را بررسی کن. اغلب بهتر است آن را به systemd Timer تبدیل کنی تا لاگ در Journal باشد.', 'In Cron ist die Umgebung anders: volle Pfade für Programme und Dateien verwenden, Ausgabe und Fehler in ein Log leiten und ansehen. Ausführungsrecht und den Benutzer prüfen, unter dem Cron läuft. Oft besser in einen systemd-Timer umwandeln, dann landet das Log im Journal.', 'Cron has a different environment: use full paths for programs and files, send output and errors to a log and read it. Check execute permission and the user cron runs as. Often better to convert it to a systemd timer so the log ends up in the journal.']],
    [['«bad interpreter: /bin/bash^M» یا خطاهای عجیب در هر خط.', '„bad interpreter: /bin/bash^M“ oder seltsame Fehler in jeder Zeile.', '“bad interpreter: /bin/bash^M” or odd errors on every line.'],
     ['فایل در ویندوز ذخیره شده و پایان خط CRLF دارد. با sed -i \'s/\\r$//\' فایل یا dos2unix درستش کن و در ویرایشگر ویندوز پایان خط LF را انتخاب کن.', 'Die Datei wurde unter Windows gespeichert und hat CRLF-Zeilenenden. Mit sed -i \'s/\\r$//\' datei oder dos2unix korrigieren und im Windows-Editor LF als Zeilenende einstellen.', 'The file was saved on Windows and has CRLF line endings. Fix with sed -i \'s/\\r$//\' file or dos2unix and set LF line endings in the Windows editor.']],
    [['اسکریپت با set -e بدون پیام متوقف می‌شود.', 'Skript mit set -e bricht ohne Meldung ab.', 'Script with set -e stops without a message.'],
     ['فرمانی کد غیرصفر برگردانده؛ مثلاً grep وقتی چیزی پیدا نمی‌کند کد ۱ می‌دهد. با bash -x خط آخر را پیدا کن. جایی که «پیدا نشدن» عادی است، از if یا ‎|| true استفاده کن و پیام روشن بنویس.', 'Ein Befehl lieferte einen Code ungleich 0 – etwa grep, wenn nichts gefunden wird (Code 1). Mit bash -x die letzte Zeile finden. Wo „nichts gefunden“ normal ist, if oder || true verwenden und eine klare Meldung ausgeben.', 'A command returned a non-zero code – e.g. grep returns 1 when nothing is found. Find the last line with bash -x. Where “not found” is normal, use if or || true and print a clear message.']]
  ],
  decide: [
    [['Bash یا Python؟', 'Bash oder Python?', 'Bash or Python?'],
     ['Bash برای چسباندن فرمان‌ها و کار با فایل، تا حدود ۵۰ خط. Python وقتی منطق، JSON، API، خطایابی دقیق یا آزمایش لازم است. وقتی اسکریپت Bash پر از if تودرتو و رشته‌بازی شد، وقت Python است.', 'Bash zum Verbinden von Befehlen und für Dateiarbeit, bis etwa 50 Zeilen. Python, wenn Logik, JSON, APIs, saubere Fehlerbehandlung oder Tests nötig sind. Wird ein Bash-Skript zu verschachtelten ifs und Textbasteleien, ist es Zeit für Python.', 'Bash for gluing commands together and file work, up to about 50 lines. Python when logic, JSON, APIs, proper error handling or tests are needed. When a Bash script turns into nested ifs and string juggling, it is time for Python.']],
    [['Cron یا systemd Timer؟', 'Cron oder systemd-Timer?', 'Cron or systemd timer?'],
     ['systemd Timer برای کارهای سرور: لاگ در Journal، اجرای جاافتاده با Persistent=true و وضعیت با systemctl. Cron برای کارهای ساده و سیستم‌های قدیمی یا وقتی تیم به آن عادت دارد.', 'systemd-Timer für Serveraufgaben: Log im Journal, verpasste Läufe mit Persistent=true und Status per systemctl. Cron für einfache Aufgaben, ältere Systeme oder wenn das Team daran gewöhnt ist.', 'systemd timer for server jobs: log in the journal, missed runs with Persistent=true and status via systemctl. Cron for simple jobs, older systems or when the team is used to it.']]
  ],
  iv: [
    [['یک اسکریپت پشتیبان هر شب «موفق» گزارش می‌دهد ولی فایل‌ها خالی‌اند. چه چیزی را بررسی می‌کنی؟', 'Ein Backup-Skript meldet jede Nacht „Erfolg“, aber die Dateien sind leer. Was prüfst du?', 'A backup script reports “success” every night but the files are empty. What do you check?'],
     ['اینکه اسکریپت کد خروج فرمان‌ها را بررسی می‌کند (set -euo pipefail)، محیط Cron (مسیرها، کاربر، مجوز خواندن)، و پیام‌های خطا که شاید به ‎/dev/null رفته‌اند. بعد یک بازیابی آزمایشی و افزودن بررسی اندازه یا Checksum به اسکریپت.', 'Ob das Skript Exit-Codes prüft (set -euo pipefail), die Cron-Umgebung (Pfade, Benutzer, Leserechte) und Fehlermeldungen, die vielleicht nach /dev/null gehen. Danach eine Testwiederherstellung und eine Größen- oder Prüfsummenkontrolle im Skript.', 'Whether the script checks exit codes (set -euo pipefail), the cron environment (paths, user, read permissions) and error messages that may go to /dev/null. Then a test restore and a size or checksum check in the script.']]
  ]
},

'lx-backup': {
  know: [
    ['restic پشتیبان رمزگذاری‌شده، نسخه‌دار و با حذف تکرار می‌سازد: init، backup، snapshots، restore، forget --prune و check. رمز مخزن را در مدیر رمز ثبت کن؛ بدون آن هیچ بازیابی‌ای ممکن نیست.', 'restic erstellt verschlüsselte, versionierte und deduplizierte Backups: init, backup, snapshots, restore, forget --prune und check. Das Repository-Kennwort im Passwortmanager hinterlegen – ohne es ist keine Wiederherstellung möglich.', 'restic creates encrypted, versioned and deduplicated backups: init, backup, snapshots, restore, forget --prune and check. Store the repository password in the password manager – without it no restore is possible.'],
    ['rsync با ‎--delete یک آینه است، نه پشتیبان: اگر فایلی امروز حذف یا رمزگذاری شود، فردا در آینه هم حذف یا رمزگذاری شده است. برای پشتیبان واقعی نسخه‌ها (Snapshot) لازم‌اند.', 'rsync mit --delete ist ein Spiegel, kein Backup: Wird heute eine Datei gelöscht oder verschlüsselt, ist sie morgen auch im Spiegel gelöscht oder verschlüsselt. Für echtes Backup braucht es Versionen (Snapshots).', 'rsync with --delete is a mirror, not a backup: if a file is deleted or encrypted today, it is deleted or encrypted in the mirror tomorrow. Real backup needs versions (snapshots).'],
    ['بازیابی را منظم آزمایش کن و زمانش را بنویس؛ این عدد RTO واقعی توست. پشتیبانی که بازیابی‌اش هرگز آزمایش نشده، فقط یک امید است.', 'Wiederherstellung regelmäßig testen und die Dauer notieren – das ist deine echte RTO. Ein Backup, dessen Wiederherstellung nie getestet wurde, ist nur eine Hoffnung.', 'Test restores regularly and record the duration – that is your real RTO. A backup whose restore was never tested is only a hope.']
  ],
  code: R`# Vertiefung: versioniertes, verschlüsseltes Backup mit restic
# (im Labor auf /srv/daten – im Echtbetrieb auf ein anderes System)
sudo apt install -y restic
sudo sh -c 'head -c 32 /dev/urandom | base64 > /root/.restic-pass && chmod 600 /root/.restic-pass'
export RESTIC_REPOSITORY=/srv/daten/restic RESTIC_PASSWORD_FILE=/root/.restic-pass
sudo -E restic init
sudo -E restic backup /srv/buchhaltung /etc --exclude-caches
sudo -E restic snapshots
sudo -E restic restore latest --target /tmp/restic-test --include /srv/buchhaltung
ls -l /tmp/restic-test/srv/buchhaltung
sudo -E restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune
sudo -E restic check`,
  trouble: [
    [['پشتیبان گزارش موفقیت می‌دهد اما در بازیابی فایل‌هایی نیست.', 'Backup meldet Erfolg, aber bei der Wiederherstellung fehlen Dateien.', 'Backup reports success, but files are missing on restore.'],
     ['مسیرها و Excludeها را بررسی کن؛ در rsync اسلش انتهای مسیر معنی را عوض می‌کند (‎/src/ محتوا، ‎/src خود پوشه). کاربر اجرای پشتیبان باید مجوز خواندن همه‌چیز را داشته باشد و خطاهای «permission denied» در لاگ را جدی بگیر. سپس آزمایش بازیابی منظم برنامه‌ریزی کن.', 'Pfade und Ausschlüsse prüfen; bei rsync ändert der Schrägstrich am Ende die Bedeutung (/quelle/ Inhalt, /quelle der Ordner selbst). Der Backup-Benutzer braucht Leserecht auf alles; „permission denied“ im Log ernst nehmen. Danach regelmäßige Wiederherstellungstests einplanen.', 'Check paths and excludes; with rsync the trailing slash changes the meaning (/src/ the content, /src the folder itself). The backup user needs read access to everything; take “permission denied” in the log seriously. Then schedule regular restore tests.']],
    [['مقصد پشتیبان پر است و پشتیبان‌گیری قطع می‌شود.', 'Backupziel ist voll, die Sicherung bricht ab.', 'Backup target is full and the backup aborts.'],
     ['سیاست نگهداری (Retention) اجرا نشده یا داده رشد کرده است. restic forget --prune با قوانین تعیین‌شده، بعد restic check. فضای مقصد را پایش کن (هشدار در ۸۰٪) و رشد ماهانه را در برنامه‌ریزی ظرفیت ببین. نسخه‌های قدیمی را بدون تأیید مسئول داده پاک نکن.', 'Die Aufbewahrungsregeln liefen nicht oder die Daten sind gewachsen. restic forget --prune mit den festgelegten Regeln, danach restic check. Zielplatz überwachen (Warnung bei 80 %) und das monatliche Wachstum in der Kapazitätsplanung berücksichtigen. Alte Versionen nicht ohne Freigabe des Datenverantwortlichen löschen.', 'The retention rules did not run or the data has grown. Run restic forget --prune with the defined rules, then restic check. Monitor target space (alert at 80%) and include monthly growth in capacity planning. Do not delete old versions without approval of the data owner.']],
    [['پایگاه داده‌ای که از پشتیبان فایل بازگردانده شده اجرا نمی‌شود.', 'Datenbank aus der Dateisicherung lässt sich nicht starten.', 'Database restored from the file backup does not start.'],
     ['فایل‌های پایگاه داده در حال اجرا نیم‌نوشته کپی شده‌اند. برای پایگاه داده همیشه قبل از پشتیبان فایل یک Dump (mysqldump، pg_dump) بگیر یا از ابزار پشتیبان مخصوص همان پایگاه استفاده کن، و بازیابی Dump را هم آزمایش کن.', 'Die Dateien der laufenden Datenbank wurden halb geschrieben kopiert. Für Datenbanken vor der Dateisicherung immer einen Dump (mysqldump, pg_dump) erstellen oder das Backupwerkzeug der Datenbank nutzen – und auch die Wiederherstellung des Dumps testen.', 'The running database’s files were copied half-written. For databases always create a dump (mysqldump, pg_dump) before the file backup or use the database’s own backup tool – and test restoring the dump too.']]
  ],
  decide: [
    [['آینه با rsync یا پشتیبان نسخه‌دار؟', 'Spiegel mit rsync oder versioniertes Backup?', 'rsync mirror or versioned backup?'],
     ['آینه برای در دسترس بودن سریع یک نسخهٔ دوم مفید است، اما در برابر حذف اشتباه و باج‌افزار محافظت نمی‌کند. همیشه دست‌کم یک پشتیبان نسخه‌دار (restic، Borg، Veeam و …) با نگهداری چندروزه و چندماهه.', 'Ein Spiegel ist nützlich für eine schnell verfügbare zweite Kopie, schützt aber nicht vor versehentlichem Löschen und Ransomware. Immer mindestens ein versioniertes Backup (restic, Borg, Veeam usw.) mit Aufbewahrung über Tage und Monate.', 'A mirror is useful for a quickly available second copy but does not protect against accidental deletion and ransomware. Always at least one versioned backup (restic, Borg, Veeam etc.) with retention over days and months.']],
    [['پشتیبان را کجا نگه دارم؟', 'Wo das Backup aufbewahren?', 'Where to keep the backup?'],
     ['قاعدهٔ 3-2-1 به‌علاوهٔ یک نسخهٔ آفلاین یا غیرقابل تغییر (مثلاً Object Lock یا نوار) و صفر خطا در آزمایش بازیابی. پشتیبان روی همان سرور یا با همان حساب Admin در برابر باج‌افزار ارزشی ندارد.', '3-2-1 plus eine Offline- oder unveränderbare Kopie (etwa Object Lock oder Band) und null Fehler beim Wiederherstellungstest. Ein Backup auf demselben Server oder mit demselben Admin-Konto hilft gegen Ransomware nicht.', '3-2-1 plus one offline or immutable copy (e.g. object lock or tape) and zero errors in restore tests. A backup on the same server or with the same admin account does not help against ransomware.']]
  ],
  iv: [
    [['RPO و RTO چیستند و چطور آن‌ها را در عمل اندازه می‌گیری؟', 'Was sind RPO und RTO und wie misst du sie praktisch?', 'What are RPO and RTO and how do you measure them in practice?'],
     ['RPO حداکثر دادهٔ قابل از دست رفتن است (فاصلهٔ پشتیبان‌ها)، RTO حداکثر زمان تا برگشت سرویس. RPO را از زمان‌بندی پشتیبان و RTO را با یک بازیابی آزمایشی کامل و زمان‌سنجی شده اندازه می‌گیرم و با نیاز کسب‌وکار مقایسه می‌کنم.', 'RPO ist der maximal tolerierbare Datenverlust (Abstand der Sicherungen), RTO die maximale Zeit bis zur Wiederherstellung des Dienstes. RPO lese ich am Backupplan ab, RTO messe ich mit einer vollständigen, gestoppten Testwiederherstellung und vergleiche beides mit dem Bedarf des Fachbereichs.', 'RPO is the maximum tolerable data loss (interval between backups), RTO the maximum time until the service is back. I read RPO from the backup schedule and measure RTO with a complete, timed test restore, and compare both with the business need.']]
  ]
},

'lx-web': {
  know: [
    ['nginx -T کل تنظیمات واقعاً بارگذاری‌شده را یک‌جا نشان می‌دهد؛ برای پیدا کردن اینکه کدام server_name درخواست را جواب می‌دهد مفید است.', 'nginx -T zeigt die gesamte tatsächlich geladene Konfiguration auf einmal – nützlich, um herauszufinden, welcher server_name eine Anfrage beantwortet.', 'nginx -T shows the entire loaded configuration at once – useful to find out which server_name answers a request.'],
    ['کدهای رایج nginx: ‏403 مجوز یا فایل index نیست، 404 مسیر root اشتباه، 502 Backend در دسترس نیست، 504 Backend دیر جواب می‌دهد، 413 فایل بارگذاری بزرگ‌تر از client_max_body_size است.', 'Typische nginx-Codes: 403 Rechte oder index-Datei fehlt, 404 falscher root-Pfad, 502 Backend nicht erreichbar, 504 Backend antwortet zu langsam, 413 Upload größer als client_max_body_size.', 'Common nginx codes: 403 permissions or missing index file, 404 wrong root path, 502 backend unreachable, 504 backend too slow, 413 upload larger than client_max_body_size.'],
    ['تاریخ انقضای گواهی را با openssl x509 -noout -enddate ببین. با Let’s Encrypt تمدید خودکار با تایمر certbot انجام می‌شود؛ certbot renew --dry-run آن را آزمایش می‌کند.', 'Ablaufdatum eines Zertifikats mit openssl x509 -noout -enddate prüfen. Bei Let’s Encrypt erneuert der certbot-Timer automatisch; certbot renew --dry-run testet das.', 'Check a certificate’s expiry with openssl x509 -noout -enddate. With Let’s Encrypt the certbot timer renews automatically; certbot renew --dry-run tests it.']
  ],
  code: R`# Vertiefung: nginx-Fehlersuche
sudo nginx -T 2>/dev/null | grep -E 'server_name|listen|root' | head -n 20
curl -kI https://127.0.0.1/ -H "Host: intranet.corp.example.test"
sudo tail -n 20 /var/log/nginx/access.log
sudo tail -n 20 /var/log/nginx/error.log
sudo openssl x509 -in /etc/ssl/certs/intranet.crt -noout -subject -enddate -ext subjectAltName
echo | openssl s_client -connect 127.0.0.1:443 -servername intranet.corp.example.test 2>/dev/null | openssl x509 -noout -dates
namei -l /var/www/intranet/index.html                # darf www-data lesen?
sudo ss -tulpn | grep -E ':80|:443|:8080'
# öffentlich mit Let’s Encrypt: sudo certbot renew --dry-run`,
  trouble: [
    [['خطای 502 Bad Gateway.', '502 Bad Gateway.', '502 Bad Gateway.'],
     ['nginx کار می‌کند ولی Backend جواب نمی‌دهد. در error.log پیام «connect() failed (111: Connection refused)» یعنی برنامه روی آن پورت اجرا نمی‌شود: سرویس Backend را با systemctl status و ss -tulpn بررسی کن و پورت در proxy_pass را با پورت واقعی مقایسه کن.', 'nginx läuft, aber das Backend antwortet nicht. „connect() failed (111: Connection refused)“ im error.log heißt: Auf dem Port läuft kein Programm – Backend-Dienst mit systemctl status und ss -tulpn prüfen und den Port in proxy_pass mit dem tatsächlichen Port vergleichen.', 'nginx runs but the backend does not answer. “connect() failed (111: Connection refused)” in error.log means no program is running on that port – check the backend service with systemctl status and ss -tulpn and compare the port in proxy_pass with the real port.']],
    [['خطای 403 Forbidden.', '403 Forbidden.', '403 Forbidden.'],
     ['یا فایل index در پوشه نیست (و فهرست پوشه خاموش است) یا کاربر www-data به یکی از پوشه‌های مسیر دسترسی ندارد؛ namei -l مسیر را نشان می‌دهد. error.log پیام «permission denied» یا «directory index … is forbidden» می‌دهد.', 'Entweder fehlt die index-Datei (und die Verzeichnisliste ist aus) oder www-data hat auf einen Ordner im Pfad keinen Zugriff – namei -l zeigt den Pfad. Im error.log steht „permission denied“ oder „directory index … is forbidden“.', 'Either the index file is missing (and directory listing is off) or www-data has no access to a folder in the path – namei -l shows the path. error.log says “permission denied” or “directory index … is forbidden”.']],
    [['بارگذاری با خطای 413 Request Entity Too Large قطع می‌شود.', 'Upload bricht mit 413 Request Entity Too Large ab.', 'Upload fails with 413 Request Entity Too Large.'],
     ['پیش‌فرض nginx فقط ۱ مگابایت است. client_max_body_size را در بلوک server (مثلاً 50m) تنظیم کن، nginx -t و reload. اگر Backend خودش هم محدودیت دارد (PHP: upload_max_filesize)، آن را هم هماهنگ کن.', 'Der nginx-Standard ist nur 1 MB. client_max_body_size im server-Block setzen (etwa 50m), nginx -t und reload. Hat das Backend selbst ein Limit (PHP: upload_max_filesize), dieses ebenfalls anpassen.', 'The nginx default is only 1 MB. Set client_max_body_size in the server block (e.g. 50m), nginx -t and reload. If the backend has its own limit (PHP: upload_max_filesize), adjust that too.']]
  ],
  decide: [
    [['nginx یا Apache؟', 'nginx oder Apache?', 'nginx or Apache?'],
     ['nginx برای Reverse Proxy، فایل‌های ایستا و بار زیاد با منابع کم. Apache وقتی برنامه به ‎.htaccess یا ماژول‌های Apache وابسته است (برخی برنامه‌های PHP قدیمی). در شرکت معمولاً همان چیزی که تیم پشتیبانی می‌کند.', 'nginx für Reverse Proxy, statische Dateien und viel Last mit wenig Ressourcen. Apache, wenn die Anwendung .htaccess oder Apache-Module braucht (manche ältere PHP-Anwendungen). In der Firma meist das, was das Team betreut.', 'nginx for reverse proxy, static files and high load with few resources. Apache when the application needs .htaccess or Apache modules (some older PHP applications). In a company usually whatever the team supports.']],
    [['Let’s Encrypt یا گواهی CA داخلی؟', 'Let’s Encrypt oder Zertifikat der internen CA?', 'Let’s Encrypt or internal CA certificate?'],
     ['Let’s Encrypt برای نام‌هایی که از اینترنت در دسترس‌اند یا DNS عمومی دارند، با تمدید خودکار. CA داخلی برای نام‌های فقط داخلی؛ در هر دو حالت یادآور یا پایش انقضا لازم است.', 'Let’s Encrypt für Namen, die aus dem Internet erreichbar sind oder öffentliches DNS haben, mit automatischer Erneuerung. Interne CA für rein interne Namen – in beiden Fällen Ablaufüberwachung einrichten.', 'Let’s Encrypt for names reachable from the internet or with public DNS, with automatic renewal. Internal CA for internal-only names – set up expiry monitoring in both cases.']]
  ],
  iv: [
    [['فرق 502 و 504 در Reverse Proxy چیست؟', 'Unterschied zwischen 502 und 504 beim Reverse Proxy?', 'Difference between 502 and 504 with a reverse proxy?'],
     ['502 یعنی Proxy اصلاً به Backend وصل نشد یا جواب نامعتبر گرفت (سرویس خاموش، پورت اشتباه). 504 یعنی وصل شد ولی Backend در زمان تعیین‌شده جواب نداد (برنامهٔ کند یا پایگاه دادهٔ قفل‌شده). بررسی: error.log، وضعیت Backend و زمان پاسخ آن.', '502: Der Proxy erreichte das Backend nicht oder bekam eine ungültige Antwort (Dienst aus, falscher Port). 504: Verbindung da, aber das Backend antwortete nicht rechtzeitig (langsame Anwendung, gesperrte Datenbank). Prüfen: error.log, Backend-Zustand und dessen Antwortzeit.', '502: the proxy could not reach the backend or got an invalid answer (service down, wrong port). 504: connected, but the backend did not answer in time (slow application, locked database). Check error.log, backend state and its response time.']]
  ]
},

'lx-fileserver': {
  know: [
    ['smbstatus اتصال‌های فعال و فایل‌های قفل‌شده را نشان می‌دهد و pdbedit -L کاربران Samba را؛ لاگ‌ها در ‎/var/log/samba هستند.', 'smbstatus zeigt aktive Verbindungen und gesperrte Dateien, pdbedit -L die Samba-Benutzer; Logs liegen unter /var/log/samba.', 'smbstatus shows active connections and locked files, pdbedit -L the Samba users; logs are in /var/log/samba.'],
    ['ویندوز سرور لینوکسی را بدون NetBIOS با نام کوتاه پیدا نمی‌کند؛ رکورد A در DNS داخلی بساز و با نام کامل (‎\\\\lnx01.corp.example.test) وصل شو. wsdd برای نمایش در «Network» ویندوز است.', 'Windows findet einen Linux-Server ohne NetBIOS nicht per Kurzname; einen A-Eintrag im internen DNS anlegen und mit vollem Namen verbinden (\\\\lnx01.corp.example.test). wsdd sorgt für die Anzeige unter „Netzwerk“.', 'Windows does not find a Linux server by short name without NetBIOS; create an A record in internal DNS and connect with the full name (\\\\lnx01.corp.example.test). wsdd makes it appear under “Network”.'],
    ['showmount -e سرور فهرست Exportهای NFS را نشان می‌دهد. root_squash یعنی root روی کلاینت در سرور فقط nobody است؛ این محافظت را جز در موارد خاص (مثلاً Hypervisor) برندار.', 'showmount -e server zeigt die NFS-Exporte. root_squash heißt: root auf dem Client ist auf dem Server nur nobody – diesen Schutz nur in Sonderfällen (etwa Hypervisor) aufheben.', 'showmount -e server lists the NFS exports. root_squash means root on the client is only nobody on the server – remove this protection only in special cases (e.g. a hypervisor).']
  ],
  code: R`# Vertiefung: Samba und NFS prüfen
testparm -s 2>/dev/null | head -n 30
sudo smbstatus                                       # Verbindungen
sudo smbstatus -L                                    # gesperrte Dateien
sudo pdbedit -L                                      # Samba-Benutzer
sudo tail -n 30 /var/log/samba/log.smbd
showmount -e 10.20.0.30
sudo exportfs -v
# Linux-Client: sudo mount -t nfs 10.20.0.30:/srv/daten/backup /mnt && ls /mnt
# Windows-Client (PowerShell): Test-NetConnection 10.20.0.30 -Port 445`,
  trouble: [
    [['ویندوز: «دسترسی رد شد» برای اشتراک Samba.', 'Windows: „Zugriff verweigert“ auf die Samba-Freigabe.', 'Windows: “Access denied” to the Samba share.'],
     ['کاربر در Samba ثبت شده؟ (pdbedit -L؛ اگر نه smbpasswd -a). عضو گروهی است که در valid users آمده (با @)؟ مجوز لینوکسی پوشه اجازه می‌دهد؟ ویندوز اعتبارنامهٔ قدیمی ذخیره نکرده (net use * /delete یا Credential Manager)؟ log.smbd دلیل را می‌گوید.', 'Ist der Benutzer in Samba eingetragen (pdbedit -L, sonst smbpasswd -a)? Ist er in der Gruppe aus valid users (mit @)? Erlauben die Linux-Rechte des Ordners den Zugriff? Hat Windows alte Anmeldedaten gespeichert (net use * /delete oder Anmeldeinformationsverwaltung)? log.smbd nennt den Grund.', 'Is the user registered in Samba (pdbedit -L, otherwise smbpasswd -a)? Is the user in the group from valid users (with @)? Do the folder’s Linux permissions allow access? Has Windows stored old credentials (net use * /delete or Credential Manager)? log.smbd gives the reason.']],
    [['همکاران نمی‌توانند فایل‌هایی را که از ویندوز ساخته شده‌اند ویرایش کنند.', 'Von Windows angelegte Dateien können Kollegen nicht bearbeiten.', 'Colleagues cannot edit files created from Windows.'],
     ['مجوز فایل تازه از create mask و directory mask در smb.conf می‌آید. برای پوشه‌های گروهی create mask = 0660، directory mask = 2770 و در صورت نیاز force group = buchhaltung. فایل‌های موجود را یک بار با chgrp و chmod اصلاح کن.', 'Die Rechte neuer Dateien kommen aus create mask und directory mask in smb.conf. Für Gruppenordner create mask = 0660, directory mask = 2770 und bei Bedarf force group = buchhaltung. Bestehende Dateien einmal per chgrp und chmod korrigieren.', 'Permissions of new files come from create mask and directory mask in smb.conf. For group folders create mask = 0660, directory mask = 2770 and if needed force group = buchhaltung. Fix existing files once with chgrp and chmod.']],
    [['Mount کردن NFS: «access denied by server».', 'NFS-Mount: „access denied by server“.', 'NFS mount: “access denied by server”.'],
     ['IP کلاینت در محدودهٔ خط ‎/etc/exports نیست یا بعد از تغییر exportfs -ra اجرا نشده. با exportfs -v و showmount -e بررسی کن. اگر Mount می‌شود ولی root نمی‌تواند بنویسد، این اثر root_squash است و رفتار درست است.', 'Die Client-IP liegt nicht im Bereich der Zeile in /etc/exports oder nach der Änderung lief kein exportfs -ra. Mit exportfs -v und showmount -e prüfen. Klappt der Mount, aber root kann nicht schreiben, ist das root_squash – gewolltes Verhalten.', 'The client IP is not in the range of the /etc/exports line or exportfs -ra was not run after the change. Check with exportfs -v and showmount -e. If it mounts but root cannot write, that is root_squash – intended behavior.']]
  ],
  decide: [
    [['Samba یا NFS؟', 'Samba oder NFS?', 'Samba or NFS?'],
     ['Samba برای کلاینت‌های ویندوز و محیط مخلوط با کاربر و رمز. NFS برای سرورهای لینوکسی، Hypervisorها و پشتیبان بین سرورها. اشتراک یک پوشه با هر دو پروتکل هم‌زمان مشکلات قفل فایل می‌سازد؛ فقط با دلیل.', 'Samba für Windows-Clients und gemischte Umgebungen mit Benutzer und Kennwort. NFS für Linux-Server, Hypervisoren und Backups zwischen Servern. Denselben Ordner gleichzeitig per beiden Protokollen freizugeben, macht Probleme mit Dateisperren – nur mit Grund.', 'Samba for Windows clients and mixed environments with user and password. NFS for Linux servers, hypervisors and server-to-server backups. Sharing the same folder over both protocols at once causes file-locking problems – only with good reason.']],
    [['کاربران محلی Samba یا عضویت در AD؟', 'Lokale Samba-Benutzer oder AD-Mitglied?', 'Local Samba users or AD member?'],
     ['اگر شرکت AD دارد، Samba را عضو دامنه کن (winbind یا SSSD) تا کاربران با همان حساب ویندوز وارد شوند و خروج همکار در یک جا انجام شود. کاربران محلی فقط برای دفتر خیلی کوچک یا آزمایشگاه.', 'Hat die Firma AD, Samba als Domänenmitglied einbinden (winbind oder SSSD), damit Benutzer ihr Windows-Konto nutzen und Austritte an einer Stelle erledigt werden. Lokale Benutzer nur für sehr kleine Büros oder das Labor.', 'If the company has AD, join Samba to the domain (winbind or SSSD) so users use their Windows account and offboarding happens in one place. Local users only for very small offices or the lab.']]
  ],
  iv: [
    [['کاربر ویندوز فایل اکسل را روی Samba باز می‌کند و همکارش پیام «قفل شده» می‌گیرد، ولی کاربر اول ساعت‌ها پیش رفته است. چه می‌کنی؟', 'Ein Windows-Benutzer hatte eine Excel-Datei auf Samba offen, der Kollege bekommt „gesperrt“, aber der erste ist seit Stunden weg. Was tust du?', 'A Windows user had an Excel file open on Samba, the colleague gets “locked”, but the first user left hours ago. What do you do?'],
     ['با smbstatus -L قفل و PID نشست را پیدا می‌کنم و کامپیوتر کاربر اول را می‌بینم. اگر کامپیوترش هنوز روشن است، فایل را آنجا می‌بندم؛ وگرنه با تأیید فقط همان نشست Samba را می‌بندم. فایل موقت ‎~$ را هم بررسی می‌کنم.', 'Mit smbstatus -L Sperre und PID der Sitzung finden und den Rechner des ersten Benutzers sehen. Läuft sein PC noch, dort die Datei schließen; sonst mit Freigabe nur diese Samba-Sitzung beenden. Die temporäre ~$-Datei ebenfalls prüfen.', 'Find the lock and the session PID with smbstatus -L and see the first user’s computer. If the PC is still on, close the file there; otherwise, with approval, end only that Samba session. Also check the temporary ~$ file.']]
  ]
}

});
})();
