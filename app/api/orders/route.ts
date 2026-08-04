import { NextRequest, NextResponse } from 'next/server';
import { listOrdersByClient, createOrder } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('clientId');
    if (!clientId) {
      return NextResponse.json({ error: 'Parameter clientId wajib' }, { status: 400 });
    }

    const orders = await listOrdersByClient(clientId);
    return NextResponse.json(orders);
  } catch (error: unknown) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data pesanan' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clientId, serviceName, price, customerName, phone, address, note } = body;

    if (!clientId || !serviceName || !customerName || !phone || !address) {
      return NextResponse.json(
        { error: 'Data pesanan tidak lengkap (clientId, serviceName, customerName, phone, address)' },
        { status: 400 }
      );
    }

    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: 'Harga tidak valid' }, { status: 400 });
    }

    const order = await createOrder({
      serviceName,
      price,
      customerName,
      phone,
      address,
      note: note || '',
      clientId,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err: unknown) {
    console.error('POST /api/orders error:', err);
    return NextResponse.json({ error: 'Gagal menyimpan pesanan' }, { status: 500 });
  }
}