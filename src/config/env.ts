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
  REDIS_URL: process.env.REDIS_URL || '',
  REDIS_TOKEN: process.env.REDIS_TOKEN || '',
  PROJECT_NAME: process.env.PROJECT_NAME || 'finding-lost-magic',
  ENVIRONMENT: process.env.ENVIRONMENT || 'stg',
  AES_256_CBC_KEY_HEX: process.env.AES_256_CBC_KEY_HEX || '',
  AES_256_CBC_IV_UTF8: process.env.AES_256_CBC_IV_UTF8 || '',
};
