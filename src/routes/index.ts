import { Router } from 'express';
import authRouter from '@/routes/auth';
import mailRouter from '@/routes/mail';

const router = Router();

/**
 * server health check
 */
router.get('/', (req, res) => {
  res.send(
    '<h1>Devkor project app</h1> <h4>Message: Server is alive</h4> <p>Version 1.0</p>',
  );
});

router.use('/mail', mailRouter);
router.use('/auth', authRouter);
export default router;
