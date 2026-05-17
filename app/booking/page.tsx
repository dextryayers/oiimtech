'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { hpServices } from '@/lib/services-data';
import { Smartphone, User, Phone, MapPin, FileText, CheckCircle2, ShieldCheck, Zap, ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from 'motion/react';

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    serviceId: '',
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.serviceId || !formData.name || !formData.phone || !formData.address) {
      Swal.fire({
        icon: 'error',
        title: 'Data Belum Lengkap',
        text: 'Mohon lengkapi semua data wajib yang bertanda bintang (*)',
        confirmButtonColor: '#C2410C',
      });
      return;
    }

    const selectedService = hpServices.find(s => s.id === Number(formData.serviceId));

    const { isConfirmed } = await Swal.fire({
      title: 'Konfirmasi Pesanan',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Layanan:</strong> ${selectedService?.name}</p>
          <p><strong>Estimasi Biaya:</strong> Rp ${selectedService?.price.toLocaleString('id-ID')}</p>
          <p><strong>Nama:</strong> ${formData.name}</p>
        </div>
      `,
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
        serviceName: selectedService?.name,
        price: selectedService?.price,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        note: formData.note
      };

      const existingOrders = JSON.parse(localStorage.getItem('service_orders') || '[]');
      localStorage.setItem('service_orders', JSON.stringify([order, ...existingOrders]));

      Swal.fire({
        icon: 'success',
        title: 'Pesanan Berhasil!',
        text: 'Teknisi kami akan menghubungi Anda dalam 15 menit melalui WhatsApp.',
        confirmButtonColor: '#C2410C',
      }).then(() => {
        router.push('/history');
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Premium Gradient */}
      <section className="pt-40 pb-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,65,12,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-orange-700/20 text-orange-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-orange-700/30">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Service Booking
            </div>
            <h1 className="text-6xl lg:text-8xl font-playfair font-black leading-tight">
              Jadwalkan <span className="text-orange-700 italic underline decoration-orange-700/30 underline-offset-8">Perbaikan.</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Dapatkan layanan perbaikan smartphone terbaik dengan teknisi ahli. Cepat, amanah, dan bergaransi resmi Oiimtech.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Info & Steps */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-10"
            >
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-10">
                <h3 className="text-3xl font-playfair font-black text-slate-900">Proses Kami</h3>
                
                <div className="space-y-8">
                  {[
                    { icon: <Calendar />, title: 'Pesan Online', desc: 'Isi formulir dengan detail kerusakan HP Anda.' },
                    { icon: <Clock />, title: 'Konfirmasi Cepat', desc: 'Admin kami merespon dalam 15 menit untuk jadwal.' },
                    { icon: <ShieldCheck />, title: 'Perbaikan Ahli', desc: 'Teknisi datang atau HP dijemput untuk diperbaiki.' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative">
                      {i < 2 && <div className="absolute left-7 top-14 w-0.5 h-10 bg-slate-100" />}
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0 shadow-sm">
                        {React.cloneElement(step.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-slate-500 font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-700 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl shadow-orange-700/30 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-3xl font-playfair font-bold">Konsultasi Gratis?</h3>
                <p className="text-orange-100 text-lg font-medium leading-relaxed">
                  Masih bingung dengan kerusakannya? Chat langsung dengan teknisi kami untuk diagnosa awal dan estimasi harga.
                </p>
                <a 
                  href="https://wa.me/6287817148552" 
                  target="_blank" 
                  className="inline-flex items-center gap-4 bg-white text-orange-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all duration-300 group shadow-xl"
                >
                  Chat Teknisi Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Booking Form */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="bg-white p-8 lg:p-14 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-700 to-orange-500" />
                
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-4xl font-playfair font-black text-slate-900">Form Pemesanan</h2>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online Now
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-orange-700" /> Pilih Layanan *
                    </label>
                    <div className="relative group">
                      <select
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleInputChange}
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all cursor-pointer font-bold text-slate-700 text-lg appearance-none"
                      >
                        <option value="">-- Pilih Jenis Kerusakan --</option>
                        {hpServices.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - Rp {service.price.toLocaleString('id-ID')}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-orange-700 transition-colors">
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                        <User className="w-4 h-4 text-orange-700" /> Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nama lengkap Anda"
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all font-bold text-slate-700 text-lg placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                        <Phone className="w-4 h-4 text-orange-700" /> WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0812..."
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all font-bold text-slate-700 text-lg placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-orange-700" /> Alamat Lengkap *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Alamat lengkap untuk penjemputan/kunjungan"
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all resize-none font-bold text-slate-700 text-lg placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                      <FileText className="w-4 h-4 text-orange-700" /> Catatan Tambahan
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Merk HP, warna, atau keluhan tambahan"
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all resize-none font-bold text-slate-700 text-lg placeholder:text-slate-300"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-6 rounded-2xl bg-orange-700 text-white font-black text-xl shadow-[0_20px_50px_rgba(194,65,12,0.3)] hover:bg-orange-800 transition-all duration-500 flex items-center justify-center gap-4 group"
                  >
                    Konfirmasi Pesanan
                    <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </motion.button>
                  
                  <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Data Anda aman & terenkripsi oleh sistem Oiimtech
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
