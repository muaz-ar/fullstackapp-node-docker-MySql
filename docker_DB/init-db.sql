

CREATE DATABASE IF NOT EXISTS mydbs;
USE mydbs;

CREATE TABLE IF NOT EXISTS rezepte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rezeptname VARCHAR(255) NOT NULL,
    anzahl INT,
    kategorien VARCHAR(255),
    eigenangabe VARCHAR(255),
    zubereitung TEXT,
    tips TEXT
);

CREATE TABLE IF NOT EXISTS zutaten (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rezept_id INT,
    zutat VARCHAR(255),
    menge VARCHAR(255),
    mengeneinheit VARCHAR(255),
    FOREIGN KEY (rezept_id) REFERENCES rezepte(id)
);
