/* ─── Ad Zone Definitions & Mock Inventory ─── */

export type AdZone =
    | 'homepage-hero'
    | 'search-top'
    | 'search-mid'
    | 'listing-sidebar'
    | 'listing-bottom'
    | 'district-sidebar'
    | 'blog-inline'
    | 'blog-detail';

export interface AdDimension {
    width: number;
    height: number;
    label: string;
}

export interface Ad {
    id: string;
    zone: AdZone;
    advertiser: string;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    cta: string;
}

/* ─── IAB Standard Dimensions ─── */
export const AD_DIMENSIONS: Record<AdZone, AdDimension> = {
    'homepage-hero': { width: 728, height: 90, label: '728×90 • Leaderboard' },
    'search-top': { width: 728, height: 90, label: '728×90 • Leaderboard' },
    'search-mid': { width: 300, height: 250, label: '300×250 • Medium Rectangle' },
    'listing-sidebar': { width: 300, height: 250, label: '300×250 • Medium Rectangle' },
    'listing-bottom': { width: 728, height: 90, label: '728×90 • Leaderboard' },
    'district-sidebar': { width: 160, height: 600, label: '160×600 • Wide Skyscraper' },
    'blog-inline': { width: 300, height: 250, label: '300×250 • Medium Rectangle' },
    'blog-detail': { width: 728, height: 90, label: '728×90 • Leaderboard' },
};

/* ─── Zone Metadata (for advertise page & self-serve) ─── */
export const AD_ZONE_META: Record<AdZone, { name: string; page: string; reach: string; ctr: string; price: string }> = {
    'homepage-hero': { name: 'Homepage Hero Banner', page: 'Homepage', reach: '45K/mo', ctr: '3.2%', price: '$499/mo' },
    'search-top': { name: 'Search Results Top', page: 'Listings', reach: '120K/mo', ctr: '4.5%', price: '$799/mo' },
    'search-mid': { name: 'Search Results Inline', page: 'Listings', reach: '90K/mo', ctr: '3.8%', price: '$599/mo' },
    'listing-sidebar': { name: 'Listing Detail Sidebar', page: 'Listing Detail', reach: '80K/mo', ctr: '3.7%', price: '$599/mo' },
    'listing-bottom': { name: 'Listing Detail Bottom', page: 'Listing Detail', reach: '60K/mo', ctr: '2.4%', price: '$399/mo' },
    'district-sidebar': { name: 'District Sidebar', page: 'District Detail', reach: '30K/mo', ctr: '2.8%', price: '$299/mo' },
    'blog-inline': { name: 'Blog Inline Native', page: 'Blog Index', reach: '15K/mo', ctr: '5.1%', price: '$199/mo' },
    'blog-detail': { name: 'Blog Article Bottom', page: 'Blog Article', reach: '12K/mo', ctr: '4.2%', price: '$149/mo' },
};

/* ─── Mock Ad Inventory ─── */
export const MOCK_ADS: Ad[] = [
    {
        id: 'ad-1',
        zone: 'homepage-hero',
        advertiser: 'Koh Pich Realty',
        title: 'Premium Island Living — Diamond Island',
        description: 'Luxury waterfront apartments from $1,200/mo. Pool, gym, river views.',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=728&h=90&fit=crop',
        linkUrl: 'https://example.com/koh-pich',
        cta: 'View Properties',
    },
    {
        id: 'ad-2',
        zone: 'search-top',
        advertiser: 'ERA Cambodia',
        title: 'New to Phnom Penh? Let ERA Find Your Home',
        description: 'Professional relocation services. 500+ verified listings.',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=728&h=90&fit=crop',
        linkUrl: 'https://example.com/era',
        cta: 'Get Started',
    },
    {
        id: 'ad-3',
        zone: 'search-mid',
        advertiser: 'Pacific Insurance',
        title: 'Tenant Insurance from $12/mo',
        description: 'Protect your belongings. Claims in 24h. Cambodia\'s #1 rated.',
        imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=250&fit=crop',
        linkUrl: 'https://example.com/insurance',
        cta: 'Get Quote',
    },
    {
        id: 'ad-4',
        zone: 'listing-sidebar',
        advertiser: 'CBRE Cambodia',
        title: 'Moving? We Handle Everything',
        description: 'Full relocation packages. Visa, housing & settling-in support.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=250&fit=crop',
        linkUrl: 'https://example.com/cbre',
        cta: 'Learn More',
    },
    {
        id: 'ad-5',
        zone: 'listing-bottom',
        advertiser: 'Urban Village',
        title: 'Boutique Living in BKK1 — Now Leasing',
        description: 'Co-living & private studios. Rooftop pool. Community events.',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=728&h=90&fit=crop',
        linkUrl: 'https://example.com/urban-village',
        cta: 'Book a Tour',
    },
    {
        id: 'ad-6',
        zone: 'district-sidebar',
        advertiser: 'Cellcard',
        title: 'Best SIM for Expats',
        description: 'Unlimited data. No contract. Stay connected in Cambodia.',
        imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=160&h=600&fit=crop',
        linkUrl: 'https://example.com/cellcard',
        cta: 'Get SIM',
    },
    {
        id: 'ad-7',
        zone: 'blog-inline',
        advertiser: 'Grab Cambodia',
        title: 'Get Around Phnom Penh Easily',
        description: 'Download Grab for rides, food delivery & more.',
        imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=250&fit=crop',
        linkUrl: 'https://example.com/grab',
        cta: 'Download App',
    },
    {
        id: 'ad-8',
        zone: 'blog-detail',
        advertiser: 'Wing Bank',
        title: 'Open a Bank Account in 10 Minutes',
        description: 'Cambodia\'s digital bank. Zero fees, instant transfers.',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=728&h=90&fit=crop',
        linkUrl: 'https://example.com/wing',
        cta: 'Open Account',
    },
];

/* ─── Helpers ─── */
export function getAdForZone(zone: AdZone): Ad | undefined {
    return MOCK_ADS.find(ad => ad.zone === zone);
}

export function trackAdImpression(adId: string, zone: AdZone) {
    const key = `nestkhmer_ad_impressions`;
    try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        data[adId] = (data[adId] || 0) + 1;
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`[NestKhmer Ads] Impression: ${adId} in ${zone}`);
    } catch { }
}

export function trackAdClick(adId: string, zone: AdZone) {
    const key = `nestkhmer_ad_clicks`;
    try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        data[adId] = (data[adId] || 0) + 1;
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`[NestKhmer Ads] Click: ${adId} in ${zone}`);
    } catch { }
}
