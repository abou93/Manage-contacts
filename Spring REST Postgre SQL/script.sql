drop table if exist etat_civil;

CREATE TABLE etat_civil(
 id serial PRIMARY KEY,
 nom VARCHAR (50) NOT NULL,
 prenom VARCHAR (50) NOT NULL,
 email VARCHAR (355) UNIQUE NOT NULL,
 telephone VARCHAR (15)
);
commit;