'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ExternalLink, Megaphone } from 'lucide-react';
import { type AdZone, AD_DIMENSIONS, getAdForZone, trackAdImpression, trackAdClick } from '@/lib/ad-data';

interface AdSlotProps {
    zone: AdZone;
    className?: string;
}

export function AdSlot({ zone, className = '' }: AdSlotProps) {
    const ad = getAdForZone(zone);
    const dim = AD_DIMENSIONS[zone];
    const tracked = useRef(false);
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const [hovered, setHovered] = useState(false);

    // Track impression on mount
    useEffect(() => {
        if (ad && !tracked.current) {
            trackAdImpression(ad.id, zone);
            tracked.current = true;
        }
    }, [ad, zone]);

    const handleClick = () => {
        if (ad) trackAdClick(ad.id, zone);
    };

    // Determine if leaderboard (horizontal) or rectangle/skyscraper
    const isLeaderboard = dim.width >= 728;
    const isSkyscraper = dim.height >= 600;

    // Fallback: no ad booked — show "Advertise here"
    if (!ad) {
        return (
            <div className={`relative mx-auto ${className}`} style={{ maxWidth: dim.width, width: '100%' }}>
                <a
                    href={`/${locale}/advertise`}
                    className="block no-underline rounded-xl overflow-hidden transition-all"
                    style={{
                        aspectRatio: `${dim.width}/${dim.height}`,
                        border: '2px dashed var(--color-surface-200)',
                        background: 'var(--color-surface-50)',
                    }}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                        <Megaphone className="w-5 h-5" style={{ color: 'var(--color-surface-400)' }} />
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-surface-500)' }}>
                            Advertise Here
                        </span>
                        <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>
                            {dim.label}
                        </span>
                    </div>
                </a>
            </div>
        );
    }

    return (
        <div
            className={`relative mx-auto ${className}`}
            style={{ maxWidth: dim.width, width: '100%' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Sponsored label */}
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--color-surface-400)' }}>
                    Sponsored
                </span>
                <span className="text-[10px]" style={{ color: 'var(--color-surface-300)' }}>
                    {dim.label}
                </span>
            </div>

            <a
                href={ad.linkUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={handleClick}
                className="block no-underline rounded-xl overflow-hidden transition-all"
                style={{
                    boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
                    transform: hovered ? 'translateY(-1px)' : 'none',
                    border: '1px solid var(--color-surface-100)',
                }}
            >
                {/* Leaderboard layout (horizontal) */}
                {isLeaderboard && (
                    <div
                        className="relative flex items-center"
                        style={{
                            aspectRatio: `${dim.width}/${dim.height}`,
                            background: 'linear-gradient(135deg, var(--color-surface-950) 0%, var(--color-surface-800) 100%)',
                        }}
                    >
                        {/* Background image */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `url(${ad.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div className="relative z-10 flex items-center justify-between w-full px-6 py-3">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                                    style={{ background: 'var(--color-brand-600)', color: 'white' }}
                                >
                                    {ad.advertiser[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white leading-tight">{ad.title}</p>
                                    <p className="text-xs text-white/60 leading-tight mt-0.5">{ad.description}</p>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold flex-shrink-0 transition-colors"
                                style={{
                                    background: hovered ? 'var(--color-brand-500)' : 'var(--color-brand-600)',
                                    color: 'white',
                                }}
                            >
                                {ad.cta}
                                <ExternalLink className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Medium Rectangle layout (300x250) */}
                {!isLeaderboard && !isSkyscraper && (
                    <div style={{ aspectRatio: `${dim.width}/${dim.height}` }}>
                        <div className="relative w-full h-full flex flex-col">
                            {/* Image top half */}
                            <div
                                className="flex-1 relative"
                                style={{
                                    backgroundImage: `url(${ad.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div
                                    className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                                    style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}
                                >
                                    {ad.advertiser}
                                </div>
                            </div>
                            {/* Content bottom half */}
                            <div className="p-3" style={{ background: 'white' }}>
                                <p className="text-sm font-bold leading-tight mb-1" style={{ color: 'var(--color-surface-900)' }}>
                                    {ad.title}
                                </p>
                                <p className="text-xs leading-tight mb-2" style={{ color: 'var(--color-surface-500)' }}>
                                    {ad.description}
                                </p>
                                <div
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold"
                                    style={{ background: 'var(--color-brand-600)', color: 'white' }}
                                >
                                    {ad.cta}
                                    <ExternalLink className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Wide Skyscraper layout (160x600) */}
                {isSkyscraper && (
                    <div style={{ aspectRatio: `${dim.width}/${dim.height}` }}>
                        <div className="relative w-full h-full flex flex-col">
                            {/* Image top portion */}
                            <div
                                className="h-[45%] relative"
                                style={{
                                    backgroundImage: `url(${ad.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, white 100%)' }} />
                            </div>
                            {/* Content */}
                            <div className="flex-1 p-3 flex flex-col justify-between" style={{ background: 'white' }}>
                                <div>
                                    <div
                                        className="text-[9px] font-bold uppercase tracking-wider mb-2"
                                        style={{ color: 'var(--color-surface-400)' }}
                                    >
                                        {ad.advertiser}
                                    </div>
                                    <p className="text-sm font-bold leading-tight mb-2" style={{ color: 'var(--color-surface-900)' }}>
                                        {ad.title}
                                    </p>
                                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-surface-500)' }}>
                                        {ad.description}
                                    </p>
                                </div>
                                <div
                                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-bold w-full"
                                    style={{ background: 'var(--color-brand-600)', color: 'white' }}
                                >
                                    {ad.cta}
                                    <ExternalLink className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </a>
        </div>
    );
}
