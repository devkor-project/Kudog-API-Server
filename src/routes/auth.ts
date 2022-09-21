import express from 'express';
import * as auth from '@/controllers/authController';
import * as authMiddleware from '@/middleware/validateBody';

const router = express.Router();

/**
 * 로그인 API
 */
router.post('/login', authMiddleware.loginValidation, auth.login);

/**
 * access token 재발급 API
 */
// router.post("/token", auth.getAccessToken);

export default router;
