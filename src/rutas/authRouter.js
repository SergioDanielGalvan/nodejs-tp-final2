// src/rutas/authRouter.js
import { Router } from 'express';
import { login } from '../controladores/AuthControlers.js';

const router = Router();

console.log("Definiendo ruta /auth/login");
router.post( '/login', login );   

export default router;