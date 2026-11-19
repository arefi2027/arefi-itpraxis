## Arefi ITPraxis 2.16.4 (Vorabversion · Pilotfassung)

**Deutsch**
- **Ausbildung:** neuer dreisprachiger 25-Minuten-Praxisauftrag „Teamfreigabe nicht erreichbar“ (Startseite) mit Beispielbefunden, begründetem nächsten Schritt, Ticketübergabe und Bewertungsraster – ohne VM nutzbar.
- **Lernstand:** Der Import fragt vor dem Überschreiben nach und behält den bisherigen Stand bei einem Speicherfehler. Tastatursprung zum Hauptinhalt lässt die Ansicht geöffnet.
- **Sicherheit Desktop:** Die lokale API prüft HTTP-Methode, Sitzung und Herkunft; JSON-Anfragen sind begrenzt. Updates laufen nur einmal gleichzeitig, mit strengerer Prüfung von Version, Weiterleitungen und Download-Größe; Signatur- und SHA-256-Prüfung bleiben Pflicht.
- **Stabilität:** Desktop-Oberfläche, KI-Status und Lebenszeichen funktionieren auch auf dem Ausweichport. Der Offline-Speicher der Web-App enthält nur noch die mitgelieferten App-Dateien; alte Zwischenspeicher werden entfernt.

**فارسی**
- تمرین عملی ۲۵ دقیقه‌ای سه‌زبانه در صفحهٔ شروع، تأیید پیش از جایگزینی پیشرفت، امنیت بیشتر API محلی و به‌روزرسانی، کار روی پورت جایگزین.

**English**
- New 25-minute practice assignment on the start page, safer progress import, hardened local API and updates, fallback-port support.
