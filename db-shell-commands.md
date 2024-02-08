# Einloggen in die mySql auf docker 
- docker exec -it [Container-Name oder ID] mysql -u [Benutzername] -p

- **einsehen wo man ist** 
- SHOW DATABASES;

# SQL-abfrage wie viele tabellen es gibt 
- SELECT COUNT(*) 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'mydbs';

# SQL-abfrage Liste der Tabellen und ihre Struktur
- SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'mydbs';

# SQL-abfrage ob Tabelle Daten enthalten 
 - SELECT COUNT(*) FROM mydbs.TabellenName

# SQL-Abfrage Primärschlüssel und Fremdschlüssel-Informationen
 -  SELECT TABLE_NAME, COLUMN_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'mydbs' AND CONSTRAINT_NAME = 'PRIMARY';

# SQL-Abfrage Für Fremdschlüssel
 -  SELECT TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'mydbs' AND REFERENCED_TABLE_NAME IS NOT NULL;

# SQL-Abfrage Spaltenabfrage 
 -  SHOW COLUMNS FROM mydbs.zutaten;
 -  DESCRIBE mydbs.zutaten;

# SQL-Abfrage inhalt Tabelle nach spalten 
 - SELECT zutat, menge, mengeneinheit FROM mydbs.zutaten;
 - SELECT zutat, menge, mengeneinheit FROM mydbs.zutaten WHERE rezept_id = <Ihre Rezept-ID>;



# INFORMATION_SCHEMA SAchen die enthalten sind

1. **Tabelleninformationen**: 
   - `TABLES`: Informationen über alle Tabellen in allen Datenbanken.
   - `COLUMNS`: Details zu den Spalten in allen Tabellen, wie Datentyp, ob NULL erlaubt ist, Standardwerte usw.
   - `STATISTICS`: Informationen über Indexe auf Tabellen.

2. **Datenbank und Schema Informationen**:
   - `SCHEMATA`: Informationen über die vorhandenen Datenbanken (Schemas) auf dem Server.

3. **Benutzer- und Zugriffsrechte**:
   - `USER_PRIVILEGES`, `SCHEMA_PRIVILEGES`, `TABLE_PRIVILEGES`: Informationen über Benutzerberechtigungen auf verschiedenen Ebenen.

4. **Ansichten (Views)**:
   - `VIEWS`: Informationen über die definierten Views in der Datenbank.

5. **Routinen (Stored Procedures und Functions)**:
   - `ROUTINES`: Details über gespeicherte Routinen, einschließlich Stored Procedures und Functions.

6. **Trigger**:
   - `TRIGGERS`: Informationen über die definierten Trigger in den Datenbanken.

7. **Referentielle Integrität und Schlüssel**:
   - `KEY_COLUMN_USAGE` und `REFERENTIAL_CONSTRAINTS`: Informationen über Schlüsselverwendungen und referentielle Integritätsbedingungen.

8. **Weitere Metadaten**:
   - `CHARACTER_SETS`, `COLLATIONS`: Informationen über Zeichensätze und Kollationen.
   - `ENGINES`: Informationen über die verfügbaren Storage Engines.

Um auf diese Informationen zuzugreifen, verwenden Sie die üblichen `SELECT`-Abfragen. Zum Beispiel, um Informationen über alle Tabellen zu erhalten:

```sql
SELECT * FROM INFORMATION_SCHEMA.TABLES;
```

Beachten Sie, dass der Zugriff auf `INFORMATION_SCHEMA` von Ihren Benutzerberechtigungen abhängt. Einige Informationen sind möglicherweise nicht verfügbar, wenn Ihr Benutzerkonto nicht über die erforderlichen Rechte verfügt.


links : 
Dimitri Tarasowski14:28
https://kamal-deploy.org/
Dimitri Tarasowski14:29
https://github.com/tarasowski/aws-kamal-deploy
Dimitri Tarasowski14:40
https://www.creative-tim.com/templates/nextjs