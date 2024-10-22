import { Router } from "express";
import { ClientController } from "../controllers/clientController.js";

export const clientRouter = Router();

// Instanciar el controlador
const clientController = new ClientController();

clientRouter.get("/", clientController.getAll.bind(clientController));
clientRouter.post("/", clientController.create.bind(clientController));
clientRouter.get("/:id", clientController.getById.bind(clientController));
clientRouter.delete("/:id", clientController.delete.bind(clientController));
clientRouter.patch("/:id", clientController.update.bind(clientController));
