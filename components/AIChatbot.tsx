'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Smartphone } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const WELCOME: Message = {
  role: 'ai',
  content:
    'Halo Kak! Saya Oiim Assistant. Ada yang bisa saya bantu terkait masalah HP Kakak hari ini? Silakan tanya tentang kerusakan, estimasi biaya, atau lama pengerjaan.',
};

export default function AIChatbot() {
  const pathname = usePathname();
  const isPrivate = pathname.startsWith('/admin') || pathname === '/login';
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: 'ai', content: data.content }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Maaf Kak, sepertinya ada sedikit kendala teknis. Bisa dicoba lagi sebentar lagi?' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const quickReplies = [
    'Berapa biaya ganti layar iPhone?',
    'HP kena air, harus apa?',
    'Kenapa HP cepat panas?',
    'Berapa lama servis LCD?',
  ];

  if (isPrivate) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            aria-label="Buka asisten AI Oiim"
            className="bg-orange-700 text-white p-4 rounded-full shadow-[0_15px_30px_rgba(194,65,12,0.45)] flex items-center justify-center relative group"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />

            <span className="absolute right-full mr-4 bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Konsultasi AI Gratis
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white border border-slate-200 w-[90vw] md:w-[400px] h-[550px] md:h-[600px] rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Asisten AI Oiim"
          >
            {/* Header */}
            <div className="bg-slate-950 p-6 flex items-center justify-between text-white relative overflow-hidden">
              <div className="pcb-dark absolute inset-0 opacity-50" />
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Smartphone className="w-24 h-24 rotate-12" />
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-orange-700 p-2.5 rounded-2xl border border-white/10 relative">
                  <Bot className="w-6 h-6" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-950" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none">Oiim Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Sparkles className="w-3 h-3 text-orange-500" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Teknisi AI Pro</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Tutup asisten AI"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx}
                  className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${msg.role === 'ai' ? 'bg-orange-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
                      msg.role === 'ai'
                        ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                        : 'bg-slate-950 text-white rounded-tr-none shadow-slate-900/10'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="mt-1 w-8 h-8 rounded-xl bg-orange-700 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white text-slate-400 p-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-bold uppercase tracking-wider">Oiim mengetik...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-6 pb-2 overflow-x-auto no-scrollbar flex gap-2">
              {quickReplies.map((text, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => {
                    setInput(text);
                    setTimeout(handleSend, 50);
                  }}
                  className="whitespace-nowrap bg-white border border-slate-200 hover:border-orange-700 hover:text-orange-700 text-[11px] font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya masalah HP Anda..."
                  aria-label="Tulis pertanyaan"
                  className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-orange-700/20 transition-all outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  aria-label="Kirim pesan"
                  className="bg-orange-700 hover:bg-orange-800 disabled:opacity-40 text-white p-4 rounded-2xl transition-all shadow-lg shadow-orange-700/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-4 leading-tight">
                Oiim Assistant memberi estimasi awal - diagnosa fisik tetap dilakukan di OiimTech.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}