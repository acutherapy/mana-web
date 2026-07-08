import type { Metadata } from 'next';
import Link from 'next/link';



const steps = [
  {
    number: '01',
    title: 'Arrival & Grounding',
    description:
      'Your practitioner arrives quietly and without ceremony. The first few minutes are unhurried — a brief conversation, a settling of the space, and a moment to simply arrive together.',
  },
  {
    number: '02',
    title: 'Breathwork',
    description:
      'Guided breathing patterns calibrated to your current state. Not performance — just breath. This is often where the body begins to remember that it knows how to let go.',
  },
  {
    number: '03',
    title: 'Dialogue & Presence',
    description:
      'Not therapy. Not advice. Simply being witnessed — spoken to or sat with, depending on what you need. Many clients say this is the part they did not know they were missing.',
  },
  {
    number: '04',
    title: 'Energy Clearing & Acupressure',
    description:
      'Light, intentional touch informed by Five Elements theory. Specific points, specific intentions. Nothing forceful. Everything with consent.',
  },
  {
    number: '05',
    title: 'Integration',
    description:
      'The session does not end abruptly. Time is held for stillness, for reflection, for the body to absorb what has shifted. You leave at your own pace.',
  },
];

const elements = [
  {
    name: 'Wood',
    theme: 'Growth & Direction',
    description:
      'Associated with the liver and the capacity to move forward. When Wood is depleted, we feel stuck, frustrated, or unable to plan. When it flows, we feel purposeful and clear.',
  },
  {
    name: 'Fire',
    theme: 'Passion & Joy',
    description:
      'The element of the heart. Fire governs connection, warmth, and the ability to feel delight. When Fire dims, we feel numb or performatively happy. When it burns well, joy is natural.',
  },
  {
    name: 'Earth',
    theme: 'Stability & Nourishment',
    description:
      'Earth holds us. It governs digestion — of food and of experience. When Earth is out of balance, we feel ungrounded or unworthy of care. Restoring it feels like exhaling.',
  },
  {
    name: 'Metal',
    theme: 'Clarity & Precision',
    description:
      'Metal governs what we hold onto and what we release. It is the element of discernment. When Metal is clear, we know what matters. When it is blocked, we carry grief we cannot name.',
  },
  {
    name: 'Water',
    theme: 'Depth & Adaptability',
    description:
      'The deepest element. Water governs fear, rest, and the reservoir from which everything else draws. Many solo travelers arrive with Water severely depleted — the session often begins here.',
  },
];

const forWhom = [
  'You are traveling alone and craving something that is not a spa package or a group yoga class.',
  'You feel physically present in Hawaii but mentally still at your desk, in your inbox, or in something you have not fully processed.',
  'You are in the middle of a transition — a breakup, a career shift, a loss — and want to be held, not fixed.',
  'You have tried rest and it has not quite reached the part of you that needs it most.',
  'You want to return home feeling like you actually went somewhere — not just changed time zones.',
];

import { getDictionary } from '@/i18n/getDictionary';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const titles = {
    en: 'Our Approach | Mana Reset — Five Elements Wellness in Hawaii',
    zh: '我们的疗愈方法论：躯体觉知与五行能量 | Mana Reset',
    ja: '私たちのヒーリングアプローチ：ソマティックと五行エネルギー | Mana Reset',
    ko: '우리의 힐링 어프로치: 소마틱 및 오행 에너지 | Mana Reset',
    es: 'Nuestro Enfoque: Bienestar Somático y Cinco Elementos | Mana Reset'
  };

  const descriptions = {
    en: 'Learn how Mana Reset uses somatic experiencing, breathwork, and the Five Elements framework to create private in-room reset experiences for solo female travelers in Hawaii.',
    zh: '探索我们将躯体倾听、呼吸法与中医五行能量相结合的独特疗愈方法，助您在夏威夷独旅中实现深层的神经系统恢复与情绪释放。',
    ja: '身体の声に耳を傾けるソマティック体験、呼吸法、そして東洋の五行説を組み合わせた、ハワイでのディープな自己治癒アプローチ。',
    ko: '소마틱 경험, 호흡법, 동양의 오행 사상을 결합한 독창적인 힐링 어프로치를 소개합니다. 하와이 여정에서 깊은 내면의 평화를 느껴보세요。',
    es: 'Descubre cómo Mana Reset utiliza la experiencia somática, el trabajo de respiración y los Cinco Elementos para crear un reinicio profundo en Hawái.'
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: dict.seo_keywords_approach,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/approach`,
      languages: {
        'en': `https://www.manareset.com/en/approach`,
        'zh': `https://www.manareset.com/zh/approach`,
        'ja': `https://www.manareset.com/ja/approach`,
        'ko': `https://www.manareset.com/ko/approach`,
        'es': `https://www.manareset.com/es/approach`,
        'x-default': `https://www.manareset.com/en/approach`,
      },
    }
  };
}

