// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  getProductoByNombre,
  getAllProductosByCategoria,
  createProducto,
} from "../controladores/ProductosControlador.js";

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.get("/productos/nombre/:nombre", getProductoByNombre);
router.get("/productos/categoria", getAllProductosByCategoria);
router.post("/productos", createProducto);
router.delete("/productos/:id", createProducto);

//router.post("/auth/login", loginusuario);

export default router;