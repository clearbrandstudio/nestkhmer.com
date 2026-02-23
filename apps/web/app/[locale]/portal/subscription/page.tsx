'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight, X, CreditCard, Shield } from 'lucide-react';
import { useState } from 'react';

const plans = [
    { name: 'Free', price: 0, current: false, listings: 3, features: ['Basic listing', 'NestScore dashboard', 'Lead notifications', 'Standard support'] },
    { name: 'Pro', price: 29, current: true, listings: 25, features: ['Everything in Free', 'Priority ranking', 'Analytics dashboard', 'Auto-renew listings', 'Response time tracking', 'Telegram lead routing'] },
    { name: 'Agency', price: 99, current: false, listings: 100, features: ['Everything in Pro', 'Multi-agent accounts', 'Agency branding', 'API access', 'Bulk upload tools', 'Dedicated support', 'Custom reports'] },
];

export default function PortalSubscription() {
    const [billingModal, setBillingModal] = useState<'manage' | 'upgrade' | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

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
                <button onClick={() => setBillingModal('manage')} className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/50 transition-colors" style={{ border: '1px solid var(--color-brand-200)', color: 'var(--color-brand-700)' }}>Manage Billing</button>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p, i) => (
                    <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 relative" style={{ borderRadius: 'var(--radius-xl)', border: p.current ? '2px solid var(--color-brand-500)' : undefined }}>
                        {p.current && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--color-brand-600)', color: 'white' }}>Current Plan</div>}
                        <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                        <div className="flex items-baseline gap-1 mb-1"><span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>${p.price}</span><span className="text-sm" style={{ color: 'var(--color-surface-400)' }}>/mo</span></div>
                        <p className="text-xs mb-4" style={{ color: 'var(--color-surface-400)' }}>Up to {p.listings} listings</p>
                        <ul className="space-y-2 mb-6 flex-1">
                            {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-surface-600)' }}><Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-fresh-500)' }} />{f}</li>)}
                        </ul>
                        <button onClick={() => { if (!p.current) { setSelectedPlan(p); setBillingModal('upgrade'); } }} className="w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 mt-auto" style={{ background: p.current ? 'var(--color-surface-100)' : 'var(--color-brand-600)', color: p.current ? 'var(--color-surface-500)' : 'white' }}>{p.current ? 'Current Plan' : 'Upgrade'}</button>
                    </motion.div>
                ))}
            </div>

            {/* Billing/Upgrade Modal */}
            <AnimatePresence>
                {billingModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`glass-card w-full ${billingModal === 'manage' ? 'max-w-md' : 'max-w-lg'} p-6`} style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{billingModal === 'manage' ? 'Manage Billing' : `Upgrade to ${selectedPlan?.name}`}</h2>
                                <button onClick={() => { setBillingModal(null); setSelectedPlan(null); }} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                            </div>

                            {billingModal === 'manage' ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ border: '1px solid var(--color-surface-200)', background: 'var(--color-surface-50)' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border shadow-sm" style={{ borderColor: 'var(--color-surface-200)' }}><CreditCard className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></div>
                                            <div>
                                                <div className="text-sm font-semibold">•••• •••• •••• 4242</div>
                                                <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Expires 12/28</div>
                                            </div>
                                        </div>
                                        <button className="text-sm font-semibold" style={{ color: 'var(--color-brand-600)' }}>Update</button>
                                    </div>
                                    <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.05)' }}>
                                        <h4 className="text-sm font-bold text-red-600 mb-1">Cancel Subscription</h4>
                                        <p className="text-xs text-red-500/80 mb-3">You will lose access to Pro features at the end of your billing cycle.</p>
                                        <button onClick={() => { alert('Subscription cancelled! (Demo)'); setBillingModal(null); }} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors">Cancel Plan</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: 'var(--color-brand-50)' }}>
                                        <div>
                                            <div className="text-sm font-bold" style={{ color: 'var(--color-brand-800)' }}>{selectedPlan?.name} Plan</div>
                                            <div className="text-xs" style={{ color: 'var(--color-brand-600)' }}>Billed monthly</div>
                                        </div>
                                        <div className="text-xl font-bold" style={{ color: 'var(--color-brand-700)' }}>${selectedPlan?.price}<span className="text-sm font-normal">/mo</span></div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Name on Card</label>
                                        <input className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" placeholder="John Doe" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Card Information</label>
                                        <div className="relative">
                                            <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" placeholder="0000 0000 0000 0000" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <input className="w-1/2 px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" placeholder="MM/YY" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                            <input className="w-1/2 px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" placeholder="CVC" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                        </div>
                                    </div>

                                    <button onClick={() => { alert('Plan upgraded! (Demo)'); setBillingModal(null); setSelectedPlan(null); }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all text-white shadow-md shadow-brand-500/20" style={{ background: 'var(--color-brand-600)' }}>
                                        <Shield className="w-4 h-4" /> Secure Checkout
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
