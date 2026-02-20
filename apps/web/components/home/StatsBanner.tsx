'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, Users, MapPin, Clock } from 'lucide-react';

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
}

const stats = [
    {
        icon: Home,
        value: 2400,
        suffix: '+',
        labelKey: 'activeListings',
        color: 'var(--color-brand-600)',
        bg: 'var(--color-brand-50)',
    },
    {
        icon: Users,
        value: 340,
        suffix: '+',
        labelKey: 'verifiedAgents',
        color: 'var(--color-fresh-600)',
        bg: 'var(--color-fresh-50)',
    },
    {
        icon: MapPin,
        value: 12,
        suffix: '',
        labelKey: 'districtsServed',
        color: 'var(--color-warn-600)',
        bg: 'rgba(251,191,36,0.06)',
    },
    {
        icon: Clock,
        value: 18,
        suffix: 'min',
        labelKey: 'avgResponseTime',
        color: 'var(--color-surface-700)',
        bg: 'var(--color-surface-100)',
    },
];

export function StatsBanner() {
    const t = useTranslations('stats');

    return (
        <section
            className="py-16 relative overflow-hidden"
            style={{
                background: 'var(--color-surface-950)',
            }}
        >
            {/* Glow decorations */}
            <div
                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(139,79,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                className="absolute top-1/2 right-1/4 -translate-y-1/2 w-60 h-60 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.labelKey}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                                    style={{ background: `${stat.color}15` }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                </div>
                                <div
                                    className="text-3xl md:text-4xl font-bold mb-2"
                                    style={{ fontFamily: 'var(--font-heading)', color: 'white' }}
                                >
                                    <AnimatedCounter end={stat.value} />
                                    <span>{stat.suffix}</span>
                                </div>
                                <div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>
                                    {t(stat.labelKey as any)}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
