import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenv.config();

// To do : 개발용, 배포용 분리
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_ENDPOINT,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true, // 개발용
  entities: [join(__dirname, '../entities/*{.ts,.js}')],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
