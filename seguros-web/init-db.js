const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");

async function initDB() {
  const dbPath = path.join(__dirname, "seguros.db");
  const client = createClient({
    url: `file:${dbPath}`,
  });

  console.log("Iniciando creación de tablas...");
  const schemaSql = fs.readFileSync(path.join(__dirname, "..", "schema.sql"), "utf-8");
  const seedSql = fs.readFileSync(path.join(__dirname, "..", "seed.sql"), "utf-8");

  // Ejecutamos esquema
  await client.executeMultiple(schemaSql);
  console.log("Esquema creado correctamente.");

  // Ejecutamos seed
  await client.executeMultiple(seedSql);
  console.log("Datos de prueba insertados correctamente.");

  // Copiamos seguros.db a la raíz también para el entregable
  fs.copyFileSync(dbPath, path.join(__dirname, "..", "seguros.db"));
  console.log("seguros.db generado en raíz y en seguros-web.");
}

initDB().catch(console.error);
