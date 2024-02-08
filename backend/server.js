

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank: ' + err.message);
        return;
    }
    console.log('Erfolgreich mit der Datenbank verbunden');
});

app.get('/', (req, res) => {
    res.send('Willkommen auf meinem Server!');
});
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
app.post('/save', async (req, res) => {
  const { Rezeptname, Anzahl, Kategorie, Eigenangabe, Zutaten, Zubereitung, Tips } = req.body;

  if (!Rezeptname || !Zutaten || Zutaten.length === 0) {
      return res.status(400).send('Fehlende Daten: Rezeptname und Zutaten sind erforderlich.');
  }

  try {
      await db.beginTransaction();

      const rezeptResult = await queryDatabase('INSERT INTO rezepte (rezeptname, anzahl, kategorien, eigenangabe, zubereitung, tips) VALUES (?, ?, ?, ?, ?, ?)', [Rezeptname, Anzahl, Kategorie, Eigenangabe, Zubereitung, Tips]);
      const rezeptId = rezeptResult.insertId;

      if (!rezeptId) {
          throw new Error('Rezept-ID konnte nicht erstellt werden.');
      }

      for (const zutat of Zutaten) {
          if (!zutat.zutat || !zutat.menge || !zutat.mengeneinheit) {
              throw new Error('Unvollständige Zutateninformationen.');
          }

          await queryDatabase('INSERT INTO zutaten (rezept_id, zutat, menge, mengeneinheit) VALUES (?, ?, ?, ?)', [rezeptId, zutat.zutat, zutat.menge, zutat.mengeneinheit]);
      }

      await db.commit();
      res.status(200).send('Rezept und Zutaten erfolgreich gespeichert');
  } catch (err) {
      console.error('Fehler beim Speichern des Rezepts:', err);
      await db.rollback();
      res.status(500).send('Fehler beim Speichern des Rezepts: ' + err.message);
  }
});





//  get req

app.get('/get-cooking-save', async (req, res) => {
  try {
      const rezepte = await queryDatabase('SELECT * FROM rezepte', []);

      for (const rezept of rezepte) {
          const zutaten = await queryDatabase('SELECT * FROM zutaten WHERE rezept_id = ?', [rezept.id]);
          rezept.Zutaten = zutaten;
      }

      res.status(200).json(rezepte);
  } catch (err) {
      console.error('Fehler beim Abrufen der Rezepte:', err);
      res.status(500).send('Fehler beim Abrufen der Rezepte: ' + err.message);
  }
});







app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
