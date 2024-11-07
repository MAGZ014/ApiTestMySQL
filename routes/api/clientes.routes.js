import { Router } from "express";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { ClientController } from "../../controllers/clientController.js";

export const clientRouter = Router();

// Instanciar el controlador
const clientController = new ClientController();

// Ruta pública para crear cliente
clientRouter.post("/", clientController.create.bind(clientController));

// Rutas protegidas
clientRouter.get(
  "/",
  authenticateToken,
  clientController.getAll.bind(clientController)
);
clientRouter.get(
  "/:id",
  authenticateToken,
  clientController.getById.bind(clientController)
);
clientRouter.delete(
  "/:id",
  authenticateToken,
  clientController.delete.bind(clientController)
);
clientRouter.patch(
  "/:id",
  authenticateToken,
  clientController.update.bind(clientController)
);
