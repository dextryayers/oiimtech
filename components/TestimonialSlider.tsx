'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { testimonials } from '@/lib/services-data';
import { useSiteContent } from '@/lib/use-site-content';
import Image from 'next/image';

export default function TestimonialSlider() {
  const items = useSiteContent('testimonials', testimonials);
  return (
    <div className="w-full relative py-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={28}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !rounded-full !bg-orange-700 !opacity-30',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !w-6 !rounded-full',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-16"
      >
        {items.map((testimonial, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_24px_60px_-16px_rgba(15,23,42,0.18)] hover:-translate-y-1 transition-all duration-500 p-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute -top-2 -right-2 w-24 h-24 bg-orange-50 rounded-full blur-2xl" />
              <Quote className="absolute top-5 right-5 w-10 h-10 text-orange-700/10" />

              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-orange-700 text-orange-700" />
                ))}
              </div>

              <p className="text-slate-600 mb-7 leading-relaxed flex-grow">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-700/60 shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    unoptimized
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    {testimonial.name}
                    <BadgeCheck className="w-4 h-4 text-orange-700" />
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold">Pelanggan Terverifikasi</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation (desktop) */}
      <button
        aria-label="Testimoni sebelumnya"
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-5 xl:-left-14 z-10 swiper-button-prev-custom cursor-pointer bg-white p-3.5 rounded-full shadow-lg border border-slate-100 hover:bg-orange-700 hover:text-white hover:border-orange-700 transition-all duration-300 text-slate-600"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Testimoni berikutnya"
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-5 xl:-right-14 z-10 swiper-button-next-custom cursor-pointer bg-white p-3.5 rounded-full shadow-lg border border-slate-100 hover:bg-orange-700 hover:text-white hover:border-orange-700 transition-all duration-300 text-slate-600"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
