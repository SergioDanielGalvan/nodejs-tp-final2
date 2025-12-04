// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  getProductoByNombre,
  getAllProductosByCategoria,
  getAllProductosWithStock,
  createProducto,
  deleteProductoById,
} from "../controladores/ProductosControlador.js";

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.get("/productos/nombre/:nombre", getProductoByNombre);
router.get("/productos/categoria", getAllProductosByCategoria);
router.get("/productos/stock", getAllProductosWithStock);
router.post("/productos", createProducto);
router.delete("/productos/:id", deleteProductoById);

//router.post("/auth/login", loginusuario);

export default router;