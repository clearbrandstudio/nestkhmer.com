'use client';
import { motion } from 'framer-motion';
import { Save, Globe, Bell, Shield, Palette, Database, Mail as MailIcon, Link as LinkIcon, Cpu, Zap } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
    const [saved, setSaved] = useState(false);
    return (
        <div className="p-6 md:p-8 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Settings</h1>
                <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white' }}><Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save'}</button>
            </div>

            <div className="space-y-6">
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5" style={{ color: 'var(--color-brand-500)' }} /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>General</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Site Name</label><input defaultValue="NestKhmer" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Default Language</label><select className="w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}><option>English</option><option>Khmer</option><option>Chinese</option></select></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Default Currency</label><input defaultValue="USD" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Timezone</label><input defaultValue="Asia/Phnom_Penh" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                    </div>
                </div>

                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5" style={{ color: 'var(--color-fresh-500)' }} /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Listing Rules</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Auto-Expire Days</label><input type="number" defaultValue={14} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Min Photos Required</label><input type="number" defaultValue={5} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Require Electric Rate</label><select className="w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}><option>Yes</option><option>No</option></select></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Require Water Rate</label><select className="w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}><option>Yes</option><option>No</option></select></div>
                    </div>
                </div>

                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-4"><Bell className="w-5 h-5" style={{ color: 'var(--color-warn-500)' }} /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Notifications</h2></div>
                    <div className="space-y-3">
                        {['New agent registration', 'KYC submission', 'Listing pending review', 'Listing expiring soon', 'New ad campaign'].map(n => (
                            <label key={n} className="flex items-center justify-between p-3 rounded-lg cursor-pointer" style={{ background: 'var(--color-surface-50)' }}>
                                <span className="text-sm" style={{ color: 'var(--color-surface-700)' }}>{n}</span>
                                <input type="checkbox" defaultChecked className="w-4 h-4 accent-purple-600" />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-4"><MailIcon className="w-5 h-5" style={{ color: 'var(--color-surface-700)' }} /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Email Configuration</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>SMTP Host</label><input defaultValue="smtp.resend.com" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>From Email</label><input defaultValue="noreply@nestkhmer.com" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-4"><LinkIcon className="w-5 h-5" style={{ color: '#0088cc' }} /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Social Links</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Telegram', placeholder: 'https://t.me/nestkhmer', defaultValue: 'https://t.me/nestkhmer' },
                            { label: 'Facebook', placeholder: 'https://facebook.com/nestkhmer', defaultValue: 'https://facebook.com/nestkhmer' },
                            { label: 'Instagram', placeholder: 'https://instagram.com/nestkhmer', defaultValue: 'https://instagram.com/nestkhmer' },
                            { label: 'TikTok', placeholder: 'https://tiktok.com/@nestkhmer', defaultValue: '' },
                            { label: 'YouTube', placeholder: 'https://youtube.com/@nestkhmer', defaultValue: '' },
                            { label: 'Twitter / X', placeholder: 'https://x.com/nestkhmer', defaultValue: '' },
                            { label: 'LinkedIn', placeholder: 'https://linkedin.com/company/nestkhmer', defaultValue: '' },
                        ].map(s => (
                            <div key={s.label}><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>{s.label}</label><input defaultValue={s.defaultValue} placeholder={s.placeholder} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        ))}
                    </div>
                </div>

                {/* AI / LLM Configuration */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center gap-2 mb-2"><Cpu className="w-5 h-5" style={{ color: 'var(--color-brand-500)' }} /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>AI / LLM Configuration</h2></div>
                    <p className="text-xs mb-4" style={{ color: 'var(--color-surface-400)' }}>Connect an AI model for automated market summaries, listing SEO, and smart matching.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Provider</label>
                            <select defaultValue="openrouter" className="w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }}>
                                <option value="openrouter">OpenRouter</option>
                                <option value="ollama">Ollama (Local)</option>
                                <option value="openai">OpenAI</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Model</label>
                            <input defaultValue="meta-llama/llama-3.1-8b-instruct" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>API Key</label>
                            <input type="password" defaultValue="" placeholder="sk-or-..." className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--color-surface-700)' }}>Base URL</label>
                            <input defaultValue="https://openrouter.ai/api/v1" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}>
                            <Zap className="w-3.5 h-3.5" />Test Connection
                        </button>
                        <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>Estimated cost: ~$2–5/month for daily AI tasks</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
