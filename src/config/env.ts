import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '1234',
  DB_DATABASE: process.env.DB_DATABASE || 'database',
  JWT_SECRET: process.env.JWT_SECRET || 'finding-lost-magic',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  REDIS_DB: Number(process.env.REDIS_DB) || 0,
  PROJECT_NAME: process.env.PROJECT_NAME || 'finding-lost-magic',
  ENVIRONMENT: process.env.ENVIRONMENT || 'stg',
};
