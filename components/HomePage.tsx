'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Clock, Zap, BadgeCheck, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import BrandMarquee from '@/components/BrandMarquee';
import FaqSection from '@/components/FaqSection';
import { hpServices, defaultHero, defaultContacts } from '@/lib/services-data';
import { useSiteContent } from '@/lib/use-site-content';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const services = useSiteContent('services', hpServices);
  const hero = useSiteContent('hero', defaultHero);
  const contacts = useSiteContent('contacts', defaultContacts);
  const heroStats = hero.stats && hero.stats.length > 0 ? hero.stats : defaultHero.stats;
  const WHATSAPP_URL = `https://wa.me/${contacts.whatsapp || defaultContacts.whatsapp}?text=${encodeURIComponent(
    'Halo Oiimtech, saya ingin konsultasi perbaikan HP.'
  )}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.hero-image', {
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
        delay: 0.3,
      });

      gsap.from('.section-title', {
        scrollTrigger: { trigger: '.section-title', start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.service-card-anim', {
        scrollTrigger: { trigger: '.service-card-anim', start: 'top 85%' },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      });

      gsap.from('.about-content', {
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const featuredServices = services.slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 px-6 bg-[#f8fafc] overflow-hidden">
        <div className="pcb-light absolute inset-0 pointer-events-none" />
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-orange-700/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[520px] h-[520px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm hero-text">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-600 opacity-60" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-orange-700" />
              </span>
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {hero.badge || defaultHero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-8xl font-playfair font-black leading-[1.05] text-slate-900 tracking-tight text-balance hero-text">
              {hero.titleA || defaultHero.titleA}<span className="text-orange-700 italic">{hero.titleHighlight || defaultHero.titleHighlight}</span>{hero.titleB || defaultHero.titleB}
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl hero-text font-medium">
              {hero.subtitle || defaultHero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 hero-text">
              <Link href="/booking" className="btn-primary !px-9 !py-4 !text-lg">
                Booking Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !px-9 !py-4 !text-lg"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                Chat WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-200 hero-text flex-wrap">
              {heroStats.map((stat, i) => (
                <div key={i} className={i > 0 ? 'pl-8 border-l border-slate-200' : ''}>
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hero-image">
            <div className="relative z-10 w-full aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 bg-orange-700/10 rounded-[3.5rem] -rotate-6 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-slate-900/5 rounded-[3.5rem] rotate-3 -translate-x-4 -translate-y-4" />
              <Image
                src="https://images.pexels.com/photos/6755093/pexels-photo-6755093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Teknisi OiimTech sedang memperbaiki smartphone"
                fill
                priority
                className="object-cover rounded-[3.5rem] shadow-2xl grayscale-[0.15] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating badge: warranty */}
              <div className="absolute -bottom-10 -right-6 md:-right-12 bg-white p-6 md:p-7 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-50 p-3.5 rounded-2xl">
                    <Shield className="text-orange-700 w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">Garansi hingga 6 Bulan</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">Setiap perbaikan</div>
                  </div>
                </div>
              </div>

              {/* Floating badge: certified */}
              <div className="absolute -top-6 -left-4 md:-left-10 bg-slate-950 text-white p-4 md:p-5 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="bg-orange-700 p-2.5 rounded-xl">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-sm">Teknisi</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bersertifikat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Featured Services */}
      <section ref={servicesRef} className="py-28 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div className="space-y-5 max-w-2xl">
              <span className="eyebrow">Layanan Unggulan</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-black text-slate-900 leading-tight text-balance section-title">
                Solusi Tepat Untuk <span className="text-orange-700 italic">Gadget Anda.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-lg font-medium max-w-md section-title">
              Setiap kerusakan ditangani dengan ketelitian dan peralatan modern - hasil sempurna, harga transparan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-card-anim">
                <ServiceCard service={service} featured />
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/services" className="group inline-flex items-center gap-4 text-slate-900 font-black text-lg hover:text-orange-700 transition-colors duration-300">
              Lihat Semua Layanan
              <span className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:bg-orange-700 group-hover:border-orange-700 group-hover:text-white transition-all duration-500">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento */}
      <section ref={aboutRef} className="bg-slate-950 py-28 md:py-32 px-6 overflow-hidden relative">
        <div className="pcb-dark absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-700/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-10 about-content">
              <div className="space-y-5">
                <span className="eyebrow">Kenapa OiimTech</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-black text-white leading-tight text-balance">
                  Layanan <span className="text-orange-500 italic">100% Amanah.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  Jujur dalam diagnosa, transparan dalam harga, dan teliti dalam pengerjaan. Itu yang membuat ribuan pelanggan kembali lagi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: <Shield />, title: '100% Amanah', desc: 'Kejujuran adalah prioritas kami.' },
                  { icon: <Zap />, title: 'Kualitas Premium', desc: 'Suku cadang terbaik, hasil maksimal.' },
                  { icon: <Clock />, title: 'Pengerjaan Cepat', desc: 'Bisa ditunggu di tempat.' },
                  { icon: <BadgeCheck />, title: 'Teknisi Ahli', desc: 'Bersertifikat & jam terbang tinggi.' },
                ].map((item, i) => (
                  <div key={i} className="group bg-white/[0.04] border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:bg-orange-700/10 hover:border-orange-700/40 transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-orange-700/15 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-700 group-hover:text-white transition-all duration-500">
                      {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1.5">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-[2.5rem] overflow-hidden min-h-[320px] md:min-h-0 shadow-2xl bg-slate-900 border border-white/10">
                <Image
                  src="/img/4.jpg"
                  alt="Proses perbaikan smartphone di OiimTech"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6">
                <div className="bg-white/[0.04] p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm hover:border-orange-700/40 transition-colors duration-500">
                  <span className="text-4xl mb-4 block">🔬</span>
                  <h4 className="text-2xl font-playfair font-bold text-white mb-3">Peralatan Modern</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Mesin laminating LCD dan alat solder presisi tinggi menjaga keamanan komponen internal HP Anda.
                  </p>
                </div>
                <div className="bg-orange-700 p-8 rounded-[2.5rem] shadow-2xl shadow-orange-700/25 hover:bg-orange-600 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <span className="text-4xl mb-4 block">🛵</span>
                  <h4 className="text-2xl font-playfair font-bold text-white mb-3">Antar Jemput Gratis</h4>
                  <p className="text-orange-100 leading-relaxed">
                    Sibuk? Tim kami siap menjemput HP Anda dan mengantarnya kembali setelah selesai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Testimonials */}
      <section ref={testimonialRef} className="py-28 md:py-32 px-6 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-5">
            <span className="eyebrow">Testimoni</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-black text-slate-900 leading-tight">
              Suara <span className="text-orange-700 italic">Pelanggan.</span>
            </h2>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.25)]">
          <div className="pcb-dark absolute inset-0 opacity-50 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange-700/25 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <span className="eyebrow">Mulai Sekarang</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-black leading-tight text-balance">
              Kembalikan <span className="text-orange-500 italic">Performa HP</span> Anda.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
              Jangan biarkan kerusakan kecil menjadi masalah besar. Konsultasi gratis dengan teknisi kami sekarang.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/booking" className="btn-primary !px-10 !py-4 !text-lg">
                Booking Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2.5 bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm active:scale-95">
                Lihat Daftar Harga
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
