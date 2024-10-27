// authModel.js
import { getConnection } from "../config/conexion.js";

export class AuthModel {
  static async findUserByEmail({ correo }) {
    try {
      const connection = await getConnection();
      const [user] = await connection.query(
        `SELECT id, correo, password, id_rol FROM user WHERE correo = ?;`,
        [correo]
      );
      console.log(user);
      if (user.length === 0) return null;

      return user[0];
    } catch (error) {
      throw new Error("Error fetching User by Email: " + error);
    }
  }
}
