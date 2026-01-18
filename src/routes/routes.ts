import { Router } from 'express';
import { loginController, registerController } from '../auth/auth.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/register',  upload.single('image'), registerController);
router.post('/login', loginController);

const modules_Routes = [
  {
    path: '/regiwait',
    route: loginController,
  },
];

modules_Routes.forEach((route) => router.use(route.path, route.route));

export { router };
