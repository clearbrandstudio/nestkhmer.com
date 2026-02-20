'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Star, Zap, Award, ArrowRight } from 'lucide-react';

interface AgentData {
    name: string;
    agency: string;
    avatar: string;
    nestScore: number;
    responseRate: number;
    avgResponseMin: number;
    activeListings: number;
    badges: string[];
}

const mockAgents: AgentData[] = [
    {
        name: 'Sophea Chan',
        agency: 'IPS Cambodia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        nestScore: 96,
        responseRate: 98,
        avgResponseMin: 12,
        activeListings: 24,
        badges: ['lightning', 'quality', 'verified', 'top10'],
    },
    {
        name: 'David Park',
        agency: 'ERA Cambodia',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        nestScore: 93,
        responseRate: 95,
        avgResponseMin: 18,
        activeListings: 31,
        badges: ['lightning', 'quality', 'verified'],
    },
    {
        name: 'Maly Sokhon',
        agency: 'Huttons KH',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        nestScore: 91,
        responseRate: 97,
        avgResponseMin: 8,
        activeListings: 18,
        badges: ['lightning', 'verified', 'top10'],
    },
    {
        name: 'James Liu',
        agency: 'Independent',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
        nestScore: 88,
        responseRate: 92,
        avgResponseMin: 25,
        activeListings: 15,
        badges: ['quality', 'verified'],
    },
];

const badgeConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
    lightning: { icon: Zap, label: 'Lightning Responder', color: 'var(--color-warn-500)' },
    quality: { icon: Star, label: 'Quality Lister', color: 'var(--color-fresh-500)' },
    verified: { icon: Shield, label: 'Verified Pro', color: 'var(--color-brand-500)' },
    top10: { icon: Award, label: 'Top 10', color: 'var(--color-danger-500)' },
};

function AgentCard({ agent, index }: { agent: AgentData; index: number }) {
    const t = useTranslations('agents');

    return (
        <motion.div
            className="glass-card p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
        >
            {/* Rank */}
            <div
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                    background: 'var(--color-brand-600)',
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: '0 4px 12px rgba(139, 79, 255, 0.3)',
                }}
            >
                #{index + 1}
            </div>

            {/* Avatar */}
            <div className="relative mb-4">
                <div
                    className="w-20 h-20 rounded-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${agent.avatar})`,
                        border: '3px solid var(--color-brand-100)',
                    }}
                />
                <div
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                        background: 'var(--color-brand-600)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        border: '2px solid white',
                    }}
                >
                    {agent.nestScore}
                </div>
            </div>

            {/* Name */}
            <h3
                className="text-base font-semibold mb-0.5"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}
            >
                {agent.name}
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--color-surface-500)' }}>
                {agent.agency}
            </p>

            {/* Badges */}
            <div className="flex items-center gap-1.5 mb-4">
                {agent.badges.map((badge) => {
                    const cfg = badgeConfig[badge];
                    if (!cfg) return null;
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={badge}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            title={cfg.label}
                            style={{
                                background: `${cfg.color}15`,
                                border: `1px solid ${cfg.color}30`,
                            }}
                        >
                            <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                        </div>
                    );
                })}
            </div>

            {/* Stats */}
            <div
                className="w-full grid grid-cols-3 gap-2 p-3 rounded-xl mb-4"
                style={{ background: 'var(--color-surface-50)' }}
            >
                <div>
                    <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>
                        {t('responseRate')}
                    </div>
                    <div
                        className="text-sm font-bold mt-0.5"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-fresh-600)' }}
                    >
                        {agent.responseRate}%
                    </div>
                </div>
                <div>
                    <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>
                        {t('avgResponse')}
                    </div>
                    <div
                        className="text-sm font-bold mt-0.5"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-800)' }}
                    >
                        {agent.avgResponseMin}m
                    </div>
                </div>
                <div>
                    <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>
                        {t('activeListings')}
                    </div>
                    <div
                        className="text-sm font-bold mt-0.5"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-800)' }}
                    >
                        {agent.activeListings}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <a
                href="#"
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-center no-underline transition-all block"
                style={{
                    border: '1px solid var(--color-surface-200)',
                    color: 'var(--color-surface-700)',
                    fontFamily: 'var(--font-heading)',
                }}
            >
                {t('viewProfile')}
            </a>
        </motion.div>
    );
}

export function TopAgents() {
    const t = useTranslations('agents');

    return (
        <section
            className="py-14 md:py-20 relative overflow-hidden"
            style={{ background: 'var(--color-surface-50)' }}
        >
            {/* Background decoration */}
            <div
                className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(139,79,255,0.06) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2
                        className="text-3xl md:text-4xl mb-4"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}
                    >
                        {t('title')}
                    </h2>
                    <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockAgents.map((agent, i) => (
                        <AgentCard key={agent.name} agent={agent} index={i} />
                    ))}
                </div>

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm font-semibold no-underline"
                        style={{ color: 'var(--color-brand-600)', fontFamily: 'var(--font-heading)' }}
                    >
                        {t('viewAll')}
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
