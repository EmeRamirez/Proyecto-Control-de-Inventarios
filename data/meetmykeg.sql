-- Active: 1680180900307@@127.0.0.1@5432@meetmykeg
CREATE DATABASE meetmykeg;

DROP TABLE nombre;

SELECT * FROM clientes;

CREATE TABLE roles (
    idrol SERIAL PRIMARY KEY NOT NULL UNIQUE,
    descripcion VARCHAR(45) NOT NULL
);

INSERT INTO roles (descripcion) VALUES 
('usuario'),('admin'),('master');

CREATE TABLE usuarios (
    idusuario SERIAL PRIMARY KEY NOT NULL UNIQUE,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    roles_id INT NOT NULL,
    cervecerias_id INT NOT NULL
);

ALTER TABLE usuarios ADD CONSTRAINT fk_idrol_usuarios
FOREIGN KEY (roles_id) REFERENCES roles(idrol);

CREATE TABLE cervecerias (
    idcerveceria SERIAL PRIMARY KEY NOT NULL UNIQUE,
    nombre VARCHAR(45) NOT NULL,
    razonsocial VARCHAR(100),
    rut VARCHAR(45) NOT NULL UNIQUE,
    direccion VARCHAR(100),
    comuna VARCHAR(45)
);

ALTER TABLE usuarios ADD CONSTRAINT fk_idcerveceria_usuarios
FOREIGN KEY (cervecerias_id) REFERENCES cervecerias(idcerveceria);

CREATE TABLE inventario (
    idinventario SERIAL PRIMARY KEY NOT NULL UNIQUE,
    qr VARCHAR(1000) NOT NULL,
    tipo VARCHAR(45) NOT NULL,
    capacidad VARCHAR(45),
    observacion VARCHAR(200),
    clientes_id INT NOT NULL,
    estados_id INT NOT NULL,
    cervecerias_id INT NOT NULL,
    contenidos_id INT NOT NULL
);

ALTER TABLE inventario ADD CONSTRAINT fk_idcerveceria_inventario
FOREIGN KEY (cervecerias_id) REFERENCES cervecerias(idcerveceria);


CREATE TABLE clientes (
    idcliente SERIAL PRIMARY KEY NOT NULL UNIQUE,
    nombre VARCHAR(45) NOT NULL,
    direccion VARCHAR(100),
    comuna VARCHAR(45)
);

INSERT INTO clientes (nombre) VALUES ('Bodega');


ALTER TABLE inventario ADD CONSTRAINT fk_idcliente_inventario
FOREIGN KEY (clientes_id) REFERENCES clientes(idcliente);

CREATE TABLE estados (
    idestado SERIAL PRIMARY KEY NOT NULL UNIQUE,
    estado VARCHAR(45) NOT NULL
);

INSERT INTO estados (estado) VALUES
('En Uso'),('En Preparación'),('Listo para Usar'),('Sucio'),('Fuera de Servicio');

ALTER TABLE inventario ADD CONSTRAINT fk_idestado_inventario
FOREIGN KEY (estados_id) REFERENCES estados(idestado);

CREATE TABLE contenidos (
    idcontenido SERIAL PRIMARY KEY NOT NULL UNIQUE,
    contenido VARCHAR(45) NOT NULL
);

INSERT INTO contenidos (contenido) VALUES
('Vacío'),('Otro');

ALTER TABLE inventario ADD CONSTRAINT fk_idcontenido_inventario
FOREIGN KEY (contenidos_id) REFERENCES contenidos(idcontenido);