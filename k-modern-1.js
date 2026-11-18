/* Arefi ITPraxis – Kurs Moderne Infrastruktur, Teil 1 (Git, Infrastructure as Code, CI/CD). Eigene Inhalte. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKModern = window.ArefiKModern || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'mod-git', part: 1,
  title: ['Git برای ادمین‌ها: پیکربندی و اسکریپت با تاریخچه و بازبینی', 'Git für Admins: Konfiguration und Skripte mit Versionsgeschichte und Review', 'Git for admins: configuration and scripts with history and review'],
  goal: ['اسکریپت‌ها و فایل‌های پیکربندی را در یک مخزن Git نگه داری، تغییرات را با Branch و درخواست ادغام بازبینی کنی، هر تغییر را برگردانی و جلوی ورود رمز و کلید به مخزن را بگیری.', 'Du verwaltest Skripte und Konfigurationsdateien in einem Git-Repository, prüfst Änderungen über Branches und Merge Requests, kannst jede Änderung zurücknehmen und verhinderst, dass Kennwörter und Schlüssel ins Repository gelangen.', 'You keep scripts and configuration files in a Git repository, review changes through branches and merge requests, can undo any change and prevent passwords and keys from entering the repository.'],
  why: ['«چه کسی دیروز این تنظیم را عوض کرد؟» بدون Git جواب ندارد. امروز تقریباً همهٔ آگهی‌های شغلی ادمین Git، اسکریپت و «Infrastructure as Code» را می‌خواهند؛ Git پایهٔ Terraform، Ansible و CI/CD است.', '„Wer hat gestern diese Einstellung geändert?“ ist ohne Git nicht zu beantworten. Fast jede Admin-Stellenanzeige verlangt heute Git, Skripte und „Infrastructure as Code“; Git ist die Grundlage für Terraform, Ansible und CI/CD.', '“Who changed this setting yesterday?” has no answer without Git. Almost every admin job ad now asks for Git, scripting and “infrastructure as code”; Git is the foundation for Terraform, Ansible and CI/CD.'],
  know: [
    ['Git هر وضعیت پروژه را به‌صورت Commit با نویسنده، زمان و پیام ذخیره می‌کند. چرخهٔ روزانه: git pull، تغییر، git add، git commit -m «چرا»، git push. پیام Commit باید دلیل را بگوید، نه فقط «update».', 'Git speichert jeden Projektstand als Commit mit Autor, Zeit und Nachricht. Der Tageskreislauf: git pull, ändern, git add, git commit -m „warum“, git push. Die Commit-Nachricht nennt den Grund, nicht nur „update“.', 'Git stores every project state as a commit with author, time and message. The daily loop: git pull, change, git add, git commit -m “why”, git push. The commit message states the reason, not just “update”.'],
    ['Branch یک خط کاری جدا است: git switch -c fix/ntp. تغییر را روی Branch انجام بده، در GitHub یا GitLab یک Pull Request یا Merge Request باز کن تا همکار بازبینی کند، بعد در main ادغام کن. روی main قانون حفاظت (Branch Protection) بگذار تا کسی مستقیم Push نکند.', 'Ein Branch ist eine getrennte Arbeitslinie: git switch -c fix/ntp. Änderung auf dem Branch machen, in GitHub oder GitLab einen Pull bzw. Merge Request öffnen, Kollegin prüft, dann nach main mergen. main mit Branch Protection schützen, damit niemand direkt pusht.', 'A branch is a separate line of work: git switch -c fix/ntp. Make the change on the branch, open a pull or merge request in GitHub or GitLab for a colleague to review, then merge into main. Protect main with branch protection so nobody pushes directly.'],
    ['برگرداندن: git diff تفاوت را نشان می‌دهد، git log --oneline تاریخچه را، git revert <commit> یک Commit تازه می‌سازد که تغییر را خنثی می‌کند و برای Branchهای مشترک امن است. git reset --hard تاریخچه را بازنویسی می‌کند و فقط برای کار محلی منتشرنشده است.', 'Zurücknehmen: git diff zeigt Unterschiede, git log --oneline die Geschichte, git revert <commit> erzeugt einen neuen Commit, der die Änderung aufhebt, und ist auf gemeinsamen Branches sicher. git reset --hard schreibt die Geschichte um und ist nur für unveröffentlichte lokale Arbeit gedacht.', 'Undo: git diff shows differences, git log --oneline the history, git revert <commit> creates a new commit that cancels the change and is safe on shared branches. git reset --hard rewrites history and is only for unpublished local work.'],
    ['رمز، کلید خصوصی و توکن هرگز در Git نمی‌روند؛ حتی بعد از حذف در تاریخچه باقی می‌مانند. از .gitignore، متغیرهای محیطی، فایل نمونه (config.example) و ابزارهایی مثل gitleaks یا Secret Scanning در GitHub استفاده کن. اگر رمزی Push شد: فوراً آن را باطل و عوض کن؛ پاک کردن تاریخچه کافی نیست.', 'Kennwörter, private Schlüssel und Token gehören nie in Git – auch gelöscht bleiben sie in der Historie. Nutze .gitignore, Umgebungsvariablen, Beispieldateien (config.example) und Werkzeuge wie gitleaks oder das Secret Scanning von GitHub. Wurde ein Geheimnis gepusht: sofort sperren und ersetzen; Historie bereinigen allein reicht nicht.', 'Passwords, private keys and tokens never go into Git – even when deleted they remain in history. Use .gitignore, environment variables, example files (config.example) and tools like gitleaks or GitHub secret scanning. If a secret was pushed: revoke and replace it immediately; cleaning history alone is not enough.'],
    ['برای ادمین‌ها مفید: git blame فایل نشان می‌دهد هر خط را چه کسی و کی تغییر داده، git tag v1.4 یک نسخهٔ پایدار را علامت می‌زند و git stash تغییر نیمه‌کاره را موقت کنار می‌گذارد. احراز هویت به GitHub یا GitLab با کلید SSH یا توکن با دسترسی محدود، نه با رمز حساب.', 'Für Admins nützlich: git blame Datei zeigt, wer welche Zeile wann geändert hat, git tag v1.4 markiert einen stabilen Stand, git stash legt halbfertige Änderungen kurz beiseite. Anmeldung bei GitHub oder GitLab mit SSH-Schlüssel oder Token mit begrenzten Rechten, nicht mit dem Kontokennwort.', 'Useful for admins: git blame file shows who changed each line and when, git tag v1.4 marks a stable state, git stash parks unfinished changes. Authenticate to GitHub or GitLab with an SSH key or a token with limited scope, not the account password.'],
    ['ساختار پیشنهادی یک مخزن زیرساخت: پوشه‌های scripts، ansible، terraform و docs، یک README با توضیح استفاده، .gitignore و CODEOWNERS برای تعیین بازبین. فایل‌های حجیم و باینری (ISO، پشتیبان) جای Git نیستند.', 'Empfohlene Struktur eines Infrastruktur-Repositorys: Ordner scripts, ansible, terraform und docs, eine README mit Bedienhinweisen, .gitignore und CODEOWNERS für feste Prüfer. Große Binärdateien (ISO, Backups) gehören nicht in Git.', 'Recommended structure of an infrastructure repository: folders scripts, ansible, terraform and docs, a README explaining usage, .gitignore and CODEOWNERS for fixed reviewers. Large binaries (ISOs, backups) do not belong in Git.']
  ],
  lab: {
    vm: 'LNX01 (Ubuntu Server 24.04) und optional ein kostenloses GitHub- oder GitLab-Konto', shell: 'Bash',
    steps: [
      ['git را نصب کن، نام و ایمیل خودت را تنظیم کن و مخزن infra-config را با پوشه‌های scripts و docs بساز.', 'یک اسکریپت پشتیبان‌گیری و یک .gitignore اضافه کن و اولین Commit را با پیام روشن ثبت کن.', 'یک Branch به نام feature/retention بساز، مدت نگه‌داری پشتیبان را تغییر بده، تفاوت را با git diff ببین و Commit کن.', 'Branch را در main ادغام کن، بعد با git revert تغییر را دوباره برگردان و تاریخچه را با git log --oneline --graph بخوان.', 'عمداً یک فایل .env با رمز ساختگی بساز و بررسی کن که به لطف .gitignore در git status دیده نمی‌شود. اختیاری: مخزن را به GitHub یا GitLab خصوصی Push کن.'],
      ['git installieren, Name und E-Mail setzen und das Repository infra-config mit den Ordnern scripts und docs anlegen.', 'Ein Backup-Skript und eine .gitignore hinzufügen, ersten Commit mit klarer Nachricht erstellen.', 'Branch feature/retention anlegen, die Aufbewahrungsdauer ändern, mit git diff prüfen und committen.', 'Branch in main mergen, die Änderung danach mit git revert zurücknehmen und die Geschichte mit git log --oneline --graph lesen.', 'Absichtlich eine .env-Datei mit erfundenem Kennwort anlegen und prüfen, dass sie dank .gitignore nicht in git status erscheint. Optional: Repository privat zu GitHub oder GitLab pushen.'],
      ['Install git, set your name and e-mail and create the repository infra-config with folders scripts and docs.', 'Add a backup script and a .gitignore and make the first commit with a clear message.', 'Create branch feature/retention, change the retention period, check with git diff and commit.', 'Merge the branch into main, then undo the change with git revert and read the history with git log --oneline --graph.', 'Deliberately create a .env file with a made-up password and confirm that thanks to .gitignore it does not show in git status. Optional: push the repository privately to GitHub or GitLab.']
    ],
    code: R`sudo apt update && sudo apt install -y git
git config --global user.name "Vorname Nachname"
git config --global user.email "du@example.com"
git config --global init.defaultBranch main

mkdir -p ~/infra-config/{scripts,docs} && cd ~/infra-config
git init
cat > scripts/backup.sh <<'EOF'
#!/usr/bin/env bash
# Sichert /etc nach /srv/backup und loescht Sicherungen nach RETENTION Tagen
set -euo pipefail
RETENTION=7
ZIEL=/srv/backup
mkdir -p "$ZIEL"
tar -czf "$ZIEL/etc-$(date +%F).tar.gz" /etc
find "$ZIEL" -name 'etc-*.tar.gz' -mtime +"$RETENTION" -delete
EOF
chmod +x scripts/backup.sh
printf '.env\n*.key\n*.pem\nsecrets/\n' > .gitignore
echo "# infra-config – Skripte und Konfiguration von LNX01" > README.md
git add .
git commit -m "Backup-Skript fuer /etc mit 7 Tagen Aufbewahrung"

git switch -c feature/retention
sed -i 's/^RETENTION=7/RETENTION=14/' scripts/backup.sh
git diff
git commit -am "Aufbewahrung auf 14 Tage erhoeht (Anforderung Revision)"
git switch main
git merge --no-ff feature/retention -m "Merge feature/retention"
git log --oneline --graph

git revert --no-edit HEAD
git log --oneline --graph
grep RETENTION= scripts/backup.sh

echo "DB_PASSWORD=NurEinBeispiel" > .env
git status --short
git check-ignore -v .env

# Optional: privates Remote-Repository (vorher SSH-Schluessel im Konto hinterlegen)
# git remote add origin git@github.com:BENUTZER/infra-config.git
# git push -u origin main`,
    checks: [
      ['git log --oneline --graph سه Commit و یک Merge با پیام‌های گویا نشان می‌دهد.', 'بعد از revert مقدار RETENTION دوباره ۷ است و هر دو تغییر در تاریخچه مانده‌اند.', 'git status فایل .env را نشان نمی‌دهد و git check-ignore قانون مربوط را نام می‌برد.', 'می‌توانی فرق revert و reset --hard را با مثال همین مخزن توضیح بدهی.'],
      ['git log --oneline --graph zeigt drei Commits und einen Merge mit aussagekräftigen Nachrichten.', 'Nach dem Revert steht RETENTION wieder auf 7, beide Änderungen bleiben in der Geschichte sichtbar.', 'git status zeigt .env nicht an, git check-ignore nennt die zuständige Regel.', 'Du kannst den Unterschied zwischen revert und reset --hard an diesem Repository erklären.'],
      ['git log --oneline --graph shows three commits and one merge with meaningful messages.', 'After the revert RETENTION is back to 7 and both changes remain visible in history.', 'git status does not show .env and git check-ignore names the responsible rule.', 'You can explain the difference between revert and reset --hard using this repository.']
    ]
  },
  trouble: [
    [['git push با rejected (non-fast-forward) رد می‌شود.', 'git push wird mit rejected (non-fast-forward) abgewiesen.', 'git push is rejected with rejected (non-fast-forward).'],
     ['کسی قبل از تو چیزی Push کرده است. git pull --rebase بزن، تعارض‌ها را حل کن و دوباره Push کن. هرگز به‌صورت عادی git push --force روی main نزن؛ کار همکاران پاک می‌شود.', 'Jemand hat vor dir gepusht. git pull --rebase ausführen, Konflikte lösen, erneut pushen. Niemals routinemäßig git push --force auf main – das löscht die Arbeit anderer.', 'Someone pushed before you. Run git pull --rebase, resolve conflicts and push again. Never routinely git push --force on main – it wipes out colleagues’ work.']],
    [['بعد از Merge در فایل علامت‌های <<<<<<< و >>>>>>> دیده می‌شود.', 'Nach einem Merge stehen <<<<<<< und >>>>>>> in der Datei.', 'After a merge the file contains <<<<<<< and >>>>>>>.'],
     ['تعارض ادغام است: دو نفر همان خط‌ها را عوض کرده‌اند. نسخهٔ درست را دستی بساز، علامت‌ها را پاک کن، git add فایل و git commit. با git status فایل‌های مانده را ببین؛ قبل از Commit اسکریپت را آزمایش کن.', 'Ein Merge-Konflikt: Zwei Personen haben dieselben Zeilen geändert. Richtige Fassung von Hand herstellen, Markierungen entfernen, git add Datei und git commit. Mit git status offene Dateien sehen; vor dem Commit das Skript testen.', 'A merge conflict: two people changed the same lines. Build the correct version by hand, remove the markers, git add the file and git commit. Use git status to see remaining files; test the script before committing.']],
    [['یک رمز یا کلید API در مخزن Push شده است.', 'Ein Kennwort oder API-Schlüssel wurde ins Repository gepusht.', 'A password or API key was pushed to the repository.'],
     ['اول رمز یا کلید را در سیستم مربوط باطل و عوض کن؛ از همین لحظه آن را لو رفته فرض کن. بعد فایل را با git rm --cached بیرون بیاور، به .gitignore اضافه کن و در صورت نیاز تاریخچه را با git filter-repo پاک کن و به همکاران خبر بده.', 'Zuerst das Kennwort bzw. den Schlüssel im betroffenen System sperren und ersetzen – ab jetzt gilt es als kompromittiert. Dann Datei mit git rm --cached herausnehmen, in .gitignore eintragen und bei Bedarf die Historie mit git filter-repo bereinigen und das Team informieren.', 'First revoke and replace the password or key in the affected system – treat it as compromised from now on. Then remove the file with git rm --cached, add it to .gitignore, clean history with git filter-repo if needed and inform the team.']],
    [['Permission denied (publickey) هنگام clone یا push.', 'Permission denied (publickey) bei clone oder push.', 'Permission denied (publickey) on clone or push.'],
     ['کلید عمومی در حساب GitHub یا GitLab ثبت نشده یا ssh-agent کلید را ندارد. با ssh -T git@github.com آزمایش کن، کلید را با ssh-add اضافه کن و آدرس Remote را با git remote -v بررسی کن (SSH در برابر HTTPS).', 'Der öffentliche Schlüssel ist nicht im GitHub- bzw. GitLab-Konto hinterlegt oder der ssh-agent kennt ihn nicht. Mit ssh -T git@github.com testen, Schlüssel per ssh-add laden und die Remote-Adresse mit git remote -v prüfen (SSH oder HTTPS).', 'The public key is not registered in the GitHub or GitLab account or ssh-agent doesn’t have it. Test with ssh -T git@github.com, load the key with ssh-add and check the remote URL with git remote -v (SSH versus HTTPS).']]
  ],
  decide: [
    [['GitHub، GitLab یا سرور Git خودت؟', 'GitHub, GitLab oder eigener Git-Server?', 'GitHub, GitLab or your own Git server?'],
     ['GitHub و GitLab.com سریع و بدون نگه‌داری‌اند. وقتی داده‌ها به خاطر DSGVO یا قرارداد باید داخل شرکت بمانند، GitLab CE خودمیزبان یا Gitea/Forgejo مناسب است؛ آن وقت پشتیبان‌گیری و به‌روزرسانی با خود توست.', 'GitHub und GitLab.com sind schnell und wartungsfrei. Müssen Daten wegen DSGVO oder Vertrag im Haus bleiben, passt selbst betriebenes GitLab CE oder Gitea/Forgejo – dann liegen Backup und Updates bei dir.', 'GitHub and GitLab.com are quick and maintenance-free. If data must stay in-house for GDPR or contract reasons, self-hosted GitLab CE or Gitea/Forgejo fits – then backups and updates are your job.']],
    [['Merge یا Rebase؟', 'Merge oder Rebase?', 'Merge or rebase?'],
     ['برای Branchهای مشترک Merge (یا Squash Merge در Pull Request) امن و قابل‌ردیابی است. Rebase فقط روی Branch شخصی و قبل از انتشار، برای تاریخچهٔ تمیز. قاعدهٔ تیم را در README بنویس.', 'Auf gemeinsamen Branches ist Merge (oder Squash Merge im Pull Request) sicher und nachvollziehbar. Rebase nur auf eigenen, noch nicht veröffentlichten Branches für eine saubere Geschichte. Die Teamregel in die README schreiben.', 'On shared branches merge (or squash merge in the pull request) is safe and traceable. Rebase only on your own, unpublished branches for a clean history. Write the team rule into the README.']]
  ],
  pitfalls: [
    ['Commit مستقیم روی main بدون بازبینی در مخزن تولیدی.', 'Direkt auf main committen, ohne Review, in einem Produktiv-Repository.', 'Committing directly to main without review in a production repository.'],
    ['پیام‌های بی‌معنا مثل «fix» یا «update» که بعداً هیچ کمکی نمی‌کنند.', 'Nichtssagende Nachrichten wie „fix“ oder „update“, die später nichts erklären.', 'Meaningless messages like “fix” or “update” that explain nothing later.'],
    ['قرار دادن فایل پیکربندی واقعی با رمز به‌جای فایل نمونه.', 'Echte Konfigurationsdatei mit Kennwort statt einer Beispieldatei einchecken.', 'Committing the real config file with passwords instead of an example file.']
  ],
  iv: [
    [['چرا ادمین سیستم باید Git بلد باشد؟', 'Warum sollte ein Systemadministrator Git können?', 'Why should a system administrator know Git?'],
     ['برای تاریخچه و دلیل هر تغییر، برگرداندن سریع، کار تیمی با بازبینی و چون Terraform، Ansible و Pipelineهای CI/CD همه از مخزن Git کار می‌کنند.', 'Für Nachvollziehbarkeit jeder Änderung samt Grund, schnelles Zurücknehmen, Teamarbeit mit Review – und weil Terraform, Ansible und CI/CD-Pipelines alle aus einem Git-Repository arbeiten.', 'For traceability of every change and its reason, quick rollback, teamwork with review – and because Terraform, Ansible and CI/CD pipelines all work from a Git repository.']],
    [['فرق git revert و git reset چیست؟', 'Unterschied zwischen git revert und git reset?', 'Difference between git revert and git reset?'],
     ['revert یک Commit جدید می‌سازد که تغییر را خنثی می‌کند و تاریخچه را نگه می‌دارد؛ برای Branch مشترک. reset اشاره‌گر Branch را عقب می‌برد و تاریخچه را بازنویسی می‌کند؛ فقط محلی.', 'revert erzeugt einen neuen Commit, der die Änderung aufhebt, und behält die Geschichte – für gemeinsame Branches. reset setzt den Branch-Zeiger zurück und schreibt die Geschichte um – nur lokal.', 'revert creates a new commit that cancels the change and keeps history – for shared branches. reset moves the branch pointer back and rewrites history – local only.']],
    [['همکاری رمز دیتابیس را Push کرده است. چه می‌کنی؟', 'Ein Kollege hat das Datenbankkennwort gepusht. Was tust du?', 'A colleague pushed the database password. What do you do?'],
     ['رمز را فوراً عوض می‌کنم، لاگ‌ها را برای سوءاستفاده بررسی می‌کنم، فایل را از مخزن و تاریخچه بیرون می‌آورم، .gitignore و Secret Scanning را فعال می‌کنم و رمز را به یک Vault یا متغیر امن Pipeline منتقل می‌کنم.', 'Ich ändere das Kennwort sofort, prüfe die Logs auf Missbrauch, entferne die Datei aus Repository und Historie, aktiviere .gitignore und Secret Scanning und verlege das Geheimnis in einen Vault oder eine geschützte Pipeline-Variable.', 'I change the password immediately, check logs for misuse, remove the file from the repository and history, enable .gitignore and secret scanning and move the secret into a vault or a protected pipeline variable.']]
  ],
  sources: [
    ['Pro Git (Buch, kostenlos)', 'https://git-scm.com/book/en/v2'],
    ['GitHub Docs – About protected branches', 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches'],
    ['gitleaks (GitHub)', 'https://github.com/gitleaks/gitleaks']
  ]
},

{
  id: 'mod-iac', part: 1,
  title: ['Infrastructure as Code با Terraform و OpenTofu', 'Infrastructure as Code mit Terraform und OpenTofu', 'Infrastructure as code with Terraform and OpenTofu'],
  goal: ['زیرساخت را به‌جای کلیک، در فایل‌های متنی توصیف کنی؛ چرخهٔ init، plan و apply را بفهمی، State را امن نگه داری، تغییر و Drift را تشخیص دهی و منابع را قابل‌تکرار بسازی و پاک کنی.', 'Du beschreibst Infrastruktur in Textdateien statt per Klick, verstehst den Ablauf init, plan und apply, schützt den State, erkennst Änderungen und Drift und baust Ressourcen wiederholbar auf und ab.', 'You describe infrastructure in text files instead of clicking, understand the init, plan and apply cycle, protect the state, detect changes and drift and build and remove resources repeatably.'],
  why: ['شرکت‌ها محیط‌های تست، شعبه و ابر را با کد می‌سازند تا هر محیط یکسان، مستند و قابل بازسازی باشد. Terraform رایج‌ترین ابزار IaC در آگهی‌های شغلی است و OpenTofu جایگزین متن‌باز آن با همان فرمان‌ها.', 'Firmen bauen Test-, Filial- und Cloud-Umgebungen per Code, damit jede Umgebung gleich, dokumentiert und wiederherstellbar ist. Terraform ist das verbreitetste IaC-Werkzeug in Stellenanzeigen, OpenTofu die quelloffene Alternative mit denselben Befehlen.', 'Companies build test, branch and cloud environments as code so every environment is identical, documented and rebuildable. Terraform is the most common IaC tool in job ads and OpenTofu its open-source alternative with the same commands.'],
  know: [
    ['IaC اعلانی است: وضعیت مطلوب را می‌نویسی («یک کانتینر nginx روی پورت ۸۰۸۰») و ابزار خودش تفاوت با وضعیت فعلی را محاسبه و اجرا می‌کند. اسکریپت دستوری قدم‌ها را می‌گوید و اجرای دوباره‌اش ممکن است خطا بدهد؛ IaC خوب Idempotent است.', 'IaC ist deklarativ: Du beschreibst den Sollzustand („ein nginx-Container auf Port 8080“), das Werkzeug berechnet selbst den Unterschied zum Istzustand und setzt ihn um. Ein imperatives Skript beschreibt Schritte und scheitert bei erneutem Lauf eventuell; gutes IaC ist idempotent.', 'IaC is declarative: you describe the desired state (“an nginx container on port 8080”) and the tool calculates and applies the difference from the current state. An imperative script describes steps and may fail when rerun; good IaC is idempotent.'],
    ['Terraform با Providerها کار می‌کند: AWS، Azure، vSphere، Proxmox، Docker، Microsoft 365 و صدها دیگر. فایل‌ها با پسوند .tf به زبان HCL نوشته می‌شوند: resource برای ساختن، data برای خواندن، variable برای ورودی و output برای خروجی.', 'Terraform arbeitet mit Providern: AWS, Azure, vSphere, Proxmox, Docker, Microsoft 365 und Hunderte weitere. Dateien mit Endung .tf sind in HCL geschrieben: resource zum Anlegen, data zum Lesen, variable für Eingaben, output für Ausgaben.', 'Terraform works with providers: AWS, Azure, vSphere, Proxmox, Docker, Microsoft 365 and hundreds more. Files ending in .tf are written in HCL: resource to create, data to read, variable for inputs and output for outputs.'],
    ['چرخهٔ کار: terraform init (دانلود Provider)، fmt و validate (قالب و نحو)، plan (نمایش دقیق تغییرات: + ساختن، ~ تغییر، - حذف، -/+ جایگزینی)، apply و در پایان destroy. خروجی plan را همیشه بخوان؛ «-/+» یعنی منبع پاک و دوباره ساخته می‌شود و ممکن است داده از بین برود.', 'Arbeitsablauf: terraform init (Provider laden), fmt und validate (Format und Syntax), plan (zeigt genau: + anlegen, ~ ändern, - löschen, -/+ ersetzen), apply und am Ende destroy. Die plan-Ausgabe immer lesen: „-/+“ heißt, die Ressource wird gelöscht und neu gebaut – Daten können verloren gehen.', 'Workflow: terraform init (download providers), fmt and validate (format and syntax), plan (shows exactly: + create, ~ change, - delete, -/+ replace), apply and finally destroy. Always read the plan: “-/+” means the resource is destroyed and recreated – data may be lost.'],
    ['فایل State (terraform.tfstate) نقشهٔ بین کد و منابع واقعی است و اغلب رمز و آدرس دارد. در تیم آن را در Backend راه‌دور با قفل نگه دار (مثلاً S3 با قفل، Azure Storage، GitLab یا Terraform Cloud)، هرگز در Git و هرگز دستی ویرایش نکن.', 'Die State-Datei (terraform.tfstate) verbindet Code und echte Ressourcen und enthält oft Kennwörter und Adressen. Im Team in einem Remote-Backend mit Sperre ablegen (z. B. S3 mit Locking, Azure Storage, GitLab oder Terraform Cloud), nie in Git und nie von Hand bearbeiten.', 'The state file (terraform.tfstate) links code to real resources and often contains passwords and addresses. In a team keep it in a remote backend with locking (e.g. S3 with locking, Azure Storage, GitLab or Terraform Cloud), never in Git and never edit it by hand.'],
    ['Drift یعنی کسی دستی در کنسول چیزی را عوض کرده است؛ plan بعدی آن را نشان می‌دهد و apply دوباره به کد برمی‌گرداند. پس قانون تیم: تغییرات فقط از راه کد و Pull Request. نسخهٔ Provider را با version = "~> 3.0" ثابت کن و .terraform.lock.hcl را Commit کن.', 'Drift heißt: Jemand hat in der Konsole von Hand etwas geändert; der nächste plan zeigt es, apply stellt den Code-Zustand wieder her. Teamregel deshalb: Änderungen nur über Code und Pull Request. Provider-Version mit version = "~> 3.0" festlegen und .terraform.lock.hcl committen.', 'Drift means someone changed something by hand in the console; the next plan shows it and apply restores the code state. So the team rule: changes only through code and pull requests. Pin the provider version with version = "~> 3.0" and commit .terraform.lock.hcl.'],
    ['مجوز: HashiCorp از نسخهٔ 1.6 در اوت ۲۰۲۳ مجوز Terraform را به BSL تغییر داد. OpenTofu یک انشعاب متن‌باز (MPL 2.0) زیر بنیاد لینوکس است که فرمان‌ها و فایل‌هایش تقریباً یکسان‌اند (tofu init، tofu plan). در مصاحبه بدان که هر دو را می‌شناسی.', 'Lizenz: HashiCorp hat Terraform ab Version 1.6 im August 2023 unter die BSL gestellt. OpenTofu ist ein quelloffener Fork (MPL 2.0) unter der Linux Foundation mit weitgehend gleichen Befehlen und Dateien (tofu init, tofu plan). Im Vorstellungsgespräch zeigen, dass du beide kennst.', 'License: from version 1.6 in August 2023 HashiCorp moved Terraform to the BSL. OpenTofu is an open-source fork (MPL 2.0) under the Linux Foundation with largely identical commands and files (tofu init, tofu plan). In interviews show that you know both.']
  ],
  lab: {
    vm: 'LNX01 (Ubuntu Server 24.04) mit Docker aus der Linux-Lernstrecke', shell: 'Bash',
    steps: [
      ['Terraform را از مخزن رسمی HashiCorp نصب کن (یا OpenTofu با اسکریپت رسمی) و نسخه را بررسی کن.', 'در پوشهٔ ~/infra-config/terraform/web فایل main.tf را با Provider داکر، یک Image و یک کانتینر nginx و متغیر پورت بنویس.', 'init، fmt، validate و plan را اجرا کن، خروجی را بخوان و بعد apply کن. با curl صفحه را آزمایش کن.', 'پورت را در variables به 8081 تغییر بده و در plan ببین که کانتینر جایگزین (-/+) می‌شود. بعد عمداً کانتینر را دستی با docker stop متوقف کن و ببین plan بعدی Drift را نشان می‌دهد.', 'با destroy همه‌چیز را پاک کن، فایل‌های .tf و .terraform.lock.hcl را Commit کن و مطمئن شو terraform.tfstate در .gitignore است.'],
      ['Terraform aus dem offiziellen HashiCorp-Repository installieren (oder OpenTofu per offiziellem Skript) und die Version prüfen.', 'Im Ordner ~/infra-config/terraform/web die Datei main.tf mit Docker-Provider, einem Image, einem nginx-Container und einer Port-Variable schreiben.', 'init, fmt, validate und plan ausführen, Ausgabe lesen, dann apply. Mit curl die Seite testen.', 'Port in der Variable auf 8081 ändern und im plan sehen, dass der Container ersetzt wird (-/+). Dann den Container absichtlich mit docker stop anhalten und sehen, wie der nächste plan den Drift zeigt.', 'Mit destroy alles entfernen, .tf-Dateien und .terraform.lock.hcl committen und sicherstellen, dass terraform.tfstate in .gitignore steht.'],
      ['Install Terraform from the official HashiCorp repository (or OpenTofu with the official script) and check the version.', 'In ~/infra-config/terraform/web write main.tf with the Docker provider, an image, an nginx container and a port variable.', 'Run init, fmt, validate and plan, read the output, then apply. Test the page with curl.', 'Change the port variable to 8081 and see in the plan that the container is replaced (-/+). Then deliberately stop the container with docker stop and see the next plan show the drift.', 'Remove everything with destroy, commit the .tf files and .terraform.lock.hcl and make sure terraform.tfstate is in .gitignore.']
    ],
    code: R`# Terraform aus dem offiziellen HashiCorp-Repository
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install -y terraform
terraform version
# Alternative OpenTofu: Installationsanleitung auf opentofu.org, danach "tofu" statt "terraform"

mkdir -p ~/infra-config/terraform/web && cd ~/infra-config/terraform/web
cat > main.tf <<'EOF'
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

variable "port" {
  description = "Externer Port fuer den Webserver"
  type        = number
  default     = 8080
}

resource "docker_image" "nginx" {
  name         = "nginx:1.27-alpine"
  keep_locally = true
}

resource "docker_container" "web" {
  name  = "web01"
  image = docker_image.nginx.image_id
  ports {
    internal = 80
    external = var.port
  }
  restart = "unless-stopped"
}

output "url" {
  value = "http://localhost:${'$'}{var.port}"
}
EOF

terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
curl -sI http://localhost:8080 | head -1

# Aenderung: neuer Port -> Container wird ersetzt
terraform plan -var="port=8081"
terraform apply -var="port=8081"

# Drift erzeugen und erkennen
docker stop web01
terraform plan -var="port=8081"

# Aufraeumen und versionieren
terraform destroy -var="port=8081"
printf '.terraform/\n*.tfstate\n*.tfstate.*\n*.tfvars\n' >> ~/infra-config/.gitignore
cd ~/infra-config && git add terraform .gitignore && git commit -m "Terraform: nginx-Container per Docker-Provider"`,
    checks: [
      ['خروجی plan اول دقیقاً دو منبع با علامت + نشان می‌دهد و بعد از apply صفحه با HTTP 200 جواب می‌دهد.', 'تغییر پورت در plan به‌صورت جایگزینی (-/+) دیده می‌شود و می‌توانی بگویی چرا.', 'بعد از docker stop، plan تفاوت را تشخیص می‌دهد و apply دوباره وضعیت را برمی‌گرداند.', 'در مخزن Git فایل‌های .tf و .terraform.lock.hcl هستند اما State و پوشهٔ .terraform نیستند.'],
      ['Der erste plan zeigt genau zwei Ressourcen mit +, nach apply antwortet die Seite mit HTTP 200.', 'Die Portänderung erscheint im plan als Ersetzung (-/+) und du kannst erklären, warum.', 'Nach docker stop erkennt plan die Abweichung, apply stellt den Zustand wieder her.', 'Im Git-Repository liegen .tf-Dateien und .terraform.lock.hcl, aber weder State noch der Ordner .terraform.'],
      ['The first plan shows exactly two resources with + and after apply the page answers HTTP 200.', 'The port change appears in the plan as a replacement (-/+) and you can explain why.', 'After docker stop the plan detects the difference and apply restores the state.', 'The Git repository contains the .tf files and .terraform.lock.hcl but neither the state nor the .terraform folder.']
    ]
  },
  trouble: [
    [['پیام Error acquiring the state lock.', 'Meldung Error acquiring the state lock.', 'Message Error acquiring the state lock.'],
     ['یک اجرای دیگر (همکار یا Pipeline) همزمان در حال کار است یا اجرای قبلی ناقص قطع شده. صبر کن یا بررسی کن چه کسی کار می‌کند؛ فقط وقتی مطمئنی هیچ اجرایی فعال نیست terraform force-unlock <ID> بزن.', 'Ein anderer Lauf (Kollegin oder Pipeline) arbeitet gleichzeitig oder ein früherer Lauf brach ab. Warten oder klären, wer arbeitet; terraform force-unlock <ID> nur, wenn sicher kein Lauf mehr aktiv ist.', 'Another run (a colleague or a pipeline) is working at the same time or an earlier run aborted. Wait or find out who is working; use terraform force-unlock <ID> only when you are sure no run is active.']],
    [['plan می‌خواهد منبعی را پاک و دوباره بسازد که نباید (مثلاً دیتابیس).', 'plan will eine Ressource löschen und neu anlegen, die das nicht darf (z. B. Datenbank).', 'plan wants to destroy and recreate a resource that must not be (e.g. a database).'],
     ['در خروجی دنبال «forces replacement» بگرد؛ یک ویژگی تغییرناپذیر عوض شده است. تغییر را برگردان یا راه دیگری پیدا کن. برای منابع حیاتی lifecycle { prevent_destroy = true } بگذار تا Terraform از حذف خودداری کند.', 'In der Ausgabe nach „forces replacement“ suchen – ein unveränderliches Attribut wurde geändert. Änderung zurücknehmen oder anders lösen. Für kritische Ressourcen lifecycle { prevent_destroy = true } setzen, dann verweigert Terraform das Löschen.', 'Look for “forces replacement” in the output – an immutable attribute changed. Undo the change or solve it differently. For critical resources set lifecycle { prevent_destroy = true } so Terraform refuses to destroy them.']],
    [['init با Failed to query available provider packages شکست می‌خورد.', 'init scheitert mit Failed to query available provider packages.', 'init fails with Failed to query available provider packages.'],
     ['دسترسی به registry.terraform.io (یا registry.opentofu.org) نیست: پروکسی، DNS یا فایروال. یا نام source یا قید version اشتباه است. با curl آدرس را آزمایش کن و در شبکهٔ شرکتی پروکسی را با HTTPS_PROXY تنظیم کن.', 'Keine Verbindung zu registry.terraform.io (bzw. registry.opentofu.org): Proxy, DNS oder Firewall. Oder source-Name bzw. version-Bedingung ist falsch. Mit curl testen und im Firmennetz den Proxy per HTTPS_PROXY setzen.', 'No connection to registry.terraform.io (or registry.opentofu.org): proxy, DNS or firewall. Or the source name or version constraint is wrong. Test with curl and in a corporate network set the proxy via HTTPS_PROXY.']],
    [['منبعی دستی ساخته شده و Terraform آن را نمی‌شناسد.', 'Eine Ressource wurde von Hand angelegt und Terraform kennt sie nicht.', 'A resource was created by hand and Terraform doesn’t know it.'],
     ['آن را با بلوک import (یا terraform import) به State بیاور، کد مطابق را بنویس و تا وقتی plan هیچ تغییری نشان ندهد ادامه بده. هرگز State را دستی ویرایش نکن.', 'Per import-Block (oder terraform import) in den State übernehmen, passenden Code schreiben und anpassen, bis plan keine Änderung mehr zeigt. Den State nie von Hand bearbeiten.', 'Bring it into the state with an import block (or terraform import), write matching code and adjust until plan shows no changes. Never edit the state by hand.']]
  ],
  decide: [
    [['Terraform/OpenTofu یا Ansible؟', 'Terraform/OpenTofu oder Ansible?', 'Terraform/OpenTofu or Ansible?'],
     ['Terraform برای ساختن و حذف منابع (VM، شبکه، DNS، حساب ابری) با State. Ansible برای پیکربندی داخل سیستم‌ها (بسته، فایل، سرویس). در عمل با هم: Terraform ماشین را می‌سازد، Ansible آن را آماده می‌کند.', 'Terraform zum Anlegen und Entfernen von Ressourcen (VM, Netz, DNS, Cloud-Konto) mit State. Ansible zum Konfigurieren innerhalb der Systeme (Pakete, Dateien, Dienste). In der Praxis zusammen: Terraform baut die Maschine, Ansible richtet sie ein.', 'Terraform for creating and removing resources (VMs, networks, DNS, cloud accounts) with state. Ansible for configuring inside systems (packages, files, services). In practice together: Terraform builds the machine, Ansible configures it.']],
    [['Terraform یا OpenTofu؟', 'Terraform oder OpenTofu?', 'Terraform or OpenTofu?'],
     ['اگر شرکت از قبل Terraform یا Terraform Cloud دارد، همان را ادامه بده. برای پروژهٔ تازه که مجوز متن‌باز مهم است یا محصولی بر پایهٔ آن ساخته می‌شود، OpenTofu. شرایط مجوز را با بخش حقوقی بررسی کن.', 'Nutzt die Firma bereits Terraform oder Terraform Cloud, dabei bleiben. Für neue Projekte, bei denen eine Open-Source-Lizenz wichtig ist oder ein Produkt darauf aufbaut, OpenTofu. Lizenzbedingungen mit der Rechtsabteilung klären.', 'If the company already uses Terraform or Terraform Cloud, stay with it. For new projects where an open-source license matters or a product builds on it, OpenTofu. Clarify license terms with legal.']]
  ],
  pitfalls: [
    ['apply بدون خواندن plan، به‌خصوص با -auto-approve در محیط تولید.', 'apply ohne den plan zu lesen, erst recht mit -auto-approve in Produktion.', 'Running apply without reading the plan, especially with -auto-approve in production.'],
    ['State در Git یا روی لپ‌تاپ یک نفر بدون پشتیبان و قفل.', 'State in Git oder auf dem Notebook einer Person ohne Backup und Sperre.', 'State in Git or on one person’s laptop without backup and locking.'],
    ['تغییر دستی در کنسول کنار Terraform؛ کد و واقعیت از هم جدا می‌شوند.', 'Neben Terraform von Hand in der Konsole ändern – Code und Wirklichkeit laufen auseinander.', 'Changing things by hand in the console alongside Terraform – code and reality drift apart.']
  ],
  iv: [
    [['Terraform State چیست و چرا مهم است؟', 'Was ist der Terraform-State und warum ist er wichtig?', 'What is Terraform state and why does it matter?'],
     ['نگاشت بین منابع تعریف‌شده در کد و منابع واقعی با شناسه‌هایشان. بدون آن Terraform نمی‌داند چه چیزی را مدیریت می‌کند. چون داده حساس دارد، در Backend امن با قفل و پشتیبان نگه داشته می‌شود.', 'Die Zuordnung zwischen Ressourcen im Code und echten Ressourcen mit ihren IDs. Ohne ihn weiß Terraform nicht, was es verwaltet. Weil er sensible Daten enthält, liegt er in einem sicheren Backend mit Sperre und Backup.', 'The mapping between resources in code and real resources with their IDs. Without it Terraform doesn’t know what it manages. Because it holds sensitive data it lives in a secure backend with locking and backups.']],
    [['Drift چیست و چطور با آن برخورد می‌کنی؟', 'Was ist Drift und wie gehst du damit um?', 'What is drift and how do you handle it?'],
     ['تفاوت بین کد و واقعیت به‌خاطر تغییر دستی. با plan منظم (مثلاً شبانه در Pipeline) کشف می‌شود؛ یا تغییر را در کد می‌آورم یا با apply برمی‌گردانم، و دسترسی دستی به کنسول را محدود می‌کنم.', 'Abweichung zwischen Code und Wirklichkeit durch Handänderungen. Ein regelmäßiger plan (z. B. nächtlich in der Pipeline) deckt sie auf; ich übernehme die Änderung in den Code oder stelle per apply zurück und beschränke manuelle Konsolenrechte.', 'The difference between code and reality caused by manual changes. A regular plan (e.g. nightly in the pipeline) reveals it; I either bring the change into code or revert with apply, and restrict manual console access.']],
    [['علامت -/+ در خروجی plan یعنی چه؟', 'Was bedeutet -/+ in der plan-Ausgabe?', 'What does -/+ mean in plan output?'],
     ['منبع پاک و دوباره ساخته می‌شود چون یک ویژگی تغییرناپذیر عوض شده است. برای سرور یا دیتابیس یعنی قطعی و شاید از دست رفتن داده؛ پس قبل از apply بررسی و در صورت نیاز prevent_destroy.', 'Die Ressource wird gelöscht und neu angelegt, weil sich ein unveränderliches Attribut geändert hat. Bei Server oder Datenbank bedeutet das Ausfall und eventuell Datenverlust – also vor apply prüfen und ggf. prevent_destroy setzen.', 'The resource is destroyed and recreated because an immutable attribute changed. For a server or database that means downtime and possibly data loss – so check before apply and use prevent_destroy where needed.']]
  ],
  sources: [
    ['HashiCorp – Install Terraform', 'https://developer.hashicorp.com/terraform/install'],
    ['Terraform Registry – kreuzwerker/docker provider', 'https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs'],
    ['OpenTofu – Documentation', 'https://opentofu.org/docs/']
  ]
},

{
  id: 'mod-cicd', part: 1,
  title: ['CI/CD برای زیرساخت: Pipeline با GitHub Actions و GitLab CI', 'CI/CD für Infrastruktur: Pipelines mit GitHub Actions und GitLab CI', 'CI/CD for infrastructure: pipelines with GitHub Actions and GitLab CI'],
  goal: ['یک Pipeline بسازی که هر تغییر در مخزن زیرساخت را خودکار بررسی کند (Lint، اعتبارسنجی، plan)، رمزها را امن به آن بدهی، اجرای تولید را به تأیید انسانی وابسته کنی و خطای Pipeline را بخوانی و رفع کنی.', 'Du baust eine Pipeline, die jede Änderung im Infrastruktur-Repository automatisch prüft (Lint, Validierung, plan), übergibst Geheimnisse sicher, knüpfst Produktivläufe an eine menschliche Freigabe und liest und behebst Pipeline-Fehler.', 'You build a pipeline that automatically checks every change in the infrastructure repository (lint, validation, plan), pass secrets in safely, gate production runs on human approval and read and fix pipeline failures.'],
  why: ['بدون Pipeline، اسکریپت خراب یا YAML اشتباه مستقیم روی سرورها می‌رود. شرکت‌ها از ادمین انتظار دارند «تغییر از طریق Pipeline» را بشناسد؛ این همان چیزی است که در آگهی‌ها DevOps یا Platform Engineering نامیده می‌شود.', 'Ohne Pipeline gelangt ein kaputtes Skript oder falsches YAML direkt auf die Server. Firmen erwarten von Admins, „Änderungen über die Pipeline“ zu kennen – das, was in Anzeigen DevOps oder Platform Engineering heißt.', 'Without a pipeline a broken script or wrong YAML goes straight onto the servers. Companies expect admins to know “changes through the pipeline” – what job ads call DevOps or platform engineering.'],
  know: [
    ['CI (Continuous Integration) هر Push را خودکار آزمایش می‌کند؛ CD (Continuous Delivery/Deployment) تغییر تأییدشده را منتشر می‌کند. برای زیرساخت ترتیب رایج: lint ← validate ← plan ← تأیید ← apply. هر مرحلهٔ ناموفق بقیه را متوقف می‌کند.', 'CI (Continuous Integration) testet jeden Push automatisch, CD (Continuous Delivery/Deployment) rollt geprüfte Änderungen aus. Für Infrastruktur üblich: Lint → Validate → Plan → Freigabe → Apply. Jeder fehlgeschlagene Schritt stoppt den Rest.', 'CI (continuous integration) tests every push automatically; CD (continuous delivery/deployment) rolls out approved changes. For infrastructure the usual order is lint → validate → plan → approval → apply. Any failing step stops the rest.'],
    ['GitHub Actions: فایل YAML در .github/workflows با on (رویداد)، jobs، runs-on و steps. GitLab CI: فایل .gitlab-ci.yml با stages و jobها. هر دو روی Runner اجرا می‌شوند: میزبانی‌شده توسط ارائه‌دهنده یا Self-hosted در شبکهٔ خودت.', 'GitHub Actions: YAML-Datei in .github/workflows mit on (Ereignis), jobs, runs-on und steps. GitLab CI: Datei .gitlab-ci.yml mit stages und Jobs. Beide laufen auf Runnern: beim Anbieter gehostet oder selbst betrieben im eigenen Netz.', 'GitHub Actions: a YAML file in .github/workflows with on (event), jobs, runs-on and steps. GitLab CI: .gitlab-ci.yml with stages and jobs. Both run on runners: hosted by the provider or self-hosted in your network.'],
    ['ابزارهای بررسی رایج: shellcheck برای Bash، PSScriptAnalyzer برای PowerShell، yamllint، ansible-lint، terraform fmt -check و validate، و اسکن رمز (gitleaks). هشدارها را جدی بگیر: shellcheck بسیاری از خطاهای نقل‌قول و متغیر خالی را پیش از تولید پیدا می‌کند.', 'Übliche Prüfwerkzeuge: shellcheck für Bash, PSScriptAnalyzer für PowerShell, yamllint, ansible-lint, terraform fmt -check und validate sowie Secret Scanning (gitleaks). Warnungen ernst nehmen: shellcheck findet viele Quoting- und Leervariablen-Fehler vor der Produktion.', 'Common checks: shellcheck for Bash, PSScriptAnalyzer for PowerShell, yamllint, ansible-lint, terraform fmt -check and validate, and secret scanning (gitleaks). Take warnings seriously: shellcheck catches many quoting and empty-variable bugs before production.'],
    ['رمزها در Secrets یا Variables محافظت‌شدهٔ پروژه نگه داشته می‌شوند و در لاگ ماسک می‌شوند. بهتر از کلید ثابت: OIDC، یعنی Pipeline برای هر اجرا یک توکن کوتاه‌مدت از AWS یا Azure می‌گیرد. حداقل دسترسی برای Pipeline؛ دسترسی apply فقط از Branch اصلی.', 'Geheimnisse liegen in geschützten Secrets oder Variables des Projekts und werden im Log maskiert. Besser als feste Schlüssel: OIDC – die Pipeline holt sich pro Lauf ein kurzlebiges Token bei AWS oder Azure. Minimale Rechte für die Pipeline; apply-Rechte nur vom Hauptbranch aus.', 'Secrets live in protected project secrets or variables and are masked in logs. Better than static keys: OIDC – the pipeline gets a short-lived token from AWS or Azure for each run. Least privilege for the pipeline; apply rights only from the main branch.'],
    ['Runner خودمیزبان به شبکهٔ داخلی دسترسی دارد و هدف جذابی برای حمله است: آن را برای مخزن‌های عمومی یا Fork استفاده نکن، کانتینری و موقت اجرا کن و به‌روز نگه دار. Actions یا Imageهای شخص ثالث را با نسخهٔ ثابت (یا Hash) ارجاع بده.', 'Ein selbst betriebener Runner hat Zugriff aufs interne Netz und ist ein attraktives Angriffsziel: nicht für öffentliche Repositories oder Forks nutzen, containerisiert und kurzlebig betreiben, aktuell halten. Actions und Images Dritter mit fester Version (oder Hash) referenzieren.', 'A self-hosted runner can reach the internal network and is an attractive target: don’t use it for public repositories or forks, run it containerized and ephemeral and keep it updated. Reference third-party actions and images with a fixed version (or hash).'],
    ['GitOps یعنی مخزن Git تنها منبع حقیقت است و ابزاری (مثلاً Argo CD یا Flux در Kubernetes) وضعیت واقعی را مدام با مخزن هماهنگ می‌کند. برای تأیید انسانی در GitHub از Environment با Required reviewers و در GitLab از job با when: manual و Protected Environment استفاده می‌شود.', 'GitOps heißt: Das Git-Repository ist die einzige Wahrheit, ein Werkzeug (z. B. Argo CD oder Flux in Kubernetes) gleicht den Istzustand laufend damit ab. Menschliche Freigabe gibt es in GitHub über Environments mit Required Reviewers, in GitLab über Jobs mit when: manual und Protected Environments.', 'GitOps means the Git repository is the single source of truth and a tool (e.g. Argo CD or Flux in Kubernetes) continuously reconciles the actual state with it. Human approval is done in GitHub with environments with required reviewers and in GitLab with when: manual jobs and protected environments.']
  ],
  lab: {
    vm: 'Repository infra-config aus mod-git auf GitHub (privat, kostenlos); alternativ GitLab mit .gitlab-ci.yml', shell: 'YAML und Bash',
    steps: [
      ['مخزن infra-config را به GitHub خصوصی Push کن (یا از قبل Push کرده‌ای).', 'فایل .github/workflows/ci.yml را بساز: یک Job برای shellcheck و yamllint و یک Job برای terraform fmt -check و validate.', 'Push کن و در زبانهٔ Actions اجرای سبز را ببین.', 'عمداً در backup.sh یک متغیر را بدون نقل‌قول بگذار (مثلاً rm -rf $ZIEL/tmp)، Push کن و ببین Pipeline قرمز می‌شود و shellcheck خط دقیق را نشان می‌دهد. خطا را درست کن.', 'یک Environment به نام production با Required reviewer بساز و یک Job سوم plan و apply را فقط برای main و با تأیید اضافه کن (برای آزمایش فقط echo).'],
      ['Repository infra-config privat zu GitHub pushen (falls noch nicht geschehen).', 'Datei .github/workflows/ci.yml anlegen: ein Job für shellcheck und yamllint, ein Job für terraform fmt -check und validate.', 'Pushen und im Reiter Actions den grünen Lauf ansehen.', 'Absichtlich in backup.sh eine Variable ohne Anführungszeichen einbauen (z. B. rm -rf $ZIEL/tmp), pushen und sehen, wie die Pipeline rot wird und shellcheck die genaue Zeile zeigt. Fehler beheben.', 'Ein Environment production mit Required Reviewer anlegen und einen dritten Job hinzufügen, der nur auf main und nach Freigabe läuft (zum Test nur echo).'],
      ['Push the infra-config repository privately to GitHub (if not done yet).', 'Create .github/workflows/ci.yml: one job for shellcheck and yamllint, one job for terraform fmt -check and validate.', 'Push and watch the green run in the Actions tab.', 'Deliberately put an unquoted variable in backup.sh (e.g. rm -rf $ZIEL/tmp), push and see the pipeline turn red with shellcheck showing the exact line. Fix it.', 'Create an environment production with a required reviewer and add a third job that only runs on main after approval (for testing just echo).']
    ],
    code: R`# Datei: .github/workflows/ci.yml
name: infra-ci
on:
  push:
  pull_request:

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v4
      - name: shellcheck
        run: |
          sudo apt-get update && sudo apt-get install -y shellcheck yamllint
          shellcheck scripts/*.sh
      - name: yamllint
        run: yamllint -d relaxed .

  terraform:
    runs-on: ubuntu-24.04
    defaults:
      run:
        working-directory: terraform/web
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform fmt -check -recursive
      - run: terraform init -backend=false
      - run: terraform validate

  deploy:
    needs: [lint, terraform]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-24.04
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hier liefe terraform plan/apply mit OIDC-Anmeldung"

# ---- Gleiche Idee in GitLab: .gitlab-ci.yml ----
# stages: [lint, validate, deploy]
# shellcheck:
#   stage: lint
#   image: koalaman/shellcheck-alpine:stable
#   script: [shellcheck scripts/*.sh]
# terraform:
#   stage: validate
#   image: hashicorp/terraform:1.9
#   script: [cd terraform/web, terraform fmt -check, terraform init -backend=false, terraform validate]
# deploy:
#   stage: deploy
#   script: [echo "apply"]
#   when: manual
#   environment: production
#   rules: [{ if: '$CI_COMMIT_BRANCH == "main"' }]

# Lokal vorab pruefen (spart Pipeline-Laeufe)
sudo apt install -y shellcheck yamllint
shellcheck scripts/*.sh && yamllint -d relaxed .`,
    checks: [
      ['اولین اجرا در Actions سبز است و هر Job لاگ خوانا دارد.', 'با متغیر بدون نقل‌قول، Pipeline قرمز می‌شود و تو کد خطای shellcheck (مثلاً SC2086) را توضیح می‌دهی.', 'Job سوم فقط روی main اجرا می‌شود و تا تأیید Reviewer منتظر می‌ماند.', 'هیچ رمز یا کلیدی در فایل Workflow نیست و permissions حداقلی تنظیم شده است.'],
      ['Der erste Lauf in Actions ist grün, jeder Job hat ein lesbares Log.', 'Mit der Variable ohne Anführungszeichen wird die Pipeline rot und du erklärst den shellcheck-Code (z. B. SC2086).', 'Der dritte Job läuft nur auf main und wartet auf die Freigabe des Reviewers.', 'Die Workflow-Datei enthält keine Kennwörter oder Schlüssel, permissions ist minimal gesetzt.'],
      ['The first run in Actions is green and every job has a readable log.', 'With the unquoted variable the pipeline turns red and you explain the shellcheck code (e.g. SC2086).', 'The third job only runs on main and waits for the reviewer’s approval.', 'The workflow file contains no passwords or keys and permissions are minimal.']
    ]
  },
  trouble: [
    [['Pipeline اصلاً شروع نمی‌شود.', 'Die Pipeline startet gar nicht.', 'The pipeline doesn’t start at all.'],
     ['مسیر یا نام فایل اشتباه است (.github/workflows/*.yml یا .gitlab-ci.yml در ریشه)، YAML خطای تورفتگی دارد یا رویداد on با Branch مطابق نیست. در GitHub پیام خطای Workflow در زبانهٔ Actions و در GitLab ابزار CI Lint را ببین.', 'Pfad oder Dateiname falsch (.github/workflows/*.yml bzw. .gitlab-ci.yml im Wurzelverzeichnis), YAML hat Einrückungsfehler oder das on-Ereignis passt nicht zum Branch. In GitHub die Workflow-Fehlermeldung im Reiter Actions, in GitLab den CI-Lint ansehen.', 'Wrong path or file name (.github/workflows/*.yml or .gitlab-ci.yml in the root), YAML indentation error, or the on event doesn’t match the branch. Check the workflow error in the GitHub Actions tab or GitLab’s CI lint.']],
    [['محلی کار می‌کند اما در Pipeline با command not found شکست می‌خورد.', 'Lokal klappt es, in der Pipeline scheitert es mit command not found.', 'Works locally but fails in the pipeline with command not found.'],
     ['Runner محیطی تمیز است و ابزار نصب نیست یا نسخه‌اش فرق دارد. ابزار را در Step نصب کن یا Image مناسب (مثلاً hashicorp/terraform) بگیر و نسخه را ثابت کن. مسیر کاری (working-directory) را هم بررسی کن.', 'Der Runner ist eine saubere Umgebung, das Werkzeug fehlt oder hat eine andere Version. Im Step installieren oder ein passendes Image (z. B. hashicorp/terraform) nutzen und Version festlegen. Auch working-directory prüfen.', 'The runner is a clean environment; the tool is missing or a different version. Install it in a step or use a suitable image (e.g. hashicorp/terraform) and pin the version. Also check working-directory.']],
    [['Secret در Job خالی است.', 'Das Secret ist im Job leer.', 'The secret is empty in the job.'],
     ['Secret در سطح درست تعریف نشده (Repository، Environment یا Organization)، Job به آن Environment وصل نیست، یا اجرا از Fork یا Branch غیرمحافظت‌شده است که عمداً به Secret دسترسی ندارد. نام دقیق و Protected بودن را در GitLab بررسی کن.', 'Das Secret ist nicht auf der richtigen Ebene definiert (Repository, Environment oder Organisation), der Job ist nicht mit dem Environment verbunden, oder der Lauf kommt aus einem Fork bzw. ungeschützten Branch, der absichtlich keinen Zugriff hat. Genauen Namen und in GitLab die Protected-Einstellung prüfen.', 'The secret isn’t defined at the right level (repository, environment or organization), the job isn’t bound to the environment, or the run comes from a fork or unprotected branch that deliberately has no access. Check the exact name and, in GitLab, the protected setting.']]
  ],
  decide: [
    [['Runner میزبانی‌شده یا خودمیزبان؟', 'Gehosteter oder selbst betriebener Runner?', 'Hosted or self-hosted runner?'],
     ['میزبانی‌شده: بدون نگه‌داری، تمیز در هر اجرا، کافی برای Lint و آزمون. خودمیزبان: وقتی باید به سرورهای داخلی برسی یا قانون داده اجازهٔ ابر نمی‌دهد؛ آن وقت ایزوله، موقت و به‌روز.', 'Gehostet: wartungsfrei, bei jedem Lauf sauber, reicht für Lint und Tests. Selbst betrieben: wenn interne Server erreicht werden müssen oder Datenschutz keine Cloud erlaubt – dann isoliert, kurzlebig und aktuell.', 'Hosted: maintenance-free, clean on every run, enough for lint and tests. Self-hosted: when internal servers must be reached or data rules forbid the cloud – then isolated, ephemeral and up to date.']],
    [['Deploy خودکار یا با تأیید؟', 'Automatisch ausrollen oder mit Freigabe?', 'Deploy automatically or with approval?'],
     ['محیط تست می‌تواند خودکار باشد. برای تولید، به‌ویژه وقتی plan حذف یا جایگزینی نشان می‌دهد، تأیید انسانی و خواندن plan لازم است. با بلوغ تیم و آزمون خوب می‌توان خودکارسازی را بیشتر کرد.', 'Testumgebungen dürfen automatisch laufen. In Produktion, besonders wenn plan Löschen oder Ersetzen zeigt, braucht es eine menschliche Freigabe und das Lesen des plans. Mit reifem Team und guten Tests kann mehr automatisiert werden.', 'Test environments can deploy automatically. In production, especially when the plan shows deletion or replacement, a human approval and reading the plan are required. With a mature team and good tests you can automate more.']]
  ],
  pitfalls: [
    ['قرار دادن رمز یا کلید مستقیم در فایل YAML.', 'Kennwörter oder Schlüssel direkt in die YAML-Datei schreiben.', 'Writing passwords or keys directly into the YAML file.'],
    ['استفاده از Action شخص ثالث با @main به‌جای نسخهٔ ثابت.', 'Fremde Actions mit @main statt fester Version einbinden.', 'Using third-party actions with @main instead of a fixed version.'],
    ['خاموش کردن مرحلهٔ ناموفق به‌جای رفع خطا («فعلاً allow_failure»).', 'Fehlschlagende Schritte abschalten statt den Fehler zu beheben („erstmal allow_failure“).', 'Disabling a failing step instead of fixing the error (“allow_failure for now”).']
  ],
  iv: [
    [['یک Pipeline برای Terraform چه مراحلی دارد؟', 'Welche Schritte hat eine Pipeline für Terraform?', 'What stages does a Terraform pipeline have?'],
     ['fmt -check و validate، اسکن امنیتی (مثلاً tflint یا Checkov)، plan که خروجی‌اش در Pull Request دیده می‌شود، تأیید انسانی و apply فقط از main با هویت کوتاه‌مدت (OIDC) و State راه‌دور با قفل.', 'fmt -check und validate, Sicherheitsscan (z. B. tflint oder Checkov), plan mit Ausgabe im Pull Request, menschliche Freigabe und apply nur von main mit kurzlebiger Identität (OIDC) und Remote-State mit Sperre.', 'fmt -check and validate, a security scan (e.g. tflint or Checkov), plan with its output shown in the pull request, human approval and apply only from main with a short-lived identity (OIDC) and remote state with locking.']],
    [['چرا OIDC بهتر از کلید دسترسی در Secret است؟', 'Warum ist OIDC besser als ein Zugriffsschlüssel im Secret?', 'Why is OIDC better than an access key in a secret?'],
     ['کلید ثابت ممکن است لو برود و تا لغو معتبر می‌ماند. با OIDC هر اجرا یک توکن کوتاه‌مدت می‌گیرد که فقط برای همان مخزن و Branch صادر شده؛ چیزی برای دزدیدن و چرخاندن نمی‌ماند.', 'Ein fester Schlüssel kann abfließen und bleibt bis zum Widerruf gültig. Mit OIDC erhält jeder Lauf ein kurzlebiges Token, das nur für dieses Repository und diesen Branch ausgestellt wird – es gibt nichts Dauerhaftes zu stehlen oder zu rotieren.', 'A static key can leak and stays valid until revoked. With OIDC each run gets a short-lived token issued only for that repository and branch – there is nothing permanent to steal or rotate.']],
    [['Pipeline قرمز است و کسی عجله دارد. چه می‌کنی؟', 'Die Pipeline ist rot und jemand drängt. Was tust du?', 'The pipeline is red and someone is in a hurry. What do you do?'],
     ['لاگ اولین مرحلهٔ ناموفق را می‌خوانم، خطا را محلی بازتولید و رفع می‌کنم و از دور زدن Pipeline خودداری می‌کنم. اگر واقعاً اضطراری است، تغییر با چهار چشم و ثبت در تیکت انجام و بعد در کد آورده می‌شود.', 'Ich lese das Log des ersten fehlgeschlagenen Schritts, reproduziere und behebe den Fehler lokal und umgehe die Pipeline nicht. In einem echten Notfall erfolgt die Änderung im Vier-Augen-Prinzip mit Ticket und wird danach in den Code übernommen.', 'I read the log of the first failed step, reproduce and fix the error locally and don’t bypass the pipeline. In a real emergency the change is made under the four-eyes principle with a ticket and brought into code afterwards.']]
  ],
  sources: [
    ['GitHub Docs – Workflow syntax for GitHub Actions', 'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax'],
    ['GitLab Docs – CI/CD YAML syntax reference', 'https://docs.gitlab.com/ci/yaml/'],
    ['ShellCheck', 'https://www.shellcheck.net/']
  ]
}

);
})();
