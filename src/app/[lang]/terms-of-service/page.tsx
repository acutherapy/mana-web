import { getDictionary } from '@/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `/${lang}/terms-of-service`,
      languages: {
        'en': `https://www.manareset.com/en/terms-of-service`,
        'zh-CN': `https://www.manareset.com/zh/terms-of-service`,
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
