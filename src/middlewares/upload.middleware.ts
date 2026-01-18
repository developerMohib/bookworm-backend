import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_apikey,
  api_secret: config.cloud_apisecret,
});

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadToCloudinary = async (
  buffer: Buffer,
  originalFileName: string,
  folder: string = 'bookworm',
): Promise<{ url: string; publicId: string }> => {
  try {
    const base64Data = buffer.toString('base64');

    // Extract filename without extension
    const fileNameWithoutExt = originalFileName.replace(/\.[^/.]+$/, '');
    // Get file extension
    const fileExtension = originalFileName.split('.').pop() || '';
    // Create timestamp
    const timestamp = Date.now();
    // Create unique filename with timestamp
    const uniqueFileName = `${fileNameWithoutExt}_${timestamp}.${fileExtension}`;
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Data}`,
      {
        folder,
        resource_type: 'auto',
        public_id: uniqueFileName, 
        transformation: [
          { width: 500, height: 500, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
    );
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};
