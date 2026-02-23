'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Edit2, Ban, Mail, Plus, X } from 'lucide-react';
import { useState } from 'react';

const users = [
    { name: 'Admin', email: 'admin@nestkhmer.com', role: 'admin', status: 'active', joined: 'Jan 2025', lastLogin: '2 min ago' },
    { name: 'Sophea Chan', email: 'agent@nestkhmer.com', role: 'agent', status: 'active', joined: 'Jan 2025', lastLogin: '1 hour ago' },
    { name: 'John Doe', email: 'tenant@nestkhmer.com', role: 'tenant', status: 'active', joined: 'Feb 2025', lastLogin: '3 hours ago' },
    { name: 'Sarah Johnson', email: 'sarah@email.com', role: 'tenant', status: 'active', joined: 'Mar 2025', lastLogin: '1 day ago' },
    { name: 'Michael Chen', email: 'michael@email.com', role: 'tenant', status: 'suspended', joined: 'Apr 2025', lastLogin: '5 days ago' },
    { name: 'Emma Williams', email: 'emma@email.com', role: 'tenant', status: 'active', joined: 'May 2025', lastLogin: '2 days ago' },
];

const roleCfg: Record<string, { color: string; bg: string }> = { admin: { color: 'var(--color-danger-600)', bg: 'rgba(239,68,68,0.08)' }, agent: { color: 'var(--color-brand-600)', bg: 'var(--color-brand-50)' }, tenant: { color: 'var(--color-fresh-600)', bg: 'var(--color-fresh-50)' } };

export default function AdminUsers() {
    const [modal, setModal] = useState<{ type: 'add' | 'edit' | 'ban', user?: any } | null>(null);
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>User Management</h1>
                <button onClick={() => setModal({ type: 'add' })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Plus className="w-4 h-4" />Add User</button>
            </div>
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['User', 'Role', 'Status', 'Joined', 'Last Login', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {users.map((u, i) => (
                            <motion.tr key={u.email} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3"><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{u.name}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{u.email}</div></td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: roleCfg[u.role]?.bg, color: roleCfg[u.role]?.color }}>{u.role}</span></td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: u.status === 'active' ? 'var(--color-fresh-50)' : 'rgba(239,68,68,0.08)', color: u.status === 'active' ? 'var(--color-fresh-600)' : 'var(--color-danger-600)' }}>{u.status}</span></td>
                                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-surface-500)' }}>{u.joined}</td>
                                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-surface-500)' }}>{u.lastLogin}</td>
                                <td className="px-4 py-3"><div className="flex items-center gap-1"><button onClick={() => setModal({ type: 'edit', user: u })} className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }} title="Edit"><Edit2 className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }} title="Email"><Mail className="w-3.5 h-3.5" /></button><button onClick={() => setModal({ type: 'ban', user: u })} className="p-1.5 rounded hover:bg-red-50" style={{ color: 'var(--color-danger-400)' }} title="Ban"><Ban className="w-3.5 h-3.5" /></button></div></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {modal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-md p-6" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            {modal.type === 'ban' ? (
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(239,68,68,0.1)' }}>
                                        <Ban className="w-6 h-6 text-red-500" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Ban User</h3>
                                    <p className="text-sm mb-6" style={{ color: 'var(--color-surface-500)' }}>Are you sure you want to ban <strong>{modal.user?.name}</strong>? They will no longer be able to log in or access the platform.</p>
                                    <div className="flex w-full gap-3">
                                        <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>Cancel</button>
                                        <button onClick={() => { alert('User banned (Demo)'); setModal(null); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-danger-600)' }}>Confirm Ban</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{modal.type === 'add' ? 'Add New User' : 'Edit User'}</h2>
                                        <button onClick={() => setModal(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Full Name *</label>
                                            <input defaultValue={modal.user?.name || ''} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Email Address *</label>
                                            <input type="email" defaultValue={modal.user?.email || ''} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Role *</label>
                                            <select defaultValue={modal.user?.role || 'tenant'} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}>
                                                <option value="tenant">Tenant</option>
                                                <option value="agent">Agent</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="pt-4 flex items-center justify-end gap-3" style={{ borderTop: '1px solid var(--color-surface-100)' }}>
                                            <button onClick={() => setModal(null)} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'var(--color-surface-600)' }}>Cancel</button>
                                            <button onClick={() => { alert('Saved! (Demo)'); setModal(null); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-white" style={{ background: 'var(--color-brand-600)' }}>Save User</button>
                                        </div>
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
