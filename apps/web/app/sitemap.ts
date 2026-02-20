import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nestkhmer.com';
const LOCALES = ['en', 'km', 'zh'];

// Static pages
const STATIC_PAGES = [
    '',
    '/listings',
    '/agents',
    '/districts',
    '/blog',
    '/about',
    '/contact',
    '/for-agents',
    '/advertise',
    '/auth/login',
    '/auth/register',
];

// Mock dynamic pages — in production, fetch from DB
const LISTING_SLUGS = [
    'modern-studio-with-mekong-view',
    'spacious-2-bed-near-street-308',
    'luxury-apartment-at-the-peak',
    'garden-view-studio',
    'executive-suite-near-aeon',
    'charming-townhouse',
    'riverside-penthouse',
    'toul-kork-family-home',
    'sen-sok-modern-condo',
];

const AGENT_SLUGS = [
    'sophea-chan',
    'david-smith',
    'lin-mei-chen',
    'chanthou-seng',
];

const DISTRICT_SLUGS = [
    'bkk1',
    'toul-kork',
    'sen-sok',
    'chroy-changvar',
    'meanchey',
    'russie',
];

const BLOG_SLUGS = [
    'bkk1-rental-market-q4-2025',
    'guide-to-renting-in-phnom-penh-2026',
    'top-5-family-friendly-districts',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // Static pages
    for (const page of STATIC_PAGES) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'daily' : 'weekly',
                priority: page === '' ? 1 : page === '/listings' ? 0.9 : 0.7,
            });
        }
    }

    // Listings
    for (const slug of LISTING_SLUGS) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}/listings/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.8,
            });
        }
    }

    // Agents
    for (const slug of AGENT_SLUGS) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}/agents/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            });
        }
    }

    // Districts
    for (const slug of DISTRICT_SLUGS) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}/districts/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        }
    }

    // Blog
    for (const slug of BLOG_SLUGS) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            });
        }
    }

    return entries;
}
