import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';

export default async function Footer({ lang }: { lang: 'en'|'zh'|'ja'|'ko'|'es' }) {
  const dict = await getDictionary(lang);
  return (
    <footer className="bg-sand py-12 text-center text-ocean/80">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="font-serif text-2xl text-ocean">{dict.footer?.title}</h2>
        <p className="text-sm">{dict.footer?.subtitle}</p>
        <div className="flex justify-center gap-6 text-sm underline-offset-4 mb-8">
          <Link href={`/${lang}/solo-hawaii`} className="hover:underline">{dict.footer?.guide}</Link>
          <Link href={`/${lang}/blog/hawaii-reset-trip-burnout-recovery`} className="hover:underline">{dict.footer?.blog}</Link>
          <Link href={`/${lang}/faq`} className="hover:underline">{dict.footer?.faq}</Link>
        </div>
        <p className="text-xs opacity-60">{dict.footer?.copyright}</p>
      </div>
    </footer>
  );
}
