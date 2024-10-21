import express from "express";
import { clientRouter } from "./routes/clientes.routes.js";
//import "dotenv/config";

const app = express();
app.disable("x-powered-by");
// Middleware para interpretar JSON
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.use("/cliente", clientRouter);

//Tratrar el error 404
//El manejo del error 404 al final asegura que todas las demás rutas y middlewares sean evaluados primero
app.use((req, res) => {
  res.status(404).send("Error 404 pe que sad");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
