import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productosRouter from "./src/rutas/ProductosRouter.js";
//import authRouter from "./src/routes/auth.router.js";
//import { auth } from "./src/middlewares/auth.middleware.js";
//import bodyParser from 'body-parser';

const app = express();

app.use(cors()); // Configuración CORS genérica
app.use(express.json());
//app.use(bodyParser.json());

//app.use("/auth", authRouter);
app.use( "/api", productosRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));