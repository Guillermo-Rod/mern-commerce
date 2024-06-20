import { Router } from 'express';
import { signup, login, refreshAuthToken } from '../app/controllers/auth/loginController.mjs';
import User from '../app/models/User.mjs';

const router = new Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh-token', refreshAuthToken)

export default router;
