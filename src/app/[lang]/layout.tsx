import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from '@/i18n/getDictionary';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL('https://manareset.com'),
  title: "Mana Reset | Private Reset Experience in Hawaii",
  description: "A private reset experience for women traveling alone in Hawaii. Feel grounded, relaxed, and not completely alone — without therapy, without pressure.",
  keywords: [
    "hawaii reset trip", "self care vacation hawaii", "women's wellness retreat hawaii", "stress relief retreat hawaii",
    "solo female hawaii safe", "things to do alone in hawaii", "hawaii burnout recovery getaway", "mind body retreat hawaii",
    "private wellness experience hawaii", "personal reset session hawaii", "hawaii relaxation experience", "mental reset vacation hawaii",
    "self care experience honolulu", "quiet retreat hawaii", "inner balance retreat hawaii", "hawaii wellness experience for women",
    "mindful travel hawaii", "healing vacation hawaii", "wellness escape hawaii", "emotional reset experience hawaii",
    "guided relaxation session hawaii", "personal wellness guide hawaii", "feeling overwhelmed on vacation", "how to relax on vacation",
    "solo travel anxiety tips", "how to reset your mind", "burnout recovery travel ideas", "need a break from everything",
    "feeling lost while traveling", "how to slow down life", "personal reset experience", "private reset session",
    "mind body reset experience", "solo reset journey", "guided reset experience", "women's solo self-discovery",
    "finding inner joy on vacation", "empowering solo female travel", "wellness escape for women", "mindful solo retreat",
    "rebalancing solo journey", "female inner harmony", "finding purpose in solitude", "solo spiritual balance",
    "female travelers' peace of mind", "women's self-care vacation", "self-love solo escape", "healing getaway for women",
    "inner renewal travel", "female energy rebalance", "self-exploration retreat", "women's holistic journey",
    "solo empowerment getaway", "mind-body restoration for women", "female wellness transformation", "solo emotional reset",
    "female rejuvenation retreat"
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh': '/zh',
      'ja': '/ja',
      'ko': '/ko',
      'es': '/es',
    },
  },
  openGraph: {
    title: 'Mana Reset | Private Reset Experience in Hawaii',
    description: 'A private reset experience for women traveling alone in Hawaii. Feel grounded, relaxed, and not completely alone — without therapy, without pressure.',
    url: 'https://manareset.com',
    siteName: 'Mana Reset',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Mana Reset — Private Wellness in Hawaii',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mana Reset | Private Reset Experience in Hawaii',
    description: 'A private reset experience for women traveling alone in Hawaii. Feel grounded, relaxed, and not completely alone.',
    images: ['/images/hero.png'],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Mana Reset',
  description: 'Private in-room wellness reset experiences for solo female travelers in Hawaii, using somatic experiencing, breathwork, and Five Elements theory.',
  url: 'https://manareset.com',
  image: 'https://manareset.com/images/hero.png',
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
    name: 'Mana Reset Sessions',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'The Unwind',
        description: '60-minute focused reset for tension and immediate relief',
        price: '320',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'The Balance',
        description: '90-minute session combining breathwork, somatic presence, and energy clearing',
        price: '460',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'The Awakening',
        description: '120-minute deep immersion for those who want to arrive fully',
        price: '600',
        priceCurrency: 'USD',
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = (await params) as { lang: 'en'|'zh'|'ja'|'ko'|'es' };
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#FDFDFD] text-[#333333] pt-24`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
