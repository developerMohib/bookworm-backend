import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const globalErrorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong MongoDB ID error
    if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = `Resource not found. Invalid: ${(err as any).path}`;
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err.message = 'Invalid token';
        err.statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
        err.message = 'Token has expired';
        err.statusCode = 401;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default globalErrorHandler;