import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Riwayat Pesanan Saya',
  robots: { index: false, follow: false },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
