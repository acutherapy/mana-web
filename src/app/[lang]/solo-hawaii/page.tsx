import { getDictionary } from '@/i18n/getDictionary';
export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;

  const titles = {
    en: "Solo Female Hawaii Guide | The Introvert's Guide to Oahu | Mana Reset",
    zh: '夏威夷女性独自旅行指南 | 瓦胡岛静心疗愈推荐 | Mana Reset',
    ja: 'ハワイ女性一人旅ガイド | オアフ島での静かな回復 | Mana Reset',
    ko: '하와이 여성 1인 여행 가이드 | 오아후에서의 평온한 회복 | Mana Reset',
    es: 'Guía para Viajar Sola a Hawái | Guía del Introvertido en Oahu | Mana Reset'
  };

  const descriptions = {
    en: 'Planning a solo female trip to Hawaii? Discover the most serene, safe, and restorative things to do alone, from hidden beaches to private in-room wellness retreats.',
    zh: '为计划在夏威夷独自旅行的女性提供静心与安全指南，包含避开人流的天然海滩、独处冥想推荐以及客房私人疗愈体验。',
    ja: 'ハワイで女性が一人旅を楽しむための安全で静かなガイド。人混みのないビーチや静かなスポット、客室でのヒーリング体験など。',
    ko: '하와이 여성 홀로 여행을 위한 안전하고 고요한 가이드. 조용한 해변 정보와 나만을 위한 힐링 명소, 객실 내 리셋 체험을 소개합니다。',
    es: '¿Planeas un viaje sola a Hawái? Descubre las actividades más tranquilas y seguras, desde playas solitarias hasta retiros de bienestar en tu habitación.'
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/solo-hawaii`,
      languages: {
        'en': `https://www.manareset.com/en/solo-hawaii`,
        'zh': `https://www.manareset.com/zh/solo-hawaii`,
        'ja': `https://www.manareset.com/ja/solo-hawaii`,
        'ko': `https://www.manareset.com/ko/solo-hawaii`,
        'es': `https://www.manareset.com/es/solo-hawaii`,
        'x-default': `https://www.manareset.com/en/solo-hawaii`,
      },
    }
  };
}

export default async function SoloHawaiiPage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: dict.solo_page?.title || 'Solo Hawaii Guide',
    image: ['https://www.manareset.com/images/hero.png'],
    author: {
      '@type': 'Organization',
      name: 'Mana Reset',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mana Reset',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.manareset.com/images/logo.png',
      },
    },
  };

  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-serif text-ocean">{dict.solo_page.title}</h1>
        <h2 className="text-xl text-ocean/80">{dict.solo_page.subtitle}</h2>
        
        <div className="prose prose-lg text-gray-600 prose-headings:font-serif prose-headings:text-ocean">
          <p>{dict.solo_page.p1}</p>
          
          <h3 className="text-2xl mt-8 mb-4">{dict.solo_page.h1}</h3>
          <p>{dict.solo_page.p2}</p>
          
          <h3 className="text-2xl mt-8 mb-4">{dict.solo_page.h2}</h3>
          <p>{dict.solo_page.p3}</p>

          <h3 className="text-2xl mt-8 mb-4">{dict.solo_page.h3}</h3>
          <p>{dict.solo_page.p4}</p>
        </div>
      </div>
    </main>
  );
}
