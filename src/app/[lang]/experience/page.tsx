

import { getDictionary } from '@/i18n/getDictionary';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const titles = {
    en: 'Wellness Reset Packages in Hawaii | Mana Reset',
    zh: '私人理疗与能量重置套餐 | Mana Reset',
    ja: 'プライベート・リセット体験パッケージ | Mana Reset',
    ko: '프라이빗 리셋 체험 패키지 | Mana Reset',
    es: 'Paquetes de Reseteo y Bienestar Privado | Mana Reset'
  };

  const descriptions = {
    en: 'Transform your solo trip into a profound self-care vacation in Hawaii. Explore our in-room stress relief retreat packages, focusing on deep emotional balance.',
    zh: '提供 The Unwind, The Balance 和 The Awakening 等三种专属上门理疗套餐，为夏威夷女性独旅者提供定制化情绪释放与神经调节。',
    ja: 'ハワイのホテルの客室に直接お届けする、感情と身体の再調整パッケージ。The Unwind, The Balance, The Awakening の3つの体験。',
    ko: '호놀룰루 호텔 스위트룸으로 제공되는 맞춤형 감정 및 신체 재조정 패키지. The Unwind, The Balance, The Awakening 중 선택하세요。',
    es: 'Transforma tu viaje en solitario en unas profundas vacaciones de autocuidado en Hawái. Explora nuestros paquetes de bienestar y alivio del estrés en tu habitación.'
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: dict.seo_keywords_experience,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/experience`,
      languages: {
        'en': `https://www.manareset.com/en/experience`,
        'zh': `https://www.manareset.com/zh/experience`,
        'ja': `https://www.manareset.com/ja/experience`,
        'ko': `https://www.manareset.com/ko/experience`,
        'es': `https://www.manareset.com/es/experience`,
        'x-default': `https://www.manareset.com/en/experience`,
      },
    }
  };
}

export default async function ExperiencePage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <main className="min-h-screen">
      <noscript dangerouslySetInnerHTML={{ __html: dict.seo_prose_experience }} />
      <section className="py-24 px-6 bg-sand text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-ocean mb-6">{dict.experience_page.title}</h1>
        <p className="text-lg text-ocean/80 max-w-2xl mx-auto">{dict.experience_page.desc}</p>
      </section>

      <section className="py-24 px-6 max-w-5xl mx-auto grid gap-12 md:grid-cols-3">
        {/* The Unwind */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-2xl font-serif text-ocean mb-2">{dict.experience_page.unwind.name}</h3>
          <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">{dict.experience_page.unwind.time}</p>
          <p className="text-gray-600 mb-8 flex-grow">{dict.experience_page.unwind.desc}</p>
          <button className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">{dict.experience_page.unwind.btn}</button>
        </div>

        {/* The Balance */}
        <div className="bg-ocean p-8 rounded-xl shadow-lg border-none flex flex-col transform md:-translate-y-4">
          <div className="text-xs tracking-widest text-sand uppercase mb-2">{dict.experience_page.balance.popular}</div>
          <h3 className="text-2xl font-serif text-white mb-2">{dict.experience_page.balance.name}</h3>
          <p className="text-sm tracking-wider text-sand/80 uppercase mb-6">{dict.experience_page.balance.time}</p>
          <p className="text-white/80 mb-8 flex-grow">{dict.experience_page.balance.desc}</p>
          <button className="w-full py-3 bg-sand text-ocean rounded hover:bg-white transition">{dict.experience_page.balance.btn}</button>
        </div>

        {/* The Awakening */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-2xl font-serif text-ocean mb-2">{dict.experience_page.awakening.name}</h3>
          <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">{dict.experience_page.awakening.time}</p>
          <p className="text-gray-600 mb-8 flex-grow">{dict.experience_page.awakening.desc}</p>
          <button className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">{dict.experience_page.awakening.btn}</button>
        </div>
      </section>
    </main>
  );
}
