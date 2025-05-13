import express, { RequestHandler } from 'express';
import multer from 'multer';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getProducts as RequestHandler);
router.get('/:id', getProduct as RequestHandler);
router.post('/', upload.single('image'), createProduct as RequestHandler);
router.put('/:id', updateProduct as RequestHandler);
router.delete('/:id', deleteProduct as RequestHandler);

export default router;