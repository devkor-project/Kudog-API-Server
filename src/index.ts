import '@/config/env';
import express from '@/config/express';
import logger from '@/config/winston';
import AppDataSource from '@/config/data-source';

const port = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    logger.info('DB Connected');
    express().listen(port);
    logger.info(`environment : ${process.env.NODE_ENV} - API Server Start At Port ${port}`);
  })
  .catch((error) => {
    logger.error('DB Connection Fail');
    logger.error(error.toString());
  });
