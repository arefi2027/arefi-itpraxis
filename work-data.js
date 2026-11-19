/* Alltagsfälle im IT-Support · Teil 1: Konten und Identität */
(window.LAB.workCases = window.LAB.workCases || []).push(
{
 id: 'password', area: 'account', prio: 3, roles: ['helpdesk', 'onsite', 'admin', 'fisi'], lessons: ['identities', 'delegation'],
 cmd: 'Get-ADUser lena.weber -Properties Enabled,LockedOut,PasswordExpired,PasswordLastSet,LastBadPasswordAttempt |\n  Select-Object Name,Enabled,LockedOut,PasswordExpired,PasswordLastSet,LastBadPasswordAttempt\nUnlock-ADAccount -Identity lena.weber\nSet-ADAccountPassword -Identity lena.weber -Reset\nSet-ADUser -Identity lena.weber -ChangePasswordAtLogon $true\n# Wiederholte Sperren: Quelle auf dem PDC-Emulator suchen (Ereignis 4740)\nGet-WinEvent -ComputerName (Get-ADDomain).PDCEmulator -FilterHashtable @{LogName=\'Security\';Id=4740} -MaxEvents 20',
 de: {
  t: 'Kennwort vergessen oder Konto gesperrt',
  msg: '„Ich komme nicht mehr in Windows rein. Da steht, mein Konto ist gesperrt. Ich habe gleich ein Kundengespräch!“',
  ask: ['Wer genau ruft an? Benutzername, Abteilung, Rückrufnummer aus dem Telefonverzeichnis.', 'Welche Meldung erscheint wörtlich: „Kennwort falsch“, „Konto gesperrt“ oder „Kennwort abgelaufen“?', 'Haben Sie das Kennwort kürzlich geändert? Sind Handy, Tablet oder ein zweiter PC mit dem alten Kennwort angemeldet?'],
  steps: ['Identität nach Firmenregel prüfen (Rückruf über die bekannte Nummer, Vorgesetzte oder persönlich). Ein Kennwort wird nie auf bloßen Zuruf zurückgesetzt.', 'Kontostatus lesen: Enabled, LockedOut, PasswordExpired, PasswordLastSet.', 'Nur gesperrt und Kennwort bekannt: entsperren. Kennwort vergessen: Startkennwort setzen und Änderung bei der nächsten Anmeldung erzwingen.', 'Sperrt sich das Konto immer wieder: Ereignis 4740 auf dem PDC-Emulator lesen. Der Eintrag nennt den Computer, von dem die Fehlversuche kommen.', 'Mit dem Benutzer gemeinsam anmelden und das neue Kennwort setzen lassen.'],
  fix: 'Konto entsperrt beziehungsweise Startkennwort gesetzt. Bei wiederholten Sperren war meist ein altes Kennwort gespeichert: Mail-App am Handy, WLAN-Profil, gespeicherte Anmeldedaten in der Anmeldeinformationsverwaltung oder ein verbundenes Netzlaufwerk.',
  verify: 'Der Benutzer meldet sich selbst an. LockedOut ist False. Nach 30 Minuten ist das Konto nicht erneut gesperrt.',
  note: 'Anruf L. Weber (Einkauf), Identität per Rückruf 1234 bestätigt. Konto gesperrt, Quelle laut Ereignis 4740: Handy (ActiveSync) mit altem Kennwort. Konto entsperrt, Benutzer hat Kennwort am Handy aktualisiert. Anmeldung getestet, gelöst.',
  say: '„Ihr Konto ist wieder frei. Die Sperre kam von Ihrem Handy, das noch das alte Kennwort benutzt hat. Bitte tragen Sie dort das neue Kennwort ein, sonst sperrt es sich wieder.“',
  esc: 'An die IT-Sicherheit, wenn die Fehlversuche von einem unbekannten Gerät oder aus dem Internet kommen. Das kann ein Angriff sein.',
  boss: 'Sicherheit vor Tempo: Identität prüfen, kein Kennwort per E-Mail oder Chat senden, Ursache für wiederholte Sperren finden statt zehnmal zu entsperren.'
 },
 en: {
  t: 'Forgotten password or locked account',
  msg: '"I can\'t get into Windows. It says my account is locked. I have a customer meeting right now!"',
  ask: ['Who exactly is calling? Username, department, call-back number from the phone directory.', 'What does the message say word for word: "wrong password", "account locked" or "password expired"?', 'Did you change your password recently? Are a phone, tablet or second PC still signed in with the old password?'],
  steps: ['Verify identity according to company policy (call back on the known number, manager or in person). Never reset a password just because someone asks.', 'Read the account state: Enabled, LockedOut, PasswordExpired, PasswordLastSet.', 'Only locked and password known: unlock. Password forgotten: set a temporary password and force a change at next sign-in.', 'If the account keeps locking: read event 4740 on the PDC emulator. It names the computer the failed attempts come from.', 'Sign in together with the user and let them set the new password.'],
  fix: 'Account unlocked or temporary password set. Repeated lockouts were usually caused by a stored old password: mail app on the phone, Wi-Fi profile, saved credentials in Credential Manager or a mapped network drive.',
  verify: 'The user signs in by themselves. LockedOut is False. After 30 minutes the account is not locked again.',
  note: 'Call from L. Weber (Purchasing), identity confirmed by call-back to ext. 1234. Account locked, source per event 4740: phone (ActiveSync) with old password. Account unlocked, user updated password on phone. Sign-in tested, resolved.',
  say: '"Your account is unlocked again. The lock came from your phone, which was still using the old password. Please update it there, otherwise it will lock again."',
  esc: 'To IT security if the failed attempts come from an unknown device or from the internet. That can be an attack.',
  boss: 'Security before speed: verify identity, never send a password by email or chat, find the cause of repeated lockouts instead of unlocking ten times.'
 },
 fa: {
  t: 'فراموشی گذرواژه یا قفل شدن حساب',
  msg: '«نمی‌توانم وارد Windows شوم. نوشته حسابم قفل شده. همین الان جلسه با مشتری دارم!»',
  ask: ['دقیقاً چه کسی تماس گرفته؟ نام کاربری، بخش و شمارهٔ تماس از دفترچهٔ تلفن شرکت.', 'پیام دقیقاً چه می‌گوید: «گذرواژه اشتباه»، «حساب قفل شده» یا «گذرواژه منقضی شده»؟', 'اخیراً گذرواژه را عوض کرده‌اید؟ آیا گوشی، تبلت یا رایانهٔ دیگری هنوز با گذرواژهٔ قبلی وارد است؟'],
  steps: ['هویت را طبق قانون شرکت تأیید کن (تماس برگشتی به شمارهٔ ثبت‌شده، مدیر یا حضوری). گذرواژه را فقط به‌خاطر درخواست تلفنی ریست نکن.', 'وضعیت حساب را بخوان: Enabled، LockedOut، PasswordExpired و PasswordLastSet.', 'اگر فقط قفل است و کاربر گذرواژه را می‌داند: باز کن. اگر فراموش کرده: گذرواژهٔ موقت بگذار و تغییر در ورود بعدی را اجباری کن.', 'اگر حساب مدام قفل می‌شود: رویداد 4740 را روی PDC Emulator بخوان. این رویداد رایانه‌ای را که تلاش‌های ناموفق از آن می‌آید نشان می‌دهد.', 'همراه کاربر وارد شو و بگذار خودش گذرواژهٔ تازه را تعیین کند.'],
  fix: 'حساب باز شد یا گذرواژهٔ موقت تنظیم شد. قفل شدن تکراری معمولاً از گذرواژهٔ قدیمیِ ذخیره‌شده است: برنامهٔ ایمیل گوشی، پروفایل WLAN، اطلاعات ذخیره‌شده در Credential Manager یا درایو شبکهٔ متصل.',
  verify: 'کاربر خودش وارد می‌شود. LockedOut برابر False است و بعد از ۳۰ دقیقه حساب دوباره قفل نشده است.',
  note: 'تماس L. Weber (بخش خرید)، هویت با تماس برگشتی به داخلی 1234 تأیید شد. حساب قفل بود؛ منبع طبق رویداد 4740: گوشی (ActiveSync) با گذرواژهٔ قدیمی. حساب باز شد و کاربر گذرواژه را در گوشی به‌روز کرد. ورود آزمایش شد؛ حل شد.',
  say: '«حساب شما دوباره باز است. قفل از گوشی‌تان بود که هنوز گذرواژهٔ قبلی را استفاده می‌کرد. لطفاً آنجا گذرواژهٔ تازه را وارد کنید، وگرنه دوباره قفل می‌شود.»',
  esc: 'به تیم امنیت IT، اگر تلاش‌های ناموفق از دستگاه ناشناس یا از اینترنت می‌آیند؛ ممکن است حمله باشد.',
  boss: 'امنیت پیش از سرعت: هویت را بسنج، گذرواژه را با ایمیل یا چت نفرست و به‌جای ده بار باز کردن حساب، علت قفل شدن تکراری را پیدا کن.'
 }
},
{
 id: 'mfa', area: 'm365', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['delegation'],
 cmd: null,
 de: {
  t: 'Neues Handy: Microsoft-Authenticator fehlt (MFA)',
  msg: '„Ich habe ein neues Handy. Jetzt will Microsoft einen Code, aber die App ist weg. Ich komme nicht in Outlook und Teams.“',
  ask: ['Haben Sie das alte Handy noch? Ist es eingeschaltet und entsperrbar?', 'Gibt es eine zweite Methode, zum Beispiel SMS an eine hinterlegte Nummer?', 'Wie können wir Ihre Identität sicher prüfen (persönlich, Videoanruf mit Ausweis, Bestätigung durch Vorgesetzte)?'],
  steps: ['Identität streng prüfen. MFA-Zurücksetzen ist ein beliebtes Ziel von Betrügern am Telefon.', 'Im Microsoft Entra Admin Center: Benutzer → Authentifizierungsmethoden. Hinterlegte Methoden ansehen.', 'Altes Handy noch da: Benutzer meldet sich dort an und fügt unter mysignins.microsoft.com/security-info das neue Handy hinzu. Keine Admin-Änderung nötig.', 'Altes Handy weg: alte Authenticator-Methode löschen oder „Erneute Registrierung der MFA anfordern“. Falls freigegeben: einen befristeten Zugriffspass (Temporary Access Pass) ausstellen.', 'Anmeldeprotokolle des Benutzers auf verdächtige Anmeldungen prüfen.'],
  fix: 'Alte Methode entfernt, Benutzer hat den Authenticator auf dem neuen Handy registriert.',
  verify: 'Neue Anmeldung in Outlook und Teams mit Bestätigung im neuen Handy klappt. In der Methodenliste steht nur noch das neue Gerät.',
  note: 'MFA-Neuregistrierung für T. Klein. Identität per Videoanruf mit Dienstausweis geprüft. Alte Authenticator-Methode (altes Handy, verloren) gelöscht, TAP 60 Min. ausgestellt, Benutzer hat neues Handy registriert. Anmeldeprotokoll unauffällig.',
  say: '„Ich habe Ihr altes Handy aus der Anmeldung entfernt. Öffnen Sie bitte jetzt den Link, den ich Ihnen nenne, und richten Sie die App auf dem neuen Handy ein. Ich bleibe am Telefon.“',
  esc: 'An die IT-Sicherheit bei Anmeldungen aus fremden Ländern, bei unbekannten neuen Methoden oder wenn die Identität nicht sicher bestätigt werden kann.',
  boss: 'Du kennst Entra ID und MFA, prüfst Identität konsequent und hältst dich an den Prozess, auch wenn der Benutzer Druck macht.'
 },
 en: {
  t: 'New phone: Microsoft Authenticator missing (MFA)',
  msg: '"I have a new phone. Microsoft now wants a code but the app is gone. I can\'t get into Outlook or Teams."',
  ask: ['Do you still have the old phone? Is it on and can you unlock it?', 'Is there a second method, for example a text message to a registered number?', 'How can we verify your identity securely (in person, video call with ID, confirmation by your manager)?'],
  steps: ['Verify identity strictly. MFA resets are a favourite target of phone scammers.', 'In the Microsoft Entra admin center: Users → Authentication methods. Review the registered methods.', 'Old phone still available: the user signs in there and adds the new phone at mysignins.microsoft.com/security-info. No admin change needed.', 'Old phone gone: delete the old Authenticator method or "Require re-register MFA". If allowed: issue a Temporary Access Pass.', 'Check the user\'s sign-in logs for suspicious sign-ins.'],
  fix: 'Old method removed, user registered the Authenticator on the new phone.',
  verify: 'A new sign-in to Outlook and Teams with approval on the new phone works. The method list shows only the new device.',
  note: 'MFA re-registration for T. Klein. Identity verified by video call with staff ID. Old Authenticator method (old phone, lost) deleted, TAP issued for 60 min, user registered new phone. Sign-in log unremarkable.',
  say: '"I have removed your old phone from sign-in. Please open the link I give you now and set up the app on the new phone. I\'ll stay on the line."',
  esc: 'To IT security for sign-ins from unexpected countries, unknown new methods, or if identity cannot be confirmed reliably.',
  boss: 'You know Entra ID and MFA, verify identity consistently and follow the process even when the user puts pressure on you.'
 },
 fa: {
  t: 'گوشی تازه: Microsoft Authenticator نیست (MFA)',
  msg: '«گوشی‌ام را عوض کرده‌ام. حالا Microsoft کد می‌خواهد ولی برنامه نیست. نمی‌توانم وارد Outlook و Teams شوم.»',
  ask: ['گوشی قبلی هنوز هست؟ روشن است و قفلش را می‌توانید باز کنید؟', 'روش دومی دارید، مثلاً پیامک به شمارهٔ ثبت‌شده؟', 'هویت شما را چطور مطمئن بسنجیم (حضوری، تماس تصویری با کارت شناسایی یا تأیید مدیر)؟'],
  steps: ['هویت را سخت‌گیرانه بسنج. ریست MFA هدف محبوب کلاهبرداران تلفنی است.', 'در Microsoft Entra admin center: Users ← Authentication methods. روش‌های ثبت‌شده را ببین.', 'اگر گوشی قبلی هست: کاربر با آن وارد mysignins.microsoft.com/security-info می‌شود و گوشی تازه را اضافه می‌کند؛ تغییر مدیریتی لازم نیست.', 'اگر گوشی قبلی نیست: روش قدیمی Authenticator را حذف کن یا «Require re-register MFA» را بزن. اگر در شرکت مجاز است، Temporary Access Pass صادر کن.', 'Sign-in logs کاربر را برای ورودهای مشکوک بررسی کن.'],
  fix: 'روش قدیمی حذف شد و کاربر Authenticator را روی گوشی تازه ثبت کرد.',
  verify: 'ورود تازه به Outlook و Teams با تأیید روی گوشی تازه کار می‌کند و در فهرست روش‌ها فقط دستگاه تازه دیده می‌شود.',
  note: 'ثبت دوبارهٔ MFA برای T. Klein. هویت با تماس تصویری و کارت کارمندی تأیید شد. روش Authenticator گوشی گم‌شده حذف شد، TAP برای ۶۰ دقیقه صادر شد و کاربر گوشی تازه را ثبت کرد. Sign-in log مشکلی نشان نداد.',
  say: '«گوشی قبلی‌تان را از روش ورود حذف کردم. لطفاً لینکی را که می‌گویم باز کنید و برنامه را روی گوشی تازه نصب کنید. من پشت خط می‌مانم.»',
  esc: 'به تیم امنیت IT، اگر ورود از کشورهای غیرمنتظره، روش‌های ناشناختهٔ تازه یا ناتوانی در تأیید مطمئن هویت دیده شود.',
  boss: 'Entra ID و MFA را می‌شناسی، هویت را همیشه می‌سنجی و حتی وقتی کاربر فشار می‌آورد، از روند شرکت پیروی می‌کنی.'
 }
},
{
 id: 'onboarding', area: 'onboarding', prio: 4, roles: ['helpdesk', 'onsite', 'admin', 'fisi'], lessons: ['identities', 'automation', 'workstations'],
 cmd: 'New-ADUser -Name "Sara Neumann" -SamAccountName sara.neumann -UserPrincipalName sara.neumann@corp.example.test `\n  -Path "OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test" -Department "Vertrieb" -AccountPassword (Read-Host -AsSecureString "Startkennwort") `\n  -ChangePasswordAtLogon $true -Enabled $true\nAdd-ADGroupMember -Identity GG_Vertrieb -Members sara.neumann\n# Hybrid: Synchronisierung nach Entra ID anstoßen (auf dem Entra-Connect-Server)\nStart-ADSyncSyncCycle -PolicyType Delta',
 de: {
  t: 'Neue Mitarbeiterin ab Montag (Onboarding)',
  msg: 'Ticket aus der Personalabteilung: „Frau Neumann beginnt am Montag im Vertrieb. Bitte alles vorbereiten.“',
  ask: ['Liegt der Auftrag mit Freigabe vor (Name, Abteilung, Startdatum, Vorgesetzte, Kostenstelle)?', 'Welche Rolle genau? Welche Gruppen, Ordner, Programme und Lizenzen braucht sie, laut Rollenvorlage oder Vorgesetzter?', 'Welches Gerät (Notebook, Handy), welcher Arbeitsplatz, braucht sie VPN oder Telefon?'],
  steps: ['Konto im AD (oder Entra ID) mit Namensregel der Firma anlegen, in der richtigen OU, mit Startkennwort und Wechselpflicht.', 'Gruppen nach Rollenvorlage zuweisen. Nicht einfach alle Rechte eines Kollegen kopieren: Der hat oft alte Rechte, die sie nicht braucht.', 'Lizenz zuweisen (meist über eine Lizenzgruppe), Postfach und Teams entstehen danach automatisch. Bei Hybrid die Synchronisierung abwarten.', 'Notebook vorbereiten (Image oder Autopilot/Intune), Updates, Software, Drucker. Mit einem Testkonto prüfen, nicht mit dem Admin-Konto.', 'Übergabe am ersten Tag: Anmeldung, MFA einrichten, Kennwortregeln, wo es Hilfe gibt. Übergabe quittieren lassen.'],
  fix: 'Konto, Rechte, Lizenz, Postfach und Gerät sind am Starttag fertig und getestet.',
  verify: 'Am Montag meldet sich Frau Neumann an, öffnet Outlook, Teams und den Vertriebsordner. MFA ist registriert.',
  note: 'Onboarding S. Neumann, Vertrieb, Start 03.03. Auftrag HR #4711 mit Freigabe Fr. Berg. AD-Konto in OU Benutzer, Gruppen lt. Vorlage Vertrieb (GG_Vertrieb, GG_CRM), Lizenz über LIC_M365_BP. Notebook NB-0231 über Autopilot, Software lt. Liste, Testanmeldung ok. Übergabe 03.03. 08:30 erfolgt, quittiert.',
  say: '„Willkommen! Hier ist Ihr Notebook. Wir richten jetzt zusammen Ihre Anmeldung und die Authenticator-App ein. Bei Fragen erreichen Sie uns unter Durchwahl 999 oder im Ticketportal.“',
  esc: 'An Vorgesetzte oder Datenverantwortliche, wenn Rechte gewünscht werden, die nicht in der Rollenvorlage stehen. An den Einkauf, wenn kein Gerät verfügbar ist.',
  boss: 'Du arbeitest nach Checkliste, rechtzeitig vor dem Starttag, vergibst nur benötigte Rechte und testest als normaler Benutzer.'
 },
 en: {
  t: 'New employee starting Monday (onboarding)',
  msg: 'Ticket from HR: "Ms Neumann starts in Sales on Monday. Please prepare everything."',
  ask: ['Is there an approved request (name, department, start date, manager, cost centre)?', 'Which role exactly? Which groups, folders, applications and licences does she need, according to the role template or her manager?', 'Which device (laptop, phone), which desk, does she need VPN or a phone line?'],
  steps: ['Create the account in AD (or Entra ID) using the company naming rule, in the right OU, with a temporary password and forced change.', 'Assign groups according to the role template. Do not simply copy all rights of a colleague: they often hold old rights she does not need.', 'Assign the licence (usually via a licence group); mailbox and Teams are created afterwards. In hybrid setups wait for synchronisation.', 'Prepare the laptop (image or Autopilot/Intune), updates, software, printers. Test with a test account, not with the admin account.', 'Hand-over on day one: sign-in, MFA setup, password rules, where to get help. Get the hand-over signed.'],
  fix: 'Account, rights, licence, mailbox and device are ready and tested on the start date.',
  verify: 'On Monday Ms Neumann signs in, opens Outlook, Teams and the Sales folder. MFA is registered.',
  note: 'Onboarding S. Neumann, Sales, start 3 March. HR request #4711 approved by Ms Berg. AD account in OU Users, groups per Sales template (GG_Vertrieb, GG_CRM), licence via LIC_M365_BP. Laptop NB-0231 via Autopilot, software per list, test sign-in ok. Hand-over 3 March 08:30 done and signed.',
  say: '"Welcome! Here is your laptop. Let\'s set up your sign-in and the Authenticator app together now. If you have questions, reach us on extension 999 or in the ticket portal."',
  esc: 'To the manager or data owner if rights are requested that are not in the role template. To purchasing if no device is available.',
  boss: 'You work from a checklist, in time before the start date, grant only the rights needed and test as a normal user.'
 },
 fa: {
  t: 'همکار تازه از دوشنبه (Onboarding)',
  msg: 'تیکت از منابع انسانی: «خانم Neumann از دوشنبه در بخش فروش شروع می‌کند. لطفاً همه‌چیز را آماده کنید.»',
  ask: ['درخواست تأییدشده هست (نام، بخش، تاریخ شروع، مدیر، مرکز هزینه)؟', 'نقش دقیقاً چیست؟ طبق قالب نقش یا مدیر، چه گروه‌ها، پوشه‌ها، برنامه‌ها و لایسنس‌هایی لازم دارد؟', 'چه دستگاهی (لپ‌تاپ، گوشی)، کدام میز کار؟ VPN یا خط تلفن لازم است؟'],
  steps: ['حساب را در AD (یا Entra ID) طبق قانون نام‌گذاری شرکت، در OU درست، با گذرواژهٔ موقت و تغییر اجباری بساز.', 'گروه‌ها را طبق قالب نقش بده. همهٔ دسترسی‌های یک همکار را کپی نکن؛ او معمولاً دسترسی‌های قدیمی‌ای دارد که همکار تازه لازم ندارد.', 'لایسنس را (معمولاً با گروه لایسنس) بده؛ Mailbox و Teams بعد از آن ساخته می‌شوند. در محیط Hybrid منتظر همگام‌سازی بمان.', 'لپ‌تاپ را آماده کن (Image یا Autopilot/Intune)، به‌روزرسانی، نرم‌افزار و چاپگر. با حساب آزمایشی بسنج، نه با حساب مدیر.', 'تحویل در روز اول: ورود، راه‌اندازی MFA، قوانین گذرواژه و راه گرفتن کمک. تحویل را امضا بگیر.'],
  fix: 'حساب، دسترسی‌ها، لایسنس، Mailbox و دستگاه در روز شروع آماده و آزموده هستند.',
  verify: 'دوشنبه خانم Neumann وارد می‌شود و Outlook، Teams و پوشهٔ فروش را باز می‌کند. MFA ثبت شده است.',
  note: 'Onboarding برای S. Neumann، بخش فروش، شروع ۳ مارس. درخواست HR شمارهٔ 4711 با تأیید خانم Berg. حساب AD در OU Benutzer، گروه‌ها طبق قالب فروش (GG_Vertrieb، GG_CRM)، لایسنس با LIC_M365_BP. لپ‌تاپ NB-0231 با Autopilot، نرم‌افزار طبق فهرست، ورود آزمایشی موفق. تحویل ۳ مارس ساعت ۸:۳۰ انجام و امضا شد.',
  say: '«خوش آمدید! این لپ‌تاپ شماست. الان با هم ورود و برنامهٔ Authenticator را راه می‌اندازیم. اگر سؤالی داشتید، با داخلی 999 یا از پورتال تیکت با ما تماس بگیرید.»',
  esc: 'به مدیر یا مسئول داده، اگر دسترسی‌ای خواسته شود که در قالب نقش نیست. به بخش خرید، اگر دستگاهی موجود نیست.',
  boss: 'با چک‌لیست و پیش از روز شروع کار می‌کنی، فقط دسترسی لازم می‌دهی و با کاربر عادی آزمایش می‌کنی.'
 }
},
{
 id: 'offboarding', area: 'onboarding', prio: 2, roles: ['helpdesk', 'admin', 'fisi'], lessons: ['operations', 'identities'],
 cmd: 'Disable-ADAccount -Identity tom.klein\nGet-ADPrincipalGroupMembership tom.klein | Select-Object Name   # vorher dokumentieren\nSet-ADUser tom.klein -Description "Ausgetreten 31.03., Ticket #4820"\n# Entra ID: offene Sitzungen beenden (Microsoft Graph PowerShell)\nRevoke-MgUserSignInSession -UserId tom.klein@firma.de',
 de: {
  t: 'Mitarbeiter verlässt die Firma (Offboarding)',
  msg: 'Ticket der Personalabteilung: „Herr Klein hat heute seinen letzten Arbeitstag. Zugang bitte um 17 Uhr sperren.“',
  ask: ['Genaue Uhrzeit der Sperre und wer hat freigegeben?', 'Was passiert mit Postfach und Dateien (Weiterleitung, Übergabe an Vorgesetzte, Aufbewahrungsfrist)? Das entscheidet die Firma, nicht der Support.', 'Welche Geräte, Schlüssel, Tokens müssen zurück?'],
  steps: ['Zur vereinbarten Zeit Konto deaktivieren, nicht löschen. Löschen erst nach der Aufbewahrungsfrist.', 'Kennwort zurücksetzen und alle Cloud-Sitzungen beenden, sonst bleiben Handy und Browser eventuell noch angemeldet.', 'Gruppenmitgliedschaften dokumentieren, dann nach Vorgabe entfernen. MFA-Methoden und Geräte entfernen.', 'Postfach nach Vorgabe behandeln, zum Beispiel in ein freigegebenes Postfach umwandeln und der Vorgesetzten Zugriff geben. Abwesenheitsnotiz setzen, wenn gewünscht.', 'Gerät zurücknehmen, Datensicherung nach Vorgabe, dann zurücksetzen. Lizenz freigeben.'],
  fix: 'Zugang ist zur vereinbarten Zeit vollständig gesperrt, Daten sind gemäß Vorgabe übergeben.',
  verify: 'Anmeldeversuch mit dem Konto scheitert. Keine aktiven Sitzungen. Checkliste vollständig abgehakt.',
  note: 'Offboarding T. Klein lt. HR #4820. 31.03. 17:00 Konto deaktiviert, Kennwort gesetzt, Sitzungen widerrufen. Gruppen dokumentiert (Anhang) und entfernt. Postfach in freigegebenes Postfach umgewandelt, Zugriff Fr. Berg lt. Freigabe. NB-0198 zurückgenommen, gesichert und zurückgesetzt. Lizenz frei.',
  say: 'An die Vorgesetzte: „Der Zugang von Herrn Klein ist seit 17:00 gesperrt. Sie haben Zugriff auf sein Postfach, die Dateien liegen im Ordner Übergabe.“',
  esc: 'An Vorgesetzte und Datenschutzbeauftragte, wenn unklar ist, was mit persönlichen Daten im Postfach passieren darf. Sofort an die IT-Sicherheit bei einem Austritt im Streit.',
  boss: 'Pünktlich, vollständig und nachvollziehbar sperren. Ein vergessener Zugang ist ein echtes Sicherheits- und Datenschutzrisiko.'
 },
 en: {
  t: 'Employee leaves the company (offboarding)',
  msg: 'Ticket from HR: "Mr Klein\'s last working day is today. Please block his access at 5 pm."',
  ask: ['Exact time of the block and who approved it?', 'What happens to mailbox and files (forwarding, hand-over to the manager, retention period)? The company decides this, not support.', 'Which devices, keys, tokens must be returned?'],
  steps: ['At the agreed time disable the account, do not delete it. Delete only after the retention period.', 'Reset the password and revoke all cloud sessions, otherwise phone and browser may stay signed in.', 'Document group memberships, then remove them as instructed. Remove MFA methods and devices.', 'Handle the mailbox as instructed, for example convert it to a shared mailbox and give the manager access. Set an out-of-office reply if requested.', 'Take back the device, back up data as instructed, then reset it. Release the licence.'],
  fix: 'Access is fully blocked at the agreed time, data handed over as instructed.',
  verify: 'A sign-in attempt with the account fails. No active sessions. Checklist complete.',
  note: 'Offboarding T. Klein per HR #4820. 31 March 17:00 account disabled, password set, sessions revoked. Groups documented (attached) and removed. Mailbox converted to shared, access for Ms Berg as approved. NB-0198 returned, backed up and reset. Licence released.',
  say: 'To the manager: "Mr Klein\'s access has been blocked since 5 pm. You have access to his mailbox and the files are in the hand-over folder."',
  esc: 'To the manager and data protection officer if it is unclear what may happen to personal data in the mailbox. Immediately to IT security if someone leaves on bad terms.',
  boss: 'Block on time, completely and traceably. A forgotten account is a real security and data protection risk.'
 },
 fa: {
  t: 'همکاری که شرکت را ترک می‌کند (Offboarding)',
  msg: 'تیکت منابع انسانی: «امروز آخرین روز کاری آقای Klein است. لطفاً دسترسی‌اش را ساعت ۱۷ ببندید.»',
  ask: ['ساعت دقیق قطع دسترسی چیست و چه کسی تأیید کرده؟', 'با Mailbox و فایل‌ها چه شود (هدایت، تحویل به مدیر، مدت نگهداری)؟ این را شرکت تصمیم می‌گیرد، نه پشتیبانی.', 'چه دستگاه‌ها، کلیدها و توکن‌هایی باید برگردانده شوند؟'],
  steps: ['در زمان توافق‌شده حساب را غیرفعال کن، حذف نکن. حذف فقط پس از پایان مدت نگهداری.', 'گذرواژه را ریست کن و همهٔ نشست‌های Cloud را باطل کن؛ وگرنه گوشی و مرورگر ممکن است وارد بمانند.', 'عضویت گروه‌ها را ثبت کن و سپس طبق دستور حذف کن. روش‌های MFA و دستگاه‌ها را حذف کن.', 'Mailbox را طبق دستور مدیریت کن؛ مثلاً به Shared Mailbox تبدیل کن و به مدیر دسترسی بده. اگر خواسته شده پاسخ خودکار بگذار.', 'دستگاه را تحویل بگیر، طبق دستور پشتیبان بگیر و سپس ریست کن. لایسنس را آزاد کن.'],
  fix: 'دسترسی در زمان توافق‌شده کامل بسته شد و داده‌ها طبق دستور تحویل شدند.',
  verify: 'تلاش برای ورود با این حساب شکست می‌خورد، نشست فعالی نمانده و چک‌لیست کامل است.',
  note: 'Offboarding برای T. Klein طبق HR شمارهٔ 4820. ۳۱ مارس ساعت ۱۷:۰۰ حساب غیرفعال، گذرواژه تغییر و نشست‌ها باطل شد. گروه‌ها ثبت (پیوست) و حذف شدند. Mailbox به Shared تبدیل و طبق تأیید به خانم Berg دسترسی داده شد. NB-0198 تحویل، پشتیبان‌گیری و ریست شد. لایسنس آزاد شد.',
  say: 'به مدیر: «دسترسی آقای Klein از ساعت ۱۷ بسته است. شما به Mailbox او دسترسی دارید و فایل‌ها در پوشهٔ تحویل هستند.»',
  esc: 'به مدیر و مسئول حفاظت داده، اگر روشن نیست با داده‌های شخصی در Mailbox چه می‌توان کرد. فوراً به تیم امنیت IT، اگر جدایی با اختلاف بوده است.',
  boss: 'به‌موقع، کامل و قابل پیگیری ببند. حسابی که فراموش شود، خطر واقعی امنیتی و حفاظت داده است.'
 }
}
);
/* Alltagsfälle im IT-Support · Teil 2: Microsoft 365 */
(window.LAB.workCases = window.LAB.workCases || []).push(
{
 id: 'outlook', area: 'm365', prio: 3, roles: ['helpdesk', 'onsite'], lessons: ['workstations'],
 cmd: 'outlook.exe /safe        # Start ohne Add-ins (Win+R)\noutlook.exe /profiles    # Profilauswahl beim Start',
 de: {
  t: 'Outlook startet nicht oder hängt bei „Profil wird geladen“',
  msg: '„Outlook bleibt seit heute Morgen bei ‚Profil wird geladen‘ stehen. Ich habe schon dreimal neu gestartet.“',
  ask: ['Nur Outlook oder auch Teams und Outlook im Browser (outlook.office.com)?', 'Betrifft es nur Sie oder auch Kollegen?', 'Hat sich gestern etwas geändert: Update, neues Add-in, neues Postfach hinzugefügt?'],
  steps: ['Outlook im Web testen. Geht es dort, liegt das Problem am PC, nicht am Postfach.', 'Viele Benutzer betroffen: Dienststatus im Microsoft 365 Admin Center prüfen, dann ist es kein Einzelfall.', 'Outlook vollständig beenden (auch im Task-Manager) und mit „outlook.exe /safe“ starten. Geht es, ein Add-in deaktivieren nach dem anderen.', 'Geht der abgesicherte Modus nicht: neues Outlook-Profil über Systemsteuerung → Mail anlegen und testen. Das alte Profil zunächst behalten.', 'Danach Office-Updates prüfen und bei Bedarf die Schnellreparatur von Microsoft 365 Apps ausführen.'],
  fix: 'Ein fehlerhaftes Add-in (oder ein beschädigtes Profil) war die Ursache. Add-in deaktiviert beziehungsweise neues Profil eingerichtet.',
  verify: 'Outlook startet normal, E-Mails senden und empfangen klappt, Kalender und freigegebene Postfächer sind sichtbar.',
  note: 'Outlook hängt beim Profil laden, OWA funktioniert, nur dieser Benutzer. Start mit /safe ok, Add-in „PDF-Tool 3.2“ als Ursache, deaktiviert. Test Senden/Empfangen ok. Hinweis an Softwareverantwortliche wegen Add-in-Update.',
  say: '„Outlook läuft wieder. Ein Zusatzprogramm hat den Start blockiert. Ich habe es ausgeschaltet. Bis es eine neue Version gibt, nutzen Sie bitte ‚Als PDF speichern‘.“',
  esc: 'An den 2nd Level oder Microsoft-365-Admin, wenn auch Outlook im Web nicht geht oder viele Benutzer betroffen sind.',
  boss: 'Systematisch eingrenzen (Web gegen PC, ein Benutzer gegen viele), nicht sofort Office neu installieren.'
 },
 en: {
  t: 'Outlook does not start or hangs at "Loading profile"',
  msg: '"Outlook has been stuck at \'Loading profile\' since this morning. I have restarted three times."',
  ask: ['Only Outlook, or also Teams and Outlook in the browser (outlook.office.com)?', 'Only you or colleagues too?', 'Did anything change yesterday: update, new add-in, new mailbox added?'],
  steps: ['Test Outlook on the web. If that works, the problem is on the PC, not the mailbox.', 'Many users affected: check service health in the Microsoft 365 admin center; then it is not a single case.', 'Close Outlook completely (also in Task Manager) and start it with "outlook.exe /safe". If that works, disable add-ins one by one.', 'If safe mode fails: create a new Outlook profile via Control Panel → Mail and test it. Keep the old profile for now.', 'Then check Office updates and run the Quick Repair of Microsoft 365 Apps if needed.'],
  fix: 'A faulty add-in (or a damaged profile) was the cause. Add-in disabled or new profile set up.',
  verify: 'Outlook starts normally, sending and receiving works, calendar and shared mailboxes are visible.',
  note: 'Outlook hangs while loading profile, OWA works, only this user. Start with /safe ok, add-in "PDF Tool 3.2" identified as cause and disabled. Send/receive test ok. Informed software owner about add-in update.',
  say: '"Outlook works again. An add-on blocked the start; I have switched it off. Until there is a new version, please use \'Save as PDF\'."',
  esc: 'To 2nd level or the Microsoft 365 admin if Outlook on the web also fails or many users are affected.',
  boss: 'Narrow it down systematically (web versus PC, one user versus many) instead of reinstalling Office straight away.'
 },
 fa: {
  t: 'Outlook باز نمی‌شود یا روی «Loading profile» می‌ماند',
  msg: '«از صبح Outlook روی Loading profile مانده. سه بار هم ری‌استارت کردم.»',
  ask: ['فقط Outlook یا Teams و Outlook در مرورگر (outlook.office.com) هم؟', 'فقط برای شما یا همکاران هم؟', 'دیروز چیزی عوض شد؟ به‌روزرسانی، Add-in تازه یا Mailbox اضافه؟'],
  steps: ['Outlook در وب را آزمایش کن. اگر آنجا کار می‌کند، مشکل از رایانه است نه از Mailbox.', 'اگر کاربران زیادی گرفتارند: وضعیت سرویس را در Microsoft 365 admin center ببین؛ در این صورت مورد تکی نیست.', 'Outlook را کامل ببند (در Task Manager هم) و با «outlook.exe /safe» اجرا کن. اگر کار کرد، Add-inها را یکی‌یکی غیرفعال کن.', 'اگر Safe Mode هم کار نکرد: از Control Panel ← Mail یک پروفایل تازهٔ Outlook بساز و بسنج. پروفایل قدیمی را فعلاً نگه دار.', 'سپس به‌روزرسانی Office را بررسی کن و در صورت نیاز Quick Repair برنامه‌های Microsoft 365 را اجرا کن.'],
  fix: 'علت یک Add-in خراب (یا پروفایل آسیب‌دیده) بود. Add-in غیرفعال یا پروفایل تازه ساخته شد.',
  verify: 'Outlook عادی باز می‌شود، ارسال و دریافت کار می‌کند و تقویم و Mailboxهای مشترک دیده می‌شوند.',
  note: 'Outlook هنگام بارگذاری پروفایل گیر می‌کند، OWA سالم است و فقط همین کاربر. اجرا با /safe موفق؛ Add-in «PDF-Tool 3.2» علت بود و غیرفعال شد. آزمون ارسال و دریافت موفق. به مسئول نرم‌افزار دربارهٔ نسخهٔ تازهٔ Add-in خبر داده شد.',
  say: '«Outlook دوباره کار می‌کند. یک برنامهٔ جانبی جلوی باز شدنش را گرفته بود که خاموشش کردم. تا نسخهٔ تازه بیاید، لطفاً از Save as PDF استفاده کنید.»',
  esc: 'به 2nd Level یا مدیر Microsoft 365، اگر Outlook در وب هم کار نمی‌کند یا کاربران زیادی گرفتارند.',
  boss: 'مشکل را منظم محدود کن (وب در برابر رایانه، یک کاربر در برابر چند کاربر) و فوراً Office را دوباره نصب نکن.'
 }
},
{
 id: 'sharedmailbox', area: 'm365', prio: 4, roles: ['helpdesk', 'admin'], lessons: ['identities', 'access'],
 cmd: 'Connect-ExchangeOnline\nAdd-MailboxPermission -Identity info@firma.de -User lena.weber@firma.de -AccessRights FullAccess -InheritanceType All\nAdd-RecipientPermission -Identity info@firma.de -Trustee lena.weber@firma.de -AccessRights SendAs\nGet-MailboxPermission -Identity info@firma.de | Where-Object { $_.User -like "*lena*" }',
 de: {
  t: 'Zugriff auf das Funktionspostfach info@',
  msg: '„Ich soll ab heute das Postfach info@ mitbetreuen. Können Sie mir das freischalten? Und ich muss auch als info@ antworten können.“',
  ask: ['Wer ist für das Postfach verantwortlich und hat das freigegeben?', 'Nur lesen und bearbeiten (Vollzugriff) oder auch „Senden als“ info@?', 'Ab wann und bis wann (zum Beispiel nur während einer Urlaubsvertretung)?'],
  steps: ['Freigabe der verantwortlichen Person einholen und im Ticket festhalten.', 'Im Exchange Admin Center: Empfänger → Postfächer → info@ → Delegierung. „Lesen und Verwalten“ (Vollzugriff) und bei Bedarf „Senden als“ hinzufügen. Alternativ PowerShell.', 'Besser über eine Gruppe vergeben, wenn mehrere Personen Zugriff brauchen. Dann reicht künftig die Gruppenmitgliedschaft.', 'Benutzer informieren: Das Postfach erscheint in Outlook automatisch, das kann bis zu einer Stunde dauern. Outlook neu starten hilft.'],
  fix: 'Vollzugriff und „Senden als“ gemäß Freigabe vergeben.',
  verify: 'Das Postfach ist in Outlook sichtbar. Eine Testmail „von info@“ kommt beim Empfänger mit info@ als Absender an.',
  note: 'Zugriff info@ für L. Weber, Freigabe durch Postfachverantwortliche Fr. Berg (Mail vom 12.05. im Anhang). FullAccess und SendAs vergeben. Postfach in Outlook sichtbar, Testmail ok.',
  say: '„Sie haben jetzt Zugriff auf info@. Das Postfach erscheint gleich links in Outlook. Zum Antworten als info@ wählen Sie im Feld ‚Von‘ die Adresse info@ aus.“',
  esc: 'An den Exchange- oder Microsoft-365-Admin, wenn das Postfach nach zwei Stunden nicht erscheint oder „Senden als“ einen Fehler meldet.',
  boss: 'Kein Zugriff ohne Freigabe der verantwortlichen Person. Berechtigungen nachvollziehbar dokumentieren und wieder entfernen, wenn sie nicht mehr gebraucht werden.'
 },
 en: {
  t: 'Access to the shared mailbox info@',
  msg: '"From today I am supposed to help with the info@ mailbox. Can you give me access? I also need to reply as info@."',
  ask: ['Who owns the mailbox and approved this?', 'Only read and manage (full access) or also "Send as" info@?', 'From when and until when (for example only while covering someone\'s holiday)?'],
  steps: ['Get approval from the owner and record it in the ticket.', 'In the Exchange admin center: Recipients → Mailboxes → info@ → Delegation. Add "Read and manage" (full access) and, if needed, "Send as". Alternatively use PowerShell.', 'Better grant via a group when several people need access; future changes are then just group membership.', 'Tell the user: the mailbox appears in Outlook automatically, this can take up to an hour. Restarting Outlook helps.'],
  fix: 'Full access and "Send as" granted as approved.',
  verify: 'The mailbox is visible in Outlook. A test mail "from info@" arrives with info@ as the sender.',
  note: 'Access to info@ for L. Weber, approved by mailbox owner Ms Berg (mail of 12 May attached). FullAccess and SendAs granted. Mailbox visible in Outlook, test mail ok.',
  say: '"You now have access to info@. The mailbox will appear on the left in Outlook shortly. To reply as info@, choose info@ in the \'From\' field."',
  esc: 'To the Exchange or Microsoft 365 admin if the mailbox has not appeared after two hours or "Send as" reports an error.',
  boss: 'No access without the owner\'s approval. Document permissions traceably and remove them when they are no longer needed.'
 },
 fa: {
  t: 'دسترسی به Mailbox مشترک info@',
  msg: '«از امروز باید Mailbox info@ را هم پاسخ بدهم. می‌شود دسترسی بدهید؟ باید بتوانم با آدرس info@ هم جواب بدهم.»',
  ask: ['مسئول این Mailbox کیست و آیا آن را تأیید کرده است؟', 'فقط خواندن و مدیریت (Full Access) یا «Send as» با info@ هم؟', 'از کی تا کی (مثلاً فقط در مدت جانشینی تعطیلات)؟'],
  steps: ['تأیید مسئول Mailbox را بگیر و در تیکت ثبت کن.', 'در Exchange admin center: Recipients ← Mailboxes ← info@ ← Delegation. «Read and manage» (Full Access) و در صورت نیاز «Send as» را اضافه کن. یا با PowerShell.', 'اگر چند نفر دسترسی لازم دارند، بهتر است با گروه بدهی؛ آن‌وقت تغییرات بعدی فقط عضویت در گروه است.', 'به کاربر بگو Mailbox خودکار در Outlook ظاهر می‌شود و ممکن است تا یک ساعت طول بکشد. بستن و باز کردن Outlook کمک می‌کند.'],
  fix: 'Full Access و «Send as» طبق تأیید داده شد.',
  verify: 'Mailbox در Outlook دیده می‌شود و ایمیل آزمایشیِ «از info@» با فرستندهٔ info@ به گیرنده می‌رسد.',
  note: 'دسترسی info@ برای L. Weber با تأیید مسئول Mailbox، خانم Berg (ایمیل ۱۲ مه پیوست). FullAccess و SendAs داده شد. Mailbox در Outlook دیده می‌شود و ایمیل آزمایشی موفق بود.',
  say: '«حالا به info@ دسترسی دارید. Mailbox به‌زودی سمت چپ Outlook ظاهر می‌شود. برای پاسخ با info@، در فیلد From آدرس info@ را انتخاب کنید.»',
  esc: 'به مدیر Exchange یا Microsoft 365، اگر Mailbox بعد از دو ساعت ظاهر نشد یا Send as خطا می‌دهد.',
  boss: 'بدون تأیید مسئول، دسترسی نده. دسترسی‌ها را قابل پیگیری ثبت کن و وقتی دیگر لازم نیستند حذفشان کن.'
 }
},
{
 id: 'teams-av', area: 'm365', prio: 3, roles: ['helpdesk', 'onsite'], lessons: ['hardware'],
 cmd: null,
 de: {
  t: 'Teams: Kamera oder Mikrofon funktioniert nicht',
  msg: '„In der Teams-Besprechung hört mich niemand und meine Kamera ist schwarz. In zehn Minuten habe ich das nächste Meeting.“',
  ask: ['Headset oder eingebautes Mikrofon? Kabel, USB oder Bluetooth?', 'Hat es früher funktioniert? Seit wann nicht mehr?', 'Ist ein anderes Programm geöffnet, das Kamera oder Mikrofon nutzt (zum Beispiel Zoom oder die Kamera-App)?'],
  steps: ['Schnelle Prüfung am Gerät: Stummschalter am Headset, Kameraabdeckung oder Kamera-Taste (oft eine F-Taste) am Notebook.', 'In Teams: Einstellungen → Geräte. Richtiges Mikrofon, Lautsprecher und Kamera wählen und „Testanruf durchführen“.', 'Windows: Einstellungen → Datenschutz und Sicherheit → Kamera beziehungsweise Mikrofon. Zugriff für Apps und Desktop-Apps muss eingeschaltet sein.', 'Andere Programme schließen, die das Gerät belegen. Headset an einen anderen USB-Port stecken.', 'Geht weiterhin nichts: Teams komplett beenden und neu starten, Treiber im Geräte-Manager prüfen, dann mit einem anderen Headset testen.'],
  fix: 'Häufigste Ursachen: falsches Gerät in Teams gewählt, Windows-Datenschutz blockiert Zugriff, oder ein anderes Programm hält die Kamera.',
  verify: 'Der Testanruf in Teams spielt die eigene Aufnahme ab und das Kamerabild ist sichtbar.',
  note: 'Teams: kein Ton und schwarze Kamera. Ursache: Windows-Kamerazugriff für Desktop-Apps aus (nach Update), in Teams war Monitor-Lautsprecher als Mikrofon gewählt. Beides korrigiert, Testanruf ok.',
  say: '„Jetzt sollte es gehen: In Teams war das falsche Mikrofon ausgewählt und Windows hatte die Kamera gesperrt. Machen Sie vor wichtigen Terminen gern kurz den Testanruf unter Einstellungen, Geräte.“',
  esc: 'An den Hardware-Support zum Tausch, wenn das Gerät auch an einem zweiten PC nicht funktioniert.',
  boss: 'Ruhig bleiben, unter Zeitdruck die schnellen Ursachen zuerst prüfen und dem Benutzer zeigen, wie er es selbst testen kann.'
 },
 en: {
  t: 'Teams: camera or microphone not working',
  msg: '"Nobody can hear me in the Teams meeting and my camera is black. My next meeting starts in ten minutes."',
  ask: ['Headset or built-in microphone? Cable, USB or Bluetooth?', 'Did it work before? Since when not?', 'Is another program open that uses the camera or microphone (for example Zoom or the Camera app)?'],
  steps: ['Quick device check: mute switch on the headset, camera shutter or camera key (often an F key) on the laptop.', 'In Teams: Settings → Devices. Choose the correct microphone, speaker and camera and run "Make a test call".', 'Windows: Settings → Privacy & security → Camera or Microphone. Access for apps and desktop apps must be on.', 'Close other programs that hold the device. Plug the headset into another USB port.', 'Still nothing: quit Teams completely and restart, check the driver in Device Manager, then test another headset.'],
  fix: 'Most common causes: wrong device selected in Teams, Windows privacy blocks access, or another program holds the camera.',
  verify: 'The Teams test call plays back your recording and the camera image is visible.',
  note: 'Teams: no audio and black camera. Cause: Windows camera access for desktop apps off (after update), monitor speaker selected as microphone in Teams. Both corrected, test call ok.',
  say: '"It should work now: Teams had the wrong microphone selected and Windows had blocked the camera. Before important meetings, feel free to run the test call under Settings, Devices."',
  esc: 'To hardware support for replacement if the device also fails on a second PC.',
  boss: 'Stay calm, check the quick causes first under time pressure, and show the user how to test it themselves.'
 },
 fa: {
  t: 'Teams: دوربین یا میکروفون کار نمی‌کند',
  msg: '«در جلسهٔ Teams کسی صدایم را نمی‌شنود و دوربینم سیاه است. ده دقیقهٔ دیگر جلسهٔ بعدی دارم.»',
  ask: ['هدست یا میکروفون داخلی؟ با کابل، USB یا Bluetooth؟', 'قبلاً کار می‌کرد؟ از کی کار نمی‌کند؟', 'برنامهٔ دیگری که از دوربین یا میکروفون استفاده می‌کند باز است؟ مثلاً Zoom یا برنامهٔ Camera؟'],
  steps: ['بررسی سریع دستگاه: دکمهٔ بی‌صدای هدست، دریچهٔ دوربین یا کلید دوربین لپ‌تاپ (اغلب یک کلید F).', 'در Teams: Settings ← Devices. میکروفون، بلندگو و دوربین درست را انتخاب کن و «Make a test call» را بزن.', 'در Windows: Settings ← Privacy & security ← Camera یا Microphone. دسترسی برای Appها و Desktop appها باید روشن باشد.', 'برنامه‌هایی را که دستگاه را گرفته‌اند ببند و هدست را به پورت USB دیگری بزن.', 'اگر باز هم کار نکرد: Teams را کامل ببند و دوباره باز کن، درایور را در Device Manager ببین و سپس با هدست دیگری بسنج.'],
  fix: 'رایج‌ترین علت‌ها: دستگاه اشتباه در Teams، مسدود شدن دسترسی در تنظیمات حریم خصوصی Windows، یا گرفته شدن دوربین توسط برنامهٔ دیگر.',
  verify: 'تماس آزمایشی Teams صدای ضبط‌شدهٔ خودت را پخش می‌کند و تصویر دوربین دیده می‌شود.',
  note: 'Teams: بی‌صدا و دوربین سیاه. علت: دسترسی دوربین برای Desktop appها در Windows (پس از به‌روزرسانی) خاموش بود و در Teams بلندگوی مانیتور به‌عنوان میکروفون انتخاب شده بود. هر دو اصلاح شد؛ تماس آزمایشی موفق.',
  say: '«حالا باید درست شده باشد: در Teams میکروفون اشتباه انتخاب شده بود و Windows دوربین را بسته بود. پیش از جلسه‌های مهم، تماس آزمایشی را در Settings و Devices بزنید.»',
  esc: 'به پشتیبانی سخت‌افزار برای تعویض، اگر دستگاه روی رایانهٔ دیگری هم کار نمی‌کند.',
  boss: 'زیر فشار زمان آرام بمان، اول علت‌های سریع را بسنج و به کاربر نشان بده خودش چطور آزمایش کند.'
 }
},
{
 id: 'onedrive', area: 'm365', prio: 3, roles: ['helpdesk', 'onsite'], lessons: ['workstations'],
 cmd: '%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset   # OneDrive zurücksetzen (Win+R), Dateien bleiben erhalten',
 de: {
  t: 'OneDrive synchronisiert nicht (rotes Kreuz an Dateien)',
  msg: '„Bei vielen Dateien in OneDrive ist ein rotes Kreuz. Meine Kollegin sieht meine Änderungen nicht.“',
  ask: ['Welches Symbol zeigt OneDrive unten rechts in der Taskleiste: Wolke mit Pause, rotes Kreuz, kein Symbol?', 'Bei allen Dateien oder nur bei bestimmten?', 'Haben Sie viele oder große Dateien verschoben oder Ordner umbenannt?'],
  steps: ['Auf das OneDrive-Symbol klicken und die Liste „Synchronisierungsprobleme“ lesen. Dort steht der genaue Grund pro Datei.', 'Typische Gründe: ungültige Zeichen im Namen, zu langer Pfad (die ganze Adresse ist zu lang), Datei ist in einem anderen Programm geöffnet, OneDrive-Speicher voll, falsches Konto angemeldet.', 'Prüfen, ob die Synchronisierung angehalten ist, und fortsetzen.', 'Einzelne Dateien umbenennen oder Pfad kürzen, geöffnete Programme schließen.', 'Wenn nichts davon hilft: OneDrive mit /reset zurücksetzen. Die Dateien bleiben erhalten, OneDrive gleicht danach neu ab.'],
  fix: 'Ordnerstruktur zu tief verschachtelt, Pfade gekürzt. Eine Datei war in Excel geöffnet.',
  verify: 'Grüne Häkchen an den Dateien. Die Kollegin sieht die aktuelle Version im Browser.',
  note: 'OneDrive: 37 Dateien nicht synchronisiert, Grund laut Problemliste: Pfad zu lang (Ordner „Projekte_2024_final_neu/...“). Mit Benutzer Ordnerstruktur gekürzt, Synchronisation vollständig, Kontrolle im Web ok.',
  say: '„Die Ordner waren zu tief verschachtelt, deshalb konnte OneDrive nicht hochladen. Wir haben es gekürzt, jetzt ist alles synchron. Kurze Ordnernamen helfen, dass es nicht wieder passiert.“',
  esc: 'An den Microsoft-365-Admin, wenn Speicherplatz oder Lizenz fehlen oder wenn Dateien in SharePoint-Bibliotheken betroffen sind, auf die viele zugreifen.',
  boss: 'Fehlermeldungen lesen statt raten, Datenverlust vermeiden (nie einfach Ordner löschen) und dem Benutzer erklären, wie er es künftig vermeidet.'
 },
 en: {
  t: 'OneDrive does not sync (red cross on files)',
  msg: '"Many files in OneDrive have a red cross. My colleague does not see my changes."',
  ask: ['Which icon does OneDrive show at the bottom right of the taskbar: cloud with pause, red cross, no icon?', 'All files or only certain ones?', 'Did you move many or large files or rename folders?'],
  steps: ['Click the OneDrive icon and read the "Sync issues" list. It gives the exact reason per file.', 'Typical reasons: invalid characters in the name, path too long (the full address is too long), file open in another program, OneDrive storage full, wrong account signed in.', 'Check whether syncing is paused and resume it.', 'Rename individual files or shorten the path, close open programs.', 'If none of this helps: reset OneDrive with /reset. Files are kept, OneDrive re-syncs afterwards.'],
  fix: 'Folder structure was nested too deeply; paths shortened. One file was open in Excel.',
  verify: 'Green ticks on the files. The colleague sees the current version in the browser.',
  note: 'OneDrive: 37 files not synced, reason per issue list: path too long (folder "Projects_2024_final_new/..."). Shortened folder structure with the user, sync complete, checked in web ok.',
  say: '"The folders were nested too deeply, so OneDrive could not upload them. We shortened them and everything is in sync now. Short folder names help prevent this."',
  esc: 'To the Microsoft 365 admin if storage or licence is missing, or if SharePoint libraries used by many people are affected.',
  boss: 'Read error messages instead of guessing, avoid data loss (never just delete folders) and explain to the user how to avoid it in future.'
 },
 fa: {
  t: 'OneDrive همگام‌سازی نمی‌کند (ضربدر قرمز روی فایل‌ها)',
  msg: '«روی خیلی از فایل‌های OneDrive ضربدر قرمز است. همکارم تغییرات من را نمی‌بیند.»',
  ask: ['نماد OneDrive پایین سمت راست نوار وظیفه چه نشان می‌دهد: ابر با علامت توقف، ضربدر قرمز یا اصلاً نمادی نیست؟', 'همهٔ فایل‌ها یا فقط بعضی؟', 'فایل‌های زیاد یا بزرگ جابه‌جا کرده‌اید یا نام پوشه‌ها را عوض کرده‌اید؟'],
  steps: ['روی نماد OneDrive کلیک کن و فهرست «Sync issues» را بخوان؛ آنجا علت دقیق هر فایل نوشته شده است.', 'علت‌های رایج: نویسهٔ نامعتبر در نام، مسیر خیلی طولانی (کل نشانی زیادی بلند است)، باز بودن فایل در برنامهٔ دیگر، پر بودن فضای OneDrive یا ورود با حساب اشتباه.', 'ببین همگام‌سازی متوقف (Pause) نشده باشد و آن را ادامه بده.', 'نام فایل‌ها را عوض کن یا مسیر را کوتاه کن و برنامه‌های باز را ببند.', 'اگر هیچ‌کدام کمک نکرد: OneDrive را با /reset بازنشانی کن. فایل‌ها می‌مانند و OneDrive دوباره همگام می‌کند.'],
  fix: 'ساختار پوشه‌ها بیش از حد تودرتو بود و مسیرها کوتاه شدند. یک فایل هم در Excel باز بود.',
  verify: 'تیک سبز روی فایل‌هاست و همکار نسخهٔ تازه را در مرورگر می‌بیند.',
  note: 'OneDrive: ۳۷ فایل همگام نشده بود؛ علت طبق فهرست مشکلات: مسیر خیلی طولانی (پوشهٔ «Projekte_2024_final_neu/...»). همراه کاربر ساختار پوشه کوتاه شد، همگام‌سازی کامل شد و در وب بررسی شد.',
  say: '«پوشه‌ها زیادی تودرتو بودند و OneDrive نمی‌توانست بارگذاری کند. کوتاهشان کردیم و حالا همه‌چیز همگام است. نام کوتاه برای پوشه‌ها کمک می‌کند دوباره پیش نیاید.»',
  esc: 'به مدیر Microsoft 365، اگر فضا یا لایسنس کم است یا کتابخانه‌های SharePoint که افراد زیادی از آن استفاده می‌کنند درگیرند.',
  boss: 'به‌جای حدس زدن پیام خطا را بخوان، از از دست رفتن داده جلوگیری کن (هرگز پوشه را سرسری پاک نکن) و به کاربر بگو چطور دوباره پیش نیاید.'
 }
},
{
 id: 'ndr', area: 'm365', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['dns'],
 cmd: null,
 de: {
  t: 'E-Mail kommt zurück: Unzustellbarkeitsbericht',
  msg: '„Meine Mail an einen Kunden kommt immer zurück, mit so einem englischen Text. Ich habe es schon fünfmal versucht.“',
  ask: ['Bitte leiten Sie mir die zurückgekommene Mail als Anhang weiter.', 'Nur an diesen Empfänger oder an mehrere externe Adressen?', 'Ist ein großer Anhang dabei?'],
  steps: ['Den Unzustellbarkeitsbericht lesen. Der Statuscode sagt fast immer die Ursache, zum Beispiel 550 5.1.1: Empfänger existiert nicht, 552 5.2.2: Postfach des Empfängers voll, 5.7.x: Richtlinie oder Spamfilter hat abgelehnt.', 'Adresse auf Tippfehler prüfen. Häufig ist ein alter Eintrag in der Outlook-Vorschlagsliste schuld: Eintrag löschen, Adresse neu eingeben.', 'Bei 5.7.x oder wenn viele externe Empfänger ablehnen: Nachrichtenablaufverfolgung im Exchange Admin Center prüfen und an den Admin geben. Dann können Absender-Einstellungen der Firma (SPF, DKIM, DMARC) oder eine Sperrliste die Ursache sein.', 'Größenlimit überschritten: Datei über OneDrive oder SharePoint teilen statt anhängen.'],
  fix: 'Tippfehler in einer gespeicherten Adresse (kunde@firma.dee). Vorschlag gelöscht, richtige Adresse gespeichert.',
  verify: 'Neue Mail geht durch, kein Bericht kommt zurück.',
  note: 'NDR 550 5.1.1 an kunde@firma.dee: Tippfehler in Outlook-AutoVervollständigen. Eintrag entfernt, korrekte Adresse verwendet, Zustellung ok.',
  say: '„Die Adresse hatte einen Tippfehler, der in Outlook gespeichert war. Ich habe ihn entfernt. Wenn so ein Bericht kommt, schicken Sie ihn mir gern direkt, dann sehe ich sofort den Grund.“',
  esc: 'An den Exchange- oder Microsoft-365-Admin bei 5.7.x-Codes, wenn mehrere externe Empfänger ablehnen oder wenn die Firma auf einer Sperrliste steht.',
  boss: 'Fehlercodes lesen und erklären können, Benutzer nicht endlos neu senden lassen und Mailprobleme mit Belegen an den Admin geben.'
 },
 en: {
  t: 'Email bounces: non-delivery report',
  msg: '"My mail to a customer keeps coming back with some English text. I have tried five times."',
  ask: ['Please forward the bounced mail to me as an attachment.', 'Only to this recipient or to several external addresses?', 'Is there a large attachment?'],
  steps: ['Read the non-delivery report. The status code almost always gives the cause, for example 550 5.1.1: recipient does not exist, 552 5.2.2: recipient\'s mailbox full, 5.7.x: rejected by policy or spam filter.', 'Check the address for typos. Often an old entry in Outlook\'s suggestion list is to blame: delete the entry and type the address again.', 'For 5.7.x or when many external recipients reject: check message trace in the Exchange admin center and hand over to the admin. Company sender settings (SPF, DKIM, DMARC) or a block list may be the cause.', 'Size limit exceeded: share the file via OneDrive or SharePoint instead of attaching it.'],
  fix: 'Typo in a saved address (customer@company.dee). Suggestion deleted, correct address saved.',
  verify: 'A new mail goes through, no report comes back.',
  note: 'NDR 550 5.1.1 to customer@company.dee: typo in Outlook AutoComplete. Entry removed, correct address used, delivery ok.',
  say: '"The address had a typo that was saved in Outlook. I removed it. If you get a report like this, just send it to me and I can see the reason immediately."',
  esc: 'To the Exchange or Microsoft 365 admin for 5.7.x codes, when several external recipients reject, or if the company is on a block list.',
  boss: 'Read and explain error codes, do not let users resend endlessly, and hand mail problems to the admin with evidence.'
 },
 fa: {
  t: 'ایمیل برمی‌گردد: گزارش عدم تحویل (NDR)',
  msg: '«ایمیلم به یک مشتری همیشه با یک متن انگلیسی برمی‌گردد. پنج بار امتحان کرده‌ام.»',
  ask: ['لطفاً ایمیل برگشتی را به‌صورت پیوست برایم بفرستید.', 'فقط به همین گیرنده یا به چند آدرس بیرونی؟', 'پیوست بزرگ دارد؟'],
  steps: ['گزارش عدم تحویل را بخوان. کد وضعیت تقریباً همیشه علت را می‌گوید؛ مثلاً 550 5.1.1: گیرنده وجود ندارد، 552 5.2.2: Mailbox گیرنده پر است، 5.7.x: رد شده توسط سیاست یا فیلتر هرزنامه.', 'آدرس را برای اشتباه تایپی بسنج. اغلب یک آدرس قدیمی در فهرست پیشنهاد Outlook مقصر است؛ آن را پاک کن و آدرس را از نو بنویس.', 'در کدهای 5.7.x یا وقتی گیرنده‌های بیرونی زیادی رد می‌کنند: Message trace را در Exchange admin center ببین و به مدیر بسپار. ممکن است تنظیمات فرستندهٔ شرکت (SPF، DKIM، DMARC) یا فهرست سیاه علت باشد.', 'اگر از حد حجم گذشته: فایل را با OneDrive یا SharePoint به اشتراک بگذار، نه به‌صورت پیوست.'],
  fix: 'اشتباه تایپی در آدرس ذخیره‌شده (kunde@firma.dee). پیشنهاد قدیمی پاک و آدرس درست ذخیره شد.',
  verify: 'ایمیل تازه می‌رسد و گزارشی برنمی‌گردد.',
  note: 'NDR با کد 550 5.1.1 به kunde@firma.dee: اشتباه تایپی در AutoComplete Outlook. مورد حذف و آدرس درست استفاده شد؛ تحویل موفق.',
  say: '«آدرس یک اشتباه تایپی داشت که در Outlook ذخیره شده بود و پاکش کردم. اگر دوباره چنین گزارشی آمد، مستقیم برایم بفرستید تا علت را فوراً ببینم.»',
  esc: 'به مدیر Exchange یا Microsoft 365 در کدهای 5.7.x، وقتی چند گیرندهٔ بیرونی رد می‌کنند یا شرکت در فهرست سیاه است.',
  boss: 'کدهای خطا را بخوان و توضیح بده، نگذار کاربر بی‌پایان دوباره بفرستد و مشکل ایمیل را با مدرک به مدیر بسپار.'
 }
}
);
/* Alltagsfälle im IT-Support · Teil 3: Netzwerk und Zugriff */
(window.LAB.workCases = window.LAB.workCases || []).push(
{
 id: 'nonet', area: 'network', prio: 2, roles: ['helpdesk', 'onsite', 'admin', 'fisi'], lessons: ['dhcp', 'dns', 'networking'],
 cmd: 'ipconfig /all\nping 10.20.0.1                       # Gateway\nnslookup srv01.corp.example.test\nTest-NetConnection srv01.corp.example.test -Port 445\nipconfig /release\nipconfig /renew',
 de: {
  t: 'Kein Netzwerk oder Internet am Arbeitsplatz',
  msg: '„Bei mir geht gar nichts mehr: kein Internet, keine Laufwerke, Teams ist offline.“',
  ask: ['Nur Ihr PC oder auch der Kollege nebenan?', 'Mit Kabel oder WLAN? Ist am Netzwerkanschluss ein Lämpchen an?', 'Wurde etwas umgesteckt, umgezogen oder ein Dock gewechselt?'],
  steps: ['Mehrere Benutzer im selben Raum betroffen: wahrscheinlich Switch, Stromausfall im Verteiler oder zentraler Dienst. Sofort weiter an das Netzwerkteam, nicht jeden PC einzeln prüfen.', 'Einzelner PC: Kabel und Port prüfen (Link-LED), anderes Kabel oder anderen Port testen. Flugmodus und WLAN-Schalter prüfen.', '„ipconfig /all“ lesen: Adresse 169.254.x.x heißt, dass kein DHCP-Server geantwortet hat. Gültige Adresse, aber kein Gateway erreichbar: Problem zwischen PC und Router.', 'Gateway erreichbar, aber Namen gehen nicht: DNS prüfen mit nslookup.', 'Namen gehen, aber ein Dienst nicht: Port prüfen mit Test-NetConnection. Dann ist es kein allgemeines Netzwerkproblem.'],
  fix: 'Patchkabel am Dock war locker; nach dem Umstecken hat der PC per DHCP eine gültige Adresse erhalten.',
  verify: 'ipconfig zeigt eine Adresse im Firmennetz, Gateway und DNS antworten, Laufwerke und Teams sind wieder online.',
  note: 'Kein Netz an PC-0412, Kollegen nicht betroffen. ipconfig: 169.254.x.x, Link-LED aus. Patchkabel am Dock locker, neu gesteckt, DHCP-Lease 10.20.0.143, Gateway und DNS ok, Laufwerke ok.',
  say: '„Das Netzwerkkabel war nicht richtig eingesteckt. Jetzt ist alles wieder verbunden. Falls es nochmal passiert: Sieht man am Anschluss kein Lämpchen, ist meistens das Kabel schuld.“',
  esc: 'An das Netzwerkteam, wenn mehrere Arbeitsplätze betroffen sind, ein Port tot ist oder der DHCP-Bereich voll ist. Mit Raum, Portnummer und ipconfig-Ausgabe.',
  boss: 'Von unten nach oben prüfen: Kabel, Adresse, Gateway, DNS, Dienst. Erst klären, ob einer oder viele betroffen sind.'
 },
 en: {
  t: 'No network or internet at the workstation',
  msg: '"Nothing works for me: no internet, no drives, Teams is offline."',
  ask: ['Only your PC or also your colleague next to you?', 'Cable or Wi-Fi? Is a light on at the network socket?', 'Was anything re-plugged, moved, or a dock replaced?'],
  steps: ['Several users in the same room affected: probably a switch, power failure in the distribution cabinet or a central service. Pass to the network team immediately instead of checking each PC.', 'Single PC: check cable and port (link LED), try another cable or port. Check airplane mode and Wi-Fi switch.', 'Read "ipconfig /all": an address 169.254.x.x means no DHCP server answered. Valid address but gateway unreachable: problem between PC and router.', 'Gateway reachable but names fail: check DNS with nslookup.', 'Names resolve but one service fails: test the port with Test-NetConnection. Then it is not a general network problem.'],
  fix: 'The patch cable at the dock was loose; after re-plugging, the PC received a valid address via DHCP.',
  verify: 'ipconfig shows an address in the company network, gateway and DNS answer, drives and Teams are online again.',
  note: 'No network on PC-0412, colleagues not affected. ipconfig: 169.254.x.x, link LED off. Patch cable at dock loose, re-plugged, DHCP lease 10.20.0.143, gateway and DNS ok, drives ok.',
  say: '"The network cable was not plugged in properly. Everything is connected again. If it happens again: no light at the socket usually means the cable."',
  esc: 'To the network team if several workstations are affected, a port is dead or the DHCP scope is full. Include room, port number and ipconfig output.',
  boss: 'Check from the bottom up: cable, address, gateway, DNS, service. First clarify whether one or many are affected.'
 },
 fa: {
  t: 'شبکه یا اینترنت در میز کار وصل نیست',
  msg: '«هیچ‌چیز کار نمی‌کند: نه اینترنت، نه درایوها؛ Teams هم آفلاین است.»',
  ask: ['فقط رایانهٔ شما یا همکار کناری هم؟', 'با کابل یا WLAN؟ کنار پریز شبکه چراغی روشن است؟', 'چیزی جابه‌جا شده، جای میز عوض شده یا Dock تعویض شده؟'],
  steps: ['اگر چند کاربر در یک اتاق گرفتارند: احتمالاً Switch، قطع برق در رک یا سرویس مرکزی است. به‌جای بررسی تک‌تک رایانه‌ها، فوراً به تیم شبکه بسپار.', 'یک رایانه: کابل و پورت را بسنج (چراغ Link)، کابل یا پورت دیگری را امتحان کن. حالت پرواز و کلید WLAN را ببین.', '«ipconfig /all» را بخوان: نشانی 169.254.x.x یعنی هیچ سرور DHCP پاسخ نداده. نشانی درست ولی Gateway در دسترس نیست: مشکل بین رایانه و روتر است.', 'اگر Gateway در دسترس است ولی نام‌ها حل نمی‌شوند: DNS را با nslookup بسنج.', 'اگر نام‌ها حل می‌شوند ولی یک سرویس کار نمی‌کند: پورت را با Test-NetConnection بسنج؛ آن‌وقت مشکل کلی شبکه نیست.'],
  fix: 'کابل شبکه در Dock شل بود؛ پس از وصل دوباره، رایانه با DHCP نشانی درست گرفت.',
  verify: 'ipconfig نشانی شبکهٔ شرکت را نشان می‌دهد، Gateway و DNS پاسخ می‌دهند و درایوها و Teams دوباره آنلاین‌اند.',
  note: 'شبکه روی PC-0412 قطع بود و همکاران گرفتار نبودند. ipconfig: 169.254.x.x، چراغ Link خاموش. کابل در Dock شل بود؛ دوباره وصل شد. DHCP Lease 10.20.0.143، Gateway و DNS سالم، درایوها سالم.',
  say: '«کابل شبکه درست وصل نبود و حالا همه‌چیز دوباره وصل است. اگر دوباره پیش آمد: اگر کنار پریز چراغی روشن نیست، معمولاً کابل مقصر است.»',
  esc: 'به تیم شبکه، اگر چند میز کار گرفتارند، پورتی خراب است یا محدودهٔ DHCP پر شده است. با شمارهٔ اتاق، شمارهٔ پورت و خروجی ipconfig.',
  boss: 'از پایین به بالا بسنج: کابل، نشانی، Gateway، DNS، سرویس. اول روشن کن یک نفر گرفتار است یا چند نفر.'
 }
},
{
 id: 'netdrive', area: 'network', prio: 3, roles: ['helpdesk', 'onsite', 'admin', 'fisi'], lessons: ['access', 'identities'],
 cmd: 'net use\nwhoami /groups | findstr /i finanzen\ngpresult /r\nTest-NetConnection srv01.corp.example.test -Port 445',
 de: {
  t: 'Netzlaufwerk fehlt oder „Zugriff verweigert“',
  msg: '„Das Laufwerk F: mit den Finanzordnern ist weg. Wenn ich den Pfad eingebe, kommt ‚Zugriff verweigert‘.“',
  ask: ['Ist das Laufwerk komplett weg oder kommt beim Öffnen „Zugriff verweigert“?', 'Sind Sie im Büro oder im Homeoffice mit VPN?', 'Hatten Sie früher Zugriff? Haben Sie die Abteilung oder Aufgabe gewechselt?'],
  steps: ['Im Homeoffice zuerst VPN prüfen. Ohne VPN gibt es keine internen Laufwerke.', '„net use“ zeigt verbundene Laufwerke. Fehlt F:, mit „gpresult /r“ prüfen, ob die Gruppenrichtlinie für Laufwerkszuordnungen angewendet wurde.', '„Zugriff verweigert“: mit „whoami /groups“ prüfen, ob der Benutzer in der Berechtigungsgruppe ist. Wurde er gerade hinzugefügt: ab- und neu anmelden, damit das Token neu entsteht.', 'Nicht in der Gruppe: Berechtigung nur mit Freigabe der Datenverantwortlichen beantragen. Nicht einfach selbst hinzufügen.', 'Server erreichbar? Test-NetConnection auf Port 445.'],
  fix: 'Benutzer war nach Abteilungswechsel aus der alten Gruppe entfernt worden. Neue Berechtigung mit Freigabe der Finanzleitung vergeben, neu angemeldet.',
  verify: 'F: ist verbunden, der Benutzer öffnet und speichert eine Datei. Zugriff auf Ordner anderer Abteilungen bleibt gesperrt.',
  note: 'F: Zugriff verweigert für M. Arslan. whoami /groups: nicht in DL_Finanzen_RW (Abteilungswechsel 01.06.). Freigabe Finanzleitung Hr. Vogt eingeholt (Ticket-Anhang), in GG_Finanzen aufgenommen, Abmelden/Anmelden, Zugriff getestet.',
  say: '„Nach Ihrem Abteilungswechsel fehlte Ihnen die Berechtigung. Herr Vogt hat sie freigegeben und Sie haben jetzt wieder Zugriff. Bei neuen Ordnern läuft das immer über die verantwortliche Person.“',
  esc: 'An den 2nd Level, wenn der Benutzer in der Gruppe ist und trotzdem keinen Zugriff hat, oder wenn der Server nicht erreichbar ist.',
  boss: 'Du verstehst Gruppen, Token und Freigabe- und NTFS-Rechte und vergibst Zugriff nur mit Freigabe. Das wird in fast jedem Vorstellungsgespräch gefragt.'
 },
 en: {
  t: 'Network drive missing or "Access denied"',
  msg: '"Drive F: with the finance folders is gone. When I type the path, I get \'Access denied\'."',
  ask: ['Is the drive completely gone, or do you get "Access denied" when opening it?', 'Are you in the office or working from home with VPN?', 'Did you have access before? Did you change department or role?'],
  steps: ['When working from home, check VPN first. No VPN means no internal drives.', '"net use" shows connected drives. If F: is missing, use "gpresult /r" to check whether the drive mapping group policy was applied.', '"Access denied": use "whoami /groups" to check whether the user is in the permission group. If they were just added: sign out and in again so the token is rebuilt.', 'Not in the group: request permission only with approval from the data owner. Do not just add them yourself.', 'Server reachable? Test-NetConnection on port 445.'],
  fix: 'After a department change the user had been removed from the old group. New permission granted with approval from the head of finance, user signed in again.',
  verify: 'F: is connected, the user opens and saves a file. Access to other departments\' folders stays blocked.',
  note: 'F: access denied for M. Arslan. whoami /groups: not in DL_Finanzen_RW (department change 1 June). Approval from head of finance Mr Vogt obtained (attached), added to GG_Finanzen, sign-out/sign-in, access tested.',
  say: '"After your department change you were missing the permission. Mr Vogt approved it and you have access again. For new folders this always goes through the responsible person."',
  esc: 'To 2nd level if the user is in the group and still has no access, or if the server is unreachable.',
  boss: 'You understand groups, tokens, share and NTFS permissions and grant access only with approval. This comes up in almost every interview.'
 },
 fa: {
  t: 'درایو شبکه نیست یا «Access denied»',
  msg: '«درایو F: با پوشه‌های مالی غیب شده. وقتی مسیر را می‌زنم، می‌گوید Access denied.»',
  ask: ['درایو کاملاً نیست یا هنگام باز کردن «Access denied» می‌آید؟', 'در دفتر هستید یا در خانه با VPN؟', 'قبلاً دسترسی داشتید؟ بخش یا وظیفه‌تان عوض شده؟'],
  steps: ['اگر از خانه کار می‌کند، اول VPN را بسنج. بدون VPN درایو داخلی در کار نیست.', '«net use» درایوهای متصل را نشان می‌دهد. اگر F: نیست، با «gpresult /r» ببین Group Policy مربوط به نگاشت درایو اعمال شده است یا نه.', 'در «Access denied»: با «whoami /groups» ببین کاربر عضو گروه دسترسی هست یا نه. اگر تازه اضافه شده: خروج و ورود دوباره تا Token تازه ساخته شود.', 'اگر عضو گروه نیست: دسترسی را فقط با تأیید مسئول داده درخواست کن؛ خودت سرخود اضافه نکن.', 'سرور در دسترس است؟ Test-NetConnection روی پورت 445.'],
  fix: 'کاربر پس از تغییر بخش از گروه قدیمی حذف شده بود. دسترسی تازه با تأیید مدیر مالی داده شد و کاربر دوباره وارد شد.',
  verify: 'F: وصل است و کاربر فایلی را باز و ذخیره می‌کند. دسترسی به پوشه‌های بخش‌های دیگر همچنان بسته است.',
  note: 'F: برای M. Arslan با Access denied. whoami /groups: عضو DL_Finanzen_RW نیست (تغییر بخش از ۱ ژوئن). تأیید مدیر مالی، آقای Vogt گرفته شد (پیوست تیکت)، به GG_Finanzen اضافه شد، خروج و ورود دوباره، دسترسی آزمایش شد.',
  say: '«پس از تغییر بخش، دسترسی شما برداشته شده بود. آقای Vogt آن را تأیید کرد و حالا دوباره دسترسی دارید. برای پوشه‌های تازه همیشه از طریق مسئول آن پوشه اقدام می‌شود.»',
  esc: 'به 2nd Level، اگر کاربر عضو گروه است ولی باز هم دسترسی ندارد یا سرور در دسترس نیست.',
  boss: 'گروه‌ها، Token و دسترسی‌های Share و NTFS را می‌فهمی و دسترسی را فقط با تأیید می‌دهی. این موضوع تقریباً در هر مصاحبه‌ای پرسیده می‌شود.'
 }
},
{
 id: 'vpn', area: 'network', prio: 3, roles: ['helpdesk', 'admin'], lessons: ['networking', 'firewall-lab'],
 cmd: 'Test-NetConnection vpn.firma.de -Port 443\nw32tm /query /status\nipconfig /all',
 de: {
  t: 'VPN verbindet im Homeoffice nicht',
  msg: '„Ich bin im Homeoffice und das VPN sagt nur ‚Verbindung fehlgeschlagen‘. Ich komme an nichts ran.“',
  ask: ['Geht normales Internet, zum Beispiel eine Nachrichtenseite?', 'Welche Fehlermeldung genau, mit Fehlercode? Bitte einen Screenshot.', 'Sind Sie zu Hause, im Hotel oder in einem öffentlichen WLAN? Hat es gestern funktioniert?'],
  steps: ['Ohne Internet kein VPN. Hotel- oder Zug-WLAN braucht oft erst eine Anmeldeseite im Browser.', 'Kennwort abgelaufen oder MFA-Anfrage nicht bestätigt? Das ist eine der häufigsten Ursachen.', 'Uhrzeit des Notebooks prüfen. Eine falsche Uhrzeit lässt Zertifikatsprüfungen scheitern.', 'VPN-Server erreichbar? Test-NetConnection auf den Port des VPN-Gateways.', 'Viele Benutzer gleichzeitig betroffen: zentrale Störung, sofort an das Netzwerkteam. Einzelner Benutzer: VPN-Client-Version und Protokolle sammeln.'],
  fix: 'Das Domänenkennwort war abgelaufen. Kennwort über das Self-Service-Portal geändert, danach klappte die Verbindung.',
  verify: 'VPN verbindet, interne Laufwerke und das Intranet sind erreichbar.',
  note: 'VPN-Fehler im Homeoffice, Internet ok, Fehlercode 691/Authentifizierung. Kennwort seit gestern abgelaufen. Benutzer hat Kennwort per SSPR geändert, VPN ok, Laufwerke ok.',
  say: '„Ihr Kennwort war gestern abgelaufen, deshalb hat das VPN abgelehnt. Mit dem neuen Kennwort geht es wieder. Windows erinnert Sie künftig ein paar Tage vorher.“',
  esc: 'An das Netzwerkteam mit Uhrzeit, Fehlercode, öffentlicher IP und Client-Protokoll, wenn es nicht am Konto liegt oder mehrere Benutzer betroffen sind.',
  boss: 'Fehler klar vom Heimnetz des Benutzers trennen und präzise Angaben für die Eskalation sammeln (Zeit, Fehlercode, Protokoll).'
 },
 en: {
  t: 'VPN does not connect when working from home',
  msg: '"I\'m working from home and the VPN just says \'Connection failed\'. I can\'t reach anything."',
  ask: ['Does normal internet work, for example a news site?', 'What exactly is the error message, with code? Please send a screenshot.', 'Are you at home, in a hotel or on public Wi-Fi? Did it work yesterday?'],
  steps: ['No internet, no VPN. Hotel or train Wi-Fi often needs a sign-in page in the browser first.', 'Password expired or MFA prompt not approved? That is one of the most common causes.', 'Check the laptop\'s clock. A wrong time makes certificate checks fail.', 'Is the VPN server reachable? Test-NetConnection on the VPN gateway port.', 'Many users at once: central outage, to the network team immediately. Single user: collect VPN client version and logs.'],
  fix: 'The domain password had expired. Password changed via the self-service portal, then the connection worked.',
  verify: 'VPN connects, internal drives and the intranet are reachable.',
  note: 'VPN error at home, internet ok, error 691/authentication. Password expired since yesterday. User changed password via SSPR, VPN ok, drives ok.',
  say: '"Your password expired yesterday, that\'s why the VPN refused. It works again with the new password. Windows will remind you a few days in advance in future."',
  esc: 'To the network team with time, error code, public IP and client log if it is not the account or several users are affected.',
  boss: 'Clearly separate faults from the user\'s home network and collect precise data for escalation (time, error code, log).'
 },
 fa: {
  t: 'VPN از خانه وصل نمی‌شود',
  msg: '«از خانه کار می‌کنم و VPN فقط می‌گوید Connection failed. به هیچ‌چیز دسترسی ندارم.»',
  ask: ['اینترنت عادی کار می‌کند؟ مثلاً یک سایت خبری؟', 'پیام خطا دقیقاً چیست و چه کدی دارد؟ لطفاً تصویر صفحه بفرستید.', 'در خانه، هتل یا WLAN عمومی هستید؟ دیروز کار می‌کرد؟'],
  steps: ['بدون اینترنت VPN هم در کار نیست. WLAN هتل یا قطار اغلب اول صفحهٔ ورود در مرورگر می‌خواهد.', 'گذرواژه منقضی شده یا درخواست MFA تأیید نشده؟ این از رایج‌ترین علت‌هاست.', 'ساعت لپ‌تاپ را بسنج. ساعت اشتباه باعث شکست بررسی گواهی‌ها می‌شود.', 'سرور VPN در دسترس است؟ Test-NetConnection روی پورت دروازهٔ VPN.', 'اگر کاربران زیادی هم‌زمان گرفتارند: اختلال مرکزی است؛ فوراً به تیم شبکه. اگر یک نفر است: نسخهٔ VPN Client و لاگ‌ها را جمع کن.'],
  fix: 'گذرواژهٔ دامنه منقضی شده بود. گذرواژه از پورتال Self-Service عوض شد و اتصال برقرار شد.',
  verify: 'VPN وصل می‌شود و درایوهای داخلی و اینترانت در دسترس‌اند.',
  note: 'خطای VPN در خانه، اینترنت سالم، کد خطا 691/احراز هویت. گذرواژه از دیروز منقضی بود. کاربر گذرواژه را با SSPR عوض کرد؛ VPN و درایوها سالم.',
  say: '«گذرواژهٔ شما دیروز منقضی شده بود و برای همین VPN رد می‌کرد. با گذرواژهٔ تازه دوباره کار می‌کند. Windows از این به بعد چند روز زودتر یادآوری می‌کند.»',
  esc: 'به تیم شبکه با زمان، کد خطا، IP عمومی و لاگ Client، اگر مشکل از حساب نیست یا چند کاربر گرفتارند.',
  boss: 'مشکل را به‌روشنی از شبکهٔ خانگی کاربر جدا کن و برای ارجاع اطلاعات دقیق جمع کن (زمان، کد خطا، لاگ).'
 }
},
{
 id: 'wlan', area: 'network', prio: 3, roles: ['onsite', 'helpdesk'], lessons: ['hardware'],
 cmd: 'netsh wlan show interfaces      # SSID, BSSID, Signal, Band, Kanal\nnetsh wlan show profiles\nipconfig /all',
 de: {
  t: 'WLAN im Besprechungsraum bricht ständig ab',
  msg: '„Im Besprechungsraum 2 fliegt mein Notebook alle paar Minuten aus dem WLAN. An meinem Platz geht es.“',
  ask: ['Passiert es nur in diesem Raum und auch bei Kollegen?', 'Welches WLAN genau (Firmen-WLAN oder Gäste-WLAN)?', 'Seit wann? Wurde im Raum etwas verändert?'],
  steps: ['„netsh wlan show interfaces“ im Raum ausführen: Signalstärke, Band (2,4 oder 5 GHz) und BSSID (welcher Access Point) notieren.', 'Schwaches Signal und viele Geräte im Raum: Access-Point-Abdeckung ist wahrscheinlich das Problem, nicht das Notebook.', 'Nur ein Gerät betroffen: WLAN-Treiber aktualisieren, Energiesparoption des WLAN-Adapters prüfen, Netzwerkprofil entfernen und neu verbinden.', 'Firmen-WLAN mit Zertifikat (802.1X): Gültigkeit des Computerzertifikats prüfen.', 'Ergebnisse mit Raum, Uhrzeit und BSSID dokumentieren.'],
  fix: 'Mehrere Geräte betroffen, Signal im Raum schwach (25 %). An das Netzwerkteam zur Prüfung der Access-Point-Abdeckung gegeben.',
  verify: 'Nach Anpassung durch das Netzwerkteam bleibt die Verbindung während eines 30-minütigen Tests stabil.',
  note: 'WLAN-Abbrüche Besprechung 2, mehrere Geräte. netsh: Signal 20–30 %, BSSID aa:bb:cc:.. (AP Flur 1. OG), 2,4 GHz. Andere Räume ok. Eskaliert an Netzwerkteam mit Messwerten.',
  say: '„Das liegt nicht an Ihrem Notebook, sondern am WLAN-Empfang in diesem Raum. Ich habe das mit den Messwerten an das Netzwerkteam gegeben. Bis dahin nutzen Sie bitte den Netzwerkanschluss am Tisch.“',
  esc: 'An das Netzwerkteam, sobald mehrere Geräte im selben Bereich betroffen sind. Mit Messwerten statt „WLAN ist schlecht“.',
  boss: 'Mit Messwerten argumentieren, eine Übergangslösung anbieten und zwischen Geräteproblem und Infrastrukturproblem unterscheiden.'
 },
 en: {
  t: 'Wi-Fi in the meeting room keeps dropping',
  msg: '"In meeting room 2 my laptop drops off the Wi-Fi every few minutes. It works at my desk."',
  ask: ['Does it only happen in this room, and for colleagues too?', 'Which network exactly (company Wi-Fi or guest Wi-Fi)?', 'Since when? Was anything changed in the room?'],
  steps: ['Run "netsh wlan show interfaces" in the room: note signal strength, band (2.4 or 5 GHz) and BSSID (which access point).', 'Weak signal and many devices in the room: access point coverage is likely the problem, not the laptop.', 'Only one device affected: update the Wi-Fi driver, check the adapter\'s power saving option, remove the network profile and reconnect.', 'Company Wi-Fi with certificate (802.1X): check the validity of the computer certificate.', 'Document results with room, time and BSSID.'],
  fix: 'Several devices affected, weak signal in the room (25%). Passed to the network team to check access point coverage.',
  verify: 'After the network team\'s adjustment the connection stays stable during a 30-minute test.',
  note: 'Wi-Fi drops in meeting room 2, several devices. netsh: signal 20–30%, BSSID aa:bb:cc:.. (AP corridor 1st floor), 2.4 GHz. Other rooms ok. Escalated to network team with measurements.',
  say: '"It\'s not your laptop, it\'s the Wi-Fi reception in this room. I have passed it to the network team with measurements. Until then, please use the network socket at the table."',
  esc: 'To the network team as soon as several devices in the same area are affected. With measurements instead of "Wi-Fi is bad".',
  boss: 'Argue with measurements, offer a workaround and distinguish between a device problem and an infrastructure problem.'
 },
 fa: {
  t: 'WLAN اتاق جلسه مدام قطع می‌شود',
  msg: '«در اتاق جلسهٔ ۲ لپ‌تاپم هر چند دقیقه از WLAN بیرون می‌افتد. سر میز خودم مشکلی نیست.»',
  ask: ['فقط در همین اتاق پیش می‌آید و برای همکاران هم؟', 'دقیقاً کدام شبکه (WLAN شرکت یا مهمان)؟', 'از کی؟ در اتاق چیزی تغییر کرده؟'],
  steps: ['در همان اتاق «netsh wlan show interfaces» را اجرا کن: قدرت سیگنال، باند (2.4 یا 5 GHz) و BSSID (کدام Access Point) را یادداشت کن.', 'اگر سیگنال ضعیف است و دستگاه‌های زیادی در اتاق‌اند: احتمالاً پوشش Access Point مشکل دارد، نه لپ‌تاپ.', 'اگر فقط یک دستگاه گرفتار است: درایور WLAN را به‌روز کن، گزینهٔ صرفه‌جویی انرژی کارت شبکه را ببین، پروفایل شبکه را حذف و دوباره وصل کن.', 'در WLAN شرکت با گواهی (802.1X): اعتبار گواهی رایانه را بسنج.', 'نتیجه‌ها را با نام اتاق، زمان و BSSID ثبت کن.'],
  fix: 'چند دستگاه گرفتار بودند و سیگنال اتاق ضعیف بود (۲۵٪). برای بررسی پوشش Access Point به تیم شبکه ارجاع شد.',
  verify: 'پس از تنظیم تیم شبکه، اتصال در آزمون ۳۰ دقیقه‌ای پایدار می‌ماند.',
  note: 'قطعی WLAN در اتاق جلسهٔ ۲، چند دستگاه. netsh: سیگنال ۲۰ تا ۳۰٪، BSSID aa:bb:cc:.. (AP راهروی طبقهٔ اول)، 2.4 GHz. اتاق‌های دیگر سالم. با اندازه‌گیری‌ها به تیم شبکه ارجاع شد.',
  say: '«مشکل از لپ‌تاپ شما نیست، از آنتن‌دهی WLAN در این اتاق است. با اندازه‌گیری‌ها به تیم شبکه سپردم. تا آن موقع لطفاً از پریز شبکهٔ روی میز استفاده کنید.»',
  esc: 'به تیم شبکه، به محض اینکه چند دستگاه در یک محدوده گرفتارند؛ با اندازه‌گیری، نه با جملهٔ «WLAN بد است».',
  boss: 'با اندازه‌گیری استدلال کن، راه موقت پیشنهاد بده و مشکل دستگاه را از مشکل زیرساخت جدا کن.'
 }
}
);
/* Alltagsfälle im IT-Support · Teil 4: Geräte, Drucker, Sicherheit, Großstörung */
(window.LAB.workCases = window.LAB.workCases || []).push(
{
 id: 'slowpc', area: 'device', prio: 4, roles: ['helpdesk', 'onsite'], lessons: ['monitoring', 'workstations'],
 cmd: '(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime   # Laufzeit seit Neustart\nGet-PSDrive C\nGet-PhysicalDisk | Select-Object FriendlyName,MediaType,HealthStatus\nGet-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name,CPU,WorkingSet',
 de: {
  t: 'PC ist sehr langsam',
  msg: '„Mein Rechner ist total langsam. Alles dauert ewig, Excel friert ständig ein.“',
  ask: ['Seit wann? Plötzlich oder schleichend?', 'Bei allem oder bei einem bestimmten Programm?', 'Wann haben Sie den PC zuletzt richtig neu gestartet (nicht nur zugeklappt)?'],
  steps: ['Laufzeit seit dem letzten Neustart prüfen. Viele Tage ohne Neustart und ausstehende Updates: zuerst neu starten.', 'Task-Manager: Was belegt CPU, Arbeitsspeicher und Datenträger? Ein Prozess dauerhaft hoch ist eine konkrete Spur.', 'Freien Speicher auf C: prüfen. Unter etwa 10 % wird Windows spürbar langsam.', 'Autostart-Programme im Task-Manager prüfen, Unnötiges nach Firmenregel deaktivieren.', 'Datenträgerzustand und Hardware prüfen (HDD statt SSD, 8 GB RAM für viele Programme). Dann ist ein Hardwaretausch der richtige Weg, kein Reparaturversuch.'],
  fix: '38 Tage ohne Neustart, Updates ausstehend, C: zu 96 % voll durch alte Downloads. Neustart, Updates installiert, Benutzer hat Downloads aufgeräumt.',
  verify: 'Start und Excel laufen normal, C: hat über 20 % frei. Kurze Rückfrage nach zwei Tagen.',
  note: 'Langsamer PC-0377: Laufzeit 38 Tage, 4 Updates ausstehend, C: 96 % belegt (Downloads 41 GB). Neustart, Updates, Benutzer hat Downloads bereinigt, C: 28 % frei. Leistung normal. Nachfrage am 14.03.',
  say: '„Ihr PC lief seit über fünf Wochen ohne Neustart und die Festplatte war fast voll. Bitte starten Sie ihn einmal pro Woche neu, zum Beispiel freitags. Ich melde mich übermorgen kurz.“',
  esc: 'An den Hardware-Support oder Einkauf bei defektem Datenträger oder zu schwacher Ausstattung. An die IT-Sicherheit bei unbekannten Prozessen mit hoher Last.',
  boss: 'Mit Zahlen begründen statt „fühlt sich langsam an“, erst einfache Ursachen ausschließen und nachfassen, ob es dauerhaft besser ist.'
 },
 en: {
  t: 'PC is very slow',
  msg: '"My computer is extremely slow. Everything takes forever, Excel keeps freezing."',
  ask: ['Since when? Suddenly or gradually?', 'With everything or one specific program?', 'When did you last properly restart the PC (not just close the lid)?'],
  steps: ['Check uptime since the last restart. Many days without a restart and pending updates: restart first.', 'Task Manager: what uses CPU, memory and disk? One process constantly high is a concrete lead.', 'Check free space on C:. Below about 10% Windows becomes noticeably slow.', 'Check startup apps in Task Manager, disable unnecessary ones according to company rules.', 'Check disk health and hardware (HDD instead of SSD, 8 GB RAM for many programs). Then hardware replacement is the right path, not a repair attempt.'],
  fix: '38 days without restart, updates pending, C: 96% full of old downloads. Restarted, updates installed, user cleaned up downloads.',
  verify: 'Start-up and Excel run normally, C: has over 20% free. Short follow-up after two days.',
  note: 'Slow PC-0377: uptime 38 days, 4 updates pending, C: 96% used (Downloads 41 GB). Restart, updates, user cleaned downloads, C: 28% free. Performance normal. Follow-up on 14 March.',
  say: '"Your PC had been running for over five weeks without a restart and the disk was almost full. Please restart it once a week, for example on Fridays. I\'ll check back with you the day after tomorrow."',
  esc: 'To hardware support or purchasing for a failing disk or insufficient hardware. To IT security for unknown processes with high load.',
  boss: 'Back it up with numbers instead of "feels slow", rule out simple causes first and follow up whether it stays better.'
 },
 fa: {
  t: 'رایانه خیلی کند است',
  msg: '«رایانه‌ام خیلی کند شده. همه‌چیز طول می‌کشد و Excel مدام هنگ می‌کند.»',
  ask: ['از کی؟ ناگهانی یا کم‌کم؟', 'در همه‌چیز یا در یک برنامهٔ خاص؟', 'آخرین بار کی رایانه را واقعاً ری‌استارت کردید (نه فقط بستن درِ لپ‌تاپ)؟'],
  steps: ['مدت روشن بودن از آخرین ری‌استارت را ببین. اگر چند روز بدون ری‌استارت و با به‌روزرسانی معلق بوده: اول ری‌استارت.', 'Task Manager: چه چیزی CPU، حافظه و دیسک را مصرف می‌کند؟ یک فرایند که مدام بالاست، سرنخ مشخصی است.', 'فضای آزاد درایو C: را ببین. زیر حدود ۱۰٪، Windows به‌طور محسوسی کند می‌شود.', 'برنامه‌های Startup را در Task Manager ببین و موارد غیرلازم را طبق قانون شرکت غیرفعال کن.', 'سلامت دیسک و سخت‌افزار را بسنج (HDD به‌جای SSD، یا ۸ گیگابایت RAM برای برنامه‌های زیاد). در این حالت راه درست تعویض سخت‌افزار است، نه تلاش برای تعمیر.'],
  fix: '۳۸ روز بدون ری‌استارت، به‌روزرسانی معلق و درایو C: تا ۹۶٪ پر از دانلودهای قدیمی. ری‌استارت شد، به‌روزرسانی نصب شد و کاربر دانلودها را پاک کرد.',
  verify: 'روشن شدن و Excel عادی کار می‌کنند و C: بیش از ۲۰٪ جای خالی دارد. دو روز بعد پیگیری کوتاه.',
  note: 'PC-0377 کند: ۳۸ روز روشن، ۴ به‌روزرسانی معلق، C: ۹۶٪ پر (Downloads حدود ۴۱ گیگابایت). ری‌استارت، به‌روزرسانی، کاربر دانلودها را پاک کرد و C: ۲۸٪ آزاد شد. کارایی عادی. پیگیری در ۱۴ مارس.',
  say: '«رایانهٔ شما بیش از پنج هفته بدون ری‌استارت روشن بود و دیسک تقریباً پر شده بود. لطفاً هفته‌ای یک بار، مثلاً جمعه‌ها، ری‌استارت کنید. پس‌فردا کوتاه پیگیری می‌کنم.»',
  esc: 'به پشتیبانی سخت‌افزار یا بخش خرید در صورت خرابی دیسک یا سخت‌افزار ناکافی. به تیم امنیت IT اگر فرایندهای ناشناس بار زیادی ایجاد می‌کنند.',
  boss: 'با عدد استدلال کن نه با «حس می‌کنم کند است»، اول علت‌های ساده را کنار بگذار و پیگیری کن که بهبود پایدار بماند.'
 }
},
{
 id: 'bitlocker', area: 'device', prio: 2, roles: ['helpdesk', 'onsite', 'admin'], lessons: ['workstations', 'recovery'],
 cmd: 'manage-bde -status C:\nmanage-bde -protectors -get C:',
 de: {
  t: 'BitLocker verlangt den Wiederherstellungsschlüssel',
  msg: '„Mein Notebook zeigt einen blauen Bildschirm und will einen 48-stelligen Wiederherstellungsschlüssel. Den habe ich nicht.“',
  ask: ['Wer ruft an und wie bestätigen wir die Identität?', 'Was steht auf dem Bildschirm bei „Wiederherstellungsschlüssel-ID“? Die ersten acht Zeichen reichen.', 'Was war vorher: Update, BIOS-Update, neues Dock, USB-Stick eingesteckt, Hardware getauscht?'],
  steps: ['Identität prüfen. Der Schlüssel öffnet alle Daten des Geräts und darf nur an die berechtigte Person.', 'Schlüssel anhand der Schlüssel-ID suchen: im Microsoft Entra Admin Center oder Intune beim Gerät unter BitLocker-Schlüssel oder im AD beim Computerobjekt.', 'Schlüssel telefonisch in Blöcken vorlesen, nie per E-Mail oder Chat schicken.', 'Nach dem Start Ursache klären: BIOS- oder Firmware-Update, geänderte Startreihenfolge, USB-Gerät beim Start, TPM-Änderung.', 'Wenn die Firmenregel es verlangt: Schlüssel nach Verwendung erneuern lassen (oft automatisch über Intune).'],
  fix: 'Ursache war ein BIOS-Update mit eingestecktem USB-Stick beim Neustart. Schlüssel vorgelesen, Gerät gestartet, USB-Stick entfernt.',
  verify: 'Normaler Start ohne Abfrage nach einem weiteren Neustart. „manage-bde -status“ zeigt Schutz aktiviert.',
  note: 'BitLocker-Recovery NB-0219, Identität per Rückruf bestätigt. Key-ID 1A2B3C4D, Schlüssel aus Entra ID telefonisch übermittelt. Ursache: BIOS-Update mit USB-Stick. Neustart ohne Abfrage ok, Schutz aktiv, Schlüsselrotation über Intune ausgelöst.',
  say: '„Ich lese Ihnen den Schlüssel jetzt in Achtergruppen vor, tippen Sie bitte mit. Danach ziehen Sie bitte den USB-Stick ab, der hat den Start gestört.“',
  esc: 'An den 2nd Level, wenn kein Schlüssel gespeichert ist oder die Abfrage bei jedem Start kommt. Dann droht Datenverlust.',
  boss: 'Du weißt, wo Schlüssel gespeichert sind, prüfst Identität und gibst Schlüssel nur sicher weiter.'
 },
 en: {
  t: 'BitLocker asks for the recovery key',
  msg: '"My laptop shows a blue screen and wants a 48-digit recovery key. I don\'t have it."',
  ask: ['Who is calling and how do we verify identity?', 'What does the screen show next to "Recovery key ID"? The first eight characters are enough.', 'What happened before: update, BIOS update, new dock, USB stick plugged in, hardware replaced?'],
  steps: ['Verify identity. The key unlocks all data on the device and may only go to the authorised person.', 'Find the key using the key ID: in the Microsoft Entra admin center or Intune under the device\'s BitLocker keys, or in AD on the computer object.', 'Read the key out by phone in blocks, never send it by email or chat.', 'After start-up, find the cause: BIOS or firmware update, changed boot order, USB device during boot, TPM change.', 'If company policy requires it: have the key rotated after use (often automatic via Intune).'],
  fix: 'Cause was a BIOS update with a USB stick plugged in during restart. Key read out, device started, USB stick removed.',
  verify: 'Normal start without prompt after another restart. "manage-bde -status" shows protection on.',
  note: 'BitLocker recovery NB-0219, identity confirmed by call-back. Key ID 1A2B3C4D, key from Entra ID given by phone. Cause: BIOS update with USB stick. Restart without prompt ok, protection on, key rotation triggered via Intune.',
  say: '"I\'ll read the key to you now in groups of eight; please type along. Afterwards please remove the USB stick, it disturbed the start-up."',
  esc: 'To 2nd level if no key is stored or the prompt appears on every start. Data loss is then at risk.',
  boss: 'You know where keys are stored, verify identity and pass keys on only securely.'
 },
 fa: {
  t: 'BitLocker کلید بازیابی می‌خواهد',
  msg: '«لپ‌تاپم یک صفحهٔ آبی نشان می‌دهد و کلید بازیابی ۴۸ رقمی می‌خواهد. من این کلید را ندارم.»',
  ask: ['چه کسی تماس گرفته و هویت را چطور تأیید کنیم؟', 'روی صفحه کنار «Recovery key ID» چه نوشته؟ هشت نویسهٔ اول کافی است.', 'پیش از این چه شد؟ به‌روزرسانی، به‌روزرسانی BIOS، Dock تازه، فلش USB وصل بود یا قطعه‌ای عوض شد؟'],
  steps: ['هویت را بسنج. این کلید همهٔ داده‌های دستگاه را باز می‌کند و فقط باید به فرد مجاز برسد.', 'کلید را با Key ID پیدا کن: در Microsoft Entra admin center یا Intune زیر BitLocker keys دستگاه، یا در AD روی شیء رایانه.', 'کلید را تلفنی و بخش‌به‌بخش بخوان؛ هرگز با ایمیل یا چت نفرست.', 'پس از روشن شدن، علت را روشن کن: به‌روزرسانی BIOS یا Firmware، تغییر ترتیب بوت، دستگاه USB هنگام روشن شدن یا تغییر TPM.', 'اگر قانون شرکت می‌خواهد: کلید را پس از استفاده عوض کن (اغلب خودکار از طریق Intune).'],
  fix: 'علت به‌روزرسانی BIOS بود، در حالی که هنگام ری‌استارت فلش USB وصل بود. کلید خوانده شد، دستگاه روشن شد و فلش جدا شد.',
  verify: 'پس از ری‌استارت دوباره، بدون درخواست کلید عادی روشن می‌شود و «manage-bde -status» محافظت فعال را نشان می‌دهد.',
  note: 'بازیابی BitLocker برای NB-0219، هویت با تماس برگشتی تأیید شد. Key ID برابر 1A2B3C4D؛ کلید از Entra ID تلفنی داده شد. علت: به‌روزرسانی BIOS با فلش USB. ری‌استارت بدون درخواست کلید موفق، محافظت فعال و تعویض کلید از طریق Intune آغاز شد.',
  say: '«الان کلید را در گروه‌های هشت‌تایی می‌خوانم؛ لطفاً هم‌زمان تایپ کنید. بعد لطفاً فلش USB را جدا کنید؛ همان باعث اختلال در روشن شدن بود.»',
  esc: 'به 2nd Level، اگر کلیدی ذخیره نشده یا در هر روشن شدن کلید خواسته می‌شود؛ خطر از دست رفتن داده هست.',
  boss: 'می‌دانی کلیدها کجا ذخیره می‌شوند، هویت را می‌سنجی و کلید را فقط امن تحویل می‌دهی.'
 }
},
{
 id: 'dock', area: 'device', prio: 4, roles: ['onsite', 'helpdesk'], lessons: ['hardware'],
 cmd: null,
 de: {
  t: 'Dockingstation: zweiter Bildschirm bleibt schwarz',
  msg: '„Ich habe heute den Schreibtisch gewechselt. Am Dock geht nur ein Bildschirm, der andere bleibt schwarz.“',
  ask: ['Welches Dock und welcher Anschluss am Notebook (USB-C, Thunderbolt)?', 'Leuchtet die Betriebsanzeige am Dock und am Bildschirm?', 'Funktionieren Maus, Tastatur und Netzwerk über das Dock?'],
  steps: ['Dock hat eigenes Netzteil eingesteckt? Bildschirm an, richtiger Eingang am Bildschirm gewählt?', 'Win+P drücken und „Erweitern“ wählen. Einstellungen → System → Anzeige → „Erkennen“.', 'Kabel tauschen und anderen Ausgang am Dock testen. Mit der Tauschmethode prüfen: Bildschirm, Kabel, Dock einzeln wechseln.', 'Grafiktreiber und Dock-Firmware mit dem Herstellerwerkzeug der Firma aktualisieren.', 'Nicht jeder USB-C-Anschluss überträgt Bild. Den richtigen Anschluss am Notebook verwenden (oft mit Blitz- oder DisplayPort-Symbol).'],
  fix: 'Am neuen Platz war der Bildschirm per HDMI auf den falschen Eingang gestellt und das Kabel defekt. Kabel getauscht, Eingang gewählt.',
  verify: 'Beide Bildschirme zeigen Bild, Anordnung entspricht der Tischaufstellung, nach Ab- und Anstecken des Notebooks bleibt alles erhalten.',
  note: 'Platz 2.14: zweiter Monitor schwarz. Monitor auf Eingang HDMI2, DP-Kabel defekt (Test mit Ersatzkabel). Kabel getauscht, Anzeige erweitert und angeordnet. Defektes Kabel entsorgt, Bestand angepasst.',
  say: '„Ein Kabel war kaputt und der Bildschirm stand auf dem falschen Eingang. Jetzt laufen beide. Wenn mal ein Bildschirm schwarz bleibt, hilft oft schon Windows-Taste und P.“',
  esc: 'An den Hardware-Support zum Tausch des Docks oder Bildschirms, wenn die Tauschmethode das Teil als defekt zeigt.',
  boss: 'Strukturiert mit Tauschmethode arbeiten, schnell vor Ort helfen und Material sauber im Bestand nachhalten.'
 },
 en: {
  t: 'Docking station: second monitor stays black',
  msg: '"I moved desks today. Only one monitor works on the dock, the other stays black."',
  ask: ['Which dock and which port on the laptop (USB-C, Thunderbolt)?', 'Are the power lights on at the dock and the monitor?', 'Do mouse, keyboard and network work through the dock?'],
  steps: ['Is the dock\'s own power supply plugged in? Monitor on, correct input selected on the monitor?', 'Press Win+P and choose "Extend". Settings → System → Display → "Detect".', 'Swap the cable and try another output on the dock. Use the swap method: change monitor, cable and dock one at a time.', 'Update graphics driver and dock firmware with the company\'s vendor tool.', 'Not every USB-C port carries video. Use the right port on the laptop (often marked with a lightning or DisplayPort symbol).'],
  fix: 'At the new desk the monitor was set to the wrong input and the cable was faulty. Cable replaced, input selected.',
  verify: 'Both monitors show a picture, arrangement matches the desk layout, everything stays after undocking and re-docking.',
  note: 'Desk 2.14: second monitor black. Monitor on input HDMI2, DP cable faulty (tested with spare). Cable replaced, display extended and arranged. Faulty cable disposed of, inventory updated.',
  say: '"A cable was broken and the monitor was on the wrong input. Both work now. If a screen stays black, Windows key and P often helps."',
  esc: 'To hardware support to replace the dock or monitor if the swap method shows the part is faulty.',
  boss: 'Work methodically with the swap method, help quickly on site and keep the inventory up to date.'
 },
 fa: {
  t: 'Docking Station: مانیتور دوم سیاه می‌ماند',
  msg: '«امروز میزم را عوض کردم. روی Dock فقط یک مانیتور کار می‌کند و دیگری سیاه می‌ماند.»',
  ask: ['کدام Dock و کدام پورت لپ‌تاپ (USB-C یا Thunderbolt)؟', 'چراغ روشن بودن Dock و مانیتور روشن است؟', 'ماوس، کیبورد و شبکه از طریق Dock کار می‌کنند؟'],
  steps: ['آداپتور برق خود Dock وصل است؟ مانیتور روشن است و ورودی درست روی مانیتور انتخاب شده؟', 'Win+P را بزن و «Extend» را انتخاب کن. Settings ← System ← Display ← «Detect».', 'کابل را عوض کن و خروجی دیگری از Dock را امتحان کن. با روش جایگزینی بسنج: مانیتور، کابل و Dock را یکی‌یکی عوض کن.', 'درایور گرافیک و Firmware Dock را با ابزار سازندهٔ مورد استفادهٔ شرکت به‌روز کن.', 'هر پورت USB-C تصویر منتقل نمی‌کند. از پورت درست لپ‌تاپ استفاده کن (اغلب با نماد صاعقه یا DisplayPort).'],
  fix: 'سر میز تازه، مانیتور روی ورودی اشتباه بود و کابل هم خراب بود. کابل عوض و ورودی درست انتخاب شد.',
  verify: 'هر دو مانیتور تصویر دارند، چیدمان با میز می‌خواند و پس از جدا و وصل کردن لپ‌تاپ همه‌چیز می‌ماند.',
  note: 'میز 2.14: مانیتور دوم سیاه. مانیتور روی ورودی HDMI2 بود و کابل DP خراب (آزمون با کابل یدک). کابل تعویض شد و نمایش Extend و چیده شد. کابل خراب دور انداخته و موجودی به‌روز شد.',
  say: '«یک کابل خراب بود و مانیتور روی ورودی اشتباه بود. حالا هر دو کار می‌کنند. اگر صفحه‌ای سیاه ماند، اغلب کلید Windows به‌همراه P کمک می‌کند.»',
  esc: 'به پشتیبانی سخت‌افزار برای تعویض Dock یا مانیتور، اگر روش جایگزینی خرابی قطعه را نشان دهد.',
  boss: 'با روش جایگزینی منظم کار کن، در محل سریع کمک کن و موجودی تجهیزات را مرتب نگه دار.'
 }
},
{
 id: 'software', area: 'device', prio: 4, roles: ['helpdesk', 'onsite', 'admin'], lessons: ['workstations', 'change'],
 cmd: null,
 de: {
  t: 'Benutzer will Software installieren, hat aber keine Adminrechte',
  msg: '„Ich brauche dringend das Programm XY für ein Kundenprojekt. Geben Sie mir bitte kurz das Admin-Kennwort, dann installiere ich es selbst.“',
  ask: ['Wofür genau wird das Programm gebraucht und ab wann?', 'Gibt es das Programm schon im Unternehmensportal oder Softwarekatalog?', 'Hat die Vorgesetzte zugestimmt, und wer bezahlt die Lizenz?'],
  steps: ['Das Admin-Kennwort wird nie herausgegeben und lokale Adminrechte werden nicht „mal kurz“ vergeben. Das ist eine der wichtigsten Sicherheitsregeln.', 'Im Unternehmensportal (Intune Company Portal) oder Softwarekatalog nachsehen. Ist das Programm dort, installiert der Benutzer es selbst.', 'Sonst Softwareanfrage nach Prozess: Geschäftszweck, Freigabe der Vorgesetzten, Lizenz, Prüfung durch IT-Sicherheit (Hersteller, Datenschutz).', 'Nach Freigabe die Installation über die zentrale Softwareverteilung bereitstellen, nicht manuell auf einem einzelnen PC.', 'Gibt es ein bereits freigegebenes Programm, das den Zweck erfüllt? Dann als Alternative anbieten.'],
  fix: 'Ein gleichwertiges, bereits freigegebenes Programm war im Unternehmensportal verfügbar. Für das gewünschte Programm wurde eine Anfrage gestellt.',
  verify: 'Der Benutzer arbeitet mit dem freigegebenen Programm. Die Anfrage ist mit Freigabe dokumentiert.',
  note: 'Anfrage Software XY, Admin-Kennwort verweigert (Richtlinie). Alternative ZZ im Company Portal angeboten, installiert durch Benutzer. Softwareanfrage #4901 für XY mit Geschäftszweck an Vorgesetzte zur Freigabe gesendet.',
  say: '„Das Admin-Kennwort darf ich aus Sicherheitsgründen nicht herausgeben. Für heute kann ich Ihnen ZZ aus dem Unternehmensportal anbieten, das kann dasselbe. Für XY habe ich die Anfrage an Ihre Vorgesetzte geschickt.“',
  esc: 'An Softwareverantwortliche und IT-Sicherheit zur Prüfung neuer Programme. Bei Druck durch Vorgesetzte an die eigene Teamleitung.',
  boss: 'Freundlich, aber klar Nein sagen, wenn eine Bitte gegen Sicherheitsregeln verstößt, und trotzdem eine Lösung anbieten.'
 },
 en: {
  t: 'User wants to install software but has no admin rights',
  msg: '"I urgently need program XY for a customer project. Just give me the admin password quickly and I\'ll install it myself."',
  ask: ['What exactly is the program needed for, and from when?', 'Is the program already in the company portal or software catalogue?', 'Has your manager agreed, and who pays for the licence?'],
  steps: ['The admin password is never handed out and local admin rights are not granted "just quickly". This is one of the most important security rules.', 'Check the Company Portal (Intune) or software catalogue. If the program is there, the user installs it themselves.', 'Otherwise a software request through the process: business purpose, manager approval, licence, review by IT security (vendor, data protection).', 'After approval, deploy via central software distribution, not manually on a single PC.', 'Is there an already approved program that does the job? Offer it as an alternative.'],
  fix: 'An equivalent, already approved program was available in the Company Portal. A request was raised for the requested program.',
  verify: 'The user works with the approved program. The request is documented with approval.',
  note: 'Request for software XY, admin password refused (policy). Alternative ZZ offered in Company Portal, installed by user. Software request #4901 for XY with business purpose sent to manager for approval.',
  say: '"I\'m not allowed to give out the admin password for security reasons. For today I can offer you ZZ from the company portal, it does the same. I have sent the request for XY to your manager."',
  esc: 'To the software owner and IT security to review new programs. If a manager puts pressure on you, to your own team lead.',
  boss: 'Say no politely but clearly when a request breaks security rules, and still offer a solution.'
 },
 fa: {
  t: 'کاربر می‌خواهد نرم‌افزار نصب کند ولی دسترسی Admin ندارد',
  msg: '«برای یک پروژهٔ مشتری فوراً برنامهٔ XY را لازم دارم. لطفاً فقط گذرواژهٔ Admin را بدهید تا خودم نصبش کنم.»',
  ask: ['برنامه دقیقاً برای چه کاری و از کی لازم است؟', 'آیا برنامه در Company Portal یا کاتالوگ نرم‌افزار شرکت هست؟', 'مدیرتان موافقت کرده و هزینهٔ لایسنس را چه کسی می‌دهد؟'],
  steps: ['گذرواژهٔ Admin هرگز داده نمی‌شود و دسترسی Admin محلی «فقط برای یک لحظه» هم داده نمی‌شود. این یکی از مهم‌ترین قوانین امنیتی است.', 'Company Portal (Intune) یا کاتالوگ نرم‌افزار را ببین. اگر برنامه آنجاست، کاربر خودش نصبش می‌کند.', 'در غیر این صورت درخواست نرم‌افزار طبق روند: هدف کاری، تأیید مدیر، لایسنس و بررسی تیم امنیت IT (سازنده، حفاظت داده).', 'پس از تأیید، نصب را از طریق توزیع مرکزی نرم‌افزار انجام بده، نه دستی روی یک رایانه.', 'آیا برنامهٔ تأییدشده‌ای هست که همین کار را بکند؟ آن را به‌عنوان جایگزین پیشنهاد بده.'],
  fix: 'یک برنامهٔ هم‌ارز و تأییدشده در Company Portal بود. برای برنامهٔ درخواستی هم درخواست ثبت شد.',
  verify: 'کاربر با برنامهٔ تأییدشده کار می‌کند و درخواست با تأیید ثبت شده است.',
  note: 'درخواست نرم‌افزار XY؛ گذرواژهٔ Admin طبق سیاست داده نشد. جایگزین ZZ در Company Portal پیشنهاد و توسط کاربر نصب شد. درخواست نرم‌افزار شمارهٔ 4901 برای XY با هدف کاری برای تأیید به مدیر فرستاده شد.',
  say: '«به دلایل امنیتی اجازه ندارم گذرواژهٔ Admin را بدهم. برای امروز ZZ را از Company Portal پیشنهاد می‌کنم که همین کار را می‌کند. درخواست XY را هم برای مدیرتان فرستادم.»',
  esc: 'به مسئول نرم‌افزار و تیم امنیت IT برای بررسی برنامه‌های تازه. اگر مدیری فشار آورد، به سرپرست تیم خودت.',
  boss: 'وقتی درخواستی خلاف قوانین امنیتی است، مؤدبانه ولی روشن «نه» بگو و باز هم راه‌حلی پیشنهاد بده.'
 }
},
{
 id: 'printer', area: 'print', prio: 3, roles: ['onsite', 'helpdesk'], lessons: ['printing-storage'],
 cmd: 'Get-Printer | Select-Object Name,PortName,PrinterStatus\nGet-PrintJob -PrinterName "OG2-Farbdrucker"\nTest-NetConnection 10.20.0.60 -Port 9100\nRestart-Service Spooler     # nur auf dem eigenen PC, nicht auf dem Druckserver ohne Freigabe',
 de: {
  t: 'Drucker druckt nicht, Aufträge hängen in der Warteschlange',
  msg: '„Ich drucke und drucke, aber es kommt nichts raus. In der Liste stehen schon sechs Aufträge.“',
  ask: ['Welcher Drucker genau (Name am Gerät oder Standort)?', 'Können Kollegen auf diesem Drucker drucken?', 'Zeigt das Display am Drucker etwas an: Papierstau, Toner leer, Fehler?'],
  steps: ['Kollegen können drucken: Problem liegt am PC des Benutzers. Kollegen können auch nicht: Problem am Drucker, Netz oder Druckserver.', 'Am Gerät nachsehen: Papier, Stau, Toner, Fehlermeldung, Netzwerkkabel. Viele Druckertickets lösen sich hier.', 'Richtiger Drucker als Ziel gewählt? Häufig ist ein alter oder „Microsoft Print to PDF“ als Standard eingestellt.', 'Warteschlange öffnen, den hängenden ersten Auftrag abbrechen. Auf dem eigenen PC hilft danach ein Neustart des Druckwarteschlangendienstes.', 'Druckserver oder Treiber vermutet: nicht selbst den Dienst auf dem Druckserver neu starten, das betrifft alle. An den Admin geben.'],
  fix: 'Erster Auftrag (große PDF) hing und blockierte die übrigen. Auftrag gelöscht, Druck lief durch.',
  verify: 'Eine Testseite und der ursprüngliche Ausdruck kommen am richtigen Drucker an.',
  note: 'OG2-Farbdrucker: Aufträge hängen nur bei Benutzer B. Sommer, Kollegen ok. Erster Auftrag (PDF 180 MB) blockiert. Auftrag gelöscht, Spooler lokal neu gestartet, Testdruck ok. Tipp gegeben: große PDFs vorher verkleinern.',
  say: '„Ein sehr großer Auftrag hing vorne in der Schlange und hat die anderen blockiert. Ich habe ihn gelöscht, jetzt druckt es. Den großen Plan schicke ich Ihnen gern verkleinert.“',
  esc: 'An den Admin bei Problemen am Druckserver oder Treiber für alle. An den Druckerservice des Herstellers bei Hardwarefehlern mit Fehlercode.',
  boss: 'Drucker sind im Alltag sehr häufig. Du prüfst zuerst einfach und vor Ort und beeinträchtigst nicht alle Benutzer durch einen unüberlegten Neustart.'
 },
 en: {
  t: 'Printer does not print, jobs stuck in the queue',
  msg: '"I keep printing but nothing comes out. There are already six jobs in the list."',
  ask: ['Which printer exactly (name on the device or location)?', 'Can colleagues print to this printer?', 'Does the printer\'s display show anything: paper jam, toner empty, error?'],
  steps: ['Colleagues can print: the problem is on the user\'s PC. Colleagues cannot either: problem at the printer, network or print server.', 'Check the device: paper, jam, toner, error message, network cable. Many printer tickets are solved here.', 'Correct printer selected? Often an old one or "Microsoft Print to PDF" is the default.', 'Open the queue, cancel the stuck first job. On the user\'s own PC, restarting the Print Spooler service afterwards helps.', 'Print server or driver suspected: do not restart the service on the print server yourself, that affects everyone. Hand it to the admin.'],
  fix: 'The first job (a large PDF) was stuck and blocked the others. Job deleted, printing went through.',
  verify: 'A test page and the original printout arrive at the correct printer.',
  note: 'OG2 colour printer: jobs stuck only for user B. Sommer, colleagues ok. First job (180 MB PDF) blocked. Job deleted, spooler restarted locally, test print ok. Tip given: reduce large PDFs first.',
  say: '"A very large job was stuck at the front of the queue and blocked the others. I deleted it and it\'s printing now. I\'m happy to send you the large plan in a smaller version."',
  esc: 'To the admin for print server or driver problems affecting everyone. To the vendor\'s printer service for hardware faults with an error code.',
  boss: 'Printers are very common day to day. You check simply and on site first, and do not disrupt every user with a careless restart.'
 },
 fa: {
  t: 'چاپگر چاپ نمی‌کند و کارها در صف می‌مانند',
  msg: '«مدام چاپ می‌زنم ولی چیزی بیرون نمی‌آید. شش کار در فهرست مانده است.»',
  ask: ['دقیقاً کدام چاپگر (نام روی دستگاه یا محل آن)؟', 'همکاران می‌توانند با همین چاپگر چاپ کنند؟', 'صفحهٔ نمایش چاپگر چیزی نشان می‌دهد: گیر کردن کاغذ، تمام شدن تونر یا خطا؟'],
  steps: ['اگر همکاران می‌توانند چاپ کنند: مشکل از رایانهٔ کاربر است. اگر آن‌ها هم نمی‌توانند: مشکل از چاپگر، شبکه یا Print Server است.', 'خود دستگاه را ببین: کاغذ، گیر کردن، تونر، پیام خطا و کابل شبکه. خیلی از تیکت‌های چاپگر همین‌جا حل می‌شوند.', 'چاپگر درست انتخاب شده؟ اغلب یک چاپگر قدیمی یا «Microsoft Print to PDF» پیش‌فرض است.', 'صف را باز کن و کار اولِ گیرکرده را لغو کن. روی رایانهٔ خود کاربر، ری‌استارت سرویس Print Spooler پس از آن کمک می‌کند.', 'اگر به Print Server یا درایور مشکوکی: سرویس را روی Print Server خودت ری‌استارت نکن، چون همه را درگیر می‌کند. به مدیر بسپار.'],
  fix: 'کار اول (یک PDF بزرگ) گیر کرده بود و بقیه را مسدود کرده بود. کار حذف شد و چاپ انجام شد.',
  verify: 'یک صفحهٔ آزمایشی و چاپ اصلی روی چاپگر درست بیرون می‌آیند.',
  note: 'چاپگر رنگی OG2: کارها فقط برای کاربر B. Sommer گیر می‌کنند و همکاران مشکلی ندارند. کار اول (PDF حدود ۱۸۰ مگابایت) مسدود کرده بود. کار حذف و Spooler محلی ری‌استارت شد؛ چاپ آزمایشی موفق. توصیه داده شد PDFهای بزرگ را پیش از چاپ کوچک کند.',
  say: '«یک کار خیلی بزرگ اول صف گیر کرده بود و بقیه را نگه داشته بود. حذفش کردم و حالا چاپ می‌کند. اگر بخواهید، نقشهٔ بزرگ را کوچک‌شده برایتان می‌فرستم.»',
  esc: 'به مدیر برای مشکل Print Server یا درایوری که همه را درگیر می‌کند. به خدمات سازندهٔ چاپگر برای خرابی سخت‌افزاری با کد خطا.',
  boss: 'چاپگر در کار روزانه بسیار رایج است. اول ساده و در محل بررسی می‌کنی و با ری‌استارت بی‌فکر همهٔ کاربران را مختل نمی‌کنی.'
 }
},
{
 id: 'phishing', area: 'security', prio: 1, roles: ['helpdesk', 'onsite', 'admin', 'fisi'], lessons: ['monitoring'],
 cmd: 'Connect-ExchangeOnline\nGet-InboxRule -Mailbox lena.weber@firma.de | Select-Object Name,Enabled,ForwardTo,RedirectTo,DeleteMessage',
 de: {
  t: 'Benutzerin hat auf einen Link in einer Phishing-Mail geklickt',
  msg: '„Ich habe eine Mail von ‚Microsoft‘ bekommen, dass mein Postfach voll ist. Ich habe auf den Link geklickt und mein Kennwort eingegeben. Jetzt habe ich ein schlechtes Gefühl.“',
  ask: ['Danke, dass Sie sich sofort melden. Was genau haben Sie gemacht: nur geklickt, Kennwort eingegeben, eine Datei geöffnet, eine MFA-Anfrage bestätigt?', 'Wann war das ungefähr?', 'Von welcher Adresse kam die Mail? Bitte nicht löschen und nicht weiterleiten, außer über den Melden-Knopf.'],
  steps: ['Ruhig und ohne Vorwurf bleiben. Wer sich schnell meldet, verhindert Schaden. Das ist ein Sicherheitsvorfall mit hoher Priorität.', 'Kennwort eingegeben: Kennwort sofort zurücksetzen, alle Sitzungen widerrufen, MFA-Methoden auf fremde Einträge prüfen.', 'Postfachregeln prüfen. Angreifer legen oft Weiterleitungs- oder Löschregeln an. Anmeldeprotokolle auf fremde Anmeldungen prüfen.', 'Datei geöffnet: Gerät vom Netzwerk trennen (Kabel ab, WLAN aus), aber nicht ausschalten. Weiter nach Vorgabe der IT-Sicherheit.', 'IT-Sicherheit informieren und die Mail melden, damit sie bei allen Empfängern entfernt und Absender oder Link gesperrt werden. Ob ein meldepflichtiger Datenschutzvorfall vorliegt, entscheiden IT-Sicherheit und Datenschutzbeauftragte. Die Frist dafür ist kurz (72 Stunden).'],
  fix: 'Kennwort zurückgesetzt, Sitzungen widerrufen. Eine vom Angreifer angelegte Weiterleitungsregel gefunden und entfernt. IT-Sicherheit übernimmt die weitere Analyse.',
  verify: 'Keine fremden Anmeldungen nach dem Zurücksetzen, keine Weiterleitungsregeln, Benutzerin meldet sich mit neuem Kennwort und MFA an.',
  note: 'Sicherheitsvorfall: L. Weber hat 09:12 auf Phishing-Link geklickt und Kennwort eingegeben (Meldung 09:20). 09:24 Kennwort zurückgesetzt, Sitzungen widerrufen. Postfachregel „.“ mit Weiterleitung an extern gefunden und entfernt. Anmeldung aus fremdem Land 09:15 im Protokoll. Übergabe an IT-Sicherheit 09:30 inkl. Original-Mail, Ticket P1.',
  say: '„Sie haben genau richtig gehandelt, indem Sie sich sofort gemeldet haben. Ich setze jetzt Ihr Kennwort zurück und prüfe Ihr Postfach. Die IT-Sicherheit meldet sich danach noch bei Ihnen.“',
  esc: 'Sofort an die IT-Sicherheit, in jedem Fall. Bei geöffneten Dateien oder fremden Anmeldungen zusätzlich an die Teamleitung.',
  boss: 'Du erkennst Sicherheitsvorfälle, handelst in der richtigen Reihenfolge, bleibst respektvoll und dokumentierst mit Uhrzeiten. Sicherheitsbewusstsein steht in fast jeder Stellenanzeige.'
 },
 en: {
  t: 'User clicked a link in a phishing email',
  msg: '"I got a mail from \'Microsoft\' saying my mailbox is full. I clicked the link and entered my password. Now I have a bad feeling."',
  ask: ['Thank you for reporting this immediately. What exactly did you do: only click, enter the password, open a file, approve an MFA prompt?', 'Roughly when was that?', 'Which address did the mail come from? Please do not delete or forward it, except via the Report button.'],
  steps: ['Stay calm and do not blame. Reporting quickly prevents damage. This is a high-priority security incident.', 'Password entered: reset the password immediately, revoke all sessions, check MFA methods for unknown entries.', 'Check mailbox rules. Attackers often create forwarding or delete rules. Check sign-in logs for unknown sign-ins.', 'File opened: disconnect the device from the network (unplug cable, Wi-Fi off) but do not shut it down. Continue as IT security instructs.', 'Inform IT security and report the mail so it is removed from all recipients and sender or link are blocked. Whether a reportable data breach exists is decided by IT security and the data protection officer; the deadline is short (72 hours).'],
  fix: 'Password reset, sessions revoked. A forwarding rule created by the attacker found and removed. IT security takes over further analysis.',
  verify: 'No unknown sign-ins after the reset, no forwarding rules, the user signs in with new password and MFA.',
  note: 'Security incident: L. Weber clicked phishing link at 09:12 and entered password (reported 09:20). 09:24 password reset, sessions revoked. Mailbox rule "." forwarding externally found and removed. Sign-in from unexpected country at 09:15 in log. Handed to IT security at 09:30 incl. original mail, ticket P1.',
  say: '"You did exactly the right thing by reporting it immediately. I\'m resetting your password now and checking your mailbox. IT security will contact you afterwards."',
  esc: 'Immediately to IT security, in every case. Additionally to the team lead if files were opened or unknown sign-ins occurred.',
  boss: 'You recognise security incidents, act in the right order, stay respectful and document with timestamps. Security awareness is in almost every job ad.'
 },
 fa: {
  t: 'کاربر روی لینک یک ایمیل فیشینگ کلیک کرده است',
  msg: '«ایمیلی از طرف Microsoft آمد که Mailbox شما پر است. روی لینک کلیک کردم و گذرواژه‌ام را وارد کردم. حالا حس بدی دارم.»',
  ask: ['ممنون که فوراً خبر دادید. دقیقاً چه کردید: فقط کلیک، وارد کردن گذرواژه، باز کردن فایل یا تأیید درخواست MFA؟', 'تقریباً چه ساعتی بود؟', 'ایمیل از چه آدرسی آمد؟ لطفاً پاک یا Forward نکنید، مگر با دکمهٔ Report.'],
  steps: ['آرام باش و سرزنش نکن. گزارش سریع جلوی خسارت را می‌گیرد. این یک رخداد امنیتی با اولویت بالاست.', 'اگر گذرواژه وارد شده: فوراً ریست کن، همهٔ نشست‌ها را باطل کن و روش‌های MFA را برای موارد ناشناس بسنج.', 'قوانین Mailbox را بسنج؛ مهاجمان اغلب قانون Forward یا حذف می‌سازند. Sign-in logs را برای ورودهای ناشناس ببین.', 'اگر فایلی باز شده: دستگاه را از شبکه جدا کن (کابل را بکش، WLAN را خاموش کن) ولی خاموشش نکن. طبق دستور تیم امنیت ادامه بده.', 'به تیم امنیت IT خبر بده و ایمیل را گزارش کن تا از همهٔ گیرنده‌ها حذف و فرستنده یا لینک مسدود شود. اینکه رخداد مشمول گزارش حفاظت داده است یا نه را تیم امنیت و مسئول حفاظت داده تصمیم می‌گیرند و مهلت کوتاه است (۷۲ ساعت).'],
  fix: 'گذرواژه ریست و نشست‌ها باطل شد. یک قانون Forward که مهاجم ساخته بود پیدا و حذف شد. تیم امنیت IT بررسی را ادامه می‌دهد.',
  verify: 'پس از ریست ورود ناشناسی نیست، قانون Forward وجود ندارد و کاربر با گذرواژهٔ تازه و MFA وارد می‌شود.',
  note: 'رخداد امنیتی: L. Weber ساعت ۹:۱۲ روی لینک فیشینگ کلیک و گذرواژه وارد کرد (گزارش ۹:۲۰). ۹:۲۴ گذرواژه ریست و نشست‌ها باطل شد. قانون Mailbox با نام «.» که به بیرون Forward می‌کرد پیدا و حذف شد. ورود از کشوری غیرمنتظره در ۹:۱۵ در لاگ. ۹:۳۰ با ایمیل اصلی به تیم امنیت سپرده شد؛ تیکت P1.',
  say: '«کاملاً درست عمل کردید که فوراً خبر دادید. الان گذرواژه‌تان را ریست می‌کنم و Mailbox را بررسی می‌کنم. بعد از آن تیم امنیت IT هم با شما تماس می‌گیرد.»',
  esc: 'فوراً و در هر حال به تیم امنیت IT. اگر فایلی باز شده یا ورود ناشناس دیده شده، به سرپرست تیم هم خبر بده.',
  boss: 'رخداد امنیتی را می‌شناسی، به ترتیب درست اقدام می‌کنی، محترمانه رفتار می‌کنی و با زمان دقیق ثبت می‌کنی. آگاهی امنیتی تقریباً در همهٔ آگهی‌های شغلی آمده است.'
 }
},
{
 id: 'major', area: 'process', prio: 1, roles: ['helpdesk', 'admin', 'fisi'], lessons: ['operations', 'monitoring', 'change'],
 cmd: null,
 de: {
  t: 'Viele Benutzer melden gleichzeitig: „Nichts geht“ (Großstörung)',
  msg: 'Innerhalb von zehn Minuten kommen 14 Anrufe: „Ich komme nicht ins Warenwirtschaftssystem.“',
  ask: ['Welche Standorte und Abteilungen sind betroffen?', 'Seit wann genau? Was ist die genaue Fehlermeldung?', 'Geht anderes noch, zum Beispiel E-Mail und Internet?'],
  steps: ['Muster erkennen: Viele gleiche Meldungen in kurzer Zeit sind kein Einzelfall. Sofort die Teamleitung informieren.', 'Ein Haupt-Ticket mit höchster Priorität anlegen und alle weiteren Meldungen damit verknüpfen, statt 14 Einzeltickets zu bearbeiten.', 'Überwachung und Dienststatus prüfen, Auswirkung abschätzen: Wie viele Benutzer, welche Geschäftsprozesse?', 'Statusmeldung an die Benutzer: was betroffen ist, Umgehungslösung falls vorhanden, wann das nächste Update kommt. Telefonansage oder Banner im Portal anpassen.', 'Keine unabgestimmten Änderungen machen. Zeitleiste führen (wer hat wann was gemacht). Nach der Lösung: Problem-Ticket zur dauerhaften Ursachenbeseitigung.'],
  fix: 'Abgelaufenes Zertifikat am Anwendungsserver. Der Admin hat es erneuert, die Anwendung lief wieder.',
  verify: 'Stichprobenanrufe bei drei betroffenen Benutzern bestätigen den Zugriff. Haupt-Ticket und verknüpfte Tickets geschlossen, Abschlussmeldung versendet.',
  note: 'Major Incident Warenwirtschaft, Beginn 08:05, alle Standorte, ca. 120 Benutzer. 08:15 Teamleitung informiert, Haupt-Ticket P1, 14 Tickets verknüpft. 08:20 Statusmeldung, Ansage geschaltet. Ursache Zertifikat abgelaufen, 09:10 erneuert (Admin K. Roth). 09:20 Prüfung ok, Abschlussmeldung. Problem-Ticket #5002: Zertifikatsüberwachung einrichten.',
  say: 'Statusmeldung: „Seit 08:05 ist das Warenwirtschaftssystem an allen Standorten nicht erreichbar. Wir arbeiten mit Hochdruck daran. Nächste Information spätestens 08:45. E-Mail und Telefonie sind nicht betroffen.“',
  esc: 'Sofort an Teamleitung und den zuständigen 2nd- oder 3rd-Level, nach dem Major-Incident-Prozess der Firma.',
  boss: 'Du erkennst Großstörungen, priorisierst nach Auswirkung und Dringlichkeit, kommunizierst regelmäßig und arbeitest nach Prozess (ITIL: Incident, Major Incident, Problem).'
 },
 en: {
  t: 'Many users report at once: "Nothing works" (major incident)',
  msg: 'Within ten minutes 14 calls come in: "I can\'t get into the ERP system."',
  ask: ['Which sites and departments are affected?', 'Since exactly when? What is the exact error message?', 'Does anything else still work, for example email and internet?'],
  steps: ['Recognise the pattern: many identical reports in a short time are not a single case. Inform the team lead immediately.', 'Create one master ticket with the highest priority and link all further reports to it instead of handling 14 separate tickets.', 'Check monitoring and service status, estimate impact: how many users, which business processes?', 'Status message to users: what is affected, workaround if available, when the next update comes. Update the phone announcement or the portal banner.', 'Make no uncoordinated changes. Keep a timeline (who did what when). After resolution: a problem ticket to remove the root cause permanently.'],
  fix: 'Expired certificate on the application server. The admin renewed it and the application ran again.',
  verify: 'Spot-check calls to three affected users confirm access. Master and linked tickets closed, closing message sent.',
  note: 'Major incident ERP, start 08:05, all sites, approx. 120 users. 08:15 team lead informed, master ticket P1, 14 tickets linked. 08:20 status message, announcement switched on. Cause: certificate expired, renewed 09:10 (admin K. Roth). 09:20 check ok, closing message. Problem ticket #5002: set up certificate monitoring.',
  say: 'Status message: "Since 08:05 the ERP system has been unavailable at all sites. We are working on it with high priority. Next update by 08:45 at the latest. Email and phone are not affected."',
  esc: 'Immediately to the team lead and the responsible 2nd or 3rd level, following the company\'s major incident process.',
  boss: 'You recognise major incidents, prioritise by impact and urgency, communicate regularly and work by process (ITIL: incident, major incident, problem).'
 },
 fa: {
  t: 'کاربران زیادی هم‌زمان می‌گویند «هیچ‌چیز کار نمی‌کند» (اختلال بزرگ)',
  msg: 'در ده دقیقه ۱۴ تماس می‌آید: «نمی‌توانم وارد سیستم مدیریت کالا (ERP) شوم.»',
  ask: ['کدام شعبه‌ها و بخش‌ها گرفتارند؟', 'دقیقاً از کی؟ پیام خطای دقیق چیست؟', 'چیزهای دیگر کار می‌کنند؟ مثلاً ایمیل و اینترنت؟'],
  steps: ['الگو را ببین: گزارش‌های یکسانِ زیاد در زمان کوتاه، مورد تکی نیست. فوراً به سرپرست تیم خبر بده.', 'یک تیکت اصلی با بالاترین اولویت بساز و همهٔ گزارش‌های دیگر را به آن پیوند بده، به‌جای کار روی ۱۴ تیکت جدا.', 'Monitoring و وضعیت سرویس را ببین و اثر را برآورد کن: چند کاربر و کدام فرایندهای کاری؟', 'پیام وضعیت به کاربران: چه چیزی درگیر است، راه موقت اگر هست و زمان خبر بعدی. پیام تلفن گویا یا بنر پورتال را به‌روز کن.', 'تغییر هماهنگ‌نشده نده. خط زمانی نگه دار (چه کسی، کی، چه کرد). پس از حل: یک تیکت Problem برای رفع دائمی علت ریشه‌ای.'],
  fix: 'گواهی منقضی‌شده روی سرور برنامه. مدیر آن را تمدید کرد و برنامه دوباره کار کرد.',
  verify: 'تماس نمونه با سه کاربر گرفتار، دسترسی را تأیید می‌کند. تیکت اصلی و تیکت‌های پیوندی بسته و پیام پایانی فرستاده شد.',
  note: 'Major Incident سیستم ERP، شروع ۸:۰۵، همهٔ شعبه‌ها، حدود ۱۲۰ کاربر. ۸:۱۵ سرپرست تیم مطلع شد، تیکت اصلی P1 و ۱۴ تیکت پیوند شد. ۸:۲۰ پیام وضعیت و پیام تلفن گویا. علت: گواهی منقضی، ۹:۱۰ تمدید شد (مدیر K. Roth). ۹:۲۰ بررسی موفق و پیام پایانی. تیکت Problem شمارهٔ 5002: راه‌اندازی پایش گواهی‌ها.',
  say: 'پیام وضعیت: «از ساعت ۸:۰۵ سیستم ERP در همهٔ شعبه‌ها در دسترس نیست. با جدیت روی آن کار می‌کنیم. خبر بعدی حداکثر تا ساعت ۸:۴۵. ایمیل و تلفن درگیر نیستند.»',
  esc: 'فوراً به سرپرست تیم و 2nd یا 3rd Level مسئول، طبق روند Major Incident شرکت.',
  boss: 'اختلال بزرگ را تشخیص می‌دهی، بر اساس اثر و فوریت اولویت می‌گذاری، منظم اطلاع‌رسانی می‌کنی و طبق روند کار می‌کنی (ITIL: Incident، Major Incident، Problem).'
 }
}
);
/* Was Firmen erwarten · Teil 1: Arbeitsmethode, Rollen, Kompetenzen */
window.LAB.workJobs = window.LAB.workJobs || {};
Object.assign(window.LAB.workJobs, {
 method: {
  de: ['Annehmen: Name, Rückrufnummer, Gerät, genaue Meldung. Ein Ticket pro Anliegen.', 'Einordnen: Störung oder Anfrage? Wie viele betroffen (Auswirkung), wie eilig (Dringlichkeit)? Daraus folgt die Priorität.', 'Nachfragen: Seit wann? Was hat sich geändert? Nur Sie oder auch andere? Was steht wörtlich in der Fehlermeldung?', 'Eingrenzen: von einfach nach komplex, eine Änderung nach der anderen, jedes Ergebnis notieren.', 'Lösen oder eskalieren: im eigenen Rahmen lösen. Sonst mit allen Nachweisen an die richtige Stelle geben.', 'Prüfen: der Benutzer bestätigt, dass es funktioniert, getestet mit seinem Konto.', 'Dokumentieren und abschließen: Ursache, Lösung, Test in verständlichen Worten ins Ticket. Bei Wiederholungen einen Wissensartikel anlegen.'],
  en: ['Receive: name, call-back number, device, exact report. One ticket per issue.', 'Classify: incident or request? How many affected (impact), how urgent (urgency)? That gives the priority.', 'Ask: since when? What changed? Only you or others too? What exactly does the error say?', 'Narrow down: from simple to complex, one change at a time, record every result.', 'Resolve or escalate: resolve within your remit. Otherwise hand over with all evidence to the right team.', 'Verify: the user confirms it works, tested with their account.', 'Document and close: cause, fix and test in plain words in the ticket. For repeat issues create a knowledge article.'],
  fa: ['دریافت: نام، شمارهٔ تماس، دستگاه و شرح دقیق. برای هر موضوع یک تیکت.', 'دسته‌بندی: اختلال (Incident) یا درخواست؟ چند نفر گرفتارند (اثر) و چقدر فوری است (فوریت)؟ اولویت از این دو به دست می‌آید.', 'پرسیدن: از کی؟ چه چیزی عوض شده؟ فقط شما یا دیگران هم؟ متن دقیق پیام خطا چیست؟', 'محدود کردن: از ساده به پیچیده، هر بار یک تغییر و ثبت نتیجهٔ هر کار.', 'حل یا ارجاع: در حد اختیار خودت حل کن، وگرنه با همهٔ شواهد به تیم درست بسپار.', 'بررسی: کاربر تأیید می‌کند که کار می‌کند؛ با حساب خود کاربر آزمایش شده باشد.', 'ثبت و بستن: علت، راه‌حل و آزمون را با زبان ساده در تیکت بنویس. برای مشکلات تکراری مقالهٔ دانش بساز.']
 },
 areas: {
  account: { de: 'Konten', en: 'Accounts', fa: 'حساب‌ها' },
  m365: { de: 'Microsoft 365', en: 'Microsoft 365', fa: 'Microsoft 365' },
  onboarding: { de: 'Ein- und Austritt', en: 'Joiners and leavers', fa: 'ورود و خروج همکاران' },
  network: { de: 'Netzwerk', en: 'Network', fa: 'شبکه' },
  device: { de: 'Geräte', en: 'Devices', fa: 'دستگاه‌ها' },
  print: { de: 'Drucken', en: 'Printing', fa: 'چاپ' },
  security: { de: 'Sicherheit', en: 'Security', fa: 'امنیت' },
  process: { de: 'Prozess', en: 'Process', fa: 'روند کار' }
 },
 prio: {
  1: { de: 'P1 · kritisch', en: 'P1 · critical', fa: 'P1 · بحرانی' },
  2: { de: 'P2 · hoch', en: 'P2 · high', fa: 'P2 · بالا' },
  3: { de: 'P3 · mittel', en: 'P3 · medium', fa: 'P3 · متوسط' },
  4: { de: 'P4 · niedrig', en: 'P4 · low', fa: 'P4 · پایین' }
 },
 roles: [
  { id: 'helpdesk',
    must: ['s-win', 's-ad', 's-entra', 's-exo', 's-tcpip', 's-perm', 's-itil', 's-ticket', 's-comm', 's-sec', 's-bitlocker', 's-onoff'],
    plus: ['s-intune', 's-ps', 's-print', 's-priv'],
    de: { t: 'IT-Support / Helpdesk (1st und 2nd Level)', sum: 'Erste Anlaufstelle für Mitarbeitende. Du nimmst Anfragen per Telefon, E-Mail und Ticketportal an, löst Standardprobleme selbst und gibst den Rest sauber dokumentiert weiter.', day: ['Kennwörter, Kontosperren und MFA', 'Outlook, Teams, OneDrive und Freigaben', 'Rechte auf Ordner und Postfächer nach Freigabe vergeben', 'Neue Mitarbeitende vorbereiten, Austritte sperren', 'Fernwartung mit Zustimmung des Benutzers', 'Tickets priorisieren, dokumentieren, eskalieren'] },
    en: { t: 'IT support / help desk (1st and 2nd level)', sum: 'First point of contact for employees. You take requests by phone, email and ticket portal, solve standard problems yourself and pass the rest on with clean documentation.', day: ['Passwords, lockouts and MFA', 'Outlook, Teams, OneDrive and shares', 'Grant folder and mailbox permissions after approval', 'Prepare new employees, block leavers', 'Remote support with the user\'s consent', 'Prioritise, document and escalate tickets'] },
    fa: { t: 'پشتیبانی IT / Helpdesk (سطح ۱ و ۲)', sum: 'اولین نقطهٔ تماس کارکنان. درخواست‌ها را از تلفن، ایمیل و پورتال تیکت می‌گیری، مشکلات استاندارد را خودت حل می‌کنی و بقیه را با ثبت مرتب به تیم مناسب می‌سپاری.', day: ['گذرواژه، قفل شدن حساب و MFA', 'Outlook، Teams، OneDrive و اشتراک‌ها', 'دادن دسترسی پوشه و Mailbox پس از تأیید', 'آماده‌سازی همکاران تازه و بستن دسترسی افراد خارج‌شده', 'پشتیبانی از راه دور با رضایت کاربر', 'اولویت‌بندی، ثبت و ارجاع تیکت‌ها'] } },
  { id: 'onsite',
    must: ['s-win', 's-hw', 's-print', 's-tcpip', 's-net2', 's-mobile', 's-onoff', 's-ticket', 's-comm', 's-sec', 's-bitlocker'],
    plus: ['s-intune', 's-ad', 's-perm'],
    de: { t: 'IT-Techniker vor Ort', sum: 'Du bist im Gebäude unterwegs: Arbeitsplätze aufbauen, Geräte tauschen, Drucker, Netzwerkdosen, WLAN und Besprechungsräume betreuen. Oft mit Führerschein für mehrere Standorte.', day: ['Arbeitsplätze mit Notebook, Dock und Monitoren aufbauen', 'Hardwarefehler mit Tauschmethode finden, Garantiefälle abwickeln', 'Drucker, Scanner und Konferenztechnik', 'Netzwerkanschlüsse und WLAN-Probleme vor Ort messen', 'Handys und Tablets einrichten (MDM)', 'Geräte im Bestand pflegen, Altgeräte datenschutzgerecht entsorgen'] },
    en: { t: 'On-site IT technician', sum: 'You work around the building: set up workstations, replace devices, look after printers, network sockets, Wi-Fi and meeting rooms. Often with a driving licence for several sites.', day: ['Set up desks with laptop, dock and monitors', 'Find hardware faults with the swap method, handle warranty cases', 'Printers, scanners and conference equipment', 'Measure network socket and Wi-Fi problems on site', 'Set up phones and tablets (MDM)', 'Maintain asset inventory, dispose of old devices securely'] },
    fa: { t: 'تکنسین IT در محل', sum: 'در ساختمان کار می‌کنی: میزهای کار را آماده می‌کنی، دستگاه عوض می‌کنی و چاپگر، پریز شبکه، WLAN و اتاق‌های جلسه را پشتیبانی می‌کنی. اغلب با گواهی‌نامهٔ رانندگی برای چند شعبه.', day: ['آماده‌سازی میز کار با لپ‌تاپ، Dock و مانیتور', 'یافتن خرابی سخت‌افزار با روش جایگزینی و پیگیری گارانتی', 'چاپگر، اسکنر و تجهیزات کنفرانس', 'اندازه‌گیری مشکلات پریز شبکه و WLAN در محل', 'راه‌اندازی گوشی و تبلت (MDM)', 'به‌روز نگه داشتن موجودی تجهیزات و امحای امن دستگاه‌های قدیمی'] } },
  { id: 'admin',
    must: ['s-ad', 's-perm', 's-gpo', 's-server', 's-tcpip', 's-net2', 's-backup', 's-ps', 's-entra', 's-exo', 's-virt', 's-sec', 's-itil'],
    plus: ['s-intune', 's-linux', 's-priv', 's-ticket'],
    de: { t: 'Junior-Systemadministrator', sum: 'Du betreust Server und zentrale Dienste: AD, DNS, DHCP, Dateiserver, Backup, Microsoft 365 und Entra ID. Daneben 2nd-Level-Support und erste Projekte.', day: ['Benutzer, Gruppen und Rechte im AD und in Entra ID', 'Server und Dienste überwachen, Updates planen', 'Backup prüfen und Wiederherstellung testen', 'Routineaufgaben mit PowerShell automatisieren', 'Virtualisierung (Hyper-V, VMware) betreuen', 'Änderungen planen, dokumentieren, mit Rückfallplan umsetzen'] },
    en: { t: 'Junior system administrator', sum: 'You look after servers and central services: AD, DNS, DHCP, file server, backup, Microsoft 365 and Entra ID. Plus 2nd-level support and first projects.', day: ['Users, groups and rights in AD and Entra ID', 'Monitor servers and services, plan updates', 'Check backups and test restores', 'Automate routine tasks with PowerShell', 'Look after virtualisation (Hyper-V, VMware)', 'Plan, document and implement changes with a rollback plan'] },
    fa: { t: 'مدیر سیستم تازه‌کار (Junior Sysadmin)', sum: 'سرورها و سرویس‌های مرکزی را مدیریت می‌کنی: AD، DNS، DHCP، File Server، Backup، Microsoft 365 و Entra ID. در کنار آن پشتیبانی سطح ۲ و اولین پروژه‌ها.', day: ['کاربران، گروه‌ها و دسترسی‌ها در AD و Entra ID', 'پایش سرورها و سرویس‌ها و برنامه‌ریزی به‌روزرسانی', 'بررسی Backup و آزمون بازیابی', 'خودکارسازی کارهای روزمره با PowerShell', 'مدیریت مجازی‌سازی (Hyper-V، VMware)', 'برنامه‌ریزی، ثبت و اجرای تغییرات با طرح بازگشت'] } },
  { id: 'fisi',
    must: ['s-win', 's-hw', 's-ad', 's-perm', 's-tcpip', 's-net2', 's-server', 's-backup', 's-linux', 's-virt', 's-sec', 's-priv', 's-itil', 's-ticket', 's-comm'],
    plus: ['s-ps', 's-entra', 's-intune', 's-exo'],
    de: { t: 'Fachinformatiker/-in Systemintegration', sum: 'Ausbildung oder Umschulung: breite Grundlagen von Hardware bis Netzwerk, IT-Sicherheit und Datenschutz, Kundenberatung und ein Abschlussprojekt mit Dokumentation und Präsentation.', day: ['IT-Systeme planen, einrichten und übergeben', 'Netzwerke und Server betreiben', 'IT-Sicherheit und Datenschutz umsetzen und prüfen', 'Kundinnen und Kunden beraten und schulen', 'Projekte planen, dokumentieren und präsentieren', 'Deutsche und englische Fachbegriffe anwenden'] },
    en: { t: 'IT specialist for system integration (Fachinformatiker)', sum: 'Apprenticeship or retraining: broad basics from hardware to networking, IT security and data protection, customer advice and a final project with documentation and presentation.', day: ['Plan, set up and hand over IT systems', 'Operate networks and servers', 'Implement and check IT security and data protection', 'Advise and train customers', 'Plan, document and present projects', 'Use German and English technical terms'] },
    fa: { t: 'متخصص فناوری اطلاعات در یکپارچه‌سازی سیستم (FISI)', sum: 'آموزش حرفه‌ای (Ausbildung) یا بازآموزی: پایه‌های گسترده از سخت‌افزار تا شبکه، امنیت IT و حفاظت داده، مشاوره به مشتری و یک پروژهٔ پایانی با مستندسازی و ارائه.', day: ['برنامه‌ریزی، راه‌اندازی و تحویل سیستم‌های IT', 'راهبری شبکه‌ها و سرورها', 'اجرا و بررسی امنیت IT و حفاظت داده', 'مشاوره و آموزش به مشتریان', 'برنامه‌ریزی، مستندسازی و ارائهٔ پروژه', 'به‌کار بردن اصطلاحات تخصصی آلمانی و انگلیسی'] } }
 ],
 groups: {
  clients: { de: 'Arbeitsplatz und Geräte', en: 'Workstations and devices', fa: 'میز کار و دستگاه‌ها' },
  identity: { de: 'Identität und Microsoft 365', en: 'Identity and Microsoft 365', fa: 'هویت و Microsoft 365' },
  network: { de: 'Netzwerk', en: 'Network', fa: 'شبکه' },
  server: { de: 'Server und Betrieb', en: 'Servers and operations', fa: 'سرور و راهبری' },
  security: { de: 'Sicherheit und Datenschutz', en: 'Security and data protection', fa: 'امنیت و حفاظت داده' },
  process: { de: 'Arbeitsweise und Kommunikation', en: 'Ways of working and communication', fa: 'شیوهٔ کار و ارتباط' }
 },
 skills: [
  { id: 's-win', g: 'clients', lessons: ['install', 'workstations'], cases: ['slowpc', 'dock'], de: 'Windows 10/11 einrichten, aktualisieren und Fehler finden', en: 'Set up, update and troubleshoot Windows 10/11', fa: 'راه‌اندازی، به‌روزرسانی و عیب‌یابی Windows 10/11' },
  { id: 's-hw', g: 'clients', lessons: ['hardware'], cases: ['dock', 'slowpc'], de: 'Hardware prüfen und mit der Tauschmethode Fehler finden', en: 'Check hardware and find faults with the swap method', fa: 'بررسی سخت‌افزار و یافتن خرابی با روش جایگزینی' },
  { id: 's-print', g: 'clients', lessons: ['printing-storage'], cases: ['printer'], de: 'Drucker, Treiber und Warteschlangen betreuen', en: 'Support printers, drivers and queues', fa: 'پشتیبانی چاپگر، درایور و صف چاپ' },
  { id: 's-mobile', g: 'clients', lessons: [], cases: [], gap: 'm365', de: 'Handys und Tablets (iOS/Android) über MDM einrichten', en: 'Set up phones and tablets (iOS/Android) via MDM', fa: 'راه‌اندازی گوشی و تبلت (iOS/Android) با MDM' },
  { id: 's-ad', g: 'identity', lessons: ['ad', 'identities', 'delegation'], cases: ['password', 'onboarding'], de: 'Benutzer, Gruppen und Kennwörter im Active Directory verwalten', en: 'Manage users, groups and passwords in Active Directory', fa: 'مدیریت کاربران، گروه‌ها و گذرواژه‌ها در Active Directory' },
  { id: 's-perm', g: 'identity', lessons: ['access', 'identities'], cases: ['netdrive', 'sharedmailbox'], de: 'Freigabe- und NTFS-Rechte nach AGDLP vergeben und prüfen', en: 'Grant and check share and NTFS permissions using AGDLP', fa: 'دادن و بررسی دسترسی‌های Share و NTFS به روش AGDLP' },
  { id: 's-gpo', g: 'identity', lessons: ['access'], cases: ['netdrive'], de: 'Gruppenrichtlinien anwenden und mit gpresult prüfen', en: 'Apply group policies and check them with gpresult', fa: 'اعمال Group Policy و بررسی آن با gpresult' },
  { id: 's-entra', g: 'identity', lessons: [], cases: ['mfa', 'onboarding', 'offboarding'], gap: 'm365', de: 'Entra ID: Benutzer, MFA, Lizenzen und Anmeldeprotokolle', en: 'Entra ID: users, MFA, licences and sign-in logs', fa: 'Entra ID: کاربران، MFA، لایسنس‌ها و Sign-in logs' },
  { id: 's-exo', g: 'identity', lessons: [], cases: ['outlook', 'sharedmailbox', 'teams-av', 'onedrive', 'ndr'], gap: 'm365', de: 'Outlook, Exchange Online, Teams und OneDrive unterstützen', en: 'Support Outlook, Exchange Online, Teams and OneDrive', fa: 'پشتیبانی Outlook، Exchange Online، Teams و OneDrive' },
  { id: 's-intune', g: 'identity', lessons: [], cases: ['software', 'bitlocker'], gap: 'm365', de: 'Intune und Autopilot: Geräte, Apps und Richtlinien', en: 'Intune and Autopilot: devices, apps and policies', fa: 'Intune و Autopilot: دستگاه‌ها، برنامه‌ها و سیاست‌ها' },
  { id: 's-tcpip', g: 'network', lessons: ['dhcp', 'dns', 'networking'], cases: ['nonet'], de: 'IP, DHCP, DNS und Gateway diagnostizieren', en: 'Diagnose IP, DHCP, DNS and gateway', fa: 'عیب‌یابی IP، DHCP، DNS و Gateway' },
  { id: 's-net2', g: 'network', lessons: ['networking', 'vendor-switches', 'firewall-lab'], cases: ['vpn', 'wlan'], de: 'VLAN, WLAN, VPN und Firewall-Regeln verstehen', en: 'Understand VLAN, Wi-Fi, VPN and firewall rules', fa: 'فهم VLAN، WLAN، VPN و قوانین Firewall' },
  { id: 's-server', g: 'server', lessons: ['install', 'ad', 'monitoring', 'redundancy'], cases: ['major'], de: 'Windows Server, Rollen und Dienste betreiben und überwachen', en: 'Operate and monitor Windows Server, roles and services', fa: 'راهبری و پایش Windows Server، نقش‌ها و سرویس‌ها' },
  { id: 's-backup', g: 'server', lessons: ['recovery', 'linux-services'], cases: [], de: 'Backup einrichten und Wiederherstellung wirklich testen', en: 'Set up backup and actually test restores', fa: 'راه‌اندازی Backup و آزمون واقعی بازیابی' },
  { id: 's-ps', g: 'server', lessons: ['automation'], cases: ['password', 'onboarding'], de: 'Routineaufgaben mit PowerShell erledigen', en: 'Do routine tasks with PowerShell', fa: 'انجام کارهای روزمره با PowerShell' },
  { id: 's-linux', g: 'server', lessons: ['linux-start', 'linux-services'], cases: [], de: 'Linux-Grundlagen: SSH, Dienste, Rechte, Protokolle', en: 'Linux basics: SSH, services, permissions, logs', fa: 'پایه‌های Linux: SSH، سرویس‌ها، دسترسی‌ها و لاگ‌ها' },
  { id: 's-virt', g: 'server', lessons: ['start'], cases: [], de: 'Virtuelle Maschinen anlegen, Snapshots verstehen', en: 'Create virtual machines, understand snapshots', fa: 'ساخت ماشین مجازی و فهم Snapshot' },
  { id: 's-sec', g: 'security', lessons: ['delegation', 'firewall-lab'], cases: ['phishing', 'software'], de: 'Phishing und Sicherheitsvorfälle erkennen und richtig handeln', en: 'Recognise phishing and security incidents and act correctly', fa: 'شناخت فیشینگ و رخدادهای امنیتی و واکنش درست' },
  { id: 's-priv', g: 'security', lessons: [], cases: ['offboarding', 'phishing'], topic: 'security', de: 'Datenschutz (DSGVO) im Support einhalten', en: 'Follow data protection (GDPR) in support', fa: 'رعایت حفاظت داده (GDPR/DSGVO) در پشتیبانی' },
  { id: 's-bitlocker', g: 'security', lessons: [], cases: ['bitlocker'], de: 'BitLocker und Geräteverschlüsselung betreuen', en: 'Support BitLocker and device encryption', fa: 'پشتیبانی BitLocker و رمزگذاری دستگاه' },
  { id: 's-itil', g: 'process', lessons: ['operations', 'change'], cases: ['major'], topic: 'itil', de: 'Incident, Service Request, Problem und Change unterscheiden, Priorität festlegen', en: 'Distinguish incident, service request, problem and change; set priority', fa: 'تمایز Incident، Service Request، Problem و Change و تعیین اولویت' },
  { id: 's-ticket', g: 'process', lessons: ['operations'], cases: ['password', 'nonet'], topic: 'ticket', de: 'Tickets so dokumentieren, dass andere weiterarbeiten können', en: 'Document tickets so others can continue', fa: 'ثبت تیکت به شکلی که دیگران بتوانند ادامه دهند' },
  { id: 's-comm', g: 'process', lessons: [], cases: ['teams-av', 'software'], topic: 'comm', de: 'Am Telefon und vor Ort klar, freundlich und auf Deutsch und Englisch kommunizieren', en: 'Communicate clearly and kindly on the phone and on site, in German and English', fa: 'ارتباط روشن و مؤدبانه تلفنی و حضوری، به آلمانی و انگلیسی' },
  { id: 's-onoff', g: 'process', lessons: ['identities', 'operations'], cases: ['onboarding', 'offboarding'], de: 'Ein- und Austritte nach Checkliste abwickeln', en: 'Handle joiners and leavers with a checklist', fa: 'انجام ورود و خروج همکاران با چک‌لیست' },
  { id: 's-esc', g: 'process', lessons: ['operations', 'monitoring'], cases: ['major', 'wlan'], de: 'Mit Nachweisen eskalieren und Grenzen der eigenen Rolle kennen', en: 'Escalate with evidence and know the limits of your role', fa: 'ارجاع با شواهد و شناختن مرزهای نقش خود' }
 ]
});
/* Was Firmen erwarten · Teil 2: Wissenskapitel, die im technischen Lab fehlen */
window.LAB.workJobs = window.LAB.workJobs || {};
window.LAB.workJobs.topics = [
 { id: 'itil',
  de: { t: 'ITIL-Grundlagen: Störung, Anfrage, Problem, Änderung', html: `
<p>Fast jede Firma arbeitet mit einem Ticketsystem (zum Beispiel ServiceNow, Jira Service Management, Znuny/OTRS, TOPdesk) und mit Begriffen aus ITIL. Du musst sie im Gespräch sicher benutzen können.</p>
<table><thead><tr><th>Begriff</th><th>Bedeutung</th><th>Beispiel</th></tr></thead><tbody>
<tr><td>Incident (Störung)</td><td>Etwas funktioniert nicht, wie es soll.</td><td>Outlook startet nicht.</td></tr>
<tr><td>Service Request (Anfrage)</td><td>Etwas Standardmäßiges wird gewünscht, nichts ist kaputt.</td><td>Zugriff auf info@, neue Maus, neuer Mitarbeiter.</td></tr>
<tr><td>Problem</td><td>Die unbekannte Ursache hinter einer oder mehreren Störungen.</td><td>Warum läuft jeden Monat ein Zertifikat ab?</td></tr>
<tr><td>Change (Änderung)</td><td>Geplante Änderung an einem System, mit Freigabe und Rückfallplan.</td><td>Update auf dem Dateiserver am Samstag.</td></tr>
</tbody></table>
<p><b>Priorität = Auswirkung × Dringlichkeit.</b> Auswirkung: Wie viele Menschen oder wie wichtige Prozesse sind betroffen? Dringlichkeit: Wie schnell entsteht Schaden?</p>
<table><thead><tr><th></th><th>Dringlichkeit hoch</th><th>Dringlichkeit niedrig</th></tr></thead><tbody>
<tr><td>Auswirkung hoch (viele / Kernprozess)</td><td>P1 kritisch</td><td>P2 hoch</td></tr>
<tr><td>Auswirkung niedrig (eine Person)</td><td>P3 mittel</td><td>P4 niedrig</td></tr>
</tbody></table>
<p><b>SLA</b> (Service Level Agreement) legt Reaktionszeit (bis jemand das Ticket annimmt) und Lösungszeit fest. <b>1st Level</b> löst Standardfälle, <b>2nd Level</b> hat tieferes Fachwissen und mehr Rechte, <b>3rd Level</b> sind Spezialisten oder Hersteller.</p>
<p>Typische Gesprächsfrage: „Ein Geschäftsführer und eine Abteilung mit 40 Personen melden gleichzeitig eine Störung. Wen bearbeiten Sie zuerst?“ Antwort: nach Auswirkung und Dringlichkeit, also meist die 40 Personen, und die Führungskraft wird transparent informiert.</p>` },
  en: { t: 'ITIL basics: incident, request, problem, change', html: `
<p>Almost every company uses a ticket system (for example ServiceNow, Jira Service Management, Znuny/OTRS, TOPdesk) and ITIL terms. You need to use them confidently in an interview.</p>
<table><thead><tr><th>Term</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td>Incident</td><td>Something does not work as it should.</td><td>Outlook does not start.</td></tr>
<tr><td>Service request</td><td>Something standard is requested, nothing is broken.</td><td>Access to info@, new mouse, new employee.</td></tr>
<tr><td>Problem</td><td>The unknown cause behind one or more incidents.</td><td>Why does a certificate expire every month?</td></tr>
<tr><td>Change</td><td>Planned change to a system, with approval and rollback plan.</td><td>Update on the file server on Saturday.</td></tr>
</tbody></table>
<p><b>Priority = impact × urgency.</b> Impact: how many people or how important are the processes affected? Urgency: how fast does damage occur?</p>
<table><thead><tr><th></th><th>High urgency</th><th>Low urgency</th></tr></thead><tbody>
<tr><td>High impact (many / core process)</td><td>P1 critical</td><td>P2 high</td></tr>
<tr><td>Low impact (one person)</td><td>P3 medium</td><td>P4 low</td></tr>
</tbody></table>
<p>An <b>SLA</b> (service level agreement) sets response time (until someone takes the ticket) and resolution time. <b>1st level</b> solves standard cases, <b>2nd level</b> has deeper knowledge and more rights, <b>3rd level</b> are specialists or vendors.</p>
<p>Typical interview question: "A managing director and a 40-person department report an incident at the same time. Who do you handle first?" Answer: by impact and urgency, usually the 40 people, and you keep the manager informed transparently.</p>` },
  fa: { t: 'پایه‌های ITIL: اختلال، درخواست، مشکل و تغییر', html: `
<p>تقریباً هر شرکتی با یک سامانهٔ تیکت (مثل ServiceNow، Jira Service Management، Znuny/OTRS یا TOPdesk) و اصطلاحات ITIL کار می‌کند. باید بتوانی در مصاحبه این اصطلاحات را مطمئن به کار ببری.</p>
<table><thead><tr><th>اصطلاح</th><th>معنا</th><th>مثال</th></tr></thead><tbody>
<tr><td>Incident (اختلال)</td><td>چیزی آن‌طور که باید کار نمی‌کند.</td><td>Outlook باز نمی‌شود.</td></tr>
<tr><td>Service Request (درخواست)</td><td>چیزی استاندارد خواسته شده و چیزی خراب نیست.</td><td>دسترسی به info@، ماوس تازه، همکار تازه.</td></tr>
<tr><td>Problem (مشکل)</td><td>علت ناشناختهٔ پشت یک یا چند اختلال.</td><td>چرا هر ماه یک گواهی منقضی می‌شود؟</td></tr>
<tr><td>Change (تغییر)</td><td>تغییر برنامه‌ریزی‌شده در سیستم، با تأیید و طرح بازگشت.</td><td>به‌روزرسانی File Server در روز شنبه.</td></tr>
</tbody></table>
<p><b>اولویت = اثر × فوریت.</b> اثر: چند نفر یا کدام فرایندهای مهم درگیرند؟ فوریت: خسارت با چه سرعتی پیش می‌آید؟</p>
<table><thead><tr><th></th><th>فوریت بالا</th><th>فوریت پایین</th></tr></thead><tbody>
<tr><td>اثر بالا (افراد زیاد / فرایند اصلی)</td><td>P1 بحرانی</td><td>P2 بالا</td></tr>
<tr><td>اثر پایین (یک نفر)</td><td>P3 متوسط</td><td>P4 پایین</td></tr>
</tbody></table>
<p><b>SLA</b> (توافق سطح خدمات) زمان واکنش (تا کسی تیکت را بردارد) و زمان حل را تعیین می‌کند. <b>سطح ۱</b> موارد استاندارد را حل می‌کند، <b>سطح ۲</b> دانش عمیق‌تر و دسترسی بیشتری دارد و <b>سطح ۳</b> متخصصان یا سازنده‌ها هستند.</p>
<p>پرسش رایج مصاحبه: «یک مدیرعامل و یک بخش ۴۰ نفره هم‌زمان اختلال گزارش می‌دهند. اول به کدام می‌رسید؟» پاسخ: بر اساس اثر و فوریت، معمولاً به ۴۰ نفر، و مدیر را شفاف در جریان می‌گذاری.</p>` } },
 { id: 'ticket',
  de: { t: 'Tickets richtig dokumentieren', html: `
<p>Arbeitgeber lesen deine Tickets. Ein gutes Ticket lässt eine Kollegin ohne Rückfrage weiterarbeiten und hilft später, wiederkehrende Probleme zu finden.</p>
<ul><li><b>Symptom:</b> was der Benutzer sieht, mit genauer Fehlermeldung</li><li><b>Betroffen:</b> wer, welches Gerät, seit wann, einer oder viele</li><li><b>Prüfungen:</b> was du getestet hast und das Ergebnis jedes Tests</li><li><b>Ursache und Lösung:</b> in verständlichen Worten</li><li><b>Test:</b> wie bestätigt wurde, dass es geht</li><li><b>Kommunikation:</b> was dem Benutzer gesagt wurde, offene Punkte</li></ul>
<p><b>Schlecht:</b> „PC geht nicht, neu gestartet, jetzt ok.“</p>
<p><b>Gut:</b> „PC-0412 ohne Netz seit 08:10, Kollegen ok. ipconfig 169.254.x.x, Link-LED aus. Patchkabel am Dock locker, neu gesteckt. DHCP 10.20.0.143, Gateway und DNS ok, Laufwerke ok. Benutzer informiert, gelöst.“</p>
<p>Keine Kennwörter, keine privaten Daten und keine Wertungen über Personen ins Ticket schreiben.</p>` },
  en: { t: 'Documenting tickets properly', html: `
<p>Employers read your tickets. A good ticket lets a colleague continue without asking you and later helps to find recurring problems.</p>
<ul><li><b>Symptom:</b> what the user sees, with the exact error message</li><li><b>Affected:</b> who, which device, since when, one or many</li><li><b>Checks:</b> what you tested and the result of each test</li><li><b>Cause and fix:</b> in plain words</li><li><b>Test:</b> how you confirmed it works</li><li><b>Communication:</b> what the user was told, open points</li></ul>
<p><b>Bad:</b> "PC not working, restarted, ok now."</p>
<p><b>Good:</b> "PC-0412 no network since 08:10, colleagues ok. ipconfig 169.254.x.x, link LED off. Patch cable at dock loose, re-plugged. DHCP 10.20.0.143, gateway and DNS ok, drives ok. User informed, resolved."</p>
<p>Never put passwords, private data or judgements about people into a ticket.</p>` },
  fa: { t: 'ثبت درست تیکت', html: `
<p>کارفرما تیکت‌های تو را می‌خواند. تیکت خوب به همکار امکان می‌دهد بدون پرسیدن ادامه دهد و بعدها به پیدا کردن مشکلات تکراری کمک می‌کند.</p>
<ul><li><b>نشانه:</b> آنچه کاربر می‌بیند، با متن دقیق خطا</li><li><b>درگیرها:</b> چه کسی، کدام دستگاه، از کی، یک نفر یا چند نفر</li><li><b>بررسی‌ها:</b> چه چیزی را آزمودی و نتیجهٔ هر آزمون</li><li><b>علت و راه‌حل:</b> با زبان ساده</li><li><b>آزمون:</b> چطور تأیید شد که کار می‌کند</li><li><b>ارتباط:</b> به کاربر چه گفته شد و چه کارهایی باز مانده</li></ul>
<p><b>بد:</b> «رایانه کار نمی‌کرد، ری‌استارت شد، حالا درست است.»</p>
<p><b>خوب:</b> «PC-0412 از ۸:۱۰ بدون شبکه، همکاران سالم. ipconfig برابر 169.254.x.x، چراغ Link خاموش. کابل در Dock شل بود، دوباره وصل شد. DHCP 10.20.0.143، Gateway و DNS سالم، درایوها سالم. به کاربر اطلاع داده شد؛ حل شد.»</p>
<p>هرگز گذرواژه، دادهٔ شخصی یا داوری دربارهٔ افراد را در تیکت ننویس.</p>` } },
 { id: 'm365',
  de: { t: 'Microsoft 365, Entra ID und Intune: die größte Lücke schließen', html: `
<p>In fast allen aktuellen Stellenanzeigen für Support und Junior-Administration stehen Microsoft 365, Entra ID (früher Azure AD), Exchange Online, Teams und Intune. Dein VirtualBox-Lab übt das lokale Active Directory. Das ist die Grundlage, aber nicht genug.</p>
<table><thead><tr><th>Dienst</th><th>Wofür im Alltag</th></tr></thead><tbody>
<tr><td>Microsoft 365 Admin Center</td><td>Benutzer, Lizenzen, Dienststatus, Kennwort zurücksetzen</td></tr>
<tr><td>Entra ID</td><td>Cloud-Identitäten, Gruppen, MFA, bedingter Zugriff, Anmeldeprotokolle</td></tr>
<tr><td>Entra Connect (Hybrid)</td><td>synchronisiert lokale AD-Benutzer in die Cloud</td></tr>
<tr><td>Exchange Online</td><td>Postfächer, freigegebene Postfächer, Verteiler, Nachrichtenablaufverfolgung</td></tr>
<tr><td>Teams, SharePoint, OneDrive</td><td>Zusammenarbeit, Dateien, Freigaben</td></tr>
<tr><td>Intune und Autopilot</td><td>Geräte verwalten, Software verteilen, Richtlinien, BitLocker-Schlüssel, neue Notebooks automatisch einrichten</td></tr>
</tbody></table>
<p><b>So kannst du üben:</b></p>
<ul><li>Microsoft Learn bietet kostenlose Lernpfade zu Microsoft 365, Entra ID und Intune. Die Prüfungsthemen der Microsoft-Zertifizierungen eignen sich als Lernliste. Prüfe dort die aktuellen Prüfungen.</li><li>Microsoft bietet für Microsoft 365 Business Premium eine kostenlose Testversion für einen Monat an. Business Premium enthält Intune und Entra ID P1. Nutze dafür einen eigenen Test-Tenant mit Testbenutzern, keine echten Daten, und kündige rechtzeitig. Prüfe die Testbedingungen vorher, eine Zahlungsmethode kann nötig sein.</li><li>Der kostenlose Entwickler-Tenant (Microsoft 365 Developer Program) ist inzwischen hauptsächlich für Visual-Studio-Professional- oder -Enterprise-Abonnenten verfügbar.</li></ul>
<p><b>Übungsliste für den Test-Tenant:</b> Benutzer und Gruppe anlegen, Lizenz über Gruppe zuweisen, MFA registrieren und zurücksetzen, freigegebenes Postfach mit Vollzugriff und „Senden als“, Nachrichtenablaufverfolgung lesen, Teams-Team mit Gast, ein Windows-11-VM in Intune registrieren, eine Compliance-Richtlinie und eine App zuweisen, BitLocker-Schlüssel im Portal finden.</p>` },
  en: { t: 'Microsoft 365, Entra ID and Intune: closing the biggest gap', html: `
<p>Almost all current job ads for support and junior administration list Microsoft 365, Entra ID (formerly Azure AD), Exchange Online, Teams and Intune. Your VirtualBox lab practises on-premises Active Directory. That is the foundation, but not enough.</p>
<table><thead><tr><th>Service</th><th>Day-to-day use</th></tr></thead><tbody>
<tr><td>Microsoft 365 admin center</td><td>Users, licences, service health, password resets</td></tr>
<tr><td>Entra ID</td><td>Cloud identities, groups, MFA, conditional access, sign-in logs</td></tr>
<tr><td>Entra Connect (hybrid)</td><td>Synchronises on-premises AD users to the cloud</td></tr>
<tr><td>Exchange Online</td><td>Mailboxes, shared mailboxes, distribution lists, message trace</td></tr>
<tr><td>Teams, SharePoint, OneDrive</td><td>Collaboration, files, sharing</td></tr>
<tr><td>Intune and Autopilot</td><td>Manage devices, deploy software, policies, BitLocker keys, set up new laptops automatically</td></tr>
</tbody></table>
<p><b>How to practise:</b></p>
<ul><li>Microsoft Learn offers free learning paths for Microsoft 365, Entra ID and Intune. The exam skills of Microsoft certifications make a good study list. Check the current exams there.</li><li>Microsoft offers a one-month free trial of Microsoft 365 Business Premium, which includes Intune and Entra ID P1. Use a separate test tenant with test users, no real data, and cancel in time. Check the trial terms first; a payment method may be required.</li><li>The free developer tenant (Microsoft 365 Developer Program) is now mainly available to Visual Studio Professional or Enterprise subscribers.</li></ul>
<p><b>Practice list for the test tenant:</b> create a user and group, assign a licence via group, register and reset MFA, shared mailbox with full access and "Send as", read a message trace, Teams team with a guest, enrol a Windows 11 VM in Intune, assign a compliance policy and an app, find a BitLocker key in the portal.</p>` },
  fa: { t: 'Microsoft 365، Entra ID و Intune: پر کردن بزرگ‌ترین شکاف', html: `
<p>تقریباً در همهٔ آگهی‌های امروزی برای پشتیبانی و مدیریت سیستم تازه‌کار، Microsoft 365، Entra ID (نام قبلی Azure AD)، Exchange Online، Teams و Intune آمده است. آزمایشگاه VirtualBox تو Active Directory محلی را تمرین می‌دهد. این پایه است، ولی کافی نیست.</p>
<table><thead><tr><th>سرویس</th><th>کاربرد روزمره</th></tr></thead><tbody>
<tr><td>Microsoft 365 admin center</td><td>کاربران، لایسنس‌ها، وضعیت سرویس، ریست گذرواژه</td></tr>
<tr><td>Entra ID</td><td>هویت‌های Cloud، گروه‌ها، MFA، Conditional Access و Sign-in logs</td></tr>
<tr><td>Entra Connect (Hybrid)</td><td>همگام‌سازی کاربران AD محلی با Cloud</td></tr>
<tr><td>Exchange Online</td><td>Mailboxها، Shared Mailbox، فهرست‌های توزیع و Message trace</td></tr>
<tr><td>Teams، SharePoint و OneDrive</td><td>همکاری، فایل‌ها و اشتراک‌گذاری</td></tr>
<tr><td>Intune و Autopilot</td><td>مدیریت دستگاه‌ها، توزیع نرم‌افزار، سیاست‌ها، کلیدهای BitLocker و راه‌اندازی خودکار لپ‌تاپ‌های تازه</td></tr>
</tbody></table>
<p><b>چطور تمرین کنی:</b></p>
<ul><li>Microsoft Learn مسیرهای آموزشی رایگان برای Microsoft 365، Entra ID و Intune دارد. سرفصل آزمون‌های گواهی‌نامه‌های Microsoft فهرست خوبی برای یادگیری است؛ آزمون‌های فعلی را همان‌جا ببین.</li><li>Microsoft برای Microsoft 365 Business Premium یک دورهٔ آزمایشی رایگان یک‌ماهه دارد که Intune و Entra ID P1 را هم شامل می‌شود. برای آن یک Tenant آزمایشی جدا با کاربران آزمایشی بساز، دادهٔ واقعی نگذار و به‌موقع لغو کن. شرایط دورهٔ آزمایشی را پیش از شروع بخوان؛ ممکن است روش پرداخت لازم باشد.</li><li>Tenant رایگان توسعه‌دهنده (Microsoft 365 Developer Program) اکنون بیشتر برای مشترکان Visual Studio Professional یا Enterprise در دسترس است.</li></ul>
<p><b>فهرست تمرین در Tenant آزمایشی:</b> ساخت کاربر و گروه، دادن لایسنس با گروه، ثبت و ریست MFA، Shared Mailbox با Full Access و Send as، خواندن Message trace، تیم Teams با مهمان، ثبت یک VM ویندوز ۱۱ در Intune، اختصاص یک Compliance policy و یک برنامه، و پیدا کردن کلید BitLocker در پورتال.</p>` } },
 { id: 'security',
  de: { t: 'Sicherheit und Datenschutz im Support', html: `
<p>Der Support ist ein beliebtes Ziel für Betrüger, weil er Kennwörter zurücksetzen und Rechte vergeben kann. Firmen erwarten deshalb feste Regeln, auch unter Zeitdruck.</p>
<ul><li>Identität prüfen, bevor du Kennwort, MFA oder BitLocker-Schlüssel herausgibst.</li><li>Kennwörter nie per E-Mail, Chat oder auf Zetteln weitergeben. Startkennwort mit Wechselpflicht.</li><li>Rechte nur mit Freigabe und nur so viel wie nötig (Prinzip der minimalen Rechte).</li><li>Kein Admin-Kennwort an Benutzer, keine „kurzen“ Ausnahmen.</li><li>Fernwartung nur mit ausdrücklicher Zustimmung. Sage, was du tust, und beende die Sitzung danach.</li><li>Bildschirm sperren (Windows-Taste + L), wenn du den Platz verlässt.</li><li>Sicherheitsvorfälle sofort an die IT-Sicherheit melden. Lieber einmal zu viel.</li></ul>
<p><b>Datenschutz (DSGVO):</b> Personenbezogene Daten sind alle Angaben zu einer Person, auch E-Mails, Dateien und Protokolle. Du schaust nur das an, was du für die Lösung brauchst. Du öffnest keine fremden Postfächer oder Dateien ohne Auftrag und Freigabe. Ein möglicher Datenschutzvorfall (zum Beispiel ein verlorenes, unverschlüsseltes Notebook oder eine Fehlversendung) geht sofort an die Datenschutzbeauftragte oder die IT-Sicherheit, weil die Firma ihn in der Regel innerhalb von 72 Stunden der Aufsichtsbehörde melden muss.</p>` },
  en: { t: 'Security and data protection in support', html: `
<p>Support is a favourite target for fraudsters because it can reset passwords and grant rights. Companies therefore expect firm rules, even under time pressure.</p>
<ul><li>Verify identity before you hand out a password, MFA reset or BitLocker key.</li><li>Never pass on passwords by email, chat or on paper. Temporary password with forced change.</li><li>Grant rights only with approval and only as much as needed (least privilege).</li><li>No admin password to users, no "quick" exceptions.</li><li>Remote support only with explicit consent. Say what you are doing and end the session afterwards.</li><li>Lock your screen (Windows key + L) when you leave your desk.</li><li>Report security incidents to IT security immediately. Better once too often.</li></ul>
<p><b>Data protection (GDPR):</b> personal data is any information about a person, including emails, files and logs. Look only at what you need for the fix. Do not open other people\'s mailboxes or files without a task and approval. A possible data breach (for example a lost unencrypted laptop or a mis-sent email) goes immediately to the data protection officer or IT security, because the company usually has to report it to the authority within 72 hours.</p>` },
  fa: { t: 'امنیت و حفاظت داده در پشتیبانی', html: `
<p>پشتیبانی هدف محبوب کلاهبرداران است، چون می‌تواند گذرواژه ریست کند و دسترسی بدهد. برای همین شرکت‌ها حتی زیر فشار زمان، پایبندی به قوانین ثابت را انتظار دارند.</p>
<ul><li>پیش از دادن گذرواژه، ریست MFA یا کلید BitLocker، هویت را بسنج.</li><li>گذرواژه را هرگز با ایمیل، چت یا روی کاغذ نده. گذرواژهٔ موقت با تغییر اجباری.</li><li>دسترسی را فقط با تأیید و فقط به اندازهٔ لازم بده (اصل کمترین دسترسی).</li><li>گذرواژهٔ Admin به کاربر داده نمی‌شود و استثنای «فقط یک لحظه» وجود ندارد.</li><li>پشتیبانی از راه دور فقط با رضایت صریح. بگو چه می‌کنی و بعد نشست را ببند.</li><li>وقتی میزت را ترک می‌کنی صفحه را قفل کن (کلید Windows + L).</li><li>رخداد امنیتی را فوراً به تیم امنیت IT گزارش بده؛ یک بار بیشتر بهتر از یک بار کمتر است.</li></ul>
<p><b>حفاظت داده (GDPR یا در آلمان DSGVO):</b> دادهٔ شخصی هر اطلاعاتی دربارهٔ یک فرد است؛ ایمیل‌ها، فایل‌ها و لاگ‌ها هم. فقط آنچه را برای حل مشکل لازم است ببین. بدون مأموریت و تأیید، Mailbox یا فایل دیگران را باز نکن. رخداد احتمالی حفاظت داده (مثلاً گم شدن لپ‌تاپ رمزنگاری‌نشده یا ایمیل اشتباهی) را فوراً به مسئول حفاظت داده یا تیم امنیت بده، چون شرکت معمولاً باید ظرف ۷۲ ساعت آن را به نهاد ناظر گزارش کند.</p>` } },
 { id: 'comm',
  de: { t: 'Kommunikation am Telefon und vor Ort', html: `
<p>In Vorstellungsgesprächen wird Kommunikation oft höher bewertet als Technik. Benutzer erinnern sich daran, wie du mit ihnen gesprochen hast.</p>
<ol><li><b>Begrüßen:</b> „IT-Support, mein Name ist …, wie kann ich helfen?“</li><li><b>Zuhören und zusammenfassen:</b> „Ich fasse zusammen: Seit heute Morgen startet Outlook nicht, Teams geht. Richtig?“</li><li><b>Erwartung setzen:</b> „Ich schaue mir das jetzt an. Das dauert etwa zehn Minuten.“</li><li><b>Einfach erklären:</b> ohne Fachchinesisch, keine Schuldzuweisung.</li><li><b>Zusagen einhalten:</b> Wer einen Rückruf verspricht, ruft zurück, auch wenn es noch keine Lösung gibt.</li><li><b>Abschließen:</b> „Funktioniert es jetzt bei Ihnen? Dann schließe ich das Ticket.“</li></ol>
<p><b>Verärgerte Benutzer:</b> ausreden lassen, Ärger anerkennen („Ich verstehe, dass das gerade sehr stört“), sachlich bleiben, den nächsten konkreten Schritt nennen. Beleidigungen musst du nicht hinnehmen; dann freundlich auf die Teamleitung verweisen.</p>
<p><b>Sprachen:</b> Viele Firmen erwarten sehr gutes Deutsch und gutes Englisch. Übe die Formulierungen aus den Fällen laut, und nutze den Bereich „IT-Sprachen“ in dieser App.</p>` },
  en: { t: 'Communicating on the phone and on site', html: `
<p>In interviews, communication is often rated higher than technical skills. Users remember how you spoke to them.</p>
<ol><li><b>Greet:</b> "IT support, my name is …, how can I help?"</li><li><b>Listen and summarise:</b> "Let me summarise: since this morning Outlook does not start, Teams works. Correct?"</li><li><b>Set expectations:</b> "I\'ll look at it now. It will take about ten minutes."</li><li><b>Explain simply:</b> no jargon, no blame.</li><li><b>Keep promises:</b> if you promise a call-back, call back, even if there is no solution yet.</li><li><b>Close:</b> "Does it work for you now? Then I\'ll close the ticket."</li></ol>
<p><b>Angry users:</b> let them finish, acknowledge the frustration ("I understand this is really disruptive right now"), stay factual, name the next concrete step. You do not have to accept insults; politely refer to the team lead.</p>
<p><b>Languages:</b> many companies in Germany expect very good German and good English. Practise the phrases from the cases out loud and use the "IT languages" area of this app.</p>` },
  fa: { t: 'ارتباط تلفنی و حضوری', html: `
<p>در مصاحبه‌ها ارتباط اغلب از دانش فنی مهم‌تر ارزیابی می‌شود. کاربران به یاد می‌آورند که چطور با آن‌ها حرف زدی.</p>
<ol><li><b>سلام و معرفی:</b> «پشتیبانی IT، من … هستم، چطور می‌توانم کمک کنم؟»</li><li><b>گوش دادن و جمع‌بندی:</b> «جمع‌بندی می‌کنم: از امروز صبح Outlook باز نمی‌شود ولی Teams کار می‌کند. درست است؟»</li><li><b>روشن کردن انتظار:</b> «الان بررسی می‌کنم؛ حدود ده دقیقه طول می‌کشد.»</li><li><b>توضیح ساده:</b> بدون اصطلاحات پیچیده و بدون مقصر دانستن کاربر.</li><li><b>وفای به قول:</b> اگر قول تماس دوباره دادی، تماس بگیر؛ حتی اگر هنوز راه‌حلی نیست.</li><li><b>جمع کردن کار:</b> «الان برای شما کار می‌کند؟ پس تیکت را می‌بندم.»</li></ol>
<p><b>کاربران عصبانی:</b> بگذار حرفشان را تمام کنند، ناراحتی را بپذیر («می‌فهمم که الان خیلی کارتان را مختل کرده»)، آرام و منطقی بمان و قدم مشخص بعدی را بگو. توهین را لازم نیست تحمل کنی؛ مؤدبانه به سرپرست تیم ارجاع بده.</p>
<p><b>زبان:</b> بسیاری از شرکت‌های آلمان آلمانی بسیار خوب و انگلیسی خوب انتظار دارند. جمله‌های داخل موارد پشتیبانی را بلند تمرین کن و از بخش «زبان IT» در همین برنامه استفاده کن.</p>` } }
];
/* Bewerbung und Vorstellungsgespräch */
window.LAB.workJobs = window.LAB.workJobs || {};
window.LAB.workJobs.kinds = {
 tech: { de: 'Fachfrage', en: 'Technical', fa: 'پرسش فنی' },
 situation: { de: 'Situation', en: 'Situation', fa: 'موقعیت' },
 person: { de: 'Zur Person', en: 'About you', fa: 'دربارهٔ خودت' }
};
window.LAB.workJobs.interview = [
 { id: 'apipa', kind: 'tech', link: 'case:nonet',
  de: { q: 'Ein PC hat die Adresse 169.254.12.7. Was bedeutet das und was tun Sie?', want: 'Grundlagen DHCP und strukturierte Fehlersuche.', a: 'Das ist eine automatische Adresse (APIPA): Der PC hat keine Antwort von einem DHCP-Server bekommen. Zuerst frage ich nach: Betrifft es nur diesen PC oder auch Kollegen? Kabel oder WLAN? Seit wann, und wurde etwas umgesteckt? Wenn nur dieser PC betroffen ist: Kabel, Link, Port und Netzwerkadapter. Wenn viele: DHCP-Server, Bereich voll, Switch oder VLAN. Danach „ipconfig /renew“ und Test.' },
  en: { q: 'A PC has the address 169.254.12.7. What does it mean and what do you do?', want: 'DHCP basics and structured troubleshooting.', a: 'It is an automatic private address (APIPA): the PC got no answer from a DHCP server. First I ask: is it only this PC or colleagues too? Cable or Wi-Fi? Since when, and was anything re-plugged? If only this PC: cable, link, port and network adapter. If many: DHCP server, scope full, switch or VLAN. Then "ipconfig /renew" and test.' },
  fa: { q: 'رایانه‌ای نشانی 169.254.12.7 دارد. یعنی چه و چه می‌کنید؟', want: 'پایه‌های DHCP و عیب‌یابی منظم.', a: 'این نشانی خودکار (APIPA) است؛ یعنی رایانه از هیچ سرور DHCP پاسخی نگرفته است. اول می‌پرسم: فقط همین رایانه است یا همکاران هم؟ کابل یا WLAN؟ از کی، و چیزی جابه‌جا شده است؟ اگر فقط همین رایانه است: کابل، Link، پورت و کارت شبکه. اگر چند دستگاه‌اند: سرور DHCP، پر بودن محدوده، Switch یا VLAN. بعد «ipconfig /renew» و آزمون.' } },
 { id: 'dnsdhcp', kind: 'tech', link: 'mod:dns',
  de: { q: 'Was ist der Unterschied zwischen DNS und DHCP?', want: 'Begriffe sicher erklären, Bezug zu AD.', a: 'DHCP vergibt automatisch IP-Adresse, Gateway und DNS-Server an Geräte. DNS übersetzt Namen in IP-Adressen. In einer AD-Domäne ist DNS besonders wichtig, weil Clients die Domänencontroller über DNS-Einträge (SRV) finden. Deshalb tragen Domänenmitglieder den internen DNS-Server ein, nicht 8.8.8.8.' },
  en: { q: 'What is the difference between DNS and DHCP?', want: 'Explain terms confidently, link to AD.', a: 'DHCP automatically assigns IP address, gateway and DNS server to devices. DNS translates names into IP addresses. In an AD domain DNS is especially important because clients find domain controllers through DNS records (SRV). That is why domain members use the internal DNS server, not 8.8.8.8.' },
  fa: { q: 'فرق DNS و DHCP چیست؟', want: 'توضیح مطمئن اصطلاحات و ارتباط آن با AD.', a: 'DHCP به‌طور خودکار نشانی IP، Gateway و سرور DNS را به دستگاه‌ها می‌دهد. DNS نام‌ها را به نشانی IP ترجمه می‌کند. در دامنهٔ AD، DNS خیلی مهم است، چون کلاینت‌ها کنترل‌کننده‌های دامنه را با رکوردهای DNS (SRV) پیدا می‌کنند. برای همین اعضای دامنه سرور DNS داخلی را دارند، نه 8.8.8.8.' } },
 { id: 'access', kind: 'tech', link: 'case:netdrive',
  de: { q: 'Eine Benutzerin kommt nicht in einen Ordner auf dem Dateiserver. Wie gehen Sie vor?', want: 'Freigabe- und NTFS-Rechte, Gruppen, Token, Freigabeprozess.', a: 'Ich kläre zuerst, ob sie den Zugriff haben soll und wer den Ordner verantwortet. Technisch prüfe ich mit „whoami /groups“, ob sie in der richtigen Gruppe ist, und ob Freigabe- und NTFS-Rechte diese Gruppe berechtigen. Wurde sie gerade hinzugefügt, muss sie sich neu anmelden. Fehlt die Berechtigung, beantrage ich sie mit Freigabe der verantwortlichen Person und teste danach mit ihrem Konto.' },
  en: { q: 'A user cannot open a folder on the file server. How do you proceed?', want: 'Share and NTFS permissions, groups, token, approval process.', a: 'First I clarify whether she should have access and who owns the folder. Technically I check with "whoami /groups" whether she is in the right group and whether share and NTFS permissions allow that group. If she was just added, she must sign in again. If the permission is missing, I request it with the owner\'s approval and then test with her account.' },
  fa: { q: 'کاربری نمی‌تواند پوشه‌ای را روی File Server باز کند. چطور پیش می‌روید؟', want: 'دسترسی‌های Share و NTFS، گروه‌ها، Token و روند تأیید.', a: 'اول روشن می‌کنم که آیا باید دسترسی داشته باشد و مسئول پوشه کیست. از نظر فنی با «whoami /groups» می‌بینم در گروه درست هست یا نه و آیا دسترسی‌های Share و NTFS به آن گروه اجازه می‌دهند. اگر تازه اضافه شده، باید دوباره وارد شود. اگر دسترسی ندارد، با تأیید مسئول درخواست می‌دهم و سپس با حساب خودش آزمایش می‌کنم.' } },
 { id: 'agdlp', kind: 'tech', link: 'mod:identities',
  de: { q: 'Warum vergibt man Rechte über Gruppen und nicht direkt an Benutzer? Was ist AGDLP?', want: 'Verständnis von Rollen, Wartbarkeit, minimalen Rechten.', a: 'Über Gruppen lassen sich Rechte nach Rollen vergeben und nachvollziehen. Bei einem Wechsel ändere ich nur die Mitgliedschaft. AGDLP heißt: Konten (Accounts) in globale Gruppen nach Rolle, diese in domänenlokale Gruppen nach Ressource, und nur die domänenlokale Gruppe bekommt die Berechtigung (Permission).' },
  en: { q: 'Why grant rights through groups instead of directly to users? What is AGDLP?', want: 'Understanding of roles, maintainability, least privilege.', a: 'Groups let you grant and trace rights by role. When someone changes role, I only change membership. AGDLP means: Accounts go into Global groups by role, those into Domain Local groups by resource, and only the domain local group gets the Permission.' },
  fa: { q: 'چرا دسترسی را با گروه می‌دهند، نه مستقیم به کاربر؟ AGDLP چیست؟', want: 'فهم نقش‌ها، نگهداری‌پذیری و کمترین دسترسی.', a: 'با گروه می‌توان دسترسی را بر اساس نقش داد و پیگیری کرد؛ وقتی کسی نقشش عوض می‌شود فقط عضویت را تغییر می‌دهم. AGDLP یعنی حساب‌ها (Accounts) در گروه‌های Global بر اساس نقش، آن‌ها در گروه‌های Domain Local بر اساس منبع، و فقط گروه Domain Local دسترسی (Permission) می‌گیرد.' } },
 { id: 'adentra', kind: 'tech', link: 'topic:m365',
  de: { q: 'Was ist der Unterschied zwischen Active Directory und Entra ID?', want: 'Hybrid-Verständnis, aktuelle Microsoft-Welt.', a: 'Active Directory ist der lokale Verzeichnisdienst mit Domänencontrollern, Gruppenrichtlinien und Kerberos. Entra ID ist der Cloud-Identitätsdienst für Microsoft 365 und andere Cloud-Anwendungen, mit MFA und bedingtem Zugriff. Viele Firmen arbeiten hybrid: Entra Connect synchronisiert die AD-Benutzer in die Cloud, damit sie überall dasselbe Konto haben.' },
  en: { q: 'What is the difference between Active Directory and Entra ID?', want: 'Hybrid understanding, current Microsoft world.', a: 'Active Directory is the on-premises directory service with domain controllers, group policies and Kerberos. Entra ID is the cloud identity service for Microsoft 365 and other cloud apps, with MFA and conditional access. Many companies run hybrid: Entra Connect synchronises AD users to the cloud so they have the same account everywhere.' },
  fa: { q: 'فرق Active Directory و Entra ID چیست؟', want: 'فهم محیط Hybrid و دنیای امروز Microsoft.', a: 'Active Directory سرویس دایرکتوری محلی با کنترل‌کننده‌های دامنه، Group Policy و Kerberos است. Entra ID سرویس هویت Cloud برای Microsoft 365 و برنامه‌های Cloud دیگر است، با MFA و Conditional Access. بسیاری از شرکت‌ها Hybrid کار می‌کنند: Entra Connect کاربران AD را با Cloud همگام می‌کند تا همه‌جا یک حساب داشته باشند.' } },
 { id: 'backup', kind: 'tech', link: 'mod:recovery',
  de: { q: 'Ist ein VM-Snapshot ein Backup? Was ist die 3-2-1-Regel?', want: 'Backup-Verständnis, Wiederherstellung testen.', a: 'Nein. Ein Snapshot liegt auf demselben Speicher und hängt von der VM ab; fällt der Speicher aus, ist beides weg. Die 3-2-1-Regel: drei Kopien der Daten, auf zwei verschiedenen Medien, eine davon außer Haus oder offline. Und entscheidend: Ein Backup gilt erst als gut, wenn eine Wiederherstellung getestet wurde.' },
  en: { q: 'Is a VM snapshot a backup? What is the 3-2-1 rule?', want: 'Understanding of backup, testing restores.', a: 'No. A snapshot sits on the same storage and depends on the VM; if the storage fails, both are gone. The 3-2-1 rule: three copies of the data, on two different media, one of them off-site or offline. And crucially: a backup only counts as good once a restore has been tested.' },
  fa: { q: 'آیا Snapshot ماشین مجازی، Backup است؟ قانون 3-2-1 چیست؟', want: 'فهم Backup و آزمون بازیابی.', a: 'نه. Snapshot روی همان فضای ذخیره‌سازی است و به VM وابسته است؛ اگر فضای ذخیره‌سازی خراب شود، هر دو از بین می‌روند. قانون 3-2-1: سه نسخه از داده، روی دو رسانهٔ متفاوت و یکی بیرون از شرکت یا آفلاین. و مهم‌ترین نکته: Backup فقط وقتی خوب است که بازیابی آن آزمایش شده باشد.' } },
 { id: 'ports', kind: 'tech', link: 'mod:networking',
  de: { q: 'Welche Ports kennen Sie und wofür?', want: 'Grundwissen Netzwerk und Firewall.', a: 'DNS 53, DHCP 67 und 68, HTTP 80, HTTPS 443, SSH 22, RDP 3389, SMB für Dateifreigaben 445, Kerberos 88, LDAP 389. Mit „Test-NetConnection Server -Port 445“ prüfe ich, ob ein Port erreichbar ist. Damit trenne ich Netzwerk- von Dienstproblemen.' },
  en: { q: 'Which ports do you know and what are they for?', want: 'Basic network and firewall knowledge.', a: 'DNS 53, DHCP 67 and 68, HTTP 80, HTTPS 443, SSH 22, RDP 3389, SMB for file shares 445, Kerberos 88, LDAP 389. With "Test-NetConnection server -Port 445" I check whether a port is reachable. That separates network problems from service problems.' },
  fa: { q: 'کدام پورت‌ها را می‌شناسید و برای چه هستند؟', want: 'دانش پایهٔ شبکه و Firewall.', a: 'DNS پورت 53، DHCP پورت‌های 67 و 68، HTTP پورت 80، HTTPS پورت 443، SSH پورت 22، RDP پورت 3389، SMB برای اشتراک فایل 445، Kerberos پورت 88 و LDAP پورت 389. با «Test-NetConnection server -Port 445» می‌سنجم پورت در دسترس است یا نه. این کار مشکل شبکه را از مشکل سرویس جدا می‌کند.' } },
 { id: 'intune', kind: 'tech', link: 'topic:m365',
  de: { q: 'Was ist Intune und was ist Autopilot?', want: 'Moderne Geräteverwaltung kennen, auch ohne Berufserfahrung.', a: 'Intune ist die Cloud-Geräteverwaltung von Microsoft: Richtlinien, Software, Updates, Compliance und BitLocker für Windows, Mac, iOS und Android. Autopilot richtet neue Windows-Geräte automatisch ein: Der Benutzer meldet sich an und das Gerät holt sich Einstellungen und Programme. Ich habe die Grundlagen über Microsoft Learn und einen Test-Tenant geübt.' },
  en: { q: 'What are Intune and Autopilot?', want: 'Know modern device management, even without job experience.', a: 'Intune is Microsoft\'s cloud device management: policies, software, updates, compliance and BitLocker for Windows, Mac, iOS and Android. Autopilot sets up new Windows devices automatically: the user signs in and the device pulls its settings and apps. I practised the basics with Microsoft Learn and a test tenant.' },
  fa: { q: 'Intune و Autopilot چیستند؟', want: 'آشنایی با مدیریت مدرن دستگاه، حتی بدون سابقهٔ کاری.', a: 'Intune سامانهٔ مدیریت دستگاه Cloud از Microsoft است: سیاست‌ها، نرم‌افزار، به‌روزرسانی، Compliance و BitLocker برای Windows، Mac، iOS و Android. Autopilot دستگاه‌های تازهٔ Windows را خودکار راه‌اندازی می‌کند: کاربر وارد می‌شود و دستگاه تنظیمات و برنامه‌ها را می‌گیرد. پایه‌های آن را با Microsoft Learn و یک Tenant آزمایشی تمرین کرده‌ام.' } },
 { id: 'priority', kind: 'situation', link: 'topic:itil',
  de: { q: 'Sie haben drei offene Tickets: ein Drucker im 2. OG, ein Geschäftsführer mit langsamem Notebook und eine Abteilung ohne Zugriff auf die Buchhaltung. Was zuerst?', want: 'Priorisierung nach Auswirkung und Dringlichkeit, Kommunikation.', a: 'Ich kläre zuerst kurz die Auswirkung: Wie viele Personen sind betroffen, gibt es eine Ausweichmöglichkeit, steht ein Termin oder Prozess still? Danach zuerst die Abteilung ohne Buchhaltung, weil viele Personen und ein Kernprozess betroffen sind. Ich informiere die anderen beiden, wann ich komme. Der Geschäftsführer bekommt eine kurze Rückmeldung mit Zeitangabe; vielleicht hilft ihm übergangsweise ein Ersatzgerät. Der Drucker kommt danach, falls es dort einen Ausweichdrucker gibt.' },
  en: { q: 'You have three open tickets: a printer on the 2nd floor, a managing director with a slow laptop and a department without access to accounting. What first?', want: 'Prioritising by impact and urgency, communication.', a: 'First I briefly clarify the impact: how many people are affected, is there a workaround, is a deadline or process blocked? Then first the department without accounting, because many people and a core process are affected. I tell the other two when I will come. The managing director gets a short update with a time; perhaps a loan device helps in the meantime. The printer comes after, if there is an alternative printer nearby.' },
  fa: { q: 'سه تیکت باز دارید: یک چاپگر در طبقهٔ دوم، مدیرعاملی با لپ‌تاپ کند و بخشی که به سیستم حسابداری دسترسی ندارد. اول کدام؟', want: 'اولویت‌بندی بر اساس اثر و فوریت، و ارتباط.', a: 'اول کوتاه اثر هر مورد را روشن می‌کنم: چند نفر گرفتارند، راه جایگزین هست، کار یا فرایندی متوقف شده است؟ بعد اول بخشی که به حسابداری دسترسی ندارد، چون افراد زیاد و یک فرایند اصلی درگیرند. به دو نفر دیگر می‌گویم کی می‌رسم. مدیرعامل یک پیام کوتاه با زمان دقیق می‌گیرد؛ شاید یک دستگاه جایگزین موقتاً کمک کند. چاپگر بعد از آن، اگر چاپگر جایگزین در نزدیکی هست.' } },
 { id: 'adminpw', kind: 'situation', link: 'case:software',
  de: { q: 'Ein Abteilungsleiter verlangt am Telefon sofort lokale Adminrechte, weil er eine Software braucht. Was tun Sie?', want: 'Sicherheitsbewusstsein, freundlich Grenzen setzen.', a: 'Ich bleibe freundlich, gebe aber keine Adminrechte, weil das gegen die Sicherheitsrichtlinie verstößt. Ich frage, wofür er die Software braucht, schaue, ob sie im Softwarekatalog ist, oder biete eine freigegebene Alternative an. Sonst lege ich eine Softwareanfrage an und sage ihm, wann er Rückmeldung bekommt. Bei weiterem Druck ziehe ich meine Teamleitung hinzu.' },
  en: { q: 'A head of department demands local admin rights on the phone right now because he needs some software. What do you do?', want: 'Security awareness, setting boundaries politely.', a: 'I stay friendly but do not grant admin rights, because that breaks the security policy. I ask what he needs the software for, check whether it is in the software catalogue, or offer an approved alternative. Otherwise I raise a software request and tell him when he will hear back. If he keeps pushing, I involve my team lead.' },
  fa: { q: 'یک مدیر بخش تلفنی فوراً دسترسی Admin محلی می‌خواهد، چون نرم‌افزاری لازم دارد. چه می‌کنید؟', want: 'آگاهی امنیتی و مرزگذاری مؤدبانه.', a: 'مؤدب می‌مانم ولی دسترسی Admin نمی‌دهم، چون خلاف سیاست امنیتی است. می‌پرسم نرم‌افزار را برای چه می‌خواهد، می‌بینم در کاتالوگ نرم‌افزار هست یا نه، یا جایگزین تأییدشده پیشنهاد می‌دهم. وگرنه درخواست نرم‌افزار ثبت می‌کنم و می‌گویم کی پاسخ می‌گیرد. اگر باز فشار آورد، سرپرست تیمم را در جریان می‌گذارم.' } },
 { id: 'unknown', kind: 'situation', link: 'case:major',
  de: { q: 'Was machen Sie, wenn Sie die Lösung nicht wissen?', want: 'Ehrlichkeit, Eigeninitiative, Grenzen kennen.', a: 'Ich sage ehrlich, dass ich es prüfe, und nenne eine Zeit für die Rückmeldung. Dann suche ich in der Wissensdatenbank, in Herstellerdokumentation und frage erfahrene Kollegen. Wenn es außerhalb meiner Rechte oder meines Wissens liegt, eskaliere ich mit allen bisherigen Prüfungen im Ticket. Danach schreibe ich die Lösung auf, damit das nächste Mal schneller geht.' },
  en: { q: 'What do you do if you don\'t know the solution?', want: 'Honesty, initiative, knowing limits.', a: 'I honestly say I will look into it and give a time for my reply. Then I search the knowledge base and vendor documentation and ask experienced colleagues. If it is beyond my rights or knowledge, I escalate with all checks so far in the ticket. Afterwards I write up the solution so it is faster next time.' },
  fa: { q: 'اگر راه‌حل را ندانید چه می‌کنید؟', want: 'صداقت، ابتکار عمل و شناختن مرزها.', a: 'صادقانه می‌گویم بررسی می‌کنم و زمانی برای پاسخ تعیین می‌کنم. سپس در پایگاه دانش و مستندات سازنده جست‌وجو می‌کنم و از همکاران باتجربه می‌پرسم. اگر بیرون از دسترسی یا دانش من است، با همهٔ بررسی‌ها در تیکت ارجاع می‌دهم. بعد راه‌حل را می‌نویسم تا دفعهٔ بعد سریع‌تر باشد.' } },
 { id: 'mistake', kind: 'situation', link: 'mod:change',
  de: { q: 'Erzählen Sie von einem Fehler, den Sie gemacht haben.', want: 'Verantwortung, Lernen, Transparenz.', a: 'In meinem Lab habe ich eine Firewall-Regel zu breit gesetzt und mich per SSH ausgesperrt. Ich habe über die Konsole wieder Zugang bekommen, die Regel korrigiert und seitdem plane ich Änderungen mit Ausgangsstand und Rückfallweg und halte immer einen zweiten Zugang offen. Im Betrieb würde ich einen Fehler sofort melden, statt ihn zu verstecken.' },
  en: { q: 'Tell us about a mistake you made.', want: 'Responsibility, learning, transparency.', a: 'In my lab I set a firewall rule too broadly and locked myself out of SSH. I regained access via the console, corrected the rule, and since then I plan changes with a baseline and rollback path and always keep a second way in. At work I would report a mistake immediately instead of hiding it.' },
  fa: { q: 'از اشتباهی که کرده‌اید بگویید.', want: 'مسئولیت‌پذیری، یادگیری و شفافیت.', a: 'در آزمایشگاهم یک قانون Firewall را خیلی گسترده تنظیم کردم و دسترسی SSH خودم را بستم. از طریق Console دوباره دسترسی گرفتم و قانون را اصلاح کردم. از آن به بعد تغییرات را با وضعیت پایه و راه بازگشت برنامه‌ریزی می‌کنم و همیشه یک راه دسترسی دوم باز نگه می‌دارم. در محیط کار هم اشتباه را فوراً گزارش می‌دهم، نه اینکه پنهانش کنم.' } },
 { id: 'angry', kind: 'situation', link: 'topic:comm',
  de: { q: 'Ein Benutzer ist am Telefon sehr verärgert und laut. Wie reagieren Sie?', want: 'Ruhe, Empathie, Lösungsorientierung.', a: 'Ich lasse ihn ausreden, bleibe ruhig und zeige Verständnis für die Lage. Dann stelle ich gezielte Fragen (Was genau geht nicht? Seit wann? Was haben Sie schon versucht?), fasse das Problem zusammen und nenne den nächsten konkreten Schritt mit Zeit. Persönlich nehme ich es nicht. Wird er beleidigend, sage ich freundlich, dass ich ihm gern helfe, aber in einem sachlichen Ton, und hole bei Bedarf die Teamleitung dazu.' },
  en: { q: 'A user is very angry and loud on the phone. How do you react?', want: 'Calm, empathy, solution focus.', a: 'I let him finish, stay calm and show understanding for the situation. Then I ask targeted questions (What exactly doesn\'t work? Since when? What have you already tried?), summarise the problem and name the next concrete step with a time. I don\'t take it personally. If he becomes insulting, I say politely that I am happy to help but in a factual tone, and involve the team lead if needed.' },
  fa: { q: 'کاربری پشت تلفن خیلی عصبانی است و بلند حرف می‌زند. چه واکنشی نشان می‌دهید؟', want: 'آرامش، همدلی و تمرکز بر راه‌حل.', a: 'می‌گذارم حرفش را تمام کند، آرام می‌مانم و موقعیتش را درک می‌کنم. سپس پرسش‌های هدفمند می‌پرسم (دقیقاً چه چیزی کار نمی‌کند؟ از کی؟ تا حالا چه کرده‌اید؟)، مشکل را جمع‌بندی می‌کنم و قدم بعدی مشخص را با زمان می‌گویم. موضوع را شخصی نمی‌کنم. اگر توهین کرد، مؤدبانه می‌گویم با کمال میل کمک می‌کنم ولی با لحن آرام، و در صورت نیاز سرپرست تیم را درگیر می‌کنم.' } },
 { id: 'project', kind: 'person', link: 'mod:operations',
  de: { q: 'Erzählen Sie von einem technischen Problem, das Sie gelöst haben.', want: 'Konkretes Beispiel nach STAR: Situation, Aufgabe, Vorgehen, Ergebnis.', a: 'Situation: In meinem Windows-Lab bekam ein Client keine Adresse. Aufgabe: Ursache finden, ohne die Server neu aufzusetzen. Vorgehen: ipconfig zeigte 169.254, der DHCP-Bereich war aktiv, aber der Server war nicht in AD autorisiert. Ich habe autorisiert, das Lease erneuert und DNS und Anmeldung getestet. Ergebnis: Client bekam eine Adresse, und ich habe die Schritte als kurze Anleitung dokumentiert.' },
  en: { q: 'Tell us about a technical problem you solved.', want: 'A concrete example using STAR: situation, task, action, result.', a: 'Situation: in my Windows lab a client got no address. Task: find the cause without rebuilding the servers. Action: ipconfig showed 169.254, the DHCP scope was active but the server was not authorised in AD. I authorised it, renewed the lease and tested DNS and sign-in. Result: the client got an address, and I documented the steps as a short guide.' },
  fa: { q: 'از یک مشکل فنی که حل کرده‌اید بگویید.', want: 'نمونهٔ مشخص به روش STAR: موقعیت، وظیفه، اقدام و نتیجه.', a: 'موقعیت: در آزمایشگاه Windows من یک کلاینت نشانی نمی‌گرفت. وظیفه: پیدا کردن علت بدون نصب دوبارهٔ سرورها. اقدام: ipconfig نشانی 169.254 را نشان داد؛ محدودهٔ DHCP فعال بود ولی سرور در AD مجاز (Authorized) نشده بود. آن را مجاز کردم، Lease را تازه کردم و DNS و ورود را آزمودم. نتیجه: کلاینت نشانی گرفت و مراحل را به‌صورت یک راهنمای کوتاه ثبت کردم.' } },
 { id: 'why', kind: 'person', link: 'page:jobs',
  de: { q: 'Warum möchten Sie im IT-Support arbeiten, und warum bei uns?', want: 'Motivation, Vorbereitung auf die Firma.', a: 'Ich löse gern Probleme, bei denen man sofort sieht, dass jemand wieder arbeiten kann, und ich erkläre Technik gern verständlich. Ich habe mir ein eigenes Lab mit Windows Server, AD, DNS, DHCP und Linux aufgebaut und übe Microsoft 365. Bei Ihnen reizt mich, dass Sie [konkret aus der Anzeige: z. B. eine Microsoft-365-Umgebung mit Intune] betreuen. Genau dort möchte ich mich weiterentwickeln.' },
  en: { q: 'Why do you want to work in IT support, and why with us?', want: 'Motivation, preparation about the company.', a: 'I enjoy solving problems where you immediately see that someone can work again, and I like explaining technology clearly. I built my own lab with Windows Server, AD, DNS, DHCP and Linux and I practise Microsoft 365. What attracts me to you is that you run [specific from the job ad, e.g. a Microsoft 365 environment with Intune]. That is exactly where I want to grow.' },
  fa: { q: 'چرا می‌خواهید در پشتیبانی IT کار کنید و چرا در شرکت ما؟', want: 'انگیزه و آمادگی دربارهٔ شرکت.', a: 'دوست دارم مشکلاتی را حل کنم که فوراً نتیجه‌اش دیده می‌شود و کسی دوباره می‌تواند کار کند، و دوست دارم فناوری را ساده توضیح بدهم. یک آزمایشگاه شخصی با Windows Server، AD، DNS، DHCP و Linux ساخته‌ام و Microsoft 365 را تمرین می‌کنم. شرکت شما برایم جذاب است چون [از آگهی، مشخص: مثلاً محیط Microsoft 365 با Intune] را مدیریت می‌کنید؛ دقیقاً همان جایی که می‌خواهم رشد کنم.' } },
 { id: 'learning', kind: 'person', link: 'topic:m365',
  de: { q: 'Wie halten Sie Ihr Wissen aktuell?', want: 'Selbstständiges Lernen, konkrete Beispiele.', a: 'Ich arbeite wöchentlich an meinem Lab und dokumentiere jede Übung. Für Microsoft 365, Entra ID und Intune nutze ich Microsoft Learn und einen Test-Tenant. Ich lese die offiziellen Dokumentationen von Microsoft und Ubuntu und plane als nächstes [Zertifikat, z. B. ITIL 4 Foundation oder eine Microsoft-Zertifizierung].' },
  en: { q: 'How do you keep your knowledge up to date?', want: 'Independent learning, concrete examples.', a: 'I work on my lab every week and document each exercise. For Microsoft 365, Entra ID and Intune I use Microsoft Learn and a test tenant. I read the official Microsoft and Ubuntu documentation, and next I plan to take [certificate, e.g. ITIL 4 Foundation or a Microsoft certification].' },
  fa: { q: 'دانش خود را چطور به‌روز نگه می‌دارید؟', want: 'یادگیری مستقل با نمونه‌های مشخص.', a: 'هر هفته روی آزمایشگاهم کار می‌کنم و هر تمرین را ثبت می‌کنم. برای Microsoft 365، Entra ID و Intune از Microsoft Learn و یک Tenant آزمایشی استفاده می‌کنم. مستندات رسمی Microsoft و Ubuntu را می‌خوانم و قدم بعدی‌ام [گواهی‌نامه، مثلاً ITIL 4 Foundation یا یک گواهی Microsoft] است.' } }
];
window.LAB.workJobs.cv = {
 de: { t: 'Dein Lab im Lebenslauf und im Gespräch', html: `
<p>Ohne Berufserfahrung ist dein Lab dein stärkster Nachweis. Schreibe es als Projekt in den Lebenslauf, mit konkreten Tätigkeiten statt Schlagworten.</p>
<p><b>Beispiel für den Lebenslauf:</b></p>
<p><i>Eigenes IT-Infrastruktur-Lab (VirtualBox), seit 2026</i></p>
<ul><li>Windows-Server-2025-Domäne mit zwei Domänencontrollern, DNS, DHCP und Dateiserver aufgebaut</li><li>Benutzer, Gruppen und Rechte nach AGDLP, Gruppenrichtlinien, Helpdesk-Delegierung mit Positiv- und Negativtest</li><li>Backup mit Wiederherstellungstest (Hash-Vergleich), Routing zwischen zwei Netzen, Firewall-Regeln mit OPNsense</li><li>Ubuntu Server mit SSH, Nginx und UFW; Kontenanlage per PowerShell-Skript</li><li>20 typische Supportfälle durchgespielt und dokumentiert (Ticketnotizen, Eskalation)</li></ul>
<p><b>Im Gespräch:</b> Bring einen Fall mit, den du nach STAR erzählen kannst (Situation, Aufgabe, Vorgehen, Ergebnis). Zeige auf Nachfrage deine Dokumentation, aber keine Kennwörter.</p>
<p><b>Nützliche Zertifikate</b> (je nach Ziel, Kosten und aktuellen Angeboten prüfen): ITIL 4 Foundation, Microsoft-Zertifizierungen zu Microsoft 365 und Endpoint-Verwaltung, CompTIA A+ oder Network+. Für Ausbildung oder Umschulung zum Fachinformatiker Systemintegration ist das Lab eine gute Vorbereitung auf Praxis und Abschlussprojekt.</p>` },
 en: { t: 'Your lab in your CV and interview', html: `
<p>Without job experience your lab is your strongest evidence. Put it in your CV as a project, with concrete tasks instead of buzzwords.</p>
<p><b>CV example:</b></p>
<p><i>Personal IT infrastructure lab (VirtualBox), since 2026</i></p>
<ul><li>Built a Windows Server 2025 domain with two domain controllers, DNS, DHCP and a file server</li><li>Users, groups and permissions using AGDLP, group policies, help-desk delegation with positive and negative tests</li><li>Backup with tested restore (hash comparison), routing between two networks, firewall rules with OPNsense</li><li>Ubuntu Server with SSH, Nginx and UFW; account creation via PowerShell script</li><li>Worked through and documented 20 typical support cases (ticket notes, escalation)</li></ul>
<p><b>In the interview:</b> bring a case you can tell using STAR (situation, task, action, result). Show your documentation if asked, but no passwords.</p>
<p><b>Useful certificates</b> (check goals, cost and current offers): ITIL 4 Foundation, Microsoft certifications for Microsoft 365 and endpoint management, CompTIA A+ or Network+. For an apprenticeship or retraining as Fachinformatiker Systemintegration the lab is good preparation for practice and the final project.</p>` },
 fa: { t: 'آزمایشگاهت در رزومه و مصاحبه', html: `
<p>بدون سابقهٔ کاری، آزمایشگاهت قوی‌ترین مدرک توست. آن را به‌عنوان پروژه در رزومه بنویس، با کارهای مشخص به‌جای کلمات کلیدی.</p>
<p><b>نمونه برای رزومه (به آلمانی بنویس):</b></p>
<p dir="ltr" lang="de"><i>Eigenes IT-Infrastruktur-Lab (VirtualBox), seit 2026</i></p>
<ul dir="ltr" lang="de"><li>Windows-Server-2025-Domäne mit zwei Domänencontrollern, DNS, DHCP und Dateiserver aufgebaut</li><li>Benutzer, Gruppen und Rechte nach AGDLP, Gruppenrichtlinien, Helpdesk-Delegierung mit Positiv- und Negativtest</li><li>Backup mit Wiederherstellungstest (Hash-Vergleich), Routing zwischen zwei Netzen, Firewall-Regeln mit OPNsense</li><li>Ubuntu Server mit SSH, Nginx und UFW; Kontenanlage per PowerShell-Skript</li><li>20 typische Supportfälle durchgespielt und dokumentiert (Ticketnotizen, Eskalation)</li></ul>
<p><b>در مصاحبه:</b> یک مورد آماده داشته باش که بتوانی به روش STAR تعریف کنی (موقعیت، وظیفه، اقدام، نتیجه). اگر خواستند مستنداتت را نشان بده، ولی بدون گذرواژه.</p>
<p><b>گواهی‌نامه‌های مفید</b> (هدف، هزینه و پیشنهادهای فعلی را بررسی کن): ITIL 4 Foundation، گواهی‌های Microsoft برای Microsoft 365 و مدیریت دستگاه، CompTIA A+ یا Network+. برای Ausbildung یا بازآموزی Fachinformatiker Systemintegration، این آزمایشگاه آمادگی خوبی برای کار عملی و پروژهٔ پایانی است.</p>` }
};
/* Praxisbezug für jede Lektion · Teil 1 (Windows-Grundlagen und Betrieb) */
window.LAB.workLessons = Object.assign(window.LAB.workLessons || {}, {
 start: {
  de: { task: 'Baue eine abgeschottete Übungsumgebung mit drei virtuellen Maschinen, in der du nichts Echtes kaputt machen kannst.', why: 'Firmen testen Änderungen zuerst in einer Testumgebung. Wer virtuelle Maschinen, Snapshots und Netzwerkmodi versteht, kann sicher üben und später Hyper-V oder VMware schneller lernen.', daily: 'Ein Kollege fragt, warum seine Test-VM ins echte Firmennetz funkt: Sie war per Netzwerkbrücke verbunden.', boss: 'Du kennst den Unterschied zwischen NAT, internem Netz und Brücke und isolierst Tests vom Produktivnetz.' },
  en: { task: 'Build an isolated practice environment with three virtual machines where you cannot break anything real.', why: 'Companies test changes in a test environment first. Understanding virtual machines, snapshots and network modes lets you practise safely and learn Hyper-V or VMware faster later.', daily: 'A colleague asks why his test VM is talking to the real company network: it was connected via a bridge.', boss: 'You know the difference between NAT, internal network and bridge and keep tests away from production.' },
  fa: { task: 'یک محیط تمرینی جدا با سه ماشین مجازی بساز که در آن چیزی واقعی خراب نشود.', why: 'شرکت‌ها تغییرات را اول در محیط آزمایشی امتحان می‌کنند. اگر ماشین مجازی، Snapshot و حالت‌های شبکه را بفهمی، امن تمرین می‌کنی و بعداً Hyper-V یا VMware را سریع‌تر یاد می‌گیری.', daily: 'همکاری می‌پرسد چرا VM آزمایشی‌اش با شبکهٔ واقعی شرکت حرف می‌زند: با Bridge وصل بوده است.', boss: 'فرق NAT، شبکهٔ داخلی و Bridge را می‌دانی و آزمایش‌ها را از شبکهٔ اصلی جدا نگه می‌داری.' } },
 install: {
  de: { task: 'Installiere drei Windows-Maschinen, gib ihnen eindeutige Namen und feste Adressen und prüfe, dass sie sich sehen.', why: 'Jeder neue Server und jeder neue Arbeitsplatz beginnt so. Falsche Namen oder Adressen verursachen später DNS- und Anmeldeprobleme.', daily: 'Ein neuer Server ist im Netz nicht erreichbar, weil versehentlich ein falsches Gateway eingetragen wurde.', boss: 'Du installierst sauber nach Namens- und Adressplan, aktualisierst vor dem Einsatz und dokumentierst den Stand.' },
  en: { task: 'Install three Windows machines, give them unique names and static addresses, and check they can see each other.', why: 'Every new server and workstation starts like this. Wrong names or addresses cause DNS and sign-in problems later.', daily: 'A new server is unreachable because a wrong gateway was entered by mistake.', boss: 'You install cleanly according to the naming and address plan, update before use and document the state.' },
  fa: { task: 'سه ماشین Windows نصب کن، نام یکتا و نشانی ثابت بده و بسنج که همدیگر را می‌بینند.', why: 'هر سرور و میز کار تازه همین‌طور شروع می‌شود. نام یا نشانی اشتباه بعداً مشکل DNS و ورود می‌سازد.', daily: 'یک سرور تازه در شبکه در دسترس نیست، چون اشتباهی Gateway نادرست وارد شده است.', boss: 'طبق طرح نام‌گذاری و نشانی‌دهی تمیز نصب می‌کنی، پیش از استفاده به‌روزرسانی می‌کنی و وضعیت را ثبت می‌کنی.' } },
 ad: {
  de: { task: 'Mache aus einem Server den ersten Domänencontroller und prüfe, dass Verzeichnis und DNS gesund sind.', why: 'Active Directory ist in fast jeder deutschen Firma mit Windows das Herz für Anmeldung, Rechte und Richtlinien. Auch in Cloud-Umgebungen ist es oft per Hybrid angebunden.', daily: 'Niemand kann sich anmelden, weil der einzige Domänencontroller wegen eines vollen Datenträgers stehen geblieben ist.', boss: 'Du verstehst, was ein Domänencontroller tut, und kannst seinen Zustand mit Werkzeugen wie dcdiag prüfen.' },
  en: { task: 'Turn a server into the first domain controller and check that directory and DNS are healthy.', why: 'Active Directory is at the heart of sign-in, rights and policies in almost every Windows company. Even in cloud environments it is often connected in a hybrid setup.', daily: 'Nobody can sign in because the only domain controller stopped due to a full disk.', boss: 'You understand what a domain controller does and can check its health with tools such as dcdiag.' },
  fa: { task: 'یک سرور را به اولین کنترل‌کنندهٔ دامنه تبدیل کن و بسنج که دایرکتوری و DNS سالم‌اند.', why: 'Active Directory تقریباً در هر شرکت آلمانی با Windows، قلب ورود، دسترسی و سیاست‌هاست؛ حتی در محیط Cloud هم اغلب به‌صورت Hybrid متصل است.', daily: 'هیچ‌کس نمی‌تواند وارد شود، چون تنها کنترل‌کنندهٔ دامنه به‌خاطر پر شدن دیسک متوقف شده است.', boss: 'می‌دانی کنترل‌کنندهٔ دامنه چه می‌کند و می‌توانی سلامتش را با ابزارهایی مثل dcdiag بسنجی.' } },
 dns: {
  de: { task: 'Prüfe, wie Namen in Adressen übersetzt werden, und lege fehlende Einträge richtig an.', why: 'Sehr viele Störungen sehen aus wie „Netzwerk kaputt“, sind aber DNS. Wer DNS prüfen kann, löst sie in Minuten.', daily: 'Ein Benutzer erreicht den Dateiserver per IP, aber nicht per Namen. Ursache: falscher DNS-Server am Notebook.', boss: 'Du nutzt nslookup und Resolve-DnsName sicher und unterscheidest DNS-Fehler von Verbindungsfehlern.' },
  en: { task: 'Check how names are translated into addresses and create missing records correctly.', why: 'Many incidents look like "network broken" but are really DNS. If you can check DNS, you solve them in minutes.', daily: 'A user reaches the file server by IP but not by name. Cause: wrong DNS server on the laptop.', boss: 'You use nslookup and Resolve-DnsName confidently and tell DNS errors apart from connection errors.' },
  fa: { task: 'بسنج نام‌ها چطور به نشانی ترجمه می‌شوند و رکوردهای ناموجود را درست بساز.', why: 'خیلی از اختلال‌ها شبیه «خرابی شبکه» هستند ولی در واقع مشکل DNS‌اند. اگر DNS را بلد باشی، در چند دقیقه حلشان می‌کنی.', daily: 'کاربری File Server را با IP می‌بیند ولی با نام نه. علت: سرور DNS اشتباه روی لپ‌تاپ.', boss: 'با nslookup و Resolve-DnsName مطمئن کار می‌کنی و خطای DNS را از خطای اتصال جدا می‌کنی.' } },
 dhcp: {
  de: { task: 'Nimm Rechner in die Domäne auf und lass Clients ihre Adressen automatisch und richtig bekommen.', why: 'Jeder neue PC muss in die Domäne und braucht eine korrekte Adresse. DHCP-Fehler betreffen oft viele Arbeitsplätze gleichzeitig.', daily: 'Montagmorgen bekommen neue Notebooks keine Adresse, weil der DHCP-Bereich voll ist.', boss: 'Du kennst Bereich, Optionen und Leases, erkennst 169.254-Adressen sofort und prüfst den sicheren Kanal nach einem Domänenbeitritt.' },
  en: { task: 'Join computers to the domain and let clients receive their addresses automatically and correctly.', why: 'Every new PC must join the domain and needs a correct address. DHCP faults often affect many workstations at once.', daily: 'On Monday morning new laptops get no address because the DHCP scope is full.', boss: 'You know scope, options and leases, recognise 169.254 addresses immediately and check the secure channel after a domain join.' },
  fa: { task: 'رایانه‌ها را عضو دامنه کن و بگذار کلاینت‌ها نشانی را خودکار و درست بگیرند.', why: 'هر رایانهٔ تازه باید عضو دامنه شود و نشانی درست بگیرد. خطای DHCP اغلب هم‌زمان میزهای کار زیادی را گرفتار می‌کند.', daily: 'دوشنبه صبح لپ‌تاپ‌های تازه نشانی نمی‌گیرند، چون محدودهٔ DHCP پر شده است.', boss: 'Scope، Options و Lease را می‌شناسی، نشانی 169.254 را فوراً تشخیص می‌دهی و پس از عضویت در دامنه Secure Channel را می‌سنجی.' } },
 identities: {
  de: { task: 'Lege Benutzer, Abteilungsordner (OUs) und Gruppen so an, dass Rechte nach Rollen vergeben werden.', why: 'Benutzerverwaltung ist eine der häufigsten Aufgaben im Support: neue Kollegen, Abteilungswechsel, Austritte.', daily: 'Eine neue Mitarbeiterin wurde als Kopie eines Kollegen angelegt und sieht nun Gehaltsdaten, die sie nicht sehen darf.', boss: 'Du arbeitest nach Namensregel und Rollenvorlage, vergibst Rechte über Gruppen und kopierst nicht blind Konten.' },
  en: { task: 'Create users, department containers (OUs) and groups so that rights are granted by role.', why: 'User management is one of the most frequent support tasks: new colleagues, department changes, leavers.', daily: 'A new employee was created as a copy of a colleague and can now see salary data she must not see.', boss: 'You follow the naming rule and role template, grant rights through groups and never copy accounts blindly.' },
  fa: { task: 'کاربران، واحدهای سازمانی (OU) و گروه‌ها را طوری بساز که دسترسی بر اساس نقش داده شود.', why: 'مدیریت کاربران از رایج‌ترین کارهای پشتیبانی است: همکاران تازه، تغییر بخش و خروج.', daily: 'همکار تازه به‌صورت کپی یک همکار دیگر ساخته شده و حالا داده‌های حقوقی را می‌بیند که نباید ببیند.', boss: 'طبق قانون نام‌گذاری و قالب نقش کار می‌کنی، دسترسی را با گروه می‌دهی و حساب‌ها را کورکورانه کپی نمی‌کنی.' } },
 access: {
  de: { task: 'Gib einen Ordner frei und beweise, dass die richtige Person darf und die falsche nicht. Wende danach eine Gruppenrichtlinie an.', why: '„Ich komme nicht an den Ordner“ ist eines der häufigsten Tickets. Und „Wer hat das freigegeben?“ fragt jeder Prüfer.', daily: 'Ein Mitarbeiter sieht nach einem Abteilungswechsel noch die Ordner der alten Abteilung.', boss: 'Du verstehst Freigabe- und NTFS-Rechte, testest mit echtem Benutzerkonto statt Admin und vergibst nur mit Freigabe.' },
  en: { task: 'Share a folder and prove that the right person can and the wrong person cannot. Then apply a group policy.', why: '"I can\'t get to the folder" is one of the most frequent tickets. And every auditor asks "who approved this?".', daily: 'After a department change an employee can still see the old department\'s folders.', boss: 'You understand share and NTFS permissions, test with a real user account rather than admin, and grant only with approval.' },
  fa: { task: 'یک پوشه را به اشتراک بگذار و ثابت کن فرد مجاز دسترسی دارد و فرد غیرمجاز ندارد. سپس یک Group Policy اعمال کن.', why: '«به پوشه دسترسی ندارم» از رایج‌ترین تیکت‌هاست و هر بازرسی می‌پرسد «چه کسی این را تأیید کرده؟».', daily: 'کارمندی پس از تغییر بخش هنوز پوشه‌های بخش قبلی را می‌بیند.', boss: 'دسترسی‌های Share و NTFS را می‌فهمی، با حساب کاربر واقعی آزمایش می‌کنی نه با Admin، و فقط با تأیید دسترسی می‌دهی.' } },
 operations: {
  de: { task: 'Spiele eine echte Supportschicht: Fehler finden, Konto sperren, Ergebnisse so übergeben, dass jemand anderes weitermachen kann.', why: 'Genau so sieht der Arbeitsalltag aus: viele kleine Fälle, saubere Notizen und klare Übergaben.', daily: 'Die Spätschicht kann ein Ticket nicht weiterbearbeiten, weil im Ticket nur „getestet, geht nicht“ steht.', boss: 'Du dokumentierst Symptom, Prüfungen, Ergebnis und nächsten Schritt so, dass Kollegen ohne Rückfrage weiterarbeiten.' },
  en: { task: 'Play a real support shift: find a fault, block an account, hand over results so someone else can continue.', why: 'This is exactly what daily work looks like: many small cases, clean notes and clear hand-overs.', daily: 'The late shift cannot continue a ticket because it only says "tested, doesn\'t work".', boss: 'You document symptom, checks, result and next step so colleagues can continue without asking.' },
  fa: { task: 'یک شیفت واقعی پشتیبانی را بازی کن: خطا پیدا کن، حسابی را ببند و نتیجه‌ها را طوری تحویل بده که دیگری ادامه دهد.', why: 'کار روزانه دقیقاً همین است: موارد کوچک زیاد، یادداشت تمیز و تحویل روشن.', daily: 'شیفت عصر نمی‌تواند تیکتی را ادامه دهد، چون فقط نوشته «آزمایش شد، کار نمی‌کند».', boss: 'نشانه، بررسی‌ها، نتیجه و قدم بعدی را طوری ثبت می‌کنی که همکاران بدون پرسیدن ادامه دهند.' } },
 automation: {
  de: { task: 'Lege Benutzerkonten per PowerShell aus einer Liste an, zuerst als Vorschau, und beweise, dass ein zweiter Lauf nichts doppelt anlegt.', why: 'Wiederkehrende Aufgaben wie Kontenanlage oder Berichte werden in fast allen Stellenanzeigen für Admins mit PowerShell genannt.', daily: 'Zum Monatsanfang beginnen zwölf Auszubildende. Von Hand dauert das Stunden und Tippfehler sind sicher.', boss: 'Du kannst ein einfaches Skript lesen, anpassen, mit -WhatIf testen und keine Kennwörter in Dateien speichern.' },
  en: { task: 'Create user accounts from a list with PowerShell, first as a preview, and prove that a second run creates no duplicates.', why: 'Recurring tasks like account creation or reports with PowerShell are named in almost every admin job ad.', daily: 'Twelve apprentices start at the beginning of the month. By hand that takes hours and typos are certain.', boss: 'You can read and adapt a simple script, test with -WhatIf, and never store passwords in files.' },
  fa: { task: 'حساب‌های کاربری را از یک فهرست با PowerShell بساز، اول به‌صورت پیش‌نمایش، و ثابت کن اجرای دوم چیزی را تکراری نمی‌سازد.', why: 'کارهای تکراری مثل ساخت حساب یا گزارش با PowerShell تقریباً در همهٔ آگهی‌های مدیر سیستم آمده است.', daily: 'اول ماه دوازده کارآموز شروع می‌کنند. دستی چند ساعت طول می‌کشد و اشتباه تایپی حتمی است.', boss: 'می‌توانی یک اسکریپت ساده را بخوانی، تغییر دهی، با -WhatIf بسنجی و گذرواژه را در فایل ذخیره نکنی.' } },
 redundancy: {
  de: { task: 'Stelle einen zweiten Domänencontroller auf und beweise, dass die Anmeldung weiterläuft, wenn der erste ausfällt.', why: 'Firmen erwarten, dass Anmeldung und DNS auch bei Wartung oder Ausfall eines Servers weiterlaufen.', daily: 'Während eines Server-Updates können sich alle anmelden, aber ein Standort nicht: Dort war nur ein DNS-Server eingetragen.', boss: 'Du verstehst Replikation, prüfst sie mit repadmin und weißt, dass zwei DCs kein Backup ersetzen.' },
  en: { task: 'Set up a second domain controller and prove that sign-in keeps working when the first one fails.', why: 'Companies expect sign-in and DNS to keep working during maintenance or a server outage.', daily: 'During a server update everyone can sign in except one site: only one DNS server was configured there.', boss: 'You understand replication, check it with repadmin and know that two DCs do not replace a backup.' },
  fa: { task: 'کنترل‌کنندهٔ دامنهٔ دوم را راه بینداز و ثابت کن اگر اولی از کار بیفتد، ورود ادامه پیدا می‌کند.', why: 'شرکت‌ها انتظار دارند ورود و DNS هنگام نگهداری یا خرابی یک سرور ادامه داشته باشد.', daily: 'هنگام به‌روزرسانی سرور همه می‌توانند وارد شوند جز یک شعبه؛ آنجا فقط یک سرور DNS تنظیم شده بود.', boss: 'Replication را می‌فهمی، با repadmin بررسی می‌کنی و می‌دانی دو DC جای Backup را نمی‌گیرد.' } },
 delegation: {
  de: { task: 'Gib dem Helpdesk genau das Recht zum Kennwortzurücksetzen und beweise, dass mehr nicht geht.', why: 'Minimale Rechte sind eine Grundregel der IT-Sicherheit. Firmen fragen im Gespräch oft, warum nicht jeder Domain Admin sein sollte.', daily: 'Ein Praktikant war versehentlich Domain Admin und hat eine Gruppenrichtlinie gelöscht.', boss: 'Du vergibst nur nötige Rechte, testest erlaubte und verbotene Aktionen und kannst begründen, warum.' },
  en: { task: 'Give the help desk exactly the right to reset passwords and prove that nothing more is possible.', why: 'Least privilege is a basic rule of IT security. Interviewers often ask why not everybody should be Domain Admin.', daily: 'An intern was accidentally Domain Admin and deleted a group policy.', boss: 'You grant only the rights needed, test allowed and forbidden actions and can explain why.' },
  fa: { task: 'به Helpdesk دقیقاً اجازهٔ ریست گذرواژه بده و ثابت کن بیش از آن ممکن نیست.', why: 'کمترین دسترسی، قانون پایهٔ امنیت IT است. در مصاحبه اغلب می‌پرسند چرا نباید همه Domain Admin باشند.', daily: 'یک کارآموز اشتباهی Domain Admin بوده و یک Group Policy را پاک کرده است.', boss: 'فقط دسترسی لازم می‌دهی، کارهای مجاز و غیرمجاز را آزمایش می‌کنی و می‌توانی دلیلش را توضیح دهی.' } },
 recovery: {
  de: { task: 'Sichere eine Datei, stelle sie an anderer Stelle wieder her und beweise mit einem Hash, dass sie unverändert ist.', why: 'Ein Backup ist nur so gut wie die getestete Wiederherstellung. Bei Ransomware oder gelöschten Daten zählt jede Stunde.', daily: 'Eine Kollegin hat aus Versehen den Projektordner gelöscht und braucht den Stand von gestern.', boss: 'Du stellst Daten ohne Überschreiben wieder her, kennst RPO und RTO und prüfst Backups regelmäßig.' },
  en: { task: 'Back up a file, restore it to another location and prove with a hash that it is unchanged.', why: 'A backup is only as good as a tested restore. With ransomware or deleted data, every hour counts.', daily: 'A colleague accidentally deleted the project folder and needs yesterday\'s version.', boss: 'You restore without overwriting, know RPO and RTO and check backups regularly.' },
  fa: { task: 'از یک فایل Backup بگیر، آن را در جای دیگری بازیابی کن و با Hash ثابت کن تغییری نکرده است.', why: 'Backup فقط به اندازهٔ بازیابی آزموده‌شده‌اش ارزش دارد. در باج‌افزار یا حذف داده، هر ساعت مهم است.', daily: 'همکاری اشتباهی پوشهٔ پروژه را پاک کرده و نسخهٔ دیروز را لازم دارد.', boss: 'بدون رونویسی بازیابی می‌کنی، RPO و RTO را می‌شناسی و Backupها را منظم می‌سنجی.' } },
 monitoring: {
  de: { task: 'Lies den Zustand eines Servers aus der Ferne, erkenne einen gestoppten Dienst und dokumentiere die Störung.', why: 'Gute IT bemerkt Probleme, bevor Benutzer anrufen. Ereignisanzeige und Dienststatus sind tägliche Werkzeuge.', daily: 'Seit dem Morgen druckt niemand: Der Druckwarteschlangendienst auf dem Server ist gestoppt.', boss: 'Du sammelst Nachweise (Zeit, Ereignis, Status) bevor du etwas änderst, und eskalierst rechtzeitig.' },
  en: { task: 'Read a server\'s health remotely, detect a stopped service and document the incident.', why: 'Good IT notices problems before users call. Event Viewer and service status are daily tools.', daily: 'Nobody has been able to print since the morning: the print spooler on the server is stopped.', boss: 'You collect evidence (time, event, status) before changing anything, and escalate in time.' },
  fa: { task: 'وضعیت یک سرور را از راه دور بخوان، سرویس متوقف‌شده را تشخیص بده و اختلال را ثبت کن.', why: 'IT خوب مشکل را پیش از تماس کاربران می‌بیند. Event Viewer و وضعیت سرویس‌ها ابزارهای روزانه‌اند.', daily: 'از صبح کسی نمی‌تواند چاپ کند: سرویس Print Spooler روی سرور متوقف است.', boss: 'پیش از هر تغییر شواهد جمع می‌کنی (زمان، رویداد، وضعیت) و به‌موقع ارجاع می‌دهی.' } },
 change: {
  de: { task: 'Spiele ein Update erst auf einem Testserver ein, mit Abnahmekriterien und Rückfallplan.', why: 'Ungeplante Änderungen sind eine Hauptursache für Ausfälle. Firmen arbeiten deshalb mit Change-Prozess und Wartungsfenstern.', daily: 'Nach einem Update am Freitagnachmittag startet die Buchhaltungssoftware nicht mehr und niemand weiß, was geändert wurde.', boss: 'Du planst Änderungen, testest zuerst klein, dokumentierst und hast einen Weg zurück.' },
  en: { task: 'Apply an update to a test server first, with acceptance criteria and a rollback plan.', why: 'Unplanned changes are a main cause of outages. Companies therefore use a change process and maintenance windows.', daily: 'After an update on Friday afternoon the accounting software no longer starts and nobody knows what was changed.', boss: 'You plan changes, test small first, document and have a way back.' },
  fa: { task: 'یک به‌روزرسانی را اول روی سرور آزمایشی نصب کن، با معیار پذیرش و طرح بازگشت.', why: 'تغییرات برنامه‌ریزی‌نشده از علت‌های اصلی خرابی‌اند. برای همین شرکت‌ها روند Change و پنجرهٔ نگهداری دارند.', daily: 'بعد از به‌روزرسانی جمعه عصر، نرم‌افزار حسابداری دیگر باز نمی‌شود و کسی نمی‌داند چه چیزی عوض شده.', boss: 'تغییر را برنامه‌ریزی می‌کنی، اول در مقیاس کوچک آزمایش می‌کنی، ثبت می‌کنی و راه بازگشت داری.' } }
});
/* Praxisbezug für jede Lektion · Teil 2 (Arbeitsplatz, Netzwerk, Linux, Infrastruktur) */
window.LAB.workLessons = Object.assign(window.LAB.workLessons || {}, {
 workstations: {
  de: { task: 'Richte einen Arbeitsplatz mit Software ein und prüfe ihn als normaler Benutzer, nicht als Administrator.', why: 'Arbeitsplätze vorbereiten steht in fast jeder Anzeige für Support und Vor-Ort-Technik. In vielen Firmen geschieht das heute mit Intune und Autopilot.', daily: 'Ein neues Notebook funktioniert beim Admin, aber die Mitarbeiterin kann ihr Programm nicht starten, weil ihr eine Berechtigung fehlt.', boss: 'Du arbeitest nach Checkliste, nutzt nur freigegebene Software und testest mit dem Benutzerkonto, das später damit arbeitet.' },
  en: { task: 'Set up a workstation with software and test it as a normal user, not as administrator.', why: 'Preparing workstations is in almost every support and on-site job ad. Many companies now do it with Intune and Autopilot.', daily: 'A new laptop works for the admin, but the employee cannot start her program because she lacks a permission.', boss: 'You work from a checklist, use only approved software and test with the account that will actually use it.' },
  fa: { task: 'یک میز کار را با نرم‌افزار آماده کن و آن را با کاربر عادی بسنج، نه با مدیر.', why: 'آماده‌سازی میز کار تقریباً در هر آگهی پشتیبانی و تکنسین در محل آمده است. بسیاری از شرکت‌ها امروز این کار را با Intune و Autopilot انجام می‌دهند.', daily: 'لپ‌تاپ تازه برای Admin کار می‌کند ولی کارمند نمی‌تواند برنامه‌اش را اجرا کند، چون یک دسترسی ندارد.', boss: 'با چک‌لیست کار می‌کنی، فقط نرم‌افزار تأییدشده نصب می‌کنی و با همان حسابی که بعداً کار می‌کند آزمایش می‌کنی.' } },
 'printing-storage': {
  de: { task: 'Übe Drucken und Druckwarteschlange und prüfe einen Netzwerkspeicher auf Kapazität, Rechte und Wiederherstellung.', why: 'Drucker gehören zu den häufigsten Tickets im Büro. Netzwerkspeicher (NAS) halten oft wichtige Daten von Abteilungen.', daily: 'Der Abteilungsdrucker druckt nur noch Zeichensalat: falscher Treiber nach einem Update.', boss: 'Du gehst Druckprobleme schrittweise an (Gerät, Warteschlange, Treiber, Server) und weißt: RAID ist kein Backup.' },
  en: { task: 'Practise printing and the print queue and check a network storage for capacity, rights and restore.', why: 'Printers are among the most frequent office tickets. Network storage (NAS) often holds important departmental data.', daily: 'The department printer only prints garbage: wrong driver after an update.', boss: 'You approach print problems step by step (device, queue, driver, server) and know RAID is not a backup.' },
  fa: { task: 'چاپ و صف چاپ را تمرین کن و یک فضای ذخیره‌سازی شبکه را از نظر ظرفیت، دسترسی و بازیابی بسنج.', why: 'چاپگرها از رایج‌ترین تیکت‌های اداری‌اند. فضای ذخیره‌سازی شبکه (NAS) اغلب داده‌های مهم بخش‌ها را نگه می‌دارد.', daily: 'چاپگر بخش فقط نویسه‌های درهم چاپ می‌کند: درایور اشتباه پس از به‌روزرسانی.', boss: 'مشکل چاپ را قدم‌به‌قدم بررسی می‌کنی (دستگاه، صف، درایور، سرور) و می‌دانی RAID جای Backup را نمی‌گیرد.' } },
 networking: {
  de: { task: 'Verbinde zwei Netze über einen Router und sperre gezielt einen Dienst, ohne den Rest zu stören.', why: 'Standorte, Homeoffice und VLANs sind Alltag. Wer Routing und Firewall-Regeln versteht, findet Fehler zwischen Netzen.', daily: 'Die Zweigstelle erreicht den Dateiserver nicht, aber das Internet geht: Es fehlt die Rückroute.', boss: 'Du trennst Namensauflösung, Routing und Ports sauber und kannst Fehler mit ping, tracert und Test-NetConnection eingrenzen.' },
  en: { task: 'Connect two networks via a router and block one service on purpose without disturbing the rest.', why: 'Sites, home office and VLANs are daily business. If you understand routing and firewall rules, you find faults between networks.', daily: 'The branch cannot reach the file server but the internet works: the return route is missing.', boss: 'You separate name resolution, routing and ports cleanly and narrow down faults with ping, tracert and Test-NetConnection.' },
  fa: { task: 'دو شبکه را با یک روتر به هم وصل کن و یک سرویس را عمداً مسدود کن، بدون اینکه بقیه مختل شود.', why: 'شعبه‌ها، دورکاری و VLANها کار روزمره‌اند. اگر Routing و قوانین Firewall را بفهمی، خطای بین شبکه‌ها را پیدا می‌کنی.', daily: 'شعبه به File Server نمی‌رسد ولی اینترنت کار می‌کند: مسیر برگشت تعریف نشده است.', boss: 'تفکیک نام، مسیر و پورت را تمیز انجام می‌دهی و خطا را با ping، tracert و Test-NetConnection محدود می‌کنی.' } },
 hardware: {
  de: { task: 'Prüfe echte Geräte, Peripherie, LAN und WLAN und übergib einen Arbeitsplatz mit kurzer Anleitung an den Benutzer.', why: 'Vor-Ort-Techniker verbringen viel Zeit mit Hardware, Docks, Monitoren, WLAN und Benutzerübergaben. Das lässt sich in einer VM nicht üben.', daily: 'Ein Notebook lädt am Dock nicht mehr. Nach Kabeltausch geht es: Das alte Kabel konnte nur Daten, keinen Strom.', boss: 'Du arbeitest mit Tauschmethode, notierst Modelle und Fehlercodes und erklärst Benutzern das Wichtigste in einfachen Worten.' },
  en: { task: 'Check real devices, peripherals, LAN and Wi-Fi and hand over a workstation with a short guide to the user.', why: 'On-site technicians spend a lot of time with hardware, docks, monitors, Wi-Fi and user hand-overs. You cannot practise that in a VM.', daily: 'A laptop no longer charges on the dock. After swapping the cable it works: the old cable carried data only, no power.', boss: 'You use the swap method, record models and error codes and explain the essentials to users in plain words.' },
  fa: { task: 'دستگاه‌های واقعی، تجهیزات جانبی، LAN و WLAN را بسنج و یک میز کار را با راهنمای کوتاه به کاربر تحویل بده.', why: 'تکنسین‌های در محل زمان زیادی با سخت‌افزار، Dock، مانیتور، WLAN و تحویل به کاربر کار می‌کنند و این‌ها در VM تمرین نمی‌شوند.', daily: 'لپ‌تاپ روی Dock دیگر شارژ نمی‌شود. با تعویض کابل درست شد: کابل قدیمی فقط داده منتقل می‌کرد، نه برق.', boss: 'با روش جایگزینی کار می‌کنی، مدل و کد خطا را ثبت می‌کنی و نکته‌های مهم را ساده به کاربر می‌گویی.' } },
 'linux-start': {
  de: { task: 'Installiere einen Ubuntu-Server, gib ihm eine feste Adresse und richte sicheres SSH mit normalem Konto ein.', why: 'Auch in Windows-Firmen laufen Linux-Server für Web, Monitoring oder Appliances. Grundlagen stehen in vielen Anzeigen für Junior-Admins und Fachinformatiker.', daily: 'Nach einer Firewall-Änderung kommt niemand mehr per SSH auf den Server: Die SSH-Regel fehlte.', boss: 'Du arbeitest nicht als root, sicherst Konfigurationsdateien vor Änderungen und hältst einen Konsolenzugang als Rückweg.' },
  en: { task: 'Install an Ubuntu server, give it a static address and set up secure SSH with a normal account.', why: 'Even Windows companies run Linux servers for web, monitoring or appliances. The basics appear in many junior admin and Fachinformatiker job ads.', daily: 'After a firewall change nobody can SSH into the server: the SSH rule was missing.', boss: 'You don\'t work as root, back up config files before changes and keep console access as a way back.' },
  fa: { task: 'یک سرور Ubuntu نصب کن، نشانی ثابت بده و SSH امن با حساب عادی راه بینداز.', why: 'حتی در شرکت‌های Windows هم سرورهای Linux برای وب، پایش یا Appliance کار می‌کنند. پایه‌های آن در بسیاری از آگهی‌های مدیر سیستم تازه‌کار و FISI آمده است.', daily: 'پس از تغییر Firewall دیگر کسی با SSH به سرور نمی‌رسد: قانون SSH جا افتاده بود.', boss: 'با root کار نمی‌کنی، پیش از تغییر از فایل‌های تنظیم پشتیبان می‌گیری و دسترسی Console را برای بازگشت نگه می‌داری.' } },
 'linux-services': {
  de: { task: 'Finde heraus, warum ein Webdienst nicht antwortet, setze Dateirechte und stelle Daten aus einem Archiv wieder her.', why: 'Dienste starten, stoppen und Protokolle lesen ist die Hauptarbeit auf Linux-Servern. Dieselbe Denkweise hilft auch unter Windows.', daily: 'Die interne Webseite zeigt nur einen Fehler: Nach einem Update startet der Dienst wegen eines Tippfehlers in der Konfiguration nicht.', boss: 'Du nutzt systemctl, journalctl und ss sicher, testest die Konfiguration vor dem Neustart und dokumentierst die Ursache.' },
  en: { task: 'Find out why a web service does not respond, set file permissions and restore data from an archive.', why: 'Starting and stopping services and reading logs is the main work on Linux servers. The same thinking helps on Windows too.', daily: 'The internal website only shows an error: after an update the service does not start because of a typo in the configuration.', boss: 'You use systemctl, journalctl and ss confidently, test the configuration before restarting and document the cause.' },
  fa: { task: 'پیدا کن چرا یک سرویس وب پاسخ نمی‌دهد، دسترسی فایل‌ها را تنظیم کن و داده را از یک آرشیو بازیابی کن.', why: 'روشن و خاموش کردن سرویس‌ها و خواندن لاگ کار اصلی روی سرورهای Linux است. همین طرز فکر در Windows هم کمک می‌کند.', daily: 'وب‌سایت داخلی فقط خطا نشان می‌دهد: پس از به‌روزرسانی، سرویس به‌خاطر یک اشتباه تایپی در تنظیمات روشن نمی‌شود.', boss: 'با systemctl، journalctl و ss مطمئن کار می‌کنی، پیش از ری‌استارت تنظیمات را می‌سنجی و علت را ثبت می‌کنی.' } },
 'server-room': {
  de: { task: 'Plane ein Rack mit Höheneinheiten, Strom, USV und Kühlung und halte deine Annahmen fest.', why: 'Wer vor Ort arbeitet, baut Geräte ein, beschriftet Kabel und muss wissen, ob Strom und USV reichen.', daily: 'Ein neuer Server wird eingebaut und die USV geht in Überlast, weil niemand die Leistung nachgerechnet hat.', boss: 'Du rechnest mit echten Werten, beschriftest sauber und weißt, wann Elektriker oder Gebäudetechnik dran sind.' },
  en: { task: 'Plan a rack with rack units, power, UPS and cooling and record your assumptions.', why: 'On-site staff install devices, label cables and must know whether power and UPS are sufficient.', daily: 'A new server is installed and the UPS overloads because nobody checked the power figures.', boss: 'You calculate with real values, label cleanly and know when electricians or facilities must be involved.' },
  fa: { task: 'یک رک را با واحدهای ارتفاع (U)، برق، UPS و سرمایش برنامه‌ریزی کن و فرض‌هایت را ثبت کن.', why: 'کسی که در محل کار می‌کند دستگاه نصب می‌کند، کابل برچسب می‌زند و باید بداند برق و UPS کافی‌اند یا نه.', daily: 'یک سرور تازه نصب می‌شود و UPS دچار اضافه‌بار می‌شود، چون کسی توان را حساب نکرده بود.', boss: 'با مقادیر واقعی حساب می‌کنی، تمیز برچسب می‌زنی و می‌دانی کی باید برق‌کار یا تأسیسات ساختمان وارد شوند.' } },
 'vendor-servers': {
  de: { task: 'Lerne die Fernverwaltung echter Server (iDRAC, iLO, XClarity) kennen: Zustand lesen, Zugang absichern, Konfiguration sichern.', why: 'Wenn ein Server nicht mehr startet, ist die Fernverwaltung oft der einzige Weg. Admins nutzen sie für Hardwarezustand und Firmware.', daily: 'Ein Server meldet einen Lüfterfehler. Über iLO siehst du den Fehler, ohne ins Rechenzentrum zu fahren.', boss: 'Du kennst den Zweck dieser Controller, veröffentlichst sie nie ins Internet und hältst dich an Herstelleranleitungen.' },
  en: { task: 'Get to know remote management of real servers (iDRAC, iLO, XClarity): read health, secure access, back up configuration.', why: 'When a server no longer boots, remote management is often the only way in. Admins use it for hardware health and firmware.', daily: 'A server reports a fan fault. Via iLO you see the fault without driving to the data centre.', boss: 'You know what these controllers are for, never expose them to the internet and follow vendor guides.' },
  fa: { task: 'با مدیریت از راه دور سرورهای واقعی (iDRAC، iLO، XClarity) آشنا شو: خواندن وضعیت، ایمن کردن دسترسی و پشتیبان‌گیری از تنظیمات.', why: 'وقتی سرور دیگر روشن نمی‌شود، مدیریت از راه دور اغلب تنها راه است. مدیران از آن برای سلامت سخت‌افزار و Firmware استفاده می‌کنند.', daily: 'سروری خطای فن گزارش می‌دهد. با iLO خطا را می‌بینی، بدون رفتن به مرکز داده.', boss: 'هدف این کنترل‌کننده‌ها را می‌دانی، هرگز آن‌ها را روی اینترنت باز نمی‌کنی و طبق راهنمای سازنده کار می‌کنی.' } },
 'vendor-switches': {
  de: { task: 'Konfiguriere Zugangs- und Trunk-Ports für VLANs auf Cisco- oder Aruba-Switches und prüfe das Ergebnis.', why: 'VLANs trennen Benutzer, Server, Telefone und Gäste. Vor-Ort-Techniker patchen Ports und müssen das richtige VLAN erkennen.', daily: 'Ein neues Telefon bekommt keine Adresse, weil der Port im falschen VLAN ist.', boss: 'Du liest Portkonfigurationen, änderst nur freigegebene Testports und sicherst die Konfiguration vor und nach Änderungen.' },
  en: { task: 'Configure access and trunk ports for VLANs on Cisco or Aruba switches and check the result.', why: 'VLANs separate users, servers, phones and guests. On-site technicians patch ports and need to recognise the right VLAN.', daily: 'A new phone gets no address because the port is in the wrong VLAN.', boss: 'You read port configurations, change only approved test ports and back up the configuration before and after changes.' },
  fa: { task: 'پورت‌های Access و Trunk را برای VLANها روی Switchهای Cisco یا Aruba تنظیم کن و نتیجه را بسنج.', why: 'VLANها کاربران، سرورها، تلفن‌ها و مهمان‌ها را جدا می‌کنند. تکنسین‌های در محل پورت‌ها را Patch می‌کنند و باید VLAN درست را بشناسند.', daily: 'یک تلفن تازه نشانی نمی‌گیرد، چون پورت در VLAN اشتباه است.', boss: 'تنظیمات پورت را می‌خوانی، فقط پورت‌های آزمایشی تأییدشده را تغییر می‌دهی و پیش و پس از تغییر از تنظیمات پشتیبان می‌گیری.' } },
 'firewall-lab': {
  de: { task: 'Erlaube mit OPNsense genau einen Dienst zwischen zwei Netzen, sperre einen anderen und beweise beides mit Logs.', why: 'Firewall-Regeln entscheiden, wer was erreicht. Admins müssen Regeln lesen, eng formulieren und mit Protokollen belegen.', daily: 'Nach einer neuen Regel geht eine Anwendung nicht mehr. Das Firewall-Log zeigt, dass ihr Port gesperrt wird.', boss: 'Du schreibst Regeln so eng wie möglich, testest mit neuen Verbindungen und sperrst dich nie selbst aus.' },
  en: { task: 'With OPNsense, allow exactly one service between two networks, block another and prove both with logs.', why: 'Firewall rules decide who can reach what. Admins must read rules, write them narrowly and back them up with logs.', daily: 'After a new rule an application stops working. The firewall log shows its port is blocked.', boss: 'You write rules as narrowly as possible, test with new connections and never lock yourself out.' },
  fa: { task: 'با OPNsense دقیقاً یک سرویس را بین دو شبکه مجاز کن، سرویس دیگری را ببند و هر دو را با لاگ ثابت کن.', why: 'قوانین Firewall تعیین می‌کنند چه کسی به چه چیزی می‌رسد. مدیران باید قوانین را بخوانند، محدود بنویسند و با لاگ ثابت کنند.', daily: 'پس از یک قانون تازه، برنامه‌ای دیگر کار نمی‌کند. لاگ Firewall نشان می‌دهد پورتش بسته شده است.', boss: 'قوانین را تا جای ممکن محدود می‌نویسی، با اتصال تازه آزمایش می‌کنی و هرگز دسترسی خودت را نمی‌بندی.' } },
 'vendor-firewalls': {
  de: { task: 'Übertrage eine Zugriffsanforderung in Regeln für FortiGate und Palo Alto und halte fest, was geplant und was ausgeführt ist.', why: 'Viele Firmen nutzen diese Hersteller. Auch ohne Gerät hilft es, die Begriffe (Zone, Policy, NAT, Commit) im Gespräch sicher zu benutzen.', daily: 'Ein Dienstleister braucht Zugang zu genau einem Server. Du formulierst die Anforderung so, dass das Netzwerkteam sie ohne Rückfrage umsetzen kann.', boss: 'Du formulierst Zugriffsanforderungen präzise (Quelle, Ziel, Port, Zeitraum, Verantwortliche) und kennst die Grenzen deiner Rolle.' },
  en: { task: 'Translate an access request into FortiGate and Palo Alto rules and record what is planned and what is executed.', why: 'Many companies use these vendors. Even without a device it helps to use the terms (zone, policy, NAT, commit) confidently in an interview.', daily: 'A contractor needs access to exactly one server. You phrase the request so the network team can implement it without questions.', boss: 'You phrase access requests precisely (source, destination, port, period, owner) and know the limits of your role.' },
  fa: { task: 'یک درخواست دسترسی را به قوانین FortiGate و Palo Alto تبدیل کن و ثبت کن چه چیزی برنامه‌ریزی و چه چیزی اجرا شده است.', why: 'بسیاری از شرکت‌ها از این سازنده‌ها استفاده می‌کنند. حتی بدون دستگاه، به‌کار بردن مطمئن اصطلاحات (Zone، Policy، NAT، Commit) در مصاحبه کمک می‌کند.', daily: 'یک پیمانکار به دقیقاً یک سرور دسترسی لازم دارد. درخواست را طوری می‌نویسی که تیم شبکه بدون پرسش اجرا کند.', boss: 'درخواست دسترسی را دقیق می‌نویسی (مبدأ، مقصد، پورت، مدت، مسئول) و مرزهای نقش خودت را می‌شناسی.' } },
 'infra-handover': {
  de: { task: 'Liefere einen Plan, auf dem jemand anderes jedes Gerät, jeden Port und jede Regel findet, plus Sicherungen und einen getesteten Rückweg.', why: 'Gute Dokumentation ist das, was Firmen am häufigsten vermissen. Sie entscheidet, ob eine Störung nachts in zehn Minuten oder in drei Stunden gelöst wird.', daily: 'Ein Kollege ist im Urlaub und niemand weiß, an welchem Switchport der Drucker im Lager hängt.', boss: 'Du dokumentierst so, dass andere ohne dich arbeiten können, und hältst Pläne nach jeder Änderung aktuell.' },
  en: { task: 'Deliver a plan on which someone else can find every device, port and rule, plus backups and a tested way back.', why: 'Good documentation is what companies miss most. It decides whether a night-time incident is solved in ten minutes or three hours.', daily: 'A colleague is on holiday and nobody knows which switch port the warehouse printer is connected to.', boss: 'You document so others can work without you and keep plans current after every change.' },
  fa: { task: 'نقشه‌ای تحویل بده که دیگری بتواند هر دستگاه، هر پورت و هر قانون را در آن پیدا کند، به‌همراه پشتیبان‌ها و یک راه بازگشت آزموده.', why: 'مستندسازی خوب چیزی است که شرکت‌ها بیش از همه کم دارند. همین تعیین می‌کند اختلال شبانه در ده دقیقه حل شود یا در سه ساعت.', daily: 'همکاری در مرخصی است و کسی نمی‌داند چاپگر انبار به کدام پورت Switch وصل است.', boss: 'طوری مستند می‌کنی که دیگران بدون تو کار کنند و نقشه‌ها را پس از هر تغییر به‌روز نگه می‌داری.' } }
});
/* Deutsch im IT-Job: Telefonsätze, E-Mail-Vorlagen, Fachwortschatz */
window.LAB.workGerman = {
 phrases: [
  { id: 'greet', t: { de: 'Begrüßen und aufnehmen', en: 'Greeting and taking the call', fa: 'سلام و دریافت تماس' }, items: [
   ['IT-Support, mein Name ist … Was kann ich für Sie tun?', 'IT support, my name is … How can I help you?', 'پشتیبانی IT، من … هستم. چه کمکی از دستم برمی‌آید؟'],
   ['Darf ich kurz Ihren Namen und Ihre Durchwahl aufnehmen?', 'May I take your name and extension?', 'اجازه می‌دهید نام و شمارهٔ داخلی‌تان را یادداشت کنم؟'],
   ['Ich lege dafür ein Ticket an. Die Nummer schicke ich Ihnen per E-Mail.', 'I\'ll create a ticket for this. I\'ll email you the number.', 'برای این موضوع تیکت می‌سازم و شماره‌اش را برایتان ایمیل می‌کنم.'] ] },
  { id: 'ask', t: { de: 'Nachfragen', en: 'Asking questions', fa: 'پرسیدن' }, items: [
   ['Seit wann tritt das Problem auf?', 'Since when has the problem occurred?', 'این مشکل از کی پیش آمده؟'],
   ['Betrifft das nur Sie oder auch Kolleginnen und Kollegen?', 'Does it affect only you or colleagues as well?', 'فقط برای شماست یا همکاران هم گرفتارند؟'],
   ['Können Sie mir die Fehlermeldung bitte wörtlich vorlesen?', 'Could you read the error message to me word for word?', 'می‌شود متن پیام خطا را کلمه‌به‌کلمه برایم بخوانید؟'],
   ['Hat sich vorher etwas geändert, zum Beispiel ein Update oder ein neues Gerät?', 'Did anything change before, for example an update or a new device?', 'قبل از آن چیزی تغییر کرده؟ مثلاً به‌روزرسانی یا دستگاه تازه؟'],
   ['Was haben Sie schon ausprobiert?', 'What have you already tried?', 'تا الان چه کارهایی امتحان کرده‌اید؟'] ] },
  { id: 'remote', t: { de: 'Fernwartung', en: 'Remote support', fa: 'پشتیبانی از راه دور' }, items: [
   ['Darf ich mich mit Ihrer Zustimmung kurz auf Ihren Bildschirm schalten?', 'May I connect to your screen briefly with your permission?', 'با اجازه‌تان می‌توانم کوتاه به صفحهٔ شما وصل شوم؟'],
   ['Bitte schließen Sie vorher vertrauliche Dokumente.', 'Please close confidential documents first.', 'لطفاً اول اسناد محرمانه را ببندید.'],
   ['Ich beende jetzt die Verbindung. Sie sehen es unten rechts.', 'I\'m ending the connection now. You can see it at the bottom right.', 'الان اتصال را قطع می‌کنم؛ پایین سمت راست می‌بینید.'] ] },
  { id: 'explain', t: { de: 'Erklären und vertrösten', en: 'Explaining and asking for patience', fa: 'توضیح دادن و درخواست صبر' }, items: [
   ['Ich schaue mir das jetzt an. Das dauert etwa zehn Minuten.', 'I\'ll look into it now. It will take about ten minutes.', 'الان بررسی می‌کنم؛ حدود ده دقیقه طول می‌کشد.'],
   ['Ich verstehe, dass das gerade sehr stört.', 'I understand that this is very disruptive right now.', 'می‌فهمم که الان خیلی کارتان را مختل کرده.'],
   ['Die Ursache war …, ich habe … geändert.', 'The cause was …, I changed …', 'علت … بود و من … را تغییر دادم.'],
   ['Bis zur Lösung können Sie übergangsweise … nutzen.', 'Until it\'s fixed you can use … as a workaround.', 'تا حل شدن مشکل، موقتاً می‌توانید از … استفاده کنید.'] ] },
  { id: 'escalate', t: { de: 'Weitergeben und Rückruf', en: 'Handing over and call-back', fa: 'ارجاع و تماس دوباره' }, items: [
   ['Ich gebe das an die Kollegen vom Netzwerkteam weiter.', 'I\'m passing this on to my colleagues in the network team.', 'این را به همکاران تیم شبکه می‌سپارم.'],
   ['Ich melde mich bis spätestens 14 Uhr bei Ihnen, auch wenn es noch keine Lösung gibt.', 'I\'ll get back to you by 2 pm at the latest, even if there is no solution yet.', 'حداکثر تا ساعت ۱۴ با شما تماس می‌گیرم، حتی اگر هنوز راه‌حلی نباشد.'],
   ['Das liegt außerhalb meiner Berechtigung. Ich kläre das mit der Teamleitung.', 'That is beyond my permissions. I\'ll clarify it with the team lead.', 'این خارج از اختیار من است؛ با سرپرست تیم هماهنگ می‌کنم.'] ] },
  { id: 'close', t: { de: 'Abschließen', en: 'Closing', fa: 'جمع کردن تماس' }, items: [
   ['Funktioniert es jetzt bei Ihnen?', 'Is it working for you now?', 'الان برایتان کار می‌کند؟'],
   ['Dann schließe ich das Ticket. Wenn es wieder auftritt, antworten Sie einfach auf die E-Mail.', 'Then I\'ll close the ticket. If it happens again, just reply to the email.', 'پس تیکت را می‌بندم. اگر دوباره پیش آمد، کافی است به همان ایمیل پاسخ دهید.'],
   ['Gern geschehen, einen schönen Tag noch.', 'You\'re welcome, have a nice day.', 'خواهش می‌کنم، روز خوبی داشته باشید.'] ] }
 ],
 mails: [
  { t: { de: 'Status-Update an einen Benutzer', en: 'Status update to a user', fa: 'گزارش وضعیت به کاربر' }, de: 'Betreff: Ihr Ticket #4711 – Outlook startet nicht\n\nGuten Tag Frau Weber,\n\nwir haben die Ursache gefunden: Ein Zusatzprogramm hat den Start von Outlook blockiert. Ich habe es deaktiviert, Outlook startet wieder normal.\n\nBitte prüfen Sie, ob alles wie gewohnt funktioniert. Wenn ich nichts von Ihnen höre, schließe ich das Ticket morgen.\n\nViele Grüße\n… | IT-Support | Durchwahl 999' },
  { t: { de: 'Störungsmeldung an viele Benutzer', en: 'Outage notice to many users', fa: 'اطلاعیهٔ اختلال برای کاربران زیاد' }, de: 'Betreff: Störung Warenwirtschaft – Stand 08:20\n\nSeit 08:05 ist das Warenwirtschaftssystem an allen Standorten nicht erreichbar. Wir arbeiten mit hoher Priorität an der Lösung.\n\nNicht betroffen: E-Mail, Telefon, Internet.\nNächste Information: spätestens 08:45.\n\nIhr IT-Support' },
  { t: { de: 'Weitergabe an den 2nd Level', en: 'Hand-over to 2nd level', fa: 'ارجاع به سطح ۲' }, de: 'Ticket #4820 an 2nd Level Netzwerk\n\nSymptom: Zweigstelle erreicht SRV01 nicht per SMB (TCP 445), DNS funktioniert.\nBetroffen: alle 6 Arbeitsplätze in der Zweigstelle seit 09:10.\nGeprüft: nslookup srv01 ok, ping Gateway ok, Test-NetConnection 445 fehlgeschlagen, Firewall-Log nicht zugänglich.\nVermutung: Regel oder Route seit Change #311 von gestern.\nBenutzer informiert, Umgehung: Dateien per Teams.' }
 ],
 vocab: [
  ['das Kennwort zurücksetzen', 'reset the password', 'ریست کردن گذرواژه'],
  ['das Konto entsperren', 'unlock the account', 'باز کردن قفل حساب'],
  ['das Konto ist gesperrt', 'the account is locked', 'حساب قفل شده است'],
  ['die Berechtigung', 'the permission', 'دسترسی، مجوز'],
  ['die Freigabe', 'the share / the approval', 'اشتراک‌گذاری / تأیید'],
  ['das Netzlaufwerk', 'the network drive', 'درایو شبکه'],
  ['die Anmeldung', 'the sign-in', 'ورود به سیستم'],
  ['sich abmelden', 'to sign out', 'خارج شدن از حساب'],
  ['die Störung', 'the incident / the fault', 'اختلال'],
  ['die Anfrage', 'the request', 'درخواست'],
  ['die Priorität', 'the priority', 'اولویت'],
  ['die Auswirkung', 'the impact', 'اثر'],
  ['die Dringlichkeit', 'the urgency', 'فوریت'],
  ['eskalieren / weitergeben', 'to escalate / to pass on', 'ارجاع دادن'],
  ['die Umgehungslösung (Workaround)', 'the workaround', 'راه‌حل موقت'],
  ['die Ursache', 'the cause', 'علت'],
  ['beheben', 'to fix', 'برطرف کردن'],
  ['überprüfen', 'to check / verify', 'بررسی کردن'],
  ['der Arbeitsplatz', 'the workstation / desk', 'میز کار'],
  ['die Dockingstation', 'the docking station', 'داک'],
  ['der Bildschirm', 'the monitor / screen', 'مانیتور، صفحه'],
  ['das Netzteil', 'the power supply', 'آداپتور برق'],
  ['die Druckwarteschlange', 'the print queue', 'صف چاپ'],
  ['der Papierstau', 'the paper jam', 'گیر کردن کاغذ'],
  ['der Treiber', 'the driver', 'درایور'],
  ['die Fernwartung', 'remote support', 'پشتیبانی از راه دور'],
  ['das Postfach', 'the mailbox', 'صندوق پستی (Mailbox)'],
  ['das freigegebene Postfach', 'the shared mailbox', 'Mailbox مشترک'],
  ['der Anhang', 'the attachment', 'پیوست'],
  ['die Abwesenheitsnotiz', 'the out-of-office reply', 'پاسخ خودکار غیبت'],
  ['der Verteiler', 'the distribution list', 'فهرست توزیع'],
  ['die Lizenz', 'the licence', 'لایسنس'],
  ['die Gruppenrichtlinie', 'the group policy', 'Group Policy'],
  ['das Update einspielen', 'to install the update', 'نصب به‌روزرسانی'],
  ['der Neustart', 'the restart', 'راه‌اندازی دوباره'],
  ['die Datensicherung (das Backup)', 'the backup', 'پشتیبان‌گیری'],
  ['wiederherstellen', 'to restore', 'بازیابی کردن'],
  ['der Datenschutz', 'data protection', 'حفاظت داده'],
  ['der Sicherheitsvorfall', 'the security incident', 'رخداد امنیتی'],
  ['verdächtig', 'suspicious', 'مشکوک'],
  ['der Austritt / das Offboarding', 'the leaver / offboarding', 'خروج کارمند'],
  ['der Eintritt / das Onboarding', 'the new joiner / onboarding', 'ورود کارمند تازه'],
  ['die Rufbereitschaft', 'on-call duty', 'آماده‌به‌کار بودن (کشیک)'],
  ['das Wartungsfenster', 'the maintenance window', 'پنجرهٔ نگهداری'],
  ['der Rückfallplan', 'the rollback plan', 'طرح بازگشت'],
  ['die Dokumentation', 'the documentation', 'مستندسازی'],
  ['der Ansprechpartner', 'the contact person', 'فرد رابط'],
  ['die Durchwahl', 'the direct extension', 'شمارهٔ داخلی']
 ]
};
window.LAB.workJobs = window.LAB.workJobs || {};
window.LAB.workJobs.topics = (window.LAB.workJobs.topics || []).concat([
 { id: 'tools',
  de: { t: 'Werkzeuge, die im Job vorausgesetzt werden', html: `
<table><thead><tr><th>Werkzeug</th><th>Wofür</th><th>So übst du</th></tr></thead><tbody>
<tr><td>Ticketsystem (ServiceNow, Jira Service Management, Znuny, TOPdesk)</td><td>Anfragen erfassen, priorisieren, SLA, Wissensdatenbank</td><td>Znuny ist frei und läuft auf Linux. Oder übe Ticketnotizen im Schicht-Training dieser App.</td></tr>
<tr><td>Fernwartung (Windows Schnellhilfe, TeamViewer, AnyDesk)</td><td>Bildschirm des Benutzers mit Zustimmung sehen und steuern</td><td>Schnellhilfe ist in Windows enthalten. Übe zwischen zwei eigenen PCs oder VMs.</td></tr>
<tr><td>RMM (z. B. NinjaOne, Datto)</td><td>Viele Geräte überwachen, Updates und Skripte zentral verteilen, typisch in Systemhäusern</td><td>Hersteller bieten oft Testzugänge. Verstehe vor allem das Prinzip: Agent, Richtlinie, Alarm.</td></tr>
<tr><td>Intune, Autopilot, Unternehmensportal</td><td>Geräte und Apps in Microsoft 365 verwalten</td><td>Siehe Kapitel Microsoft 365 und Test-Tenant.</td></tr>
<tr><td>Inventar und Asset-Management</td><td>Wer hat welches Gerät, Garantie, Seriennummer</td><td>Pflege eine Tabelle für deine Lab- und Heimgeräte.</td></tr>
</tbody></table>
<p><b>IMAC/D</b> ist ein häufiger Begriff bei Vor-Ort-Dienstleistern: <b>I</b>nstall (installieren), <b>M</b>ove (umziehen), <b>A</b>dd (ergänzen), <b>C</b>hange (ändern), <b>D</b>ispose (sicher entsorgen). <b>Break &amp; Fix</b> heißt: defektes Gerät vor Ort reparieren oder tauschen.</p>` },
  en: { t: 'Tools you are expected to know', html: `
<table><thead><tr><th>Tool</th><th>Used for</th><th>How to practise</th></tr></thead><tbody>
<tr><td>Ticket system (ServiceNow, Jira Service Management, Znuny, TOPdesk)</td><td>Record and prioritise requests, SLA, knowledge base</td><td>Znuny is free and runs on Linux. Or practise ticket notes in this app\'s shift training.</td></tr>
<tr><td>Remote support (Windows Quick Assist, TeamViewer, AnyDesk)</td><td>See and control the user\'s screen with consent</td><td>Quick Assist is built into Windows. Practise between two of your own PCs or VMs.</td></tr>
<tr><td>RMM (e.g. NinjaOne, Datto)</td><td>Monitor many devices, push updates and scripts centrally; typical at managed service providers</td><td>Vendors often offer trials. Mainly understand the principle: agent, policy, alert.</td></tr>
<tr><td>Intune, Autopilot, Company Portal</td><td>Manage devices and apps in Microsoft 365</td><td>See the Microsoft 365 chapter and test tenant.</td></tr>
<tr><td>Inventory and asset management</td><td>Who has which device, warranty, serial number</td><td>Keep a spreadsheet for your lab and home devices.</td></tr>
</tbody></table>
<p><b>IMAC/D</b> is a common term at on-site service providers: <b>I</b>nstall, <b>M</b>ove, <b>A</b>dd, <b>C</b>hange, <b>D</b>ispose (securely). <b>Break &amp; fix</b> means repairing or replacing a faulty device on site.</p>` },
  fa: { t: 'ابزارهایی که در کار انتظار می‌رود بشناسی', html: `
<table><thead><tr><th>ابزار</th><th>کاربرد</th><th>چطور تمرین کنی</th></tr></thead><tbody>
<tr><td>سامانهٔ تیکت (ServiceNow، Jira Service Management، Znuny، TOPdesk)</td><td>ثبت و اولویت‌بندی درخواست‌ها، SLA و پایگاه دانش</td><td>Znuny رایگان است و روی Linux اجرا می‌شود. یا نوشتن یادداشت تیکت را در «تمرین شیفت» همین برنامه تمرین کن.</td></tr>
<tr><td>پشتیبانی از راه دور (Quick Assist ویندوز، TeamViewer، AnyDesk)</td><td>دیدن و کنترل صفحهٔ کاربر با رضایت او</td><td>Quick Assist در Windows هست. بین دو رایانه یا دو VM خودت تمرین کن.</td></tr>
<tr><td>RMM (مثلاً NinjaOne یا Datto)</td><td>پایش دستگاه‌های زیاد و توزیع مرکزی به‌روزرسانی و اسکریپت؛ رایج در شرکت‌های خدمات IT (Systemhaus)</td><td>سازنده‌ها اغلب نسخهٔ آزمایشی دارند. مهم این است که اصل کار را بفهمی: Agent، Policy و هشدار.</td></tr>
<tr><td>Intune، Autopilot و Company Portal</td><td>مدیریت دستگاه‌ها و برنامه‌ها در Microsoft 365</td><td>فصل Microsoft 365 و Tenant آزمایشی را ببین.</td></tr>
<tr><td>موجودی و مدیریت دارایی‌ها</td><td>چه کسی کدام دستگاه را دارد، گارانتی و شمارهٔ سریال</td><td>برای دستگاه‌های آزمایشگاه و خانه‌ات یک جدول نگه دار.</td></tr>
</tbody></table>
<p><b>IMAC/D</b> اصطلاح رایج نزد شرکت‌های خدمات در محل است: <b>I</b>nstall (نصب)، <b>M</b>ove (جابه‌جایی)، <b>A</b>dd (افزودن)، <b>C</b>hange (تغییر) و <b>D</b>ispose (امحای امن). <b>Break &amp; Fix</b> یعنی تعمیر یا تعویض دستگاه خراب در محل.</p>` } },
 { id: 'ai',
  de: { t: 'KI im IT-Support sicher nutzen', html: `
<p>Viele IT-Teams setzen KI-Werkzeuge bereits ein oder planen es. Firmen erwarten, dass du sie sinnvoll und sicher nutzt.</p>
<ul><li><b>Gut geeignet:</b> Fehlermeldungen erklären lassen, Prüfschritte sammeln, Skripte erklären, Ticketnotizen und Benutzer-E-Mails sprachlich verbessern.</li><li><b>Niemals eingeben:</b> Kennwörter, Schlüssel, Namen und Daten von Kunden oder Kollegen, interne IP-Pläne oder Konfigurationen, außer das Werkzeug ist von der Firma freigegeben.</li><li><b>Immer prüfen:</b> KI kann falsche Befehle vorschlagen. Teste Befehle zuerst im Lab oder mit -WhatIf, nie direkt auf Produktivsystemen.</li><li><b>Firmenregeln beachten:</b> Nutze nur freigegebene Werkzeuge, zum Beispiel einen Firmen-Copilot.</li></ul>
<p>Der KI-Tutor dieser App zeigt dir vor jedem Senden den vollständigen Text. Übe dort, Fragen ohne vertrauliche Daten zu stellen.</p>` },
  en: { t: 'Using AI safely in IT support', html: `
<p>Many IT teams already use AI tools or plan to. Companies expect you to use them sensibly and safely.</p>
<ul><li><b>Well suited:</b> explaining error messages, collecting troubleshooting steps, explaining scripts, improving the wording of ticket notes and user emails.</li><li><b>Never enter:</b> passwords, keys, names and data of customers or colleagues, internal IP plans or configurations, unless the tool is approved by the company.</li><li><b>Always verify:</b> AI can suggest wrong commands. Test commands in the lab or with -WhatIf first, never directly on production systems.</li><li><b>Follow company rules:</b> use only approved tools, for example a company Copilot.</li></ul>
<p>This app\'s AI tutor shows you the full text before anything is sent. Practise asking questions without confidential data there.</p>` },
  fa: { t: 'استفادهٔ امن از KI در پشتیبانی IT', html: `
<p>بسیاری از تیم‌های IT همین حالا از ابزارهای KI استفاده می‌کنند یا قصدش را دارند. شرکت‌ها انتظار دارند آن‌ها را درست و امن به کار ببری.</p>
<ul><li><b>مناسب برای:</b> توضیح پیام‌های خطا، جمع کردن قدم‌های عیب‌یابی، توضیح اسکریپت‌ها و بهتر کردن متن یادداشت تیکت و ایمیل به کاربر.</li><li><b>هرگز وارد نکن:</b> گذرواژه، کلید، نام و دادهٔ مشتریان یا همکاران، نقشهٔ IP یا تنظیمات داخلی؛ مگر ابزار را شرکت تأیید کرده باشد.</li><li><b>همیشه بسنج:</b> KI ممکن است فرمان اشتباه پیشنهاد دهد. فرمان‌ها را اول در آزمایشگاه یا با -WhatIf آزمایش کن، هرگز مستقیم روی سیستم واقعی.</li><li><b>قوانین شرکت را رعایت کن:</b> فقط ابزارهای تأییدشده، مثلاً Copilot شرکت.</li></ul>
<p>مربی KI همین برنامه پیش از هر ارسال متن کامل را نشانت می‌دهد. آنجا تمرین کن که پرسش را بدون دادهٔ محرمانه بنویسی.</p>` } }
]);
