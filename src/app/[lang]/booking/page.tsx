import { Suspense } from 'react';
import { getDictionary } from '@/i18n/getDictionary';
import BookingForm from './BookingForm';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    keywords: dict.seo_keywords_booking
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
          <BookingForm dict={dict} />
        </Suspense>
      </div>
    </main>
  );
}
