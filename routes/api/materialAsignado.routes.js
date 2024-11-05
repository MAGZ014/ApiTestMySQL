import { Router } from "express";
import { MaterialAsignadoController } from "../../controllers/materialAsignadoController.js";

export const materialAsignadoRouter = Router();

// Instanciar el controlador
const materialAsignadoController = new MaterialAsignadoController();

materialAsignadoRouter.post(
  "/",
  materialAsignadoController.create.bind(materialAsignadoController)
);
materialAsignadoRouter.get(
  "/:id",
  materialAsignadoController.getById.bind(materialAsignadoController)
);
