import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (_req, res) => {
    res.json({ status: 'Server is running' });
});

// Error handling
app.use((err: any, req: Request, res: Response, next:NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;