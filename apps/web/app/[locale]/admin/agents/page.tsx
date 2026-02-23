'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, XCircle, Eye, Ban, X, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

const agents = [
    { name: 'Sophea Chan', agency: 'IPS Cambodia', email: 'sophea@ips.com', score: 96, listings: 24, tier: 'pro', kyc: 'verified', joined: 'Jan 2025' },
    { name: 'David Park', agency: 'ERA Cambodia', email: 'david@era.com', score: 93, listings: 31, tier: 'agency', kyc: 'verified', joined: 'Mar 2025' },
    { name: 'Maly Sokhon', agency: 'Huttons KH', email: 'maly@huttons.com', score: 91, listings: 18, tier: 'pro', kyc: 'verified', joined: 'Feb 2025' },
    { name: 'James Liu', agency: 'Independent', email: 'james@email.com', score: 88, listings: 15, tier: 'free', kyc: 'submitted', joined: 'Apr 2025' },
    { name: 'Lisa Nguyen', agency: 'CBRE Cambodia', email: 'lisa@cbre.com', score: 86, listings: 22, tier: 'pro', kyc: 'pending', joined: 'May 2025' },
    { name: 'Kosal Meng', agency: 'Knight Frank', email: 'kosal@kf.com', score: 85, listings: 19, tier: 'pro', kyc: 'verified', joined: 'Jun 2025' },
];

export default function AdminAgents() {
    const [actionModal, setActionModal] = useState<{ type: 'view' | 'approve' | 'ban', agent?: any } | null>(null);
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
                                        <button onClick={() => setActionModal({ type: 'view', agent: a })} className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }} title="View Details"><Eye className="w-3.5 h-3.5" /></button>
                                        {a.kyc === 'submitted' && <button onClick={() => setActionModal({ type: 'approve', agent: a })} className="p-1.5 rounded hover:bg-green-50" title="Approve KYC" style={{ color: 'var(--color-fresh-500)' }}><CheckCircle className="w-3.5 h-3.5" /></button>}
                                        <button onClick={() => setActionModal({ type: 'ban', agent: a })} className="p-1.5 rounded hover:bg-red-50" title="Ban" style={{ color: 'var(--color-danger-400)' }}><Ban className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Modals */}
            <AnimatePresence>
                {actionModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`glass-card w-full p-6 ${actionModal.type === 'view' ? 'max-w-2xl' : 'max-w-md'}`} style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            {actionModal.type === 'view' ? (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Agent Details</h2>
                                        <button onClick={() => setActionModal(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                                    </div>
                                    <div className="flex gap-6 mb-6">
                                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-sm" style={{ background: 'linear-gradient(135deg, var(--color-brand-500), var(--color-brand-700))' }}>
                                            {actionModal.agent?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">{actionModal.agent?.name}</h3>
                                            <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-surface-500)' }}>
                                                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> agent@email.com</span>
                                                <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> +855 12 345 678</span>
                                            </div>
                                            <div className="mt-3 flex gap-2">
                                                <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize bg-purple-50 text-purple-700">{actionModal.agent?.tier} Agent</span>
                                                <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize bg-blue-50 text-blue-700">Score: {actionModal.agent?.score}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                            <div className="text-sm text-gray-500 mb-1">Active Listings</div>
                                            <div className="text-xl font-bold">{actionModal.agent?.listings} properties</div>
                                        </div>
                                        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                            <div className="text-sm text-gray-500 mb-1">KYC Status</div>
                                            <div className="text-xl font-bold capitalize" style={{ color: actionModal.agent?.kyc === 'approved' ? 'var(--color-fresh-600)' : 'var(--color-warn-600)' }}>{actionModal.agent?.kyc}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: actionModal.type === 'ban' ? 'rgba(239,68,68,0.1)' : 'var(--color-fresh-50)' }}>
                                        {actionModal.type === 'ban' ? <Ban className="w-6 h-6 text-red-500" /> : <CheckCircle className="w-6 h-6" style={{ color: 'var(--color-fresh-600)' }} />}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{actionModal.type === 'ban' ? 'Ban Agent' : 'Approve KYC'}</h3>
                                    <p className="text-sm mb-6" style={{ color: 'var(--color-surface-500)' }}>
                                        {actionModal.type === 'ban' ? `Are you sure you want to ban ${actionModal.agent?.name}? Their listings will be suspended.` : `Are you sure you want to approve KYC for ${actionModal.agent?.name}? They will gain verified status.`}
                                    </p>
                                    <div className="flex w-full gap-3">
                                        <button onClick={() => setActionModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>Cancel</button>
                                        <button onClick={() => { alert(`${actionModal.type} executed! (Demo)`); setActionModal(null); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: actionModal.type === 'ban' ? 'var(--color-danger-600)' : 'var(--color-fresh-600)' }}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
