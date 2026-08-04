'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSiteContent } from '@/lib/use-site-content';
import { defaultContacts } from '@/lib/services-data';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isPrivate = pathname.startsWith('/admin') || pathname === '/login';
  const contacts = useSiteContent('contacts', defaultContacts);
  const phoneNumber = contacts.whatsapp || defaultContacts.whatsapp;
  const message = encodeURIComponent('Halo Oiimtech, saya ingin berkonsultasi mengenai perbaikan HP saya. Apakah bisa dibantu?');
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (isPrivate) return null;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[65] group flex items-center gap-3"
      aria-label="Hubungi kami di WhatsApp"
    >
      <span className="relative flex">
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping" style={{ animationDuration: '2.5s' }} />
        <span className="relative bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 fill-white/20" />
        </span>
      </span>

      <span className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
          Butuh Bantuan? Chat Kami
        </span>
      </span>
    </a>
  );
}