import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/login', '/history'],
      },
    ],
    sitemap: 'https://oiimtech.com/sitemap.xml',
  }
}
