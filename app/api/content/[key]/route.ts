import { NextRequest, NextResponse } from 'next/server';
import { readContent } from '@/lib/db';
import { CONTENT_KEYS, type ContentKey } from '@/lib/content';
import { getDefaultContent } from '@/lib/content';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    if (!CONTENT_KEYS.includes(key as ContentKey)) {
      return NextResponse.json({ error: 'Kunci konten tidak valid' }, { status: 400 });
    }

    const payload = await readContent(key);
    if (payload === null) {
      return NextResponse.json(getDefaultContent(key as ContentKey));
    }

    return NextResponse.json(payload);
  } catch (err: unknown) {
    console.error('GET /api/content/[key] error:', err);
    return NextResponse.json({ error: 'Gagal mengambil konten' }, { status: 500 });
  }
}