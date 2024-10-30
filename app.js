import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { routes } from "./routes/index.routes.js";

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.use("/", routes);
//Tratrar el error 404
//El manejo del error 404 al final asegura que todas las demás rutas y middlewares sean evaluados primero
app.use((req, res) => {
  res.status(404).send("Error 404: Página no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
