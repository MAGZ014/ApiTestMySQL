import { getConnection } from "../config/conexion.js";

export class ClientModel {
  //Obtener los todos los clientes
  static async getAll() {
    const connection = await getConnection();
    const [clientes] = await connection.query(`SELECT * FROM clientes`);
    return clientes;
  }

  static async getById({ id }) {
    const connection = await getConnection();
    const [cliente] = await connection.query(
      `SELECT * FROM clientes WHERE ClientesCodigo = ?;`,
      [id]
    );
    if (cliente.length === 0) return null;

    return cliente[0];
  }

  static async create({ input }) {
    const {
      ClientesNombre,
      ClientesDireccion,
      ClientesTelefono,
      ClientesCelular,
      ClientesMail,
      ClientesObservaciones,
      clientesFrec,
    } = input;

    const connection = await getConnection();

    try {
      // Captura el resultado de la inserción en la variable result
      const [result] = await connection.query(
        `INSERT INTO clientes (ClientesNombre, ClientesDireccion, ClientesTelefono, ClientesCelular
          , ClientesMail, ClientesObservaciones, clientesFrec)
            VALUES (?,?,?,?,?,?,?);`,
        [
          ClientesNombre,
          ClientesDireccion,
          ClientesTelefono,
          ClientesCelular,
          ClientesMail,
          ClientesObservaciones,
          clientesFrec,
        ]
      );

      // Usa result.insertId para obtener el ID del nuevo registro
      const [clientes] = await connection.query(
        `SELECT * FROM clientes WHERE ClientesCodigo = ?;`,
        [result.insertId] // `result.insertId` es el ID del cliente recién insertado
      );

      return clientes[0]; // Devuelve el cliente recién creado
    } catch (e) {
      throw new Error("Error creating client: " + e);
    }
  }

  static async delete({ id }) {
    const connection = await getConnection();

    const [result] = await connection.query(
      `DELETE FROM clientes WHERE ClientesCodigo = ?;`,
      [id]
    );

    // Verifica si se afectó alguna fila
    if (result.affectedRows === 0) {
      return null; // No se encontró el cliente
    }

    return { message: "Cliente eliminado con éxito" }; // Cliente eliminado
  }

  static async update({ id, input }) {
    const {
      ClientesNombre,
      ClientesDireccion,
      ClientesTelefono,
      ClientesCelular,
      ClientesMail,
      ClientesObservaciones,
      clientesFrec,
    } = input;

    const connection = await getConnection();

    try {
      // Realiza la actualización del cliente
      const [result] = await connection.query(
        `UPDATE clientes SET ClientesNombre = ?, ClientesDireccion = ?, ClientesTelefono = ?, 
         ClientesCelular = ?, ClientesMail = ?, ClientesObservaciones = ?, clientesFrec = ? 
         WHERE ClientesCodigo = ?;`,
        [
          ClientesNombre,
          ClientesDireccion,
          ClientesTelefono,
          ClientesCelular,
          ClientesMail,
          ClientesObservaciones,
          clientesFrec,
          id, // Usa el ID para la condición WHERE
        ]
      );

      // Verifica si alguna fila fue afectada
      if (result.affectedRows === 0) {
        return null; // No se encontró el cliente
      }

      // Devuelve el cliente actualizado
      const [updatedClient] = await connection.query(
        `SELECT * FROM clientes WHERE ClientesCodigo = ?;`,
        [id]
      );

      return updatedClient[0];
    } catch (e) {
      throw new Error("Error updating client: " + e);
    }
  }
}
