import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());


app.use('/api/products', productRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  });
});