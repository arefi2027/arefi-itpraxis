**Vorabversion zum Testen.** Installierte Programme erhalten sie noch nicht automatisch.

**Behoben:** Unter Windows brach der Start mit „Port 18764 wird von einem anderen Programm benutzt“ ab – auch wenn Windows den Port nur reserviert hatte (Hyper-V, WSL, Docker). Die App weicht jetzt automatisch auf einen Ersatzport aus und merkt ihn sich.

Enthält alles aus 2.3.0: Gerätebibliothek mit 12 Geräten und je einer Praxisübung (fa/de/en).

| System | Datei |
|---|---|
| Windows 10/11 | `ArefiITPraxis-Setup-2.3.1.exe` |
| macOS 11+ | `ArefiITPraxis-2.3.1-macOS.zip` |
| Ubuntu/Debian | `arefi-itpraxis_2.3.1_amd64.deb` (ARM: `_arm64.deb`) |
| andere Linux | `arefi-itpraxis-2.3.1-linux-amd64.tar.gz` |
