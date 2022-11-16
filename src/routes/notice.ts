import express from 'express';
import * as notice from '@/controllers/noticeController';
import { TokenValidation } from '@/middleware/jwt';

const router = express.Router();

router.get('/', TokenValidation, notice.getNotices);
router.get('/:noticeId', TokenValidation, notice.getNotice);

export default router;
