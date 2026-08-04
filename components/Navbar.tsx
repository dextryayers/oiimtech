'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Phone, Clock, CalendarCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSiteContent } from '@/lib/use-site-content';
import { defaultAnnouncement, defaultContacts } from '@/lib/services-data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  theme?: 'light' | 'dark';
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Layanan', href: '/services' },
  { name: 'Booking', href: '/booking' },
  { name: 'Tentang', href: '/about' },
  { name: 'Riwayat', href: '/history' },
];

export default function Navbar({ theme = 'light' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const announcement = useSiteContent('announcement', defaultAnnouncement);
  const contacts = useSiteContent('contacts', defaultContacts);
  const whatsapp = contacts.whatsapp || defaultContacts.whatsapp;
  const phoneDisplay = contacts.phoneDisplay || defaultContacts.phoneDisplay;
  const announcementText = announcement.text || defaultAnnouncement.text;
  const waConsultUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    'Halo Oiimtech, saya ingin konsultasi perbaikan HP.'
  )}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const atTop = !isScrolled;
  const onDark = theme === 'dark';
  const textColor = atTop && !onDark ? 'text-slate-800' : 'text-white';
  const activeLink = cn(
    'relative font-bold text-[15px] transition-colors duration-200 py-2 group',
    atTop && !onDark ? 'text-orange-700' : 'text-orange-500'
  );

  return (
    <>
      {/* Announcement bar - hides on scroll */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-slate-950 text-white transition-all duration-500',
          isScrolled || !announcement.enabled ? 'max-h-0' : 'max-h-12'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em]">
          <p className="flex items-center gap-2 text-slate-300 truncate">
            <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate">{announcementText}</span>
          </p>
          <a
            href={waConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {phoneDisplay}
          </a>
        </div>
      </div>

      <nav
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-500 px-6',
          isScrolled
            ? 'top-0 py-3 bg-slate-950/90 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(2,6,23,0.6)]'
            : 'top-10 py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="OiimTech - Beranda">
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-white rounded-2xl shadow-md border border-slate-100 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <Image
                src="/img/logo.png"
                alt="Logo OiimTech"
                width={44}
                height={44}
                className="object-contain p-1"
              />
            </div>
            <span className={cn('text-2xl font-playfair font-bold tracking-tight transition-colors', textColor)}>
              Oiim<span className="text-orange-500">Tech</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 rounded-xl text-[15px] font-semibold transition-all duration-200',
                    isActive
                      ? activeLink
                      : atTop && !onDark
                        ? 'text-slate-600 hover:text-orange-700'
                        : 'text-slate-200 hover:text-white'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-orange-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/booking"
              className="ml-3 inline-flex items-center gap-2 bg-orange-700 text-white pl-6 pr-5 py-3 rounded-2xl font-bold text-[15px] hover:bg-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(194,65,12,0.6)] transition-all duration-300 active:scale-95 group"
            >
              Pesan Sekarang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn('md:hidden p-2 rounded-xl transition-colors', textColor)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - full overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-slate-950/98 backdrop-blur-xl md:hidden flex flex-col"
          >
            <div className="pcb-dark absolute inset-0 opacity-60 pointer-events-none" />
            <div className="relative flex items-center justify-between px-6 py-5">
              <span className="text-2xl font-playfair font-bold text-white">
                Oiim<span className="text-orange-500">Tech</span>
              </span>
              <button
                onClick={closeMenu}
                className="text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Tutup menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-6 py-8 space-y-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        'flex items-center justify-between px-5 py-4 rounded-2xl text-xl font-bold transition-colors',
                        isActive
                          ? 'bg-orange-700/20 text-orange-500 border border-orange-700/30'
                          : 'text-slate-200 hover:bg-white/5 border border-transparent'
                      )}
                    >
                      {link.name}
                      <ArrowRight className="w-5 h-5 opacity-40" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 bg-orange-700 text-white px-6 py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-colors"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Pesan Sekarang
                </Link>
              </motion.div>
            </div>

            <div className="relative px-6 pb-8 space-y-3 text-slate-400 text-sm">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                {phoneDisplay}
              </a>
              <p className="flex items-center gap-3 font-semibold">
                <Clock className="w-4 h-4 text-orange-500" />
                {announcementText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
