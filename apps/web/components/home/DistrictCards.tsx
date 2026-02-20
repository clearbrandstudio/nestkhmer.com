'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Home as HomeIcon, Maximize } from 'lucide-react';

interface DistrictData {
    name: string;
    nameKm?: string;
    image: string;
    medianRent: number;
    newThisWeek: number;
    avgSize: number;
    slug: string;
    height?: string;
}

const districts: DistrictData[] = [
    {
        name: 'BKK1',
        nameKm: 'បឹងកេងកង១',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=800&fit=crop',
        medianRent: 850,
        newThisWeek: 34,
        avgSize: 65,
        slug: 'bkk1',
        height: '420px',
    },
    {
        name: 'Toul Kork',
        nameKm: 'ទួលគោក',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop',
        medianRent: 550,
        newThisWeek: 28,
        avgSize: 72,
        slug: 'toul-kork',
        height: '380px',
    },
    {
        name: 'Daun Penh',
        nameKm: 'ដូនពេញ',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop',
        medianRent: 700,
        newThisWeek: 19,
        avgSize: 55,
        slug: 'daun-penh',
        height: '450px',
    },
    {
        name: 'Koh Pich',
        nameKm: 'កោះពេជ្រ',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop',
        medianRent: 1200,
        newThisWeek: 12,
        avgSize: 95,
        slug: 'koh-pich',
        height: '400px',
    },
    {
        name: 'Toul Tom Poung',
        nameKm: 'ទួលទំពូង',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=800&fit=crop',
        medianRent: 450,
        newThisWeek: 22,
        avgSize: 48,
        slug: 'toul-tom-poung',
        height: '370px',
    },
    {
        name: 'Sen Sok',
        nameKm: 'សែនសុខ',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=800&fit=crop',
        medianRent: 400,
        newThisWeek: 31,
        avgSize: 85,
        slug: 'sen-sok',
        height: '430px',
    },
];

function DistrictCard({ district }: { district: DistrictData }) {
    const t = useTranslations('districts');
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className="tilt-card cursor-pointer relative overflow-hidden"
            style={{
                height: district.height || '400px',
                borderRadius: 'var(--radius-xl)',
                perspective: '1000px',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full relative"
                style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateX: tilt.rotateX,
                    rotateY: tilt.rotateY,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{
                        backgroundImage: `url(${district.image})`,
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="glass-overlay absolute inset-0" />

                {/* Inner Glow on Hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        borderRadius: 'var(--radius-xl)',
                        boxShadow: 'inset 0 0 40px rgba(139, 79, 255, 0.15)',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3
                        className="text-2xl font-bold text-white mb-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {district.name}
                    </h3>
                    {district.nameKm && (
                        <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            {district.nameKm}
                        </p>
                    )}

                    {/* Stats Panel — slides up on hover */}
                    <motion.div
                        className="rounded-xl p-4"
                        style={{
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div>
                                <div className="flex items-center gap-1 mb-1">
                                    <TrendingUp className="w-3 h-3 text-white/60" />
                                    <span className="text-[10px] text-white/60 uppercase tracking-wider">
                                        {t('medianRent')}
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                    ${district.medianRent}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-1">
                                    <HomeIcon className="w-3 h-3 text-white/60" />
                                    <span className="text-[10px] text-white/60 uppercase tracking-wider">
                                        {t('newThisWeek')}
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {district.newThisWeek}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-1">
                                    <Maximize className="w-3 h-3 text-white/60" />
                                    <span className="text-[10px] text-white/60 uppercase tracking-wider">
                                        {t('avgSize')}
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {district.avgSize}m²
                                </span>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold no-underline transition-all"
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontFamily: 'var(--font-heading)',
                            }}
                        >
                            {t('explore', { district: district.name })}
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function DistrictCards() {
    const t = useTranslations('districts');

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

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {districts.map((district, i) => (
                        <motion.div
                            key={district.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="break-inside-avoid"
                        >
                            <DistrictCard district={district} />
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
