import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/auth';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login Admin',
  description: 'Login panel admin OiimTech.',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAdmin()) {
    redirect('/admin');
  }

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(194,65,12,0.22),transparent_55%)]" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] rounded-full bg-orange-700/10 blur-3xl" />
      <div className="grid-pattern absolute inset-0 opacity-[0.07]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-700 to-orange-500 text-white shadow-[0_20px_50px_-15px_rgba(194,65,12,0.6)] mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
              <path d="M12 4a4 4 0 1 0-4 4l8 8a4 4 0 1 0 4-4l-8-8Z" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-playfair font-black text-white text-3xl">OiimTech Admin</h1>
          <p className="text-slate-400 text-sm mt-2 font-semibold">
            Panel manajemen internal. Khusus staf OiimTech.
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-slate-500 mt-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            &larr; Kembali ke situs
          </Link>
        </p>
      </div>
    </main>
  );
}