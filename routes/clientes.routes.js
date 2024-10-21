import { Router } from "express";
import { ClientController } from "../controllers/clientController.js";

export const clientRouter = Router();

clientRouter.get("/", ClientController.getAll);
clientRouter.post("/", ClientController.create);
clientRouter.get("/:id", ClientController.getById);
clientRouter.delete("/:id", ClientController.delete);
clientRouter.patch("/:id", ClientController.update);
