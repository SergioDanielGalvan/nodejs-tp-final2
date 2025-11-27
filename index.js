import express from 'express';
import cors from 'cors';
import productsRouter from "./src/rutas/ProductosRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productsRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
