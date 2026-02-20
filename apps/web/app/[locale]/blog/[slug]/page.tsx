'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BlogPostPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <article className="section-container pt-8 pb-24 max-w-3xl mx-auto">
                <a href={`/${locale}/blog`} className="flex items-center gap-1 text-sm no-underline mb-6" style={{ color: 'var(--color-brand-600)' }}><ChevronLeft className="w-4 h-4" /> Back to Blog</a>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>Market Reports</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>BKK1 Rental Market Report Q4 2025</h1>
                    <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--color-surface-400)' }}>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Feb 15, 2026</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />8 min read</span>
                        <button className="flex items-center gap-1 ml-auto" style={{ color: 'var(--color-surface-400)' }}><Share2 className="w-4 h-4" />Share</button>
                    </div>
                    <div className="rounded-2xl overflow-hidden mb-8 h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&h=500&fit=crop)' }} />
                    <div className="prose max-w-none space-y-5 text-sm leading-relaxed" style={{ color: 'var(--color-surface-700)' }}>
                        <p>The BKK1 rental market continues to evolve as Phnom Penh solidifies its position as Southeast Asia&apos;s most dynamic emerging city. In Q4 2025, we observed several key trends that both tenants and agents should understand.</p>
                        <h2 className="text-xl font-bold mt-8 mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>Key Findings</h2>
                        <ul className="space-y-2 list-disc pl-5">
                            <li>Median rent for a 1-bedroom apartment: <strong>$650/month</strong> (up 5% from Q3)</li>
                            <li>Average time-to-let decreased to <strong>6 days</strong> (from 8 days in Q3)</li>
                            <li>New supply of premium units increased by <strong>12%</strong></li>
                            <li>Expat demand remains strong, with <strong>68%</strong> of leads from international tenants</li>
                        </ul>
                        <h2 className="text-xl font-bold mt-8 mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>Price Distribution</h2>
                        <p>The price distribution in BKK1 shows a healthy spread across segments: budget studios from $350–$500, mid-range 1–2 bedrooms from $500–$1,000, and premium units above $1,000. The luxury segment above $2,000 saw the fastest growth at 15% quarter-over-quarter.</p>
                        <h2 className="text-xl font-bold mt-8 mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>Outlook for 2026</h2>
                        <p>We expect continued price appreciation of 3–5% in BKK1 as new supply is absorbed by growing demand. The area&apos;s walkability, restaurant density, and emerging tech hub status continue to attract young professionals and digital nomads.</p>
                        <div className="glass-card p-6 mt-8" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Want personalized market insights?</h3>
                            <p className="text-sm mb-3" style={{ color: 'var(--color-surface-500)' }}>Connect with a verified agent who specializes in BKK1.</p>
                            <a href={`/${locale}/agents`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}>Find a BKK1 Agent</a>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    );
}
