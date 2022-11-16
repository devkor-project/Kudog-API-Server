import express from 'express';
import * as notice from '@/controllers/noticeController';

const router = express.Router();

router.get('/:noticeId', notice.getNotice);

export default router;
