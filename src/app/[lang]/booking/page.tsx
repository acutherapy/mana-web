import { Suspense } from 'react';
import { getDictionary } from '@/i18n/getDictionary';
import BookingForm from './BookingForm';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const titles = {
    en: 'Book Your Private Wellness Reset in Hawaii | Mana Reset',
    zh: '在线预订您的私人能量重置疗程 | Mana Reset',
    ja: 'プライベート・ウェルネス・リセットのご予約 | Mana Reset',
    ko: '프라이빗 웰니스 리셋 온라인 예약 | Mana Reset',
    es: 'Reserva Tu Reseteo de Bienestar Privado en Hawái | Mana Reset'
  };

  const descriptions = {
    en: 'Select your preferred in-room somatic wellness package and secure your booking in Honolulu. Reconnect with your life force and natural energy.',
    zh: '选择您的客房躯体疗愈套餐，在火奴鲁鲁预约专属疗程。找回您的生命原力，享受完全私密的安全扎根体验。',
    ja: 'ホノルルでの客室プライベート・ソマティックウェルネス体験を予約。生まれ持ったmana（生命力）を呼び覚まし、深くリラックス。',
    ko: '호놀룰루 호텔에서 즐기는 프라이빗 소마틱 웰니스 리셋 세션을 예약하세요. 생명력과 자연 에너지를 재정렬하는 완벽한 힐링 시간。',
    es: 'Selecciona tu paquete de bienestar somático en la habitación y asegura tu reserva en Honolulu. Reconecta con tu fuerza vital.'
  };

  const pageTitle = titles[lang] || titles.en;
  const pageDesc = descriptions[lang] || descriptions.en;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: dict.seo_keywords_booking,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/booking`,
      languages: {
        'en': `https://www.manareset.com/en/booking`,
        'zh': `https://www.manareset.com/zh/booking`,
        'ja': `https://www.manareset.com/ja/booking`,
        'ko': `https://www.manareset.com/ko/booking`,
        'es': `https://www.manareset.com/es/booking`,
        'x-default': `https://www.manareset.com/en/booking`,
      },
    }
  };
}

export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: 'en'|'zh'|'ja'|'ko'|'es' };
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ocean mb-4">{dict.booking?.title}</h1>
          <h2 className="text-xl text-ocean/80">{dict.booking?.subtitle}</h2>
          <p className="text-gray-500 mt-4 text-sm">{dict.booking?.desc}</p>
        </div>

        <Suspense fallback={<div className="text-center p-8 text-ocean">Loading secure form...</div>}>
          <BookingForm dict={dict} lang={lang} />
        </Suspense>
      </div>
    </main>
  );
}
