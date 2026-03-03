import db from "../config/db.js";

export default class Task {
  static async create({ user_id, title, description, category, dueDate }) {
    const result = await db.query(
      `INSERT INTO tasks (user_id, title, description, category, due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, title, description, category, due_date, created_at`,
      [user_id, title, description, category, dueDate],
    );

    return result.rows[0];
  }
}
