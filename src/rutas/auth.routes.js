import express from 'express';
import { login } from '../controladores/AuthControlers';

const router = express.Router();

router.post( '/login', login );   

export default router;