'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    slug: string;
}

export default function BlogClient({ initialPosts, categories, locale }: { initialPosts: BlogPost[], categories: string[], locale: string }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? initialPosts
        : initialPosts.filter(p => p.category === activeCategory);

    return (
        <div className="section-container pt-8 pb-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>NestKhmer Blog</h1>
                <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>Market reports, neighbourhood guides, and rental intelligence for Cambodia.</p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {categories.map((c) => (
                    <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                        style={{
                            background: activeCategory === c ? 'var(--color-brand-600)' : 'var(--color-surface-100)',
                            color: activeCategory === c ? 'white' : 'var(--color-surface-600)'
                        }}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {filteredPosts.length > 0 ? (
                <>
                    {/* Featured Post */}
                    <motion.a href={`/${locale}/blog/${filteredPosts[0].slug}`} className="glass-card overflow-hidden no-underline grid grid-cols-1 md:grid-cols-2 gap-0 mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}>
                        <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${filteredPosts[0].image})` }} />
                        <div className="p-8 flex flex-col justify-center">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block w-fit mb-3" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{filteredPosts[0].category}</span>
                            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{filteredPosts[0].title}</h2>
                            <p className="text-sm mb-4" style={{ color: 'var(--color-surface-500)' }}>{filteredPosts[0].excerpt}</p>
                            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-surface-400)' }}>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{filteredPosts[0].date}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{filteredPosts[0].readTime}</span>
                            </div>
                        </div>
                    </motion.a>

                    {/* Post Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.slice(1).map((p, i) => (
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
                </>
            ) : (
                <div className="text-center py-20">
                    <p style={{ color: 'var(--color-surface-500)' }}>No posts found in this category.</p>
                </div>
            )}
        </div>
    );
}
