/* Arefi ITPraxis – Vertiefung Lernstrecke Linux-Server, Module 1–6 (Grundlagen, systemd, Pakete, Speicher, Benutzer, Netzwerk). [fa, de, en] */
(() => {
'use strict';
const R = String.raw;
window.ArefiPlus(window.ArefiLXCourse, {

'lx-basics': {
  know: [
    ['هدایت خروجی: ‎> فایل را بازنویسی می‌کند، ‎>> به انتهایش اضافه می‌کند، ‎2>&1 خطاها را هم همراه خروجی می‌فرستد و tee هم‌زمان نشان می‌دهد و ذخیره می‌کند. با sudo برای نوشتن در فایل سیستمی از ‎| sudo tee استفاده کن، چون ‎sudo echo > فایل کار نمی‌کند.', 'Umleitung: > überschreibt eine Datei, >> hängt an, 2>&1 leitet Fehler mit um, tee zeigt an und speichert gleichzeitig. Für Systemdateien | sudo tee verwenden, denn sudo echo > datei funktioniert nicht.', 'Redirection: > overwrites a file, >> appends, 2>&1 redirects errors too, tee shows and saves at the same time. For system files use | sudo tee, because sudo echo > file does not work.'],
    ['find فایل را با نام، زمان یا اندازه پیدا می‌کند (find /var/log -size +100M) و grep -rn در محتوای همهٔ فایل‌های یک پوشه دنبال متن می‌گردد و شمارهٔ خط را نشان می‌دهد.', 'find sucht Dateien nach Name, Zeit oder Größe (find /var/log -size +100M), grep -rn durchsucht den Inhalt aller Dateien eines Ordners und zeigt die Zeilennummer.', 'find locates files by name, time or size (find /var/log -size +100M); grep -rn searches the content of all files in a folder and shows the line number.'],
    ['ویرایشگر: nano برای ویرایش سریع (Ctrl+O ذخیره، Ctrl+X خروج). vim تقریباً روی هر سرور هست؛ حداقل بدان i برای نوشتن، Esc و بعد ‎:wq ذخیره و خروج و ‎:q!‎ خروج بدون ذخیره است.', 'Editor: nano für schnelle Änderungen (Strg+O speichern, Strg+X beenden). vim ist auf fast jedem Server; mindestens i zum Schreiben, Esc und dann :wq speichern und beenden, :q! ohne Speichern beenden kennen.', 'Editors: nano for quick edits (Ctrl+O save, Ctrl+X exit). vim is on almost every server; at least know i to insert, Esc then :wq to save and quit and :q! to quit without saving.']
  ],
  code: R`# Vertiefung: finden, filtern, umleiten
find /etc -name '*.conf' -mtime -7 2>/dev/null     # in den letzten 7 Tagen geändert
sudo find /var/log -type f -size +50M
grep -rn 'PermitRootLogin' /etc/ssh/
sudo journalctl -p err -b --no-pager | tail -n 20
sudo du -sh /var/log/* 2>/dev/null | sort -h | tail -n 5
ps aux --sort=-%cpu | head -n 6
echo "Notiz $(date +%F)" | sudo tee -a /root/wartung.log
command -v nginx || echo "nginx nicht installiert"
df -i /                                            # Inodes`,
  trouble: [
    [['«Permission denied» هنگام اجرای فرمان یا اسکریپت.', '„Permission denied“ beim Ausführen eines Befehls oder Skripts.', '“Permission denied” when running a command or script.'],
     ['با ls -l مالک و مجوز را ببین. اگر فایل سیستمی است، با sudo اجرا کن. اگر اسکریپت است و x ندارد: chmod +x یا bash script.sh. اگر پوشه‌ای در مسیر مجوز x ندارد، namei -l مسیر کامل را نشان می‌دهد. مجوز 777 راه‌حل نیست.', 'Mit ls -l Besitzer und Rechte prüfen. Systemdatei: mit sudo ausführen. Skript ohne x: chmod +x oder bash skript.sh. Fehlt einem Ordner im Pfad das x-Recht, zeigt namei -l den ganzen Pfad. 777 ist keine Lösung.', 'Check owner and permissions with ls -l. System file: run with sudo. Script without x: chmod +x or bash script.sh. If a folder in the path lacks x, namei -l shows the whole path. 777 is not a solution.']],
    [['«command not found».', '„command not found“.', '“command not found”.'],
     ['غلط تایپی را بررسی کن. اگر برنامه نصب نیست، اوبونتو بستهٔ لازم را پیشنهاد می‌دهد (apt install …). اسکریپت در پوشهٔ فعلی را با ‎./script.sh اجرا کن، چون پوشهٔ فعلی در PATH نیست. با command -v ببین برنامه کجاست.', 'Tippfehler prüfen. Ist das Programm nicht installiert, schlägt Ubuntu das Paket vor (apt install …). Skripte im aktuellen Ordner mit ./skript.sh starten, denn der aktuelle Ordner steht nicht im PATH. command -v zeigt, wo ein Programm liegt.', 'Check for typos. If the program is not installed, Ubuntu suggests the package (apt install …). Run scripts in the current folder with ./script.sh because the current folder is not in PATH. command -v shows where a program is.']],
    [['«No space left on device» با اینکه df -h هنوز فضای خالی نشان می‌دهد.', '„No space left on device“, obwohl df -h noch Platz zeigt.', '“No space left on device” although df -h still shows space.'],
     ['دو علت رایج: Inodeها تمام شده (df -i؛ معمولاً میلیون‌ها فایل کوچک مثل Session یا Cache) یا فایل حذف‌شده‌ای هنوز در اختیار یک پروسس است (sudo lsof +L1). در حالت دوم سرویس مربوط را Restart کن تا فضا آزاد شود.', 'Zwei häufige Ursachen: Inodes erschöpft (df -i; meist Millionen kleiner Dateien wie Sessions oder Cache) oder eine gelöschte Datei wird noch von einem Prozess gehalten (sudo lsof +L1). Im zweiten Fall den betreffenden Dienst neu starten, dann wird der Platz frei.', 'Two common causes: inodes exhausted (df -i; usually millions of small files like sessions or cache) or a deleted file is still held by a process (sudo lsof +L1). In the second case restart that service to free the space.']]
  ],
  decide: [
    [['sudo برای هر فرمان یا شل root؟', 'sudo pro Befehl oder Root-Shell?', 'sudo per command or root shell?'],
     ['پیش‌فرض: sudo برای هر فرمان؛ هر کار در auth.log با نام تو ثبت می‌شود و اشتباه کمتر خطرناک است. sudo -i فقط برای یک کار طولانی اداری، و بعد فوراً exit.', 'Standard: sudo pro Befehl – alles landet mit deinem Namen in auth.log, und Fehler sind weniger gefährlich. sudo -i nur für eine längere Verwaltungsaufgabe und danach sofort exit.', 'Default: sudo per command – everything is logged with your name in auth.log, and mistakes are less dangerous. sudo -i only for a longer admin task, then exit immediately.']],
    [['قبل از تغییر فایل تنظیمات چه کنم؟', 'Was vor dem Ändern einer Konfigurationsdatei?', 'What to do before changing a configuration file?'],
     ['همیشه یک نسخه با تاریخ بساز (cp file file.$(date +%F))، بعد تغییر بده، با ابزار خود برنامه آزمایش کن (nginx -t، sshd -t، visudo -c) و فقط بعد Reload. در تیکت بنویس چه چیزی را عوض کردی.', 'Immer eine Kopie mit Datum anlegen (cp datei datei.$(date +%F)), dann ändern, mit dem Werkzeug des Programms testen (nginx -t, sshd -t, visudo -c) und erst dann neu laden. Im Ticket notieren, was geändert wurde.', 'Always make a dated copy (cp file file.$(date +%F)), then edit, test with the program’s own tool (nginx -t, sshd -t, visudo -c) and only then reload. Note in the ticket what you changed.']]
  ],
  iv: [
    [['دیسک سرور لینوکس پر شده است. قدم‌به‌قدم چطور پیدا می‌کنی چه چیزی جا گرفته؟', 'Die Platte eines Linux-Servers ist voll. Wie findest du Schritt für Schritt, was Platz belegt?', 'A Linux server’s disk is full. How do you find step by step what uses the space?'],
     ['df -h برای فایل‌سیستم پر، df -i برای Inode، بعد sudo du -sh /* | sort -h و پایین رفتن در بزرگ‌ترین پوشه‌ها (معمولاً ‎/var/log، ‎/var/lib/docker یا Journal). sudo lsof +L1 برای فایل‌های حذف‌شدهٔ باز. بعد پاک‌سازی امن (journalctl --vacuum-size، logrotate، apt clean) و نه rm کورکورانه.', 'df -h für das volle Dateisystem, df -i für Inodes, dann sudo du -sh /* | sort -h und in die größten Ordner hinabsteigen (meist /var/log, /var/lib/docker oder das Journal). sudo lsof +L1 für gelöschte, offene Dateien. Danach sicher aufräumen (journalctl --vacuum-size, logrotate, apt clean) statt blind rm.', 'df -h for the full file system, df -i for inodes, then sudo du -sh /* | sort -h and drill into the largest folders (usually /var/log, /var/lib/docker or the journal). sudo lsof +L1 for deleted open files. Then clean up safely (journalctl --vacuum-size, logrotate, apt clean) instead of blind rm.']]
  ]
},

'lx-systemd': {
  know: [
    ['systemctl --failed همهٔ سرویس‌های ناموفق را یک‌جا نشان می‌دهد؛ این اولین فرمان بعد از ری‌استارت یا هشدار پایش است.', 'systemctl --failed zeigt alle fehlgeschlagenen Units auf einen Blick – der erste Befehl nach einem Neustart oder einer Monitoringwarnung.', 'systemctl --failed shows all failed units at a glance – the first command after a reboot or a monitoring alert.'],
    ['reload تنظیمات را بدون قطع اتصال‌ها می‌خواند (nginx، ssh)؛ restart پروسس را کامل از نو اجرا می‌کند. اگر سرویسی بعد از چند بار شکست start-limit-hit گرفت، بعد از رفع علت systemctl reset-failed را بزن.', 'reload liest die Konfiguration ohne Verbindungsabbruch neu (nginx, ssh); restart startet den Prozess komplett neu. Meldet ein Dienst nach mehreren Fehlschlägen start-limit-hit, nach Behebung der Ursache systemctl reset-failed ausführen.', 'reload re-reads the configuration without dropping connections (nginx, ssh); restart starts the process from scratch. If a service hits start-limit-hit after several failures, run systemctl reset-failed after fixing the cause.'],
    ['systemd-analyze blame نشان می‌دهد کدام سرویس بوت را کند کرده است؛ systemctl list-dependencies وابستگی‌ها را می‌دهد.', 'systemd-analyze blame zeigt, welcher Dienst den Start bremst; systemctl list-dependencies zeigt Abhängigkeiten.', 'systemd-analyze blame shows which service slows the boot; systemctl list-dependencies shows dependencies.']
  ],
  code: R`# Vertiefung: Dienste prüfen und Startprobleme finden
systemctl --failed
systemctl is-enabled nginx ; systemctl is-active nginx
journalctl -u nginx --since "1 hour ago" --no-pager | tail -n 20
journalctl -p err -b --no-pager | tail -n 20
journalctl -xeu nginx --no-pager | tail -n 20      # mit Erklärungen
systemd-analyze blame | head -n 10
systemctl cat nginx                                # Unit samt Overrides
sudo ss -tulpn | grep -E ':80|:443'                # Port belegt?
sudo systemctl reset-failed`,
  trouble: [
    [['«Job for nginx.service failed because the control process exited with error code».', '„Job for nginx.service failed because the control process exited with error code“.', '“Job for nginx.service failed because the control process exited with error code”.'],
     ['systemctl status nginx و journalctl -xeu nginx خط خطا را نشان می‌دهند. معمولاً تنظیمات اشتباه (nginx -t)، پورتی که برنامهٔ دیگری گرفته (ss -tulpn) یا فایل گواهی گم‌شده. علت را درست کن و دوباره start؛ اگر start-limit-hit دارد، اول reset-failed.', 'systemctl status nginx und journalctl -xeu nginx zeigen die Fehlerzeile. Meist falsche Konfiguration (nginx -t), ein Port, den ein anderes Programm belegt (ss -tulpn), oder eine fehlende Zertifikatsdatei. Ursache beheben und erneut starten; bei start-limit-hit vorher reset-failed.', 'systemctl status nginx and journalctl -xeu nginx show the error line. Usually a wrong configuration (nginx -t), a port taken by another program (ss -tulpn) or a missing certificate file. Fix the cause and start again; on start-limit-hit run reset-failed first.']],
    [['سرویس بعد از ری‌استارت سرور اجرا نمی‌شود.', 'Dienst läuft nach dem Neustart des Servers nicht.', 'Service is not running after a server reboot.'],
     ['systemctl is-enabled: اگر disabled است، systemctl enable --now. اگر enabled است ولی شکست خورده، احتمالاً زودتر از شبکه یا Mount لازم شروع شده؛ در Override ‎After=network-online.target و ‎Wants=network-online.target یا وابستگی به Mount اضافه کن.', 'systemctl is-enabled: Bei disabled systemctl enable --now. Ist er enabled, aber fehlgeschlagen, startete er vermutlich vor Netz oder benötigtem Mount; im Override After=network-online.target und Wants=network-online.target bzw. die Mount-Abhängigkeit ergänzen.', 'systemctl is-enabled: if disabled, systemctl enable --now. If enabled but failed, it probably started before the network or a required mount; add After=network-online.target and Wants=network-online.target or the mount dependency in an override.']],
    [['تغییر در Unit اثری ندارد.', 'Änderung an einer Unit wirkt nicht.', 'A change to a unit has no effect.'],
     ['بعد از هر تغییر در فایل Unit باید systemctl daemon-reload و بعد restart. اگر فایل اصلی در ‎/usr/lib/systemd را ویرایش کرده‌ای، با به‌روزرسانی بسته بازنویسی می‌شود؛ همیشه systemctl edit (Override در ‎/etc/systemd/system) استفاده کن. systemctl cat نشان می‌دهد چه چیزی واقعاً فعال است.', 'Nach jeder Änderung an einer Unit systemctl daemon-reload und dann restart. Wurde die Originaldatei in /usr/lib/systemd bearbeitet, überschreibt das nächste Paketupdate sie – immer systemctl edit (Override in /etc/systemd/system). systemctl cat zeigt, was wirklich gilt.', 'After every unit change run systemctl daemon-reload and then restart. If you edited the original in /usr/lib/systemd, the next package update overwrites it – always use systemctl edit (override in /etc/systemd/system). systemctl cat shows what is really in effect.']]
  ],
  decide: [
    [['reload یا restart؟', 'reload oder restart?', 'reload or restart?'],
     ['برای تغییر تنظیمات، اگر سرویس پشتیبانی می‌کند (nginx، ssh، Apache) reload: کاربران قطع نمی‌شوند. restart بعد از به‌روزرسانی برنامه یا وقتی reload پشتیبانی نمی‌شود، ترجیحاً در زمان کم‌بار.', 'Für Konfigurationsänderungen reload, wenn der Dienst es kann (nginx, ssh, Apache) – Benutzer werden nicht getrennt. restart nach Programmupdates oder wenn reload nicht unterstützt wird, möglichst in ruhiger Zeit.', 'For configuration changes use reload if the service supports it (nginx, ssh, Apache) – users stay connected. restart after program updates or when reload is not supported, preferably at a quiet time.']],
    [['Override یا Unit جدید؟', 'Override oder eigene Unit?', 'Override or own unit?'],
     ['برای تغییر سرویس یک بسته (مثلاً Restart=on-failure برای nginx) همیشه Override با systemctl edit. برای برنامه یا اسکریپت خودت یک Unit کامل در ‎/etc/systemd/system بساز.', 'Für Änderungen an einem Paketdienst (etwa Restart=on-failure für nginx) immer ein Override per systemctl edit. Für eigene Programme oder Skripte eine vollständige Unit in /etc/systemd/system anlegen.', 'To change a packaged service (e.g. Restart=on-failure for nginx) always use an override via systemctl edit. For your own program or script create a full unit in /etc/systemd/system.']]
  ],
  iv: [
    [['بعد از ری‌استارت سرور، وب‌سایت بالا نیامده. اولین سه فرمانت چیست؟', 'Nach dem Neustart ist die Website nicht erreichbar. Deine ersten drei Befehle?', 'After a reboot the website is down. Your first three commands?'],
     ['systemctl --failed، systemctl status nginx و journalctl -u nginx -b. بعد بسته به خطا nginx -t یا ss -tulpn. وقتی درست شد، is-enabled را هم بررسی می‌کنم تا بعد از ری‌استارت بعدی تکرار نشود.', 'systemctl --failed, systemctl status nginx und journalctl -u nginx -b. Je nach Fehler dann nginx -t oder ss -tulpn. Danach prüfe ich is-enabled, damit es beim nächsten Neustart nicht wieder passiert.', 'systemctl --failed, systemctl status nginx and journalctl -u nginx -b. Then depending on the error nginx -t or ss -tulpn. Afterwards I check is-enabled so it does not happen again after the next reboot.']]
  ]
},

'lx-packages': {
  know: [
    ['پیام «kept back» در اوبونتو اغلب به‌خاطر Phased Updates است: به‌روزرسانی مرحله‌ای به همهٔ سرورها می‌رسد. معمولاً صبر کن؛ فقط در صورت نیاز آن بسته را صریح با apt install نصب کن.', 'Die Meldung „zurückgehalten“ (kept back) kommt unter Ubuntu oft von Phased Updates: Das Update erreicht die Server schrittweise. Meist abwarten; nur bei Bedarf das Paket ausdrücklich mit apt install installieren.', 'The “kept back” message on Ubuntu often comes from phased updates: the update reaches servers gradually. Usually wait; only if needed install that package explicitly with apt install.'],
    ['‎/var/log/apt/history.log می‌گوید چه زمانی چه بسته‌ای نصب یا به‌روز شده؛ وقتی «از دیروز چیزی خراب شده» اول این را ببین.', '/var/log/apt/history.log zeigt, wann welches Paket installiert oder aktualisiert wurde – bei „seit gestern ist etwas kaputt“ zuerst hier nachsehen.', '/var/log/apt/history.log shows when which package was installed or upgraded – check here first when “something broke since yesterday”.'],
    ['needrestart بعد از به‌روزرسانی کتابخانه‌ها می‌گوید کدام سرویس‌ها باید Restart شوند؛ بدون Restart سرویس هنوز نسخهٔ قدیمی و آسیب‌پذیر را در حافظه دارد.', 'needrestart zeigt nach Bibliotheksupdates, welche Dienste neu gestartet werden müssen; ohne Neustart läuft im Speicher noch die alte, verwundbare Version.', 'needrestart shows after library updates which services must be restarted; without a restart the old vulnerable version is still running in memory.']
  ],
  code: R`# Vertiefung: Updates nachvollziehen und Probleme beheben
apt list --upgradable
apt policy openssl                                  # installiert, Kandidat, Quelle
grep -E 'Start-Date|Upgrade:' /var/log/apt/history.log | tail -n 10
sudo needrestart -r l                               # nur auflisten
[ -f /var/run/reboot-required ] && cat /var/run/reboot-required.pkgs
sudo unattended-upgrade --dry-run --debug 2>&1 | tail -n 15
ps aux | grep -E '[a]pt|[d]pkg'                     # läuft schon eine Installation?
sudo dpkg --configure -a                            # nach abgebrochener Installation
sudo apt -f install
ls /etc/apt/sources.list.d/`,
  trouble: [
    [['«Could not get lock /var/lib/dpkg/lock-frontend».', '„Could not get lock /var/lib/dpkg/lock-frontend“.', '“Could not get lock /var/lib/dpkg/lock-frontend”.'],
     ['یک apt یا unattended-upgrades دیگر در حال اجراست. با ps aux ببین و صبر کن تا تمام شود. فایل Lock را تا وقتی پروسسی در حال اجراست پاک نکن؛ پایگاه دادهٔ بسته‌ها خراب می‌شود. اگر پروسسی نیست و Lock مانده، اول sudo dpkg --configure -a.', 'Ein anderes apt oder unattended-upgrades läuft. Mit ps aux prüfen und warten, bis es fertig ist. Die Sperrdatei nie löschen, solange ein Prozess läuft – sonst geht die Paketdatenbank kaputt. Läuft nichts mehr und die Sperre bleibt, zuerst sudo dpkg --configure -a.', 'Another apt or unattended-upgrades is running. Check with ps aux and wait until it finishes. Never delete the lock file while a process is running – the package database breaks. If nothing runs and the lock remains, run sudo dpkg --configure -a first.']],
    [['«dpkg was interrupted» یا وابستگی‌های خراب بعد از به‌روزرسانی نیمه‌کاره.', '„dpkg was interrupted“ oder kaputte Abhängigkeiten nach abgebrochenem Update.', '“dpkg was interrupted” or broken dependencies after an aborted update.'],
     ['sudo dpkg --configure -a کارهای نیمه‌تمام را کامل می‌کند، بعد sudo apt -f install وابستگی‌ها را درست می‌کند. فضای دیسک ‎/ و ‎/boot را بررسی کن، چون پر بودن آن شایع‌ترین علت قطع شدن است.', 'sudo dpkg --configure -a schließt halb fertige Schritte ab, danach repariert sudo apt -f install die Abhängigkeiten. Platz auf / und /boot prüfen – ein volles Laufwerk ist die häufigste Ursache für den Abbruch.', 'sudo dpkg --configure -a completes half-finished steps, then sudo apt -f install fixes dependencies. Check free space on / and /boot – a full disk is the most common cause of the abort.']],
    [['apt update برای یک مخزن خطای NO_PUBKEY یا 404 می‌دهد.', 'apt update meldet NO_PUBKEY oder 404 für eine Quelle.', 'apt update reports NO_PUBKEY or 404 for a source.'],
     ['NO_PUBKEY: کلید آن مخزن (signed-by) نیست یا عوض شده؛ کلید را از سایت رسمی سازنده در ‎/etc/apt/keyrings بگذار. 404: نام نسخه در فایل مخزن اشتباه است یا آن نسخهٔ اوبونتو دیگر پشتیبانی نمی‌شود. فایل‌های ‎/etc/apt/sources.list.d را بررسی کن.', 'NO_PUBKEY: Der Schlüssel der Quelle (signed-by) fehlt oder wurde gewechselt – von der offiziellen Herstellerseite nach /etc/apt/keyrings legen. 404: falscher Versionsname in der Quelldatei oder diese Ubuntu-Version wird nicht mehr unterstützt. Dateien in /etc/apt/sources.list.d prüfen.', 'NO_PUBKEY: the repository key (signed-by) is missing or changed – put it from the vendor’s official site into /etc/apt/keyrings. 404: wrong release name in the source file or that Ubuntu release is no longer supported. Check the files in /etc/apt/sources.list.d.']]
  ],
  decide: [
    [['upgrade، full-upgrade یا do-release-upgrade؟', 'upgrade, full-upgrade oder do-release-upgrade?', 'upgrade, full-upgrade or do-release-upgrade?'],
     ['apt upgrade برای کار روزانه. full-upgrade وقتی بسته‌ها باید جایگزین یا حذف شوند (مثلاً Kernel جدید)، در زمان نگهداری. do-release-upgrade (مثلاً به نسخهٔ LTS بعدی) فقط برنامه‌ریزی‌شده، با پشتیبان، Snapshot و آزمایش روی کپی.', 'apt upgrade für den Alltag. full-upgrade, wenn Pakete ersetzt oder entfernt werden müssen (etwa neuer Kernel), im Wartungsfenster. do-release-upgrade (etwa auf die nächste LTS) nur geplant, mit Backup, Snapshot und Test an einer Kopie.', 'apt upgrade for everyday use. full-upgrade when packages must be replaced or removed (e.g. new kernel), in the maintenance window. do-release-upgrade (e.g. to the next LTS) only planned, with backup, snapshot and a test on a copy.']],
    [['به‌روزرسانی امنیتی خودکار یا دستی؟', 'Sicherheitsupdates automatisch oder manuell?', 'Security updates automatic or manual?'],
     ['برای بیشتر سرورها unattended-upgrades فقط برای Security، با گزارش ایمیلی. برای پایگاه داده، کلاستر یا سیستم‌های حساس دستی در پنجرهٔ نگهداری و با Restart برنامه‌ریزی‌شده.', 'Für die meisten Server unattended-upgrades nur für Security, mit Mailbericht. Für Datenbanken, Cluster oder sensible Systeme manuell im Wartungsfenster mit geplantem Neustart.', 'For most servers unattended-upgrades for security only, with mail reports. For databases, clusters or sensitive systems manually in the maintenance window with a planned restart.']]
  ],
  iv: [
    [['بعد از به‌روزرسانی OpenSSL، آیا کار تمام است؟', 'Nach einem OpenSSL-Update – ist die Arbeit erledigt?', 'After an OpenSSL update – is the job done?'],
     ['نه. سرویس‌هایی که OpenSSL را استفاده می‌کنند (nginx، ssh و …) هنوز نسخهٔ قدیمی را در حافظه دارند. با needrestart آن‌ها را پیدا و Restart می‌کنم و اگر reboot-required وجود دارد، ری‌استارت را برنامه‌ریزی می‌کنم.', 'Nein. Dienste, die OpenSSL nutzen (nginx, ssh usw.), haben noch die alte Version im Speicher. Mit needrestart finde und starte ich sie neu und plane einen Neustart, wenn reboot-required existiert.', 'No. Services using OpenSSL (nginx, ssh etc.) still have the old version in memory. I find and restart them with needrestart and schedule a reboot if reboot-required exists.']]
  ]
},

'lx-storage': {
  know: [
    ['نصب‌کنندهٔ اوبونتو سرور معمولاً بخشی از فضای VG را آزاد می‌گذارد. قبل از اضافه کردن دیسک، با sudo vgs ستون VFree را ببین؛ اغلب sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv کافی است.', 'Der Ubuntu-Server-Installer lässt oft einen Teil der Volume Group frei. Vor dem Hinzufügen einer Platte mit sudo vgs die Spalte VFree prüfen – oft genügt sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv.', 'The Ubuntu Server installer often leaves part of the volume group free. Before adding a disk check the VFree column with sudo vgs – often sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv is enough.'],
    ['بعد از بزرگ کردن دیسک مجازی در Hypervisor، سه قدم: growpart برای پارتیشن، pvresize برای PV و lvextend -r برای LV و فایل‌سیستم. گزینهٔ ‎-r فایل‌سیستم را هم بزرگ می‌کند.', 'Nach dem Vergrößern der virtuellen Platte im Hypervisor drei Schritte: growpart für die Partition, pvresize für das PV und lvextend -r für LV und Dateisystem. Die Option -r vergrößert das Dateisystem mit.', 'After enlarging the virtual disk in the hypervisor, three steps: growpart for the partition, pvresize for the PV and lvextend -r for the LV and file system. The -r option grows the file system too.'],
    ['اگر سرور بعد از تغییر fstab بالا نیاید و به Emergency Mode برود، از همان کنسول با mount -o remount,rw / فایل را درست کن. برای دیسک‌های غیرضروری در fstab گزینهٔ nofail بگذار.', 'Startet der Server nach einer fstab-Änderung im Emergency Mode, in dieser Konsole mit mount -o remount,rw / die Datei korrigieren. Für nicht zwingend nötige Platten nofail in der fstab setzen.', 'If the server boots into emergency mode after an fstab change, fix the file from that console after mount -o remount,rw /. Set nofail in fstab for non-essential disks.']
  ],
  code: R`# Vertiefung: Platz schaffen und Platten vergrößern
lsblk -f
sudo vgs ; sudo lvs
df -h /
# freien Platz der Ubuntu-VG nutzen:
sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
# nach Vergrößern der virtuellen Systemplatte (Partition 3 = LVM):
# sudo growpart /dev/sda 3 && sudo pvresize /dev/sda3 && sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
df -i /                                             # Inodes
sudo lsof +L1 | head                                # gelöschte, aber offene Dateien
sudo dmesg -T | grep -iE 'error|i/o|ext4' | tail -n 10
findmnt --verify                                    # fstab prüfen, ohne neu zu starten`,
  trouble: [
    [['بعد از تغییر fstab سرور در Emergency Mode بالا می‌آید.', 'Nach einer fstab-Änderung startet der Server im Emergency Mode.', 'After an fstab change the server boots into emergency mode.'],
     ['با رمز root یا از کنسول Hypervisor وارد شو، mount -o remount,rw / بزن و خط اشتباه را در ‎/etc/fstab اصلاح یا با # غیرفعال کن (UUID اشتباه، دیسکی که نیست، غلط تایپی). با findmnt --verify و mount -a آزمایش کن و ری‌استارت. از این به بعد قبل از ری‌استارت همیشه mount -a.', 'Mit Root-Kennwort oder über die Hypervisor-Konsole anmelden, mount -o remount,rw / ausführen und die falsche Zeile in /etc/fstab korrigieren oder mit # auskommentieren (falsche UUID, fehlende Platte, Tippfehler). Mit findmnt --verify und mount -a testen, dann neu starten. Künftig vor jedem Neustart mount -a.', 'Log in with the root password or via the hypervisor console, run mount -o remount,rw / and fix or comment out (#) the wrong line in /etc/fstab (wrong UUID, missing disk, typo). Test with findmnt --verify and mount -a, then reboot. From now on always run mount -a before a reboot.']],
    [['دیسک در Hypervisor بزرگ شده اما df همان اندازهٔ قبلی را نشان می‌دهد.', 'Platte im Hypervisor vergrößert, aber df zeigt die alte Größe.', 'Disk enlarged in the hypervisor, but df shows the old size.'],
     ['لینوکس سه لایه دارد و هر کدام باید بزرگ شود: lsblk اندازهٔ جدید دیسک را نشان می‌دهد؟ بعد growpart، pvresize و lvextend -r. اگر lsblk هم اندازهٔ قدیمی است، دیسک را Rescan کن (echo 1 | sudo tee /sys/class/block/sda/device/rescan) یا ری‌استارت.', 'Linux hat drei Schichten, jede muss wachsen: Zeigt lsblk die neue Plattengröße? Dann growpart, pvresize und lvextend -r. Zeigt auch lsblk die alte Größe, die Platte neu einlesen (echo 1 | sudo tee /sys/class/block/sda/device/rescan) oder neu starten.', 'Linux has three layers and each must grow: does lsblk show the new disk size? Then growpart, pvresize and lvextend -r. If lsblk still shows the old size, rescan the disk (echo 1 | sudo tee /sys/class/block/sda/device/rescan) or reboot.']],
    [['فایل‌سیستم ناگهان فقط‌خواندنی (read-only) شده است.', 'Dateisystem ist plötzlich schreibgeschützt (read-only).', 'File system suddenly became read-only.'],
     ['کرنل بعد از خطای ورودی‌خروجی فایل‌سیستم را برای حفاظت فقط‌خواندنی کرده است. dmesg -T خطاها را نشان می‌دهد. اول از داده‌های مهم پشتیبان بگیر، سلامت دیسک یا Storage را بررسی کن و بعد در حالت Rescue (بدون Mount) با fsck تعمیر کن.', 'Der Kernel hat das Dateisystem nach Ein-/Ausgabefehlern zum Schutz schreibgeschützt eingehängt. dmesg -T zeigt die Fehler. Zuerst wichtige Daten sichern, Zustand von Platte oder Storage prüfen und dann im Rescue-Modus (nicht eingehängt) mit fsck reparieren.', 'The kernel remounted the file system read-only after I/O errors to protect it. dmesg -T shows the errors. First back up important data, check disk or storage health, then repair with fsck in rescue mode (unmounted).']]
  ],
  decide: [
    [['ext4 یا XFS؟', 'ext4 oder XFS?', 'ext4 or XFS?'],
     ['ext4 پیش‌فرض اوبونتو است و می‌توان آن را کوچک هم کرد؛ برای بیشتر سرورها کافی است. XFS برای فایل‌های خیلی بزرگ و موازی (مثلاً پشتیبان یا رسانه) خوب است ولی کوچک نمی‌شود.', 'ext4 ist Ubuntu-Standard und lässt sich auch verkleinern – für die meisten Server richtig. XFS ist gut für sehr große, parallele Dateien (etwa Backup oder Medien), lässt sich aber nicht verkleinern.', 'ext4 is the Ubuntu default and can also be shrunk – right for most servers. XFS is good for very large parallel files (e.g. backup or media) but cannot be shrunk.']],
    [['دیسک جدید برای داده: LVM یا پارتیشن ساده؟', 'Neue Datenplatte: LVM oder einfache Partition?', 'New data disk: LVM or plain partition?'],
     ['روی سرور تقریباً همیشه LVM: بزرگ کردن بدون توقف، اضافه کردن دیسک دیگر به همان فضا و Snapshot کوتاه‌مدت. پارتیشن ساده فقط برای موارد خیلی ساده یا وقتی سازندهٔ نرم‌افزار خواسته است.', 'Auf Servern fast immer LVM: Vergrößern im laufenden Betrieb, weitere Platten zum selben Speicher hinzufügen und kurzfristige Snapshots. Einfache Partition nur für sehr einfache Fälle oder wenn der Softwarehersteller es verlangt.', 'On servers almost always LVM: online growth, adding more disks to the same space and short-term snapshots. A plain partition only for very simple cases or when the software vendor requires it.']]
  ],
  iv: [
    [['فضای ‎/ تمام شده و VG فضای خالی ندارد. بدون خاموش کردن سرور چه می‌کنی؟', '/ ist voll und die VG hat keinen freien Platz. Was tust du ohne Abschalten?', '/ is full and the VG has no free space. What do you do without shutting down?'],
     ['اول فضای فوری آزاد می‌کنم (Journal، لاگ‌ها، apt clean). بعد یک دیسک مجازی جدید اضافه می‌کنم، با pvcreate و vgextend به VG می‌دهم و با lvextend -r ‎/ را بزرگ می‌کنم؛ یا دیسک موجود را در Hypervisor بزرگ و growpart و pvresize. همه بدون Downtime.', 'Zuerst schaffe ich sofort Platz (Journal, Logs, apt clean). Dann füge ich eine neue virtuelle Platte hinzu, nehme sie per pvcreate und vgextend in die VG auf und vergrößere / mit lvextend -r – oder vergrößere die vorhandene Platte im Hypervisor mit growpart und pvresize. Alles ohne Ausfallzeit.', 'First I free space immediately (journal, logs, apt clean). Then I add a new virtual disk, add it to the VG with pvcreate and vgextend and grow / with lvextend -r – or enlarge the existing disk in the hypervisor with growpart and pvresize. All without downtime.']]
  ]
},

'lx-users': {
  know: [
    ['خروج همکار در لینوکس: حساب را با sudo usermod -L قفل و با sudo chage -E 0 منقضی کن، کلیدهای SSH را از ‎~/.ssh/authorized_keys بردار، فایل‌های sudoers.d او را حذف کن و Cron یا سرویس‌هایی که با حساب او اجرا می‌شوند را بررسی کن. حساب را فوراً حذف نکن.', 'Austritt unter Linux: Konto mit sudo usermod -L sperren und mit sudo chage -E 0 ablaufen lassen, SSH-Schlüssel aus ~/.ssh/authorized_keys entfernen, seine Dateien in sudoers.d löschen und Cronjobs oder Dienste unter seinem Konto prüfen. Das Konto nicht sofort löschen.', 'Offboarding on Linux: lock the account with sudo usermod -L and expire it with sudo chage -E 0, remove SSH keys from ~/.ssh/authorized_keys, delete their sudoers.d files and check cron jobs or services running under the account. Do not delete the account immediately.'],
    ['namei -l یک مسیر کامل را با مالک و مجوز هر پوشه نشان می‌دهد؛ وقتی کاربر به فایلی دسترسی ندارد، معمولاً یکی از پوشه‌های بالادست x ندارد.', 'namei -l zeigt einen ganzen Pfad mit Besitzer und Rechten jedes Ordners – fehlt einem Benutzer der Zugriff auf eine Datei, fehlt meist einem übergeordneten Ordner das x-Recht.', 'namei -l shows a whole path with owner and permissions of each folder – when a user cannot access a file, usually a parent folder lacks the x permission.'],
    ['umask مجوز پیش‌فرض فایل‌های تازه را تعیین می‌کند (معمولاً 022 یعنی فایل 644 و پوشه 755). برای پوشه‌های گروهی umask 002 یا ACL پیش‌فرض (setfacl -d) لازم است تا اعضای گروه بتوانند فایل‌های هم را ویرایش کنند.', 'umask bestimmt die Standardrechte neuer Dateien (meist 022, also Datei 644, Ordner 755). Für Gruppenordner braucht es umask 002 oder eine Standard-ACL (setfacl -d), damit Gruppenmitglieder die Dateien der anderen bearbeiten können.', 'umask sets default permissions for new files (usually 022, i.e. file 644, folder 755). Group folders need umask 002 or a default ACL (setfacl -d) so group members can edit each other’s files.']
  ],
  code: R`# Vertiefung: Konten prüfen, sperren und Rechte nachvollziehen
id anna ; getent group buchhaltung
sudo chage -l anna
namei -l /srv/buchhaltung/rechnung.txt
sudo setfacl -d -m g:buchhaltung:rwX /srv/buchhaltung     # Standard-ACL für neue Dateien
getfacl /srv/buchhaltung
# Austritt (Beispiel ben):
sudo usermod -L ben && sudo chage -E 0 ben
sudo usermod -s /usr/sbin/nologin ben
sudo ls -l /home/ben/.ssh/ 2>/dev/null
sudo crontab -l -u ben 2>/dev/null
sudo find /srv -user ben 2>/dev/null | head
last -n 10
sudo lastb -n 10 2>/dev/null                               # fehlgeschlagene Anmeldungen`,
  trouble: [
    [['کاربر عضو گروه است اما نمی‌تواند در پوشهٔ گروه بنویسد.', 'Benutzer ist in der Gruppe, kann aber nicht in den Gruppenordner schreiben.', 'User is in the group but cannot write to the group folder.'],
     ['عضویت گروه بعد از ورود دوباره اعمال می‌شود؛ کاربر یک بار خارج و وارد شود (یا newgrp). با id بررسی کن. اگر فایل‌های همکار را نمی‌تواند ویرایش کند، آن فایل‌ها با مجوز گروهی r ساخته شده‌اند: ACL پیش‌فرض یا umask 002 و setgid روی پوشه.', 'Gruppenmitgliedschaft wirkt erst nach erneuter Anmeldung – einmal ab- und anmelden (oder newgrp). Mit id prüfen. Kann er Dateien von Kollegen nicht ändern, wurden diese mit Gruppenrecht r angelegt: Standard-ACL oder umask 002 und setgid am Ordner.', 'Group membership applies after the next login – log out and in once (or newgrp). Check with id. If they cannot edit colleagues’ files, those were created with group permission r: default ACL or umask 002 and setgid on the folder.']],
    [['sudo: «user is not in the sudoers file» یا فرمان مجاز نیست.', 'sudo: „user is not in the sudoers file“ oder Befehl nicht erlaubt.', 'sudo: “user is not in the sudoers file” or command not allowed.'],
     ['sudo -l -U نام‌کاربر نشان می‌دهد چه چیزی مجاز است. در فایل sudoers.d مسیر کامل برنامه باید دقیقاً همان باشد (‎/usr/bin/systemctl). همیشه با visudo -c آزمایش کن؛ یک خطای نحوی می‌تواند sudo را برای همه قفل کند.', 'sudo -l -U benutzer zeigt, was erlaubt ist. In sudoers.d muss der volle Programmpfad exakt stimmen (/usr/bin/systemctl). Immer mit visudo -c prüfen – ein Syntaxfehler kann sudo für alle sperren.', 'sudo -l -U user shows what is allowed. In sudoers.d the full program path must match exactly (/usr/bin/systemctl). Always test with visudo -c – a syntax error can lock sudo for everyone.']],
    [['بعد از اشتباه در sudoers، sudo اصلاً کار نمی‌کند.', 'Nach einem Fehler in sudoers funktioniert sudo gar nicht mehr.', 'After a mistake in sudoers, sudo no longer works at all.'],
     ['اگر رمز root داری: su - و با visudo درستش کن. اگر نه: در سرور مجازی از کنسول، در GRUB حالت Recovery و «root shell»، mount -o remount,rw / و فایل اشتباه را در ‎/etc/sudoers.d حذف یا اصلاح کن. پیشگیری: همیشه visudo -c و یک نشست دوم باز.', 'Mit Root-Kennwort: su - und mit visudo korrigieren. Sonst: an der VM-Konsole im GRUB den Recovery-Modus und „root shell“ wählen, mount -o remount,rw / und die fehlerhafte Datei in /etc/sudoers.d löschen oder korrigieren. Vorbeugen: immer visudo -c und eine zweite Sitzung offen.', 'With a root password: su - and fix with visudo. Otherwise: at the VM console choose recovery mode and “root shell” in GRUB, mount -o remount,rw / and delete or fix the faulty file in /etc/sudoers.d. Prevention: always visudo -c and keep a second session open.']]
  ],
  decide: [
    [['گروه و setgid یا ACL؟', 'Gruppe mit setgid oder ACL?', 'Group with setgid or ACL?'],
     ['برای یک تیم با دسترسی یکسان: یک گروه، پوشه با setgid (2770) و ACL پیش‌فرض برای گروه. ACL برای استثناها، مثلاً یک بازرس که فقط خواندن دارد. هر چه ACL کمتر، عیب‌یابی ساده‌تر.', 'Für ein Team mit gleichen Rechten: eine Gruppe, Ordner mit setgid (2770) und Standard-ACL für die Gruppe. ACLs für Ausnahmen, etwa einen Prüfer mit nur Lesen. Je weniger ACLs, desto einfacher die Fehlersuche.', 'For a team with equal rights: one group, folder with setgid (2770) and a default ACL for the group. ACLs for exceptions, e.g. an auditor with read only. The fewer ACLs, the easier troubleshooting.']],
    [['حساب محلی یا کاربر AD روی سرور لینوکس؟', 'Lokales Konto oder AD-Benutzer auf dem Linux-Server?', 'Local account or AD user on the Linux server?'],
     ['وقتی سرور عضو AD است، برای افراد کاربر AD (با گروه‌های AD برای ورود و sudo): خروج همکار در یک جا انجام می‌شود. حساب محلی فقط برای یک Admin اضطراری و حساب‌های سرویس.', 'Ist der Server in AD eingebunden, für Personen AD-Benutzer (mit AD-Gruppen für Anmeldung und sudo) – Austritte werden an einer Stelle erledigt. Lokale Konten nur für einen Notfall-Admin und Dienstkonten.', 'If the server is joined to AD, use AD users for people (with AD groups for login and sudo) – offboarding happens in one place. Local accounts only for an emergency admin and service accounts.']]
  ],
  iv: [
    [['کاربری ۶۴۰ روی فایل دارد ولی نمی‌تواند آن را بخواند. چه چیزی را بررسی می‌کنی؟', 'Eine Datei hat 640, der Benutzer kann sie trotzdem nicht lesen. Was prüfst du?', 'A file has 640 but the user still cannot read it. What do you check?'],
     ['اول اینکه کاربر واقعاً مالک یا عضو گروه فایل است (id و ls -l). بعد پوشه‌های بالادست با namei -l، چون بدون x روی پوشه رسیدن به فایل ممکن نیست. اگر ACL هست (علامت + در ls -l)، getfacl. در آخر AppArmor یا Mount با گزینهٔ خاص.', 'Erst, ob der Benutzer wirklich Besitzer oder in der Gruppe der Datei ist (id und ls -l). Dann übergeordnete Ordner mit namei -l, denn ohne x auf einem Ordner kommt man nicht zur Datei. Gibt es eine ACL (+ in ls -l), getfacl. Zuletzt AppArmor oder Mountoptionen.', 'First whether the user really is the owner or in the file’s group (id and ls -l). Then parent folders with namei -l, because without x on a folder you cannot reach the file. If there is an ACL (+ in ls -l), getfacl. Finally AppArmor or mount options.']]
  ]
},

'lx-network': {
  know: [
    ['نام کارت شبکه در ماشین‌های واقعی و مجازی اغلب eth0 نیست (مثلاً ens18 یا enp0s3). قبل از نوشتن فایل netplan نام را با ip -br link ببین؛ نام اشتباه یعنی سرور بدون شبکه.', 'Der Name der Netzwerkkarte ist auf echten und virtuellen Maschinen oft nicht eth0 (etwa ens18 oder enp0s3). Vor dem Schreiben der netplan-Datei mit ip -br link prüfen – ein falscher Name heißt Server ohne Netz.', 'The NIC name on real and virtual machines is often not eth0 (e.g. ens18 or enp0s3). Check with ip -br link before writing the netplan file – a wrong name means a server without network.'],
    ['netplan try تنظیمات را اعمال می‌کند و اگر در ۱۲۰ ثانیه تأیید نکنی، خودکار برمی‌گرداند؛ از راه دور همیشه try، نه apply.', 'netplan try übernimmt die Einstellungen und setzt sie automatisch zurück, wenn du nicht innerhalb von 120 Sekunden bestätigst – aus der Ferne immer try, nicht apply.', 'netplan try applies the settings and reverts automatically if you do not confirm within 120 seconds – remotely always use try, not apply.'],
    ['برای آزمایش پورت بدون برنامهٔ اضافی: nc -zv میزبان پورت؛ برای مسیر: tracepath -n؛ برای وب: curl -v. سرویسی که در ss -tulpn روی 127.0.0.1 گوش می‌دهد از شبکه در دسترس نیست.', 'Port testen ohne Zusatzprogramm: nc -zv host port; Weg: tracepath -n; Web: curl -v. Ein Dienst, der laut ss -tulpn auf 127.0.0.1 lauscht, ist aus dem Netz nicht erreichbar.', 'Test a port without extra tools: nc -zv host port; path: tracepath -n; web: curl -v. A service listening on 127.0.0.1 according to ss -tulpn is not reachable from the network.']
  ],
  code: R`# Vertiefung: Fehlersuche Schicht für Schicht
ip -br link                                         # Link UP? Name der Karte?
ip -br a ; ip r                                     # Adresse und Standardroute
ip neigh                                            # ARP: Gateway bekannt?
ping -c2 10.20.0.1
resolvectl query www.ubuntu.com
sudo resolvectl flush-caches
nc -zv 10.20.0.10 389                               # TCP-Port testen
tracepath -n 10.20.0.10
curl -sv https://www.ubuntu.com -o /dev/null 2>&1 | grep -E "Connected|HTTP/"
sudo netplan get                                    # wirksame netplan-Konfiguration
ls -l /etc/resolv.conf                              # Verweis auf den Stub 127.0.0.53`,
  trouble: [
    [['بعد از netplan apply دیگر به سرور دسترسی نیست.', 'Nach netplan apply ist der Server nicht mehr erreichbar.', 'After netplan apply the server is unreachable.'],
     ['از کنسول Hypervisor یا iDRAC/iLO وارد شو. با ip -br link نام واقعی کارت را ببین، فایل YAML را اصلاح کن (نام کارت، تورفتگی با فاصله نه Tab، IP و Gateway) و netplan try بزن. از این به بعد از راه دور فقط netplan try.', 'Über die Hypervisor-Konsole oder iDRAC/iLO anmelden. Mit ip -br link den echten Kartennamen prüfen, die YAML-Datei korrigieren (Kartenname, Einrückung mit Leerzeichen statt Tab, IP und Gateway) und netplan try ausführen. Künftig aus der Ferne nur netplan try.', 'Log in via the hypervisor console or iDRAC/iLO. Check the real NIC name with ip -br link, fix the YAML file (NIC name, indentation with spaces not tabs, IP and gateway) and run netplan try. From now on remotely only netplan try.']],
    [['با IP کار می‌کند، با نام نه.', 'IP-Adressen gehen, Namen nicht.', 'IP addresses work, names do not.'],
     ['resolvectl status نشان می‌دهد کدام DNS روی کدام کارت است. اگر DNS اشتباه یا خالی است، nameservers را در netplan درست کن. ‎/etc/resolv.conf باید پیوند به Stub (127.0.0.53) باشد؛ اگر کسی آن را دستی بازنویسی کرده، پیوند را برگردان. بعد resolvectl flush-caches.', 'resolvectl status zeigt, welcher DNS an welcher Karte hängt. Ist er falsch oder leer, nameservers in netplan korrigieren. /etc/resolv.conf muss auf den Stub (127.0.0.53) verweisen; hat jemand sie von Hand überschrieben, den Link wiederherstellen. Danach resolvectl flush-caches.', 'resolvectl status shows which DNS is on which NIC. If it is wrong or empty, fix nameservers in netplan. /etc/resolv.conf must link to the stub (127.0.0.53); if someone overwrote it manually, restore the link. Then resolvectl flush-caches.']],
    [['سرویس روی خود سرور در دسترس است، از شبکه نه.', 'Dienst lokal erreichbar, aus dem Netz nicht.', 'Service reachable locally but not from the network.'],
     ['در ss -tulpn آدرس گوش دادن را ببین: اگر 127.0.0.1 است، در تنظیمات برنامه آن را به 0.0.0.0 یا IP سرور تغییر بده. اگر روی همه گوش می‌دهد، ufw status و فایروال شبکه را بررسی کن. از کلاینت با nc -zv آزمایش کن.', 'In ss -tulpn die Lauschadresse prüfen: 127.0.0.1 heißt nur lokal – in der Programmkonfiguration auf 0.0.0.0 oder die Server-IP ändern. Lauscht er auf allen, ufw status und die Netzwerkfirewall prüfen. Vom Client mit nc -zv testen.', 'Check the listen address in ss -tulpn: 127.0.0.1 means local only – change it to 0.0.0.0 or the server IP in the program’s configuration. If it listens on all, check ufw status and the network firewall. Test from the client with nc -zv.']]
  ],
  decide: [
    [['از راه دور: netplan try یا apply؟', 'Aus der Ferne: netplan try oder apply?', 'Remotely: netplan try or apply?'],
     ['همیشه try: اگر اتصال قطع شد، بعد از ۱۲۰ ثانیه خودکار برمی‌گردد. apply فقط وقتی در کنسول محلی هستی. قبل از تغییر از فایل YAML نسخه بگیر.', 'Immer try: Bricht die Verbindung ab, wird nach 120 Sekunden automatisch zurückgesetzt. apply nur an der lokalen Konsole. Vor Änderungen die YAML-Datei sichern.', 'Always try: if the connection drops, it reverts automatically after 120 seconds. apply only at the local console. Back up the YAML file before changes.']],
    [['IP ثابت در netplan یا رزرو DHCP؟', 'Feste IP in netplan oder DHCP-Reservierung?', 'Static IP in netplan or DHCP reservation?'],
     ['مثل ویندوز: سرورهای زیرساخت ثابت در netplan؛ سرورهای ساده می‌توانند رزرو DHCP داشته باشند، به شرط DHCP مطمئن. در هر حال IP را در فهرست IPها ثبت کن.', 'Wie bei Windows: Infrastrukturserver fest in netplan; einfache Server können eine DHCP-Reservierung haben, sofern DHCP zuverlässig ist. Die IP in jedem Fall in der IP-Liste eintragen.', 'As with Windows: infrastructure servers static in netplan; simple servers may use a DHCP reservation if DHCP is reliable. Record the IP in the IP list either way.']]
  ],
  iv: [
    [['چطور با یک فرمان می‌فهمی کدام برنامه روی پورت 8080 گوش می‌دهد و روی چه آدرسی؟', 'Wie siehst du mit einem Befehl, welches Programm auf Port 8080 lauscht und auf welcher Adresse?', 'How do you see with one command which program listens on port 8080 and on which address?'],
     ['sudo ss -tulpn | grep 8080 نام پروسس، PID و آدرس (0.0.0.0، 127.0.0.1 یا IP مشخص) را نشان می‌دهد. 127.0.0.1 یعنی فقط محلی؛ برای دسترسی شبکه باید تنظیم برنامه یا Reverse Proxy را تغییر داد.', 'sudo ss -tulpn | grep 8080 zeigt Prozessname, PID und Adresse (0.0.0.0, 127.0.0.1 oder eine bestimmte IP). 127.0.0.1 heißt nur lokal – für Netzzugriff Programmeinstellung oder Reverse Proxy ändern.', 'sudo ss -tulpn | grep 8080 shows process name, PID and address (0.0.0.0, 127.0.0.1 or a specific IP). 127.0.0.1 means local only – for network access change the program setting or use a reverse proxy.']]
  ]
}

});
})();
