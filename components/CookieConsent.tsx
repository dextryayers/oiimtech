'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';

const CONSENT_KEY = 'oiimtech_cookie_consent';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY)) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, choice);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-lg"
          role="dialog"
          aria-label="Kebijakan cookie"
        >
          <div className="bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-700/10 blur-[50px] rounded-full" />

            <div className="relative flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-700/20 p-2.5 rounded-xl border border-orange-700/30 shrink-0">
                    <Cookie className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg tracking-tight">Kebijakan Privasi</h4>
                    <p className="text-orange-500/90 text-[10px] font-bold uppercase tracking-widest">Cookie Settings</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChoice('rejected')}
                  aria-label="Tutup"
                  className="text-slate-500 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis lalu lintas situs, dan memberikan layanan terbaik. Anda dapat menolak kapan saja.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => handleChoice('accepted')}
                  className="flex-1 bg-orange-700 text-white hover:bg-orange-600 px-6 py-3.5 rounded-xl font-black text-sm transition-all duration-300 shadow-lg shadow-orange-700/25 active:scale-95"
                >
                  Terima Semua
                </button>
                <button
                  onClick={() => handleChoice('rejected')}
                  className="flex-1 bg-white/5 text-white hover:bg-white/10 border border-white/10 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 opacity-60" />
                  Tolak Cookie
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}