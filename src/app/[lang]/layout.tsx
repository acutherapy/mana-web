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
    "hawaii reset trip", "self care vacation hawaii", "women’s wellness retreat hawaii", "stress relief retreat hawaii", 
    "solo female hawaii safe", "things to do alone in hawaii", "hawaii burnout recovery getaway", "mind body retreat hawaii",
    "private wellness experience hawaii", "personal reset session hawaii", "hawaii relaxation experience", "mental reset vacation hawaii",
    "self care experience honolulu", "quiet retreat hawaii", "inner balance retreat hawaii", "hawaii wellness experience for women",
    "mindful travel hawaii", "healing vacation hawaii", "wellness escape hawaii", "emotional reset experience hawaii",
    "guided relaxation session hawaii", "personal wellness guide hawaii", "feeling overwhelmed on vacation", "how to relax on vacation",
    "solo travel anxiety tips", "how to reset your mind", "burnout recovery travel ideas", "need a break from everything",
    "feeling lost while traveling", "how to slow down life", "personal reset experience", "private reset session",
    "mind body reset experience", "solo reset journey", "guided reset experience", "women’s solo self-discovery",
    "finding inner joy on vacation", "empowering solo female travel", "wellness escape for women", "mindful solo retreat",
    "rebalancing solo journey", "female inner harmony", "finding purpose in solitude", "solo spiritual balance",
    "female travelers’ peace of mind", "women’s self-care vacation", "self-love solo escape", "healing getaway for women",
    "inner renewal travel", "female energy rebalance", "self-exploration retreat", "women’s holistic journey",
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
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
