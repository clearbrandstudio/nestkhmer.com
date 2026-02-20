'use client';
import { motion } from 'framer-motion';
import { Home, Users, TrendingUp, AlertTriangle, Eye, DollarSign, ArrowUp, ArrowDown, Building2, Megaphone } from 'lucide-react';

const stats = [
    { icon: Home, label: 'Total Listings', val: '2,412', change: '+34', up: true, color: 'var(--color-brand-600)' },
    { icon: Users, label: 'Active Agents', val: '341', change: '+8', up: true, color: 'var(--color-fresh-600)' },
    { icon: Eye, label: 'Daily Pageviews', val: '8,245', change: '+12%', up: true, color: 'var(--color-warn-600)' },
    { icon: DollarSign, label: 'Monthly Revenue', val: '$12,480', change: '+$1,200', up: true, color: 'var(--color-surface-700)' },
    { icon: AlertTriangle, label: 'Expiring Today', val: '18', change: '', up: false, color: 'var(--color-danger-600)' },
    { icon: Megaphone, label: 'Active Campaigns', val: '7', change: '+2', up: true, color: 'var(--color-brand-400)' },
];

const recentActivity = [
    { action: 'New agent registration', detail: 'Lisa Nguyen (CBRE Cambodia)', time: '5 min ago', type: 'agent' },
    { action: 'Listing published', detail: 'Family Villa with Garden — Sen Sok', time: '12 min ago', type: 'listing' },
    { action: 'Lead converted', detail: 'Luxury Penthouse → Sarah Johnson', time: '1 hour ago', type: 'lead' },
    { action: 'Ad campaign started', detail: 'Homepage Hero — Koh Pich Development', time: '2 hours ago', type: 'ad' },
    { action: 'Agent KYC approved', detail: 'David Park verified', time: '3 hours ago', type: 'agent' },
    { action: 'Blog post published', detail: 'BKK1 Rental Market Report Q4', time: '5 hours ago', type: 'blog' },
    { action: 'Listing expired', detail: 'Studio in Daun Penh (14 day limit)', time: '6 hours ago', type: 'listing' },
];

const typeColors: Record<string, string> = { agent: 'var(--color-fresh-500)', listing: 'var(--color-brand-500)', lead: 'var(--color-warn-500)', ad: 'var(--color-danger-500)', blog: 'var(--color-surface-500)' };

export default function AdminDashboard() {
    return (
        <div className="p-6 md:p-8">
            <div className="mb-8"><h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Admin Dashboard</h1><p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Platform overview and recent activity</p></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    return <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}><Icon className="w-4 h-4" style={{ color: s.color }} /></div>
                            {s.change && <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: s.up ? 'var(--color-fresh-600)' : 'var(--color-danger-600)' }}>{s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{s.change}</span>}
                        </div>
                        <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</div>
                        <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div>
                    </motion.div>;
                })}
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Recent Activity</h2>
                <div className="space-y-3">
                    {recentActivity.map((a, i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ background: typeColors[a.type] }} />
                                <div>
                                    <div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{a.action}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{a.detail}</div>
                                </div>
                            </div>
                            <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-surface-400)' }}>{a.time}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
