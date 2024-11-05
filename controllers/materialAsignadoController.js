import { BaseController } from "./baseController.js";
import { materialAsignadoModel } from "../models/materialAsignadoModel.js";

export class MaterialAsignadoController extends BaseController {
  constructor() {
    super(materialAsignadoModel);
  }
}
