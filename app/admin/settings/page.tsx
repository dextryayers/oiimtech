'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Settings, Loader2, Save, Phone, Mail, MapPin, User, Clock } from 'lucide-react';
import type { SiteContacts } from '@/lib/services-data';
import { defaultContacts } from '@/lib/services-data';

export default function AdminSettingsPage() {
  const [contacts, setContacts] = useState<SiteContacts>(defaultContacts);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content/contacts')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object') setContacts({ ...defaultContacts, ...data });
      })
      .catch(() => Swal.fire({ icon: 'error', title: 'Gagal Memuat', text: 'Tidak dapat memuat pengaturan.', confirmButtonColor: '#C2410C' }))
      .finally(() => setLoading(false));
  }, []);

  const resetToDefault = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Reset ke Default?',
      html: '<p class="text-sm">Semua perubahan kontak akan dikembalikan ke nilai bawaan.</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Reset',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#1E293B',
    });
    if (!isConfirmed) return;
    setContacts(defaultContacts);
    Swal.fire({
      icon: 'success',
      title: 'Kontak Direset',
      text: 'Klik Simpan Pengaturan agar aktif di situs.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const set = (field: keyof SiteContacts, v: string | boolean) =>
    setContacts((c) => ({ ...c, [field]: v }));

  const save = async () => {
    if (!contacts.whatsapp.trim() || !contacts.phoneDisplay.trim()) {
      Swal.fire({ icon: 'warning', title: 'Data Belum Lengkap', text: 'Nomor WhatsApp dan tampilan telepon wajib diisi.', confirmButtonColor: '#C2410C' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacts),
      });
      if (!res.ok) throw new Error('API error');
      Swal.fire({ icon: 'success', title: 'Pengaturan Disimpan', text: 'Perubahan langsung aktif di seluruh situs.', confirmButtonColor: '#C2410C', timer: 2000, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: 'Tidak dapat menyimpan pengaturan.', confirmButtonColor: '#C2410C' });
    } finally {
      setSaving(false);
    }
  };

  const g = (label: string, icon: React.ReactElement, field: keyof SiteContacts, type = 'text', placeholder = '') => (
    <div>
      <label className="field-label">{icon} {label}</label>
      <input
        type={type}
        value={String(contacts[field])}
        placeholder={placeholder}
        onChange={(e) => set(field, e.target.value)}
        className="field-input !bg-white"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-3" /> Memuat pengaturan...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Konfigurasi</p>
        <h1 className="font-playfair font-black text-3xl lg:text-4xl text-slate-900">Pengaturan</h1>
        <p className="text-slate-500 font-semibold mt-2 text-sm">
          Info kontak yang tersebar di seluruh situs: WhatsApp button, navbar, footer, FAQ, dan halaman booking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] border border-slate-100">
          <h2 className="flex items-center gap-3 font-playfair font-bold text-xl text-slate-900 mb-6">
            <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center"><Settings className="w-5 h-5" /></span>
            Info Kontak
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {g('Nomor WhatsApp (digit saja)', <Phone className="w-4 h-4" />, 'whatsapp', 'text', '6287817148552')}
            {g('Tampilan Nomor Telepon', <User className="w-4 h-4" />, 'phoneDisplay', 'text', '+62 878 1714 8552')}
            {g('Email', <Mail className="w-4 h-4" />, 'email', 'email', 'info@oiimtech.com')}
            {g('Jam Operasional', <Clock className="w-4 h-4" />, 'hours', 'text', 'Setiap hari 09.00 - 21.00 WIB')}
          </div>

          <div className="mt-4">
            <label className="field-label"><MapPin className="w-4 h-4" /> Alamat</label>
            <input
              value={contacts.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Jl. Dukuh Kupang, Surabaya, Indonesia"
              className="field-input !bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="field-label">Instagram (username)</label>
              <input
                value={contacts.instagram}
                onChange={(e) => set('instagram', e.target.value.replace('@', ''))}
                placeholder="oiimtech"
                className="field-input !bg-white"
              />
            </div>
            <div>
              <label className="field-label">TikTok (username)</label>
              <input
                value={contacts.tiktok}
                onChange={(e) => set('tiktok', e.target.value.replace('@', ''))}
                placeholder="oiimtech"
                className="field-input !bg-white"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan Pengaturan
            </button>
            <button onClick={resetToDefault} className="btn-secondary">Reset ke Default</button>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-slate-950 text-white rounded-[2rem] p-8 relative overflow-hidden">
            <div className="pcb-dark absolute inset-0 opacity-60 pointer-events-none" />
            <div className="relative z-10">
              <span className="eyebrow !text-orange-500">Pratinjau</span>
              <h3 className="font-playfair font-bold text-2xl mt-2">Kontak Terkini</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-orange-500 shrink-0" />{contacts.phoneDisplay || '-'}</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-orange-500 shrink-0" />{contacts.email || '-'}</li>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />{contacts.address || '-'}</li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-orange-500 shrink-0" />{contacts.hours || '-'}</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Catatan</p>
            <ul className="space-y-2.5 text-sm text-slate-500 font-medium leading-relaxed">
              <li>Nomor WhatsApp dipakai tombol melayang hijau &amp; semua link Chat WhatsApp.</li>
              <li>Prefix <code className="bg-slate-100 px-1 rounded">62</code> (tanpa + dan 0) agar link wa.me valid.</li>
              <li>TikTok belum terpasang di footer - hanya disimpan di DB.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}