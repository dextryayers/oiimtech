'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Smartphone, Shield, Clock, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import BrandMarquee from '@/components/BrandMarquee';
import { hpServices } from '@/lib/services-data';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.3,
      });

      // ScrollTrigger Animations
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.service-card-anim', {
        scrollTrigger: {
          trigger: '.service-card-anim',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      });

      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const featuredServices = hpServices.slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "OiimTech",
            "image": "https://oiimtech.com/img/logo.png",
            "@id": "https://oiimtech.com",
            "url": "https://oiimtech.com",
            "telephone": "+6287817148552",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Utama No. 1",
              "addressLocality": "Jakarta",
              "postalCode": "12345",
              "addressCountry": "ID"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -6.2088,
              "longitude": 106.8456
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "21:00"
            },
            "sameAs": [
              "https://www.instagram.com/oiimtech"
            ]
          })
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 px-6 bg-[#f8fafc] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-700/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-slate-200/30 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm hero-text">
              <div className="w-2 h-2 bg-orange-700 rounded-full animate-ping" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Service HP Solution #1 Indonesia</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-playfair font-black leading-[1.1] text-slate-900 hero-text">
              Service <span className="text-orange-700 italic">HP & Smartphone</span> Terbaik.
            </h1>
            
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl hero-text font-medium">
              Oiimtech menghadirkan standar baru dalam perbaikan smartphone. Presisi tinggi, komponen original, dan layanan yang mengutamakan waktu Anda.
            </p>
            
            <div className="flex flex-wrap gap-6 hero-text">
              <Link href="/booking" className="bg-orange-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-800 transition-all duration-500 shadow-[0_20px_50px_rgba(194,65,12,0.3)] hover:-translate-y-1 active:scale-95">
                Booking Sekarang
              </Link>
              <Link href="/services" className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-500 flex items-center gap-3 group">
                Layanan Kami
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            <div className="flex items-center gap-12 pt-10 border-t border-slate-200 hero-text">
              <div>
                <div className="text-4xl font-black text-slate-900">12k+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Repairs</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <div className="text-4xl font-black text-slate-900">4.9/5</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Rating</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <div className="text-4xl font-black text-slate-900">15m</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Response</div>
              </div>
            </div>
          </div>

          <div className="relative hero-image">
            <div className="relative z-10 w-full aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 bg-orange-700/10 rounded-[4rem] -rotate-6 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-slate-900/5 rounded-[4rem] rotate-3 -translate-x-4 -translate-y-4" />
              <Image
                src="https://images.pexels.com/photos/6755093/pexels-photo-6755093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Oiimtech Professional Smartphone Repair Service"
                fill
                className="object-cover rounded-[4rem] shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-12 -right-12 bg-white p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 hidden md:block">
                <div className="flex items-center gap-5">
                  <div className="bg-orange-50 p-4 rounded-2xl">
                    <Shield className="text-orange-700 w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">Garansi 180 Hari</div>
                    <div className="text-sm font-bold text-slate-400">Full Protection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee Section */}
      <BrandMarquee />

      {/* Featured Services */}
      <section ref={servicesRef} className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-block bg-orange-700/10 text-orange-700 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-[0.3em]">
                Our Expertise
              </div>
              <h2 className="text-5xl lg:text-7xl font-playfair font-black text-slate-900 leading-tight section-title">
                Solusi Tepat Untuk <br /> <span className="text-orange-700 italic">Gadget Anda.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-lg font-medium max-w-md section-title">
              Kami menangani setiap kerusakan dengan ketelitian mikroskopis dan peralatan mutakhir untuk hasil yang sempurna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-card-anim">
                <ServiceCard service={service} featured />
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Link href="/services" className="group flex items-center gap-4 text-slate-900 font-black text-lg hover:text-orange-700 transition-colors duration-300">
              Lihat Semua Layanan 
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-orange-700 group-hover:border-orange-700 group-hover:text-white transition-all duration-500">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Style */}
      <section ref={aboutRef} className="bg-slate-900 py-32 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-10 about-content">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-7xl font-playfair font-black text-white leading-tight">
                  Layanan <br /> <span className="text-orange-700 italic">100% Amanah.</span>
                </h2>
                <p className="text-slate-400 text-xl leading-relaxed font-medium">
                  Oiimtech hadir dengan dedikasi penuh untuk memberikan solusi perbaikan terbaik yang jujur, transparan, dan berkualitas tinggi.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <Shield />, title: '100% Amanah', desc: 'Kejujuran adalah prioritas kami dalam setiap proses perbaikan.' },
                  { icon: <Zap />, title: 'Kualitas Premium', desc: 'Hanya menggunakan suku cadang terbaik untuk hasil yang maksimal.' },
                  { icon: <Clock />, title: 'Pengerjaan Cepat', desc: 'Layanan kilat untuk berbagai kerusakan, bisa ditunggu.' },
                  { icon: <Smartphone />, title: 'Teknisi Ahli', desc: 'Ditangani oleh teknisi bersertifikat dengan jam terbang tinggi.' },
                  { icon: <Shield />, title: 'Garansi Panjang', desc: 'Kami memberikan jaminan garansi untuk setiap perbaikan.' },
                  { icon: <Zap />, title: 'Harga Murah', desc: 'Biaya servis yang kompetitif dan transparan tanpa biaya tersembunyi.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="bg-white/5 p-4 rounded-2xl text-orange-700 shrink-0 group-hover:bg-orange-700 group-hover:text-white transition-all duration-500 h-fit">
                      {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-[3rem] overflow-hidden h-[400px] md:h-full shadow-2xl bg-slate-800">
                <Image
                  src="/img/4.jpg"
                  alt="Professional Smartphone Repair"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-8">
                <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-sm">
                  <h4 className="text-3xl font-playfair font-bold text-white mb-4">Peralatan Modern</h4>
                  <p className="text-slate-400 leading-relaxed">Kami menggunakan mesin laminating LCD dan alat solder presisi tinggi untuk memastikan keamanan komponen internal HP Anda.</p>
                </div>
                <div className="bg-orange-700 p-10 rounded-[3rem] shadow-2xl shadow-orange-700/20">
                  <h4 className="text-3xl font-playfair font-bold text-white mb-4">Layanan Antar Jemput</h4>
                  <p className="text-orange-100 leading-relaxed">Sibuk? Tim kami siap menjemput HP Anda dan mengantarkannya kembali setelah selesai diperbaiki.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialRef} className="py-32 px-6 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-lg text-xs font-black uppercase tracking-[0.3em]">
              Testimonials
            </div>
            <h2 className="text-5xl lg:text-7xl font-playfair font-black text-slate-900">
              Suara <span className="text-orange-700 italic">Pelanggan.</span>
            </h2>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl lg:text-8xl font-playfair font-black leading-tight">Kembalikan <br /> Performa <span className="text-orange-700 italic">HP Anda.</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              Jangan biarkan kerusakan kecil menjadi masalah besar. Konsultasikan sekarang secara gratis dengan tim ahli kami.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/booking" className="bg-orange-700 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-orange-800 transition-all duration-500 shadow-2xl hover:-translate-y-2">
                Booking Sekarang
              </Link>
              <Link href="/services" className="bg-white/10 text-white border border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all duration-500 backdrop-blur-sm">
                Daftar Harga
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
