'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, TrendingUp, Crown, Star, ArrowRight, Users, Check, Rocket, Gift, Clock, Award, ChevronRight, Home, Building2, BarChart3, Globe, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

/* ─── Pioneer Slot Counter ─── */
const TOTAL_SLOTS = 100;
const INITIAL_CLAIMED = 23; // Starting point — in production, this comes from the database

function useSlotCounter() {
    const [claimed, setClaimed] = useState(INITIAL_CLAIMED);
    useEffect(() => {
        const stored = localStorage.getItem('nestkhmer_pioneer_claimed');
        if (stored) setClaimed(parseInt(stored, 10));
    }, []);
    return { claimed, total: TOTAL_SLOTS, remaining: TOTAL_SLOTS - claimed };
}

/* ─── Benefits Data ─── */
const pioneerBenefits = [
    { icon: Gift, title: '6 Months Free Pro', desc: 'Full Pro plan access — unlimited listings, analytics, and priority support. No credit card required.', color: '#8B5CF6' },
    { icon: Crown, title: 'Pioneer Badge Forever', desc: 'A permanent "Pioneer Agent" badge on your profile. Early believers deserve recognition.', color: '#F59E0B' },
    { icon: TrendingUp, title: 'Priority Search Ranking', desc: 'Your listings appear higher in search results for the entire first year. More visibility = more leads.', color: '#10B981' },
    { icon: Shield, title: 'Verified ✓ Status', desc: 'Instant verified agent badge that stays forever. Build trust from day one.', color: '#3B82F6' },
    { icon: BarChart3, title: 'Early Analytics Access', desc: 'Be the first to use our AI-powered market insights and lead scoring engine.', color: '#EC4899' },
    { icon: Globe, title: 'Trilingual Profile', desc: 'Your profile and listings appear in English, Khmer, and Mandarin — 3× the reach.', color: '#06B6D4' },
];

/* ─── Comparison Table ─── */
const planComparison = [
    { feature: 'Monthly Price', free: '$0', pro: '$49/mo', pioneer: 'FREE for 6 months' },
    { feature: 'Active Listings', free: '5', pro: 'Unlimited', pioneer: 'Unlimited' },
    { feature: 'Analytics Dashboard', free: 'Basic', pro: 'Advanced', pioneer: 'Advanced' },
    { feature: 'Search Priority', free: 'Standard', pro: 'Boosted', pioneer: 'Maximum (1 year)' },
    { feature: 'Verified Badge', free: '—', pro: '✓', pioneer: '✓ Forever' },
    { feature: 'Pioneer Badge', free: '—', pro: '—', pioneer: '✓ Exclusive' },
    { feature: 'AI Lead Scoring', free: '—', pro: '✓', pioneer: '✓ Early Access' },
    { feature: 'NestScore Boost', free: '—', pro: '+5', pioneer: '+10' },
];

/* ─── FAQ ─── */
const faqs = [
    { q: 'What happens after 6 months?', a: 'You transition to the regular Pro plan at $49/month. You can also downgrade to Free, but you keep your Pioneer badge and verified status forever.' },
    { q: 'Is there really no catch?', a: 'No catch. We need listings to build the best rental platform in Cambodia. You help us grow, we help you succeed. Simple.' },
    { q: 'How many listings can I upload?', a: 'Unlimited during the Pioneer period. Upload your entire portfolio — the more listings you have, the more leads you\'ll get.' },
    { q: 'Can I join if I\'m an independent agent?', a: 'Absolutely. Pioneer is open to all — independent agents, agencies, and property managers.' },
    { q: 'What makes Pioneer different from just signing up for Free?', a: 'Pioneer gives you Pro features for free, plus exclusive perks (badge, priority ranking) that no future user will ever get. It rewards early believers.' },
];

