import { Router } from "express";
import { TipoMaterialController } from "../../controllers/tipoMaterialController.js";

export const tipoRouter = Router();

// Instanciar el controlador
const tipoMaterialController = new TipoMaterialController();

tipoRouter.get("/", tipoMaterialController.getAll.bind(tipoMaterialController));
tipoRouter.get(
  "/:id",
  tipoMaterialController.getById.bind(tipoMaterialController)
);
