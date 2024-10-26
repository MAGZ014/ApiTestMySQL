import { getConnection } from "../config/conexion.js";

export class ClientModel {
  //Obtener los todos los user
  static async getAll() {
    const connection = await getConnection();
    const [users] = await connection.query(`SELECT * FROM user`);
    return users;
  }

  static async getById({ id }) {
    const connection = await getConnection();
    const [user] = await connection.query(`SELECT * FROM user WHERE id = ?;`, [
      id,
    ]);
    if (user.length === 0) return null;

    return user[0];
  }

  static async create({ input }) {
    const { nombre, correo, cuatrimestre, password, carrera, id_rol } = input;

    const connection = await getConnection();

    try {
      // Captura el resultado de la inserción en la variable result
      const [result] = await connection.query(
        `INSERT INTO user (nombre,correo,cuatrimestre,password,carrera,id_rol)
            VALUES (?,?,?,?,?,?);`,
        [nombre, correo, cuatrimestre, password, carrera, id_rol]
      );

      // Usa result.insertId para obtener el ID del nuevo registro
      const [user] = await connection.query(
        `SELECT * FROM user WHERE id = ?;`,
        [result.insertId] // `result.insertId` es el ID del user recién insertado
      );

      return user[0]; // Devuelve el user recién creado
    } catch (e) {
      throw new Error("Error creating user: " + e);
    }
  }

  static async delete({ id }) {
    const connection = await getConnection();

    const [result] = await connection.query(`DELETE FROM user WHERE id = ?;`, [
      id,
    ]);

    // Verifica si se afectó alguna fila
    if (result.affectedRows === 0) {
      return null; // No se encontró el user
    }

    return { message: "User eliminado con éxito" }; // user eliminado
  }

  static async update({ id, input }) {
    const { nombre, correo, cuatrimestre, password, carrera, id_rol } = input;

    const connection = await getConnection();

    try {
      // Realiza la actualización del user
      const [result] = await connection.query(
        `UPDATE user SET nombre = ?, correo = ?, cuatrimestre = ?, 
         password = ?, carrera = ?, id_rol = ? 
         WHERE id = ?;`,
        [
          nombre,
          correo,
          cuatrimestre,
          password,
          carrera,
          id_rol,
          id, // Usa el ID para la condición WHERE
        ]
      );

      // Verifica si alguna fila fue afectada
      if (result.affectedRows === 0) {
        return null; // No se encontró el user
      }

      // Devuelve el user actualizado
      const [updatedUser] = await connection.query(
        `SELECT * FROM user WHERE id = ?;`,
        [id]
      );

      return updatedUser[0];
    } catch (e) {
      throw new Error("Error updated user: " + e);
    }
  }
}
