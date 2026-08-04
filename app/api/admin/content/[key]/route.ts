import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { readContent, upsertContent } from '@/lib/db';
import { CONTENT_KEYS, type ContentKey } from '@/lib/content';
import { getDefaultContent } from '@/lib/content';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key } = await params;
    if (!CONTENT_KEYS.includes(key as ContentKey)) {
      return NextResponse.json({ error: 'Kunci konten tidak valid' }, { status: 400 });
    }

    const payload = await readContent(key);
    return NextResponse.json(payload === null ? getDefaultContent(key as ContentKey) : payload);
  } catch (err: unknown) {
    console.error('GET /api/admin/content/[key] error:', err);
    return NextResponse.json({ error: 'Gagal mengambil konten' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key } = await params;
    if (!CONTENT_KEYS.includes(key as ContentKey)) {
      return NextResponse.json({ error: 'Kunci konten tidak valid' }, { status: 400 });
    }

    const payload = await req.json();
    if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ error: 'Payload konten tidak valid' }, { status: 400 });
    }

    await upsertContent(key, payload);
    return NextResponse.json({ message: 'Konten berhasil disimpan' });
  } catch (err: unknown) {
    console.error('PUT /api/admin/content/[key] error:', err);
    return NextResponse.json({ error: 'Gagal menyimpan konten' }, { status: 500 });
  }
}