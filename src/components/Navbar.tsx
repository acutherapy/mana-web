'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ lang, dict }: { lang: string, dict: any }) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langLabels: Record<string, string> = { en: 'EN', zh: '中', ja: 'JP', ko: 'KR', es: 'ES' };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 glass-panel z-50 border-b-0 border-ocean/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href={`/${lang}`} className="flex flex-col">
          <span className="font-serif text-2xl text-ocean font-semibold leading-none">Mana Reset</span>
          <span className="text-[0.65rem] tracking-widest text-ocean/60 uppercase mt-1">Mind Body Reset</span>
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

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-ocean"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-4 font-medium text-ocean text-center z-50">
          <Link href={`/${lang}#why`} onClick={() => setMobileMenuOpen(false)}>{dict.nav?.why}</Link>
          <Link href={`/${lang}#approach`} onClick={() => setMobileMenuOpen(false)}>{dict.nav?.approach}</Link>
          <Link href={`/${lang}#experience`} onClick={() => setMobileMenuOpen(false)}>{dict.nav?.experience}</Link>
          <Link href={`/${lang}#test`} onClick={() => setMobileMenuOpen(false)}>{dict.nav?.test}</Link>
          
          <div className="flex justify-center gap-3 mt-2 text-sm">
            <Link href="/en" onClick={() => setMobileMenuOpen(false)} className={lang === 'en' ? 'font-bold' : 'text-gray-400'}>EN</Link>
            <Link href="/zh" onClick={() => setMobileMenuOpen(false)} className={lang === 'zh' ? 'font-bold' : 'text-gray-400'}>中</Link>
            <Link href="/ja" onClick={() => setMobileMenuOpen(false)} className={lang === 'ja' ? 'font-bold' : 'text-gray-400'}>JP</Link>
            <Link href="/ko" onClick={() => setMobileMenuOpen(false)} className={lang === 'ko' ? 'font-bold' : 'text-gray-400'}>KR</Link>
            <Link href="/es" onClick={() => setMobileMenuOpen(false)} className={lang === 'es' ? 'font-bold' : 'text-gray-400'}>ES</Link>
          </div>

          <Link href={`/${lang}/booking`} onClick={() => setMobileMenuOpen(false)} className="mt-4 px-5 py-3 bg-ocean text-white rounded">
            {dict.nav?.book}
          </Link>
        </div>
      )}

    </nav>
  );
}
