import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { DistrictCards } from '@/components/home/DistrictCards';
import { TopAgents } from '@/components/home/TopAgents';
import { WhyNestKhmer } from '@/components/home/WhyNestKhmer';
import { StatsBanner } from '@/components/home/StatsBanner';
import { RecentlyRented } from '@/components/home/RecentlyRented';
import { TopDeals } from '@/components/home/TopDeals';
import { AdSlot } from '@/components/ads/AdSlot';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <div className="section-container py-6">
                <AdSlot zone="homepage-hero" />
            </div>
            <FeaturedListings />
            <RecentlyRented />
            <DistrictCards />
            <TopDeals />
            <WhyNestKhmer />
            <TopAgents />
            <StatsBanner />
        </>
    );
}

