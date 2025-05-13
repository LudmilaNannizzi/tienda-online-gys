import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tienda_tecnico';
    await mongoose.connect(mongoURI);
    console.log('🍃 MongoDB conectado🍃');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;