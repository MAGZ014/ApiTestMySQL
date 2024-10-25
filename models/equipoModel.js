import fs from "fs/promises";
import path from "path";

const filePath = path.join("processed_amazon_laptops.json");

export class EquipoModel {
  // Obtener todos los equipos
  static async getAll() {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const equipos = JSON.parse(data);
      return equipos;
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      return [];
    }
  }

  static async getById({ id }) {
    try {
      const equipos = await this.getAll();
      const equipo = equipos.find((e) => e.id === Number(id)); // Convertir a número
      return equipo || null;
    } catch (error) {
      console.error("Error al obtener equipo por ID:", error);
      return null;
    }
  }
}