export default function PioneerProgramPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const { claimed, total, remaining } = useSlotCounter();
    const [showSignup, setShowSignup] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', agency: '', listings: '' });
    const [submitted, setSubmitted] = useState(false);
    const pct = (claimed / total) * 100;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production: POST to API, create user, assign Pioneer status
        const newClaimed = claimed + 1;
        localStorage.setItem('nestkhmer_pioneer_claimed', newClaimed.toString());
        setSubmitted(true);
        setTimeout(() => { setShowSignup(false); setSubmitted(false); }, 3000);
    };

    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem' }}>

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F0A1E 0%, #1A0F3C 30%, #0E1428 70%, #050A18 100%)' }}>
                {/* Animated grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                {/* Ambient glows */}
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)' }} />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)' }} />

                <div className="section-container relative z-10 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                            <Rocket className="w-4 h-4" style={{ color: '#A78BFA' }} />
                            <span className="text-sm font-semibold" style={{ color: '#C4B5FD' }}>Limited to {total} agents — {remaining} spots remaining</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                            Be a{' '}
                            <span className="relative inline-block">
                                <span style={{ background: 'linear-gradient(135deg, #A78BFA, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pioneer</span>
                            </span>
                            <br />Agent
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                            Join the first {total} agents building Cambodia&apos;s most transparent rental platform.
                            Get <strong style={{ color: '#A78BFA' }}>6 months of Pro for free</strong>, plus exclusive perks that will never be offered again.
                        </motion.p>

                        {/* CTA */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <button onClick={() => setShowSignup(true)} className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: 'white', fontFamily: 'var(--font-heading)', boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}>
                                <Crown className="w-5 h-5" />
                                Claim Your Pioneer Spot
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <a href={`/${locale}/for-agents`} className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium no-underline transition-all" style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                                View Regular Plans
                            </a>
                        </motion.div>

                        {/* Live Counter */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="max-w-md mx-auto">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold" style={{ color: '#A78BFA' }}>{claimed} of {total} claimed</span>
                                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{remaining} left</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #8B5CF6, #10B981)' }} />
                            </div>
                            <div className="flex items-center gap-2 mt-3 justify-center">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
                                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>3 agents joined today</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── BENEFITS GRID ─── */}
            <section className="py-20 md:py-28" style={{ background: 'var(--color-surface-50)' }}>
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>What Pioneer Agents Get</h2>
                        <p className="max-w-xl mx-auto" style={{ color: 'var(--color-surface-500)' }}>Exclusive benefits designed for early believers. These perks will never be offered to future agents.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {pioneerBenefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-6 group hover:scale-[1.02] transition-all" style={{ borderRadius: 'var(--radius-xl)' }}>
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${b.color}15` }}>
                                        <Icon className="w-6 h-6" style={{ color: b.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{b.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-500)' }}>{b.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="py-20" style={{ background: 'white' }}>
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Get Started in 3 Steps</h2>
                        <p className="max-w-xl mx-auto" style={{ color: 'var(--color-surface-500)' }}>No contracts. No credit card. Just sign up and start listing.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '01', title: 'Claim Your Spot', desc: 'Fill in your details below. We\'ll verify your identity within 24 hours.', icon: Users, color: '#8B5CF6' },
                            { step: '02', title: 'Upload Listings', desc: 'Add your properties with photos, pricing, and details. No limit.', icon: Building2, color: '#10B981' },
                            { step: '03', title: 'Get Leads', desc: 'Tenants contact you directly. Track everything in your dashboard.', icon: TrendingUp, color: '#F59E0B' },
                        ].map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center relative">
                                    <div className="text-6xl font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-100)' }}>{s.step}</div>
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 -mt-14 relative z-10" style={{ background: `${s.color}12`, border: `2px solid ${s.color}30` }}>
                                        <Icon className="w-6 h-6" style={{ color: s.color }} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>{s.desc}</p>
                                    {i < 2 && <div className="hidden md:block absolute top-8 -right-4 text-2xl" style={{ color: 'var(--color-surface-200)' }}>→</div>}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── COMPARISON TABLE ─── */}
            <section className="py-20" style={{ background: 'var(--color-surface-50)' }}>
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Pioneer vs Regular Plans</h2>
                        <p className="max-w-xl mx-auto" style={{ color: 'var(--color-surface-500)' }}>See exactly what you&apos;re getting — and why speed matters.</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto overflow-x-auto">
                        <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                            <thead>
                                <tr>
                                    <th className="text-left py-4 px-4 font-semibold" style={{ color: 'var(--color-surface-500)', borderBottom: '2px solid var(--color-surface-100)' }}>Feature</th>
                                    <th className="text-center py-4 px-4 font-semibold" style={{ color: 'var(--color-surface-500)', borderBottom: '2px solid var(--color-surface-100)' }}>Free</th>
                                    <th className="text-center py-4 px-4 font-semibold" style={{ color: 'var(--color-surface-500)', borderBottom: '2px solid var(--color-surface-100)' }}>Pro</th>
                                    <th className="text-center py-4 px-4 font-bold rounded-t-xl" style={{ color: 'white', background: 'var(--color-brand-600)', borderBottom: '2px solid var(--color-brand-600)' }}>
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Crown className="w-4 h-4" />Pioneer
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {planComparison.map((row, i) => (
                                    <tr key={row.feature}>
                                        <td className="py-3.5 px-4 font-medium" style={{ color: 'var(--color-surface-700)', borderBottom: '1px solid var(--color-surface-100)' }}>{row.feature}</td>
                                        <td className="text-center py-3.5 px-4" style={{ color: 'var(--color-surface-500)', borderBottom: '1px solid var(--color-surface-100)' }}>{row.free}</td>
                                        <td className="text-center py-3.5 px-4" style={{ color: 'var(--color-surface-500)', borderBottom: '1px solid var(--color-surface-100)' }}>{row.pro}</td>
                                        <td className="text-center py-3.5 px-4 font-semibold" style={{ color: 'var(--color-brand-700)', background: i % 2 === 0 ? 'rgba(139,92,246,0.04)' : 'rgba(139,92,246,0.08)', borderBottom: '1px solid var(--color-surface-100)' }}>{row.pioneer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-10">
                        <button onClick={() => setShowSignup(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all hover:scale-105" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', boxShadow: '0 4px 20px rgba(139,92,246,0.25)' }}>
                            <Crown className="w-4 h-4" />
                            Claim Pioneer Spot — {remaining} Left
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-20 pb-32" style={{ background: 'white' }}>
                <div className="section-container max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Questions?</h2>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                                    <span className="text-sm font-semibold" style={{ color: 'var(--color-surface-800)' }}>{faq.q}</span>
                                    <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform" style={{ color: 'var(--color-surface-400)', transform: expandedFaq === i ? 'rotate(90deg)' : undefined }} />
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-surface-500)' }}>{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SIGNUP MODAL ─── */}
            <AnimatePresence>
                {showSignup && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowSignup(false)}>
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-lg rounded-3xl p-8 relative" style={{ background: 'white', boxShadow: '0 25px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
                            <button onClick={() => setShowSignup(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-100)' }}>
                                <X className="w-4 h-4" style={{ color: 'var(--color-surface-500)' }} />
                            </button>

                            {!submitted ? (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)' }}>
                                            <Crown className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Claim Pioneer Spot #{claimed + 1}</h3>
                                            <p className="text-xs" style={{ color: 'var(--color-surface-500)' }}>{remaining} spots remaining</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Full Name *</label>
                                                <input required value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="Sophea Chan" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Phone *</label>
                                                <input required value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} placeholder="+855 12 345 678" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Email *</label>
                                            <input required type="email" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} placeholder="sophea@agency.com" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Agency / Company</label>
                                                <input value={formData.agency} onChange={e => setFormData(f => ({ ...f, agency: e.target.value }))} placeholder="IPS Cambodia" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Approx. Listings</label>
                                                <input value={formData.listings} onChange={e => setFormData(f => ({ ...f, listings: e.target.value }))} placeholder="e.g. 25" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                                                <Crown className="w-4 h-4" />
                                                Claim Pioneer Spot #{claimed + 1}
                                            </button>
                                        </div>

                                        <p className="text-center text-xs" style={{ color: 'var(--color-surface-400)' }}>
                                            No credit card required. We&apos;ll verify your identity within 24 hours.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.1)' }}>
                                        <Check className="w-8 h-8" style={{ color: '#10B981' }} />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>You&apos;re Pioneer #{claimed + 1}! 🎉</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Check your email for next steps. Welcome to the founding team.</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
