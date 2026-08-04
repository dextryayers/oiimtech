'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { hpServices } from '@/lib/services-data';
import { useSiteContent } from '@/lib/use-site-content';
import {
  Smartphone, User, Phone, MapPin, FileText, CheckCircle2,
  Clock, Shield, AlertCircle, Sparkles, ChevronDown,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { getClientId } from '@/lib/client';

interface BookingFormProps {
  preselectedServiceId?: number;
  showServiceSelect?: boolean;
  compact?: boolean;
}

interface FormData {
  serviceId: string;
  name: string;
  phone: string;
  address: string;
  note: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const DRAFT_KEY = 'oiimtech_booking_draft';

export default function BookingForm({ preselectedServiceId, showServiceSelect = true, compact = false }: BookingFormProps) {
  const router = useRouter();
  const services = useSiteContent('services', hpServices);
  const [formData, setFormData] = useState<FormData>({
    serviceId: preselectedServiceId ? String(preselectedServiceId) : '',
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);

  // Preselect from URL (?service=id) + restore draft (client-only, deferred to avoid SSR mismatch)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('service');
    const draftRaw = localStorage.getItem(DRAFT_KEY);
    const t = setTimeout(() => {
      setFormData((prev) => {
        const next = { ...prev };
        if (fromUrl && services.some((s) => s.id === Number(fromUrl))) {
          next.serviceId = fromUrl;
        } else if (!next.serviceId && draftRaw) {
          try {
            const draft = JSON.parse(draftRaw);
            next.serviceId = draft.serviceId || next.serviceId;
            next.name = draft.name || '';
            next.phone = draft.phone || '';
            next.address = draft.address || '';
            next.note = draft.note || '';
          } catch {
            localStorage.removeItem(DRAFT_KEY);
          }
        }
        return next;
      });
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Autosave draft
  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    }, 400);
    return () => clearTimeout(t);
  }, [formData]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === Number(formData.serviceId)),
    [services, formData.serviceId]
  );

  const validate = (data: FormData): Errors => {
    const errs: Errors = {};
    if (showServiceSelect && !data.serviceId) errs.serviceId = 'Pilih jenis layanan terlebih dahulu';
    if (!data.name.trim() || data.name.trim().length < 3) errs.name = 'Nama minimal 3 karakter';
    const phone = data.phone.replace(/[\s-]/g, '');
    if (!phone) errs.phone = 'Nomor WhatsApp wajib diisi';
    else if (!/^(\+?62|0)8\d{7,11}$/.test(phone)) errs.phone = 'Format nomor tidak valid (contoh: 081234567890)';
    if (!data.address.trim() || data.address.trim().length < 10) errs.address = 'Alamat minimal 10 karakter';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (attempted) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);

    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const { isConfirmed } = await Swal.fire({
      title: 'Konfirmasi Pesanan',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Layanan:</strong> ${selectedService?.name ?? '-'}</p>
          <p><strong>Estimasi Biaya:</strong> Rp ${(selectedService?.price ?? 0).toLocaleString('id-ID')}</p>
          <p><strong>Nama:</strong> ${formData.name}</p>
          <p><strong>WhatsApp:</strong> ${formData.phone}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Pesan Sekarang',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#C2410C',
      cancelButtonColor: '#1E293B',
    });

    if (!isConfirmed) return;

    const order = {
      id: Date.now(),
      orderDate: new Date().toISOString(),
      serviceName: selectedService?.name ?? 'Konsultasi Lainnya',
      price: selectedService?.price ?? 0,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
    };

    let savedLocally = false;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, clientId: getClientId() }),
      });
      if (!res.ok) throw new Error('API error');
    } catch {
      // Offline/API error fallback: simpan di perangkat pengguna
      const existingOrders = JSON.parse(localStorage.getItem('service_orders') || '[]');
      localStorage.setItem('service_orders', JSON.stringify([order, ...existingOrders]));
      savedLocally = true;
    }
    localStorage.removeItem(DRAFT_KEY);

    await Swal.fire({
      icon: 'success',
      title: 'Pesanan Berhasil!',
      html: savedLocally
        ? 'Koneksi sedang terputus, pesanan disimpan di perangkat Anda.<br/><strong>Pesanan akan dikirim otomatis</strong> saat koneksi pulih.<br/>Teknisi kami juga akan menghubungi Anda via WhatsApp.'
        : 'Pesanan Anda tersimpan di server kami.<br/>Teknisi akan menghubungi Anda dalam <strong>15 menit</strong> melalui WhatsApp.',
      confirmButtonColor: '#C2410C',
    });
    router.push('/history');
  };

  const inputClass = compact
    ? 'field-input !py-3.5'
    : 'field-input';

  const errorsFor = (key: keyof FormData) =>
    attempted && errors[key] ? (
      <p className="field-error" role="alert">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className={cn('bg-white border border-slate-100 relative overflow-hidden', compact ? 'p-6 md:p-8 rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)]' : 'p-8 lg:p-14 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.08)]')}>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-800 via-orange-700 to-orange-500" />

      <div className={cn('flex items-center justify-between', compact ? 'mb-8' : 'mb-12')}>
        <h2 className={cn('font-playfair font-black text-slate-900', compact ? 'text-3xl' : 'text-4xl')}>Form Pemesanan</h2>
        <div className="hidden sm:flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Online Now
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-7">
        {showServiceSelect && (
          <div>
            <label htmlFor="serviceId" className="field-label">
              <Smartphone className="w-4 h-4 text-orange-700" /> Pilih Layanan *
            </label>
            <div className="relative">
              <select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                aria-invalid={!!errors.serviceId}
                className={cn('appearance-none cursor-pointer pr-12', inputClass)}
              >
                <option value="">-- Pilih Jenis Kerusakan --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - Rp {service.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-5 h-5" />
            </div>
            {errorsFor('serviceId')}
          </div>
        )}

        {selectedService && (
          <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-700/20 p-5 space-y-3">
            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-orange-700">
              <Sparkles className="w-4 h-4" /> Ringkasan Layanan
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-lg font-black text-slate-900">{selectedService.name}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-700" /> {selectedService.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-orange-700" /> Garansi {selectedService.warranty}
                  </span>
                </div>
              </div>
              <p className="text-3xl font-black text-orange-700 whitespace-nowrap">
                Rp {selectedService.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        )}

        <div className={cn('grid gap-7', compact ? 'md:grid-cols-1' : 'md:grid-cols-2')}>
          <div>
            <label htmlFor="name" className="field-label">
              <User className="w-4 h-4 text-orange-700" /> Nama Lengkap *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama lengkap Anda"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className={inputClass}
            />
            {errorsFor('name')}
          </div>

          <div>
            <label htmlFor="phone" className="field-label">
              <Phone className="w-4 h-4 text-orange-700" /> WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0812..."
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              className={inputClass}
            />
            {errorsFor('phone')}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="field-label">
            <MapPin className="w-4 h-4 text-orange-700" /> Alamat Lengkap *
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={compact ? 2 : 3}
            placeholder="Alamat lengkap untuk penjemputan / kunjungan"
            autoComplete="street-address"
            aria-invalid={!!errors.address}
            className={cn('resize-none', inputClass)}
          />
          {errorsFor('address')}
        </div>

        <div>
          <label htmlFor="note" className="field-label">
            <FileText className="w-4 h-4 text-orange-700" /> Catatan Tambahan
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={compact ? 1 : 2}
            placeholder="Merk HP, warna, atau keluhan tambahan"
            className={cn('resize-none', inputClass)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-5 md:py-6 rounded-2xl bg-orange-700 text-white font-black text-lg md:text-xl shadow-[0_20px_50px_rgba(194,65,12,0.35)] hover:bg-orange-800 transition-all duration-300 flex items-center justify-center gap-3"
        >
          Konfirmasi Pesanan
          <CheckCircle2 className="w-6 h-6" />
        </motion.button>

        <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Data Anda aman - teknisi kami menghubungi via WhatsApp dalam 15 menit
        </p>
      </form>
    </div>
  );
}
