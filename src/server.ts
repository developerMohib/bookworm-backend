import app from './app';
import config from './config';
import { connectDB } from './db/db';

const server = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
    app.listen(config.server.port, () => {
      console.log(`Example app listening on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('DB connection failed', error);
  }
};

server();
