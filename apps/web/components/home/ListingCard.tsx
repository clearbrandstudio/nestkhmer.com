'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface FreshnessBadgeProps {
    daysOld: number;
}

export function FreshnessBadge({ daysOld }: FreshnessBadgeProps) {
    let className = 'badge-fresh';
    let label = 'Fresh Today';

    if (daysOld === 0) {
        label = 'Fresh Today';
    } else if (daysOld <= 6) {
        label = `${daysOld}d ago`;
        className = 'badge-fresh';
    } else if (daysOld <= 12) {
        label = `${daysOld}d ago`;
        className = 'badge-aging';
    } else {
        label = `${daysOld}d ago`;
        className = 'badge-expiring';
    }

    return (
        <span
            className={`${className} inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold`}
        >
            {label}
        </span>
    );
}

export function NestScoreBadge({ score }: { score: number }) {
    return (
        <div className="nest-score">
            <Shield className="w-4 h-4" style={{ color: '#ffffff' }} />
            <span>{score}</span>
        </div>
    );
}

interface ListingCardProps {
    slug?: string;
    image: string;
    title: string;
    district: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    floor: number;
    daysOld: number;
    agentScore: number;
}

export function ListingCard({
    slug,
    image,
    title,
    district,
    price,
    bedrooms,
    bathrooms,
    size,
    floor,
    daysOld,
    agentScore,
}: ListingCardProps) {
    const t = useTranslations('featured');
    const locale = useLocale();
    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const href = `/${locale}/listings/${generatedSlug}`;

    return (
        <a href={href} className="block no-underline">
            <motion.div
                className="glass-card overflow-hidden cursor-pointer group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    {/* Badges */}
                    <div className="absolute top-3 right-3">
                        <FreshnessBadge daysOld={daysOld} />
                    </div>
                    <div className="absolute bottom-3 left-3">
                        <NestScoreBadge score={agentScore} />
                    </div>
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: 'linear-gradient(to top, rgba(15,23,42,0.3), transparent)',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                            className="text-base font-semibold line-clamp-1"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}
                        >
                            {title}
                        </h3>
                    </div>
                    <p
                        className="text-sm mb-3"
                        style={{ color: 'var(--color-surface-500)' }}
                    >
                        {district}
                    </p>

                    {/* Specs */}
                    <div className="flex items-center gap-3 mb-4">
                        {[
                            t('bedrooms', { count: bedrooms }),
                            t('bathrooms', { count: bathrooms }),
                            t('sqm', { count: size }),
                            t('floor', { count: floor }),
                        ].map((spec) => (
                            <span
                                key={spec}
                                className="text-xs px-2 py-1 rounded-md"
                                style={{
                                    background: 'var(--color-surface-50)',
                                    color: 'var(--color-surface-600)',
                                    border: '1px solid var(--color-surface-100)',
                                }}
                            >
                                {spec}
                            </span>
                        ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                        <span
                            className="text-xl font-bold"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}
                        >
                            ${price}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--color-surface-400)' }}>
                            {t('perMonth')}
                        </span>
                    </div>
                </div>
            </motion.div>
        </a>
    );
}
