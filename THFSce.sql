DROP EXTENSION IF EXISTS pgcrypto;
CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS empleados CASCADE;
DROP TABLE IF EXISTS juegos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS subcategorias CASCADE;
DROP TABLE IF EXISTS librerias CASCADE;
DROP TABLE IF EXISTS userservice CASCADE;
DROP TABLE IF EXISTS catjuegos CASCADE;

CREATE TABLE clientes
(
  cliusuario VARCHAR(64) NOT NULL,
  clipassword TEXT NOT NULL,
  clinombre VARCHAR(128),
  clicorreo VARCHAR(64) NOT NULL,
  clifondos INT NOT NULL,
  clifechanac DATE NOT NULL,
  PRIMARY KEY (cliusuario),
  UNIQUE (clicorreo)
);

CREATE TABLE empleados
(
  emusuario VARCHAR(64) NOT NULL,
  empassword TEXT NOT NULL,
  emnombre VARCHAR(128) NOT NULL,
  emrol VARCHAR(32) NOT NULL,
  emcorreo VARCHAR(64) NOT NULL,
  PRIMARY KEY (emusuario),
  UNIQUE (emcorreo)
);

CREATE TABLE juegos
(
  juid INT NOT NULL,
  junombre VARCHAR(128) NOT NULL,
  juprecio INT NOT NULL,
  PRIMARY KEY (juid)
);
DROP SEQUENCE IF EXISTS juid_sequence CASCADE;
CREATE SEQUENCE juid_sequence
  start 1
  increment 1;

CREATE TABLE categorias
(
  catid INT NOT NULL,
  catnombre VARCHAR(64) NOT NULL,
  catdescripcion VARCHAR(256),
  PRIMARY KEY (catid)
);
DROP SEQUENCE IF EXISTS catid_sequence CASCADE;
CREATE SEQUENCE catid_sequence
  start 1
  increment 1;

CREATE TABLE subcategorias
(
  subid INT NOT NULL,
  subnombre VARCHAR(64) NOT NULL,
  subdescripcion VARCHAR(256),
  catid INT NOT NULL,
  PRIMARY KEY (subid),
  FOREIGN KEY (catid) REFERENCES categorias(catid)
);
DROP SEQUENCE IF EXISTS subid_sequence CASCADE;
CREATE SEQUENCE subid_sequence
  start 1
  increment 1;

CREATE TABLE librerias
(
  idcompra INT NOT NULL,
  fechacompra DATE NOT NULL,
  valorcompra INT NOT NULL,
  esvalida BOOLEAN NOT NULL,
  cliusuario VARCHAR(64) NOT NULL,
  juid INT NOT NULL,
  PRIMARY KEY (cliusuario, juid),
  FOREIGN KEY (cliusuario) REFERENCES clientes(cliusuario),
  FOREIGN KEY (juid) REFERENCES juegos(juid)
);
DROP SEQUENCE IF EXISTS idcompra_sequence CASCADE;
CREATE SEQUENCE idcompra_sequence
  start 1
  increment 1;

CREATE TABLE userservice
(
  serid INT NOT NULL,
  serfecha DATE NOT NULL,
  serdescripcion VARCHAR(256) NOT NULL,
  cliusuario VARCHAR(64) NOT NULL,
  emusuario VARCHAR(64) NOT NULL,
  PRIMARY KEY (serid),
  FOREIGN KEY (cliusuario) REFERENCES clientes(cliusuario),
  FOREIGN KEY (emusuario) REFERENCES empleados(emusuario)
);
DROP SEQUENCE IF EXISTS serid_sequence CASCADE;
CREATE SEQUENCE serid_sequence
  start 1
  increment 1;

CREATE TABLE catjuegos
(
  juid INT NOT NULL,
  subid INT NOT NULL,
  PRIMARY KEY (juid, subid),
  FOREIGN KEY (juid) REFERENCES juegos(juid),
  FOREIGN KEY (subid) REFERENCES subcategorias(subid)
);



--insert into clientes values ('carban', 'password', 'Carlos', 'carlos@mail.com', 1000, '01/05/1998');
--insert into clientes values ('hola', 'password', 'xd', 'xd@mail.com', 1000, '01/05/1998');
--insert into categorias values (1, 'Sports', 'Sports games');
--insert into categorias values (2, 'Sci-fi', 'Sci-fi games');


