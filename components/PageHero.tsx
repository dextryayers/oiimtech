'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative pt-44 pb-28 px-6 bg-slate-950 text-white overflow-hidden">
      <div className="pcb-dark absolute inset-0 opacity-70" />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-orange-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-700/60 to-transparent" />

      <div className="max-w-7xl mx-auto text-center space-y-7 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-orange-400 bg-orange-700/20 border border-orange-700/30"
        >
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-black leading-[1.05] tracking-tight text-balance"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="pt-4 flex flex-wrap justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}