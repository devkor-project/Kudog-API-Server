import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
dotenv.config();
const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_ENDPOINT,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ["./entities/**/*.*"],
  migrations: [],
  subscribers: [],
};

export default connectionOptions;
