'use client';
import { motion } from 'framer-motion';
import { Shield, Eye, Clock, Languages, Users, Target, Heart, Globe } from 'lucide-react';

const values = [
    { icon: Eye, title: 'Radical Transparency', desc: 'Every listing shows real data — electric rates, NestScore, freshness, agent response times. No hidden surprises.' },
    { icon: Clock, title: 'Freshness Guarantee', desc: 'We auto-expire listings after 14 days. If it\'s on NestKhmer, it\'s genuinely available right now.' },
    {
        icon: Shield, title: 'Agent Accountability', desc: 'NestScore tracks every agent\'s responsiveness, listing quality, and conversion rates \u2014 publicly.'
    },
    { icon: Languages, title: 'Trilingual Access', desc: 'Full support in English, Khmer, and Mandarin. Because language shouldn\'t be a barrier to finding home.' },
];

const team = [
    { name: 'NestKhmer Team', role: 'Building Cambodia\'s rental future', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>About NestKhmer</h1>
                    <p className="text-lg" style={{ color: 'var(--color-surface-500)', lineHeight: 1.7 }}>We started NestKhmer because renting in Cambodia shouldn&apos;t be a guessing game. Too many platforms are filled with stale listings, hidden fees, and unresponsive agents. We decided to fix that — with data, transparency, and technology.</p>
                </motion.div>

                {/* Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8" style={{ borderRadius: 'var(--radius-2xl)' }}>
                        <Target className="w-8 h-8 mb-4" style={{ color: 'var(--color-brand-600)' }} />
                        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Our Mission</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>To make renting in Cambodia transparent, efficient, and fair for everyone — tenants, agents, and property owners. We believe the rental market should work on trust, data, and real accountability.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8" style={{ borderRadius: 'var(--radius-2xl)' }}>
                        <Heart className="w-8 h-8 mb-4" style={{ color: 'var(--color-fresh-600)' }} />
                        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Our Vision</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>A Cambodia where every rental search is effortless, every listing is honest, and every agent earns their reputation through measurable performance — not paid promotion.</p>
                    </motion.div>
                </div>

                {/* Values */}
                <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>What We Stand For</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        return (
                            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                                <Icon className="w-6 h-6 mb-3" style={{ color: 'var(--color-brand-500)' }} />
                                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{v.title}</h3>
                                <p className="text-sm" style={{ color: 'var(--color-surface-600)' }}>{v.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Numbers */}
                <div className="glass-card p-10 text-center mb-16" style={{ borderRadius: 'var(--radius-2xl)', background: 'var(--color-surface-950)', color: 'white' }}>
                    <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>NestKhmer by the Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[{ val: '2,400+', label: 'Live Listings' }, { val: '340+', label: 'Verified Agents' }, { val: '12', label: 'Districts' }, { val: '<18min', label: 'Avg Response' }].map(s => (
                            <div key={s.label}><div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-400)' }}>{s.val}</div><div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div></div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Built in Phnom Penh 🇰🇭</h2>
                    <p className="text-sm mb-8" style={{ color: 'var(--color-surface-500)' }}>NestKhmer is built and operated by a small, dedicated team in Phnom Penh.</p>
                    <div className="w-48 h-48 rounded-full bg-cover bg-center mx-auto" style={{ backgroundImage: `url(${team[0].avatar})`, border: '4px solid var(--color-brand-100)' }} />
                </div>
            </div>
        </div>
    );
}
