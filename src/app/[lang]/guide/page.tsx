import type { Metadata } from 'next';
import Link from 'next/link';



const credentials = [
  {
    title: 'Somatic Experiencing',
    description:
      'A body-first approach to processing stored stress and trauma. Rather than talking through what happened, somatic work helps the nervous system complete what it started — releasing what the body is still holding.',
  },
  {
    title: 'Five Elements Theory',
    description:
      'A diagnostic framework from Traditional Chinese Medicine that maps emotional and physical patterns to five elemental archetypes. Used to identify what is depleted and orient each session toward real restoration.',
  },
  {
    title: 'Emotional Regulation',
    description:
      'Training in the nervous system dynamics of stress, overwhelm, and shutdown. Not therapy — a practical understanding of how the body moves between states, and how to guide it gently toward settled.',
  },
  {
    title: 'Energy Clearing & Acupressure',
    description:
      'Light intentional touch informed by meridian theory. Specific points, specific intentions, full consent. The physical component of a session that many clients find most surprisingly powerful.',
  },
];

import { getDictionary } from '@/i18n/getDictionary';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: 'Your Guide | Mana Reset — Private Wellness for Solo Female Travelers in Hawaii',
    description: 'The practitioner behind Mana Reset: certified in somatic experiencing, Five Elements theory, emotional regulation, and energy clearing. Anonymous by design. Present by choice.',
    keywords: dict.seo_keywords_guide
  };
}

export default async function GuidePage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <main className="min-h-screen font-sans">
      <noscript dangerouslySetInnerHTML={{ __html: dict.seo_prose_guide }} />
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 bg-ocean text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-sm font-medium tracking-[0.2em] text-sand/70 uppercase">
            {dict.guide_page.hero_label}
          </span>
          <h1 className="text-5xl lg:text-6xl font-serif text-sand leading-tight" dangerouslySetInnerHTML={{ __html: dict.guide_page.hero_title }}></h1>
          <p className="text-sand/30 text-2xl">✦</p>
          <p className="text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto italic font-serif">
            {dict.guide_page.hero_quote}
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              {dict.guide_page.bio_label}
            </span>
            <h2 className="text-4xl font-serif text-ocean">{dict.guide_page.bio_title}</h2>
          </div>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{dict.guide_page.bio_p1}</p>
            <p>{dict.guide_page.bio_p2}</p>
            <p>{dict.guide_page.bio_p3}</p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 px-6 bg-sand/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              {dict.guide_page.train_label}
            </span>
            <h2 className="text-4xl font-serif text-ocean">{dict.guide_page.train_title}</h2>
            <p className="text-ocean/70 text-lg max-w-xl mx-auto">
              {dict.guide_page.train_desc}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {dict.guide_page.creds.map((c: any) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 shadow-sm border border-sand/60">
                <h3 className="text-xl font-serif text-ocean mb-3">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On Anonymity */}
      <section className="py-24 px-6 bg-ocean text-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-sm font-medium tracking-[0.2em] text-sand/70 uppercase">
              {dict.guide_page.anon_label}
            </span>
            <h2 className="text-4xl font-serif text-sand">{dict.guide_page.anon_title}</h2>
          </div>
          <div className="space-y-6 text-white/80 text-lg leading-relaxed">
            <p>{dict.guide_page.anon_p1}</p>
            <p>{dict.guide_page.anon_p2}</p>
            <p>{dict.guide_page.anon_p3}</p>
            <p>{dict.guide_page.anon_p4}</p>
          </div>
          <div className="mt-12 text-center">
            <Link
              href={`/${lang}/booking`}
              className="inline-block bg-sand text-ocean px-10 py-4 rounded font-medium hover:bg-white transition shadow-sm"
            >
              {dict.guide_page.btn}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
