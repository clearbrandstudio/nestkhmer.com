'use client';

import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Home, ArrowRight, Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';

const districts = [
    { name: 'BKK1', nameKm: 'បឹងកេងកង១', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=400&fit=crop', medianRent: 850, listings: 324, avgDays: 6, slug: 'bkk1', popular: true },
    { name: 'Toul Kork', nameKm: 'ទួលគោក', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', medianRent: 550, listings: 218, avgDays: 8, slug: 'toul-kork', popular: true },
    { name: 'Daun Penh', nameKm: 'ដូនពេញ', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', medianRent: 700, listings: 156, avgDays: 5, slug: 'daun-penh', popular: true },
    { name: 'Koh Pich', nameKm: 'កោះពេជ្រ', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop', medianRent: 1200, listings: 89, avgDays: 4, slug: 'koh-pich', popular: true },
    { name: 'Toul Tom Poung', nameKm: 'ទួលទំពូង', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop', medianRent: 450, listings: 185, avgDays: 7, slug: 'toul-tom-poung', popular: false },
    { name: 'Sen Sok', nameKm: 'សែនសុខ', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop', medianRent: 400, listings: 246, avgDays: 9, slug: 'sen-sok', popular: false },
    { name: 'Chamkarmon', nameKm: 'ចំការមន', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', medianRent: 750, listings: 134, avgDays: 5, slug: 'chamkarmon', popular: false },
    { name: 'Olympic', nameKm: 'អូឡាំពិក', image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop', medianRent: 500, listings: 142, avgDays: 7, slug: 'olympic', popular: false },
    { name: '7 Makara', nameKm: '៧មករា', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', medianRent: 480, listings: 98, avgDays: 8, slug: '7-makara', popular: false },
    { name: 'Chbar Ampov', nameKm: 'ច្បារអំពៅ', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop', medianRent: 350, listings: 112, avgDays: 10, slug: 'chbar-ampov', popular: false },
    { name: 'Meanchey', nameKm: 'មានជ័យ', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', medianRent: 320, listings: 87, avgDays: 11, slug: 'meanchey', popular: false },
    { name: 'Russei Keo', nameKm: 'ឫស្សីកែវ', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop', medianRent: 300, listings: 76, avgDays: 12, slug: 'russei-keo', popular: false },
];

export default function DistrictsPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Explore Phnom Penh</h1>
                    <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>Every neighbourhood tells a story. Discover rental data, trends, and listings for every district.</p>
                </motion.div>

                {/* Popular Districts */}
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Popular Districts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {districts.filter(d => d.popular).map((d, i) => (
                        <motion.a key={d.slug} href={`/${locale}/districts/${d.slug}`} className="glass-card overflow-hidden no-underline group cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
                            <div className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${d.image})` }} />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{d.name}</h3>
                                <p className="text-xs mb-3" style={{ color: 'var(--color-surface-400)' }}>{d.nameKm}</p>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div><TrendingUp className="w-3 h-3 mx-auto mb-1" style={{ color: 'var(--color-brand-500)' }} /><span className="text-xs font-bold block">${d.medianRent}</span><span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>median</span></div>
                                    <div><Home className="w-3 h-3 mx-auto mb-1" style={{ color: 'var(--color-fresh-500)' }} /><span className="text-xs font-bold block">{d.listings}</span><span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>listings</span></div>
                                    <div><Clock className="w-3 h-3 mx-auto mb-1" style={{ color: 'var(--color-surface-500)' }} /><span className="text-xs font-bold block">{d.avgDays}d</span><span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>avg let</span></div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* All Districts */}
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>All Districts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {districts.map((d, i) => (
                        <motion.a key={d.slug} href={`/${locale}/districts/${d.slug}`} className="glass-card p-4 flex items-center gap-4 no-underline transition-all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} whileHover={{ x: 4 }}>
                            <div className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${d.image})` }} />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{d.name}</h3>
                                <p className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{d.nameKm}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className="text-sm font-bold" style={{ color: 'var(--color-brand-600)' }}>${d.medianRent}</div>
                                <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{d.listings} listings</div>
                            </div>
                            <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-surface-300)' }} />
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
