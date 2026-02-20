'use client';
import { motion } from 'framer-motion';
import { Shield, Star, Zap, Award, Search, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const agents = [
    { name: 'Sophea Chan', agency: 'IPS Cambodia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', score: 96, responseRate: 98, avgResponse: '12m', listings: 24, badges: ['lightning', 'quality', 'verified', 'top10'], slug: 'sophea-chan' },
    { name: 'David Park', agency: 'ERA Cambodia', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', score: 93, responseRate: 95, avgResponse: '18m', listings: 31, badges: ['lightning', 'quality', 'verified'], slug: 'david-park' },
    { name: 'Maly Sokhon', agency: 'Huttons KH', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', score: 91, responseRate: 97, avgResponse: '8m', listings: 18, badges: ['lightning', 'verified', 'top10'], slug: 'maly-sokhon' },
    { name: 'James Liu', agency: 'Independent', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', score: 88, responseRate: 92, avgResponse: '25m', listings: 15, badges: ['quality', 'verified'], slug: 'james-liu' },
    { name: 'Lisa Nguyen', agency: 'CBRE Cambodia', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face', score: 86, responseRate: 90, avgResponse: '20m', listings: 22, badges: ['quality', 'verified'], slug: 'lisa-nguyen' },
    { name: 'Kosal Meng', agency: 'Knight Frank', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', score: 85, responseRate: 88, avgResponse: '30m', listings: 19, badges: ['verified'], slug: 'kosal-meng' },
];

const badgeCfg: Record<string, { icon: any; label: string; color: string }> = {
    lightning: { icon: Zap, label: 'Lightning', color: 'var(--color-warn-500)' },
    quality: { icon: Star, label: 'Quality', color: 'var(--color-fresh-500)' },
    verified: { icon: Shield, label: 'Verified', color: 'var(--color-brand-500)' },
    top10: { icon: Award, label: 'Top 10', color: 'var(--color-danger-500)' },
};

export default function AgentsPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Verified Agents</h1>
                    <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>Every agent is NestScore-rated. Transparency is our standard.</p>
                </motion.div>

                <div className="max-w-xl mx-auto mb-10 glass-card flex items-center gap-3 px-4 py-2" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <Search className="w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                    <input type="text" placeholder="Search agents by name, agency, or language..." className="flex-1 bg-transparent border-none outline-none text-sm py-2" style={{ color: 'var(--color-surface-800)' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((a, i) => (
                        <motion.a key={a.slug} href={`/${locale}/agents/${a.slug}`} className="glass-card p-6 no-underline text-center relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}>#{i + 1}</div>
                            <div className="relative inline-block mb-3">
                                <div className="w-20 h-20 rounded-full bg-cover bg-center mx-auto" style={{ backgroundImage: `url(${a.avatar})`, border: '3px solid var(--color-brand-100)' }} />
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--color-brand-600)', color: 'white', fontSize: '10px', fontWeight: 700, border: '2px solid white' }}>{a.score}</div>
                            </div>
                            <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{a.name}</h3>
                            <p className="text-xs mb-3" style={{ color: 'var(--color-surface-500)' }}>{a.agency}</p>
                            <div className="flex justify-center gap-1.5 mb-4">
                                {a.badges.map(b => { const c = badgeCfg[b]; if (!c) return null; const I = c.icon; return <div key={b} className="w-6 h-6 rounded-full flex items-center justify-center" title={c.label} style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}><I className="w-3 h-3" style={{ color: c.color }} /></div>; })}
                            </div>
                            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl mb-3" style={{ background: 'var(--color-surface-50)' }}>
                                <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Response</div><div className="text-sm font-bold" style={{ color: 'var(--color-fresh-600)' }}>{a.responseRate}%</div></div>
                                <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Avg Reply</div><div className="text-sm font-bold">{a.avgResponse}</div></div>
                                <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Listings</div><div className="text-sm font-bold">{a.listings}</div></div>
                            </div>
                            <span className="text-sm font-semibold flex items-center justify-center gap-1" style={{ color: 'var(--color-brand-600)' }}>View Profile <ArrowRight className="w-3.5 h-3.5" /></span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
