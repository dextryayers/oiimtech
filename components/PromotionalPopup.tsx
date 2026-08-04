'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SEEN_KEY = 'oiimtech_promo_seen';

export default function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const timer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, '1');
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closePopup]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6" role="dialog" aria-modal="true" aria-label="Promo khusus hari ini">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-4xl bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
          >
            <div className="relative aspect-[16/9] md:aspect-video w-full group/img overflow-hidden">
              <Image
                src="/img/1.jpg"
                alt="Promo spesial OiimTech"
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                priority
              />

              <button
                onClick={closePopup}
                aria-label="Tutup popup"
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/50 hover:bg-orange-700 text-white p-2.5 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg group"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                <div className="flex items-center gap-2 bg-orange-700/90 backdrop-blur-md text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                  Special Offer Today
                </div>
              </div>

              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
            </div>

            <div className="relative md:absolute md:bottom-0 md:inset-x-0 p-6 md:p-10 bg-slate-950 md:bg-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl md:text-4xl font-playfair font-black text-white leading-tight">
                  Promo Servis <span className="text-orange-500 italic">Spesial!</span>
                </h3>
                <p className="text-slate-400 md:text-slate-300 text-xs md:text-base max-w-xl font-medium">
                  Dapatkan diskon eksklusif dan bonus aksesoris untuk setiap transaksi perbaikan smartphone hari ini di OiimTech.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <Link
                  href="/booking"
                  onClick={closePopup}
                  className="flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-orange-700 hover:text-white w-full md:w-auto px-8 md:px-10 py-4 rounded-2xl font-black transition-all duration-500 shadow-2xl active:scale-95"
                >
                  Booking Sekarang
                  <ArrowRight className="w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}