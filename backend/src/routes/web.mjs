import { Router } from 'express';
import { login } from '../app/controllers/auth/loginController.mjs';

const router = new Router();

router.post('/login', login);

export default router;
