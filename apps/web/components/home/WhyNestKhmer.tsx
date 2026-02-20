'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, RefreshCw, Eye, Languages } from 'lucide-react';

const truths = [
    {
        icon: RefreshCw,
        titleKey: 'truth1Title',
        descKey: 'truth1Desc',
        gradient: 'linear-gradient(135deg, var(--color-fresh-50), var(--color-fresh-100))',
        iconColor: 'var(--color-fresh-600)',
        borderColor: 'var(--color-fresh-200)',
    },
    {
        icon: Clock,
        titleKey: 'truth2Title',
        descKey: 'truth2Desc',
        gradient: 'linear-gradient(135deg, var(--color-brand-50), var(--color-brand-100))',
        iconColor: 'var(--color-brand-600)',
        borderColor: 'var(--color-brand-200)',
    },
    {
        icon: Eye,
        titleKey: 'truth3Title',
        descKey: 'truth3Desc',
        gradient: 'linear-gradient(135deg, rgba(251,191,36,0.05), rgba(251,191,36,0.1))',
        iconColor: 'var(--color-warn-600)',
        borderColor: 'var(--color-warn-400)',
    },
    {
        icon: Languages,
        titleKey: 'truth4Title',
        descKey: 'truth4Desc',
        gradient: 'linear-gradient(135deg, var(--color-surface-50), var(--color-surface-100))',
        iconColor: 'var(--color-surface-700)',
        borderColor: 'var(--color-surface-200)',
    },
];

export function WhyNestKhmer() {
    const t = useTranslations('why');

    return (
        <section className="py-20 md:py-28">
            <div className="section-container">
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

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {truths.map((truth, i) => {
                        const Icon = truth.icon;
                        return (
                            <motion.div
                                key={truth.titleKey}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 rounded-2xl transition-all"
                                style={{
                                    background: truth.gradient,
                                    border: `1px solid ${truth.borderColor}`,
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{
                                        background: `${truth.iconColor}12`,
                                        border: `1px solid ${truth.iconColor}20`,
                                    }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: truth.iconColor }} />
                                </div>
                                <h3
                                    className="text-lg font-bold mb-2"
                                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}
                                >
                                    {t(truth.titleKey as any)}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: 'var(--color-surface-600)' }}
                                >
                                    {t(truth.descKey as any)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
