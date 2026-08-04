import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { listAllOrders } from '@/lib/db';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = await listAllOrders();
    return NextResponse.json(orders);
  } catch (err: unknown) {
    console.error('GET /api/admin/orders error:', err);
    return NextResponse.json({ error: 'Gagal mengambil data pesanan' }, { status: 500 });
  }
}