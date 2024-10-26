import { getConnection } from "../config/conexion.js";

export class EquipoModel {
  // Obtener todos los equipos
  static async getAll() {
    try {
      const connection = await getConnection();
      const [materiales] = await connection.query(`SELECT * FROM material`);
      return materiales;
    } catch (error) {
      throw new Error("Error fetching materials: " + error);
    }
  }

  static async getById({ id }) {
    try {
      const connection = await getConnection();
      const [material] = await connection.query(
        `SELECT * FROM material WHERE id = ?;`,
        [id]
      );
      if (material.length === 0) return null;

      return material[0];
    } catch (error) {
      throw new Error("Error fetching material by ID: " + error);
    }
  }

  static async create({ input }) {
    const { datos, url, img_url, price, reviews, rating, id_tipo_material } =
      input;

    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `INSERT INTO material (datos, url, img_url, price, reviews, rating, id_tipo_material)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [datos, url, img_url, price, reviews, rating, id_tipo_material]
      );

      const [material] = await connection.query(
        `SELECT * FROM material WHERE id = ?;`,
        [result.insertId] // Usamos `result.insertId` para obtener el ID del nuevo material
      );

      return material[0];
    } catch (error) {
      throw new Error("Error creating material: " + error);
    }
  }

  static async delete({ id }) {
    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `DELETE FROM material WHERE id = ?;`,
        [id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return { message: "Material eliminado con éxito" };
    } catch (error) {
      throw new Error("Error deleting material: " + error);
    }
  }

  static async update({ id, input }) {
    const { datos, url, img_url, price, reviews, rating, id_tipo_material } =
      input;

    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `UPDATE material SET datos = ?, url = ?, img_url = ?, 
         price = ?, reviews = ?, rating = ?, id_tipo_material = ? 
         WHERE id = ?;`,
        [datos, url, img_url, price, reviews, rating, id_tipo_material, id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      const [updatedMaterial] = await connection.query(
        `SELECT * FROM material WHERE id = ?;`,
        [id]
      );

      return updatedMaterial[0];
    } catch (error) {
      throw new Error("Error updating material: " + error);
    }
  }
}
