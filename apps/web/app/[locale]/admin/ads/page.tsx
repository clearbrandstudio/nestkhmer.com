'use client';
import { motion } from 'framer-motion';
import { Plus, Eye, BarChart3, Pause, Play } from 'lucide-react';

const campaigns = [
    { name: 'Koh Pich Premium Living', zone: 'Homepage Hero', status: 'active', impressions: 12450, clicks: 398, ctr: '3.2%', spend: '$499', start: 'Feb 1', end: 'Feb 28' },
    { name: 'ERA Cambodia Brand', zone: 'Search Results', status: 'active', impressions: 28300, clicks: 1273, ctr: '4.5%', spend: '$799', start: 'Feb 1', end: 'Mar 15' },
    { name: 'CBRE New Projects', zone: 'District Sidebar', status: 'paused', impressions: 5200, clicks: 145, ctr: '2.8%', spend: '$149', start: 'Jan 15', end: 'Feb 15' },
    { name: 'Expat Insurance', zone: 'Blog Inline', status: 'active', impressions: 3800, clicks: 193, ctr: '5.1%', spend: '$199', start: 'Feb 5', end: 'Mar 5' },
    { name: 'Urban Village BKK1', zone: 'Listing Sidebar', status: 'ended', impressions: 18900, clicks: 699, ctr: '3.7%', spend: '$599', start: 'Jan 1', end: 'Jan 31' },
];

export default function AdminAds() {
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Ad Campaigns</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Plus className="w-4 h-4" />New Campaign</button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                {[{ label: 'Active Campaigns', val: '3' }, { label: 'Total Impressions', val: '68,650' }, { label: 'Total Clicks', val: '2,508' }, { label: 'Revenue This Month', val: '$2,245' }].map(s => (
                    <div key={s.label} className="glass-card p-4" style={{ borderRadius: 'var(--radius-xl)' }}><div className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div></div>
                ))}
            </div>

            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Campaign', 'Zone', 'Status', 'Impressions', 'Clicks', 'CTR', 'Spend', 'Period', ''].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {campaigns.map((c, i) => (
                            <motion.tr key={c.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{c.name}</td>
                                <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-surface-500)' }}>{c.zone}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: c.status === 'active' ? 'var(--color-fresh-50)' : c.status === 'paused' ? 'var(--color-warn-50)' : 'var(--color-surface-100)', color: c.status === 'active' ? 'var(--color-fresh-600)' : c.status === 'paused' ? 'var(--color-warn-600)' : 'var(--color-surface-600)' }}>{c.status}</span></td>
                                <td className="px-4 py-3 text-sm">{c.impressions.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm">{c.clicks.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--color-fresh-600)' }}>{c.ctr}</td>
                                <td className="px-4 py-3 text-sm font-semibold">{c.spend}</td>
                                <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-surface-400)' }}>{c.start} – {c.end}</td>
                                <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}><BarChart3 className="w-3.5 h-3.5" /></button>{c.status !== 'ended' && <button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}>{c.status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}</button>}</div></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
