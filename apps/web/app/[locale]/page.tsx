import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { DistrictCards } from '@/components/home/DistrictCards';
import { TopAgents } from '@/components/home/TopAgents';
import { WhyNestKhmer } from '@/components/home/WhyNestKhmer';
import { StatsBanner } from '@/components/home/StatsBanner';
import { RecentlyRented } from '@/components/home/RecentlyRented';
import { TopDeals } from '@/components/home/TopDeals';
import { AdSlot } from '@/components/ads/AdSlot';

import { db, schema } from '@nestkhmer/shared';
import { desc, eq } from 'drizzle-orm';

export default async function HomePage() {
    // 1. Fetch live data from Drizzle
    const [dbListings, dbAgents, dbDistricts] = await Promise.all([
        db.select().from(schema.listings).orderBy(desc(schema.listings.createdAt)).limit(8),
        db.select({
            id: schema.agents.id,
            agency: schema.agents.agency,
            photoUrl: schema.agents.photoUrl,
            nestScore: schema.agents.nestScore,
            responseRate: schema.agents.responseRate,
            avgResponseTime: schema.agents.avgResponseTime,
            name: schema.users.name,
            avatar: schema.users.avatar,
            image: schema.users.image,
        })
            .from(schema.agents)
            .innerJoin(schema.users, eq(schema.agents.userId, schema.users.id))
            .limit(6),
        db.select().from(schema.districts).limit(6)
    ]);

    // 2. Map Listings
    const mappedListings = dbListings.map((doc) => {
        const imageUrl = doc.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop';
        return {
            image: imageUrl,
            title: doc.titleEn || 'Untitled Property',
            district: doc.district || 'Phnom Penh',
            price: doc.priceUsd || 0,
            bedrooms: doc.bedrooms || 1,
            bathrooms: doc.bathrooms || 1,
            size: doc.sizeSqm || 45,
            floor: doc.floor || 1,
            daysOld: Math.ceil(Math.abs(new Date().getTime() - new Date(doc.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
            agentScore: 92,
            propertyId: doc.slug,
        };
    });

    // 3. Map Agents
    const mappedAgents = dbAgents.map((doc) => {
        const avatarUrl = doc.photoUrl || doc.avatar || doc.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face';
        return {
            name: doc.name || 'Agent',
            agency: doc.agency || 'Independent',
            avatar: avatarUrl,
            nestScore: doc.nestScore || 90,
            responseRate: doc.responseRate || 95,
            avgResponseMin: doc.avgResponseTime || 15,
            activeListings: 10,
            badges: ['verified'],
        };
    });

    // 4. Map Districts
    const mappedDistricts = dbDistricts.map((doc) => {
        return {
            name: doc.nameEn || 'District',
            nameKm: doc.nameKm || '',
            image: doc.heroImageUrl || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=800&fit=crop',
            medianRent: doc.medianRentSqm ? Math.round(doc.medianRentSqm * 60) : 500, // sample calculation
            newThisWeek: doc.listingVolume || 10,
            avgSize: 60,
            slug: doc.slug || 'district',
            height: '400px',
        };
    });

    return (
        <>
            <HeroSection />
            <div className="section-container py-6">
                <AdSlot zone="homepage-hero" />
            </div>
            <FeaturedListings strapiData={mappedListings} />
            <RecentlyRented />
            <DistrictCards strapiData={mappedDistricts} />
            <TopDeals />
            <WhyNestKhmer />
            <TopAgents strapiData={mappedAgents} />
        </>
    );
}

