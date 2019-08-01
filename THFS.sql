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
  juid SERIAL NOT NULL, -- Cambiado a serial para que el id sea incremental.
  junombre VARCHAR(128) NOT NULL,
  juprecio MONEY NOT NULL,
  jucompany VARCHAR(128) NOT NULL,
  juyear int NOT NULL,
  jurating int NOT NULL,
  judescription VARCHAR(128) NOT NULL,
  PRIMARY KEY (juid)
);
DROP SEQUENCE IF EXISTS juid_sequence CASCADE; -- probablemente inecesario
CREATE SEQUENCE juid_sequence -- probablemente inecesario
  start 1 -- probablemente inecesario
  increment 1;  -- probablemente inecesario

CREATE TABLE categorias
(
  catid SERIAL NOT NULL, -- Cambiado a serial para que el id sea incremental.
  catnombre VARCHAR(64) NOT NULL,
  catdescripcion VARCHAR(256),
  PRIMARY KEY (catid)
);
DROP SEQUENCE IF EXISTS catid_sequence CASCADE;  --Probablemente innecesario.
CREATE SEQUENCE catid_sequence --Probablemente innecesario.
  start 1 --Probablemente innecesario.
  increment 1; --Probablemente innecesario.

CREATE TABLE subcategorias
(
  subid SERIAl NOT NULL, -- Cambiado a serial para que el id sea incremental.
  subnombre VARCHAR(64) NOT NULL,
  subdescripcion VARCHAR(256),
  catid INT NOT NULL,
  PRIMARY KEY (subid),
  FOREIGN KEY (catid) REFERENCES categorias(catid)
);
DROP SEQUENCE IF EXISTS subid_sequence CASCADE;  --Probablemente innecesario.
CREATE SEQUENCE subid_sequence --Probablemente innecesario.
  start 1 --Probablemente innecesario.
  increment 1; --Probablemente innecesario.

CREATE TABLE librerias
(
  idcompra SERIAL NOT NULL, -- Cambiado a serial para que el id sea incremental.
  fechacompra DATE NOT NULL,
  valorcompra INT NOT NULL,
  esvalida BOOLEAN NOT NULL,
  cliusuario VARCHAR(64) NOT NULL,
  juid INT NOT NULL,
  PRIMARY KEY (cliusuario, juid),
  FOREIGN KEY (cliusuario) REFERENCES clientes(cliusuario),
  FOREIGN KEY (juid) REFERENCES juegos(juid)
);
DROP SEQUENCE IF EXISTS idcompra_sequence CASCADE;  --Probablemente innecesario.
CREATE SEQUENCE idcompra_sequence --Probablemente innecesario.
  start 1 --Probablemente innecesario.
  increment 1; --Probablemente innecesario.

CREATE TABLE userservice
(
  serid SERIAL NOT NULL, -- Cambiado a serial para que el id sea incremental.
  serfecha DATE NOT NULL,
  serdescripcion VARCHAR(256) NOT NULL,
  cliusuario VARCHAR(64) NOT NULL,
  emusuario VARCHAR(64) NOT NULL,
  PRIMARY KEY (serid),
  FOREIGN KEY (cliusuario) REFERENCES clientes(cliusuario),
  FOREIGN KEY (emusuario) REFERENCES empleados(emusuario)
);
DROP SEQUENCE IF EXISTS serid_sequence CASCADE; --Probablemente innecesario.
CREATE SEQUENCE serid_sequence --Probablemente innecesario.
  start 1 --Probablemente innecesario.
  increment 1; --Probablemente innecesario.

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
insert into empleados VALUES ('kojima', 12345, 'Hideo', 'gfa', 'carban@hatermail.com');
insert into empleados VALUES ('sanrop', 12345, 'Santiago Rodriguez Penagos', 'gfe', 'sanrop@hatermail.com');
insert into empleados VALUES ('yizuz', 12345, 'Yizucristo Tu Cñor', 'thebigboss', 'yizuz@hatermail.com');
insert into empleados VALUES ('nn', 12345, 'nn', 'gerente', 'nn@hatermail.com');

