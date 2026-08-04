'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Email dan password wajib diisi.');
      setShake((s) => s + 1);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang kembali di panel admin OiimTech!',
          timer: 1600,
          showConfirmButton: false,
        });
        router.push('/admin');
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => null);
      setError('');
      setShake((s) => s + 1);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Masuk',
        text: data?.error ?? 'Email atau password salah.',
        confirmButtonColor: '#C2410C',
      });
    } catch {
      setError('Tidak dapat terhubung ke server. Coba lagi.');
      setShake((s) => s + 1);
      Swal.fire({
        icon: 'error',
        title: 'Koneksi Terputus',
        text: 'Tidak dapat terhubung ke server. Periksa koneksi Anda.',
        confirmButtonColor: '#C2410C',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      key={shake}
      initial={shake > 0 ? { x: 0 } : undefined}
      animate={shake > 0 ? { x: [0, -10, 10, -6, 6, 0] } : undefined}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
    >
      <label htmlFor="email" className="field-label !text-slate-300">
        <Mail className="w-4 h-4 text-orange-400" /> Email Admin
      </label>
      <div className="relative mt-2">
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="nama@oiimtech.com"
          autoComplete="username"
          aria-invalid={!!error}
          className="field-input !bg-white/5 !border-white/10 !text-white placeholder:text-slate-500 !pl-12"
        />
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
      </div>

      <label htmlFor="password" className="field-label !text-slate-300 !mt-6">
        <Lock className="w-4 h-4 text-orange-400" /> Password Admin
      </label>
      <div className="relative mt-2">
        <input
          id="password"
          name="password"
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
          }}
          placeholder="Masukkan password admin"
          autoComplete="current-password"
          aria-invalid={!!error}
          className="field-input !bg-white/5 !border-white/10 !text-white placeholder:text-slate-500 !pr-12"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="field-error !mt-4"
            role="alert"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button type="submit" disabled={loading} className="btn-primary w-full !mt-8 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Memverifikasi...
          </span>
        ) : (
          'Masuk ke Admin'
        )}
      </button>

      <p className="text-[11px] text-slate-500 mt-5 leading-relaxed text-center">
        Akses terbatas. Seluruh aktivitas login dicatat dan dipantau.
      </p>
    </motion.form>
  );
}