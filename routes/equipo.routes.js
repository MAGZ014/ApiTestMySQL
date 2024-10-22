import { Router } from "express";
import { EquipoController } from "../controllers/equipoController.js";

export const equipoRouter = Router();

equipoRouter.get("/", EquipoController.getAll);
equipoRouter.post("/", EquipoController.create);
equipoRouter.get("/:id", EquipoController.getById);
equipoRouter.delete("/:id", EquipoController.delete);
equipoRouter.patch("/:id", EquipoController.update);
