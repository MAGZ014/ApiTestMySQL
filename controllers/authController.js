// authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/authModel.js";

const SECRET_KEY = process.env.JWT_SECRET;

export class AuthController {
  async login(req, res) {
    const { correo, password } = req.body;
    try {
      const user = await AuthModel.findUserByEmail({ correo });
      if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Genera el token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h", // Tiempo de expiración del token
      });

      // Configura la cookie httpOnly con el token
      // Configuración de la cookie con SameSite=Lax en desarrollo
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res.json({ message: "Inicio de sesión exitoso", id: user.id });
    } catch (error) {
      res.status(500).json({ error: "Error en el login" });
    }
  }

  async logout(req, res) {
    res.clearCookie("jwt"); // Elimina la cookie
    res.json({ message: "Logout exitoso" });
  }
}
