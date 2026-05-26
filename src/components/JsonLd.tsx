'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function JsonLd({ lang, dict }: { lang: string; dict: any }) {
  const pathname = usePathname();

  // 1. LocalBusiness Schema (Always injected, but can be augmented)
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mana Reset',
    description: dict.hero?.description || 'Private in-room wellness reset experiences for solo female travelers in Hawaii.',
    url: `https://www.manareset.com${pathname}`,
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
        {
          '@type': 'Offer',
          name: dict.packages?.custom_title || 'Custom Intensive',
          description: dict.packages?.custom_desc || 'Full day private intensive',
          price: '1500',
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

  const schemas: any[] = [localBusinessJsonLd];

  // 2. FAQ Schema (only for FAQ page)
  if (pathname.endsWith('/faq')) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (dict.faq_page?.items || []).map((faq: any) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };
    schemas.push(faqSchema);
  }

  // 3. Article Schema (for guide or solo-hawaii)
  if (pathname.endsWith('/guide') || pathname.endsWith('/solo-hawaii') || pathname.endsWith('/approach')) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pathname.endsWith('/guide') ? (dict.guide_page?.hero_title || 'The Practitioner') :
                pathname.endsWith('/solo-hawaii') ? (dict.solo_page?.title || 'Solo Hawaii Guide') :
                (dict.approach_page?.hero_title || 'Our Approach'),
      image: ['https://www.manareset.com/images/hero.png'],
      author: {
        '@type': 'Organization',
        name: 'Mana Reset',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Mana Reset',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.manareset.com/images/logo.png',
        },
      },
    };
    schemas.push(articleSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
