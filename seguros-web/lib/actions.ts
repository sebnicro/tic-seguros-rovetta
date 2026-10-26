"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ==================== CLIENTES ====================
export async function getClientes(busqueda = "") {
  let query = "SELECT * FROM cliente";
  const args = [];
  if (busqueda.trim()) {
    query += " WHERE nombre LIKE ? OR apellido LIKE ? OR dni LIKE ?";
    const term = `%${busqueda.trim()}%`;
    args.push(term, term, term);
  }
  query += " ORDER BY apellido ASC, nombre ASC";
  const rs = await db.execute({ sql: query, args });
  return rs.rows;
}

export async function createCliente(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const apellido = formData.get("apellido") as string;
  const dni = formData.get("dni") as string;
  const email = formData.get("email") as string;
  const telefono = formData.get("telefono") as string;

  await db.execute({
    sql: "INSERT INTO cliente (nombre, apellido, dni, email, telefono) VALUES (?, ?, ?, ?, ?)",
    args: [nombre, apellido, dni, email, telefono],
  });
  revalidatePath("/clientes");
  revalidatePath("/");
}

export async function updateCliente(formData: FormData) {
  const id_cliente = formData.get("id_cliente") as string;
  const nombre = formData.get("nombre") as string;
  const apellido = formData.get("apellido") as string;
  const dni = formData.get("dni") as string;
  const email = formData.get("email") as string;
  const telefono = formData.get("telefono") as string;

  await db.execute({
    sql: "UPDATE cliente SET nombre = ?, apellido = ?, dni = ?, email = ?, telefono = ? WHERE id_cliente = ?",
    args: [nombre, apellido, dni, email, telefono, id_cliente],
  });
  revalidatePath("/clientes");
  revalidatePath("/");
}

export async function deleteCliente(id_cliente: number) {
  await db.execute({
    sql: "DELETE FROM cliente WHERE id_cliente = ?",
    args: [id_cliente],
  });
  revalidatePath("/clientes");
  revalidatePath("/");
}

// ==================== POLIZAS ====================
export async function getPolizas() {
  const rs = await db.execute(`
    SELECT 
      p.id_poliza,
      p.numero_poliza,
      p.id_cliente,
      p.id_cobertura,
      p.fecha_inicio,
      p.fecha_fin,
      p.estado,
      c.nombre || ' ' || c.apellido AS cliente_nombre,
      c.dni AS cliente_dni,
      cob.nombre AS cobertura_nombre
    FROM poliza p
    JOIN cliente c ON p.id_cliente = c.id_cliente
    LEFT JOIN cobertura cob ON p.id_cobertura = cob.id_cobertura
    ORDER BY p.id_poliza DESC
  `);
  return rs.rows;
}

export async function getCoberturas() {
  const rs = await db.execute("SELECT * FROM cobertura ORDER BY nombre ASC");
  return rs.rows;
}

export async function createPoliza(formData: FormData) {
  const numero_poliza = formData.get("numero_poliza") as string;
  const id_cliente = Number(formData.get("id_cliente"));
  const id_cobertura = formData.get("id_cobertura") ? Number(formData.get("id_cobertura")) : null;
  const fecha_inicio = formData.get("fecha_inicio") as string;
  const fecha_fin = formData.get("fecha_fin") as string;
  const estado = formData.get("estado") as string || "ACTIVA";

  await db.execute({
    sql: "INSERT INTO poliza (numero_poliza, id_cliente, id_cobertura, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?, ?)",
    args: [numero_poliza, id_cliente, id_cobertura, fecha_inicio, fecha_fin, estado],
  });
  revalidatePath("/polizas");
  revalidatePath("/");
}

export async function updatePoliza(formData: FormData) {
  const id_poliza = Number(formData.get("id_poliza"));
  const numero_poliza = formData.get("numero_poliza") as string;
  const id_cliente = Number(formData.get("id_cliente"));
  const id_cobertura = formData.get("id_cobertura") ? Number(formData.get("id_cobertura")) : null;
  const fecha_inicio = formData.get("fecha_inicio") as string;
  const fecha_fin = formData.get("fecha_fin") as string;
  const estado = formData.get("estado") as string;

  await db.execute({
    sql: "UPDATE poliza SET numero_poliza = ?, id_cliente = ?, id_cobertura = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_poliza = ?",
    args: [numero_poliza, id_cliente, id_cobertura, fecha_inicio, fecha_fin, estado, id_poliza],
  });
  revalidatePath("/polizas");
  revalidatePath("/");
}

export async function deletePoliza(id_poliza: number) {
  await db.execute({
    sql: "DELETE FROM poliza WHERE id_poliza = ?",
    args: [id_poliza],
  });
  revalidatePath("/polizas");
  revalidatePath("/");
}

