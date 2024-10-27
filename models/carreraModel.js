import { getConnection } from "../config/conexion.js";

export class CarreraModel {
  //Obtener los todos los clientes
  static async getAll() {
    try {
      const connection = await getConnection();
      const [carreras] = await connection.query(`SELECT * FROM carrera`);
      return carreras;
    } catch (error) {
      throw new Error("Error fetching carrera: " + error);
    }
  }

  static async getById({ id }) {
    try {
      const connection = await getConnection();
      const [carrera] = await connection.query(
        `SELECT * FROM carrera WHERE id = ?;`,
        [id]
      );
      if (carrera.length === 0) return null;

      return carrera[0];
    } catch (error) {
      throw new Error("Error fetching carrera by ID: " + error);
    }
  }

  static async create({ input }) {
    const { nombre } = input;

    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `INSERT INTO carrera (nombre)
         VALUES (?);`,
        [nombre]
      );

      const [carrera] = await connection.query(
        `SELECT * FROM carrera WHERE id = ?;`,
        [result.insertId] // Usamos `result.insertId` para obtener el ID del nuevo material
      );

      return carrera[0];
    } catch (error) {
      throw new Error("Error creating carrera: " + error);
    }
  }

  static async delete({ id }) {
    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `DELETE FROM carrera WHERE id = ?;`,
        [id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return { message: "Carrera eliminado con éxito" };
    } catch (error) {
      throw new Error("Error deleting carrera: " + error);
    }
  }

  static async update({ id, input }) {
    const { nombre } = input;

    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `UPDATE carrera SET nombre = ? WHERE id = ?;`,
        [nombre, id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      const [updatedCarrera] = await connection.query(
        `SELECT * FROM carrera WHERE id = ?;`,
        [id]
      );

      return updatedCarrera[0];
    } catch (error) {
      throw new Error("Error updating carrera: " + error);
    }
  }
}
