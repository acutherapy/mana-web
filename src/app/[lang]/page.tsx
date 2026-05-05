import { getDictionary } from '@/i18n/getDictionary';
import FiveElementsTest from '@/components/FiveElementsTest';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: 'en'|'zh'|'ja'|'ko'|'es' };
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-48 lg:pb-32 bg-ocean text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Hawaii Wellness Reset" 
            fill 
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
        </div>
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
          <div className="pt-8">
            <Link href={`/${lang}/booking`} className="bg-sand text-ocean px-8 py-4 rounded font-medium hover:bg-white transition inline-block shadow-lg">
              {dict.nav?.book}
            </Link>
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
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 hidden lg:block">
          <Image src="/images/interior.png" alt="Healing Interior" fill className="object-cover mix-blend-luminosity" />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-16 relative z-10">
          <div className="w-full space-y-8 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-sand">{dict.approach?.title}</h2>
            <h3 className="text-xl text-sand/80">{dict.approach?.subtitle}</h3>
            <div className="mt-12 space-y-4 text-white/90 text-lg leading-relaxed">
              <p>{dict.approach?.p1}</p>
              <p>{dict.approach?.p2}</p>
            </div>
          </div>
          <div className="w-full max-w-2xl lg:hidden rounded-2xl overflow-hidden relative aspect-video shadow-2xl">
            <Image src="/images/interior.png" alt="Healing Interior" fill className="object-cover" />
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
          {/* The Unwind */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
            <h3 className="text-2xl font-serif text-ocean mb-2">{dict.packages?.unwind_title}</h3>
            <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">{dict.packages?.unwind_time} | $320</p>
            <p className="text-gray-600 mb-8 flex-grow">{dict.packages?.unwind_desc}</p>
            <Link href={`/${lang}/booking?package=unwind`} className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">{dict.packages?.unwind_btn}</Link>
          </div>
          {/* The Balance */}
          <div className="bg-ocean p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform md:-translate-y-4">
            <div className="text-xs tracking-widest text-sand uppercase mb-2">{dict.packages?.balance_badge}</div>
            <h3 className="text-2xl font-serif text-white mb-2">{dict.packages?.balance_title}</h3>
            <p className="text-sm tracking-wider text-sand/80 uppercase mb-6">{dict.packages?.balance_time} | $460</p>
            <p className="text-white/80 mb-8 flex-grow">{dict.packages?.balance_desc}</p>
            <Link href={`/${lang}/booking?package=balance`} className="w-full py-3 bg-sand text-ocean rounded hover:bg-white transition text-center">{dict.packages?.balance_btn}</Link>
          </div>
          {/* The Awakening */}
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
            <h3 className="text-2xl font-serif text-ocean mb-2">{dict.packages?.awakening_title}</h3>
            <p className="text-sm tracking-wider text-ocean/60 uppercase mb-6">{dict.packages?.awakening_time} | $600</p>
            <p className="text-gray-600 mb-8 flex-grow">{dict.packages?.awakening_desc}</p>
            <Link href={`/${lang}/booking?package=awakening`} className="w-full py-3 border border-ocean text-ocean rounded hover:bg-ocean hover:text-white transition">{dict.packages?.awakening_btn}</Link>
          </div>
        </div>
        
        {/* Custom Service */}
        <div className="max-w-4xl mx-auto mt-12 bg-white border border-ocean/10 p-10 rounded-2xl shadow-sm text-center">
          <h3 className="text-3xl font-serif text-ocean mb-3">{dict.packages?.custom_title || 'VIP Custom Retreat'}</h3>
          <p className="text-sm font-bold tracking-widest text-ocean/60 uppercase mb-5">{dict.packages?.custom_price || 'Starts at $1500'}</p>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">{dict.packages?.custom_desc || 'A fully bespoke half-day or full-day healing immersion designed exclusively for you.'}</p>
          <Link href={`/${lang}/booking?package=custom`} className="inline-block px-12 py-4 bg-ocean text-white rounded font-medium hover:bg-ocean-light transition shadow-md">{dict.packages?.custom_btn || 'Inquire Custom Retreat'}</Link>
        </div>
      </section>

      {/* Digital Delivery Section */}
      <section id="test" className="py-24 px-6 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <FiveElementsTest dict={dict} />
        </div>
      </section>

    </main>
  );
}
