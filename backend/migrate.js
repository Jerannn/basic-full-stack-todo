import { fileURLToPath } from "url";
import { ENV } from "./src/config/env.js";
import path from "path";
import pkg from "pg";
import fs from "fs";

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runMiration() {
  const client = await pool.connect();
  try {
    const schemaPath = path.join(__dirname, "src", "config", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await client.query(schema);
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Error running migration:", error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}
runMiration();
