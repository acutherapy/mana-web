import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';

// 🔥 全局开关
const ENABLE_LINKS = true;

export default async function Footer({ lang }: { lang: 'en'|'zh'|'ja'|'ko'|'es' }) {
  const dict = await getDictionary(lang);

  // 🔥 通用组件（Link / 占位自动切换）
  const NavItem = ({
    href,
    children,
    external = false,
  }: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
  }) => {
    if (ENABLE_LINKS) {
      // 外链用 <a>，内链用 <Link>
      if (external) {
        return (
          <a href={href} className="hover:underline">
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className="hover:underline">
          {children}
        </Link>
      );
    }

    // 未上线状态（占位）
    return (
      <span className="opacity-40 cursor-not-allowed">
        {children}
      </span>
    );
  };

  return (
    <footer className="bg-sand py-12 text-ocean/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-6">
          <h2 className="font-serif text-2xl text-ocean">
            {dict.footer?.title}
          </h2>
          <p className="text-sm">{dict.footer?.subtitle}</p>

          <div className="flex justify-center gap-6 text-sm underline-offset-4 mb-8">
            <NavItem href={`/${lang}/solo-hawaii`}>
              {dict.footer?.guide}
            </NavItem>

            <NavItem href={`/${lang}/blog/hawaii-reset-trip-burnout-recovery`}>
              {dict.footer?.blog}
            </NavItem>

            <NavItem href={`/${lang}/faq`}>
              {dict.footer?.faq}
            </NavItem>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs opacity-60 pt-8 mt-8 border-t border-ocean/10">
          <p>{dict.footer?.copyright}</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <NavItem href={`/${lang}/privacy-policy`}>
              {dict.footer?.privacy}
            </NavItem>

            <NavItem href={`/${lang}/terms-of-service`}>
              {dict.footer?.terms}
            </NavItem>

            {/* 🔥 sitemap 统一指向 HTML 站点地图 */}
            <NavItem href={`/${lang}/sitemap`}>
              {dict.footer?.sitemap}
            </NavItem>
          </div>
        </div>
      </div>
    </footer>
  );
}
