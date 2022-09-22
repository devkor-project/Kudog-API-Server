import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import router from '@/routes/index';
import errorHandler from '@/middleware/error';

const exp = () => {
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
