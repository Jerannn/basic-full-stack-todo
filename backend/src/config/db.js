import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

const isProduction = ENV.NODE_ENV === "production";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

pool.on("connect", () => {
  console.log("connected to database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
