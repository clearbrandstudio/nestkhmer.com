'use client';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Globe, FileText, Save, BarChart3 } from 'lucide-react';
import { useState } from 'react';

const pages = [
    { path: '/', title: 'NestKhmer — Trusted Rental Platform in Cambodia', description: 'Find your perfect home in Cambodia. Fresh, verified listings with transparent pricing and NestScore-rated agents.', score: 92 },
    { path: '/listings', title: 'Browse Listings — NestKhmer', description: 'Search hundreds of fresh, verified rental properties across Phnom Penh. Filter by district, price, and type.', score: 88 },
    { path: '/districts', title: 'Explore Phnom Penh Districts — NestKhmer', description: 'Discover rental data, median prices, and neighbourhood intelligence for every district in Phnom Penh.', score: 85 },
    { path: '/agents', title: 'Verified Agents — NestKhmer', description: 'Find trusted, NestScore-rated agents in Cambodia. Every agent is accountable through transparent performance metrics.', score: 90 },
    { path: '/blog', title: 'NestKhmer Blog — Market Reports & Guides', description: 'Latest rental market reports, neighbourhood guides, and expert insights for Cambodia real estate.', score: 87 },
    { path: '/about', title: 'About NestKhmer — Our Mission', description: 'Learn about NestKhmer\'s mission to make renting in Cambodia transparent, efficient, and fair.', score: 83 },
];

export default function AdminSEO() {
    const [saved, setSaved] = useState(false);
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>SEO Management</h1>
                <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save All'}</button>
            </div>

            <div className="space-y-4">
                {pages.map((p, i) => (
                    <motion.div key={p.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2"><Globe className="w-4 h-4" style={{ color: 'var(--color-brand-500)' }} /><span className="text-sm font-mono font-medium" style={{ color: 'var(--color-surface-600)' }}>{p.path}</span></div>
                            <div className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" style={{ color: 'var(--color-fresh-500)' }} /><span className="text-xs font-bold" style={{ color: 'var(--color-fresh-600)' }}>{p.score}/100</span></div>
                        </div>
                        <div className="space-y-2">
                            <div><label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-400)' }}>Title Tag</label><input defaultValue={p.title} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                            <div><label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-400)' }}>Meta Description</label><textarea defaultValue={p.description} rows={2} className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
