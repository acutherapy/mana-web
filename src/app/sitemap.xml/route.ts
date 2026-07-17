import { NextResponse } from 'next/server'

export async function GET() {
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

  const now = new Date().toISOString()

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  // 1. Root URL
  xml += `  <url>\n`
  xml += `    <loc>${baseUrl}</loc>\n`
  xml += `    <lastmod>${now}</lastmod>\n`
  xml += `    <changefreq>weekly</changefreq>\n`
  xml += `    <priority>1.0</priority>\n`
  xml += `  </url>\n`

  // 2. Locale-based URLs
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const priority = route === '' ? '1.0' : '0.8'
      xml += `  <url>\n`
      xml += `    <loc>${baseUrl}/${locale}${route}</loc>\n`
      xml += `    <lastmod>${now}</lastmod>\n`
      xml += `    <changefreq>weekly</changefreq>\n`
      xml += `    <priority>${priority}</priority>\n`
      xml += `  </url>\n`
    })
  })

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  })
}
