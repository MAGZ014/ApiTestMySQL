import { Router } from "express";
import { CarreraController } from "../controllers/carreraController.js";

export const carreraRouter = Router();

carreraRouter.get("/", CarreraController.getAll);
carreraRouter.post("/", CarreraController.create);
carreraRouter.get("/:id", CarreraController.getById);
carreraRouter.delete("/:id", CarreraController.delete);
carreraRouter.patch("/:id", CarreraController.update);
