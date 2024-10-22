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
}
