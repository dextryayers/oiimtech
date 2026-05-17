'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { hpServices, type HPService } from '@/lib/services-data';
import { Clock, Shield, ArrowLeft, CheckCircle2, Smartphone, MapPin, User, Phone, FileText } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<HPService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    const foundService = hpServices.find(s => s.id === Number(params.id));
    setTimeout(() => {
      if (foundService) {
        setService(foundService);
      } else {
        router.push('/services');
      }
    }, 0);
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon lengkapi semua data wajib!',
        confirmButtonColor: '#C2410C',
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: 'Konfirmasi Pesanan',
      text: `Anda akan memesan layanan ${service?.name}. Lanjutkan?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Pesan Sekarang',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#C2410C',
      cancelButtonColor: '#1E293B',
    });

    if (isConfirmed) {
      const order = {
        id: Date.now(),
        orderDate: new Date().toISOString(),
        serviceName: service?.name,
        price: service?.price,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        note: formData.note
      };

      const existingOrders = JSON.parse(localStorage.getItem('service_orders') || '[]');
      localStorage.setItem('service_orders', JSON.stringify([order, ...existingOrders]));

      Swal.fire({
        icon: 'success',
        title: 'Pesanan Diterima!',
        text: 'Tim kami akan menghubungi Anda dalam 15 menit.',
        confirmButtonColor: '#C2410C',
      }).then(() => {
        router.push('/history');
      });
    }
  };

  if (!service) return null;

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-700 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Layanan
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Service Info */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="bg-white w-24 h-24 rounded-3xl flex items-center justify-center text-6xl shadow-xl border border-slate-100">
                  {service.icon}
                </div>
                <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-slate-800">
                  {service.name}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 border-l-4 border-l-orange-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-700" />
                    <span className="font-bold text-slate-800">Estimasi Waktu</span>
                  </div>
                  <p className="text-slate-500">{service.duration}</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-orange-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-orange-700" />
                    <span className="font-bold text-slate-800">Masa Garansi</span>
                  </div>
                  <p className="text-slate-500">{service.warranty}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-playfair font-bold text-slate-800">Apa yang Anda Dapatkan?</h3>
                <ul className="space-y-3">
                  {[
                    'Teknisi bersertifikat dan berpengalaman',
                    'Suku cadang kualitas original',
                    'Pengecekan menyeluruh sebelum & sesudah',
                    'Garansi resmi tanpa ribet',
                    'Konsultasi gratis seputar HP Anda'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-4xl font-bold text-slate-800 pt-6 border-t border-slate-200">
                Rp {service.price.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Booking Form */}
            <div className="glass-card p-10 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-700" />
              <h2 className="text-3xl font-playfair font-bold mb-8 text-slate-800">Form Pemesanan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-700" /> Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-700 focus:ring-2 focus:ring-orange-700/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-700" /> Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-700 focus:ring-2 focus:ring-orange-700/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-700" /> Alamat Lengkap *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Masukkan alamat lengkap untuk penjemputan/kunjungan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-700 focus:ring-2 focus:ring-orange-700/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-700" /> Catatan Tambahan
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Tuliskan merk HP atau keluhan tambahan jika ada"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-700 focus:ring-2 focus:ring-orange-700/20 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-secondary w-full py-4 text-lg font-bold shadow-xl shadow-orange-700/20 flex items-center justify-center gap-3"
                >
                  Pesan Layanan Ini
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                
                <p className="text-center text-xs text-slate-400">
                  * Data Anda aman bersama kami. Kami akan menghubungi Anda segera setelah pesanan dikirim.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
