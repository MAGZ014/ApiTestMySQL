import { Router } from "express";
import { authRouter } from "./api/auth.routes.js";
import { clientRouter } from "./api/clientes.routes.js";
import { equipoRouter } from "./api/equipo.routes.js";
import { carreraRouter } from "./api/carrera.routes.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

export const routes = Router();

// Rutas de autenticación
routes.use("/auth", authRouter);

/// Rutas protegidas
routes.use("/cliente", authenticateToken, clientRouter);
routes.use("/carrera", authenticateToken, carreraRouter);
routes.use("/equipo", authenticateToken, equipoRouter);
