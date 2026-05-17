'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Shield, Users, Award, Clock, Smartphone, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AboutPage() {

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Glare effect transforms
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.6, 0.2, 0.6]);

  // Floating parallax elements
  const icon1TranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
  const icon1TranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);
  
  const icon2TranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]);
  const icon2TranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-orange-700/20 text-orange-700 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-[0.3em] border border-orange-700/30"
          >
            About Us
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-playfair font-black leading-tight"
          >
            Mengenal <span className="text-orange-700 italic">Oiimtech.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-xl font-medium"
          >
            Penyedia layanan perbaikan HP premium dengan standar kualitas tertinggi dan transparansi penuh.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group/container">
            {/* Background Glow - Interactive */}
            <motion.div 
              style={{
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
              }}
              className="absolute -bottom-12 -left-12 w-96 h-96 bg-orange-700/20 rounded-full blur-[120px] -z-10" 
            />

            {/* Floating Parallax Icons */}
            <motion.div 
              style={{ x: icon1TranslateX, y: icon1TranslateY, translateZ: 150 }}
              className="absolute -top-10 -left-10 z-30 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 text-orange-700"
            >
              <Smartphone size={32} />
            </motion.div>

            <motion.div 
              style={{ x: icon2TranslateX, y: icon2TranslateY, translateZ: 120 }}
              className="absolute -bottom-10 -right-10 z-30 p-4 bg-slate-900 rounded-2xl shadow-2xl text-orange-400"
            >
              <Zap size={32} />
            </motion.div>

            {/* Main 3D Card */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-slate-50 cursor-crosshair"
            >
              {/* Internal Depth Container */}
              <div
                style={{
                  transform: "translateZ(80px)",
                  transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full"
              >
                {/* Glare/Shine Effect */}
                <motion.div 
                  style={{
                    x: glareX,
                    y: glareY,
                    opacity: glareOpacity,
                    background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                  }}
                  className="absolute inset-0 z-20 pointer-events-none w-[200%] h-[200%] -top-[50%] -left-[50%]"
                />

                <Image
                  src="/img/about3d.png"
                  alt="Oiimtech Workshop Professional Service 3D Rendering"
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
            className="space-y-10"
          >
            <h2 className="text-5xl lg:text-7xl font-playfair font-black text-slate-900 leading-tight">
              Dedikasi Untuk <br /> <span className="text-orange-700 italic">Kualitas.</span>
            </h2>
            <p className="text-slate-500 text-xl leading-relaxed font-medium">
              Didirikan pada tahun 2025, Oiimtech bermula dari sebuah visi besar: memberikan layanan perbaikan HP yang transparan, berkualitas, dan profesional di tengah pasar yang seringkali membingungkan.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-100">
              <div>
                <motion.div 
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  className="text-5xl font-black text-orange-700 mb-2"
                >
                  2+
                </motion.div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Tahun Pengalaman</div>
              </div>
              <div>
                <motion.div 
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl font-black text-orange-700 mb-2"
                >
                  50+
                </motion.div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">HP yang Kami Perbaiki</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-playfair font-bold text-slate-800">Nilai-Nilai Utama Kami</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Prinsip yang kami pegang teguh dalam setiap layanan yang kami berikan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield />, title: 'Integritas', desc: 'Kami jujur dalam mendiagnosa kerusakan dan memberikan harga yang transparan tanpa biaya tersembunyi.' },
              { icon: <Award />, title: 'Keunggulan', desc: 'Kami selalu mengejar standar kualitas tertinggi dalam setiap detail perbaikan yang kami lakukan.' },
              { icon: <Users />, title: 'Fokus Pelanggan', desc: 'Kepuasan Anda adalah prioritas kami. Kami mendengarkan dan memberikan solusi terbaik.' },
              { icon: <Clock />, title: 'Kecepatan', desc: 'Kami menghargai waktu Anda dengan pengerjaan yang efisien tanpa mengurangi kualitas.' },
              { icon: <Smartphone />, title: 'Inovasi', desc: 'Kami terus memperbarui pengetahuan dan peralatan kami mengikuti perkembangan teknologi HP terbaru.' },
              { icon: <Zap />, title: 'Responsif', desc: 'Tim kami selalu siap membantu Anda dengan respon yang cepat dan solusi yang tepat.' },
            ].map((value, i) => (
              <div key={i} className="glass-card p-8 hover:bg-white transition-all duration-300">
                <div className="bg-orange-700/10 w-14 h-14 rounded-2xl flex items-center justify-center text-orange-700 mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h4>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-playfair font-bold text-slate-800">Tim Ahli Kami</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Dibalik setiap perbaikan yang sukses, ada tim teknisi yang berdedikasi tinggi.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {[
            { name: 'Hanif Abdurrohim', role: 'Fullstack Web Developer and IT Support', img: '/img/hanip.jpeg' },
            { name: 'Ilham Amin Tohari', role: 'Techinician', img: '/img/about.jpg' },
          ].map((member, i) => (
            <div key={i} className="text-center space-y-4 group">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">{member.name}</h4>
                <p className="text-orange-700 font-medium text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
