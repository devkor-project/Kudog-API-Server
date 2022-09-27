import express from 'express';
import * as auth from '@/controllers/authController';
import { loginValidation } from '@/middleware/validateBody';
import { TokenValidation } from '@/middleware/jwt';

const router = express.Router();

/**
 * 로그인 API
 */
router.post('/login', loginValidation, auth.login);

/**
 * access token 재발급 API
 */
router.post('/token', TokenValidation, auth.getAccessToken);

router.post('/mail/req', auth.authMailReq);
router.post('/mail/auth', auth.authMail);
router.post('/signup', auth.signup);

export default router;
