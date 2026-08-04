import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deleteCommentById } from '@/lib/db';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const commentId = Number(id);
    if (!Number.isInteger(commentId) || commentId <= 0) {
      return NextResponse.json({ error: 'ID komentar tidak valid' }, { status: 400 });
    }

    const deleted = await deleteCommentById(commentId);
    if (!deleted) {
      return NextResponse.json({ error: 'Komentar tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Komentar berhasil dihapus' });
  } catch (err: unknown) {
    console.error('DELETE /api/admin/comments/[id] error:', err);
    return NextResponse.json({ error: 'Gagal menghapus komentar' }, { status: 500 });
  }
}