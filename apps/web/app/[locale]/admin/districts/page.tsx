'use client';
import { motion } from 'framer-motion';
import { Edit2, TrendingUp, Home, Clock } from 'lucide-react';

const districts = [
    { name: 'BKK1', medianRent: 850, listings: 324, avgDays: 6 },
    { name: 'Toul Kork', medianRent: 550, listings: 218, avgDays: 8 },
    { name: 'Daun Penh', medianRent: 700, listings: 156, avgDays: 5 },
    { name: 'Koh Pich', medianRent: 1200, listings: 89, avgDays: 4 },
    { name: 'Toul Tom Poung', medianRent: 450, listings: 185, avgDays: 7 },
    { name: 'Sen Sok', medianRent: 400, listings: 246, avgDays: 9 },
    { name: 'Chamkarmon', medianRent: 750, listings: 134, avgDays: 5 },
    { name: 'Olympic', medianRent: 500, listings: 142, avgDays: 7 },
    { name: '7 Makara', medianRent: 480, listings: 98, avgDays: 8 },
    { name: 'Chbar Ampov', medianRent: 350, listings: 112, avgDays: 10 },
    { name: 'Meanchey', medianRent: 320, listings: 87, avgDays: 11 },
    { name: 'Russei Keo', medianRent: 300, listings: 76, avgDays: 12 },
];

export default function AdminDistricts() {
    return (
        <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>District Management</h1>
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['District', 'Median Rent', 'Active Listings', 'Avg Days to Let', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {districts.map((d, i) => (
                            <motion.tr key={d.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{d.name}</td>
                                <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--color-brand-700)' }}>${d.medianRent}</td>
                                <td className="px-4 py-3 text-sm">{d.listings}</td>
                                <td className="px-4 py-3 text-sm">{d.avgDays} days</td>
                                <td className="px-4 py-3"><button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}><Edit2 className="w-3.5 h-3.5" /></button></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
