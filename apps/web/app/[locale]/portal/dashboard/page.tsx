'use client';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Home, TrendingUp, Users, Clock, Eye, ArrowUp, ArrowDown, Plus, Bell, BarChart3 } from 'lucide-react';
import { usePathname } from 'next/navigation';

const cards = [
    { icon: Home, label: 'Active Listings', value: '24', change: '+3', up: true, color: 'var(--color-brand-600)' },
    { icon: Users, label: 'New Leads', value: '18', change: '+5', up: true, color: 'var(--color-fresh-600)' },
    { icon: Clock, label: 'Avg Response', value: '12m', change: '-3m', up: true, color: 'var(--color-warn-600)' },
    { icon: Eye, label: 'Profile Views', value: '342', change: '+28', up: true, color: 'var(--color-surface-700)' },
];

const recentLeads = [
    { name: 'Sarah Johnson', listing: 'Modern Studio with Mekong View', time: '5 min ago', status: 'new' },
    { name: 'Michael Chen', listing: 'Spacious 2-Bed in Toul Kork', time: '1 hour ago', status: 'new' },
    { name: 'Emma Williams', listing: 'Luxury Penthouse on Diamond Island', time: '3 hours ago', status: 'replied' },
    { name: 'Tom Baker', listing: 'Cozy Flat near Russian Market', time: '1 day ago', status: 'replied' },
    { name: 'Lisa Park', listing: 'Family Villa with Garden', time: '2 days ago', status: 'converted' },
];

export default function PortalDashboard() {
    const { user } = useAuth();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Welcome back, {user?.name?.split(' ')[0] || 'Agent'}</h1>
                    <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Here&apos;s your performance overview</p>
                </div>
                <a href={`/${locale}/portal/listings?new=true`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                    <Plus className="w-4 h-4" />New Listing
                </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {cards.map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${c.color}12` }}><Icon className="w-4 h-4" style={{ color: c.color }} /></div>
                                <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: c.up ? 'var(--color-fresh-600)' : 'var(--color-danger-600)' }}>
                                    {c.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{c.change}
                                </span>
                            </div>
                            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{c.value}</div>
                            <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{c.label}</div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* NestScore */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Your NestScore</h2>
                    <div className="flex items-center gap-6 mb-4">
                        <div className="relative">
                            <svg viewBox="0 0 120 120" className="w-28 h-28">
                                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-surface-100)" strokeWidth="8" />
                                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-brand-500)" strokeWidth="8" strokeDasharray="314" strokeDashoffset={314 * (1 - 0.92)} strokeLinecap="round" transform="rotate(-90 60 60)" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>92</span>
                            </div>
                        </div>
                        <div className="space-y-2 flex-1">
                            {[{ label: 'Response Rate', val: '98%', pct: 0.98 }, { label: 'Listing Quality', val: '89%', pct: 0.89 }, { label: 'Freshness', val: '94%', pct: 0.94 }, { label: 'Conversion', val: '87%', pct: 0.87 }].map(m => (
                                <div key={m.label}>
                                    <div className="flex justify-between text-xs mb-1"><span style={{ color: 'var(--color-surface-500)' }}>{m.label}</span><span className="font-semibold">{m.val}</span></div>
                                    <div className="h-1.5 rounded-full" style={{ background: 'var(--color-surface-100)' }}><div className="h-full rounded-full" style={{ background: 'var(--color-brand-500)', width: `${m.pct * 100}%` }} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Recent Leads</h2>
                        <a href={`/${locale}/portal/leads`} className="text-xs font-semibold no-underline" style={{ color: 'var(--color-brand-600)' }}>View All</a>
                    </div>
                    <div className="space-y-3">
                        {recentLeads.map(l => (
                            <div key={l.name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                <div>
                                    <div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{l.name}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{l.listing}</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: l.status === 'new' ? 'var(--color-fresh-50)' : l.status === 'replied' ? 'var(--color-brand-50)' : 'var(--color-surface-100)', color: l.status === 'new' ? 'var(--color-fresh-600)' : l.status === 'replied' ? 'var(--color-brand-600)' : 'var(--color-surface-600)' }}>{l.status}</span>
                                    <div className="text-[10px] mt-1" style={{ color: 'var(--color-surface-400)' }}>{l.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
