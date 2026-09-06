# Erste Stunde: Vibe-Coding mit Kids

Stand: 2026-09-06

Dieses Dokument ist der reale Unterrichtspfad für den Starter `Pausen-O-Mat`. Es trennt bewusst zwischen bereits bewiesenen Wegen und Providerwegen, die vor dem Unterricht noch ein Freigabegate brauchen.

## 1. Technischer Freigabestatus

| Baustein | Status | Für Stunde 1 |
| --- | --- | --- |
| Starterrepo + `npm test` | **BEWIESEN** | Ja |
| GitHub Branch → PR → Review → Merge | **BEWIESEN** | Ja, ab 13 direkt; unter 13 nur lehrergeführt |
| Unter-13-Kurs-Relay | **BEWIESEN** | Ja |
| Bolt: öffentliches GitHub-Repo importieren | **BEWIESEN** | Nur Teilbeweis |
| Bolt: echter Prompt → Änderung → GitHub | **NOCH NICHT BEWIESEN** | Erst nach Lehrer-Preflight freigeben |
| cto.new: Issue → Agent → PR | **NOCH NICHT BEWIESEN** | Nein, spätere Stunde |
| Forgejo für eigene Unter-13-PR-Oberfläche | **OPTIONAL / NICHT UMGESETZT** | Nur falls die Schüler selbst eine Forge bedienen sollen |

Wichtig: Schüler unter 13 bedienen oder besuchen `github.com` nicht selbst. GitHub bleibt in diesem Pfad ein reales Lernobjekt, das der Lehrer über seine eigene autorisierte Ansicht zeigt. Wenn Schüler unter 13 eine eigene klickbare Branch-/PR-/Review-Oberfläche brauchen, ist eine eigene Forge wie Forgejo der passende Ausbaupfad.

## 2. Lehrer-Vorbereitung

### Muss vor der Stunde funktionieren

- [ ] Starter lokal öffnen: `/home/alex/repos/vibe-coding-kurs-starter`
- [ ] `git status` ist sauber auf `main`.
- [ ] `npm test` ist grün.
- [ ] Starter-Link griffbereit halten.
- [ ] Für Schüler ab 13: persönliche GitHub-Konten vorhanden, falls sie GitHub selbst benutzen sollen. Keine Klassenlogins und keine geteilten Passwörter.
- [ ] Für Schüler unter 13: Pseudonyme vorbereiten, zum Beispiel `fuchs-7`, `otter-3`, `pixel-9`.
- [ ] Unter-13-Relay einmal mit einem Testpseudonym durchspielen: `prepare → preview → submit → PR → Review/Merge → cleanup`.
- [ ] Lehrer-GitHub-Ansicht am Beamer öffnen können.

### Bolt-Freigabegate

Bolt wird für direkte Schülerarbeit **erst dann** als grüner Weg markiert, wenn der Lehrer vor dem Kurs einmal genau diesen E2E mit dem aktuellen Starter bewiesen hat:

1. aktuelles Starterrepo in Bolt öffnen;
2. anmelden;
3. einen kleinen natürlichen Prompt absenden, der nicht Issue #1 umsetzt;
4. Änderung in Preview und Diff prüfen;
5. Tests prüfen;
6. eigenen Branch/Commit/PR auf GitHub zurücklesen;
7. kein Direct-Push auf `main`.

Bis dieser Beweis vorliegt, ist Bolt ein geplanter, aber nicht freigegebener Schülerpfad.

### cto.new-Freigabegate

cto.new gehört **nicht in Stunde 1**. Erst später einsetzen, wenn Issue #1 tatsächlich einen cto-Agentenlauf und einen echten GitHub-PR erzeugt hat und dieser PR geprüft wurde.

## 3. Zwei Alterswege

### Weg A — Schüler ab 13

Gilt, wenn persönliche GitHub-Nutzung nach den aktuellen Plattformregeln zulässig ist und das Bolt-Freigabegate grün ist.

1. Starter öffnen.
2. Projekt in Bolt öffnen.
3. Eine sehr kleine Idee in normaler Sprache formulieren.
4. Ergebnis ausprobieren.
5. Diff ansehen: „Welche Zeilen hat die KI wirklich geändert?“
6. Änderung mit einem kurzen Satz benennen.
7. Eigenen Branch/PR auf GitHub ansehen.
8. Gemeinsam prüfen und erst dann mergen.

Wenn Bolt vor dem Unterricht nicht grün ist: nicht improvisieren oder so tun, als sei die Integration bewiesen. Dann dieselbe Git-Lerneinheit mit dem lokalen Starter durchführen und Bolt auf die nächste Stunde verschieben.

