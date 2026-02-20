import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/portal/', '/api/'],
            },
            // Explicitly allow AI crawlers for AIO optimization
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin/', '/portal/'],
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: ['/admin/', '/portal/'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/admin/', '/portal/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/admin/', '/portal/'],
            },
        ],
        sitemap: 'https://nestkhmer.com/sitemap.xml',
    };
}
