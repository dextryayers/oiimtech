'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/lib/use-site-content';
import { defaultFaq, defaultContacts } from '@/lib/services-data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const faqs = useSiteContent('faq', defaultFaq);
  const contacts = useSiteContent('contacts', defaultContacts);
  const whatsapp = contacts.whatsapp || defaultContacts.whatsapp;
  const WHATSAPP_URL = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    'Halo Oiimtech, saya punya pertanyaan seputar servis HP.'
  )}`;

  return (
    <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
      <div className="pcb-light absolute inset-0 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-orange-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* SEO: FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: heading + CTA */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
          <span className="eyebrow">Tanya Jawab</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-black text-slate-900 leading-tight text-balance">
            Pertanyaan yang Sering <span className="text-orange-700 italic">Ditanyakan.</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Masih ada pertanyaan lain? Tim teknisi kami siap menjawab langsung di WhatsApp - gratis.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
            Tanya Teknisi
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-orange-700/30 shadow-[0_20px_50px_-20px_rgba(194,65,12,0.3)]'
                    : 'border-slate-200 hover:border-orange-700/40 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 md:px-8 py-5 md:py-6 cursor-pointer"
                >
                  <span className={`font-bold md:text-lg transition-colors duration-300 ${isOpen ? 'text-orange-700' : 'text-slate-800'}`}>
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-orange-700 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-8 pb-6 text-slate-500 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
