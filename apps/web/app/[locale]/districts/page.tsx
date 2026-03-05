import { db, schema } from '@nestkhmer/shared';
import { desc } from 'drizzle-orm';
import React from 'react';
import { DistrictsClient } from './DistrictsClient';

export default async function DistrictsPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    let dbDistricts: any[] = [];
    try {
        // Fetch districts from Drizzle
        dbDistricts = await db.select().from(schema.districts).orderBy(desc(schema.districts.listingVolume));
    } catch (e) {
        console.error("Districts fetch error:", e);
    }

    const mappedDistricts = dbDistricts.map(d => {
        try {
            return {
                name: d.nameEn || 'Phnom Penh District',
                nameKm: d.nameKm || '',
                image: d.heroImageUrl || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=400&fit=crop',
                medianRent: d.medianRentSqm ? Math.round(d.medianRentSqm * 60) : 500, // Estimate based on 60sqm
                listings: d.listingVolume || 0,
                avgDays: d.avgTimeToLet || 7,
                slug: d.slug,
                popular: (d.listingVolume || 0) > 100
            };
        } catch (mapErr) {
            return null;
        }
    }).filter(Boolean);

    return (
        <div className="min-h-screen pb-32" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <DistrictsClient initialDistricts={mappedDistricts as any[]} locale={locale} />
        </div>
    );
}
