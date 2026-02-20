'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, BarChart3, Pause, Play, X, Upload, Calendar, DollarSign, MapPin, Image, FileText, Target } from 'lucide-react';
import { useState } from 'react';

const campaigns = [
    { name: 'Koh Pich Premium Living', zone: 'Homepage Hero', status: 'active', impressions: 12450, clicks: 398, ctr: '3.2%', spend: '$499', start: 'Feb 1', end: 'Feb 28' },
    { name: 'ERA Cambodia Brand', zone: 'Search Results', status: 'active', impressions: 28300, clicks: 1273, ctr: '4.5%', spend: '$799', start: 'Feb 1', end: 'Mar 15' },
    { name: 'CBRE New Projects', zone: 'District Sidebar', status: 'paused', impressions: 5200, clicks: 145, ctr: '2.8%', spend: '$149', start: 'Jan 15', end: 'Feb 15' },
    { name: 'Expat Insurance', zone: 'Blog Inline', status: 'active', impressions: 3800, clicks: 193, ctr: '5.1%', spend: '$199', start: 'Feb 5', end: 'Mar 5' },
    { name: 'Urban Village BKK1', zone: 'Listing Sidebar', status: 'ended', impressions: 18900, clicks: 699, ctr: '3.7%', spend: '$599', start: 'Jan 1', end: 'Jan 31' },
];

const adZones = [
    { id: 'homepage-hero', label: 'Homepage Hero Banner', description: 'Premium full-width banner above the fold', size: '1200×400', price: '$499/mo' },
    { id: 'search-results', label: 'Search Results', description: 'Inline card between listing results', size: '600×120', price: '$299/mo' },
    { id: 'district-sidebar', label: 'District Page Sidebar', description: 'Right sidebar on district pages', size: '300×250', price: '$149/mo' },
    { id: 'blog-inline', label: 'Blog Inline', description: 'Sponsored content between blog paragraphs', size: '600×120', price: '$199/mo' },
    { id: 'listing-sidebar', label: 'Listing Detail Sidebar', description: 'Right sidebar on individual listing pages', size: '300×250', price: '$249/mo' },
    { id: 'listing-footer', label: 'Listing Footer', description: 'Below listing gallery', size: '600×200', price: '$179/mo' },
];

