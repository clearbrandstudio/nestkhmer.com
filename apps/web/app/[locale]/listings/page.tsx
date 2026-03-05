import ListingsClient from './ListingsClient';

import { db, schema } from '@nestkhmer/shared';
import { desc } from 'drizzle-orm';

export default async function ListingsPage() {
    // 1. Fetch live listings from database
    const dbListings = await db.select().from(schema.listings).orderBy(desc(schema.listings.createdAt));

    // 2. Map fields to component format
    const parsedListings = dbListings.map((doc) => {
        const imageUrl = doc.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop';
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
            daysOld: Math.ceil(Math.abs(new Date().getTime() - new Date(doc.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
            agentScore: 99,
            lat: doc.lat || 11.5564,
            lng: doc.lng || 104.9282,
            slug: doc.slug,
        };
    });

    return <ListingsClient initialListings={parsedListings} />;
}
