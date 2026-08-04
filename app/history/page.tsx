'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import {
  Calendar, Clock, Smartphone, User, MapPin, FileText,
  History, Trash2, Receipt, Package, CloudOff,
} from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { getClientId } from '@/lib/client';

interface Order {
  id: number;
  orderDate: string;
  serviceName: string;
  price: number;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  status: string;
}

const formatIDR = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const mergeOrders = (remote: Order[], local: Order[]): Order[] => {
  const map = new Map<number, Order>();
  for (const o of local) {
    if (!map.has(o.id)) map.set(o.id, { ...o, status: o.status || 'Pending' });
  }
  for (const o of remote) {
    if (!map.has(o.id)) map.set(o.id, o);
  }
  return [...map.values()].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );
};

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const localOrders: Order[] = JSON.parse(localStorage.getItem('service_orders') || '[]');

    const load = async () => {
      try {
        const res = await fetch(`/api/orders?clientId=${encodeURIComponent(getClientId())}`);
        if (!res.ok) throw new Error('API error');
        const remote: Order[] = await res.json();
        if (cancelled) return;
        setOrders(mergeOrders(remote, localOrders));
      } catch {
        if (!cancelled) {
          setIsOffline(true);
          setOrders(localOrders);
        }
      } finally {
        if (!cancelled) setTimeout(() => setIsLoading(false), 300);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (order: Order) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Hapus Pesanan?',
      html: `<p class="text-sm">Pesanan <strong>${order.serviceName}</strong> tanggal <strong>${new Date(order.orderDate).toLocaleDateString('id-ID')}</strong> akan dihapus permanen.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#C2410C',
      cancelButtonColor: '#1E293B',
    });

    if (!isConfirmed) return;

    // Hapus dari localStorage dulu (untuk data lokal)
    const localOrders: Order[] = JSON.parse(localStorage.getItem('service_orders') || '[]');
    const newLocal = localOrders.filter((o) => o.id !== order.id);
    localStorage.setItem('service_orders', JSON.stringify(newLocal));

    // Coba hapus dari server
    try {
      const res = await fetch(`/api/orders/${order.id}?clientId=${encodeURIComponent(getClientId())}`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 404) throw new Error('API delete error');
    } catch {
      // Jika pesanan hanya ada di server (tidak ada di localStorage), tetap tampilkan error
      const existedLocally = localOrders.some((o) => o.id === order.id);
      if (!existedLocally) {
        setIsOffline(true);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: 'Tidak ada koneksi ke server. Coba lagi saat online.',
          confirmButtonColor: '#C2410C',
        });
        return;
      }
    }

    setOrders((prev) => prev.filter((o) => o.id !== order.id));

    Swal.fire({
      icon: 'success',
      title: 'Pesanan Dihapus',
      text: 'Riwayat pesanan berhasil dihapus.',
      confirmButtonColor: '#C2410C',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.price || 0), 0);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar theme="dark" />
      <PageHero
        eyebrow="Order History"
        title={<>Riwayat <span className="text-orange-500 italic">Pesanan.</span></>}
        subtitle="Pantau layanan yang pernah Anda pesan - data tersimpan aman di perangkat Anda."
      />

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-orange-700 border-r-transparent" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Memuat Data...</p>
            </div>
          ) : orders.length > 0 ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 -mt-28 relative z-20">
                <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] border border-slate-100 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="text-3xl font-black text-slate-900">{orders.length}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pesanan</p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] border border-slate-100 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center">
                    <Receipt className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="text-3xl font-black text-slate-900">{formatIDR(totalSpent)}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Investasi</p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] border border-slate-100 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                    <History className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="text-3xl font-black text-slate-900">COD</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Metode Pembayaran</p>
                  </div>
                </div>
              </div>

              {isOffline && (
                <div className="mb-8 -mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3.5 flex items-center gap-3 text-sm font-semibold text-amber-800">
                  <CloudOff className="w-5 h-5 shrink-0" />
                  Tidak dapat terhubung ke server - menampilkan data dari perangkat ini saja. Pesanan baru akan disinkronkan otomatis saat koneksi pulih.
                </div>
              )}

              {/* Orders */}
              <div className="grid grid-cols-1 gap-8">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.2)] border border-slate-100 relative overflow-hidden group hover:border-orange-700/25 transition-colors duration-500"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-700 to-orange-400" />

                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                      <div className="space-y-8 flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                          <div className="bg-orange-50 p-5 rounded-2xl text-orange-700 shrink-0 border border-orange-700/10">
                            <Smartphone size={36} />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl md:text-3xl font-playfair font-black text-slate-900">{order.serviceName}</h3>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-slate-400 font-bold text-sm uppercase tracking-widest">
                              <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-700" />
                                {new Date(order.orderDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-700" />
                                {new Date(order.orderDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                          <div className="space-y-5">
                            <div className="flex items-start gap-3.5">
                              <User className="w-5 h-5 text-slate-300 shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Pelanggan</p>
                                <p className="text-base font-bold text-slate-800">{order.customerName}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                              <MapPin className="w-5 h-5 text-slate-300 shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Alamat Penjemputan</p>
                                <p className="text-base font-bold text-slate-800 leading-relaxed">{order.address}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-5">
                            <div className="flex items-start gap-3.5">
                              <FileText className="w-5 h-5 text-slate-300 shrink-0" />
                              <div>
                                <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Catatan Teknis</p>
                                <p className="text-base font-bold text-slate-800 italic">
                                  &quot;{order.note || 'Tidak ada catatan tambahan'}&quot;
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                              <span
                                className={`mt-1 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border ${
                                  order.status === 'Pending'
                                    ? 'bg-slate-100 text-slate-600 border-slate-300'
                                    : order.status === 'Pesanan Diterima'
                                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                                      : order.status === 'Diproses'
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : order.status === 'Selesai'
                                          ? 'bg-green-50 text-green-700 border-green-100'
                                          : 'bg-red-50 text-red-600 border-red-200'
                                }`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    order.status === 'Pending'
                                      ? 'bg-slate-400'
                                      : order.status === 'Selesai'
                                        ? 'bg-green-600'
                                        : order.status === 'Dibatalkan'
                                          ? 'bg-red-500'
                                          : 'bg-orange-500'
                                  } ${order.status !== 'Selesai' && order.status !== 'Dibatalkan' ? 'animate-pulse' : ''}`}
                                />
                                {order.status === 'Pending' ? 'Menunggu Konfirmasi' : order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:text-right space-y-4 w-full lg:w-auto lg:border-l lg:border-slate-100 lg:pl-10 shrink-0">
                        <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest">Total Investasi</p>
                        <p className="text-4xl font-black text-slate-900">{formatIDR(order.price)}</p>
                        <div className="inline-block bg-slate-50 px-4 py-2 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Bayar di Tempat (COD)
                        </div>
                        <div>
                          <button
                            onClick={() => handleDelete(order)}
                            aria-label={`Hapus pesanan ${order.serviceName}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus Pesanan
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-28 space-y-8 bg-white rounded-[2.5rem] shadow-[0_30px_70px_-30px_rgba(15,23,42,0.2)] border border-slate-100 -mt-28 relative z-20 px-6">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-slate-50 flex items-center justify-center">
                <History className="w-12 h-12 text-slate-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl font-playfair font-black text-slate-900">Belum Ada Pesanan</h3>
                <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                  Anda belum melakukan pemesanan layanan perbaikan. Mulai sekarang dan rasakan kemudahan servis HP premium bersama OiimTech.
                </p>
              </div>
              <div>
                <Link href="/services" className="btn-primary !px-10 !py-4 !text-lg">
                  Cari Layanan Sekarang
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
