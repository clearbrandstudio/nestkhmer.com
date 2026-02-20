'use client';
import { motion } from 'framer-motion';
import { Search, Eye, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

const listings = [
    { id: '1', title: 'Modern Studio with Mekong View', agent: 'Sophea Chan', district: 'BKK1', price: 650, status: 'active', score: 92, daysOld: 1 },
    { id: '2', title: 'Spacious 2-Bed in Toul Kork', agent: 'David Park', district: 'Toul Kork', price: 850, status: 'active', score: 87, daysOld: 3 },
    { id: '3', title: 'Luxury Penthouse on Diamond Island', agent: 'Maly Sokhon', district: 'Koh Pich', price: 2200, status: 'pending', score: 95, daysOld: 0 },
    { id: '4', title: 'Cozy Flat near Russian Market', agent: 'James Liu', district: 'TTP', price: 450, status: 'expired', score: 78, daysOld: 15 },
    { id: '5', title: 'Family Villa with Garden', agent: 'Lisa Nguyen', district: 'Sen Sok', price: 1500, status: 'draft', score: 91, daysOld: 0 },
    { id: '6', title: 'Riverside Apartment with Pool', agent: 'Kosal Meng', district: 'Daun Penh', price: 1100, status: 'active', score: 84, daysOld: 12 },
    { id: '7', title: 'Executive Suite near AEON', agent: 'David Park', district: 'Sen Sok', price: 950, status: 'active', score: 89, daysOld: 4 },
];

export default function AdminListings() {
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>All Listings</h1>
                <div className="flex gap-2">
                    {['All', 'Active', 'Pending', 'Expired', 'Draft'].map((f, i) => (
                        <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: i === 0 ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: i === 0 ? 'white' : 'var(--color-surface-600)' }}>{f}</button>
                    ))}
                </div>
            </div>

            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Listing', 'Agent', 'Price', 'Status', 'Score', 'Age', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {listings.map((l, i) => (
                            <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3"><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{l.title}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{l.district}</div></td>
                                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-surface-600)' }}>{l.agent}</td>
                                <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--color-brand-700)' }}>${l.price}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: l.status === 'active' ? 'var(--color-fresh-50)' : l.status === 'pending' ? 'var(--color-warn-50)' : l.status === 'expired' ? 'rgba(239,68,68,0.08)' : 'var(--color-surface-100)', color: l.status === 'active' ? 'var(--color-fresh-600)' : l.status === 'pending' ? 'var(--color-warn-600)' : l.status === 'expired' ? 'var(--color-danger-600)' : 'var(--color-surface-600)' }}>{l.status}</span></td>
                                <td className="px-4 py-3 text-sm font-semibold">{l.score}</td>
                                <td className="px-4 py-3 text-sm" style={{ color: l.daysOld > 12 ? 'var(--color-danger-600)' : 'var(--color-surface-600)' }}>{l.daysOld}d</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <button className="p-1.5 rounded" title="View" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button>
                                        {l.status === 'pending' && <><button className="p-1.5 rounded" title="Approve" style={{ color: 'var(--color-fresh-500)' }}><CheckCircle className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded" title="Reject" style={{ color: 'var(--color-danger-500)' }}><XCircle className="w-3.5 h-3.5" /></button></>}
                                        <button className="p-1.5 rounded" title="Delete" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button>
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
