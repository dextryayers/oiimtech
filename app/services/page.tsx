'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import PageHero from '@/components/PageHero';
import { hpServices } from '@/lib/services-data';
import { useSiteContent } from '@/lib/use-site-content';
import { Search, Filter, ArrowUpDown, RotateCcw } from 'lucide-react';

export default function ServicesPage() {
  const services = useSiteContent('services', hpServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'none'>('none');
  const [filterDuration, setFilterDuration] = useState<'all' | 'fast' | 'medium' | 'long'>('all');

  const filteredServices = useMemo(() => {
    let result = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterDuration !== 'all') {
      result = result.filter((service) => {
        const duration = service.duration.toLowerCase();
        if (filterDuration === 'fast') return duration.includes('jam') && parseInt(duration) <= 1;
        if (filterDuration === 'medium') return duration.includes('jam') && parseInt(duration) > 1;
        if (filterDuration === 'long') return duration.includes('hari');
        return true;
      });
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [searchQuery, sortBy, filterDuration, services]);

  const hasActiveFilter = searchQuery !== '' || sortBy !== 'none' || filterDuration !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('none');
    setFilterDuration('all');
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar theme="dark" />
      <PageHero
        eyebrow="Layanan & Harga"
        title={<>Layanan <span className="text-orange-500 italic">Profesional.</span></>}
        subtitle="Temukan solusi tepat untuk kerusakan HP Anda. Tercantum harga transparan, estimasi waktu, dan masa garansi di setiap layanan."
      />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter / Search */}
          <div className="bg-white rounded-[2.5rem] p-7 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.25)] border border-slate-100 -mt-24 relative z-20 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari layanan (misal: LCD, Baterai)..."
                aria-label="Cari layanan"
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 outline-none transition-all text-base font-semibold placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2.5 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-200 flex-1 lg:flex-none">
                <Filter className="w-5 h-5 text-orange-700 shrink-0" />
                <select
                  aria-label="Filter durasi"
                  className="bg-transparent outline-none text-sm font-bold text-slate-700 cursor-pointer"
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value as any)}
                >
                  <option value="all">Semua Durasi</option>
                  <option value="fast">Cepat (≤ 1 Jam)</option>
                  <option value="medium">Sedang (&gt; 1 Jam)</option>
                  <option value="long">Lama (Harian)</option>
                </select>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-200 flex-1 lg:flex-none">
                <ArrowUpDown className="w-5 h-5 text-orange-700 shrink-0" />
                <select
                  aria-label="Urutkan layanan"
                  className="bg-transparent outline-none text-sm font-bold text-slate-700 cursor-pointer"
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

          <div className="mt-12 mb-8 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500">
              Menampilkan <span className="text-orange-700">{filteredServices.length}</span> dari {services.length} layanan
            </p>
            {hasActiveFilter && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </button>
            )}
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-28 space-y-6">
              <div className="text-7xl grayscale opacity-20">🔍</div>
              <h3 className="text-4xl font-playfair font-black text-slate-900">Layanan tidak ditemukan</h3>
              <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">
                Hmm, tidak ada layanan yang cocok dengan kata kunci tersebut. Coba kata kunci lain atau reset filter.
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary mx-auto mt-4"
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