-- ====================================================================
-- TRABAJO INTEGRADOR CUATRIMESTRAL (TIC) - SEGUROS DE ACCIDENTES PERSONALES
-- Script DDL: Creación de tablas normalizadas (3FN)
-- Archivo: schema.sql
-- ====================================================================

PRAGMA foreign_keys = ON;

-- Tabla: cliente
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    dni TEXT UNIQUE NOT NULL,
    email TEXT,
    telefono TEXT
);

-- Tabla: cobertura
CREATE TABLE IF NOT EXISTS cobertura (
    id_cobertura INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- Tabla: poliza
CREATE TABLE IF NOT EXISTS poliza (
    id_poliza INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_poliza TEXT UNIQUE NOT NULL,
    id_cliente INTEGER NOT NULL,
    id_cobertura INTEGER,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado TEXT CHECK(estado IN ('ACTIVA', 'VENCIDA', 'CANCELADA')) DEFAULT 'ACTIVA',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE RESTRICT,
    FOREIGN KEY (id_cobertura) REFERENCES cobertura(id_cobertura) ON DELETE SET NULL
);

-- Tabla: siniestro
CREATE TABLE IF NOT EXISTS siniestro (
    id_siniestro INTEGER PRIMARY KEY AUTOINCREMENT,
    id_poliza INTEGER NOT NULL,
    fecha DATE NOT NULL,
    tipo TEXT NOT NULL,
    descripcion TEXT,
    estado TEXT CHECK(estado IN ('ABIERTO', 'EN PROCESO', 'CERRADO')) DEFAULT 'ABIERTO',
    FOREIGN KEY (id_poliza) REFERENCES poliza(id_poliza) ON DELETE RESTRICT
);

-- Tabla: pago
CREATE TABLE IF NOT EXISTS pago (
    id_pago INTEGER PRIMARY KEY AUTOINCREMENT,
    id_poliza INTEGER NOT NULL,
    fecha DATE NOT NULL,
    importe REAL NOT NULL CHECK(importe > 0),
    estado TEXT CHECK(estado IN ('PAGADO', 'PENDIENTE', 'RECHAZADO')) DEFAULT 'PAGADO',
    FOREIGN KEY (id_poliza) REFERENCES poliza(id_poliza) ON DELETE RESTRICT
);
