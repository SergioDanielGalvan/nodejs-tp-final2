// src/rutas/authRouter.js
import { Router } from 'express';
import { login } from '../controladores/AuthControlers.js';

const router = Router();

router.post( '/login', login );   

export default router;