// ==================== SINIESTROS ====================
export async function getSiniestros() {
  const rs = await db.execute(`
    SELECT 
      s.id_siniestro,
      s.id_poliza,
      s.fecha,
      s.tipo,
      s.descripcion,
      s.estado,
      p.numero_poliza,
      c.nombre || ' ' || c.apellido AS cliente_nombre
    FROM siniestro s
    JOIN poliza p ON s.id_poliza = p.id_poliza
    JOIN cliente c ON p.id_cliente = c.id_cliente
    ORDER BY s.fecha DESC, s.id_siniestro DESC
  `);
  return rs.rows;
}

export async function createSiniestro(formData: FormData) {
  const id_poliza = Number(formData.get("id_poliza"));
  const fecha = formData.get("fecha") as string;
  const tipo = formData.get("tipo") as string;
  const descripcion = formData.get("descripcion") as string;
  const estado = (formData.get("estado") as string) || "ABIERTO";

  await db.execute({
    sql: "INSERT INTO siniestro (id_poliza, fecha, tipo, descripcion, estado) VALUES (?, ?, ?, ?, ?)",
    args: [id_poliza, fecha, tipo, descripcion, estado],
  });
  revalidatePath("/siniestros");
  revalidatePath("/");
}

export async function updateSiniestroEstado(id_siniestro: number, estado: string) {
  await db.execute({
    sql: "UPDATE siniestro SET estado = ? WHERE id_siniestro = ?",
    args: [estado, id_siniestro],
  });
  revalidatePath("/siniestros");
  revalidatePath("/");
}

export async function updateSiniestro(formData: FormData) {
  const id_siniestro = Number(formData.get("id_siniestro"));
  const id_poliza = Number(formData.get("id_poliza"));
  const fecha = formData.get("fecha") as string;
  const tipo = formData.get("tipo") as string;
  const descripcion = formData.get("descripcion") as string;
  const estado = formData.get("estado") as string;

  await db.execute({
    sql: "UPDATE siniestro SET id_poliza = ?, fecha = ?, tipo = ?, descripcion = ?, estado = ? WHERE id_siniestro = ?",
    args: [id_poliza, fecha, tipo, descripcion, estado, id_siniestro],
  });
  revalidatePath("/siniestros");
  revalidatePath("/");
}

export async function deleteSiniestro(id_siniestro: number) {
  await db.execute({
    sql: "DELETE FROM siniestro WHERE id_siniestro = ?",
    args: [id_siniestro],
  });
  revalidatePath("/siniestros");
  revalidatePath("/");
}

// ==================== DASHBOARD & METRICAS ====================
export async function getDashboardData() {
  const [totalClientesRs, polizasActivasRs, siniestrosAbiertosRs, siniestrosCerradosRs, polizasPorEstadoRs, siniestrosPorTipoRs, siniestrosPorMesRs] = await Promise.all([
    db.execute("SELECT COUNT(*) AS count FROM cliente"),
    db.execute("SELECT COUNT(*) AS count FROM poliza WHERE estado = 'ACTIVA'"),
    db.execute("SELECT COUNT(*) AS count FROM siniestro WHERE estado = 'ABIERTO'"),
    db.execute("SELECT COUNT(*) AS count FROM siniestro WHERE estado = 'CERRADO'"),
    db.execute("SELECT estado, COUNT(*) as cantidad FROM poliza GROUP BY estado"),
    db.execute("SELECT tipo, COUNT(*) as cantidad FROM siniestro GROUP BY tipo ORDER BY cantidad DESC"),
    db.execute("SELECT strftime('%Y-%m', fecha) AS mes, COUNT(*) AS cantidad FROM siniestro GROUP BY mes ORDER BY mes ASC")
  ]);

  return {
    kpis: {
      totalClientes: Number(totalClientesRs.rows[0].count),
      polizasActivas: Number(polizasActivasRs.rows[0].count),
      siniestrosAbiertos: Number(siniestrosAbiertosRs.rows[0].count),
      siniestrosCerrados: Number(siniestrosCerradosRs.rows[0].count),
    },
    polizasPorEstado: polizasPorEstadoRs.rows.map(r => ({ label: String(r.estado), value: Number(r.cantidad) })),
    siniestrosPorTipo: siniestrosPorTipoRs.rows.map(r => ({ label: String(r.tipo), value: Number(r.cantidad) })),
    siniestrosPorMes: siniestrosPorMesRs.rows.map(r => ({ label: String(r.mes), value: Number(r.cantidad) })),
  };
}
