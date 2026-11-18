/* Arefi ITPraxis – Kurs Moderne Infrastruktur, Teil 2 (Container im Betrieb, Observability, SIEM). Eigene Inhalte. [fa, de, en] */
(() => {
'use strict';
const C = window.ArefiKModern = window.ArefiKModern || { modules: [] };
const R = String.raw;
C.modules.push(

{
  id: 'mod-container', part: 2,
  title: ['کانتینر در محیط واقعی: Docker Compose، Registry و اسکن امنیتی', 'Container im Betrieb: Docker Compose, Registry und Sicherheitsscan', 'Containers in production: Docker Compose, registries and security scanning'],
  goal: ['یک سرویس چندکانتینری را با Compose درست راه‌اندازی کنی: نسخه‌های ثابت، Healthcheck، Volume، شبکهٔ داخلی و رمز جدا؛ Imageها را با Trivy اسکن کنی و به‌روزرسانی و بازگشت را مطمئن انجام دهی.', 'Du betreibst einen Dienst aus mehreren Containern sauber mit Compose: feste Versionen, Healthchecks, Volumes, internes Netz und getrennte Geheimnisse; du scannst Images mit Trivy und führst Updates und Rollbacks sicher durch.', 'You run a multi-container service properly with Compose: pinned versions, health checks, volumes, an internal network and separate secrets; you scan images with Trivy and perform updates and rollbacks safely.'],
  why: ['بسیاری از ابزارهای داخلی (مانیتورینگ، ویکی، تیکت، رمزدان) امروز به‌صورت کانتینر اجرا می‌شوند و تکنسین باید آن‌ها را نگه دارد. خطای رایج: Image با latest، رمز در فایل، بدون پشتیبان Volume و بدون اسکن آسیب‌پذیری.', 'Viele interne Werkzeuge (Monitoring, Wiki, Ticketsystem, Passwortsafe) laufen heute als Container, und Techniker müssen sie betreiben. Typische Fehler: Images mit latest, Kennwort in der Datei, kein Volume-Backup und kein Schwachstellenscan.', 'Many internal tools (monitoring, wiki, ticketing, password vault) now run as containers and technicians have to operate them. Typical mistakes: images tagged latest, passwords in files, no volume backup and no vulnerability scan.'],
  know: [
    ['Compose یک برنامه را در یک فایل compose.yaml توصیف می‌کند: services، volumes، networks و secrets. docker compose up -d می‌سازد و اجرا می‌کند، ps وضعیت و سلامت را نشان می‌دهد، logs -f لاگ زنده و down متوقف و پاک می‌کند (Volumeها می‌مانند مگر با -v).', 'Compose beschreibt eine Anwendung in einer Datei compose.yaml: services, volumes, networks und secrets. docker compose up -d baut und startet, ps zeigt Zustand und Gesundheit, logs -f das Live-Log, down stoppt und entfernt (Volumes bleiben, außer mit -v).', 'Compose describes an application in one compose.yaml file: services, volumes, networks and secrets. docker compose up -d builds and starts, ps shows state and health, logs -f the live log, down stops and removes (volumes stay unless -v).'],
    ['نسخه را ثابت کن: postgres:16-alpine به‌جای latest، و در محیط حساس با Digest (@sha256:…). latest یعنی هر pull ممکن است نسخهٔ عمدهٔ تازه با تغییرات ناسازگار بیاورد. به‌روزرسانی آگاهانه: تگ را عوض کن، pull، up -d و آزمون؛ بازگشت یعنی تگ قبلی.', 'Versionen festlegen: postgres:16-alpine statt latest, in sensiblen Umgebungen per Digest (@sha256:…). latest heißt, jeder pull kann eine neue Hauptversion mit inkompatiblen Änderungen bringen. Bewusst aktualisieren: Tag ändern, pull, up -d, testen; Rollback heißt vorheriger Tag.', 'Pin versions: postgres:16-alpine instead of latest, and in sensitive environments by digest (@sha256:…). latest means any pull may bring a new major version with breaking changes. Update deliberately: change the tag, pull, up -d, test; rollback means the previous tag.'],
    ['دادهٔ ماندگار در Volume نام‌دار است، نه داخل کانتینر. پشتیبان دیتابیس با ابزار خودش (pg_dump، mysqldump) گرفته می‌شود، نه با کپی پوشهٔ در حال اجرا. Healthcheck به Compose می‌گوید سرویس واقعاً آماده است و depends_on با condition: service_healthy ترتیب درست را تضمین می‌کند.', 'Dauerhafte Daten liegen in benannten Volumes, nicht im Container. Datenbanken sichert man mit ihrem eigenen Werkzeug (pg_dump, mysqldump), nicht durch Kopieren des laufenden Ordners. Ein Healthcheck sagt Compose, ob ein Dienst wirklich bereit ist; depends_on mit condition: service_healthy erzwingt die richtige Reihenfolge.', 'Persistent data lives in named volumes, not inside the container. Databases are backed up with their own tool (pg_dump, mysqldump), not by copying the running folder. A health check tells Compose whether a service is really ready; depends_on with condition: service_healthy enforces the right order.'],
    ['شبکه و انتشار: سرویس‌ها در شبکهٔ داخلی Compose با نام سرویس همدیگر را پیدا می‌کنند (مثلاً db). فقط آنچه لازم است را منتشر کن و ترجیحاً روی 127.0.0.1 پشت یک Reverse Proxy با TLS. پورت منتشرشدهٔ Docker از قواعد ufw عبور می‌کند؛ این یک غافلگیری رایج امنیتی است.', 'Netz und Veröffentlichung: Dienste finden sich im internen Compose-Netz über den Dienstnamen (z. B. db). Nur Nötiges veröffentlichen, am besten an 127.0.0.1 hinter einem Reverse Proxy mit TLS. Von Docker veröffentlichte Ports umgehen ufw-Regeln – eine häufige Sicherheitsüberraschung.', 'Network and publishing: services find each other on the internal Compose network by service name (e.g. db). Publish only what is needed, ideally on 127.0.0.1 behind a reverse proxy with TLS. Ports published by Docker bypass ufw rules – a common security surprise.'],
    ['Registry محل نگه‌داری Image است: Docker Hub، GitHub Container Registry، GitLab Registry یا Harbor خودمیزبان. Image داخلی را در Registry خصوصی با کنترل دسترسی نگه دار. Docker Hub برای pull بی‌نام محدودیت تعداد دارد؛ در شرکت یک Mirror یا Proxy Cache مفید است.', 'Eine Registry speichert Images: Docker Hub, GitHub Container Registry, GitLab Registry oder selbst betriebenes Harbor. Interne Images gehören in eine private Registry mit Zugriffskontrolle. Docker Hub begrenzt anonyme Pulls; im Unternehmen hilft ein Mirror oder Proxy-Cache.', 'A registry stores images: Docker Hub, GitHub Container Registry, GitLab Registry or self-hosted Harbor. Keep internal images in a private registry with access control. Docker Hub rate-limits anonymous pulls; in a company a mirror or proxy cache helps.'],
    ['امنیت Image: Trivy (رایگان، از Aqua) آسیب‌پذیری‌های شناخته‌شده (CVE) را در بسته‌های Image پیدا می‌کند. Image پایهٔ کوچک (alpine، distroless)، اجرای غیرroot، بدون --privileged و بدون اتصال docker.sock به برنامه‌ها. Podman جایگزین بدون Daemon و Rootless است.', 'Image-Sicherheit: Trivy (kostenlos, von Aqua) findet bekannte Schwachstellen (CVE) in den Paketen eines Images. Kleine Basis-Images (alpine, distroless), Ausführung ohne root, kein --privileged und kein Einbinden von docker.sock in Anwendungen. Podman ist eine daemonlose, rootless Alternative.', 'Image security: Trivy (free, from Aqua) finds known vulnerabilities (CVEs) in an image’s packages. Small base images (alpine, distroless), run as non-root, no --privileged and no mounting docker.sock into applications. Podman is a daemonless, rootless alternative.']
  ],
  lab: {
    vm: 'LNX01 (Ubuntu Server 24.04) mit Docker Engine und Compose-Plugin', shell: 'Bash',
    steps: [
      ['پوشهٔ ~/apps/db را بساز و رمز دیتابیس را در فایل secrets/db_pw.txt با دسترسی 600 بگذار.', 'compose.yaml را با PostgreSQL 16 (Healthcheck، Volume، Secret) و Adminer که فقط روی 127.0.0.1 منتشر می‌شود بنویس.', 'docker compose up -d و ps را اجرا کن تا هر دو سرویس healthy و running باشند. با تونل SSH به Adminer وصل شو.', 'با pg_dump یک پشتیبان بگیر و بررسی کن فایل خالی نیست.', 'هر دو Image را با Trivy اسکن کن، تعداد آسیب‌پذیری‌های HIGH و CRITICAL را یادداشت کن و تصمیم بگیر کدام به‌روزرسانی لازم است.'],
      ['Ordner ~/apps/db anlegen, das Datenbankkennwort in secrets/db_pw.txt mit Rechten 600 ablegen.', 'compose.yaml mit PostgreSQL 16 (Healthcheck, Volume, Secret) und Adminer schreiben, der nur an 127.0.0.1 veröffentlicht wird.', 'docker compose up -d und ps ausführen, bis beide Dienste healthy bzw. running sind. Per SSH-Tunnel mit Adminer verbinden.', 'Mit pg_dump eine Sicherung erstellen und prüfen, dass die Datei nicht leer ist.', 'Beide Images mit Trivy scannen, Anzahl HIGH- und CRITICAL-Schwachstellen notieren und entscheiden, welches Update nötig ist.'],
      ['Create the folder ~/apps/db and put the database password in secrets/db_pw.txt with mode 600.', 'Write compose.yaml with PostgreSQL 16 (health check, volume, secret) and Adminer published only on 127.0.0.1.', 'Run docker compose up -d and ps until both services are healthy or running. Connect to Adminer through an SSH tunnel.', 'Take a backup with pg_dump and check the file isn’t empty.', 'Scan both images with Trivy, note the number of HIGH and CRITICAL vulnerabilities and decide which update is needed.']
    ],
    code: R`mkdir -p ~/apps/db/secrets && cd ~/apps/db
openssl rand -base64 24 > secrets/db_pw.txt
chmod 600 secrets/db_pw.txt

cat > compose.yaml <<'EOF'
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD_FILE: /run/secrets/db_pw
    secrets: [db_pw]
    volumes:
      - dbdata:/var/lib/postgresql/data
    networks: [backend]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  adminer:
    image: adminer:4.8.1
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "127.0.0.1:8088:8080"
    networks: [backend]
    restart: unless-stopped

volumes:
  dbdata:

networks:
  backend:

secrets:
  db_pw:
    file: ./secrets/db_pw.txt
EOF

docker compose config --quiet && echo "compose.yaml ist gueltig"
docker compose up -d
docker compose ps
docker compose logs --tail 20 db

# Vom Admin-PC: ssh -L 8088:127.0.0.1:8088 benutzer@LNX01, dann http://localhost:8088 (Server: db)

# Sicherung mit dem Werkzeug der Datenbank
mkdir -p ~/backup
docker compose exec -T db pg_dump -U app -d app > ~/backup/app-$(date +%F).sql
ls -lh ~/backup

# Schwachstellenscan mit Trivy (als Container, nichts zu installieren)
for img in postgres:16-alpine adminer:4.8.1; do
  docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest \
    image --severity HIGH,CRITICAL --no-progress "$img"
done

# Update-Ablauf: Tag in compose.yaml aendern, dann
# docker compose pull && docker compose up -d && docker compose ps`,
    checks: [
      ['docker compose ps سرویس db را healthy و adminer را running نشان می‌دهد.', 'ss -tlnp نشان می‌دهد پورت 8088 فقط روی 127.0.0.1 گوش می‌دهد و پورت دیتابیس اصلاً منتشر نشده است.', 'فایل پشتیبان SQL ساخته شده و دستورهای CREATE TABLE یا دست‌کم سربرگ pg_dump را دارد.', 'نتیجهٔ Trivy را یادداشت کرده‌ای و برای هر آسیب‌پذیری بحرانی می‌دانی آیا نسخهٔ اصلاح‌شده (Fixed Version) وجود دارد.'],
      ['docker compose ps zeigt db als healthy und adminer als running.', 'ss -tlnp zeigt Port 8088 nur an 127.0.0.1, der Datenbankport ist gar nicht veröffentlicht.', 'Die SQL-Sicherung existiert und enthält CREATE-TABLE-Befehle oder zumindest den pg_dump-Kopf.', 'Du hast das Trivy-Ergebnis notiert und weißt für jede kritische Schwachstelle, ob es eine Fixed Version gibt.'],
      ['docker compose ps shows db as healthy and adminer as running.', 'ss -tlnp shows port 8088 only on 127.0.0.1 and the database port is not published at all.', 'The SQL backup exists and contains CREATE TABLE statements or at least the pg_dump header.', 'You noted the Trivy result and know for each critical vulnerability whether a fixed version exists.']
    ]
  },
  trouble: [
    [['کانتینر مدام ری‌استارت می‌شود (Restarting).', 'Container startet ständig neu (Restarting).', 'Container keeps restarting (Restarting).'],
     ['docker compose logs سرویس را ببین؛ اغلب متغیر محیطی یا Secret کم است، Volume از نسخهٔ قدیمی‌تر دیتابیس است یا دسترسی فایل غلط است. docker inspect و بخش State.ExitCode هم کمک می‌کند.', 'docker compose logs des Dienstes lesen – meist fehlt eine Umgebungsvariable oder ein Secret, das Volume stammt von einer älteren Datenbankversion oder Dateirechte stimmen nicht. Auch docker inspect mit State.ExitCode hilft.', 'Read docker compose logs for the service – usually an environment variable or secret is missing, the volume comes from an older database version, or file permissions are wrong. docker inspect with State.ExitCode helps too.']],
    [['بعد از به‌روزرسانی Image، دیتابیس بالا نمی‌آید.', 'Nach dem Image-Update startet die Datenbank nicht.', 'After an image update the database won’t start.'],
     ['احتمالاً نسخهٔ عمده عوض شده (مثلاً PostgreSQL 15 به 16) و فرمت داده سازگار نیست. به تگ قبلی برگرد، پشتیبان بگیر و ارتقا را طبق راهنمای سازنده (pg_dump و بازگردانی یا pg_upgrade) انجام بده. به همین دلیل latest ممنوع است.', 'Vermutlich hat sich die Hauptversion geändert (z. B. PostgreSQL 15 auf 16) und das Datenformat passt nicht. Auf den vorherigen Tag zurück, sichern und nach Herstelleranleitung upgraden (pg_dump und Wiederherstellung oder pg_upgrade). Genau deshalb ist latest tabu.', 'The major version probably changed (e.g. PostgreSQL 15 to 16) and the data format is incompatible. Go back to the previous tag, back up and upgrade per the vendor guide (pg_dump and restore, or pg_upgrade). That is exactly why latest is forbidden.']],
    [['پورتی که در ufw بسته است از بیرون در دسترس است.', 'Ein in ufw geschlossener Port ist von außen erreichbar.', 'A port closed in ufw is reachable from outside.'],
     ['Docker قواعد NAT خودش را پیش از ufw می‌گذارد. پورت را فقط روی 127.0.0.1 منتشر کن یا در زنجیرهٔ DOCKER-USER محدود کن و پشت Reverse Proxy بگذار.', 'Docker setzt eigene NAT-Regeln vor ufw. Port nur an 127.0.0.1 veröffentlichen oder in der Kette DOCKER-USER einschränken und hinter einen Reverse Proxy stellen.', 'Docker inserts its own NAT rules ahead of ufw. Publish the port only on 127.0.0.1 or restrict it in the DOCKER-USER chain and put it behind a reverse proxy.']],
    [['pull با toomanyrequests رد می‌شود.', 'pull scheitert mit toomanyrequests.', 'pull fails with toomanyrequests.'],
     ['محدودیت pull بی‌نام Docker Hub. با حساب docker login کن، یک Registry Mirror یا Proxy Cache (مثلاً Harbor) در شرکت بگذار یا Image را از Registry دیگری که سازنده منتشر کرده بگیر.', 'Rate Limit für anonyme Pulls bei Docker Hub. Mit Konto per docker login anmelden, einen Registry-Mirror oder Proxy-Cache (z. B. Harbor) im Unternehmen einrichten oder das Image aus einer anderen offiziellen Registry des Herstellers beziehen.', 'Docker Hub’s anonymous pull rate limit. Log in with an account via docker login, set up a registry mirror or proxy cache (e.g. Harbor) in the company, or pull from another official registry of the vendor.']]
  ],
  decide: [
    [['Compose یا Kubernetes؟', 'Compose oder Kubernetes?', 'Compose or Kubernetes?'],
     ['یک یا چند سرور با چند سرویس داخلی: Compose ساده و کافی است. وقتی مقیاس‌پذیری خودکار، چند گره، به‌روزرسانی بدون قطعی و تیم پلتفرم لازم است: Kubernetes. پیچیدگی Kubernetes را برای دو کانتینر نپذیر.', 'Ein oder wenige Server mit einigen internen Diensten: Compose ist einfach und reicht. Wenn automatische Skalierung, mehrere Knoten, Updates ohne Ausfall und ein Plattformteam nötig sind: Kubernetes. Die Komplexität von Kubernetes nicht für zwei Container in Kauf nehmen.', 'One or a few servers with some internal services: Compose is simple and enough. When autoscaling, multiple nodes, zero-downtime updates and a platform team are needed: Kubernetes. Don’t take on Kubernetes complexity for two containers.']],
    [['به‌روزرسانی خودکار Image (مثلاً Watchtower) یا دستی؟', 'Automatische Image-Updates (z. B. Watchtower) oder manuell?', 'Automatic image updates (e.g. Watchtower) or manual?'],
     ['خودکار برای ابزارهای کم‌اهمیت با نسخهٔ Patch ثابت (مثلاً فقط 16.x) قابل قبول است. برای دیتابیس و سرویس‌های حیاتی: به‌روزرسانی برنامه‌ریزی‌شده با پشتیبان، یادداشت انتشار و امکان بازگشت.', 'Automatisch ist für unkritische Werkzeuge mit festem Patch-Zweig (z. B. nur 16.x) vertretbar. Für Datenbanken und kritische Dienste: geplante Updates mit Backup, Release Notes und Rückweg.', 'Automatic is acceptable for non-critical tools on a fixed patch branch (e.g. only 16.x). For databases and critical services: planned updates with backup, release notes and a way back.']]
  ],
  pitfalls: [
    ['تگ latest و به‌روزرسانی بی‌برنامه.', 'Tag latest und ungeplante Updates.', 'Tag latest and unplanned updates.'],
    ['رمز در compose.yaml یا .env که در Git می‌رود.', 'Kennwort in compose.yaml oder einer .env, die in Git landet.', 'Passwords in compose.yaml or a .env that ends up in Git.'],
    ['پشتیبان‌گیری با کپی پوشهٔ Volume دیتابیس در حال اجرا.', 'Backup durch Kopieren des Volume-Ordners einer laufenden Datenbank.', 'Backing up by copying the volume folder of a running database.']
  ],
  iv: [
    [['تفاوت Image و Container چیست؟', 'Unterschied zwischen Image und Container?', 'Difference between an image and a container?'],
     ['Image قالب فقط‌خواندنی با لایه‌ها است؛ Container نمونهٔ در حال اجرای آن با یک لایهٔ نوشتنی موقت. دادهٔ ماندگار در Volume است و با پاک شدن Container از بین نمی‌رود.', 'Ein Image ist eine schreibgeschützte Vorlage aus Schichten, ein Container dessen laufende Instanz mit einer temporären beschreibbaren Schicht. Dauerhafte Daten liegen im Volume und überleben das Löschen des Containers.', 'An image is a read-only template made of layers; a container is a running instance of it with a temporary writable layer. Persistent data lives in a volume and survives deleting the container.']],
    [['چرا latest در تولید بد است؟', 'Warum ist latest in Produktion schlecht?', 'Why is latest bad in production?'],
     ['معلوم نیست کدام نسخه اجرا می‌شود، هر pull ممکن است نسخهٔ عمدهٔ ناسازگار بیاورد و بازگشت دقیق ممکن نیست. تگ نسخه یا Digest تکرارپذیری و کنترل تغییر می‌دهد.', 'Unklar, welche Version läuft, jeder pull kann eine inkompatible Hauptversion bringen, und ein genauer Rollback ist unmöglich. Versions-Tag oder Digest liefern Wiederholbarkeit und Änderungskontrolle.', 'It’s unclear which version runs, any pull may bring an incompatible major version, and an exact rollback is impossible. A version tag or digest gives repeatability and change control.']],
    [['امنیت کانتینر را چطور بالا می‌بری؟', 'Wie erhöhst du die Container-Sicherheit?', 'How do you improve container security?'],
     ['Image پایهٔ کوچک و به‌روز، اسکن با Trivy در Pipeline، اجرای غیرroot، فقط پورت‌های لازم، بدون privileged و docker.sock، رمز از Secret، Registry خصوصی و به‌روزرسانی منظم.', 'Kleine, aktuelle Basis-Images, Scan mit Trivy in der Pipeline, Ausführung ohne root, nur nötige Ports, kein privileged und kein docker.sock, Geheimnisse als Secret, private Registry und regelmäßige Updates.', 'Small, current base images, Trivy scanning in the pipeline, running as non-root, only necessary ports, no privileged and no docker.sock, secrets as secrets, a private registry and regular updates.']]
  ],
  sources: [
    ['Docker Docs – Compose file reference', 'https://docs.docker.com/reference/compose-file/'],
    ['Docker Docs – Packet filtering and firewalls', 'https://docs.docker.com/engine/network/packet-filtering-firewalls/'],
    ['Trivy – Documentation (First steps)', 'https://trivy.dev/docs/latest/getting-started/']
  ]
},

{
  id: 'mod-observ', part: 2,
  title: ['Observability: Prometheus، Grafana و هشدار درست', 'Observability: Prometheus, Grafana und sinnvolle Alarme', 'Observability: Prometheus, Grafana and meaningful alerts'],
  goal: ['یک پشتهٔ پایش مدرن بسازی: Prometheus معیارها را از node_exporter جمع می‌کند، Grafana داشبورد می‌دهد و قوانین هشدار فقط برای مشکلات واقعی فعال می‌شوند؛ PromQL پایه را بخوانی و بنویسی.', 'Du baust einen modernen Monitoring-Stack: Prometheus sammelt Metriken von node_exporter, Grafana liefert Dashboards, und Alarmregeln schlagen nur bei echten Problemen an; du liest und schreibst grundlegendes PromQL.', 'You build a modern monitoring stack: Prometheus collects metrics from node_exporter, Grafana provides dashboards, and alert rules fire only for real problems; you read and write basic PromQL.'],
  why: ['بدون پایش، کاربر اولین سیستم هشدار است. Prometheus و Grafana استاندارد عملی در محیط‌های لینوکس، کانتینر و Kubernetes هستند و در کنار Checkmk یا Zabbix در بیشتر آگهی‌ها دیده می‌شوند.', 'Ohne Monitoring ist der Benutzer das erste Alarmsystem. Prometheus und Grafana sind der Praxisstandard in Linux-, Container- und Kubernetes-Umgebungen und tauchen neben Checkmk oder Zabbix in den meisten Anzeigen auf.', 'Without monitoring the user is the first alarm system. Prometheus and Grafana are the de facto standard in Linux, container and Kubernetes environments and appear in most job ads alongside Checkmk or Zabbix.'],
  know: [
    ['سه ستون Observability: معیار (Metrics، عدد در طول زمان مثل CPU)، لاگ (رویدادهای متنی) و Trace (مسیر یک درخواست بین سرویس‌ها). Prometheus برای معیار، Loki یا ELK برای لاگ و OpenTelemetry برای Trace رایج‌اند.', 'Drei Säulen der Observability: Metriken (Zahlen über die Zeit, z. B. CPU), Logs (Textereignisse) und Traces (Weg einer Anfrage durch Dienste). Üblich sind Prometheus für Metriken, Loki oder ELK für Logs und OpenTelemetry für Traces.', 'Three pillars of observability: metrics (numbers over time, e.g. CPU), logs (text events) and traces (a request’s path across services). Common choices: Prometheus for metrics, Loki or ELK for logs and OpenTelemetry for traces.'],
    ['Prometheus مدل Pull دارد: هر ۱۵ ثانیه آدرس /metrics اهداف را می‌خواند. node_exporter (پورت 9100) معیارهای لینوکس را می‌دهد، windows_exporter (9182) معیارهای ویندوز و blackbox_exporter در دسترس بودن HTTP، TCP و ICMP را می‌سنجد. وضعیت اهداف در Status ▸ Targets دیده می‌شود.', 'Prometheus arbeitet per Pull: Alle 15 Sekunden liest er /metrics der Ziele. node_exporter (Port 9100) liefert Linux-Metriken, windows_exporter (9182) Windows-Metriken, blackbox_exporter prüft Erreichbarkeit per HTTP, TCP und ICMP. Den Zustand der Ziele zeigt Status ▸ Targets.', 'Prometheus pulls: every 15 seconds it reads the targets’ /metrics. node_exporter (port 9100) provides Linux metrics, windows_exporter (9182) Windows metrics and blackbox_exporter checks HTTP, TCP and ICMP availability. Target state is under Status ▸ Targets.'],
    ['PromQL پایه: up (۱ یعنی هدف در دسترس)، rate(node_cpu_seconds_total{mode="idle"}[5m]) برای نرخ در ۵ دقیقه، برچسب‌ها با {instance="…"} فیلتر می‌شوند و avg by(instance)(…) گروه‌بندی می‌کند. Counter همیشه با rate() یا increase() خوانده می‌شود، نه مستقیم.', 'PromQL-Grundlagen: up (1 heißt Ziel erreichbar), rate(node_cpu_seconds_total{mode="idle"}[5m]) für die Rate über 5 Minuten, Labels filtern mit {instance="…"}, avg by(instance)(…) gruppiert. Counter liest man immer mit rate() oder increase(), nie direkt.', 'PromQL basics: up (1 means target reachable), rate(node_cpu_seconds_total{mode="idle"}[5m]) for the 5-minute rate, labels filter with {instance="…"}, avg by(instance)(…) groups. Counters are always read with rate() or increase(), never directly.'],
    ['هشدار خوب علامت کاربر را می‌سنجد و قابل اقدام است: «سرویس در دسترس نیست»، «دیسک کمتر از ۱۰٪ جا دارد و تا ۲۴ ساعت پر می‌شود». با for: 5m جلوی هشدار لحظه‌ای را بگیر. Alertmanager هشدارها را گروه‌بندی، Silence و به ایمیل، Teams یا تلفن آماده‌باش هدایت می‌کند. هشدار بی‌اقدام باعث خستگی و نادیده گرفتن می‌شود.', 'Ein guter Alarm misst ein Benutzersymptom und ist handlungsfähig: „Dienst nicht erreichbar“, „Platte unter 10 % frei und in 24 Stunden voll“. for: 5m verhindert Alarme bei kurzen Spitzen. Alertmanager gruppiert, stummschaltet und leitet an E-Mail, Teams oder Bereitschaftstelefon weiter. Alarme ohne Handlung führen zu Alarmmüdigkeit.', 'A good alert measures a user symptom and is actionable: “service unreachable”, “disk under 10 % free and full within 24 hours”. for: 5m prevents alerts on short spikes. Alertmanager groups, silences and routes to e-mail, Teams or the on-call phone. Alerts without an action lead to alert fatigue.'],
    ['Grafana داده را از Prometheus، Loki، SQL و منابع دیگر نمایش می‌دهد. Data Source و Dashboard را با Provisioning (فایل YAML) بساز تا قابل‌تکرار و در Git باشد. داشبورد آمادهٔ «Node Exporter Full» با شناسهٔ 1860 نقطهٔ شروع خوبی است.', 'Grafana stellt Daten aus Prometheus, Loki, SQL und weiteren Quellen dar. Datenquellen und Dashboards per Provisioning (YAML-Datei) anlegen, damit sie wiederholbar und in Git sind. Das fertige Dashboard „Node Exporter Full“ mit der ID 1860 ist ein guter Start.', 'Grafana displays data from Prometheus, Loki, SQL and other sources. Create data sources and dashboards through provisioning (YAML files) so they are repeatable and in Git. The ready-made “Node Exporter Full” dashboard with ID 1860 is a good start.'],
    ['SLI و SLO: SLI یک معیار کیفیت است (مثلاً درصد درخواست‌های موفق)، SLO هدف آن (۹۹٫۵٪ در ۳۰ روز). بودجهٔ خطا (Error Budget) تفاوت این دو است و تعیین می‌کند چه وقت تغییرات پرریسک متوقف شوند. پایش را برای سرویس از دید کاربر بساز، نه فقط برای CPU.', 'SLI und SLO: Ein SLI ist eine Qualitätskennzahl (z. B. Anteil erfolgreicher Anfragen), ein SLO das Ziel dafür (99,5 % in 30 Tagen). Das Fehlerbudget ist die Differenz und bestimmt, wann riskante Änderungen pausieren. Überwache den Dienst aus Benutzersicht, nicht nur die CPU.', 'SLI and SLO: an SLI is a quality metric (e.g. share of successful requests), an SLO its target (99.5 % over 30 days). The error budget is the difference and decides when risky changes pause. Monitor the service from the user’s view, not just CPU.']
  ],
  lab: {
    vm: 'LNX01 (Ubuntu Server 24.04) mit Docker, Zugriff aus dem Lab-Netz auf Port 9090 und 3000', shell: 'Bash',
    steps: [
      ['پوشهٔ ~/apps/monitoring را بساز و prometheus.yml با دو هدف (خود Prometheus و node_exporter) و alerts.yml با سه قانون بنویس.', 'compose.yaml را با Prometheus، node_exporter و Grafana و فایل Provisioning منبع داده بساز و اجرا کن.', 'در Prometheus زیر Status ▸ Targets ببین هر دو هدف UP هستند و در Graph پرس‌وجوهای up و درصد استفادهٔ CPU را اجرا کن.', 'در Grafana داشبورد 1860 را وارد کن و CPU، حافظه و دیسک LNX01 را بخوان.', 'node_exporter را متوقف کن و ببین هشدار InstanzNichtErreichbar از Pending به Firing می‌رود؛ دوباره راه بینداز.'],
      ['Ordner ~/apps/monitoring anlegen, prometheus.yml mit zwei Zielen (Prometheus selbst und node_exporter) und alerts.yml mit drei Regeln schreiben.', 'compose.yaml mit Prometheus, node_exporter und Grafana samt Provisioning der Datenquelle anlegen und starten.', 'In Prometheus unter Status ▸ Targets prüfen, dass beide Ziele UP sind, und unter Graph die Abfragen up und CPU-Auslastung ausführen.', 'In Grafana das Dashboard 1860 importieren und CPU, Speicher und Platte von LNX01 ablesen.', 'node_exporter stoppen und beobachten, wie der Alarm InstanzNichtErreichbar von Pending auf Firing wechselt; danach wieder starten.'],
      ['Create the folder ~/apps/monitoring and write prometheus.yml with two targets (Prometheus itself and node_exporter) and alerts.yml with three rules.', 'Create compose.yaml with Prometheus, node_exporter and Grafana including data source provisioning and start it.', 'In Prometheus under Status ▸ Targets check both targets are UP and run the up and CPU usage queries under Graph.', 'In Grafana import dashboard 1860 and read CPU, memory and disk of LNX01.', 'Stop node_exporter and watch the InstanzNichtErreichbar alert move from pending to firing; then start it again.']
    ],
    code: R`mkdir -p ~/apps/monitoring/grafana && cd ~/apps/monitoring

cat > prometheus.yml <<'EOF'
global:
  scrape_interval: 15s
  evaluation_interval: 15s
rule_files:
  - /etc/prometheus/alerts.yml
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['localhost:9090']
  - job_name: node
    static_configs:
      - targets: ['node-exporter:9100']
        labels:
          host: LNX01
EOF

cat > alerts.yml <<'EOF'
groups:
  - name: basis
    rules:
      - alert: InstanzNichtErreichbar
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "{{ $labels.instance }} antwortet seit 1 Minute nicht"
      - alert: DateisystemFastVoll
        expr: node_filesystem_avail_bytes{fstype!~"tmpfs|overlay"} / node_filesystem_size_bytes{fstype!~"tmpfs|overlay"} < 0.10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Weniger als 10 % frei auf {{ $labels.mountpoint }}"
      - alert: HoheCPULast
        expr: 100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 90
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "CPU ueber 90 % seit 10 Minuten auf {{ $labels.instance }}"
EOF

cat > grafana/datasource.yml <<'EOF'
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
EOF

cat > compose.yaml <<'EOF'
services:
  prometheus:
    image: prom/prometheus:v2.53.0
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./alerts.yml:/etc/prometheus/alerts.yml:ro
      - promdata:/prometheus
    ports: ["9090:9090"]
    restart: unless-stopped
  node-exporter:
    image: prom/node-exporter:v1.8.2
    command: ["--path.rootfs=/host"]
    pid: host
    volumes:
      - /:/host:ro,rslave
    restart: unless-stopped
  grafana:
    image: grafana/grafana:11.2.0
    environment:
      GF_SECURITY_ADMIN_PASSWORD__FILE: /run/secrets/gf_pw
    secrets: [gf_pw]
    volumes:
      - ./grafana/datasource.yml:/etc/grafana/provisioning/datasources/datasource.yml:ro
      - grafdata:/var/lib/grafana
    ports: ["3000:3000"]
    restart: unless-stopped
volumes:
  promdata:
  grafdata:
secrets:
  gf_pw:
    file: ./gf_pw.txt
EOF
openssl rand -base64 18 > gf_pw.txt && chmod 600 gf_pw.txt
docker compose up -d && docker compose ps

# Pruefen: Ziele und Regeln
curl -s http://localhost:9090/api/v1/targets | grep -o '"health":"[a-z]*"'
curl -s http://localhost:9090/api/v1/rules | grep -o '"name":"[A-Za-z]*"'
# PromQL im Browser (http://LNX01:9090/graph):
#   up
#   100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
# Grafana: http://LNX01:3000, Benutzer admin, Kennwort aus gf_pw.txt, Dashboards > Import > 1860

# Ausfall simulieren
docker compose stop node-exporter
sleep 90; curl -s http://localhost:9090/api/v1/alerts | grep -o '"state":"[a-z]*"'
docker compose start node-exporter`,
    checks: [
      ['در Status ▸ Targets هر دو هدف UP هستند.', 'قوانین هشدار بدون خطا بارگذاری شده‌اند و زیر Alerts دیده می‌شوند.', 'داشبورد 1860 در Grafana CPU، حافظه و فضای دیسک LNX01 را نشان می‌دهد.', 'با توقف node_exporter هشدار ابتدا pending و بعد firing شد و می‌توانی نقش for: 1m را توضیح بدهی.'],
      ['Unter Status ▸ Targets sind beide Ziele UP.', 'Die Alarmregeln wurden fehlerfrei geladen und erscheinen unter Alerts.', 'Dashboard 1860 in Grafana zeigt CPU, Speicher und Plattenplatz von LNX01.', 'Beim Stoppen von node_exporter ging der Alarm erst auf pending, dann auf firing; du kannst die Rolle von for: 1m erklären.'],
      ['Under Status ▸ Targets both targets are UP.', 'The alert rules loaded without errors and appear under Alerts.', 'Dashboard 1860 in Grafana shows CPU, memory and disk space of LNX01.', 'When stopping node_exporter the alert went pending, then firing, and you can explain the role of for: 1m.']
    ]
  },
  trouble: [
    [['هدف در Targets وضعیت DOWN با context deadline exceeded دارد.', 'Ein Ziel steht unter Targets auf DOWN mit context deadline exceeded.', 'A target shows DOWN with context deadline exceeded.'],
     ['Prometheus به پورت هدف نمی‌رسد: فایروال (مثلاً 9100 یا 9182 روی ویندوز)، نام یا IP اشتباه، یا Exporter اجرا نمی‌شود. از خود سرور Prometheus با curl http://هدف:9100/metrics آزمایش کن.', 'Prometheus erreicht den Zielport nicht: Firewall (z. B. 9100 oder 9182 unter Windows), falscher Name oder IP, oder der Exporter läuft nicht. Vom Prometheus-Server aus mit curl http://ziel:9100/metrics testen.', 'Prometheus can’t reach the target port: firewall (e.g. 9100 or 9182 on Windows), wrong name or IP, or the exporter isn’t running. Test from the Prometheus server with curl http://target:9100/metrics.']],
    [['Prometheus بعد از تغییر پیکربندی شروع نمی‌شود.', 'Prometheus startet nach einer Konfigurationsänderung nicht.', 'Prometheus doesn’t start after a configuration change.'],
     ['خطای YAML یا PromQL. قبل از اجرا با promtool بررسی کن: docker run --rm -v "$PWD":/c --entrypoint promtool prom/prometheus:v2.53.0 check config /c/prometheus.yml. تورفتگی و نقل‌قول برچسب‌ها رایج‌ترین علت‌اند.', 'YAML- oder PromQL-Fehler. Vor dem Start mit promtool prüfen: docker run --rm -v "$PWD":/c --entrypoint promtool prom/prometheus:v2.53.0 check config /c/prometheus.yml. Einrückung und Anführungszeichen bei Labels sind die häufigsten Ursachen.', 'A YAML or PromQL error. Check with promtool before starting: docker run --rm -v "$PWD":/c --entrypoint promtool prom/prometheus:v2.53.0 check config /c/prometheus.yml. Indentation and label quoting are the most common causes.']],
    [['تیم آماده‌باش شب‌ها ده‌ها هشدار بی‌اهمیت می‌گیرد.', 'Die Bereitschaft bekommt nachts Dutzende unwichtige Alarme.', 'On-call gets dozens of unimportant alerts at night.'],
     ['هر هشدار را بررسی کن: آیا اقدامی لازم دارد؟ اگر نه، حذف یا به گزارش روزانه منتقل کن. for را بلندتر، آستانه را بر اساس علامت کاربر و Alertmanager را با group_by و Inhibition تنظیم کن تا یک قطعی شبکه صد هشدار نسازد.', 'Jeden Alarm prüfen: Ist eine Handlung nötig? Wenn nicht, löschen oder in einen Tagesbericht verschieben. for verlängern, Schwellen am Benutzersymptom ausrichten und Alertmanager mit group_by und Inhibition so einstellen, dass ein Netzausfall nicht hundert Alarme erzeugt.', 'Review every alert: does it need an action? If not, delete it or move it to a daily report. Lengthen for, base thresholds on user symptoms and configure Alertmanager with group_by and inhibition so one network outage doesn’t create a hundred alerts.']],
    [['Grafana فقط «No data» نشان می‌دهد.', 'Grafana zeigt nur „No data“.', 'Grafana only shows “No data”.'],
     ['منبع دادهٔ Prometheus را در Connections ▸ Data sources با Save & test آزمایش کن (آدرس داخلی http://prometheus:9090). در داشبورد متغیر job یا instance با برچسب‌های تو مطابق نیست؛ آن را در بالای داشبورد انتخاب کن.', 'Die Prometheus-Datenquelle unter Connections ▸ Data sources mit Save & test prüfen (interne Adresse http://prometheus:9090). Im Dashboard passt die Variable job oder instance nicht zu deinen Labels – oben im Dashboard auswählen.', 'Test the Prometheus data source under Connections ▸ Data sources with Save & test (internal address http://prometheus:9090). In the dashboard the job or instance variable doesn’t match your labels – select it at the top of the dashboard.']]
  ],
  decide: [
    [['Prometheus/Grafana یا Checkmk/Zabbix؟', 'Prometheus/Grafana oder Checkmk/Zabbix?', 'Prometheus/Grafana or Checkmk/Zabbix?'],
     ['Checkmk و Zabbix برای محیط کلاسیک با سرور ویندوز، دستگاه شبکه و SNMP آماده‌ترند و کشف خودکار دارند. Prometheus برای کانتینر، Kubernetes و برنامه‌هایی که معیار منتشر می‌کنند بهترین است. بسیاری از شرکت‌ها هر دو را دارند.', 'Checkmk und Zabbix sind für klassische Umgebungen mit Windows-Servern, Netzwerkgeräten und SNMP fertiger und haben automatische Erkennung. Prometheus ist am besten für Container, Kubernetes und Anwendungen, die Metriken anbieten. Viele Firmen nutzen beides.', 'Checkmk and Zabbix are more ready-made for classic environments with Windows servers, network devices and SNMP and have auto-discovery. Prometheus is best for containers, Kubernetes and applications that expose metrics. Many companies run both.']],
    [['چه چیزی هشدار شود و چه چیزی فقط داشبورد؟', 'Was wird Alarm, was nur Dashboard?', 'What becomes an alert and what only a dashboard?'],
     ['هشدار: وقتی کاربر آسیب می‌بیند یا به‌زودی می‌بیند و کسی باید همین حالا کاری کند. داشبورد یا گزارش: روندها، ظرفیت و هر چیزی که تا روز کاری بعد صبر می‌کند.', 'Alarm: wenn Benutzer betroffen sind oder bald sein werden und jemand jetzt handeln muss. Dashboard oder Bericht: Trends, Kapazität und alles, was bis zum nächsten Arbeitstag warten kann.', 'Alert: when users are affected or soon will be and someone must act now. Dashboard or report: trends, capacity and anything that can wait until the next working day.']]
  ],
  pitfalls: [
    ['هشدار برای هر معیار با آستانهٔ دلخواه و بدون for.', 'Alarme für jede Metrik mit beliebiger Schwelle und ohne for.', 'Alerts on every metric with arbitrary thresholds and without for.'],
    ['Grafana و Prometheus بدون رمز یا با رمز پیش‌فرض و باز روی اینترنت.', 'Grafana und Prometheus ohne oder mit Standardkennwort offen im Internet.', 'Grafana and Prometheus open to the internet without a password or with the default one.'],
    ['خواندن مستقیم Counter به‌جای rate().', 'Counter direkt lesen statt mit rate().', 'Reading counters directly instead of with rate().']
  ],
  iv: [
    [['Pull در Prometheus یعنی چه و چه مزیتی دارد؟', 'Was bedeutet Pull bei Prometheus und welchen Vorteil hat es?', 'What does pull mean in Prometheus and what is the advantage?'],
     ['Prometheus خودش به اهداف سر می‌زند و /metrics را می‌خواند. اگر هدفی جواب ندهد، up برابر صفر می‌شود و خود این یک علامت سلامت است؛ پیکربندی مرکزی است و اهداف به آدرس Prometheus نیاز ندارند.', 'Prometheus fragt die Ziele selbst ab und liest /metrics. Antwortet ein Ziel nicht, wird up zu 0 – das ist bereits ein Gesundheitssignal; die Konfiguration ist zentral, Ziele müssen die Prometheus-Adresse nicht kennen.', 'Prometheus queries the targets itself and reads /metrics. If a target doesn’t answer, up becomes 0 – itself a health signal; configuration is central and targets don’t need to know Prometheus’ address.']],
    [['هشدار خوب چه ویژگی‌هایی دارد؟', 'Was macht einen guten Alarm aus?', 'What makes a good alert?'],
     ['علامت واقعی کاربر را می‌سنجد، فوری و قابل اقدام است، با for از نوسان کوتاه جلوگیری می‌کند، پیام روشن و پیوند به Runbook دارد و به نفر درست می‌رسد.', 'Er misst ein echtes Benutzersymptom, ist dringend und handlungsfähig, vermeidet mit for kurze Ausreißer, hat eine klare Nachricht mit Runbook-Link und erreicht die richtige Person.', 'It measures a real user symptom, is urgent and actionable, avoids short blips with for, has a clear message with a runbook link and reaches the right person.']],
    [['SLO چیست؟', 'Was ist ein SLO?', 'What is an SLO?'],
     ['هدف قابل‌اندازه‌گیری برای کیفیت سرویس، مثلاً ۹۹٫۹٪ درخواست‌های موفق در ۳۰ روز. بودجهٔ خطا نشان می‌دهد چقدر خطا مجاز است و کمک می‌کند بین سرعت تغییر و پایداری تصمیم بگیری.', 'Ein messbares Ziel für die Dienstqualität, z. B. 99,9 % erfolgreiche Anfragen in 30 Tagen. Das Fehlerbudget zeigt, wie viel Fehler erlaubt ist, und hilft, zwischen Änderungstempo und Stabilität abzuwägen.', 'A measurable target for service quality, e.g. 99.9 % successful requests over 30 days. The error budget shows how much failure is allowed and helps balance change speed against stability.']]
  ],
  sources: [
    ['Prometheus – Documentation', 'https://prometheus.io/docs/introduction/overview/'],
    ['Prometheus – Alerting rules', 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/'],
    ['Grafana – Node Exporter Full (Dashboard 1860)', 'https://grafana.com/grafana/dashboards/1860-node-exporter-full/'],
    ['Google SRE Book – Service Level Objectives', 'https://sre.google/sre-book/service-level-objectives/']
  ]
},

{
  id: 'mod-siem', part: 2,
  title: ['پایش امنیتی و SIEM با Wazuh: رویدادهای ویندوز تا تشخیص حمله', 'Sicherheitsmonitoring und SIEM mit Wazuh: von Windows-Ereignissen zur Angriffserkennung', 'Security monitoring and SIEM with Wazuh: from Windows events to attack detection'],
  goal: ['یک SIEM متن‌باز راه‌اندازی کنی، رویدادهای مهم امنیتی ویندوز و لینوکس را جمع کنی، شناسه‌های رویداد کلیدی را بشناسی، چند حملهٔ ساده را شبیه‌سازی و تشخیص دهی و یک هشدار را مثل تحلیلگر SOC بررسی کنی.', 'Du richtest ein quelloffenes SIEM ein, sammelst wichtige Sicherheitsereignisse von Windows und Linux, kennst die zentralen Ereignis-IDs, simulierst und erkennst einfache Angriffe und bewertest einen Alarm wie ein SOC-Analyst.', 'You set up an open-source SIEM, collect important Windows and Linux security events, know the key event IDs, simulate and detect simple attacks and triage an alert like a SOC analyst.'],
  why: ['NIS2، بیمهٔ سایبری و ممیزی‌ها از شرکت‌ها می‌خواهند رویدادهای امنیتی را جمع و بررسی کنند. تکنسینی که می‌داند 4625 و 4732 یعنی چه و یک هشدار را درست ارزیابی می‌کند، در تیم امنیت و پشتیبانی هر دو ارزشمند است.', 'NIS2, Cyberversicherungen und Audits verlangen, dass Firmen Sicherheitsereignisse sammeln und auswerten. Ein Techniker, der weiß, was 4625 und 4732 bedeuten, und einen Alarm richtig einschätzt, ist im Sicherheits- und im Supportteam wertvoll.', 'NIS2, cyber insurance and audits require companies to collect and review security events. A technician who knows what 4625 and 4732 mean and assesses an alert correctly is valuable in both the security and the support team.'],
  know: [
    ['SIEM لاگ‌ها را از منابع مختلف جمع، یکسان‌سازی و با قوانین همبستگی می‌کند و هشدار می‌دهد. Wazuh متن‌باز است و سه جزء دارد: Indexer (ذخیره و جست‌وجو)، Server یا Manager (تحلیل با قوانین و Decoderها) و Dashboard (رابط وب)، به‌علاوهٔ Agent روی هر سیستم.', 'Ein SIEM sammelt Logs aus vielen Quellen, normalisiert und korreliert sie mit Regeln und alarmiert. Wazuh ist quelloffen und besteht aus Indexer (Speichern und Suchen), Server bzw. Manager (Analyse mit Regeln und Decodern) und Dashboard (Weboberfläche) sowie einem Agent auf jedem System.', 'A SIEM collects logs from many sources, normalizes and correlates them with rules and raises alerts. Wazuh is open source and consists of the indexer (store and search), the server or manager (analysis with rules and decoders) and the dashboard (web UI), plus an agent on each system.'],
    ['شناسه‌های مهم Security Log ویندوز: 4624 ورود موفق، 4625 ورود ناموفق، 4740 قفل شدن حساب، 4720 ساخت کاربر، 4728 و 4732 و 4756 افزودن به گروه امنیتی، 4672 ورود با امتیاز ویژه، 4688 اجرای فرایند (با سیاست Audit مربوط)، 1102 پاک شدن لاگ امنیتی و در لاگ System رویداد 7045 نصب سرویس جدید.', 'Wichtige IDs im Windows-Security-Log: 4624 erfolgreiche Anmeldung, 4625 fehlgeschlagene Anmeldung, 4740 Konto gesperrt, 4720 Benutzer angelegt, 4728, 4732 und 4756 Aufnahme in eine Sicherheitsgruppe, 4672 Anmeldung mit Sonderrechten, 4688 Prozessstart (mit passender Audit-Richtlinie), 1102 Security-Log gelöscht und im System-Log 7045 neuer Dienst installiert.', 'Important IDs in the Windows security log: 4624 successful logon, 4625 failed logon, 4740 account locked out, 4720 user created, 4728, 4732 and 4756 added to a security group, 4672 logon with special privileges, 4688 process creation (with the matching audit policy), 1102 security log cleared, and in the system log 7045 new service installed.'],
    ['Logon Type در 4624 و 4625 مهم است: 2 تعاملی (پشت دستگاه)، 3 شبکه (اشتراک فایل)، 10 RemoteInteractive (RDP)، 5 سرویس. ده‌ها 4625 با Type 3 یا 10 از یک IP یعنی حدس رمز؛ 4625 روی حساب‌های مختلف با یک رمز یعنی Password Spraying.', 'Der Logon Type in 4624 und 4625 ist wichtig: 2 interaktiv (am Gerät), 3 Netzwerk (Dateifreigabe), 10 RemoteInteractive (RDP), 5 Dienst. Dutzende 4625 mit Typ 3 oder 10 von einer IP heißen Kennwortraten; 4625 auf vielen Konten mit wenigen Versuchen heißt Password Spraying.', 'The logon type in 4624 and 4625 matters: 2 interactive (at the device), 3 network (file share), 10 RemoteInteractive (RDP), 5 service. Dozens of 4625 with type 3 or 10 from one IP mean password guessing; 4625 across many accounts with few attempts each means password spraying.'],
    ['منبع بهتر از لاگ پیش‌فرض: سیاست Advanced Audit را از طریق GPO فعال کن (Logon، Account Management، Process Creation با خط فرمان) و Sysmon از Microsoft Sysinternals را با یک پیکربندی شناخته‌شده نصب کن تا اجرای فرایند، اتصال شبکه و تغییر فایل‌های مهم ثبت شود. اندازهٔ لاگ امنیتی را بزرگ کن.', 'Bessere Quellen als die Standardprotokolle: Erweiterte Überwachungsrichtlinie per GPO aktivieren (Anmeldung, Kontenverwaltung, Prozesserstellung mit Befehlszeile) und Sysmon aus den Microsoft Sysinternals mit einer bewährten Konfiguration installieren, damit Prozessstarts, Netzverbindungen und wichtige Dateiänderungen protokolliert werden. Security-Log vergrößern.', 'Better sources than the default logs: enable the advanced audit policy via GPO (logon, account management, process creation with command line) and install Sysmon from Microsoft Sysinternals with a well-known configuration so process starts, network connections and important file changes are logged. Increase the security log size.'],
    ['تحلیل هشدار (Triage): چه کسی، چه چیزی، از کجا، کی؟ آیا کاری عادی است (کارمند رمزش را فراموش کرده) یا حمله؟ داده را با منابع دیگر (VPN، فایروال، EDR) مقایسه کن، تکنیک را در MITRE ATT&CK نام ببر، تصمیم بگیر (بستن، اسکالیشن، مهار) و همه را در تیکت ثبت کن.', 'Alarmbewertung (Triage): Wer, was, woher, wann? Normale Tätigkeit (Mitarbeiter hat das Kennwort vergessen) oder Angriff? Mit anderen Quellen (VPN, Firewall, EDR) abgleichen, die Technik in MITRE ATT&CK benennen, entscheiden (schließen, eskalieren, eindämmen) und alles im Ticket festhalten.', 'Alert triage: who, what, from where, when? Normal activity (an employee forgot their password) or an attack? Correlate with other sources (VPN, firewall, EDR), name the technique in MITRE ATT&CK, decide (close, escalate, contain) and record everything in the ticket.'],
    ['حفظ حریم خصوصی: لاگ‌ها دادهٔ شخصی‌اند. هدف، مدت نگه‌داری و دسترسی را مستند کن (DSGVO) و در آلمان شورای کارکنان (Betriebsrat) را از ابتدا درگیر کن، چون پایش رفتار کارکنان بدون توافق مجاز نیست.', 'Datenschutz: Logs sind personenbezogene Daten. Zweck, Aufbewahrungsdauer und Zugriff dokumentieren (DSGVO) und in Deutschland den Betriebsrat von Anfang an einbinden, da Verhaltens- oder Leistungskontrolle ohne Vereinbarung nicht zulässig ist.', 'Privacy: logs are personal data. Document purpose, retention and access (GDPR) and in Germany involve the works council from the start, because monitoring employee behavior without an agreement is not permitted.']
  ],
  lab: {
    vm: 'SIEM01: Ubuntu Server 24.04 mit mindestens 4 vCPU, 8 GB RAM und 50 GB Platte; CL01 oder SRV01 (Windows) als Agent; nur im Labornetz', shell: 'Bash und PowerShell',
    steps: [
      ['نسخهٔ فعلی را در صفحهٔ Quickstart رسمی Wazuh ببین و نصب «همه در یک» را روی SIEM01 اجرا کن. رمز admin را از خروجی یا فایل رمزها بردار.', 'در داشبورد بخش Agents ▸ Deploy new agent را باز کن، ویندوز و آدرس SIEM01 را انتخاب کن و فرمان PowerShell ساخته‌شده را روی CL01 با دسترسی مدیر اجرا کن و سرویس را راه بینداز.', 'روی CL01 حملهٔ ساده بساز: پنج ورود ناموفق با Start-Process و رمز اشتباه، ساخت یک کاربر محلی و افزودن آن به گروه Administrators.', 'در Wazuh زیر Threat Hunting یا Discover رویدادهای 4625، 4720 و 4732 را پیدا کن، سطح قانون و تکنیک MITRE را بخوان و یک تحلیل کوتاه مثل تیکت SOC بنویس.', 'کاربر آزمایشی را پاک کن و همین رویدادها را محلی هم با Get-WinEvent ببین تا بدانی SIEM دقیقاً چه چیزی را جمع می‌کند.'],
      ['Aktuelle Version auf der offiziellen Wazuh-Quickstart-Seite nachsehen und die All-in-one-Installation auf SIEM01 ausführen. admin-Kennwort aus der Ausgabe bzw. der Kennwortdatei übernehmen.', 'Im Dashboard Agents ▸ Deploy new agent öffnen, Windows und die Adresse von SIEM01 wählen, den erzeugten PowerShell-Befehl auf CL01 als Administrator ausführen und den Dienst starten.', 'Auf CL01 einen einfachen Angriff erzeugen: fünf fehlgeschlagene Anmeldungen per Start-Process mit falschem Kennwort, einen lokalen Benutzer anlegen und in die Gruppe Administratoren aufnehmen.', 'In Wazuh unter Threat Hunting bzw. Discover die Ereignisse 4625, 4720 und 4732 finden, Regelstufe und MITRE-Technik lesen und eine kurze Bewertung wie ein SOC-Ticket schreiben.', 'Testbenutzer löschen und dieselben Ereignisse lokal mit Get-WinEvent ansehen, um zu verstehen, was das SIEM genau sammelt.'],
      ['Check the current version on the official Wazuh quickstart page and run the all-in-one installation on SIEM01. Take the admin password from the output or the password file.', 'In the dashboard open Agents ▸ Deploy new agent, choose Windows and the SIEM01 address, run the generated PowerShell command on CL01 as administrator and start the service.', 'Create a simple attack on CL01: five failed logons with Start-Process and a wrong password, create a local user and add it to the Administrators group.', 'In Wazuh under Threat Hunting or Discover find events 4625, 4720 and 4732, read the rule level and MITRE technique and write a short assessment like a SOC ticket.', 'Delete the test user and view the same events locally with Get-WinEvent to understand exactly what the SIEM collects.']
    ],
    code: R`# ===== SIEM01 (Ubuntu): Wazuh All-in-one =====
# Versionsnummer laut https://documentation.wazuh.com/current/quickstart.html einsetzen
WAZUH_VER=4.14
curl -sO https://packages.wazuh.com/$WAZUH_VER/wazuh-install.sh
sudo bash ./wazuh-install.sh -a
# Kennwoerter anzeigen (Datei sicher aufbewahren, danach loeschen)
sudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt
sudo ss -tlnp | grep -E ':443|:1514|:1515|:9200'
# Dashboard: https://SIEM01 (Zertifikatswarnung im Labor erwartet)

# ===== CL01 (PowerShell als Administrator) =====
# 1) Agent: Befehl aus "Deploy new agent" einfuegen und ausfuehren, dann:
Get-Service -Name Wazuh* | Start-Service
Get-Service -Name Wazuh*

# 2) Angriff simulieren (nur im Labor!)
$falsch = New-Object System.Management.Automation.PSCredential('Administrator', (ConvertTo-SecureString 'falsch' -AsPlainText -Force))
1..5 | ForEach-Object { try { Start-Process cmd.exe -Credential $falsch -ErrorAction Stop } catch { 'Anmeldung fehlgeschlagen (erwartet)' } }
net user labangreifer 'Labor!2026xyz' /add
net localgroup Administratoren labangreifer /add   # englisches Windows: Administrators

# 3) Lokal gegenpruefen
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625,4720,4732} -MaxEvents 20 |
  Select-Object TimeCreated, Id, @{n='Text';e={($_.Message -split '\r?\n')[0]}} | Format-Table -AutoSize

# 4) Aufraeumen
net user labangreifer /delete

# ===== Wazuh-Dashboard: Suchfilter =====
# data.win.system.eventID: 4625
# data.win.system.eventID: (4720 or 4732)
# rule.level >= 10`,
    checks: [
      ['Agent CL01 در داشبورد Active است.', 'رویدادهای 4625، 4720 و 4732 در Wazuh با زمان درست و نام کاربر دیده می‌شوند و دست‌کم یکی هشدار با سطح بالا ساخته است.', 'یک تحلیل کوتاه نوشته‌ای: چه اتفاقی افتاد، تکنیک MITRE، عادی یا مشکوک و اقدام پیشنهادی.', 'کاربر آزمایشی پاک شده و می‌دانی فایل رمزهای Wazuh کجا نگه داشته می‌شود.'],
      ['Der Agent CL01 ist im Dashboard Active.', 'Die Ereignisse 4625, 4720 und 4732 erscheinen in Wazuh mit richtiger Zeit und Benutzername, mindestens eines hat einen Alarm hoher Stufe ausgelöst.', 'Du hast eine kurze Bewertung geschrieben: was passiert ist, MITRE-Technik, normal oder verdächtig, empfohlene Maßnahme.', 'Der Testbenutzer ist gelöscht, und du weißt, wo die Wazuh-Kennwortdatei aufbewahrt wird.'],
      ['Agent CL01 is Active in the dashboard.', 'Events 4625, 4720 and 4732 appear in Wazuh with the right time and user name, and at least one raised a high-level alert.', 'You wrote a short assessment: what happened, MITRE technique, normal or suspicious, recommended action.', 'The test user is deleted and you know where the Wazuh password file is kept.']
    ]
  },
  trouble: [
    [['Agent در داشبورد Disconnected یا Never connected است.', 'Agent steht im Dashboard auf Disconnected oder Never connected.', 'Agent shows Disconnected or Never connected in the dashboard.'],
     ['پورت‌های 1514 (داده) و 1515 (ثبت‌نام) باید از Agent به سرور باز باشند. آدرس Manager در ossec.conf روی Agent، ساعت دو طرف و لاگ Agent در C:\\Program Files (x86)\\ossec-agent\\ossec.log را بررسی کن.', 'Die Ports 1514 (Daten) und 1515 (Registrierung) müssen vom Agent zum Server offen sein. Manager-Adresse in ossec.conf auf dem Agent, Uhrzeit beider Seiten und das Agent-Log unter C:\\Program Files (x86)\\ossec-agent\\ossec.log prüfen.', 'Ports 1514 (data) and 1515 (enrollment) must be open from the agent to the server. Check the manager address in ossec.conf on the agent, the clock on both sides and the agent log at C:\\Program Files (x86)\\ossec-agent\\ossec.log.']],
    [['نصب All-in-one با کمبود حافظه یا Indexer ناموفق متوقف می‌شود.', 'Die All-in-one-Installation bricht wegen Speichermangels oder mit Indexer-Fehler ab.', 'The all-in-one installation stops for lack of memory or with an indexer error.'],
     ['Indexer دست‌کم ۸ گیگ رم و فضای کافی می‌خواهد. منابع VM را بالا ببر، نصب ناقص را طبق راهنما با گزینهٔ حذف پاک کن و دوباره اجرا کن. لاگ /var/log/wazuh-install.log علت دقیق را دارد.', 'Der Indexer braucht mindestens 8 GB RAM und genug Platz. VM-Ressourcen erhöhen, die halbe Installation laut Anleitung mit der Deinstallationsoption entfernen und erneut starten. /var/log/wazuh-install.log nennt die genaue Ursache.', 'The indexer needs at least 8 GB RAM and enough disk. Increase VM resources, remove the partial installation with the uninstall option per the guide and run again. /var/log/wazuh-install.log has the exact cause.']],
    [['رویداد 4688 یا 4720 اصلاً ثبت نمی‌شود.', 'Ereignis 4688 oder 4720 wird gar nicht protokolliert.', 'Event 4688 or 4720 is not logged at all.'],
     ['سیاست Audit مربوط فعال نیست. با auditpol /get /category:* وضعیت را ببین و از طریق GPO زیر Advanced Audit Policy Configuration دسته‌های Account Management و Detailed Tracking را فعال کن؛ برای خط فرمان 4688 هم یک تنظیم جداگانه لازم است.', 'Die passende Überwachungsrichtlinie ist nicht aktiv. Mit auditpol /get /category:* prüfen und per GPO unter Advanced Audit Policy Configuration die Kategorien Account Management und Detailed Tracking aktivieren; für die Befehlszeile in 4688 ist eine eigene Einstellung nötig.', 'The matching audit policy isn’t enabled. Check with auditpol /get /category:* and enable the Account Management and Detailed Tracking categories via GPO under Advanced Audit Policy Configuration; the command line in 4688 needs a separate setting.']]
  ],
  decide: [
    [['SIEM خودمیزبان (Wazuh) یا سرویس ابری (مثلاً Microsoft Sentinel)؟', 'Eigenes SIEM (Wazuh) oder Cloud-Dienst (z. B. Microsoft Sentinel)?', 'Self-hosted SIEM (Wazuh) or a cloud service (e.g. Microsoft Sentinel)?'],
     ['Wazuh هزینهٔ مجوز ندارد و داده داخل می‌ماند، اما نگه‌داری، ظرفیت و تنظیم قوانین با توست. Sentinel با Microsoft 365 و Entra عالی یکپارچه است و مقیاس‌پذیر، اما هزینه به حجم داده بستگی دارد. برای شرکت کوچک بدون SOC، سرویس مدیریت‌شده (MDR) را هم در نظر بگیر.', 'Wazuh kostet keine Lizenz und die Daten bleiben im Haus, aber Betrieb, Kapazität und Regelpflege liegen bei dir. Sentinel ist hervorragend mit Microsoft 365 und Entra verzahnt und skaliert, die Kosten hängen aber von der Datenmenge ab. Für kleine Firmen ohne SOC auch einen Managed Service (MDR) erwägen.', 'Wazuh has no license cost and data stays in-house, but operation, capacity and rule tuning are on you. Sentinel integrates excellently with Microsoft 365 and Entra and scales, but cost depends on data volume. For small companies without a SOC also consider a managed service (MDR).']],
    [['همهٔ لاگ‌ها یا فقط لاگ‌های مهم؟', 'Alle Logs oder nur die wichtigen?', 'All logs or only the important ones?'],
     ['همه‌چیز گران و پرسروصدا است. از موارد استفادهٔ روشن شروع کن: ورودهای ناموفق و موفق مشکوک، تغییر گروه‌های مدیریتی، پاک شدن لاگ، سرویس جدید، رویدادهای EDR و فایروال. بعد بر اساس نیاز گسترش بده.', 'Alles ist teuer und laut. Mit klaren Anwendungsfällen beginnen: verdächtige fehlgeschlagene und erfolgreiche Anmeldungen, Änderungen an Admin-Gruppen, gelöschte Logs, neue Dienste, EDR- und Firewall-Ereignisse. Danach bedarfsgerecht erweitern.', 'Everything is expensive and noisy. Start with clear use cases: suspicious failed and successful logons, changes to admin groups, cleared logs, new services, EDR and firewall events. Expand based on need.']]
  ],
  pitfalls: [
    ['نصب SIEM بدون اینکه کسی هشدارها را بخواند.', 'Ein SIEM installieren, ohne dass jemand die Alarme liest.', 'Installing a SIEM without anyone reading the alerts.'],
    ['اجرای شبیه‌سازی حمله روی سیستم‌های تولید بدون اجازه.', 'Angriffssimulationen ohne Freigabe auf Produktivsystemen ausführen.', 'Running attack simulations on production systems without permission.'],
    ['نگه‌داری بی‌پایان لاگ‌ها بدون مبنای قانونی و بدون توافق با Betriebsrat.', 'Logs unbegrenzt ohne Rechtsgrundlage und ohne Vereinbarung mit dem Betriebsrat aufbewahren.', 'Keeping logs indefinitely without a legal basis and without a works council agreement.']
  ],
  iv: [
    [['رویدادهای 4625 و 4740 چه می‌گویند؟', 'Was sagen die Ereignisse 4625 und 4740?', 'What do events 4625 and 4740 tell you?'],
     ['4625 ورود ناموفق است با نام حساب، Logon Type، آدرس مبدأ و کد علت (مثلاً رمز اشتباه یا حساب غیرفعال). 4740 یعنی حساب به‌خاطر تلاش‌های ناموفق قفل شد و نام رایانهٔ مبدأ را دارد؛ روی کنترل‌کنندهٔ دامنهٔ PDC دیده می‌شود.', '4625 ist eine fehlgeschlagene Anmeldung mit Kontoname, Logon Type, Quelladresse und Fehlercode (z. B. falsches Kennwort oder deaktiviertes Konto). 4740 bedeutet, das Konto wurde wegen Fehlversuchen gesperrt, und nennt den Quellcomputer; es erscheint auf dem PDC-Domänencontroller.', '4625 is a failed logon with account name, logon type, source address and failure code (e.g. wrong password or disabled account). 4740 means the account was locked out after failed attempts and names the source computer; it appears on the PDC domain controller.']],
    [['SIEM و EDR چه فرقی دارند؟', 'Unterschied zwischen SIEM und EDR?', 'Difference between SIEM and EDR?'],
     ['EDR روی هر دستگاه رفتار را عمیق می‌بیند و می‌تواند فوراً پاسخ دهد (ایزوله کردن، کشتن فرایند). SIEM لاگ همه منابع (EDR، فایروال، AD، ابر) را مرکزی جمع و همبسته می‌کند و دید کلی و نگه‌داری طولانی می‌دهد. با هم کار می‌کنند.', 'EDR sieht das Verhalten auf jedem Gerät tief und kann sofort reagieren (isolieren, Prozess beenden). Ein SIEM sammelt und korreliert zentral die Logs aller Quellen (EDR, Firewall, AD, Cloud) und liefert Überblick und lange Aufbewahrung. Beide ergänzen sich.', 'EDR sees behavior deeply on each device and can respond immediately (isolate, kill a process). A SIEM centrally collects and correlates logs from all sources (EDR, firewall, AD, cloud) and provides overview and long retention. They complement each other.']],
    [['هشداری از «افزوده شدن کاربر به Domain Admins» می‌گیری. چه می‌کنی؟', 'Du bekommst einen Alarm „Benutzer zu Domain Admins hinzugefügt“. Was tust du?', 'You get an alert “user added to Domain Admins”. What do you do?'],
     ['بررسی می‌کنم چه کسی و از کدام سیستم تغییر داده و آیا تیکت یا تغییر تأییدشده‌ای وجود دارد. اگر نه، آن را حادثه می‌دانم: عضویت را برمی‌گردانم، حساب‌های درگیر را غیرفعال و رمزها را عوض می‌کنم، به تیم امنیت اسکالیت می‌کنم و شواهد را نگه می‌دارم.', 'Ich prüfe, wer die Änderung von welchem System gemacht hat und ob ein genehmigtes Ticket oder Change existiert. Wenn nicht, behandle ich es als Vorfall: Mitgliedschaft zurücknehmen, beteiligte Konten sperren und Kennwörter ändern, ans Sicherheitsteam eskalieren und Beweise sichern.', 'I check who made the change from which system and whether an approved ticket or change exists. If not, I treat it as an incident: revert the membership, disable the involved accounts and reset passwords, escalate to the security team and preserve evidence.']]
  ],
  sources: [
    ['Wazuh – Quickstart', 'https://documentation.wazuh.com/current/quickstart.html'],
    ['Microsoft Learn – Events to monitor (Active Directory)', 'https://learn.microsoft.com/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor'],
    ['Microsoft Sysinternals – Sysmon', 'https://learn.microsoft.com/sysinternals/downloads/sysmon'],
    ['MITRE ATT&CK', 'https://attack.mitre.org/']
  ]
}

);
})();
