import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { DistrictCards } from '@/components/home/DistrictCards';
import { TopAgents } from '@/components/home/TopAgents';
import { WhyNestKhmer } from '@/components/home/WhyNestKhmer';
import { StatsBanner } from '@/components/home/StatsBanner';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturedListings />
            <DistrictCards />
            <WhyNestKhmer />
            <TopAgents />
            <StatsBanner />
        </>
    );
}
