import { createClient } from "@libsql/client";
import path from "path";

// Permite conectar a Turso en producción (mediante env vars) o a SQLite local (seguros.db)
const url = process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), "seguros.db")}`;
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

export const db = createClient({
  url,
  authToken,
});
