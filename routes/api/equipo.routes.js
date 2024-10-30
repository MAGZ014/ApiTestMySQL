import { Router } from "express";
import { EquipoController } from "../../controllers/equipoController.js";

export const equipoRouter = Router();

// Instanciar el controlador
const equipoController = new EquipoController();

equipoRouter.get("/", equipoController.getAll.bind(equipoController));
equipoRouter.post("/", equipoController.create.bind(equipoController));
equipoRouter.get("/:id", equipoController.getById.bind(equipoController));
equipoRouter.delete("/:id", equipoController.delete.bind(equipoController));
equipoRouter.patch("/:id", equipoController.update.bind(equipoController));
