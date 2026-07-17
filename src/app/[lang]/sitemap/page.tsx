import { getDictionary } from '@/i18n/getDictionary';
import { Compass, BookOpen, ShieldCheck, Globe, ChevronRight } from 'lucide-react';

export default async function SitemapPage({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const s = dict.sitemap_page;

  const mainNavLinks = [
    { name: s.home, href: `/${lang}` },
    { name: s.approach, href: `/${lang}/approach` },
    { name: s.book, href: `/${lang}/booking` },
    { name: s.faq, href: `/${lang}/faq` },
  ];

  const resourceLinks = [
    { name: s.guide, href: `/${lang}/guide` },
    { name: 'Somatic Invitation (Secret Pass)', href: `/${lang}/invite` },
  ];

  const blogLinks = [
    { name: 'Hawaii Reset Trip & Burnout Recovery', href: `/${lang}/blog/hawaii-reset-trip-burnout-recovery` },
    { name: 'Solo Female Hawaii: Safe Self-Care Vacation', href: `/${lang}/blog/solo-female-hawaii-safe-self-care-vacation` },
    { name: 'Things to Do Alone in Hawaii: Mind & Body', href: `/${lang}/blog/things-to-do-alone-hawaii-mind-body` },
    { name: 'Women\'s Wellness Retreat in Hawaii & Honolulu', href: `/${lang}/blog/womens-wellness-retreat-hawaii-honolulu` },
    { name: 'Stress Relief Retreat Hawaii & Emotional Release', href: `/${lang}/blog/stress-relief-retreat-hawaii-emotional-release` },
  ];

  const legalLinks = [
    { name: dict.privacy_page?.title || 'Privacy Policy', href: `/${lang}/privacy-policy` },
    { name: dict.terms_page?.title || 'Terms of Service', href: `/${lang}/terms-of-service` },
    { name: s.xml, href: '/sitemap.xml' },
  ];

  const languageLinks = [
    { name: 'English', href: '/en/sitemap' },
    { name: '简体中文', href: '/zh/sitemap' },
    { name: '日本語', href: '/ja/sitemap' },
    { name: '한국어', href: '/ko/sitemap' },
    { name: 'Español', href: '/es/sitemap' },
  ];

  return (
    <main className="min-h-screen bg-sand/30">
      {/* Premium Hero Banner */}
      <section className="bg-ocean text-sand py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-sand/60 uppercase">
            {s.xml.split('(')[0].trim() || 'Directory'}
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-white">{s.title}</h1>
          <p className="text-lg md:text-xl text-sand/80 leading-relaxed max-w-xl mx-auto font-light">
            {s.desc}
          </p>
        </div>
      </section>

      {/* Grid Container */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Main Navigation */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand/40 hover:shadow-md transition duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-sand/30">
              <Compass className="w-5 h-5 text-ocean" />
              <h2 className="font-serif text-ocean text-xl font-medium">{s.nav}</h2>
            </div>
            <ul className="space-y-4 flex-grow">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between text-ocean/80 hover:text-ocean transition font-medium"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Resources & Guides */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand/40 hover:shadow-md transition duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-sand/30">
              <BookOpen className="w-5 h-5 text-ocean" />
              <h2 className="font-serif text-ocean text-xl font-medium">{s.resources}</h2>
            </div>
            <div className="space-y-6 flex-grow">
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-ocean/50 uppercase mb-3">
                  {s.guide}
                </h3>
                <ul className="space-y-4">
                  {resourceLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center justify-between text-ocean/80 hover:text-ocean transition font-medium"
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xs font-semibold tracking-wider text-ocean/50 uppercase mb-3">
                  {s.blog}
                </h3>
                <ul className="space-y-4">
                  {blogLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center justify-between text-ocean/80 hover:text-ocean transition text-sm leading-snug"
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3: Legal & Languages */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand/40 hover:shadow-md transition duration-300 flex flex-col space-y-8">
            {/* Legal */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-sand/30">
                <ShieldCheck className="w-5 h-5 text-ocean" />
                <h2 className="font-serif text-ocean text-xl font-medium">{s.legal}</h2>
              </div>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group flex items-center justify-between text-ocean/80 hover:text-ocean transition font-medium"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-sand/30">
                <Globe className="w-5 h-5 text-ocean" />
                <h2 className="font-serif text-ocean text-xl font-medium">{s.lang}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {languageLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm px-4 py-2.5 rounded-lg border text-center font-medium transition duration-200 ${
                      link.href.startsWith(`/${lang}`)
                        ? 'bg-ocean text-white border-ocean'
                        : 'bg-sand/10 text-ocean/80 border-sand/80 hover:bg-sand/30'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
