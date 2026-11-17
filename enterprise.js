/* Enterprise exercises extend the original IDs so existing browser progress survives. */
(() => {
const L=window.LAB;
Object.assign(L.sources,{
 replication:{name:'مایکروسافت · عیب‌یابی Replication',url:'https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/diagnose-replication-failures'},
 delegation:{name:'مایکروسافت · تفویض اختیار در AD',url:'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/delegation-control-wizard'},
 backup:{name:'مایکروسافت · wbadmin start backup',url:'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin-start-backup'},
 restore:{name:'مایکروسافت · بازیابی فایل',url:'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin-start-recovery'},
 forest:{name:'مایکروسافت · راهنمای بازیابی جنگل AD',url:'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-backing-up-a-full-server'},
 remoting:{name:'مایکروسافت · امنیت PowerShell Remoting',url:'https://learn.microsoft.com/en-us/powershell/scripting/security/remoting/winrm-security'},
 events:{name:'مایکروسافت · Get-WinEvent',url:'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent'},
 patch:{name:'مایکروسافت · راهنمای نصب بسته‌های به‌روزرسانی',url:'https://support.microsoft.com/en-us/servicing/os/windows/2024/09/operation-is-not-supported-error-installing-a-post-checkpoint-update-by-double-clicking-the-msu-pack'},
 office:{name:'مایکروسافت · استقرار Microsoft 365 Apps',url:'https://learn.microsoft.com/en-us/DeployOffice/deployment-guide-microsoft-365-apps'},
 print:{name:'مایکروسافت · عیب‌یابی چاپ',url:'https://learn.microsoft.com/en-us/troubleshoot/windows-server/printing/troubleshoot-printing-and-best-practices'},
 drivers:{name:'مایکروسافت · درایورهای چاپگر',url:'https://support.microsoft.com/en-us/windows/hardware/printer/download-and-install-the-latest-printer-drivers'},
 routing:{name:'مایکروسافت · Remote Access و LAN Routing',url:'https://learn.microsoft.com/en-us/windows-server/remote/remote-access/remote-access'},
 cmd:{name:'مایکروسافت · مرجع فرمان‌های Windows',url:'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands'},
 ubuntu:{name:'اوبونتو · راهنماهای Ubuntu Server',url:'https://ubuntu.com/server/docs/how-to/'},
 ssh:{name:'اوبونتو · OpenSSH',url:'https://ubuntu.com/server/docs/how-to/security/openssh/'},
 ufw:{name:'اوبونتو · فایروال UFW',url:'https://ubuntu.com/server/docs/how-to/security/firewalls/'},
 nginx:{name:'اوبونتو · نصب Nginx',url:'https://ubuntu.com/server/docs/how-to/web-services/install-nginx/'},
 amazonjob:{name:'Amazon · نمونهٔ نقش Windows Systems Engineer',url:'https://amazon.jobs/en/jobs/10524536/windows-systems-engineer-region-services-corporate-infrastructure-vector-team'},
 telekomjob:{name:'T-Systems · نمونهٔ شرح وظایف Windows Administrator',url:'https://telekom.jobs/telekom_pdf/94833_EN.pdf'},
 raiffeisenjob:{name:'Raiffeisen Informatik · Windows AD Administrator',url:'https://raiffeiseninformatik.sk/en/windows-ad-administrator-s-powershall/'}
});
L.modules.push(
{id:'automation',title:'PowerShell و ساخت گروهی حساب‌ها',short:'CSV، پیش‌نمایش، کنترل ورودی و اجرای تکرارپذیر',phase:'۰۴ · عملیات سازمانی',minutes:90,where:'DC01 · مدیر دامنه، فقط اشیای Lab',goal:'دو حساب آزمایشی را از CSV بدون گذرواژهٔ ذخیره‌شده می‌سازی و تکرار اجرا حساب تکراری ایجاد نمی‌کند.',sources:['user','member','cmd'],tasks:[
'فایل CSV دو ردیف معتبر و نام کاربری غیرتکراری دارد و هیچ گذرواژه‌ای در آن نیست.',
'اجرای -WhatIf فقط پیش‌نمایش داده و هیچ حسابی ایجاد نکرده است.',
'اجرای واقعی فقط دو حساب هدف را در Lab/Benutzer ساخته و کاربران ملزم به تغییر گذرواژه‌اند.',
'اجرای دوم حساب جدید نساخته است؛ فهرست نتیجه و روش غیرفعال‌کردن حساب‌های همین تمرین ثبت شده است.'
],steps:[
{title:'آماده‌سازی دادهٔ آزمایشی',html:'<p>روی DC01 پوشهٔ <code>C:\\LabOps</code> را بساز. در Notepad متن زیر را با نام <code>C:\\LabOps\\users.csv</code> و UTF-8 ذخیره کن. نام ستون‌ها دقیقاً مطابق نمونه باشد. ابتدا <code>Import-Csv C:\\LabOps\\users.csv | Format-Table</code> را اجرا کن و مطمئن شو دو ردیف و سه ستون دیده می‌شوند.</p>',code:'Sam,GivenName,Surname\nlab.user01,Lab,One\nlab.user02,Lab,Two',label:'محتوای CSV · این متن فرمان PowerShell نیست',expect:'دو ردیف داده؛ هیچ ستونی برای گذرواژه وجود ندارد.'},
{title:'اجرای آزمایشی و کنترل ورودی',html:'<p>بلوک زیر را در Windows PowerShell روی DC01 اجرا کن. ورودی نام کاربری محدود شده است؛ حساب موجود رد می‌شود. گذرواژهٔ موقت هر کاربر را جداگانه و امن وارد کن. وجود <code>-WhatIf</code> در فرمانِ تغییر، جلوی ساخت را می‌گیرد؛ WhatIf تضمینی برای هر اسکریپت دلخواه نیست.</p>',code:String.raw`Import-Csv C:\LabOps\users.csv | ForEach-Object {
  $sam = $_.Sam
  if ($sam -notmatch '^lab\.user0[12]$') { throw "Unexpected test account" }
  if (Get-ADUser -Filter "SamAccountName -eq '$sam'") {
    Write-Warning "Already exists: $sam"
    return
  }
  $pw = Read-Host "Temporary password for $sam" -AsSecureString
  New-ADUser -Name "$($_.GivenName) $($_.Surname)" -SamAccountName $sam -UserPrincipalName "$sam@corp.example.test" -Path "OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true -WhatIf
}`,expect:'پیام What if دیده می‌شود؛ Get-ADUser برای این دو حساب هنوز نتیجه‌ای ندارد.'},
{title:'اجرا و اثبات تکرارپذیری',html:'<p>فقط پس از بررسی پیش‌نمایش، همان بلوک را با حذف <code>-WhatIf</code> از New-ADUser اجرا کن. سپس بار دوم همان بلوک واقعی را اجرا کن؛ باید پیام Already exists بگیری. نتیجه را با فرمان زیر در فایل ثبت کن. گزارش، گذرواژه یا اعتبارنامه ندارد.</p>',code:String.raw`Get-ADUser -Filter 'SamAccountName -like "lab.user0*"' -SearchBase "OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test" | Select-Object SamAccountName,Enabled,DistinguishedName | Export-Csv C:\LabOps\created-users.csv -NoTypeInformation -Encoding UTF8`,expect:'فقط lab.user01 و lab.user02 در OU هدف وجود دارند. شمار حساب‌ها در اجرای دوم تغییر نمی‌کند.'},
{title:'برنامهٔ بازگشت و تحویل',html:'<p>در گزارش تغییر، نام دو حساب، زمان اجرا، نتیجهٔ پیش‌نمایش و نتیجهٔ اجرای دوم را بنویس. برای بازگشت، فقط همین حساب‌های آزمایشی را غیرفعال کن؛ از فیلتر گسترده برای تغییر همهٔ کاربران استفاده نکن. نسخهٔ اسکریپت و CSV بدون راز را نگهدار؛ در شرکت نسخه‌بندی و بازبینی همکار را اضافه کن.</p>',code:'Disable-ADAccount -Identity lab.user01 -WhatIf\nDisable-ADAccount -Identity lab.user02 -WhatIf',expect:'پیش‌نمایش بازگشت فقط همین دو حساب را هدف می‌گیرد. در صورت نیاز به بازگشت واقعی، پس از تأیید نام‌ها WhatIf را حذف کن.'}
],quiz:[
{q:'هدف مهمِ اجرای دوم چیست؟',options:['ساخت دوبارهٔ همهٔ حساب‌ها','اثبات اینکه حساب تکراری ساخته نمی‌شود','تغییر خودکار گذرواژهٔ همه'],answer:1,explain:'یک فرایند قابل تکرار باید وضعیت موجود را تشخیص بدهد و اشیای تکراری نسازد.'},
{q:'گذرواژهٔ اولیه را کجا نگه می‌داری؟',options:['در CSV کنار نام کاربر','داخل یادداشت سایت','در ورودی امن یا فرایند مدیریت راز؛ نه CSV'],answer:2,explain:'CSV و گزارش برای اطلاعات غیرمحرمانه‌اند. AsSecureString مانع نمایش مستقیم ورودی می‌شود.'}
]},
{id:'redundancy',title:'DC دوم و آزمون قطع سرویس',short:'Replication، DNS دوم و تداوم ورود',phase:'۰۴ · عملیات سازمانی',minutes:120,where:'DC02، DC01، SRV01 و CL01',goal:'یک DC دوم می‌سازی، تکثیر AD را اثبات می‌کنی و در خاموشی موقت DC01 سرویس‌های دامنه را می‌سنجی.',sources:['ad','replication','dhcp'],tasks:[
'DC02 با رم ۶ گیگابایت، ۲ vCPU، دیسک ۸۰ گیگابایت و IP ثابت 10.20.0.11/24 به‌عنوان DC و DNS دوم نصب شده است.',
'repadmin /replsummary در وضعیت عادی خطای حل‌نشده ندارد و شیء آزمایشی روی هر دو DC دیده می‌شود.',
'DNSهای ثابت اعضا و گزینهٔ 006 در DHCP شامل 10.20.0.10 و 10.20.0.11 هستند و CL01 Lease تازه گرفته است.',
'هنگام خاموشی موقت DC01، حل نام از DC02 و Secure Channel کلاینت برقرار است؛ پس از روشن شدن DC01 تکثیر دوباره سالم است.'
],steps:[
{title:'آماده‌سازی DC02',html:'<p>یک VM جدید را مانند بخش نصب، جداگانه بساز: نام DC02، رم ۶ گیگابایت، ۲ vCPU و دیسک ۸۰ گیگابایت. قبل از اتصال به LAB-CORP، با NAT به‌روزرسانی و فعال‌سازی کن. سپس فقط یک کارت در LAB-CORP، IP ثابت <code>10.20.0.11/24</code>، DNS اولیه <code>10.20.0.10</code> و بدون Gateway داشته باشد. DC01 باید روشن و سالم باشد.</p>'},
{title:'افزودن به دامنهٔ موجود',html:'<p>روی DC02 به‌عنوان مدیر محلی، نقش را نصب کن و آن را به <b>دامنهٔ موجود</b> اضافه کن؛ Forest جدید نساز. اعتبارنامهٔ CORP\\Administrator و یک گذرواژهٔ مستقل DSRM را در درخواست امن وارد کن. پس از Restart، DNS مربوط به کارت DC02 را به .10 و .11 و کارت DC01 را به .11 و .10 تنظیم کن.</p>',code:'Install-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSDomainController -DomainName "corp.example.test" -Credential (Get-Credential) -InstallDns',expect:'Get-ADDomainController -Filter * هر دو DC را نشان می‌دهد؛ هر دو DNS و NTDS در حالت Running هستند.'},
{title:'اثبات تکثیر و توزیع DNS دوم',html:'<p>روی DC01 یک کاربر غیرفعال آزمایشی با نام زیر بساز و آن را مستقیماً از DC02 بخوان. اگر تکثیر زمان برد، علت را با repadmin بررسی کن. روی SRV01 گزینهٔ DHCP را به دو DNS تغییر بده؛ DNS ثابت SRV01 نیز هر دو نشانی را داشته باشد. CL01 دریافت خودکار DNS دارد و با renew تازه می‌شود.</p>',code:String.raw`# DC01
New-ADUser -Name "Replication Probe" -SamAccountName "replication.probe" -Path "OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test"
Get-ADUser replication.probe -Server DC02
repadmin /replsummary
# SRV01
Set-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -DnsServer 10.20.0.10,10.20.0.11
# CL01
ipconfig /renew
ipconfig /all`,expect:'کاربر روی DC02 هم دیده می‌شود، خطای تکثیر حل‌نشده نداریم و CL01 هر دو DNS را می‌بیند.'},
{title:'آزمون خرابی و بازگشت',html:'<p>ابتدا سلامت هر دو DC را ثبت کن. فقط DC01 را از داخل Windows به‌آرامی خاموش کن و DC02 و SRV01 را روشن نگه دار. فرمان‌های زیر روی CL01 اجرا می‌شوند. سپس ورود آنلاین با حساب آزمایشی مجاز را امتحان کن. DC01 را روشن کن و دوباره repadmin را بررسی کن. FSMO را در این خرابی موقت Seize نکن.</p>',code:'Resolve-DnsName dc02.corp.example.test -Server 10.20.0.11\nTest-ComputerSecureChannel -Server DC02\nnltest /dsgetdc:corp.example.test /force',expect:'پرس‌وجو از .11 موفق و Secure Channel برابر True است. دو DC روی یک میزبان، خرابی همان میزبان را پوشش نمی‌دهند و جای Backup نیستند.'}
],quiz:[
{q:'دو DC روی یک رایانه در برابر کدام خرابی حفاظت کامل ایجاد نمی‌کنند؟',options:['خاموش شدن یک VM','خرابی کل میزبان فیزیکی','توقف موقت یکی از DNSها'],answer:1,explain:'هر دو DC به همان میزبان وابسته‌اند؛ افزونگی سرویس با استقلال سخت‌افزاری فرق دارد.'},
{q:'برای خاموشی کوتاه و برنامه‌ریزی‌شدهٔ DC01 چه می‌کنی؟',options:['فوراً FSMO را Seize می‌کنم','Forest تازه می‌سازم','سلامت DC02 و دسترسی را می‌سنجم و سپس DC01 را برمی‌گردانم'],answer:2,explain:'Seize برای سناریوی بازیابی مشخص است و اقدام عادی در خاموشی موقت نیست.'}
]},
{id:'delegation',title:'تفویض اختیار به Helpdesk',short:'حداقل دسترسی و آزمون مجاز و غیرمجاز',phase:'۰۴ · عملیات سازمانی',minutes:75,where:'DC01 برای تنظیم · CL01 برای آزمون',goal:'پشتیبان فقط می‌تواند گذرواژهٔ کاربران OU مشخص را بازنشانی کند؛ عضو گروه مدیران دامنه نیست.',sources:['delegation','groups','user'],tasks:[
'helpdesk.lab حساب عادی و عضو GG_Helpdesk است و در Domain Admins یا گروه مدیران محلی قرار ندارد.',
'روی OU با نام Lab/Benutzer فقط Reset password و الزام تغییر در ورود بعد به GG_Helpdesk تفویض شده است.',
'با هویت helpdesk.lab روی CL01، بازنشانی گذرواژهٔ tom.klein موفق است و Tom در ورود بعد آن را تغییر می‌دهد.',
'تغییر Description همان کاربر با حساب Helpdesk رد می‌شود؛ هویت اجرا و هر دو نتیجه ثبت شده‌اند.'
],steps:[
{title:'ایجاد هویت و گروه پشتیبانی',html:'<p>روی DC01 در AD Users and Computers یک حساب عادی <code>helpdesk.lab</code> در Lab/Benutzer بساز. با الگوی بخش کاربران، یک گروه Security/Global با نام <code>GG_Helpdesk</code> در Lab/Gruppen ایجاد کن و حساب را عضو آن کن. عضو Domain Admins نکن. برای آزمون، RSAT AD Tools باید از مرحلهٔ آماده‌سازی روی CL01 نصب شده باشد.</p>'},
{title:'تفویض روی کوچک‌ترین محدوده',html:'<p>در <code>dsa.msc</code> روی OU با نام <b>Lab/Benutzer</b> راست‌کلیک و Delegate Control را انتخاب کن. GG_Helpdesk را اضافه کن و فقط <b>Reset user passwords and force password change at next logon</b> را انتخاب کن. اختیار ساخت کاربر، ویرایش همهٔ ویژگی‌ها یا تغییر گروه‌ها را اضافه نکن. نام گروه، OU و مجوز را ثبت کن.</p>'},
{title:'آزمون مثبت با هویت واقعی پشتیبان',html:'<p>روی CL01 از حساب مدیر خارج شو و با <code>CORP\\helpdesk.lab</code> وارد شو. PowerShell عادی باز کن؛ Run as administrator با حساب دیگری استفاده نکن. ابتدا whoami را بررسی کن و سپس گذرواژهٔ آزمایشی Tom را بازنشانی کن.</p>',code:'whoami\nImport-Module ActiveDirectory\n$pw = Read-Host "New temporary password for Tom" -AsSecureString\nSet-ADAccountPassword tom.klein -Reset -NewPassword $pw\nSet-ADUser tom.klein -ChangePasswordAtLogon $true',expect:'هویت اجرا CORP\\helpdesk.lab است، دو عملیات مجاز موفق‌اند و Tom در ورود بعد گذرواژه را تغییر می‌دهد.'},
{title:'آزمون منفی و تحویل محدودهٔ دسترسی',html:'<p>در همان نشست Helpdesk، تلاش برای تغییر Description باید خطای insufficient access بدهد. این آزمون را با حساب مدیر انجام نده. در گزارش توضیح بده چرا Reset password مجوز عمومی ویرایش کاربر نیست. برای بازگشت، مدیر فقط مجوزهای افزوده‌شده به GG_Helpdesk روی همین OU را در Advanced Security حذف می‌کند؛ همهٔ ACL را Reset نکن.</p>',code:'whoami\nSet-ADUser tom.klein -Description "Delegation negative test"',expect:'دسترسی رد می‌شود. اگر موفق شد، تفویض بیش از حد یا عضویت گروهی اضافی را بررسی کن و با مدیر همان تغییر آزمایشی را برگردان.'}
],quiz:[
{q:'برای تیم Helpdesk چه محدوده‌ای مناسب‌تر است؟',options:['Domain Admin برای همه','فقط مجوز لازم روی OU هدف','ویرایش همهٔ اشیای جنگل'],answer:1,explain:'حداقل دسترسی به معنی مجوز لازم برای کار مشخص، در کوچک‌ترین محدوده است.'},
{q:'چرا آزمون منفی مهم است؟',options:['مشخص می‌کند کارهای خارج از نقش واقعاً رد می‌شوند','فقط سرعت سیستم را می‌سنجد','جای آزمون موفق را می‌گیرد'],answer:0,explain:'موفقیت یک کار مجاز ثابت نمی‌کند که دسترسی‌های اضافی بسته‌اند؛ هر دو سمت را بررسی کن.'}
]},
{id:'recovery',title:'پشتیبان‌گیری و بازیابی واقعی فایل',short:'نسخهٔ پشتیبان، Hash و سنجش زمان بازیابی',phase:'۰۴ · عملیات سازمانی',minutes:90,where:'SRV01 · مدیر محلی یا دامنه',goal:'یک فایل را از Backup در مسیر جدا بازیابی و برابری محتوا را با Hash اثبات می‌کنی.',sources:['backup','restore','forest'],tasks:[
'دیسک جدید و خالی ۸۰ گیگابایتی Backup روی SRV01 با حرف E آماده است؛ دیسک سیستم را فرمت نکرده‌ام.',
'از C:\\LabShares نسخهٔ پشتیبان گرفته‌ام و wbadmin get versions نسخه و زمان آن را نشان می‌دهد.',
'فایل آزمون از Backup در C:\\LabRestore بازیابی شده و SHA256 آن با مقدار پیش از تغییر برابر است.',
'زمان بازیابی، RPO/RTO آزمایشی و محدودیت دیسک هم‌میزبان ثبت شده است؛ پشتیبان فایل را با بازیابی AD یکسان نمی‌دانم.'
],steps:[
{title:'آماده‌سازی دیسک مقصد',html:'<p>SRV01 را خاموش و یک <b>VDI جدید و خالی ۸۰ گیگابایتی</b> اضافه کن. پس از روشن شدن، در Disk Management دیسک جدید را از روی ظرفیت و شماره شناسایی، GPT و یک Volume با NTFS و حرف <b>E</b> بساز. فقط دیسک جدید فرمت شود. دیسک دوم روی همین میزبان صرفاً تمرین بازیابی است؛ در برابر خرابی میزبان یا حذف همهٔ VMها حفاظت مستقلی ندارد.</p>',code:'Install-WindowsFeature Windows-Server-Backup\nGet-Volume',expect:'C دیسک سیستم و E مقصد جدید Backup است؛ فضای کافی روی E وجود دارد.'},
{title:'ساخت داده و نسخهٔ پشتیبان',html:'<p>فایل آزمون بساز و Hash آن را قبل از Backup ثبت کن. این فرمان‌ها را روی SRV01 اجرا کن. گزینهٔ VSS Copy برای این تمرین نسخهٔ یک‌باره می‌گیرد.</p>',code:String.raw`Set-Content C:\LabShares\Finanzen\restore-proof.txt -Value "Original lab data" -Encoding UTF8
Get-FileHash C:\LabShares\Finanzen\restore-proof.txt -Algorithm SHA256
wbadmin start backup -backupTarget:E: -include:C:\LabShares -vssCopy -quiet
wbadmin get versions -backupTarget:E:`,expect:'Backup بدون خطا پایان یافته و Version identifier قابل بازیابی دارد. Hash را در پروتکل ثبت کن.'},
{title:'خرابی کنترل‌شده و بازیابی',html:'<p>محتوای همان فایل را موقتاً با <code>Set-Content</code> به متن «Changed lab data» تغییر بده. در Windows Server Backup گزینهٔ Recover، سپس This server، زمان Backup و Files and folders را انتخاب کن. فقط restore-proof.txt را انتخاب و مقصد <b>Another location: C:\\LabRestore</b> را تعیین کن. مسیر کامل فایل بازیابی‌شده را در Explorer پیدا و Hash آن را محاسبه کن؛ در مقصد اصلی بازنویسی نکن.</p>',code:'Get-ChildItem C:\\LabRestore -Recurse -Filter restore-proof.txt | Get-FileHash -Algorithm SHA256',expect:'Hash فایل بازیابی‌شده با مقدار Original قبل از Backup برابر است و با نسخهٔ تغییرکرده فرق دارد.'},
{title:'تعریف RPO، RTO و مرز بازیابی AD',html:'<p><b>RPO</b> میزان داده‌ای است که تحمل از دست رفتنش را داری؛ <b>RTO</b> زمان قابل قبول بازگشت سرویس است. برای این تمرین فاصلهٔ ایجاد داده تا Backup و مدت Restore را ثبت کن. سپس یک طرح پشتیبان مستقل، خارج از میزبان و با کنترل دسترسی بنویس. بازیابی فایل، آزمون بازیابی System State یا Forest نیست؛ راهنمای رسمی AD را جدا بخوان و تا داشتن طرح کامل، Restore کنترل‌کنندهٔ دامنه را اجرا نکن.</p>'}
],quiz:[
{q:'وجود فایل Backup بدون Restore موفق چه چیزی را ثابت نمی‌کند؟',options:['اینکه واقعاً می‌توان داده را بازیابی کرد','اینکه فایل روی دیسک وجود دارد','اینکه دیسک حرف دارد'],answer:0,explain:'قابل بازیابی بودن باید با اجرای Restore و بررسی داده سنجیده شود.'},
{q:'RTO چه چیزی را بیان می‌کند؟',options:['حجم RAM','زمان هدف برای بازگشت سرویس','تعداد گروه‌های کاربر'],answer:1,explain:'RTO هدف زمانی بازیابی است؛ RPO تحمل از دست رفتن داده از نظر زمان را مشخص می‌کند.'}
]},
{id:'monitoring',title:'پایش، لاگ و مدیریت از راه دور',short:'WinRM، رویدادها، فضای دیسک و یک خرابی قابل تشخیص',phase:'۰۴ · عملیات سازمانی',minutes:90,where:'CL01 با حساب مدیر آزمایشگاه · SRV01',goal:'با نام دامنه‌ای و Kerberos وضعیت سرور را می‌خوانی و توقف عمدی یک سرویس را از روی شواهد تشخیص می‌دهی.',sources:['remoting','events','print'],tasks:[
'Test-WSMan و Invoke-Command با نام SRV01 کار می‌کنند؛ TrustedHosts=* یا فایروال خاموش نشده است.',
'گزارش وضعیت سرویس و فضای دیسک همراه نام سرور و زمان تولید شده است.',
'توقف عمدی Spooler فقط روی SRV01 در گزارش و لاگ دیده شده و پس از Start-Service وضعیت Running بازگشته است.',
'یک گزارش Incident شامل اثر، شواهد، علت، راه‌حل و شرایط Escalation ثبت کرده‌ام.'
],steps:[
{title:'اتصال مدیریتی کنترل‌شده',html:'<p>روی SRV01 پروفایل شبکه باید Domain و WinRM فعال باشد؛ Server Manager معمولاً مدیریت از راه دور را فعال می‌کند. اگر غیرفعال است، روی همان سرور در PowerShell مدیر <code>Enable-PSRemoting -Force</code> اجرا کن. از CL01 با حساب مدیرِ آزمایشگاه و نام DNS به سرور وصل شو؛ از IP و TrustedHosts=* استفاده نکن.</p>',code:'Test-WSMan SRV01\nInvoke-Command -ComputerName SRV01 -ScriptBlock { hostname; Get-Service DHCPServer,Spooler }',expect:'هویت میزبان SRV01 و وضعیت سرویس‌ها برمی‌گردد. برای کارهای روزمرهٔ شرکت مجوزهای Remoting باید محدود و تفویض‌شده باشند.'},
{title:'گزارش سلامت پایه',html:'<p>این گزارش فقط داده می‌خواند. حد هشدار نمونه برای دیسک را ۱۵ درصد فضای خالی در نظر بگیر و دلیلش را در گزارش بنویس. برای تصمیم عملیاتی، Baseline و الگوی مصرف واقعی لازم است.</p>',code:String.raw`Invoke-Command -ComputerName SRV01 -ScriptBlock {
  Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
    Select-Object DeviceID,@{n='FreePercent';e={[math]::Round(100*$_.FreeSpace/$_.Size,1)}}
  Get-Service DHCPServer,Spooler
  Get-Date
}`,expect:'برای هر Volume درصد فضای آزاد، وضعیت سرویس و زمان نمونه‌برداری معلوم است.'},
{title:'ایجاد و تشخیص خرابی محدود',html:'<p>فقط روی SRV01 سرویس Spooler را متوقف کن؛ به DNS و DHCP دست نزن. از CL01 وضعیت را بررسی کن. رویدادهای Service Control Manager را روی SRV01 بخوان، سپس سرویس را برگردان. این آزمون سرویس چاپ است، نه سامانهٔ مانیتورینگ مرکزی سازمان.</p>',code:String.raw`# SRV01
Stop-Service Spooler
Get-Service Spooler
Get-WinEvent -FilterHashtable @{LogName='System';ProviderName='Service Control Manager';StartTime=(Get-Date).AddMinutes(-20)} -MaxEvents 20 | Select-Object TimeCreated,Id,Message
Start-Service Spooler
Get-Service Spooler`,expect:'Stopped در زمان خرابی و Running پس از تعمیر ثبت می‌شود؛ رویداد مرتبط و زمان آن را به گزارش پیوند بده.'},
{title:'ثبت Incident و تصعید درست',html:'<p>یک تیکت با این فیلدها بنویس: زمان، دامنهٔ اثر، کاربر یا سرویس درگیر، بررسی‌های انجام‌شده، شواهد، علت محتمل، اقدام، نتیجه و راه جلوگیری از تکرار. اگر اثر گسترش یافت، مجوز لازم نداری یا زمان توافق‌شده رو به پایان است، به تیم مناسب Escalate کن. یک پیام کوتاه برای کاربر بدون اصطلاحات غیرضروری آماده کن.</p>'}
],quiz:[
{q:'در دامنه، انتخاب بهتر برای PowerShell Remoting چیست؟',options:['نام DNS سرور و احراز هویت دامنه','TrustedHosts=* برای همه','خاموش کردن فایروال'],answer:0,explain:'استفاده از نام و عضویت دامنه امکان Kerberos را فراهم می‌کند؛ باز کردن عمومی TrustedHosts راه‌حل پیش‌فرض نیست.'},
{q:'چه زمانی باید کار را به تیم دیگری Escalate کنی؟',options:['هیچ‌وقت','وقتی از محدودهٔ مهارت، اختیار یا زمان توافق‌شده خارج می‌شود','فقط بعد از نصب دوبارهٔ همهٔ سیستم‌ها'],answer:1,explain:'تشخیص مرز اختیار و ارائهٔ شواهد بخشی از کار حرفه‌ای پشتیبانی است.'}
]},
{id:'change',title:'به‌روزرسانی، امنیت و مدیریت تغییر',short:'Pilot، طرح بازگشت، پذیرش و گزارش به کاربر',phase:'۰۴ · عملیات سازمانی',minutes:90,where:'SRV01 برای Pilot · میزبان برای دریافت بسته',goal:'یک تغییر محدود را با پیش‌نیاز، آزمون قبل و بعد، زمان نگهداری و طرح بازگشت اجرا می‌کنی.',sources:['patch','gpo','backup','telekomjob'],tasks:[
'درخواست تغییر شامل هدف، دارایی، اثر، زمان، تأیید فرضی، پیش‌نیاز و معیار توقف ثبت شده است.',
'روی SRV01 نسخه و Build قبل از تغییر، وضعیت Backup و آزمون‌های DNS، DHCP و فایل ثبت شده‌اند.',
'بستهٔ رسمی متناسب با Build و پیش‌نیازهای KB روی Pilot بررسی و نتیجهٔ نصب یا علت عدم کاربرد ثبت شده است؛ ادعای نصبِ انجام‌نشده ندارم.',
'آزمون‌های پس از تغییر، تصمیم ادامه یا بازگشت، کنترل فایروال و پیام تحویل به کاربر ثبت شده‌اند.'
],steps:[
{title:'طرح تغییر و خط مبنا',html:'<p>یک درخواست Change برای به‌روزرسانی SRV01 بنویس؛ نه برای تغییر هم‌زمان همهٔ DCها. هدف، اثر روی DHCP و فایل، پنجرهٔ نگهداری، شخص تأییدکننده در سناریو، پیش‌نیاز Backup و معیار توقف را تعیین کن. Snapshot تنها برنامهٔ بازیابی نیست. فهرست Hotfix و Build را قبل از تغییر ثبت کن.</p>',code:'Get-ComputerInfo | Select-Object WindowsProductName,OsVersion,OsBuildNumber\nGet-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 10\nGet-NetFirewallProfile | Select-Object Name,Enabled',expect:'Build و به‌روزرسانی‌های قبلی مشخص‌اند؛ فایروال فعال است و Backup بخش بازیابی وجود دارد.'},
{title:'دریافت کنترل‌شده در شبکهٔ ایزوله',html:'<p>روی میزبان از Microsoft Update Catalog و مقالهٔ رسمی KB، بستهٔ x64 مناسب <b>Windows Server 2025 و Build موجود</b> را انتخاب کن. پیش‌نیازها و بسته‌های Checkpoint را بخوان. یک پوشهٔ موقت و <b>فقط‌خواندنی</b> با نام Host-Updates از VirtualBox Shared Folders فقط به SRV01 ارائه کن؛ Guest Additions باید نصب باشد. فایل را از <code>\\\\VBOXSVR\\Host-Updates</code> به <code>C:\\LabUpdates</code> کپی کن. برای این کار DC را به NAT یا Bridged وصل نکن.</p>'},
{title:'اجرای Pilot و ثبت نتیجه',html:'<p>روی کنسول SRV01، بستهٔ رسمی و پیش‌نیازهای آن را طبق مقالهٔ KB نصب کن؛ ترتیب بسته‌ها مهم است. نام ساختگی KB در این درس وجود ندارد چون Build هر نصب متفاوت است. اگر بسته قابل اعمال نیست، علت و بستهٔ درست را مشخص کن و کار را به‌عنوان نصب موفق علامت نزن. Restart را فقط در پنجرهٔ تعیین‌شده انجام بده. پوشهٔ میزبان را پس از انتقال جدا کن.</p>',expect:'شمارهٔ KB واقعی، نتیجهٔ نصب، نیاز به Restart و Build بعدی در پروتکل آمده است؛ نصب ناقص یا Not applicable پنهان نشده است.'},
{title:'پذیرش، بازگشت و گزارش',html:'<p>پس از Restart، DNS، سرویس DHCP، Lease کلاینت و دسترسی مجاز/غیرمجاز فایل را دوباره بررسی کن. در شکست، طبق طرح بازیابی یا روش پشتیبانی‌شدهٔ حذف همان KB عمل کن؛ همهٔ به‌روزرسانی‌ها قابل حذف نیستند. برای GPO از Backup-GPO و بازگشت همان سیاست استفاده می‌شود، نه Reset کلی دامنه. یک پیام برای کاربر بنویس: چه تغییر کرد، وقفه چقدر بود، چه چیزی آزموده شد و مشکل را چگونه گزارش کند.</p>'}
],quiz:[
{q:'برای تغییر سازمانی کدام ترتیب مناسب است؟',options:['نصب روی همه و سپس فکر کردن به بازگشت','طرح و آزمون روی Pilot، سپس تصمیم مستند','خاموش کردن کنترل‌های امنیتی'],answer:1,explain:'تغییر محدود و قابل ارزیابی، اثر و خطای احتمالی را روشن می‌کند و تصمیم ادامه را ممکن می‌سازد.'},
{q:'Not applicable شدن یک بسته را چگونه ثبت می‌کنی؟',options:['به‌عنوان نصب موفق','حذف از گزارش','به‌عنوان نصب‌نشده با علت و بررسی سازگاری'],answer:2,explain:'پروتکل باید وضعیت واقعی را نشان بدهد؛ نامناسب بودن بسته دلیل موفقیت نصب نیست.'}
]}
);
})();
