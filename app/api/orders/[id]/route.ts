import { NextRequest, NextResponse } from 'next/server';
import { deleteOrder } from '@/lib/db';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json({ error: 'ID pesanan tidak valid' }, { status: 400 });
    }

    const clientId = _req.nextUrl.searchParams.get('clientId');
    if (!clientId) {
      return NextResponse.json({ error: 'Parameter clientId wajib' }, { status: 400 });
    }

    const deleted = await deleteOrder(orderId, clientId);
    if (!deleted) {
      return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pesanan berhasil dihapus' });
  } catch (err: unknown) {
    console.error('DELETE /api/orders/[id] error:', err);
    return NextResponse.json({ error: 'Gagal menghapus pesanan' }, { status: 500 });
  }
}