import config from '../config';
import User from '../modules/users/model/user.model';
import { comparingPassword, hashingPassword } from '../utils/hashing.password';
import jwt from 'jsonwebtoken';

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
  // default avatar
  // photoUrl = 'https://www.w3schools.com/howto/img_avatar.png';
console.log(25, {name, email, password, photoUrl})
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

  console.log('41', user);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await comparingPassword(password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  if (!config.jwt.secret || !config.jwt.expiresIn) {
    throw new Error('JWT_CONFIG_MISSING');
  }

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    config.jwt.secret,
    { expiresIn: '7d' },
  );

  return {
    user,
    token,
  };
};
