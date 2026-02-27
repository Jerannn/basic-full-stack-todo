import bcrypt, { genSaltSync } from "bcryptjs";
import db from "../config/db.js";

export default class User {
  static async create({ name, email, password }) {
    const hashedPassword = await this.hashedPassword(password);

    const result = await db.query(
      `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
      [name, email, hashedPassword],
    );

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
    );

    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      `SELECT * FROM users
        WHERE id = $1`,
      [id],
    );

    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async hashedPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }
}
