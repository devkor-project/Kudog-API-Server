import express from 'express';
import * as scrap from '@/controllers/scrapController';
import { TokenValidation } from '@/middleware/jwt';

const router = express.Router();

router.get('/', TokenValidation, scrap.getScraps);
router.put('/:noticeId', TokenValidation, scrap.updateScrap);

export default router;
