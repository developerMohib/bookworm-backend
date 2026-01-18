import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expiresIn: process.env.JWT_EXPIRES_IN as string,
  saltRounds: parseInt(process.env.SOLT_ROUND as string),
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  cloud_apikey:process.env.CLOUDINARY_API_KEY,
  cloud_apisecret:process.env.CLOUDINARY_API_SECRET
};
