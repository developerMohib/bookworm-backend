import { Router } from 'express';
import {
  loginController,
  registerController,
} from '../loginRegister/loginRegister.controller';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);

const modules_Routes = [
  {
    path: '/regiwait',
    route: 'hello',
  },
];

// modules_Routes.forEach((route) => router.use(route.path, route.route));

export { router };

