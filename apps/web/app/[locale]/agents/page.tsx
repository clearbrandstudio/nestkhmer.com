'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, Zap, Award, Search, ArrowRight, X, Mail, Phone, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const agents = [
    { name: 'Sophea Chan', agency: 'IPS Cambodia', tier: 'pro', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', score: 96, responseRate: 98, avgResponse: '12m', listings: 24, badges: ['lightning', 'quality', 'verified', 'top10'], slug: 'sophea-chan' },
    { name: 'David Park', agency: 'ERA Cambodia', tier: 'agency', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', score: 93, responseRate: 95, avgResponse: '18m', listings: 31, badges: ['lightning', 'quality', 'verified'], slug: 'david-park' },
    { name: 'Maly Sokhon', agency: 'Huttons KH', tier: 'pro', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', score: 91, responseRate: 97, avgResponse: '8m', listings: 18, badges: ['lightning', 'verified', 'top10'], slug: 'maly-sokhon' },
    { name: 'James Liu', agency: 'Independent', tier: 'standard', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', score: 88, responseRate: 92, avgResponse: '25m', listings: 15, badges: ['quality', 'verified'], slug: 'james-liu' },
    { name: 'Lisa Nguyen', agency: 'CBRE Cambodia', tier: 'agency', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face', score: 86, responseRate: 90, avgResponse: '20m', listings: 22, badges: ['quality', 'verified'], slug: 'lisa-nguyen' },
    { name: 'Kosal Meng', agency: 'Knight Frank', tier: 'pro', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', score: 85, responseRate: 88, avgResponse: '30m', listings: 19, badges: ['verified'], slug: 'kosal-meng' },
];

const badgeCfg: Record<string, { icon: any; label: string; color: string }> = {
    lightning: { icon: Zap, label: 'Fast Responder', color: 'var(--color-warn-500)' },
    quality: { icon: Star, label: 'Quality Listings', color: 'var(--color-fresh-500)' },
    verified: { icon: Shield, label: 'ID Verified', color: 'var(--color-brand-500)' },
    top10: { icon: Award, label: 'Top 10 Agent', color: 'var(--color-danger-500)' },
};

const tierCfg: Record<string, { label: string; bg: string; text: string }> = {
    pro: { label: 'PRO Agent', bg: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)', text: '#5D4037' },
    agency: { label: 'Top Agency', bg: 'linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)', text: 'white' },
    standard: { label: 'Verified', bg: 'var(--color-surface-200)', text: 'var(--color-surface-700)' }
};

export default function AgentsPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const [contactModal, setContactModal] = useState<any | null>(null);

    return (
        <div className="min-h-screen pb-32" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Find Your Expert</h1>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-surface-500)' }}>Work with Cambodia's highly vetted real estate professionals. Every agent is scored based on responsiveness and transaction history.</p>
                </motion.div>

                {/* Search */}
                <div className="max-w-2xl mx-auto mb-12 glass-card flex items-center gap-3 px-5 py-3 shadow-lg" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <Search className="w-5 h-5" style={{ color: 'var(--color-surface-400)' }} />
                    <input type="text" placeholder="Search by name, agency, or spoken language (e.g., 'English', '中文')..." className="flex-1 bg-transparent border-none outline-none text-base py-2 w-full" style={{ color: 'var(--color-surface-800)' }} />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {agents.map((a, i) => {
                        const tierDef = tierCfg[a.tier] || tierCfg.standard;
                        return (
                            <motion.div key={a.slug} className="glass-card flex flex-col relative group overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} style={{ borderRadius: 'var(--radius-xl)' }}>
                                {/* Top Banner/Tier */}
                                <div className="h-16 w-full relative flex items-start justify-between px-4 py-3" style={{ background: 'var(--color-surface-100)' }}>
                                    <div className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-sm" style={{ background: tierDef.bg, color: tierDef.text, letterSpacing: '0.05em' }}>
                                        {tierDef.label}
                                    </div>
                                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-gray-700">Online</span>
                                    </div>
                                </div>

                                {/* Avatar & Score */}
                                <div className="px-6 relative -mt-10 flex flex-col items-center">
                                    <div className="relative mb-3">
                                        <a href={`/${locale}/agents/${a.slug}`}>
                                            <div className="w-24 h-24 rounded-full bg-cover bg-center shadow-lg transition-transform group-hover:scale-105" style={{ backgroundImage: `url(${a.avatar})`, border: '4px solid white' }} />
                                        </a>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex flex-col items-center justify-center shadow-md bg-white border border-gray-100" title="NestScore">
                                            <span style={{ fontSize: '10px', color: 'var(--color-surface-400)', lineHeight: 1 }}>Score</span>
                                            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-brand-600)', lineHeight: 1 }}>{a.score}</span>
                                        </div>
                                    </div>

                                    <a href={`/${locale}/agents/${a.slug}`} className="no-underline text-center">
                                        <h3 className="text-xl font-bold hover:text-brand-600 transition-colors" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{a.name}</h3>
                                        <p className="text-sm font-medium mb-4" style={{ color: 'var(--color-surface-500)' }}>{a.agency}</p>
                                    </a>
                                </div>

                                {/* Badges */}
                                <div className="px-6 flex justify-center gap-2 mb-4">
                                    {a.badges.map(b => {
                                        const c = badgeCfg[b];
                                        if (!c) return null;
                                        const I = c.icon;
                                        return (
                                            <div key={b} className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-help" title={c.label} style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                                                <I className="w-4 h-4" style={{ color: c.color }} />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Stats Grid */}
                                <div className="px-6 mb-5">
                                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl border border-gray-100" style={{ background: 'var(--color-surface-50)' }}>
                                        <div className="text-center"><div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--color-surface-400)' }}>Response</div><div className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-fresh-600)' }}>{a.responseRate}%</div></div>
                                        <div className="text-center border-x border-gray-200"><div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--color-surface-400)' }}>Avg Time</div><div className="text-sm font-bold mt-0.5">{a.avgResponse}</div></div>
                                        <div className="text-center"><div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--color-surface-400)' }}>Listings</div><div className="text-sm font-bold mt-0.5">{a.listings}</div></div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="mt-auto px-6 pb-6 pt-2">
                                    <button onClick={() => setContactModal(a)} className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95 text-white shadow-md" style={{ background: 'var(--color-brand-600)' }}>
                                        <MessageSquare className="w-4 h-4" /> Contact Agent
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Lead Capture Contact Modal */}
            <AnimatePresence>
                {contactModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="glass-card w-full max-w-lg overflow-hidden flex flex-col shadow-2xl" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            {/* Modal Header */}
                            <div className="h-32 w-full relative flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80')` }}>
                                <div className="absolute inset-0 bg-brand-900/60 mix-blend-multiply" />
                                <button onClick={() => setContactModal(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"><X className="w-4 h-4" /></button>

                                <div className="absolute -bottom-10 flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-cover bg-center shadow-lg mb-2 border-4 border-white" style={{ backgroundImage: `url(${contactModal.avatar})` }} />
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-8 pt-14 pb-8">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>Contact {contactModal.name}</h3>
                                    <p className="text-sm text-brand-600 font-medium">{contactModal.agency}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-surface-500 block mb-1.5 ml-1">Your Direct Contact</label>
                                        <div className="flex bg-surface-50 rounded-xl border border-surface-200 overflow-hidden focus-within:ring-2 focus-within:ring-brand-200 transition-all">
                                            <div className="w-12 flex items-center justify-center bg-surface-100 border-r border-surface-200">
                                                <Phone className="w-4 h-4 text-surface-500" />
                                            </div>
                                            <input type="tel" placeholder="+855 12 345 678" className="w-full px-4 py-3 bg-transparent outline-none text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex bg-surface-50 rounded-xl border border-surface-200 overflow-hidden focus-within:ring-2 focus-within:ring-brand-200 transition-all">
                                            <div className="w-12 flex items-center justify-center bg-surface-100 border-r border-surface-200">
                                                <Mail className="w-4 h-4 text-surface-500" />
                                            </div>
                                            <input type="email" placeholder="Email Address (Optional)" className="w-full px-4 py-3 bg-transparent outline-none text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-surface-500 block mb-1.5 ml-1 mt-2">What are you looking for?</label>
                                        <textarea placeholder={`Hi ${contactModal.name.split(' ')[0]}, I'm interested in renting an apartment in BKK1 for under $800...`} rows={4} className="w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 outline-none text-sm resize-none focus:ring-2 focus:ring-brand-200 transition-all" />
                                    </div>

                                    <button onClick={() => { alert('Lead sent directly to agent CRM!'); setContactModal(null); }} className="w-full mt-4 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)' }}>
                                        Send Message <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <p className="text-center text-[10px] text-surface-400 mt-3">By messaging, you agree to our Terms of Service & Privacy Policy.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
