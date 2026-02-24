'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '@/lib/auth-context';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-surface-100 animate-pulse flex flex-col items-center justify-center text-surface-400">
            <div className="w-8 h-8 border-4 border-surface-300 border-t-brand-500 rounded-full animate-spin mb-3"></div>
            <span className="text-sm font-bold uppercase tracking-wider">Loading Map...</span>
        </div>
    )
});

export default function MapWrapper({ listing, isLoggedIn: propIsLoggedIn }: { listing: any, isLoggedIn?: boolean }) {
    const { user } = useAuth();
    const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!user;

    // Simple logic to fetch nearby landmarks based on the district string
    let landmarks = [];
    const dist = listing.district?.toLowerCase() || '';

    // Base standard landmarks for Phnom Penh Demo
    landmarks = [
        { id: 1, name: 'Independence Monument', time: '5m', cat: 'Landmark', img: 'https://images.unsplash.com/photo-1599813580436-1e6ac81de1dd?w=200&h=200&fit=crop', lat: 11.5564, lng: 104.9282 },
        { id: 2, name: 'Riverside Walk', time: '10m', cat: 'Leisure', img: 'https://images.unsplash.com/photo-1549479321-df6dfa99cb9c?w=200&h=200&fit=crop', lat: 11.5684, lng: 104.9350 }
    ];

    if (dist.includes('bkk')) {
        landmarks.push({ id: 3, name: 'Aeon Mall 1', time: '8m', cat: 'Lifestyle', img: 'https://images.unsplash.com/photo-1519567281023-649033f92317?w=200&h=200&fit=crop', lat: 11.5492, lng: 104.9348 });
        landmarks.push({ id: 4, name: 'Norea Garden', time: '12m', cat: 'Park', img: 'https://images.unsplash.com/photo-1580130985233-ffdf48dabeeb?w=200&h=200&fit=crop', lat: 11.5450, lng: 104.9450 });
    } else if (dist.includes('toul kork') || dist.includes('tk')) {
        landmarks.push({ id: 5, name: 'TK Avenue', time: '5m', cat: 'Shopping', img: 'https://images.unsplash.com/photo-1568249821815-46aaac8353cd?w=200&h=200&fit=crop', lat: 11.5744, lng: 104.8943 });
        landmarks.push({ id: 6, name: 'Eden Garden', time: '8m', cat: 'Dining', img: 'https://images.unsplash.com/photo-1600124696116-243ee9e84cc7?w=200&h=200&fit=crop', lat: 11.5800, lng: 104.9000 });
    }

    return (
        <div className="w-full h-full relative group rounded-2xl overflow-hidden shadow-inner">
            <div className={`w-full h-full transition-all duration-700 ${!isLoggedIn ? 'blur-md scale-105 pointer-events-none' : ''}`}>
                <PropertyMap
                    center={[11.5540, 104.9280]} // Mock property coordinates
                    listingInfo={{ title: listing.title, price: listing.price, type: 'Apartment' }}
                    landmarks={landmarks}
                />
            </div>

            {/* The Authentication Gate Overlay */}
            {!isLoggedIn && (
                <div className="absolute inset-0 z-[500] flex flex-col items-center justify-center p-6 text-center bg-white/40 dark:bg-black/40">
                    <div className="bg-white/80 dark:bg-surface-900/80 backdrop-blur-2xl px-8 py-6 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-white/50 dark:border-surface-700 max-w-sm w-full transform transition-all hover:scale-105 duration-500">
                        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Unlock Full Map</h3>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">Sign up or log in to view the exact location and explore nearby landmarks.</p>
                        <button className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                            Sign In to View Location
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
