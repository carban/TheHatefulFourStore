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

-- EMPLEADOS
insert into empleados (emusuario, empassword, emnombre, emrol, emcorreo) VALUES ('Majo_rivera', 12345, 'Maria Jose Rivera', 'Servicio_Al_Cliente', 'majo_r@hatermail.com');
insert into empleados VALUES ('carban', 12345, 'Carlos Esteban Marillo', 'gfa', 'carban@hatermail.com');
insert into empleados VALUES ('sanrop', 12345, 'Santiago Rodriguez Penagos', 'gfe', 'sanrop@hatermail.com');
insert into empleados VALUES ('yizuz', 12345, 'Yizucristo Tu Cñor', 'thebigboss', 'yizuz@hatermail.com');
insert into empleados VALUES ('nn', 12345, 'nn', 'gerente', 'nn@hatermail.com');

-- CLIENTES
insert into clientes values ('ratkidnumber1', 54321, 'Manuel SantoDomingo', 'manuelitoSD@coldmail.com', 5, '9/11/2005');
insert into clientes values ('kukaroto', 54321, 'Hitler De Las Altas Torres', 'hitP@coldmail.com', 5, '9/11/2005');
insert into clientes values ('pruebitadeamor', 54321, 'Cucho Stemen', 'cucho@coldmail.com', 5, '9/11/2005');
insert into clientes values ('tugefaconchancleta', 54321, 'tugfa.name', 'tugefa.name@coldmail.com', 1000, '9/11/1970');
insert into clientes values ('laelfadelfrente', 54321, 'laelfadelfrente.name', 'laelfadelfrente.name@coldmail.com', 0, '9/11/2006');
insert into clientes values ('fbi', 54321, 'vieneporti', 'fbi@coldmail.com', 1000000, '9/11/1870');
insert into clientes values ('delivas', 54321, 'Pablo Maltas Leivas', 'deleivas@coldmail.com', 40, '10/05/1994');
insert into clientes values ('edmorando3', 54321, 'Antonia Torriente Morando', 'edmorando3@coldmail.com', 45, '12/09/2000');
insert into clientes values ('fparriaga15', 54321, 'Octavia Flores Arriaga', 'fparriaga15@coldmail.com', 56, '08/09/1994');

-- JUEGOS | aun no esta bien implementado le incremento secuencial en el juid.

--CATEGORIAS  