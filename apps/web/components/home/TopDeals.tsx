'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Flame, Trophy, TrendingDown, Bed, Building } from 'lucide-react';
import { ListingCard } from './ListingCard';

const categories = [
    { id: 'under500', label: 'Under $500', icon: TrendingDown },
    { id: 'under1000', label: 'Under $1,000', icon: TrendingDown },
    { id: 'studio', label: 'Best Studios', icon: Building },
    { id: '1br', label: 'Top 1BR', icon: Bed },
    { id: 'family', label: 'Family Picks', icon: Bed },
];

const deals: Record<string, any[]> = {
    under500: [
        { image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop', title: 'Cozy Flat near Russian Market', district: 'Toul Tom Poung', price: 380, bedrooms: 1, bathrooms: 1, size: 32, floor: 2, daysOld: 1, agentScore: 82, propertyId: 'NK-TTP-2026-0203', rank: 1 },
        { image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop', title: 'Serviced Studio BKK3', district: 'BKK3, Phnom Penh', price: 420, bedrooms: 1, bathrooms: 1, size: 28, floor: 4, daysOld: 2, agentScore: 79, propertyId: 'NK-BKK3-2026-0055', rank: 2 },
        { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Bright Studio near BKK1', district: 'BKK1, Phnom Penh', price: 450, bedrooms: 1, bathrooms: 1, size: 35, floor: 6, daysOld: 0, agentScore: 88, propertyId: 'NK-BKK1-2026-0099', rank: 3 },
        { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop', title: 'Studio near AEON Mall', district: 'Toul Kork', price: 480, bedrooms: 1, bathrooms: 1, size: 30, floor: 3, daysOld: 4, agentScore: 76, propertyId: 'NK-TK-2026-0089', rank: 4 },
    ],
    under1000: [
        { image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', title: 'Spacious 2-Bed in Toul Kork', district: 'Toul Kork', price: 850, bedrooms: 2, bathrooms: 2, size: 78, floor: 5, daysOld: 3, agentScore: 87, propertyId: 'NK-TK-2026-0044', rank: 1 },
        { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop', title: 'Family Apartment BKK2', district: 'BKK2, Phnom Penh', price: 780, bedrooms: 2, bathrooms: 1, size: 65, floor: 7, daysOld: 1, agentScore: 84, propertyId: 'NK-BKK2-2026-0031', rank: 2 },
        { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Modern Studio Mekong View', district: 'BKK1, Phnom Penh', price: 650, bedrooms: 1, bathrooms: 1, size: 45, floor: 12, daysOld: 1, agentScore: 92, propertyId: 'NK-BKK1-2026-0042', rank: 3 },
        { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', title: 'Renovated 1BR Riverside', district: 'Daun Penh', price: 950, bedrooms: 1, bathrooms: 1, size: 52, floor: 9, daysOld: 2, agentScore: 90, propertyId: 'NK-DP-2026-0077', rank: 4 },
    ],
    studio: [
        { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Modern Studio Mekong View', district: 'BKK1, Phnom Penh', price: 650, bedrooms: 1, bathrooms: 1, size: 45, floor: 12, daysOld: 1, agentScore: 92, propertyId: 'NK-BKK1-2026-0042', rank: 1 },
        { image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop', title: 'Serviced Studio BKK3', district: 'BKK3, Phnom Penh', price: 420, bedrooms: 1, bathrooms: 1, size: 28, floor: 4, daysOld: 2, agentScore: 79, propertyId: 'NK-BKK3-2026-0055', rank: 2 },
        { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop', title: 'Studio near AEON Mall', district: 'Toul Kork', price: 480, bedrooms: 1, bathrooms: 1, size: 30, floor: 3, daysOld: 4, agentScore: 76, propertyId: 'NK-TK-2026-0089', rank: 3 },
        { image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop', title: 'Budget Flat Russian Market', district: 'Toul Tom Poung', price: 350, bedrooms: 1, bathrooms: 1, size: 26, floor: 1, daysOld: 6, agentScore: 74, propertyId: 'NK-TTP-2026-0210', rank: 4 },
    ],
    '1br': [
        { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Modern 1BR BKK1 w/ Balcony', district: 'BKK1, Phnom Penh', price: 750, bedrooms: 1, bathrooms: 1, size: 52, floor: 8, daysOld: 0, agentScore: 94, propertyId: 'NK-BKK1-2026-0108', rank: 1 },
        { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', title: 'Renovated 1BR Riverside', district: 'Daun Penh', price: 950, bedrooms: 1, bathrooms: 1, size: 52, floor: 9, daysOld: 2, agentScore: 90, propertyId: 'NK-DP-2026-0077', rank: 2 },
        { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop', title: 'Bright 1BR Toul Kork', district: 'Toul Kork', price: 580, bedrooms: 1, bathrooms: 1, size: 42, floor: 6, daysOld: 3, agentScore: 85, propertyId: 'NK-TK-2026-0102', rank: 3 },
        { image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop', title: '1BR near Russian Market', district: 'Toul Tom Poung', price: 490, bedrooms: 1, bathrooms: 1, size: 38, floor: 3, daysOld: 5, agentScore: 81, propertyId: 'NK-TTP-2026-0215', rank: 4 },
    ],
    family: [
        { image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop', title: 'Garden Villa Sen Sok', district: 'Sen Sok, Phnom Penh', price: 1500, bedrooms: 4, bathrooms: 3, size: 220, floor: 1, daysOld: 5, agentScore: 91, propertyId: 'NK-SS-2026-0012', rank: 1 },
        { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop', title: 'Family Apartment BKK2', district: 'BKK2, Phnom Penh', price: 780, bedrooms: 2, bathrooms: 1, size: 65, floor: 7, daysOld: 1, agentScore: 84, propertyId: 'NK-BKK2-2026-0031', rank: 2 },
        { image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', title: '3BR with Park View', district: 'Toul Kork', price: 1200, bedrooms: 3, bathrooms: 2, size: 105, floor: 10, daysOld: 2, agentScore: 88, propertyId: 'NK-TK-2026-0058', rank: 3 },
        { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', title: 'Penthouse Diamond Island', district: 'Koh Pich', price: 2200, bedrooms: 3, bathrooms: 2, size: 145, floor: 28, daysOld: 0, agentScore: 95, propertyId: 'NK-KP-2026-0067', rank: 4 },
    ],
};

export function TopDeals() {
    const [active, setActive] = useState('under500');
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 md:py-20" style={{ background: 'white' }}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-3"
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-warn-100)' }}>
                        <Flame className="w-4 h-4" style={{ color: 'var(--color-warn-600)' }} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Today&apos;s Top Deals
                    </h2>
                </motion.div>
                <p className="text-sm mb-6" style={{ color: 'var(--color-surface-500)' }}>
                    AI-curated picks updated daily based on price, freshness, and agent quality.
                </p>

                {/* Category toggles */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActive(cat.id)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                                style={{
                                    background: active === cat.id ? 'var(--color-brand-600)' : 'var(--color-surface-100)',
                                    color: active === cat.id ? 'white' : 'var(--color-surface-600)',
                                }}
                            >
                                <Icon className="w-3 h-3" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Scroll container */}
                <div className="relative">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center hidden md:flex"
                        style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    >
                        <ChevronLeft className="w-4 h-4" style={{ color: 'var(--color-surface-600)' }} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center hidden md:flex"
                        style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    >
                        <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-surface-600)' }} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {(deals[active] || []).map((listing, i) => (
                            <motion.div
                                key={listing.propertyId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex-shrink-0 relative"
                                style={{ width: 300, scrollSnapAlign: 'start' }}
                            >
                                {/* Rank badge */}
                                <div
                                    className="absolute -top-2 -left-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                    style={{
                                        background: i === 0 ? 'var(--color-warn-500)' : i === 1 ? 'var(--color-surface-400)' : i === 2 ? '#CD7F32' : 'var(--color-surface-300)',
                                        color: 'white',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    {i === 0 ? <Trophy className="w-3.5 h-3.5" /> : `#${i + 1}`}
                                </div>
                                <ListingCard {...listing} />
                                {/* Property ID */}
                                <div className="mt-1.5 text-center">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-500)' }}>
                                        {listing.propertyId}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
