import { BaseController } from "./baseController.js";
import { TipoMaterialModel } from "../models/tipoMaterialModel.js";

export class TipoMaterialController extends BaseController {
  constructor() {
    super(TipoMaterialModel);
  }
}
