'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Swal from 'sweetalert2';
import { Plus, Pencil, Trash2, Star, Loader2, X, Quote, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

const empty = (): Testimonial => ({ name: '', rating: 5, comment: '', avatar: '' });

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Testimonial>(empty());

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/testimonials');
      if (!res.ok) throw new Error('API error');
      const data: Testimonial[] = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal Memuat', text: 'Tidak dapat memuat data testimoni.', confirmButtonColor: '#C2410C' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditIndex(null);
    setForm(empty());
    setShowModal(true);
  };

  const openEdit = (t: Testimonial, idx: number) => {
    setEditIndex(idx);
    setForm({ ...t });
    setShowModal(true);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      Swal.fire({ icon: 'warning', title: 'Data Belum Lengkap', text: 'Nama dan komentar wajib diisi.', confirmButtonColor: '#C2410C' });
      return;
    }

    const record: Testimonial = {
      ...form,
      name: form.name.trim(),
      comment: form.comment.trim(),
      rating: Math.min(5, Math.max(1, Number(form.rating) || 5)),
      avatar: form.avatar.trim() || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(form.name.trim())}`,
    };

    const next = [...items];
    if (editIndex === null) next.push(record);
    else next[editIndex] = record;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error('API error');
      setItems(next);
      setShowModal(false);
      Swal.fire({ icon: 'success', title: 'Testimoni Disimpan', timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: 'Tidak dapat menyimpan testimoni.', confirmButtonColor: '#C2410C' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (idx: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Hapus Testimoni?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#1E293B',
    });
    if (!isConfirmed) return;

    const next = items.filter((_, i) => i !== idx);
    try {
      const res = await fetch('/api/admin/content/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error('API error');
      setItems(next);
      Swal.fire({ icon: 'success', title: 'Testimoni Dihapus', timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal Menghapus', text: 'Tidak dapat menghapus testimoni.', confirmButtonColor: '#C2410C' });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Manajemen</p>
          <h1 className="font-playfair font-black text-3xl lg:text-4xl text-slate-900">Testimoni</h1>
          <p className="text-slate-500 font-semibold mt-2 text-sm">
            Kelola ulasan pelanggan yang tampil di slider Suara Pelanggan.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary shrink-0">
          <Plus className="w-4 h-4" /> Tambah Testimoni
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" /> Memuat data...
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-[2rem] py-20 text-center border border-slate-100 shadow-sm">
          <Star className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <p className="font-bold text-slate-500">Belum ada testimoni</p>
          <p className="text-sm text-slate-400 mt-1">Tambahkan testimoni pertama Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((t, idx) => (
            <article
              key={idx}
              className="bg-white rounded-[1.75rem] p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.4)] border border-slate-100 relative overflow-hidden"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-orange-700/10" />
              <div className="flex items-center gap-3.5 mb-4">
                {t.avatar ? (
                  <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full object-cover" unoptimized />
                ) : (
                  <span className="w-11 h-11 rounded-full bg-orange-50 text-orange-700 flex items-center justify-center font-black">
                    {t.name.charAt(0)}
                  </span>
                )}
                <div>
                  <h2 className="font-bold text-slate-900">{t.name}</h2>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{t.comment}</p>
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                <button onClick={() => openEdit(t, idx)} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-orange-700 hover:text-white transition-colors">
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => handleDelete(idx)} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form onSubmit={save} className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair font-black text-2xl text-slate-900">
                {editIndex === null ? 'Tambah Testimoni' : 'Edit Testimoni'}
              </h3>
              <button type="button" onClick={() => setShowModal(false)} aria-label="Tutup" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label">Nama Pelanggan *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Andi Wijaya"
                  className="field-input !bg-white"
                />
              </div>
              <div>
                <label className="field-label">Rating (1-5) *</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="field-input !bg-white cursor-pointer"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} bintang</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="field-label">
                <ImageIcon className="w-4 h-4" /> Foto (URL) - kosongkan untuk avatar otomatis
              </label>
              <input
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                placeholder="https://... / .jpg"
                className="field-input !bg-white"
              />
            </div>

            <div className="mt-4">
              <label className="field-label">Komentar *</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Tulis ulasan pelanggan..."
                className="field-input !bg-white min-h-[110px] resize-y"
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Simpan Testimoni
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Batal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}