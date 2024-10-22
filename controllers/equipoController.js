import { EquipoModel } from "../models/equipoModel.js";
import {
  validateEquipo,
  validatePartialEquipo,
} from "../schema/equipoSchema.js";

export class EquipoController {
  //Obtener todos los clientes
  static async getAll(req, res) {
    const equipos = await EquipoModel.getAll();
    res.json(equipos);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const equipo = await EquipoModel.getById({ id });
    if (!equipo) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(equipo);
  }

  static async create(req, res) {
    const result = validateEquipo(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newEquipo = await ClientModel.create({ input: result.data });
    res.status(201).json(newEquipo);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await EquipoModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Equipo not found" });
    }

    return res.json({ message: "Equipo deleted" });
  }

  static async update(req, res) {
    const result = validatePartialEquipo(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedEquipo = await EquipoModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedEquipo);
  }
}
