-- ====================================================================
-- TRABAJO INTEGRADOR CUATRIMESTRAL (TIC) - SEGUROS DE ACCIDENTES PERSONALES
-- Script DQL: Consultas SQL obligatorias y JOINs
-- Archivo: queries.sql
-- ====================================================================

-- --------------------------------------------------------------------
-- 10. Consultas obligatorias
-- --------------------------------------------------------------------

-- 1. Mostrar todos los clientes
SELECT * FROM cliente;

-- 2. Ordenar clientes alfabéticamente por apellido
SELECT * FROM cliente 
ORDER BY apellido ASC, nombre ASC;

-- 3. Buscar clientes cuyo apellido comience con 'A'
SELECT * FROM cliente 
WHERE apellido LIKE 'A%';

-- 4. Buscar una póliza por número
SELECT * FROM poliza 
WHERE numero_poliza = 'POL-2026-001';

-- 5. Contar la cantidad de clientes
SELECT COUNT(*) AS total_clientes 
FROM cliente;

-- 6. Contar la cantidad de pólizas activas
SELECT COUNT(*) AS total_polizas_activas 
FROM poliza 
WHERE estado = 'ACTIVA';

-- 7. Contar la cantidad de siniestros
SELECT COUNT(*) AS total_siniestros 
FROM siniestro;

-- 8. Calcular el promedio de pagos
SELECT ROUND(AVG(importe), 2) AS promedio_pagos 
FROM pago;


-- --------------------------------------------------------------------
-- 11. Consultas con JOIN obligatorias (información útil, no solo IDs)
-- --------------------------------------------------------------------

-- JOIN 1: Cliente + Póliza + Cobertura
SELECT 
    p.numero_poliza,
    c.nombre || ' ' || c.apellido AS cliente,
    c.dni,
    cob.nombre AS cobertura,
    p.fecha_inicio,
    p.fecha_fin,
    p.estado
FROM poliza p
JOIN cliente c ON p.id_cliente = c.id_cliente
LEFT JOIN cobertura cob ON p.id_cobertura = cob.id_cobertura
ORDER BY p.id_poliza;

-- JOIN 2: Póliza + Siniestro
SELECT 
    s.id_siniestro,
    s.fecha AS fecha_siniestro,
    s.tipo,
    s.descripcion,
    s.estado AS estado_siniestro,
    p.numero_poliza,
    p.estado AS estado_poliza
FROM siniestro s
JOIN poliza p ON s.id_poliza = p.id_poliza
ORDER BY s.fecha DESC;

-- JOIN 3: Cliente + Póliza + Siniestro
SELECT 
    c.apellido || ', ' || c.nombre AS cliente,
    c.dni,
    c.telefono,
    p.numero_poliza,
    s.id_siniestro,
    s.fecha AS fecha_siniestro,
    s.tipo,
    s.estado AS estado_siniestro
FROM siniestro s
JOIN poliza p ON s.id_poliza = p.id_poliza
JOIN cliente c ON p.id_cliente = c.id_cliente
ORDER BY s.fecha DESC;


-- --------------------------------------------------------------------
-- Consultas adicionales para métricas y gráficos del Dashboard
-- --------------------------------------------------------------------

-- Métrica: Siniestros abiertos
SELECT COUNT(*) AS siniestros_abiertos 
FROM siniestro 
WHERE estado = 'ABIERTO';

-- Métrica: Siniestros cerrados
SELECT COUNT(*) AS siniestros_cerrados 
FROM siniestro 
WHERE estado = 'CERRADO';

-- Gráfico 1: Pólizas por estado
SELECT estado, COUNT(*) AS cantidad 
FROM poliza 
GROUP BY estado;

-- Gráfico 2: Siniestros por tipo
SELECT tipo, COUNT(*) AS cantidad 
FROM siniestro 
GROUP BY tipo 
ORDER BY cantidad DESC;

-- Gráfico 3: Siniestros por mes (formato YYYY-MM)
SELECT strftime('%Y-%m', fecha) AS mes, COUNT(*) AS cantidad 
FROM siniestro 
GROUP BY mes 
ORDER BY mes ASC;
