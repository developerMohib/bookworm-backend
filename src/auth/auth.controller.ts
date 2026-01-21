import { Request, Response } from 'express';
import {
  getPresentUserServices,
  loginService,
  registerService,
} from './auth.services';
import { uploadToCloudinary } from '../middlewares/upload.middleware';
import { AuthRequest } from '../types/AuthRequest';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    let photoUrl = '';
    if (!req.file) {
      res.status(400).send('No file');
      return;
    }
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        'bookworm', // folder name
      );
      photoUrl = cloudinaryResult.url;
    }

    const user = await registerService({
      name,
      email,
      password,
      photoUrl: photoUrl || '',
    });
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authData = await loginService({ email, password });
    if (!authData) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email. Please sign up first.',
      });
    }
    const { user, token } = authData;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({
      success: true,
      message: 'Login Successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (err: any) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (err.message === 'JWT_CONFIG_MISSING') {
      return res.status(500).json({
        success: false,
        message: 'Authentication configuration error',
      });
    }

    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
};

export const getPresentUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const user = await getPresentUserServices({ userId });

    res.status(200).json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo || null,
      },
    });
    return;
  } catch (error: any) {
    console.error('Get user error:', error);

    if (error.message === 'USER_NOT_FOUND') {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
    return;
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
