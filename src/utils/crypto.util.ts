import crypto from 'crypto';

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = 'sha256';

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  const originalBuffer = Buffer.from(originalHash, 'hex');
  const currentBuffer = Buffer.from(hash, 'hex');
  return crypto.timingSafeEqual(originalBuffer, currentBuffer);
}

export function sha256Hash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}
