import React from 'react';
import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import WhatsAppButton from '@/components/WhatsAppButton';
import PromotionalPopup from '@/components/PromotionalPopup';
import CookieConsent from '@/components/CookieConsent';
import AIChatbot from '@/components/AIChatbot';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oiimtech.com'),
  title: {
    default: 'OiimTech | Service HP Solution #1 di Indonesia - Cepat & Bergaransi',
    template: '%s | OiimTech'
  },
  description: 'Layanan perbaikan HP premium di OiimTech. Spesialis Ganti LCD, Baterai, IC, dan Water Damage. Teknisi ahli, komponen original, pengerjaan cepat, dan garansi resmi.',
  keywords: ['service hp', 'perbaikan smartphone', 'iphone repair indonesia', 'samsung repair', 'ganti lcd hp', 'ganti baterai iphone', 'asisten teknis hp', 'service hp terdekat', 'oiimtech'],
  authors: [{ name: 'OiimTech Team' }],
  creator: 'OiimTech',
  publisher: 'OiimTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OiimTech | Service HP Solution #1 di Indonesia',
    description: 'Solusi perbaikan HP profesional dengan teknisi ahli dan garansi panjang.',
    url: 'https://oiimtech.com',
    siteName: 'OiimTech',
    images: [
      {
        url: '/img/logo.png',
        width: 1200,
        height: 630,
        alt: 'OiimTech Professional Repair',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OiimTech | Service HP Solution #1 di Indonesia',
    description: 'Solusi perbaikan HP profesional dengan teknisi ahli dan garansi panjang.',
    images: ['/img/logo.png'],
  },
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-800 font-inter">
        <PromotionalPopup />
        {children}
        <CookieConsent />
        <AIChatbot />
        <WhatsAppButton />
      </body>
    </html>
  );
}
