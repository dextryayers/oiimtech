'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Phone, MapPin, Clock, Instagram, Mail, ArrowUp, ShieldCheck, BadgeCheck, HandCoins, MessageSquare, Send, Loader2 } from 'lucide-react';
import { hpServices, defaultContacts } from '@/lib/services-data';
import { useSiteContent } from '@/lib/use-site-content';

const field =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200';

export default function Footer() {
  const services = useSiteContent('services', hpServices);
  const contacts = useSiteContent('contacts', defaultContacts);
  const c = { ...defaultContacts, ...contacts };
  const WHATSAPP_URL = `https://wa.me/${c.whatsapp}`;
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    question: '',
  });
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const set = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('API error');
      setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', question: '' });
      await Swal.fire({
        icon: 'success',
        title: 'Komentar Terkirim',
        text: 'Terima kasih! Komentar Anda akan kami balas secepatnya.',
        timer: 2200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim',
        text: 'Tidak dapat mengirim komentar. Coba lagi sebentar lagi.',
        confirmButtonColor: '#C2410C',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      <div className="pcb-dark absolute inset-0 opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-700/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-orange-700 p-2.5 rounded-2xl shadow-lg shadow-orange-700/30 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black font-playfair text-lg">O</span>
              </div>
              <span className="text-2xl font-playfair font-bold tracking-tight">
                Oiim<span className="text-orange-500">Tech</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Studio perbaikan smartphone premium. Teknisi bersertifikat, komponen original, dan garansi resmi untuk setiap perbaikan.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.instagram.com/${c.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram OiimTech"
                className="bg-white/5 border border-white/10 p-2.5 rounded-xl hover:bg-orange-700 hover:border-orange-700 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp OiimTech"
                className="bg-white/5 border border-white/10 p-2.5 rounded-xl hover:bg-green-600 hover:border-green-600 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${c.email}`}
                aria-label="Email OiimTech"
                className="bg-white/5 border border-white/10 p-2.5 rounded-xl hover:bg-orange-700 hover:border-orange-700 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-playfair font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
              Menu Cepat
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                { name: 'Beranda', href: '/' },
                { name: 'Layanan & Harga', href: '/services' },
                { name: 'Booking Servis', href: '/booking' },
                { name: 'Tentang Kami', href: '/about' },
                { name: 'Riwayat Pesanan', href: '/history' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-orange-500 hover:pl-2 transition-all duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-playfair font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
              Layanan Kami
            </h3>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/service/${service.id}`}
                    className="text-slate-400 hover:text-orange-500 hover:pl-2 transition-all duration-200 font-medium"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-lg font-playfair font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{c.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-orange-500 transition-colors">
                  {c.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{c.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Komentar / Pertanyaan */}
        <div className="relative mb-16 bg-white/5 border border-white/10 rounded-[2rem] p-8 lg:p-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold flex items-center gap-3">
                <span className="bg-orange-700 p-2.5 rounded-2xl text-white shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </span>
                Punya Pertanyaan?
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm mt-4">
                Kirim komentar, saran, atau pertanyaan tentang layanan OiimTech. Tim kami akan
                membacanya dan merespons lewat kontak yang Anda isi.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href={`mailto:${c.email}`} className="font-medium hover:text-orange-500 transition-colors">{c.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-orange-500 transition-colors">
                    {c.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-first" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Depan *</label>
                  <input id="c-first" required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Contoh: Andi" className={field} />
                </div>
                <div>
                  <label htmlFor="c-last" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Belakang *</label>
                  <input id="c-last" required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Contoh: Wijaya" className={field} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email *</label>
                  <input id="c-email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="nama@email.com" className={field} />
                </div>
                <div>
                  <label htmlFor="c-phone" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nomor WhatsApp *</label>
                  <input id="c-phone" type="tel" required value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="08xxxxxxxxxx" className={field} />
                </div>
              </div>
              <div>
                <label htmlFor="c-address" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Alamat</label>
                <input id="c-address" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Kota / alamat lengkap Anda" className={field} />
              </div>
              <div>
                <label htmlFor="c-question" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pertanyaan / Komentar *</label>
                <textarea
                  id="c-question"
                  required
                  value={form.question}
                  onChange={(e) => set('question', e.target.value)}
                  placeholder="Tulis pertanyaan atau komentar Anda tentang OiimTech..."
                  rows={4}
                  className={`${field} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-orange-700 hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {sending ? 'Mengirim...' : 'Kirim Komentar'}
              </button>
            </form>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: <ShieldCheck className="w-4 h-4" />, label: 'Garansi Resmi' },
            { icon: <BadgeCheck className="w-4 h-4" />, label: 'Teknisi Bersertifikat' },
            { icon: <HandCoins className="w-4 h-4" />, label: 'Bayar di Tempat (COD)' },
          ].map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full"
            >
              <span className="text-orange-500">{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} OiimTech. Seluruh hak cipta dilindungi.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Kembali ke atas"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-colors"
          >
            Kembali ke atas
            <span className="bg-white/10 border border-white/10 p-2.5 rounded-xl group-hover:bg-orange-700 group-hover:border-orange-700 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}