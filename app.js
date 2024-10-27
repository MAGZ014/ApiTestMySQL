import express from "express";
import { clientRouter } from "./routes/clientes.routes.js";
import { carreraRouter } from "./routes/carrera.routes.js";
import { equipoRouter } from "./routes/equipo.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { authenticateToken } from "./middlewares/authenticateToken.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//import "dotenv/config";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

// Rutas de autenticación
app.use("/auth", authRouter);

/// Rutas protegidas
app.use("/cliente", clientRouter);
app.use("/carrera", authenticateToken, carreraRouter);
app.use("/equipo", authenticateToken, equipoRouter);

//Tratrar el error 404
//El manejo del error 404 al final asegura que todas las demás rutas y middlewares sean evaluados primero
app.use((req, res) => {
  res.status(404).send("Error 404: Página no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
