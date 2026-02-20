'use client';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft, Globe, Tag, Image, Type, LayoutGrid, Code, AlignLeft, FileText, Settings } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type ContentBlock = { id: string; type: 'text' | 'heading' | 'image' | 'stats' | 'cta'; content: string };

export default function PageEditor() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    const [pageData, setPageData] = useState({
        title: '',
        titleKm: '',
        titleZh: '',
        slug: '',
        type: 'page' as 'page' | 'post',
        status: 'draft' as 'draft' | 'published',
        category: '',
        tags: '',
        metaTitle: '',
        metaDescription: '',
        featuredImage: '',
    });

    const [activeLang, setActiveLang] = useState<'en' | 'km' | 'zh'>('en');
    const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
    const [blocks, setBlocks] = useState<ContentBlock[]>([
        { id: '1', type: 'heading', content: '' },
        { id: '2', type: 'text', content: '' },
    ]);

    const addBlock = (type: ContentBlock['type']) => {
        setBlocks(prev => [...prev, { id: Date.now().toString(), type, content: '' }]);
    };

    const updateBlock = (id: string, content: string) => {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(prev => prev.filter(b => b.id !== id));
    };

    const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const blockTypeIcons: Record<string, any> = { text: AlignLeft, heading: Type, image: Image, stats: LayoutGrid, cta: FileText };

    return (
        <div className="p-6 md:p-8 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <a href={`/${locale}/admin/pages`} className="p-2 rounded-lg no-underline" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-600)' }}><ArrowLeft className="w-4 h-4" /></a>
                    <div>
                        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Page Editor</h1>
                        <p className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Create or edit a custom page or blog post</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-600)' }}><Eye className="w-3.5 h-3.5" />Preview</button>
                    <button onClick={() => alert('Page saved! (Demo mode)')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Save className="w-3.5 h-3.5" />Publish</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Type + Language Selector */}
                    <div className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex gap-1 p-1 rounded-xl flex-1" style={{ background: 'var(--color-surface-100)' }}>
                                {(['page', 'post'] as const).map(t => (
                                    <button key={t} onClick={() => setPageData(p => ({ ...p, type: t }))} className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all capitalize" style={{ background: pageData.type === t ? 'white' : 'transparent', color: pageData.type === t ? 'var(--color-brand-700)' : 'var(--color-surface-500)', boxShadow: pageData.type === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--color-surface-100)' }}>
                                {([['en', '🇬🇧'], ['km', '🇰🇭'], ['zh', '🇨🇳']] as const).map(([code, flag]) => (
                                    <button key={code} onClick={() => setActiveLang(code)} className="py-2 px-3 rounded-lg text-xs font-semibold transition-all" style={{ background: activeLang === code ? 'white' : 'transparent', boxShadow: activeLang === code ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>
                                        {flag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <input
                            type="text"
                            value={activeLang === 'en' ? pageData.title : activeLang === 'km' ? pageData.titleKm : pageData.titleZh}
                            onChange={(e) => {
                                const key = activeLang === 'en' ? 'title' : activeLang === 'km' ? 'titleKm' : 'titleZh';
                                setPageData(p => ({ ...p, [key]: e.target.value, ...(key === 'title' && !pageData.slug ? { slug: autoSlug(e.target.value) } : {}) }));
                            }}
                            className="w-full text-2xl font-bold outline-none mb-2"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}
                            placeholder={activeLang === 'en' ? 'Page title...' : activeLang === 'km' ? 'ចំណងជើងទំព័រ...' : '页面标题...'}
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>/{locale}/</span>
                            <input value={pageData.slug} onChange={(e) => setPageData(p => ({ ...p, slug: e.target.value }))} className="text-xs outline-none px-2 py-1 rounded" style={{ background: 'var(--color-surface-50)', color: 'var(--color-surface-600)', border: '1px solid var(--color-surface-200)' }} placeholder="page-slug" />
                        </div>
                    </div>

                    {/* Content Blocks */}
                    <div className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Content Blocks</h3>
                            <div className="flex gap-1">
                                {(['heading', 'text', 'image', 'stats', 'cta'] as const).map(type => {
                                    const Icon = blockTypeIcons[type];
                                    return (
                                        <button key={type} onClick={() => addBlock(type)} className="p-1.5 rounded-lg text-[10px] flex items-center gap-1 transition-colors" style={{ color: 'var(--color-surface-500)', background: 'var(--color-surface-50)' }} title={`Add ${type}`}>
                                            <Icon className="w-3 h-3" />{type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {blocks.map((block, i) => {
                                const Icon = blockTypeIcons[block.type];
                                return (
                                    <motion.div key={block.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group relative">
                                        <div className="flex items-start gap-2">
                                            <div className="flex-shrink-0 mt-3 w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--color-surface-100)' }}>
                                                <Icon className="w-3 h-3" style={{ color: 'var(--color-surface-400)' }} />
                                            </div>
                                            {block.type === 'text' ? (
                                                <textarea
                                                    value={block.content}
                                                    onChange={(e) => updateBlock(block.id, e.target.value)}
                                                    className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                                                    style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', minHeight: 80 }}
                                                    placeholder="Write your content here..."
                                                />
                                            ) : block.type === 'heading' ? (
                                                <input
                                                    value={block.content}
                                                    onChange={(e) => updateBlock(block.id, e.target.value)}
                                                    className="flex-1 px-3 py-2.5 rounded-xl text-lg font-bold outline-none"
                                                    style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', fontFamily: 'var(--font-heading)' }}
                                                    placeholder="Section heading..."
                                                />
                                            ) : block.type === 'image' ? (
                                                <div className="flex-1 flex items-center justify-center p-6 rounded-xl cursor-pointer" style={{ border: '2px dashed var(--color-surface-200)', background: 'var(--color-surface-50)' }}>
                                                    <div className="text-center"><Image className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--color-surface-400)' }} /><span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Click to add image</span></div>
                                                </div>
                                            ) : (
                                                <input
                                                    value={block.content}
                                                    onChange={(e) => updateBlock(block.id, e.target.value)}
                                                    className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none"
                                                    style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}
                                                    placeholder={block.type === 'stats' ? 'Stats data (JSON)...' : 'CTA text & link...'}
                                                />
                                            )}
                                            <button onClick={() => removeBlock(block.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-xs" style={{ color: 'var(--color-danger-500)' }}>✕</button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Publishing */}
                    <div className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Publishing</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-500)' }}>Status</label>
                                <select value={pageData.status} onChange={(e) => setPageData(p => ({ ...p, status: e.target.value as any }))} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-500)' }}>Category</label>
                                <select value={pageData.category} onChange={(e) => setPageData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}>
                                    <option value="">Select category</option>
                                    <option value="market-report">Market Report</option>
                                    <option value="neighbourhood-guide">Neighbourhood Guide</option>
                                    <option value="expat-guide">Expat Guide</option>
                                    <option value="investment">Investment</option>
                                    <option value="news">News</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-500)' }}>Tags</label>
                                <input value={pageData.tags} onChange={(e) => setPageData(p => ({ ...p, tags: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} placeholder="BKK1, rental, market" />
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>SEO Settings</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-500)' }}>Meta Title</label>
                                <input value={pageData.metaTitle} onChange={(e) => setPageData(p => ({ ...p, metaTitle: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} placeholder="SEO title..." maxLength={60} />
                                <span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>{pageData.metaTitle.length}/60</span>
                            </div>
                            <div>
                                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--color-surface-500)' }}>Meta Description</label>
                                <textarea value={pageData.metaDescription} onChange={(e) => setPageData(p => ({ ...p, metaDescription: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} placeholder="SEO description..." rows={3} maxLength={160} />
                                <span className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>{pageData.metaDescription.length}/160</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Featured Image</h3>
                        <div className="flex items-center justify-center p-8 rounded-xl cursor-pointer" style={{ border: '2px dashed var(--color-surface-200)', background: 'var(--color-surface-50)' }}>
                            <div className="text-center">
                                <Image className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--color-surface-400)' }} />
                                <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Upload featured image</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
