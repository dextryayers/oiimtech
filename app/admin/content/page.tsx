'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  Megaphone, Sparkles, MessageCircleQuestion, Loader2, Plus, Trash2,
  Save, GripVertical,
} from 'lucide-react';
import type { FaqItem, SiteHero, SiteAnnouncement } from '@/lib/services-data';
import { defaultFaq, defaultHero, defaultAnnouncement } from '@/lib/services-data';

type SaveState = 'idle' | 'saving' | 'saved';

export default function AdminContentPage() {
  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(defaultAnnouncement);
  const [hero, setHero] = useState<SiteHero>(defaultHero);
  const [faq, setFaq] = useState<FaqItem[]>(defaultFaq);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<Record<string, SaveState>>({});

  const loadAll = async () => {
    setLoading(true);
    try {
      const [ann, hr, fq] = await Promise.all([
        fetch('/api/admin/content/announcement').then((r) => r.json()),
        fetch('/api/admin/content/hero').then((r) => r.json()),
        fetch('/api/admin/content/faq').then((r) => r.json()),
      ]);
      if (ann && typeof ann === 'object' && 'text' in ann) setAnnouncement({ ...defaultAnnouncement, ...ann });
      if (hr && typeof hr === 'object' && 'titleA' in hr) setHero({ ...defaultHero, ...hr, stats: hr.stats?.length ? hr.stats : defaultHero.stats });
      if (Array.isArray(fq)) setFaq(fq);
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal Memuat', text: 'Tidak dapat memuat konten.', confirmButtonColor: '#C2410C' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const save = async (key: string, payload: unknown) => {
    setSaveState((s) => ({ ...s, [key]: 'saving' }));
    try {
      const res = await fetch(`/api/admin/content/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('API error');
      setSaveState((s) => ({ ...s, [key]: 'saved' }));
      Swal.fire({
        icon: 'success',
        title: 'Konten Tersimpan',
        text: 'Perubahan langsung tampil di situs.',
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => setSaveState((s) => ({ ...s, [key]: 'idle' })), 2000);
    } catch {
      setSaveState((s) => ({ ...s, [key]: 'idle' }));
      Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: `Konten "${key}" tidak tersimpan.`, confirmButtonColor: '#C2410C' });
    }
  };

  const SaveButton = ({ for: k }: { for: string }) => {
    const state = saveState[k];
    return (
      <button
        onClick={() => {
          const payload = k === 'announcement' ? announcement : k === 'hero' ? hero : faq;
          save(k, payload);
        }}
        disabled={state === 'saving'}
        className="btn-primary !px-6 !py-3 disabled:opacity-60"
      >
        {state === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {state === 'saved' ? 'Tersimpan!' : 'Simpan'}
      </button>
    );
  };

  const updateStat = (i: number, field: 'value' | 'label', v: string) => {
    const stats = hero.stats.map((s, idx) => (idx === i ? { ...s, [field]: v } : s));
    setHero({ ...hero, stats });
  };

  const handleFaqDelete = async (i: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Hapus Pertanyaan?',
      html: `<p class="text-sm">Pertanyaan <strong>${faq[i]?.q || '#' + (i + 1)}</strong> akan dihapus dari FAQ.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#1E293B',
    });
    if (!isConfirmed) return;
    setFaq(faq.filter((_, idx) => idx !== i));
    Swal.fire({
      icon: 'success',
      title: 'Pertanyaan Dihapus',
      text: 'Jangan lupa klik Simpan agar perubahan aktif.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const cardTitle = 'flex items-center gap-3 font-playfair font-bold text-xl text-slate-900';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-3" /> Memuat konten...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Konten Website</p>
        <h1 className="font-playfair font-black text-3xl lg:text-4xl text-slate-900">Konten</h1>
        <p className="text-slate-500 font-semibold mt-2 text-sm">
          Edit teks yang tampil di beranda: bar pengumuman, hero section, dan FAQ. Perubahan langsung tampil di situs.
        </p>
      </div>

      <div className="space-y-8">
        {/* Announcement */}
        <section className="bg-white rounded-[2rem] p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] border border-slate-100">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <h2 className={cardTitle}>
              <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center"><Megaphone className="w-5 h-5" /></span>
              Bar Pengumuman
            </h2>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcement.enabled}
                  onChange={(e) => setAnnouncement({ ...announcement, enabled: e.target.checked })}
                  className="w-4 h-4 accent-orange-700"
                />
                Tampilkan
              </label>
              <SaveButton for="announcement" />
            </div>
          </div>
          <label className="field-label">Teks Pengumuman</label>
          <input
            value={announcement.text}
            onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
            placeholder="Buka setiap hari 09.00 - 21.00 WIB"
            className="field-input !bg-white"
          />
          <p className="text-xs text-slate-400 font-semibold mt-3">
            Tampil di bar hitam atas semua halaman. Nomor telepon di kanan bar diambil dari menu Pengaturan.
          </p>
        </section>

        {/* Hero */}
        <section className="bg-white rounded-[2rem] p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] border border-slate-100">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <h2 className={cardTitle}>
              <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center"><Sparkles className="w-5 h-5" /></span>
              Hero Section (Beranda)
            </h2>
            <SaveButton for="hero" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Badge Atas</label>
              <input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} className="field-input !bg-white" />
            </div>
            <div>
              <label className="field-label">Teks Kecil (spasi saat berubah warna)</label>
              <input value={hero.titleA} onChange={(e) => setHero({ ...hero, titleA: e.target.value })} className="field-input !bg-white" />
            </div>
            <div>
              <label className="field-label">Judul - Bagian Miring (oranye)</label>
              <input value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} className="field-input !bg-white" />
            </div>
            <div>
              <label className="field-label">Judul - Akhir</label>
              <input value={hero.titleB} onChange={(e) => setHero({ ...hero, titleB: e.target.value })} className="field-input !bg-white" />
            </div>
          </div>

          <div className="mt-4">
            <label className="field-label">Subjudul</label>
            <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className="field-input !bg-white min-h-[90px] resize-y" />
          </div>

          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-6 mb-3">Statistik Hero (3 angka)</p>
          <div className="space-y-3">
            {hero.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] items-center gap-3">
                <span className="flex items-center gap-2 text-slate-400"><GripVertical className="w-4 h-4" />#{i + 1}</span>
                <input
                  value={stat.value}
                  onChange={(e) => updateStat(i, 'value', e.target.value)}
                  placeholder="40+"
                  className="field-input !bg-white !py-3"
                />
                <input
                  value={stat.label}
                  onChange={(e) => updateStat(i, 'label', e.target.value)}
                  placeholder="HP Diperbaiki"
                  className="field-input !bg-white !py-3"
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-[2rem] p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] border border-slate-100">
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <h2 className={cardTitle}>
              <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center"><MessageCircleQuestion className="w-5 h-5" /></span>
              FAQ (Tanya Jawab)
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFaq([...faq, { q: '', a: '' }])}
                className="btn-secondary !px-5 !py-3"
              >
                <Plus className="w-4 h-4" /> Tambah
              </button>
              <SaveButton for="faq" />
            </div>
          </div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pertanyaan #{i + 1}</span>
                  <button
                    onClick={() => handleFaqDelete(i)}
                    aria-label={`Hapus pertanyaan ${i + 1}`}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  value={item.q}
                  onChange={(e) => setFaq(faq.map((f, idx) => (idx === i ? { ...f, q: e.target.value } : f)))}
                  placeholder="Pertanyaan..."
                  className="field-input !bg-white !mb-3"
                />
                <textarea
                  value={item.a}
                  onChange={(e) => setFaq(faq.map((f, idx) => (idx === i ? { ...f, a: e.target.value } : f)))}
                  placeholder="Jawaban..."
                  className="field-input !bg-white min-h-[70px] resize-y"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}