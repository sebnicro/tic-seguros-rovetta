-- ====================================================================
-- TRABAJO INTEGRADOR CUATRIMESTRAL (TIC) - SEGUROS DE ACCIDENTES PERSONALES
-- Script DML: Carga de datos iniciales / de prueba
-- Archivo: seed.sql
-- ====================================================================

-- 1. Coberturas (mínimo 5 requeridas)
INSERT INTO cobertura (nombre, descripcion) VALUES
('Básica Laboral', 'Cobertura por accidentes durante la jornada de trabajo.'),
('Total 24 Horas', 'Cobertura por accidentes personales las 24 horas del día en todo el país.'),
('Deportiva Amateur', 'Cobertura para deportistas no profesionales durante entrenamientos y competencias.'),
('Itinere (In Itinere)', 'Cobertura exclusiva de trayectos ida y vuelta al lugar de trabajo.'),
('Premium Integral', 'Muerte accidental, invalidez total/parcial y reintegro de gastos médicos asistenciales.');

-- 2. Clientes (mínimo 10 requeridos)
INSERT INTO cliente (nombre, apellido, dni, email, telefono) VALUES
('Juan Carlos', 'Alvarez', '28941203', 'juan.alvarez@email.com', '1145238910'),
('Maria Laura', 'Benitez', '32104598', 'maria.benitez@email.com', '1156892341'),
('Agustin', 'Arias', '35874125', 'agustin.arias@email.com', '1169823415'),
('Sofia', 'Castro', '40125896', 'sofia.castro@email.com', '1134567812'),
('Esteban', 'Diaz', '27456321', 'esteban.diaz@email.com', '1123456789'),
('Florencia', 'Fernandez', '33698521', 'flor.fernandez@email.com', '1178945612'),
('Alejandro', 'Acosta', '31258964', 'ale.acosta@email.com', '1189562341'),
('Gonzalo', 'Gomez', '36985214', 'gonzalo.gomez@email.com', '1198745623'),
('Lucia', 'Herrera', '39852147', 'lucia.herrera@email.com', '1147852369'),
('Martin', 'Ibañez', '34125874', 'martin.ibanez@email.com', '1132145698');

-- 3. Pólizas (mínimo 10 requeridas)
INSERT INTO poliza (numero_poliza, id_cliente, id_cobertura, fecha_inicio, fecha_fin, estado) VALUES
('POL-2026-001', 1, 1, '2026-01-01', '2026-12-31', 'ACTIVA'),
('POL-2026-002', 2, 2, '2026-01-15', '2026-07-15', 'ACTIVA'),
('POL-2026-003', 3, 3, '2026-02-01', '2026-08-01', 'ACTIVA'),
('POL-2026-004', 4, 1, '2025-01-01', '2025-12-31', 'VENCIDA'),
('POL-2026-005', 5, 5, '2026-02-10', '2027-02-10', 'ACTIVA'),
('POL-2026-006', 6, 2, '2026-03-01', '2027-03-01', 'ACTIVA'),
('POL-2026-007', 7, 4, '2026-01-10', '2026-06-10', 'CANCELADA'),
('POL-2026-008', 8, 3, '2026-03-15', '2026-09-15', 'ACTIVA'),
('POL-2026-009', 9, 5, '2026-04-01', '2027-04-01', 'ACTIVA'),
('POL-2026-010', 10, 1, '2025-03-01', '2026-03-01', 'VENCIDA');

-- 4. Pagos (mínimo 15 requeridos)
INSERT INTO pago (id_poliza, fecha, importe, estado) VALUES
(1, '2026-01-05', 15000.00, 'PAGADO'),
(1, '2026-02-05', 15000.00, 'PAGADO'),
(2, '2026-01-20', 22000.00, 'PAGADO'),
(2, '2026-02-20', 22000.00, 'PAGADO'),
(3, '2026-02-05', 18500.00, 'PAGADO'),
(3, '2026-03-05', 18500.00, 'PAGADO'),
(4, '2025-01-05', 12000.00, 'PAGADO'),
(5, '2026-02-15', 35000.00, 'PAGADO'),
(5, '2026-03-15', 35000.00, 'PAGADO'),
(6, '2026-03-05', 22000.00, 'PAGADO'),
(7, '2026-01-15', 14000.00, 'PAGADO'),
(8, '2026-03-20', 18500.00, 'PAGADO'),
(8, '2026-04-20', 18500.00, 'PENDIENTE'),
(9, '2026-04-05', 35000.00, 'PAGADO'),
(10, '2025-03-05', 12000.00, 'PAGADO');

-- 5. Siniestros (mínimo 10 requeridos)
INSERT INTO siniestro (id_poliza, fecha, tipo, descripcion, estado) VALUES
(1, '2026-01-25', 'Caída a nivel', 'Tropiezo en escalera en horario laboral, lesión leve en tobillo.', 'CERRADO'),
(2, '2026-02-02', 'Accidente de tránsito', 'Colisión en moto fuera del trabajo, contusiones varias.', 'CERRADO'),
(3, '2026-02-18', 'Lesión deportiva', 'Esguince de rodilla durante torneo amateur de fútbol.', 'CERRADO'),
(5, '2026-03-01', 'Fractura ósea', 'Caída de altura reparando techo particular, fractura de brazo.', 'EN PROCESO'),
(6, '2026-03-10', 'Corte profundo', 'Accidente doméstico con herramienta cortante en mano.', 'ABIERTO'),
(8, '2026-03-25', 'Lesión muscular', 'Desgarro en cuádriceps en competencia deportiva.', 'ABIERTO'),
(9, '2026-04-05', 'Quemadura', 'Quemadura térmica de segundo grado en extremidades.', 'ABIERTO'),
(1, '2026-04-12', 'Golpe / Contusión', 'Impacto por caída de material ligero sobre hombro.', 'ABIERTO'),
(2, '2026-04-15', 'Caída a nivel', 'Resbalón en vía pública con esguince de muñeca.', 'EN PROCESO'),
(5, '2026-04-20', 'Accidente de tránsito', 'Choque vehicular leve, traumatismo de cuello/latigazo.', 'ABIERTO');
