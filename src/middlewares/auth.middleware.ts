import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../modules/users/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument; 
      userId : string;
      userRole:string;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};


// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   let token: string | undefined;

//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token invalid' });
//   }
// };


export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission' });
    }
    next();
  };
};