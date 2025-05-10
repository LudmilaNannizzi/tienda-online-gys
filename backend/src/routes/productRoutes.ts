import express, { RequestHandler } from 'express';
import { createProduct, getProducts } from '../controllers/productController';

const router = express.Router();


router.post('/', createProduct as RequestHandler);
router.get('/', getProducts as RequestHandler);
router.get('/test', (req, res) => {
  res.json({ message: '¡Ruta de prueba funciona!' });
});
export default router;