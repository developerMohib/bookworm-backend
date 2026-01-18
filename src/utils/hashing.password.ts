import bcrypt from 'bcrypt';
import config from '../config';

export const hashingPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(Number(config.saltRounds));
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw new Error('Password hashing failed');
  }
};

export const comparingPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Password comparison failed:', error);
    throw new Error('Password comparison failed');
  }
};