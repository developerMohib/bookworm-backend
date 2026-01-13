import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT as string),
    nodeEnv: process.env.NODE_ENV,
  },
  database: {
    url: process.env.DATABASE_URL as string,
  },
   jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  },
  saltRounds: parseInt(process.env.SOLT_ROUND as string),
};

export default config;
