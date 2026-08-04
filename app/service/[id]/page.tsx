import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import { hpServices } from '@/lib/services-data';

const SITE_URL = 'https://oiimtech.com';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = hpServices.find((s) => s.id === Number(id));
  const name = service ? `${service.name} - Harga Transparan` : 'Layanan Tidak Ditemukan';
  const description = service
    ? `Layanan ${service.name} di OiimTech. Teknisi ahli, komponen original, pengerjaan cepat, dan garansi resmi. Booking online, gratis konsultasi.`
    : 'Layanan yang Anda cari tidak tersedia di OiimTech.';

  return {
    title: name,
    description,
    alternates: {
      canonical: `${SITE_URL}/service/${id}`,
    },
    openGraph: {
      title: `${name} | OiimTech`,
      description,
      url: `${SITE_URL}/service/${id}`,
      type: 'website',
      locale: 'id_ID',
      siteName: 'OiimTech',
      images: [{ url: '/img/og-image.png', width: 1200, height: 630, alt: 'OiimTech - Service HP Premium' }],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const service = hpServices.find((s) => s.id === Number(id));

  const jsonLd = service
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            serviceType: service.name,
            provider: {
              '@type': 'ElectronicsStore',
              name: 'OiimTech',
              url: SITE_URL,
              image: `${SITE_URL}/img/logo.png`,
              telephone: '+6287817148552',
            },
            areaServed: { '@type': 'Country', name: 'Indonesia' },
            url: `${SITE_URL}/service/${id}`,
            image: `${SITE_URL}/img/og-image.png`,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${SITE_URL}/services` },
              { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/service/${id}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ServiceDetailPage />
    </>
  );
}
