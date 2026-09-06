# Kurs-Relay für Schüler ohne GitHub-Konto

Dieser Pilot hält Git und GitHub als Lernziel sichtbar, ohne dem Schüler GitHub-Zugangsdaten zu geben.

## Rollen

- **Schüler:** wählt ein Pseudonym, verändert eine Datei, sieht den lokalen Diff und formuliert die Commit-Nachricht.
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

# 5. Review und Merge in der vom Lehrer bedienten GitHub-Ansicht besprechen.

# 6. Danach den lokalen Worktree und Branch entfernen.
node teacher/course-relay.mjs cleanup --workspace <ausgegebenes-workspace>
```

## Sicherheits- und Plattformgrenzen

- `prepare` erzeugt pro Einreichung einen eindeutigen Branch unter `relay/`.
- `submit` verweigert `main`, detached HEADs und Branches außerhalb von `relay/`.
- Pseudonym und Branch müssen zusammenpassen.
- Vor Commit und Push muss `npm test` erfolgreich sein.
- Prozessaufrufe verwenden Argumentlisten statt Shell-Strings.
- Der Relay speichert einen lokalen JSON-Receipt unter `~/.local/share/vibe-coding-kurs-relay/receipts/`.
- GitHub-Credentials werden nicht als Argument, Datei im Projekt oder Schülergeheimnis übergeben; der Relay nutzt die bereits autorisierte Lehrerumgebung.
- Schüler unter 13 bedienen oder besuchen `github.com` nicht selbst. Nach den aktuellen GitHub-Nutzungsbedingungen gilt die Mindestaltergrenze auch für Besucher der Website, nicht nur für persönliche Accounts.
- Für unter 13 zeigt der Lehrer den echten GitHub-PR über seine eigene autorisierte Ansicht, zum Beispiel am Beamer. Der Schüler bedient weiterhin Änderung, Diff und Commit-Nachricht im lokalen Kursarbeitsplatz.
- Wenn Schüler unter 13 eine PR-Oberfläche selbst anklicken sollen, braucht der Kurs dafür eine eigene Forge wie Forgejo; GitHub bleibt dann Lehrer-/Mirror-Ziel.

## Was der Schüler dabei lernt

1. **Repository:** das Projekt mit Versionsgedächtnis.
2. **Diff:** genau diese Zeilen habe ich verändert.
3. **Commit:** mein benannter Zwischenstand.
4. **Branch:** mein eigener Arbeitsweg, getrennt von `main`.
5. **Pull Request:** mein Vorschlag an das Hauptprojekt.
6. **Review:** jemand prüft Änderung und Tests.
7. **Merge:** erst danach wird die Änderung Teil von `main`.

## Bewusste Grenze des Piloten

Der Schüler unter 13 bedient GitHub nicht selbst. Das ist Absicht: die GitHub-Nutzung übernimmt die kontrollierte Lehreridentität. Der echte GitHub-Branch und Pull Request bleiben als Lernobjekt erhalten und werden in der Lehreransicht gemeinsam besprochen. Für eine eigene klickbare Forge-Erfahrung der Schüler ist Forgejo der passende nächste Ausbaupfad.
