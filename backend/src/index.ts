import 'dotenv/config';
import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log('Request recibida:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body
  });
  next();
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});