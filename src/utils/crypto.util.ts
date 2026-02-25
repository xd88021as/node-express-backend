import { ENV } from '@config/env';
import crypto from 'crypto';

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = 'sha256';

const FIXED_AES_KEY = Buffer.from(ENV.AES_256_CBC_KEY_HEX, 'hex');
const FIXED_AES_IV = Buffer.from(ENV.AES_256_CBC_IV_UTF8, 'utf8');

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(':');
  if (!salt || !originalHash) return false;
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  const originalBuffer = Buffer.from(originalHash, 'hex');
  const currentBuffer = Buffer.from(hash, 'hex');
  if (originalBuffer.length !== currentBuffer.length) return false;
  return crypto.timingSafeEqual(originalBuffer, currentBuffer);
}

export function sha256Hash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function encryptFixedAesCbcBase64(plaintext: string): string {
  const cipher = crypto.createCipheriv('aes-256-cbc', FIXED_AES_KEY, FIXED_AES_IV);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

export function decryptFixedAesCbcBase64(ciphertextBase64: string): string {
  const decipher = crypto.createDecipheriv('aes-256-cbc', FIXED_AES_KEY, FIXED_AES_IV);
  let decrypted = decipher.update(ciphertextBase64, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
