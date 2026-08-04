'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import { Shield, Users, Award, Clock, Smartphone, Zap, ArrowRight, BadgeCheck } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['-50%', '50%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['-50%', '50%']);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.6, 0.2, 0.6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const values = [
    { icon: <Shield />, title: 'Integritas', desc: 'Jujur dalam mendiagnosa dan transparan dalam harga - tanpa biaya tersembunyi.' },
    { icon: <Award />, title: 'Keunggulan', desc: 'Menjaga standar kualitas tertinggi dalam setiap detail perbaikan.' },
    { icon: <Users />, title: 'Fokus Pelanggan', desc: 'Kepuasan Anda adalah prioritas. Kami mendengarkan lalu memberi solusi.' },
    { icon: <Clock />, title: 'Kecepatan', desc: 'Menghargai waktu Anda dengan pengerjaan efisien tanpa mengurangi kualitas.' },
    { icon: <Smartphone />, title: 'Inovasi', desc: 'Memperbarui pengetahuan dan peralatan mengikuti teknologi terbaru.' },
    { icon: <Zap />, title: 'Responsif', desc: 'Tim siap membantu dengan respon cepat dan solusi yang tepat.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar theme="dark" />
      <PageHero
        eyebrow="Tentang Kami"
        title={<>Mengenal <span className="text-orange-500 italic">OiimTech.</span></>}
        subtitle="Penyedia layanan perbaikan smartphone premium dengan standar kualitas tertinggi dan transparansi penuh."
      />

      {/* Story Section */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative group/container order-2 lg:order-1">
            <motion.div
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
              }}
              className="absolute -bottom-12 -left-12 w-96 h-96 bg-orange-700/20 rounded-full blur-[120px] -z-10"
            />

            <div className="absolute -top-10 -left-10 z-30 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 text-orange-700">
              <Smartphone size={30} />
            </div>

            <div className="absolute -bottom-10 -right-10 z-30 p-4 bg-slate-950 rounded-2xl shadow-2xl text-orange-400">
              <Zap size={30} />
            </div>

            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
              className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[14px] border-slate-50 cursor-crosshair"
            >
              <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }} className="relative w-full h-full">
                <motion.div
                  style={{
                    x: glareX,
                    y: glareY,
                    opacity: glareOpacity,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                  }}
                  className="absolute inset-0 z-20 pointer-events-none w-[200%] h-[200%] -top-1/2 -left-1/2"
                />
                <Image
                  src="/img/about3d.png"
                  alt="Workshop OiimTech - render 3D"
                  width={800}
                  height={1000}
                  className="object-cover scale-105 pointer-events-none"
                  priority
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <span className="eyebrow">Cerita Kami</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-black text-slate-900 leading-tight text-balance">
              Dedikasi Untuk <span className="text-orange-700 italic">Kualitas.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Didirikan tahun 2025, OiimTech lahir dari sebuah visi: menghadirkan layanan perbaikan HP yang transparan, berkualitas, dan profesional di tengah pasar yang sering membingungkan.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Setiap perangkat yang masuk ke meja kerja kami diperlakukan seperti milik kami sendiri - diagnosa jujur, pengerjaan presisi, dan garansi yang benar-benar ditepati.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div>
                <p className="text-5xl font-black text-orange-700">12.000+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">HP Diperbaiki</p>
              </div>
              <div>
                <p className="text-5xl font-black text-orange-700">4.9/5</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Rating Pelanggan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 py-24 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-5">
            <span className="eyebrow">Prinsip Kami</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-black text-slate-900">Nilai-Nilai Utama Kami</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
              Prinsip yang kami pegang teguh dalam setiap layanan yang kami berikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.1)] hover:shadow-[0_30px_60px_-20px_rgba(194,65,12,0.25)] hover:-translate-y-1 hover:border-orange-700/25 transition-all duration-500"
              >
                <div className="bg-orange-700/10 w-14 h-14 rounded-2xl flex items-center justify-center text-orange-700 mb-6 group-hover:bg-orange-700 group-hover:text-white group-hover:scale-105 transition-all duration-500">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 px-6 bg-slate-950 relative overflow-hidden">
        <div className="pcb-dark absolute inset-0 opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-5">
            <span className="eyebrow">Tim Kami</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-black text-white">Teknisi di Balik OiimTech</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Dibalik setiap perbaikan yang sukses, ada tim teknisi yang berdedikasi tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: 'Hanif Abdurrohim', role: 'Fullstack Developer & IT Support', img: '/img/hanip.jpeg' },
              { name: 'Ilham Amin Tohari', role: 'Teknisi Spesialis', img: '/img/about.jpg' },
            ].map((member, i) => (
              <div key={i} className="text-center space-y-5 group">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg border border-white/10 group-hover:-translate-y-1.5 transition-transform duration-500">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{member.name}</h4>
                  <p className="text-orange-400 font-semibold text-sm mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/booking" className="btn-primary !px-10 !py-4 !text-lg">
              Konsultasi Gratis Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}