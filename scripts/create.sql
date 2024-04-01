-- ===== Tables =====
-- EnregistrementVotes
CREATE TABLE EnregistrementVotes(
    login VARCHAR(32) NOT NULL,
    idCampagne INT NOT NULL,
    PRIMARY KEY(login, idCampagne)
);

-- Campagnes
CREATE TABLE Campagnes(
    id INT NOT NULL AUTO_INCREMENT,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    dateOuvertureVotes DATETIME NOT NULL,
    dateFermetureVotes DATETIME NOT NULL,
    typeCampagne VARCHAR(32) NOT NULL,
    ecole VARCHAR(32) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT debutAvantFin CHECK(dateDebut <= dateFin),
    CONSTRAINT ouvertureAvantFermeture CHECK(dateOuvertureVotes <= dateFermetureVotes)
);

-- TypeCampagnes
CREATE TABLE TypeCampagnes(
    nomType VARCHAR(32) NOT NULL,
    PRIMARY KEY(nomType)
);

-- Listes
CREATE TABLE Listes(
    id INT NOT NULL AUTO_INCREMENT,
    idCampagne INT NOT NULL,
    nom VARCHAR(64) NOT NULL,
    nbVotes INT NOT NULL,
    PRIMARY KEY(id)
);


-- ===== Contraintes de clé étrangères =====
ALTER TABLE EnregistrementVotes
ADD CONSTRAINT
FOREIGN KEY(idCampagne) REFERENCES Campagnes(id);

ALTER TABLE Listes
ADD CONSTRAINT
FOREIGN KEY(idCampagne) REFERENCES Campagnes(id);

ALTER TABLE Campagnes
ADD CONSTRAINT
FOREIGN KEY(typeCampagne) REFERENCES TypeCampagnes(nomType);



-- ===== Énumérations =====
INSERT INTO TypeCampagnes(nomType)
VALUES ('BDE'),
       ('BDS'),
       ('BDA'),
       ('Autres');


--- BDE

-- Insertion de données pour la table Campagnes
INSERT INTO Campagnes (dateDebut, dateFin, dateOuvertureVotes, dateFermetureVotes, typeCampagne, ecole) VALUES
('2024-02-05', '2024-02-14', '2024-02-16 18:30:00', '2024-02-19 16:00:00', 'BDE', 'ENSEIRB');

-- Insertion de données pour la table Listes
INSERT INTO Listes (idCampagne, nom, nbVotes) VALUES
(1, 'mafieirb', 0),
(1, 'dionyseirb', 0),
(1, 'blanc', 0);


--- BDS

-- Insertion de données pour la table Campagnes
INSERT INTO Campagnes (dateDebut, dateFin, dateOuvertureVotes, dateFermetureVotes, typeCampagne, ecole) VALUES
('2024-03-25', '2024-04-1', '2024-04-2 11:00:00', '2024-04-4 15:00:00', 'BDS', 'ENSEIRB');

-- Insertion de données pour la table Listes
INSERT INTO Listes (idCampagne, nom, nbVotes) VALUES
(2, 'atlanteirb', 0),
(2, 'olympeirb', 0),
(2, 'lospollosheirbmanos', 0),
(2, 'blanc', 0);