'use client';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Filter, MoreVertical, Eye, Edit3, Trash2, Globe, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

const mockPages = [
    { id: 1, title: 'BKK1 Neighbourhood Guide', slug: 'bkk1-neighbourhood-guide', type: 'page' as const, status: 'published' as const, locale: 'en', views: 2340, updatedAt: '2026-02-18', author: 'Admin' },
    { id: 2, title: 'Q4 2025 Market Report', slug: 'q4-2025-market-report', type: 'post' as const, status: 'published' as const, locale: 'en', views: 1820, updatedAt: '2026-02-15', author: 'Admin' },
    { id: 3, title: 'Expat Rental Guide Cambodia', slug: 'expat-rental-guide', type: 'page' as const, status: 'draft' as const, locale: 'en', views: 0, updatedAt: '2026-02-20', author: 'Admin' },
    { id: 4, title: 'Top 5 Affordable Areas in Phnom Penh', slug: 'top-5-affordable-areas', type: 'post' as const, status: 'published' as const, locale: 'en', views: 3210, updatedAt: '2026-02-10', author: 'Admin' },
    { id: 5, title: 'Visa Requirements for Renters', slug: 'visa-requirements-renters', type: 'page' as const, status: 'draft' as const, locale: 'en', views: 0, updatedAt: '2026-02-19', author: 'Admin' },
    { id: 6, title: 'មគ្គុទ្ទេសក៍ BKK1', slug: 'bkk1-guide-km', type: 'page' as const, status: 'published' as const, locale: 'km', views: 890, updatedAt: '2026-02-17', author: 'Admin' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
    published: { bg: 'var(--color-fresh-50)', text: 'var(--color-fresh-700)' },
    draft: { bg: 'var(--color-warn-50)', text: 'var(--color-warn-700)' },
    archived: { bg: 'var(--color-surface-100)', text: 'var(--color-surface-500)' },
};

export default function AdminPages() {
    const [filter, setFilter] = useState<'all' | 'page' | 'post'>('all');
    const [search, setSearch] = useState('');
    const filtered = mockPages.filter(p => (filter === 'all' || p.type === filter) && p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Pages & Posts</h1>
                    <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Create custom pages, blog posts, and market reports</p>
                </div>
                <a href="editor" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white' }}>
                    <Plus className="w-4 h-4" />New Page
                </a>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--color-surface-100)' }}>
                    {(['all', 'page', 'post'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)} className="px-4 py-2 rounded-lg text-xs font-semibold transition-all capitalize" style={{ background: filter === f ? 'white' : 'transparent', color: filter === f ? 'var(--color-brand-700)' : 'var(--color-surface-500)', boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>
                            {f === 'all' ? 'All' : f === 'page' ? 'Pages' : 'Posts'}
                        </button>
                    ))}
                </div>
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead>
                        <tr style={{ background: 'var(--color-surface-50)' }}>
                            <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Title</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Type</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Status</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Locale</th>
                            <th className="text-right px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Views</th>
                            <th className="text-right px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}>Updated</th>
                            <th className="text-right px-5 py-3 text-xs font-semibold" style={{ color: 'var(--color-surface-500)' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((page, i) => (
                            <motion.tr key={page.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderTop: '1px solid var(--color-surface-100)' }}>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: page.type === 'page' ? 'var(--color-brand-50)' : 'var(--color-fresh-50)' }}>
                                            <FileText className="w-3.5 h-3.5" style={{ color: page.type === 'page' ? 'var(--color-brand-600)' : 'var(--color-fresh-600)' }} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold" style={{ color: 'var(--color-surface-800)' }}>{page.title}</div>
                                            <div className="text-[10px] font-mono" style={{ color: 'var(--color-surface-400)' }}>/{page.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4"><span className="text-xs font-medium capitalize" style={{ color: 'var(--color-surface-600)' }}>{page.type}</span></td>
                                <td className="px-5 py-4"><span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full" style={{ background: statusColors[page.status].bg, color: statusColors[page.status].text }}>{page.status}</span></td>
                                <td className="px-5 py-4"><span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-600)' }}>{page.locale.toUpperCase()}</span></td>
                                <td className="px-5 py-4 text-right"><span className="text-sm font-medium" style={{ color: 'var(--color-surface-700)' }}>{page.views.toLocaleString()}</span></td>
                                <td className="px-5 py-4 text-right"><span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{page.updatedAt}</span></td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button>
                                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-surface-400)' }}><Edit3 className="w-3.5 h-3.5" /></button>
                                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-surface-300)' }} />
                        <p className="text-sm" style={{ color: 'var(--color-surface-400)' }}>No pages found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
