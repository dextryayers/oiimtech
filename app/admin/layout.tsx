import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import AdminNav from './AdminNav';

export const metadata = {
  title: 'Admin OiimTech',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminNav />
      <div className="lg:pl-72">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}