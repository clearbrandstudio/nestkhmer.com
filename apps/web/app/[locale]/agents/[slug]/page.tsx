'use client';
import { motion } from 'framer-motion';
import { ListingCard } from '@/components/home/ListingCard';
import { Shield, Star, Zap, Award, Phone, Mail, Send, ChevronLeft, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

const agent = { name: 'Sophea Chan', agency: 'IPS Cambodia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', score: 96, responseRate: 98, avgResponse: '12 min', listings: 24, leadsConverted: 156, badges: ['lightning', 'quality', 'verified', 'top10'], languages: ['English', 'Khmer', 'Mandarin'], telegram: 'sopheachan', phone: '+85512345678', email: 'sophea@ipscambodia.com', bio: 'With over 8 years of experience in Cambodia real estate, I specialize in premium residential properties in BKK1 and Toul Kork. My clients appreciate my deep local knowledge, responsive communication style, and ability to find the perfect match between tenant needs and property features.' };
const agentListings = [
    { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop', title: 'Modern Studio with Mekong View', district: 'BKK1', price: 650, bedrooms: 1, bathrooms: 1, size: 45, floor: 12, daysOld: 1, agentScore: 96 },
    { image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop', title: 'Spacious 2-Bed near Street 308', district: 'BKK1', price: 950, bedrooms: 2, bathrooms: 2, size: 78, floor: 5, daysOld: 3, agentScore: 96 },
    { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop', title: 'Luxury Apartment at The Peak', district: 'BKK1', price: 1800, bedrooms: 3, bathrooms: 2, size: 130, floor: 18, daysOld: 0, agentScore: 96 },
];

const badgeCfg: Record<string, any> = { lightning: { icon: Zap, label: 'Lightning Responder', color: 'var(--color-warn-500)' }, quality: { icon: Star, label: 'Quality Lister', color: 'var(--color-fresh-500)' }, verified: { icon: Shield, label: 'Verified Pro', color: 'var(--color-brand-500)' }, top10: { icon: Award, label: 'Top 10', color: 'var(--color-danger-500)' } };

export default function AgentProfilePage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-24">
                <a href={`/${locale}/agents`} className="flex items-center gap-1 text-sm no-underline mb-6" style={{ color: 'var(--color-brand-600)' }}><ChevronLeft className="w-4 h-4" /> All Agents</a>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 text-center sticky top-24" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="relative inline-block mb-4">
                                <div className="w-28 h-28 rounded-full bg-cover bg-center mx-auto" style={{ backgroundImage: `url(${agent.avatar})`, border: '4px solid var(--color-brand-100)' }} />
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full flex items-center gap-1" style={{ background: 'var(--color-brand-600)', color: 'white', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}><Shield className="w-3 h-3" />{agent.score}</div>
                            </div>
                            <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{agent.name}</h1>
                            <p className="text-sm mb-3" style={{ color: 'var(--color-surface-500)' }}>{agent.agency}</p>
                            <div className="flex justify-center gap-1.5 mb-4">
                                {agent.badges.map(b => { const c = badgeCfg[b]; const I = c.icon; return <div key={b} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${c.color}12`, color: c.color, border: `1px solid ${c.color}25` }}><I className="w-3 h-3" />{c.label}</div>; })}
                            </div>
                            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl mb-4" style={{ background: 'var(--color-surface-50)' }}>
                                <div><div className="text-lg font-bold" style={{ color: 'var(--color-fresh-600)' }}>{agent.responseRate}%</div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>Response</div></div>
                                <div><div className="text-lg font-bold">{agent.avgResponse}</div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>Avg Reply</div></div>
                                <div><div className="text-lg font-bold">{agent.leadsConverted}</div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>Converted</div></div>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 mb-4"><Globe className="w-3.5 h-3.5" style={{ color: 'var(--color-surface-400)' }} /><span className="text-xs" style={{ color: 'var(--color-surface-500)' }}>{agent.languages.join(', ')}</span></div>
                            <div className="space-y-2.5">
                                <a href={`mailto:${agent.email}`} className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 no-underline" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Mail className="w-4 h-4" />Message</a>
                                <a href={`tel:${agent.phone}`} className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 no-underline" style={{ background: 'var(--color-fresh-600)', color: 'white' }}><Phone className="w-4 h-4" />Call</a>
                                <a href={`https://t.me/${agent.telegram}`} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 no-underline" style={{ background: '#0088cc', color: 'white' }}><Send className="w-4 h-4" />Telegram</a>
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>About</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>{agent.bio}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Active Listings ({agent.listings})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {agentListings.map((l, i) => <motion.div key={l.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><ListingCard {...l} /></motion.div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
