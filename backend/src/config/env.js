import dotenv from "dotenv";
dotenv.config({ quiet: true });

const FRONTEND_ORIGIN_URL =
  process.env.FRONTEND_ORIGIN_URL ??
  (process.env.NODE_ENV !== "production" ? "http://localhost:5173" : undefined);

if (!FRONTEND_ORIGIN_URL) {
  throw new Error("Missing required env: FRONTEND_ORIGIN_URL");
}

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "production",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  FRONTEND_ORIGIN_URL,
};
