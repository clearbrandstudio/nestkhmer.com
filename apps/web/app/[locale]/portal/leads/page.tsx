'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageCircle, Clock, CheckCircle, XCircle, ArrowUpRight, X, Send, Paperclip, Type } from 'lucide-react';
import { useState } from 'react';

const leads = [
    { name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+44 7700 900123', listing: 'Modern Studio with Mekong View', message: 'Hi, I\'m very interested in this studio. I\'m moving to Phnom Penh next month and looking for a furnished place in BKK1. Can we schedule a viewing?', time: '5 min ago', status: 'new' as const },
    { name: 'Michael Chen', email: 'michael@email.com', phone: '+86 138 0000 0000', listing: 'Spacious 2-Bed in Toul Kork', message: 'Is this apartment available from March? I need a 2-bedroom for my family. Does it have a playground nearby?', time: '1 hour ago', status: 'new' as const },
    { name: 'Emma Williams', email: 'emma@email.com', phone: '+1 555 0123', listing: 'Luxury Penthouse on Diamond Island', message: 'Beautiful property! What are the building amenities? Is the rooftop pool heated?', time: '3 hours ago', status: 'replied' as const },
    { name: 'Tom Baker', email: 'tom@email.com', phone: '+855 12 000 000', listing: 'Cozy Flat near Russian Market', message: 'Can I negotiate the rent if I sign a 2-year lease? Also, what\'s the WiFi speed?', time: '1 day ago', status: 'replied' as const },
    { name: 'Lisa Park', email: 'lisa@email.com', phone: '+82 10 0000 0000', listing: 'Family Villa with Garden', message: 'We loved the villa! When can we sign the lease? My family is ready to move in.', time: '2 days ago', status: 'converted' as const },
];

const statusConfig = {
    new: { color: 'var(--color-fresh-600)', bg: 'var(--color-fresh-50)', icon: Clock, label: 'New' },
    replied: { color: 'var(--color-brand-600)', bg: 'var(--color-brand-50)', icon: CheckCircle, label: 'Replied' },
    converted: { color: 'var(--color-surface-600)', bg: 'var(--color-surface-100)', icon: ArrowUpRight, label: 'Converted' },
};

export default function PortalLeads() {
    const [replyModal, setReplyModal] = useState<any | null>(null);
    const [replyText, setReplyText] = useState('');

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Leads</h1>
                <div className="flex items-center gap-2">
                    {['All', 'New', 'Replied', 'Converted'].map((f, i) => (
                        <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: i === 0 ? 'var(--color-brand-600)' : 'var(--color-surface-100)', color: i === 0 ? 'white' : 'var(--color-surface-600)' }}>{f}</button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {leads.map((l, i) => {
                    const cfg = statusConfig[l.status];
                    const StatusIcon = cfg.icon;
                    return (
                        <motion.div key={l.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{l.name[0]}</div>
                                    <div>
                                        <div className="flex items-center gap-2"><span className="text-sm font-semibold" style={{ color: 'var(--color-surface-900)' }}>{l.name}</span><span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: cfg.bg, color: cfg.color }}><StatusIcon className="w-2.5 h-2.5" />{cfg.label}</span></div>
                                        <div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>for: {l.listing} · {l.time}</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm mb-4 pl-13" style={{ color: 'var(--color-surface-600)', paddingLeft: '52px' }}>{l.message}</p>
                            <div className="flex items-center gap-2 pl-13" style={{ paddingLeft: '52px' }}>
                                <button onClick={() => setReplyModal(l)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Mail className="w-3 h-3" />Reply</button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--color-fresh-50)', color: 'var(--color-fresh-700)', border: '1px solid var(--color-fresh-200)' }}><Phone className="w-3 h-3" />Call</button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }}><MessageCircle className="w-3 h-3" />Telegram</button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Reply Modal */}
            <AnimatePresence>
                {replyModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card w-full max-w-2xl p-0 overflow-hidden flex flex-col" style={{ borderRadius: 'var(--radius-2xl)', background: 'white', maxHeight: '90vh' }}>
                            {/* Header */}
                            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-surface-100)' }}>
                                <div>
                                    <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Reply to {replyModal.name}</h2>
                                    <p className="text-xs" style={{ color: 'var(--color-surface-500)' }}>Regarding: {replyModal.listing}</p>
                                </div>
                                <button onClick={() => setReplyModal(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" style={{ color: 'var(--color-surface-500)' }} /></button>
                            </div>

                            {/* Original Message */}
                            <div className="px-6 py-4 bg-gray-50" style={{ borderBottom: '1px solid var(--color-surface-100)' }}>
                                <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-surface-500)' }}>Original Message</div>
                                <p className="text-sm italic" style={{ color: 'var(--color-surface-700)' }}>"{replyModal.message}"</p>
                            </div>

                            {/* Composer */}
                            <div className="flex-1 p-6 flex flex-col min-h-[300px]">
                                <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid var(--color-surface-100)' }}>
                                    <button className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-500)' }} title="Format Text"><Type className="w-4 h-4" /></button>
                                    <button className="p-1.5 rounded hover:bg-gray-100" style={{ color: 'var(--color-surface-500)' }} title="Attach File"><Paperclip className="w-4 h-4" /></button>
                                </div>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="flex-1 w-full text-sm outline-none resize-none"
                                    placeholder="Write your reply here..."
                                    autoFocus
                                />
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-surface-100)' }}>
                                <button onClick={() => setReplyModal(null)} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'var(--color-surface-600)' }}>Cancel</button>
                                <button onClick={() => { alert('Message sent! (Demo)'); setReplyModal(null); setReplyText(''); }} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all text-white" style={{ background: 'var(--color-brand-600)' }}>
                                    <Send className="w-4 h-4" /> Send Reply
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
