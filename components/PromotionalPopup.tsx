'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PromotionalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup on every entry/refresh
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1-second delay for better UX
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-4xl bg-[#0a0f1d] rounded-[2rem] md:rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
          >
            {/* Image Section */}
            <div className="relative aspect-video w-full group/img overflow-hidden">
              <Image
                src="/img/1.jpg"
                alt="Oiimtech Special Promotion"
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                priority
              />
              
              {/* Close Button Overlay */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/40 hover:bg-orange-700 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg group"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Float Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                <div className="flex items-center gap-2 bg-orange-700/90 backdrop-blur-md text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-white animate-pulse" />
                  Special Offer Today
                </div>
              </div>

              {/* Responsive Gradient Overlay - Visible more on desktop to support overlay text */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-90" />
            </div>

            {/* Content Section (Positioned based on device) */}
            <div className="relative md:absolute md:bottom-0 md:inset-x-0 p-6 md:p-12 bg-[#0a0f1d] md:bg-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl md:text-5xl font-playfair font-black text-white leading-tight">
                  Promo Servis <span className="text-orange-600 italic">Spesial!</span>
                </h3>
                <p className="text-slate-400 md:text-slate-300 text-xs md:text-lg max-w-xl font-medium">
                  Dapatkan diskon eksklusif dan bonus aksesoris untuk setiap transaksi perbaikan smartphone hari ini di Oiimtech.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <Link 
                  href="/booking" 
                  onClick={closePopup}
                  className="flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-orange-700 hover:text-white w-full md:w-auto px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg transition-all duration-500 shadow-2xl group group-hover shadow-white/5 active:scale-95"
                >
                  Booking Sekarang
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-3 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
