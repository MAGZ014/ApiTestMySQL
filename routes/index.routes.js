import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authRouter } from "./api/auth.routes.js";
import { clientRouter } from "./api/clientes.routes.js";
import { equipoRouter } from "./api/equipo.routes.js";
import { carreraRouter } from "./api/carrera.routes.js";
import { tipoRouter } from "./api/tipo.routes.js";
import { materialAsignadoRouter } from "./api/materialAsignado.routes.js";

export const routes = Router();

// Rutas de autenticación
routes.use("/auth", authRouter);

/// Rutas protegidas
routes.use("/cliente", authenticateToken, clientRouter);
routes.use("/carrera", authenticateToken, carreraRouter);
routes.use("/equipo", authenticateToken, equipoRouter);
routes.use("/tipo", tipoRouter);
routes.use("/asignado", materialAsignadoRouter);
