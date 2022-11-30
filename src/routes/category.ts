import { TokenValidation } from '@/middleware/jwt';
import express from 'express';
import * as category from '@/controllers/categoryController';

const router = express.Router();
router.get('/subscribe', TokenValidation, category.getCategoryList);
router.put('/subscribe', TokenValidation, category.subscribeCategory);
router.get('/', category.getAllCategories);

export default router;
