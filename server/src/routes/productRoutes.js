import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// ─── Validation Schemas ───────────────────────────────────────────────────────

const createProductSchema = {
    title: { required: true, type: 'string', minLength: 2, maxLength: 120 },
    price: { required: true, type: 'number', min: 1 },
    category: { required: true, type: 'string', minLength: 2 },
};

const updateProductSchema = {
    title: { type: 'string', minLength: 2, maxLength: 120 },
    price: { type: 'number', min: 1 },
};

// ─── Routes ───────────────────────────────────────────────────────────────────

const router = Router();

router.get('/', asyncHandler(listProducts));
router.get('/:id', asyncHandler(getProduct));
router.post('/', auth, isAdmin, validate(createProductSchema), asyncHandler(createProduct));
router.put('/:id', auth, isAdmin, validate(updateProductSchema), asyncHandler(updateProduct));
router.delete('/:id', auth, isAdmin, asyncHandler(deleteProduct));

export default router;
