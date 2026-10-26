import { getClientes } from "@/lib/actions";
import ClientesClient from "./ClientesClient";

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  const rawClientes = await getClientes();
  const clientes = rawClientes.map((c: any) => ({
    id_cliente: Number(c.id_cliente),
    nombre: String(c.nombre),
    apellido: String(c.apellido),
    dni: String(c.dni),
    email: c.email ? String(c.email) : null,
    telefono: c.telefono ? String(c.telefono) : null,
  }));

  return <ClientesClient initialClientes={clientes} />;
}
