'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ListingCard } from './ListingCard';
import { ArrowRight } from 'lucide-react';

const mockListings = [
    {
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop',
        title: 'Modern Studio with Mekong View',
        district: 'BKK1, Phnom Penh',
        price: 650,
        bedrooms: 1,
        bathrooms: 1,
        size: 45,
        floor: 12,
        daysOld: 1,
        agentScore: 92,
    },
    {
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
        title: 'Spacious 2-Bed in Toul Kork',
        district: 'Toul Kork, Phnom Penh',
        price: 850,
        bedrooms: 2,
        bathrooms: 2,
        size: 78,
        floor: 5,
        daysOld: 3,
        agentScore: 87,
    },
    {
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
        title: 'Luxury Penthouse on Diamond Island',
        district: 'Koh Pich, Phnom Penh',
        price: 2200,
        bedrooms: 3,
        bathrooms: 2,
        size: 145,
        floor: 28,
        daysOld: 0,
        agentScore: 95,
    },
    {
        image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop',
        title: 'Cozy Flat near Russian Market',
        district: 'Toul Tom Poung, Phnom Penh',
        price: 450,
        bedrooms: 1,
        bathrooms: 1,
        size: 38,
        floor: 3,
        daysOld: 8,
        agentScore: 78,
    },
    {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
        title: 'Family Villa with Garden',
        district: 'Sen Sok, Phnom Penh',
        price: 1500,
        bedrooms: 4,
        bathrooms: 3,
        size: 220,
        floor: 1,
        daysOld: 5,
        agentScore: 91,
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
        title: 'Riverside Apartment with Pool',
        district: 'Daun Penh, Phnom Penh',
        price: 1100,
        bedrooms: 2,
        bathrooms: 2,
        size: 95,
        floor: 8,
        daysOld: 12,
        agentScore: 84,
    },
];

export function FeaturedListings() {
    const t = useTranslations('featured');

    return (
        <section className="py-20 md:py-28" style={{ background: 'var(--color-surface-50)' }}>
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
                    <p
                        className="text-lg max-w-lg mx-auto"
                        style={{ color: 'var(--color-surface-500)' }}
                    >
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockListings.map((listing, i) => (
                        <motion.div
                            key={listing.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <ListingCard {...listing} />
                        </motion.div>
                    ))}
                </div>

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold no-underline transition-all"
                        style={{
                            background: 'var(--color-surface-900)',
                            color: 'white',
                            fontFamily: 'var(--font-heading)',
                        }}
                    >
                        {t('viewAll')}
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
