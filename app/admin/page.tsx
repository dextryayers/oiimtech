'use client';

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip,
  type ChartData, type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Package, Wallet, Clock, ArrowRight, RefreshCw, LineChart, ListChecks,
  Calendar, Smartphone, Loader2, Wrench, Star, FileText, Settings, MessageSquare,
  BellRing, X, CalendarDays, Radio,
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

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
const WIB = { timeZone: 'Asia/Jakarta' } as const;

const STATUS_STYLE: Record<string, string> = {
  'Pesanan Diterima': 'bg-amber-50 text-amber-700 border-amber-200',
  Diproses: 'bg-blue-50 text-blue-700 border-blue-200',
  Selesai: 'bg-green-50 text-green-700 border-green-200',
  Dibatalkan: 'bg-red-50 text-red-600 border-red-200',
};

function useNow(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

const formatClock = (d: Date) =>
  d.toLocaleTimeString('id-ID', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', ...WIB });

const formatDateLong = (d: Date) =>
  d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', ...WIB });

const todayKey = (d: string) => new Date(d).toLocaleDateString('en-CA', WIB);

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [online, setOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [newArrivals, setNewArrivals] = useState<Order[]>([]);
  const now = useNow(1000);
  const ordersRef = useRef<Order[]>([]);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error('API error');
      const data: Order[] = await res.json();

      const prevIds = new Set(ordersRef.current.map((o) => o.id));
      const fresh = data.filter((o) => !prevIds.has(o.id));
      ordersRef.current = data;
      if (fresh.length > 0) setNewArrivals(fresh);

      setOrders(data);
      setLastUpdated(new Date());
      setOnline(true);
    } catch {
      setOnline(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Auto-refresh real-time: setiap 30 detik
  useEffect(() => {
    load();
    const t = setInterval(() => load(true), 30000);
    return () => clearInterval(t);
  }, [load]);

  // Banner pesanan baru hilang otomatis setelah 8 detik
  useEffect(() => {
    if (newArrivals.length === 0) return;
    const t = setTimeout(() => setNewArrivals([]), 8000);
    return () => clearTimeout(t);
  }, [newArrivals]);

  const totalRevenue = orders.reduce((s, o) => (o.status === 'Dibatalkan' ? s : s + o.price), 0);
  const today = todayKey(now.toISOString());
  const ordersToday = orders.filter((o) => todayKey(o.orderDate) === today);
  const revenueToday = ordersToday
    .filter((o) => o.status !== 'Dibatalkan')
    .reduce((s, o) => s + o.price, 0);
  const activeOrders = orders.filter((o) => o.status !== 'Dibatalkan' && o.status !== 'Selesai').length;
  const uniqueClients = new Set(orders.map((o) => o.phone)).size;
  const pending = orders.filter((o) => o.status === 'Pesanan Diterima').length;

  const last7Days = useMemo(() => {
    const days: { label: string; total: number; dateLabel: string }[] = [];
    const base = new Date(now.toLocaleString('en-US', { ...WIB }));
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date(base);
      d.setHours(0, 0, 0, 0);
      d.setDate(base.getDate() - i);
      const key = d.toLocaleDateString('en-CA', WIB);
      const total = orders
        .filter((o) => o.status !== 'Dibatalkan' && todayKey(o.orderDate) === key)
        .reduce((s, o) => s + o.price, 0);
      days.push({
        label: d.toLocaleDateString('id-ID', { weekday: 'short', ...WIB }),
        dateLabel: d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', ...WIB }),
        total,
      });
    }
    return days;
  }, [orders, now]);
  const formatIDRCompact = (n: number) => {
    if (n >= 1_000_000) return (n / 1_000_000).toLocaleString('id-ID') + 'jt';
    if (n >= 1_000) return Math.round(n / 1_000) + 'rb';
    return String(n);
  };

  const chartData: ChartData<'line'> = useMemo(
    () => ({
      labels: last7Days.map((d) => d.label),
      datasets: [
        {
          data: last7Days.map((d) => d.total),
          borderColor: '#EA580C',
          borderWidth: 2,
          pointBackgroundColor: '#C2410C',
          pointBorderColor: '#fff',
          pointBorderWidth: 1.5,
          pointRadius: last7Days.map((_, i) => (i === last7Days.length - 1 ? 5 : 2.5)),
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#C2410C',
          tension: 0.4,
          fill: true,
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return 'rgba(234,88,12,0.15)';
            const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0, 'rgba(234,88,12,0.30)');
            g.addColorStop(1, 'rgba(234,88,12,0.02)');
            return g;
          },
        },
      ],
    }),
    [last7Days]
  );

  const chartOptions: ChartOptions<'line'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      animation: { duration: 1100, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F172A',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 12,
          displayColors: false,
          titleFont: { size: 10, weight: 'bold' },
          titleColor: '#94A3B8',
          bodyFont: { size: 14, weight: 'bold' },
          bodyColor: '#FB923C',
          callbacks: {
            title: (items) => last7Days[items[0].dataIndex].dateLabel,
            label: (item) => formatIDR(item.parsed.y ?? 0),
            afterBody: (items) => {
              const idx = items[0].dataIndex;
              const prev = idx > 0 ? last7Days[idx - 1].total : null;
              if (prev === null) return [];
              const total = last7Days[idx].total;
              const delta = total - prev;
              if (delta === 0) return ['Sama dengan kemarin'];
              const pct = prev > 0 ? Math.round((delta / prev) * 100) : null;
              const diff =
                Math.abs(delta) >= 1000
                  ? formatIDRCompact(Math.abs(delta))
                  : String(Math.abs(delta));
              return [
                `${delta > 0 ? '▲' : '▼'} ${diff}${pct !== null ? ` (${pct >= 0 ? '+' : ''}${pct}%)` : ''} vs kemarin`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#94A3B8', font: { size: 10, weight: 'bold' }, maxRotation: 0 },
        },
        y: {
          beginAtZero: true,
          border: { display: false },
          grid: { color: '#F1F5F9', borderDash: [2, 4], drawTicks: false },
          ticks: {
            color: '#CBD5E1',
            font: { size: 9, weight: 'bold' },
            maxTicksLimit: 5,
            padding: 8,
            callback: (value) => formatIDRCompact(Number(value)),
          },
        },
      },
    }),
    [last7Days]
  );

  const statusStats = [
    { status: 'Pending', color: 'bg-slate-400' },
    { status: 'Pesanan Diterima', color: 'bg-amber-400' },
    { status: 'Diproses', color: 'bg-blue-400' },
    { status: 'Selesai', color: 'bg-green-500' },
    { status: 'Dibatalkan', color: 'bg-red-400' },
  ].map((s) => ({ ...s, count: orders.filter((o) => o.status === s.status).length }));
  const statusMax = Math.max(...statusStats.map((s) => s.count), 1);

  const quickActions = [
    { href: '/admin/comment', label: 'Lihat Komentar', desc: 'Pesan dari pengunjung', icon: MessageSquare },
    { href: '/admin/services', label: 'Kelola Layanan', desc: 'CRUD layanan', icon: Wrench },
    { href: '/admin/testimonials', label: 'Kelola Testimoni', desc: 'Ulasan pelanggan', icon: Star },
    { href: '/admin/content', label: 'Edit Konten', desc: 'Hero, FAQ, pengumuman', icon: FileText },
    { href: '/admin/settings', label: 'Pengaturan', desc: 'Kontak & WhatsApp', icon: Settings },
  ];

  const stats = [
    { label: 'Total Pesanan', value: orders.length, icon: Package, accent: 'from-orange-700 to-orange-500' },
    { label: 'Pesanan Hari Ini', value: ordersToday.length, icon: CalendarDays, accent: 'from-blue-700 to-blue-500' },
    { label: 'Pendapatan Hari Ini', value: formatIDR(revenueToday), icon: Wallet, accent: 'from-green-700 to-green-500' },
    { label: 'Pesanan Aktif', value: activeOrders, icon: Clock, accent: 'from-slate-700 to-slate-500' },
  ];

  return (
    <div>
      {/* Header: judul + jam digital + status live */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="font-playfair font-black text-3xl lg:text-4xl text-slate-900">Ringkasan Bisnis</h1>
          <p className="text-slate-500 font-semibold mt-2 text-sm">
            Pantau pesanan masuk secara real-time. Data diperbarui otomatis tiap 30 detik.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${online ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`relative inline-flex rounded-full w-2.5 h-2.5 ${online ? 'bg-green-600' : 'bg-red-600'}`} />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              {online ? 'Live' : 'Koneksi Terputus'}
            </span>
            {lastUpdated && online && (
              <span className="text-xs font-bold text-slate-400">
                Terakhir diperbarui {formatClock(lastUpdated)} WIB
              </span>
            )}
          </div>
        </div>

        <div className="flex items-stretch gap-3">
          {/* Jam digital */}
          <div className="bg-slate-950 text-white rounded-3xl px-6 py-4 shadow-[0_20px_50px_-25px_rgba(2,6,23,0.8)] relative overflow-hidden">
            <div className="pcb-dark absolute inset-0 opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-orange-500 mb-1.5">
                <Clock className="w-3.5 h-3.5" /> Jam Lokal WIB
              </p>
              <p className="font-mono text-3xl lg:text-4xl font-bold tabular-nums tracking-tight leading-none">
                {formatClock(now)}
              </p>
              <p className="text-[11px] font-semibold text-slate-400 mt-2 capitalize">{formatDateLong(now)}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2">
            <button
              onClick={() => load(false)}
              disabled={loading || refreshing}
              className="btn-secondary !py-2.5 justify-center disabled:opacity-60"
              title="Perbarui sekarang"
            >
              <RefreshCw className={`w-4 h-4 ${loading || refreshing ? 'animate-spin' : ''}`} />
              Perbarui
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
              Auto tiap 30 dtk
            </span>
          </div>
        </div>
      </div>

      {/* Banner pesanan baru masuk */}
      <AnimatePresence>
        {newArrivals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            className="mb-8 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white p-5 flex items-center gap-4 shadow-[0_20px_50px_-20px_rgba(22,163,74,0.6)]"
          >
            <span className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 animate-pulse">
              <BellRing className="w-6 h-6" />
            </span>
            <div className="flex-grow min-w-0">
              <p className="font-black">{newArrivals.length} pesanan baru masuk!</p>
              <p className="text-sm text-green-100 font-semibold truncate">
                {newArrivals.map((o) => `${o.serviceName} - ${o.customerName}`).join(' • ')}
              </p>
            </div>
            <button
              onClick={() => setNewArrivals([])}
              aria-label="Tutup notifikasi"
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner offline */}
      <AnimatePresence>
        {!online && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3.5 flex items-center gap-3 text-sm font-semibold text-amber-800"
          >
            <Radio className="w-5 h-5 shrink-0" />
            Tidak dapat terhubung ke server. Menampilkan data terakhir dan mencoba kembali otomatis.
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" /> Menghubungkan ke server...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-white rounded-3xl p-5 lg:p-6 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)] border border-slate-100"
                >
                  <span className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.accent} text-white flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="text-xl lg:text-2xl font-black text-slate-900 truncate">{s.value}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Revenue chart */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-3 font-playfair font-bold text-xl text-slate-900">
                  <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center"><LineChart className="w-5 h-5" /></span>
                  Pendapatan 7 Hari Terakhir
                </h2>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">tidak termasuk dibatalkan</span>
              </div>
              <div className="relative h-48">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Status distribution */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] border border-slate-100">
              <h2 className="flex items-center gap-3 font-playfair font-bold text-xl text-slate-900 mb-6">
                <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center"><ListChecks className="w-5 h-5" /></span>
                Status Pesanan
              </h2>
              <div className="space-y-4">
                {statusStats.map((s) => (
                  <div key={s.status}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-bold text-slate-600">{s.status}</span>
                      <span className="font-black text-slate-900">{s.count}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.color} transition-all duration-700`}
                        style={{ width: `${(s.count / statusMax) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-1.5">
                <p className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Total pendapatan kotor</span>
                  <span className="text-slate-900">{formatIDR(totalRevenue)}</span>
                </p>
                <p className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Pelanggan unik</span>
                  <span className="text-slate-900">{uniqueClients}</span>
                </p>
              </div>
              {pending > 0 && (
                <p className="mt-5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                  {pending} pesanan menunggu diproses. Segera hubungi pelanggan via WhatsApp.
                </p>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <Link
                  key={qa.href}
                  href={qa.href}
                  className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_15px_40px_-30px_rgba(15,23,42,0.5)] hover:border-orange-700/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center mb-3 group-hover:bg-orange-700 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="font-bold text-sm text-slate-900">{qa.label}</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{qa.desc}</p>
                </Link>
              );
            })}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-[2rem] shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 lg:px-8 py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-orange-700" />
                <h2 className="font-playfair font-bold text-xl text-slate-900">Pesanan Terbaru</h2>
              </div>
              <div className="flex items-center gap-2">
                {ordersToday.length > 0 && (
                  <span className="text-[11px] font-black bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full">
                    {ordersToday.length} hari ini
                  </span>
                )}
                {pending > 0 && (
                  <span className="text-[11px] font-black bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full">
                    {pending} menunggu
                  </span>
                )}
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="px-6 py-16 text-center text-slate-400">
                <p className="font-bold mb-1">Belum ada pesanan</p>
                <p className="text-sm">Pesanan dari pelanggan akan muncul di sini secara real-time.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {orders.slice(0, 6).map((order) => {
                  const ageMs = now.getTime() - new Date(order.orderDate).getTime();
                  const isNew = ageMs < 30 * 60 * 1000;
                  return (
                    <li key={order.id} className="px-6 lg:px-8 py-5 flex items-center gap-4 hover:bg-slate-50/70 transition-colors">
                      <div className="bg-orange-50 p-3.5 rounded-2xl text-orange-700 shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-slate-900 truncate flex items-center gap-2">
                          {order.serviceName}
                          {isNew && order.status === 'Pesanan Diterima' && (
                            <span className="text-[9px] font-black bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full animate-pulse">
                              BARU
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(order.orderDate).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', ...WIB })}
                          <span className="text-slate-300">|</span>
                          {order.customerName}
                        </p>
                      </div>
                      <div className="hidden sm:block text-right shrink-0">
                        <p className="font-black text-slate-900">{formatIDR(order.price)}</p>
                        <span className={`inline-block mt-1 text-[10px] font-black px-2.5 py-1 rounded-full border ${STATUS_STYLE[order.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                          {order.status}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {orders.length > 0 && (
              <div className="px-6 lg:px-8 py-5 border-t border-slate-100">
                <Link
                  href="/admin/orders"
                  className="inline-flex items-center gap-2 text-sm font-black text-orange-700 hover:text-orange-600 transition-colors"
                >
                  Lihat Semua Pesanan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}