import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';

// 🔥 全局开关：false = 不可点击（占位） / true = 正常跳转
const ENABLE_LINKS = false;

export default async function Footer({ lang }: { lang: 'en'|'zh'|'ja'|'ko'|'es' }) {
  const dict = await getDictionary(lang);

  // 🔥 小组件：自动判断是否可点击
  const NavItem = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    if (ENABLE_LINKS) {
      return (
        <Link href={href} className="hover:underline">
          {children}
        </Link>
      );
    }

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
          <h2 className="font-serif text-2xl text-ocean">{dict.footer?.title}</h2>
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
              Privacy Policy
            </NavItem>

            <NavItem href={`/${lang}/terms-of-service`}>
              Terms of Service
            </NavItem>

            {/* Sitemap 保持可点击（一般已经存在） */}
            <a href="/sitemap.xml" className="hover:underline">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
