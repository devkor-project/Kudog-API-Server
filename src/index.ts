import { createConnection } from "typeorm";
import { exp as express } from "../config/express";
import { logger } from "../config/winston";
import connectionOptions from "./database/connectionOption";
import "reflect-metadata";
let port: number;
if (process.env.NODE_ENV === "development") {
  port = 3001;
} else if (process.env.NODE_ENV === "production") {
  port = 3000;
} else {
  port = 8080;
}

createConnection(connectionOptions)
  .then(() => {
    logger.info("DB Connected");
    express().listen(port);
    logger.info(
      `environment : ${process.env.NODE_ENV} - API Server Start At Port ${port}`
    );
  })
  .catch((error) => {
    logger.error(error.toString());
  });
