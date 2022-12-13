import express from 'express';
import * as major from '@/controllers/majorController';

const router = express.Router();

router.get('/', major.getMajors);

export default router;
