'use client';

import Link from 'next/link';
import { Clock, Shield, ArrowRight, BadgeCheck } from 'lucide-react';
import { type HPService } from '@/lib/services-data';
import { useEffect, useRef } from 'react';
import { animate as anime } from 'animejs';

interface ServiceCardProps {
  service: HPService;
  featured?: boolean;
}

export default function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: [1, 1.04],
        duration: 300,
        easing: 'easeOutElastic(1, .8)',
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: 1,
        duration: 300,
        easing: 'easeOutElastic(1, .8)',
      });
    }
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: [1, 0.95, 1],
        duration: 150,
        easing: 'easeInOutQuad',
      });
    }
  };

  return (
    <div className="group relative h-full flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_30px_70px_-20px_rgba(194,65,12,0.25)] hover:-translate-y-1.5 hover:border-orange-700/25 transition-all duration-500 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-800 via-orange-700 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-4xl flex items-center justify-center group-hover:bg-orange-700 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
            {service.icon}
          </div>
          {featured && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-50 border border-orange-700/20 px-3 py-1.5 rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" />
              Populer
            </span>
          )}
        </div>

        <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-3 group-hover:text-orange-700 transition-colors duration-300">
          {service.name}
        </h3>

        <p className="text-slate-500 mb-6 flex-grow line-clamp-3 leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center gap-4 py-4 border-t border-slate-100 mb-6 text-sm font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-700" />
            {service.duration}
          </span>
          <span className="w-px h-4 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-orange-700" />
            {service.warranty}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Estimasi Biaya</p>
            <p className="text-2xl font-black text-slate-900">
              Rp {service.price.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        <Link
          href={`/service/${service.id}`}
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonClick}
          className="btn-primary w-full group/btn"
        >
          Pesan Sekarang
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
