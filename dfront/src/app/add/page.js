//  /src/app/components/addsome/Addsome.js

import Input from "../components/input/Input";
import React, { useState } from 'react'




export default function Addsome() {
  const smain = { border: "2px solid blue", padding: "1rem" };
  const sli = {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    flexWrap: "wrap", 
  };
  const sbu = {
    padding: '10px 20px', // Anpassen Sie die Größe und das Padding nach Bedarf
    fontSize: '16px',
    borderRadius: '10px', // Dies setzt die abgerundeten Ecken
    backgroundColor: 'blue', // Ändern Sie die Hintergrundfarbe nach Bedarf
    color: 'white', // Ändern Sie die Textfarbe nach Bedarf
    border: 'none', // Entfernt die Standard-Rahmen
    cursor: 'pointer', /*Ändert den Mauszeiger auf einen Zeiger, um anzuzeigen, dass es klickbar ist */ 
  };
  const slik = { flex: 1 };
  const smi = { marginLeft: "0.5rem", flex: 1 };
  const sre = {
    padding: "0.4rem",
    backgroundColor: "grey",
    marginLeft: "0.5rem",
  };
  const sput = {
    padding: "0.4rem",
    borderRadius: "10px",
    fontSize: "1rem",
    backgroundColor: "white",
    marginLeft: "0.8rem",
  };
  const sno = {
    width: "50%",
    marginLeft: "2rem",
    padding: "40px",
    fontSize: "16px",
    border: "2px solid grey",
    borderRadius: "25px",
    marginBottom: "25px",
  };

  const [rezeptName, setRezeptName] = useState("");
  const [anzahl, setAnzahl] = useState("");
  const [kategorie, setKategorie] = useState("");
  const [alternativeingabe, setAlternativEingabe] = useState("");
  const [zutatenListe, setZutatenListe] = useState([{ zutat: "", menge: "", mengeneinheit: "" }]);
  const [zubereitung, setZubereitung] = useState("");
  const [tips, setTips] = useState("");
 
  const handleWeiteresHinzufuegen = () => {
    setZutatenListe([...zutatenListe, { zutat: "", menge: "", mengeneinheit: "" }]);
  };
  const handleEingabeAendern = (index, newValue, field) => {
    const neueZutatenListe = [...zutatenListe];
    neueZutatenListe[index][field] = newValue;
    setZutatenListe(neueZutatenListe);
  };
  //async await für routing endpoint und api
  const handlespeichersendenenClick = async () => {
    try{
      const response = await fetch('http://localhost:3000/speichern', {
        method: "POST",
        headers:{ 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({Rezeptname: rezeptName,
                              Anzahl: anzahl, 
                              Kategorie: kategorie, 
                              Eigenangabe: alternativeingabe,
                              Zutaten: zutatenListe,
                              Zubereitung: zubereitung,
                              Tips: tips
                            }),
          });
        if(response.ok){
          console.log("Eingabe gespeichert");
          window.location.href = "/";
        }else {
          console.error("Fehler beim Speichern", response.status);
        }
    }
    catch (error) {
      console.error('DAtei konnte nicht verschickt werden async function', error);
    }
  }

  return (
    <div style={smain}>
      <div style={sli}>
        <Input
          label="Rezeptname:"
          value={rezeptName}
          onChange={(e) => setRezeptName(e.target.value)}
        />
      </div>
      <div style={{ ...sli, display: "flex", alignItems: "center" }}>
        <span>Zutaten für:</span>
        <select
          style={sput}
          value={anzahl}
          onChange={(e) => setAnzahl(e.target.value)}
        >
          {Array.from({ length: 30 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <select
          style={sput}
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
        >
          <option>Personen</option>
          <option>Portionen</option>
          <option>Stück</option>
        </select>

        <Input
          placeholder="Eigene Angabe"
          value={alternativeingabe}
          onChange={(e) => setAlternativEingabe(e.target.value)}
        />
        <p style={sput}>
          Sie können entweder die fertige Auswahl treffen oder die Vorlage nutzen
        </p>
      </div>
      <div style={sli}>
        {zutatenListe.map((item, index) => (
        <div key={index} style={{ ...slik, display: "flex", alignItems: "center", height: "50px" }}>
          <div className="EinzelneZutaten" style={{ flex: 1, height: "100%" }}>
            <Input
              label="Zutat"
              placeholder="Zutaten"
              value={item.zutat}
              onChange={(e) => handleEingabeAendern(index, e.target.value, "zutat")}
              style={{ ...slik, height: "100%" }}
            />
          </div>
          <div style={{ marginLeft: "0.5rem", flex: 1, height: "100%" }}>
            <Input
              label="Menge"
              placeholder="Menge"
              value={item.menge}
              onChange={(e) => handleEingabeAendern(index, e.target.value, "menge")}
              style={{ ...smi, height: "100%" }}
            />
          </div>
          <div style={{ marginLeft: "0.5rem", flex: 1, height: "100%" }}>
            <select
              style={sput}
              value={item.mengeneinheit}
              onChange={(e) => handleEingabeAendern(index, e.target.value, "mengeneinheit")}
            >
              <option value="">Einheit wählen</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="TL">TL</option>
              <option value="EL">EL</option>
            </select>
          </div>
          {index === zutatenListe.length - 1 && (
            <button
              style={sbu}
              onClick={handleWeiteresHinzufuegen}
            >
              ADD more
            </button>
          )}
        </div>
        ))}
      </div>
      <div>
        <span>Zubereitung: </span>
        <textarea style={sno} placeholder='- 1 Esslöfflen Löffel' type="text"
                   value={zubereitung}
                   onChange={(e) => setZubereitung(e.target.value)} 
        ></textarea>
      </div>
      <div>
        <span>Tipps Tricks: </span>
        <textarea style={sno} placeholder='tips und tricks' type="text"
        value={tips}
        onChange={(e) => setTips(e.target.value)}></textarea>
        
      </div>
      <br />
      <br />
      <button style={sbu} onClick={handlespeichersendenenClick}>SAVE ALL</button>
    </div>
  );
};
