import express from 'express';
import * as mail from '@/controllers/mailController';

const router = express.Router();

router.post('/send', mail.sendMail);

export default router;
