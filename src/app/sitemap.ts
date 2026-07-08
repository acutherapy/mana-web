import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manareset.com'
  const locales = ['en', 'zh', 'ja', 'ko', 'es']
  const routes = [
    '', 
    '/approach', 
    '/experience', 
    '/booking', 
    '/faq', 
    '/guide', 
    '/solo-hawaii',
    '/invite',
    '/blog/hawaii-reset-trip-burnout-recovery',
    '/blog/solo-female-hawaii-safe-self-care-vacation',
    '/blog/things-to-do-alone-hawaii-mind-body',
    '/blog/womens-wellness-retreat-hawaii-honolulu',
    '/blog/stress-relief-retreat-hawaii-emotional-release'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  // Add root URL just in case
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })

  return sitemapEntries
}