export default async function ApproachPage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: dict.approach_page?.hero_title || 'Our Approach',
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
    <main className="min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <noscript dangerouslySetInnerHTML={{ __html: dict.seo_prose_approach }} />
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 bg-ocean text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-sm font-medium tracking-[0.2em] text-sand/70 uppercase">
            {dict.approach_page.hero_label}
          </span>
          <h1 className="text-5xl lg:text-6xl font-serif text-sand leading-tight">
            {dict.approach_page.hero_title}
          </h1>
          <p className="text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            {dict.approach_page.hero_desc}
          </p>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              {dict.approach_page.who_label}
            </span>
            <h2 className="text-4xl font-serif text-ocean">{dict.approach_page.who_title}</h2>
          </div>
          <div className="space-y-4">
            {dict.approach_page.for_whom.map((point: string, index: number) => (
              <div key={index} className="bg-sand/30 border border-sand rounded-2xl px-8 py-6 flex gap-5 items-start">
                <span className="text-ocean mt-0.5 shrink-0 text-lg">&rarr;</span>
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href={`/${lang}/booking`}
              className="inline-block bg-ocean text-white px-10 py-4 rounded font-medium hover:bg-ocean/90 transition shadow-sm"
            >
              {dict.approach_page.btn}
            </Link>
          </div>
        </div>
      </section>

      {/* What a Session Looks Like */}
      <section className="py-24 px-6 bg-sand/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              {dict.approach_page.shape_label}
            </span>
            <h2 className="text-4xl font-serif text-ocean">{dict.approach_page.shape_title}</h2>
            <p className="text-ocean/70 text-lg max-w-xl mx-auto">
              {dict.approach_page.shape_desc}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dict.approach_page.steps.map((step: any) => (
              <div key={step.num} className="bg-white rounded-2xl p-8 shadow-sm border border-sand/60">
                <p className="text-3xl font-serif text-sand mb-4">{step.num}</p>
                <h3 className="text-lg font-serif text-ocean mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
            <div className="bg-ocean rounded-2xl p-8 flex items-center justify-center text-center md:col-span-2 lg:col-span-1">
              <p className="text-white/80 italic text-lg leading-relaxed font-serif">
                {dict.approach_page.quote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Elements */}
      <section className="py-24 px-6 bg-ocean text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-medium tracking-[0.2em] text-sand/70 uppercase">
              {dict.approach_page.fw_label}
            </span>
            <h2 className="text-4xl font-serif text-sand">{dict.approach_page.fw_title}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {dict.approach_page.fw_desc}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.approach_page.elements.map((el: any) => (
              <div key={el.name} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-serif text-sand mb-1">{el.name}</h3>
                <p className="text-xs tracking-widest text-sand/60 uppercase mb-4">{el.theme}</p>
                <p className="text-white/75 leading-relaxed text-sm">{el.desc}</p>
              </div>
            ))}
            <div className="bg-sand/10 border border-sand/20 rounded-2xl p-8 flex flex-col justify-center text-center md:col-span-2 lg:col-span-2">
              <p className="text-white/80 text-base leading-relaxed">
                {dict.approach_page.fw_footer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              {dict.approach_page.who_label}
            </span>
            <h2 className="text-4xl font-serif text-ocean">{dict.approach_page.who_title}</h2>
          </div>
          <div className="space-y-4">
            {dict.approach_page.for_whom.map((point: string, index: number) => (
              <div key={index} className="bg-sand/30 border border-sand rounded-2xl px-8 py-6 flex gap-5 items-start">
                <span className="text-ocean mt-0.5 shrink-0 text-lg">&rarr;</span>
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href={`/${lang}/booking`}
              className="inline-block bg-ocean text-white px-10 py-4 rounded font-medium hover:bg-ocean/90 transition shadow-sm"
            >
              {dict.approach_page.btn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
