'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import {
  Search, Trash2, Smartphone, Calendar, User, MapPin, FileText,
  Loader2, RefreshCw, PackageOpen, Phone, MessageCircle, CheckCheck,
} from 'lucide-react';

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

const STATUSES = ['Pending', 'Pesanan Diterima', 'Diproses', 'Selesai', 'Dibatalkan'];

const STATUS_STYLE: Record<string, string> = {
  Pending: 'bg-slate-100 text-slate-700 border-slate-300',
  'Pesanan Diterima': 'bg-amber-50 text-amber-700 border-amber-200',
  Diproses: 'bg-blue-50 text-blue-700 border-blue-200',
  Selesai: 'bg-green-50 text-green-700 border-green-200',
  Dibatalkan: 'bg-red-50 text-red-600 border-red-200',
};

const formatIDR = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const waLink = (phone: string) =>
  'https://wa.me/' + '62' + phone.replace(/\D/g, '').replace(/^0/, '');

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error('API error');
      const data: Order[] = await res.json();
      setOrders(data);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: 'Tidak dapat mengambil data pesanan dari server.',
        confirmButtonColor: '#C2410C',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === 'Semua' || o.status === statusFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      o.customerName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.serviceName.toLowerCase().includes(q) ||
      o.address.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const updateStatus = async (order: Order, status: string) => {
    if (status === order.status) return;
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('API error');
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
      Swal.fire({
        icon: 'success',
        title: 'Status Diperbarui',
        html: `<p class="text-sm">Pesanan <strong>${order.serviceName}</strong> kini berstatus <strong>${status}</strong>.</p>`,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memperbarui',
        text: 'Tidak dapat mengubah status pesanan.',
        confirmButtonColor: '#C2410C',
      });
    }
  };

  const handleDelete = async (order: Order) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Hapus Pesanan?',
      html: `<p class="text-sm">Pesanan <strong>${order.serviceName}</strong> oleh <strong>${order.customerName}</strong> akan dihapus permanen.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#1E293B',
    });
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('API error');
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
      Swal.fire({
        icon: 'success',
        title: 'Pesanan Dihapus',
        confirmButtonColor: '#C2410C',
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus',
        text: 'Tidak dapat menghapus pesanan.',
        confirmButtonColor: '#C2410C',
      });
    }
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>, order: Order) => {
    updateStatus(order, e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Manajemen</p>
          <h1 className="font-playfair font-black text-3xl lg:text-4xl text-slate-900">Pesanan</h1>
          <p className="text-slate-500 font-semibold mt-2 text-sm">
            {orders.length} pesanan terdaftar dari semua pelanggan.
          </p>
        </div>
        <button onClick={load} disabled={loading} className="btn-secondary shrink-0 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Muat Ulang
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, telepon, layanan, atau alamat..."
            className="field-input !bg-white !py-4 !pl-12"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="field-input !bg-white sm:w-56 cursor-pointer"
          aria-label="Filter status"
        >
          <option value="Semua">Semua Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" /> Memuat data...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[2rem] py-20 text-center border border-slate-100 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.3)]">
          <PackageOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <p className="font-bold text-slate-500">Tidak ada pesanan yang cocok</p>
          <p className="text-sm text-slate-400 mt-1">Coba ubah kata kunci pencarian atau filter status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filtered.map((order) => (
            <article
              key={order.id}
              className="bg-white rounded-[1.75rem] p-6 lg:p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-700 to-orange-400" />

              <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
                <div className="flex items-start gap-4 flex-grow min-w-0">
                  <div className="bg-orange-50 p-3.5 rounded-2xl text-orange-700 shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-900 text-lg">{order.serviceName}</h2>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${STATUS_STYLE[order.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mt-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(order.orderDate).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm font-semibold text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" /> {order.customerName}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <a
                          href={`tel:${order.phone}`}
                          className="hover:text-orange-700 transition-colors underline decoration-dotted underline-offset-4"
                        >
                          {order.phone}
                        </a>
                        <a
                          href={waLink(order.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] font-bold hover:bg-green-100 transition-colors"
                          aria-label={`Chat WhatsApp ${order.phone}`}
                        >
                          <MessageCircle className="w-3 h-3" /> WA
                        </a>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" /> {order.address}
                      </span>
                    </div>
                    {order.note && (
                      <p className="mt-2 text-sm text-slate-500 inline-flex items-start gap-1.5">
                        <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> {order.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 lg:flex-col lg:items-end">
                  <p className="font-black text-slate-900 text-lg">{formatIDR(order.price)}</p>
                  <div className="flex items-center gap-2.5">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => updateStatus(order, 'Pesanan Diterima')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors"
                      >
                        <CheckCheck className="w-4 h-4" /> Terima
                      </button>
                    )}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(e, order)}
                      aria-label={`Ubah status pesanan ${order.id}`}
                      className="field-input !bg-white !py-2.5 !px-4 text-sm cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(order)}
                      aria-label={`Hapus pesanan ${order.id}`}
                      className="p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}