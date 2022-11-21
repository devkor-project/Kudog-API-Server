import express from 'express';
import * as notice from '@/controllers/noticeController';
import { TokenValidation } from '@/middleware/jwt';

const router = express.Router();

router.get('/details/:noticeId', TokenValidation, notice.getNotice);
router.get('/hot', TokenValidation, notice.getHotNotices);
router.get('/', TokenValidation, notice.getNotices);

export default router;
