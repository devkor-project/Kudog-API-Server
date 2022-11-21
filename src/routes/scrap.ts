import express from 'express';
import * as scrap from '@/controllers/scrapController';
import { TokenValidation } from '@/middleware/jwt';

const router = express.Router();

router.get('/', TokenValidation, scrap.getScraps);

export default router;
