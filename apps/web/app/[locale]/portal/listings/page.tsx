'use client';
import { motion } from 'framer-motion';
import { Plus, Edit2, Eye, Trash2, MoreVertical, Search, Filter } from 'lucide-react';
import { usePathname } from 'next/navigation';

const listings = [
    { id: '1', title: 'Modern Studio with Mekong View', district: 'BKK1', price: 650, status: 'active', views: 142, leads: 8, daysOld: 1, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop' },
    { id: '2', title: 'Spacious 2-Bed in Toul Kork', district: 'Toul Kork', price: 850, status: 'active', views: 98, leads: 5, daysOld: 3, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop' },
    { id: '3', title: 'Luxury Penthouse on Diamond Island', district: 'Koh Pich', price: 2200, status: 'active', views: 234, leads: 12, daysOld: 0, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop' },
    { id: '4', title: 'Cozy Flat near Russian Market', district: 'Toul Tom Poung', price: 450, status: 'expired', views: 67, leads: 3, daysOld: 15, image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=200&h=150&fit=crop' },
    { id: '5', title: 'Family Villa with Garden', district: 'Sen Sok', price: 1500, status: 'draft', views: 0, leads: 0, daysOld: 0, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=150&fit=crop' },
];

export default function PortalListings() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>My Listings</h1>
                <a href={`/${locale}/portal/listings?new=true`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}><Plus className="w-4 h-4" />New Listing</a>
            </div>

            <div className="glass-card p-4 mb-6 flex items-center gap-3" style={{ borderRadius: 'var(--radius-xl)' }}>
                <Search className="w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                <input placeholder="Search your listings..." className="flex-1 bg-transparent border-none outline-none text-sm" style={{ color: 'var(--color-surface-800)' }} />
                <select className="px-3 py-1.5 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                    <option>All Status</option><option>Active</option><option>Draft</option><option>Expired</option>
                </select>
            </div>

            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        <th className="text-left text-xs font-medium px-5 py-3" style={{ color: 'var(--color-surface-500)' }}>Listing</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Price</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Status</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Views</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Leads</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Age</th>
                        <th className="text-right text-xs font-medium px-5 py-3" style={{ color: 'var(--color-surface-500)' }}>Actions</th>
                    </tr></thead>
                    <tbody>
                        {listings.map((l, i) => (
                            <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="transition-colors" style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${l.image})` }} />
                                        <div><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{l.title}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{l.district}</div></div>
                                    </div>
                                </td>
                                <td className="px-3 py-4 text-sm font-semibold" style={{ color: 'var(--color-brand-700)' }}>${l.price}</td>
                                <td className="px-3 py-4">
                                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: l.status === 'active' ? 'var(--color-fresh-50)' : l.status === 'draft' ? 'var(--color-surface-100)' : 'rgba(239,68,68,0.08)', color: l.status === 'active' ? 'var(--color-fresh-600)' : l.status === 'draft' ? 'var(--color-surface-600)' : 'var(--color-danger-600)' }}>{l.status}</span>
                                </td>
                                <td className="px-3 py-4 text-sm" style={{ color: 'var(--color-surface-600)' }}>{l.views}</td>
                                <td className="px-3 py-4 text-sm" style={{ color: 'var(--color-surface-600)' }}>{l.leads}</td>
                                <td className="px-3 py-4 text-sm" style={{ color: l.daysOld > 12 ? 'var(--color-danger-600)' : 'var(--color-surface-600)' }}>{l.daysOld}d</td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-1.5 rounded-lg" title="Edit" style={{ color: 'var(--color-surface-400)' }}><Edit2 className="w-3.5 h-3.5" /></button>
                                        <button className="p-1.5 rounded-lg" title="Preview" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button>
                                        <button className="p-1.5 rounded-lg" title="Delete" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
