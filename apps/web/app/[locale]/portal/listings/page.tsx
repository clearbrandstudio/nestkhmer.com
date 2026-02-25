'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, MoreVertical, Edit2, Eye, Trash2, Home, MapPin, Building, Calendar, DollarSign, X, ArrowRight, Image, CheckCircle, UploadCloud, AlertCircle, RefreshCw, Dog, Wifi, Wind, Car, Droplet, Zap, Tv, Shield, Facebook, Download, LocateFixed, EyeOff, Navigation, Lock, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';

const initialListings = [
    { id: '1', title: 'Modern Studio with Mekong View', district: 'BKK1', price: 650, status: 'active', views: 142, leads: 8, daysOld: 1, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop' },
    { id: '2', title: 'Spacious 2-Bed in Toul Kork', district: 'Toul Kork', price: 850, status: 'active', views: 98, leads: 5, daysOld: 3, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop' },
    { id: '3', title: 'Luxury Penthouse on Diamond Island', district: 'Koh Pich', price: 2200, status: 'active', views: 234, leads: 12, daysOld: 0, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop' },
    { id: '4', title: 'Cozy Flat near Russian Market', district: 'Toul Tom Poung', price: 450, status: 'expired', views: 67, leads: 3, daysOld: 15, image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=200&h=150&fit=crop' },
    { id: '5', title: 'Family Villa with Garden', district: 'Sen Sok', price: 1500, status: 'draft', views: 0, leads: 0, daysOld: 0, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=150&fit=crop' },
];

/* ─── Premium Uploader Component ─── */
function DragDropUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if (files.length > 0) {
            const newPreviews = files.map(f => URL.createObjectURL(f));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    return (
        <div className="space-y-3">
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-colors cursor-pointer ${isDragging ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]' : 'border-[var(--color-surface-200)] bg-[var(--color-surface-50)] hover:bg-[var(--color-surface-100)]'}`}
            >
                <UploadCloud className={`w-8 h-8 mb-3 ${isDragging ? 'text-[var(--color-brand-600)]' : 'text-[var(--color-surface-400)]'}`} />
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-surface-700)' }}>
                    Drop high-res photos here
                </p>
                <p className="text-xs" style={{ color: 'var(--color-surface-500)' }}>or click to browse from your computer</p>
                <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                        const newPreviews = files.map(f => URL.createObjectURL(f));
                        setPreviews(prev => [...prev, ...newPreviews]);
                    }
                }} />
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                    {previews.map((src, i) => (
                        <div key={i} className="relative group aspect-[4/3] rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-surface-200)' }}>
                            <img src={src} className="w-full h-full object-cover" alt="Preview" />
                            <button
                                onClick={() => setPreviews(p => p.filter((_, idx) => idx !== i))}
                                className="absolute top-1.5 right-1.5 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white hover:bg-red-500"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            {i === 0 && (
                                <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--color-brand-600)] text-white">Cover</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function PortalListings() {
    const locale = useLocale();
    const [actionModal, setActionModal] = useState<{ type: 'edit' | 'delete' | 'renew', id?: string } | null>(null);
    const [allListings, setAllListings] = useState<any[]>(initialListings);

    const fetchListings = async () => {
        try {
            const res = await fetch('/api/listings');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setAllListings(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch listings', err);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleSave = async (status: 'draft' | 'active') => {
        // Simple DOM extraction for demo
        const titleEn = (document.querySelector('input[placeholder*="Mekong View"]') as HTMLInputElement)?.value || 'Untitled Property';
        const priceUsd = (document.querySelector('input[placeholder="0.00"]') as HTMLInputElement)?.value || 0;
        const descriptionEn = (document.querySelector('textarea[placeholder*="Highlight"]') as HTMLTextAreaElement)?.value || '';
        const propertyType = (document.querySelectorAll('select')[1] as HTMLSelectElement)?.value || 'Apartment';
        const district = (document.querySelectorAll('select')[2] as HTMLSelectElement)?.value || 'BKK1';

        const data = {
            titleEn,
            status,
            priceUsd,
            descriptionEn,
            propertyType,
            district,
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80']
        };

        try {
            const res = await fetch('/api/listings', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                showToast(`Listing successfully ${status === 'draft' ? 'saved as Draft' : 'published to NestKhmer'}!`);
                setActionModal(null);
                fetchListings();
            } else {
                showToast('Failed to save listing');
            }
        } catch (err) {
            showToast('Error saving listing');
        }
    };

    // Add state for complex form interactions
    const [amenities, setAmenities] = useState<Record<string, boolean>>({
        pets: false,
        wifi: false,
        ac: false,
        parking: false,
        pool: false,
        gym: false,
        security: false,
        balcony: false
    });
    const [electricRate, setElectricRate] = useState<'0.25' | '0.30' | 'custom'>('0.25');
    const [customElectric, setCustomElectric] = useState('');
    const [waterRate, setWaterRate] = useState<'free' | '5' | 'custom'>('5');
    const [customWater, setCustomWater] = useState('');

    // Custom Toast Notification State
    const [toast, setToast] = useState<{ show: boolean, message: string } | null>(null);

    const showToast = (message: string) => {
        setToast({ show: true, message });
        setTimeout(() => setToast(null), 3500);
    };

    const toggleAmenity = (key: string) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>My Listings</h1>
                <button onClick={() => setActionModal({ type: 'edit' })} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}><Plus className="w-4 h-4" />New Listing</button>
            </div>

            <div className="glass-card p-4 mb-6 flex items-center gap-3" style={{ borderRadius: 'var(--radius-xl)' }}>
                <Search className="w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                <input placeholder="Search your listings..." className="flex-1 bg-transparent border-none outline-none text-sm" style={{ color: 'var(--color-surface-800)' }} />
                <select className="px-3 py-1.5 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                    <option>All Status</option><option>Active</option><option>Draft</option><option>Expired</option>
                </select>
            </div>

            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        <th className="text-left text-xs font-medium px-5 py-3" style={{ color: 'var(--color-surface-500)' }}>Listing</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Price</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Status</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Views</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Leads</th>
                        <th className="text-left text-xs font-medium px-3 py-3" style={{ color: 'var(--color-surface-500)' }}>Age</th>
                        <th className="text-right text-xs font-medium px-5 py-3" style={{ color: 'var(--color-surface-500)' }}>Actions</th>
                    </tr></thead>
                    <tbody>
                        {allListings.map((l, i) => (
                            <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="transition-colors hover:bg-gray-50/50" style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${l.image})` }} />
                                        <div><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{l.title}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{l.district}</div></div>
                                    </div>
                                </td>
                                <td className="px-3 py-4 text-sm font-semibold" style={{ color: 'var(--color-brand-700)' }}>${l.price}</td>
                                <td className="px-3 py-4">
                                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: l.status === 'active' ? 'var(--color-fresh-50)' : l.status === 'draft' ? 'var(--color-surface-100)' : 'rgba(239,68,68,0.08)', color: l.status === 'active' ? 'var(--color-fresh-600)' : l.status === 'draft' ? 'var(--color-surface-600)' : 'var(--color-danger-600)' }}>{l.status}</span>
                                </td>
                                <td className="px-3 py-4 text-sm" style={{ color: 'var(--color-surface-600)' }}>{l.views}</td>
                                <td className="px-3 py-4 text-sm" style={{ color: 'var(--color-surface-600)' }}>{l.leads}</td>
                                <td className="px-3 py-4 text-sm" style={{ color: l.daysOld > 12 ? 'var(--color-danger-600)' : 'var(--color-surface-600)' }}>{l.daysOld}d</td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        {l.status === 'expired' && (
                                            <button onClick={() => setActionModal({ type: 'renew', id: l.id })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mr-2 transition-colors hover:bg-green-600 hover:text-white" style={{ background: 'var(--color-fresh-50)', color: 'var(--color-fresh-700)' }}>
                                                <RefreshCw className="w-3.5 h-3.5" /> Renew
                                            </button>
                                        )}
                                        <button onClick={() => setActionModal({ type: 'edit', id: l.id })} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Edit" style={{ color: 'var(--color-surface-400)' }}><Edit2 className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => window.open(`/${locale}/listings/modern-studio-with-mekong-view`, '_blank')} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Preview Live Listing" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => setActionModal({ type: 'delete', id: l.id })} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Modals */}
            <AnimatePresence>
                {actionModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className={`glass-card w-full shadow-2xl ${actionModal.type === 'edit' ? 'max-w-4xl p-0 overflow-hidden flex flex-col h-[90vh]' : 'max-w-md p-6'}`} style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            {actionModal.type === 'edit' ? (
                                <>
                                    <div className="px-8 py-5 flex items-center justify-between bg-white z-10 shadow-sm" style={{ borderBottom: '1px solid var(--color-surface-100)' }}>
                                        <div>
                                            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{actionModal.id ? 'Edit Listing' : 'Create New Listing'}</h2>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-[var(--color-surface-500)]">
                                                <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Property Details</span>
                                                <span className="text-[var(--color-surface-300)]">•</span>
                                                <span className="flex items-center gap-1"><Image className="w-3.5 h-3.5" /> Media</span>
                                                <span className="text-[var(--color-surface-300)]">•</span>
                                                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Publish</span>
                                            </div>
                                        </div>
                                        <button onClick={() => setActionModal(null)} className="p-2.5 rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth">
                                        {/* Basic Details Section */}
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--color-surface-400)', fontFamily: 'var(--font-heading)' }}>1. Basic Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>Catchy Title <span className="text-red-500">*</span></label>
                                                    <input className="w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)]" placeholder="e.g. Modern Studio with Mekong View..." defaultValue={actionModal.id ? allListings.find(l => l.id === actionModal.id)?.title : ''} style={{ background: 'white', border: '1px solid var(--color-surface-200)' }} />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>Property Type</label>
                                                    <div className="relative">
                                                        <select className="appearance-none w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)] pr-10" style={{ background: 'white', border: '1px solid var(--color-surface-200)' }}>
                                                            <option>Apartment</option><option>Villa</option><option>Condo</option><option>Office</option>
                                                        </select>
                                                        <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-surface-400)]" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>District</label>
                                                    <div className="relative">
                                                        <select className="appearance-none w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)] pr-10" style={{ background: 'white', border: '1px solid var(--color-surface-200)' }}>
                                                            <option>BKK1</option><option>Toul Kork</option><option>Daun Penh</option><option>Sen Sok</option>
                                                        </select>
                                                        <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-surface-400)]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Minimalist CartoDB Map Section */}
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 flex items-center justify-between" style={{ color: 'var(--color-surface-400)', fontFamily: 'var(--font-heading)' }}>
                                                <span>2. Location & Privacy</span>
                                                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full"><Lock className="w-3 h-3" /> Lead Capture Active</span>
                                            </h3>

                                            {/* MAP URL FIELD ADDED */}
                                            <div className="mb-6">
                                                <label className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}>
                                                    <MapPin className="w-4 h-4 text-brand-500" /> Google Maps URL (Optional)
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder="e.g. https://maps.app.goo.gl/..."
                                                    className="w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)] placeholder:text-surface-400"
                                                    style={{ background: 'white', border: '1px solid var(--color-surface-200)' }}
                                                />
                                                <p className="text-xs text-surface-500 mt-2">If provided, we will automatically extract the exact coordinates to show on the public premium listing map.</p>
                                            </div>
                                            <div className="rounded-2xl overflow-hidden relative" style={{ border: '1px solid var(--color-surface-200)', height: '240px', background: 'var(--color-surface-50)' }}>
                                                {/* Mock CartoDB-style Map Pattern */}
                                                <div className="absolute inset-x-0 inset-y-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-surface-300) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                                                {/* Map UI Elements */}
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <div className="relative">
                                                        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -inset-8 bg-brand-500 rounded-full blur-xl" />
                                                        <div className="w-12 h-12 bg-brand-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center z-10 relative">
                                                            <Home className="w-5 h-5 text-white" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Floating UI on Map */}
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-surface-100 flex items-center gap-2 text-xs font-medium text-surface-700">
                                                    <LocateFixed className="w-3.5 h-3.5 text-brand-600" /> BKK1 Center
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-surface-100 flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5"><EyeOff className="w-4 h-4 text-blue-600" /></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-surface-800">Exact Location Hidden for Privacy</p>
                                                        <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">Customers will only see the approximate district outline. Exact pins and maps are locked behind a 3-step registration (Email/Phone required) to generate high-intent leads for you.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Specs & Pricing */}
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--color-surface-400)', fontFamily: 'var(--font-heading)' }}>3. Specs & Pricing</h3>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                                <div>
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>Monthly Rent</label>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-[var(--color-surface-500)]">$</span>
                                                        <input type="number" className="w-full pl-8 pr-4 py-3 rounded-xl text-base font-medium outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)]" placeholder="0.00" defaultValue={actionModal.id ? allListings.find(l => l.id === actionModal.id)?.price : ''} style={{ background: 'white', border: '1px solid var(--color-surface-200)' }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>Size (sqm)</label>
                                                    <input type="number" className="w-full px-4 py-3 rounded-xl text-base font-medium outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)]" placeholder="0" style={{ background: 'white', border: '1px solid var(--color-surface-200)' }} />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>Bedrooms</label>
                                                    <input type="number" className="w-full px-4 py-3 rounded-xl text-base font-medium outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)]" placeholder="1" style={{ background: 'white', border: '1px solid var(--color-surface-200)' }} />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--color-surface-800)' }}>Bathrooms</label>
                                                    <input type="number" className="w-full px-4 py-3 rounded-xl text-base font-medium outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)]" placeholder="1" style={{ background: 'white', border: '1px solid var(--color-surface-200)' }} />
                                                </div>
                                            </div>

                                            {/* Premium Utilities Selectors */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-2xl" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-100)' }}>
                                                {/* Electric */}
                                                <div>
                                                    <label className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><Zap className="w-4 h-4 text-emerald-500" /> Electricity Rate (kWh)</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['0.25', '0.30'].map(rate => (
                                                            <button key={rate} onClick={() => setElectricRate(rate as any)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${electricRate === rate ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : 'bg-white text-surface-600 border-surface-200 hover:border-emerald-300'}`}>
                                                                ${rate}
                                                            </button>
                                                        ))}
                                                        <button onClick={() => setElectricRate('custom')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${electricRate === 'custom' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : 'bg-white text-surface-600 border-surface-200 hover:border-emerald-300'}`}>Custom</button>
                                                        <AnimatePresence>
                                                            {electricRate === 'custom' && (
                                                                <motion.input initial={{ width: 0, opacity: 0 }} animate={{ width: 90, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="px-3 py-2 rounded-xl text-sm font-mono outline-none border border-emerald-200 focus:ring-2 focus:ring-emerald-100" placeholder="$0.00" value={customElectric} onChange={e => setCustomElectric(e.target.value)} />
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>

                                                {/* Water */}
                                                <div>
                                                    <label className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><Droplet className="w-4 h-4 text-blue-500" /> Water Rate</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['free', '5'].map(rate => (
                                                            <button key={rate} onClick={() => setWaterRate(rate as any)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${waterRate === rate ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' : 'bg-white text-surface-600 border-surface-200 hover:border-blue-300'}`}>
                                                                {rate === 'free' ? 'Free' : `$${rate}/person`}
                                                            </button>
                                                        ))}
                                                        <button onClick={() => setWaterRate('custom')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${waterRate === 'custom' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' : 'bg-white text-surface-600 border-surface-200 hover:border-blue-300'}`}>Custom</button>
                                                        <AnimatePresence>
                                                            {waterRate === 'custom' && (
                                                                <motion.input initial={{ width: 0, opacity: 0 }} animate={{ width: 120, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="px-3 py-2 rounded-xl text-sm outline-none border border-blue-200 focus:ring-2 focus:ring-blue-100" placeholder="e.g. $0.60/m3" value={customWater} onChange={e => setCustomWater(e.target.value)} />
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Interactive Amenities Toggles */}
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--color-surface-400)', fontFamily: 'var(--font-heading)' }}>4. Premium Amenities</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {[
                                                    { id: 'pets', label: 'Pets Allowed', icon: Dog },
                                                    { id: 'wifi', label: 'Fast WiFi', icon: Wifi },
                                                    { id: 'ac', label: 'Air Con', icon: Wind },
                                                    { id: 'parking', label: 'Parking', icon: Car },
                                                    { id: 'pool', label: 'Swimming Pool', icon: Droplet },
                                                    { id: 'gym', label: 'Fitness Center', icon: Tv }, // Placeholder icon
                                                    { id: 'security', label: '24/7 Security', icon: Shield },
                                                    { id: 'balcony', label: 'Balcony', icon: Navigation } // Placeholder
                                                ].map(amenity => {
                                                    const isActive = amenities[amenity.id];
                                                    const Icon = amenity.icon;
                                                    return (
                                                        <motion.button
                                                            key={amenity.id}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => toggleAmenity(amenity.id)}
                                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${isActive ? 'bg-brand-50 border-brand-500' : 'bg-white border-surface-100 hover:border-surface-300 hover:bg-surface-50'}`}
                                                        >
                                                            <motion.div
                                                                animate={{ scale: isActive ? 1.1 : 1, color: isActive ? 'var(--color-brand-600)' : 'var(--color-surface-400)' }}
                                                                className="mb-2"
                                                            >
                                                                <Icon className="w-7 h-7" />
                                                            </motion.div>
                                                            <span className={`text-xs font-semibold ${isActive ? 'text-brand-700' : 'text-surface-600'}`}>{amenity.label}</span>
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </section>

                                        {/* Description */}
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--color-surface-400)', fontFamily: 'var(--font-heading)' }}>5. Describe The Magic</h3>
                                            <textarea rows={5} className="w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-brand-200)] resize-none" placeholder="Highlight what makes this property special..." style={{ background: 'white', border: '1px solid var(--color-surface-200)' }} />
                                        </section>

                                        {/* Media */}
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 flex items-center justify-between" style={{ color: 'var(--color-surface-400)', fontFamily: 'var(--font-heading)' }}>
                                                <span>6. High-Res Photos</span>
                                                <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full normal-case">Unlimited</span>
                                            </h3>
                                            <DragDropUploader />
                                            <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: 'var(--color-surface-400)' }}><AlertCircle className="w-3.5 h-3.5" /> High quality photos generate 4x more leads. Avoid watermarks.</p>
                                        </section>
                                    </div>
                                    <div className="px-8 py-5 bg-[var(--color-surface-50)] flex items-center justify-between shadow-inner z-10 border-t border-surface-200">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setActionModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white transition-colors" style={{ color: 'var(--color-surface-700)', border: '1px solid var(--color-surface-200)' }}>Cancel</button>
                                            <button onClick={() => handleSave('draft')} className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-surface-200)] transition-colors" style={{ color: 'var(--color-surface-800)', background: 'var(--color-surface-100)' }}>Save Draft</button>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => { showToast('Successfully queued for Marketplace Sync.'); }}
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-[0_4px_14px_rgba(24,119,242,0.39)] transition-transform hover:scale-105 active:scale-95"
                                                style={{ background: '#1877F2' }}
                                                title="Unique Selling Proposition: Auto-sync to Facebook"
                                            >
                                                <Facebook className="w-5 h-5" fill="currentColor" stroke="none" /> Export to Marketplace
                                            </button>
                                            <button onClick={() => handleSave('active')} className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold transition-transform hover:scale-105 active:scale-95 text-white shadow-lg" style={{ background: 'var(--color-brand-600)' }}>
                                                Publish on NestKhmer <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : actionModal.type === 'renew' ? (
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'var(--color-fresh-50)' }}>
                                        <RefreshCw className="w-8 h-8" style={{ color: 'var(--color-fresh-600)' }} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Renew Listing?</h3>
                                    <p className="text-sm mb-8 leading-relaxed px-4" style={{ color: 'var(--color-surface-600)' }}>
                                        By renewing this listing, you confirm that the property is still available. It will be marked as <span className="font-semibold text-[var(--color-fresh-600)] bg-[var(--color-fresh-50)] px-2 py-0.5 rounded-md">Fresh Today</span> and boosted in search results for another 14 days.
                                    </p>
                                    <div className="flex w-full gap-3">
                                        <button onClick={() => setActionModal(null)} className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[var(--color-surface-200)]" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>Cancel</button>
                                        <button onClick={() => {
                                            setAllListings(prev => prev.map(l => l.id === actionModal.id ? { ...l, status: 'active', daysOld: 0 } : l));
                                            setActionModal(null);
                                        }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: 'var(--color-fresh-500)' }}>
                                            Yes, Renew Now
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(239,68,68,0.1)' }}>
                                        <Trash2 className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Delete Listing</h3>
                                    <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>
                                        Are you sure you want to permanently delete this listing? All leads and view history will be lost. This cannot be undone.
                                    </p>
                                    <div className="flex w-full gap-3">
                                        <button onClick={() => setActionModal(null)} className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[var(--color-surface-200)]" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>Cancel</button>
                                        <button onClick={() => {
                                            setAllListings(prev => prev.filter(l => l.id !== actionModal.id));
                                            setActionModal(null);
                                        }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: 'var(--color-danger-600)' }}>
                                            Delete Forever
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Global Toast Notification */}
            <AnimatePresence>
                {toast?.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.25)] flex items-center gap-3 backdrop-blur-xl"
                        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(16,185,129,0.3)' }}
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm font-bold text-emerald-800">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
