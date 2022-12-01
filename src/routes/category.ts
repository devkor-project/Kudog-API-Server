import { TokenValidation } from '@/middleware/jwt';
import express from 'express';
import * as category from '@/controllers/categoryController';

const router = express.Router();
router.get('/subscribe', TokenValidation, category.getCategoryList);
router.put('/subscribe', TokenValidation, category.subscribeCategory);
router.put('/subscribe/many', TokenValidation, category.subscribeCategories);
router.get('/provider', category.categoryByProvider);

router.get('/', category.getAllCategories);

export default router;
