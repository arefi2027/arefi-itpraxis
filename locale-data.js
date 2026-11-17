window.LAB.locales={
  "en": {
    "start": {
      "title": "Build the virtual lab",
      "goal": "Prepare an isolated three-VM environment on your 64 GB host.",
      "short": "VirtualBox, ISO files and resource plan",
      "steps": [
        {
          "title": "Check the host",
          "html": "<p>Use an x64 CPU supported by Windows Server, enable VT-x/AMD-V in UEFI and install a supported VirtualBox release. Allow roughly 300 GB free SSD space initially; expansion and backups require more. This x64 plan is not a direct ARM-host recipe.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Download official ISOs",
          "html": "<p>Obtain Windows Server 2025 and Windows 11 Enterprise from Microsoft Evaluation Center. Choose Standard Evaluation (Desktop Experience) for the servers. A licensed Windows 11 Pro also works; Home cannot join AD. Record expiry and activation requirements. Use NAT for initial updates and activation.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Create three VMs",
          "html": "<p>Create DC01 (6 GB), SRV01 (4 GB) and CL01 (6 GB), each with 2 vCPUs and an 80 GB dynamically allocated SATA VDI. Skip Unattended Installation. Install each OS separately. Configure Windows 11 guest EFI, Secure Boot and virtual TPM 2.0 as required. Initially use one connected NAT adapter per VM.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Plan network isolation",
          "html": "<p>After installation and updates, shut down every VM and change its single adapter to Internal Network: LAB-CORP. Use exactly the same name. Do not bridge the lab or add a second NAT adapter to a DC. This initial network has no gateway, internet or VirtualBox DHCP server; SRV01 will provide DHCP later.</p>",
          "code": "VBoxManage list dhcpservers",
          "label": "Host · terminal with VirtualBox in PATH",
          "expect": "LAB-CORP has no active VirtualBox DHCP server. Do not change other VirtualBox networks."
        }
      ],
      "tasks": [
        "VirtualBox starts; CPU requirements and hardware virtualization are checked.",
        "Official server/client ISOs, editions and evaluation expiry dates are documented.",
        "DC01/SRV01/CL01 have 6/4/6 GB RAM, 2 vCPUs and 80 GB dynamic disks.",
        "I can explain initial NAT and the later isolated LAB-CORP network."
      ],
      "quiz": [
        {
          "q": "Which mode connects only the lab VMs to each other?",
          "options": [
            "Bridged Adapter",
            "Internal Network LAB-CORP",
            "Separate NAT per VM"
          ],
          "answer": 1,
          "explain": "An Internal Network joins VMs with the same network name without bridging the physical LAN."
        },
        {
          "q": "How much RAM does the base plan allocate?",
          "options": [
            "16 GB",
            "48 GB",
            "64 GB"
          ],
          "answer": 0,
          "explain": "6 + 4 + 6 = 16 GB; the remaining memory is available to the host and extensions."
        }
      ]
    },
    "install": {
      "title": "Install Windows Server",
      "goal": "Install, update, name and address the three machines.",
      "short": "Installation, updates and static IP addresses",
      "steps": [
        {
          "title": "Install and update",
          "html": "<p>Boot DC01 from the server ISO. Choose the language, then Install now, <b>Standard Evaluation (Desktop Experience)</b> and a Custom installation on the empty 80 GB virtual disk. Confirm only this VM's disk. Set a strong local Administrator password. Repeat for SRV01, then install CL01 from the client ISO with the normal setup.</p><p>Use NAT for first setup, activation and Windows Update. Install Guest Additions from the Devices menu if needed and restart until all updates are done. Check server activation with <code>slmgr /xpr</code>. On CL01, install <b>RSAT: Active Directory Domain Services and Lightweight Directory Services Tools</b> from Optional features before you disconnect the internet; you need it for the delegation exercise. Note the evaluation periods; do not store passwords here.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Name and baseline",
          "html": "<p>Run elevated Windows PowerShell to rename each VM correctly; the example targets DC01. Restart, detach ISO, shut down completely and take snapshot 01-baseline before creating the domain. Switch all adapters to LAB-CORP, then start the machines.</p>",
          "code": "Rename-Computer -NewName \"DC01\" -Restart",
          "label": null,
          "expect": "hostname on each VM shows that machine's name. The snapshot still holds the state before the domain was created."
        },
        {
          "title": "Set static IPv4",
          "html": "<p>In ncpa.cpl → Ethernet → Properties → IPv4 use DC01 10.20.0.10/24, SRV01 .20/24 and temporarily CL01 .50/24. DNS is 10.20.0.10 on all three; leave gateway and alternate DNS empty. Keep IPv6 and Windows Firewall enabled. DNS itself will be installed later. Check the clocks.</p>",
          "code": "hostname\nGet-NetAdapter\nGet-NetIPConfiguration\nGet-Date",
          "label": null,
          "expect": "Each VM has one active adapter with correct IPv4 and DNS and no gateway; date and time match across machines."
        },
        {
          "title": "Check connectivity",
          "html": "<p>Verify hostname, Get-NetIPConfiguration, Cable Connected and identical LAB-CORP names. Ping can be blocked by the firewall; no reply alone does not prove a broken network. Test service ports when the services exist. No internet is expected at this stage.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Server Desktop Experience and Windows 11 Pro/Enterprise run; activation and updates are checked.",
        "All VMs use only LAB-CORP; snapshot 01-baseline was taken after shutdown.",
        "IPs are .10/.20/.50 with /24; no default gateway is configured.",
        "All VMs have unique names and DNS 10.20.0.10."
      ],
      "quiz": [
        {
          "q": "Which installation includes the GUI used in this lab?",
          "options": [
            "Server Core",
            "Desktop Experience",
            "Only a VHD file"
          ],
          "answer": 1,
          "explain": "Desktop Experience includes the GUI; learn Core as a later extension."
        },
        {
          "q": "Which gateway belongs in the initial isolated network?",
          "options": [
            "10.20.0.1 without a router",
            "The home router",
            "None"
          ],
          "answer": 2,
          "explain": "There is no router yet; a made-up address cannot provide internet."
        }
      ]
    },
    "ad": {
      "title": "Create the first AD domain",
      "goal": "Build corp.example.test and verify the directory services.",
      "short": "AD DS, DNS and the first domain controller",
      "steps": [
        {
          "title": "Check before promotion",
          "html": "<p>This lab uses one forest and one domain named corp.example.test, initially with one DC. Verify DC01: static 10.20.0.10, DNS pointing to itself, correct time and no pending restart. The reserved .test name is for the lab only.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Install AD DS",
          "html": "<p>Use Server Manager → Manage → Add Roles and Features → Role-based → Active Directory Domain Services, including management tools, or run the command elevated on DC01. Installing the role alone does not create a domain controller.</p>",
          "code": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools",
          "label": null,
          "expect": "Success = True. Installing the role alone does not make DC01 a domain controller."
        },
        {
          "title": "Create the forest",
          "html": "<p>Select Promote this server to a domain controller → Add a new forest: corp.example.test. Enable DNS and Global Catalog, use NetBIOS CORP and default paths. Enter a separate DSRM password securely. Review prerequisite checks before restart. An upstream DNS delegation warning is expected in this isolated scenario, not every other error.</p>",
          "code": "Install-ADDSForest -DomainName \"corp.example.test\" -DomainNetbiosName \"CORP\" -InstallDNS",
          "label": null,
          "expect": "A delegation warning is expected in an isolated test domain without upstream DNS; investigate any other error before you continue."
        },
        {
          "title": "Verify AD",
          "html": "<p>Sign in as CORP\\Administrator. Verify domain name, NTDS/DNS running, SYSVOL/NETLOGON shares and AD DNS diagnostics. External name resolution is not a requirement without internet. A second DC and an independent backup address different needs.</p>",
          "code": "Get-ADDomain | Select-Object DNSRoot,NetBIOSName\nGet-Service NTDS,DNS\nnet share\ndcdiag /test:dns",
          "label": null,
          "expect": "corp.example.test and CORP are shown; the services are Running and SYSVOL and NETLOGON exist. Investigate AD DNS errors instead of dismissing all warnings at once."
        }
      ],
      "tasks": [
        "Get-ADDomain returns corp.example.test and CORP.",
        "NTDS and DNS are Running.",
        "SYSVOL and NETLOGON exist; AD-related DNS errors are resolved.",
        "Domain sign-in works; the DSRM password is stored securely outside the site."
      ],
      "quiz": [
        {
          "q": "What does installing AD DS alone do?",
          "options": [
            "Automatically creates the domain",
            "Installs components; promotion is separate",
            "Joins every client"
          ],
          "answer": 1,
          "explain": "Promotion creates the forest or adds the DC to an existing domain."
        },
        {
          "q": "What is the DSRM password for?",
          "options": [
            "Directory Services Restore Mode",
            "Wi-Fi access",
            "Everyday sign-in for all users"
          ],
          "answer": 0,
          "explain": "DSRM is used in domain-controller recovery procedures."
        }
      ]
    },
    "dns": {
      "title": "Understand and verify DNS",
      "goal": "Verify A, PTR and SRV records using the internal DNS server.",
      "short": "Zones, A and PTR records and service lookup",
      "steps": [
        {
          "title": "Inspect existing zones",
          "html": "<p>Open Server Manager → Tools → DNS. Inspect corp.example.test and AD service records. A maps a host to IPv4; SRV identifies services. Query DC01 and the LDAP SRV record directly against 10.20.0.10; expect DC01 and port 389.</p>",
          "code": "Resolve-DnsName dc01.corp.example.test -Server 10.20.0.10\nResolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.corp.example.test -Server 10.20.0.10",
          "label": null,
          "expect": "DC01 resolves to 10.20.0.10. The SRV answer contains dc01.corp.example.test and port 389."
        },
        {
          "title": "Add the server record",
          "html": "<p>On DC01 create the A record srv01 → 10.20.0.20. Check before creating duplicates. The hostname srv01 is not a record of type SRV. Query it directly against the internal DNS server.</p>",
          "code": "Add-DnsServerResourceRecordA -Name \"srv01\" -ZoneName \"corp.example.test\" -IPv4Address \"10.20.0.20\"\nResolve-DnsName srv01.corp.example.test -Server 10.20.0.10",
          "label": null,
          "expect": "The answer is 10.20.0.20. When you repeat the exercise, check for an existing record instead of creating a duplicate."
        },
        {
          "title": "Create reverse lookup",
          "html": "<p>Create an AD-integrated IPv4 reverse zone for network ID 10.20.0 (/24), then add the PTR for SRV01. Query 10.20.0.20 and expect srv01.corp.example.test. A and PTR are separate records; one does not prove the other.</p>",
          "code": "Add-DnsServerPrimaryZone -NetworkId \"10.20.0.0/24\" -ReplicationScope Domain\nAdd-DnsServerResourceRecordPtr -Name \"20\" -ZoneName \"0.20.10.in-addr.arpa\" -PtrDomainName \"srv01.corp.example.test\"\nResolve-DnsName 10.20.0.20 -Server 10.20.0.10",
          "label": null,
          "expect": "The name srv01.corp.example.test is returned. A and PTR are separate records; one does not prove the other."
        },
        {
          "title": "Troubleshoot in order",
          "html": "<p>Check client IP/DNS, connectivity to DNS, service, zone, record and cache. Test-NetConnection -Port 53 tests TCP only; an actual DNS query verifies resolution. Do not configure public DNS as an alternate on domain members. Forwarders are a later design topic.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "DC01 resolves to 10.20.0.10 through 10.20.0.10.",
        "The srv01 A record points to 10.20.0.20.",
        "Reverse lookup of .20 returns srv01.corp.example.test.",
        "The LDAP SRV query returns DC01 and port 389."
      ],
      "quiz": [
        {
          "q": "Which record helps locate a domain controller?",
          "options": [
            "Only PTR",
            "SRV",
            "MX"
          ],
          "answer": 1,
          "explain": "AD publishes service locations such as LDAP through SRV records."
        },
        {
          "q": "Which DNS should domain members use here?",
          "options": [
            "8.8.8.8 as alternate",
            "Home router",
            "10.20.0.10"
          ],
          "answer": 2,
          "explain": "The internal DNS knows the private AD zones; public resolvers do not."
        }
      ]
    },
    "dhcp": {
      "title": "Join clients and deploy DHCP",
      "goal": "Join SRV01 and CL01, then deliver correct leases and DNS settings.",
      "short": "Domain join, scope, options and leases",
      "steps": [
        {
          "title": "Join the domain",
          "html": "<p>Keep DC01 running. With static SRV01 .20 and temporary CL01 .50, both using DNS .10, run the join command first on SRV01, then CL01, as local administrator. Enter CORP\\Administrator only in the credential prompt. Restart and test the secure channel. Check DNS/time if it fails.</p>",
          "code": "Add-Computer -DomainName \"corp.example.test\" -Credential (Get-Credential) -Restart",
          "label": null,
          "expect": "After the restart, Test-ComputerSecureChannel returns True. If it fails, check DNS and time first."
        },
        {
          "title": "Install and authorize DHCP",
          "html": "<p>Run the commands elevated on SRV01 as CORP\\Administrator in this lab. Install DHCP and management tools, authorize SRV01 in AD, then refresh the DHCP console if authorization takes time. Production permissions should be delegated by role.</p>",
          "code": "Install-WindowsFeature DHCP -IncludeManagementTools\nAdd-DhcpServerSecurityGroup\nRestart-Service DHCPServer\nAdd-DhcpServerInDC -DnsName \"srv01.corp.example.test\" -IPAddress 10.20.0.20\nGet-DhcpServerInDC",
          "label": null,
          "expect": "SRV01 is authorized. If it takes a moment, wait briefly and refresh the DHCP console."
        },
        {
          "title": "Configure scope and options",
          "html": "<p>Create the active 10.20.0.100–199 scope outside the static-server addresses. Set option 006 to 10.20.0.10 and 015 to corp.example.test. Do not set option 003 before a router exists. VirtualBox DHCP must remain disabled on LAB-CORP.</p>",
          "code": "Add-DhcpServerv4Scope -Name \"LAB-Clients\" -StartRange 10.20.0.100 -EndRange 10.20.0.199 -SubnetMask 255.255.255.0 -State Active\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -DnsServer 10.20.0.10 -DnsDomain \"corp.example.test\"\nGet-DhcpServerv4Scope\nGet-DhcpServerv4OptionValue -ScopeId 10.20.0.0",
          "label": null,
          "expect": "The scope is Active; option 006 is 10.20.0.10, option 015 is corp.example.test and option 003 is absent."
        },
        {
          "title": "Enable automatic client settings",
          "html": "<p>On CL01 select automatic IPv4 and DNS, release/renew and inspect ipconfig /all. Run the lease inspection separately on SRV01. Expect client .100–199, DHCP .20, DNS .10. A 169.254 address suggests checking scope, authorization, service and virtual network.</p>",
          "code": "# CL01\nipconfig /release\nipconfig /renew\nipconfig /all\n# SRV01\nGet-DhcpServerv4Lease -ScopeId 10.20.0.0",
          "label": null,
          "expect": "The client IP is between 10.20.0.100 and 10.20.0.199; DHCP is 10.20.0.20, DNS is 10.20.0.10 and the matching lease is visible."
        }
      ],
      "tasks": [
        "SRV01 and CL01 are domain members with a healthy secure channel.",
        "SRV01 at 10.20.0.20 is authorized in AD as a DHCP server.",
        "The scope is active, with DNS .10, suffix corp.example.test and no premature gateway option.",
        "CL01 receives a valid lease; client output matches the lease on SRV01."
      ],
      "quiz": [
        {
          "q": "Why authorize DHCP in AD?",
          "options": [
            "To control authorized DHCP servers in the domain",
            "To add internet",
            "To disable DNS"
          ],
          "answer": 0,
          "explain": "Authorization is separate from installing and activating a scope."
        },
        {
          "q": "What does a 169.254.x.x address usually suggest here?",
          "options": [
            "A successful domain backup",
            "No usable DHCP lease was received",
            "Correct static server configuration"
          ],
          "answer": 1,
          "explain": "Inspect DHCP reachability, scope, service and authorization before changing unrelated settings."
        }
      ]
    },
    "identities": {
      "title": "Users, OUs and groups",
      "goal": "Create identities and organize their responsibilities.",
      "short": "OUs, onboarding a new colleague and AGDLP access",
      "steps": [
        {
          "title": "Create the OU structure",
          "html": "<p>An OU organizes objects, delegation and GPO links; it does not itself grant file access. In dsa.msc or elevated PowerShell on DC01 create Lab with Benutzer (users), Gruppen (groups) and Computer. Keep the exact names for command compatibility. Move only SRV01 and CL01 to Lab/Computer; leave DC01 in Domain Controllers.</p>",
          "code": "New-ADOrganizationalUnit -Name \"Lab\" -Path \"DC=corp,DC=example,DC=test\"\n$base = \"OU=Lab,DC=corp,DC=example,DC=test\"\n\"Benutzer\",\"Gruppen\",\"Computer\" | ForEach-Object {\n  New-ADOrganizationalUnit -Name $_ -Path $base\n}",
          "label": null,
          "expect": "Four OUs are visible. In Active Directory Users and Computers, move SRV01 and CL01 from Computers to Lab/Computer. Do not move DC01."
        },
        {
          "title": "Create test users",
          "html": "<p>Create the named test accounts in Lab/Benutzer. Enter initial passwords securely, require a change at first sign-in and record only non-secret account information. Verify the distinguished names and enabled state.</p>",
          "code": "$pw = Read-Host \"Temporary password for Lena\" -AsSecureString\nNew-ADUser -Name \"Lena Weber\" -SamAccountName \"lena.weber\" -UserPrincipalName \"lena.weber@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true\n$pw = Read-Host \"Temporary password for Tom\" -AsSecureString\nNew-ADUser -Name \"Tom Klein\" -SamAccountName \"tom.klein\" -UserPrincipalName \"tom.klein@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true",
          "label": null,
          "expect": "Get-ADUser lena.weber shows Enabled = True and both accounts exist in the OU named Benutzer."
        },
        {
          "title": "Build AGDLP groups",
          "html": "<p>Accounts → Global group → Domain Local group → Permissions. Put Lena in GG_Finanzen, then nest that group in DL_Finanzen_RW. The resource group receives file permissions in the next lesson. Finanzen means Finance.</p>",
          "code": "$path = \"OU=Gruppen,OU=Lab,DC=corp,DC=example,DC=test\"\nNew-ADGroup -Name \"GG_Finanzen\" -GroupScope Global -GroupCategory Security -Path $path\nNew-ADGroup -Name \"DL_Finanzen_RW\" -GroupScope DomainLocal -GroupCategory Security -Path $path\nAdd-ADGroupMember \"GG_Finanzen\" -Members \"lena.weber\"\nAdd-ADGroupMember \"DL_Finanzen_RW\" -Members \"GG_Finanzen\"\nGet-ADGroupMember \"DL_Finanzen_RW\" -Recursive",
          "label": null,
          "expect": "The recursive query shows Lena but not Tom. After group changes, the user signs out and in again to refresh the token."
        },
        {
          "title": "Verify actual sign-in",
          "html": "<p>Sign in to CL01 using the test domain user and confirm identity with whoami. After changing group membership, sign out and back in for a fresh token. Document creation, group assignment and a controlled account-disable procedure.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Lab/Benutzer/Gruppen/Computer exist; SRV01 and CL01 are in Lab/Computer while DC01 stays in Domain Controllers.",
        "lena.weber and tom.klein are enabled in Lab/Benutzer and must change their initial passwords.",
        "GG_Finanzen contains only Lena; DL_Finanzen_RW contains GG_Finanzen and is DomainLocal/Security.",
        "Lena signs in on CL01 and changes her password; neither test user is Domain Admin."
      ],
      "quiz": [
        {
          "q": "Why assign rights through groups?",
          "options": [
            "To give everyone Domain Admin",
            "To remove the need for testing",
            "To manage access by role and make changes traceable"
          ],
          "answer": 2,
          "explain": "Groups simplify role-based management; test effective access separately."
        },
        {
          "q": "How do you refresh a user token after group changes?",
          "options": [
            "Sign out and sign back in",
            "Rename the monitor",
            "Delete DNS"
          ],
          "answer": 0,
          "explain": "Existing sessions can retain old group memberships in their access tokens."
        }
      ]
    },
    "access": {
      "title": "File access and Group Policy",
      "goal": "Prove allowed and denied access using ordinary users.",
      "short": "File share, NTFS permissions and the first GPO",
      "steps": [
        {
          "title": "Create the folder and NTFS rights",
          "html": "<p>On SRV01 as CORP\\Administrator create the new empty lab folder. The supplied commands remove inheritance for this folder only, grant SYSTEM/local administrators Full Control and the resource group Modify. SIDs reduce dependence on localized account names. Do not apply these commands to existing business data.</p>",
          "code": "New-Item -Path \"C:\\LabShares\\Finanzen\" -ItemType Directory -Force\nicacls \"C:\\LabShares\\Finanzen\" /inheritance:r\nicacls \"C:\\LabShares\\Finanzen\" /grant:r \"*S-1-5-18:(OI)(CI)F\" \"*S-1-5-32-544:(OI)(CI)F\" \"CORP\\DL_Finanzen_RW:(OI)(CI)M\"\nicacls \"C:\\LabShares\\Finanzen\"",
          "label": null,
          "expect": "Only the intended explicit permissions remain. Check the folder path before running the commands."
        },
        {
          "title": "Create the SMB share",
          "html": "<p>On SRV01 share the folder. Share and NTFS permissions both apply; the more restrictive effective combination limits access. If TCP 445 is blocked, enable File and Printer Sharing inbound rules only for the Domain profile in wf.msc, not by disabling the firewall.</p>",
          "code": "New-SmbShare -Name \"Finanzen\" -Path \"C:\\LabShares\\Finanzen\" -ChangeAccess \"CORP\\DL_Finanzen_RW\"\nGet-SmbShareAccess -Name \"Finanzen\"",
          "label": null,
          "expect": "DL_Finanzen_RW has Change. Do not add a broad Everyone/Full Control entry."
        },
        {
          "title": "Test positive and negative cases",
          "html": "<p>On CL01 sign in separately as the authorized and unauthorized test users. Test reading, creating and changing a small file at \\\\SRV01\\Finanzen. Record whoami and the actual result; an administrator session does not prove user permissions.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Apply a scoped GPO",
          "html": "<p>On DC01 open gpmc.msc. Create and link LAB-LogonBanner to Lab/Computer. Edit Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options. Set Interactive logon: Message title to ServerLab and the message text to For learning only. Keep Authenticated Users for this exercise. On CL01 refresh policy, inspect gpresult and verify the sign-in banner.</p>",
          "code": "# CL01 - Run as administrator\ngpupdate /force\ngpresult /r /scope computer",
          "label": null,
          "expect": "LAB-LogonBanner appears in the computer's applied GPOs and the message is shown at the next sign-in. The Default Domain Policy stays unchanged."
        }
      ],
      "tasks": [
        "The share exists; DL_Finanzen_RW has Change at share level and Modify at NTFS level.",
        "After a fresh CL01 sign-in Lena can create and edit a file in the share.",
        "Tom receives Access denied and is not in the finance group.",
        "LAB-LogonBanner is linked to Lab/Computer; CL01 shows the message and gpresult confirms application."
      ],
      "quiz": [
        {
          "q": "Which permissions matter for SMB access?",
          "options": [
            "Only the folder name",
            "Only the desktop wallpaper",
            "Share and NTFS permissions together"
          ],
          "answer": 2,
          "explain": "Inspect both permission layers and test the actual user token."
        },
        {
          "q": "Which output helps verify applied GPOs?",
          "options": [
            "gpresult",
            "A screenshot of the monitor model",
            "A DHCP reservation alone"
          ],
          "answer": 0,
          "explain": "gpresult shows policy application for the selected user/computer context."
        }
      ]
    },
    "operations": {
      "title": "First support shift",
      "goal": "Diagnose a fault, document evidence and hand over the result.",
      "short": "Support, offboarding and handover",
      "steps": [
        {
          "title": "Reproduce and repair a DNS fault",
          "html": "<p>On CL01 record the initial state, temporarily set preferred DNS to unused 10.20.0.254, clear cache and query the named record to observe failure. Restore automatic DNS and renew the lease. Keep Windows Firewall enabled. Verify name resolution and secure channel after recovery.</p>",
          "code": "# CL01: after setting the incorrect DNS\nipconfig /flushdns\nResolve-DnsName dc01.corp.example.test -Server 10.20.0.254\n# After restoring automatic DNS\nipconfig /renew\nResolve-DnsName dc01.corp.example.test\nTest-ComputerSecureChannel",
          "label": null,
          "expect": "The direct query to 10.20.0.254 fails; after the fix, DC01 resolves to 10.20.0.10 and the secure channel is True. A cached sign-in alone does not prove the DC is reachable."
        },
        {
          "title": "Offboard a test employee",
          "html": "<p>After the access tests, disable Lena on DC01 and remove her from GG_Finanzen. Sign out completely on CL01 and try a fresh online sign-in with a reachable DC. It must fail. Disabling an account does not immediately invalidate existing sessions and tokens.</p>",
          "code": "Disable-ADAccount -Identity \"lena.weber\"\nRemove-ADGroupMember \"GG_Finanzen\" -Members \"lena.weber\" -Confirm:$true\nGet-ADUser \"lena.weber\" | Select-Object SamAccountName,Enabled\nGet-ADGroupMember \"GG_Finanzen\"",
          "label": null,
          "expect": "Enabled = False and Lena is no longer in GG_Finanzen. In a company, offboarding also means ending sessions, handing over data and checking other systems."
        },
        {
          "title": "Record results and hand over",
          "html": "<p>Check dcdiag /test:dns on DC01, DHCP scope/leases on SRV01 and DNS/computer GPO on CL01. Record symptom, cause, change, tests and rollback. To repeat Lena tests, deliberately enable only lena.weber and add her back to GG_Finanzen, then sign in freshly. Never record passwords here.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Prepare the enterprise extensions",
          "html": "<p>Choose automation, a second DC, delegation, recovery, monitoring or change management next. A snapshot is only a local rollback point, not an independent backup. Do not casually revert a DC. For a complete fresh lab rebuild, shut down all VMs and restore all to the pre-domain baseline or reinstall; specialized AD recovery is a separate objective.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "The wrong client DNS was reproduced, diagnosed and returned to automatic; resolution and secure channel work again.",
        "Lena is disabled and removed from GG_Finanzen; a fresh online sign-in on CL01 fails.",
        "The handover records DC/DNS/DHCP health, GPO and allowed/denied access tests.",
        "Base limitations are recorded: one DC, no verified restore and no high availability yet."
      ],
      "quiz": [
        {
          "q": "What should you do before changing a system?",
          "options": [
            "Change several things at once",
            "Record the initial state and a clear test",
            "Delete all logs"
          ],
          "answer": 1,
          "explain": "A baseline makes the effect of a change observable."
        },
        {
          "q": "Is a VM snapshot an independent backup?",
          "options": [
            "Yes, always",
            "No; it shares dependencies with the VM storage",
            "Only if the name is long"
          ],
          "answer": 1,
          "explain": "Plan separate protected backups and test restoration."
        }
      ]
    },
    "automation": {
      "title": "PowerShell account automation",
      "goal": "Import a small CSV safely and prove repeatable execution.",
      "short": "CSV, preview, input checks and repeatable runs",
      "steps": [
        {
          "title": "Prepare test input",
          "html": "<p>On DC01 create C:\\LabOps and save users.csv as UTF-8 with exactly the example column names. Import-Csv must show two rows and three columns. Do not put passwords in the CSV.</p>",
          "code": "Sam,GivenName,Surname\nlab.user01,Lab,One\nlab.user02,Lab,Two",
          "label": "CSV content · not a PowerShell command",
          "expect": "Two data rows; there is no password column."
        },
        {
          "title": "Validate and preview",
          "html": "<p>Run the supplied block in Windows PowerShell on DC01. It restricts usernames and skips existing users. Enter each temporary password securely. Keep -WhatIf on New-ADUser for the preview; it is not a universal safety guarantee for arbitrary scripts.</p>",
          "code": "Import-Csv C:\\LabOps\\users.csv | ForEach-Object {\n  $sam = $_.Sam\n  if ($sam -notmatch '^lab\\.user0[12]$') { throw \"Unexpected test account\" }\n  if (Get-ADUser -Filter \"SamAccountName -eq '$sam'\") {\n    Write-Warning \"Already exists: $sam\"\n    return\n  }\n  $pw = Read-Host \"Temporary password for $sam\" -AsSecureString\n  New-ADUser -Name \"$($_.GivenName) $($_.Surname)\" -SamAccountName $sam -UserPrincipalName \"$sam@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true -WhatIf\n}",
          "label": null,
          "expect": "The What if message appears; Get-ADUser still finds neither account."
        },
        {
          "title": "Apply and repeat",
          "html": "<p>Only after reviewing the preview remove -WhatIf from New-ADUser and run the block. Run it again and expect Already exists instead of duplicates. Export a non-secret result list.</p>",
          "code": "Get-ADUser -Filter 'SamAccountName -like \"lab.user0*\"' -SearchBase \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" | Select-Object SamAccountName,Enabled,DistinguishedName | Export-Csv C:\\LabOps\\created-users.csv -NoTypeInformation -Encoding UTF8",
          "label": null,
          "expect": "Only lab.user01 and lab.user02 exist in the target OU. The account count does not change on the second run."
        },
        {
          "title": "Document rollback",
          "html": "<p>Record the two account names, time, preview and second-run result. Roll back by disabling only these lab accounts, not by broad filters. Keep the script and secret-free CSV under version control.</p>",
          "code": "Disable-ADAccount -Identity lab.user01 -WhatIf\nDisable-ADAccount -Identity lab.user02 -WhatIf",
          "label": null,
          "expect": "The rollback preview targets only these two accounts. Remove -WhatIf for a real rollback only after confirming the names."
        }
      ],
      "tasks": [
        "The CSV has two valid unique usernames and no passwords.",
        "The -WhatIf preview created no accounts.",
        "Only the two intended users were created in Lab/Benutzer with password-change requirements.",
        "The second run created no duplicates; a targeted rollback is documented."
      ],
      "quiz": [
        {
          "q": "Why run the script a second time?",
          "options": [
            "To create all accounts again",
            "To verify that existing accounts are not duplicated",
            "To reset every password"
          ],
          "answer": 1,
          "explain": "Repeatable automation must detect the existing state."
        },
        {
          "q": "Where should initial passwords be handled?",
          "options": [
            "In site notes",
            "Next to each username in CSV",
            "In secure input or a secrets process, not CSV"
          ],
          "answer": 2,
          "explain": "Logs and input CSVs should contain only non-secret data."
        }
      ]
    },
    "redundancy": {
      "title": "Second domain controller",
      "goal": "Verify replication and a controlled DC outage.",
      "short": "Replication, a second DNS server and uninterrupted sign-in",
      "steps": [
        {
          "title": "Prepare DC02",
          "html": "<p>Install a separate 6 GB, 2-vCPU, 80 GB VM, update through NAT, then move its single adapter to LAB-CORP. Use 10.20.0.11/24, DNS .10 and initially no gateway. DC01 must be healthy.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Promote into the existing domain",
          "html": "<p>Install AD DS on DC02 and add a controller to the existing domain, not a new forest. Enter credentials and a separate DSRM password securely. After restart configure DNS .10/.11 on DC02 and .11/.10 on DC01.</p>",
          "code": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSDomainController -DomainName \"corp.example.test\" -Credential (Get-Credential) -InstallDns",
          "label": null,
          "expect": "Get-ADDomainController -Filter * lists both DCs; DNS and NTDS are Running on both."
        },
        {
          "title": "Prove replication",
          "html": "<p>Create the disabled test object on DC01 and query it explicitly from DC02. Check repadmin. Add both DNS addresses to DHCP option 006 and SRV01 static settings; renew CL01.</p>",
          "code": "# DC01\nNew-ADUser -Name \"Replication Probe\" -SamAccountName \"replication.probe\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\"\nGet-ADUser replication.probe -Server DC02\nrepadmin /replsummary\n# SRV01\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -DnsServer 10.20.0.10,10.20.0.11\n# CL01\nipconfig /renew\nipconfig /all",
          "label": null,
          "expect": "The user is also visible on DC02, there are no unresolved replication errors and CL01 sees both DNS servers."
        },
        {
          "title": "Test temporary outage",
          "html": "<p>Record healthy replication, gracefully shut down only DC01, and keep DC02/SRV01 running. Test DNS against DC02, secure channel and online test-user sign-in from CL01. Restart DC01 and verify replication. Do not seize FSMO for this temporary outage.</p>",
          "code": "Resolve-DnsName dc02.corp.example.test -Server 10.20.0.11\nTest-ComputerSecureChannel -Server DC02\nnltest /dsgetdc:corp.example.test /force",
          "label": null,
          "expect": "The query to .11 succeeds and the secure channel is True. Two DCs on one host do not cover a failure of that host and do not replace a backup."
        }
      ],
      "tasks": [
        "DC02 runs AD DS/DNS at 10.20.0.11 with the planned resources.",
        "Replication has no unresolved errors and the object exists on both DCs.",
        "Members and DHCP clients use both DNS servers.",
        "DNS/sign-in survive the temporary DC01 outage and replication recovers afterward."
      ],
      "quiz": [
        {
          "q": "What is not protected by two DC VMs on one host?",
          "options": [
            "Shutdown of one VM",
            "Failure of the physical host",
            "A temporary stop of one DNS service"
          ],
          "answer": 1,
          "explain": "Both VMs share the physical host dependency."
        },
        {
          "q": "What is appropriate during a short planned DC01 outage?",
          "options": [
            "Immediately seize FSMO",
            "Create a new forest",
            "Verify DC02, test access and restore DC01"
          ],
          "answer": 2,
          "explain": "A temporary planned outage does not normally require FSMO seizure."
        }
      ]
    },
    "delegation": {
      "title": "Delegate Helpdesk permissions",
      "goal": "Prove narrowly scoped permission and a denied operation.",
      "short": "Least privilege with an allowed and a denied test",
      "steps": [
        {
          "title": "Create support identities",
          "html": "<p>Create ordinary helpdesk.lab in Lab/Benutzer and global security group GG_Helpdesk in Lab/Gruppen. Add membership without Domain Admins or local administrator rights. RSAT must already be installed on CL01.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Delegate the minimum scope",
          "html": "<p>In dsa.msc use Delegate Control on Lab/Benutzer for GG_Helpdesk. Select only Reset user passwords and force password change at next logon. Do not grant user creation, all-property editing or group changes.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Positive test as Helpdesk",
          "html": "<p>Sign out of the administrator session on CL01 and sign in as CORP\\helpdesk.lab. Use ordinary PowerShell, confirm whoami and reset the password of the intended Tom test account. Do not use elevation under another identity.</p>",
          "code": "whoami\nImport-Module ActiveDirectory\n$pw = Read-Host \"New temporary password for Tom\" -AsSecureString\nSet-ADAccountPassword tom.klein -Reset -NewPassword $pw\nSet-ADUser tom.klein -ChangePasswordAtLogon $true",
          "label": null,
          "expect": "The identity is CORP\\helpdesk.lab, both allowed operations succeed and Tom must change the password at next sign-in."
        },
        {
          "title": "Negative test and rollback",
          "html": "<p>In the same Helpdesk session try changing Description and expect insufficient access. Document both results. An administrator can later remove only the added GG_Helpdesk ACEs from this OU; do not reset its entire ACL.</p>",
          "code": "whoami\nSet-ADUser tom.klein -Description \"Delegation negative test\"",
          "label": null,
          "expect": "Access is denied. If it succeeds, check for excessive delegation or extra group membership and have an administrator undo that test change."
        }
      ],
      "tasks": [
        "helpdesk.lab is ordinary and belongs only to the intended support role.",
        "Only password reset/change-at-logon is delegated on the target OU.",
        "The Helpdesk identity successfully resets the test password.",
        "Description modification is denied under the same identity and recorded."
      ],
      "quiz": [
        {
          "q": "Which scope suits Helpdesk?",
          "options": [
            "Domain Admin for everyone",
            "Only required rights on the target OU",
            "Every forest object"
          ],
          "answer": 1,
          "explain": "Least privilege limits both the operation and its scope."
        },
        {
          "q": "Why perform a negative test?",
          "options": [
            "To prove out-of-role operations are denied",
            "Only to measure speed",
            "To replace the positive test"
          ],
          "answer": 0,
          "explain": "Success of an allowed operation does not prove other operations are blocked."
        }
      ]
    },
    "recovery": {
      "title": "Backup and verified restore",
      "goal": "Restore a test file to a separate location and compare its hash.",
      "short": "Backup, hash and measured recovery time",
      "steps": [
        {
          "title": "Prepare an empty target disk",
          "html": "<p>Shut down SRV01 and attach a new empty 80 GB VDI. Identify that disk in Disk Management, initialize GPT and create NTFS E:. Never format the system disk. A second VDI on the same host is only a restore exercise, not independent protection.</p>",
          "code": "Install-WindowsFeature Windows-Server-Backup\nGet-Volume",
          "label": null,
          "expect": "C is the system disk and E is the new backup target with enough free space."
        },
        {
          "title": "Create data and backup",
          "html": "<p>Create the test file, record its SHA256 before backup and run the supplied commands on SRV01. VSS Copy creates the one-off backup for this exercise. Verify the backup version and timestamp.</p>",
          "code": "Set-Content C:\\LabShares\\Finanzen\\restore-proof.txt -Value \"Original lab data\" -Encoding UTF8\nGet-FileHash C:\\LabShares\\Finanzen\\restore-proof.txt -Algorithm SHA256\nwbadmin start backup -backupTarget:E: -include:C:\\LabShares -vssCopy -quiet\nwbadmin get versions -backupTarget:E:",
          "label": null,
          "expect": "The backup finished without errors and has a restorable version identifier. Record the hash in your log."
        },
        {
          "title": "Restore without overwriting",
          "html": "<p>Change only the test file to Changed lab data. In Windows Server Backup select Recover → This server → backup time → Files and folders. Restore only restore-proof.txt to Another location: C:\\LabRestore. Find the restored file and compare SHA256 to the original value.</p>",
          "code": "Get-ChildItem C:\\LabRestore -Recurse -Filter restore-proof.txt | Get-FileHash -Algorithm SHA256",
          "label": null,
          "expect": "The restored file's hash matches the original value from before the backup and differs from the changed file."
        },
        {
          "title": "Define recovery objectives",
          "html": "<p>RPO describes tolerated data loss by time; RTO describes the target recovery time. Measure your restore and document an independent protected backup design. File restore is not System State or forest recovery; do not restore a DC without a complete AD recovery plan.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Only the new empty disk was prepared as E:.",
        "The backup version and time are visible in wbadmin get versions.",
        "The restored file under C:\\LabRestore matches the original SHA256.",
        "Restore time, RPO/RTO and shared-host limitations are documented."
      ],
      "quiz": [
        {
          "q": "What does a backup file alone not prove?",
          "options": [
            "That the data can actually be restored",
            "That a file exists",
            "That a drive letter exists"
          ],
          "answer": 0,
          "explain": "Restore and validate the actual data."
        },
        {
          "q": "What does RTO specify?",
          "options": [
            "RAM size",
            "The target time to recover service",
            "Number of user groups"
          ],
          "answer": 1,
          "explain": "RTO concerns recovery duration; RPO concerns tolerated data loss."
        }
      ]
    },
    "monitoring": {
      "title": "Monitoring and incident handling",
      "goal": "Collect evidence before changing a service.",
      "short": "WinRM, events, disk space and a detectable failure",
      "steps": [
        {
          "title": "Prepare secure remoting",
          "html": "<p>Use SRV01 with Domain network profile and WinRM. If necessary run Enable-PSRemoting -Force elevated on that server. Connect from CL01 by DNS name with the lab administrator. Do not use TrustedHosts=* or disable the firewall.</p>",
          "code": "Test-WSMan SRV01\nInvoke-Command -ComputerName SRV01 -ScriptBlock { hostname; Get-Service DHCPServer,Spooler }",
          "label": null,
          "expect": "The SRV01 host identity and service states are returned. In daily company work, remoting permissions must be limited and delegated."
        },
        {
          "title": "Read baseline health",
          "html": "<p>Collect service state, free disk space, server name and time. The example 15% disk threshold is a lab assumption, not a production standard. Establish a real baseline before operational alerting.</p>",
          "code": "Invoke-Command -ComputerName SRV01 -ScriptBlock {\n  Get-CimInstance Win32_LogicalDisk -Filter \"DriveType=3\" |\n    Select-Object DeviceID,@{n='FreePercent';e={[math]::Round(100*$_.FreeSpace/$_.Size,1)}}\n  Get-Service DHCPServer,Spooler\n  Get-Date\n}",
          "label": null,
          "expect": "Free space in percent, service state and sample time are known for every volume."
        },
        {
          "title": "Create and detect a limited failure",
          "html": "<p>Stop only Spooler on SRV01. Observe it remotely and read Service Control Manager events. Restart it and prove Running. Do not stop DNS or DHCP. This is a service exercise, not a central monitoring system.</p>",
          "code": "# SRV01\nStop-Service Spooler\nGet-Service Spooler\nGet-WinEvent -FilterHashtable @{LogName='System';ProviderName='Service Control Manager';StartTime=(Get-Date).AddMinutes(-20)} -MaxEvents 20 | Select-Object TimeCreated,Id,Message\nStart-Service Spooler\nGet-Service Spooler",
          "label": null,
          "expect": "Stopped is recorded during the failure and Running after the fix; link the related event and its time to the report."
        },
        {
          "title": "Write and escalate the incident",
          "html": "<p>Document time, impact, affected service/user, checks, evidence, likely cause, action and result. Escalate when authority, skill or agreed time is exceeded; give the next team evidence and the user a clear update.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Remoting by SRV01 DNS name works without broad trust exceptions.",
        "A timestamped service/disk report exists.",
        "The Spooler failure and recovery are visible in status and logs.",
        "The incident report includes impact and escalation conditions."
      ],
      "quiz": [
        {
          "q": "Which remoting method is preferred in this domain?",
          "options": [
            "DNS name with domain authentication",
            "TrustedHosts=*",
            "Firewall disabled"
          ],
          "answer": 0,
          "explain": "Domain names support Kerberos; broad trust exceptions are not the default fix."
        },
        {
          "q": "When should you escalate?",
          "options": [
            "Never",
            "When skill, authority or agreed time is exceeded",
            "Only after reinstalling everything"
          ],
          "answer": 1,
          "explain": "Recognizing limits and providing evidence are part of professional support."
        }
      ]
    },
    "change": {
      "title": "Controlled changes and updates",
      "goal": "Pilot an update with acceptance criteria and a recovery plan.",
      "short": "Pilot, rollback plan, acceptance and user report",
      "steps": [
        {
          "title": "Plan the change",
          "html": "<p>Target SRV01 rather than every DC at once. Record purpose, DHCP/file impact, maintenance window, scenario approver, backup prerequisites and stop criteria. Record installed build/hotfixes. Snapshot alone is not the recovery plan.</p>",
          "code": "Get-ComputerInfo | Select-Object WindowsProductName,OsVersion,OsBuildNumber\nGet-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 10\nGet-NetFirewallProfile | Select-Object Name,Enabled",
          "label": null,
          "expect": "Build and previous updates are known; the firewall is active and the backup from the recovery lesson exists."
        },
        {
          "title": "Obtain the correct update",
          "html": "<p>Use Microsoft Update Catalog and the official KB for the current Windows Server 2025 x64 build. Read prerequisites/checkpoint packages. Present a temporary read-only Host-Updates VirtualBox shared folder only to SRV01 and copy from \\\\VBOXSVR\\Host-Updates to C:\\LabUpdates. Do not reconnect a DC to NAT/Bridged for this.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Pilot and verify",
          "html": "<p>Install the official package and prerequisites from the SRV01 console in the documented order. Restart if required. Record build, result and service health; test lease renewal and SMB from CL01. Do not assume every update is uninstallable.</p>",
          "code": null,
          "label": null,
          "expect": "The real KB number, installation result, restart requirement and resulting build are in the log; an incomplete or Not applicable installation is not hidden."
        },
        {
          "title": "Close or roll back",
          "html": "<p>Compare against acceptance criteria. Remove the temporary shared folder. Document the actual supported rollback, outstanding tests and user communication. Do not use blind DC snapshot rollback or change multiple variables to hide a failure.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "A scoped change request and baseline exist.",
        "The official matching package and prerequisites were checked.",
        "SRV01 was piloted and client-facing services were tested.",
        "Rollback, outcome and removal of temporary access are documented."
      ],
      "quiz": [
        {
          "q": "Why update a pilot first?",
          "options": [
            "To avoid all testing",
            "To limit impact and verify behavior before wider rollout",
            "To update all DCs simultaneously"
          ],
          "answer": 1,
          "explain": "A pilot provides evidence while limiting the change scope."
        },
        {
          "q": "Is every update safely removable?",
          "options": [
            "Yes, always",
            "A snapshot guarantees it",
            "No; check the KB and supported recovery method"
          ],
          "answer": 2,
          "explain": "Recovery depends on package and system state; plan before installation."
        }
      ]
    },
    "workstations": {
      "title": "Client and software deployment",
      "goal": "Prepare a workstation and test it as an ordinary user.",
      "short": "Inventory, MSI installation, user test and Microsoft 365 plan",
      "steps": [
        {
          "title": "Inventory and requirements",
          "html": "<p>On CL01 record model/VM, OS edition/build, resources and software needs using the supplied read-only commands. Record asset identity without passwords. A VM does not replace a physical device acceptance test.</p>",
          "code": "systeminfo\nGet-ComputerInfo | Select-Object WindowsProductName,OsBuildNumber\nGet-Volume\nGet-PnpDevice -PresentOnly | Where-Object Status -ne \"OK\"",
          "label": null,
          "expect": "Inventory and items to check are clear. Investigate devices whose status is not OK; do not automatically treat them as hardware failures."
        },
        {
          "title": "Install authorized software",
          "html": "<p>Use official vendor sources and a valid license. Record version, architecture and installation scope. Obtain packages before network isolation; do not add unplanned DC internet adapters. Microsoft 365 needs a suitable licensed account and service connectivity; do not claim an offline simulation is a tenant deployment.</p>",
          "code": "Get-AuthenticodeSignature \"C:\\LabSoftware\\PowerShell-7-x64.msi\" | Select-Object Status,SignerCertificate\nmsiexec.exe /i \"C:\\LabSoftware\\PowerShell-7-x64.msi\" /L*v \"C:\\LabSoftware\\install.log\"",
          "label": null,
          "expect": "The signature is valid and belongs to the expected publisher; the installation succeeded and the log is readable. Stop if the signature is invalid or the publisher does not match."
        },
        {
          "title": "Test updates and user behavior",
          "html": "<p>Check installed versions and update status. Sign in with the ordinary domain user and verify application start, file save and required resource access. Separate administrator installation success from actual user usability.</p>",
          "code": "$PSVersionTable.PSVersion",
          "label": null,
          "expect": "The PowerShell 7 window shows version 7, while the existing Windows PowerShell usually stays at 5.1."
        },
        {
          "title": "Handover and rollback",
          "html": "<p>Document asset, software versions, licenses, user tests, removal/recovery method and pending work. Provide short user instructions for sign-in, files, printing and reporting an issue. Keep unsupported or untested claims explicit.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Client inventory and requirements are recorded.",
        "Software comes from official sources with licensing checked.",
        "An ordinary user can start software and save work.",
        "Handover, update status and recovery/removal method are recorded."
      ],
      "quiz": [
        {
          "q": "Who should perform acceptance testing?",
          "options": [
            "Only the installing administrator",
            "The intended ordinary user identity",
            "No one after installation"
          ],
          "answer": 1,
          "explain": "Test the actual user context, not only elevated setup."
        },
        {
          "q": "What is needed for real Microsoft 365 use?",
          "options": [
            "Suitable licensing, account and service access",
            "Only an AD OU",
            "An offline screenshot"
          ],
          "answer": 0,
          "explain": "Local AD practice is not a licensed cloud-tenant deployment."
        }
      ]
    },
    "printing-storage": {
      "title": "Printing and network storage",
      "goal": "Separate simulated print/SMB practice from real-device configuration.",
      "short": "Print queue, driver, share and NAS requirements",
      "steps": [
        {
          "title": "Print a test PDF",
          "html": "<p>Use Microsoft Print to PDF on CL01, save the output and open it. Inspect printer and Spooler state. This tests the virtual print path, not a physical printer mechanism or network interface.</p>",
          "code": "Get-Printer | Select-Object Name,DriverName,PortName,PrinterStatus\nGet-Service Spooler",
          "label": null,
          "expect": "The virtual printer is listed, the Spooler is running and the PDF is readable."
        },
        {
          "title": "Handle only your test queue",
          "html": "<p>Pause a test job, inspect it, then resume or cancel that job only. Assess impact before restarting a shared print service. Use the exact official model driver and do not weaken Point and Print restrictions globally.</p>",
          "code": "Get-PrintJob -PrinterName \"Microsoft Print to PDF\"",
          "label": null,
          "expect": "While the job exists, the queue shows it; after completion or cancellation only that job is removed."
        },
        {
          "title": "Evaluate SMB storage",
          "html": "<p>Check \\\\SRV01\\Finanzen: free capacity, role groups, read/write results, backup owner and restore time. Restore a small file through the recovery lesson. This is SMB practice, not management of a physical NAS RAID, firmware or vendor UI.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Real-device extension",
          "html": "<p>With authorized equipment record printer model, connection/IP, official driver and device/Windows test pages. For NAS record disks/volume/share, identity/ACL and independent backup/restore. Without equipment mark the work as design only. Never initialize a disk containing data for practice.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "The generated PDF opens correctly.",
        "Only my test print job was paused/resumed/cancelled.",
        "SMB capacity, access and restore method are verified; RAID is not treated as backup.",
        "Real-device tests or unavailable equipment are explicitly recorded."
      ],
      "quiz": [
        {
          "q": "What does successful PDF printing not prove?",
          "options": [
            "Readable PDF output",
            "Physical printer mechanics and connectivity",
            "The virtual print path works"
          ],
          "answer": 1,
          "explain": "Real printers require their own connectivity, driver and output tests."
        },
        {
          "q": "Does RAID replace backup?",
          "options": [
            "Always",
            "It is identical to restore",
            "No; independent backup and restore tests remain necessary"
          ],
          "answer": 2,
          "explain": "Deletion or shared incidents can affect an entire disk set."
        }
      ]
    },
    "networking": {
      "title": "Routing and network troubleshooting",
      "goal": "Build a branch subnet and test one narrowly scoped firewall block.",
      "short": "LAN, virtual router, return path and access separation",
      "steps": [
        {
          "title": "Prepare RTR01 and CL02",
          "html": "<p>Create each with 4 GB, 2 vCPUs and 80 GB. Update using NAT before isolation. RTR01 needs no domain membership; use only two adapters: LAB-CORP 10.20.0.1/24 and LAB-BRANCH 10.30.0.1/24, with no router default gateway. CL02 uses .30.0.50/24, gateway 10.30.0.1 and DNS 10.20.0.10/.11. No branch DHCP yet.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Enable LAN routing and return paths",
          "html": "<p>Install the router role. In rrasmgmt.msc configure Custom configuration → LAN routing and start the service. Set gateway 10.20.0.1 on DC01, DC02 and SRV01; set DHCP option 003 accordingly and renew CL01. The router still has no internet.</p>",
          "code": "Install-WindowsFeature RemoteAccess,Routing -IncludeManagementTools\n# SRV01 after configuring RTR01\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -Router 10.20.0.1",
          "label": null,
          "expect": "The servers send replies for 10.30.0.0/24 via RTR01. Do not confuse a missing return path with a DNS failure."
        },
        {
          "title": "Test and block one flow",
          "html": "<p>From CL02 record SRV01 DNS resolution and TCP 445 success. If needed allow file-sharing rules on SRV01 only for lab networks. Add the supplied block rule only on SRV01. An IP address is not a user identity; SMB/NTFS rights still apply.</p>",
          "code": "Test-NetConnection srv01.corp.example.test -Port 445\n# SRV01 - administrator\nNew-NetFirewallRule -DisplayName \"LAB-Block-Branch-SMB\" -Direction Inbound -Protocol TCP -LocalPort 445 -RemoteAddress 10.30.0.0/24 -Action Block -Profile Domain",
          "label": null,
          "expect": "Before the rule the connection succeeds; afterwards CL02 still resolves the name but TCP 445 is blocked. Tests from CL01 must not be blocked by this rule."
        },
        {
          "title": "Restore and document boundaries",
          "html": "<p>Remove only LAB-Block-Branch-SMB on SRV01 and repeat DNS/port/access tests. Internal networks model virtual L2 segments, not physical-switch CLI or 802.1Q trunks. Record before/during/after results and the two-subnet plan.</p>",
          "code": "Remove-NetFirewallRule -DisplayName \"LAB-Block-Branch-SMB\"\n# CL02\nResolve-DnsName srv01.corp.example.test\nTest-NetConnection srv01.corp.example.test -Port 445\nroute print",
          "label": null,
          "expect": "Connectivity returns to the state before the rule; routing, DNS and permissions are reported as three separate topics."
        }
      ],
      "tasks": [
        "RTR01 has only the two planned internal adapters.",
        "CL02 reaches domain DNS through routing with working return paths.",
        "The test rule blocks branch TCP 445 only as intended.",
        "Removing that rule restores access; all three states are documented."
      ],
      "quiz": [
        {
          "q": "Why does the return route matter?",
          "options": [
            "The response needs a valid route to the source",
            "Only to rename computers",
            "It replaces DNS"
          ],
          "answer": 0,
          "explain": "A request arriving does not prove its reply can return."
        },
        {
          "q": "DNS works but TCP 445 fails. What next?",
          "options": [
            "Check only the BIOS password",
            "Check routing and the port-specific firewall policy",
            "Create another forest"
          ],
          "answer": 1,
          "explain": "Name resolution and transport access are separate checks."
        }
      ]
    },
    "hardware": {
      "title": "Hardware, LAN/WLAN and handover",
      "goal": "Practice physical-device acceptance on authorized equipment.",
      "short": "Practice outside the VM, troubleshooting and a short user guide",
      "steps": [
        {
          "title": "Inventory a real device",
          "html": "<p>Use msinfo32, Device Manager and vendor documentation on an authorized test device. Record exact model, CPU/RAM/disk, firmware and visible symptom. A VM does not reproduce batteries, sockets, cables, radio or mechanical failures. Keep physical tasks open without equipment.</p>",
          "code": "msinfo32\ndevmgmt.msc\nGet-PnpDevice -PresentOnly",
          "label": null,
          "expect": "Model and driver of each device can be identified. For a device with a warning, record the error code and symptoms."
        },
        {
          "title": "Check a peripheral in order",
          "html": "<p>Use a low-risk USB mouse, headset, webcam or test printer. Check power/link, another cable/port, OS detection, official driver and actual function. For laptops also test display, audio, network, battery and dock. Internal repairs and firmware changes require model instructions and authorization.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Separate LAN and WLAN evidence",
          "html": "<p>On a real Wi-Fi device inspect the authorized SSID, signal, IP, gateway and DNS separately. Do not record Wi-Fi passwords. For an authorized switch document the VLAN/port plan before changes and test DHCP. Virtual routing practice is not radio experience.</p>",
          "code": "netsh wlan show interfaces\nipconfig /all\nroute print",
          "label": null,
          "expect": "You can explain whether the problem lies in the wireless link, addressing, routing, DNS or the application. Do not release the host IP just for this exercise."
        },
        {
          "title": "User handover and escalation",
          "html": "<p>Write short instructions for sign-in, files, printing and reporting problems. Record asset, software, access, actual tests and user acceptance. Escalate hardware problems with symptom, code, tests and reason; do not promise unmeasured times or abilities.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "A real authorized device inventory exists.",
        "A real peripheral was tested beyond mere OS detection.",
        "Real WLAN/switch results and equipment limitations are recorded.",
        "A user guide, handover checklist and escalation ticket exist."
      ],
      "quiz": [
        {
          "q": "Which test needs physical equipment?",
          "options": [
            "Creating an AD group",
            "USB port health and Wi-Fi radio connectivity",
            "Querying internal DNS"
          ],
          "answer": 1,
          "explain": "A VM does not fully reproduce the physical or radio environment."
        },
        {
          "q": "What belongs in a useful ticket?",
          "options": [
            "Only “does not work”",
            "Unrelated details without time",
            "Symptoms, impact, time, tests, result and escalation path"
          ],
          "answer": 2,
          "explain": "The next technician needs actionable evidence."
        }
      ]
    },
    "linux-start": {
      "title": "Install and administer Ubuntu Server",
      "goal": "Configure LNX01 and verify SSH using a non-root account.",
      "short": "Ubuntu, static IP, SSH, users and sudo",
      "steps": [
        {
          "title": "Install using NAT",
          "html": "<p>Download official Ubuntu Server 24.04 LTS amd64. Create LNX01 with 4 GB, 2 vCPUs and a 40 GB empty disk. Use hostname lnx01 and independent labadmin credentials; select OpenSSH Server. Install the listed packages while NAT still provides internet. This does not join Linux to AD.</p>",
          "code": "sudo apt update\nsudo apt upgrade\nsudo apt install openssh-server ufw nginx curl\nsudo hostnamectl set-hostname lnx01\ncat /etc/os-release",
          "label": "LNX01 · Bash; sudo for administrative commands",
          "expect": "Ubuntu is installed and up to date, the required packages are present and the name is lnx01 after the restart."
        },
        {
          "title": "Configure the internal network",
          "html": "<p>Shut down, switch to LAB-CORP and use the VirtualBox console. Find the actual interface with ip -br addr and the existing file in /etc/netplan. Back it up outside that directory. Replace enp0s3 in the example with the real interface; avoid conflicting files. Validate with netplan generate, then netplan try. Use 10.20.0.30/24 and DNS .10; DC02 is optional. Initially no gateway; add .1 only after the routing lesson if needed.</p>",
          "code": "network:\n  version: 2\n  ethernets:\n    enp0s3:\n      dhcp4: false\n      addresses: [10.20.0.30/24]\n      nameservers:\n        addresses: [10.20.0.10]",
          "label": "Netplan YAML example · not a Bash command",
          "expect": "ip -br addr shows 10.20.0.30/24. On DC01, create the A record lnx01 in corp.example.test pointing to .30."
        },
        {
          "title": "Limit SSH and verify the host",
          "html": "<p>Add the permitted SSH rule before enabling UFW, keeping console recovery available. Connect from Windows as labadmin@lnx01.corp.example.test. Compare the first host-key fingerprint with the console; do not blindly accept changed keys. Register the DNS A record for LNX01 on DC01.</p>",
          "code": "sudo systemctl enable --now ssh\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow from 10.20.0.0/24 to any port 22 proto tcp\nsudo ufw enable\nsudo ufw status verbose\nsudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub",
          "label": "LNX01 · Bash with sudo",
          "expect": "SSH from CL01 works; the fingerprint is correct and UFW is active. root is not used for normal sign-ins."
        },
        {
          "title": "Create an ordinary local user",
          "html": "<p>labadmin normally has sudo rights on Ubuntu. Create local helpdesk and verify that it has no sudo. This local identity is independent of AD helpdesk.lab. Do not record passwords on the site.</p>",
          "code": "sudo adduser helpdesk\nid labadmin\nid helpdesk\nsudo -l -U helpdesk\nwhoami\npwd",
          "label": "LNX01 · Bash as labadmin",
          "expect": "helpdesk is a normal account; sudo -l -U helpdesk shows no administrative permissions. You know the current user and path."
        }
      ],
      "tasks": [
        "Ubuntu and required packages were installed before isolation.",
        "LNX01 uses .30/24 and its DNS name resolves correctly.",
        "SSH from CL01 works with checked host fingerprint, without root login.",
        "Local helpdesk has no sudo; UFW limits SSH to the intended lab network."
      ],
      "quiz": [
        {
          "q": "What comes before enabling UFW remotely?",
          "options": [
            "Permit required SSH and keep console recovery",
            "Open all ports",
            "Delete host keys"
          ],
          "answer": 0,
          "explain": "A firewall without the required management rule may lock you out."
        },
        {
          "q": "How is local Linux helpdesk related to AD here?",
          "options": [
            "It is automatically the same AD account",
            "It is an independent local account",
            "It is automatically Domain Admin"
          ],
          "answer": 1,
          "explain": "This lesson performs no Linux domain-join procedure."
        }
      ]
    },
    "linux-services": {
      "title": "Linux services, permissions and restore",
      "goal": "Diagnose a service and verify file access and recovery.",
      "short": "Nginx, systemd, logs, UFW and file backup",
      "steps": [
        {
          "title": "Start internal HTTP",
          "html": "<p>Enable Nginx on LNX01 and permit HTTP only from LAB-CORP. Test from CL01 with curl.exe -I http://lnx01.corp.example.test. Explicit curl.exe avoids PowerShell alias ambiguity. This is internal HTTP practice, not public HTTPS deployment.</p>",
          "code": "sudo systemctl enable --now nginx\nsudo nginx -t\nsudo ufw allow from 10.20.0.0/24 to any port 80 proto tcp\ncurl -I http://127.0.0.1\nsudo ss -lntp",
          "label": "LNX01 · Bash",
          "expect": "The Nginx configuration is valid, port 80 is listening and CL01 receives a successful HTTP response."
        },
        {
          "title": "Diagnose a stopped service",
          "html": "<p>Stop only Nginx, test from CL01 and compare systemctl status, listening ports and logs. Separate DNS failure from a stopped application. Start Nginx again and repeat the same client request.</p>",
          "code": "sudo systemctl stop nginx\nsystemctl status nginx --no-pager\nsudo journalctl -u nginx --since \"-15min\" --no-pager\nsudo tail -n 20 /var/log/nginx/access.log\nsudo systemctl start nginx\ncurl -I http://127.0.0.1",
          "label": "LNX01 · Bash",
          "expect": "inactive is shown while stopped and active after the start; the connection works again and the cause is recorded in the ticket."
        },
        {
          "title": "Apply local file permissions",
          "html": "<p>Create labusers and the test directory, add labadmin and open a new session for membership to apply. Test the protected file as ordinary helpdesk, not root or sudo, because privileged identities can bypass normal restrictions.</p>",
          "code": "sudo groupadd labusers\nsudo usermod -aG labusers labadmin\nsudo install -d -m 0750 -o root -g labusers /srv/labdata\nprintf \"%s\\n\" \"Original Linux lab data\" | sudo tee /srv/labdata/proof.txt\nsudo chown root:labusers /srv/labdata/proof.txt\nsudo chmod 0640 /srv/labdata/proof.txt\nls -ld /srv/labdata\nls -l /srv/labdata/proof.txt\nsudo -u helpdesk cat /srv/labdata/proof.txt",
          "label": "LNX01 · Bash; groupadd only if the group does not exist yet",
          "expect": "The allowed group can read; helpdesk gets Permission denied and is not in the sudo group."
        },
        {
          "title": "Archive and restore separately",
          "html": "<p>Record the file hash, create the archive and restore under /srv/labrestore instead of overwriting the source. Compare SHA256. A local archive is not independent of host failure; enterprise backups also need protected separate storage, scheduling and regular restore tests.</p>",
          "code": "sudo sha256sum /srv/labdata/proof.txt\nsudo tar -czf /var/backups/lab-data.tgz -C /srv labdata\nsudo mkdir -p /srv/labrestore\nsudo tar -xzf /var/backups/lab-data.tgz -C /srv/labrestore\nsudo sha256sum /srv/labrestore/labdata/proof.txt",
          "label": "LNX01 · Bash",
          "expect": "Both hashes match. Restore time, target path and comparison result are in the report."
        }
      ],
      "tasks": [
        "CL01 receives HTTP from Nginx over the authorized network.",
        "Nginx failure was diagnosed and recovery retested.",
        "Ordinary helpdesk cannot read the protected file.",
        "Separate restore matches SHA256; local-backup limitations are recorded."
      ],
      "quiz": [
        {
          "q": "Which command checks the Nginx service?",
          "options": [
            "systemctl status nginx",
            "ipconfig /all",
            "gpupdate /force"
          ],
          "answer": 0,
          "explain": "systemctl manages and inspects systemd services."
        },
        {
          "q": "What does file mode 0640 mean?",
          "options": [
            "Everyone can write",
            "Owner read/write, group read, others none",
            "Everyone can execute"
          ],
          "answer": 1,
          "explain": "6 is read+write, 4 is read and 0 grants no permission."
        }
      ]
    },
    "server-room": {
      "title": "Plan a server room",
      "goal": "Estimate rack, power and growth and record engineering assumptions.",
      "short": "Requirements, rack units, power, UPS, cooling and cabling",
      "steps": [
        {
          "title": "Gather requirements",
          "html": "<p>Record services, uptime needs, device inventory, dimensions, weight, rack units, power and ownership. Use actual model specifications; power-supply nameplate capacity is not measured IT consumption. Mark unknown inputs instead of inventing values.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Plan the rack",
          "html": "<p>Allocate U positions, blanking/cable space, front/back access, airflow and service clearance. Check depth, rail compatibility, floor/rack load and growth. The calculator checks only entered U and weight; it cannot validate a room physically.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Estimate power and cooling",
          "html": "<p>Use the Room planner to compare both independent UPS W and VA ratings, growth and estimated IT heat. Runtime must come from the exact UPS/battery load curve. Cooling, electrical installation, earthing and fire protection require qualified site-specific design. Do not infer full cooling capacity from IT heat alone.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Document operations",
          "html": "<p>Plan controlled access, environmental alerts, labels, cable/asset records, independent failure paths and maintenance responsibilities. Save your assumptions and test the effect of increasing load in the calculator. Two power supplies on the same feed do not provide independent power paths.</p>",
          "code": null,
          "label": null,
          "expect": "Someone else can tell from the plan where each device is, which port and power path it uses and which assumption still needs confirmation."
        }
      ],
      "tasks": [
        "Requirements and model-specific inventory are recorded.",
        "Rack U/depth/weight/access assumptions are documented.",
        "W, VA, growth and heat estimates are checked; UPS runtime remains model-specific.",
        "Access, monitoring, ownership and specialist work are identified."
      ],
      "quiz": [
        {
          "q": "Which UPS ratings must both fit?",
          "options": [
            "Only the marketing VA figure",
            "Only rack height",
            "W and VA independently"
          ],
          "answer": 2,
          "explain": "Real and apparent power limits are separate constraints."
        },
        {
          "q": "Does estimated IT heat alone design the cooling system?",
          "options": [
            "Yes, always",
            "No, building conditions and other loads matter too",
            "Only the switch brand matters"
          ],
          "answer": 1,
          "explain": "The calculator is educational, not engineering approval."
        }
      ]
    },
    "vendor-servers": {
      "title": "Dell, HPE and Lenovo server management",
      "goal": "Map equivalent management tasks to the exact model and firmware.",
      "short": "iDRAC, iLO and XClarity; management network and firmware",
      "steps": [
        {
          "title": "Identify the platform",
          "html": "<p>Record model, generation, firmware, support and management licenses. Dell iDRAC, HPE iLO and Lenovo XCC are separate management controllers, not Windows itself. Use only authorized equipment or licensed lab images.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Configure management access",
          "html": "<p>Use the exact model guide to set a restricted management address/network, change initial credentials securely and assign role-based accounts. Verify certificates and allowed management sources. Keep a documented local recovery path; do not expose BMC management publicly.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Inspect health and inventory",
          "html": "<p>Read CPU, RAM, disk/controller, fans, power and hardware events. Record actual health evidence. Remote console, virtual media and firmware features can depend on model/license; their presence in a screenshot does not prove entitlement or operation.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Back up and hand over",
          "html": "<p>Export supported configuration securely with model/version/time, test permitted and denied access, and document maintenance/rollback. Do not practice power actions, firmware updates or destructive RAID changes on production. Without equipment record design only, not execution.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Exact model, management controller, firmware and licenses are recorded.",
        "Management address, roles and access restrictions follow the design.",
        "Hardware health and inventory are backed by actual evidence or marked untested.",
        "Config backup, access tests and rollback/handover are documented."
      ],
      "quiz": [
        {
          "q": "What is a BMC such as iDRAC/iLO/XCC?",
          "options": [
            "A Windows user group",
            "A management controller independent of the host OS",
            "A backup of every application"
          ],
          "answer": 1,
          "explain": "Out-of-band management has its own access and security requirements."
        },
        {
          "q": "Why record exact model and license?",
          "options": [
            "Capabilities and supported procedures differ",
            "All server GUIs are identical",
            "Firmware never matters"
          ],
          "answer": 0,
          "explain": "Vendor family names alone do not specify available capabilities."
        }
      ]
    },
    "vendor-switches": {
      "title": "Cisco and Aruba switch configuration",
      "goal": "Configure access and trunk behavior with model-specific syntax.",
      "short": "Access, tagged/untagged, management and saving the configuration",
      "steps": [
        {
          "title": "Design VLANs and ports",
          "html": "<p>Plan VLAN 10 users, 20 servers and 99 management with a port table and console recovery. A VirtualBox Internal Network is not real 802.1Q trunking. Replace every sample interface name with the actual authorized test port.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Cisco IOS XE example",
          "html": "<p>Apply the example only to compatible IOS XE test equipment. Verify access VLAN, restricted allowed list and matching native VLAN at both ends. The sample carries 99 untagged and 10/20 tagged. Do not target a production management uplink. Save and verify the intended configuration.</p>",
          "code": "configure terminal\nvlan 10\n name USERS\nvlan 20\n name SERVERS\nvlan 99\n name MGMT\ninterface GigabitEthernet1/0/10\n switchport mode access\n switchport access vlan 10\ninterface GigabitEthernet1/0/24\n switchport mode trunk\n switchport trunk native vlan 99\n switchport trunk allowed vlan 10,20,99\nend\nshow vlan brief\nshow interfaces trunk\ncopy running-config startup-config",
          "label": "Cisco IOS XE example · match interface names and model features before running",
          "expect": "The access port is in VLAN 10; the trunk carries only the intended VLANs and the same native VLAN as the other side. Confirm that the configuration is saved."
        },
        {
          "title": "Aruba AOS-CX equivalent",
          "html": "<p>AOS-CX syntax differs from ArubaOS-Switch/PVOS and Comware. On routing-capable interfaces select appropriate layer-2 mode such as no routing where required by the model. Match native/allowed settings to the peer, inspect show output and save.</p>",
          "code": "configure terminal\nvlan 10\n name USERS\nvlan 20\n name SERVERS\nvlan 99\n name MGMT\ninterface 1/1/10\n no routing\n vlan access 10\n no shutdown\ninterface 1/1/24\n no routing\n vlan trunk native 99\n vlan trunk allowed 10,20,99\n no shutdown\nend\nshow vlan\nshow interface 1/1/24\ncopy running-config startup-config",
          "label": "Aruba AOS-CX 10.15 example · check the syntax for your model",
          "expect": "VLAN and interface output shows the same target state as the Cisco example; do not assume the command text is identical."
        },
        {
          "title": "Test data and rollback",
          "html": "<p>Test two same-VLAN clients across the link, then compare isolation from VLAN 20. VLAN creation alone does not route between VLANs. Check link, VLAN, trunk and IP in order. Restore only the changed test ports from the documented backup; do not reload indiscriminately.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "VLAN/port plan uses the actual interface names.",
        "Cisco configuration and show evidence exist on authorized equipment, otherwise remain open.",
        "AOS-CX equivalent is executed or explicitly recorded as design only.",
        "Same-VLAN tests, inter-VLAN policy, saving and rollback are documented."
      ],
      "quiz": [
        {
          "q": "What must match between two switches carrying a VLAN?",
          "options": [
            "Only device names",
            "Link configuration and transport of that VLAN on both ends",
            "Every ACL must be disabled"
          ],
          "answer": 1,
          "explain": "The VLAN must exist and be carried consistently along the path."
        },
        {
          "q": "Why not paste AOS-CX commands into Comware?",
          "options": [
            "Syntax and configuration models differ",
            "VLAN exists only on Cisco",
            "Saving is unnecessary"
          ],
          "answer": 0,
          "explain": "The same brand can contain different network operating systems."
        }
      ]
    },
    "firewall-lab": {
      "title": "Practical OPNsense firewall lab",
      "goal": "Prove HTTP allowed and SSH blocked using logs and a ready destination.",
      "short": "Two isolated zones, a narrow rule, logs and a denied test",
      "steps": [
        {
          "title": "Create a separate profile",
          "html": "<p>Build FWLAB01 OPNsense 4 GB/40 GB, CLFW01 Windows 11 Pro 4 GB/80 GB and WEBFW01 Ubuntu 2 GB/40 GB, initially 2 vCPUs each. Prepare Windows/Ubuntu through NAT and install nginx, openssh-server and ufw before isolation. FWLAB01 has WAN NAT, LAN LAB-FW-USERS and OPT1 LAB-FW-SRV; record adapter MACs. Clients have one matching internal adapter. Do not bridge to the host or domain lab.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Install and assign interfaces",
          "html": "<p>Install OPNsense persistently to its empty disk, not just Live mode. Match NICs by MAC. Set LAN 10.40.10.1/24 and enabled OPT1 10.40.20.1/24 without DHCP. Set CLFW01 .10.50/24 gateway .10.1 and WEBFW01 .20.10/24 gateway .20.1. Use IP-based tests. Back up configuration and keep console access. Review private-network blocking only for this private NAT WAN; do not open WAN management. Inter-subnet traffic needs no NAT.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Build scoped ingress rules",
          "html": "<p>On WEBFW01 enable nginx/ssh and prove ports 80/22 listen. If UFW is active permit both only from 10.40.10.50 for this comparison. On firewall LAN order: management HTTPS from .10.50 to firewall LAN; logged TCP 80 from .10.50 to .20.10; logged block for other traffic from .10.50 to 10.40.20.0/24. Disable broad LAN-any only after management/backup/console recovery works. Review anti-lockout, floating/group/automatic rules; remove any bypass only after proving recovery. Do not allow general server-initiated traffic to users.</p>",
          "code": null,
          "label": null,
          "expect": "The narrow pass rule sits before the target block rule. Also check floating, group and automatic rules; do not generalise first-match without them."
        },
        {
          "title": "Prove the policy",
          "html": "<p>From CLFW01 expect HTTP/TCP 80 success and TCP 22 failure. Match source/destination/port/rule in Live View. Use ss on WEBFW01 to prove SSH is listening. Test fresh connections after changes; clear only the relevant test state when needed. Keep the known-good config backup. This does not publish a public website.</p>",
          "code": "curl.exe -I http://10.40.20.10\nTest-NetConnection 10.40.20.10 -Port 80\nTest-NetConnection 10.40.20.10 -Port 22\n# WEBFW01 console\n# sudo ss -lntp",
          "label": "CLFW01 · PowerShell; check ss separately on the Ubuntu console",
          "expect": "TCP 80 succeeds and TCP 22 is blocked; the log and the listening state show that the result comes from the policy. The web page is not published."
        }
      ],
      "tasks": [
        "All three VMs and MAC/interface mappings are isolated, without bridging or host port forwards.",
        "Addresses/gateways match; Nginx and SSH really listen on the destination.",
        "HTTP works and SSH is blocked with matching firewall log evidence.",
        "Management is limited, config backed up and fresh-connection tests recorded."
      ],
      "quiz": [
        {
          "q": "Why is a stopped SSH service a poor block-rule test?",
          "options": [
            "Failure may come from the absent service rather than the firewall",
            "SSH uses only UDP",
            "Logs never matter"
          ],
          "answer": 0,
          "explain": "Prove a ready destination and a matching policy log."
        },
        {
          "q": "Why test a new connection after changing a stateful rule?",
          "options": [
            "To erase all data",
            "An old connection state may remain valid",
            "The IP always changes"
          ],
          "answer": 1,
          "explain": "Existing states may continue under earlier decisions."
        }
      ]
    },
    "vendor-firewalls": {
      "title": "FortiGate and Palo Alto policy mapping",
      "goal": "Translate one access requirement into model-specific firewall policies.",
      "short": "Interfaces and zones, policy, NAT, logs and commit",
      "steps": [
        {
          "title": "Define the common requirement",
          "html": "<p>Specify interface/zone, source/destination subnet, return route and service owner. Permit only the required web access, not server management SSH. NAT and access authorization are separate; do not enable NAT unnecessarily between routed internal networks. Verify exact image/model/subscription entitlement.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "FortiOS example",
          "html": "<p>For the documented FortiOS 7.6.4 scenario use Policy & Objects → Firewall Policy with exact incoming/outgoing interfaces, address objects, schedule, service, ACCEPT and intended logging. No internal NAT is required here. Check rule order, Central SNAT/NGFW mode, config backup and Policy hit/Log & Report. Adapt to the actual licensed model/version.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "PAN-OS example",
          "html": "<p>For PAN-OS 11.1 use Policies → Security with correct zones, exact addresses and appropriate Application/Service. Understand application-default and App-ID rather than treating port rules as application control. Configure action/logging, inspect default interzone/intrazone rules and Commit successfully. NAT is a separate policy. Verify Traffic logs and fresh sessions.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Provide evidence and rollback",
          "html": "<p>For each vendor record model/version, policy ID, interfaces/zones, addresses, application/port, NAT, logs, permitted/denied tests and rollback. If only OPNsense is available, mark it as executed and commercial-vendor mappings as design. Reading or screenshots are not real configuration experience.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "The access matrix includes owner and review date.",
        "FortiOS policy/NAT/version and design-versus-execution status are recorded.",
        "PAN-OS zones/application/service/Commit and license limits are recorded.",
        "Available equipment has positive/negative tests and rule/log evidence; missing execution stays open."
      ],
      "quiz": [
        {
          "q": "When does a PAN-OS candidate change normally take effect?",
          "options": [
            "When opening the page",
            "After a successful Commit",
            "When renaming a backup file"
          ],
          "answer": 1,
          "explain": "Verify both Commit completion and runtime behavior."
        },
        {
          "q": "Does NAT alone grant general traffic access?",
          "options": [
            "Always",
            "Whenever the source is private",
            "No; translation and policy must be examined separately"
          ],
          "answer": 2,
          "explain": "Account for related automatic rules, but do not confuse translation with authorization."
        }
      ]
    },
    "infra-handover": {
      "title": "Infrastructure handover and failure test",
      "goal": "Deliver traceable diagrams, backups and a tested recovery procedure.",
      "short": "Physical and logical map, configuration backup and runbook",
      "steps": [
        {
          "title": "Connect physical and logical records",
          "html": "<p>Physical: rack/U, device, port, cable, power A/B and labels. Logical: VLAN, subnet, gateway, zone, route, policy and service. Join them through a shared asset ID; identify both cable ends and the owner/reason for each policy.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Back up usable configurations",
          "html": "<p>Export supported switch/firewall configurations securely with time, model and version. Configs may contain sensitive credentials/tokens; never paste complete backups into ordinary site notes. Test restoring a limited change on an authorized compatible lab device/VM and verify management access.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Introduce one reversible fault",
          "html": "<p>In the separate lab with console recovery, disable one test web rule or disconnect one virtual client cable. Collect user/device evidence and revert only that change. Do not perform physical power/PSU work without specialist planning and authorization. Shared power paths are not independent HA.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Complete acceptance",
          "html": "<p>Document requirement, design, inventory, config/version, positive/negative tests, recovery test, common dependencies, unfinished work and handover owner. Assign response/evidence responsibilities for temperature, power, disk, switch and firewall incidents. State VirtualBox and missing-equipment limitations.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Asset/port inventory matches rack, VLAN, IP, power and service ownership.",
        "Versioned secure configuration backups and one compatible restore test exist.",
        "A controlled lab fault and timed recovery were documented.",
        "The runbook identifies unfinished/specialist work and contains no passwords."
      ],
      "quiz": [
        {
          "q": "Why protect device configuration backups?",
          "options": [
            "They may contain secrets and sensitive management details",
            "They are always just pictures",
            "They can never be restored"
          ],
          "answer": 0,
          "explain": "A configuration can reveal topology and provide usable access material."
        },
        {
          "q": "How should physical and logical diagrams relate?",
          "options": [
            "They have no relationship",
            "They should map through asset and port identifiers",
            "One replaces the other"
          ],
          "answer": 1,
          "explain": "Troubleshooting must trace a logical service to the actual device/link."
        }
      ]
    }
  },
  "de": {
    "start": {
      "title": "Das virtuelle Lab aufbauen",
      "goal": "Bereite auf deinem 64-GB-Host eine isolierte Umgebung mit drei VMs vor.",
      "short": "VirtualBox, ISO-Dateien und Ressourcenplan",
      "steps": [
        {
          "title": "Host prüfen",
          "html": "<p>Verwende eine von Windows Server unterstützte x64-CPU, aktiviere VT-x/AMD-V im UEFI und installiere eine unterstützte VirtualBox-Version. Plane zunächst etwa 300 GB freien SSD-Speicher ein; Erweiterungen und Backups benötigen mehr. Dieser x64-Plan ist keine direkte Anleitung für ARM-Hosts.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Offizielle ISOs herunterladen",
          "html": "<p>Lade Windows Server 2025 und Windows 11 Enterprise aus dem Microsoft Evaluation Center herunter. Wähle für die Server Standard Evaluation (Desktop Experience). Windows 11 Pro mit gültiger Lizenz ist ebenfalls geeignet; Home kann AD nicht beitreten. Notiere Ablauf und Aktivierungsvorgaben. Nutze anfangs NAT für Updates und Aktivierung.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Drei VMs erstellen",
          "html": "<p>Erstelle DC01 (6 GB), SRV01 (4 GB) und CL01 (6 GB), jeweils mit 2 vCPUs und einer dynamischen 80-GB-SATA-VDI. Aktiviere Skip Unattended Installation. Installiere jedes Betriebssystem separat. Richte EFI, Secure Boot und virtuelles TPM 2.0 für Windows 11 bedarfsgerecht ein. Verwende zunächst je VM einen verbundenen NAT-Adapter.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Netztrennung planen",
          "html": "<p>Fahre nach Installation und Updates alle VMs herunter und stelle den einzigen Adapter auf Internal Network: LAB-CORP. Der Name muss exakt übereinstimmen. Verwende keine Netzwerkbrücke und keinen zweiten NAT-Adapter am DC. Dieses Ausgangsnetz hat weder Gateway noch Internet oder VirtualBox-DHCP; später übernimmt SRV01 DHCP.</p>",
          "code": "VBoxManage list dhcpservers",
          "label": "Host · Terminal mit VirtualBox im PATH",
          "expect": "Für LAB-CORP ist kein VirtualBox-DHCP aktiv. Ändere keine anderen VirtualBox-Netze."
        }
      ],
      "tasks": [
        "VirtualBox startet; CPU-Anforderungen und Hardwarevirtualisierung sind geprüft.",
        "Offizielle Server-/Client-ISOs, Editionen und Ablaufdaten sind dokumentiert.",
        "DC01/SRV01/CL01 haben 6/4/6 GB RAM, je 2 vCPUs und dynamische 80-GB-Disks.",
        "Ich kann NAT zur Vorbereitung und das spätere isolierte LAB-CORP erklären."
      ],
      "quiz": [
        {
          "q": "Welcher Modus verbindet nur die Lab-VMs miteinander?",
          "options": [
            "Netzwerkbrücke",
            "Internes Netzwerk LAB-CORP",
            "Separates NAT je VM"
          ],
          "answer": 1,
          "explain": "Ein internes Netzwerk verbindet VMs mit gleichem Netznamen ohne Brücke ins physische LAN."
        },
        {
          "q": "Wie viel RAM belegt der Basisplan?",
          "options": [
            "16 GB",
            "48 GB",
            "64 GB"
          ],
          "answer": 0,
          "explain": "6 + 4 + 6 = 16 GB; der übrige Speicher bleibt für Host und Erweiterungen."
        }
      ]
    },
    "install": {
      "title": "Windows Server installieren",
      "goal": "Installiere, aktualisiere, benenne und adressiere die drei Maschinen.",
      "short": "Installation, Updates und feste IP-Adressen",
      "steps": [
        {
          "title": "Installieren und aktualisieren",
          "html": "<p>Starte DC01 von der Server-ISO. Wähle die Sprache, dann Install now, <b>Standard Evaluation (Desktop Experience)</b> und eine benutzerdefinierte Installation auf der leeren 80-GB-Disk. Bestätige nur die Disk dieser VM. Lege ein starkes lokales Administratorkennwort fest. Wiederhole das für SRV01 und installiere CL01 mit der Client-ISO im normalen Setup.</p><p>Nutze NAT für Ersteinrichtung, Aktivierung und Windows Update. Installiere bei Bedarf die Guest Additions über das Menü Devices und starte neu, bis alle Updates installiert sind. Prüfe die Serveraktivierung mit <code>slmgr /xpr</code>. Installiere auf CL01 vor der Netztrennung über Optionale Features <b>RSAT: Active Directory Domain Services and Lightweight Directory Services Tools</b>; du brauchst es für die Delegierungsübung. Notiere die Testzeiträume; speichere hier keine Kennwörter.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Name und Ausgangsstand",
          "html": "<p>Benenne jede VM mit Windows PowerShell als Administrator korrekt; das Beispiel gilt für DC01. Starte neu, entferne die ISO, fahre vollständig herunter und erstelle vor dem Domänenaufbau den Snapshot 01-baseline. Stelle alle Adapter auf LAB-CORP und starte die Maschinen.</p>",
          "code": "Rename-Computer -NewName \"DC01\" -Restart",
          "label": null,
          "expect": "hostname zeigt auf jeder VM den Namen dieser Maschine. Der Snapshot enthält noch den Stand vor dem Domänenaufbau."
        },
        {
          "title": "Statisches IPv4 setzen",
          "html": "<p>Verwende unter ncpa.cpl → Ethernet → Properties → IPv4 für DC01 10.20.0.10/24, für SRV01 .20/24 und vorläufig für CL01 .50/24. DNS ist überall 10.20.0.10; Gateway und alternativen DNS leer lassen. IPv6 und Windows-Firewall bleiben aktiv. DNS wird später installiert. Prüfe die Uhrzeiten.</p>",
          "code": "hostname\nGet-NetAdapter\nGet-NetIPConfiguration\nGet-Date",
          "label": null,
          "expect": "Jede VM hat einen aktiven Adapter mit korrektem IPv4 und DNS und ohne Gateway; Datum und Uhrzeit stimmen überein."
        },
        {
          "title": "Verbindung prüfen",
          "html": "<p>Prüfe hostname, Get-NetIPConfiguration, Cable Connected und identische LAB-CORP-Namen. Ping kann durch die Firewall blockiert sein; eine fehlende Antwort allein beweist keinen Netzfehler. Prüfe Dienstports, sobald die Dienste existieren. Fehlendes Internet ist hier normal.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Server Desktop Experience und Windows 11 Pro/Enterprise laufen; Aktivierung und Updates sind geprüft.",
        "Alle VMs nutzen nur LAB-CORP; Snapshot 01-baseline wurde nach dem Herunterfahren erstellt.",
        "IPs sind .10/.20/.50 mit /24; kein Standardgateway ist gesetzt.",
        "Alle VMs haben eindeutige Namen und DNS 10.20.0.10."
      ],
      "quiz": [
        {
          "q": "Welche Installation enthält die im Lab verwendete Oberfläche?",
          "options": [
            "Server Core",
            "Desktop Experience",
            "Nur eine VHD-Datei"
          ],
          "answer": 1,
          "explain": "Desktop Experience enthält die grafische Oberfläche; Core folgt als Vertiefung."
        },
        {
          "q": "Welches Gateway gehört ins anfänglich isolierte Netz?",
          "options": [
            "10.20.0.1 ohne Router",
            "Der Heimrouter",
            "Keines"
          ],
          "answer": 2,
          "explain": "Es gibt noch keinen Router; eine erfundene Adresse erzeugt kein Internet."
        }
      ]
    },
    "ad": {
      "title": "Die erste AD-Domäne erstellen",
      "goal": "Erstelle corp.example.test und prüfe die Verzeichnisdienste.",
      "short": "AD DS, DNS und der erste Domänencontroller",
      "steps": [
        {
          "title": "Vor der Heraufstufung prüfen",
          "html": "<p>Das Lab nutzt eine Gesamtstruktur und eine Domäne corp.example.test, zunächst mit einem DC. Prüfe auf DC01 die feste IP 10.20.0.10, DNS auf sich selbst, korrekte Uhrzeit und keinen ausstehenden Neustart. Der reservierte .test-Name gilt nur fürs Lab.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "AD DS installieren",
          "html": "<p>Nutze Server Manager → Manage → Add Roles and Features → Role-based → Active Directory Domain Services einschließlich Verwaltungstools oder den Befehl als Administrator auf DC01. Die Rolleninstallation allein erzeugt keinen Domänencontroller.</p>",
          "code": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools",
          "label": null,
          "expect": "Success = True. Die Rolleninstallation allein macht DC01 noch nicht zum Domänencontroller."
        },
        {
          "title": "Gesamtstruktur erstellen",
          "html": "<p>Wähle Promote this server to a domain controller → Add a new forest: corp.example.test. Aktiviere DNS und Global Catalog, verwende NetBIOS CORP und Standardpfade. Gib ein eigenes DSRM-Kennwort sicher ein. Prüfe Voraussetzungen vor dem Neustart. Eine DNS-Delegierungswarnung ist in diesem isolierten Szenario erwartbar, nicht jeder andere Fehler.</p>",
          "code": "Install-ADDSForest -DomainName \"corp.example.test\" -DomainNetbiosName \"CORP\" -InstallDNS",
          "label": null,
          "expect": "Eine Delegierungswarnung ist in einer isolierten Testdomäne ohne übergeordnetes DNS zu erwarten; prüfe jeden anderen Fehler, bevor du weitermachst."
        },
        {
          "title": "AD prüfen",
          "html": "<p>Melde dich als CORP\\Administrator an. Prüfe Domänenname, laufende Dienste NTDS/DNS, Freigaben SYSVOL/NETLOGON und AD-DNS-Diagnose. Externe Namensauflösung ist ohne Internet kein Kriterium. Ein zweiter DC und ein unabhängiges Backup erfüllen unterschiedliche Zwecke.</p>",
          "code": "Get-ADDomain | Select-Object DNSRoot,NetBIOSName\nGet-Service NTDS,DNS\nnet share\ndcdiag /test:dns",
          "label": null,
          "expect": "corp.example.test und CORP werden angezeigt; die Dienste laufen und SYSVOL sowie NETLOGON existieren. Prüfe AD-DNS-Fehler, statt alle Warnungen pauschal zu übergehen."
        }
      ],
      "tasks": [
        "Get-ADDomain liefert corp.example.test und CORP.",
        "NTDS und DNS haben den Status Running.",
        "SYSVOL und NETLOGON existieren; AD-bezogene DNS-Fehler sind behoben.",
        "Domänenanmeldung funktioniert; das DSRM-Kennwort liegt sicher außerhalb der Website."
      ],
      "quiz": [
        {
          "q": "Was bewirkt nur die AD-DS-Installation?",
          "options": [
            "Erstellt automatisch die Domäne",
            "Installiert Komponenten; Heraufstufung ist separat",
            "Nimmt jeden Client auf"
          ],
          "answer": 1,
          "explain": "Die Heraufstufung erstellt die Gesamtstruktur oder fügt den DC einer vorhandenen Domäne hinzu."
        },
        {
          "q": "Wofür ist das DSRM-Kennwort?",
          "options": [
            "Verzeichnisdienst-Wiederherstellungsmodus",
            "WLAN-Zugang",
            "Tägliche Anmeldung aller Benutzer"
          ],
          "answer": 0,
          "explain": "DSRM wird bei Wiederherstellungsverfahren für Domänencontroller verwendet."
        }
      ]
    },
    "dns": {
      "title": "DNS verstehen und prüfen",
      "goal": "Prüfe A-, PTR- und SRV-Einträge über den internen DNS-Server.",
      "short": "Zonen, A- und PTR-Einträge und Dienstsuche",
      "steps": [
        {
          "title": "Vorhandene Zonen prüfen",
          "html": "<p>Öffne Server Manager → Tools → DNS. Prüfe corp.example.test und AD-Diensteinträge. A ordnet einen Host IPv4 zu, SRV beschreibt Dienste. Frage DC01 und den LDAP-SRV-Eintrag direkt bei 10.20.0.10 ab; erwartet werden DC01 und Port 389.</p>",
          "code": "Resolve-DnsName dc01.corp.example.test -Server 10.20.0.10\nResolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.corp.example.test -Server 10.20.0.10",
          "label": null,
          "expect": "DC01 wird zu 10.20.0.10 aufgelöst. Die SRV-Antwort enthält dc01.corp.example.test und Port 389."
        },
        {
          "title": "Servereintrag ergänzen",
          "html": "<p>Erstelle auf DC01 den A-Eintrag srv01 → 10.20.0.20. Prüfe zuvor auf vorhandene Einträge. Der Hostname srv01 ist kein Eintrag vom Typ SRV. Frage ihn direkt beim internen DNS ab.</p>",
          "code": "Add-DnsServerResourceRecordA -Name \"srv01\" -ZoneName \"corp.example.test\" -IPv4Address \"10.20.0.20\"\nResolve-DnsName srv01.corp.example.test -Server 10.20.0.10",
          "label": null,
          "expect": "Die Antwort ist 10.20.0.20. Prüfe bei einer Wiederholung den vorhandenen Eintrag, statt einen doppelten anzulegen."
        },
        {
          "title": "Rückwärtsauflösung erstellen",
          "html": "<p>Erstelle eine AD-integrierte IPv4-Reverse-Zone für Netzwerk-ID 10.20.0 (/24) und den PTR für SRV01. Die Abfrage von 10.20.0.20 soll srv01.corp.example.test liefern. A und PTR sind getrennte Einträge; einer beweist nicht den anderen.</p>",
          "code": "Add-DnsServerPrimaryZone -NetworkId \"10.20.0.0/24\" -ReplicationScope Domain\nAdd-DnsServerResourceRecordPtr -Name \"20\" -ZoneName \"0.20.10.in-addr.arpa\" -PtrDomainName \"srv01.corp.example.test\"\nResolve-DnsName 10.20.0.20 -Server 10.20.0.10",
          "label": null,
          "expect": "Der Name srv01.corp.example.test wird zurückgegeben. A und PTR sind getrennte Einträge; einer beweist nicht den anderen."
        },
        {
          "title": "Geordnet Fehler suchen",
          "html": "<p>Prüfe Client-IP/DNS, DNS-Erreichbarkeit, Dienst, Zone, Eintrag und Cache. Test-NetConnection -Port 53 prüft nur TCP; eine DNS-Abfrage prüft die Auflösung. Trage auf Domänenmitgliedern keinen öffentlichen DNS als Alternative ein. Forwarder folgen später.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "DC01 wird über 10.20.0.10 zu 10.20.0.10 aufgelöst.",
        "Der A-Eintrag srv01 zeigt auf 10.20.0.20.",
        "Die Rückwärtsauflösung von .20 liefert srv01.corp.example.test.",
        "Die LDAP-SRV-Abfrage liefert DC01 und Port 389."
      ],
      "quiz": [
        {
          "q": "Welcher Eintrag hilft beim Finden eines DC?",
          "options": [
            "Nur PTR",
            "SRV",
            "MX"
          ],
          "answer": 1,
          "explain": "AD veröffentlicht Dienstadressen wie LDAP über SRV-Einträge."
        },
        {
          "q": "Welchen DNS nutzen Domänenmitglieder hier?",
          "options": [
            "8.8.8.8 als Alternative",
            "Heimrouter",
            "10.20.0.10"
          ],
          "answer": 2,
          "explain": "Der interne DNS kennt die privaten AD-Zonen, öffentliche Resolver nicht."
        }
      ]
    },
    "dhcp": {
      "title": "Clients aufnehmen und DHCP einrichten",
      "goal": "Nimm SRV01 und CL01 auf und verteile korrekte Leases und DNS-Einstellungen.",
      "short": "Domänenbeitritt, Bereich, Optionen und Leases",
      "steps": [
        {
          "title": "Domäne beitreten",
          "html": "<p>DC01 bleibt aktiv. SRV01 hat statisch .20, CL01 vorläufig .50; beide nutzen DNS .10. Führe den Beitritt erst auf SRV01, dann CL01 als lokaler Administrator aus. Gib CORP\\Administrator nur im Anmeldedialog ein. Starte neu und prüfe den sicheren Kanal; bei Fehlern zuerst DNS und Zeit.</p>",
          "code": "Add-Computer -DomainName \"corp.example.test\" -Credential (Get-Credential) -Restart",
          "label": null,
          "expect": "Nach dem Neustart liefert Test-ComputerSecureChannel True. Prüfe bei einem Fehler zuerst DNS und Uhrzeit."
        },
        {
          "title": "DHCP installieren und autorisieren",
          "html": "<p>Führe die Befehle im Lab auf SRV01 erhöht als CORP\\Administrator aus. Installiere DHCP mit Verwaltungstools, autorisiere SRV01 in AD und aktualisiere die DHCP-Konsole bei Verzögerung. In Unternehmen werden Rechte rollenbezogen vergeben.</p>",
          "code": "Install-WindowsFeature DHCP -IncludeManagementTools\nAdd-DhcpServerSecurityGroup\nRestart-Service DHCPServer\nAdd-DhcpServerInDC -DnsName \"srv01.corp.example.test\" -IPAddress 10.20.0.20\nGet-DhcpServerInDC",
          "label": null,
          "expect": "SRV01 ist autorisiert. Warte bei Verzögerung kurz und aktualisiere die DHCP-Konsole."
        },
        {
          "title": "Bereich und Optionen setzen",
          "html": "<p>Erstelle den aktiven Bereich 10.20.0.100–199 außerhalb der festen Serveradressen. Setze Option 006 auf 10.20.0.10 und 015 auf corp.example.test. Setze 003 erst, wenn ein Router existiert. VirtualBox-DHCP bleibt für LAB-CORP deaktiviert.</p>",
          "code": "Add-DhcpServerv4Scope -Name \"LAB-Clients\" -StartRange 10.20.0.100 -EndRange 10.20.0.199 -SubnetMask 255.255.255.0 -State Active\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -DnsServer 10.20.0.10 -DnsDomain \"corp.example.test\"\nGet-DhcpServerv4Scope\nGet-DhcpServerv4OptionValue -ScopeId 10.20.0.0",
          "label": null,
          "expect": "Der Bereich ist aktiv; Option 006 ist 10.20.0.10, Option 015 ist corp.example.test und Option 003 fehlt."
        },
        {
          "title": "Automatische Clienteinstellungen",
          "html": "<p>Wähle auf CL01 automatische IPv4- und DNS-Zuweisung, führe release/renew aus und prüfe ipconfig /all. Prüfe Leases separat auf SRV01. Erwartet: Client .100–199, DHCP .20, DNS .10. Bei 169.254 prüfst du Bereich, Autorisierung, Dienst und virtuelles Netz.</p>",
          "code": "# CL01\nipconfig /release\nipconfig /renew\nipconfig /all\n# SRV01\nGet-DhcpServerv4Lease -ScopeId 10.20.0.0",
          "label": null,
          "expect": "Die Client-IP liegt zwischen 10.20.0.100 und 10.20.0.199; DHCP ist 10.20.0.20, DNS ist 10.20.0.10 und das passende Lease ist sichtbar."
        }
      ],
      "tasks": [
        "SRV01 und CL01 sind Domänenmitglieder mit funktionierendem sicheren Kanal.",
        "SRV01 mit 10.20.0.20 ist in AD als DHCP-Server autorisiert.",
        "Der Bereich ist aktiv, mit DNS .10, Suffix corp.example.test und ohne vorzeitige Gateway-Option.",
        "CL01 erhält ein gültiges Lease; Clientausgabe und Lease auf SRV01 stimmen überein."
      ],
      "quiz": [
        {
          "q": "Warum DHCP in AD autorisieren?",
          "options": [
            "Um berechtigte DHCP-Server der Domäne zu steuern",
            "Um Internet zu erzeugen",
            "Um DNS abzuschalten"
          ],
          "answer": 0,
          "explain": "Autorisierung ist von Installation und Bereichsaktivierung getrennt."
        },
        {
          "q": "Worauf deutet 169.254.x.x hier meist hin?",
          "options": [
            "Ein erfolgreiches Domänenbackup",
            "Kein nutzbares DHCP-Lease erhalten",
            "Korrekte statische Serverkonfiguration"
          ],
          "answer": 1,
          "explain": "Prüfe DHCP-Erreichbarkeit, Bereich, Dienst und Autorisierung vor anderen Änderungen."
        }
      ]
    },
    "identities": {
      "title": "Benutzer, OUs und Gruppen",
      "goal": "Erstelle Identitäten und ordne Zuständigkeiten.",
      "short": "OUs, Onboarding neuer Kollegen und Zugriff nach AGDLP",
      "steps": [
        {
          "title": "OU-Struktur erstellen",
          "html": "<p>Eine OU ordnet Objekte, Delegierung und GPO-Verknüpfungen; sie erteilt selbst keine Dateirechte. Erstelle auf DC01 in dsa.msc oder erhöhter PowerShell Lab mit Benutzer, Gruppen und Computer. Behalte die Namen für Befehlsverträglichkeit. Verschiebe nur SRV01 und CL01 nach Lab/Computer; DC01 bleibt unter Domain Controllers.</p>",
          "code": "New-ADOrganizationalUnit -Name \"Lab\" -Path \"DC=corp,DC=example,DC=test\"\n$base = \"OU=Lab,DC=corp,DC=example,DC=test\"\n\"Benutzer\",\"Gruppen\",\"Computer\" | ForEach-Object {\n  New-ADOrganizationalUnit -Name $_ -Path $base\n}",
          "label": null,
          "expect": "Vier OUs sind sichtbar. Verschiebe in Active Directory-Benutzer und -Computer SRV01 und CL01 von Computers nach Lab/Computer. DC01 bleibt, wo es ist."
        },
        {
          "title": "Testbenutzer erstellen",
          "html": "<p>Erstelle die genannten Testkonten unter Lab/Benutzer. Gib Startkennwörter sicher ein, verlange den Wechsel bei der ersten Anmeldung und dokumentiere nur nicht geheime Kontodaten. Prüfe Distinguished Names und Aktivierungsstatus.</p>",
          "code": "$pw = Read-Host \"Temporary password for Lena\" -AsSecureString\nNew-ADUser -Name \"Lena Weber\" -SamAccountName \"lena.weber\" -UserPrincipalName \"lena.weber@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true\n$pw = Read-Host \"Temporary password for Tom\" -AsSecureString\nNew-ADUser -Name \"Tom Klein\" -SamAccountName \"tom.klein\" -UserPrincipalName \"tom.klein@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true",
          "label": null,
          "expect": "Get-ADUser lena.weber zeigt Enabled = True, und beide Konten liegen in der OU Benutzer."
        },
        {
          "title": "AGDLP-Gruppen aufbauen",
          "html": "<p>Konten → globale Gruppe → domänenlokale Gruppe → Berechtigungen. Füge Lena zu GG_Finanzen hinzu und verschachtele diese Gruppe in DL_Finanzen_RW. Die Ressourcengruppe erhält in der nächsten Lektion Dateirechte.</p>",
          "code": "$path = \"OU=Gruppen,OU=Lab,DC=corp,DC=example,DC=test\"\nNew-ADGroup -Name \"GG_Finanzen\" -GroupScope Global -GroupCategory Security -Path $path\nNew-ADGroup -Name \"DL_Finanzen_RW\" -GroupScope DomainLocal -GroupCategory Security -Path $path\nAdd-ADGroupMember \"GG_Finanzen\" -Members \"lena.weber\"\nAdd-ADGroupMember \"DL_Finanzen_RW\" -Members \"GG_Finanzen\"\nGet-ADGroupMember \"DL_Finanzen_RW\" -Recursive",
          "label": null,
          "expect": "Die rekursive Abfrage zeigt Lena, aber nicht Tom. Nach Gruppenänderungen meldet sich der Benutzer ab und wieder an, damit das Token erneuert wird."
        },
        {
          "title": "Echte Anmeldung prüfen",
          "html": "<p>Melde dich auf CL01 mit dem Test-Domänenbenutzer an und prüfe whoami. Melde dich nach Gruppenänderungen ab und neu an, damit das Token neu entsteht. Dokumentiere Erstellung, Gruppenzuweisung und das gezielte Deaktivieren des Kontos.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Lab/Benutzer/Gruppen/Computer existieren; SRV01 und CL01 liegen unter Lab/Computer, DC01 bleibt in Domain Controllers.",
        "lena.weber und tom.klein sind unter Lab/Benutzer aktiviert und müssen das Startkennwort ändern.",
        "GG_Finanzen enthält nur Lena; DL_Finanzen_RW enthält GG_Finanzen und hat DomainLocal/Security.",
        "Lena meldet sich auf CL01 an und ändert ihr Kennwort; keines der Testkonten ist Domain Admin."
      ],
      "quiz": [
        {
          "q": "Warum Rechte über Gruppen vergeben?",
          "options": [
            "Um alle zu Domänenadministratoren zu machen",
            "Um Tests zu vermeiden",
            "Um Zugriff rollenbezogen und nachvollziehbar zu verwalten"
          ],
          "answer": 2,
          "explain": "Gruppen vereinfachen die Rollenverwaltung; effektiven Zugriff prüfst du separat."
        },
        {
          "q": "Wie erneuerst du das Benutzertoken nach Gruppenänderungen?",
          "options": [
            "Abmelden und neu anmelden",
            "Den Monitor umbenennen",
            "DNS löschen"
          ],
          "answer": 0,
          "explain": "Bestehende Sitzungen können alte Gruppenmitgliedschaften im Zugriffstoken behalten."
        }
      ]
    },
    "access": {
      "title": "Dateizugriff und Gruppenrichtlinien",
      "goal": "Beweise erlaubten und verweigerten Zugriff mit normalen Benutzern.",
      "short": "Dateifreigabe, NTFS-Rechte und das erste GPO",
      "steps": [
        {
          "title": "Ordner und NTFS-Rechte erstellen",
          "html": "<p>Erstelle auf SRV01 als CORP\\Administrator den neuen leeren Lab-Ordner. Die Befehle entfernen nur hier Vererbung, geben SYSTEM/lokalen Administratoren Full Control und der Ressourcengruppe Modify. SIDs verringern Sprachabhängigkeit von Kontonamen. Wende dies nicht auf vorhandene Geschäftsdaten an.</p>",
          "code": "New-Item -Path \"C:\\LabShares\\Finanzen\" -ItemType Directory -Force\nicacls \"C:\\LabShares\\Finanzen\" /inheritance:r\nicacls \"C:\\LabShares\\Finanzen\" /grant:r \"*S-1-5-18:(OI)(CI)F\" \"*S-1-5-32-544:(OI)(CI)F\" \"CORP\\DL_Finanzen_RW:(OI)(CI)M\"\nicacls \"C:\\LabShares\\Finanzen\"",
          "label": null,
          "expect": "Nur die vorgesehenen expliziten Berechtigungen bleiben übrig. Prüfe den Ordnerpfad vor der Ausführung."
        },
        {
          "title": "SMB-Freigabe erstellen",
          "html": "<p>Gib den Ordner auf SRV01 frei. Freigabe- und NTFS-Rechte wirken zusammen; die restriktivere effektive Kombination begrenzt den Zugriff. Ist TCP 445 blockiert, aktiviere in wf.msc eingehende File-and-Printer-Sharing-Regeln nur für das Domänenprofil; schalte nicht die Firewall ab.</p>",
          "code": "New-SmbShare -Name \"Finanzen\" -Path \"C:\\LabShares\\Finanzen\" -ChangeAccess \"CORP\\DL_Finanzen_RW\"\nGet-SmbShareAccess -Name \"Finanzen\"",
          "label": null,
          "expect": "DL_Finanzen_RW hat Change. Füge keinen pauschalen Eintrag Everyone/Full Control hinzu."
        },
        {
          "title": "Positive und negative Fälle prüfen",
          "html": "<p>Melde dich auf CL01 getrennt als berechtigter und unberechtigter Testbenutzer an. Prüfe Lesen, Erstellen und Ändern einer kleinen Datei unter \\\\SRV01\\Finanzen. Notiere whoami und das Ergebnis; eine Administratorsitzung beweist keine Benutzerrechte.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Begrenztes GPO anwenden",
          "html": "<p>Öffne gpmc.msc auf DC01. Erstelle LAB-LogonBanner und verknüpfe es mit Lab/Computer. Bearbeite Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options. Setze Interactive logon: Message title auf ServerLab und den Meldungstext auf Nur zum Lernen. Behalte Authenticated Users im Lab. Aktualisiere auf CL01 die Richtlinie, prüfe gpresult und das Anmeldebanner.</p>",
          "code": "# CL01 - Run as administrator\ngpupdate /force\ngpresult /r /scope computer",
          "label": null,
          "expect": "LAB-LogonBanner erscheint unter den angewendeten Computer-GPOs, und die Meldung wird bei der nächsten Anmeldung angezeigt. Die Default Domain Policy bleibt unverändert."
        }
      ],
      "tasks": [
        "Die Freigabe existiert; DL_Finanzen_RW hat Change auf Freigabe- und Modify auf NTFS-Ebene.",
        "Nach neuer CL01-Anmeldung kann Lena in der Freigabe Dateien erstellen und ändern.",
        "Tom erhält Access denied und ist nicht in der Finanzgruppe.",
        "LAB-LogonBanner ist mit Lab/Computer verknüpft; CL01 zeigt die Meldung und gpresult bestätigt die Anwendung."
      ],
      "quiz": [
        {
          "q": "Welche Rechte zählen beim SMB-Zugriff?",
          "options": [
            "Nur der Ordnername",
            "Nur das Hintergrundbild",
            "Freigabe- und NTFS-Rechte zusammen"
          ],
          "answer": 2,
          "explain": "Prüfe beide Berechtigungsebenen und das tatsächliche Benutzertoken."
        },
        {
          "q": "Welche Ausgabe hilft beim Prüfen angewendeter GPOs?",
          "options": [
            "gpresult",
            "Ein Bild des Monitormodells",
            "Nur eine DHCP-Reservierung"
          ],
          "answer": 0,
          "explain": "gpresult zeigt die Richtlinienanwendung für den Benutzer-/Computerkontext."
        }
      ]
    },
    "operations": {
      "title": "Die erste Supportschicht",
      "goal": "Untersuche einen Fehler, dokumentiere Nachweise und übergib das Ergebnis.",
      "short": "Support, Zugriffsentzug und Übergabe",
      "steps": [
        {
          "title": "DNS-Fehler erzeugen und beheben",
          "html": "<p>Notiere auf CL01 den Ausgangsstand, setze DNS vorübergehend auf die ungenutzte 10.20.0.254, leere den Cache und frage den genannten Eintrag ab. Stelle automatisches DNS wieder her und erneuere das Lease. Die Windows-Firewall bleibt aktiv. Prüfe danach Auflösung und sicheren Kanal.</p>",
          "code": "# CL01: after setting the incorrect DNS\nipconfig /flushdns\nResolve-DnsName dc01.corp.example.test -Server 10.20.0.254\n# After restoring automatic DNS\nipconfig /renew\nResolve-DnsName dc01.corp.example.test\nTest-ComputerSecureChannel",
          "label": null,
          "expect": "Die direkte Abfrage an 10.20.0.254 scheitert; nach der Korrektur wird DC01 zu 10.20.0.10 aufgelöst und der sichere Kanal ist True. Eine zwischengespeicherte Anmeldung allein beweist keine DC-Erreichbarkeit."
        },
        {
          "title": "Testmitarbeiterin abmelden",
          "html": "<p>Deaktiviere Lena nach den Zugriffstests auf DC01 und entferne sie aus GG_Finanzen. Melde sie auf CL01 vollständig ab und versuche eine neue Online-Anmeldung bei erreichbarem DC. Sie muss scheitern. Deaktivierung beendet vorhandene Sitzungen und Tokens nicht sofort.</p>",
          "code": "Disable-ADAccount -Identity \"lena.weber\"\nRemove-ADGroupMember \"GG_Finanzen\" -Members \"lena.weber\" -Confirm:$true\nGet-ADUser \"lena.weber\" | Select-Object SamAccountName,Enabled\nGet-ADGroupMember \"GG_Finanzen\"",
          "label": null,
          "expect": "Enabled = False, und Lena ist nicht mehr in GG_Finanzen. Im Unternehmen gehören auch das Beenden von Sitzungen, die Datenübergabe und die Prüfung weiterer Systeme zum Zugriffsentzug."
        },
        {
          "title": "Ergebnisse und Übergabe",
          "html": "<p>Prüfe dcdiag /test:dns auf DC01, DHCP-Bereich/Leases auf SRV01 und DNS/Computer-GPO auf CL01. Notiere Symptom, Ursache, Änderung, Tests und Rückfall. Aktiviere für eine Wiederholung gezielt nur lena.weber, füge sie GG_Finanzen erneut hinzu und melde sie neu an. Speichere hier keine Kennwörter.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Unternehmensvertiefungen vorbereiten",
          "html": "<p>Wähle anschließend Automatisierung, zweiten DC, Delegierung, Wiederherstellung, Überwachung oder Änderungsverwaltung. Ein Snapshot ist nur ein lokaler Rückfallpunkt, kein unabhängiges Backup. Setze DCs nicht unüberlegt zurück. Fahre für einen vollständigen Neubeginn alle VMs herunter und stelle alle auf den Stand vor der Domäne zurück oder installiere neu; fachgerechte AD-Wiederherstellung ist ein separates Ziel.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Falsches Client-DNS wurde erzeugt, diagnostiziert und auf automatisch zurückgesetzt; Auflösung und sicherer Kanal funktionieren wieder.",
        "Lena ist deaktiviert und aus GG_Finanzen entfernt; eine neue Online-Anmeldung auf CL01 scheitert.",
        "Die Übergabe erfasst DC-/DNS-/DHCP-Zustand, GPO und Positiv-/Negativzugriffstests.",
        "Grundlagengrenzen sind dokumentiert: ein DC, noch kein geprüftes Restore und keine Hochverfügbarkeit."
      ],
      "quiz": [
        {
          "q": "Was solltest du vor einer Systemänderung tun?",
          "options": [
            "Mehreres gleichzeitig ändern",
            "Ausgangsstand und eindeutigen Test festhalten",
            "Alle Protokolle löschen"
          ],
          "answer": 1,
          "explain": "Ein Ausgangsstand macht die Wirkung einer Änderung nachvollziehbar."
        },
        {
          "q": "Ist ein VM-Snapshot ein unabhängiges Backup?",
          "options": [
            "Ja, immer",
            "Nein; er teilt Abhängigkeiten mit dem VM-Speicher",
            "Nur bei langem Namen"
          ],
          "answer": 1,
          "explain": "Plane getrennte geschützte Backups und prüfe die Wiederherstellung."
        }
      ]
    },
    "automation": {
      "title": "Konten mit PowerShell automatisieren",
      "goal": "Importiere eine kleine CSV sicher und beweise wiederholbare Ausführung.",
      "short": "CSV, Vorschau, Eingabeprüfung und wiederholbare Ausführung",
      "steps": [
        {
          "title": "Testdaten vorbereiten",
          "html": "<p>Erstelle auf DC01 C:\\LabOps und speichere users.csv in UTF-8 mit exakt den Beispielspalten. Import-Csv muss zwei Zeilen und drei Spalten zeigen. Kennwörter gehören nicht in die CSV.</p>",
          "code": "Sam,GivenName,Surname\nlab.user01,Lab,One\nlab.user02,Lab,Two",
          "label": "CSV-Inhalt · kein PowerShell-Befehl",
          "expect": "Zwei Datenzeilen; es gibt keine Kennwortspalte."
        },
        {
          "title": "Validieren und Vorschau",
          "html": "<p>Führe den Block in Windows PowerShell auf DC01 aus. Er begrenzt Benutzernamen und überspringt vorhandene Konten. Gib temporäre Kennwörter sicher ein. Behalte für die Vorschau -WhatIf an New-ADUser; das ist keine allgemeine Sicherheitsgarantie für beliebige Skripte.</p>",
          "code": "Import-Csv C:\\LabOps\\users.csv | ForEach-Object {\n  $sam = $_.Sam\n  if ($sam -notmatch '^lab\\.user0[12]$') { throw \"Unexpected test account\" }\n  if (Get-ADUser -Filter \"SamAccountName -eq '$sam'\") {\n    Write-Warning \"Already exists: $sam\"\n    return\n  }\n  $pw = Read-Host \"Temporary password for $sam\" -AsSecureString\n  New-ADUser -Name \"$($_.GivenName) $($_.Surname)\" -SamAccountName $sam -UserPrincipalName \"$sam@corp.example.test\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" -AccountPassword $pw -Enabled $true -ChangePasswordAtLogon $true -WhatIf\n}",
          "label": null,
          "expect": "Die What-if-Meldung erscheint; Get-ADUser findet noch keines der beiden Konten."
        },
        {
          "title": "Ausführen und wiederholen",
          "html": "<p>Entferne -WhatIf an New-ADUser erst nach Prüfung der Vorschau. Führe den Block erneut aus und erwarte Already exists statt Duplikaten. Exportiere eine Ergebnisliste ohne Geheimnisse.</p>",
          "code": "Get-ADUser -Filter 'SamAccountName -like \"lab.user0*\"' -SearchBase \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\" | Select-Object SamAccountName,Enabled,DistinguishedName | Export-Csv C:\\LabOps\\created-users.csv -NoTypeInformation -Encoding UTF8",
          "label": null,
          "expect": "Nur lab.user01 und lab.user02 existieren in der Ziel-OU. Beim zweiten Lauf ändert sich die Anzahl der Konten nicht."
        },
        {
          "title": "Rückfall dokumentieren",
          "html": "<p>Notiere die beiden Kontonamen, Zeitpunkt, Vorschau und Ergebnis des zweiten Laufs. Deaktiviere beim Rückfall nur diese Lab-Konten statt breiter Filter. Versioniere Skript und geheimnisfreie CSV.</p>",
          "code": "Disable-ADAccount -Identity lab.user01 -WhatIf\nDisable-ADAccount -Identity lab.user02 -WhatIf",
          "label": null,
          "expect": "Die Rückfall-Vorschau betrifft nur diese beiden Konten. Entferne -WhatIf für einen echten Rückfall erst, nachdem du die Namen bestätigt hast."
        }
      ],
      "tasks": [
        "Die CSV enthält zwei gültige eindeutige Benutzernamen und keine Kennwörter.",
        "Die -WhatIf-Vorschau hat keine Konten erstellt.",
        "Nur die beiden Zielkonten wurden in Lab/Benutzer mit Kennwortwechselpflicht erstellt.",
        "Der zweite Lauf erzeugte keine Duplikate; ein gezielter Rückfall ist dokumentiert."
      ],
      "quiz": [
        {
          "q": "Warum das Skript zweimal ausführen?",
          "options": [
            "Um alle Konten erneut zu erstellen",
            "Um zu prüfen, dass vorhandene Konten nicht doppelt entstehen",
            "Um alle Kennwörter zurückzusetzen"
          ],
          "answer": 1,
          "explain": "Wiederholbare Automatisierung muss den vorhandenen Zustand erkennen."
        },
        {
          "q": "Wo sollten Startkennwörter verarbeitet werden?",
          "options": [
            "In Websitenotizen",
            "Neben jedem Namen in der CSV",
            "In sicherer Eingabe oder Geheimnisverwaltung, nicht in CSV"
          ],
          "answer": 2,
          "explain": "Protokolle und Eingabe-CSVs sollten nur nicht geheime Daten enthalten."
        }
      ]
    },
    "redundancy": {
      "title": "Zweiter Domänencontroller",
      "goal": "Prüfe Replikation und einen kontrollierten DC-Ausfall.",
      "short": "Replikation, zweiter DNS-Server und unterbrechungsfreie Anmeldung",
      "steps": [
        {
          "title": "DC02 vorbereiten",
          "html": "<p>Installiere eine eigene VM mit 6 GB, 2 vCPUs und 80 GB, aktualisiere über NAT und wechsle dann mit einem Adapter zu LAB-CORP. Nutze 10.20.0.11/24, DNS .10 und zunächst kein Gateway. DC01 muss gesund sein.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "In bestehende Domäne aufnehmen",
          "html": "<p>Installiere AD DS auf DC02 und füge der vorhandenen Domäne einen Controller hinzu; erstelle keine neue Gesamtstruktur. Gib Anmeldedaten und ein eigenes DSRM-Kennwort sicher ein. Setze nach Neustart DNS .10/.11 auf DC02 und .11/.10 auf DC01.</p>",
          "code": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSDomainController -DomainName \"corp.example.test\" -Credential (Get-Credential) -InstallDns",
          "label": null,
          "expect": "Get-ADDomainController -Filter * zeigt beide DCs; DNS und NTDS laufen auf beiden."
        },
        {
          "title": "Replikation beweisen",
          "html": "<p>Erstelle das deaktivierte Testobjekt auf DC01 und frage es ausdrücklich bei DC02 ab. Prüfe repadmin. Ergänze beide DNS-Adressen in DHCP-Option 006 und den statischen SRV01-Einstellungen; erneuere CL01.</p>",
          "code": "# DC01\nNew-ADUser -Name \"Replication Probe\" -SamAccountName \"replication.probe\" -Path \"OU=Benutzer,OU=Lab,DC=corp,DC=example,DC=test\"\nGet-ADUser replication.probe -Server DC02\nrepadmin /replsummary\n# SRV01\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -DnsServer 10.20.0.10,10.20.0.11\n# CL01\nipconfig /renew\nipconfig /all",
          "label": null,
          "expect": "Der Benutzer ist auch auf DC02 sichtbar, es gibt keine offenen Replikationsfehler, und CL01 sieht beide DNS-Server."
        },
        {
          "title": "Vorübergehenden Ausfall testen",
          "html": "<p>Notiere gesunde Replikation, fahre nur DC01 geordnet herunter und lasse DC02/SRV01 laufen. Prüfe auf CL01 DNS über DC02, sicheren Kanal und Online-Anmeldung des Testbenutzers. Starte DC01 und prüfe Replikation erneut. Übernimm FSMO nicht gewaltsam für diesen kurzen Ausfall.</p>",
          "code": "Resolve-DnsName dc02.corp.example.test -Server 10.20.0.11\nTest-ComputerSecureChannel -Server DC02\nnltest /dsgetdc:corp.example.test /force",
          "label": null,
          "expect": "Die Abfrage an .11 gelingt und der sichere Kanal ist True. Zwei DCs auf einem Host schützen nicht vor dem Ausfall dieses Hosts und ersetzen kein Backup."
        }
      ],
      "tasks": [
        "DC02 betreibt AD DS/DNS unter 10.20.0.11 mit den geplanten Ressourcen.",
        "Replikation hat keine offenen Fehler und das Objekt existiert auf beiden DCs.",
        "Mitglieder und DHCP-Clients nutzen beide DNS-Server.",
        "DNS/Anmeldung funktionieren während des DC01-Ausfalls; danach ist die Replikation wieder gesund."
      ],
      "quiz": [
        {
          "q": "Wovor schützen zwei DC-VMs auf einem Host nicht?",
          "options": [
            "Herunterfahren einer VM",
            "Ausfall des physischen Hosts",
            "Kurzer Stopp eines DNS-Dienstes"
          ],
          "answer": 1,
          "explain": "Beide VMs hängen vom selben physischen Host ab."
        },
        {
          "q": "Was ist bei einem kurzen geplanten DC01-Ausfall richtig?",
          "options": [
            "Sofort FSMO übernehmen",
            "Neue Gesamtstruktur erstellen",
            "DC02 prüfen, Zugriff testen und DC01 zurückbringen"
          ],
          "answer": 2,
          "explain": "Ein kurzer geplanter Ausfall erfordert normalerweise keine erzwungene FSMO-Übernahme."
        }
      ]
    },
    "delegation": {
      "title": "Helpdesk-Rechte delegieren",
      "goal": "Beweise begrenzte Rechte und eine verweigerte Aktion.",
      "short": "Minimale Rechte mit erlaubtem und verweigertem Test",
      "steps": [
        {
          "title": "Supportidentitäten erstellen",
          "html": "<p>Erstelle das normale Konto helpdesk.lab unter Lab/Benutzer und die globale Sicherheitsgruppe GG_Helpdesk unter Lab/Gruppen. Füge die Mitgliedschaft ohne Domain-Admin- oder lokale Administratorrechte hinzu. RSAT muss auf CL01 installiert sein.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Kleinsten Bereich delegieren",
          "html": "<p>Nutze in dsa.msc Delegate Control auf Lab/Benutzer für GG_Helpdesk. Wähle nur Reset user passwords and force password change at next logon. Vergib keine Benutzererstellung, vollständige Attributbearbeitung oder Gruppenänderungen.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Positivtest als Helpdesk",
          "html": "<p>Melde den Administrator auf CL01 ab und CORP\\helpdesk.lab an. Nutze normale PowerShell, prüfe whoami und setze das Kennwort des vorgesehenen Testkontos Tom zurück. Verwende keine Erhöhung unter anderer Identität.</p>",
          "code": "whoami\nImport-Module ActiveDirectory\n$pw = Read-Host \"New temporary password for Tom\" -AsSecureString\nSet-ADAccountPassword tom.klein -Reset -NewPassword $pw\nSet-ADUser tom.klein -ChangePasswordAtLogon $true",
          "label": null,
          "expect": "Die Identität ist CORP\\helpdesk.lab, beide erlaubten Aktionen gelingen, und Tom muss das Kennwort bei der nächsten Anmeldung ändern."
        },
        {
          "title": "Negativtest und Rückfall",
          "html": "<p>Versuche in derselben Helpdesk-Sitzung Description zu ändern und erwarte insufficient access. Dokumentiere beide Ergebnisse. Ein Administrator entfernt später nur die ergänzten GG_Helpdesk-ACEs dieser OU; setze nicht die gesamte ACL zurück.</p>",
          "code": "whoami\nSet-ADUser tom.klein -Description \"Delegation negative test\"",
          "label": null,
          "expect": "Der Zugriff wird verweigert. Gelingt er doch, prüfe übermäßige Delegierung oder zusätzliche Gruppenmitgliedschaften und lass einen Administrator genau diese Teständerung zurücknehmen."
        }
      ],
      "tasks": [
        "helpdesk.lab ist ein normales Konto mit der vorgesehenen Supportrolle.",
        "Nur Kennwortzurücksetzung/Wechsel bei Anmeldung ist auf der Ziel-OU delegiert.",
        "Die Helpdesk-Identität setzt das Testkennwort erfolgreich zurück.",
        "Description-Änderung wird unter derselben Identität verweigert und dokumentiert."
      ],
      "quiz": [
        {
          "q": "Welcher Umfang passt zum Helpdesk?",
          "options": [
            "Domänenadministrator für alle",
            "Nur notwendige Rechte auf der Ziel-OU",
            "Jedes Objekt der Gesamtstruktur"
          ],
          "answer": 1,
          "explain": "Minimale Rechte begrenzen Aktion und Geltungsbereich."
        },
        {
          "q": "Warum einen Negativtest ausführen?",
          "options": [
            "Um die Ablehnung rollenfremder Aktionen zu beweisen",
            "Nur zur Geschwindigkeitsmessung",
            "Um den Positivtest zu ersetzen"
          ],
          "answer": 0,
          "explain": "Erfolg einer erlaubten Aktion beweist nicht die Sperre anderer Aktionen."
        }
      ]
    },
    "recovery": {
      "title": "Backup und geprüfte Wiederherstellung",
      "goal": "Stelle eine Testdatei separat wieder her und vergleiche ihren Hash.",
      "short": "Backup, Hash und gemessene Wiederherstellungszeit",
      "steps": [
        {
          "title": "Leeren Zieldatenträger vorbereiten",
          "html": "<p>Fahre SRV01 herunter und hänge eine neue leere 80-GB-VDI an. Identifiziere sie in Disk Management, initialisiere GPT und erstelle NTFS E:. Formatiere niemals die Systemdisk. Eine zweite VDI auf demselben Host ist nur eine Wiederherstellungsübung, kein unabhängiger Schutz.</p>",
          "code": "Install-WindowsFeature Windows-Server-Backup\nGet-Volume",
          "label": null,
          "expect": "C ist die Systemdisk, E das neue Backupziel mit ausreichend freiem Speicher."
        },
        {
          "title": "Daten und Backup erstellen",
          "html": "<p>Erstelle die Testdatei, notiere vor dem Backup SHA256 und führe die Befehle auf SRV01 aus. VSS Copy erstellt das einmalige Übungsbackup. Prüfe Version und Zeitpunkt.</p>",
          "code": "Set-Content C:\\LabShares\\Finanzen\\restore-proof.txt -Value \"Original lab data\" -Encoding UTF8\nGet-FileHash C:\\LabShares\\Finanzen\\restore-proof.txt -Algorithm SHA256\nwbadmin start backup -backupTarget:E: -include:C:\\LabShares -vssCopy -quiet\nwbadmin get versions -backupTarget:E:",
          "label": null,
          "expect": "Das Backup endete ohne Fehler und hat eine wiederherstellbare Versionskennung. Notiere den Hash im Protokoll."
        },
        {
          "title": "Ohne Überschreiben wiederherstellen",
          "html": "<p>Ändere nur die Testdatei zu Changed lab data. Wähle in Windows Server Backup Recover → This server → Sicherungszeit → Files and folders. Stelle nur restore-proof.txt unter Another location: C:\\LabRestore wieder her. Suche die Datei und vergleiche SHA256 mit dem ursprünglichen Wert.</p>",
          "code": "Get-ChildItem C:\\LabRestore -Recurse -Filter restore-proof.txt | Get-FileHash -Algorithm SHA256",
          "label": null,
          "expect": "Der Hash der wiederhergestellten Datei entspricht dem Originalwert vor dem Backup und unterscheidet sich von der geänderten Datei."
        },
        {
          "title": "Wiederherstellungsziele festlegen",
          "html": "<p>RPO beschreibt tolerierten zeitlichen Datenverlust, RTO die Zielzeit bis zur Wiederherstellung. Miss deine Wiederherstellung und plane ein unabhängiges geschütztes Backup. Dateirestore ist keine System-State- oder Gesamtstrukturwiederherstellung; stelle keinen DC ohne vollständigen AD-Plan wieder her.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Nur die neue leere Disk wurde als E: vorbereitet.",
        "Version und Zeitpunkt sind in wbadmin get versions sichtbar.",
        "Die Datei unter C:\\LabRestore hat den ursprünglichen SHA256.",
        "Wiederherstellungszeit, RPO/RTO und Grenzen des gemeinsamen Hosts sind dokumentiert."
      ],
      "quiz": [
        {
          "q": "Was beweist eine Backupdatei allein nicht?",
          "options": [
            "Dass die Daten tatsächlich wiederherstellbar sind",
            "Dass eine Datei existiert",
            "Dass ein Laufwerksbuchstabe existiert"
          ],
          "answer": 0,
          "explain": "Stelle die tatsächlichen Daten wieder her und prüfe sie."
        },
        {
          "q": "Was beschreibt RTO?",
          "options": [
            "Die RAM-Größe",
            "Die Zielzeit zur Wiederherstellung des Dienstes",
            "Anzahl der Benutzergruppen"
          ],
          "answer": 1,
          "explain": "RTO betrifft Wiederherstellungsdauer, RPO tolerierten Datenverlust."
        }
      ]
    },
    "monitoring": {
      "title": "Überwachung und Störungsbearbeitung",
      "goal": "Sammle Nachweise vor einer Dienständerung.",
      "short": "WinRM, Ereignisse, Speicherplatz und ein erkennbarer Ausfall",
      "steps": [
        {
          "title": "Sichere Fernverwaltung vorbereiten",
          "html": "<p>Nutze auf SRV01 das Domänenprofil und WinRM. Führe bei Bedarf Enable-PSRemoting -Force erhöht auf diesem Server aus. Verbinde CL01 über den DNS-Namen als Lab-Administrator. Nutze weder TrustedHosts=* noch eine abgeschaltete Firewall.</p>",
          "code": "Test-WSMan SRV01\nInvoke-Command -ComputerName SRV01 -ScriptBlock { hostname; Get-Service DHCPServer,Spooler }",
          "label": null,
          "expect": "Hostidentität und Dienststatus von SRV01 werden zurückgegeben. Im Unternehmensalltag müssen Remoting-Rechte begrenzt und delegiert sein."
        },
        {
          "title": "Ausgangsgesundheit lesen",
          "html": "<p>Erfasse Dienststatus, freien Speicher, Servername und Zeit. Die 15-%-Speicherschwelle ist eine Lab-Annahme, kein Produktionsstandard. Erstelle vor betrieblichen Alarmen eine echte Vergleichsbasis.</p>",
          "code": "Invoke-Command -ComputerName SRV01 -ScriptBlock {\n  Get-CimInstance Win32_LogicalDisk -Filter \"DriveType=3\" |\n    Select-Object DeviceID,@{n='FreePercent';e={[math]::Round(100*$_.FreeSpace/$_.Size,1)}}\n  Get-Service DHCPServer,Spooler\n  Get-Date\n}",
          "label": null,
          "expect": "Für jedes Volume sind freier Speicher in Prozent, Dienststatus und Messzeitpunkt bekannt."
        },
        {
          "title": "Begrenzten Ausfall erkennen",
          "html": "<p>Stoppe nur Spooler auf SRV01. Prüfe ihn aus der Ferne und lies Service-Control-Manager-Ereignisse. Starte ihn und beweise Running. Stoppe weder DNS noch DHCP. Das ist eine Dienstübung, kein zentrales Überwachungssystem.</p>",
          "code": "# SRV01\nStop-Service Spooler\nGet-Service Spooler\nGet-WinEvent -FilterHashtable @{LogName='System';ProviderName='Service Control Manager';StartTime=(Get-Date).AddMinutes(-20)} -MaxEvents 20 | Select-Object TimeCreated,Id,Message\nStart-Service Spooler\nGet-Service Spooler",
          "label": null,
          "expect": "Stopped ist während des Ausfalls und Running nach der Korrektur erfasst; verknüpfe das zugehörige Ereignis mit Zeitpunkt im Bericht."
        },
        {
          "title": "Störung dokumentieren und eskalieren",
          "html": "<p>Notiere Zeit, Auswirkung, betroffenen Dienst/Benutzer, Prüfungen, Nachweise, vermutete Ursache, Maßnahme und Ergebnis. Eskaliere bei überschrittener Befugnis, Kompetenz oder vereinbarter Zeit; übergib Nachweise und eine klare Benutzerrückmeldung.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Fernverwaltung über den DNS-Namen SRV01 funktioniert ohne pauschale Vertrauensausnahmen.",
        "Ein datierter Dienst-/Speicherbericht liegt vor.",
        "Spooler-Ausfall und Wiederherstellung sind in Status und Protokollen sichtbar.",
        "Der Störungsbericht enthält Auswirkung und Eskalationsbedingungen."
      ],
      "quiz": [
        {
          "q": "Welche Fernverwaltung ist hier vorzuziehen?",
          "options": [
            "DNS-Name mit Domänenauthentifizierung",
            "TrustedHosts=*",
            "Firewall ausgeschaltet"
          ],
          "answer": 0,
          "explain": "Domänennamen ermöglichen Kerberos; breite Vertrauensausnahmen sind keine Standardlösung."
        },
        {
          "q": "Wann solltest du eskalieren?",
          "options": [
            "Nie",
            "Wenn Kompetenz, Befugnis oder vereinbarte Zeit überschritten werden",
            "Erst nach kompletter Neuinstallation"
          ],
          "answer": 1,
          "explain": "Grenzen erkennen und Nachweise übergeben gehört zum professionellen Support."
        }
      ]
    },
    "change": {
      "title": "Kontrollierte Änderungen und Updates",
      "goal": "Erprobe ein Update mit Abnahmekriterien und Rückfallplan.",
      "short": "Pilot, Rückfallplan, Abnahme und Benutzerrückmeldung",
      "steps": [
        {
          "title": "Änderung planen",
          "html": "<p>Ziele auf SRV01 statt auf alle DCs gleichzeitig. Notiere Zweck, DHCP-/Dateiauswirkung, Wartungsfenster, Genehmiger im Szenario, Backupvoraussetzungen und Abbruchkriterien. Erfasse Build/Hotfixes. Ein Snapshot allein ist kein Rückfallplan.</p>",
          "code": "Get-ComputerInfo | Select-Object WindowsProductName,OsVersion,OsBuildNumber\nGet-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 10\nGet-NetFirewallProfile | Select-Object Name,Enabled",
          "label": null,
          "expect": "Build und bisherige Updates sind bekannt; die Firewall ist aktiv und das Backup aus der Wiederherstellungslektion ist vorhanden."
        },
        {
          "title": "Passendes Update beschaffen",
          "html": "<p>Nutze Microsoft Update Catalog und den offiziellen KB-Artikel für den vorhandenen Windows-Server-2025-x64-Build. Lies Voraussetzungen/Checkpoint-Pakete. Stelle nur SRV01 vorübergehend den schreibgeschützten VirtualBox-Ordner Host-Updates bereit und kopiere von \\\\VBOXSVR\\Host-Updates nach C:\\LabUpdates. Verbinde dafür keinen DC mit NAT/Bridged.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Erproben und prüfen",
          "html": "<p>Installiere Paket und Voraussetzungen an der SRV01-Konsole in dokumentierter Reihenfolge. Starte bei Bedarf neu. Notiere Build, Ergebnis und Dienstgesundheit; prüfe Lease-Erneuerung und SMB auf CL01. Nicht jedes Update ist deinstallierbar.</p>",
          "code": null,
          "label": null,
          "expect": "Echte KB-Nummer, Installationsergebnis, Neustartbedarf und neuer Build stehen im Protokoll; eine unvollständige oder Not-applicable-Installation wird nicht verschwiegen."
        },
        {
          "title": "Abschließen oder zurückrollen",
          "html": "<p>Vergleiche mit den Abnahmekriterien. Entferne den temporären gemeinsamen Ordner. Dokumentiere den tatsächlich unterstützten Rückfallweg, offene Tests und Benutzerrückmeldung. Nutze keine blinde DC-Snapshot-Rückkehr und ändere nicht mehrere Variablen zur Fehlerkaschierung.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Ein begrenzter Änderungsantrag mit Ausgangsstand liegt vor.",
        "Passendes offizielles Paket und Voraussetzungen wurden geprüft.",
        "SRV01 wurde erprobt und Dienste aus Clientsicht geprüft.",
        "Rückfall, Ergebnis und Entfernen temporärer Zugriffe sind dokumentiert."
      ],
      "quiz": [
        {
          "q": "Warum zuerst ein Pilotsystem aktualisieren?",
          "options": [
            "Um Tests zu vermeiden",
            "Um Auswirkungen zu begrenzen und Verhalten vor breiter Verteilung zu prüfen",
            "Um alle DCs gleichzeitig zu ändern"
          ],
          "answer": 1,
          "explain": "Ein Pilot liefert Nachweise bei begrenztem Änderungsumfang."
        },
        {
          "q": "Ist jedes Update sicher entfernbar?",
          "options": [
            "Ja, immer",
            "Ein Snapshot garantiert es",
            "Nein; KB und unterstützten Wiederherstellungsweg prüfen"
          ],
          "answer": 2,
          "explain": "Wiederherstellung hängt von Paket und Systemzustand ab; plane vor der Installation."
        }
      ]
    },
    "workstations": {
      "title": "Client- und Softwarebereitstellung",
      "goal": "Bereite einen Arbeitsplatz vor und prüfe ihn als normaler Benutzer.",
      "short": "Bestand, MSI-Installation, Benutzertest und Microsoft-365-Plan",
      "steps": [
        {
          "title": "Bestand und Anforderungen",
          "html": "<p>Erfasse auf CL01 Modell/VM, OS-Edition/Build, Ressourcen und Softwarebedarf mit den lesenden Befehlen. Notiere die Asset-ID ohne Kennwörter. Eine VM ersetzt keine physische Geräteabnahme.</p>",
          "code": "systeminfo\nGet-ComputerInfo | Select-Object WindowsProductName,OsBuildNumber\nGet-Volume\nGet-PnpDevice -PresentOnly | Where-Object Status -ne \"OK\"",
          "label": null,
          "expect": "Bestand und Prüfpunkte sind klar. Untersuche Geräte mit einem Status ungleich OK, ohne sie automatisch als Hardwaredefekt zu werten."
        },
        {
          "title": "Zulässige Software installieren",
          "html": "<p>Nutze offizielle Herstellerquellen und gültige Lizenzen. Notiere Version, Architektur und Installationsumfang. Beschaffe Pakete vor der Netztrennung; ergänze keine ungeplanten Internetadapter am DC. Microsoft 365 benötigt ein geeignetes lizenziertes Konto und Dienstzugriff; eine Offline-Simulation ist keine Mandantenbereitstellung.</p>",
          "code": "Get-AuthenticodeSignature \"C:\\LabSoftware\\PowerShell-7-x64.msi\" | Select-Object Status,SignerCertificate\nmsiexec.exe /i \"C:\\LabSoftware\\PowerShell-7-x64.msi\" /L*v \"C:\\LabSoftware\\install.log\"",
          "label": null,
          "expect": "Die Signatur ist gültig und gehört zum erwarteten Herausgeber; die Installation war erfolgreich und das Protokoll ist lesbar. Brich bei ungültiger Signatur oder falschem Herausgeber ab."
        },
        {
          "title": "Updates und Benutzerbetrieb prüfen",
          "html": "<p>Prüfe installierte Versionen und Updatezustand. Melde dich als normaler Domänenbenutzer an und teste Programmstart, Speichern und nötige Ressourcenzugriffe. Administrator-Installationserfolg ist nicht gleich Benutzbarkeit.</p>",
          "code": "$PSVersionTable.PSVersion",
          "label": null,
          "expect": "Das PowerShell-7-Fenster zeigt Version 7, während das vorhandene Windows PowerShell meist bei 5.1 bleibt."
        },
        {
          "title": "Übergabe und Rückfall",
          "html": "<p>Dokumentiere Asset, Softwareversionen, Lizenzen, Benutzertests, Entfernung/Wiederherstellung und offene Arbeiten. Gib eine kurze Anleitung zu Anmeldung, Dateien, Druck und Störungsmeldung. Kennzeichne ungeprüfte Punkte.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Clientbestand und Anforderungen sind erfasst.",
        "Software stammt aus offiziellen Quellen; Lizenzen sind geprüft.",
        "Ein normaler Benutzer kann Programme starten und speichern.",
        "Übergabe, Updatezustand und Wiederherstellung/Entfernung sind erfasst."
      ],
      "quiz": [
        {
          "q": "Wer sollte den Abnahmetest ausführen?",
          "options": [
            "Nur der installierende Administrator",
            "Die vorgesehene normale Benutzeridentität",
            "Niemand nach der Installation"
          ],
          "answer": 1,
          "explain": "Prüfe den tatsächlichen Benutzerkontext, nicht nur die erhöhte Installation."
        },
        {
          "q": "Was braucht echter Microsoft-365-Betrieb?",
          "options": [
            "Passende Lizenz, Konto und Dienstzugriff",
            "Nur eine AD-OU",
            "Einen Offline-Screenshot"
          ],
          "answer": 0,
          "explain": "Lokales AD-Üben ist keine lizenzierte Cloud-Mandantenbereitstellung."
        }
      ]
    },
    "printing-storage": {
      "title": "Drucken und Netzwerkspeicher",
      "goal": "Trenne virtuelle Druck-/SMB-Übung von echter Gerätekonfiguration.",
      "short": "Druckwarteschlange, Treiber, Freigabe und NAS-Anforderungen",
      "steps": [
        {
          "title": "Test-PDF drucken",
          "html": "<p>Nutze Microsoft Print to PDF auf CL01, speichere und öffne die Ausgabe. Prüfe Drucker- und Spooler-Zustand. Das prüft den virtuellen Druckweg, keine Druckermechanik oder physische Netzwerkschnittstelle.</p>",
          "code": "Get-Printer | Select-Object Name,DriverName,PortName,PrinterStatus\nGet-Service Spooler",
          "label": null,
          "expect": "Der virtuelle Drucker ist sichtbar, der Spooler läuft und die PDF ist lesbar."
        },
        {
          "title": "Nur eigene Testwarteschlange bearbeiten",
          "html": "<p>Pausiere einen Testauftrag, prüfe ihn und setze ihn fort oder lösche nur ihn. Prüfe Auswirkungen vor dem Neustart eines gemeinsamen Druckdienstes. Nutze den offiziellen Treiber fürs genaue Modell und schwäche Point-and-Print-Regeln nicht pauschal.</p>",
          "code": "Get-PrintJob -PrinterName \"Microsoft Print to PDF\"",
          "label": null,
          "expect": "Solange der Auftrag existiert, zeigt die Warteschlange ihn an; nach Abschluss oder Abbruch wird nur dieser Auftrag entfernt."
        },
        {
          "title": "SMB-Speicher bewerten",
          "html": "<p>Prüfe \\\\SRV01\\Finanzen: freie Kapazität, Rollengruppen, Lesen/Schreiben, Backupverantwortung und Wiederherstellungszeit. Stelle über die Backup-Lektion eine kleine Datei wieder her. Das ist SMB-Übung, keine Verwaltung von NAS-RAID, Firmware oder Herstelleroberfläche.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Erweiterung mit realen Geräten",
          "html": "<p>Erfasse bei freigegebenen Geräten Druckermodell, Verbindung/IP, offiziellen Treiber und Geräte-/Windows-Testseite. Erfasse beim NAS Disks/Volume/Freigabe, Identität/ACL und unabhängiges Backup/Restore. Ohne Geräte bleibt es Planung. Initialisiere keine Datenträger mit Daten zu Übungszwecken.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Die erzeugte PDF lässt sich korrekt öffnen.",
        "Nur mein Testdruckauftrag wurde pausiert/fortgesetzt/gelöscht.",
        "SMB-Kapazität, Zugriff und Wiederherstellung sind geprüft; RAID gilt nicht als Backup.",
        "Reale Gerätetests oder fehlende Geräte sind ausdrücklich vermerkt."
      ],
      "quiz": [
        {
          "q": "Was beweist erfolgreicher PDF-Druck nicht?",
          "options": [
            "Lesbare PDF-Ausgabe",
            "Mechanik und Verbindung eines echten Druckers",
            "Funktionierenden virtuellen Druckweg"
          ],
          "answer": 1,
          "explain": "Echte Drucker brauchen eigene Verbindungs-, Treiber- und Ausgabetests."
        },
        {
          "q": "Ersetzt RAID ein Backup?",
          "options": [
            "Immer",
            "Es ist dasselbe wie Restore",
            "Nein; unabhängige Backups und Wiederherstellungstests bleiben nötig"
          ],
          "answer": 2,
          "explain": "Löschen oder gemeinsame Störungen können den gesamten Plattenverbund betreffen."
        }
      ]
    },
    "networking": {
      "title": "Routing und Netzwerkdiagnose",
      "goal": "Baue ein Zweigstellennetz auf und prüfe eine begrenzte Firewall-Sperre.",
      "short": "LAN, virtueller Router, Rückweg und Zugriffstrennung",
      "steps": [
        {
          "title": "RTR01 und CL02 vorbereiten",
          "html": "<p>Erstelle beide mit 4 GB, 2 vCPUs und 80 GB. Aktualisiere vor der Netztrennung über NAT. RTR01 braucht keine Domänenmitgliedschaft; nutze nur LAB-CORP 10.20.0.1/24 und LAB-BRANCH 10.30.0.1/24, ohne Standardgateway am Router. CL02 nutzt 10.30.0.50/24, Gateway 10.30.0.1 und DNS 10.20.0.10/.11. Noch kein Zweigstellen-DHCP.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "LAN-Routing und Rückwege aktivieren",
          "html": "<p>Installiere die Routerrolle. Wähle in rrasmgmt.msc Custom configuration → LAN routing und starte den Dienst. Setze auf DC01, DC02 und SRV01 Gateway 10.20.0.1 sowie DHCP-Option 003 entsprechend; erneuere CL01. Der Router hat weiterhin kein Internet.</p>",
          "code": "Install-WindowsFeature RemoteAccess,Routing -IncludeManagementTools\n# SRV01 after configuring RTR01\nSet-DhcpServerv4OptionValue -ScopeId 10.20.0.0 -Router 10.20.0.1",
          "label": null,
          "expect": "Die Server senden Antworten für 10.30.0.0/24 über RTR01. Verwechsle einen fehlenden Rückweg nicht mit einem DNS-Fehler."
        },
        {
          "title": "Einen Datenfluss prüfen und sperren",
          "html": "<p>Erfasse von CL02 DNS-Auflösung von SRV01 und Erfolg von TCP 445. Erlaube bei Bedarf Dateifreigaberegeln auf SRV01 nur für Lab-Netze. Ergänze die angegebene Sperrregel nur auf SRV01. Eine IP ist keine Benutzeridentität; SMB-/NTFS-Rechte gelten weiter.</p>",
          "code": "Test-NetConnection srv01.corp.example.test -Port 445\n# SRV01 - administrator\nNew-NetFirewallRule -DisplayName \"LAB-Block-Branch-SMB\" -Direction Inbound -Protocol TCP -LocalPort 445 -RemoteAddress 10.30.0.0/24 -Action Block -Profile Domain",
          "label": null,
          "expect": "Vor der Regel gelingt die Verbindung; danach löst CL02 den Namen weiterhin auf, aber TCP 445 ist gesperrt. Tests von CL01 dürfen durch diese Regel nicht gesperrt werden."
        },
        {
          "title": "Zurücksetzen und Grenzen dokumentieren",
          "html": "<p>Entferne nur LAB-Block-Branch-SMB auf SRV01 und wiederhole DNS-/Port-/Zugriffstests. Interne Netze bilden virtuelle L2-Segmente ab, keine physische Switch-CLI oder 802.1Q-Trunks. Notiere Vorher-/Während-/Nachher-Ergebnisse und den Zwei-Subnetz-Plan.</p>",
          "code": "Remove-NetFirewallRule -DisplayName \"LAB-Block-Branch-SMB\"\n# CL02\nResolve-DnsName srv01.corp.example.test\nTest-NetConnection srv01.corp.example.test -Port 445\nroute print",
          "label": null,
          "expect": "Die Verbindung kehrt zum Zustand vor der Regel zurück; Routing, DNS und Berechtigungen sind im Bericht drei getrennte Themen."
        }
      ],
      "tasks": [
        "RTR01 hat nur die beiden geplanten internen Adapter.",
        "CL02 erreicht Domänen-DNS per Routing mit funktionierenden Rückwegen.",
        "Die Testregel sperrt TCP 445 aus der Zweigstelle wie vorgesehen.",
        "Entfernen dieser Regel stellt den Zugriff wieder her; alle drei Zustände sind dokumentiert."
      ],
      "quiz": [
        {
          "q": "Warum ist der Rückweg wichtig?",
          "options": [
            "Die Antwort braucht eine gültige Route zur Quelle",
            "Nur zum Umbenennen von Computern",
            "Er ersetzt DNS"
          ],
          "answer": 0,
          "explain": "Eine ankommende Anfrage beweist keinen funktionierenden Antwortweg."
        },
        {
          "q": "DNS funktioniert, TCP 445 nicht. Was nun?",
          "options": [
            "Nur das BIOS-Kennwort prüfen",
            "Routing und portspezifische Firewall-Regel prüfen",
            "Eine weitere Gesamtstruktur erstellen"
          ],
          "answer": 1,
          "explain": "Namensauflösung und Transportzugriff sind getrennte Prüfungen."
        }
      ]
    },
    "hardware": {
      "title": "Hardware, LAN/WLAN und Übergabe",
      "goal": "Übe Geräteabnahme an freigegebener realer Hardware.",
      "short": "Übung außerhalb der VM, Fehlersuche und Kurzanleitung",
      "steps": [
        {
          "title": "Reales Gerät erfassen",
          "html": "<p>Nutze msinfo32, Device Manager und Herstellerunterlagen an einem freigegebenen Testgerät. Notiere genaues Modell, CPU/RAM/Disk, Firmware und Symptom. Eine VM bildet Akku, Buchsen, Kabel, Funk oder Mechanik nicht vollständig ab. Ohne Geräte bleiben physische Aufgaben offen.</p>",
          "code": "msinfo32\ndevmgmt.msc\nGet-PnpDevice -PresentOnly",
          "label": null,
          "expect": "Modell und Treiber jedes Geräts sind bestimmbar. Notiere bei einem Gerät mit Warnung Fehlercode und Symptome."
        },
        {
          "title": "Peripherie geordnet prüfen",
          "html": "<p>Nutze USB-Maus, Headset, Webcam oder Testdrucker. Prüfe Strom/Verbindung, anderes Kabel/Port, Betriebssystemerkennung, offiziellen Treiber und Funktion. Prüfe bei Laptops auch Anzeige, Audio, Netzwerk, Akku und Dock. Interne Reparatur und Firmware brauchen Modellanleitung und Berechtigung.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "LAN- und WLAN-Nachweise trennen",
          "html": "<p>Prüfe an einem echten WLAN-Gerät freigegebene SSID, Signal, IP, Gateway und DNS getrennt. Notiere keine WLAN-Kennwörter. Dokumentiere am freigegebenen Switch vor Änderungen VLAN-/Portplan und teste DHCP. Virtuelles Routing ist keine Funkerfahrung.</p>",
          "code": "netsh wlan show interfaces\nipconfig /all\nroute print",
          "label": null,
          "expect": "Du kannst erklären, ob das Problem bei Funkverbindung, Adresse, Route, DNS oder Anwendung liegt. Gib die IP des Hosts nicht nur für diese Übung frei."
        },
        {
          "title": "Benutzerübergabe und Eskalation",
          "html": "<p>Schreibe kurze Hinweise zu Anmeldung, Dateien, Drucken und Störungsmeldung. Erfasse Asset, Software, Zugriff, echte Tests und Benutzerabnahme. Eskaliere Hardwarefehler mit Symptom, Code, Tests und Grund; verspreche keine ungemessenen Zeiten oder Fähigkeiten.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Eine Bestandsaufnahme eines realen freigegebenen Geräts liegt vor.",
        "Eine echte Peripherie wurde über bloße OS-Erkennung hinaus geprüft.",
        "Reale WLAN-/Switch-Ergebnisse und Gerätegrenzen sind erfasst.",
        "Benutzeranleitung, Übergabecheckliste und Eskalationsticket liegen vor."
      ],
      "quiz": [
        {
          "q": "Welcher Test braucht physische Geräte?",
          "options": [
            "Eine AD-Gruppe erstellen",
            "USB-Portzustand und WLAN-Funkverbindung",
            "Internes DNS abfragen"
          ],
          "answer": 1,
          "explain": "Eine VM bildet physische Umgebung und Funk nicht vollständig ab."
        },
        {
          "q": "Was gehört in ein brauchbares Ticket?",
          "options": [
            "Nur „geht nicht“",
            "Unpassende Angaben ohne Zeit",
            "Symptome, Auswirkung, Zeit, Tests, Ergebnis und Eskalationsweg"
          ],
          "answer": 2,
          "explain": "Die nächste Fachkraft braucht verwertbare Nachweise."
        }
      ]
    },
    "linux-start": {
      "title": "Ubuntu Server installieren und verwalten",
      "goal": "Konfiguriere LNX01 und prüfe SSH mit einem Nicht-root-Konto.",
      "short": "Ubuntu, feste IP, SSH, Benutzer und sudo",
      "steps": [
        {
          "title": "Über NAT installieren",
          "html": "<p>Lade Ubuntu Server 24.04 LTS (amd64) von der offiziellen Ubuntu-Seite herunter. Erstelle LNX01 mit 4 GB, 2 vCPUs und leerer 40-GB-Disk. Nutze Hostname lnx01 und eigene labadmin-Zugangsdaten; wähle OpenSSH Server. Installiere die aufgeführten Pakete noch mit NAT-Internet. Linux wird dadurch nicht Mitglied von AD.</p>",
          "code": "sudo apt update\nsudo apt upgrade\nsudo apt install openssh-server ufw nginx curl\nsudo hostnamectl set-hostname lnx01\ncat /etc/os-release",
          "label": "LNX01 · Bash; sudo für Verwaltungsbefehle",
          "expect": "Ubuntu ist installiert und aktuell, die nötigen Pakete sind vorhanden, und nach dem Neustart heißt die Maschine lnx01."
        },
        {
          "title": "Internes Netz konfigurieren",
          "html": "<p>Fahre herunter, wechsle zu LAB-CORP und nutze die VirtualBox-Konsole. Ermittle die Schnittstelle mit ip -br addr und die vorhandene Datei unter /etc/netplan. Sichere sie außerhalb dieses Verzeichnisses. Ersetze enp0s3 im Beispiel durch die echte Schnittstelle und vermeide Konfliktdateien. Prüfe netplan generate und netplan try. Nutze 10.20.0.30/24 und DNS .10; DC02 ist optional. Zunächst kein Gateway, .1 erst nach der Routing-Lektion bei Bedarf.</p>",
          "code": "network:\n  version: 2\n  ethernets:\n    enp0s3:\n      dhcp4: false\n      addresses: [10.20.0.30/24]\n      nameservers:\n        addresses: [10.20.0.10]",
          "label": "Netplan-YAML-Beispiel · kein Bash-Befehl",
          "expect": "ip -br addr zeigt 10.20.0.30/24. Erstelle auf DC01 in corp.example.test den A-Eintrag lnx01 mit der IP .30."
        },
        {
          "title": "SSH begrenzen und Host prüfen",
          "html": "<p>Ergänze die erlaubte SSH-Regel vor Aktivierung von UFW und halte den Konsolenrückweg offen. Verbinde Windows mit labadmin@lnx01.corp.example.test. Vergleiche den ersten Hostschlüssel-Fingerabdruck mit der Konsole; akzeptiere geänderte Schlüssel nicht blind. Erstelle den DNS-A-Eintrag für LNX01 auf DC01.</p>",
          "code": "sudo systemctl enable --now ssh\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow from 10.20.0.0/24 to any port 22 proto tcp\nsudo ufw enable\nsudo ufw status verbose\nsudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub",
          "label": "LNX01 · Bash mit sudo",
          "expect": "SSH von CL01 funktioniert; der Fingerabdruck stimmt und UFW ist aktiv. root wird nicht für normale Anmeldungen genutzt."
        },
        {
          "title": "Normalen lokalen Benutzer erstellen",
          "html": "<p>labadmin hat unter Ubuntu normalerweise sudo-Rechte. Erstelle lokal helpdesk und prüfe fehlendes sudo. Diese lokale Identität ist unabhängig von AD helpdesk.lab. Notiere keine Kennwörter auf der Website.</p>",
          "code": "sudo adduser helpdesk\nid labadmin\nid helpdesk\nsudo -l -U helpdesk\nwhoami\npwd",
          "label": "LNX01 · Bash als labadmin",
          "expect": "helpdesk ist ein normales Konto; sudo -l -U helpdesk zeigt keine Verwaltungsrechte. Du kennst den aktuellen Benutzer und Pfad."
        }
      ],
      "tasks": [
        "Ubuntu und erforderliche Pakete wurden vor der Netztrennung installiert.",
        "LNX01 nutzt .30/24 und sein DNS-Name wird korrekt aufgelöst.",
        "SSH von CL01 funktioniert mit geprüftem Fingerabdruck ohne root-Anmeldung.",
        "Lokales helpdesk hat kein sudo; UFW begrenzt SSH auf das vorgesehene Lab-Netz."
      ],
      "quiz": [
        {
          "q": "Was kommt vor dem entfernten Aktivieren von UFW?",
          "options": [
            "Erforderliches SSH erlauben und Konsolenrückweg sichern",
            "Alle Ports öffnen",
            "Hostschlüssel löschen"
          ],
          "answer": 0,
          "explain": "Eine Firewall ohne nötige Verwaltungsregel kann dich aussperren."
        },
        {
          "q": "Wie hängt lokales Linux-helpdesk hier mit AD zusammen?",
          "options": [
            "Es ist automatisch dasselbe AD-Konto",
            "Es ist ein unabhängiges lokales Konto",
            "Es ist automatisch Domänenadministrator"
          ],
          "answer": 1,
          "explain": "Diese Lektion führt keinen Linux-Domänenbeitritt aus."
        }
      ]
    },
    "linux-services": {
      "title": "Linux-Dienste, Rechte und Wiederherstellung",
      "goal": "Diagnostiziere einen Dienst und prüfe Dateirechte und Wiederherstellung.",
      "short": "Nginx, systemd, Protokolle, UFW und Dateisicherung",
      "steps": [
        {
          "title": "Internes HTTP starten",
          "html": "<p>Aktiviere Nginx auf LNX01 und erlaube HTTP nur aus LAB-CORP. Prüfe auf CL01 mit curl.exe -I http://lnx01.corp.example.test. curl.exe vermeidet PowerShell-Alias-Verwechslungen. Das ist internes HTTP-Üben, keine öffentliche HTTPS-Bereitstellung.</p>",
          "code": "sudo systemctl enable --now nginx\nsudo nginx -t\nsudo ufw allow from 10.20.0.0/24 to any port 80 proto tcp\ncurl -I http://127.0.0.1\nsudo ss -lntp",
          "label": "LNX01 · Bash",
          "expect": "Die Nginx-Konfiguration ist gültig, Port 80 lauscht und CL01 erhält eine erfolgreiche HTTP-Antwort."
        },
        {
          "title": "Gestoppten Dienst diagnostizieren",
          "html": "<p>Stoppe nur Nginx, teste auf CL01 und vergleiche systemctl-Status, lauschende Ports und Protokolle. Trenne DNS-Fehler von gestoppter Anwendung. Starte Nginx und wiederhole dieselbe Clientanfrage.</p>",
          "code": "sudo systemctl stop nginx\nsystemctl status nginx --no-pager\nsudo journalctl -u nginx --since \"-15min\" --no-pager\nsudo tail -n 20 /var/log/nginx/access.log\nsudo systemctl start nginx\ncurl -I http://127.0.0.1",
          "label": "LNX01 · Bash",
          "expect": "Im gestoppten Zustand erscheint inactive, nach dem Start active; die Verbindung funktioniert wieder und die Ursache steht im Ticket."
        },
        {
          "title": "Lokale Dateirechte setzen",
          "html": "<p>Erstelle labusers und den Testordner, füge labadmin hinzu und öffne eine neue Sitzung für die Mitgliedschaft. Prüfe die geschützte Datei als normales helpdesk, nicht als root oder mit sudo, da privilegierte Identitäten normale Grenzen umgehen können.</p>",
          "code": "sudo groupadd labusers\nsudo usermod -aG labusers labadmin\nsudo install -d -m 0750 -o root -g labusers /srv/labdata\nprintf \"%s\\n\" \"Original Linux lab data\" | sudo tee /srv/labdata/proof.txt\nsudo chown root:labusers /srv/labdata/proof.txt\nsudo chmod 0640 /srv/labdata/proof.txt\nls -ld /srv/labdata\nls -l /srv/labdata/proof.txt\nsudo -u helpdesk cat /srv/labdata/proof.txt",
          "label": "LNX01 · Bash; groupadd nur, wenn die Gruppe noch nicht existiert",
          "expect": "Die berechtigte Gruppe darf lesen; helpdesk erhält Permission denied und ist nicht in der sudo-Gruppe."
        },
        {
          "title": "Archiv separat wiederherstellen",
          "html": "<p>Notiere den Dateihash, erstelle das Archiv und stelle unter /srv/labrestore wieder her, ohne die Quelle zu überschreiben. Vergleiche SHA256. Ein lokales Archiv schützt nicht unabhängig vor Hostausfall; Unternehmensbackups brauchen getrennten geschützten Speicher, Zeitpläne und regelmäßige Restoretests.</p>",
          "code": "sudo sha256sum /srv/labdata/proof.txt\nsudo tar -czf /var/backups/lab-data.tgz -C /srv labdata\nsudo mkdir -p /srv/labrestore\nsudo tar -xzf /var/backups/lab-data.tgz -C /srv/labrestore\nsudo sha256sum /srv/labrestore/labdata/proof.txt",
          "label": "LNX01 · Bash",
          "expect": "Beide Hashes stimmen überein. Wiederherstellungszeit, Zielpfad und Vergleichsergebnis stehen im Bericht."
        }
      ],
      "tasks": [
        "CL01 erhält HTTP von Nginx über das erlaubte Netz.",
        "Nginx-Ausfall wurde diagnostiziert und die Wiederherstellung erneut geprüft.",
        "Normales helpdesk kann die geschützte Datei nicht lesen.",
        "Separate Wiederherstellung stimmt im SHA256 überein; lokale Backupgrenzen sind erfasst."
      ],
      "quiz": [
        {
          "q": "Welcher Befehl prüft den Nginx-Dienst?",
          "options": [
            "systemctl status nginx",
            "ipconfig /all",
            "gpupdate /force"
          ],
          "answer": 0,
          "explain": "systemctl verwaltet und prüft systemd-Dienste."
        },
        {
          "q": "Was bedeutet Dateimodus 0640?",
          "options": [
            "Alle dürfen schreiben",
            "Besitzer lesen/schreiben, Gruppe lesen, andere nichts",
            "Alle dürfen ausführen"
          ],
          "answer": 1,
          "explain": "6 ist Lesen+Schreiben, 4 Lesen und 0 kein Recht."
        }
      ]
    },
    "server-room": {
      "title": "Einen Serverraum planen",
      "goal": "Schätze Rack, Leistung und Wachstum und dokumentiere Planungsannahmen.",
      "short": "Bedarf, Höheneinheiten, Strom, USV, Kühlung und Verkabelung",
      "steps": [
        {
          "title": "Anforderungen erfassen",
          "html": "<p>Notiere Dienste, Verfügbarkeitsbedarf, Gerätebestand, Abmessungen, Gewicht, Rackeinheiten, Leistung und Verantwortliche. Nutze genaue Modellangaben; Netzteil-Nennleistung ist nicht gemessener IT-Verbrauch. Kennzeichne unbekannte Werte.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Rack planen",
          "html": "<p>Verteile U-Positionen, Blind-/Kabelraum, Front-/Rückzugang, Luftstrom und Wartungsabstände. Prüfe Tiefe, Schienen, Boden-/Racklast und Wachstum. Der Rechner prüft nur eingegebene U und Gewicht, nicht den tatsächlichen Raum.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Leistung und Kühlung schätzen",
          "html": "<p>Vergleiche im Raumplaner die unabhängigen UPS-/USV-Grenzen W und VA, Wachstum und geschätzte IT-Wärme. Laufzeit muss aus der Lastkurve des genauen USV-/Batteriemodells stammen. Kühlung, Elektroinstallation, Erdung und Brandschutz erfordern qualifizierte ortsspezifische Planung. IT-Wärme allein ist keine vollständige Kühlauslegung.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Betrieb dokumentieren",
          "html": "<p>Plane Zutrittskontrolle, Umgebungsalarme, Beschriftung, Kabel-/Assetnachweise, unabhängige Ausfallpfade und Wartungszuständigkeiten. Speichere Annahmen und teste höhere Last im Rechner. Zwei Netzteile am selben Strompfad sind keine unabhängige Versorgung.</p>",
          "code": null,
          "label": null,
          "expect": "Eine andere Person erkennt im Plan, wo jedes Gerät steht, an welchem Port und Strompfad es hängt und welche Annahme noch bestätigt werden muss."
        }
      ],
      "tasks": [
        "Anforderungen und modellspezifischer Bestand sind erfasst.",
        "Annahmen zu Rack-U/Tiefe/Gewicht/Zugang sind dokumentiert.",
        "W, VA, Wachstum und Wärme sind geprüft; USV-Laufzeit bleibt modellspezifisch.",
        "Zugang, Überwachung, Zuständigkeit und Facharbeiten sind benannt."
      ],
      "quiz": [
        {
          "q": "Welche USV-Grenzen müssen beide passen?",
          "options": [
            "Nur die beworbene VA-Zahl",
            "Nur Rackhöhe",
            "W und VA unabhängig"
          ],
          "answer": 2,
          "explain": "Wirk- und Scheinleistungsgrenzen sind getrennte Bedingungen."
        },
        {
          "q": "Plant geschätzte IT-Wärme allein die Kühlung?",
          "options": [
            "Ja, immer",
            "Nein, Gebäudebedingungen und weitere Lasten zählen ebenfalls",
            "Nur die Switchmarke zählt"
          ],
          "answer": 1,
          "explain": "Der Rechner dient dem Lernen, nicht der technischen Freigabe."
        }
      ]
    },
    "vendor-servers": {
      "title": "Dell-, HPE- und Lenovo-Serververwaltung",
      "goal": "Ordne Verwaltungsaufgaben dem genauen Modell und Firmwarestand zu.",
      "short": "iDRAC, iLO und XClarity; Verwaltungsnetz und Firmware",
      "steps": [
        {
          "title": "Plattform bestimmen",
          "html": "<p>Erfasse Modell, Generation, Firmware, Support und Verwaltungslizenzen. Dell iDRAC, HPE iLO und Lenovo XCC sind eigenständige Verwaltungscontroller, nicht Windows selbst. Nutze nur freigegebene Geräte oder lizenzierte Lab-Images.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Verwaltungszugriff konfigurieren",
          "html": "<p>Setze nach Modellhandbuch eine begrenzte Verwaltungsadresse/-netz, ändere Startzugangsdaten sicher und vergebe Rollenkonten. Prüfe Zertifikate und erlaubte Zugriffsquellen. Dokumentiere einen lokalen Rückweg; veröffentliche BMC-Verwaltung nicht.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Gesundheit und Bestand prüfen",
          "html": "<p>Lies CPU, RAM, Disk/Controller, Lüfter, Versorgung und Hardwareereignisse. Erfasse echte Zustandsnachweise. Fernkonsole, virtuelle Medien und Firmwarefunktionen können von Modell/Lizenz abhängen; ein Screenshot beweist weder Berechtigung noch Betrieb.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Sichern und übergeben",
          "html": "<p>Exportiere unterstützte Konfiguration sicher mit Modell/Version/Zeit, prüfe erlaubten und verweigerten Zugriff und dokumentiere Wartung/Rückfall. Übe keine Stromaktionen, Firmwareupdates oder zerstörenden RAID-Änderungen in Produktion. Ohne Geräte gilt Planung, nicht Ausführung.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Modell, Verwaltungscontroller, Firmware und Lizenzen sind erfasst.",
        "Verwaltungsadresse, Rollen und Zugriffsbeschränkungen entsprechen dem Plan.",
        "Hardwarezustand und Bestand sind belegt oder als ungeprüft markiert.",
        "Konfigurationsbackup, Zugriffstests und Rückfall/Übergabe sind dokumentiert."
      ],
      "quiz": [
        {
          "q": "Was ist ein BMC wie iDRAC/iLO/XCC?",
          "options": [
            "Eine Windows-Benutzergruppe",
            "Ein vom Hostbetriebssystem unabhängiger Verwaltungscontroller",
            "Ein Backup jeder Anwendung"
          ],
          "answer": 1,
          "explain": "Out-of-Band-Verwaltung hat eigene Zugriffs- und Sicherheitsanforderungen."
        },
        {
          "q": "Warum Modell und Lizenz genau erfassen?",
          "options": [
            "Funktionen und unterstützte Verfahren unterscheiden sich",
            "Alle Serveroberflächen sind gleich",
            "Firmware ist nie wichtig"
          ],
          "answer": 0,
          "explain": "Herstellernamen allein bestimmen keine verfügbaren Funktionen."
        }
      ]
    },
    "vendor-switches": {
      "title": "Cisco- und Aruba-Switchkonfiguration",
      "goal": "Konfiguriere Access und Trunk mit modellspezifischer Syntax.",
      "short": "Access, tagged/untagged, Verwaltung und Speichern der Konfiguration",
      "steps": [
        {
          "title": "VLANs und Ports planen",
          "html": "<p>Plane VLAN 10 Benutzer, 20 Server und 99 Verwaltung mit Porttabelle und Konsolenrückweg. Ein VirtualBox Internal Network ist kein echtes 802.1Q-Trunking. Ersetze jede Beispielschnittstelle durch den freigegebenen Testport.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Cisco-IOS-XE-Beispiel",
          "html": "<p>Nutze das Beispiel nur auf kompatiblen IOS-XE-Testgeräten. Prüfe Access-VLAN, begrenzte Allow-Liste und passendes Native-VLAN auf beiden Seiten. Das Beispiel trägt 99 ungetaggt und 10/20 getaggt. Ändere keinen produktiven Verwaltungsuplink. Speichere und prüfe die Sollkonfiguration.</p>",
          "code": "configure terminal\nvlan 10\n name USERS\nvlan 20\n name SERVERS\nvlan 99\n name MGMT\ninterface GigabitEthernet1/0/10\n switchport mode access\n switchport access vlan 10\ninterface GigabitEthernet1/0/24\n switchport mode trunk\n switchport trunk native vlan 99\n switchport trunk allowed vlan 10,20,99\nend\nshow vlan brief\nshow interfaces trunk\ncopy running-config startup-config",
          "label": "Cisco-IOS-XE-Beispiel · Schnittstellennamen und Modellfunktionen vorher abgleichen",
          "expect": "Der Access-Port liegt in VLAN 10; der Trunk überträgt nur die vorgesehenen VLANs und dasselbe Native-VLAN wie die Gegenseite. Bestätige, dass die Konfiguration gespeichert ist."
        },
        {
          "title": "Aruba-AOS-CX-Entsprechung",
          "html": "<p>AOS-CX unterscheidet sich von ArubaOS-Switch/PVOS und Comware. Wähle bei routingfähigen Schnittstellen gegebenenfalls den passenden Layer-2-Modus wie no routing gemäß Modell. Gleiche Native/Allowed mit der Gegenseite ab, prüfe show-Ausgaben und speichere.</p>",
          "code": "configure terminal\nvlan 10\n name USERS\nvlan 20\n name SERVERS\nvlan 99\n name MGMT\ninterface 1/1/10\n no routing\n vlan access 10\n no shutdown\ninterface 1/1/24\n no routing\n vlan trunk native 99\n vlan trunk allowed 10,20,99\n no shutdown\nend\nshow vlan\nshow interface 1/1/24\ncopy running-config startup-config",
          "label": "Aruba-AOS-CX-10.15-Beispiel · Syntax für dein Modell prüfen",
          "expect": "VLAN- und Schnittstellenausgabe zeigen denselben Sollzustand wie das Cisco-Beispiel; nimm nicht an, dass der Befehlstext gleich ist."
        },
        {
          "title": "Daten und Rückfall testen",
          "html": "<p>Prüfe zwei Clients desselben VLAN über den Link und danach die Trennung von VLAN 20. VLAN-Erstellung allein routet nicht zwischen VLANs. Prüfe Verbindung, VLAN, Trunk und IP nacheinander. Stelle nur geänderte Testports anhand der Sicherung zurück; starte nicht wahllos neu.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "VLAN-/Portplan nutzt die echten Schnittstellennamen.",
        "Cisco-Konfiguration und show-Nachweise liegen für freigegebene Geräte vor, sonst bleibt die Aufgabe offen.",
        "AOS-CX-Entsprechung wurde ausgeführt oder ausdrücklich nur geplant.",
        "Same-VLAN-Tests, Inter-VLAN-Regeln, Speichern und Rückfall sind dokumentiert."
      ],
      "quiz": [
        {
          "q": "Was muss zwischen zwei Switches für ein VLAN passen?",
          "options": [
            "Nur Gerätenamen",
            "Linkkonfiguration und Transport des VLAN auf beiden Seiten",
            "Jede ACL muss abgeschaltet sein"
          ],
          "answer": 1,
          "explain": "Das VLAN muss vorhanden sein und entlang des Pfads konsistent übertragen werden."
        },
        {
          "q": "Warum AOS-CX-Befehle nicht in Comware einfügen?",
          "options": [
            "Syntax und Konfigurationsmodelle unterscheiden sich",
            "VLAN gibt es nur bei Cisco",
            "Speichern ist unnötig"
          ],
          "answer": 0,
          "explain": "Dieselbe Marke kann unterschiedliche Netzwerkbetriebssysteme enthalten."
        }
      ]
    },
    "firewall-lab": {
      "title": "Praktisches OPNsense-Firewall-Lab",
      "goal": "Beweise erlaubtes HTTP und gesperrtes SSH mit Logs und betriebsbereitem Ziel.",
      "short": "Zwei isolierte Zonen, enge Regel, Logs und Sperrtest",
      "steps": [
        {
          "title": "Eigenes Profil erstellen",
          "html": "<p>Erstelle FWLAB01 OPNsense 4 GB/40 GB, CLFW01 Windows 11 Pro 4 GB/80 GB und WEBFW01 Ubuntu 2 GB/40 GB, zunächst je 2 vCPUs. Bereite Windows/Ubuntu über NAT vor und installiere nginx, openssh-server und ufw vor der Trennung. FWLAB01 hat WAN NAT, LAN LAB-FW-USERS und OPT1 LAB-FW-SRV; notiere MACs. Clients haben je einen passenden internen Adapter. Keine Bridge zum Host oder Domänenlab.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Installieren und Schnittstellen zuordnen",
          "html": "<p>Installiere OPNsense dauerhaft auf die leere Disk, nicht nur im Live-Modus. Ordne NICs per MAC zu. Setze LAN 10.40.10.1/24 und aktives OPT1 10.40.20.1/24 ohne DHCP. CLFW01 erhält .10.50/24 mit Gateway .10.1, WEBFW01 .20.10/24 mit Gateway .20.1. Teste per IP. Sichere die Konfiguration und halte die Konsole bereit. Prüfe Private-Network-Blocking nur passend zu diesem privaten NAT-WAN; öffne keine WAN-Verwaltung. Zwischen den Subnetzen ist kein NAT nötig.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Begrenzte Eingangsregeln erstellen",
          "html": "<p>Aktiviere nginx/ssh auf WEBFW01 und beweise Listen auf 80/22. Erlaube bei aktivem UFW beide nur von 10.40.10.50 für den Vergleich. Reihenfolge auf Firewall-LAN: Verwaltungs-HTTPS von .10.50 zur LAN-Adresse; protokolliertes TCP 80 von .10.50 nach .20.10; protokollierte Sperre für übrigen Verkehr von .10.50 nach 10.40.20.0/24. Deaktiviere LAN-any erst nach geprüftem Verwaltungs-/Backup-/Konsolenrückweg. Prüfe Anti-lockout, Floating-, Gruppen- und automatische Regeln; entferne Umgehungen erst nach gesicherter Rückkehr. Erlaube keinen allgemeinen Verbindungsaufbau von Servern zu Benutzern.</p>",
          "code": null,
          "label": null,
          "expect": "Die enge Pass-Regel steht vor der Ziel-Sperrregel. Prüfe auch Floating-, Gruppen- und automatische Regeln; verallgemeinere first-match nicht ohne sie."
        },
        {
          "title": "Regelwirkung beweisen",
          "html": "<p>Erwarte auf CLFW01 Erfolg für HTTP/TCP 80 und Fehlschlag für TCP 22. Gleiche Quelle/Ziel/Port/Regel in Live View ab. Beweise mit ss auf WEBFW01, dass SSH lauscht. Teste nach Änderungen neue Verbindungen; lösche bei Bedarf nur den betreffenden Test-State. Bewahre die funktionierende Sicherung auf. Die Website wird nicht öffentlich veröffentlicht.</p>",
          "code": "curl.exe -I http://10.40.20.10\nTest-NetConnection 10.40.20.10 -Port 80\nTest-NetConnection 10.40.20.10 -Port 22\n# WEBFW01 console\n# sudo ss -lntp",
          "label": "CLFW01 · PowerShell; ss separat an der Ubuntu-Konsole prüfen",
          "expect": "TCP 80 gelingt, TCP 22 ist gesperrt; Log und Listen-Zustand zeigen, dass das Ergebnis von der Regel stammt. Die Webseite ist nicht öffentlich."
        }
      ],
      "tasks": [
        "Alle drei VMs und MAC-/Interface-Zuordnungen sind isoliert, ohne Bridge oder Host-Portweiterleitung.",
        "Adressen/Gateways stimmen; Nginx und SSH lauschen tatsächlich am Ziel.",
        "HTTP funktioniert und SSH wird mit passendem Firewall-Log gesperrt.",
        "Verwaltung ist begrenzt, Konfiguration gesichert und Tests mit neuen Verbindungen sind dokumentiert."
      ],
      "quiz": [
        {
          "q": "Warum eignet sich gestopptes SSH schlecht als Sperrregeltest?",
          "options": [
            "Der Fehler kann vom fehlenden Dienst statt der Firewall stammen",
            "SSH nutzt nur UDP",
            "Logs sind unwichtig"
          ],
          "answer": 0,
          "explain": "Beweise ein betriebsbereites Ziel und den passenden Regel-Log."
        },
        {
          "q": "Warum nach Regeländerung eine neue Verbindung testen?",
          "options": [
            "Um alle Daten zu löschen",
            "Ein alter Verbindungszustand kann weiterhin gelten",
            "Die IP ändert sich immer"
          ],
          "answer": 1,
          "explain": "Vorhandene States können auf früheren Entscheidungen weiterlaufen."
        }
      ]
    },
    "vendor-firewalls": {
      "title": "FortiGate- und Palo-Alto-Regeln",
      "goal": "Übertrage eine Zugriffsanforderung in herstellerspezifische Regeln.",
      "short": "Schnittstellen und Zonen, Policy, NAT, Logs und Commit",
      "steps": [
        {
          "title": "Gemeinsame Anforderung definieren",
          "html": "<p>Bestimme Schnittstelle/Zone, Quell-/Zielnetz, Rückweg und Dienstverantwortung. Erlaube nur benötigten Webzugriff, nicht Serververwaltungs-SSH. NAT und Zugriffsfreigabe sind getrennt; aktiviere NAT nicht unnötig zwischen gerouteten internen Netzen. Prüfe Image/Modell/Abonnementrechte.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "FortiOS-Beispiel",
          "html": "<p>Nutze im dokumentierten FortiOS-7.6.4-Szenario Policy & Objects → Firewall Policy mit genauen Eingangs-/Ausgangsschnittstellen, Adressobjekten, Zeitplan, Dienst, ACCEPT und vorgesehenem Logging. Internes NAT ist hier nicht nötig. Prüfe Reihenfolge, Central-SNAT-/NGFW-Modus, Backup sowie Policy hit/Log & Report. Passe an das lizenzierte Modell/die Version an.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "PAN-OS-Beispiel",
          "html": "<p>Nutze bei PAN-OS 11.1 Policies → Security mit korrekten Zonen, genauen Adressen und passendem Application/Service. Verstehe application-default und App-ID; Portregeln sind keine vollständige Anwendungskontrolle. Setze Aktion/Logging, prüfe Interzone-/Intrazone-Standardregeln und führe Commit erfolgreich aus. NAT ist eine eigene Regel. Prüfe Traffic-Logs und neue Sitzungen.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Nachweise und Rückfall liefern",
          "html": "<p>Notiere je Hersteller Modell/Version, Regel-ID, Interfaces/Zonen, Adressen, Anwendung/Port, NAT, Logs, erlaubte/verweigerte Tests und Rückfall. Wenn nur OPNsense verfügbar ist, gilt dieses als ausgeführt, die Herstellerzuordnung als Planung. Lesen und Screenshots sind keine echte Konfigurationserfahrung.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Die Zugriffsmatrix enthält Verantwortlichen und Prüftermin.",
        "FortiOS-Regel/NAT/Version und Planung gegenüber Ausführung sind erfasst.",
        "PAN-OS-Zonen/Anwendung/Dienst/Commit und Lizenzgrenzen sind erfasst.",
        "Verfügbare Geräte haben Positiv-/Negativtests und Regel-/Lognachweise; fehlende Ausführung bleibt offen."
      ],
      "quiz": [
        {
          "q": "Wann wird eine PAN-OS-Candidate-Änderung normalerweise aktiv?",
          "options": [
            "Beim Öffnen der Seite",
            "Nach erfolgreichem Commit",
            "Beim Umbenennen der Sicherung"
          ],
          "answer": 1,
          "explain": "Prüfe Commit-Erfolg und tatsächliches Verhalten."
        },
        {
          "q": "Gewährt NAT allein allgemeinen Datenverkehr?",
          "options": [
            "Immer",
            "Bei jeder privaten Quelle",
            "Nein; Übersetzung und Zugriffsregeln sind getrennt zu prüfen"
          ],
          "answer": 2,
          "explain": "Berücksichtige zugehörige automatische Regeln, verwechsle Übersetzung aber nicht mit Berechtigung."
        }
      ]
    },
    "infra-handover": {
      "title": "Infrastrukturübergabe und Ausfalltest",
      "goal": "Liefere nachvollziehbare Pläne, Sicherungen und einen geprüften Rückfall.",
      "short": "Physischer und logischer Plan, Konfigurationssicherung und Runbook",
      "steps": [
        {
          "title": "Physische und logische Nachweise verbinden",
          "html": "<p>Physisch: Rack/U, Gerät, Port, Kabel, Strom A/B und Beschriftung. Logisch: VLAN, Subnetz, Gateway, Zone, Route, Regel und Dienst. Verbinde sie über eine gemeinsame Asset-ID; benenne beide Kabelenden und Verantwortlichen/Zweck jeder Regel.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Nutzbare Konfigurationen sichern",
          "html": "<p>Exportiere unterstützte Switch-/Firewall-Konfigurationen sicher mit Zeitpunkt, Modell und Version. Sie können sensible Zugangsdaten/Tokens enthalten; füge vollständige Sicherungen nie in gewöhnliche Websitenotizen ein. Teste eine begrenzte Wiederherstellung auf kompatiblen freigegebenen Lab-Geräten/VMs und prüfe den Verwaltungszugriff.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Einen umkehrbaren Fehler erzeugen",
          "html": "<p>Deaktiviere im getrennten Lab mit Konsolenrückweg eine Test-Webregel oder trenne ein virtuelles Clientkabel. Sammle Benutzer-/Gerätenachweise und nimm nur diese Änderung zurück. Führe keine physischen Strom-/Netzteilarbeiten ohne Fachplanung und Freigabe aus. Gemeinsame Strompfade sind keine unabhängige Hochverfügbarkeit.</p>",
          "code": null,
          "label": null,
          "expect": null
        },
        {
          "title": "Abnahme abschließen",
          "html": "<p>Dokumentiere Anforderung, Planung, Bestand, Konfiguration/Version, Positiv-/Negativtests, Rückfalltest, gemeinsame Abhängigkeiten, offene Arbeiten und Übernahmeverantwortung. Lege Zuständigkeiten/Nachweise bei Temperatur-, Strom-, Disk-, Switch- und Firewall-Störungen fest. Nenne VirtualBox- und Gerätegrenzen.</p>",
          "code": null,
          "label": null,
          "expect": null
        }
      ],
      "tasks": [
        "Asset-/Portbestand passt zu Rack, VLAN, IP, Strom und Dienstverantwortung.",
        "Versionierte sichere Konfigurationsbackups und ein kompatibler Restoretest liegen vor.",
        "Ein kontrollierter Lab-Ausfall und die gemessene Wiederherstellung sind dokumentiert.",
        "Das Betriebshandbuch benennt offene/Facharbeiten und enthält keine Kennwörter."
      ],
      "quiz": [
        {
          "q": "Warum Gerätekonfigurationsbackups schützen?",
          "options": [
            "Sie können Geheimnisse und sensible Verwaltungsdaten enthalten",
            "Es sind immer nur Bilder",
            "Sie lassen sich nie wiederherstellen"
          ],
          "answer": 0,
          "explain": "Eine Konfiguration kann Topologie und nutzbare Zugangsdaten offenlegen."
        },
        {
          "q": "Wie sollten physische und logische Pläne zusammenhängen?",
          "options": [
            "Sie haben keinen Zusammenhang",
            "Sie sollten über Asset- und Portkennungen zuordenbar sein",
            "Einer ersetzt den anderen"
          ],
          "answer": 1,
          "explain": "Diagnose muss einen logischen Dienst bis zum tatsächlichen Gerät/Link verfolgen können."
        }
      ]
    }
  }
};
