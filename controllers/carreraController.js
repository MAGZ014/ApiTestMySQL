import { CarreraMadel } from "../models/carreraModel.js";

import {
  validateCarrera,
  validatePartialCarrera,
} from "../schema/carreraSchema.js";

export class CarreraController {
  //Obtener todos los clientes
  static async getAll(req, res) {
    const carreras = await CarreraMadel.getAll();
    res.json(carreras);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const carrera = await CarreraMadel.getById({ id });
    if (!carrera) {
      return res.status(404).json({ message: "Carrera not found" });
    }
    res.json(carrera);
  }

  static async create(req, res) {
    const result = validateCarrera(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newCarrera = await CarreraMadel.create({ input: result.data });
    res.status(201).json(newCarrera);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await CarreraMadel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Carrera not found" });
    }

    return res.json({ message: "Carrera deleted" });
  }

  static async update(req, res) {
    const result = validatePartialCarrera(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedCarrera = await CarreraMadel.update({
      id,
      input: result.data,
    });

    return res.json(updatedCarrera);
  }
}
