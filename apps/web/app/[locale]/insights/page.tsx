'use client';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, MapPin, DollarSign, Home, Activity, ArrowUp, ArrowDown, Eye, Clock, Flame } from 'lucide-react';
import { usePathname } from 'next/navigation';

const districtPrices = [
    { district: 'BKK1', avg: 820, change: +3.2, trend: 'up', listings: 342, velocity: '4.2 days' },
    { district: 'Toul Kork', avg: 580, change: +1.8, trend: 'up', listings: 218, velocity: '5.1 days' },
    { district: 'Daun Penh', avg: 950, change: -0.5, trend: 'down', listings: 156, velocity: '6.8 days' },
    { district: 'Koh Pich', avg: 1650, change: +5.1, trend: 'up', listings: 89, velocity: '3.5 days' },
    { district: 'TTP', avg: 420, change: -1.2, trend: 'down', listings: 274, velocity: '3.8 days' },
    { district: 'Sen Sok', avg: 680, change: +2.4, trend: 'up', listings: 167, velocity: '7.2 days' },
    { district: 'BKK2', avg: 620, change: +0.8, trend: 'up', listings: 132, velocity: '5.5 days' },
    { district: 'BKK3', avg: 480, change: +1.1, trend: 'up', listings: 98, velocity: '6.1 days' },
];

const marketPulse = [
    { label: 'Total Active Listings', value: '2,412', change: '+34 this week', up: true },
    { label: 'Avg Rent (All Districts)', value: '$742/mo', change: '+2.1% MoM', up: true },
    { label: 'Median Days to Rent', value: '5.2 days', change: '-0.8 days', up: true },
    { label: 'Rented This Week', value: '187', change: '+12% vs last week', up: true },
];

const hottestListings = [
    { title: 'Modern Studio BKK1', views: 1247, contacts: 89, price: 650, id: 'NK-BKK1-2026-0042' },
    { title: 'Luxury Penthouse Koh Pich', views: 982, contacts: 67, price: 2200, id: 'NK-KP-2026-0067' },
    { title: 'Spacious 2BR Toul Kork', views: 876, contacts: 54, price: 850, id: 'NK-TK-2026-0044' },
    { title: 'Garden Villa Sen Sok', views: 743, contacts: 42, price: 1500, id: 'NK-SS-2026-0012' },
    { title: 'Cozy Flat Russian Market', views: 698, contacts: 38, price: 380, id: 'NK-TTP-2026-0203' },
];

export default function InsightsPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-24">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-50)' }}>
                            <BarChart3 className="w-5 h-5" style={{ color: 'var(--color-brand-600)' }} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Market Insights</h1>
                            <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Real-time Phnom Penh rental market intelligence</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-fresh-500)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Updated Feb 20, 2026 • Data from 2,412 active listings</span>
                    </div>
                </motion.div>

                {/* Market Pulse Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {marketPulse.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{stat.value}</div>
                            <div className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>{stat.label}</div>
                            <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: stat.up ? 'var(--color-fresh-600)' : 'var(--color-danger-600)' }}>
                                {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* District Price Table */}
                <div className="glass-card p-6 mb-10" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-5">
                        <MapPin className="w-5 h-5" style={{ color: 'var(--color-brand-600)' }} />
                        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Median Rent by District</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-surface-100)' }}>
                                    <th className="text-left py-3 px-4 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>District</th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Avg Rent</th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>MoM Change</th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Active Listings</th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Avg Days to Rent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districtPrices.map((d, i) => (
                                    <motion.tr key={d.district} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold" style={{ color: 'var(--color-surface-800)' }}>{d.district}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="text-sm font-bold" style={{ color: 'var(--color-brand-700)' }}>${d.avg}/mo</span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="flex items-center justify-end gap-0.5 text-xs font-semibold" style={{ color: d.trend === 'up' ? 'var(--color-fresh-600)' : 'var(--color-danger-600)' }}>
                                                {d.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                {d.change > 0 ? '+' : ''}{d.change}%
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right"><span className="text-sm" style={{ color: 'var(--color-surface-600)' }}>{d.listings}</span></td>
                                        <td className="py-3 px-4 text-right"><span className="text-sm" style={{ color: 'var(--color-surface-600)' }}>{d.velocity}</span></td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Hottest Listings */}
                    <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="flex items-center gap-2 mb-5">
                            <Flame className="w-5 h-5" style={{ color: 'var(--color-warn-600)' }} />
                            <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Most Viewed This Week</h2>
                        </div>
                        <div className="space-y-3">
                            {hottestListings.map((l, i) => (
                                <div key={l.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold w-5 text-center" style={{ color: i < 3 ? 'var(--color-warn-600)' : 'var(--color-surface-400)' }}>#{i + 1}</span>
                                        <div>
                                            <div className="text-sm font-semibold" style={{ color: 'var(--color-surface-800)' }}>{l.title}</div>
                                            <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--color-surface-400)' }}>
                                                <span className="font-mono">{l.id}</span>
                                                <span>•</span>
                                                <span className="font-semibold" style={{ color: 'var(--color-brand-600)' }}>${l.price}/mo</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--color-surface-700)' }}>
                                            <Eye className="w-3 h-3" />{l.views.toLocaleString()}
                                        </div>
                                        <div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>{l.contacts} contacts</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Intelligence */}
                    <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="flex items-center gap-2 mb-5">
                            <Activity className="w-5 h-5" style={{ color: 'var(--color-fresh-600)' }} />
                            <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Market Intelligence</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl" style={{ background: 'var(--color-brand-50)', border: '1px solid var(--color-brand-100)' }}>
                                <div className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--color-brand-600)' }}>AI Market Pulse</div>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-700)' }}>
                                    Phnom Penh rental market shows continued strength with 34 new listings this week. BKK1 remains the hottest district with avg rents at $820/mo (+3.2% MoM). Koh Pich leads price growth at +5.1%, driven by new luxury developments. Budget seekers are trending towards TTP with rents averaging $420/mo and fast 3.8-day rental velocity.
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--color-brand-100)', color: 'var(--color-brand-700)' }}>AI Generated</span>
                                    <span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>Updated daily at 6:00 AM</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-bold uppercase" style={{ color: 'var(--color-surface-500)' }}>Key Signals</h3>
                                {[
                                    { signal: 'Koh Pich rent velocity fastest in 6 months', type: 'bullish' },
                                    { signal: 'Studio supply increasing in BKK3 (+15 units)', type: 'bearish' },
                                    { signal: 'Expat search volume +18% MoM (Google Trends)', type: 'bullish' },
                                    { signal: '2BR demand outpacing supply in Toul Kork', type: 'bullish' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: s.type === 'bullish' ? 'var(--color-fresh-500)' : 'var(--color-danger-500)' }} />
                                        <span className="text-xs" style={{ color: 'var(--color-surface-600)' }}>{s.signal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
