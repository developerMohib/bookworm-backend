import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';
import { loginController, registerController } from '../auth/auth.controller';

const router = Router();

router.post('/register', upload.single('photoUrl'), registerController);
router.post('/login', loginController);

const modules_Routes = [
  {
    path: '/regiwait',
    route: loginController,
  },
];

modules_Routes.forEach((route) => router.use(route.path, route.route));

export { router };
