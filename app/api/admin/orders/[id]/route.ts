import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { updateOrderStatus, deleteOrderById, ORDER_STATUSES } from '@/lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const orderId = Number(id);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json({ error: 'ID pesanan tidak valid' }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !ORDER_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Status pesanan tidak valid' }, { status: 400 });
    }

    const order = await updateOrderStatus(orderId, status);
    if (!order) {
      return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err: unknown) {
    console.error('PATCH /api/admin/orders/[id] error:', err);
    return NextResponse.json({ error: 'Gagal memperbarui status pesanan' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const orderId = Number(id);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json({ error: 'ID pesanan tidak valid' }, { status: 400 });
    }

    const deleted = await deleteOrderById(orderId);
    if (!deleted) {
      return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pesanan berhasil dihapus' });
  } catch (err: unknown) {
    console.error('DELETE /api/admin/orders/[id] error:', err);
    return NextResponse.json({ error: 'Gagal menghapus pesanan' }, { status: 500 });
  }
}