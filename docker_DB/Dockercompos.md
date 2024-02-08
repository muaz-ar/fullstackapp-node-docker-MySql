# Docker Compose und Initialisierungsskript Erklärung

-------- docker-compose up -d

## `docker-compose.yml`

Diese Datei definiert und konfiguriert Docker-Services für unser Projekt. In diesem Fall definieren wir einen Service für unsere MySQL-Datenbank.

```yaml
version: '3.1'  # Definiert die Version der Docker-Compose-Syntax.

services:  # Beginn der Service-Definitionen.
  mysql:  # Der Name unseres Services.
    image: mysql:5.7  # Das Docker-Image, das verwendet wird. Hier nutzen wir MySQL Version 5.7.
    container_name: mysql-cooking  # Der Name des zu erstellenden Containers.
    environment:  # Umgebungsvariablen, die im Container gesetzt werden.
      MYSQL_ROOT_PASSWORD: my-secret-pw  # Das Root-Passwort für den MySQL-Server.
      MYSQL_USER: muhammed  # Ein benutzerdefinierter MySQL-Benutzer, der erstellt wird.
      MYSQL_PASSWORD: fürTestzweckeEinfachHalten  # Das Passwort für den benutzerdefinierten MySQL-Benutzer.
      MYSQL_DATABASE: mydbs  # Der Name der zu erstellenden MySQL-Datenbank.
    ports:  # Port-Mapping zwischen dem Host und dem Container.
      - "3306:3306"  # Der MySQL-Port (3306) wird auf den gleichen Port auf dem Host gemappt.
    volumes:  # Volumes, um Daten persistent zu speichern und Konfigurationen zu teilen.
      - ./init-db.sql:/docker-entrypoint-initdb.d/init-db.sql  # Bindet das Initialisierungsskript in den Container ein.
      - mysql-data:/var/lib/mysql  # Bindet ein benanntes Volume für die Datenbankdaten.

volumes:
  mysql-data:  # Definition eines benannten Volumes zur persistenten Speicherung der Datenbankdaten. Docker kümmert sich selber um die Verwaltung und Speicherung der Daten.wenn du jedoch die Daten in einem spezifischen Verzeichnis auf deinem Host-System speichern möchtest, kannst du statt eines benannten Volumes einen Bind-Mount verwenden z.B:  /pfad/auf/deinem/host:/var/lib/mysql

CREATE DATABASE IF NOT EXISTS mydbs;  # Erstellt die Datenbank 'mydbs', falls sie noch nicht existiert.
USE mydbs;  # Wechselt zur Datenbank 'mydbs'.

CREATE TABLE IF NOT EXISTS rezepte (  # Erstellt die Tabelle 'rezepte', falls sie noch nicht existiert.
    id INT AUTO_INCREMENT PRIMARY KEY,  # Eine automatisch inkrementierende ID als Primärschlüssel.
    rezeptname VARCHAR(255) NOT NULL,  # Eine Spalte für den Namen des Rezepts.
    anzahl INT,  # Eine Spalte für die Anzahl (z.B. Portionen).
    kategorien VARCHAR(255),  # Eine Spalte für Kategorien.
    eigenangabe VARCHAR(255),  # Eine Spalte für benutzerdefinierte Angaben.
    zubereitung TEXT,  # Eine Spalte für die Zubereitungsanleitung.
    tips TEXT  # Eine Spalte für zusätzliche Tipps.
);

CREATE TABLE IF NOT EXISTS zutaten (  # Erstellt die Tabelle 'zutaten', falls sie noch nicht existiert.
    id INT AUTO_INCREMENT PRIMARY KEY,  # Eine automatisch inkrementierende ID als Primärschlüssel.
    rezept_id INT,  # Eine Spalte, die die ID aus der Tabelle 'rezepte' referenziert.
    zutat VARCHAR(255),  # Eine Spalte für den Namen der Zutat.
    menge VARCHAR(255),  # Eine Spalte für die Menge der Zutat.
    mengeneinheit VARCHAR(255),  # Eine Spalte für die Maßeinheit der Menge.
    FOREIGN KEY (rezept_id) REFERENCES rezepte(id)  # Ein Fremdschlüssel, der die Verbindung zur Tabelle 'rezepte' herstellt.
);
