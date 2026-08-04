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
    <div className="w-full bg-white py-14 md:py-20 overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em] leading-relaxed">
          Spesialis perbaikan berbagai brand terkemuka
        </p>
      </div>

      <div className="group relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* Track 1 */}
        <div className="animate-marquee whitespace-nowrap flex items-center py-4">
          {brands.map((brand, i) => (
            <div
              key={`a-${i}`}
              className="mx-8 md:mx-14 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer min-w-[90px] md:min-w-[140px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="h-9 md:h-14 w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (duplicate for seamless loop) */}
        <div className="animate-marquee2 absolute top-0 whitespace-nowrap flex items-center py-4">
          {brands.map((brand, i) => (
            <div
              key={`b-${i}`}
              className="mx-8 md:mx-14 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer min-w-[90px] md:min-w-[140px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="h-9 md:h-14 w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
