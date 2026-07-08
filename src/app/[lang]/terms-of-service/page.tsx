import { getDictionary } from '@/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;

  const titles = {
    en: 'Terms of Service | Mana Reset',
    zh: '服务条款 | Mana Reset',
    ja: '利用規約 | Mana Reset',
    ko: '이용약관 | Mana Reset',
    es: 'Términos de Servicio | Mana Reset'
  };

  const descriptions = {
    en: 'Review the Terms of Service for using Mana Reset booking and private wellness services in Hawaii.',
    zh: '阅读 Mana Reset 服务条款，了解我们在夏威夷提供客房私人理疗与预订服务的使用规则和条款细节。',
    ja: 'Mana Reset の利用規約。ハワイにおける客室プライベートウェルネスおよびご予約に関する利用規約。',
    ko: 'Mana Reset 이용약관. 하와이 호텔 객실 내 서비스 및 예약 시스템의 이용 수칙과 세부 조항을 확인하세요。',
    es: 'Revisa los términos de servicio para el uso del sistema de reservas de Mana Reset en Hawái.'
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/terms-of-service`,
      languages: {
        'en': `https://www.manareset.com/en/terms-of-service`,
        'zh': `https://www.manareset.com/zh/terms-of-service`,
        'ja': `https://www.manareset.com/ja/terms-of-service`,
        'ko': `https://www.manareset.com/ko/terms-of-service`,
        'es': `https://www.manareset.com/es/terms-of-service`,
        'x-default': `https://www.manareset.com/en/terms-of-service`,
      },
    }
  };
}

export default async function TermsOfService({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: 'en' | 'zh' | 'ja' | 'ko' | 'es' };
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-ocean">{dict.terms_page?.title}</h1>
          <p className="text-sm text-gray-500">{dict.terms_page?.last_updated}</p>
        </div>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {dict.terms_page?.sections?.map((section: any, index: number) => (
            <div key={index} className="space-y-4">
              {section.h2 && <h2 className="text-2xl font-serif text-ocean">{section.h2}</h2>}
              {section.p1 && <p>{section.p1}</p>}
              {section.p2 && <p>{section.p2}</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
