import { TokenValidation } from '@/middleware/jwt';
import express from 'express';
import * as user from '@/controllers/userController';

const router = express.Router();
router.get('/mypage', TokenValidation, user.getUserInfo);
router.put('/', TokenValidation, user.modifyUserInfo);

export default router;