### Weg B — Schüler unter 13

GitHub wird nicht vom Schüler selbst benutzt. Der Schüler besitzt trotzdem die fachlich wichtigen Entscheidungen.

1. Der Lehrer erzeugt mit dem Relay einen isolierten Arbeitsweg für das Pseudonym.
2. Der Schüler entscheidet eine kleine Änderung.
3. Die Änderung wird im Kursarbeitsplatz umgesetzt.
4. Der Schüler sieht den **lokalen Diff** und erklärt, was sich geändert hat.
5. Der Schüler wählt die **Commit-Nachricht**.
6. Das Lehrer-Relay führt Tests aus und überträgt nur diesen Arbeitszweig zu GitHub.
7. Der Lehrer zeigt den echten GitHub-PR am Beamer.
8. Die Gruppe reviewt den Diff und entscheidet: übernehmen oder ändern?
9. Der Lehrer mergt nur bei grünem Ergebnis.

So bleibt GitHub real, ohne dem Schüler eine unzulässige GitHub-Identität oder geteilte Credentials zu geben.

## 4. Schülerpfad: maximal einfach

Die Schüler bekommen am Anfang **keine Git-Vorlesung**. Sie bekommen eine sichtbare Aufgabe:

> „Füge dem Pausen-O-Mat genau eine eigene Pausen-Idee hinzu. Danach finden wir heraus, was dein Computer sich über diese Änderung merken kann.“

Dann nur diese Schritte:

1. **Idee sagen oder schreiben.** Zum Beispiel: „Füge 🪁 Drachen-Idee hinzu.“
2. **Änderung ansehen.** Funktioniert sie?
3. **Unterschied ansehen.** Welche Zeile ist neu?
4. **Änderung benennen.** Zum Beispiel: `Neue Pausen-Idee hinzufügen`.
5. **Eigenen Arbeitsweg sehen.** Das ist der Branch.
6. **Vorschlag prüfen.** Das ist der Pull Request.
7. **Übernehmen oder verbessern.** Das ist Review und Merge.

## 5. Begriffe für Kinder

- **Repository:** unser Projektordner mit Gedächtnis.
- **Issue:** eine Aufgabenkarte: Was wollen wir verändern?
- **Diff:** die genaue Vorher-Nachher-Liste der geänderten Zeilen.
- **Commit:** ein gespeicherter Zwischenstand mit Namen.
- **Branch:** dein eigener Arbeitsweg, auf dem du nichts am Hauptprojekt kaputtmachen musst.
- **Pull Request:** dein Vorschlag: „Bitte schaut euch meine Änderung an und übernehmt sie, wenn sie gut ist.“
- **Review:** wir schauen gemeinsam, ob die Änderung sinnvoll und sauber ist.
- **Merge:** die geprüfte Änderung wird Teil des Hauptprojekts.
- **Test:** ein automatischer Prüfer. „Die KI sagt fertig“ zählt nicht; ein grüner Test ist zusätzliche Evidenz.

## 6. Ablauf für 60 Minuten

### 0–8 Minuten — Sofort etwas Sichtbares

- Pausen-O-Mat öffnen.
- Zwei- oder dreimal auslosen.
- Frage: „Was würdet ihr daran verändern?“
- Noch keine Git-Begriffe erklären.

**Ziel:** Jeder versteht das Produkt, bevor Technikbegriffe kommen.

### 8–20 Minuten — Eine winzige eigene Idee

Jeder wählt genau **eine** kleine Änderung. Für die erste Stunde bevorzugt:

- eine neue Pausen-Idee;
- einen kurzen Hilfetext;
- eine kleine sichtbare Textverbesserung.

Nicht in Stunde 1: Login, Datenbank, komplizierte APIs, große Spiele oder Issue #1 mit Zähler+Reset.

### 20–30 Minuten — KI-Ergebnis ist nur ein Vorschlag

- Änderung ausprobieren.
- Dann den Diff zeigen.
- Frage: „Hat die KI nur das verändert, was wir wollten?“
- Tests laufen lassen.

Hier das reale Unterrichtsmotiv verwenden: Der Starter hatte bereits einmal den Fehler `document is not defined`. Erst der Test hat gezeigt, dass „fertig“ nicht wirklich fertig war.

### 30–40 Minuten — Der Computer bekommt Gedächtnis

- Schüler formuliert eine Commit-Nachricht.
- Commit erklären, aber nur an diesem konkreten Zwischenstand.
- Branch als „dein Arbeitsweg“ erklären.

