import { getDictionary } from '@/i18n/getDictionary';
import InviteContent from './InviteContent';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  if (!dict) return {};

  const isEn = lang === "en";
  
  // Custom evocative primary quotes with newline formatting for perfect typography
  const quotes: Record<string, string> = {
    en: "Some journeys begin\nwith a single unexpected encounter.",
    zh: "有些旅程，\n始于一场意想不到的相遇。",
    ja: "いくつかの旅は、\n思いがけない出会いから始まります。",
    ko: "어떤 여정은\n뜻밖의 만남으로 시작됩니다.",
    es: "Algunos viajes comienzan\ncon un encuentro inesperado."
  };
  const quote = quotes[lang] || quotes.en;

  // High-persuasion, highly evocative, click-worthy metadata descriptions
  const descriptions: Record<string, string> = {
    en: "Give the gift of true restoration. A private, in-room somatic wellness reset for solo female travelers in Hawaii. Guided breathwork, deep somatic release, and energetic recovery.",
    zh: "送给至亲闺蜜的一份重启身心之旅。夏威夷客房内私人躯体疗愈与能量重置，专为女性独旅设计，带来极度宁静与彻底的身心恢复。",
    ja: "大切な人へ、心からの休息を。ハワイの客室に直接届く、女性のひとり旅のためのプライベート・ソマティックウェルネス体験。深い呼吸とエネルギーの回復。",
    ko: "소중한 사람에게 선사하는 진정한 회복. 하와이 객실에서 누리는 여성 1인 여행객을 위한 프라이빗 소마틱 웰니스 리셋. 깊은 호흡과 에너지 치유.",
    es: "Regale una verdadera restauración. Un reinicio de bienestar somático privado en la habitación para mujeres que viajan solas en Hawái. Respiración guiada y recuperación profunda."
  };
  const persuasiveDesc = descriptions[lang] || descriptions.en;

  // WeChat prefers 1:1 ratio square images. Standard platforms prefer 1.91:1 wide images.
  // We provide the WeChat square 1:1 image FIRST in the openGraph array to trigger WeChat share priority.
  const wechatSquareImageUrl = `https://www.manareset.com/api/og?lang=${lang}&title=${encodeURIComponent(quote)}&ratio=1:1`;
  const landscapeImageUrl = isEn 
    ? "https://www.manareset.com/images/og-invite-en.jpg" 
    : `https://www.manareset.com/api/og?lang=${lang}&title=${encodeURIComponent(quote)}`;
  
  return {
    title: `${dict.invite_page?.title} | Mana Reset`,
    description: persuasiveDesc,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/invite`,
      languages: {
        'en': `https://www.manareset.com/en/invite`,
        'zh': `https://www.manareset.com/zh/invite`,
        'ja': `https://www.manareset.com/ja/invite`,
        'ko': `https://www.manareset.com/ko/invite`,
        'es': `https://www.manareset.com/es/invite`,
        'x-default': `https://www.manareset.com/en/invite`,
      },
    },
    openGraph: {
      title: `${dict.invite_page?.title} | Mana Reset`,
      description: persuasiveDesc,
      url: `https://www.manareset.com/${lang}/invite`,
      images: [
        {
          url: wechatSquareImageUrl,
          width: 600,
          height: 600,
          alt: `${dict.invite_page?.title} | Mana Reset`,
        },
        {
          url: landscapeImageUrl,
          width: 1200,
          height: 630,
          alt: `${dict.invite_page?.title} | Mana Reset`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.invite_page?.title} | Mana Reset`,
      description: persuasiveDesc,
      images: [landscapeImageUrl],
    },
  };
}

export default async function InvitePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  if (!dict || !dict.invite_page) {
    notFound();
  }

  return (
    <>
      <style>{`
        #footer-join-us { display: none !important; }
      `}</style>
      <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-4 md:px-6">
        <InviteContent dict={dict} lang={lang} />
      </main>
    </>
  );
}
