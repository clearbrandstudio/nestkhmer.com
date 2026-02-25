import ListingsClient from './ListingsClient';

export default async function ListingsPage({ params: { locale } }: { params: { locale: string } }) {
    // Fetch live data securely on the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/listings`, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        cache: 'no-store' // Ensure we get fresh data immediately while dev
    });

    const json = await res.json();
    const strapiListings = json?.data || [];

    // Map Strapi's real fields and fallback to mock data for layout purposes 
    // until you finish building the schema in the Content Manager
    const parsedListings = strapiListings.map((strapiDoc: any) => ({
        id: strapiDoc.documentId || strapiDoc.id,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
        title: strapiDoc.titleEn || 'Untitled Property',
        district: 'Phnom Penh',
        price: strapiDoc.priceUsd || 0,
        bedrooms: 2,
        bathrooms: 2,
        size: 80,
        floor: 1,
        daysOld: 0,
        agentScore: 99,
        lat: 11.5564,
        lng: 104.9282
    }));

    return <ListingsClient initialListings={parsedListings} />;
}
