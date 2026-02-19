import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.get('/', asyncHandler(listProducts));
router.get('/:id', asyncHandler(getProduct));
router.post('/', auth, isAdmin, asyncHandler(createProduct));
router.put('/:id', auth, isAdmin, asyncHandler(updateProduct));
router.delete('/:id', auth, isAdmin, asyncHandler(deleteProduct));

export default router;
