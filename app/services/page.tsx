'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { hpServices } from '@/lib/services-data';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'none'>('none');
  const [filterDuration, setFilterDuration] = useState<'all' | 'fast' | 'medium' | 'long'>('all');

  const filteredServices = useMemo(() => {
    let result = hpServices.filter(service => 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterDuration !== 'all') {
      result = result.filter(service => {
        const duration = service.duration.toLowerCase();
        if (filterDuration === 'fast') return duration.includes('jam') && parseInt(duration) <= 1;
        if (filterDuration === 'medium') return duration.includes('jam') && parseInt(duration) > 1;
        if (filterDuration === 'long') return duration.includes('hari');
        return true;
      });
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, sortBy, filterDuration]);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block bg-orange-700/20 text-orange-700 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-[0.3em] border border-orange-700/30">
            Our Services
          </div>
          <h1 className="text-6xl lg:text-8xl font-playfair font-black leading-tight">
            Layanan <span className="text-orange-700 italic">Profesional.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">
            Temukan solusi perbaikan yang tepat untuk HP Anda. Kami menangani berbagai jenis kerusakan dengan teknisi bersertifikat internasional.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 mb-16 flex flex-col lg:flex-row gap-8 items-center justify-between shadow-2xl border-slate-100 -mt-24 relative z-20 bg-white">
            <div className="relative w-full lg:max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Cari layanan (misal: LCD, Baterai)..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                <Filter className="w-5 h-5 text-orange-700" />
                <select 
                  className="bg-transparent outline-none text-base font-bold text-slate-700 cursor-pointer"
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value as any)}
                >
                  <option value="all">Semua Durasi</option>
                  <option value="fast">Cepat (≤ 1 Jam)</option>
                  <option value="medium">Sedang (&gt; 1 Jam)</option>
                  <option value="long">Lama (Harian)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                <ArrowUpDown className="w-5 h-5 text-orange-700" />
                <select 
                  className="bg-transparent outline-none text-base font-bold text-slate-700 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="none">Urutkan</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="name-asc">Nama A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 space-y-6">
              <div className="text-8xl grayscale opacity-20">🔍</div>
              <h3 className="text-4xl font-playfair font-black text-slate-900">Layanan tidak ditemukan</h3>
              <p className="text-slate-500 text-xl font-medium">Coba gunakan kata kunci lain atau reset filter Anda.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSortBy('none'); setFilterDuration('all');}}
                className="bg-orange-700 text-white px-8 py-3 rounded-xl font-black hover:bg-orange-800 transition-all duration-300"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
