

import { getDictionary } from '@/i18n/getDictionary';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: 'Mind Body Retreat Hawaii | In-Room Self Care Vacation Packages',
    description: 'Transform your solo trip into a profound self-care vacation in Hawaii. Explore our in-room stress relief retreat packages, focusing on deep emotional balance.',
    keywords: dict.seo_keywords_experience
  };
}

export default async function ExperiencePage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <main className="min-h-screen">
      <noscript dangerouslySetInnerHTML={{ __html: dict.seo_prose_experience }} />
      <section className="py-24 px-6 bg-sand text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-ocean mb-6">The Mana Reset Experiences</h1>
        <p className="text-lg text-ocean/80 max-w-2xl mx-auto">Tailored emotional and physical recalibration, delivered directly to your Honolulu hotel suite.</p>
      </section>

      <section className="py-24 px-6 max-w-5xl mx-auto grid gap-12 md:grid-cols-3">
        {/* The Unwind */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-2xl font-serif text-ocean mb-2">The Unwind</h3>
          <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">60 Minutes</p>
          <p className="text-gray-600 mb-8 flex-grow">For the exhausted traveler. A gentle decompression focusing on nervous system regulation, guided breathwork, and emotional grounding after a long flight or stressful week.</p>
          <button className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">Select Unwind</button>
        </div>

        {/* The Balance */}
        <div className="bg-ocean p-8 rounded-xl shadow-lg border-none flex flex-col transform md:-translate-y-4">
          <div className="text-xs tracking-widest text-sand uppercase mb-2">Most Popular</div>
          <h3 className="text-2xl font-serif text-white mb-2">The Balance</h3>
          <p className="text-sm tracking-wider text-sand/80 uppercase mb-6">90 Minutes</p>
          <p className="text-white/80 mb-8 flex-grow">Our signature reset. A deep dive into emotional release. Combines empathetic dialogue, energy clearing, and tension-release techniques to help you let go of the weight you've been carrying.</p>
          <button className="w-full py-3 bg-sand text-ocean rounded hover:bg-white transition">Select Balance</button>
        </div>

        {/* The Awakening */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-2xl font-serif text-ocean mb-2">The Awakening</h3>
          <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">120 Minutes</p>
          <p className="text-gray-600 mb-8 flex-grow">The ultimate burnout recovery session. A comprehensive mind-body immersion designed to reset your baseline, leaving you feeling profoundly lighter, seen, and deeply rested.</p>
          <button className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">Select Awakening</button>
        </div>
      </section>
    </main>
  );
}
