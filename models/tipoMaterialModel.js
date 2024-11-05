import { getConnection } from "../config/conexion.js";

export class TipoMaterialModel {
  //Obtener los todos los clientes
  static async getAll() {
    try {
      const connection = await getConnection();
      const [Tipos] = await connection.query(`SELECT * FROM tipo_material`);
      return Tipos;
    } catch (error) {
      throw new Error("Error fetching tipo_material: " + error);
    }
  }

  static async getById({ id }) {
    try {
      const connection = await getConnection();
      const [tipo] = await connection.query(
        `SELECT * FROM tipo_material WHERE id = ?;`,
        [id]
      );
      if (tipo.length === 0) return null;

      return tipo[0];
    } catch (error) {
      throw new Error("Error fetching tipo by ID: " + error);
    }
  }
}
