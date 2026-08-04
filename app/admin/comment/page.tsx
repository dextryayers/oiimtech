'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  Loader2, RefreshCw, Trash2, Mail, Phone, MapPin, FileText,
  MessageSquare, Inbox, User,
} from 'lucide-react';

interface Comment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  question: string;
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/comments');
      if (!res.ok) throw new Error('API error');
      const data: Comment[] = await res.json();
      setComments(data);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: 'Tidak dapat mengambil data komentar dari server.',
        confirmButtonColor: '#C2410C',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (comment: Comment) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Hapus Komentar?',
      html: `<p class="text-sm">Komentar dari <strong>${comment.firstName} ${comment.lastName}</strong> akan dihapus permanen.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#1E293B',
    });
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/comments/${comment.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('API error');
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
      Swal.fire({
        icon: 'success',
        title: 'Komentar Dihapus',
        confirmButtonColor: '#C2410C',
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus',
        text: 'Tidak dapat menghapus komentar.',
        confirmButtonColor: '#C2410C',
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-2">Manajemen</p>
          <h1 className="font-playfair font-black text-3xl lg:text-4xl text-slate-900">Komentar</h1>
          <p className="text-slate-500 font-semibold mt-2 text-sm">
            {comments.length} komentar dari pengunjung situs.
          </p>
        </div>
        <button onClick={load} disabled={loading} className="btn-secondary shrink-0 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Muat Ulang
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" /> Memuat data...
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white rounded-[2rem] py-20 text-center border border-slate-100 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.3)]">
          <Inbox className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <p className="font-bold text-slate-500">Belum ada komentar</p>
          <p className="text-sm text-slate-400 mt-1">Komentar dari form di footer situs akan muncul di sini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="bg-white rounded-[1.75rem] p-6 lg:p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-700 to-orange-400" />

              <div className="flex flex-col lg:flex-row gap-6 lg:items-start justify-between">
                <div className="flex items-start gap-4 flex-grow min-w-0">
                  <div className="bg-orange-50 p-3.5 rounded-2xl text-orange-700 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-900 text-lg">
                        {comment.firstName} {comment.lastName}
                      </h2>
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        <User className="w-3 h-3" /> Komentar #{comment.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {new Date(comment.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-semibold text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <a href={`mailto:${comment.email}`} className="hover:text-orange-700 transition-colors underline decoration-dotted underline-offset-4">
                          {comment.email}
                        </a>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <a href={`tel:${comment.phone}`} className="hover:text-orange-700 transition-colors underline decoration-dotted underline-offset-4">
                          {comment.phone}
                        </a>
                      </span>
                    </div>
                    {comment.address && (
                      <p className="text-sm text-slate-600 inline-flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> {comment.address}
                      </p>
                    )}
                    <p className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed inline-flex items-start gap-2">
                      <FileText className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                      {comment.question}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end lg:justify-start shrink-0">
                  <button
                    onClick={() => handleDelete(comment)}
                    aria-label={`Hapus komentar ${comment.id}`}
                    className="p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}