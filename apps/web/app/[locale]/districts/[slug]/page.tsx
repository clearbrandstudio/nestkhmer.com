'use client';
import { motion } from 'framer-motion';
import { ListingCard } from '@/components/home/ListingCard';
import { TrendingUp, Home, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { usePathname, useParams } from 'next/navigation';

const districtData: Record<string, any> = {
    bkk1: { name: 'BKK1', nameKm: 'បឹងកេងកង១', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&h=400&fit=crop', medianRent: 850, listings: 324, avgDays: 6, walkability: 92, description: 'The expat heartland of Phnom Penh. BKK1 is the most sought-after neighbourhood — packed with international restaurants, boutique cafes, co-working spaces, and premium apartments. Walking distance to everything.' },
};

const listings = [
    { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Modern Studio with Mekong View', district: 'BKK1, Phnom Penh', price: 650, bedrooms: 1, bathrooms: 1, size: 45, floor: 12, daysOld: 1, agentScore: 92 },
    { image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', title: 'Spacious 2-Bed near Street 308', district: 'BKK1, Phnom Penh', price: 950, bedrooms: 2, bathrooms: 2, size: 78, floor: 5, daysOld: 3, agentScore: 87 },
    { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', title: 'Luxury Apartment at The Peak', district: 'BKK1, Phnom Penh', price: 1800, bedrooms: 3, bathrooms: 2, size: 130, floor: 18, daysOld: 0, agentScore: 95 },
];

export default function DistrictDetailPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const d = districtData.bkk1;
    return (
        <div className="min-h-screen" style={{ background: 'var(--color-surface-50)' }}>
            {/* Hero */}
            <div className="relative h-72 bg-cover bg-center" style={{ backgroundImage: `url(${d.image})` }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.7))' }} />
                <div className="section-container relative z-10 h-full flex flex-col justify-end pb-8 pt-24">
                    <a href={`/${locale}/districts`} className="flex items-center gap-1 text-sm no-underline text-white/70 mb-4"><ChevronLeft className="w-4 h-4" /> All Districts</a>
                    <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{d.name}</h1>
                    <p className="text-white/60">{d.nameKm}</p>
                </div>
            </div>
            <div className="section-container pt-8 pb-24">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[{ icon: TrendingUp, label: 'Median Rent', val: `$${d.medianRent}/mo`, color: 'var(--color-brand-600)' }, { icon: Home, label: 'Active Listings', val: d.listings, color: 'var(--color-fresh-600)' }, { icon: Clock, label: 'Avg Time to Let', val: `${d.avgDays} days`, color: 'var(--color-warn-600)' }, { icon: MapPin, label: 'Walkability', val: `${d.walkability}/100`, color: 'var(--color-surface-700)' }].map(s => {
                        const Icon = s.icon;
                        return <div key={s.label} className="glass-card p-4 text-center" style={{ borderRadius: 'var(--radius-xl)' }}><Icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} /><div className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div></div>;
                    })}
                </div>
                <div className="glass-card p-6 mb-8" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>About {d.name}</h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>{d.description}</p>
                </div>
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Listings in {d.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((l, i) => <motion.div key={l.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><ListingCard {...l} /></motion.div>)}
                </div>
            </div>
        </div>
    );
}
