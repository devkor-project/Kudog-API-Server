import express from '@/config/express';
import logger from '@/config/winston';

let port: number;
if (process.env.NODE_ENV === 'development') {
  port = 3001;
} else if (process.env.NODE_ENV === 'production') {
  port = 3000;
} else {
  port = 8080;
}

express().listen(port);
logger.info(
  `environment : ${process.env.NODE_ENV} - API Server Start At Port ${port}`,
);
