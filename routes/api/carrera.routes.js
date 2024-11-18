import { Router } from "express";
import { CarreraController } from "../../controllers/carreraController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

export const carreraRouter = Router();

const carreraController = new CarreraController();

carreraRouter.get("/", carreraController.getAll.bind(carreraController));
carreraRouter.post(
  "/",
  authenticateToken,
  carreraController.create.bind(carreraController)
);
carreraRouter.get(
  "/:id",
  authenticateToken,
  carreraController.getById.bind(carreraController)
);
carreraRouter.delete(
  "/:id",
  authenticateToken,
  carreraController.delete.bind(carreraController)
);
carreraRouter.patch(
  "/:id",
  authenticateToken,
  carreraController.update.bind(carreraController)
);
