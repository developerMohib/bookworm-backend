import { Router } from 'express';
import { getPresentUserController, loginController, logoutController, registerController } from '../auth/auth.controller';
import { upload } from '../middlewares/upload.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register',  upload.single('image'), registerController);
router.post('/login', loginController);

// Protected routes
router.get('/present/user', authenticate, getPresentUserController);
router.post('/logout', logoutController);

const modules_Routes = [
  {
    path: '/regiwait',
    route: loginController,
  },
];

modules_Routes.forEach((route) => router.use(route.path, route.route));

export { router };
