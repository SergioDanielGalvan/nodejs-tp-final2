// src/rutas/authRouter.js
import express from 'express';
import { login } from '../controladores/AuthControlers.js';

const router = express.Router();

router.post( '/login', login );   

export default router;