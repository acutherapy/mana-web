import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from '@/i18n/getDictionary';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: 'en' | 'zh' | 'ja' | 'ko' | 'es' };
  const dict = await getDictionary(lang);

  const isEn = lang === "en";
  const defaultTitle = isEn 
    ? "Mana Reset | Private wellness reset for solo female travelers" 
    : `Mana Reset | ${dict.hero?.title || "Private Reset Experience in Hawaii"}`;
  const defaultDesc = dict.seo_prose_home || dict.hero?.description || "A private reset experience for women traveling alone in Hawaii.";

  return {
    metadataBase: new URL('https://www.manareset.com'),

    verification: {
      google: "7HFkgefWfRS5YihDCP9gHXhjrDN3E83qH-KxXOy6hps",
    },

    title: defaultTitle,
    description: defaultDesc,
    keywords: ["hawaii reset trip", "self care vacation", "women's wellness retreat", "private wellness experience hawaii"],
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      url: `https://www.manareset.com/${lang}`,
      siteName: 'Mana Reset',
      images: [
        {
          url: `https://www.manareset.com/api/og?lang=${lang}&title=${encodeURIComponent(dict.hero?.title || "Private Reset Experience in Hawaii")}&ratio=1:1`,
          width: 600,
          height: 600,
          alt: `Mana Reset | ${dict.hero?.title || "Private Reset Experience in Hawaii"}`,
        },
        {
          url: `https://www.manareset.com/api/og?lang=${lang}&title=${encodeURIComponent(dict.hero?.title || "Private Reset Experience in Hawaii")}`,
          width: 1200,
          height: 630,
          alt: `Mana Reset | ${dict.hero?.title || "Private Reset Experience in Hawaii"}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDesc,
      images: [`https://www.manareset.com/api/og?lang=${lang}&title=${encodeURIComponent(dict.hero?.title || "Private Reset Experience in Hawaii")}`],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = (await params) as { lang: 'en'|'zh'|'ja'|'ko'|'es' };
  const dict = await getDictionary(lang);

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mana Reset',
    description: dict.seo_prose_home || dict.hero?.description || 'Private in-room wellness reset experiences for solo female travelers in Hawaii.',
    url: `https://www.manareset.com/${lang}`,
    image: 'https://www.manareset.com/images/hero.png',
    areaServed: [
      { '@type': 'City', name: 'Honolulu' },
      { '@type': 'City', name: 'Waikiki' },
      { '@type': 'City', name: 'Ala Moana' },
      { '@type': 'City', name: 'Kahala' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Honolulu',
      addressRegion: 'HI',
      addressCountry: 'US',
    },
    priceRange: '$$$',
    openingHours: 'Mo-Su 08:00-20:00',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.packages?.title || 'Mana Reset Sessions',
      itemListElement: [
        {
          '@type': 'Offer',
          name: dict.packages?.unwind_title || 'The Unwind',
          description: dict.packages?.unwind_desc || '60-minute focused reset',
          price: '320',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          name: dict.packages?.balance_title || 'The Balance',
          description: dict.packages?.balance_desc || '90-minute session',
          price: '460',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          name: dict.packages?.awakening_title || 'The Awakening',
          description: dict.packages?.awakening_desc || '120-minute deep immersion',
          price: '600',
          priceCurrency: 'USD',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '18',
    },
  };

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          id="schema-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#FDFDFD] text-[#333333] pt-24`}>
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}