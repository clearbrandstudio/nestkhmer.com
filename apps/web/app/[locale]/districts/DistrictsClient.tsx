'use client';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Home, ArrowRight, Clock } from 'lucide-react';

export function DistrictsClient({ initialDistricts, locale }: { initialDistricts: any[], locale: string }) {
    const popularDistricts = initialDistricts.filter(d => d.popular);
    const otherDistricts = initialDistricts;

    return (
        <div className="section-container pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Explore Phnom Penh</h1>
                <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>Every neighbourhood tells a story. Discover rental data, trends, and listings for every district.</p>
            </motion.div>

            {/* Popular Districts */}
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Popular Districts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {popularDistricts.map((d, i) => (
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
                {otherDistricts.map((d, i) => (
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
    );
}
