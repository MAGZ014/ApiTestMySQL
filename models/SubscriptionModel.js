import { getConnection } from "../config/conexion.js";

export class SubscriptionModel {
  static async getAll() {
    try {
      const connection = await getConnection();
      const [Tipos] = await connection.query(
        `SELECT * FROM push_subscriptions`
      );
      return Tipos;
    } catch (error) {
      throw new Error("Error fetching push_subscriptions: " + error);
    }
  }

  static async create({ input }) {
    const { userId, endpoint, p256dh, auth } = input;
    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth)
            VALUES (?, ?, ?, ?)`,
        [userId, endpoint, p256dh, auth]
      );

      const [material] = await connection.query(
        `SELECT * FROM push_subscriptions WHERE id = ?;`,
        [result.insertId]
      );

      return material[0];
    } catch (error) {
      throw new Error("Error creating material: " + error);
    }
  }
  static async getByUserId(userId) {
    try {
      const connection = await getConnection();
      const [subscriptions] = await connection.query(
        `SELECT * FROM push_subscriptions WHERE user_id = ?`,
        [userId]
      );
      return subscriptions;
    } catch (error) {
      throw new Error("Error fetching subscriptions for user: " + error);
    }
  }
}
