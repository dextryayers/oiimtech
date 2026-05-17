import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang OiimTech | Spesialis Servis HP Profesional & Terpercaya',
  description: 'Kenali lebih dekat OiimTech, pusat servis smartphone unggulan dengan tim teknisi ahli berdedikasi tinggi untuk memberikan kualitas terbaik.',
  alternates: {
    canonical: 'https://oiimtech.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
