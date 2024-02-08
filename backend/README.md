# in Docker ein Container mit myql erstellen und in mysql diese 2 listen für die anwendung erstellen. 

# TAbelle 1 für rezepte primary-key ist id 
    CREATE TABLE rezepte ( id INT AUTO_INCREMENT PRIMARY KEY, rezeptname VARCHAR(255) NOT NULL, anzahl INT, kategorien VARCHAR(255), eigenangabe VARCHAR(255), zubereitung TEXT, tips TEXT );

# TAbelle 2 für zutaten Primarykey id von rezepren auch mit drin 
CREATE TABLE zutaten ( id INT AUTO_INCREMENT PRIMARY KEY, rezept_id INT, zutat VARCHAR(255) NOT NULL, menge VARCHAR(255), mengeneinheit VARCHAR(255), FOREIGN KEY (rezept_id) REFERENCES rezepte(id));
