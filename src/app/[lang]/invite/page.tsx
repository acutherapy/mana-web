import { getDictionary } from '@/i18n/getDictionary';
import InviteContent from './InviteContent';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  if (!dict) return {};
  
  return {
    title: `${dict.invite_page?.title} | Mana Reset`,
    description: dict.invite_page?.subtitle,
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
