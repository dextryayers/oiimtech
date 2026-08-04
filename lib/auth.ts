import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual as _tsEqual } from 'node:crypto';

export const SESSION_COOKIE = 'admin_session';
const VERSION = 'oiimtech-admin:v1';

function cookieName(): string {
  return SESSION_COOKIE;
}

function signingSecret(): string {
  return process.env.ADMIN_PASSWORD || 'oiimtech-admin';
}

export function createSessionToken(): string {
  return createHmac('sha256', signingSecret()).update(VERSION).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return _tsEqual(bufA, bufB);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(cookieName())?.value;
  if (!token) return false;
  const expected = createSessionToken();
  return safeEqual(token, expected);
}

export function sessionCookieOptions(): {
  httpOnly: true;
  sameSite: 'lax';
  secure: boolean;
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}

export { cookieName };