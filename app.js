import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { routes } from "./routes/index.routes.js";
import { corsOptions } from "./middlewares/cors.js";

const app = express();
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT ?? 3001;

app.use("/", routes);

// Manejo de error 404
app.use((req, res) => {
  res.status(404).send("Error 404: Página no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
