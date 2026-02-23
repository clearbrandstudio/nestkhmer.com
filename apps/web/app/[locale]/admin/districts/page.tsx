'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, TrendingUp, Home, Clock, X } from 'lucide-react';
import { useState } from 'react';

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
    const [editModal, setEditModal] = useState<any | null>(null);
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
                                <td className="px-4 py-3"><button onClick={() => setEditModal(d)} className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }} title="Edit"><Edit2 className="w-3.5 h-3.5" /></button></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-md p-6" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Edit District: {editModal.name}</h2>
                                <button onClick={() => setEditModal(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Median Rent (USD) / month</label>
                                    <input type="number" defaultValue={editModal.medianRent} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Active Listings</label>
                                        <input type="number" defaultValue={editModal.listings} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Avg Days to Let</label>
                                        <input type="number" defaultValue={editModal.avgDays} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center justify-end gap-3" style={{ borderTop: '1px solid var(--color-surface-100)' }}>
                                    <button onClick={() => setEditModal(null)} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'var(--color-surface-600)' }}>Cancel</button>
                                    <button onClick={() => { alert('Saved! (Demo)'); setEditModal(null); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-white" style={{ background: 'var(--color-brand-600)' }}>Save Changes</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
