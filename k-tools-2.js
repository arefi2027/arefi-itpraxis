/* Arefi ITPraxis – Werkzeugkasten, Teil 2: Arbeitsplatz und Fernzugriff (Sysinternals, SSH/PuTTY/WinSCP/RDP, Admin-USB-Toolkit). Eigene Inhalte. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKTools = window.ArefiKTools || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'tools-sysinternals', part: 2,
  title: ['Sysinternals: بررسی پردازه‌ها، برنامه‌های خودکار و اتصال‌ها در ویندوز', 'Sysinternals: Prozesse, Autostarts und Verbindungen unter Windows untersuchen', 'Sysinternals: investigate processes, autostarts and connections on Windows'],
  goal: ['با Process Explorer، Autoruns، TCPView و Process Monitor پیدا کنی کدام پردازه منابع را مصرف می‌کند، فایلی را قفل کرده، هنگام شروع اجرا می‌شود یا اتصال برقرار می‌کند.', 'Mit Process Explorer, Autoruns, TCPView und Process Monitor findest du heraus, welcher Prozess Ressourcen frisst, eine Datei sperrt, beim Start lädt oder Verbindungen aufbaut.', 'With Process Explorer, Autoruns, TCPView and Process Monitor you find out which process eats resources, locks a file, loads at startup or opens connections.'],
  why: ['تیکت‌های رایج: «رایانه کند است»، «فایل پاک نمی‌شود چون در حال استفاده است»، «برنامهٔ عجیبی همیشه با ویندوز اجرا می‌شود». Sysinternals جوابی می‌دهد که Task Manager نشان نمی‌دهد؛ ابزارهای رایگان خود مایکروسافت.', 'Typische Tickets: „PC langsam“, „Datei lässt sich nicht löschen, sie wird verwendet“, „Ein seltsames Programm startet immer mit“. Sysinternals liefert die Antwort, die der Task-Manager nicht zeigt – kostenlose Werkzeuge von Microsoft selbst.', 'Typical tickets: “PC is slow”, “file cannot be deleted because it is in use”, “a strange program always starts with Windows”. Sysinternals gives the answer Task Manager does not show – free tools from Microsoft itself.'],
  know: [
    ['Process Explorer درخت پردازه‌ها با پردازهٔ والد، مصرف CPU، RAM و دیسک و ناشر امضاشده را نشان می‌دهد (Options > Verify Image Signatures). Find > Find Handle or DLL نشان می‌دهد چه کسی فایلی را قفل کرده است.', 'Process Explorer zeigt den Prozessbaum mit Elternprozess, CPU-, RAM- und Datenträgerlast und den signierten Hersteller (Options > Verify Image Signatures). Find > Find Handle or DLL zeigt, wer eine Datei sperrt.', 'Process Explorer shows the process tree with parent process, CPU, RAM and disk load and the signed publisher (Options > Verify Image Signatures). Find > Find Handle or DLL shows who locks a file.'],
    ['Autoruns همهٔ جاهای اجرای خودکار را نشان می‌دهد: کلیدهای Run، سرویس‌ها، وظایف زمان‌بندی‌شده، درایورها و افزونه‌های Explorer. با Options > Hide Microsoft Entries شروع کن؛ مورد را اول غیرفعال کن (تیک را بردار)، پاک نکن.', 'Autoruns zeigt alle Autostart-Orte: Run-Schlüssel, Dienste, geplante Aufgaben, Treiber und Explorer-Erweiterungen. Mit Options > Hide Microsoft Entries beginnen; Einträge zuerst deaktivieren (Haken entfernen), nicht löschen.', 'Autoruns shows every autostart location: Run keys, services, scheduled tasks, drivers and Explorer extensions. Start with Options > Hide Microsoft Entries; disable entries first (untick), do not delete them.'],
    ['TCPView همهٔ اتصال‌های TCP و UDP را با نام پردازه به‌صورت زنده نشان می‌دهد؛ tcpvcon نسخهٔ خط فرمان آن است. معادل PowerShell: Get-NetTCPConnection با OwningProcess.', 'TCPView zeigt alle TCP- und UDP-Verbindungen mit Prozessnamen live; tcpvcon ist die Kommandozeilen-Version. PowerShell-Pendant: Get-NetTCPConnection mit OwningProcess.', 'TCPView shows all TCP and UDP connections with process names live; tcpvcon is the command-line version. PowerShell equivalent: Get-NetTCPConnection with OwningProcess.'],
    ['Process Monitor دسترسی‌های فایل، رجیستری و پردازه را ضبط می‌کند. با فیلترهایی مثل Process Name is و Result is ACCESS DENIED یا NAME NOT FOUND کمبود مجوز یا فایل گم‌شده پیدا می‌شود. رویدادها خیلی زیادند؛ کوتاه ضبط کن.', 'Process Monitor zeichnet Datei-, Registry- und Prozesszugriffe auf. Mit Filtern wie Process Name is und Result is ACCESS DENIED oder NAME NOT FOUND findest du fehlende Rechte oder Dateien. Es entstehen sehr viele Ereignisse – nur kurz aufzeichnen.', 'Process Monitor records file, registry and process activity. With filters like Process Name is and Result is ACCESS DENIED or NAME NOT FOUND you find missing permissions or files. It produces huge amounts of events – record only briefly.'],
    ['ابزارهای دیگر: PsExec (اجرای فرمان از راه دور)، BGInfo (اطلاعات سیستم روی دسکتاپ سرورها)، Disk2vhd و Sysmon (ثبت رویدادهای امنیتی، در ماژول SIEM).', 'Weitere Werkzeuge: PsExec (Befehle remote ausführen), BGInfo (Systeminfos auf dem Desktop von Servern), Disk2vhd und Sysmon (Sicherheitsereignisse protokollieren, siehe SIEM-Modul).', 'More tools: PsExec (run commands remotely), BGInfo (system info on server desktops), Disk2vhd and Sysmon (security event logging, see the SIEM module).'],
    ['دریافت: بستهٔ کامل به‌صورت ZIP از Microsoft Learn، از Microsoft Store یا مستقیم از live.sysinternals.com. بار اول هر ابزار شرایط مجوز (EULA) را می‌پرسد. فقط از منبع مایکروسافت دانلود کن.', 'Bezug: die komplette Suite als ZIP von Microsoft Learn, aus dem Microsoft Store oder direkt über live.sysinternals.com. Beim ersten Start fragt jedes Werkzeug die Lizenz (EULA) ab. Nur aus Microsoft-Quellen laden.', 'Download: the complete suite as a ZIP from Microsoft Learn, from the Microsoft Store or directly via live.sysinternals.com. Each tool asks for the licence (EULA) on first start. Only download from Microsoft sources.']
  ],
  lab: {
    vm: 'CL01 (Windows 11) mit lokalen Administratorrechten', shell: 'PowerShell',
    steps: [
      ['Sysinternals Suite را از Microsoft Learn دانلود کن، در C:\\Tools\\Sysinternals باز کن و امضای procexp64.exe را بررسی کن.', 'Process Explorer را با حق مدیر اجرا کن، Verify Image Signatures را فعال کن و درخت پردازه‌ها را ببین.', 'با فرمان آزمایشی فایلی را در PowerShell باز نگه دار، سعی کن آن را پاک کنی و با Find Handle پردازهٔ قفل‌کننده را پیدا کن.', 'یک ورودی Run آزمایشی بساز، آن را در Autoruns (با Hide Microsoft Entries) پیدا و غیرفعال کن.', 'اتصال به DC01 را بساز و در TCPView و با Get-NetTCPConnection ببین.', 'در Process Monitor فیلتر Process Name is notepad.exe بگذار، در Notepad فایلی را در C:\\Windows\\System32 ذخیره کن و ردیف ACCESS DENIED را پیدا کن.', 'ورودی Run و فایل‌های آزمایشی را پاک کن.'],
      ['Sysinternals Suite von Microsoft Learn herunterladen, nach C:\\Tools\\Sysinternals entpacken und die Signatur von procexp64.exe prüfen.', 'Process Explorer als Administrator starten, Verify Image Signatures aktivieren und den Prozessbaum ansehen.', 'Mit dem Testbefehl eine Datei in PowerShell offen halten, versuchen sie zu löschen und mit Find Handle den sperrenden Prozess finden.', 'Einen Test-Run-Eintrag anlegen und ihn in Autoruns (mit Hide Microsoft Entries) finden und deaktivieren.', 'Eine Verbindung zu DC01 aufbauen und in TCPView sowie mit Get-NetTCPConnection ansehen.', 'In Process Monitor den Filter Process Name is notepad.exe setzen, in Notepad eine Datei in C:\\Windows\\System32 speichern und die Zeile ACCESS DENIED finden.', 'Run-Eintrag und Testdateien entfernen.'],
      ['Download Sysinternals Suite from Microsoft Learn, extract it to C:\\Tools\\Sysinternals and verify the signature of procexp64.exe.', 'Start Process Explorer as administrator, enable Verify Image Signatures and look at the process tree.', 'Keep a file open in PowerShell with the test command, try to delete it and use Find Handle to find the locking process.', 'Create a test Run entry, find it in Autoruns (with Hide Microsoft Entries) and disable it.', 'Open a connection to DC01 and view it in TCPView and with Get-NetTCPConnection.', 'In Process Monitor set the filter Process Name is notepad.exe, save a file to C:\\Windows\\System32 from Notepad and find the ACCESS DENIED line.', 'Remove the Run entry and the test files.']
    ],
    code: R`# Suite entpacken (SysinternalsSuite.zip vorher von learn.microsoft.com laden)
New-Item -ItemType Directory C:\Tools\Sysinternals -Force | Out-Null
Expand-Archive "$env:USERPROFILE\Downloads\SysinternalsSuite.zip" C:\Tools\Sysinternals -Force
Get-AuthenticodeSignature C:\Tools\Sysinternals\procexp64.exe | Format-List Status, SignerCertificate

# Gesperrte Datei erzeugen (dieses Fenster offen lassen)
$f = [System.IO.File]::Open("$env:TEMP\gesperrt.txt", 'OpenOrCreate', 'ReadWrite', 'None')
# Zweites PowerShell-Fenster:  Remove-Item "$env:TEMP\gesperrt.txt"   -> "wird verwendet"
# Process Explorer: Find > Find Handle or DLL > gesperrt.txt
$f.Close()

# Test-Autostart anlegen (danach in Autoruns unter "Logon" suchen)
New-ItemProperty -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Run -Name LabTest -Value 'notepad.exe' -PropertyType String -Force

# Verbindungen mit Prozessnamen
Test-NetConnection 10.20.0.10 -Port 445
Get-NetTCPConnection -State Established |
  Select-Object LocalAddress, RemoteAddress, RemotePort, @{n='Prozess'; e={ (Get-Process -Id $_.OwningProcess).ProcessName }} |
  Sort-Object RemotePort
C:\Tools\Sysinternals\tcpvcon.exe -a -n -c | Select-Object -First 15

# Aufraeumen
Remove-ItemProperty -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Run -Name LabTest
Remove-Item "$env:TEMP\gesperrt.txt"`,
    checks: [
      ['Process Explorer پردازهٔ PowerShell را مالک handle فایل gesperrt.txt نشان می‌دهد.', 'Autoruns ورودی LabTest را زیر Logon نشان می‌دهد و بعد از غیرفعال‌کردن، Notepad در ورود بعدی اجرا نمی‌شود.', 'Process Monitor برای notepad.exe ردیف ACCESS DENIED با مسیر فایل نشان می‌دهد.', 'ورودی Run و فایل gesperrt.txt پاک شده‌اند و Get-NetTCPConnection همان اتصال TCPView را با نام پردازه نشان داد.'],
      ['Process Explorer zeigt den PowerShell-Prozess als Besitzer des Handles auf gesperrt.txt.', 'Autoruns zeigt LabTest unter Logon; nach dem Deaktivieren startet Notepad bei der nächsten Anmeldung nicht.', 'Process Monitor zeigt für notepad.exe eine ACCESS-DENIED-Zeile mit dem Dateipfad.', 'Run-Eintrag und gesperrt.txt sind entfernt, und Get-NetTCPConnection zeigte dieselbe Verbindung wie TCPView mit Prozessnamen.'],
      ['Process Explorer shows the PowerShell process as owner of the handle on gesperrt.txt.', 'Autoruns shows LabTest under Logon; after disabling it Notepad does not start at the next sign-in.', 'Process Monitor shows an ACCESS DENIED line with the file path for notepad.exe.', 'The Run entry and gesperrt.txt are removed, and Get-NetTCPConnection showed the same connection as TCPView with the process name.']
    ]
  },
  trouble: [
    [['فایل پاک نمی‌شود: «در برنامهٔ دیگری در حال استفاده است».', 'Datei lässt sich nicht löschen: „wird in einem anderen Programm verwendet“.', 'A file cannot be deleted: “it is open in another program”.'],
     ['با Find Handle در Process Explorer (یا handle.exe) پردازه را پیدا کن. برنامه را درست ببند، نه اینکه handle را به‌زور ببندی (خطر از دست رفتن داده)؛ اگر سرویس است، سرویس را متوقف کن.', 'Mit Find Handle in Process Explorer (oder handle.exe) den Prozess finden. Programm sauber beenden statt das Handle gewaltsam zu schließen (Datenverlust möglich); bei Diensten den Dienst stoppen.', 'Find the process with Find Handle in Process Explorer (or handle.exe). Close the program properly instead of forcing the handle closed (risk of data loss); for services stop the service.']],
    [['رایانه کند بالا می‌آید و برنامه‌های زیادی در پس‌زمینه‌اند.', 'Der PC startet langsam, viele Programme laufen im Hintergrund.', 'The PC starts slowly and many programs run in the background.'],
     ['در Autoruns با Hide Microsoft Entries ورودی‌های ناشناخته و بدون امضا را بررسی کن؛ غیرفعال کن به‌جای حذف، آزمایش کن و مستند کن. اگر به بدافزار مشکوکی، فرایند امنیتی شرکت را شروع کن.', 'In Autoruns mit Hide Microsoft Entries unbekannte und unsignierte Einträge prüfen; deaktivieren statt löschen, testen und dokumentieren. Bei Malware-Verdacht den Sicherheitsprozess der Firma auslösen.', 'In Autoruns with Hide Microsoft Entries check unknown and unsigned entries; disable instead of deleting, test and document. If you suspect malware, start the company security process.']],
    [['ضبط Process Monitor گیر می‌کند یا خیلی بزرگ می‌شود.', 'Die Process-Monitor-Aufzeichnung friert ein oder wird riesig.', 'The Process Monitor capture freezes or becomes huge.'],
     ['فقط چند ثانیه ضبط کن، فیلترها را قبل از شروع بگذار، Drop Filtered Events را فعال کن و Backing File را روی فایل تنظیم کن.', 'Nur wenige Sekunden aufzeichnen, Filter vor dem Start setzen, Drop Filtered Events aktivieren und Backing File auf eine Datei umstellen.', 'Record only a few seconds, set filters before starting, enable Drop Filtered Events and switch the backing file to a file.']]
  ],
  decide: [
    [['Task Manager یا Process Explorer؟', 'Task-Manager oder Process Explorer?', 'Task Manager or Process Explorer?'],
     ['Task Manager برای نمای سریع کنار کاربر؛ Process Explorer برای پردازهٔ والد، handleها، DLLها و امضاها.', 'Task-Manager für einen schnellen Überblick beim Benutzer; Process Explorer für Elternprozess, Handles, DLLs und Signaturen.', 'Task Manager for a quick overview at the user’s desk; Process Explorer for parent process, handles, DLLs and signatures.']],
    [['ورودی خودکار را غیرفعال کنم یا برنامه را حذف کنم؟', 'Autostart-Eintrag deaktivieren oder Programm deinstallieren?', 'Disable the autostart entry or uninstall the program?'],
     ['اول غیرفعال و آزمایش کن (قابل برگشت)؛ راه‌حل دائمی را با حذف نرم‌افزار یا سیستم توزیع نرم‌افزار انجام بده.', 'Zuerst deaktivieren und testen (umkehrbar); dauerhaft sauber über Deinstallation oder Softwareverteilung lösen.', 'Disable and test first (reversible); solve it permanently by uninstalling or through software distribution.']]
  ],
  pitfalls: [
    ['حذف ورودی‌ها در Autoruns به‌جای غیرفعال کردن؛ راه برگشتی نیست.', 'Einträge in Autoruns löschen statt deaktivieren – kein Zurück.', 'Deleting entries in Autoruns instead of disabling them – no way back.'],
    ['بستن اجباری handleها در Process Explorer؛ برنامه ممکن است از کار بیفتد یا داده از دست برود.', 'Handles in Process Explorer gewaltsam schließen; das Programm kann abstürzen oder Daten verlieren.', 'Force-closing handles in Process Explorer; the program may crash or lose data.'],
    ['دانلود ابزارها از سایت‌های غیررسمی به‌جای مایکروسافت.', 'Werkzeuge von inoffiziellen Download-Seiten laden statt von Microsoft.', 'Downloading the tools from unofficial sites instead of Microsoft.']
  ],
  iv: [
    [['کاربری نمی‌تواند فایلی را روی درایو شبکه پاک کند. چه می‌کنی؟', 'Eine Benutzerin kann eine Datei auf dem Netzlaufwerk nicht löschen. Wie gehst du vor?', 'A user cannot delete a file on a network drive. What do you do?'],
     ['روی کلاینت با Process Explorer بررسی می‌کنم؛ روی سرور فایل با Get-SmbOpenFile یا Computer Management > Shared Folders > Open Files می‌بینم چه کسی آن را باز کرده و بعد از هماهنگی نشست را می‌بندم.', 'Auf dem Client mit Process Explorer prüfen; auf dem Fileserver mit Get-SmbOpenFile oder Computerverwaltung > Freigegebene Ordner > Geöffnete Dateien sehen, wer sie geöffnet hat, und nach Rücksprache die Sitzung schließen.', 'On the client check with Process Explorer; on the file server use Get-SmbOpenFile or Computer Management > Shared Folders > Open Files to see who has it open and close the session after agreement.']],
    [['چطور پیدا می‌کنی کدام برنامه به یک IP ناشناخته وصل می‌شود؟', 'Wie findest du, welches Programm sich mit einer unbekannten IP verbindet?', 'How do you find which program connects to an unknown IP?'],
     ['با TCPView یا Get-NetTCPConnection و OwningProcess پردازه را پیدا می‌کنم، بعد در Process Explorer مسیر و امضا را بررسی می‌کنم و در صورت نیاز Sysmon یا EDR را می‌بینم.', 'Mit TCPView oder Get-NetTCPConnection und OwningProcess den Prozess finden, dann in Process Explorer Pfad und Signatur prüfen und bei Bedarf Sysmon oder EDR auswerten.', 'Find the process with TCPView or Get-NetTCPConnection and OwningProcess, then check path and signature in Process Explorer and, if needed, review Sysmon or EDR data.']],
    [['Autoruns چه کاری می‌کند؟', 'Was macht Autoruns?', 'What does Autoruns do?'],
     ['همهٔ جاهایی را نشان می‌دهد که برنامه‌ها، سرویس‌ها و درایورها هنگام بوت یا ورود خودکار اجرا می‌شوند، با امضا و امکان غیرفعال‌سازی.', 'Es zeigt alle Orte, an denen Programme, Dienste und Treiber beim Booten oder bei der Anmeldung automatisch starten, mit Signatur und der Möglichkeit zum Deaktivieren.', 'It shows every place where programs, services and drivers start automatically at boot or sign-in, with signatures and the option to disable them.']]
  ],
  sources: [
    ['Sysinternals Utilities Index (Microsoft Learn)', 'https://learn.microsoft.com/en-us/sysinternals/downloads/'],
    ['Process Explorer (Microsoft Learn)', 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer'],
    ['Autoruns (Microsoft Learn)', 'https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns']
  ]
},

{
  id: 'tools-remote', part: 2,
  title: ['دسترسی از راه دور: SSH، PuTTY، WinSCP، RDP و Quick Assist به‌صورت امن', 'Fernzugriff: SSH, PuTTY, WinSCP, RDP und Remotehilfe sicher nutzen', 'Remote access: using SSH, PuTTY, WinSCP, RDP and Quick Assist securely'],
  goal: ['با کلید SSH وصل شوی (OpenSSH در ویندوز یا PuTTY)، فایل‌ها را با WinSCP یا scp منتقل کنی، RDP را با NLA به کار ببری و با رضایت کاربر از طریق Quick Assist پشتیبانی بدهی.', 'Du verbindest dich per SSH mit Schlüssel (OpenSSH unter Windows oder PuTTY), überträgst Dateien mit WinSCP oder scp, nutzt RDP mit NLA und leistest Benutzersupport per Remotehilfe (Quick Assist) mit Zustimmung.', 'You connect via SSH with a key (OpenSSH on Windows or PuTTY), transfer files with WinSCP or scp, use RDP with NLA and support users with Quick Assist with their consent.'],
  why: ['دسترسی از راه دور کار روزانهٔ پشتیبانی و مدیریت است و یکی از راه‌های اصلی ورود مهاجمان. کسی که امن وصل می‌شود (کلید، بررسی کلید میزبان، بدون RDP باز در اینترنت) از شرکت محافظت می‌کند.', 'Fernzugriff ist Alltag in Support und Administration – und einer der Hauptwege für Angreifer. Wer sicher verbindet (Schlüssel, Hostkey-Prüfung, kein offenes RDP im Internet), schützt das Unternehmen.', 'Remote access is daily routine in support and administration – and one of the main entry points for attackers. Connecting securely (keys, host key checks, no RDP open to the internet) protects the company.'],
  know: [
    ['ویندوز ۱۰ و ۱۱ و Windows Server 2019 به بعد کلاینت OpenSSH را دارند: ssh کاربر@میزبان، ssh-keygen -t ed25519، scp و sftp. کلید به‌جای رمز؛ کلید خصوصی با Passphrase روی دستگاه خودت می‌ماند.', 'Windows 10/11 und Windows Server ab 2019 haben den OpenSSH-Client eingebaut: ssh benutzer@host, ssh-keygen -t ed25519, scp und sftp. Schlüssel statt Kennwort; der private Schlüssel bleibt mit Passphrase auf deinem Gerät.', 'Windows 10/11 and Windows Server 2019 or later include the OpenSSH client: ssh user@host, ssh-keygen -t ed25519, scp and sftp. Keys instead of passwords; the private key stays on your device with a passphrase.'],
    ['در اولین اتصال اثر انگشت کلید میزبان را با سرور مقایسه کن (ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub). هشدار REMOTE HOST IDENTIFICATION HAS CHANGED را هرگز بدون بررسی رد نکن.', 'Beim ersten Verbinden den Hostkey-Fingerprint mit dem Server vergleichen (ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub). Die Warnung REMOTE HOST IDENTIFICATION HAS CHANGED nie ungeprüft wegklicken.', 'On the first connection compare the host key fingerprint with the server (ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub). Never dismiss the warning REMOTE HOST IDENTIFICATION HAS CHANGED without checking.'],
    ['PuTTY: ذخیرهٔ نشست، کلید در قالب ppk (PuTTYgen کلید OpenSSH را وارد و صادر می‌کند)، Pageant به‌عنوان نگه‌دارندهٔ کلید، کنسول سریال برای Switch و روتر و ثبت لاگ برای مستندسازی. WinSCP فایل‌ها را با SFTP و رابط گرافیکی منتقل می‌کند و همان کلیدها را به کار می‌برد.', 'PuTTY: Sitzungen speichern, Schlüssel im ppk-Format (PuTTYgen importiert und exportiert OpenSSH-Schlüssel), Pageant als Schlüsselagent, serielle Konsole für Switches und Router und Logging für die Dokumentation. WinSCP überträgt Dateien per SFTP mit Oberfläche und nutzt dieselben Schlüssel.', 'PuTTY: saved sessions, keys in ppk format (PuTTYgen imports and exports OpenSSH keys), Pageant as key agent, serial console for switches and routers and logging for documentation. WinSCP transfers files over SFTP with a GUI and uses the same keys.'],
    ['تونل SSH: ssh -L 8443:intranet:443 jump@bastion یک پورت محلی را منتقل می‌کند؛ دسترسی به رابط وب داخلی بدون باز کردن آن به اینترنت. فایل ~/.ssh/config با Host، HostName، User، IdentityFile و ProxyJump تایپ را کم می‌کند.', 'SSH-Tunnel: ssh -L 8443:intranet:443 jump@bastion leitet einen lokalen Port weiter – Zugriff auf interne Weboberflächen ohne Freigabe ins Internet. Die Datei ~/.ssh/config mit Host, HostName, User, IdentityFile und ProxyJump spart Tipparbeit.', 'SSH tunnel: ssh -L 8443:intranet:443 jump@bastion forwards a local port – access to internal web interfaces without exposing them to the internet. The file ~/.ssh/config with Host, HostName, User, IdentityFile and ProxyJump saves typing.'],
    ['RDP (mstsc) فقط با NLA؛ پورت 3389 هرگز مستقیم در اینترنت باز نباشد. دسترسی از طریق VPN یا RD Gateway با MFA. mstsc /v:server /admin برای نشست کنسول.', 'RDP (mstsc) nur mit NLA; Port 3389 nie direkt ins Internet. Zugriff über VPN oder RD-Gateway mit MFA. mstsc /v:server /admin für die Konsolensitzung.', 'RDP (mstsc) only with NLA; never expose port 3389 directly to the internet. Access via VPN or RD Gateway with MFA. mstsc /v:server /admin for the console session.'],
    ['کمک به کاربر: Quick Assist (اپ Microsoft Store)؛ کاربر خودش کد را وارد و تأیید می‌کند و همه‌چیز را می‌بیند. قبل از آن هویت تماس‌گیرنده را بررسی کن و کد را به ناشناس‌ها نده؛ کلاهبرداران دقیقاً از همین روش استفاده می‌کنند. در شرکت‌هایی که Intune دارند، مایکروسافت Remote Help را به‌خاطر کنترل‌های امنیتی بیشتر پیشنهاد می‌کند. ابزارهای تجاری (TeamViewer، AnyDesk) فقط با مجوز و سیاست شرکت.', 'Benutzerhilfe: Quick Assist (App aus dem Microsoft Store); der Benutzer gibt den Code selbst ein, stimmt zu und sieht alles. Vorher die Identität des Anrufers prüfen und keine Codes an Unbekannte – genau so arbeiten Betrüger. In Firmen mit Intune empfiehlt Microsoft wegen strengerer Sicherheitskontrollen Remote Help. Kommerzielle Tools (TeamViewer, AnyDesk) nur mit Firmenlizenz und Richtlinie.', 'User help: Quick Assist (Microsoft Store app); the user enters the code, agrees and sees everything. Check the caller’s identity first and never exchange codes with strangers – that is exactly how scammers work. In companies with Intune Microsoft recommends Remote Help for its stronger security controls. Commercial tools (TeamViewer, AnyDesk) only with a company licence and policy.']
  ],
  lab: {
    vm: 'CL01 (Windows 11) und LNX01 (Ubuntu Server); Benutzer auf LNX01 hier: admin', shell: 'PowerShell',
    steps: [
      ['روی CL01 بررسی کن کلاینت OpenSSH نصب است و یک کلید ed25519 با Passphrase بساز.', 'اثر انگشت کلید میزبان LNX01 را روی کنسول آن نمایش بده و در اولین اتصال مقایسه کن.', 'کلید عمومی را روی LNX01 ثبت کن و ورود بدون رمز را آزمایش کن.', 'در ~/.ssh/config ورودی lnx01 بساز و با scp یک فایل را در هر دو جهت منتقل کن.', 'PuTTY و WinSCP را نصب کن، کلید را با PuTTYgen به ppk تبدیل کن، نشست را ذخیره کن و یک فایل را با WinSCP منتقل کن.', 'یک سرویس وب فقط محلی روی LNX01 اجرا کن و آن را از طریق تونل SSH روی CL01 در localhost:8080 باز کن.', 'تنظیم NLA در CL01 را بررسی کن، سرویس آزمایشی را متوقف کن و در صورت امکان Quick Assist را با یک همکار امتحان کن.'],
      ['Auf CL01 prüfen, ob der OpenSSH-Client installiert ist, und einen ed25519-Schlüssel mit Passphrase erzeugen.', 'Den Hostkey-Fingerprint von LNX01 an dessen Konsole anzeigen und beim ersten Verbinden vergleichen.', 'Den öffentlichen Schlüssel auf LNX01 eintragen und die Anmeldung ohne Kennwort testen.', 'In ~/.ssh/config einen Eintrag lnx01 anlegen und mit scp eine Datei in beide Richtungen kopieren.', 'PuTTY und WinSCP installieren, den Schlüssel mit PuTTYgen ins ppk-Format umwandeln, eine Sitzung speichern und eine Datei mit WinSCP übertragen.', 'Auf LNX01 einen nur lokal erreichbaren Webdienst starten und ihn per SSH-Tunnel auf CL01 unter localhost:8080 öffnen.', 'NLA-Einstellung auf CL01 prüfen, den Testdienst beenden und, wenn möglich, Quick Assist mit einer Kollegin oder einem Kollegen ausprobieren.'],
      ['On CL01 check that the OpenSSH client is installed and create an ed25519 key with a passphrase.', 'Display the host key fingerprint of LNX01 on its console and compare it on the first connection.', 'Add the public key on LNX01 and test password-less login.', 'Create an lnx01 entry in ~/.ssh/config and copy a file in both directions with scp.', 'Install PuTTY and WinSCP, convert the key to ppk with PuTTYgen, save a session and transfer a file with WinSCP.', 'Start a local-only web service on LNX01 and open it on CL01 at localhost:8080 through an SSH tunnel.', 'Check the NLA setting on CL01, stop the test service and, if possible, try Quick Assist with a colleague.']
    ],
    code: R`# --- CL01 (PowerShell) ---
Get-WindowsCapability -Online -Name OpenSSH.Client*
ssh-keygen -t ed25519 -C "admin@CL01"

# LNX01-Konsole: Fingerprint anzeigen, beim ersten ssh vergleichen
#   ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
ssh admin@10.20.0.30 hostname

# Oeffentlichen Schluessel eintragen
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | ssh admin@10.20.0.30 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

# Kurzname in ~/.ssh/config
@"
Host lnx01
    HostName 10.20.0.30
    User admin
    IdentityFile ~/.ssh/id_ed25519
"@ | Add-Content $env:USERPROFILE\.ssh\config
ssh lnx01 uptime
scp $env:WINDIR\System32\drivers\etc\hosts lnx01:/tmp/hosts-cl01
scp lnx01:/etc/os-release $env:USERPROFILE\Desktop\

# Tunnel: Webdienst auf LNX01 nur an 127.0.0.1
ssh lnx01 "nohup python3 -m http.server 8080 --bind 127.0.0.1 >/dev/null 2>&1 &"
ssh -N -L 8080:127.0.0.1:8080 lnx01
#   Browser auf CL01: http://localhost:8080   (Strg+C beendet den Tunnel)
ssh lnx01 "pkill -f 'http.server 8080'"

# RDP: 1 = NLA aktiv
(Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp').UserAuthentication
mstsc /v:10.20.0.20`,
    checks: [
      ['ssh lnx01 hostname بدون پرسیدن رمز حساب کار می‌کند (فقط Passphrase یا Agent).', 'اثر انگشت در اولین اتصال با کنسول LNX01 یکسان بود و در گزارش ثبت شده است.', 'http://localhost:8080 روی CL01 فهرست پوشهٔ LNX01 را نشان می‌دهد، در حالی که سرویس فقط روی 127.0.0.1 گوش می‌دهد.', 'مقدار UserAuthentication برابر ۱ است (NLA فعال).'],
      ['ssh lnx01 hostname funktioniert ohne Kontokennwort (nur Passphrase oder Agent).', 'Der Fingerprint beim ersten Verbinden stimmte mit der Konsole von LNX01 überein und ist im Protokoll notiert.', 'http://localhost:8080 auf CL01 zeigt das Verzeichnis von LNX01, obwohl der Dienst nur an 127.0.0.1 lauscht.', 'UserAuthentication ist 1 (NLA aktiv).'],
      ['ssh lnx01 hostname works without the account password (only passphrase or agent).', 'The fingerprint on the first connection matched the LNX01 console and is noted in the log.', 'http://localhost:8080 on CL01 shows the LNX01 directory although the service only listens on 127.0.0.1.', 'UserAuthentication is 1 (NLA enabled).']
    ]
  },
  trouble: [
    [['ورود با خطای Permission denied (publickey) رد می‌شود.', 'Permission denied (publickey).', 'Permission denied (publickey).'],
     ['authorized_keys اشتباه است یا مجوزها (700 و 600) درست نیستند، کاربر اشتباه است یا کلید بارگذاری نشده. ssh -v کلیدهای ارائه‌شده را نشان می‌دهد؛ روی سرور journalctl -u ssh را ببین.', 'authorized_keys falsch oder Rechte (700 und 600) nicht korrekt, falscher Benutzer oder Schlüssel nicht geladen. ssh -v zeigt die angebotenen Schlüssel; auf dem Server journalctl -u ssh ansehen.', 'authorized_keys is wrong or permissions (700 and 600) are incorrect, wrong user or key not loaded. ssh -v shows the offered keys; on the server check journalctl -u ssh.']],
    [['هشدار REMOTE HOST IDENTIFICATION HAS CHANGED.', 'Warnung REMOTE HOST IDENTIFICATION HAS CHANGED.', 'Warning REMOTE HOST IDENTIFICATION HAS CHANGED.'],
     ['سرور دوباره نصب شده یا حملهٔ مرد میانی در کار است. اثر انگشت را از راه دوم (کنسول، مستندات) بررسی کن و فقط بعد ورودی قدیمی را با ssh-keygen -R پاک کن.', 'Der Server wurde neu installiert oder es ist ein Man-in-the-Middle-Angriff. Fingerprint über einen zweiten Weg (Konsole, Dokumentation) prüfen und erst dann den alten Eintrag mit ssh-keygen -R entfernen.', 'The server was reinstalled or it is a man-in-the-middle attack. Verify the fingerprint through a second channel (console, documentation) and only then remove the old entry with ssh-keygen -R.']],
    [['RDP وصل نمی‌شود یا با خطای CredSSP قطع می‌شود.', 'RDP verbindet nicht oder bricht mit CredSSP-Fehler ab.', 'RDP does not connect or fails with a CredSSP error.'],
     ['Remote Desktop فعال است؟ قاعدهٔ فایروال، عضویت کاربر در Remote Desktop Users، NLA و سطح به‌روزرسانی هر دو طرف را بررسی کن؛ با Test-NetConnection -Port 3389 دسترسی را بسنج.', 'Ist Remotedesktop aktiviert? Firewall-Regel, Mitgliedschaft in Remotedesktopbenutzer, NLA und Patchstand beider Seiten prüfen; mit Test-NetConnection -Port 3389 die Erreichbarkeit messen.', 'Is Remote Desktop enabled? Check the firewall rule, membership in Remote Desktop Users, NLA and patch level on both sides; test reachability with Test-NetConnection -Port 3389.']]
  ],
  decide: [
    [['کلاینت OpenSSH یا PuTTY؟', 'OpenSSH-Client oder PuTTY?', 'OpenSSH client or PuTTY?'],
     ['کلاینت داخلی OpenSSH معمولاً کافی و قابل اسکریپت است؛ PuTTY برای نشست‌های ذخیره‌شده، کنسول سریال (Switch یا روتر با USB به سریال) و تیم‌هایی که آن را استاندارد کرده‌اند.', 'Der eingebaute OpenSSH-Client reicht meist und ist skriptbar; PuTTY für gespeicherte Sitzungen, serielle Konsole (Switch oder Router per USB-Seriell) und Teams, die es so standardisiert haben.', 'The built-in OpenSSH client is usually enough and scriptable; PuTTY for saved sessions, serial console (switch or router via USB-to-serial) and teams that standardised on it.']],
    [['RDP مستقیم یا از طریق Gateway و VPN؟', 'RDP direkt oder über Gateway und VPN?', 'RDP directly or via gateway and VPN?'],
     ['هرگز مستقیم از اینترنت؛ از طریق VPN یا RD Gateway با MFA. در داخل دسترسی را به شبکهٔ مدیریت یا Jump Host محدود کن.', 'Nie direkt aus dem Internet; über VPN oder RD-Gateway mit MFA. Intern den Zugriff auf Admin-Netz oder Jump-Host beschränken.', 'Never directly from the internet; via VPN or RD Gateway with MFA. Internally restrict access to the admin network or a jump host.']]
  ],
  pitfalls: [
    ['کلید خصوصی بدون Passphrase یا فرستادن آن با ایمیل و چت.', 'Privaten Schlüssel ohne Passphrase nutzen oder per E-Mail oder Chat weitergeben.', 'Using a private key without a passphrase or sending it by e-mail or chat.'],
    ['تأیید هشدار کلید میزبان بدون بررسی.', 'Die Hostkey-Warnung ungeprüft bestätigen.', 'Confirming the host key warning without checking.'],
    ['دادن کد پشتیبانی از راه دور به تماس‌گیرندهٔ ناشناس (کلاهبرداری «پشتیبانی مایکروسافت»).', 'Fernwartungscodes an unbekannte Anrufer geben (Betrugsmasche „Microsoft-Support“).', 'Giving remote support codes to unknown callers (“Microsoft support” scam).']
  ],
  iv: [
    [['ورود SSH با کلید را چطور راه‌اندازی می‌کنی؟', 'Wie richtest du eine schlüsselbasierte SSH-Anmeldung ein?', 'How do you set up key-based SSH login?'],
     ['ssh-keygen با ed25519 و Passphrase، کلید عمومی در authorized_keys، مجوزهای درست، آزمایش؛ بعد PasswordAuthentication no در sshd_config، در حالی که یک نشست کنسول باز است.', 'ssh-keygen mit ed25519 und Passphrase, öffentlichen Schlüssel in authorized_keys, Rechte prüfen, testen; danach PasswordAuthentication no in sshd_config, während eine Konsolensitzung offen bleibt.', 'ssh-keygen with ed25519 and a passphrase, public key into authorized_keys, check permissions, test; then PasswordAuthentication no in sshd_config while keeping a console session open.']],
    [['تماس‌گیرنده‌ای می‌خواهد از راه دور کمکش کنی. به چه چیزی توجه می‌کنی؟', 'Ein Anrufer möchte per Fernwartung Hilfe. Worauf achtest du?', 'A caller wants remote help. What do you pay attention to?'],
     ['هویت (تماس برگشتی با شمارهٔ شناخته‌شده یا تیکت)، رضایت، کاربر همه‌چیز را می‌بیند، رمز نمی‌خواهم، نشست را ثبت و پایان می‌دهم.', 'Identität (Rückruf über bekannte Nummer oder Ticket), Zustimmung, Benutzer sieht mit, keine Kennwörter abfragen, Sitzung dokumentieren und beenden.', 'Identity (call back on a known number or ticket), consent, the user watches, never ask for passwords, document and end the session.']],
    [['تونل SSH به چه دردی می‌خورد؟', 'Wozu dient ein SSH-Tunnel?', 'What is an SSH tunnel for?'],
     ['انتقال پورت محلی برای سرویس‌هایی که نباید مستقیم در دسترس باشند، رمزگذاری‌شده از طریق یک Jump Host.', 'Lokale Portweiterleitung für Dienste, die nicht direkt erreichbar sein sollen – verschlüsselt über einen Jump-Host.', 'Local port forwarding for services that should not be directly reachable – encrypted via a jump host.']]
  ],
  sources: [
    ['PuTTY (offizielle Seite)', 'https://www.chiark.greenend.org.uk/~sgtatham/putty/'],
    ['WinSCP – Introduction', 'https://winscp.net/eng/docs/introduction'],
    ['sshd_config(5) – Ubuntu Manpage', 'https://manpages.ubuntu.com/manpages/noble/man5/sshd_config.5.html'],
    ['Use Quick Assist to help users (Microsoft Learn)', 'https://learn.microsoft.com/en-us/windows/client-management/client-tools/quick-assist']
  ]
},

{
  id: 'tools-usbkit', part: 2,
  title: ['جعبه‌ابزار ادمین: فلش قابل بوت، بررسی Hash، عیب‌یابی سخت‌افزار و گاوصندوق رمز', 'Das Admin-Toolkit: bootfähiger USB-Stick, Hashprüfung, Hardware-Diagnose und Kennwortsafe', 'The admin toolkit: bootable USB stick, hash checks, hardware diagnostics and password safe'],
  goal: ['یک فلش ابزار بررسی‌شده با Ventoy (چند ISO) یا Rufus (یک ISO) بسازی، هر فایل را با SHA-256 کنترل کنی، مقادیر SMART و حسگرها را بخوانی و اطلاعات ورود را در KeePassXC نگه داری.', 'Du baust einen geprüften Werkzeug-Stick mit Ventoy (mehrere ISOs) oder Rufus (ein ISO), kontrollierst jede Datei per SHA-256, liest SMART-Werte und Sensoren aus und verwaltest Zugangsdaten in KeePassXC.', 'You build a verified tool stick with Ventoy (several ISOs) or Rufus (one ISO), check every file with SHA-256, read SMART values and sensors and keep credentials in KeePassXC.'],
  why: ['کنار رایانهٔ خراب، چیزی که همراهت داری مهم است: رسانهٔ نصب، لینوکس زنده، ابزار عیب‌یابی. یک ISO بررسی‌نشده یا ابزار از منبع مشکوک بدافزار را به شبکه می‌آورد.', 'Vor Ort am defekten PC zählt, was du dabeihast: Installationsmedium, Live-Linux, Diagnose. Ein ungeprüftes ISO oder ein Tool aus zweifelhafter Quelle bringt Malware ins Netz.', 'At a broken PC what you carry counts: installation media, live Linux, diagnostics. An unverified ISO or a tool from a dubious source brings malware into the network.'],
  know: [
    ['Ventoy یک بار روی فلش نصب می‌شود؛ بعد ISOها را فقط کپی می‌کنی و هنگام بوت از منو انتخاب می‌کنی. Rufus دقیقاً یک Image می‌نویسد و برای رسانهٔ نصب ویندوز مناسب است. هر دو هنگام آماده‌سازی فلش را پاک می‌کنند.', 'Ventoy wird einmal auf den Stick installiert; danach kopierst du ISOs einfach als Dateien und wählst sie beim Start im Menü. Rufus schreibt genau ein Image und eignet sich für Windows-Installationsmedien. Beide löschen den Stick beim Einrichten.', 'Ventoy is installed on the stick once; afterwards you simply copy ISOs as files and pick them from a boot menu. Rufus writes exactly one image and suits Windows installation media. Both wipe the stick during setup.'],
    ['یکپارچگی: Hash فایل دانلودشده را با مقدار منتشرشده توسط سازنده مقایسه کن: Get-FileHash فایل -Algorithm SHA256 در ویندوز یا sha256sum در لینوکس. بهتر است امضا (Authenticode یا GPG) را هم بررسی کنی. فقط از سایت سازنده دانلود کن.', 'Integrität: Den Hash des Downloads mit dem vom Hersteller veröffentlichten Wert vergleichen – Get-FileHash datei -Algorithm SHA256 unter Windows oder sha256sum unter Linux. Besser zusätzlich die Signatur prüfen (Authenticode, GPG). Nur von Herstellerseiten laden.', 'Integrity: compare the download’s hash with the value published by the vendor – Get-FileHash file -Algorithm SHA256 on Windows or sha256sum on Linux. Better also verify the signature (Authenticode, GPG). Only download from vendor sites.'],
    ['عیب‌یابی سخت‌افزار: CrystalDiskInfo وضعیت SMART (Good، Caution، Bad)، Reallocated Sectors و ساعات کار را نشان می‌دهد. HWiNFO حسگرها (دما، ولتاژ، فن) و جزئیات سخت‌افزار را نشان می‌دهد. در لینوکس: smartctl -a /dev/sda، lsblk و sensors.', 'Hardware-Diagnose: CrystalDiskInfo zeigt den SMART-Status (Gut, Vorsicht, Schlecht), Reallocated Sectors und Betriebsstunden. HWiNFO zeigt Sensoren (Temperaturen, Spannungen, Lüfter) und Hardwaredetails. Unter Linux: smartctl -a /dev/sda, lsblk und sensors.', 'Hardware diagnostics: CrystalDiskInfo shows the SMART status (Good, Caution, Bad), reallocated sectors and power-on hours. HWiNFO shows sensors (temperatures, voltages, fans) and hardware details. On Linux: smartctl -a /dev/sda, lsblk and sensors.'],
    ['حافظه و دیسک: برای صفحهٔ آبی، Windows Memory Diagnostic (mdsched.exe) یا Memtest86+ از روی فلش؛ chkdsk /scan؛ برای SSD ابزار سازنده.', 'Speicher und Datenträger: Bei Bluescreens die Windows-Speicherdiagnose (mdsched.exe) oder Memtest86+ vom Stick; chkdsk /scan; für SSDs das Herstellertool.', 'Memory and disks: for blue screens use Windows Memory Diagnostic (mdsched.exe) or Memtest86+ from the stick; chkdsk /scan; for SSDs the vendor tool.'],
    ['KeePassXC گاوصندوق رمز متن‌باز (KDBX) است: پایگاه داده با رمز اصلی قوی و در صورت نیاز فایل کلید، سازندهٔ رمز و TOTP. در شرکت راه‌حل تعیین‌شده (مثلاً مدیر رمز تیمی) معتبر است؛ پایگاه شخصی را با دسترسی‌های شرکت قاطی نکن.', 'KeePassXC ist ein Open-Source-Kennwortsafe (KDBX): Datenbank mit starkem Masterkennwort und bei Bedarf Schlüsseldatei, Kennwortgenerator und TOTP. Im Unternehmen gilt die vorgegebene Lösung (z. B. Team-Kennwortmanager); private Datenbank nie mit Firmenzugängen mischen.', 'KeePassXC is an open-source password safe (KDBX): a database with a strong master password and, if needed, a key file, password generator and TOTP. In companies the mandated solution applies (e.g. a team password manager); never mix a private database with company credentials.'],
    ['کمکی‌های دیگر: 7-Zip (آرشیو، باز کردن ISO و WIM)، Notepad++ یا VS Code (لاگ و اسکریپت)، BGInfo. اگر داده‌های مشتری یا ابزار با اطلاعات ورود روی فلش است، آن را با BitLocker To Go رمزگذاری کن.', 'Weitere Helfer: 7-Zip (Archive, ISO und WIM öffnen), Notepad++ oder VS Code (Logs, Skripte), BGInfo. Den Stick mit BitLocker To Go verschlüsseln, wenn Kundendaten oder Tools mit Zugangsdaten darauf liegen.', 'Other helpers: 7-Zip (archives, opening ISO and WIM), Notepad++ or VS Code (logs, scripts), BGInfo. Encrypt the stick with BitLocker To Go if customer data or tools with credentials are on it.']
  ],
  lab: {
    vm: 'Dein Windows-PC oder CL01 und ein leerer USB-Stick ab 16 GB (wird gelöscht)', shell: 'PowerShell',
    steps: [
      ['ISO اوبونتو سرور و فایل SHA256SUMS را از سایت رسمی Ubuntu دانلود کن.', 'SHA-256 را با فرمان مقایسه کن؛ فقط اگر یکسان بود ادامه بده.', 'Ventoy را روی فلش نصب کن (درایو درست را انتخاب کن!) و ISOها را روی بخش داده کپی کن؛ یا با Rufus یک Image بنویس.', 'یک رایانهٔ آزمایشی را از فلش بوت کن و منوی Ventoy را بررسی کن (در VirtualBox بوت از USB محدود است؛ آنجا خود ISO را آزمایش کن).', 'CrystalDiskInfo و HWiNFO یا فرمان‌های PowerShell را اجرا کن و وضعیت SMART، ساعات کار و دما را یادداشت کن.', 'در KeePassXC پایگاه «Admin-Toolkit» بساز و یک رمز تولیدشده برای یک حساب آزمایشگاه ذخیره کن.', 'فهرست محتوای فلش (نام، نسخه، Hash، تاریخ) را بنویس و فلش را در صورت امکان با BitLocker To Go رمزگذاری کن.'],
      ['Ubuntu-Server-ISO und die Datei SHA256SUMS von der offiziellen Ubuntu-Seite laden.', 'SHA-256 mit dem Befehl vergleichen; nur bei Übereinstimmung weitermachen.', 'Ventoy auf den Stick installieren (richtiges Laufwerk wählen!) und die ISOs auf die Datenpartition kopieren; alternativ mit Rufus ein Image schreiben.', 'Einen Testrechner vom Stick starten und das Ventoy-Menü prüfen (VirtualBox bootet nur eingeschränkt von USB; dort das ISO direkt testen).', 'CrystalDiskInfo und HWiNFO oder die PowerShell-Befehle ausführen und SMART-Status, Betriebsstunden und Temperatur notieren.', 'In KeePassXC die Datenbank „Admin-Toolkit“ anlegen und ein generiertes Kennwort für ein Lab-Konto speichern.', 'Inventar des Sticks (Name, Version, Hash, Datum) schreiben und den Stick wenn möglich mit BitLocker To Go verschlüsseln.'],
      ['Download the Ubuntu Server ISO and the SHA256SUMS file from the official Ubuntu site.', 'Compare SHA-256 with the command; only continue if they match.', 'Install Ventoy on the stick (choose the right drive!) and copy the ISOs to the data partition; alternatively write one image with Rufus.', 'Boot a test computer from the stick and check the Ventoy menu (VirtualBox boots from USB only with limits; test the ISO directly there).', 'Run CrystalDiskInfo and HWiNFO or the PowerShell commands and note SMART status, power-on hours and temperature.', 'Create the database “Admin-Toolkit” in KeePassXC and store a generated password for a lab account.', 'Write an inventory of the stick (name, version, hash, date) and encrypt the stick with BitLocker To Go if possible.']
    ],
    code: R`# Hash pruefen (Ubuntu Server 24.04, SHA256SUMS liegt im selben Ordner)
$dl  = "$env:USERPROFILE\Downloads"
$iso = Get-ChildItem "$dl\ubuntu-24.04*-live-server-amd64.iso" | Select-Object -First 1
$ist = (Get-FileHash $iso.FullName -Algorithm SHA256).Hash
$soll = ((Select-String -Path "$dl\SHA256SUMS" -SimpleMatch $iso.Name).Line -split ' ')[0]
"Ist:  $ist"
"Soll: $soll"
if ($ist -eq $soll) { 'OK: Hash stimmt' } else { 'STOP: Hash weicht ab - nicht verwenden' }

# Signatur heruntergeladener Programme pruefen
Get-ChildItem "$dl\*.exe", "$dl\*.msi" | Get-AuthenticodeSignature | Format-Table Path, Status -AutoSize

# SMART-Werte mit Windows-Bordmitteln (als Administrator)
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, HealthStatus, OperationalStatus
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object DeviceId, Temperature, Wear, ReadErrorsTotal, PowerOnHours

# Arbeitsspeichertest beim naechsten Neustart:   mdsched.exe
# Stick verschluesseln (Pro/Enterprise, Laufwerk E:):   manage-bde -on E: -Password
# Linux-Gegenstueck:   sha256sum -c SHA256SUMS --ignore-missing ;  sudo smartctl -a /dev/sda`,
    checks: [
      ['Hash محاسبه‌شده با مقدار سازنده یکسان است (خروجی OK: Hash stimmt).', 'منوی Ventoy ISOهای کپی‌شده را نشان می‌دهد (یا فلش Rufus بوت می‌شود).', 'وضعیت SMART، ساعات کار و دمای دیسک آزمایشی یادداشت شده است.', 'پایگاه KeePassXC با رمز اصلی و فهرست محتوای فلش با نسخه و Hash آماده است.'],
      ['Der berechnete Hash stimmt mit dem Herstellerwert überein (Ausgabe OK: Hash stimmt).', 'Das Ventoy-Menü listet die kopierten ISOs (oder der Rufus-Stick bootet).', 'SMART-Status, Betriebsstunden und Temperatur des Testdatenträgers sind notiert.', 'Die KeePassXC-Datenbank mit Masterkennwort und das Stick-Inventar mit Versionen und Hashes liegen vor.'],
      ['The computed hash matches the vendor value (output OK: Hash stimmt).', 'The Ventoy menu lists the copied ISOs (or the Rufus stick boots).', 'SMART status, power-on hours and temperature of the test disk are noted.', 'The KeePassXC database with master password and the stick inventory with versions and hashes are ready.']
    ]
  },
  trouble: [
    [['فلش بوت نمی‌شود یا در منوی بوت دیده نمی‌شود.', 'Der Stick bootet nicht oder erscheint nicht im Bootmenü.', 'The stick does not boot or does not appear in the boot menu.'],
     ['Secure Boot (در Ventoy یک بار کلید MOK را ثبت کن)، UEFI در برابر Legacy، کلید منوی بوت سازنده، پورت USB دیگر (USB 2.0). در Rufus برای UEFI طرح پارتیشن GPT را انتخاب کن.', 'Secure Boot (bei Ventoy einmalig den MOK-Schlüssel registrieren), UEFI gegenüber Legacy, Bootmenü-Taste des Herstellers, anderer USB-Port (USB 2.0). In Rufus für UEFI das Partitionsschema GPT wählen.', 'Secure Boot (with Ventoy enrol the MOK key once), UEFI versus legacy, the vendor’s boot menu key, another USB port (USB 2.0). In Rufus choose the GPT partition scheme for UEFI.']],
    [['Hash یکسان نیست.', 'Der Hash stimmt nicht.', 'The hash does not match.'],
     ['فایل را استفاده نکن. دوباره از سایت سازنده دانلود کن و Mirror یا Proxy را بررسی کن؛ اگر باز هم فرق داشت، تیم امنیت را خبر کن.', 'Datei nicht verwenden. Erneut von der Herstellerseite laden und Mirror oder Proxy prüfen; bei wiederholter Abweichung das Sicherheitsteam informieren.', 'Do not use the file. Download it again from the vendor site and check the mirror or proxy; if it still differs, inform the security team.']],
    [['CrystalDiskInfo وضعیت Caution نشان می‌دهد (Reallocated یا Pending Sectors).', 'CrystalDiskInfo zeigt „Vorsicht“ (Reallocated oder Pending Sectors).', 'CrystalDiskInfo shows “Caution” (reallocated or pending sectors).'],
     ['فوراً پشتیبان بگیر، تعویض دیسک را برنامه‌ریزی و در تیکت ثبت کن. روی دیسک در حال خرابی یکپارچه‌سازی یا آزمون طولانی اجرا نکن.', 'Sofort sichern, Austausch des Datenträgers planen und im Ticket dokumentieren. Auf einer sterbenden Platte nicht defragmentieren und keine langen Tests laufen lassen.', 'Back up immediately, plan the disk replacement and document it in the ticket. Do not defragment or run long tests on a dying disk.']]
  ],
  decide: [
    [['Ventoy یا Rufus؟', 'Ventoy oder Rufus?', 'Ventoy or Rufus?'],
     ['Ventoy برای فلش چندابزاری با ISOهای زیاد؛ Rufus وقتی یک رسانه باید دقیقاً به روش سازنده ساخته شود یا Ventoy روی دستگاهی بوت نمی‌شود.', 'Ventoy für einen Multitool-Stick mit vielen ISOs; Rufus, wenn ein einzelnes Medium genau nach Herstellerweg entstehen soll oder Ventoy auf einem Gerät nicht bootet.', 'Ventoy for a multi-tool stick with many ISOs; Rufus when a single medium must be created exactly the vendor’s way or Ventoy does not boot on a device.']],
    [['ابزار شخصی یا جعبه‌ابزار شرکت؟', 'Private Tools oder Firmen-Toolkit?', 'Personal tools or company toolkit?'],
     ['در شرکت فقط ابزارهای تأییدشده از فهرست نرم‌افزار؛ جعبه‌ابزار خودت را قبلاً با امنیت IT هماهنگ و مستند کن.', 'Im Unternehmen nur freigegebene Werkzeuge aus der Softwareliste; ein eigenes Toolkit vorher mit der IT-Sicherheit abstimmen und dokumentieren.', 'In a company only approved tools from the software list; agree your own toolkit with IT security beforehand and document it.']]
  ],
  pitfalls: [
    ['ISO از سایت‌های واسطه بدون بررسی Hash.', 'ISOs von Drittseiten ohne Hashprüfung.', 'ISOs from third-party sites without a hash check.'],
    ['انتخاب درایو اشتباه در Rufus یا Ventoy؛ داده‌ها از بین می‌روند.', 'Den falschen Datenträger in Rufus oder Ventoy auswählen – Daten weg.', 'Selecting the wrong drive in Rufus or Ventoy – data gone.'],
    ['فلش رمزگذاری‌نشده با رمزها یا داده‌های مشتری.', 'Unverschlüsselter Stick mit Kennwörtern oder Kundendaten.', 'An unencrypted stick with passwords or customer data.']
  ],
  iv: [
    [['چطور مطمئن می‌شوی ISO دانلودشده دستکاری نشده است؟', 'Wie stellst du sicher, dass ein heruntergeladenes ISO nicht manipuliert ist?', 'How do you make sure a downloaded ISO has not been tampered with?'],
     ['از سایت سازنده دانلود می‌کنم، SHA-256 را با جمع کنترلی منتشرشده مقایسه می‌کنم و بهتر است امضا (GPG یا Authenticode) را هم بررسی کنم.', 'Von der Herstellerseite laden, SHA-256 mit der veröffentlichten Prüfsumme vergleichen und besser zusätzlich die Signatur (GPG oder Authenticode) prüfen.', 'Download from the vendor site, compare SHA-256 with the published checksum and ideally also verify the signature (GPG or Authenticode).']],
    [['لپ‌تاپی کند شده و صدای تق‌تق می‌دهد. اول چه چیزی را بررسی می‌کنی؟', 'Ein Laptop wird langsam und klickt. Was prüfst du zuerst?', 'A laptop gets slow and clicks. What do you check first?'],
     ['SMART (CrystalDiskInfo یا Get-PhysicalDisk)، بلافاصله پشتیبان‌گیری، تعویض دیسک و بعد نصب دوباره یا بازیابی.', 'SMART (CrystalDiskInfo oder Get-PhysicalDisk), sofort sichern, Datenträger tauschen, danach Neuinstallation oder Rücksicherung.', 'SMART (CrystalDiskInfo or Get-PhysicalDisk), back up immediately, replace the disk, then reinstall or restore.']],
    [['چه چیزهایی در فلش ادمین تو هست؟', 'Was gehört auf deinen Admin-USB-Stick?', 'What belongs on your admin USB stick?'],
     ['رسانهٔ نصب ویندوز و لینوکس، لینوکس زنده، آزمون حافظه، ابزار SMART و حسگر، Sysinternals، ابزارهای شبکه، همه بررسی‌شده با Hash، مستند و رمزگذاری‌شده.', 'Windows- und Linux-Installationsmedien, Live-Linux, Speichertest, SMART- und Sensorwerkzeuge, Sysinternals, Netzwerkwerkzeuge – alles per Hash geprüft, dokumentiert und verschlüsselt.', 'Windows and Linux installation media, live Linux, memory test, SMART and sensor tools, Sysinternals, network tools – all hash-checked, documented and encrypted.']]
  ],
  sources: [
    ['Get-FileHash (Microsoft Learn)', 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash'],
    ['Get-StorageReliabilityCounter (Microsoft Learn)', 'https://learn.microsoft.com/en-us/powershell/module/storage/get-storagereliabilitycounter'],
    ['smartctl(8) – Ubuntu Manpage', 'https://manpages.ubuntu.com/manpages/noble/man8/smartctl.8.html']
  ]
}

);
})();
