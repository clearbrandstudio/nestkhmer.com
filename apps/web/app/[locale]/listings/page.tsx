import ListingsClient from './ListingsClient';

import { db, schema } from '@nestkhmer/shared';
import { desc } from 'drizzle-orm';

export default async function ListingsPage() {
    let dbListings: any[] = [];
    try {
        // 1. Fetch live listings from database
        dbListings = await db.select().from(schema.listings).orderBy(desc(schema.listings.createdAt));
    } catch (e) {
        console.error("Listings fetch error:", e);
    }

    // 2. Map fields to component format
    const parsedListings = dbListings.map((doc) => {
        try {
            const imageUrl = (doc.images && Array.isArray(doc.images) && doc.images.length > 0)
                ? doc.images[0]
                : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop';

            const createdDate = doc.createdAt ? new Date(doc.createdAt) : new Date();
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - createdDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return {
                id: doc.id,
                image: imageUrl,
                title: doc.titleEn || 'Untitled Property',
                district: doc.district || 'Phnom Penh',
                price: doc.priceUsd || 0,
                bedrooms: doc.bedrooms || 2,
                bathrooms: doc.bathrooms || 2,
                size: doc.sizeSqm || 80,
                floor: doc.floor || 1,
                daysOld: isNaN(diffDays) ? 1 : diffDays,
                agentScore: 99,
                lat: doc.lat || 11.5564,
                lng: doc.lng || 104.9282,
                slug: doc.slug,
            };
        } catch (mapErr) {
            return null;
        }
    }).filter(Boolean);

    return <ListingsClient initialListings={parsedListings as any[]} />;
}
