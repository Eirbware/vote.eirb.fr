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
    dateOuvertureVotes DATE NOT NULL,
    dateFermetureVotes DATE NOT NULL,
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
