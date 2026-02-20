'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

const recentlyRented = [
    { title: 'Modern Studio BKK1', district: 'BKK1', price: 650, ago: '2h ago', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=120&h=80&fit=crop', id: 'NK-BKK1-2026-0042' },
    { title: 'Luxury 2BR Riverside', district: 'Daun Penh', price: 1200, ago: '4h ago', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=80&fit=crop', id: 'NK-DP-2026-0118' },
    { title: 'Cozy Flat Russian Market', district: 'TTP', price: 380, ago: '5h ago', image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=120&h=80&fit=crop', id: 'NK-TTP-2026-0203' },
    { title: 'Penthouse Diamond Island', district: 'Koh Pich', price: 2500, ago: '7h ago', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=120&h=80&fit=crop', id: 'NK-KP-2026-0067' },
    { title: 'Garden Villa Sen Sok', district: 'Sen Sok', price: 1500, ago: '9h ago', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=120&h=80&fit=crop', id: 'NK-SS-2026-0012' },
    { title: 'Studio near AEON Mall', district: 'Toul Kork', price: 550, ago: '11h ago', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=120&h=80&fit=crop', id: 'NK-TK-2026-0089' },
    { title: 'Family Apartment BKK2', district: 'BKK2', price: 780, ago: '14h ago', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=120&h=80&fit=crop', id: 'NK-BKK2-2026-0031' },
    { title: 'Serviced Studio BKK3', district: 'BKK3', price: 420, ago: '16h ago', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=80&fit=crop', id: 'NK-BKK3-2026-0055' },
];

// Double the items for seamless loop
const items = [...recentlyRented, ...recentlyRented];

export function RecentlyRented() {
    return (
        <section className="py-8 overflow-hidden" style={{ background: 'var(--color-surface-950)' }}>
            <div className="section-container mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-fresh-500)' }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-surface-400)' }}>Recently Rented — Live Activity</span>
                </div>
            </div>

            {/* Marquee */}
            <div className="relative">
                {/* Gradient edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--color-surface-950), transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, var(--color-surface-950), transparent)' }} />

                <motion.div
                    className="flex gap-4"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                    {items.map((item, i) => (
                        <div
                            key={`${item.id}-${i}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0 min-w-[280px]"
                            style={{
                                background: 'var(--color-surface-900)',
                                border: '1px solid var(--color-surface-800)',
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex-shrink-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--color-fresh-500)' }} />
                                    <span className="text-xs font-bold text-white truncate">{item.title}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--color-surface-500)' }}>
                                    <span>{item.district}</span>
                                    <span>•</span>
                                    <span className="font-semibold" style={{ color: 'var(--color-brand-400)' }}>${item.price}/mo</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{item.ago}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
