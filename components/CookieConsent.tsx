'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after 2.5 seconds to let the main promo popup appear first
    const timer = setTimeout(() => {
      setShow(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-[9998]"
        >
          <div className="bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-700/10 blur-[50px] rounded-full group-hover:bg-orange-700/20 transition-colors duration-700" />
            
            <div className="relative flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-700/20 p-2.5 rounded-xl border border-orange-700/30">
                    <Cookie className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg tracking-tight">Kebijakan Privasi</h4>
                    <p className="text-orange-600/80 text-[10px] font-bold uppercase tracking-widest">Cookie Settings</p>
                  </div>
                </div>
                <button 
                  onClick={handleAccept}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis lalu lintas situs, dan memberikan layanan perbaikan terbaik di <span className="text-white font-bold">Oiimtech</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-white text-slate-900 hover:bg-orange-700 hover:text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all duration-300 shadow-lg active:scale-95"
                >
                  Terima Semua
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-white/5 text-white hover:bg-white/10 border border-white/10 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 opacity-60" />
                  Pengaturan
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
