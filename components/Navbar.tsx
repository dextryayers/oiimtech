'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Layanan', href: '/services' },
    { name: 'Booking', href: '/booking' },
    { name: 'About', href: '/about' },
    { name: 'History', href: '/history' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-slate-800/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
            <Image 
              src="/img/logo.png"
              alt="OiimTech Logo"
              width={48}
              height={48}
              className="object-contain p-1"
            />
          </div>
          <span className={cn(
            "text-2xl font-playfair font-bold tracking-tight",
            isScrolled ? "text-white" : "text-slate-800"
          )}>
            Oiim<span className="text-orange-700">Tech</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'font-medium transition-colors duration-200 hover:text-orange-700',
                pathname === link.href ? 'text-orange-700' : isScrolled ? 'text-slate-200' : 'text-slate-600'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-orange-700 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-all duration-300 active:scale-95"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-white" : "text-slate-800"} />
          ) : (
            <Menu className={isScrolled ? "text-white" : "text-slate-800"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 border-t border-slate-700 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-lg font-medium transition-colors duration-200',
                pathname === link.href ? 'text-orange-700' : 'text-slate-200'
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/booking"
            className="bg-orange-700 text-white px-6 py-3 rounded-full font-medium text-center hover:bg-orange-600 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pesan Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
