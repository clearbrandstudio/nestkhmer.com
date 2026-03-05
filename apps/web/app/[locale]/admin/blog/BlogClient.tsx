'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

import { deleteBlogPost, updateBlogPostStatus } from './actions';

export default function BlogClient({ initialPosts }: { initialPosts: any[] }) {
    const [postsState, setPostsState] = useState(initialPosts);
    const [deleteModal, setDeleteModal] = useState<{ id: string, title: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        setIsSubmitting(true);
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        const res = await updateBlogPostStatus(id, newStatus);
        setIsSubmitting(false);

        if (res.error) {
            alert('Error: ' + res.error);
        } else {
            setPostsState(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        }
    };

    const handleDelete = async () => {
        if (!deleteModal) return;
        setIsSubmitting(true);
        const res = await deleteBlogPost(deleteModal.id);
        setIsSubmitting(false);

        if (res.error) {
            alert('Error: ' + res.error);
        } else {
            setPostsState(prev => prev.filter(p => p.id !== deleteModal.id));
            setDeleteModal(null);
        }
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Blog Management</h1>
                <Link href="/en/admin/pages/editor" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Plus className="w-4 h-4" />New Post</Link>
            </div>
            <div className="glass-card overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
                <table className="w-full">
                    <thead><tr style={{ background: 'var(--color-surface-50)', borderBottom: '1px solid var(--color-surface-100)' }}>
                        {['Title', 'Category', 'Status', 'Date', 'Views', 'Actions'].map(h => <th key={h} className="text-left text-xs font-medium px-4 py-3" style={{ color: 'var(--color-surface-500)' }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {postsState.map((p, i) => (
                            <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} style={{ borderBottom: '1px solid var(--color-surface-50)' }}>
                                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{p.title}</td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{p.category}</span></td>
                                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: p.status === 'published' ? 'var(--color-fresh-50)' : 'var(--color-surface-100)', color: p.status === 'published' ? 'var(--color-fresh-600)' : 'var(--color-surface-600)' }}>{p.status}</span></td>
                                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-surface-500)' }}>{p.date}</td>
                                <td className="px-4 py-3 text-sm">{p.views.toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-1">
                                        <Link href={`/en/admin/pages/editor?id=${p.id}`} className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }}><Edit2 className="w-3.5 h-3.5" /></Link>
                                        <button onClick={() => handleToggleStatus(p.id, p.status)} disabled={isSubmitting} className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-400)' }}>{p.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button>
                                        <button onClick={() => setDeleteModal({ id: p.id, title: p.title })} className="p-1.5 rounded hover:bg-red-50" style={{ color: 'var(--color-danger-400)' }}><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            <AnimatePresence>
                {deleteModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-sm p-6" style={{ borderRadius: 'var(--radius-2xl)', background: 'white' }}>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(239,68,68,0.1)' }}>
                                    <Trash2 className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Delete Post</h3>
                                <p className="text-sm mb-6" style={{ color: 'var(--color-surface-500)' }}>
                                    Are you sure you want to delete this post? This action cannot be undone.
                                </p>
                                <div className="flex w-full gap-3">
                                    <button onClick={() => setDeleteModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>Cancel</button>
                                    <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-danger-600)' }}>
                                        {isSubmitting ? 'Deleting...' : 'Delete'}
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
