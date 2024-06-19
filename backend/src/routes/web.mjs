import { Router } from 'express';
import { signup, login } from '../app/controllers/auth/loginController.mjs';

const router = new Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;
