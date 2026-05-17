import Link from 'next/link';
import { Smartphone, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-700 p-2 rounded-xl">
              <Smartphone className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-playfair font-bold tracking-tight text-white">
              Oiim<span className="text-orange-700">tech</span>
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            Layanan perbaikan HP premium dengan teknisi ahli dan suku cadang berkualitas. Kami mengutamakan kecepatan dan kepuasan pelanggan.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-slate-700 p-2 rounded-full hover:bg-orange-700 transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-slate-700 p-2 rounded-full hover:bg-orange-700 transition-colors duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="bg-slate-700 p-2 rounded-full hover:bg-orange-700 transition-colors duration-300">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-playfair font-bold">Menu Cepat</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-slate-400 hover:text-orange-700 transition-colors duration-200">Home</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-orange-700 transition-colors duration-200">Layanan</Link></li>
            <li><Link href="/booking" className="text-slate-400 hover:text-orange-700 transition-colors duration-200">Booking</Link></li>
            <li><Link href="/about" className="text-slate-400 hover:text-orange-700 transition-colors duration-200">Tentang Kami</Link></li>
            <li><Link href="/history" className="text-slate-400 hover:text-orange-700 transition-colors duration-200">Riwayat Pesanan</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h3 className="text-xl font-playfair font-bold">Layanan Kami</h3>
          <ul className="space-y-4">
            <li className="text-slate-400">Ganti LCD Original</li>
            <li className="text-slate-400">Ganti Baterai Bergaransi</li>
            <li className="text-slate-400">Perbaikan Software</li>
            <li className="text-slate-400">Water Damage Repair</li>
            <li className="text-slate-400">Ganti Kamera & Konektor</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-playfair font-bold">Hubungi Kami</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-400">
              <MapPin className="w-5 h-5 text-orange-700 shrink-0" />
              <span>Jl. Dukuh Kupang, Surabaya, Indonesia</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <Phone className="w-5 h-5 text-orange-700 shrink-0" />
              <span>+62 878 1714 8552</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <Mail className="w-5 h-5 text-orange-700 shrink-0" />
              <span>info@oiimtech.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-700 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Oiimtech. All rights reserved. Dibuat dengan dedikasi untuk keunggulan.</p>
      </div>
    </footer>
  );
}
