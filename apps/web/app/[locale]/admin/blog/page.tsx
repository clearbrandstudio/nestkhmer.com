'use client';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const posts = [
    { title: 'BKK1 Rental Market Report Q4 2025', category: 'Market Reports', status: 'published', author: 'Admin', date: 'Feb 15, 2026', views: 1245 },
    { title: 'How to Spot a Fake Listing', category: 'Guides', status: 'published', author: 'Admin', date: 'Feb 10, 2026', views: 892 },
    { title: 'Expat Guide: Renting in Phnom Penh', category: 'Guides', status: 'published', author: 'Admin', date: 'Feb 5, 2026', views: 2340 },
    { title: 'Understanding NestScore', category: 'Platform', status: 'published', author: 'Admin', date: 'Jan 28, 2026', views: 567 },
    { title: 'Siem Reap Rental Market Analysis', category: 'Market Reports', status: 'draft', author: 'Admin', date: 'Feb 18, 2026', views: 0 },
];

export default function AdminBlog() {
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Blog Management</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Plus className="w-4 h-4" />New Post</button>
            </div>
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Title', 'Category', 'Status', 'Date', 'Views', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {posts.map((p, i) => (
                            <motion.tr key={p.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{p.title}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{p.category}</span></td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: p.status === 'published' ? 'var(--color-fresh-50)' : 'var(--color-surface-100)', color: p.status === 'published' ? 'var(--color-fresh-600)' : 'var(--color-surface-600)' }}>{p.status}</span></td>
                                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-surface-500)' }}>{p.date}</td>
                                <td className="px-4 py-3 text-sm">{p.views.toLocaleString()}</td>
                                <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}><Edit2 className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}>{p.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button><button className="p-1.5 rounded" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
