import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { defaultContacts } from '@/lib/services-data';

const SITE_URL = 'https://oiimtech.com';

export const metadata: Metadata = {
  title: 'OiimTech | Service HP Solution #1 di Indonesia - Cepat & Bergaransi',
  description:
    'Jasa service HP profesional di Surabaya: ganti LCD, baterai, IC, motherboard, dan water damage. Teknisi ahli, komponen original, pengerjaan cepat, garansi resmi.',
  keywords: [
    'service hp surabaya', 'service hp terdekat', 'ganti lcd iphone', 'ganti baterai iphone',
    'service iphone surabaya', 'service samsung', 'servis hp bergaransi', 'perbaikan motherboard hp',
    'oiimtech',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'OiimTech | Service HP Solution #1 di Indonesia',
    description:
      'Ganti LCD, baterai, IC & water damage. Teknisi ahli, komponen original, bergaransi.',
    url: SITE_URL,
    type: 'website',
    locale: 'id_ID',
    siteName: 'OiimTech',
    images: [{ url: '/img/og-image.png', width: 1200, height: 630, alt: 'OiimTech - Service HP Premium' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OiimTech | Service HP Solution #1 di Indonesia',
    description: 'Ganti LCD, baterai, IC & water damage. Cepat, original, bergaransi.',
    images: ['/img/og-image.png'],
  },
};

function faqJsonLd() {
  const serviceItems = [
    'ganti lcd hp', 'ganti baterai hp', 'service motherboard hp', 'perbaikan ic hp',
    'water damage hp', 'cek kelembapan hp', 'service hp surabaya', 'service hp terdekat',
  ].map((k) => ({ '@type': 'Service', name: k, provider: { '@type': 'Organization', name: 'OiimTech' }, url: SITE_URL }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Layanan OiimTech',
        itemListElement: serviceItems.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: s })),
      },
      {
        '@type': 'ContactPage',
        name: 'Kontak OiimTech',
        url: SITE_URL,
        contactPoint: [
          { '@type': 'ContactPoint', telephone: '+6287817148552', contactType: 'customer service', areaServed: 'ID', availableLanguage: ['id'] },
          { '@type': 'ContactPoint', email: defaultContacts.email, contactType: 'customer service' },
        ],
      },
    ],
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <HomePage />
    </>
  );
}
