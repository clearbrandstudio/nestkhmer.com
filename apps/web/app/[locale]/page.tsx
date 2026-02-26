import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { DistrictCards } from '@/components/home/DistrictCards';
import { TopAgents } from '@/components/home/TopAgents';
import { WhyNestKhmer } from '@/components/home/WhyNestKhmer';
import { StatsBanner } from '@/components/home/StatsBanner';
import { RecentlyRented } from '@/components/home/RecentlyRented';
import { TopDeals } from '@/components/home/TopDeals';
import { AdSlot } from '@/components/ads/AdSlot';

async function fetchFromStrapi(endpoint: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`, {
            headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
            cache: 'no-store'
        });
        if (res.ok) {
            const json = await res.json();
            return json?.data || [];
        }
    } catch (e) {
        console.error(`Failed to fetch ${endpoint} from Strapi`, e);
    }
    return [];
}

export default async function HomePage() {
    const [strapiListingsRaw, strapiAgentsRaw, strapiDistrictsRaw] = await Promise.all([
        fetchFromStrapi('listings'),
        fetchFromStrapi('agents'),
        fetchFromStrapi('districts')
    ]);

    const strapiListings = strapiListingsRaw.map((doc: any) => ({
        image: doc.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
        title: doc.titleEn || 'Untitled Property',
        district: doc.district || 'Phnom Penh',
        price: doc.priceUsd || 0,
        bedrooms: doc.bedrooms || 1,
        bathrooms: doc.bathrooms || 1,
        size: doc.sizeSqm || 45,
        floor: doc.floor || 1,
        daysOld: 1,
        agentScore: 92,
        propertyId: doc.slug || `NK-${Math.floor(Math.random() * 10000)}`,
    }));

    const strapiAgents = strapiAgentsRaw.map((doc: any) => ({
        name: doc.name || 'Agent',
        agency: doc.agency || 'Independent',
        avatar: doc.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        nestScore: doc.nestScore || 90,
        responseRate: doc.responseRate || 95,
        avgResponseMin: doc.avgResponseMin || 15,
        activeListings: doc.activeListings || 10,
        badges: doc.badges || ['verified'],
    }));

    const strapiDistricts = strapiDistrictsRaw.map((doc: any) => ({
        name: doc.nameEn || 'District',
        nameKm: doc.nameKm || '',
        image: doc.image || 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=800&fit=crop',
        medianRent: doc.medianRent || 500,
        newThisWeek: doc.newThisWeek || 10,
        avgSize: doc.avgSize || 60,
        slug: doc.slug || 'district',
        height: '400px',
    }));

    return (
        <>
            <HeroSection />
            <div className="section-container py-6">
                <AdSlot zone="homepage-hero" />
            </div>
            <FeaturedListings strapiData={strapiListings} />
            <RecentlyRented />
            <DistrictCards strapiData={strapiDistricts} />
            <TopDeals />
            <WhyNestKhmer />
            <TopAgents strapiData={strapiAgents} />
        </>
    );
}