export default function AdminAds() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        zone: 'homepage-hero',
        budget: '',
        startDate: '',
        endDate: '',
        targetUrl: '',
        headlineEn: '',
        headlineKm: '',
        headlineZh: '',
        descriptionEn: '',
        descriptionKm: '',
        descriptionZh: '',
    });
    const [langTab, setLangTab] = useState<'en' | 'km' | 'zh'>('en');

    const handleSubmit = () => {
        // In real app: save to database
        alert(`Campaign "${formData.name}" created for zone "${formData.zone}" with budget ${formData.budget}`);
        setShowForm(false);
        setFormData({ name: '', zone: 'homepage-hero', budget: '', startDate: '', endDate: '', targetUrl: '', headlineEn: '', headlineKm: '', headlineZh: '', descriptionEn: '', descriptionKm: '', descriptionZh: '' });
    };

    const inputStyle: React.CSSProperties = { background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Ad Campaigns</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-surface-500)' }}>Manage ad placements and campaigns across NestKhmer</p>
                </div>
                <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Plus className="w-4 h-4" />New Campaign</button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                {[{ label: 'Active Campaigns', val: '3', icon: Play }, { label: 'Total Impressions', val: '68,650', icon: Eye }, { label: 'Total Clicks', val: '2,508', icon: Target }, { label: 'Revenue This Month', val: '$2,245', icon: DollarSign }].map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="glass-card p-4" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-brand-50)' }}><Icon className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-600)' }} /></div>
                            </div>
                            <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</div>
                            <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Campaign Table */}
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Campaign', 'Zone', 'Status', 'Impressions', 'Clicks', 'CTR', 'Spend', 'Period', ''].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {campaigns.map((c, i) => (
                            <motion.tr key={c.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{c.name}</td>
                                <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-surface-500)' }}>{c.zone}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: c.status === 'active' ? 'var(--color-fresh-50)' : c.status === 'paused' ? 'var(--color-warn-50)' : 'var(--color-surface-100)', color: c.status === 'active' ? 'var(--color-fresh-600)' : c.status === 'paused' ? 'var(--color-warn-600)' : 'var(--color-surface-600)' }}>{c.status}</span></td>
                                <td className="px-4 py-3 text-sm">{c.impressions.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm">{c.clicks.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--color-fresh-600)' }}>{c.ctr}</td>
                                <td className="px-4 py-3 text-sm font-semibold">{c.spend}</td>
                                <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-surface-400)' }}>{c.start} – {c.end}</td>
                                <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }}><BarChart3 className="w-3.5 h-3.5" /></button>{c.status !== 'ended' && <button className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }}>{c.status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}</button>}</div></td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ad Zones Reference */}
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Available Ad Zones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adZones.map(zone => (
                        <div key={zone.id} className="glass-card p-4" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-500)' }} />
                                <span className="text-sm font-semibold" style={{ color: 'var(--color-surface-800)' }}>{zone.label}</span>
                            </div>
                            <p className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>{zone.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-600)' }}>{zone.size}</span>
                                <span className="text-xs font-bold" style={{ color: 'var(--color-brand-600)' }}>{zone.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Campaign Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Create New Campaign</h2>
                                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                            </div>

                            <div className="space-y-5">
                                {/* Campaign Name */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Campaign Name *</label>
                                    <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Koh Pich Premium Living" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                </div>

                                {/* Zone + Budget */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Ad Zone *</label>
                                        <select value={formData.zone} onChange={e => setFormData(f => ({ ...f, zone: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                                            {adZones.map(z => <option key={z.id} value={z.id}>{z.label} ({z.price})</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Monthly Budget (USD) *</label>
                                        <input type="number" value={formData.budget} onChange={e => setFormData(f => ({ ...f, budget: e.target.value }))} placeholder="499" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Start Date *</label>
                                        <input type="date" value={formData.startDate} onChange={e => setFormData(f => ({ ...f, startDate: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>End Date *</label>
                                        <input type="date" value={formData.endDate} onChange={e => setFormData(f => ({ ...f, endDate: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
                                    </div>
                                </div>

                                {/* Target URL */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Target URL</label>
                                    <input value={formData.targetUrl} onChange={e => setFormData(f => ({ ...f, targetUrl: e.target.value }))} placeholder="https://example.com/landing-page" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200" style={inputStyle} />
                                </div>

                                {/* Creative Upload */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Ad Creative</label>
                                    <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: 'var(--color-surface-200)' }}>
                                        <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-surface-400)' }} />
                                        <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Drag & drop your ad image or <span style={{ color: 'var(--color-brand-600)' }} className="font-semibold cursor-pointer">browse</span></p>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-surface-400)' }}>PNG, JPG up to 2MB • {adZones.find(z => z.id === formData.zone)?.size || '1200×400'}</p>
                                    </div>
                                </div>

                                {/* Multi-language Headlines */}
                                <div>
                                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-surface-600)' }}>Ad Copy (Multi-language)</label>
                                    <div className="flex gap-1 mb-3">
                                        {(['en', 'km', 'zh'] as const).map(lang => (
                                            <button key={lang} onClick={() => setLangTab(lang)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: langTab === lang ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: langTab === lang ? 'white' : 'var(--color-surface-600)' }}>
                                                {lang === 'en' ? '🇬🇧 English' : lang === 'km' ? '🇰🇭 ខ្មែរ' : '🇨🇳 中文'}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <input
                                            value={langTab === 'en' ? formData.headlineEn : langTab === 'km' ? formData.headlineKm : formData.headlineZh}
                                            onChange={e => setFormData(f => ({ ...f, [langTab === 'en' ? 'headlineEn' : langTab === 'km' ? 'headlineKm' : 'headlineZh']: e.target.value }))}
                                            placeholder={`Headline (${langTab.toUpperCase()})`}
                                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-200"
                                            style={inputStyle}
                                        />
                                        <textarea
                                            value={langTab === 'en' ? formData.descriptionEn : langTab === 'km' ? formData.descriptionKm : formData.descriptionZh}
                                            onChange={e => setFormData(f => ({ ...f, [langTab === 'en' ? 'descriptionEn' : langTab === 'km' ? 'descriptionKm' : 'descriptionZh']: e.target.value }))}
                                            placeholder={`Description (${langTab.toUpperCase()})`}
                                            rows={2}
                                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-purple-200"
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3 pt-4" style={{ borderTop: '1px solid var(--color-surface-100)' }}>
                                    <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'var(--color-surface-600)' }}>Cancel</button>
                                    <button onClick={handleSubmit} disabled={!formData.name || !formData.budget || !formData.startDate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50" style={{ background: 'var(--color-brand-600)', color: 'white' }}>
                                        <Plus className="w-4 h-4" />Create Campaign
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
