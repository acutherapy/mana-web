export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;

  const titles = {
    en: 'FAQ | Mana Reset — Private Wellness for Solo Travelers in Hawaii',
    zh: '常见问题解答 (FAQ) | Mana Reset',
    ja: 'よくあるご質問 (FAQ) | Mana Reset',
    ko: '자주 묻는 질문 (FAQ) | Mana Reset',
    es: 'Preguntas Frecuentes (FAQ) | Mana Reset'
  };

  const descriptions = {
    en: 'Answers to your most common questions about Mana Reset — session lengths, pricing, safety, cancellation policy, and what to expect from your private in-room reset experience in Hawaii.',
    zh: '为您解答关于 Mana Reset 的常见疑问：服务收费、安全保障、隐私保护、理疗师背景以及客房服务政策等。',
    ja: 'セッション内容、料金、安全性、キャンセルポリシー、ホテルの客室での体験について、よくあるご質問にお答えします。',
    ko: '세션 시간, 요금, 안전, 환불 규정 및 호텔 객실 서비스 진행 방식 등 자주 묻는 질문에 대한 답변을 확인하세요。',
    es: 'Respuestas a tus preguntas sobre Mana Reset: duración de las sesiones, precios, seguridad, políticas de cancelación y qué esperar.'
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/faq`,
      languages: {
        'en': `https://www.manareset.com/en/faq`,
        'zh': `https://www.manareset.com/zh/faq`,
        'ja': `https://www.manareset.com/ja/faq`,
        'ko': `https://www.manareset.com/ko/faq`,
        'es': `https://www.manareset.com/es/faq`,
        'x-default': `https://www.manareset.com/en/faq`,
      },
    }
  };
}