-- CLIENTES
insert into clientes values ('carban', 'password', 'Carlos esteban murillo', 'manuelitoSD@coldmail.com', 5, '9/11/2005');
insert into clientes values ('kukaroto', 54321, 'Hitler De Las Altas Torres', 'hitP@coldmail.com', 5, '9/11/2005');
insert into clientes values ('pruebitadeamor', 54321, 'Cucho Stemen', 'cucho@coldmail.com', 5, '9/11/2005');
insert into clientes values ('tugefaconchancleta', 54321, 'tugfa.name', 'tugefa.name@coldmail.com', 1000, '9/11/1970');
insert into clientes values ('laelfadelfrente', 54321, 'laelfadelfrente.name', 'laelfadelfrente.name@coldmail.com', 0, '9/11/2006');
insert into clientes values ('fbi', 54321, 'vieneporti', 'fbi@coldmail.com', 1000000, '9/11/1870');
insert into clientes values ('delivas', 54321, 'Pablo Maltas Leivas', 'deleivas@coldmail.com', 40, '10/05/1994');
insert into clientes values ('edmorando3', 54321, 'Antonia Torriente Morando', 'edmorando3@coldmail.com', 45, '12/09/2000');
insert into clientes values ('fparriaga15', 54321, 'Octavia Flores Arriaga', 'fparriaga15@coldmail.com', 56, '08/09/1994');

-- JUEGOS | aun no esta bien implementado le incremento secuencial en el juid.
--  | problema solucionado agregando tipo de dato "serial" en lugar de "int"
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('Metal Gear Solid V', 5.59, 'konami', 2019, 4, 'Lorem ipsum dolor si magna aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('PACMAN', 38.59, 'konami', 2019, 4, 'Lorem ipsum dolor sit amet, ciqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('SOKOBAN', 20.45, 'konami', 2019, 4, 'Lorem ipsum dolor sit amet, liqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('HEX', 10000000, 'konami', 2019, 4, 'Lorem ipsum dolor sit amet,aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('GTA V', 12.89, 'konami', 2019, 4, 'Lorem ipsum dolor sit amet, ciqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('PES 2019', 22.29, 'konami', 2019, 4, 'Lorem ipsum dolor sit amea aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('FIFA 2019', 9.49, 'konami', 2019, 4, 'Lorem ipsum dolor sit amea aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('Cyberpunk 2077', 48.89, 'konami', 2019, 4, 'Lorem ipsum dolor re magna aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('BORDERLANDS 3', 49.89, 'konami', 2019, 4, 'Lorem ipsum dolor se magna aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('Need for speed', 22.39, 'konami', 2019, 4, 'Lorem ipsum dolor re magna aliqua. Ut enim ad minim veni');
insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ('DOOM ETERNAL', 38.89, 'konami', 2019, 4, 'Lorem ipsum dolor se magna aliqua. Ut enim ad minim veni');

--CATEGORIAS
insert into categorias (catnombre, catdescripcion) values ('Sports', 'Sports games');
insert into categorias (catnombre, catdescripcion) values ('Sci-fi', 'Sci-fi games');
insert into categorias (catnombre, catdescripcion) values ('Adventure', 'Adventure games');
insert into categorias (catnombre, catdescripcion) values ('Action', 'Action games');
--SUBCATEGORIAS
insert into subcategorias (subnombre, subdescripcion, catid) values ('soccer', 'Soccer games', 1);
insert into subcategorias (subnombre, subdescripcion, catid) values ('Tenis', 'Tenis games', 1);
insert into subcategorias (subnombre, subdescripcion, catid) values ('CyberPunk', 'CyberPunk games', 2);
insert into subcategorias (subnombre, subdescripcion, catid) values ('Aliens', 'Alien games', 2);
insert into subcategorias (subnombre, subdescripcion, catid) values ('Gore', 'Gore games', 3);
insert into subcategorias (subnombre, subdescripcion, catid) values ('Cars', 'Cars games', 1);
insert into subcategorias (subnombre, subdescripcion, catid) values ('Shooter', 'Shooter games', 4);
--CATJUEGOS
insert into catjuegos values (1, 7);
insert into catjuegos values (2, 1);
insert into catjuegos values (3, 5);
insert into catjuegos values (4, 5);
insert into catjuegos values (5, 5);
insert into catjuegos values (6, 1);
insert into catjuegos values (7, 1);
insert into catjuegos values (8, 3);
insert into catjuegos values (9, 5);
insert into catjuegos values (10, 6);
insert into catjuegos values (11, 4);
--LIBRERIAS
insert into librerias (fechacompra, valorcompra, esvalida, cliusuario, juid) values('2019-07-04', 2000, true, 'carban', 2);
insert into librerias (fechacompra, valorcompra, esvalida, cliusuario, juid) values('2019-07-04', 2000, true, 'carban', 5);
