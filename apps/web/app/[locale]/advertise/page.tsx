'use client';
import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, Target, Megaphone, ArrowRight, Mail, Check } from 'lucide-react';

const zones = [
    { name: 'Homepage Hero Banner', reach: '45K/mo', ctr: '3.2%', price: '$499/mo' },
    { name: 'Search Results Top', reach: '120K/mo', ctr: '4.5%', price: '$799/mo' },
    { name: 'District Sidebar', reach: '30K/mo', ctr: '2.8%', price: '$299/mo' },
    { name: 'Blog Inline Native', reach: '15K/mo', ctr: '5.1%', price: '$199/mo' },
    { name: 'Listing Detail Sidebar', reach: '80K/mo', ctr: '3.7%', price: '$599/mo' },
    { name: 'Email Newsletter', reach: '8K/mo', ctr: '12%', price: '$149/mo' },
];

export default function AdvertisePage() {
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem' }}>
            <section className="hero-gradient grid-pattern py-20 text-center">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--color-warn-50)', border: '1px solid rgba(251,191,36,0.2)' }}>
                            <Megaphone className="w-4 h-4" style={{ color: 'var(--color-warn-600)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-warn-700)' }}>Advertising & Media Kit</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>Reach Cambodia&apos;s <span style={{ color: 'var(--color-brand-600)' }}>Most Engaged</span> Rental Audience</h1>
                        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-surface-500)' }}>NestKhmer connects you with expats, tenants, and property seekers actively searching for homes in Phnom Penh.</p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16" style={{ background: 'var(--color-surface-950)' }}>
                <div className="section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[{ val: '200K+', label: 'Monthly Pageviews', icon: Eye }, { val: '35K+', label: 'Monthly Users', icon: Users }, { val: '4.2%', label: 'Avg CTR', icon: Target }, { val: '12%', label: 'Email Open Rate', icon: Mail }].map(s => {
                            const Icon = s.icon;
                            return <div key={s.label}><Icon className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-brand-400)' }} /><div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</div><div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div></div>;
                        })}
                    </div>
                </div>
            </section>

            {/* Ad Zones */}
            <section className="py-20" style={{ background: 'var(--color-surface-50)' }}>
                <div className="section-container">
                    <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Advertising Zones</h2>
                    <p className="text-center mb-12" style={{ color: 'var(--color-surface-500)' }}>Premium placements with full UTM tracking and real-time analytics.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {zones.map((z, i) => (
                            <motion.div key={z.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{z.name}</h3>
                                <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                    <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Reach</div><div className="text-sm font-bold">{z.reach}</div></div>
                                    <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>CTR</div><div className="text-sm font-bold" style={{ color: 'var(--color-fresh-600)' }}>{z.ctr}</div></div>
                                    <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>From</div><div className="text-sm font-bold" style={{ color: 'var(--color-brand-600)' }}>{z.price}</div></div>
                                </div>
                                <ul className="space-y-1.5 text-xs" style={{ color: 'var(--color-surface-500)' }}>
                                    {['Full UTM tracking', 'Real-time analytics', 'A/B creative testing'].map(f => <li key={f} className="flex items-center gap-1.5"><Check className="w-3 h-3" style={{ color: 'var(--color-fresh-500)' }} />{f}</li>)}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <a href="mailto:ads@nestkhmer.com" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}><Mail className="w-4 h-4" />Request Media Kit</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
