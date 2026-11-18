/* Arefi ITPraxis – zusätzliche Alltagsfälle im Support (Lücken aus Stellenanzeigen und Ticketstatistik). Gleiches Format wie work-data.js. */
window.LAB = window.LAB || {};
window.LAB.workJobs = window.LAB.workJobs || {};
window.LAB.workJobs.areas = Object.assign(window.LAB.workJobs.areas || {}, { data: { de: 'Daten', en: 'Data', fa: 'داده' } });
window.LAB.workCases = (window.LAB.workCases || []).concat([
{
 id: 'trust', area: 'account', fixArea: 'konto', prio: 3, roles: ['helpdesk', 'onsite', 'admin'], lessons: ['ad', 'dhcp'], ch: ['wscourse/ws-adds', 'wscourse/ws-auth'],
 cmd: '# als lokaler Admin (LAPS-Kennwort) am betroffenen PC\nw32tm /query /status\nTest-ComputerSecureChannel -Verbose\nTest-ComputerSecureChannel -Repair -Credential (Get-Credential CORP\\adm-helpdesk)\nRestart-Computer\n# Kontrolle am DC\nGet-ADComputer CL-0147 -Properties PasswordLastSet,LastLogonDate,Enabled',
 de: {
  t: 'Vertrauensstellung zur Domäne verloren',
  msg: '„Beim Anmelden steht: Die Vertrauensstellung zwischen dieser Arbeitsstation und der primären Domäne konnte nicht hergestellt werden. Gestern ging es noch.“',
  ask: ['Welcher PC genau (Inventarnummer oder Name auf dem Aufkleber)?', 'Wurde der PC neu aufgesetzt, aus einem Image oder Snapshot zurückgeholt oder war er lange ausgeschaltet?', 'Erscheint die Meldung auch bei anderen Benutzern an diesem PC?', 'Stimmen Datum und Uhrzeit unten rechts?'],
  steps: ['Mit dem lokalen Administrator anmelden; das Kennwort kommt aus LAPS, nicht aus einer Liste.', 'Uhrzeit prüfen: mehr als fünf Minuten Abweichung zum Domänencontroller bricht Kerberos. Zeit korrigieren und erneut testen.', 'Sicheren Kanal testen: Test-ComputerSecureChannel. False bedeutet, das Computerkennwort passt nicht mehr zum Konto in AD.', 'Mit einem Konto, das Computer reparieren darf, den Kanal reparieren (-Repair) und neu starten.', 'Geht die Reparatur nicht: in AD prüfen, ob das Computerkonto gelöscht oder doppelt vergeben ist. Dann PC aus der Domäne nehmen und wieder aufnehmen; das Benutzerprofil bleibt erhalten.', 'Nach dem Neustart mit dem Benutzerkonto anmelden und Netzlaufwerke und Gruppenrichtlinien prüfen.'],
  fix: 'Das Computerkennwort im PC passte nicht mehr zum Computerkonto in Active Directory, typisch nach dem Zurücksetzen auf einen alten Snapshot oder nach einem doppelt vergebenen Computernamen. Mit Test-ComputerSecureChannel -Repair wurde der Kanal neu aufgebaut.',
  verify: 'Test-ComputerSecureChannel liefert True, der Benutzer meldet sich an, gpresult /r zeigt die Domänenrichtlinien, Netzlaufwerke sind verbunden.',
  note: 'CL-0147 (Buchhaltung): Vertrauensstellung verloren nach Rücksetzung auf ein altes Image. Zeit korrekt. Secure Channel per Test-ComputerSecureChannel -Repair repariert, Neustart, Anmeldung und GPO geprüft. Gelöst.',
  say: '„Ihr PC hatte die Verbindung zur Firmenanmeldung verloren, weil er auf einen alten Stand zurückgesetzt wurde. Das ist repariert, Ihre Daten und Ihr Profil sind unverändert.“',
  esc: 'An die Systemadministration, wenn viele PCs gleichzeitig betroffen sind (Hinweis auf ein Problem am Domänencontroller oder bei der Zeitsynchronisation) oder das Computerkonto fehlt und du keine Rechte zum Neuaufnehmen hast.',
  boss: 'Erst Ursache und Umfang klären, dann reparieren. Kein Ausweg über einen gemeinsamen lokalen Admin mit bekanntem Kennwort – LAPS verwenden.'
 },
 en: {
  t: 'Trust relationship with the domain lost',
  msg: '"When I sign in it says: The trust relationship between this workstation and the primary domain failed. It worked yesterday."',
  ask: ['Which PC exactly (asset number or name on the label)?', 'Was the PC reinstalled, restored from an image or snapshot, or switched off for a long time?', 'Do other users on this PC get the same message?', 'Are date and time in the bottom corner correct?'],
  steps: ['Sign in with the local administrator; the password comes from LAPS, not from a list.', 'Check the time: more than five minutes difference to the domain controller breaks Kerberos. Correct the time and test again.', 'Test the secure channel with Test-ComputerSecureChannel. False means the computer password no longer matches the account in AD.', 'Repair the channel (-Repair) with an account allowed to repair computers, then restart.', 'If the repair fails: check in AD whether the computer account was deleted or the name is used twice. Then remove the PC from the domain and join it again; the user profile is kept.', 'After the restart sign in with the user account and check network drives and group policies.'],
  fix: 'The computer password on the PC no longer matched the computer account in Active Directory, typical after rolling back to an old snapshot or after a duplicate computer name. Test-ComputerSecureChannel -Repair re-established the channel.',
  verify: 'Test-ComputerSecureChannel returns True, the user signs in, gpresult /r shows the domain policies and network drives are connected.',
  note: 'CL-0147 (Accounting): trust lost after restore to an old image. Time correct. Secure channel repaired with Test-ComputerSecureChannel -Repair, restart, sign-in and GPO checked. Resolved.',
  say: '"Your PC had lost its connection to the company sign-in because it was reset to an old state. That is repaired; your data and profile are unchanged."',
  esc: 'To system administration if many PCs are affected at once (points to a domain controller or time sync problem) or if the computer account is missing and you lack the rights to rejoin it.',
  boss: 'Clarify cause and scope first, then repair. No shortcut via a shared local admin with a known password – use LAPS.'
 },
 fa: {
  t: 'از دست رفتن اعتماد (Trust) میان کامپیوتر و دامنه',
  msg: '«موقع ورود می‌نویسد: رابطهٔ اعتماد میان این ایستگاه کاری و دامنهٔ اصلی برقرار نشد. دیروز درست بود.»',
  ask: ['دقیقاً کدام کامپیوتر؟ شمارهٔ اموال یا نام روی برچسب.', 'کامپیوتر دوباره نصب شده، از Image یا Snapshot برگشته یا مدت زیادی خاموش بوده؟', 'کاربران دیگر هم روی همین کامپیوتر همین پیام را می‌بینند؟', 'تاریخ و ساعت گوشهٔ صفحه درست است؟'],
  steps: ['با حساب مدیر محلی وارد شو؛ گذرواژه را از LAPS بگیر، نه از یک فهرست.', 'ساعت را بررسی کن: اختلاف بیش از پنج دقیقه با کنترل‌کنندهٔ دامنه Kerberos را از کار می‌اندازد. ساعت را درست کن و دوباره آزمایش کن.', 'کانال امن را با Test-ComputerSecureChannel بیازما. False یعنی گذرواژهٔ کامپیوتر دیگر با حساب آن در AD یکی نیست.', 'با حسابی که اجازهٔ ترمیم کامپیوتر دارد، کانال را ترمیم کن (-Repair) و کامپیوتر را دوباره راه‌اندازی کن.', 'اگر ترمیم نشد: در AD ببین حساب کامپیوتر پاک شده یا نامش تکراری است. بعد کامپیوتر را از دامنه بیرون بیاور و دوباره عضو کن؛ پروفایل کاربر می‌ماند.', 'بعد از راه‌اندازی با حساب کاربر وارد شو و درایوهای شبکه و Group Policy را بررسی کن.'],
  fix: 'گذرواژهٔ داخلی کامپیوتر دیگر با حساب کامپیوتر در Active Directory یکی نبود؛ معمولاً بعد از برگرداندن Snapshot قدیمی یا نام تکراری. با Test-ComputerSecureChannel -Repair کانال دوباره ساخته شد.',
  verify: 'Test-ComputerSecureChannel مقدار True می‌دهد، کاربر وارد می‌شود، gpresult /r سیاست‌های دامنه را نشان می‌دهد و درایوهای شبکه وصل‌اند.',
  note: 'CL-0147 (حسابداری): اعتماد بعد از برگرداندن Image قدیمی از بین رفته بود. ساعت درست بود. کانال امن با Test-ComputerSecureChannel -Repair ترمیم شد، راه‌اندازی دوباره، ورود و GPO بررسی شد. حل شد.',
  say: '«کامپیوتر شما ارتباطش با سامانهٔ ورود شرکت را از دست داده بود، چون به یک وضعیت قدیمی برگشته بود. ترمیم شد و داده‌ها و پروفایل شما دست نخورده‌اند.»',
  esc: 'به ادمین سیستم، اگر چند کامپیوتر هم‌زمان گرفتارند (نشانهٔ مشکل کنترل‌کنندهٔ دامنه یا همگام‌سازی زمان) یا حساب کامپیوتر نیست و تو اجازهٔ عضو کردن دوباره را نداری.',
  boss: 'اول علت و دامنهٔ مشکل را روشن کن، بعد ترمیم کن. میان‌بُر با یک مدیر محلی مشترک و گذرواژهٔ معلوم ممنوع است؛ از LAPS استفاده کن.'
 }
},
{
 id: 'boot', area: 'device', fixArea: 'client', prio: 2, roles: ['helpdesk', 'onsite'], lessons: ['workstations', 'hardware'], ch: ['k-cli/cli-boot', 'k-cli/cli-hw'],
 cmd: 'REM in der Windows-Wiederherstellungsumgebung (WinRE), Eingabeaufforderung\nmanage-bde -status C:\nmanage-bde -unlock C: -RecoveryPassword 123456-...\nbcdedit /enum\nchkdsk C: /scan\nsfc /scannow /offbootdir=C:\\ /offwindir=C:\\Windows\nDISM /Image:C:\\ /Cleanup-Image /RestoreHealth',
 de: {
  t: 'PC startet nicht: Bluescreen oder Reparaturschleife',
  msg: '„Mein Laptop zeigt nur noch einen blauen Bildschirm, startet neu und landet wieder in ‚Automatische Reparatur‘. Ich brauche die Präsentation von heute Morgen!“',
  ask: ['Was steht wörtlich auf dem Bildschirm? Stoppcode bitte fotografieren.', 'Was war zuletzt anders: Update, neuer Treiber, Dockingstation, heruntergefallen?', 'Liegt die Präsentation lokal oder in OneDrive/SharePoint?', 'Hören Sie ungewöhnliche Geräusche oder ist das Gerät sehr heiß?'],
  steps: ['Arbeitsfähigkeit sichern: Liegt die Datei in OneDrive, kann der Benutzer sofort an einem Leihgerät weiterarbeiten.', 'Alle externen Geräte trennen (Dock, USB-Sticks, Kartenleser) und einmal neu starten.', 'BitLocker-Wiederherstellungsschlüssel aus Entra ID oder AD bereitlegen, bevor du in WinRE etwas änderst.', 'In WinRE der Reihe nach: Starthilfe, dann „Updates deinstallieren“ (neuestes Qualitätsupdate), dann Systemwiederherstellung.', 'Abgesicherter Modus: Startet er dort, ist meist ein Treiber oder Dienst schuld – zuletzt installierten Treiber zurücksetzen.', 'Datenträger prüfen: SMART-Werte oder Herstellerdiagnose. Meldet der Datenträger Fehler, zuerst Daten sichern, dann tauschen und neu bereitstellen.'],
  fix: 'Ein in der Nacht installierter Grafiktreiber verursachte den Stoppcode. Im abgesicherten Modus wurde der vorherige Treiber wiederhergestellt; die Datenträgerdiagnose war in Ordnung.',
  verify: 'Windows startet dreimal hintereinander normal, keine neuen kritischen Ereignisse (Kernel-Power 41, BugCheck 1001) in der Ereignisanzeige, Präsentation geöffnet.',
  note: 'NB-0312 (Vertrieb): Bluescreen-Schleife nach Treiberupdate. BitLocker-Schlüssel bereitgelegt, abgesicherter Modus, Grafiktreiber zurückgesetzt, Treiberupdate in Intune für das Modell pausiert. Benutzer arbeitete in der Zwischenzeit auf Leihgerät. Gelöst.',
  say: '„Ein neuer Grafiktreiber hat Ihren Laptop am Starten gehindert. Ich habe den alten Treiber zurückgeholt, Ihre Daten waren nie in Gefahr. Bis morgen bleibt das Update für Ihr Modell gesperrt.“',
  esc: 'An den Hardware-Service, wenn die Diagnose einen Defekt meldet (Datenträger, RAM, Mainboard); an die Clientverwaltung, wenn mehrere Geräte desselben Modells betroffen sind – dann das Update zentral stoppen.',
  boss: 'Zuerst die Arbeitsfähigkeit des Benutzers sichern, dann reparieren. Vor jedem Eingriff BitLocker-Schlüssel bereithalten und keine Daten riskieren.'
 },
 en: {
  t: 'PC will not start: blue screen or repair loop',
  msg: '"My laptop only shows a blue screen, restarts and ends up in Automatic Repair again. I need the presentation for this morning!"',
  ask: ['What exactly is on the screen? Please take a photo of the stop code.', 'What was different recently: update, new driver, docking station, dropped?', 'Is the presentation stored locally or in OneDrive/SharePoint?', 'Do you hear unusual noises or is the device very hot?'],
  steps: ['Keep the user working: if the file is in OneDrive, they can continue at once on a loan device.', 'Disconnect all external devices (dock, USB sticks, card readers) and restart once.', 'Have the BitLocker recovery key from Entra ID or AD ready before you change anything in WinRE.', 'In WinRE in this order: Startup Repair, then Uninstall Updates (latest quality update), then System Restore.', 'Safe mode: if it starts there, a driver or service is usually to blame – roll back the most recently installed driver.', 'Check the disk: SMART values or the vendor diagnostic. If the disk reports errors, back up data first, then replace and redeploy.'],
  fix: 'A graphics driver installed overnight caused the stop code. In safe mode the previous driver was restored; the disk diagnostic was fine.',
  verify: 'Windows starts normally three times in a row, no new critical events (Kernel-Power 41, BugCheck 1001) in Event Viewer, presentation opened.',
  note: 'NB-0312 (Sales): blue screen loop after driver update. BitLocker key ready, safe mode, graphics driver rolled back, driver update paused in Intune for this model. User worked on a loan device meanwhile. Resolved.',
  say: '"A new graphics driver stopped your laptop from starting. I restored the old driver; your data was never at risk. The update stays blocked for your model until tomorrow."',
  esc: 'To hardware service if the diagnostic reports a fault (disk, RAM, mainboard); to client management if several devices of the same model are affected – then stop the update centrally.',
  boss: 'First keep the user productive, then repair. Have the BitLocker key ready before any change and never risk data.'
 },
 fa: {
  t: 'کامپیوتر بالا نمی‌آید: صفحهٔ آبی یا چرخهٔ تعمیر',
  msg: '«لپ‌تاپم فقط صفحهٔ آبی نشان می‌دهد، دوباره راه می‌افتد و باز به «تعمیر خودکار» می‌رسد. ارائهٔ امروز صبح را لازم دارم!»',
  ask: ['دقیقاً چه چیزی روی صفحه نوشته شده؟ لطفاً از کد توقف (Stop Code) عکس بگیرید.', 'اخیراً چه چیزی عوض شده: به‌روزرسانی، درایور تازه، داک، افتادن دستگاه؟', 'فایل ارائه روی خود دستگاه است یا در OneDrive/SharePoint؟', 'صدای غیرعادی می‌شنوید یا دستگاه خیلی داغ است؟'],
  steps: ['اول کار کاربر را راه بینداز: اگر فایل در OneDrive است، همین الان با یک دستگاه امانی ادامه می‌دهد.', 'همهٔ دستگاه‌های بیرونی (داک، USB، کارت‌خوان) را جدا کن و یک بار دوباره راه‌اندازی کن.', 'پیش از هر تغییری در WinRE، کلید بازیابی BitLocker را از Entra ID یا AD آماده کن.', 'در WinRE به این ترتیب: Startup Repair، بعد حذف آخرین به‌روزرسانی کیفی، بعد System Restore.', 'حالت امن (Safe Mode): اگر در این حالت بالا آمد، معمولاً یک درایور یا سرویس مقصر است؛ آخرین درایور نصب‌شده را برگردان.', 'دیسک را بررسی کن: مقادیر SMART یا ابزار تشخیص سازنده. اگر دیسک خطا داد، اول از داده‌ها پشتیبان بگیر، بعد دیسک را عوض کن و دستگاه را دوباره آماده کن.'],
  fix: 'درایور گرافیکی که شب نصب شده بود کد توقف را ایجاد کرده بود. در حالت امن درایور قبلی برگردانده شد و بررسی دیسک مشکلی نشان نداد.',
  verify: 'ویندوز سه بار پشت سر هم عادی بالا می‌آید، رخداد بحرانی تازه (Kernel-Power 41، BugCheck 1001) در Event Viewer نیست و فایل ارائه باز شد.',
  note: 'NB-0312 (فروش): چرخهٔ صفحهٔ آبی بعد از به‌روزرسانی درایور. کلید BitLocker آماده شد، حالت امن، درایور گرافیک برگردانده شد و به‌روزرسانی درایور برای این مدل در Intune متوقف شد. کاربر در این مدت با دستگاه امانی کار کرد. حل شد.',
  say: '«یک درایور گرافیکی تازه نمی‌گذاشت لپ‌تاپ شما بالا بیاید. درایور قبلی را برگرداندم و داده‌هایتان هیچ وقت در خطر نبود. تا فردا این به‌روزرسانی برای مدل شما متوقف است.»',
  esc: 'به سرویس سخت‌افزار، اگر بررسی‌ها خرابی نشان داد (دیسک، RAM، مادربورد)؛ به تیم مدیریت کلاینت، اگر چند دستگاه از یک مدل گرفتارند تا به‌روزرسانی مرکزی متوقف شود.',
  boss: 'اول کار کاربر را راه بینداز، بعد تعمیر کن. پیش از هر کاری کلید BitLocker را داشته باش و داده‌ها را به خطر نینداز.'
 }
},
{
 id: 'diskfull', area: 'device', fixArea: 'client', prio: 4, roles: ['helpdesk', 'onsite'], lessons: ['workstations'], ch: ['k-cli/cli-perf', 'k-tools/tools-sysinternals'],
 cmd: 'Get-PSDrive C | Select-Object Used,Free\n# größte Ordner im Profil (nur lesen)\nGet-ChildItem $env:USERPROFILE -Directory | ForEach-Object {\n  [pscustomobject]@{ Ordner = $_.Name; GB = [math]::Round((Get-ChildItem $_.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1GB, 2) } } |\n  Sort-Object GB -Descending | Select-Object -First 8\nDism.exe /Online /Cleanup-Image /StartComponentCleanup',
 de: {
  t: 'Laufwerk C: ist voll',
  msg: '„Windows meldet, dass auf C: kein Speicher mehr frei ist. Outlook speichert nichts mehr und alles ist langsam.“',
  ask: ['Wie viel ist laut Explorer noch frei?', 'Speichern Sie große Dateien lokal, zum Beispiel Videos, Downloads oder Projektordner?', 'Ist OneDrive auf diesem Gerät eingerichtet?', 'Seit wann ist das so – nach einem Update oder einem großen Download?'],
  steps: ['Ist-Stand messen: freier Speicher auf C:. Unter 10 % wird Windows träge, Updates scheitern.', 'Größte Ordner finden, ohne etwas zu löschen (PowerShell-Abfrage oder ein Analysewerkzeug).', 'Gefahrlose Bereinigung zuerst: Speicheroptimierung, temporäre Dateien, Papierkorb, alte Update-Dateien über die Datenträgerbereinigung.', 'Benutzerdaten nie ohne Zustimmung löschen. Mit dem Benutzer klären: Downloads aufräumen, große Projektdaten nach OneDrive oder ins Netzlaufwerk verschieben.', 'OneDrive: „Speicherplatz freigeben“ für alte Ordner – die Dateien bleiben online verfügbar.', 'Niemals WinSxS oder Systemordner von Hand löschen. Komponentenspeicher nur mit DISM bereinigen.'],
  fix: 'Ein Ordner mit 48 GB Videoaufnahmen aus Teams-Besprechungen lag in Downloads. Nach Absprache in den Teams-Kanal hochgeladen und lokal entfernt, dazu Datenträgerbereinigung. Jetzt 61 GB frei.',
  verify: 'Mindestens 15 % frei, Outlook speichert wieder, Windows Update läuft durch. Speicheroptimierung ist aktiviert, damit es nicht wieder passiert.',
  note: 'NB-0288: C: zu 98 % belegt. Ursache 48 GB Videos in Downloads. Mit Benutzerin nach Teams verschoben, Datenträgerbereinigung, Speicheroptimierung aktiviert. Frei: 61 GB. Gelöst.',
  say: '„Ihr Laptop war mit Besprechungsvideos voll. Die Videos liegen jetzt im Teams-Kanal, wo das ganze Team sie findet. Windows räumt temporäre Dateien künftig selbst auf.“',
  esc: 'An die Clientverwaltung, wenn viele Geräte voll laufen (zu kleine Datenträger im Modell oder ein Programm schreibt Logdateien ohne Ende).',
  boss: 'Erst messen, dann aufräumen. Keine Benutzerdaten ohne Zustimmung löschen und keine Systemordner anfassen.'
 },
 en: {
  t: 'Drive C: is full',
  msg: '"Windows says there is no space left on C:. Outlook does not save anymore and everything is slow."',
  ask: ['How much is free according to Explorer?', 'Do you keep large files locally, such as videos, downloads or project folders?', 'Is OneDrive set up on this device?', 'Since when – after an update or a large download?'],
  steps: ['Measure first: free space on C:. Below 10 % Windows gets sluggish and updates fail.', 'Find the largest folders without deleting anything (PowerShell query or an analysis tool).', 'Safe clean-up first: Storage Sense, temporary files, recycle bin, old update files via Disk Clean-up.', 'Never delete user data without consent. Agree with the user: tidy Downloads, move large project data to OneDrive or the network drive.', 'OneDrive: “Free up space” for old folders – the files stay available online.', 'Never delete WinSxS or system folders by hand. Clean the component store only with DISM.'],
  fix: 'A 48 GB folder of Teams meeting recordings sat in Downloads. After agreement it was uploaded to the Teams channel and removed locally, plus Disk Clean-up. Now 61 GB free.',
  verify: 'At least 15 % free, Outlook saves again, Windows Update completes. Storage Sense is enabled so it does not happen again.',
  note: 'NB-0288: C: 98 % used. Cause 48 GB videos in Downloads. Moved to Teams with the user, Disk Clean-up, Storage Sense enabled. Free: 61 GB. Resolved.',
  say: '"Your laptop was full of meeting videos. They are now in the Teams channel where the whole team can find them. Windows will clean temporary files by itself from now on."',
  esc: 'To client management if many devices run full (disks too small in the model, or a program writes endless log files).',
  boss: 'Measure first, then clean up. Never delete user data without consent and do not touch system folders.'
 },
 fa: {
  t: 'درایو C: پر شده است',
  msg: '«ویندوز می‌گوید روی C: جایی نمانده. Outlook دیگر ذخیره نمی‌کند و همه‌چیز کند است.»',
  ask: ['در Explorer چقدر جای خالی نشان می‌دهد؟', 'فایل‌های بزرگ را روی خود دستگاه نگه می‌دارید، مثل ویدیو، دانلودها یا پوشهٔ پروژه؟', 'OneDrive روی این دستگاه راه‌اندازی شده؟', 'از کی این‌طور شده؟ بعد از به‌روزرسانی یا یک دانلود بزرگ؟'],
  steps: ['اول اندازه بگیر: فضای خالی C:. زیر ۱۰٪ ویندوز کند می‌شود و به‌روزرسانی‌ها شکست می‌خورند.', 'بزرگ‌ترین پوشه‌ها را بدون پاک کردن پیدا کن (با PowerShell یا یک ابزار تحلیل).', 'اول پاک‌سازی بی‌خطر: Storage Sense، فایل‌های موقت، سطل بازیافت و فایل‌های قدیمی به‌روزرسانی با Disk Clean-up.', 'دادهٔ کاربر را هرگز بدون اجازه پاک نکن. با کاربر هماهنگ کن: مرتب کردن Downloads و انتقال دادهٔ بزرگ پروژه به OneDrive یا درایو شبکه.', 'در OneDrive برای پوشه‌های قدیمی «آزاد کردن فضا» را بزن؛ فایل‌ها آنلاین در دسترس می‌مانند.', 'هرگز WinSxS یا پوشه‌های سیستمی را دستی پاک نکن. انبارهٔ اجزای ویندوز را فقط با DISM پاک‌سازی کن.'],
  fix: 'یک پوشهٔ ۴۸ گیگابایتی از ضبط جلسه‌های Teams در Downloads بود. با هماهنگی در کانال Teams بارگذاری و از دستگاه حذف شد، به‌اضافهٔ Disk Clean-up. حالا ۶۱ گیگابایت آزاد است.',
  verify: 'دست‌کم ۱۵٪ فضا آزاد است، Outlook دوباره ذخیره می‌کند و Windows Update کامل می‌شود. Storage Sense روشن است تا تکرار نشود.',
  note: 'NB-0288: درایو C: ۹۸٪ پر. علت ۴۸ گیگابایت ویدیو در Downloads. با کاربر به Teams منتقل شد، Disk Clean-up و Storage Sense فعال شد. فضای آزاد ۶۱ گیگابایت. حل شد.',
  say: '«لپ‌تاپ شما پر از ویدیوی جلسه‌ها بود. ویدیوها حالا در کانال Teams هستند و همهٔ تیم پیدایشان می‌کند. از این به بعد ویندوز فایل‌های موقت را خودش پاک می‌کند.»',
  esc: 'به تیم مدیریت کلاینت، اگر دستگاه‌های زیادی پر می‌شوند (دیسک این مدل کوچک است یا برنامه‌ای بی‌پایان لاگ می‌نویسد).',
  boss: 'اول اندازه بگیر، بعد مرتب کن. دادهٔ کاربر را بدون اجازه پاک نکن و به پوشه‌های سیستمی دست نزن.'
 }
},
{
 id: 'winupdate', area: 'device', fixArea: 'client', prio: 3, roles: ['helpdesk', 'onsite', 'admin'], lessons: ['change', 'workstations'], ch: ['k-cli/cli-perf', 'wscourse/ws-patch'],
 cmd: 'Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5\nGet-WinEvent -LogName Microsoft-Windows-WindowsUpdateClient/Operational -MaxEvents 20 |\n  Where-Object LevelDisplayName -ne Information | Format-Table TimeCreated,Id,Message -Wrap\nDISM /Online /Cleanup-Image /RestoreHealth\nsfc /scannow',
 de: {
  t: 'Windows-Update schlägt immer wieder fehl',
  msg: '„Seit zwei Wochen will mein PC jeden Abend ein Update installieren, bricht ab und macht alles rückgängig. Das dauert jedes Mal eine halbe Stunde.“',
  ask: ['Welcher Fehlercode steht im Updateverlauf (Einstellungen > Windows Update > Updateverlauf)?', 'Wie viel Speicher ist auf C: frei?', 'Läuft der PC über VPN oder lange im Akkubetrieb?', 'Ist er ein Firmengerät mit Intune oder WSUS?'],
  steps: ['Fehlercode und KB-Nummer notieren; mit dem Code findest du die Ursache gezielt statt zu raten.', 'Speicherplatz prüfen – zu wenig Platz ist die häufigste Ursache.', 'Verwaltetes Gerät: prüfen, ob andere Geräte im selben Ring dasselbe Update erfolgreich haben. Richtlinien nicht lokal umgehen.', 'Systemdateien reparieren: DISM /RestoreHealth, danach sfc /scannow.', 'Neustart, Update erneut über die normale Verwaltung anstoßen und das Ereignisprotokoll WindowsUpdateClient beobachten.', 'Scheitert es weiter: Ticket mit Fehlercode, Protokollauszug und Gerätemodell an die Clientverwaltung.'],
  fix: 'Beschädigte Komponentendateien ließen das kumulative Update scheitern. DISM /RestoreHealth hat sie aus Windows Update repariert, danach lief das Update durch.',
  verify: 'Updateverlauf zeigt „Erfolgreich installiert“, Gerät meldet in Intune den aktuellen Patchstand, kein Rollback mehr beim Neustart.',
  note: 'CL-0201: KB-Update scheiterte mit 0x800f0922, Rollback jede Nacht. Speicher ok. DISM RestoreHealth + sfc, Update erneut über Intune, erfolgreich. Patchstand aktuell. Gelöst.',
  say: '„Ein paar Windows-Dateien waren beschädigt, deshalb klappte das Update nicht. Das ist repariert und das Update ist jetzt drauf. Heute Abend wird nichts mehr rückgängig gemacht.“',
  esc: 'An die Clientverwaltung, wenn das Update auf vielen Geräten scheitert oder nach der Reparatur weiter fehlschlägt – dann gehört es in die zentrale Prüfung, eventuell mit Herstellerfall.',
  boss: 'Mit Fehlercode und Protokoll arbeiten, nicht mit Bauchgefühl. Sicherheitsupdates nicht dauerhaft blockieren, sondern das Gerät wieder in den normalen Patchprozess bringen.'
 },
 en: {
  t: 'Windows Update keeps failing',
  msg: '"For two weeks my PC tries to install an update every evening, fails and undoes everything. It takes half an hour each time."',
  ask: ['Which error code is in the update history (Settings > Windows Update > Update history)?', 'How much space is free on C:?', 'Does the PC run over VPN or on battery for long periods?', 'Is it a company device managed with Intune or WSUS?'],
  steps: ['Note the error code and KB number; the code points to the cause instead of guessing.', 'Check free space – too little space is the most common cause.', 'Managed device: check whether other devices in the same ring installed the update successfully. Do not bypass policies locally.', 'Repair system files: DISM /RestoreHealth, then sfc /scannow.', 'Restart, trigger the update again through normal management and watch the WindowsUpdateClient event log.', 'If it still fails: ticket with error code, log excerpt and device model to client management.'],
  fix: 'Corrupt component files made the cumulative update fail. DISM /RestoreHealth repaired them from Windows Update, after which the update completed.',
  verify: 'Update history shows “Successfully installed”, the device reports the current patch level in Intune, no more rollback on restart.',
  note: 'CL-0201: KB update failed with 0x800f0922, rollback every night. Space ok. DISM RestoreHealth + sfc, update re-triggered via Intune, successful. Patch level current. Resolved.',
  say: '"A few Windows files were damaged, so the update did not work. That is repaired and the update is now installed. Nothing will be rolled back tonight."',
  esc: 'To client management if the update fails on many devices or still fails after the repair – then it needs central analysis, possibly a vendor case.',
  boss: 'Work with error code and log, not gut feeling. Do not block security updates permanently; bring the device back into the normal patch process.'
 },
 fa: {
  t: 'Windows Update بارها شکست می‌خورد',
  msg: '«دو هفته است کامپیوترم هر شب می‌خواهد یک به‌روزرسانی نصب کند، شکست می‌خورد و همه را برمی‌گرداند. هر بار نیم ساعت طول می‌کشد.»',
  ask: ['در تاریخچهٔ به‌روزرسانی (Settings > Windows Update > Update history) چه کد خطایی نوشته؟', 'روی C: چقدر جای خالی هست؟', 'کامپیوتر از راه VPN یا مدت زیادی با باتری کار می‌کند؟', 'دستگاه شرکتی است که با Intune یا WSUS مدیریت می‌شود؟'],
  steps: ['کد خطا و شمارهٔ KB را بنویس؛ کد، علت را نشان می‌دهد و نیازی به حدس نیست.', 'فضای خالی را بررسی کن؛ کمبود جا رایج‌ترین علت است.', 'دستگاه مدیریت‌شده: ببین دستگاه‌های دیگرِ همان حلقه این به‌روزرسانی را موفق نصب کرده‌اند یا نه. سیاست‌ها را روی خود دستگاه دور نزن.', 'فایل‌های سیستمی را ترمیم کن: DISM /RestoreHealth و بعد sfc /scannow.', 'راه‌اندازی دوباره، به‌روزرسانی را از راه مدیریت عادی دوباره اجرا کن و لاگ WindowsUpdateClient را دنبال کن.', 'اگر باز هم شکست خورد: تیکت با کد خطا، بخشی از لاگ و مدل دستگاه به تیم مدیریت کلاینت.'],
  fix: 'فایل‌های خراب اجزای ویندوز باعث شکست به‌روزرسانی تجمعی بودند. DISM /RestoreHealth آن‌ها را از Windows Update ترمیم کرد و بعد به‌روزرسانی کامل شد.',
  verify: 'تاریخچه «با موفقیت نصب شد» را نشان می‌دهد، دستگاه در Intune سطح وصلهٔ فعلی را گزارش می‌کند و هنگام راه‌اندازی دیگر چیزی برنمی‌گردد.',
  note: 'CL-0201: به‌روزرسانی KB با خطای 0x800f0922 شکست می‌خورد و هر شب برمی‌گشت. فضا کافی بود. DISM RestoreHealth و sfc، به‌روزرسانی دوباره از Intune، موفق. سطح وصله به‌روز. حل شد.',
  say: '«چند فایل ویندوز خراب بود و به همین دلیل به‌روزرسانی انجام نمی‌شد. ترمیم شد و به‌روزرسانی نصب است. امشب دیگر چیزی برنمی‌گردد.»',
  esc: 'به تیم مدیریت کلاینت، اگر به‌روزرسانی روی دستگاه‌های زیادی شکست می‌خورد یا بعد از ترمیم هم نصب نمی‌شود؛ آن وقت باید مرکزی بررسی شود، شاید با پرونده نزد سازنده.',
  boss: 'با کد خطا و لاگ کار کن، نه با حس. به‌روزرسانی امنیتی را برای همیشه نبند؛ دستگاه را به روند عادی وصله‌گذاری برگردان.'
 }
},
{
 id: 'mobile', area: 'm365', fixArea: 'mail', prio: 3, roles: ['helpdesk', 'onsite'], lessons: ['delegation'], ch: ['k-m365/m365-intune', 'k-m365/m365-mfa'],
 cmd: '# Microsoft Graph PowerShell, nur lesen\nConnect-MgGraph -Scopes "UserAuthenticationMethod.Read.All","DeviceManagementManagedDevices.Read.All"\nGet-MgUserAuthenticationMethod -UserId lena.weber@firma.de | Select-Object Id,AdditionalProperties\nGet-MgDeviceManagementManagedDevice -Filter "userPrincipalName eq \'lena.weber@firma.de\'" |\n  Select-Object DeviceName,OperatingSystem,ComplianceState,LastSyncDateTime',
 de: {
  t: 'Neues Firmenhandy: keine E-Mails, MFA auf dem alten Gerät',
  msg: '„Ich habe ein neues Diensthandy bekommen. Outlook zeigt keine Mails, Teams will eine Bestätigung von der Authenticator-App – aber die ist auf dem alten Handy, das ich schon abgegeben habe.“',
  ask: ['Ist das alte Handy wirklich abgegeben oder noch erreichbar?', 'Wurde das neue Handy über das Unternehmensportal (Intune) eingerichtet?', 'Welche Meldung zeigt Outlook genau?', 'Haben Sie eine zweite Anmeldemethode, z. B. Telefonnummer per SMS?'],
  steps: ['Identität nach Firmenregel prüfen – das Zurücksetzen von MFA ist sicherheitskritisch.', 'Altes Gerät im Admincenter als verloren/abgegeben behandeln: aus der Geräteliste entfernen, Firmendaten löschen (Selektives Löschen).', 'Anmeldemethoden des Benutzers prüfen; als Admin eine neue Registrierung erzwingen oder einen befristeten Zugriffspass (Temporary Access Pass) ausstellen.', 'Benutzer registriert die Authenticator-App auf dem neuen Gerät neu.', 'Unternehmensportal öffnen, Gerät registrieren, warten bis es „konform“ ist – vorher blockiert der bedingte Zugriff Outlook.', 'Outlook und Teams neu anmelden und eine Testmail senden.'],
  fix: 'Die MFA-Methode hing am abgegebenen Gerät und das neue Handy war noch nicht in Intune registriert, daher blockierte der bedingte Zugriff. Befristeter Zugriffspass, neue Authenticator-Registrierung, Geräteregistrierung – danach konform.',
  verify: 'Neues Gerät ist in Intune „konform“, Outlook empfängt und sendet, Teams-Anmeldung mit MFA am neuen Gerät klappt, altes Gerät steht nicht mehr in den Anmeldemethoden.',
  note: 'L. Weber: Gerätewechsel. Identität per Rückruf bestätigt. Altes iPhone selektiv gelöscht und entfernt, TAP (60 min) ausgestellt, Authenticator neu registriert, neues Gerät über Unternehmensportal registriert (konform 10:42). Mail und Teams getestet. Gelöst.',
  say: '„Ihre Anmeldebestätigung war noch an Ihr altes Handy gebunden. Ich habe sie auf das neue übertragen und das Gerät für die Firma freigeschaltet. Bitte nutzen Sie ab jetzt nur noch die App auf dem neuen Handy.“',
  esc: 'An die IT-Sicherheit, wenn die Identität nicht sicher bestätigt werden kann oder ungewöhnliche Anmeldeversuche im Protokoll stehen.',
  boss: 'MFA nie auf Zuruf zurücksetzen. Altes Gerät immer bereinigen, damit keine Firmendaten auf einem abgegebenen Handy bleiben.'
 },
 en: {
  t: 'New company phone: no email, MFA still on the old device',
  msg: '"I got a new work phone. Outlook shows no mail and Teams wants a confirmation from the Authenticator app – but that is on the old phone, which I already handed in."',
  ask: ['Is the old phone really handed in or still reachable?', 'Was the new phone set up through the Company Portal (Intune)?', 'What exactly does Outlook show?', 'Do you have a second sign-in method, e.g. a phone number for SMS?'],
  steps: ['Verify identity according to company policy – resetting MFA is security-critical.', 'Treat the old device as lost/returned in the admin centre: remove it from the device list and wipe company data (selective wipe).', 'Check the user’s authentication methods; as admin require re-registration or issue a Temporary Access Pass.', 'The user registers the Authenticator app again on the new device.', 'Open the Company Portal, enrol the device and wait until it is “compliant” – until then Conditional Access blocks Outlook.', 'Sign in to Outlook and Teams again and send a test mail.'],
  fix: 'The MFA method was tied to the returned device and the new phone was not yet enrolled in Intune, so Conditional Access blocked it. Temporary Access Pass, new Authenticator registration, device enrolment – then compliant.',
  verify: 'The new device is “compliant” in Intune, Outlook sends and receives, Teams sign-in with MFA works on the new device, the old device is no longer an authentication method.',
  note: 'L. Weber: device swap. Identity confirmed by call-back. Old iPhone selectively wiped and removed, TAP (60 min) issued, Authenticator re-registered, new device enrolled via Company Portal (compliant 10:42). Mail and Teams tested. Resolved.',
  say: '"Your sign-in confirmation was still linked to your old phone. I moved it to the new one and approved the device for company use. Please use only the app on the new phone from now on."',
  esc: 'To IT security if identity cannot be confirmed reliably or the sign-in log shows unusual attempts.',
  boss: 'Never reset MFA on request alone. Always clean up the old device so no company data stays on a returned phone.'
 },
 fa: {
  t: 'گوشی تازهٔ شرکت: ایمیل نمی‌آید و MFA روی گوشی قدیمی است',
  msg: '«گوشی کاری تازه گرفته‌ام. Outlook هیچ ایمیلی نشان نمی‌دهد و Teams تأیید از برنامهٔ Authenticator می‌خواهد؛ ولی آن روی گوشی قدیمی است که تحویل داده‌ام.»',
  ask: ['گوشی قدیمی واقعاً تحویل داده شده یا هنوز در دسترس است؟', 'گوشی تازه از راه Company Portal (Intune) آماده شده؟', 'Outlook دقیقاً چه پیامی نشان می‌دهد؟', 'روش ورود دومی دارید، مثلاً شمارهٔ تلفن برای پیامک؟'],
  steps: ['هویت را طبق قانون شرکت تأیید کن؛ بازنشانی MFA از نظر امنیتی حساس است.', 'گوشی قدیمی را در مرکز مدیریت «گم‌شده یا تحویل‌شده» حساب کن: از فهرست دستگاه‌ها حذف و داده‌های شرکت را پاک کن (Selective Wipe).', 'روش‌های ورود کاربر را بررسی کن؛ به‌عنوان ادمین ثبت دوباره را الزامی کن یا یک گذر موقت (Temporary Access Pass) بده.', 'کاربر برنامهٔ Authenticator را روی گوشی تازه دوباره ثبت می‌کند.', 'Company Portal را باز کن، دستگاه را ثبت کن و صبر کن تا «سازگار» (compliant) شود؛ تا آن وقت Conditional Access جلوی Outlook را می‌گیرد.', 'در Outlook و Teams دوباره وارد شو و یک ایمیل آزمایشی بفرست.'],
  fix: 'روش MFA به گوشی تحویل‌شده بسته بود و گوشی تازه هنوز در Intune ثبت نشده بود، پس Conditional Access دسترسی را بسته بود. گذر موقت، ثبت تازهٔ Authenticator و ثبت دستگاه؛ بعد سازگار شد.',
  verify: 'دستگاه تازه در Intune «سازگار» است، Outlook می‌فرستد و می‌گیرد، ورود Teams با MFA روی گوشی تازه کار می‌کند و گوشی قدیمی دیگر در روش‌های ورود نیست.',
  note: 'L. Weber: تعویض گوشی. هویت با تماس برگشتی تأیید شد. iPhone قدیمی پاک‌سازی انتخابی و حذف شد، TAP (۶۰ دقیقه) صادر شد، Authenticator دوباره ثبت شد، دستگاه تازه از Company Portal ثبت شد (سازگار ۱۰:۴۲). ایمیل و Teams آزمایش شد. حل شد.',
  say: '«تأیید ورود شما هنوز به گوشی قدیمی بسته بود. آن را به گوشی تازه منتقل کردم و دستگاه را برای کار شرکت فعال کردم. لطفاً از این به بعد فقط برنامهٔ روی گوشی تازه را به کار ببرید.»',
  esc: 'به تیم امنیت IT، اگر هویت با اطمینان تأیید نمی‌شود یا در لاگ ورود تلاش‌های غیرعادی دیده می‌شود.',
  boss: 'MFA را هرگز فقط با درخواست تلفنی بازنشانی نکن. دستگاه قدیمی را همیشه پاک‌سازی کن تا دادهٔ شرکت روی گوشی تحویل‌شده نماند.'
 }
},
{
 id: 'rds', area: 'network', fixArea: 'fern', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['monitoring', 'operations'], ch: ['wscourse/ws-remote', 'k-cli/cli-remote'],
 cmd: 'Test-NetConnection rds01.corp.local -Port 3389\nqwinsta /server:rds01\n# hängende Sitzung des Benutzers abmelden (ID aus qwinsta)\nlogoff 5 /server:rds01\nGet-WinEvent -ComputerName rds01 -LogName Microsoft-Windows-TerminalServices-LocalSessionManager/Operational -MaxEvents 20',
 de: {
  t: 'Remotedesktop-Sitzung hängt oder Anmeldung schlägt fehl',
  msg: '„Wenn ich mich am Remotedesktop für das Warenwirtschaftsprogramm anmelde, bleibt der Bildschirm schwarz. Gestern ist mein Laptop mitten in der Sitzung ausgegangen.“',
  ask: ['Welche Verbindung genau (RDP-Datei, Webzugang, Citrix, Azure Virtual Desktop)?', 'Kommt eine Fehlermeldung oder nur ein schwarzes Bild?', 'Klappt es bei Kolleginnen gerade?', 'Arbeiten Sie im Büro oder über VPN von zu Hause?'],
  steps: ['Umfang klären: Geht es bei anderen, liegt das Problem an der Sitzung oder am Client dieses Benutzers.', 'Erreichbarkeit testen: Test-NetConnection auf Port 3389 bzw. das Gateway.', 'Sitzungen auf dem Sitzungshost anzeigen (qwinsta oder Server-Manager > Remotedesktopdienste). Eine „getrennte“ Sitzung des Benutzers hängt oft.', 'Benutzer vorwarnen: Nicht gespeicherte Arbeit in der alten Sitzung geht verloren. Dann die hängende Sitzung abmelden.', 'Neu verbinden. Klappt es nicht, Ereignisprotokoll LocalSessionManager und das Benutzerprofil (Profil-Datenträger) prüfen.', 'Bei vielen Betroffenen: Last, Lizenzen und Dienste auf dem Sitzungshost prüfen und eskalieren.'],
  fix: 'Nach dem Stromausfall des Laptops war die alte Sitzung auf dem Sitzungshost getrennt hängen geblieben und blockierte das Benutzerprofil. Sitzung abgemeldet, neue Anmeldung klappte sofort.',
  verify: 'Benutzer meldet sich an, Programm startet, qwinsta zeigt genau eine aktive Sitzung des Benutzers.',
  note: 'RDS01: Anmeldung von M. Kaya ergab schwarzen Bildschirm. Getrennte Sitzung ID 5 seit gestern, Profil gesperrt. Nach Rücksprache abgemeldet, neue Anmeldung ok. Empfehlung: Zeitlimit für getrennte Sitzungen per GPO auf 2 h. Gelöst.',
  say: '„Ihre alte Sitzung von gestern war auf dem Server hängen geblieben, weil der Laptop plötzlich aus war. Ich habe sie beendet, jetzt klappt die Anmeldung wieder.“',
  esc: 'An die Serveradministration, wenn mehrere Benutzer betroffen sind, der Sitzungshost überlastet ist oder Profil-Datenträger beschädigt sind.',
  boss: 'Vor dem Abmelden einer Sitzung immer fragen, ob ungesicherte Arbeit drin ist. Wiederkehrende Ursachen (Zeitlimits) dauerhaft lösen.'
 },
 en: {
  t: 'Remote Desktop session hangs or sign-in fails',
  msg: '"When I sign in to the remote desktop for the ERP program the screen stays black. Yesterday my laptop switched off in the middle of the session."',
  ask: ['Which connection exactly (RDP file, web access, Citrix, Azure Virtual Desktop)?', 'Is there an error message or only a black screen?', 'Does it work for colleagues right now?', 'Are you in the office or working from home over VPN?'],
  steps: ['Clarify scope: if it works for others, the problem is in this user’s session or client.', 'Test reachability: Test-NetConnection to port 3389 or the gateway.', 'List sessions on the session host (qwinsta or Server Manager > Remote Desktop Services). A “disconnected” session of the user often hangs.', 'Warn the user: unsaved work in the old session will be lost. Then log off the hanging session.', 'Reconnect. If it fails, check the LocalSessionManager event log and the user profile (profile disk).', 'If many are affected: check load, licences and services on the session host and escalate.'],
  fix: 'After the laptop lost power, the old session stayed disconnected on the session host and locked the user profile. Session logged off, new sign-in worked immediately.',
  verify: 'The user signs in, the program starts, qwinsta shows exactly one active session for the user.',
  note: 'RDS01: sign-in of M. Kaya gave a black screen. Disconnected session ID 5 since yesterday, profile locked. Logged off after agreement, new sign-in ok. Recommendation: time limit for disconnected sessions via GPO, 2 h. Resolved.',
  say: '"Your old session from yesterday was stuck on the server because the laptop switched off suddenly. I ended it, and signing in works again."',
  esc: 'To server administration if several users are affected, the session host is overloaded or profile disks are damaged.',
  boss: 'Before logging off a session always ask whether unsaved work is in it. Fix recurring causes (time limits) permanently.'
 },
 fa: {
  t: 'نشست Remote Desktop گیر کرده یا ورود شکست می‌خورد',
  msg: '«وقتی برای برنامهٔ انبار وارد Remote Desktop می‌شوم صفحه سیاه می‌ماند. دیروز لپ‌تاپم وسط نشست خاموش شد.»',
  ask: ['دقیقاً کدام اتصال؟ فایل RDP، دسترسی وب، Citrix یا Azure Virtual Desktop؟', 'پیام خطا می‌آید یا فقط صفحهٔ سیاه؟', 'همین حالا برای همکاران کار می‌کند؟', 'در دفتر هستید یا از خانه با VPN کار می‌کنید؟'],
  steps: ['دامنهٔ مشکل را روشن کن: اگر برای دیگران کار می‌کند، مشکل در نشست یا کلاینت همین کاربر است.', 'دسترسی را بیازما: Test-NetConnection روی پورت 3389 یا Gateway.', 'نشست‌های سرور نشست را ببین (qwinsta یا Server Manager > Remote Desktop Services). نشست «قطع‌شده»ٔ کاربر اغلب گیر کرده است.', 'به کاربر هشدار بده: کار ذخیره‌نشده در نشست قبلی از دست می‌رود. بعد نشست گیرکرده را خارج (log off) کن.', 'دوباره وصل شو. اگر نشد، لاگ LocalSessionManager و پروفایل کاربر (Profile Disk) را بررسی کن.', 'اگر افراد زیادی گرفتارند: بار، لایسنس و سرویس‌های سرور نشست را بررسی و ارجاع بده.'],
  fix: 'بعد از خاموش شدن ناگهانی لپ‌تاپ، نشست قبلی روی سرور در حالت قطع مانده و پروفایل کاربر را قفل کرده بود. نشست خارج شد و ورود تازه بلافاصله کار کرد.',
  verify: 'کاربر وارد می‌شود، برنامه باز می‌شود و qwinsta فقط یک نشست فعال برای کاربر نشان می‌دهد.',
  note: 'RDS01: ورود M. Kaya صفحهٔ سیاه داشت. نشست قطع‌شده با شناسهٔ ۵ از دیروز، پروفایل قفل. با هماهنگی خارج شد، ورود تازه درست بود. پیشنهاد: محدودیت زمانی نشست‌های قطع‌شده با GPO روی ۲ ساعت. حل شد.',
  say: '«نشست دیروزتان روی سرور گیر کرده بود، چون لپ‌تاپ ناگهان خاموش شده بود. آن را بستم و حالا ورود دوباره کار می‌کند.»',
  esc: 'به ادمین سرور، اگر چند کاربر گرفتارند، سرور نشست زیر بار زیاد است یا Profile Diskها خراب شده‌اند.',
  boss: 'پیش از بستن یک نشست همیشه بپرس که کار ذخیره‌نشده‌ای در آن هست یا نه. علت‌های تکراری (محدودیت زمانی) را برای همیشه حل کن.'
 }
},
{
 id: 'meetingroom', area: 'device', fixArea: 'hardware', prio: 2, roles: ['onsite', 'helpdesk'], lessons: ['hardware'], ch: ['k-cli/cli-periph'],
 cmd: '',
 de: {
  t: 'Besprechungsraum: Bildschirm zeigt nichts, kein Ton',
  msg: '„In fünf Minuten kommt der Kunde. Der große Bildschirm im Besprechungsraum zeigt ‚Kein Signal‘ und in Teams hört uns niemand!“',
  ask: ['Welcher Raum und welches Gerät: eigener Laptop, Raumsystem (Teams Room) oder Konferenzkamera?', 'Wie ist der Laptop verbunden: HDMI-Kabel, USB-C-Adapter, Dock oder drahtlos?', 'Hat es in diesem Raum heute schon jemand benutzt?', 'Sind Lautsprecher bzw. Konferenzmikrofon eingeschaltet (Licht an)?'],
  steps: ['Sofort hingehen oder per Telefon begleiten – Termin mit Kunden hat Vorrang (P2).', 'Bildschirm: richtige Quelle (Eingang HDMI 1/2) wählen, Kabel an beiden Enden fest, anderes Kabel aus dem Ersatzfach probieren.', 'Laptop: Win+P drücken und „Duplizieren“ wählen; bei USB-C prüfen, ob der Anschluss Bild ausgibt (Displaysymbol) oder einen anderen Port nehmen.', 'Ton in Teams: in den Geräteeinstellungen der Besprechung Lautsprecher und Mikrofon des Raumsystems auswählen, nicht die des Laptops.', 'Plan B nach zwei Minuten: Ersatzlaptop des Raums oder Teilnahme über einen zweiten Rechner, damit der Termin beginnen kann.', 'Danach Ursache klären (defekter Adapter, Firmware des Raumsystems) und Material ersetzen.'],
  fix: 'Der Bildschirm stand auf dem falschen Eingang, und Teams nutzte das Laptopmikrofon statt der Raumfreisprechanlage. Quelle umgestellt, Audiogerät in Teams gewählt.',
  verify: 'Bild und Ton funktionieren, Testsatz vom Kunden aus der Ferne bestätigt, Besprechung beginnt pünktlich.',
  note: 'Raum 2.14: kein Bild, kein Ton vor Kundentermin. Eingang HDMI 2 gewählt, Teams-Audio auf Raumfreisprechanlage umgestellt. Termin pünktlich gestartet. Beschriftung „HDMI 2 = Tischanschluss“ am Bildschirm angebracht. Gelöst.',
  say: '„Der Bildschirm war auf den falschen Eingang gestellt, und Teams hat das Laptopmikrofon benutzt. Beides ist umgestellt – Sie können anfangen. Viel Erfolg!“',
  esc: 'An den Medientechnik-Dienstleister, wenn Raumsystem, Kamera oder Bildschirm defekt sind; sofort Ersatzraum organisieren.',
  boss: 'Bei Kundenterminen zählt die Minute: erst Plan B, damit es losgeht, dann die gründliche Ursachenklärung. Wiederkehrende Fehler mit Beschriftung oder Anleitung im Raum verhindern.'
 },
 en: {
  t: 'Meeting room: display shows nothing, no sound',
  msg: '"The customer arrives in five minutes. The big screen in the meeting room says ‘No signal’ and nobody can hear us in Teams!"',
  ask: ['Which room and device: own laptop, room system (Teams Room) or conference camera?', 'How is the laptop connected: HDMI cable, USB-C adapter, dock or wireless?', 'Has anyone used this room successfully today?', 'Are the speakers or conference microphone switched on (light on)?'],
  steps: ['Go there at once or guide by phone – a customer meeting has priority (P2).', 'Display: select the right source (input HDMI 1/2), cable firm at both ends, try another cable from the spare box.', 'Laptop: press Win+P and choose “Duplicate”; with USB-C check that the port carries video (display icon) or use another port.', 'Sound in Teams: in the meeting device settings choose the room system’s speaker and microphone, not the laptop’s.', 'Plan B after two minutes: the room’s spare laptop or join from a second computer so the meeting can start.', 'Afterwards find the cause (faulty adapter, room system firmware) and replace material.'],
  fix: 'The display was on the wrong input and Teams used the laptop microphone instead of the room speakerphone. Source switched, audio device selected in Teams.',
  verify: 'Picture and sound work, a test sentence confirmed by the remote customer, the meeting starts on time.',
  note: 'Room 2.14: no picture, no sound before customer meeting. Input HDMI 2 selected, Teams audio set to the room speakerphone. Meeting started on time. Label “HDMI 2 = table connector” added to the display. Resolved.',
  say: '"The screen was on the wrong input and Teams was using the laptop microphone. Both are switched – you can start. Good luck!"',
  esc: 'To the AV service provider if the room system, camera or display is faulty; organise a replacement room immediately.',
  boss: 'For customer meetings every minute counts: Plan B first so it can start, then the thorough root cause. Prevent repeat faults with labels or a guide in the room.'
 },
 fa: {
  t: 'اتاق جلسه: نمایشگر تصویر ندارد و صدا نمی‌رود',
  msg: '«پنج دقیقهٔ دیگر مشتری می‌رسد. نمایشگر بزرگ اتاق جلسه «بدون سیگنال» نشان می‌دهد و در Teams کسی صدای ما را نمی‌شنود!»',
  ask: ['کدام اتاق و کدام دستگاه؟ لپ‌تاپ خودتان، سیستم اتاق (Teams Room) یا دوربین کنفرانس؟', 'لپ‌تاپ چطور وصل است؟ کابل HDMI، مبدل USB-C، داک یا بی‌سیم؟', 'امروز کسی در این اتاق موفق کار کرده؟', 'بلندگو یا میکروفون کنفرانس روشن است (چراغ دارد)؟'],
  steps: ['فوراً برو یا تلفنی همراهی کن؛ جلسه با مشتری اولویت دارد (P2).', 'نمایشگر: ورودی درست (HDMI 1/2) را انتخاب کن، کابل را در هر دو سر محکم کن و کابل دیگری از جعبهٔ یدکی امتحان کن.', 'لپ‌تاپ: Win+P را بزن و «Duplicate» را انتخاب کن؛ برای USB-C ببین پورت تصویر می‌دهد (نماد نمایشگر) یا پورت دیگری را امتحان کن.', 'صدا در Teams: در تنظیمات دستگاه جلسه، بلندگو و میکروفون سیستم اتاق را انتخاب کن، نه لپ‌تاپ را.', 'برنامهٔ جایگزین بعد از دو دقیقه: لپ‌تاپ یدکی اتاق یا ورود با کامپیوتر دوم تا جلسه شروع شود.', 'بعد علت را پیدا کن (مبدل خراب، Firmware سیستم اتاق) و وسیله را عوض کن.'],
  fix: 'نمایشگر روی ورودی اشتباه بود و Teams به‌جای بلندگوی کنفرانس اتاق از میکروفون لپ‌تاپ استفاده می‌کرد. ورودی عوض شد و دستگاه صدا در Teams انتخاب شد.',
  verify: 'تصویر و صدا کار می‌کنند، مشتریِ آنلاین یک جملهٔ آزمایشی را تأیید کرد و جلسه سر وقت شروع شد.',
  note: 'اتاق ۲.۱۴: بدون تصویر و صدا پیش از جلسهٔ مشتری. ورودی HDMI 2 انتخاب شد و صدای Teams روی بلندگوی کنفرانس اتاق رفت. جلسه سر وقت شروع شد. برچسب «HDMI 2 = اتصال روی میز» روی نمایشگر زده شد. حل شد.',
  say: '«نمایشگر روی ورودی اشتباه بود و Teams از میکروفون لپ‌تاپ استفاده می‌کرد. هر دو درست شد؛ می‌توانید شروع کنید. موفق باشید!»',
  esc: 'به شرکت خدمات صوتی و تصویری، اگر سیستم اتاق، دوربین یا نمایشگر خراب است؛ فوراً اتاق جایگزین فراهم کن.',
  boss: 'در جلسهٔ مشتری هر دقیقه مهم است: اول برنامهٔ جایگزین تا جلسه شروع شود، بعد علت را دقیق پیدا کن. با برچسب یا راهنمای داخل اتاق جلوی تکرار را بگیر.'
 }
},
{
 id: 'restore', area: 'data', fixArea: 'virt', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['recovery'], ch: ['k-infra/bak-restore', 'wscourse/ws-files', 'k-m365/m365-collab'],
 cmd: '# Schattenkopien auf dem Dateiserver anzeigen (Server)\nvssadmin list shadows /for=D:\n# Rechte prüfen, bevor wiederhergestellt wird\nGet-Acl "D:\\Daten\\Einkauf\\Preisliste-2027.xlsx" | Format-List Owner,AccessToString',
 de: {
  t: 'Datei gelöscht oder überschrieben – bitte wiederherstellen',
  msg: '„Ich habe aus Versehen die Preisliste mit einer alten Version überschrieben. Die Änderungen von gestern sind weg. Bekommt man das zurück?“',
  ask: ['Wo genau lag die Datei: Netzlaufwerk (Pfad), OneDrive, SharePoint/Teams oder nur lokal?', 'Wann war der letzte gute Stand ungefähr?', 'Haben andere seitdem weiter in der Datei gearbeitet?', 'Dürfen Sie diese Datei bearbeiten (Datenschutz, Abteilung)?'],
  steps: ['Ort und Zeitpunkt klären – davon hängt der Weg ab.', 'OneDrive/SharePoint: Versionsverlauf der Datei öffnen, passende Version wiederherstellen; gelöschte Dateien liegen im Papierkorb der Website (zwei Stufen).', 'Netzlaufwerk: Eigenschaften > Vorgängerversionen (Schattenkopien) – zuerst als Kopie wiederherstellen, nicht direkt überschreiben.', 'Nicht vorhanden: Wiederherstellung aus der Datensicherung beim Backup-Team anfragen, mit Pfad, Dateiname und Zeitpunkt.', 'Berechtigung prüfen: nur Personen mit Zugriff auf das Original bekommen die wiederhergestellte Version.', 'Benutzer vergleicht die Kopie und übernimmt sie selbst; danach alte Kopie aufräumen.'],
  fix: 'Die Datei lag auf dem Netzlaufwerk. In den Vorgängerversionen fand sich eine Schattenkopie von gestern 18:00; sie wurde als Kopie wiederhergestellt und von der Benutzerin übernommen.',
  verify: 'Die Benutzerin bestätigt, dass die Änderungen von gestern da sind. Rechte der Datei unverändert, keine doppelten Arbeitsstände mehr im Ordner.',
  note: 'S. Neumann (Einkauf): Preisliste-2027.xlsx überschrieben. Schattenkopie 17.11. 18:00 als Kopie wiederhergestellt, Benutzerin hat geprüft und übernommen, Kopie gelöscht. Hinweis: Versionsverlauf nach Umzug nach SharePoint verfügbar. Gelöst.',
  say: '„Gute Nachricht: Der Stand von gestern Abend war gesichert. Ich habe ihn als Kopie daneben gelegt, damit Sie vergleichen können. Wenn alles passt, löschen wir die Kopie wieder.“',
  esc: 'An das Backup-Team, wenn keine Version oder Schattenkopie vorhanden ist, die Datei sehr alt ist oder viele Dateien betroffen sind (dann auch an Ransomware denken!).',
  boss: 'Nie direkt überschreiben, immer zuerst als Kopie wiederherstellen. Rechte beachten. Bei vielen verschwundenen oder veränderten Dateien sofort Sicherheitsvorfall prüfen.'
 },
 en: {
  t: 'File deleted or overwritten – please restore',
  msg: '"I accidentally overwrote the price list with an old version. Yesterday’s changes are gone. Can we get them back?"',
  ask: ['Where exactly was the file: network drive (path), OneDrive, SharePoint/Teams or only local?', 'Roughly when was the last good version?', 'Have others continued working in the file since then?', 'Are you allowed to edit this file (data protection, department)?'],
  steps: ['Clarify location and time – the way to restore depends on them.', 'OneDrive/SharePoint: open the file’s version history and restore the right version; deleted files are in the site recycle bin (two stages).', 'Network drive: Properties > Previous Versions (shadow copies) – restore as a copy first, do not overwrite directly.', 'Not available: request a restore from backup from the backup team with path, file name and time.', 'Check permissions: only people with access to the original get the restored version.', 'The user compares the copy and takes it over; then clean up the old copy.'],
  fix: 'The file was on the network drive. Previous Versions had a shadow copy from yesterday 18:00; it was restored as a copy and taken over by the user.',
  verify: 'The user confirms yesterday’s changes are there. File permissions unchanged, no duplicate working copies left in the folder.',
  note: 'S. Neumann (Purchasing): Preisliste-2027.xlsx overwritten. Shadow copy 17 Nov 18:00 restored as a copy, user checked and took it over, copy deleted. Note: version history available after the move to SharePoint. Resolved.',
  say: '"Good news: yesterday evening’s version was saved. I put it next to the file as a copy so you can compare. If everything is right, we delete the copy again."',
  esc: 'To the backup team if there is no version or shadow copy, the file is very old or many files are affected (then also think of ransomware!).',
  boss: 'Never overwrite directly; always restore as a copy first. Respect permissions. If many files vanished or changed, check for a security incident at once.'
 },
 fa: {
  t: 'فایل پاک یا رونویسی شده؛ لطفاً برگردانید',
  msg: '«اشتباهی فهرست قیمت را با یک نسخهٔ قدیمی رونویسی کردم. تغییرات دیروز رفته. می‌شود برگرداند؟»',
  ask: ['فایل دقیقاً کجا بود: درایو شبکه (مسیر)، OneDrive، SharePoint/Teams یا فقط روی دستگاه؟', 'آخرین وضعیت درست تقریباً کی بود؟', 'از آن وقت دیگران هم در فایل کار کرده‌اند؟', 'اجازهٔ ویرایش این فایل را دارید (حفاظت داده، بخش)؟'],
  steps: ['جا و زمان را روشن کن؛ راه بازگردانی به این دو بستگی دارد.', 'OneDrive/SharePoint: تاریخچهٔ نسخه‌های فایل را باز کن و نسخهٔ درست را برگردان؛ فایل‌های پاک‌شده در سطل بازیافت سایت هستند (دو مرحله).', 'درایو شبکه: Properties > Previous Versions (Shadow Copy)؛ اول به‌صورت رونوشت برگردان، نه رونویسی مستقیم.', 'اگر نبود: بازگردانی از پشتیبان را از تیم Backup بخواه، با مسیر، نام فایل و زمان.', 'دسترسی را بررسی کن: فقط کسانی که به فایل اصلی دسترسی دارند نسخهٔ برگشتی را می‌گیرند.', 'کاربر رونوشت را مقایسه و خودش جایگزین می‌کند؛ بعد رونوشت اضافه را پاک کن.'],
  fix: 'فایل روی درایو شبکه بود. در Previous Versions یک Shadow Copy از دیروز ساعت ۱۸ بود؛ به‌صورت رونوشت برگردانده شد و کاربر آن را جایگزین کرد.',
  verify: 'کاربر تأیید می‌کند که تغییرات دیروز هست. دسترسی فایل همان است و نسخهٔ تکراری در پوشه نمانده.',
  note: 'S. Neumann (خرید): Preisliste-2027.xlsx رونویسی شده بود. Shadow Copy ۱۷ نوامبر ساعت ۱۸ به‌صورت رونوشت برگردانده شد، کاربر بررسی و جایگزین کرد و رونوشت پاک شد. یادداشت: بعد از انتقال به SharePoint تاریخچهٔ نسخه‌ها در دسترس خواهد بود. حل شد.',
  say: '«خبر خوب: وضعیت دیشب ذخیره شده بود. آن را به‌صورت رونوشت کنار فایل گذاشتم تا مقایسه کنید. اگر همه‌چیز درست بود، رونوشت را پاک می‌کنیم.»',
  esc: 'به تیم Backup، اگر نسخه یا Shadow Copy نیست، فایل خیلی قدیمی است یا فایل‌های زیادی گرفتارند (آن وقت به باج‌افزار هم فکر کن!).',
  boss: 'هرگز مستقیم رونویسی نکن؛ همیشه اول به‌صورت رونوشت برگردان. دسترسی‌ها را رعایت کن. اگر فایل‌های زیادی ناپدید یا عوض شده‌اند، فوراً احتمال رخداد امنیتی را بررسی کن.'
 }
},
{
 id: 'license', area: 'm365', fixArea: 'mail', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['identities'], ch: ['k-m365/m365-entra'],
 cmd: 'dsregcmd /status\n# Lizenzen des Benutzers (Microsoft Graph, nur lesen)\nConnect-MgGraph -Scopes "User.Read.All"\nGet-MgUserLicenseDetail -UserId jonas.berg@firma.de | Select-Object SkuPartNumber',
 de: {
  t: 'Office meldet „Nicht lizenziert“ oder „Kontoproblem“',
  msg: '„Word zeigt oben einen roten Balken: Nicht lizenziertes Produkt. Ich kann nichts mehr bearbeiten, nur noch lesen.“',
  ask: ['Mit welchem Konto ist Office angemeldet (Datei > Konto)? Firmenkonto oder privates Konto?', 'Ist das ein neues Gerät oder haben Sie kürzlich das Kennwort geändert?', 'Haben Kolleginnen dasselbe Problem?', 'Sind Sie gerade die Abteilung gewechselt oder neu im Team?'],
  steps: ['In Word unter Datei > Konto prüfen, welches Konto angemeldet ist – oft ist es ein privates Microsoft-Konto.', 'Im Admincenter die Lizenzen des Benutzers prüfen: Ist eine Lizenz mit Office-Apps zugewiesen (z. B. über eine Gruppe)?', 'Lizenz fehlt: nach Freigabeprozess zuweisen – meist über die passende Lizenzgruppe, nicht einzeln.', 'Lizenz vorhanden: in Office ab- und mit dem Firmenkonto anmelden; dsregcmd /status zeigt, ob das Gerät in Entra ID registriert ist.', 'Bleibt der Fehler, gespeicherte Anmeldedaten von Office in der Anmeldeinformationsverwaltung entfernen und Office neu starten.', 'Gilt es für viele Benutzer: Lizenzbestand prüfen (alle Lizenzen vergeben?) und eskalieren.'],
  fix: 'Beim Abteilungswechsel war der Benutzer aus der Gruppe entfernt worden, über die die Microsoft-365-Lizenz zugewiesen wird. Nach Freigabe der neuen Abteilungsleitung in die richtige Lizenzgruppe aufgenommen, Office neu angemeldet.',
  verify: 'Datei > Konto zeigt „Produkt aktiviert“ mit dem Firmenkonto, Bearbeiten funktioniert, Lizenz im Admincenter sichtbar.',
  note: 'J. Berg: Office nicht lizenziert nach Wechsel Vertrieb > Marketing. Ursache: aus Lizenzgruppe GRP-M365-E3 entfernt. Freigabe Leitung Marketing liegt vor, Gruppe ergänzt, Office neu angemeldet. Hinweis an HR-Prozess: Lizenzgruppe beim Wechsel mitbeachten. Gelöst.',
  say: '„Bei Ihrem Abteilungswechsel ist die Office-Lizenz verloren gegangen. Sie ist wieder zugewiesen; nach dem Neustart von Word können Sie normal arbeiten.“',
  esc: 'An die Lizenzverwaltung, wenn keine freien Lizenzen vorhanden sind oder die Freigabe für die Kosten fehlt.',
  boss: 'Lizenzen kosten Geld: nur mit Freigabe zuweisen und über Gruppen steuern. Ursache im Prozess (Abteilungswechsel) melden, damit es nicht wieder passiert.'
 },
 en: {
  t: 'Office says “Unlicensed product” or “Account problem”',
  msg: '"Word shows a red bar at the top: Unlicensed product. I can’t edit anything anymore, only read."',
  ask: ['Which account is signed in to Office (File > Account)? Company account or a private account?', 'Is this a new device or did you change your password recently?', 'Do colleagues have the same problem?', 'Have you just changed department or joined the team?'],
  steps: ['In Word under File > Account check which account is signed in – often it is a private Microsoft account.', 'In the admin centre check the user’s licences: is a licence with Office apps assigned (e.g. through a group)?', 'Licence missing: assign it following the approval process – usually through the right licence group, not individually.', 'Licence present: sign out of Office and sign in with the company account; dsregcmd /status shows whether the device is registered in Entra ID.', 'If the error remains, remove Office’s stored credentials in Credential Manager and restart Office.', 'If it affects many users: check licence stock (all licences used?) and escalate.'],
  fix: 'When changing department the user was removed from the group that assigns the Microsoft 365 licence. After approval by the new department head they were added to the right licence group and Office was signed in again.',
  verify: 'File > Account shows “Product activated” with the company account, editing works, licence visible in the admin centre.',
  note: 'J. Berg: Office unlicensed after moving Sales > Marketing. Cause: removed from licence group GRP-M365-E3. Approval from head of Marketing received, group added, Office signed in again. Note to HR process: include licence group when moving. Resolved.',
  say: '"Your Office licence was lost when you changed department. It is assigned again; after restarting Word you can work normally."',
  esc: 'To licence management if no free licences are left or approval for the cost is missing.',
  boss: 'Licences cost money: assign only with approval and control them through groups. Report the process cause (department change) so it does not happen again.'
 },
 fa: {
  t: 'Office پیام «بدون لایسنس» یا «مشکل حساب» می‌دهد',
  msg: '«بالای Word یک نوار قرمز هست: محصول بدون لایسنس. دیگر نمی‌توانم چیزی ویرایش کنم، فقط می‌خوانم.»',
  ask: ['Office با کدام حساب وارد شده (File > Account)؟ حساب شرکت یا حساب شخصی؟', 'دستگاه تازه است یا اخیراً گذرواژه را عوض کرده‌اید؟', 'همکاران هم همین مشکل را دارند؟', 'تازه بخش‌تان عوض شده یا تازه به تیم آمده‌اید؟'],
  steps: ['در Word در File > Account ببین کدام حساب وارد شده؛ اغلب یک حساب شخصی Microsoft است.', 'در مرکز مدیریت لایسنس‌های کاربر را بررسی کن: لایسنسی با برنامه‌های Office داده شده (مثلاً از راه یک گروه)؟', 'اگر لایسنس نیست: طبق روند تأیید بده؛ معمولاً با گروه لایسنس درست، نه تک‌به‌تک.', 'اگر لایسنس هست: از Office خارج شو و با حساب شرکت وارد شو؛ dsregcmd /status نشان می‌دهد دستگاه در Entra ID ثبت شده یا نه.', 'اگر خطا ماند، اطلاعات ورود ذخیره‌شدهٔ Office را در Credential Manager پاک کن و Office را دوباره باز کن.', 'اگر کاربران زیادی گرفتارند: موجودی لایسنس را ببین (همه مصرف شده؟) و ارجاع بده.'],
  fix: 'هنگام تغییر بخش، کاربر از گروهی که لایسنس Microsoft 365 را می‌دهد حذف شده بود. بعد از تأیید مدیر بخش تازه به گروه لایسنس درست اضافه شد و Office دوباره وارد شد.',
  verify: 'File > Account «محصول فعال شد» را با حساب شرکت نشان می‌دهد، ویرایش کار می‌کند و لایسنس در مرکز مدیریت دیده می‌شود.',
  note: 'J. Berg: Office بعد از انتقال از فروش به بازاریابی بدون لایسنس شد. علت: حذف از گروه GRP-M365-E3. تأیید مدیر بازاریابی رسید، به گروه اضافه شد و Office دوباره وارد شد. یادداشت برای روند منابع انسانی: هنگام جابه‌جایی گروه لایسنس را هم در نظر بگیرید. حل شد.',
  say: '«با تغییر بخش، لایسنس Office شما از دست رفته بود. دوباره داده شد؛ بعد از باز کردن دوبارهٔ Word عادی کار می‌کنید.»',
  esc: 'به مدیریت لایسنس، اگر لایسنس آزاد نمانده یا تأیید هزینه وجود ندارد.',
  boss: 'لایسنس هزینه دارد: فقط با تأیید بده و با گروه‌ها مدیریت کن. علت در روند (تغییر بخش) را گزارش بده تا تکرار نشود.'
 }
},
{
 id: 'scan', area: 'print', fixArea: 'druck', prio: 3, roles: ['onsite', 'helpdesk', 'admin'], lessons: ['printing-storage'], ch: ['k-ops/svc-print', 'k-m365/m365-exchange'],
 cmd: 'Test-NetConnection smtp.office365.com -Port 587\nTest-NetConnection fs01.corp.local -Port 445\nGet-SmbShare -CimSession fs01 -Name Scans | Get-SmbShareAccess\nGet-ADUser svc-scanner -Properties Enabled,LockedOut,PasswordExpired,PasswordLastSet',
 de: {
  t: 'Scannen in E-Mail oder in Ordner funktioniert nicht mehr',
  msg: '„Am Multifunktionsgerät im 2. Stock kommt beim Scannen ‚Senden fehlgeschlagen‘. Kopieren und Drucken gehen.“',
  ask: ['Scan an E-Mail oder in einen Netzwerkordner?', 'Welche Fehlernummer zeigt das Gerät?', 'Seit wann – wurde gestern etwas geändert (Kennwort, Server, Firewall)?', 'Betrifft es alle Benutzer an diesem Gerät?'],
  steps: ['Fehlercode am Gerät und im Sendeprotokoll (Weboberfläche des Geräts) lesen.', 'Scan an E-Mail: Erreicht das Gerät den Mailserver (Port 587)? Ist das Postfach bzw. Konto des Scanners aktiv, das Kennwort gültig, SMTP-Authentifizierung erlaubt?', 'Scan in Ordner: Freigabe und Rechte des Scankontos prüfen, Server per SMB erreichbar? Alte Geräte, die nur SMB1 können, nicht durch Einschalten von SMB1 „reparieren“.', 'Dienstkonto prüfen: gesperrt oder Kennwort abgelaufen? Kennwort nur nach Prozess ändern und im Gerät nachtragen.', 'Testscan an sich selbst bzw. in den Ordner, Ergebnis im Protokoll prüfen.', 'Dauerhafte Lösung dokumentieren: Kennwortablauf für Dienstkonten regeln, Firmware des Geräts aktuell halten.'],
  fix: 'Das Dienstkonto des Scanners war nach Ablauf des Kennworts gesperrt. Neues Kennwort nach Prozess gesetzt, im Gerät eingetragen; das Konto wird künftig als verwaltetes Dienstkonto ohne manuellen Ablauf geführt.',
  verify: 'Scan an E-Mail und in den Ordner Scans kommt an, Sendeprotokoll zeigt „OK“, andere Benutzer bestätigen.',
  note: 'MFP-2OG: Scan schlug fehl (Fehler 801). svc-scanner gesperrt, Kennwort abgelaufen. Kennwort nach Prozess gesetzt und im Gerät gespeichert, Ablaufregel für Dienstkonten angepasst (Change C-118). Testscans ok. Gelöst.',
  say: '„Das Konto, mit dem der Drucker Scans verschickt, war abgelaufen. Das ist erneuert, Scannen funktioniert wieder für alle.“',
  esc: 'An die Systemadministration, wenn Mailserver-Einstellungen (SMTP-Authentifizierung, Connector) oder Freigaben auf dem Server geändert werden müssen; an den Druckerdienstleister bei Hardware- oder Firmwarefehlern.',
  boss: 'Keine unsicheren Abkürzungen wie SMB1 oder Administratorkonten im Gerät. Wiederkehrende Ursache (Kennwortablauf) dauerhaft lösen.'
 },
 en: {
  t: 'Scan to email or scan to folder no longer works',
  msg: '"At the multifunction printer on the 2nd floor scanning says ‘Send failed’. Copying and printing work."',
  ask: ['Scan to email or to a network folder?', 'Which error number does the device show?', 'Since when – was anything changed yesterday (password, server, firewall)?', 'Does it affect all users at this device?'],
  steps: ['Read the error code on the device and in the send log (device web interface).', 'Scan to email: does the device reach the mail server (port 587)? Is the scanner’s mailbox or account active, the password valid, SMTP authentication allowed?', 'Scan to folder: check share and permissions of the scan account, server reachable via SMB? Do not “fix” old devices that only speak SMB1 by enabling SMB1.', 'Check the service account: locked or password expired? Change the password only through the process and update it in the device.', 'Test scan to yourself or to the folder, check the result in the log.', 'Document the permanent fix: rule for service account password expiry, keep device firmware current.'],
  fix: 'The scanner’s service account was locked after its password expired. A new password was set following the process and entered in the device; the account is now managed as a service account without manual expiry.',
  verify: 'Scan to email and to the Scans folder arrives, the send log shows “OK”, other users confirm.',
  note: 'MFP-2OG: scan failed (error 801). svc-scanner locked, password expired. Password set following the process and stored in the device, expiry rule for service accounts adjusted (change C-118). Test scans ok. Resolved.',
  say: '"The account the printer uses to send scans had expired. It is renewed and scanning works again for everyone."',
  esc: 'To system administration if mail server settings (SMTP authentication, connector) or server shares must change; to the printer service provider for hardware or firmware faults.',
  boss: 'No insecure shortcuts like SMB1 or admin accounts in the device. Fix the recurring cause (password expiry) permanently.'
 },
 fa: {
  t: 'اسکن به ایمیل یا پوشه دیگر کار نمی‌کند',
  msg: '«در دستگاه چندکارهٔ طبقهٔ دوم موقع اسکن «ارسال ناموفق» می‌آید. کپی و چاپ کار می‌کنند.»',
  ask: ['اسکن به ایمیل یا به پوشهٔ شبکه؟', 'دستگاه چه شمارهٔ خطایی نشان می‌دهد؟', 'از کی؟ دیروز چیزی عوض شده (گذرواژه، سرور، فایروال)؟', 'همهٔ کاربرانِ این دستگاه گرفتارند؟'],
  steps: ['کد خطا را روی دستگاه و در گزارش ارسال (رابط وب دستگاه) بخوان.', 'اسکن به ایمیل: دستگاه به سرور ایمیل (پورت 587) می‌رسد؟ صندوق یا حساب اسکنر فعال است، گذرواژه معتبر است و احراز هویت SMTP مجاز است؟', 'اسکن به پوشه: اشتراک و دسترسی حساب اسکن را بررسی کن؛ سرور از راه SMB در دسترس است؟ دستگاه‌های قدیمی که فقط SMB1 می‌فهمند را با روشن کردن SMB1 «درست» نکن.', 'حساب سرویس را بررسی کن: قفل شده یا گذرواژه‌اش منقضی شده؟ گذرواژه را فقط طبق روند عوض کن و در دستگاه هم وارد کن.', 'اسکن آزمایشی به خودت یا به پوشه بفرست و نتیجه را در گزارش ببین.', 'راه‌حل ماندگار را ثبت کن: قانون انقضای گذرواژهٔ حساب‌های سرویس و به‌روز نگه داشتن Firmware دستگاه.'],
  fix: 'حساب سرویس اسکنر بعد از انقضای گذرواژه قفل شده بود. گذرواژهٔ تازه طبق روند تعیین و در دستگاه وارد شد؛ از این به بعد این حساب به‌صورت حساب سرویس مدیریت‌شده و بدون انقضای دستی نگه‌داری می‌شود.',
  verify: 'اسکن به ایمیل و به پوشهٔ Scans می‌رسد، گزارش ارسال «OK» نشان می‌دهد و کاربران دیگر هم تأیید می‌کنند.',
  note: 'MFP-2OG: اسکن ناموفق (خطای ۸۰۱). svc-scanner قفل بود و گذرواژه منقضی شده بود. گذرواژه طبق روند تعیین و در دستگاه ذخیره شد، قانون انقضای حساب‌های سرویس اصلاح شد (Change C-118). اسکن‌های آزمایشی درست بود. حل شد.',
  say: '«حسابی که چاپگر با آن اسکن‌ها را می‌فرستد منقضی شده بود. تمدید شد و اسکن برای همه دوباره کار می‌کند.»',
  esc: 'به ادمین سیستم، اگر باید تنظیمات سرور ایمیل (احراز هویت SMTP، Connector) یا اشتراک‌های سرور عوض شود؛ به شرکت خدمات چاپگر برای خرابی سخت‌افزار یا Firmware.',
  boss: 'میان‌بُر ناامن مثل SMB1 یا حساب ادمین در دستگاه ممنوع است. علت تکراری (انقضای گذرواژه) را برای همیشه حل کن.'
 }
},
{
 id: 'usb', area: 'device', fixArea: 'hardware', prio: 4, roles: ['onsite', 'helpdesk'], lessons: ['hardware', 'workstations'], ch: ['k-cli/cli-periph', 'k-cli/cli-hw'],
 cmd: 'Get-PnpDevice -PresentOnly | Where-Object Status -ne "OK" | Select-Object Status,Class,FriendlyName\npnputil /scan-devices\nGet-PnpDevice -Class AudioEndpoint -PresentOnly | Select-Object Status,FriendlyName',
 de: {
  t: 'Headset oder USB-Gerät wird nicht erkannt',
  msg: '„Mein neues USB-Headset geht nicht. Windows macht ein Geräusch beim Einstecken, aber in Teams kann ich es nicht auswählen.“',
  ask: ['An welchem Anschluss steckt es: direkt am Laptop, am Dock oder an einem USB-Hub?', 'Funktioniert es an einem anderen Anschluss oder PC?', 'Ist es ein freigegebenes Firmengerät oder privat mitgebracht?', 'Zeigt Windows eine Meldung (z. B. „USB-Gerät nicht erkannt“)?'],
  steps: ['Direkt am Laptop einstecken, nicht über Hub oder Monitor-USB – das trennt Gerät und Dock.', 'Geräte-Manager oder Get-PnpDevice: Erscheint das Gerät mit Fehler (gelbes Dreieck)? Dann Hardwareerkennung erneut ausführen oder Treiber neu installieren.', 'Sound-Einstellungen: Ist das Headset als Ausgabe- und Eingabegerät vorhanden und nicht deaktiviert?', 'In Teams unter Einstellungen > Geräte das Headset auswählen und einen Testanruf machen.', 'Firmenrichtlinie beachten: Ist das Gerät durch eine Gerätesteuerung (USB-Sperre) blockiert, nicht selbst umgehen, sondern Freigabe beantragen.', 'Funktioniert es an keinem PC: Gerät defekt, Garantie oder Austausch.'],
  fix: 'Das Headset steckte am USB-Hub des Monitors, der zu wenig Strom lieferte. Direkt am Laptop erkannt, in Teams als Standardgerät gewählt.',
  verify: 'Testanruf in Teams: Benutzer hört sich selbst und das Mikrofon pegelt aus. Gerät ohne Fehler im Geräte-Manager.',
  note: 'NB-0277: USB-Headset nicht nutzbar. Am Monitor-Hub mit Stromproblem (Code 43). Direkt am Laptop angeschlossen, in Teams gewählt, Testanruf ok. Hinweis an Benutzer gegeben. Gelöst.',
  say: '„Der USB-Anschluss am Monitor liefert zu wenig Strom für Ihr Headset. Bitte stecken Sie es direkt am Laptop ein – dann klappt es, wie Sie gerade beim Testanruf gehört haben.“',
  esc: 'An die Clientverwaltung, wenn eine Gerätesteuerung das Gerät sperrt und eine Freigabe nötig ist, oder wenn viele Geräte nach einem Treiberupdate ausfallen.',
  boss: 'Systematisch eingrenzen (Gerät, Anschluss, Treiber, Programm) statt wahllos Treiber zu installieren. Sicherheitsrichtlinien für USB respektieren.'
 },
 en: {
  t: 'Headset or USB device not recognised',
  msg: '"My new USB headset does not work. Windows makes a sound when I plug it in, but I can’t select it in Teams."',
  ask: ['Which port is it in: directly on the laptop, on the dock or on a USB hub?', 'Does it work on another port or PC?', 'Is it an approved company device or brought from home?', 'Does Windows show a message (e.g. “USB device not recognised”)?'],
  steps: ['Plug it in directly on the laptop, not via hub or monitor USB – that separates device and dock.', 'Device Manager or Get-PnpDevice: does the device appear with an error (yellow triangle)? Then rescan hardware or reinstall the driver.', 'Sound settings: is the headset present as output and input device and not disabled?', 'In Teams under Settings > Devices select the headset and make a test call.', 'Respect company policy: if device control (USB lock) blocks it, do not bypass it yourself; request approval.', 'If it works on no PC: device faulty, warranty or replacement.'],
  fix: 'The headset was plugged into the monitor’s USB hub, which supplied too little power. Recognised directly on the laptop, selected as default device in Teams.',
  verify: 'Test call in Teams: the user hears themselves and the microphone level moves. Device without errors in Device Manager.',
  note: 'NB-0277: USB headset unusable. On monitor hub with power problem (code 43). Connected directly to laptop, selected in Teams, test call ok. User informed. Resolved.',
  say: '"The USB port on the monitor gives your headset too little power. Please plug it directly into the laptop – then it works, as you just heard in the test call."',
  esc: 'To client management if device control blocks the device and approval is needed, or if many devices fail after a driver update.',
  boss: 'Narrow down systematically (device, port, driver, program) instead of installing drivers at random. Respect USB security policies.'
 },
 fa: {
  t: 'هدست یا دستگاه USB شناخته نمی‌شود',
  msg: '«هدست USB تازه‌ام کار نمی‌کند. ویندوز موقع وصل کردن صدا می‌دهد، ولی در Teams نمی‌توانم انتخابش کنم.»',
  ask: ['به کدام درگاه وصل است: مستقیم به لپ‌تاپ، به داک یا به یک هاب USB؟', 'روی درگاه یا کامپیوتر دیگر کار می‌کند؟', 'دستگاه تأییدشدهٔ شرکت است یا از خانه آورده‌اید؟', 'ویندوز پیامی نشان می‌دهد (مثلاً «دستگاه USB شناخته نشد»)؟'],
  steps: ['مستقیم به لپ‌تاپ وصل کن، نه از راه هاب یا USB نمایشگر؛ این کار مشکل دستگاه را از مشکل داک جدا می‌کند.', 'Device Manager یا Get-PnpDevice: دستگاه با خطا (مثلث زرد) دیده می‌شود؟ سخت‌افزار را دوباره پویش کن یا درایور را دوباره نصب کن.', 'تنظیمات صدا: هدست به‌عنوان خروجی و ورودی هست و غیرفعال نیست؟', 'در Teams در Settings > Devices هدست را انتخاب کن و یک تماس آزمایشی بگیر.', 'قانون شرکت را رعایت کن: اگر کنترل دستگاه (قفل USB) جلویش را گرفته، خودت دور نزن؛ درخواست تأیید بده.', 'اگر روی هیچ کامپیوتری کار نکرد: دستگاه خراب است؛ گارانتی یا تعویض.'],
  fix: 'هدست به هاب USB نمایشگر وصل بود که برق کافی نمی‌داد. مستقیم روی لپ‌تاپ شناخته شد و در Teams دستگاه پیش‌فرض شد.',
  verify: 'تماس آزمایشی در Teams: کاربر صدای خودش را می‌شنود و نشانگر میکروفون حرکت می‌کند. دستگاه در Device Manager بدون خطاست.',
  note: 'NB-0277: هدست USB قابل استفاده نبود. روی هاب نمایشگر با مشکل برق (Code 43). مستقیم به لپ‌تاپ وصل شد، در Teams انتخاب شد و تماس آزمایشی درست بود. به کاربر توضیح داده شد. حل شد.',
  say: '«درگاه USB نمایشگر برای هدست شما برق کافی نمی‌دهد. لطفاً مستقیم به لپ‌تاپ وصلش کنید؛ همان‌طور که در تماس آزمایشی شنیدید، کار می‌کند.»',
  esc: 'به تیم مدیریت کلاینت، اگر کنترل دستگاه آن را بسته و تأیید لازم است، یا اگر دستگاه‌های زیادی بعد از به‌روزرسانی درایور از کار افتاده‌اند.',
  boss: 'منظم محدود کن (دستگاه، درگاه، درایور، برنامه) به‌جای نصب تصادفی درایور. سیاست‌های امنیتی USB را رعایت کن.'
 }
},
{
 id: 'cert', area: 'security', fixArea: 'sicher', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['access'], ch: ['wscourse/ws-pki', 'k-tools/tools-online-web'],
 cmd: 'w32tm /query /status\nTest-NetConnection intranet.corp.local -Port 443\n# Stammzertifikat der Firmen-CA vorhanden?\nGet-ChildItem Cert:\\LocalMachine\\Root | Where-Object Subject -like "*Corp Root CA*" | Select-Object Subject,NotAfter\ngpupdate /force',
 de: {
  t: 'Browser zeigt Zertifikatswarnung („Verbindung nicht sicher“)',
  msg: '„Wenn ich das Intranet öffne, kommt ‚Ihre Verbindung ist nicht privat‘. Kann ich einfach auf ‚Trotzdem fortfahren‘ klicken?“',
  ask: ['Welche Adresse genau (bitte aus der Adressleiste kopieren)?', 'Kommt die Warnung bei allen Seiten oder nur bei dieser einen?', 'Stimmen Datum und Uhrzeit am Gerät?', 'Sind Sie im Firmennetz, im Homeoffice mit VPN oder in einem öffentlichen WLAN?'],
  steps: ['Klare Regel an den Benutzer: Nicht „Trotzdem fortfahren“ klicken, bis die Ursache geklärt ist – die Warnung kann einen Angriff anzeigen.', 'Details der Warnung lesen: abgelaufen, falscher Name oder unbekannte Zertifizierungsstelle?', 'Uhrzeit prüfen: Eine falsche Systemzeit macht gültige Zertifikate ungültig.', 'Falscher Name: Wird die Seite per IP-Adresse oder Kurzname statt mit dem vollständigen Namen aufgerufen? Richtige Adresse oder Lesezeichen verwenden.', 'Unbekannte Stelle: Fehlt das Stammzertifikat der Firmen-CA (z. B. neues Gerät ohne Richtlinien)? gpupdate bzw. Intune-Synchronisierung auslösen.', 'Abgelaufenes Zertifikat auf dem Server oder Warnung auf externen Seiten in einem öffentlichen WLAN: an Serverteam bzw. IT-Sicherheit eskalieren.'],
  fix: 'Das neue Notebook hatte die Gruppenrichtlinien noch nicht erhalten, daher fehlte das Stammzertifikat der Firmen-CA. Nach gpupdate war das Zertifikat vorhanden und die Warnung verschwand.',
  verify: 'Intranet öffnet ohne Warnung, Schloss-Symbol zeigt die Firmen-CA als Aussteller, Zertifikat gültig bis 2028.',
  note: 'NB-0331 (neu): Zertifikatswarnung Intranet. Ursache: Stammzertifikat Corp Root CA fehlte, GPO noch nicht angewendet. gpupdate /force, Zertifikat vorhanden, Seite ohne Warnung. Benutzer über Regel „nicht wegklicken“ informiert. Gelöst.',
  say: '„Gut, dass Sie gefragt haben – solche Warnungen bitte nie einfach wegklicken. Bei Ihnen fehlte nur eine Einstellung auf dem neuen Laptop; jetzt ist die Seite sicher erreichbar.“',
  esc: 'Sofort an die IT-Sicherheit, wenn die Warnung bei bekannten externen Seiten (Bank, Microsoft) erscheint – möglicher Angriff im Netz. An das Serverteam, wenn das Serverzertifikat abgelaufen ist.',
  boss: 'Benutzer zu sicherem Verhalten anleiten: Zertifikatswarnungen sind kein Klickhindernis. Ursache finden, statt Ausnahmen im Browser einzurichten.'
 },
 en: {
  t: 'Browser shows a certificate warning (“Connection not secure”)',
  msg: '"When I open the intranet I get ‘Your connection is not private’. Can I just click ‘Continue anyway’?"',
  ask: ['Which address exactly (please copy it from the address bar)?', 'Does the warning appear on every site or only this one?', 'Are date and time on the device correct?', 'Are you on the company network, at home with VPN or on public Wi-Fi?'],
  steps: ['Clear rule for the user: do not click “Continue anyway” until the cause is known – the warning can indicate an attack.', 'Read the warning details: expired, wrong name or unknown certificate authority?', 'Check the time: a wrong system clock makes valid certificates invalid.', 'Wrong name: is the site opened by IP address or short name instead of the full name? Use the correct address or bookmark.', 'Unknown authority: is the company CA root certificate missing (e.g. new device without policies)? Trigger gpupdate or Intune sync.', 'Expired certificate on the server, or warnings on external sites on public Wi-Fi: escalate to the server team or IT security.'],
  fix: 'The new notebook had not yet received the group policies, so the company CA root certificate was missing. After gpupdate the certificate was present and the warning disappeared.',
  verify: 'The intranet opens without warning, the padlock shows the company CA as issuer, certificate valid until 2028.',
  note: 'NB-0331 (new): certificate warning intranet. Cause: Corp Root CA root certificate missing, GPO not yet applied. gpupdate /force, certificate present, site without warning. User informed of the rule “do not click away”. Resolved.',
  say: '"Good that you asked – please never just click such warnings away. Your new laptop was only missing a setting; now the site is reachable securely."',
  esc: 'Immediately to IT security if the warning appears on well-known external sites (bank, Microsoft) – possible attack on the network. To the server team if the server certificate has expired.',
  boss: 'Guide users to safe behaviour: certificate warnings are not a click obstacle. Find the cause instead of adding exceptions in the browser.'
 },
 fa: {
  t: 'مرورگر هشدار گواهی نشان می‌دهد («اتصال امن نیست»)',
  msg: '«وقتی اینترانت را باز می‌کنم، «اتصال شما خصوصی نیست» می‌آید. می‌توانم همین‌طوری «ادامه به هر حال» را بزنم؟»',
  ask: ['دقیقاً کدام نشانی؟ لطفاً از نوار نشانی کپی کنید.', 'هشدار برای همهٔ سایت‌ها می‌آید یا فقط همین یکی؟', 'تاریخ و ساعت دستگاه درست است؟', 'در شبکهٔ شرکت هستید، در خانه با VPN یا در یک WLAN عمومی؟'],
  steps: ['قانون روشن برای کاربر: تا علت معلوم نشده «ادامه به هر حال» را نزن؛ این هشدار ممکن است نشانهٔ حمله باشد.', 'جزئیات هشدار را بخوان: منقضی شده، نام اشتباه یا مرجع صدور ناشناس؟', 'ساعت را بررسی کن: ساعت نادرست سیستم، گواهی معتبر را نامعتبر نشان می‌دهد.', 'نام اشتباه: سایت با نشانی IP یا نام کوتاه باز شده، نه با نام کامل؟ نشانی یا نشانک درست را به کار ببر.', 'مرجع ناشناس: گواهی ریشهٔ CA شرکت نیست (مثلاً دستگاه تازه هنوز سیاست‌ها را نگرفته)؟ gpupdate یا همگام‌سازی Intune را اجرا کن.', 'اگر گواهی روی سرور منقضی شده یا در WLAN عمومی سایت‌های بیرونی هشدار می‌دهند: به تیم سرور یا امنیت IT ارجاع بده.'],
  fix: 'نوت‌بوک تازه هنوز Group Policyها را نگرفته بود و گواهی ریشهٔ CA شرکت را نداشت. بعد از gpupdate گواهی آمد و هشدار برطرف شد.',
  verify: 'اینترانت بدون هشدار باز می‌شود، نماد قفل CA شرکت را صادرکننده نشان می‌دهد و گواهی تا ۲۰۲۸ معتبر است.',
  note: 'NB-0331 (تازه): هشدار گواهی برای اینترانت. علت: گواهی ریشهٔ Corp Root CA نبود و GPO هنوز اعمال نشده بود. gpupdate /force، گواهی آمد و سایت بدون هشدار باز شد. قانون «هشدار را رد نکن» به کاربر گفته شد. حل شد.',
  say: '«خوب شد پرسیدید؛ لطفاً هیچ وقت چنین هشدارهایی را همین‌طوری رد نکنید. لپ‌تاپ تازهٔ شما فقط یک تنظیم کم داشت؛ حالا سایت امن باز می‌شود.»',
  esc: 'فوراً به امنیت IT، اگر هشدار برای سایت‌های شناختهٔ بیرونی (بانک، Microsoft) می‌آید؛ ممکن است در شبکه حمله باشد. به تیم سرور، اگر گواهی سرور منقضی شده است.',
  boss: 'کاربر را به رفتار امن راهنمایی کن: هشدار گواهی مانعی برای کلیک نیست. به‌جای ساختن استثنا در مرورگر، علت را پیدا کن.'
 }
}
]);
/* Querverweise der bestehenden Fälle auf die Kapitel des Lehrbuchs */
(() => {
 const CH = { password: ['wscourse/ws-adusers'], mfa: ['k-m365/m365-mfa'], onboarding: ['k-m365/m365-entra', 'wscourse/ws-adusers'], offboarding: ['k-m365/m365-entra'], outlook: ['k-m365/m365-exchange'], sharedmailbox: ['k-m365/m365-exchange'], 'teams-av': ['k-m365/m365-collab', 'k-cli/cli-periph'], onedrive: ['k-m365/m365-collab'], ndr: ['k-ops/svc-mail'], nonet: ['k-cli/cli-cabling', 'k-net/net-subnet'], netdrive: ['wscourse/ws-files', 'wscourse/ws-gpo'], vpn: ['k-net/net-vpn'], wlan: ['k-net/net-wlan'], slowpc: ['k-cli/cli-perf'], bitlocker: ['k-cli/cli-boot'], dock: ['k-cli/cli-periph'], software: ['k-cli/cli-deploy'], printer: ['k-ops/svc-print'], phishing: ['k-ops/sec-incident'], major: ['k-ops/ops-itil'] };
 window.LAB.workCases.forEach(c => { if (!c.ch && CH[c.id]) c.ch = CH[c.id]; });
})();
