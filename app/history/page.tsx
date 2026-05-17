'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, Smartphone, User, MapPin, FileText, CheckCircle2, History } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: number;
  orderDate: string;
  serviceName: string;
  price: number;
  customerName: string;
  phone: string;
  address: string;
  note: string;
}

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('service_orders') || '[]');
    setTimeout(() => {
      setOrders(savedOrders);
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block bg-orange-700/20 text-orange-700 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-[0.3em] border border-orange-700/30">
            Order History
          </div>
          <h1 className="text-6xl lg:text-8xl font-playfair font-black leading-tight">
            Riwayat <span className="text-orange-700 italic">Pesanan.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">
            Pantau status perbaikan HP Anda dan lihat riwayat layanan yang telah Anda pesan sebelumnya secara real-time.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-700 border-r-transparent"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Memuat Data...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="grid grid-cols-1 gap-12 -mt-32 relative z-20">
              {orders.map((order) => (
                <div key={order.id} className="glass-card p-10 lg:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative overflow-hidden bg-white border-slate-100 group hover:border-orange-700/30 transition-all duration-500">
                  <div className="absolute top-0 left-0 w-3 h-full bg-orange-700" />
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                    <div className="space-y-10 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="bg-slate-50 p-6 rounded-[2rem] text-orange-700 shrink-0 shadow-sm">
                          <Smartphone size={40} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-4xl font-playfair font-black text-slate-900">{order.serviceName}</h3>
                          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-sm uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.orderDate).toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(order.orderDate).toLocaleTimeString('id-ID', { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <User className="w-6 h-6 text-slate-300 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Pelanggan</p>
                              <p className="text-xl font-bold text-slate-800">{order.customerName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-slate-300 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Alamat Penjemputan</p>
                              <p className="text-xl font-bold text-slate-800 leading-relaxed">{order.address}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <FileText className="w-6 h-6 text-slate-300 shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Catatan Teknis</p>
                              <p className="text-xl font-bold text-slate-800 italic">&quot;{order.note || 'Tidak ada catatan tambahan'}&quot;</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="bg-green-50 text-green-700 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-3 border border-green-100">
                              <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse" />
                              Pesanan Diterima
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right space-y-4 w-full lg:w-auto lg:border-l lg:border-slate-100 lg:pl-12">
                      <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Total Investasi</p>
                      <p className="text-5xl font-black text-slate-900">Rp {order.price.toLocaleString('id-ID')}</p>
                      <div className="inline-block bg-slate-50 px-4 py-2 rounded-lg text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Bayar di Tempat (COD)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 space-y-10 glass-card p-20 bg-white shadow-2xl border-slate-100 -mt-32 relative z-20">
              <div className="relative w-40 h-40 mx-auto opacity-10">
                <History className="w-full h-full text-slate-900" />
              </div>
              <div className="space-y-6">
                <h3 className="text-5xl font-playfair font-black text-slate-900">Belum Ada Pesanan</h3>
                <p className="text-slate-500 text-xl font-medium max-w-xl mx-auto">
                  Anda belum melakukan pemesanan layanan perbaikan HP. Mulai sekarang dan rasakan kemudahan servis HP premium dengan Oiimtech.
                </p>
                <div className="pt-10">
                  <Link href="/services" className="bg-orange-700 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-orange-800 transition-all duration-500 shadow-xl shadow-orange-700/20 inline-block">
                    Cari Layanan Sekarang
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
