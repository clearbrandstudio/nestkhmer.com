'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MapPin, Bed, Bath, Maximize, Building, Calendar, Plug, Droplets, PawPrint, Car, Wifi, Phone, Mail, Send, ChevronLeft, Share2, X, ChevronRight as ChevronRightIcon, Eye, MousePointerClick, Grid3X3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { AdSlot } from '@/components/ads/AdSlot';
import MapWrapper from '@/components/map/MapWrapper';

const listing = {
    title: 'Modern Studio with Mekong View',
    district: 'BKK1, Phnom Penh',
    address: 'Street 308, Sangkat BKK 1, Khan Chamkarmon',
    price: 650,
    deposit: 2,
    leaseTerm: '12 months',
    size: 45,
    bedrooms: 1,
    bathrooms: 1,
    floor: 12,
    yearBuilt: 2022,
    furnishing: 'Fully Furnished',
    petPolicy: 'Negotiable',
    electricRate: 0.25,
    waterRate: 0.85,
    internet: true,
    parking: 'Yes',
    description: 'A beautifully appointed modern studio apartment offering breathtaking views of the Mekong River. Located on the 12th floor of a premium residential building in the heart of BKK1, this unit features floor-to-ceiling windows, a fully equipped kitchen with modern appliances, and a spacious bathroom with rain shower. The building offers 24/7 security, a rooftop infinity pool, a fully equipped gym, and a resident lounge. Walking distance to cafes, restaurants, co-working spaces, and the Riverside promenade.',
    images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=700&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
    ],
    googleMapsUrl: 'https://maps.app.goo.gl/example', // Mock property to trigger map rendering
    amenities: [
        { icon: Wifi, label: 'High-Speed WiFi' },
    ],
    agent: {
        name: 'Sophea Chan',
        agency: 'NestKhmer Exclusive',
        score: 92,
        responseRate: 98,
        avgResponse: '12 min',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        telegram: 'sopheachan',
        phone: '+85512345678',
    },
    daysOld: 1,
    stats: { views: 1247, messageClicks: 89, callClicks: 34, telegramClicks: 156 },
};

/* ─── Click Tracker ─── */
function trackClick(listingId: string, action: 'message' | 'call' | 'telegram') {
    // In production, this would send to analytics API
    const key = `nestkhmer_clicks_${listingId}`;
    const existing = JSON.parse(localStorage.getItem(key) || '{}');
    existing[action] = (existing[action] || 0) + 1;
    existing.lastClick = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(existing));
    console.log(`[NestKhmer Analytics] ${action} click tracked for listing: ${listingId}`);
}

