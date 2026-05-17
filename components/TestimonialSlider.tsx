'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/services-data';
import Image from 'next/image';

export default function TestimonialSlider() {
  return (
    <div className="w-full relative py-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-orange-700 !opacity-40',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="pb-16"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="glass-card p-8 h-full flex flex-col relative overflow-hidden group">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-100 -z-10 group-hover:text-orange-50 transition-colors duration-300" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-700 text-orange-700" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 italic flex-grow">
                &quot;{testimonial.comment}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-700">
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
                  <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500">Pelanggan Terverifikasi</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons (Desktop only) */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-12 z-10 swiper-button-prev-custom cursor-pointer bg-white p-3 rounded-full shadow-lg hover:bg-orange-700 hover:text-white transition-all duration-300">
        <Star className="w-6 h-6 rotate-180" />
      </div>
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-12 z-10 swiper-button-next-custom cursor-pointer bg-white p-3 rounded-full shadow-lg hover:bg-orange-700 hover:text-white transition-all duration-300">
        <Star className="w-6 h-6" />
      </div>
    </div>
  );
}
