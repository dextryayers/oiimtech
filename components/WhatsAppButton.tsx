'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '6287817148552';
  const message = encodeURIComponent('Halo Oiimtech, saya ingin berkonsultasi mengenai perbaikan HP saya. Apakah bisa dibantu?');
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group flex items-center gap-3"
      aria-label="Hubungi kami di WhatsApp"
    >
      <div className="bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce-slow">
        <MessageCircle className="w-7 h-7 fill-white/20" />
      </div>
      
      <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <p className="text-sm font-bold text-slate-800 whitespace-nowrap">
          Butuh Bantuan? Chat Kami
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}
