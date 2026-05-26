import { getDictionary } from '@/i18n/getDictionary';
import InviteContent from './InviteContent';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  if (!dict) return {};

  const isEn = lang === "en";
  let imageUrl = "/images/og-invite-en.jpg";
  if (!isEn) {
    const quotes: Record<string, string> = {
      zh: "有些旅程，始于一场意想不到的相遇。",
      ja: "いくつかの旅は、思いがけない出会いから始まります。",
      ko: "어떤 여정은 뜻밖의 만남으로 시작됩니다.",
      es: "Algunos viajes comienzan con un encuentro inesperado."
    };
    const quote = quotes[lang] || "Some journeys begin with a single unexpected encounter.";
    imageUrl = `/api/og?lang=${lang}&title=${encodeURIComponent(quote)}`;
  }
  
  return {
    title: `${dict.invite_page?.title} | Mana Reset`,
    description: dict.invite_page?.subtitle,
    openGraph: {
      title: `${dict.invite_page?.title} | Mana Reset`,
      description: dict.invite_page?.subtitle,
      url: `https://www.manareset.com/${lang}/invite`,
      images: [
        {
          url: imageUrl,
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
      description: dict.invite_page?.subtitle,
      images: [imageUrl],
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
