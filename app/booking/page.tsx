'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { Calendar, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/6287817148552?text=Halo%20Oiimtech%2C%20saya%20ingin%20konsultasi%20perbaikan%20HP.';

export default function BookingPage() {
  const steps = [
    { icon: <Calendar />, title: 'Pesan Online', desc: 'Isi formulir dengan detail kerusakan HP Anda.' },
    { icon: <Clock />, title: 'Konfirmasi Cepat', desc: 'Admin merespon dalam 15 menit untuk jadwal.' },
    { icon: <ShieldCheck />, title: 'Perbaikan Ahli', desc: 'Teknisi datang atau HP dijemput, lalu dikerjakan.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar theme="dark" />
      <PageHero
        eyebrow="Premium Service Booking"
        title={<>Jadwalkan <span className="text-orange-500 italic">Perbaikan.</span></>}
        subtitle="Layanan perbaikan smartphone terbaik dengan teknisi ahli. Cepat, amanah, dan bergaransi resmi OiimTech."
      />

      <section className="pb-24 px-6 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: info & steps */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_70px_-25px_rgba(15,23,42,0.2)] border border-slate-100 space-y-8">
                <h3 className="text-3xl font-playfair font-black text-slate-900">Proses Kami</h3>

                <div className="space-y-7">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-5 relative">
                      {i < steps.length - 1 && (
                        <div className="absolute left-7 top-16 w-0.5 h-8 bg-gradient-to-b from-orange-200 to-transparent" />
                      )}
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0 shadow-sm border border-orange-700/10">
                        {React.cloneElement(step.icon as React.ReactElement<{ size?: number }>, { size: 26 })}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-700 p-8 md:p-10 rounded-[2.5rem] text-white space-y-5 shadow-2xl shadow-orange-700/30 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-3xl font-playfair font-bold">Konsultasi Gratis?</h3>
                <p className="text-orange-100 font-medium leading-relaxed">
                  Masih bingung dengan kerusakannya? Chat langsung dengan teknisi untuk diagnosa awal dan estimasi harga.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-orange-700 px-7 py-4 rounded-2xl font-black hover:bg-orange-50 transition-all duration-300 shadow-xl group"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat Teknisi Sekarang
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Right: booking form */}
            <div className="lg:col-span-7">
              <BookingForm showServiceSelect />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
