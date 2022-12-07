import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import router from '@/routes/index';
import errorHandler from '@/middleware/error';
import schedule from 'node-schedule';
import { deleteExpiredCodes } from '@/services/authService';

const exp = () => {
  const rule = new schedule.RecurrenceRule();
  rule.minute = 0;
  schedule.scheduleJob(rule, deleteExpiredCodes);

  const app = express();

  app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(compression())
    .use(cors())
    .use(methodOverride())
    .use(express.static('public'));

  app.use(router);
  app.use(errorHandler);
  return app;
};

export default exp;