### 40–52 Minuten — Vorschlag statt Überschreiben

- PR zeigen.
- Diff im PR gemeinsam lesen.
- Mindestens eine echte Review-Frage stellen:
  - Ist nur das Gewünschte geändert?
  - Läuft der Test?
  - Ist der Text verständlich?

Unter 13 zeigt und bedient der Lehrer die GitHub-Ansicht. Ab 13 kann der Schüler seinen eigenen PR bedienen, wenn die Konten und der Unterrichtsweg dafür freigegeben sind.

### 52–60 Minuten — Merge und Rückblick

- Nur einen geprüften PR mergen.
- Hauptversion neu öffnen.
- Drei Fragen:
  1. Was war unser Diff?
  2. Warum hatten wir einen Branch?
  3. Warum haben wir nicht einfach direkt `main` überschrieben?

Wenn die Gruppe das beantworten kann, war die Stunde erfolgreich. Mehr Git-Theorie ist in Stunde 1 nicht nötig.

## 7. Lehrer-Klickpfad unter 13

```bash
# Arbeitsweg anlegen
node teacher/course-relay.mjs prepare --student fuchs-7

# Nach der Schüleränderung den Diff zeigen
node teacher/course-relay.mjs preview --workspace <workspace>

# Schüler nennt selbst die Commit-Nachricht; Lehrer löst die kontrollierte Übertragung aus
node teacher/course-relay.mjs submit \
  --student fuchs-7 \
  --workspace <workspace> \
  --message "Neue Pausen-Idee hinzufügen"

# Nach Review und Merge aufräumen
node teacher/course-relay.mjs cleanup --workspace <workspace>
```

Der Relay verweigert `main`, detached HEADs und fremde Branches, testet vor Commit/Push und erzeugt einen Receipt. Schülercredentials gehören nicht in diesen Ablauf.

## 8. Fallbacks

### Bolt funktioniert vor der Stunde nicht vollständig

Nicht während der Stunde OAuth debuggen. Für diese Stunde:

- Starter lokal verwenden;
- kleine Änderung und Diff erklären;
- ab 13 GitHub direkt oder unter 13 den Relay verwenden;
- Bolt-E2E separat schließen und erst danach als Schülerweg freigeben.

### Ein Schüler unter 13 soll unbedingt selbst PR/Review klicken

Nicht auf GitHub ausweichen. Stattdessen eigene Forge, vorzugsweise Forgejo, als Schüleroberfläche bereitstellen und GitHub nur als Lehrer-/Mirror-Ziel behalten. Dieser Ausbau ist noch nicht umgesetzt.

### KI erzeugt Unsinn

Das ist Unterrichtsmaterial, kein Unfall:

1. Diff lesen;
2. Test lesen;
3. Problem in einem Satz formulieren;
4. KI gezielt korrigieren lassen;
5. erneut testen.

## 9. Noch nicht freigegebene Erweiterungen

### Bolt Shared Projects

Plausibler Vereinfachungspfad: Lehrer besitzt Projekt und GitHub-Verknüpfung; Schüler arbeitet als eingeladener Mitarbeiter; der Besitzer synchronisiert GitHub. Technisch unterstützt Bolt Shared Projects. **Für unter 13 ist dieser Weg aber erst freizugeben, wenn die Account-/Alterszulässigkeit des Providers ausdrücklich geklärt und der Klassen-E2E praktisch bewiesen wurde.**

### cto.new

Spätere Unterrichtsidee: Ein echtes GitHub-Issue wird zum Agentenauftrag. Danach prüfen die Schüler den entstandenen PR wie die Arbeit eines sehr schnellen, aber nicht automatisch vertrauenswürdigen Teammitglieds.

Issue #1 bleibt dafür der vorgesehene reproduzierbare Testfall: Zähler + Reset.

## 10. Definition von „bereit für Unterricht“

Der Stack ist für einen Weg nur dann grün, wenn alle Punkte dieses Weges live bewiesen wurden:

- aktuelle Quelle/Projekt öffnet;
- Auth funktioniert;
- echte Änderung entsteht;
- Diff ist sichtbar;
- Tests sind grün;
- Branch/Commit-Zuordnung stimmt;
- PR existiert wirklich;
- Review erfolgt;
- Merge nur nach Prüfung;
- Post-Merge-Readback ist sauber;
- keine geteilten Credentials;
- unter 13 keine eigene GitHub-Nutzung.

Providerdokumentation allein macht einen Unterrichtspfad nicht grün.
