import express, { RequestHandler } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts as RequestHandler);
router.get('/:id', getProduct as RequestHandler);
router.post('/', createProduct as RequestHandler);
router.put('/:id', updateProduct as RequestHandler);
router.delete('/:id', deleteProduct as RequestHandler);

export default router;