import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { router } from './routes/routes';
const app = express();

app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello The bookworm server is ready now😎');
});

// api
app.use('/api', router);

app.use((req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route Not Found',
  });
});


// global error handler
type Err = string | number | undefined | null;
app.use((error: Err, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log('err',error)
    res.status(400).json({
      success: false,
      message: 'Server fail to reload, wait please',
    });
  }
  next();
});

export default app;
