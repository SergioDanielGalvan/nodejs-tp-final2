// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  createProducto,
} from "../controladores/ProductosController.js";

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.post("/productos", createProducto);

export default router;