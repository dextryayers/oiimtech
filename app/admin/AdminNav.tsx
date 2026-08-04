'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import {
  LayoutDashboard, Package, Wrench, Star,
  FileText, Settings, LogOut, Home, Menu, X, MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Pesanan', icon: Package },
  { href: '/admin/comment', label: 'Komentar', icon: MessageSquare },
  { href: '/admin/services', label: 'Layanan', icon: Wrench },
  { href: '/admin/services', label: 'Layanan', icon: Wrench },
  { href: '/admin/testimonials', label: 'Testimoni', icon: Star },
  { href: '/admin/content', label: 'Konten', icon: FileText },
  { href: '/admin/settings', label: 'Pengaturan', icon: Settings },
] as const;

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (tab: (typeof TABS)[number]) =>
    tab.href === '/admin' ? pathname === tab.href : pathname.startsWith(tab.href);

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Keluar dari Panel Admin?',
      html: '<p class="text-sm">Anda akan diarahkan ke halaman login.</p>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#1E293B',
    });
    if (!isConfirmed) return;

    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch {
      // tetap lanjut logout lokal
    }
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil Keluar',
      text: 'Sampai jumpa!',
      timer: 1500,
      showConfirmButton: false,
    });
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 flex-col bg-slate-950 text-white z-40">
        <div className="px-7 pt-8 pb-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-700 to-orange-500 flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(194,65,12,0.7)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path d="M12 4a4 4 0 1 0-4 4l8 8a4 4 0 1 0 4-4l-8-8Z" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-playfair font-black text-lg leading-tight">OiimTech</p>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300',
                  isActive(tab)
                    ? 'bg-orange-700 text-white shadow-[0_10px_30px_-10px_rgba(194,65,12,0.8)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-8 space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Lihat Situs
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Topbar mobile */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-950 text-white shadow-lg">
        <div className="flex items-center justify-between px-5 pt-4 pb-4">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-700 to-orange-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                <path d="M12 4a4 4 0 1 0-4 4l8 8a4 4 0 1 0 4-4l-8-8Z" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-playfair font-black leading-tight">OiimTech</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
            className="p-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-3">
                <div className="space-y-1.5">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <Link
                        key={tab.href}
                        href={tab.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors',
                          isActive(tab)
                            ? 'bg-orange-700 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex gap-2 pt-3 mt-3 border-t border-white/10">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-slate-300 text-sm font-bold hover:text-white transition-colors"
                  >
                    <Home className="w-4 h-4" /> Lihat Situs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}