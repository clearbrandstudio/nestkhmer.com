'use client';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Eye, Ban } from 'lucide-react';

const agents = [
    { name: 'Sophea Chan', agency: 'IPS Cambodia', email: 'sophea@ips.com', score: 96, listings: 24, tier: 'pro', kyc: 'verified', joined: 'Jan 2025' },
    { name: 'David Park', agency: 'ERA Cambodia', email: 'david@era.com', score: 93, listings: 31, tier: 'agency', kyc: 'verified', joined: 'Mar 2025' },
    { name: 'Maly Sokhon', agency: 'Huttons KH', email: 'maly@huttons.com', score: 91, listings: 18, tier: 'pro', kyc: 'verified', joined: 'Feb 2025' },
    { name: 'James Liu', agency: 'Independent', email: 'james@email.com', score: 88, listings: 15, tier: 'free', kyc: 'submitted', joined: 'Apr 2025' },
    { name: 'Lisa Nguyen', agency: 'CBRE Cambodia', email: 'lisa@cbre.com', score: 86, listings: 22, tier: 'pro', kyc: 'pending', joined: 'May 2025' },
    { name: 'Kosal Meng', agency: 'Knight Frank', email: 'kosal@kf.com', score: 85, listings: 19, tier: 'pro', kyc: 'verified', joined: 'Jun 2025' },
];

export default function AdminAgents() {
    return (
        <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Agent Management</h1>
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Agent', 'Score', 'Listings', 'Tier', 'KYC', 'Joined', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {agents.map((a, i) => (
                            <motion.tr key={a.email} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3"><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{a.name}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{a.agency} · {a.email}</div></td>
                                <td className="px-4 py-3"><div className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-500)' }} /><span className="text-sm font-bold">{a.score}</span></div></td>
                                <td className="px-4 py-3 text-sm">{a.listings}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: a.tier === 'agency' ? 'var(--color-brand-50)' : a.tier === 'pro' ? 'var(--color-fresh-50)' : 'var(--color-surface-100)', color: a.tier === 'agency' ? 'var(--color-brand-600)' : a.tier === 'pro' ? 'var(--color-fresh-600)' : 'var(--color-surface-600)' }}>{a.tier}</span></td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: a.kyc === 'verified' ? 'var(--color-fresh-50)' : a.kyc === 'submitted' ? 'var(--color-warn-50)' : 'var(--color-surface-100)', color: a.kyc === 'verified' ? 'var(--color-fresh-600)' : a.kyc === 'submitted' ? 'var(--color-warn-600)' : 'var(--color-surface-600)' }}>{a.kyc}</span></td>
                                <td className="px-4 py-3 text-sm text-gray-500">{a.joined}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button>
                                        {a.kyc === 'submitted' && <button className="p-1.5 rounded" title="Approve KYC" style={{ color: 'var(--color-fresh-500)' }}><CheckCircle className="w-3.5 h-3.5" /></button>}
                                        <button className="p-1.5 rounded" title="Ban" style={{ color: 'var(--color-danger-400)' }}><Ban className="w-3.5 h-3.5" /></button>
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
