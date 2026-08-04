import React from 'react';
import type {Metadata, Viewport} from 'next';
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

const SITE_URL = 'https://oiimtech.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OiimTech | Service HP Solution #1 di Indonesia - Cepat & Bergaransi',
    template: '%s | OiimTech'
  },
  description: 'Layanan perbaikan HP premium di OiimTech. Spesialis Ganti LCD, Baterai, IC, dan Water Damage. Teknisi ahli, komponen original, pengerjaan cepat, dan garansi resmi.',
  keywords: ['service hp', 'perbaikan smartphone', 'iphone repair indonesia', 'samsung repair', 'ganti lcd hp', 'ganti baterai iphone', 'service hp terdekat', 'service hp surabaya', 'servis hp bergaransi', 'oiimtech'],
  applicationName: 'OiimTech',
  authors: [{ name: 'OiimTech Team', url: SITE_URL }],
  creator: 'OiimTech',
  publisher: 'OiimTech',
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'OiimTech | Service HP Solution #1 di Indonesia',
    description: 'Solusi perbaikan HP profesional dengan teknisi ahli dan garansi panjang. Ganti LCD, Baterai, IC, Water Damage - cepat, original, bergaransi.',
    url: SITE_URL,
    siteName: 'OiimTech',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OiimTech - Service HP Premium, Cepat & Bergaransi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OiimTech | Service HP Solution #1 di Indonesia',
    description: 'Solusi perbaikan HP profesional dengan teknisi ahli dan garansi panjang.',
    images: ['/img/og-image.png'],
  },
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.ico',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'OiimTech',
    statusBarStyle: 'default',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C2410C',
};

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'OiimTech',
  url: SITE_URL,
  image: `${SITE_URL}/img/og-image.png`,
  logo: `${SITE_URL}/img/logo.png`,
  telephone: '+6287817148552',
  email: 'info@oiimtech.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Dukuh Kupang',
    addressLocality: 'Surabaya',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.2731,
    longitude: 112.7497,
  },
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: 'Rp 50rb - Rp 5jt',
  currenciesAccepted: 'IDR',
  paymentAccepted: 'Cash, Transfer Bank, QRIS',
  sameAs: [
    'https://instagram.com/oiimtech',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Service HP',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ganti LCD & Touchscreen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ganti Baterai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Perbaikan IC / Motherboard' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Damage / Cek Kelembapan' } },
    ],
  },
};

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OiimTech',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/services?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
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
