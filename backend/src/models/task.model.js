import db from "../config/db.js";

export default class Task {
  static async create({ userId, title, description, category, dueDate }) {
    const result = await db.query(
      `INSERT INTO tasks (user_id, title, description, category, due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, title, description, category, due_date, created_at`,
      [userId, title, description, category, dueDate],
    );

    return result.rows[0];
  }

  static async getTodayTasks(userId, startDate, endDate) {
    const result = await db.query(
      `SELECT id, user_id, title, description, category, due_date, created_at FROM tasks
      WHERE user_id = $1 AND due_date >= $2 AND due_date < $3
      ORDER BY created_at DESC`,
      [userId, startDate, endDate],
    );

    return result.rows;
  }

  static async getTomorrowTasks(userId, startDate, endDate) {
    const result = await db.query(
      `SELECT id, user_id, title, description, category, due_date, created_at FROM tasks
      WHERE user_id = $1 AND due_date >= $2 AND due_date < $3
      ORDER BY created_at DESC`,
      [userId, startDate, endDate],
    );

    return result.rows;
  }

  static async getWeekTasks(userId, start, end) {
    const result = await db.query(
      `SELECT id, user_id, title, description, category, due_date, created_at FROM tasks
      WHERE user_id = $1 AND due_date >= $2 AND due_date <= $3
      ORDER BY created_at DESC`,
      [userId, start, end],
    );

    return result.rows;
  }
}
