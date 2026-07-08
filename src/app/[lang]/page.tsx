import { getDictionary } from '@/i18n/getDictionary';
import FiveElementsTest from '@/components/FiveElementsTest';
import Link from 'next/link';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      "I came to Hawaii running on empty. After The Balance session, I felt like I could actually breathe again — not just physically, but in every way. I didn't know I needed this until I had it.",
    name: 'Sarah M.',
    location: 'New York',
  },
  {
    quote:
      "As a solo traveler, I wasn't sure what to expect. But from the moment she arrived, I felt completely safe. It wasn't therapy, it wasn't a massage — it was something I didn't have a name for, and something I very clearly needed.",
    name: 'Yuki T.',
    location: 'Tokyo',
  },
  {
    quote:
      'I booked The Awakening on a whim. It turned out to be the most meaningful two hours of my entire trip. I left Hawaii feeling like I had actually rested — not just slept.',
    name: 'Amelia R.',
    location: 'London',
  },
  {
    quote:
      'The energy talisman assessment felt surprisingly personal. The full session that followed was even more so. I came back from this trip feeling like myself again.',
    name: 'Cecilia N.',
    location: 'São Paulo',
  },
];


export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const isEn = lang === "en";
  const pageTitle = isEn 
    ? "Private Reset Experience for Solo Women Traveling Alone in Hawaii | Mana Reset"
    : `${dict.hero?.title} | Mana Reset`;
  const pageDesc = dict.seo_prose_home || dict.hero?.description || "Private Reset Experience for Solo Women Traveling Alone in Hawaii | Mana Reset";

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: dict.seo_keywords_home,
    alternates: {
      canonical: `https://www.manareset.com/${lang}`,
      languages: {
        'en': `https://www.manareset.com/en`,
        'zh': `https://www.manareset.com/zh`,
        'ja': `https://www.manareset.com/ja`,
        'ko': `https://www.manareset.com/ko`,
        'es': `https://www.manareset.com/es`,
        'x-default': `https://www.manareset.com/en`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.manareset.com/${lang}`,
      images: [
        {
          url: `/api/og?lang=${lang}&title=${encodeURIComponent(dict.hero?.title || "Private Reset Experience in Hawaii")}&ratio=1:1`,
          width: 600,
          height: 600,
          alt: pageTitle,
        },
        {
          url: `/api/og?lang=${lang}&title=${encodeURIComponent(dict.hero?.title || "Private Reset Experience in Hawaii")}`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        }
      ]
    }
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: 'en' | 'zh' | 'ja' | 'ko' | 'es' };
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-48 lg:pb-32 bg-ocean text-center overflow-hidden">

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-sm font-medium tracking-[0.2em] text-sand uppercase">
            {dict.hero?.tagline}
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1]">
            {dict.hero?.title}
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {dict.hero?.description}
          </p>
          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Link
              href={`/${lang}/booking`}
              className="bg-sand text-ocean px-8 py-4 rounded font-medium hover:bg-white transition inline-block shadow-lg w-full sm:w-auto"
            >
              {dict.nav?.book}
            </Link>
            <a
              href="#test"
              className="bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 px-8 py-4 rounded font-medium transition inline-block shadow-lg w-full sm:w-auto"
            >
              {dict.hero?.secondary_cta || "Take Energy Diagnostic (1-Min)"}
            </a>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-ocean">{dict.why?.title}</h2>
          <h3 className="text-xl text-ocean/80">{dict.why?.subtitle}</h3>
          <div className="text-left mt-16 p-8 bg-sand/30 rounded-2xl border border-sand space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>{dict.why?.p1}</p>
            <p>{dict.why?.p2}</p>
            <p className="font-medium text-ocean">{dict.why?.p3}</p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-24 px-6 bg-ocean text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-16 relative z-10">
          <div className="w-full space-y-8 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-sand">{dict.approach?.title}</h2>
            <h3 className="text-xl text-sand/80">{dict.approach?.subtitle}</h3>
            <div className="mt-12 space-y-4 text-white/90 text-lg leading-relaxed">
              <p>{dict.approach?.p1}</p>
              <p>{dict.approach?.p2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="experience" className="py-24 px-6 bg-sand">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-ocean mb-4">{dict.packages?.title}</h2>
          <p className="text-lg text-ocean/80">{dict.packages?.subtitle}</p>
        </div>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
            <h3 className="text-2xl font-serif text-ocean mb-2">{dict.packages?.unwind_title}</h3>
            <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">{dict.packages?.unwind_time} | $320</p>
            <p className="text-gray-600 mb-8 flex-grow">{dict.packages?.unwind_desc}</p>
            <Link href={`/${lang}/booking?package=unwind`} className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">{dict.packages?.unwind_btn}</Link>
          </div>
          <div className="bg-ocean p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform md:-translate-y-4">
            <div className="text-xs tracking-widest text-sand uppercase mb-2">{dict.packages?.balance_badge}</div>
            <h3 className="text-2xl font-serif text-white mb-2">{dict.packages?.balance_title}</h3>
            <p className="text-sm tracking-wider text-sand/80 uppercase mb-6">{dict.packages?.balance_time} | $460</p>
            <p className="text-white/80 mb-8 flex-grow">{dict.packages?.balance_desc}</p>
            <Link href={`/${lang}/booking?package=balance`} className="w-full py-3 bg-sand text-ocean rounded hover:bg-white transition text-center">{dict.packages?.balance_btn}</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
            <h3 className="text-2xl font-serif text-ocean mb-2">{dict.packages?.awakening_title}</h3>
            <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">{dict.packages?.awakening_time} | $600</p>
            <p className="text-gray-600 mb-8 flex-grow">{dict.packages?.awakening_desc}</p>
            <Link href={`/${lang}/booking?package=awakening`} className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">{dict.packages?.awakening_btn}</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12 bg-white border border-ocean/10 p-10 rounded-2xl shadow-sm text-center">
          <h3 className="text-3xl font-serif text-ocean mb-3">{dict.packages?.custom_title || 'VIP Custom Retreat'}</h3>
          <p className="text-sm font-bold tracking-widest text-ocean/60 uppercase mb-5">{dict.packages?.custom_price || 'Starts at $1500'}</p>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">{dict.packages?.custom_desc || 'A fully bespoke half-day or full-day healing immersion designed exclusively for you.'}</p>
          <Link href={`/${lang}/booking?package=custom`} className="inline-block px-12 py-4 bg-ocean text-white rounded font-medium hover:bg-ocean-light transition shadow-md">{dict.packages?.custom_btn || 'Inquire Custom Retreat'}</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              {dict.home_testimonials.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-ocean">{dict.home_testimonials.title}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {dict.home_testimonials.items.map((t: any, index: number) => (
              <div key={index} className="bg-sand/30 border border-sand rounded-2xl p-8 flex flex-col">
                <p className="italic text-gray-700 leading-relaxed flex-grow">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-sand pt-4 mt-6">
                  <p className="font-medium text-ocean text-sm">{t.name}</p>
                  <p className="text-xs text-ocean/60">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Delivery Section */}
      <section id="test" className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <FiveElementsTest dict={dict} lang={lang} />
        </div>
      </section>
    </main>
  );
}
