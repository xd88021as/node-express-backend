import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ENV } from '@config/env';
import { entities } from './entities/index';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  synchronize: true,
  entities: [...entities],
});
