import { getDictionary } from '@/i18n/getDictionary';
export const metadata = {
  title: 'Things to Do Alone in Hawaii | The Introvert’s Guide to Oahu',
  description: 'Planning a solo female trip to Hawaii? Discover the most serene, safe, and restorative things to do alone, from hidden beaches to private in-room wellness retreats.',
};

export default async function SoloHawaiiPage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <main className="min-h-screen bg-white py-24 px-6">
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
