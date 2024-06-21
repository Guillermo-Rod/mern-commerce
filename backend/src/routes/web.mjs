import { Router } from 'express';
import { signup, login, refreshAuthToken } from '../app/controllers/auth/loginController.mjs';
import { show as showUser } from '../app/controllers/userController.mjs';

const router = new Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh-token', refreshAuthToken);
router.get('/user-info', showUser);

export default router;
