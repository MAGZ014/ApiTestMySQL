import { Router } from "express";
import { CarreraController } from "../controllers/carreraController.js";

export const carreraRouter = Router();

const carreraController = new CarreraController();

carreraRouter.get("/", carreraController.getAll.bind(carreraController));
carreraRouter.post("/", carreraController.create.bind(carreraController));
carreraRouter.get("/:id", carreraController.getById.bind(carreraController));
carreraRouter.delete("/:id", carreraController.delete.bind(carreraController));
carreraRouter.patch("/:id", carreraController.update.bind(carreraController));
