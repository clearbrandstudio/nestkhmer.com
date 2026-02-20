'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    return (
        <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <div className="section-container pt-8 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Get in Touch</h1>
                    <p className="text-lg max-w-lg mx-auto" style={{ color: 'var(--color-surface-500)' }}>Have a question, partnership proposal, or just want to say hi? We&apos;d love to hear from you.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        {[
                            { icon: Mail, label: 'Email', value: 'hello@nestkhmer.com', href: 'mailto:hello@nestkhmer.com' },
                            { icon: Phone, label: 'Phone', value: '+855 12 345 678', href: 'tel:+85512345678' },
                            { icon: Send, label: 'Telegram', value: '@nestkhmer', href: 'https://t.me/nestkhmer' },
                            { icon: MapPin, label: 'Address', value: 'Phnom Penh, Cambodia', href: '#' },
                            { icon: Clock, label: 'Hours', value: 'Mon – Fri, 9:00 – 18:00 ICT', href: '#' },
                        ].map(c => {
                            const Icon = c.icon;
                            return (
                                <a key={c.label} href={c.href} className="glass-card p-5 flex items-center gap-4 no-underline transition-all" style={{ borderRadius: 'var(--radius-xl)' }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-50)' }}><Icon className="w-5 h-5" style={{ color: 'var(--color-brand-600)' }} /></div>
                                    <div><div className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{c.label}</div><div className="text-sm font-medium" style={{ color: 'var(--color-surface-800)' }}>{c.value}</div></div>
                                </a>
                            );
                        })}
                    </motion.div>

                    {/* Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="glass-card p-8" style={{ borderRadius: 'var(--radius-2xl)' }}>
                            {sent ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-fresh-50)' }}><Send className="w-7 h-7" style={{ color: 'var(--color-fresh-600)' }} /></div>
                                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent!</h3>
                                    <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>We&apos;ll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Name</label><input required className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Email</label><input type="email" required className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Subject</label>
                                        <select className="w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                                            <option>General Inquiry</option><option>Partnership</option><option>Advertising</option><option>Bug Report</option><option>Press</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Message</label><textarea required rows={5} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                                    <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}><Send className="w-4 h-4" />Send Message</button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
