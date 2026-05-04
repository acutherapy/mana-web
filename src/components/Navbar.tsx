'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ lang, dict }: { lang: string, dict: any }) {
  const [langOpen, setLangOpen] = useState(false);
  const langLabels: Record<string, string> = { en: 'EN', zh: '中', ja: 'JP', ko: 'KR', es: 'ES' };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 glass-panel z-50 border-b-0 border-ocean/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Mana Reset" className="w-9 h-9 object-contain" />
          <div className="flex flex-col">
            <span className="font-serif text-2xl text-ocean font-semibold leading-none">Mana Reset</span>
            <span className="text-[0.65rem] tracking-widest text-ocean/60 uppercase mt-1">Mind Body Reset</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href={`/${lang}#why`} className="hover:text-ocean transition">{dict.nav?.why}</Link>
          <Link href={`/${lang}#approach`} className="hover:text-ocean transition">{dict.nav?.approach}</Link>
          <Link href={`/${lang}#experience`} className="hover:text-ocean transition">{dict.nav?.experience}</Link>
          <Link href={`/${lang}#test`} className="hover:text-ocean transition">{dict.nav?.test}</Link>
          
          <div className="relative ml-4 border-l pl-4 border-gray-200">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="text-xs text-ocean font-bold flex items-center gap-1 uppercase tracking-widest hover:text-ocean-light transition"
            >
              {langLabels[lang] || 'EN'} 
              <span className="text-[9px]">▼</span>
            </button>
            
            {langOpen && (
              <div className="absolute top-full right-0 mt-4 bg-white shadow-xl rounded-md border border-gray-100 py-3 min-w-[80px] flex flex-col gap-3 text-center text-xs uppercase tracking-widest">
                <Link href="/en" onClick={() => setLangOpen(false)} className={lang === 'en' ? 'text-ocean font-bold' : 'text-gray-400 hover:text-ocean transition'}>EN</Link>
                <Link href="/zh" onClick={() => setLangOpen(false)} className={lang === 'zh' ? 'text-ocean font-bold' : 'text-gray-400 hover:text-ocean transition'}>中</Link>
                <Link href="/ja" onClick={() => setLangOpen(false)} className={lang === 'ja' ? 'text-ocean font-bold' : 'text-gray-400 hover:text-ocean transition'}>JP</Link>
                <Link href="/ko" onClick={() => setLangOpen(false)} className={lang === 'ko' ? 'text-ocean font-bold' : 'text-gray-400 hover:text-ocean transition'}>KR</Link>
                <Link href="/es" onClick={() => setLangOpen(false)} className={lang === 'es' ? 'text-ocean font-bold' : 'text-gray-400 hover:text-ocean transition'}>ES</Link>
              </div>
            )}
          </div>
          
          <Link href={`/${lang}/booking`} className="px-5 py-2 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">
            {dict.nav?.book}
          </Link>
        </div>
      </div>
    </nav>
  );
}
