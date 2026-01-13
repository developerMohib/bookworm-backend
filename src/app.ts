import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes/routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (_req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api', router)




// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// no route handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found 🤦',
  });
});

export default app;
