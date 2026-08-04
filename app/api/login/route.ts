import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSessionToken, sessionCookieOptions, cookieName } from '@/lib/auth';

function safeEqual(input: string, expected: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || '';

    if (
      !expectedEmail ||
      !expectedPassword ||
      !safeEqual(email, expectedEmail) ||
      !safeEqual(password, expectedPassword)
    ) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const store = await cookies();
    const token = createSessionToken();
    store.set(cookieName(), token, sessionCookieOptions());

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('POST /api/login error:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}