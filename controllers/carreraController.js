import { BaseController } from "./baseController.js";
import { CarreraModel } from "../models/carreraModel.js";
import {
  validateCarrera,
  validatePartialCarrera,
} from "../schema/carreraSchema.js";

export class CarreraController extends BaseController {
  constructor() {
    super(CarreraModel, validateCarrera, validatePartialCarrera);
  }
}
