'use client';
import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, Target, Megaphone, ArrowRight, Mail, Check, Upload, ExternalLink, Monitor, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { type AdZone, AD_DIMENSIONS, AD_ZONE_META } from '@/lib/ad-data';
import { AdSlot } from '@/components/ads/AdSlot';

const allZones = Object.keys(AD_ZONE_META) as AdZone[];

export default function AdvertisePage() {
    const [selectedZone, setSelectedZone] = useState<AdZone>('homepage-hero');
    const [formData, setFormData] = useState({
        companyName: '',
        title: '',
        description: '',
        destinationUrl: '',
        ctaText: 'Learn More',
        budget: '$499',
        duration: '1 month',
    });

    const dim = AD_DIMENSIONS[selectedZone];
    const meta = AD_ZONE_META[selectedZone];

    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem' }}>
            {/* Hero */}
            <section className="hero-gradient grid-pattern py-20 text-center">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--color-warn-50)', border: '1px solid rgba(251,191,36,0.2)' }}>
                            <Megaphone className="w-4 h-4" style={{ color: 'var(--color-warn-600)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-warn-700)' }}>Self-Serve Advertising</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>Reach Cambodia&apos;s <span style={{ color: 'var(--color-brand-600)' }}>Most Engaged</span> Rental Audience</h1>
                        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-surface-500)' }}>NestKhmer connects you with expats, tenants, and property seekers actively searching for homes in Phnom Penh.</p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16" style={{ background: 'var(--color-surface-950)' }}>
                <div className="section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[{ val: '200K+', label: 'Monthly Pageviews', icon: Eye }, { val: '35K+', label: 'Monthly Users', icon: Users }, { val: '4.2%', label: 'Avg CTR', icon: Target }, { val: '12%', label: 'Email Open Rate', icon: Mail }].map(s => {
                            const Icon = s.icon;
                            return <div key={s.label}><Icon className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-brand-400)' }} /><div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</div><div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>{s.label}</div></div>;
                        })}
                    </div>
                </div>
            </section>

            {/* Ad Zones Catalog */}
            <section className="py-20" style={{ background: 'var(--color-surface-50)' }}>
                <div className="section-container">
                    <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Advertising Zones</h2>
                    <p className="text-center mb-12" style={{ color: 'var(--color-surface-500)' }}>Premium placements with full UTM tracking and real-time analytics.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {allZones.map((zone, i) => {
                            const z = AD_ZONE_META[zone];
                            const d = AD_DIMENSIONS[zone];
                            return (
                                <motion.div key={zone} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{z.name}</h3>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{z.page}</span>
                                    </div>

                                    {/* Dimension visual */}
                                    <div className="mb-3 flex items-center justify-center p-3 rounded-lg" style={{ background: 'var(--color-surface-50)', border: '1px dashed var(--color-surface-200)' }}>
                                        <div
                                            className="rounded flex items-center justify-center text-[9px] font-bold"
                                            style={{
                                                width: Math.min(d.width / 4, 180),
                                                height: Math.min(d.height / 4, 80),
                                                background: 'var(--color-brand-100)',
                                                color: 'var(--color-brand-700)',
                                                border: '1px solid var(--color-brand-200)',
                                            }}
                                        >
                                            {d.width}×{d.height}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mb-3 p-2.5 rounded-lg" style={{ background: 'var(--color-surface-50)' }}>
                                        <div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>Reach</div><div className="text-xs font-bold">{z.reach}</div></div>
                                        <div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>CTR</div><div className="text-xs font-bold" style={{ color: 'var(--color-fresh-600)' }}>{z.ctr}</div></div>
                                        <div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>From</div><div className="text-xs font-bold" style={{ color: 'var(--color-brand-600)' }}>{z.price}</div></div>
                                    </div>
                                    <ul className="space-y-1 text-[10px]" style={{ color: 'var(--color-surface-500)' }}>
                                        {['Full UTM tracking', 'Real-time analytics', 'A/B creative testing'].map(f => <li key={f} className="flex items-center gap-1"><Check className="w-2.5 h-2.5" style={{ color: 'var(--color-fresh-500)' }} />{f}</li>)}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Self-Serve Ad Creator */}
            <section className="py-20" style={{ background: 'white' }}>
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Create Your Ad</h2>
                        <p style={{ color: 'var(--color-surface-500)' }}>Set up your campaign in minutes. Choose a zone, upload your creative, and go live.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {/* Form */}
                        <div className="glass-card p-8" style={{ borderRadius: 'var(--radius-2xl)' }}>
                            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Ad submitted for review! (Demo mode)'); }}>
                                {/* Zone Selector */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Ad Zone</label>
                                    <select
                                        value={selectedZone}
                                        onChange={(e) => setSelectedZone(e.target.value as AdZone)}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                    >
                                        {allZones.map(zone => (
                                            <option key={zone} value={zone}>
                                                {AD_ZONE_META[zone].name} — {AD_DIMENSIONS[zone].label} — {AD_ZONE_META[zone].price}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-700)' }}>
                                            <Monitor className="w-3 h-3 inline mr-1" />{dim.width}×{dim.height}px
                                        </span>
                                        <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>
                                            {dim.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Company Name</label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData(p => ({ ...p, companyName: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                        placeholder="e.g., ERA Cambodia"
                                        required
                                    />
                                </div>

                                {/* Ad Title */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Ad Headline</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                        placeholder="e.g., Premium Island Living"
                                        maxLength={60}
                                        required
                                    />
                                    <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-surface-400)' }}>{formData.title.length}/60 characters</span>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                        style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                        placeholder="Short description of your offer..."
                                        rows={2}
                                        maxLength={120}
                                        required
                                    />
                                    <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-surface-400)' }}>{formData.description.length}/120 characters</span>
                                </div>

                                {/* Creative Upload */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>
                                        Creative Image
                                        <span className="font-normal ml-1" style={{ color: 'var(--color-surface-400)' }}>({dim.width}×{dim.height}px)</span>
                                    </label>
                                    <div
                                        className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer transition-colors"
                                        style={{ border: '2px dashed var(--color-surface-200)', background: 'var(--color-surface-50)' }}
                                    >
                                        <Upload className="w-6 h-6" style={{ color: 'var(--color-surface-400)' }} />
                                        <span className="text-sm font-medium" style={{ color: 'var(--color-surface-500)' }}>
                                            Click to upload or drag and drop
                                        </span>
                                        <span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>
                                            PNG, JPG or WebP • Max 2MB • {dim.width}×{dim.height}px recommended
                                        </span>
                                    </div>
                                </div>

                                {/* Destination URL */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Destination URL</label>
                                    <div className="relative">
                                        <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                        <input
                                            type="url"
                                            value={formData.destinationUrl}
                                            onChange={(e) => setFormData(p => ({ ...p, destinationUrl: e.target.value }))}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                                            style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                            placeholder="https://your-website.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* CTA Text */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Button Text</label>
                                    <select
                                        value={formData.ctaText}
                                        onChange={(e) => setFormData(p => ({ ...p, ctaText: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                    >
                                        {['Learn More', 'Get Started', 'View Properties', 'Book a Tour', 'Get Quote', 'Download App', 'Open Account', 'Sign Up', 'Contact Us'].map(cta =>
                                            <option key={cta} value={cta}>{cta}</option>
                                        )}
                                    </select>
                                </div>

                                {/* Budget & Duration */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Budget</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData(p => ({ ...p, budget: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                            style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                        >
                                            <option>{meta.price}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>Duration</label>
                                        <select
                                            value={formData.duration}
                                            onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                            style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-800)' }}
                                        >
                                            {['1 week', '2 weeks', '1 month', '3 months', '6 months', '12 months'].map(d =>
                                                <option key={d} value={d}>{d}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all"
                                    style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}
                                >
                                    Submit Ad for Review
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <p className="text-[10px] text-center" style={{ color: 'var(--color-surface-400)' }}>
                                    Ads are reviewed within 24 hours. UTM tracking is automatically appended to your URL.
                                </p>
                            </form>
                        </div>

                        {/* Live Preview */}
                        <div>
                            <div className="sticky top-24">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-surface-500)' }}>Live Preview</h3>

                                {/* Zone info */}
                                <div className="glass-card p-4 mb-4" style={{ borderRadius: 'var(--radius-xl)' }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{meta.name}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{meta.page}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 text-xs">
                                        <div><span style={{ color: 'var(--color-surface-400)' }}>Size:</span> <strong>{dim.width}×{dim.height}px</strong></div>
                                        <div><span style={{ color: 'var(--color-surface-400)' }}>Reach:</span> <strong>{meta.reach}</strong></div>
                                        <div><span style={{ color: 'var(--color-surface-400)' }}>CTR:</span> <strong style={{ color: 'var(--color-fresh-600)' }}>{meta.ctr}</strong></div>
                                    </div>
                                </div>

                                {/* Preview of actual ad */}
                                <div className="p-4 rounded-xl" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-100)' }}>
                                    <div className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-surface-400)' }}>
                                        How your ad appears
                                    </div>
                                    <AdSlot zone={selectedZone} />
                                </div>

                                {/* Dimension guide */}
                                <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--color-surface-50)', border: '1px dashed var(--color-surface-200)' }}>
                                    <div className="text-xs font-bold mb-2" style={{ color: 'var(--color-surface-600)' }}>Creative Specs</div>
                                    <div className="space-y-1.5 text-xs" style={{ color: 'var(--color-surface-500)' }}>
                                        <div className="flex justify-between"><span>Dimensions:</span> <strong>{dim.width} × {dim.height}px</strong></div>
                                        <div className="flex justify-between"><span>Format:</span> <strong>PNG, JPG, WebP</strong></div>
                                        <div className="flex justify-between"><span>Max file size:</span> <strong>2 MB</strong></div>
                                        <div className="flex justify-between"><span>Headline limit:</span> <strong>60 characters</strong></div>
                                        <div className="flex justify-between"><span>Description limit:</span> <strong>120 characters</strong></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16" style={{ background: 'var(--color-surface-950)' }}>
                <div className="section-container text-center">
                    <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Need a Custom Campaign?</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--color-surface-400)' }}>For custom placements, sponsorships, or bulk deals — reach out to our team.</p>
                    <a href="mailto:ads@nestkhmer.com" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                        <Mail className="w-4 h-4" />Contact Sales
                    </a>
                </div>
            </section>
        </div>
    );
}
