import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary' ;
import multer from 'multer';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'bookworm',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      public_id: `${Date.now()}_${file.originalname.split('.')[0]}`,
    };
  },
});


const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });
export default upload;