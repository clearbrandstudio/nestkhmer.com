'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Trash2, CheckCircle, XCircle, Plus, X, Upload, Building2 } from 'lucide-react';
import { useState, useRef } from 'react';

const listings = [
    { id: '1', propertyId: 'NK-BKK1-2026-0042', title: 'Modern Studio with Mekong View', agent: 'Sophea Chan', district: 'BKK1', price: 650, status: 'active', score: 92, daysOld: 1 },
    { id: '2', propertyId: 'NK-TK-2026-0044', title: 'Spacious 2-Bed in Toul Kork', agent: 'David Park', district: 'Toul Kork', price: 850, status: 'active', score: 87, daysOld: 3 },
    { id: '3', propertyId: 'NK-KP-2026-0067', title: 'Luxury Penthouse on Diamond Island', agent: 'Maly Sokhon', district: 'Koh Pich', price: 2200, status: 'pending', score: 95, daysOld: 0 },
    { id: '4', propertyId: 'NK-TTP-2026-0203', title: 'Cozy Flat near Russian Market', agent: 'James Liu', district: 'TTP', price: 450, status: 'expired', score: 78, daysOld: 15 },
    { id: '5', propertyId: 'NK-SS-2026-0012', title: 'Family Villa with Garden', agent: 'Lisa Nguyen', district: 'Sen Sok', price: 1500, status: 'draft', score: 91, daysOld: 0 },
    { id: '6', propertyId: 'NK-DP-2026-0118', title: 'Riverside Apartment with Pool', agent: 'Kosal Meng', district: 'Daun Penh', price: 1100, status: 'active', score: 84, daysOld: 12 },
    { id: '7', propertyId: 'NK-SS-2026-0015', title: 'Executive Suite near AEON', agent: 'David Park', district: 'Sen Sok', price: 950, status: 'active', score: 89, daysOld: 4 },
];

const districts = ['BKK1', 'Toul Kork', 'Koh Pich', 'Toul Tom Poung', 'Sen Sok', 'Daun Penh', 'Chamkarmon', 'Olympic', '7 Makara', 'Chbar Ampov'];

