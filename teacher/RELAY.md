# Kurs-Relay für Schüler ohne GitHub-Konto

Dieser Pilot hält GitHub als Lernziel sichtbar, ohne dem Schüler GitHub-Zugangsdaten zu geben.

## Rollen

- **Schüler:** wählt ein Pseudonym, verändert eine Datei, sieht den Diff und formuliert die Commit-Nachricht.
- **Lehrer-Relay:** hält allein die GitHub-/SSH-Berechtigung und führt `submit` aus.
- **GitHub:** enthält für jede Einreichung einen eigenen `relay/...`-Branch und einen normalen Pull Request.

Es gibt keine geteilten Passwörter, keine Schüler-PATs und keinen Direct-Push auf `main`.

## Ablauf

```bash
# 1. Ein isoliertes Arbeitsverzeichnis anlegen
node teacher/course-relay.mjs prepare --student fuchs-7

# 2. Der Schüler verändert dort das Projekt.

# 3. Diff gemeinsam ansehen
node teacher/course-relay.mjs preview --workspace <ausgegebenes-workspace>

# 4. Der Schüler wählt den Committext; das Lehrer-Relay testet, committet,
#    pusht nur den Schülerbranch und öffnet einen Pull Request.
node teacher/course-relay.mjs submit \
  --student fuchs-7 \
  --workspace <ausgegebenes-workspace> \
  --message "Neue Pausen-Idee hinzufügen"

# 5. Nach Review/Merge den lokalen Worktree entfernen
node teacher/course-relay.mjs cleanup --workspace <ausgegebenes-workspace>
```

## Sicherheitsgrenzen

- `prepare` erzeugt pro Einreichung einen eindeutigen Branch unter `relay/`.
- `submit` verweigert `main`, detached HEADs und Branches außerhalb von `relay/`.
- Pseudonym und Branch müssen zusammenpassen.
- Vor Commit und Push muss `npm test` erfolgreich sein.
- Prozessaufrufe verwenden Argumentlisten statt Shell-Strings.
- Der Relay speichert einen lokalen JSON-Receipt unter `~/.local/share/vibe-coding-kurs-relay/receipts/`.
- GitHub-Credentials werden nicht als Argument, Datei im Projekt oder Schülergeheimnis übergeben; der Relay nutzt die bereits autorisierte Lehrerumgebung.

## Was der Schüler dabei lernt

1. **Repository:** das Projekt mit Versionsgedächtnis.
2. **Diff:** genau diese Zeilen habe ich verändert.
3. **Commit:** mein benannter Zwischenstand.
4. **Branch:** mein eigener Arbeitsweg, getrennt von `main`.
5. **Pull Request:** mein Vorschlag an das Hauptprojekt.
6. **Review:** jemand prüft Änderung und Tests.
7. **Merge:** erst danach wird die Änderung Teil von `main`.

## Bewusste Grenze des Piloten

Der Schüler bedient die GitHub-Schreiboberfläche nicht selbst. Das ist Absicht: die persönliche GitHub-Identität wird durch den kontrollierten Lehrer-Relay ersetzt. Der resultierende öffentliche Pull Request bleibt für den Schüler im Browser sichtbar und besprechbar.
