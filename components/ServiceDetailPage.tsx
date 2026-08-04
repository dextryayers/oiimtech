'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { hpServices } from '@/lib/services-data';
import { useSiteContent } from '@/lib/use-site-content';
import { Clock, Shield, CheckCircle2, ArrowLeft, Wrench, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>();
  const services = useSiteContent('services', hpServices);
  const service = services.find((s) => s.id === Number(params.id));

  if (!service) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar theme="dark" />
        <PageHero
          eyebrow="Layanan"
          title={<>Layanan <span className="text-orange-500 italic">Tidak Ditemukan.</span></>}
          subtitle="Layanan yang Anda cari tidak tersedia."
        >
          <Link href="/services" className="btn-primary">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Layanan
          </Link>
        </PageHero>
        <Footer />
      </main>
    );
  }

  const benefits = [
    'Teknisi bersertifikat dan berpengalaman',
    'Suku cadang kualitas original',
    'Pengecekan menyeluruh sebelum & sesudah',
    'Garansi resmi tanpa ribet',
    'Konsultasi gratis seputar HP Anda',
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar theme="dark" />
      <PageHero
        eyebrow={`Layanan #${String(service.id).padStart(2, '0')}`}
        title={(
          <>
            {service.icon} <span className="text-orange-500 italic">{service.name}.</span>
          </>
        )}
        subtitle={service.description}
      />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-700 transition-colors mb-10 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Semua Layanan
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Info column */}
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50/60 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </span>
                    <span className="font-bold text-slate-800">Estimasi Waktu</span>
                  </div>
                  <p className="text-slate-500 font-semibold">{service.duration}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50/60 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
                      <Shield className="w-5 h-5" />
                    </span>
                    <span className="font-bold text-slate-800">Masa Garansi</span>
                  </div>
                  <p className="text-slate-500 font-semibold">{service.warranty}</p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 relative overflow-hidden">
                <div className="pcb-dark absolute inset-0 opacity-60 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500 mb-3">Estimasi Biaya</p>
                  <p className="text-5xl font-black">Rp {service.price.toLocaleString('id-ID')}</p>
                  <p className="text-slate-400 mt-3 text-sm font-medium">
                    Harga final dikonfirmasi teknisi setelah diagnosa - tanpa biaya tersembunyi.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-playfair font-black text-slate-900 flex items-center gap-3">
                  <Wrench className="w-6 h-6 text-orange-700" />
                  Apa yang Anda Dapatkan?
                </h3>
                <ul className="space-y-3.5">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-3.5 text-slate-600 font-medium">
                      <span className="w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-orange-50 border border-orange-700/20 p-5 flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Belum yakin dengan kerusakannya? Isi formulir pemesanan, teknisi kami akan menghubungi Anda dalam <strong className="text-slate-900">15 menit</strong> untuk diagnosa awal gratis.
                </p>
              </div>
            </div>

            {/* Booking form */}
            <div className="lg:sticky lg:top-28">
              <BookingForm preselectedServiceId={service.id} showServiceSelect={false} compact />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
