'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
    const t = useTranslations('hero');
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden hero-gradient grid-pattern">
            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 right-[15%] w-72 h-72 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(139,79,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-32 left-[10%] w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
                animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="section-container relative z-10 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                        style={{
                            background: 'rgba(139, 79, 255, 0.08)',
                            border: '1px solid rgba(139, 79, 255, 0.15)',
                        }}
                    >
                        <Sparkles className="w-4 h-4" style={{ color: 'var(--color-brand-500)' }} />
                        <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--color-brand-700)', fontFamily: 'var(--font-body)' }}
                        >
                            Cambodia&apos;s Rental Intelligence Platform
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            color: 'var(--color-surface-900)',
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        {t('headline')}
                        <br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, var(--color-brand-600), var(--color-brand-400))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {t('headlineAccent')}
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
                        style={{
                            color: 'var(--color-surface-500)',
                            lineHeight: 1.7,
                            fontFamily: 'var(--font-body)',
                        }}
                    >
                        {t('sub')}
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-2xl mx-auto mb-8"
                    >
                        <div
                            className="glass-card flex items-center gap-3 px-5 py-3"
                            style={{
                                borderRadius: 'var(--radius-2xl)',
                                boxShadow: 'var(--shadow-glass), 0 0 0 1px rgba(139,79,255,0.08)',
                            }}
                        >
                            <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-surface-400)' }} />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                className="flex-1 py-2 bg-transparent border-none outline-none text-base"
                                style={{
                                    color: 'var(--color-surface-800)',
                                    fontFamily: 'var(--font-body)',
                                }}
                            />
                            <button
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                style={{
                                    background: 'var(--color-brand-600)',
                                    color: 'white',
                                    fontFamily: 'var(--font-heading)',
                                    boxShadow: '0 4px 16px rgba(139, 79, 255, 0.3)',
                                }}
                            >
                                <Search className="w-4 h-4" />
                                {t('ctaPrimary')}
                            </button>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <a
                            href={`/${locale}/for-agents`}
                            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium no-underline transition-all"
                            style={{
                                border: '1px solid var(--color-surface-200)',
                                color: 'var(--color-surface-700)',
                                fontFamily: 'var(--font-body)',
                            }}
                        >
                            {t('ctaSecondary')}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    {/* Trust Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-8 mt-16"
                    >
                        {[
                            { value: '2,400+', label: 'Live Listings' },
                            { value: '340+', label: 'Verified Agents' },
                            { value: '12', label: 'Districts' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div
                                    className="text-2xl font-bold"
                                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-xs mt-1" style={{ color: 'var(--color-surface-400)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, var(--color-surface-0), transparent)',
                }}
            />
        </section>
    );
}
