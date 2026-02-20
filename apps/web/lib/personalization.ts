/* ─── Client-Side Personalization Engine ─── */

export interface UserPreferences {
    priceRange: { min: number; max: number; weight: number };
    bedrooms: Record<number, number>; // bedroom count -> weight
    districts: Record<string, number>; // district -> weight
    propertyTypes: Record<string, number>; // type -> weight
    recentSearches: string[];
    lastVisit: number;
    totalVisits: number;
}

const STORAGE_KEY = 'nestkhmer_user_profile';

/* ─── Read / Write Profile ─── */
export function getUserProfile(): UserPreferences {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { }
    return getDefaultProfile();
}

function getDefaultProfile(): UserPreferences {
    return {
        priceRange: { min: 0, max: 5000, weight: 0 },
        bedrooms: {},
        districts: {},
        propertyTypes: {},
        recentSearches: [],
        lastVisit: Date.now(),
        totalVisits: 1,
    };
}

function saveProfile(profile: UserPreferences) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch { }
}

/* ─── Track User Behaviour ─── */
export function trackSearch(query: string, filters?: { minPrice?: number; maxPrice?: number; bedrooms?: number; district?: string }) {
    const profile = getUserProfile();

    // Track search query
    profile.recentSearches = [query, ...profile.recentSearches.filter(s => s !== query)].slice(0, 20);

    // Track price preference
    if (filters?.minPrice || filters?.maxPrice) {
        const w = profile.priceRange.weight + 1;
        profile.priceRange = {
            min: Math.round(((profile.priceRange.min * profile.priceRange.weight) + (filters.minPrice || 0)) / w),
            max: Math.round(((profile.priceRange.max * profile.priceRange.weight) + (filters.maxPrice || 5000)) / w),
            weight: w,
        };
    }

    // Track bedroom preference
    if (filters?.bedrooms) {
        profile.bedrooms[filters.bedrooms] = (profile.bedrooms[filters.bedrooms] || 0) + 1;
    }

    // Track district preference
    if (filters?.district) {
        profile.districts[filters.district] = (profile.districts[filters.district] || 0) + 1;
    }

    saveProfile(profile);
}

export function trackListingView(listing: { price: number; bedrooms: number; district: string; propertyType?: string }) {
    const profile = getUserProfile();

    // Update price range (weighted average towards viewed listing)
    const w = profile.priceRange.weight + 0.5;
    profile.priceRange = {
        min: Math.round(((profile.priceRange.min * profile.priceRange.weight) + listing.price * 0.7) / w),
        max: Math.round(((profile.priceRange.max * profile.priceRange.weight) + listing.price * 1.3) / w),
        weight: w,
    };

    profile.bedrooms[listing.bedrooms] = (profile.bedrooms[listing.bedrooms] || 0) + 0.5;
    profile.districts[listing.district] = (profile.districts[listing.district] || 0) + 1;
    if (listing.propertyType) {
        profile.propertyTypes[listing.propertyType] = (profile.propertyTypes[listing.propertyType] || 0) + 1;
    }

    profile.totalVisits++;
    profile.lastVisit = Date.now();
    saveProfile(profile);
}

export function trackPageVisit() {
    const profile = getUserProfile();
    profile.totalVisits++;
    profile.lastVisit = Date.now();
    saveProfile(profile);
}

/* ─── Scoring ─── */
export function scoreListing(listing: { price: number; bedrooms: number; district: string }, profile: UserPreferences): number {
    let score = 50; // base score

    // Price match (0-30 points)
    if (profile.priceRange.weight > 0) {
        const mid = (profile.priceRange.min + profile.priceRange.max) / 2;
        const range = profile.priceRange.max - profile.priceRange.min || 500;
        const priceDiff = Math.abs(listing.price - mid) / range;
        score += Math.max(0, 30 - priceDiff * 30);
    }

    // Bedroom match (0-20 points)
    const totalBedroomWeight = Object.values(profile.bedrooms).reduce((a, b) => a + b, 0);
    if (totalBedroomWeight > 0 && profile.bedrooms[listing.bedrooms]) {
        score += (profile.bedrooms[listing.bedrooms] / totalBedroomWeight) * 20;
    }

    // District match (0-30 points)
    const totalDistrictWeight = Object.values(profile.districts).reduce((a, b) => a + b, 0);
    if (totalDistrictWeight > 0 && profile.districts[listing.district]) {
        score += (profile.districts[listing.district] / totalDistrictWeight) * 30;
    }

    // Freshness bonus (0-20 points)
    score += 10;

    return Math.min(100, Math.round(score));
}

/* ─── Sort Listings by Relevance ─── */
export function rankListings<T extends { price: number; bedrooms: number; district: string }>(listings: T[]): T[] {
    const profile = getUserProfile();
    if (profile.priceRange.weight < 2 && Object.keys(profile.districts).length === 0) {
        return listings; // not enough data, return original order
    }
    return [...listings].sort((a, b) => scoreListing(b, profile) - scoreListing(a, profile));
}

/* ─── Analytics Summary (for advertiser value) ─── */
export function getUserSegment(): { budget: string; preferredBedrooms: string; topDistrict: string; engagementLevel: string } {
    const profile = getUserProfile();

    const budget = profile.priceRange.weight > 0
        ? `$${profile.priceRange.min}-$${profile.priceRange.max}`
        : 'Unknown';

    const topBedroom = Object.entries(profile.bedrooms).sort((a, b) => b[1] - a[1])[0];
    const preferredBedrooms = topBedroom ? `${topBedroom[0]}BR` : 'Unknown';

    const topDist = Object.entries(profile.districts).sort((a, b) => b[1] - a[1])[0];
    const topDistrict = topDist ? topDist[0] : 'Unknown';

    const engagementLevel = profile.totalVisits > 10 ? 'High' : profile.totalVisits > 3 ? 'Medium' : 'New';

    return { budget, preferredBedrooms, topDistrict, engagementLevel };
}
