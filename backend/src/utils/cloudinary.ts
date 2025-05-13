import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadImage = async (file: Express.Multer.File) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`, 
      { folder: 'tienda-online' }
    );
    return result.secure_url;
  } catch (error) {
    console.error("Error subiendo a Cloudinary:", error);
    throw new Error("Error al subir la imagen");
  }
};