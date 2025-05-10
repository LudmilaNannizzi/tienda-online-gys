import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌ Variable MONGODB_URI no definida en .env');
}


mongoose.set('strictQuery', true); 

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error de conexión:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

// Eventos de conexión
mongoose.connection.on('connected', () => console.log('Mongoose conectado'));
mongoose.connection.on('error', (err) => console.error('Mongoose error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose desconectado'));

export default connectDB;