export default function AdminListings() {
    const [filter, setFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [actionModal, setActionModal] = useState<{ type: 'approve' | 'reject' | 'delete', id: string } | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: '',
        district: 'BKK1',
        price: '',
        bedrooms: '1',
        bathrooms: '1',
        size: '',
        floor: '',
        description: '',
        type: 'apartment',
    });

    const handleSubmit = () => {
        alert(`Listing "${formData.title}" created in ${formData.district} for $${formData.price}/mo`);
        setShowForm(false);
        setFormData({ title: '', district: 'BKK1', price: '', bedrooms: '1', bathrooms: '1', size: '', floor: '', description: '', type: 'apartment' });
    };

    const filtered = filter === 'All' ? listings : listings.filter(l => l.status.toLowerCase() === filter.toLowerCase());
    const inputStyle: React.CSSProperties = { background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>All Listings</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-surface-500)' }}>Manage, approve, and monitor all property listings</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        {['All', 'Active', 'Pending', 'Expired', 'Draft'].map(f => (
                            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: filter === f ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: filter === f ? 'white' : 'var(--color-surface-600)' }}>{f}</button>
                        ))}
                    </div>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Plus className="w-4 h-4" />Add Listing</button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[{ label: 'Total', val: listings.length, color: 'var(--color-brand-600)' }, { label: 'Active', val: listings.filter(l => l.status === 'active').length, color: 'var(--color-fresh-600)' }, { label: 'Pending Review', val: listings.filter(l => l.status === 'pending').length, color: 'var(--color-warn-600)' }, { label: 'Expired', val: listings.filter(l => l.status === 'expired').length, color: 'var(--color-danger-600)' }].map(s => (
                    <div key={s.label} className="glass-card p-4" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: s.color }}>{s.val}</div>
                        <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Property ID', 'Listing', 'Agent', 'Price', 'Status', 'Score', 'Age', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {filtered.map((l, i) => (
                            <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3"><span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-600)' }}>{l.propertyId}</span></td>
                                <td className="px-4 py-3"><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{l.title}</div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{l.district}</div></td>
                                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-surface-600)' }}>{l.agent}</td>
                                <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--color-brand-700)' }}>${l.price}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: l.status === 'active' ? 'var(--color-fresh-50)' : l.status === 'pending' ? 'var(--color-warn-50)' : l.status === 'expired' ? 'rgba(239,68,68,0.08)' : 'var(--color-surface-100)', color: l.status === 'active' ? 'var(--color-fresh-600)' : l.status === 'pending' ? 'var(--color-warn-600)' : l.status === 'expired' ? 'var(--color-danger-600)' : 'var(--color-surface-600)' }}>{l.status}</span></td>
                                <td className="px-4 py-3 text-sm font-semibold">{l.score}</td>
                                <td className="px-4 py-3 text-sm" style={{ color: l.daysOld > 12 ? 'var(--color-danger-600)' : 'var(--color-surface-600)' }}>{l.daysOld}d</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <button className="p-1.5 rounded hover:bg-gray-100" title="View" style={{ color: 'var(--color-surface-400)' }}><Eye className="w-3.5 h-3.5" /></button>
                                        {l.status === 'pending' && <><button onClick={() => setActionModal({ type: 'approve', id: l.id })} className="p-1.5 rounded hover:bg-green-50" title="Approve" style={{ color: 'var(--color-fresh-500)' }}><CheckCircle className="w-3.5 h-3.5" /></button><button onClick={() => setActionModal({ type: 'reject', id: l.id })} className="p-1.5 rounded hover:bg-red-50" title="Reject" style={{ color: 'var(--color-danger-500)' }}><XCircle className="w-3.5 h-3.5" /></button></>}
                                        <button onClick={() => setActionModal({ type: 'delete', id: l.id })} className="p-1.5 rounded hover:bg-red-50" title="Delete" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Listing Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-brand-50)' }}><Building2 className="w-4 h-4" style={{ color: 'var(--color-brand-600)' }} /></div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Add New Listing</h2>
                                </div>
                                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                            </div>

                            <div className="space-y-5">
                                {/* Title */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Property Title *</label>
                                    <input value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Modern Studio with Mekong View" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                </div>

                                {/* Type + District */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Property Type *</label>
                                        <select value={formData.type} onChange={e => setFormData(f => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                                            <option value="apartment">Apartment</option>
                                            <option value="villa">Villa / House</option>
                                            <option value="studio">Studio</option>
                                            <option value="penthouse">Penthouse</option>
                                            <option value="shophouse">Shophouse</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>District *</label>
                                        <select value={formData.district} onChange={e => setFormData(f => ({ ...f, district: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Price + Size */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Monthly Rent (USD) *</label>
                                        <input type="number" value={formData.price} onChange={e => setFormData(f => ({ ...f, price: e.target.value }))} placeholder="650" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Size (m²)</label>
                                        <input type="number" value={formData.size} onChange={e => setFormData(f => ({ ...f, size: e.target.value }))} placeholder="45" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Floor</label>
                                        <input type="number" value={formData.floor} onChange={e => setFormData(f => ({ ...f, floor: e.target.value }))} placeholder="12" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                    </div>
                                </div>

                                {/* Bedrooms + Bathrooms */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Bedrooms *</label>
                                        <select value={formData.bedrooms} onChange={e => setFormData(f => ({ ...f, bedrooms: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                                            {['Studio', '1', '2', '3', '4', '5+'].map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Bathrooms *</label>
                                        <select value={formData.bathrooms} onChange={e => setFormData(f => ({ ...f, bathrooms: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                                            {['1', '2', '3', '4+'].map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Photos Upload */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Property Photos</label>
                                    <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            if (e.dataTransfer.files?.length) {
                                                const newPhotos = Array.from(e.dataTransfer.files).map(f => URL.createObjectURL(f));
                                                setPhotos(p => [...p, ...newPhotos]);
                                            }
                                        }}
                                        className="border-2 border-dashed rounded-xl p-8 text-center transition-colors hover:bg-gray-50"
                                        style={{ borderColor: 'var(--color-surface-200)' }}
                                    >
                                        <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-surface-400)' }} />
                                        <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Drag & drop photos or <button type="button" onClick={() => fileInputRef.current?.click()} style={{ color: 'var(--color-brand-600)' }} className="font-semibold cursor-pointer">browse</button></p>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-surface-400)' }}>Minimum 5 photos required • JPG, PNG up to 5MB each</p>
                                        <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => {
                                            if (e.target.files?.length) {
                                                const newPhotos = Array.from(e.target.files).map(f => URL.createObjectURL(f));
                                                setPhotos(p => [...p, ...newPhotos]);
                                            }
                                        }} />
                                    </div>
                                    {photos.length > 0 && (
                                        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                            {photos.map((p, i) => (
                                                <div key={i} className="relative w-16 h-16 rounded-lg flex-shrink-0 border" style={{ borderColor: 'var(--color-surface-200)', backgroundImage: `url(${p})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                    <button type="button" onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">✕</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Description</label>
                                    <textarea value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} placeholder="Describe the property, amenities, and nearby facilities..." rows={4} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3 pt-4" style={{ borderTop: '1px solid var(--color-surface-100)' }}>
                                    <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'var(--color-surface-600)' }}>Cancel</button>
                                    <button onClick={handleSubmit} disabled={!formData.title || !formData.price} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50" style={{ background: 'var(--color-brand-600)', color: 'white' }}>
                                        <Plus className="w-4 h-4" />Create Listing
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Action Modal */}
            <AnimatePresence>
                {actionModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-sm p-6" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: actionModal.type === 'delete' || actionModal.type === 'reject' ? 'rgba(239,68,68,0.1)' : 'var(--color-fresh-50)' }}>
                                    {actionModal.type === 'delete' ? <Trash2 className="w-6 h-6 text-red-500" /> : actionModal.type === 'reject' ? <XCircle className="w-6 h-6 text-red-500" /> : <CheckCircle className="w-6 h-6" style={{ color: 'var(--color-fresh-600)' }} />}
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {actionModal.type === 'approve' ? 'Approve Listing' : actionModal.type === 'reject' ? 'Reject Listing' : 'Delete Listing'}
                                </h3>
                                <p className="text-sm mb-6" style={{ color: 'var(--color-surface-500)' }}>
                                    {actionModal.type === 'approve' ? 'Are you sure you want to approve this listing? It will become active immediately.' : actionModal.type === 'reject' ? 'Are you sure you want to reject this listing? The agent will be notified.' : 'Are you sure you want to delete this listing? This action cannot be undone.'}
                                </p>
                                <div className="flex w-full gap-3">
                                    <button onClick={() => setActionModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>Cancel</button>
                                    <button onClick={() => { alert(`${actionModal.type} executed! (Demo)`); setActionModal(null); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: actionModal.type === 'delete' || actionModal.type === 'reject' ? 'var(--color-danger-600)' : 'var(--color-fresh-600)' }}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