const faqs = [
  {
    question: 'Is it safe?',
    answer:
      'Yes. Your safety is the foundation of everything we do. Mana Reset is designed exclusively for solo female travelers. Your practitioner is a certified wellness professional. Sessions take place in your hotel room, which remains entirely under your control. You set the boundaries, you control the space, and you can end the session at any time — no questions asked. Many clients share that feeling genuinely safe was the most unexpected and meaningful part of the experience.',
  },
  {
    question: 'What exactly happens during a session?',
    answer:
      'Every session begins with a brief grounding conversation to understand where you are — physically, emotionally, and energetically. From there, the session moves through breathwork, somatic presence, light acupressure, and energy clearing depending on your package and what feels right in the moment. There is no fixed script. The session is attuned to you. Nothing is done without your consent, and you are always invited — never pushed.',
  },
  {
    question: 'Do I need to provide anything?',
    answer:
      'No. Your practitioner arrives with everything needed. All you need is a comfortable space in your room — a cleared area of floor or your bed — and yourself. Loose, comfortable clothing is recommended. You do not need to prepare, perform, or arrive in any particular state. Come exactly as you are.',
  },
  {
    question: 'Will this violate hotel policies?',
    answer:
      'No. Mana Reset operates as a personal wellness visit — the same category as having a friend visit your room. We do not use hotel spa facilities, carry commercial equipment, or require any disclosure to hotel staff. Our practitioners arrive discreetly. We have served clients across all major Honolulu and Waikiki hotels without incident.',
  },
  {
    question: 'What are the session lengths and prices?',
    answer:
      'We offer four experiences: The Unwind (60 minutes, $320) — a focused reset for tension and immediate relief. The Balance (90 minutes, $460) — our most popular session, combining breathwork, somatic presence, and energy clearing. The Awakening (120 minutes, $600) — a deep, unhurried immersion for those who want to arrive fully. VIP Custom Retreat (from $1,500) — a bespoke half-day or full-day experience designed exclusively around you.',
  },
  {
    question: 'How do I book?',
    answer:
      'Visit our booking page and select your preferred session, date, and time. You will receive a confirmation within a few hours. For the VIP Custom Retreat or any special requests, use the inquiry form and your practitioner will respond personally within 24 hours. We recommend booking at least 48 hours in advance, though same-day availability occasionally exists.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Cancellations made more than 48 hours before your session receive a full refund. Cancellations within 48 hours incur a 50% charge. No-shows are charged in full. If you need to reschedule, please contact us as early as possible — we will always do our best to accommodate you.',
  },
  {
    question: 'What should I wear?',
    answer:
      'Loose, comfortable clothing works best — linen trousers, a soft t-shirt, or a hotel robe. You will not be asked to remove clothing. The session adapts to you, not the other way around.',
  },
  {
    question: 'What is the Five Elements approach?',
    answer:
      'The Five Elements framework comes from Traditional Chinese Medicine and maps the body, emotions, and energy through five archetypes: Wood (growth and direction), Fire (passion and joy), Earth (stability and nourishment), Metal (clarity and what we release), and Water (depth and rest). Your session is oriented around whichever elements are most depleted — not a fixed sequence, but a precise response to where you actually are.',
  },
  {
    question: 'Do I need to believe in energy work?',
    answer:
      'No. Skepticism is welcome. The breathwork and somatic elements produce measurable, felt results regardless of belief. Many clients who arrive uncertain leave with something they cannot fully explain — but can clearly feel. You only need to bring yourself.',
  },
  {
    question: 'Is this therapy or counseling?',
    answer:
      'No. Mana Reset is a wellness service, not a therapeutic or clinical one. Your practitioner does not provide diagnosis, treatment, or mental health support. If you are navigating a mental health crisis, we encourage you to seek a licensed professional. What we offer is presence, not prescription.',
  },
  {
    question: 'Who is the practitioner?',
    answer:
      'Your practitioner is a certified wellness professional who has chosen to remain anonymous — a deliberate part of the Mana Reset philosophy. She holds certifications in somatic experiencing, Five Elements theory, emotional regulation, and energy clearing. You can read more about this choice on our Guide page.',
  },
  {
    question: 'Which hotels and areas do you serve?',
    answer:
      'We serve solo female travelers staying in hotels across Honolulu, Waikiki, Ala Moana, Kahala, and the Diamond Head corridor. If you are staying outside these areas, please reach out — we accommodate requests on a case-by-case basis.',
  },
  {
    question: 'What results can I expect?',
    answer:
      'Most clients describe feeling noticeably lighter, quieter, and more present by the end of a session. Common experiences include a deep release of physical tension, emotional clarity, and a feeling of being genuinely rested — distinct from simply having slept. We make no medical claims. What we can say is that very few clients leave unchanged.',
  },
  {
    question: 'Can I book a session for a friend?',
    answer:
      'Yes. A Mana Reset session makes a deeply personal and meaningful gift — particularly for a friend traveling alone or in need of something she would never book for herself. You can purchase a session as a gift through our booking page.',
  },
];

import { getDictionary } from '@/i18n/getDictionary';

export default async function FAQPage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq_page.items.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-sand py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/60 uppercase">
              {dict.faq_page.label}
            </span>
            <h1 className="text-5xl font-serif text-ocean">{dict.faq_page.title}</h1>
            <p className="text-lg text-ocean/70 leading-relaxed max-w-xl mx-auto">
              {dict.faq_page.desc}
            </p>
          </div>
          <div className="space-y-6">
            {dict.faq_page.items.map((faq: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-sand">
                <h2 className="font-serif text-ocean text-xl mb-4 leading-snug">{faq.q}</h2>
                <p className="text-gray-600 leading-relaxed text-base">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center space-y-4">
            <p className="text-ocean/70 text-base">{dict.faq_page.still_have_question}</p>
            <a
              href={`/${lang}/booking`}
              className="inline-block bg-ocean text-white px-8 py-4 rounded font-medium hover:bg-ocean/90 transition shadow-sm"
            >
              {dict.faq_page.btn}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
