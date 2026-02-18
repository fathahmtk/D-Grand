import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', auth, isAdmin, createProduct);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

export default router;
