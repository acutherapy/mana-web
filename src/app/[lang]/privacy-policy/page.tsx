import { getDictionary } from '@/i18n/getDictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'en'|'zh'|'ja'|'ko'|'es' }> }) {
  const { lang } = await params;

  const titles = {
    en: 'Privacy Policy | Mana Reset',
    zh: '隐私政策 | Mana Reset',
    ja: 'プライバシーポリシー | Mana Reset',
    ko: '개인정보처리방침 | Mana Reset',
    es: 'Política de Privacidad | Mana Reset'
  };

  const descriptions = {
    en: 'Read the Privacy Policy of Mana Reset to understand how we protect your information during your private wellness booking.',
    zh: '阅读 Mana Reset 隐私政策，了解我们在您预订和体验私人疗程期间如何保障您的个人隐私安全。',
    ja: 'Mana Reset のプライバシーポリシー。ご予約やセッションの過程で、お客様の個人情報をどのように保護しているかを説明します。',
    ko: 'Mana Reset 개인정보처리방침. 프라이빗 세션 예약 및 진행 과정에서 고객님의 소중한 정보를 안전하게 보호하는 방법을 확인하세요。',
    es: 'Lee la política de privacidad de Mana Reset para comprender cómo protegemos tu información.'
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `https://www.manareset.com/${lang}/privacy-policy`,
      languages: {
        'en': `https://www.manareset.com/en/privacy-policy`,
        'zh': `https://www.manareset.com/zh/privacy-policy`,
        'ja': `https://www.manareset.com/ja/privacy-policy`,
        'ko': `https://www.manareset.com/ko/privacy-policy`,
        'es': `https://www.manareset.com/es/privacy-policy`,
        'x-default': `https://www.manareset.com/en/privacy-policy`,
      },
    }
  };
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: 'en' | 'zh' | 'ja' | 'ko' | 'es' };
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-ocean">{dict.privacy_page?.title}</h1>
          <p className="text-sm text-gray-500">{dict.privacy_page?.last_updated}</p>
        </div>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {dict.privacy_page?.sections?.map((section: any, index: number) => (
            <div key={index} className="space-y-4">
              {section.h2 && <h2 className="text-2xl font-serif text-ocean">{section.h2}</h2>}
              {section.p1 && <p>{section.p1}</p>}
              {section.p2 && <p>{section.p2}</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
