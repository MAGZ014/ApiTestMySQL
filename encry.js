import { getConnection } from "./config/conexion.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

const saltRounds = 10;

async function encryptPasswords() {
  try {
    const connection = await getConnection();

    // Obtener todos los usuarios con contraseñas en texto plano
    const [users] = await connection.query(
      `SELECT id, password FROM user WHERE password NOT LIKE '$2y$%'`
    );

    for (const user of users) {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Actualizar la base de datos con la contraseña encriptada
      await connection.query(`UPDATE user SET password = ? WHERE id = ?`, [
        hashedPassword,
        user.id,
      ]);
      console.log(`Contraseña de usuario ${user.id} encriptada`);
    }

    console.log("Proceso de encriptación completado.");
  } catch (error) {
    console.error("Error en la encriptación de contraseñas:", error);
  }
}

encryptPasswords();
