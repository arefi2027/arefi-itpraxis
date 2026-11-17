/* Persian curriculum. Commands run manually in the named local VM. */
window.LAB = {
  "sources": {
    "server": {
      "name": "مایکروسافت · دریافت ISO و نسخهٔ آزمایشی سرور",
      "url": "https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025"
    },
    "client": {
      "name": "مایکروسافت · Windows 11 Enterprise",
      "url": "https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-enterprise"
    },
    "hardware": {
      "name": "مایکروسافت · نیازمندی‌های سخت‌افزاری",
      "url": "https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements"
    },
    "vbox": {
      "name": "اوراکل · دریافت VirtualBox",
      "url": "https://www.virtualbox.org/wiki/Downloads"
    },
    "network": {
      "name": "اوراکل · شبکه‌های مجازی",
      "url": "https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html"
    },
    "ad": {
      "name": "مایکروسافت · نصب AD DS",
      "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-)"
    },
    "dns": {
      "name": "مایکروسافت · راه‌اندازی DNS",
      "url": "https://learn.microsoft.com/en-us/windows-server/networking/dns/quickstart-install-configure-dns-server"
    },
    "dhcp": {
      "name": "مایکروسافت · راه‌اندازی DHCP",
      "url": "https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/quickstart-install-configure-dhcp-server"
    },
    "user": {
      "name": "مایکروسافت · ساخت حساب با New-ADUser",
      "url": "https://learn.microsoft.com/en-us/powershell/module/activedirectory/new-aduser"
    },
    "groups": {
      "name": "مایکروسافت · گروه‌های امنیتی",
      "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-groups"
    },
    "member": {
      "name": "مایکروسافت · عضویت در گروه",
      "url": "https://learn.microsoft.com/en-us/powershell/module/activedirectory/add-adgroupmember"
    },
    "gpo": {
      "name": "مایکروسافت · Group Policy",
      "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview"
    },
    "smb": {
      "name": "مایکروسافت · ساخت اشتراک SMB",
      "url": "https://learn.microsoft.com/en-us/powershell/module/smbshare/new-smbshare"
    },
    "dcdiag": {
      "name": "مایکروسافت · عیب‌یابی با Dcdiag",
      "url": "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/dcdiag"
    }
  },
  "modules": [
    {
      "id": "start",
      "title": "ساخت آزمایشگاه مجازی",
      "short": "VirtualBox، فایل‌های ISO و برنامهٔ منابع",
      "phase": "۰۱ · پایه‌ها",
      "minutes": 45,
      "where": "روی رایانهٔ میزبان",
      "goal": "سه ماشین مجازی و رسانه‌های نصب آماده‌اند و می‌دانی چگونه شبکهٔ آزمایشگاه را از شبکهٔ واقعی جدا نگه داری.",
      "sources": [
        "vbox",
        "server",
        "client",
        "hardware",
        "network"
      ],
      "tasks": [
        "VirtualBox اجرا می‌شود؛ مجازی‌سازی سخت‌افزاری VT-x/AMD-V فعال است و پردازنده نیازمندی‌های سرور را دارد.",
        "ISO سرور و کلاینت را از مایکروسافت گرفته‌ام و ویرایش و تاریخ پایان دورهٔ آزمایشی را ثبت کرده‌ام.",
        "DC01 با ۶ گیگابایت، SRV01 با ۴ گیگابایت و CL01 با ۶ گیگابایت رم، هرکدام ۲ پردازندهٔ مجازی و دیسک پویای ۸۰ گیگابایتی دارند.",
        "تفاوت NAT برای آماده‌سازی اولیه و شبکهٔ داخلی LAB-CORP برای تمرین‌ها را می‌دانم."
      ],
      "steps": [
        {
          "title": "بررسی پیش‌نیازها",
          "html": "<p>این مسیر برای یک رایانهٔ <b>x64 با ۶۴ گیگابایت رم</b> طراحی شده است. نیازمندی‌های پردازنده را از منبع رسمی بررسی کن، VT-x/AMD-V را در UEFI فعال کن و نسخهٔ پشتیبانی‌شدهٔ VirtualBox را از اوراکل نصب کن. حدود <b>۳۰۰ گیگابایت فضای آزاد SSD</b> برای شروع در نظر بگیر؛ گسترش سازمانی و دیسک پشتیبان فضای بیشتری لازم دارند. این مسیر x64 مستقیماً برای میزبان ARM مناسب نیست.</p>"
        },
        {
          "title": "دریافت فایل‌های ISO",
          "html": "<p>Windows Server 2025 و Windows 11 Enterprise را از Microsoft Evaluation Center دریافت کن. هنگام نصب سرور، <b>Standard Evaluation (Desktop Experience)</b> را انتخاب خواهی کرد. Windows 11 Pro با مجوز معتبر نیز مناسب است؛ Home به دامنهٔ AD نمی‌پیوندد. دورهٔ آزمایشی سرور ۱۸۰ روز است و باید در ۱۰ روز اول فعال شود؛ کلاینت ۹۰ روز مهلت دارد. ابتدا از NAT برای فعال‌سازی و به‌روزرسانی استفاده کن.</p>"
        },
        {
          "title": "ایجاد سه ماشین مجازی",
          "html": "<p>در VirtualBox گزینهٔ <b>New</b> را بزن، نام و ISO را تعیین کن و <b>Skip Unattended Installation</b> را فعال کن. DC01، SRV01 و CL01 را جداگانه بساز؛ یک Windows نصب‌شده را بدون Generalize کپی نکن. جدول منابع در «آزمایشگاه من» قرار دارد. برای هر VM با توجه به توان پردازندهٔ میزبان، ۲ vCPU و یک VDI پویای ۸۰ گیگابایتی روی SATA در نظر بگیر.</p><p>برای CL01 نوع مهمان Windows 11 (64-bit)، EFI، Secure Boot و TPM 2.0 مجازی را طبق نیاز مهمان فعال کن. برای سرورها نوع پشتیبانی‌شدهٔ Windows Server 64-bit را انتخاب کن. هر VM فقط یک کارت شبکهٔ فعال، فعلاً در حالت <b>NAT</b> و با Cable Connected، داشته باشد.</p>"
        },
        {
          "title": "برنامه‌ریزی تغییر شبکه",
          "html": "<p>پس از نصب و به‌روزرسانی، همهٔ VMها را خاموش می‌کنی و کارت شبکهٔ آن‌ها را به <b>Internal Network با نام LAB-CORP</b> تغییر می‌دهی. نام شبکه روی هر سه ماشین دقیقاً یکسان باشد. از Bridged و کارت NAT دوم روی DC استفاده نکن. شبکهٔ داخلی اینترنت و Gateway ندارد. DHCP داخلی VirtualBox را برای این شبکه فعال نکن؛ بعداً SRV01 این نقش را بر عهده می‌گیرد.</p>",
          "code": "VBoxManage list dhcpservers",
          "label": "میزبان · ترمینال با VirtualBox در PATH",
          "expect": "برای LAB-CORP هیچ DHCP فعالِ VirtualBox وجود ندارد. شبکه‌های دیگر VirtualBox را تغییر نده."
        }
      ],
      "quiz": [
        {
          "q": "کدام حالت فقط ماشین‌های آزمایشگاه را به یکدیگر متصل می‌کند؟",
          "options": [
            "Bridged Adapter",
            "شبکهٔ داخلی LAB-CORP",
            "NAT جداگانه برای هر VM"
          ],
          "answer": 1,
          "explain": "Internal Network ماشین‌هایی با نام شبکهٔ یکسان را بدون اتصال به شبکهٔ فیزیکی به هم وصل می‌کند."
        },
        {
          "q": "پیکربندی پایه در مجموع چقدر رم مصرف می‌کند؟",
          "options": [
            "۱۶ گیگابایت",
            "۴۸ گیگابایت",
            "۶۴ گیگابایت"
          ],
          "answer": 0,
          "explain": "۶ + ۴ + ۶ برابر ۱۶ گیگابایت است؛ ۴۸ گیگابایت برای میزبان و گسترش‌های بعدی باقی می‌ماند."
        }
      ]
    },
    {
      "id": "install",
      "title": "نصب Windows Server",
      "short": "نصب، به‌روزرسانی و نشانی‌های IP ثابت",
      "phase": "۰۱ · پایه‌ها",
      "minutes": 75,
      "where": "DC01، SRV01 و CL01",
      "goal": "هر سه سیستم نصب شده‌اند و در شبکهٔ ایزوله نام و نشانی درست دارند.",
      "sources": [
        "server",
        "client",
        "network",
        "hardware"
      ],
      "tasks": [
        "DC01 و SRV01 با Desktop Experience و CL01 با Windows 11 Pro/Enterprise اجرا می‌شوند؛ فعال‌سازی و به‌روزرسانی بررسی شده است.",
        "هر سه VM فقط به LAB-CORP متصل‌اند؛ Snapshot با نام 01-baseline پس از خاموشی کامل ساخته شده است.",
        "نشانی DC01 برابر 10.20.0.10/24، نشانی SRV01 برابر 10.20.0.20/24 و نشانی موقت CL01 برابر 10.20.0.50/24 است؛ Gateway خالی است.",
        "خروجی Get-NetIPConfiguration در هر سه ماشین DNS را 10.20.0.10 نشان می‌دهد و نام ماشین‌ها متفاوت است."
      ],
      "steps": [
        {
          "title": "نصب سیستم‌عامل‌ها",
          "html": "<p>DC01 را با ISO سرور راه‌اندازی کن. زبان، سپس Install now، گزینهٔ <b>Standard Evaluation (Desktop Experience)</b> و نصب Custom روی دیسک مجازی خالی ۸۰ گیگابایتی را انتخاب کن. فقط دیسک همین VM را تأیید کن. یک گذرواژهٔ محلی قوی برای Administrator تعیین کن. همین مراحل را برای SRV01 انجام بده. CL01 را با ISO کلاینت و فرایند معمول نصب راه‌اندازی کن.</p><p>برای راه‌اندازی اولیه، فعال‌سازی و Windows Update از NAT استفاده کن. در صورت نیاز، Guest Additions را از منوی Devices نصب کن. سیستم را تا پایان به‌روزرسانی‌ها راه‌اندازی مجدد کن. فعال‌سازی سرور را با <code>slmgr /xpr</code> بررسی کن. روی CL01، پیش از قطع اینترنت، از Optional features ابزار <b>RSAT: Active Directory Domain Services and Lightweight Directory Services Tools</b> را برای تمرین تفویض اختیار نصب کن. مهلت نسخه‌ها را ثبت کن؛ گذرواژه‌ها را اینجا ننویس.</p>"
        },
        {
          "title": "تعیین نام و ثبت نقطهٔ شروع",
          "html": "<p>Windows PowerShell را <b>با Run as administrator</b> باز کن. نام ماشین‌ها را به‌ترتیب به DC01، SRV01 و CL01 تغییر بده؛ فرمان زیر برای DC01 است. پس از Restart، ISO را جدا کن، ماشین‌ها را کامل خاموش کن و Snapshot به نام <code>01-baseline</code> بساز. سپس کارت شبکهٔ همهٔ ماشین‌ها را روی Internal Network با نام <code>LAB-CORP</code> قرار بده و آن‌ها را روشن کن.</p>",
          "code": "Rename-Computer -NewName \"DC01\" -Restart",
          "expect": "فرمان hostname روی هر VM نام همان ماشین را نشان می‌دهد. Snapshot هنوز متعلق به وضعیت پیش از ایجاد دامنه است."
        },
        {
          "title": "تنظیم IP ثابت",
          "html": "<p><code>ncpa.cpl</code> را باز کن و به Ethernet، سپس Properties و IPv4 برو. روی DC01 نشانی <b>10.20.0.10</b>، ماسک <b>255.255.255.0</b> و DNS برابر <b>10.20.0.10</b> را وارد کن. Gateway و DNS جایگزین خالی بمانند. برای SRV01 نشانی 10.20.0.20 و برای CL01 فعلاً 10.20.0.50 را با همان ماسک و DNS تنظیم کن. IPv6 و فایروال Windows را فعال نگه دار. سرویس DNS در بخش بعد راه‌اندازی می‌شود.</p>",
          "code": "hostname\nGet-NetAdapter\nGet-NetIPConfiguration\nGet-Date",
          "expect": "هر VM یک کارت فعال با IPv4 و DNS درست و بدون Gateway دارد؛ تاریخ و ساعت ماشین‌ها هماهنگ‌اند."
        },
        {
          "title": "بررسی اتصال",
          "html": "<p>در همهٔ VMها Cable Connected و یکسان بودن نام LAB-CORP را بررسی کن. ممکن است <code>ping 10.20.0.10</code> به‌علت فایروال پاسخ ندهد؛ نبود پاسخ Ping به‌تنهایی اثبات خرابی شبکه نیست. پس از راه‌اندازی سرویس‌ها، دسترسی به پورت و خود سرویس را جداگانه می‌سنجیم. در این مرحله «بدون اینترنت» طبیعی است.</p>"
        }
      ],
      "quiz": [
        {
          "q": "کدام گزینه رابط گرافیکی مناسب این آزمایشگاه مقدماتی را نصب می‌کند؟",
          "options": [
            "Server Core",
            "Desktop Experience",
            "فقط فایل VHD"
          ],
          "answer": 1,
          "explain": "Desktop Experience رابط گرافیکی دارد. Server Core یک مرحلهٔ تکمیلی مناسب پس از تسلط به مبانی است."
        },
        {
          "q": "در پیکربندی ایزولهٔ پایه چه Gateway پیش‌فرضی وارد می‌کنی؟",
          "options": [
            "10.20.0.1 حتی بدون روتر",
            "روتر خانه",
            "هیچ‌کدام"
          ],
          "answer": 2,
          "explain": "در این شبکه روتری وجود ندارد. وارد کردن یک نشانی فرضی اینترنت ایجاد نمی‌کند."
        }
      ]
    },
    {
      "id": "ad",
      "title": "اولین دامنهٔ Active Directory",
      "short": "AD DS، DNS و اولین کنترل‌کنندهٔ دامنه",
      "phase": "۰۲ · زیرساخت",
      "minutes": 60,
      "where": "DC01 · حساب مدیر محلی",
      "goal": "DC01 جنگل جدید corp.example.test را مدیریت می‌کند و DNS یکپارچه با AD را ارائه می‌دهد.",
      "sources": [
        "ad",
        "dcdiag"
      ],
      "tasks": [
        "Get-ADDomain مقادیر DNSRoot = corp.example.test و NetBIOSName = CORP را برمی‌گرداند.",
        "Get-Service NTDS,DNS وضعیت هر دو سرویس را Running نشان می‌دهد.",
        "در net share اشتراک‌های SYSVOL و NETLOGON وجود دارند و در dcdiag /test:dns خطای حل‌نشدهٔ DNS مربوط به AD ندارم.",
        "با CORP\\Administrator وارد DC01 می‌شوم و گذرواژهٔ DSRM را خارج از سایت، امن نگهداری کرده‌ام."
      ],
      "steps": [
        {
          "title": "مفاهیم و بررسی پیش از نصب",
          "html": "<p>دامنه هویت‌ها و رایانه‌ها را متمرکز مدیریت می‌کند. جنگل یا Forest ساختار بالاتر AD است. این آزمایشگاه یک جنگل، یک دامنه و فعلاً یک DC دارد. نام رزروشدهٔ آزمایشی <b>corp.example.test</b> فقط برای همین محیط است. روی DC01 نشانی ثابت 10.20.0.10، DNS روی همین نشانی، زمان درست و نبود Restart معوق را بررسی کن.</p>"
        },
        {
          "title": "نصب نقش AD DS",
          "html": "<p>روش گرافیکی: در Server Manager به Manage و Add Roles and Features برو؛ نصب Role-based و سپس Active Directory Domain Services همراه ابزارهای مدیریت را انتخاب کن. روش PowerShell در پنجرهٔ دارای دسترسی مدیر:</p>",
          "code": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools",
          "expect": "Success = True. نصب نقش به‌تنهایی DC01 را به کنترل‌کنندهٔ دامنه تبدیل نمی‌کند."
        },
        {
          "title": "ایجاد جنگل جدید",
          "html": "<p>از اعلان Server Manager گزینهٔ <b>Promote this server to a domain controller</b> را انتخاب کن؛ سپس Add a new forest و نام <b>corp.example.test</b>. DNS و Global Catalog فعال، NetBIOS برابر <b>CORP</b> و مسیرها پیش‌فرض باشند. یک گذرواژهٔ مستقل برای DSRM تعیین کن. یا فرمان زیر را اجرا و گذرواژه را در درخواست امن وارد کن. پس از بررسی موفق، DC01 راه‌اندازی مجدد می‌شود.</p>",
          "code": "Install-ADDSForest -DomainName \"corp.example.test\" -DomainNetbiosName \"CORP\" -InstallDNS",
          "expect": "هشدار Delegation در دامنهٔ آزمایشی جداشده و بدون DNS بالادست قابل انتظار است؛ خطاهای دیگر را پیش از ادامه بررسی کن."
        },
        {
          "title": "بررسی نتیجهٔ دامنه",
          "html": "<p>پس از Restart با <code>CORP\\Administrator</code> وارد شو و این آزمون‌ها را روی DC01 اجرا کن. بدون اتصال اینترنت، حل نام بیرونی معیار پذیرش نیست. یک DC برای شروع آزمایشگاه کافی است؛ در بخش سازمانی DC دوم را اضافه می‌کنی. افزونگی و پشتیبان‌گیری دو نیاز جداگانه‌اند.</p>",
          "code": "Get-ADDomain | Select-Object DNSRoot,NetBIOSName\nGet-Service NTDS,DNS\nnet share\ndcdiag /test:dns",
          "expect": "corp.example.test و CORP نمایش داده می‌شوند؛ سرویس‌ها Running هستند و SYSVOL و NETLOGON وجود دارند. خطاهای AD-DNS را بررسی کن و هشدارها را یکجا نادیده نگیر."
        }
      ],
      "quiz": [
        {
          "q": "نصب نقش AD DS به‌تنهایی چه کاری انجام می‌دهد؟",
          "options": [
            "دامنه را خودکار ایجاد می‌کند",
            "اجزا را نصب می‌کند؛ Promote مرحله‌ای جداست",
            "همهٔ کلاینت‌ها را عضو می‌کند"
          ],
          "answer": 1,
          "explain": "ایجاد جنگل و تبدیل سرور به DC در مرحلهٔ Promote انجام می‌شود."
        },
        {
          "q": "گذرواژهٔ DSRM برای چیست؟",
          "options": [
            "حالت بازیابی سرویس‌های دایرکتوری",
            "گذرواژهٔ Wi-Fi",
            "ورود عادی همهٔ کاربران"
          ],
          "answer": 0,
          "explain": "DSRM برای کارهای بازیابی کنترل‌کنندهٔ دامنه است."
        }
      ]
    },
    {
      "id": "dns",
      "title": "شناخت و بررسی DNS",
      "short": "Zone، رکوردهای A و PTR و پیدا کردن سرویس‌ها",
      "phase": "۰۲ · زیرساخت",
      "minutes": 45,
      "where": "DC01 · CORP\\Administrator",
      "goal": "نام میزبان را به IP تبدیل می‌کنی و نشان می‌دهی کلاینت چگونه کنترل‌کنندهٔ دامنه را پیدا می‌کند.",
      "sources": [
        "dns",
        "ad"
      ],
      "tasks": [
        "فرمان Resolve-DnsName dc01.corp.example.test -Server 10.20.0.10 نشانی 10.20.0.10 را برمی‌گرداند.",
        "رکورد A به نام srv01 در corp.example.test به 10.20.0.20 اشاره می‌کند.",
        "Zone معکوس 0.20.10.in-addr.arpa رکورد PTR نشانی 10.20.0.20 را دارد و نام srv01.corp.example.test را برمی‌گرداند.",
        "پرس‌وجوی SRV برای _ldap._tcp.dc._msdcs.corp.example.test نام DC01 و پورت 389 را نشان می‌دهد."
      ],
      "steps": [
        {
          "title": "بررسی Zoneهای موجود",
          "html": "<p>در Server Manager از Tools وارد DNS شو. در Forward Lookup Zones دامنهٔ <code>corp.example.test</code> و رکوردهای سرویس AD را می‌بینی. رکورد A نام میزبان را به IPv4 متصل می‌کند؛ رکورد SRV مشخصات سرویس را می‌دهد. AD برای یافتن DC به DNS داخلی متکی است.</p>",
          "code": "Resolve-DnsName dc01.corp.example.test -Server 10.20.0.10\nResolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.corp.example.test -Server 10.20.0.10",
          "expect": "DC01 برابر 10.20.0.10 است. پاسخ SRV نام dc01.corp.example.test و پورت 389 را دارد."
        },
        {
          "title": "ثبت SRV01 در DNS",
          "html": "<p>روی DC01 برای سرور عضو آینده یک رکورد A بساز. <code>srv01</code> در این تمرین نام میزبان است و با نوع رکورد SRV تفاوت دارد.</p>",
          "code": "Add-DnsServerResourceRecordA -Name \"srv01\" -ZoneName \"corp.example.test\" -IPv4Address \"10.20.0.20\"\nResolve-DnsName srv01.corp.example.test -Server 10.20.0.10",
          "expect": "پاسخ 10.20.0.20 است. هنگام تکرار تمرین، رکورد موجود را بررسی کن و رکورد تکراری نساز."
        },
        {
          "title": "تنظیم Reverse Lookup",
          "html": "<p>PTR از IP به نام می‌رسد. برای شبکهٔ /24 یک Reverse Zone یکپارچه با AD بساز، سپس PTR مربوط به SRV01 را اضافه کن. در GUI: از Reverse Lookup Zones گزینهٔ New Zone، سپس IPv4 و Network ID برابر <code>10.20.0</code> را انتخاب کن.</p>",
          "code": "Add-DnsServerPrimaryZone -NetworkId \"10.20.0.0/24\" -ReplicationScope Domain\nAdd-DnsServerResourceRecordPtr -Name \"20\" -ZoneName \"0.20.10.in-addr.arpa\" -PtrDomainName \"srv01.corp.example.test\"\nResolve-DnsName 10.20.0.20 -Server 10.20.0.10",
          "expect": "نام srv01.corp.example.test برمی‌گردد. A و PTR رکوردهای جداگانه‌اند و وجود یکی، دیگری را ثابت نمی‌کند."
        },
        {
          "title": "عیب‌یابی با ترتیب مشخص",
          "html": "<p>اگر پرس‌وجو شکست خورد: IP و DNS کلاینت، سپس <code>Test-NetConnection 10.20.0.10 -Port 53</code>، سرویس DNS، Zone، رکورد و Cache را بررسی کن. آزمون پورت فقط TCP را بررسی می‌کند؛ پرس‌وجوی DNS نتیجهٔ واقعی حل نام را می‌سنجد. DNS عمومی را به‌عنوان DNS جایگزین عضو دامنه وارد نکن. برای نام‌های اینترنتی بعداً DNS داخلی می‌تواند Forwarder داشته باشد؛ این محیط ایزوله فعلاً به آن نیاز ندارد.</p>"
        }
      ],
      "quiz": [
        {
          "q": "کدام رکورد در یافتن کنترل‌کنندهٔ دامنه نقش دارد؟",
          "options": [
            "فقط PTR",
            "SRV",
            "MX"
          ],
          "answer": 1,
          "explain": "AD سرویس‌هایی مانند LDAP را با رکوردهای SRV منتشر می‌کند."
        },
        {
          "q": "اعضای دامنه باید از کدام DNS استفاده کنند؟",
          "options": [
            "8.8.8.8 به‌عنوان جایگزین",
            "روتر خانه",
            "10.20.0.10"
          ],
          "answer": 2,
          "explain": "DC01 Zoneهای داخلی AD را می‌شناسد؛ DNS عمومی از این دامنهٔ آزمایشی خبر ندارد."
        }
      ]
    },
    {
      "id": "dhcp",
      "title": "عضویت کلاینت و راه‌اندازی DHCP",
      "short": "عضویت در دامنه، Scope، گزینه‌ها و Lease",
      "phase": "۰۲ · زیرساخت",
      "minutes": 75,
      "where": "SRV01 و CL01 · مدیر دامنه",
      "goal": "SRV01 عضو دامنه است و به‌صورت کنترل‌شده به CL01 نشانی می‌دهد.",
      "sources": [
        "dhcp",
        "network",
        "ad"
      ],
      "tasks": [
        "SRV01 و CL01 عضو corp.example.test هستند و Test-ComputerSecureChannel روی هر دو True است.",
        "Get-DhcpServerInDC نام srv01.corp.example.test را با نشانی 10.20.0.20 نشان می‌دهد.",
        "Scope فعال 10.20.0.0 بازهٔ 10.20.0.100 تا 10.20.0.199 را با DNS برابر 10.20.0.10 و پسوند corp.example.test و بدون گزینهٔ Router ارائه می‌دهد.",
        "CL01 از بازه IP می‌گیرد؛ ipconfig /all سرور DHCP را 10.20.0.20 و DNS را 10.20.0.10 نشان می‌دهد و Lease متناظر روی SRV01 دیده می‌شود."
      ],
      "steps": [
        {
          "title": "عضو کردن سرور و کلاینت",
          "html": "<p>DC01 باید روشن باشد. SRV01 نشانی ثابت 10.20.0.20 و CL01 فعلاً 10.20.0.50 دارند و DNS هر دو 10.20.0.10 است. ابتدا روی <b>SRV01 و سپس CL01</b> با مدیر محلی فرمان عضویت را اجرا کن. در درخواست اعتبارنامه از <code>CORP\\Administrator</code> استفاده کن. پس از Restart با مدیر دامنه وارد شو. روش گرافیکی: <code>sysdm.cpl</code>، سپس Computer Name، Change و Domain.</p>",
          "code": "Add-Computer -DomainName \"corp.example.test\" -Credential (Get-Credential) -Restart",
          "expect": "پس از Restart خروجی Test-ComputerSecureChannel برابر True است. در صورت خطا ابتدا DNS و زمان را بررسی کن."
        },
        {
          "title": "نصب و مجاز کردن DHCP روی SRV01",
          "html": "<p>روی <b>SRV01</b>، Windows PowerShell را با دسترسی مدیر و حساب CORP\\Administrator اجرا کن. این حساب در آزمایشگاه اجازهٔ Authorize دارد. در شرکت، چنین دسترسی‌هایی طبق نقش افراد تفویض می‌شوند.</p>",
          "code": "Install-WindowsFeature DHCP -IncludeManagementTools\nAdd-DhcpServerSecurityGroup\nRestart-Service DHCPServer\nAdd-DhcpServerInDC -DnsName \"srv01.corp.example.test\" -IPAddress 10.20.0.20\nGet-DhcpServerInDC",
          "expect": "SRV01 مجاز شده است. در صورت تأخیر، کمی صبر کن و کنسول DHCP را Refresh کن."
        },
        {
          "title": "تنظیم بازه و گزینه‌های DNS",
          "html": "<p>بازهٔ DHCP با IP ثابت سرورها هم‌پوشانی ندارد. DHCP داخلی VirtualBox برای LAB-CORP نباید فعال باشد. چون روتر نداریم گزینهٔ 003 را تنظیم نکن.</p>",
          "code": "Add-DhcpServerv4Scope -Name \"LAB-Clients\" -StartRange 10.20.0.100 -EndRange 10.20.0.199 -SubnetMask 255.255.255.0 -State Active\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -DnsServer 10.20.0.10 -DnsDomain \"corp.example.test\"\nGet-DhcpServerv4Scope\nGet-DhcpServerv4OptionValue -ScopeId 10.20.0.0",
          "expect": "Scope در وضعیت Active است؛ گزینهٔ 006 برابر 10.20.0.10 و گزینهٔ 015 برابر corp.example.test است؛ 003 وجود ندارد."
        },
        {
          "title": "تغییر CL01 به DHCP",
          "html": "<p>روی CL01 در <code>ncpa.cpl</code> و تنظیمات IPv4، دریافت <b>خودکار IP و DNS</b> را انتخاب کن. سه فرمان اول را روی CL01 و فرمان آخر را جداگانه روی SRV01 اجرا کن. اگر 169.254.x.x گرفتی، Scope، Authorize، سرویس و اتصال شبکهٔ مجازی را بررسی کن.</p>",
          "code": "# CL01\nipconfig /release\nipconfig /renew\nipconfig /all\n# SRV01\nGet-DhcpServerv4Lease -ScopeId 10.20.0.0",
          "expect": "IP کلاینت در بازهٔ 10.20.0.100 تا 10.20.0.199 است؛ DHCP برابر 10.20.0.20 و DNS برابر 10.20.0.10 است و Lease متناظر دیده می‌شود."
        }
      ],
      "quiz": [
        {
          "q": "CL01 نشانی 169.254.x.x دارد. اولین بررسی مناسب چیست؟",
          "options": [
            "Scope و مجوز DHCP و اتصال شبکه",
            "نصب دوبارهٔ دامنه",
            "گذاشتن 8.8.8.8 به‌عنوان IP کلاینت"
          ],
          "answer": 0,
          "explain": "نشانی Link-local نشان می‌دهد کلاینت Lease قابل استفاده‌ای نگرفته است."
        },
        {
          "q": "کدام گزینهٔ DHCP نشانی سرور DNS را توزیع می‌کند؟",
          "options": [
            "003",
            "006",
            "015"
          ],
          "answer": 1,
          "explain": "006 برای DNS، گزینهٔ 015 برای پسوند DNS و گزینهٔ 003 برای روتر است."
        }
      ]
    },
    {
      "id": "identities",
      "title": "مدیریت کاربران و گروه‌ها",
      "short": "OU، ورود همکار جدید و دسترسی با AGDLP",
      "phase": "۰۳ · کار روزمرهٔ ادمین",
      "minutes": 60,
      "where": "DC01 · CORP\\Administrator",
      "goal": "اشیای آزمایشی را ساختاربندی می‌کنی و از طریق گروه‌های مشخص به منابع دسترسی می‌دهی.",
      "sources": [
        "user",
        "groups",
        "member"
      ],
      "tasks": [
        "OUهای Lab، Benutzer، Gruppen و Computer وجود دارند؛ SRV01 و CL01 در Lab/Computer هستند و DC01 در Domain Controllers مانده است.",
        "lena.weber و tom.klein فعال‌اند، در Lab/Benutzer قرار دارند و باید گذرواژهٔ اولیه را تغییر دهند.",
        "GG_Finanzen فقط Lena را دارد؛ DL_Finanzen_RW شامل GG_Finanzen است و Scope آن DomainLocal و نوع آن Security است.",
        "Lena روی CL01 وارد می‌شود و گذرواژه‌اش را تغییر می‌دهد؛ هیچ‌یک از این دو کاربر Domain Admin نیستند."
      ],
      "steps": [
        {
          "title": "ساخت OUهای آزمایشگاه",
          "html": "<p>OU برای سازمان‌دهی اشیا، تفویض اختیار و اتصال GPO است؛ به‌تنهایی مجوز فایل نمی‌دهد. در <code>dsa.msc</code> روی دامنه، New و Organizational Unit را انتخاب کن یا فرمان‌ها را روی DC01 اجرا کن. برای سازگاری با فرمان‌ها نام‌ها دقیق بمانند: <b>Benutzer یعنی کاربران، Gruppen یعنی گروه‌ها و Computer یعنی رایانه‌ها</b>.</p>",
          "code": "New-ADOrganizationalUnit -Name \"Lab\" -Path \"DC=corp,DC=example,DC=test\"\n$base = \"OU=Lab,DC=corp,DC=example,DC=test\"\n\"Benutzer\",\"Gruppen\",\"Computer\" | ForEach-Object {\n  New-ADOrganizationalUnit -Name $_ -Path $base\n}",
          "expect": "چهار OU دیده می‌شوند. در Active Directory Users and Computers، SRV01 و CL01 را از Computers به Lab/Computer منتقل کن. DC01 را جابه‌جا نکن."
        },
        {
          "title": "ساخت دو حساب آزمایشی",
          "html": "<p>برای هر کاربر یک گذرواژهٔ موقت مستقل و مطابق سیاست دامنه تعیین کن. ورودی AsSecureString گذرواژه را در متن فرمان نمایش نمی‌دهد. فقط از هویت‌های آزمایشی استفاده کن. بخش مربوط به Tom را جداگانه اجرا کن.</p>",
          "code": "$pw = Read-Host \"Temporary password for Lena\" -AsSecureString\nNew-ADUser -Name \"Lena Weber\" -SamAccountName \"lena.weber\" -UserPrincipalName \"lena.weber@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true\n$pw = Read-Host \"Temporary password for Tom\" -AsSecureString\nNew-ADUser -Name \"Tom Klein\" -SamAccountName \"tom.klein\" -UserPrincipalName \"tom.klein@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true",
          "expect": "Get-ADUser lena.weber مقدار Enabled = True دارد و هر دو حساب در OU با نام Benutzer وجود دارند."
        },
        {
          "title": "گروه‌های تودرتو با AGDLP",
          "html": "<p>الگو از <b>حساب کاربر به گروه سراسری، سپس گروه محلی دامنه و در پایان مجوز</b> می‌رسد. Lena عضو گروه سراسری واحد مالی است؛ این گروه عضو گروه دسترسی به منبع می‌شود. در بخش بعد مجوز فایل فقط به گروه منبع داده می‌شود. نام Finanzen در فرمان‌ها به واحد مالی اشاره دارد.</p>",
          "code": "$path = \"OU=Gruppen,OU=Lab,DC=corp,DC=example,DC=test\"\nNew-ADGroup -Name \"GG_Finanzen\" -GroupScope Global -GroupCategory Security -Path $path\nNew-ADGroup -Name \"DL_Finanzen_RW\" -GroupScope DomainLocal -GroupCategory Security -Path $path\nAdd-ADGroupMember \"GG_Finanzen\" -Members \"lena.weber\"\nAdd-ADGroupMember \"DL_Finanzen_RW\" -Members \"GG_Finanzen\"\nGet-ADGroupMember \"DL_Finanzen_RW\" -Recursive",
          "expect": "پرس‌وجوی بازگشتی Lena را نشان می‌دهد و Tom را نه. پس از تغییر گروه‌ها، کاربر برای تازه شدن Token از حساب خارج و دوباره وارد شود."
        },
        {
          "title": "آزمون با حساب عادی",
          "html": "<p>روی CL01 خارج شو، Other user را انتخاب کن و با <code>CORP\\lena.weber</code> وارد شو. گذرواژهٔ اولیه را تغییر بده و <code>whoami /groups</code> را بررسی کن. حساب کاربری عادی نباید دسترسی مدیریت داشته باشد؛ برای مدیریت از حساب جدا استفاده کن. Domain Admin نقش روزمرهٔ کارکنان نیست.</p>"
        }
      ],
      "quiz": [
        {
          "q": "در AGDLP مجوز فایل به کدام گروه داده می‌شود؟",
          "options": [
            "مستقیماً به تک‌تک کاربران",
            "گروه سراسری واحد سازمانی",
            "گروه محلی دامنه برای منبع"
          ],
          "answer": 2,
          "explain": "حساب‌ها از طریق گروه‌های سراسری عضو گروه محلی دامنه می‌شوند و مجوز به همین گروه داده می‌شود."
        },
        {
          "q": "پس از تغییر عضویت گروه، Lena معمولاً چه باید بکند؟",
          "options": [
            "خروج و ورود دوباره",
            "نصب دوبارهٔ DC",
            "تغییر IP ثابت"
          ],
          "answer": 0,
          "explain": "در ورود جدید، Token دسترسی با گروه‌های فعلی ساخته می‌شود."
        }
      ]
    },
    {
      "id": "access",
      "title": "پیاده‌سازی دسترسی و سیاست‌ها",
      "short": "اشتراک فایل، مجوز NTFS و اولین GPO",
      "phase": "۰۳ · کار روزمرهٔ ادمین",
      "minutes": 75,
      "where": "SRV01، DC01 و CL01",
      "goal": "Lena می‌تواند فایل مالی را تغییر دهد و Tom نمی‌تواند؛ GPO محدود فقط روی رایانه‌های آزمایشگاه اعمال می‌شود.",
      "sources": [
        "smb",
        "groups",
        "gpo"
      ],
      "tasks": [
        "اشتراک \\\\SRV01\\Finanzen وجود دارد؛ DL_Finanzen_RW در Share مجوز Change و در NTFS مجوز Modify دارد.",
        "Lena پس از ورود مجدد روی CL01 می‌تواند در اشتراک فایل بسازد و ویرایش کند.",
        "Tom برای همان اشتراک خطای Access denied می‌گیرد و عضو گروه مالی نیست.",
        "GPO با نام LAB-LogonBanner به Lab/Computer متصل است؛ CL01 پیام ورود را نشان می‌دهد و gpresult اعمال شدن GPO را تأیید می‌کند."
      ],
      "steps": [
        {
          "title": "ساخت پوشه و مجوزهای NTFS",
          "html": "<p>روی <b>SRV01</b> با CORP\\Administrator یک پوشهٔ آزمایشی جدید بساز. این فرمان‌ها فقط برای همین پوشهٔ خالی‌اند. مجوزهای ارث‌بری حذف می‌شوند و به SYSTEM و مدیران محلی Full Control و به گروه منبع Modify داده می‌شود. استفاده از SID وابستگی به زبان نام حساب‌ها را کم می‌کند.</p>",
          "code": "New-Item -Path \"C:\\LabShares\\Finanzen\" -ItemType Directory -Force\nicacls \"C:\\LabShares\\Finanzen\" /inheritance:r\nicacls \"C:\\LabShares\\Finanzen\" /grant:r \"*S-1-5-18:(OI)(CI)F\" \"*S-1-5-32-544:(OI)(CI)F\" \"CORP\\DL_Finanzen_RW:(OI)(CI)M\"\nicacls \"C:\\LabShares\\Finanzen\"",
          "expect": "فقط مجوزهای صریح مورد نظر باقی مانده‌اند. پیش از اجرا مسیر پوشه را کنترل کن."
        },
        {
          "title": "ساخت اشتراک SMB",
          "html": "<p>روی <b>SRV01</b> پوشه را به اشتراک بگذار. مجوزهای Share و NTFS با هم اثر دارند و محدودیت بیشتر نتیجه را تعیین می‌کند. اگر TCP 445 مسدود بود، در <code>wf.msc</code> قوانین ورودی File and Printer Sharing را فقط برای پروفایل Domain فعال کن.</p>",
          "code": "New-SmbShare -Name \"Finanzen\" -Path \"C:\\LabShares\\Finanzen\" -ChangeAccess \"CORP\\DL_Finanzen_RW\"\nGet-SmbShareAccess -Name \"Finanzen\"",
          "expect": "DL_Finanzen_RW مجوز Change دارد. دسترسی کلی Everyone/Full Control اضافه نکن."
        },
        {
          "title": "آزمون مجاز و غیرمجاز",
          "html": "<p>روی CL01 تازه با Lena وارد شو. در Explorer مسیر <code>\\\\SRV01\\Finanzen</code> را باز کن و <code>test-lena.txt</code> را بساز، تغییر بده و بخوان. سپس خارج شو و با Tom امتحان کن؛ دسترسی باید رد شود. این آزمون را در نشست قبلی مدیر انجام نده. در خطای اتصال، ابتدا <code>Test-NetConnection SRV01 -Port 445</code>، سپس DNS و دو لایهٔ مجوز را بررسی کن.</p>"
        },
        {
          "title": "اعمال یک GPO محدود",
          "html": "<p>روی <b>DC01</b> ابزار <code>gpmc.msc</code> را باز کن. روی <b>Lab/Computer</b> گزینهٔ Create a GPO in this domain, and Link it here را بزن و نام <code>LAB-LogonBanner</code> بده. مسیر ویرایش: Computer Configuration، Policies، Windows Settings، Security Settings، Local Policies و Security Options. عنوان Interactive logon: Message title را <b>ServerLab</b> و متن پیام را <b>فقط برای یادگیری</b> قرار بده. فیلتر Authenticated Users را برای این تمرین نگه دار.</p>",
          "code": "# CL01 - Run as administrator\ngpupdate /force\ngpresult /r /scope computer",
          "expect": "LAB-LogonBanner در فهرست GPOهای رایانه ظاهر می‌شود و در ورود بعدی پیام دیده می‌شود. برای این تمرین Default Domain Policy تغییر نمی‌کند."
        }
      ],
      "quiz": [
        {
          "q": "اگر Share اجازهٔ Change و NTFS فقط Read بدهد، دسترسی مؤثر از طریق SMB چیست؟",
          "options": [
            "Full Control",
            "Change",
            "Read"
          ],
          "answer": 2,
          "explain": "هر دو لایه اعمال می‌شوند؛ در این حالت NTFS دسترسی را به خواندن محدود می‌کند."
        },
        {
          "q": "GPO این دو رایانهٔ عضو به کجا متصل می‌شود؟",
          "options": [
            "OU با نام Lab/Computer",
            "Domain Controllers",
            "شیء کاربر Lena"
          ],
          "answer": 0,
          "explain": "CL01 و SRV01 در این OU هستند؛ DC خارج از محدودهٔ این GPO آزمایشی است."
        }
      ]
    },
    {
      "id": "operations",
      "title": "رفع خرابی و تمرین عملیات",
      "short": "پشتیبانی، قطع دسترسی و تحویل کار",
      "phase": "۰۳ · کار روزمرهٔ ادمین",
      "minutes": 60,
      "where": "تمام آزمایشگاه",
      "goal": "یک خرابی عمدی DNS را حل می‌کنی، حساب فرد خارج‌شده را می‌بندی و گزارش قابل پیگیری می‌نویسی.",
      "sources": [
        "dcdiag",
        "user",
        "dns",
        "dhcp"
      ],
      "tasks": [
        "DNS اشتباه کلاینت را ایجاد، تشخیص و به دریافت خودکار برگردانده‌ام؛ حل نام و Secure Channel دوباره درست‌اند.",
        "در سناریوی خروج کارمند، Lena غیرفعال و از GG_Finanzen حذف شده است؛ ورود آنلاین جدید او به CL01 شکست می‌خورد.",
        "وضعیت DC، DNS و DHCP، نتیجهٔ GPO و آزمون دسترسی مجاز و غیرمجاز را در گزارش تحویل ثبت کرده‌ام.",
        "محدودیت‌های مرحلهٔ پایه را نوشته‌ام: یک DC، بدون آزمون بازیابی و بدون دسترس‌پذیری بالا؛ برنامهٔ گسترش بعدی روشن است."
      ],
      "steps": [
        {
          "title": "ایجاد و رفع یک خطای مشخص",
          "html": "<p>روی CL01، DNS ترجیحی را موقتاً به نشانی استفاده‌نشدهٔ <code>10.20.0.254</code> تغییر بده و وضعیت اولیه را یادداشت کن. Cache را پاک کن و پرس‌وجوی مشخص اجرا کن. خطا را مشاهده کن. سپس DNS را دوباره خودکار کن و Lease را تازه کن. فایروال Windows را خاموش نکن.</p>",
          "code": "# CL01: after setting the incorrect DNS\nipconfig /flushdns\nResolve-DnsName dc01.corp.example.test -Server 10.20.0.254\n# After restoring automatic DNS\nipconfig /renew\nResolve-DnsName dc01.corp.example.test\nTest-ComputerSecureChannel",
          "expect": "پرس‌وجوی مستقیم از 10.20.0.254 شکست می‌خورد؛ پس از تعمیر، نام DC01 به 10.20.0.10 می‌رسد و SecureChannel برابر True است. ورود Cacheشده به‌تنهایی دسترسی به DC را ثابت نمی‌کند."
        },
        {
          "title": "قطع دسترسی کارمند خارج‌شده",
          "html": "<p>پس از آزمون دسترسی بخش ۷، روی DC01 حساب Lena را غیرفعال و از گروه واحد مالی حذف کن. این یک تغییر برنامه‌ریزی‌شدهٔ آزمایشگاهی است. روی CL01 کامل از نشست Lena خارج شو و با DC روشن و در دسترس، ورود آنلاین تازه را امتحان کن. غیرفعال کردن حساب، نشست‌ها و Tokenهای موجود را فوراً از بین نمی‌برد.</p>",
          "code": "Disable-ADAccount -Identity \"lena.weber\"\nRemove-ADGroupMember \"GG_Finanzen\" -Members \"lena.weber\" -Confirm:$true\nGet-ADUser \"lena.weber\" | Select-Object SamAccountName,Enabled\nGet-ADGroupMember \"GG_Finanzen\"",
          "expect": "Enabled = False است و Lena دیگر در GG_Finanzen نیست. در شرکت، بستن نشست‌ها، تحویل داده‌ها و بررسی سامانه‌های دیگر هم بخشی از قطع دسترسی است."
        },
        {
          "title": "ثبت نتیجه و تحویل",
          "html": "<p>روی DC01 فرمان <code>dcdiag /test:dns</code>، روی SRV01 وضعیت Scope و Lease و روی CL01، DNS و GPO رایانه را بررسی کن. نشانه، علت، تغییر، نتیجهٔ آزمون و روش بازگشت را بنویس. سپس سراغ مأموریت‌های عملی برو و بدون راهنمای گام‌به‌گام کار کن.</p><p>برای تکرار آزمون Lena، ابتدا <code>Enable-ADAccount lena.weber</code> و سپس <code>Add-ADGroupMember GG_Finanzen -Members lena.weber</code> را اجرا کن و دوباره وارد شو. گذرواژه را در یادداشت آزمایشگاه ثبت نکن.</p>"
        },
        {
          "title": "آماده شدن برای مرحلهٔ سازمانی",
          "html": "<p>شش بخش بعدی را به‌ترتیب برای PowerShell، DC دوم، تفویض اختیار، بازیابی، پایش و مدیریت تغییر انجام بده. Snapshot نقطهٔ بازگشت محلی است و جای پشتیبان مستقل را نمی‌گیرد. یک DC را بی‌برنامه به Snapshot قدیمی برنگردان. برای شروع کامل از صفر، همهٔ VMها را خاموش کن و همه را به وضعیت پیش از دامنه برگردان یا دوباره نصب کن. بازیابی تخصصی AD هدفی جداست.</p>"
        }
      ],
      "quiz": [
        {
          "q": "آیا ورود موفق با اطلاعات Cacheشده، دسترسی به DNS و DC را ثابت می‌کند؟",
          "options": [
            "بله، همیشه",
            "خیر",
            "فقط اگر IP کلاینت ثابت باشد"
          ],
          "answer": 1,
          "explain": "Windows می‌تواند ورود Cacheشده انجام دهد؛ حل نام و Secure Channel باید جداگانه بررسی شوند."
        },
        {
          "q": "پس از غیرفعال شدن یک حساب چه نکته‌ای مهم است؟",
          "options": [
            "همهٔ نشست‌ها فوراً بسته می‌شوند",
            "نشست‌ها و Tokenهای قبلی ممکن است باقی بمانند",
            "گروه‌ها خودکار حذف می‌شوند"
          ],
          "answer": 1,
          "explain": "قطع دسترسی فقط Disable-ADAccount نیست؛ نشست‌های فعال و سامانه‌های دیگر هم باید بررسی شوند."
        }
      ]
    }
  ],
  "tickets": [
    {
      "id": "onboard",
      "title": "یک همکار جدید به واحد مالی می‌پیوندد",
      "tag": "مأموریت ۰۱ · هویت و دسترسی",
      "module": 5,
      "brief": "طبق الگوی Lena، حساب آزمایشی Mira Sommer با نام mira.sommer را برای واحد مالی بساز. ابتدا بدون راهنما کار کن.",
      "checks": [
        "حساب در Lab/Benutzer، فعال و ملزم به تغییر گذرواژه در ورود است.",
        "عضویت از مسیر GG_Finanzen و سپس DL_Finanzen_RW برقرار است و دسترسی مدیریت ندارد.",
        "Mira روی CL01 در \\\\SRV01\\Finanzen فایل می‌سازد؛ Tom نمی‌تواند."
      ],
      "hint": "از New-ADUser، Add-ADGroupMember و یک ورود تازه استفاده کن؛ سپس هر دو لایهٔ مجوز را بررسی کن."
    },
    {
      "id": "outage",
      "title": "«به پوشهٔ مشترک دسترسی ندارم»",
      "tag": "مأموریت ۰۲ · عیب‌یابی",
      "module": 7,
      "brief": "روی CL01 خطای DNS بخش ۸ را ایجاد کن. خرابی را مرحله‌به‌مرحله بررسی و تشخیص و تعمیر را ثبت کن.",
      "checks": [
        "نشانه را با پرس‌وجوی مستقیم DNS بازتولید کرده‌ای.",
        "IP و DNS، سرویس DNS و TCP 445 را به‌ترتیب منطقی بررسی کرده‌ای.",
        "پس از بازگشت: نام حل می‌شود، Secure Channel برابر True است و کاربر مجاز به اشتراک دسترسی دارد."
      ],
      "hint": "اتصال IP جای حل نام را نمی‌گیرد. پس از بخش ۸ برای آزمون از Mira استفاده کن یا Lena را کنترل‌شده فعال کن."
    },
    {
      "id": "dhcpcheck",
      "title": "یک کلاینت به Lease ثابت نیاز دارد",
      "tag": "مأموریت ۰۳ · شبکه",
      "module": 4,
      "brief": "در Scope موجود برای CL01 نشانی 10.20.0.150 را رزرو کن، بدون اینکه IP کلاینت را دستی ثابت کنی.",
      "checks": [
        "نشانی MAC ماشین CL01 را با ipconfig /all پیدا کرده‌ای.",
        "در کنسول DHCP، زیر LAB-Clients و Reservations، نشانی 10.20.0.150 را برای آن MAC رزرو کرده‌ای و قبلاً آزاد بودنش را بررسی کرده‌ای.",
        "پس از release/renew، کلاینت 10.20.0.150 دارد؛ DHCP برابر 10.20.0.20 و DNS پایه برابر 10.20.0.10 است و رزرو دیده می‌شود."
      ],
      "hint": "روی SRV01 مسیر Tools، DHCP، IPv4، Scope، Reservations و New Reservation را باز کن. نشانی رزروشده را به ماشین دیگری نده."
    }
  ],
  "glossary": [
    [
      "اکتیو دایرکتوری · AD DS",
      "سرویس مرکزی کاربران، گروه‌ها و رایانه‌ها که روی Domain Controller اجرا می‌شود. DNS داخلی و زمان صحیح از پیش‌نیازهای آن‌اند.",
      "ad"
    ],
    [
      "رکوردهای A، PTR و SRV",
      "A نام را به IPv4، رکورد PTR نشانی را از طریق Zone معکوس به نام و SRV سرویس را به میزبان و پورت آن مرتبط می‌کند.",
      "dns"
    ],
    [
      "الگوی AGDLP",
      "حساب‌ها ← گروه سراسری ← گروه محلی دامنه ← مجوز. نمونهٔ فنی این آزمایشگاه: Lena عضو GG_Finanzen، این گروه عضو DL_Finanzen_RW و مجوز NTFS/Share روی گروه دوم است.",
      "groups"
    ],
    [
      "DHCP و فرایند DORA",
      "مراحل Discover، Offer، Request و Acknowledge در دریافت نخستین Lease رخ می‌دهند. Scope بازهٔ نشانی، Lease واگذاری زمان‌دار و Reservation رزرو برای کلاینت مشخص است.",
      "dhcp"
    ],
    [
      "گزینه‌های DHCP: 003، 006 و 015",
      "گزینهٔ 003 روتر، 006 سرور DNS و 015 پسوند دامنهٔ DNS است. در حالت پایه: بدون 003، نشانی 10.20.0.10 برای 006 و corp.example.test برای 015؛ پس از DC02، نشانی 10.20.0.11 نیز اضافه می‌شود.",
      "dhcp"
    ],
    [
      "دامنه و جنگل · Domain / Forest",
      "دامنه هویت‌های مرتبط را مدیریت می‌کند. جنگل یک یا چند دامنه با ساختار مشترک AD را در بر می‌گیرد. این آزمایشگاه از هرکدام یک نمونه دارد.",
      "ad"
    ],
    [
      "سیاست گروهی · GPO",
      "پیکربندی متمرکز رایانه و کاربر. محل اتصال به OU همراه فیلترها محدودهٔ اعمال را تعیین می‌کند. gpresult نتیجهٔ اعمال سیاست را نشان می‌دهد.",
      "gpo"
    ],
    [
      "NAT، شبکهٔ داخلی و Bridged",
      "NAT در آماده‌سازی اولیه اینترنت می‌دهد؛ Internal Network فقط VMهای با نام شبکهٔ یکسان را متصل می‌کند. Bridged ماشین را به شبکهٔ فیزیکی می‌برد و در این مسیر استفاده نمی‌شود.",
      "network"
    ],
    [
      "OU و گروه امنیتی",
      "OU اشیای AD را سازمان‌دهی می‌کند و محل اتصال GPO و تفویض اختیار است. گروه امنیتی مبنای تخصیص مجوز است. قرار گرفتن در OU به‌تنهایی مجوز فایل نمی‌دهد.",
      "groups"
    ],
    [
      "مجوزهای Share و NTFS",
      "در دسترسی SMB هر دو لایه اثر دارند و محدودیت بیشتر تعیین‌کننده است. همیشه با حساب عادی، هم دسترسی مجاز و هم رد دسترسی را آزمایش کن.",
      "smb"
    ],
    [
      "Snapshot و پشتیبان",
      "Snapshot به فایل‌های VM وابسته است. پشتیبان مستقل باید روش بازیابی آزموده‌شده داشته باشد. DCهای AD را بدون برنامه به Snapshot قدیمی برنگردان.",
      "ad"
    ],
    [
      "فرمان‌های سریع عیب‌یابی",
      "ipconfig /all برای IP و DNS و DHCP؛ Resolve-DnsName برای حل نام؛ Test-NetConnection -Port برای TCP؛ Test-ComputerSecureChannel روی اعضای دامنه؛ dcdiag برای DC و gpresult /r برای سیاست‌ها.",
      "dcdiag"
    ]
  ]
};
