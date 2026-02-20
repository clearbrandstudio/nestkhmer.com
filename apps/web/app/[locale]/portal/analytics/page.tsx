'use client';
import { motion } from 'framer-motion';
import { Eye, Users, TrendingUp, BarChart3 } from 'lucide-react';

const weeklyViews = [120, 145, 132, 178, 195, 210, 188];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxView = Math.max(...weeklyViews);

const topListings = [
    { title: 'Luxury Penthouse on Diamond Island', views: 234, leads: 12, conversion: '5.1%' },
    { title: 'Modern Studio with Mekong View', views: 142, leads: 8, conversion: '5.6%' },
    { title: 'Spacious 2-Bed in Toul Kork', views: 98, leads: 5, conversion: '5.1%' },
    { title: 'Family Villa with Garden', views: 84, leads: 4, conversion: '4.8%' },
];

export default function PortalAnalytics() {
    return (
        <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Analytics</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[{ icon: Eye, label: 'Total Views', val: '1,168', sub: 'Last 7 days', color: 'var(--color-brand-600)' }, { icon: Users, label: 'Total Leads', val: '29', sub: 'Last 7 days', color: 'var(--color-fresh-600)' }, { icon: TrendingUp, label: 'Conversion Rate', val: '5.2%', sub: 'Views → Leads', color: 'var(--color-warn-600)' }, { icon: BarChart3, label: 'NestScore', val: '92', sub: 'Top 5%', color: 'var(--color-surface-700)' }].map((c, i) => {
                    const Icon = c.icon;
                    return <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <Icon className="w-5 h-5 mb-2" style={{ color: c.color }} />
                        <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{c.val}</div>
                        <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{c.label}</div>
                        <div className="text-[10px] mt-1" style={{ color: 'var(--color-surface-400)' }}>{c.sub}</div>
                    </motion.div>;
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Views Chart */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <h2 className="text-lg font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Weekly Views</h2>
                    <div className="flex items-end justify-between gap-2 h-40">
                        {weeklyViews.map((v, i) => (
                            <div key={days[i]} className="flex-1 flex flex-col items-center gap-1">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${(v / maxView) * 100}%` }} transition={{ delay: i * 0.1, duration: 0.5 }} className="w-full rounded-t-lg" style={{ background: i === weeklyViews.length - 1 ? 'var(--color-brand-500)' : 'var(--color-brand-200)', minHeight: '4px' }} />
                                <span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>{days[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Listings */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Top Performing Listings</h2>
                    <div className="space-y-3">
                        {topListings.map((l, i) => (
                            <div key={l.title} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>#{i + 1}</span>
                                    <span className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{l.title}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <span style={{ color: 'var(--color-surface-400)' }}>{l.views} views</span>
                                    <span style={{ color: 'var(--color-fresh-600)' }}>{l.leads} leads</span>
                                    <span className="font-semibold">{l.conversion}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
