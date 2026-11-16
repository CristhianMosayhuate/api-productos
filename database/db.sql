CREATE DATABASE tiendaperu;
USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos
(
	id 				INT UNSIGNED 	NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca			VARCHAR(100) 	NOT NULL,
    descripcion		VARCHAR(200) 	NOT NULL,
    precio			DECIMAL(10,2)	NOT NULL,
    stock 			INT UNSIGNED	NOT NULL DEFAULT 0,
    create_at		DATETIME        NOT NULL DEFAULT NOW(),
	update_at		DATETIME 		NULL	
)ENGINE = INNODB;


INSERT INTO productos
    (marca, descripcion, precio, stock)
	VALUES
    ('Samsung', 'TV 55"', 2500, 10),
    ('LG', 'Lavadora', 1200, 3),
    ('Sony', 'Playstation 5', 3200, 2);

SELECT * FROM productos;


-- Tabla Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos VARCHAR(100) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    email VARCHAR(100),
    create_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NULL
) ENGINE = INNODB;

INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES
('Perez', 'Juan', '987654321', 'Av. Lima 123', 'juan.perez@email.com'),
('Gomez', 'Maria', '912345678', 'Calle Sol 456', 'maria.gomez@email.com'),
('Vargas', 'Luis', '998877665', 'Jr. Luna 789', 'luis.vargas@email.com');


CREATE TABLE IF NOT EXISTS proveedores (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonsocial VARCHAR(150) NOT NULL,
    contacto VARCHAR(100),
    ruc VARCHAR(11) NOT NULL,
    direccion VARCHAR(200),
    create_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NULL
) ENGINE = INNODB;

INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES
('Distribuidora Sur SAC', 'Carlos Ruiz', '20123456789', 'Zona Industrial 1'),
('Tecnologia Global EIRL', 'Ana Torres', '20987654321', 'Av. Central 500'),
('Importaciones Peru S.A.', 'Pedro Sanchez', '20555444333', 'Callao Mza B');
