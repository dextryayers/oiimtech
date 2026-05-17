'use client';

import React from 'react';

const brands = [
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple' },
  { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung' },
  { name: 'Xiaomi', logo: 'https://cdn.simpleicons.org/xiaomi' },
  { name: 'Google', logo: 'https://cdn.simpleicons.org/google' },
  { name: 'OPPO', logo: 'https://cdn.simpleicons.org/oppo' },
  { name: 'VIVO', logo: 'https://cdn.simpleicons.org/vivo' },
  { name: 'OnePlus', logo: 'https://cdn.simpleicons.org/oneplus' },
  { name: 'ASUS', logo: 'https://cdn.simpleicons.org/asus' },
  { name: 'Huawei', logo: 'https://cdn.simpleicons.org/huawei' },
  { name: 'Nokia', logo: 'https://cdn.simpleicons.org/nokia' },
  { name: 'Sony', logo: 'https://cdn.simpleicons.org/sony' },
];

export default function BrandMarquee() {
  return (
    <div className="w-full bg-white py-12 md:py-24 overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-16">
        <p className="text-center text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed">
          Spesialis Perbaikan Berbagai Brand Terkemuka
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group min-h-[80px] md:min-h-[120px]">
        {/* Container 1 */}
        <div className="animate-marquee whitespace-nowrap flex items-center py-4">
          {brands.map((brand, i) => (
            <div key={`b1-${i}`} className="mx-10 md:mx-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer min-w-[100px] md:min-w-[160px]">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-16 w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Container 2 (Duplicate for seamless loop) */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center py-4">
          {brands.map((brand, i) => (
            <div key={`b2-${i}`} className="mx-10 md:mx-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer min-w-[100px] md:min-w-[160px]">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-16 w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 35s linear infinite;
        }
        .group:hover .animate-marquee,
        .group:hover .animate-marquee2 {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
