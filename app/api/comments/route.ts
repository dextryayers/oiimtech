import { NextRequest, NextResponse } from 'next/server';
import { createComment } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, address, question } = body;

    if (!firstName || !lastName || !email || !phone || !question) {
      return NextResponse.json(
        { error: 'Data komentar tidak lengkap (firstName, lastName, email, phone, question)' },
        { status: 400 }
      );
    }

    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof phone !== 'string' || typeof question !== 'string') {
      return NextResponse.json({ error: 'Format data komentar tidak valid' }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 });
    }

    const comment = await createComment({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: typeof address === 'string' ? address.trim() : '',
      question: question.trim(),
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err: unknown) {
    console.error('POST /api/comments error:', err);
    return NextResponse.json({ error: 'Gagal menyimpan komentar' }, { status: 500 });
  }
}