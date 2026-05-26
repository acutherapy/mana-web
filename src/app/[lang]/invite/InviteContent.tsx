'use client';

import { useState } from 'react';
import { Share2, X, ArrowRight } from 'lucide-react';
import TalismanCanvas from '@/components/TalismanCanvas';
import Link from 'next/link';

export default function InviteContent({ dict, lang }: { dict: any, lang: string }) {
  const t = dict.invite_page;
  const [showQR, setShowQR] = useState(false);
  const shareUrl = `https://manareset.com/${lang}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="relative max-w-4xl mx-auto w-full">
      {/* Floating Share Bubble */}
      <button 
        onClick={() => setShowQR(true)}
        className="fixed bottom-8 right-8 z-50 bg-ocean text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 group"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden group-hover:inline-block pr-2 font-medium text-sm">
          {t.share_bubble}
        </span>
      </button>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-ocean">
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-serif text-2xl text-ocean mb-2">{t.share}</h3>
            <p className="text-gray-500 text-sm mb-8">{t.scan_qr}</p>
            <div className="bg-sand/30 p-4 rounded-xl inline-block mb-6">
              <img src={qrUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
            </div>
            <p className="text-xs text-gray-400 break-all">{shareUrl}</p>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Top Section with Canvas */}
        <div className="bg-ocean relative h-[350px] md:h-[450px] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <TalismanCanvas mode="ring" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
              {t.title}
            </h1>
            <p className="text-sand/80 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Content Section (Pain points & Solutions) */}
        <div className="p-8 md:p-16 space-y-12">
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-ocean font-serif text-xl mb-4">1</div>
              <h3 className="font-serif text-xl text-ocean">{t.pain1_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.pain1_desc}</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-ocean font-serif text-xl mb-4">2</div>
              <h3 className="font-serif text-xl text-ocean">{t.pain2_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.pain2_desc}</p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-ocean font-serif text-xl mb-4">3</div>
              <h3 className="font-serif text-xl text-ocean">{t.pain3_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.pain3_desc}</p>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col items-center text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-ocean mb-4 leading-relaxed">{t.talisman_title}</h3>
            <p className="text-gray-600 mb-10 max-w-xl text-lg leading-relaxed">{t.talisman_desc}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href={`/${lang}#test`} className="inline-flex justify-center items-center gap-2 bg-ocean text-white px-8 py-4 rounded font-medium hover:bg-ocean-light transition-all hover:scale-105 shadow-lg shadow-ocean/20">
                {t.get_talisman}
              </Link>
              <Link href={`/${lang}/booking`} className="inline-flex justify-center items-center gap-2 bg-white text-ocean border border-ocean px-8 py-4 rounded font-medium hover:bg-sand transition-all">
                {t.book}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
