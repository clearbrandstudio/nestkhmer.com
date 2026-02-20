'use client';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';

const plans = [
    { name: 'Free', price: 0, current: false, listings: 3, features: ['Basic listing', 'NestScore dashboard', 'Lead notifications', 'Standard support'] },
    { name: 'Pro', price: 29, current: true, listings: 25, features: ['Everything in Free', 'Priority ranking', 'Analytics dashboard', 'Auto-renew listings', 'Response time tracking', 'Telegram lead routing'] },
    { name: 'Agency', price: 99, current: false, listings: 100, features: ['Everything in Pro', 'Multi-agent accounts', 'Agency branding', 'API access', 'Bulk upload tools', 'Dedicated support', 'Custom reports'] },
];

export default function PortalSubscription() {
    return (
        <div className="p-6 md:p-8 max-w-5xl">
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Subscription</h1>
            <p className="text-sm mb-8" style={{ color: 'var(--color-surface-500)' }}>Manage your plan and billing</p>

            {/* Current Plan Banner */}
            <div className="glass-card p-6 mb-8 flex items-center justify-between" style={{ borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, var(--color-brand-50), var(--color-brand-100))' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-600)' }}><Star className="w-5 h-5 text-white" /></div>
                    <div>
                        <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-800)' }}>Pro Plan</div>
                        <div className="text-xs" style={{ color: 'var(--color-brand-600)' }}>Next billing: March 15, 2026 · $29/mo</div>
                    </div>
                </div>
                <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ border: '1px solid var(--color-brand-200)', color: 'var(--color-brand-700)' }}>Manage Billing</button>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p, i) => (
                    <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 relative" style={{ borderRadius: 'var(--radius-xl)', border: p.current ? '2px solid var(--color-brand-500)' : undefined }}>
                        {p.current && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--color-brand-600)', color: 'white' }}>Current Plan</div>}
                        <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                        <div className="flex items-baseline gap-1 mb-1"><span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>${p.price}</span><span className="text-sm" style={{ color: 'var(--color-surface-400)' }}>/mo</span></div>
                        <p className="text-xs mb-4" style={{ color: 'var(--color-surface-400)' }}>Up to {p.listings} listings</p>
                        <ul className="space-y-2 mb-6">
                            {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-surface-600)' }}><Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-fresh-500)' }} />{f}</li>)}
                        </ul>
                        <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: p.current ? 'var(--color-surface-100)' : 'var(--color-brand-600)', color: p.current ? 'var(--color-surface-500)' : 'white' }}>{p.current ? 'Current Plan' : 'Upgrade'}</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
