import { Suspense } from 'react';
import { getDictionary } from '@/i18n/getDictionary';
import SuccessContent from './SuccessContent';

export default async function BookingSuccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: 'en'|'zh'|'ja'|'ko'|'es' };
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-sand/10 flex flex-col items-center justify-center py-24 px-6">
      <Suspense fallback={<div className="text-ocean animate-pulse">{dict.success?.loading || 'Loading...'}</div>}>
        <SuccessContent dict={dict} lang={lang} />
      </Suspense>
    </main>
  );
}
