-- ===== Tables =====
-- EnregistrementVotes
CREATE TABLE EnregistrementVotes(
    login VARCHAR(32) NOT NULL,
    idCampagne INT NOT NULL,
);

ALTER TABLE EnregistrementVotes
ADD PRIMARY KEY(login, idCampagne);


-- Campagnes
CREATE TABLE Campagnes(
    id INT NOT NULL AUTO_INCREMENT,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    dateOuvertureVotes DATE NOT NULL,
    dateFermetureVotes DATE NOT NULL,
    typeCampagne INT NOT NULL,
);

ALTER TABLE Campagnes
ADD PRIMARY KEY(id);

ALTER TABLE Campagnes
ADD CONSTRAINT debutAvantFin
CHECK(dateDebut <= dateFin);

ALTER TABLE Campagnes
ADD CONSTRAINT ouvertureAvantFermeture
CHECK(dateOuvertureVotes <= dateFermetureVotes);


-- TypeCampagnes
CREATE TABLE TypeCampagnes(
    nomType VARCHAR(32) NOT NULL,
);

ALTER TABLE TypeCampagnes
ADD PRIMARY KEY(nomType);


-- Listes
CREATE TABLE Listes(
    id INT NOT NULL AUTO_INCREMENT,
    idCampagne INT NOT NULL,
    nom VARCHAR(64) NOT NULL,
    nbVotes INT NOT NULL,
);

ALTER TABLE Listes
ADD PRIMARY KEY(id);



-- ===== Contraintes de clés étrangères =====
ALTER TABLE EnregistrementVotes
ADD CONSTRAINT
FOREIGN KEY(idCampagne) REFERENCES Campagnes(id);

ALTER TABLE Campagnes
ADD CONSTRAINT
FOREIGN KEY(typeCampagne) REFERENCES TypeCampagnes(nomType);

ALTER TABLE Listes
ADD CONSTRAINT
FOREIGN KEY(idCampagne) REFERENCES Campagnes(id);


-- ===== Enumérations =====
INSERT INTO TypeCampagnes(nomType)
VALUES ('BDE'),
       ('BDS'),
       ('BDA'),
       ('Autre');