/* ─── Lightbox Component ─── */
function ImageLightbox({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) {
    const [index, setIndex] = useState(initialIndex);

    const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, prev, next]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.92)' }} onClick={onClose}>
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full z-10" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}><X className="w-6 h-6" /></button>
            <div className="absolute top-6 left-6 text-sm font-medium z-10" style={{ color: 'rgba(255,255,255,0.7)' }}>{index + 1} / {images.length}</div>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 p-3 rounded-full z-10" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <ChevronLeft className="w-6 h-6" />
            </button>
            <AnimatePresence mode="wait">
                <motion.img key={index} src={images[index].replace(/w=\d+&h=\d+/, 'w=1600&h=1000')} alt={`Photo ${index + 1}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
            </AnimatePresence>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 p-3 rounded-full z-10" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <ChevronRightIcon className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((img, i) => (
                    <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }} className="w-16 h-11 rounded-md bg-cover bg-center transition-all" style={{ backgroundImage: `url(${img})`, opacity: i === index ? 1 : 0.4, border: i === index ? '2px solid white' : '2px solid transparent' }} />
                ))}
            </div>
        </motion.div>
    );
}

export default function ListingDetailPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const listingSlug = pathname.split('/').pop() || 'listing';

    return (
        <div className="min-h-screen pt-[100px]" style={{ background: 'var(--color-surface-50)' }}>
            {/* Back Nav */}
            <div className="section-container pb-4 flex items-center justify-between">
                <a href={`/${locale}/listings`} className="flex items-center gap-1 text-sm font-medium no-underline hover:opacity-80 transition-opacity" style={{ color: 'var(--color-brand-600)' }}>
                    <ChevronLeft className="w-4 h-4" /> Back to listings
                </a>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-surface-200 transition-colors" style={{ border: '1px solid var(--color-surface-300)', color: 'var(--color-surface-700)' }}>
                    <Share2 className="w-3.5 h-3.5" /> Share
                </button>
            </div>

            {/* Modern Image Gallery (Airbnb Style) */}
            <div className="section-container mb-10 pt-4">
                <div className="relative rounded-2xl overflow-hidden shadow-sm" style={{ height: '500px' }}>

                    {/* Desktop 5-Grid View */}
                    <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-full">
                        <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setLightboxIndex(0)}>
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${listing.images[0]})` }} />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                        {listing.images.slice(1, 5).map((img, i) => (
                            <div key={i} className="relative group cursor-pointer overflow-hidden" onClick={() => setLightboxIndex(i + 1)}>
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${img})` }} />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Single View */}
                    <div className="md:hidden h-full relative" onClick={() => setLightboxIndex(0)}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${listing.images[0]})` }} />
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5">
                            <Maximize className="w-3.5 h-3.5" /> 1 / {listing.images.length}
                        </div>
                    </div>

                    {/* Show All Photos Button */}
                    <button
                        onClick={() => setLightboxIndex(0)}
                        className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md hover:bg-white text-surface-900 border border-surface-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 z-10 hidden md:flex"
                    >
                        <Grid3X3 className="w-4 h-4" /> Show all photos
                    </button>

                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && <ImageLightbox images={listing.images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
            </AnimatePresence>

            <div className="section-container pb-32 overflow-x-hidden">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="badge-fresh inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">Fresh Today</span>
                                <span className="text-sm" style={{ color: 'var(--color-surface-400)' }}>Listed {listing.daysOld} day ago</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words" style={{ fontFamily: 'var(--font-heading)' }}>{listing.title}</h1>
                            <div className="flex items-start gap-1.5 text-sm" style={{ color: 'var(--color-surface-500)' }}>
                                <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> <span className="flex-1 break-words">{listing.address}</span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>${listing.price}</span>
                                <span style={{ color: 'var(--color-surface-400)' }}>/month</span>
                            </div>
                        </motion.div>

                        {/* Specs Grid */}
                        <div className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: Bed, label: 'Bedrooms', value: listing.bedrooms },
                                    { icon: Bath, label: 'Bathrooms', value: listing.bathrooms },
                                    { icon: Maximize, label: 'Size', value: `${listing.size} sqm` },
                                    { icon: Building, label: 'Floor', value: listing.floor },
                                    { icon: Calendar, label: 'Year Built', value: listing.yearBuilt },
                                    { icon: Plug, label: 'Electric', value: `$${listing.electricRate}/kWh` },
                                    { icon: Droplets, label: 'Water', value: `$${listing.waterRate}/m³` },
                                    { icon: PawPrint, label: 'Pets', value: listing.petPolicy },
                                    { icon: Car, label: 'Parking', value: listing.parking },
                                    { icon: Wifi, label: 'Internet', value: listing.internet ? 'Included' : 'No' },
                                ].map(spec => {
                                    const Icon = spec.icon;
                                    return (
                                        <div key={spec.label} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                            <Icon className="w-4 h-4" style={{ color: 'var(--color-brand-500)' }} />
                                            <div>
                                                <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{spec.label}</div>
                                                <div className="text-sm font-semibold" style={{ color: 'var(--color-surface-800)' }}>{spec.value}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Description</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>{listing.description}</p>
                        </div>

                        {/* Terms */}
                        <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Rental Terms</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div><span className="text-xs block" style={{ color: 'var(--color-surface-400)' }}>Deposit</span><span className="text-sm font-semibold">{listing.deposit} months</span></div>
                                <div><span className="text-xs block" style={{ color: 'var(--color-surface-400)' }}>Lease Term</span><span className="text-sm font-semibold">{listing.leaseTerm}</span></div>
                                <div><span className="text-xs block" style={{ color: 'var(--color-surface-400)' }}>Furnishing</span><span className="text-sm font-semibold">{listing.furnishing}</span></div>
                            </div>
                        </div>

                        {/* Location Details (Caffeine Compass Style) - Conditionally Rendered */}
                        {listing.googleMapsUrl && (
                            <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                                    <div>
                                        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Neighborhood & Landmarks</h2>
                                        <p className="text-sm mt-1" style={{ color: 'var(--color-surface-600)' }}>Interactive map of <span className="font-semibold">{listing.district}</span></p>
                                    </div>
                                    <div className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider items-center gap-1.5 shadow-sm" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-700)' }}>
                                        <MapPin className="w-3.5 h-3.5" /> Explore Area
                                    </div>
                                </div>

                                <div className="mb-6 h-[400px]">
                                    <MapWrapper listing={listing} />
                                </div>

                                {/* Distances to Landmarks */}
                                <h3 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--color-surface-400)' }}>Nearby Landmarks</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { name: 'Independence Monument', distance: '1.2 km', time: '5 min drive' },
                                        { name: 'Riverside Walk', distance: '2.5 km', time: '10 min drive' },
                                        { name: 'Aeon Mall 1', distance: '1.5 km', time: '8 min drive' },
                                        { name: 'Norea Garden', distance: '3.0 km', time: '12 min drive' }
                                    ].map(landmark => (
                                        <div key={landmark.name} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-surface-200 transition-colors" style={{ background: 'var(--color-surface-50)' }}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold truncate max-w-[120px]" style={{ color: 'var(--color-surface-800)' }} title={landmark.name}>{landmark.name}</span>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-sm font-bold" style={{ color: 'var(--color-brand-600)' }}>{landmark.distance}</div>
                                                <div className="text-[10px] uppercase font-semibold tracking-wide mt-0.5" style={{ color: 'var(--color-surface-400)' }}>{landmark.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Listing Stats — Value Showcase */}
                        <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Listing Performance</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: Eye, label: 'Views', value: listing.stats.views.toLocaleString(), color: 'var(--color-brand-600)' },
                                    { icon: Mail, label: 'Messages', value: listing.stats.messageClicks.toString(), color: 'var(--color-brand-500)' },
                                    { icon: Phone, label: 'Calls', value: listing.stats.callClicks.toString(), color: 'var(--color-fresh-600)' },
                                    { icon: Send, label: 'Telegram', value: listing.stats.telegramClicks.toString(), color: '#0088cc' },
                                ].map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: 'var(--color-surface-50)' }}>
                                            <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
                                            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{s.value}</div>
                                            <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-xs mt-3 text-center" style={{ color: 'var(--color-surface-400)' }}>
                                <MousePointerClick className="w-3 h-3 inline mr-1" />
                                All contact clicks are tracked to measure listing effectiveness
                            </p>
                        </div>

                        {/* Bottom Ad */}
                        <div className="mt-6">
                            <AdSlot zone="listing-bottom" />
                        </div>
                    </div>

                    {/* Sidebar — Agent Card wrapper */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-[100px] w-full flex flex-col gap-6">
                            <div className="glass-card p-5 md:p-6 w-full" style={{ borderRadius: 'var(--radius-xl)' }}>
                                <a href={`/${locale}/agents/sophea-chan`} className="flex items-center gap-3 mb-4 no-underline">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${listing.agent.avatar})`, border: '2px solid var(--color-brand-100)' }} />
                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold truncate" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{listing.agent.name}</h3>
                                        <p className="text-xs truncate" style={{ color: 'var(--color-surface-500)' }}>{listing.agent.agency}</p>
                                    </div>
                                </a>

                                <div className="flex items-center justify-between md:gap-4 mb-5 p-3 rounded-lg w-full" style={{ background: 'var(--color-surface-50)' }}>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1"><Shield className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-500)' }} /><span className="text-sm font-bold" style={{ color: 'var(--color-brand-600)' }}>{listing.agent.score}</span></div>
                                        <span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>NestScore</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold" style={{ color: 'var(--color-fresh-600)' }}>{listing.agent.responseRate}%</span>
                                        <span className="text-[10px] block" style={{ color: 'var(--color-surface-400)' }}>Response</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold">{listing.agent.avgResponse}</span>
                                        <span className="text-[10px] block" style={{ color: 'var(--color-surface-400)' }}>Avg Reply</span>
                                    </div>
                                </div>

                                <div className="flex flex-col md:space-y-2.5 gap-2.5 md:gap-0 w-full overflow-hidden hidden md:flex">
                                    <a
                                        href={`mailto:agent@nestkhmer.com?subject=Inquiry: ${listing.title}`}
                                        onClick={() => trackClick(listingSlug, 'message')}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
                                        style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}
                                    >
                                        <Mail className="w-4 h-4" /> Send Message
                                    </a>
                                    <a
                                        href={`tel:${listing.agent.phone}`}
                                        onClick={() => trackClick(listingSlug, 'call')}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
                                        style={{ background: 'var(--color-fresh-600)', color: 'white', fontFamily: 'var(--font-heading)' }}
                                    >
                                        <Phone className="w-4 h-4" /> Call Agent
                                    </a>
                                    <a
                                        href={`https://t.me/${listing.agent.telegram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackClick(listingSlug, 'telegram')}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
                                        style={{ background: '#0088cc', color: 'white', fontFamily: 'var(--font-heading)' }}
                                    >
                                        <Send className="w-4 h-4" /> Telegram
                                    </a>
                                </div>

                                {/* Click stats mini-banner */}
                                <div className="mt-4 p-3 rounded-lg text-center hidden md:block" style={{ background: 'var(--color-brand-50)', border: '1px solid var(--color-brand-100)' }}>
                                    <div className="text-xs font-medium" style={{ color: 'var(--color-brand-700)' }}>
                                        <MousePointerClick className="w-3.5 h-3.5 inline mr-1" />
                                        {(listing.stats.messageClicks + listing.stats.callClicks + listing.stats.telegramClicks)} people contacted this agent
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Ad (Now moves WITH the card) */}
                            <div className="hidden lg:block w-full">
                                <AdSlot zone="listing-sidebar" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile CTA Bar (Premium Glassmorphism) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-surface-900/80 backdrop-blur-3xl border-t border-surface-200/50 dark:border-surface-700 p-4 pb-safe z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold text-surface-900 dark:text-white truncate tracking-tight transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                        ${listing.price}
                        <span className="text-sm text-surface-500 dark:text-surface-400 font-medium ml-1">/mo</span>
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mt-0.5 truncate">
                        {listing.daysOld === 0 ? '✨ Fresh Today' : `Listed ${listing.daysOld} days ago`}
                    </div>
                </div>
                <button
                    onClick={() => trackClick(listingSlug, 'message')}
                    className="flex-none bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_8px_20px_rgba(var(--color-brand-600-rgb),0.3)] transition-all duration-300 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)' }}
                >
                    <Mail className="w-5 h-5" />
                    <span className="whitespace-nowrap">Request Tour</span>
                </button>
            </div>
        </div>
    );
}
