'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ListingCard } from '@/components/home/ListingCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { Search, SlidersHorizontal, MapPin, Grid3X3, List, Map } from 'lucide-react';
import { useState } from 'react';

const allListings = [
    { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Modern Studio with Mekong View', district: 'BKK1, Phnom Penh', price: 650, bedrooms: 1, bathrooms: 1, size: 45, floor: 12, daysOld: 1, agentScore: 92 },
    { image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', title: 'Spacious 2-Bed in Toul Kork', district: 'Toul Kork, Phnom Penh', price: 850, bedrooms: 2, bathrooms: 2, size: 78, floor: 5, daysOld: 3, agentScore: 87 },
    { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', title: 'Luxury Penthouse on Diamond Island', district: 'Koh Pich, Phnom Penh', price: 2200, bedrooms: 3, bathrooms: 2, size: 145, floor: 28, daysOld: 0, agentScore: 95 },
    { image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop', title: 'Cozy Flat near Russian Market', district: 'Toul Tom Poung, Phnom Penh', price: 450, bedrooms: 1, bathrooms: 1, size: 38, floor: 3, daysOld: 8, agentScore: 78 },
    { image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop', title: 'Family Villa with Garden', district: 'Sen Sok, Phnom Penh', price: 1500, bedrooms: 4, bathrooms: 3, size: 220, floor: 1, daysOld: 5, agentScore: 91 },
    { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop', title: 'Riverside Apartment with Pool', district: 'Daun Penh, Phnom Penh', price: 1100, bedrooms: 2, bathrooms: 2, size: 95, floor: 8, daysOld: 12, agentScore: 84 },
    { image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop', title: 'Garden View Studio', district: 'BKK2, Phnom Penh', price: 380, bedrooms: 0, bathrooms: 1, size: 32, floor: 2, daysOld: 2, agentScore: 80 },
    { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop', title: 'Executive Suite near AEON', district: 'Sen Sok, Phnom Penh', price: 950, bedrooms: 2, bathrooms: 2, size: 85, floor: 15, daysOld: 4, agentScore: 89 },
    { image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop', title: 'Charming Townhouse', district: 'Toul Kork, Phnom Penh', price: 1200, bedrooms: 3, bathrooms: 2, size: 140, floor: 1, daysOld: 6, agentScore: 86 },
];

const districtFilters = ['All Districts', 'BKK1', 'BKK2', 'Toul Kork', 'Toul Tom Poung', 'Daun Penh', 'Koh Pich', 'Sen Sok', 'Olympic', '7 Makara'];
const propertyTypes = ['All Types', 'Apartment', 'House', 'Villa', 'Condo', 'Studio'];

export default function ListingsPage() {
    const t = useTranslations('featured');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-32">
                {/* Search Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>
                        Find Your Perfect Home
                    </h1>
                    <p style={{ color: 'var(--color-surface-500)' }}>Browse {allListings.length} fresh listings in Phnom Penh</p>
                </motion.div>

                {/* Search & Filters Bar */}
                <div className="glass-card p-4 mb-8 flex flex-wrap items-center gap-3" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}>
                        <Search className="w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                        <input type="text" placeholder="Search listings..." className="flex-1 bg-transparent border-none outline-none text-sm" style={{ color: 'var(--color-surface-800)' }} />
                    </div>

                    <select className="px-3 py-2.5 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                        {districtFilters.map(d => <option key={d}>{d}</option>)}
                    </select>

                    <select className="px-3 py-2.5 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                        {propertyTypes.map(t => <option key={t}>{t}</option>)}
                    </select>

                    <select className="px-3 py-2.5 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                        <option>Any Price</option><option>$0 - $500</option><option>$500 - $1000</option><option>$1000 - $2000</option><option>$2000+</option>
                    </select>

                    <select className="px-3 py-2.5 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                        <option>Any Bedrooms</option><option>Studio</option><option>1 Bed</option><option>2 Bed</option><option>3+ Bed</option>
                    </select>

                    <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium" style={{ border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-600)' }}>
                        <SlidersHorizontal className="w-4 h-4" /> More
                    </button>

                    <div className="flex items-center gap-1 ml-auto">
                        <button onClick={() => setView('grid')} className="p-2 rounded-lg" style={{ background: view === 'grid' ? 'var(--color-brand-50)' : 'transparent', color: view === 'grid' ? 'var(--color-brand-600)' : 'var(--color-surface-400)' }}><Grid3X3 className="w-4 h-4" /></button>
                        <button onClick={() => setView('list')} className="p-2 rounded-lg" style={{ background: view === 'list' ? 'var(--color-brand-50)' : 'transparent', color: view === 'list' ? 'var(--color-brand-600)' : 'var(--color-surface-400)' }}><List className="w-4 h-4" /></button>
                    </div>
                </div>

                {/* Search Top Ad */}
                <div className="mb-6">
                    <AdSlot zone="search-top" />
                </div>

                {/* Results Grid */}
                <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {allListings.map((listing, i) => (
                        <>
                            <motion.div key={listing.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <ListingCard {...listing} />
                            </motion.div>
                            {/* Inline ad after 3rd listing */}
                            {i === 2 && view === 'grid' && (
                                <motion.div key="search-mid-ad" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center justify-center">
                                    <AdSlot zone="search-mid" />
                                </motion.div>
                            )}
                        </>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-12">
                    {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} className="w-10 h-10 rounded-lg text-sm font-medium" style={{ background: n === 1 ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: n === 1 ? 'white' : 'var(--color-surface-600)' }}>{n}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}
