import { TokenValidation } from '@/middleware/jwt';
import express from 'express';
import * as category from '@/controllers/categoryController';

const router = express.Router();
router.get('/subscribe', TokenValidation, category.getCategoryList);
router.put('/subscribe', TokenValidation, category.subscribeCategory);

export default router;
