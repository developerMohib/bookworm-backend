import config from '../config';
import User from '../modules/users/user.model';
import jwt from 'jsonwebtoken';
import { comparingPassword, hashingPassword } from '../utils/hashing.password';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const registerService = async ({
  name,
  email,
  password,
  photoUrl,
}: RegisterPayload) => {
  // hash password
  const hashedPassword = await hashingPassword(password);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    photo: photoUrl,
  });
  return user;
};

export const loginService = async ({ email, password }: LoginPayload) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await comparingPassword(password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  if (!config.jwt_secret || !config.jwt_expiresIn) {
    throw new Error('JWT_CONFIG_MISSING');
  }

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    config.jwt_secret,
    { expiresIn: '7d' },
  );

  return {
    user,
    token,
  };
};