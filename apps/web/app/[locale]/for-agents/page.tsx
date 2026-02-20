'use client';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, Zap, Check, ArrowRight, Rocket, BarChart3, Globe, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';

const benefits = [
    { icon: Shield, title: 'Build Your NestScore', desc: 'Responsive agents get ranked higher. Fast replies = more leads = higher score.', color: 'var(--color-brand-600)' },
    { icon: TrendingUp, title: 'Quality Over Quantity', desc: 'Complete listings rank higher. Detailed photos, utility rates, and real pricing win.', color: 'var(--color-fresh-600)' },
    { icon: Users, title: 'Verified Leads', desc: 'Tenants on NestKhmer are actively searching. No bots, no tire-kickers.', color: 'var(--color-warn-600)' },
    { icon: Globe, title: 'Trilingual Reach', desc: 'Your listings are accessible in English, Khmer, and Mandarin — 3× the audience.', color: 'var(--color-surface-700)' },
];

const plans = [
    { name: 'Free', price: 0, listings: 3, features: ['Basic listing', 'NestScore dashboard', 'Lead notifications', 'Standard support'], cta: 'Get Started', popular: false },
    { name: 'Pro', price: 29, listings: 25, features: ['everything in Free', 'Priority ranking', 'Analytics dashboard', 'Freshness auto-renew', 'Response time tracking', 'Telegram lead routing'], cta: 'Start Pro Trial', popular: true },
    { name: 'Agency', price: 99, listings: 100, features: ['Everything in Pro', 'Multi-agent accounts', 'Agency branding', 'API access', 'Bulk upload tools', 'Dedicated support', 'Custom reports'], cta: 'Contact Sales', popular: false },
];

export default function ForAgentsPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem' }}>
            {/* Hero */}
            <section className="hero-gradient grid-pattern py-20 text-center">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--color-brand-50)', border: '1px solid var(--color-brand-100)' }}>
                            <Rocket className="w-4 h-4" style={{ color: 'var(--color-brand-600)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-brand-700)' }}>For Real Estate Professionals</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>Grow Your Business with <span style={{ color: 'var(--color-brand-600)' }}>Data-Driven</span> Reputation</h1>
                        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-surface-500)' }}>NestKhmer rewards the best agents. Respond faster, list better, and watch your NestScore — and your leads — grow.</p>
                        <div className="flex justify-center gap-4">
                            <a href={`/${locale}/auth/register`} className="px-8 py-3 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}>Create Agent Account</a>
                            <a href={`/${locale}/auth/login`} className="px-8 py-3 rounded-xl text-sm font-semibold no-underline" style={{ border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>Sign In</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20" style={{ background: 'var(--color-surface-50)' }}>
                <div className="section-container">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-heading)' }}>Why NestKhmer for Agents?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {benefits.map((b, i) => {
                            const Icon = b.icon; return (
                                <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                                    <Icon className="w-6 h-6 mb-3" style={{ color: b.color }} />
                                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{b.title}</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-surface-600)' }}>{b.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 pb-24">
                <div className="section-container">
                    <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Simple, Transparent Pricing</h2>
                    <p className="text-center mb-12" style={{ color: 'var(--color-surface-500)' }}>Start free. Upgrade when you&apos;re ready to grow.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {plans.map((p, i) => (
                            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 relative" style={{ borderRadius: 'var(--radius-xl)', border: p.popular ? '2px solid var(--color-brand-500)' : undefined }}>
                                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--color-brand-600)', color: 'white' }}>Most Popular</div>}
                                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                                <div className="flex items-baseline gap-1 mb-1"><span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>${p.price}</span><span className="text-sm" style={{ color: 'var(--color-surface-400)' }}>/mo</span></div>
                                <p className="text-xs mb-4" style={{ color: 'var(--color-surface-400)' }}>Up to {p.listings} listings</p>
                                <ul className="space-y-2 mb-6">
                                    {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-surface-600)' }}><Check className="w-3.5 h-3.5" style={{ color: 'var(--color-fresh-500)' }} />{f}</li>)}
                                </ul>
                                <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: p.popular ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: p.popular ? 'white' : 'var(--color-surface-700)', fontFamily: 'var(--font-heading)' }}>{p.cta}</button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
