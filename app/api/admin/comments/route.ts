import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { listComments } from '@/lib/db';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const comments = await listComments();
    return NextResponse.json(comments);
  } catch (err: unknown) {
    console.error('GET /api/admin/comments error:', err);
    return NextResponse.json({ error: 'Gagal mengambil data komentar' }, { status: 500 });
  }
}