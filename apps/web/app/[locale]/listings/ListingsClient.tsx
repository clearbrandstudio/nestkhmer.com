'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ListingCard } from '@/components/home/ListingCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { Search, SlidersHorizontal, MapPin, Grid3X3, List, Map, X, Check, Home, Building, Building2, Wind, Dog, Car, Wifi, Shield } from 'lucide-react';
import { useState } from 'react';



const districtFilters = ['All Districts', 'BKK1', 'BKK2', 'Toul Kork', 'Toul Tom Poung', 'Daun Penh', 'Koh Pich', 'Sen Sok', 'Olympic', '7 Makara'];
const propertyTypes = ['All Types', 'Apartment', 'House', 'Villa', 'Condo', 'Studio'];

const amenities = [
    { id: 'ac', icon: Wind, label: 'AC' },
    { id: 'pets', icon: Dog, label: 'Pets OK' },
    { id: 'parking', icon: Car, label: 'Parking' },
    { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
    { id: 'security', icon: Shield, label: 'Security' }
];

export default function ListingsClient({ initialListings }: { initialListings: any[] }) {
    const allListings = initialListings;
    const t = useTranslations('featured');
    const [view, setView] = useState<'grid' | 'map'>('grid');
    const [showSidebar, setShowSidebar] = useState(false);

    // Filter States
    const [priceRange, setPriceRange] = useState([200, 5000]);
    const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});

    const toggleAmenity = (id: string) => setSelectedAmenities(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="min-h-screen flex flex-col pt-[80px]" style={{ background: 'var(--color-surface-50)' }}>

            {/* Cinematic Floating Control Panel (Bottom Center) */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-2xl p-2 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-white/50 flex items-center gap-2 dark:bg-surface-900/80 dark:border-surface-700"
            >
                <button onClick={() => setShowSidebar(true)} className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shadow-sm transition-all hover:shadow-lg hover:scale-[1.03] active:scale-95 bg-surface-900 text-white dark:bg-white dark:text-surface-900">
                    <Search className="w-4 h-4" />
                    <span>Search & Filters</span>
                </button>

                <div className="h-8 w-px bg-surface-200 mx-1"></div>

                <div className="flex items-center p-1 rounded-full bg-surface-100 dark:bg-surface-800">
                    <button onClick={() => setView('grid')} className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:-translate-y-0.5" style={{ background: view === 'grid' ? 'white' : 'transparent', color: view === 'grid' ? 'var(--color-brand-600)' : 'var(--color-surface-500)', boxShadow: view === 'grid' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}>
                        <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setView('map')} className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:-translate-y-0.5" style={{ background: view === 'map' ? 'white' : 'transparent', color: view === 'map' ? 'var(--color-brand-600)' : 'var(--color-surface-500)', boxShadow: view === 'map' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}>
                        <Map className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex">

                {/* Listings Results Array */}
                <div className={`section-container py-8 transition-all duration-300 ${view === 'map' ? 'lg:w-[55%] xl:w-[50%] mr-auto' : 'w-full'}`}>
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{allListings.length} Properties Found</h2>
                        <select className="bg-transparent text-sm font-medium outline-none cursor-pointer" style={{ color: 'var(--color-surface-500)' }}>
                            <option>Sort by: Recommend</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                    </div>

                    {/* Top Ad Slot */}
                    <div className="mb-6"><AdSlot zone="search-top" /></div>

                    <div className={view === 'grid' || view === 'map' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                        {allListings.map((listing, i) => (
                            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                <ListingCard {...listing} />
                                {i === 2 && view === 'grid' && ( /* Inject Ad */
                                    <div className="mt-6"><AdSlot zone="search-mid" /></div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-12 mb-8">
                        <div className="flex bg-white rounded-xl shadow-sm border border-surface-200 p-1">
                            {[1, 2, 3, '...', 8].map((n, i) => (
                                <button key={i} className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${n === 1 ? 'bg-brand-50 text-brand-600' : 'hover:bg-surface-50 text-surface-600'}`}>{n}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fixed Map View (Visible when view === 'map' on Desktop) */}
                {view === 'map' && (
                    <div className="hidden lg:block fixed right-0 top-[156px] bottom-0 w-[45%] xl:w-[50%] bg-surface-100 border-l border-surface-200 z-10 overflow-hidden">
                        {/* Interactive CartoDB style Map Mockup */}
                        <div className="absolute inset-x-0 inset-y-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-surface-400) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -inset-10 bg-brand-500 rounded-full blur-2xl" />
                                <MapPin className="w-16 h-16 text-brand-600 mb-4 animate-bounce relative z-10 mx-auto drop-shadow-xl" />
                                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-surface-100 pointer-events-auto">
                                    <div className="text-brand-700 font-bold mb-1">Interactive Map View Active</div>
                                    <div className="text-sm text-surface-500">Showing {allListings.length} properties in current bounds</div>
                                </div>
                            </div>
                        </div>

                        {/* Mock Map Pins */}
                        {allListings.slice(0, 5).map((l, i) => (
                            <motion.div key={l.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className="absolute w-12 h-8 bg-white rounded-lg shadow-lg border border-brand-200 flex items-center justify-center text-xs font-bold text-brand-700 cursor-pointer hover:bg-brand-50 hover:scale-110 transition-all z-20" style={{ top: `${20 + (i * 15)}%`, left: `${10 + (i * 20)}%` }}>
                                ${l.price}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cinematic Fluid Sidebar Modal */}
            <AnimatePresence>
                {showSidebar && (
                    <>
                        {/* Backdrop with backdrop-blur */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSidebar(false)} className="fixed inset-0 z-40 bg-surface-900/20 backdrop-blur-md" />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%', rotateY: 20, opacity: 0 }}
                            animate={{ x: 0, rotateY: 0, opacity: 1 }}
                            exit={{ x: '-100%', rotateY: 10, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[420px] max-w-full bg-white/95 backdrop-blur-3xl z-50 shadow-[20px_0_40px_rgba(0,0,0,0.1)] flex flex-col border-r border-white/40"
                            style={{ transformOrigin: 'left center' }}
                        >

                            {/* Header */}
                            <div className="px-8 py-8 flex items-center justify-between z-10">
                                <h2 className="text-2xl font-bold flex items-center gap-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                    <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                                        <Search className="w-5 h-5" />
                                    </div>
                                    Find Your Nest
                                </h2>
                                <button onClick={() => setShowSidebar(false)} className="p-2 -mr-2 rounded-full hover:bg-surface-100 transition-colors active:scale-90"><X className="w-6 h-6 text-surface-500" /></button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-10 custom-scrollbar">

                                {/* Primary Search */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-surface-400">Search Query</h3>
                                    <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-surface-50 border border-surface-200 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all shadow-inner">
                                        <Search className="w-5 h-5 text-surface-400" />
                                        <input type="text" placeholder="Area, building, or keyword..." className="flex-1 bg-transparent border-none outline-none text-base font-medium text-surface-900 placeholder:text-surface-400" />
                                    </div>
                                </div>

                                {/* Selects replaces with modern pills */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-surface-400">District</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['All', 'BKK1', 'Toul Kork', 'Daun Penh', 'Koh Pich'].map((d, i) => (
                                            <button key={d} className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${i === 0 ? 'bg-surface-900 text-white shadow-md scale-105' : 'bg-surface-50 text-surface-600 hover:bg-surface-100 border border-surface-200 cursor-pointer hover:-translate-y-0.5'}`}>{d}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Property Type Interactive */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-surface-400">Property Type</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[{ id: 'apt', icon: Building2, label: 'Apartment' }, { id: 'house', icon: Home, label: 'House / Villa' }].map(v => (
                                            <label key={v.id} className="relative cursor-pointer group">
                                                <input type="radio" name="ptype" className="sr-only peer" defaultChecked={v.id === 'apt'} />
                                                <div className="px-5 py-5 rounded-2xl border-2 border-surface-200 flex flex-col items-center gap-3 transition-all duration-300 peer-checked:border-brand-500 peer-checked:bg-gradient-to-br peer-checked:from-brand-500 peer-checked:to-brand-600 text-surface-500 peer-checked:text-white peer-checked:shadow-xl group-hover:border-brand-300 group-hover:-translate-y-1">
                                                    <v.icon className="w-8 h-8 transition-transform peer-checked:scale-110" />
                                                    <span className="text-sm font-bold tracking-wide">{v.label}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-surface-400">Monthly Budget</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-1 relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 font-bold group-focus-within:text-brand-500 transition-colors">$</span>
                                            <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])} className="w-full pl-9 pr-4 py-4 rounded-2xl bg-surface-50 border border-surface-200 outline-none text-base font-bold focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-inner" />
                                        </div>
                                        <span className="text-surface-300 font-bold">-</span>
                                        <div className="flex-1 relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 font-bold group-focus-within:text-brand-500 transition-colors">$</span>
                                            <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])} className="w-full pl-9 pr-4 py-4 rounded-2xl bg-surface-50 border border-surface-200 outline-none text-base font-bold focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-inner" />
                                        </div>
                                    </div>
                                    {/* GSAP-style modern Slider Bar Mockup */}
                                    <div className="h-3 bg-surface-100 rounded-full relative mx-3 shadow-inner">
                                        <motion.div initial={{ width: 0 }} animate={{ left: '10%', right: '30%', width: 'auto' }} className="absolute top-0 bottom-0 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full shadow-[0_0_15px_rgba(VAR(--color-brand-500),0.4)]" />
                                        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white rounded-full border-[3px] border-brand-500 shadow-md cursor-grab active:scale-90 transition-transform hover:shadow-lg hover:scale-110" />
                                        <div className="absolute right-[30%] top-1/2 -translate-y-1/2 -mr-3 w-6 h-6 bg-white rounded-full border-[3px] border-brand-500 shadow-md cursor-grab active:scale-90 transition-transform hover:shadow-lg hover:scale-110" />
                                    </div>
                                </div>

                                {/* Premium Amenity Toggles (SVG) */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-surface-400">Must-Have Amenities</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {amenities.map(am => {
                                            const isActive = selectedAmenities[am.id];
                                            const Icon = am.icon;
                                            return (
                                                <button key={am.id} onClick={() => toggleAmenity(am.id)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${isActive ? 'border-brand-500 bg-brand-500 text-white shadow-lg scale-100' : 'border-surface-200 bg-white text-surface-500 hover:border-surface-300 hover:bg-surface-50 scale-[0.98] hover:scale-100'}`}>
                                                    <Icon className={`w-6 h-6 mb-2 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover:text-surface-900 group-hover:-translate-y-1'}`} />
                                                    <span className={`text-[11px] font-bold tracking-wide ${isActive ? 'text-white' : 'text-surface-600'}`}>{am.label}</span>
                                                    {isActive && <motion.div layoutId="amenity-check" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute top-2 right-2"><Check className="w-3.5 h-3.5" /></motion.div>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Furniture Status */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-surface-400">Furnishing</h3>
                                    <div className="flex bg-surface-100 p-1.5 rounded-2xl shadow-inner">
                                        {['Any', 'Fully Furnished', 'Unfurnished'].map(f => (
                                            <button key={f} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${f === 'Fully Furnished' ? 'bg-white text-brand-700 shadow-md scale-105 relative z-10' : 'text-surface-500 hover:text-surface-700 hover:bg-surface-200/50'}`}>{f}</button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Footer Actions */}
                            <div className="px-8 py-6 border-t border-surface-100/50 bg-white/50 backdrop-blur-md flex items-center gap-4">
                                <button onClick={() => { setPriceRange([0, 5000]); setSelectedAmenities({}); }} className="px-5 py-4 rounded-2xl text-sm font-bold text-surface-500 hover:bg-surface-100 hover:text-surface-900 transition-colors active:scale-95">Reset</button>
                                <button onClick={() => setShowSidebar(false)} className="flex-1 py-4 rounded-2xl text-sm font-bold text-white shadow-[0_10px_30px_rgba(VAR(--color-brand-600),0.3)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(VAR(--color-brand-600),0.4)] active:scale-95 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, var(--color-brand-500) 0%, var(--color-brand-700) 100%)' }}>
                                    <Search className="w-4 h-4" /> Show 45 Results
                                </button>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}
