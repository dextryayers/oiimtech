import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layanan Servis HP & Daftar Harga | Ganti LCD, Baterai, IC',
  description: 'Daftar lengkap layanan servis smartphone di OiimTech. Mulai dari ganti LCD iPhone, perbaikan motherboard, hingga pembersihan water damage dengan harga transparan.',
  alternates: {
    canonical: 'https://oiimtech.com/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
