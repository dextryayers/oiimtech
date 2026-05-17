'use client';

import Link from 'next/link';
import { Clock, Shield, ArrowRight } from 'lucide-react';
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
        scale: [1, 1.05],
        duration: 300,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: 1,
        duration: 300,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: [1, 0.95, 1],
        duration: 150,
        easing: 'easeInOutQuad'
      });
    }
  };

  return (
    <div className="glass-card p-8 flex flex-col h-full group">
      <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-orange-700 transition-colors duration-300 group-hover:rotate-6">
        {service.icon}
      </div>
      
      <h3 className="text-2xl font-playfair font-bold mb-3 text-slate-800 group-hover:text-orange-700 transition-colors duration-300">
        {service.name}
      </h3>
      
      <p className="text-slate-500 mb-6 flex-grow line-clamp-3">
        {service.description}
      </p>
      
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-orange-700" />
          <span>Durasi: {service.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Shield className="w-4 h-4 text-orange-700" />
          <span>Garansi: {service.warranty}</span>
        </div>
        <div className="text-xl font-bold text-slate-800">
          Rp {service.price.toLocaleString('id-ID')}
        </div>
      </div>
      
      <Link
        href={`/service/${service.id}`}
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
        className="btn-primary w-full flex items-center justify-center gap-2 group/btn"
      >
        Pesan Sekarang
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}
