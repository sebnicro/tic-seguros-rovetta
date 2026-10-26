import { getPolizas, getClientes, getCoberturas } from "@/lib/actions";
import PolizasClient from "./PolizasClient";

export const dynamic = "force-dynamic";

export default async function PolizasPage() {
  const [polizasRaw, clientesRaw, coberturasRaw] = await Promise.all([
    getPolizas(),
    getClientes(),
    getCoberturas(),
  ]);

  const polizas = polizasRaw.map((p: any) => ({
    id_poliza: Number(p.id_poliza),
    numero_poliza: String(p.numero_poliza),
    id_cliente: Number(p.id_cliente),
    id_cobertura: p.id_cobertura ? Number(p.id_cobertura) : null,
    fecha_inicio: String(p.fecha_inicio),
    fecha_fin: String(p.fecha_fin),
    estado: String(p.estado),
    cliente_nombre: String(p.cliente_nombre),
    cliente_dni: String(p.cliente_dni),
    cobertura_nombre: p.cobertura_nombre ? String(p.cobertura_nombre) : null,
  }));

  const clientes = clientesRaw.map((c: any) => ({
    id_cliente: Number(c.id_cliente),
    nombre: String(c.nombre),
    apellido: String(c.apellido),
    dni: String(c.dni),
  }));

  const coberturas = coberturasRaw.map((cob: any) => ({
    id_cobertura: Number(cob.id_cobertura),
    nombre: String(cob.nombre),
  }));

  return <PolizasClient initialPolizas={polizas} clientes={clientes} coberturas={coberturas} />;
}
