import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Servis HP Online | Teknisi Datang ke Rumah / Jemput Antar',
  description: 'Jadwalkan perbaikan smartphone Anda di OiimTech secara online. Layanan jemput antar dan teknisi datang ke rumah yang nyaman dan amanah.',
  alternates: {
    canonical: 'https://oiimtech.com/booking',
  },
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
