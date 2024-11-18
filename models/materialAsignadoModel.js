// userModel.js
import { getConnection } from "../config/conexion.js";

export class materialAsignadoModel {
  // Método para asignar una carrera al usuario
  static async create({ input }) {
    const { id_carrera, id_material } = input;
    console.log(input);

    try {
      const connection = await getConnection();
      const [result] = await connection.query(
        `INSERT INTO material_asignado (id_carrera, id_material)
         VALUES (?, ?);`,
        [id_carrera, id_material]
      );
      return { message: "Carrera asignada con éxito" + result };
    } catch (error) {
      throw new Error("Error creating material_asignado: " + error);
    }
  }

  // Método para obtener las carreras asignadas a un usuario
  static async getById({ id }) {
    try {
      const connection = await getConnection();
      const [asignada] = await connection.query(
        `SELECT c.id AS id_carrera,c.nombre AS nombre_carrera,m.id AS id_material,m.datos,
        m.url,m.img_url,m.price,m.reviews,m.rating FROM carrera c
        JOIN material_asignado ma ON c.id = ma.id_carrera
        JOIN material m ON ma.id_material = m.id
        WHERE c.id = ?;`,
        [id]
      );
      return asignada;
    } catch (error) {
      throw new Error("Error al obtener datos: " + error);
    }
  }
}
