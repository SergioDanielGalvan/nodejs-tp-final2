// src/rutas/ProductosRouter.js
import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";

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

// Rutas de productos Publicas
router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.get("/productos/nombre/:nombre", getProductoByNombre);
router.get("/productos/categoria", getAllProductosByCategoria);

// Rutas de productos Privadas
router.get("/productos/stock", auth, getAllProductosWithStock);
router.post("/productos", auth, createProducto);
router.delete("/productos/:id", auth, deleteProductoById);

//router.post("/auth/login", loginusuario);

export default router;