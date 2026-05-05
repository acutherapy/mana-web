import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';

export default async function Footer({ lang }: { lang: 'en'|'zh'|'ja'|'ko'|'es' }) {
  const dict = await getDictionary(lang);
  return (
    <footer className="bg-sand py-12 text-ocean/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-6">
          <h2 className="font-serif text-2xl text-ocean">{dict.footer?.title}</h2>
          <p className="text-sm">{dict.footer?.subtitle}</p>
          <div className="flex justify-center gap-6 text-sm underline-offset-4 mb-8">
            <Link href={`/${lang}/solo-hawaii`} className="hover:underline">{dict.footer?.guide}</Link>
            <Link href={`/${lang}/blog/hawaii-reset-trip-burnout-recovery`} className="hover:underline">{dict.footer?.blog}</Link>
            <Link href={`/${lang}/faq`} className="hover:underline">{dict.footer?.faq}</Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs opacity-60 pt-8 mt-8 border-t border-ocean/10">
          <p>{dict.footer?.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href={`/${lang}/privacy-policy`} className="hover:underline">Privacy Policy</Link>
            <Link href={`/${lang}/terms-of-service`} className="hover:underline">Terms of Service</Link>
            <a href="/sitemap.xml" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
