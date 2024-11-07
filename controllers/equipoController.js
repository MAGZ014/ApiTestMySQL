import { BaseController } from "./baseController.js";
import { EquipoModel } from "../models/equipoModel.js";
import {
  validateEquipo,
  validatePartialEquipo,
} from "../schema/equipoSchema.js";

export class EquipoController extends BaseController {
  constructor() {
    super(EquipoModel, validateEquipo, validatePartialEquipo);
  }

  async getByCarrera(req, res) {
    const { id } = req.params;
    try {
      const materiales = await this.model.getByCarrera({ id });
      res.json(materiales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
