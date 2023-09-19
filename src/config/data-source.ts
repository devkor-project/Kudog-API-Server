import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'path';
import logger from '@/config/winston';
import dotenv from 'dotenv';

dotenv.config();
// To do : 개발용, 배포용 분리
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false, // 개발용
  entities: [join(__dirname, '../entities/*{.ts,.js}')],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
