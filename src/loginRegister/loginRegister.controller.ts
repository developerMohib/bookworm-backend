import { Request, Response } from 'express';
import { loginService, registerService } from './loginReginster.service';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerService({
      name,
      email,
      password,
      photoUrl: req.file?.path || '',
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
    const { user, token } = await loginService({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({
      success: true,
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

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true });
};
