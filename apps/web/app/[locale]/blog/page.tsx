'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

const posts = [
    { title: 'BKK1 Rental Market Report Q4 2025', excerpt: 'Deep dive into BKK1 rental trends — median prices, vacancy rates, and what to expect in 2026.', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop', category: 'Market Reports', date: 'Feb 15, 2026', readTime: '8 min', slug: 'bkk1-rental-market-q4-2025' },
    { title: 'How to Spot a Fake Listing in Cambodia', excerpt: 'Our team analyzed 5,000 listings to identify the red flags. Here are the top 10 signs a listing is fake.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop', category: 'Guides', date: 'Feb 10, 2026', readTime: '6 min', slug: 'spot-fake-listings-cambodia' },
    { title: 'Expat Guide: Renting in Phnom Penh', excerpt: 'Everything you need to know about renting in Phnom Penh — from deposits to lease terms to hidden costs.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=400&fit=crop', category: 'Guides', date: 'Feb 5, 2026', readTime: '12 min', slug: 'expat-guide-renting-phnom-penh' },
    { title: 'Understanding NestScore: How Agents Are Rated', excerpt: 'Transparency is our foundation. Learn exactly how we calculate NestScore and what each component means.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=400&fit=crop', category: 'Platform', date: 'Jan 28, 2026', readTime: '5 min', slug: 'understanding-nestscore' },
    { title: 'Top 5 Family-Friendly Districts in Phnom Penh', excerpt: 'Schools, parks, safety scores, and community feel — we rank the best areas for families.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop', category: 'Neighbourhood', date: 'Jan 20, 2026', readTime: '7 min', slug: 'family-friendly-districts' },
    { title: 'Cambodia Real Estate Trends 2026', excerpt: 'The rental landscape is evolving rapidly. Here are the key trends every tenant and agent should know.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=400&fit=crop', category: 'Market Reports', date: 'Jan 15, 2026', readTime: '10 min', slug: 'real-estate-trends-2026' },
];

const categories = ['All', 'Market Reports', 'Guides', 'Platform', 'Neighbourhood'];

export default function BlogPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>NestKhmer Blog</h1>
                    <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>Market reports, neighbourhood guides, and rental intelligence for Cambodia.</p>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {categories.map((c, i) => (
                        <button key={c} className="px-4 py-2 rounded-full text-sm font-medium transition-all" style={{ background: i === 0 ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: i === 0 ? 'white' : 'var(--color-surface-600)' }}>{c}</button>
                    ))}
                </div>

                {/* Featured Post */}
                <motion.a href={`/${locale}/blog/${posts[0].slug}`} className="glass-card overflow-hidden no-underline grid grid-cols-1 md:grid-cols-2 gap-0 mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}>
                    <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${posts[0].image})` }} />
                    <div className="p-8 flex flex-col justify-center">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block w-fit mb-3" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{posts[0].category}</span>
                        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{posts[0].title}</h2>
                        <p className="text-sm mb-4" style={{ color: 'var(--color-surface-500)' }}>{posts[0].excerpt}</p>
                        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-surface-400)' }}>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{posts[0].date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{posts[0].readTime}</span>
                        </div>
                    </div>
                </motion.a>

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(1).map((p, i) => (
                        <motion.a key={p.slug} href={`/${locale}/blog/${p.slug}`} className="glass-card overflow-hidden no-underline group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
                            <div className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${p.image})` }} />
                            <div className="p-5">
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{p.category}</span>
                                <h3 className="text-base font-bold mt-2 mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{p.title}</h3>
                                <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--color-surface-500)' }}>{p.excerpt}</p>
                                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-surface-400)' }}>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
