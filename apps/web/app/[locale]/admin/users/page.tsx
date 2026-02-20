'use client';
import { motion } from 'framer-motion';
import { Shield, Eye, Ban, Mail } from 'lucide-react';

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
    return (
        <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>User Management</h1>
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
                                <td className="px-4 py-3"><div className="flex items-center gap-1"><button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded" style={{ color: 'var(--color-surface-400)' }}><Mail className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded" style={{ color: 'var(--color-danger-400)' }}><Ban className="w-3.5 h-3.5" /></button></div></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
