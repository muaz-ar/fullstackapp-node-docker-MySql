
# Erklärung des modifizierten Server-Codes

## Überblick

Der Server-Code wurde modifiziert, um die `mysql`-Datenbankabfragen mit Promises zu verwenden, anstatt die Standard-Callback-Struktur zu nutzen. Dies ermöglicht die Verwendung von `async` und `await` für asynchrone Operationen, was den Code lesbarer und einfacher zu verwalten macht.

## Hilfsfunktion `queryDatabase`

Die Funktion `queryDatabase` wurde hinzugefügt, um die `mysql`-Abfragen in Promises zu kapseln. Sie nimmt eine SQL-Abfrage und die dazugehörigen Parameter entgegen und gibt ein Promise zurück, das bei erfolgreicher Ausführung das Ergebnis der Abfrage liefert oder bei einem Fehler einen Fehler wirft.

### Code
```javascript
function queryDatabase(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
```

## Route-Handler-Änderungen

### POST /save

Dieser Handler nimmt Rezeptdaten entgegen und speichert sie in der Datenbank. Zuerst wird ein Eintrag in der Tabelle `rezepte` erstellt, und anschließend werden zugehörige `zutaten`-Einträge erstellt.

#### Wichtige Aspekte:
- `beginTransaction`: Startet eine Transaktion, um die Integrität der Daten zu gewährleisten.
- `queryDatabase`: Wird verwendet, um die SQL-Insert-Befehle auszuführen.
- `commit`: Bestätigt die Transaktion, wenn keine Fehler aufgetreten sind.

### GET /get-cooking-save

Dieser Handler holt alle Rezepte aus der Datenbank und fügt jedem Rezept seine zugehörigen Zutaten hinzu.

#### Wichtige Aspekte:
- Abfragen der `rezepte`-Tabelle.
- Hinzufügen der Zutaten zu jedem Rezept durch Abfragen der `zutaten`-Tabelle mit der jeweiligen `rezept_id`.

## Abschließende Bemerkungen

Durch die Verwendung von Promises und `async`/`await` wird der Code einfacher zu verstehen und zu warten. Fehlerbehandlung und Datenbanktransaktionen werden effektiver und sicherer gehandhabt.
