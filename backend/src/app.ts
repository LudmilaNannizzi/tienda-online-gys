
import express from 'express';
import productRoutes from './routes/productRoutes';

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));