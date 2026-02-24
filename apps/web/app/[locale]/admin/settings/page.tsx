'use client';
import { motion } from 'framer-motion';
import { Save, Globe, Bell, Shield, Database, Mail as MailIcon, Link as LinkIcon, Cpu, Layout, Bot, Key, AlignLeft, BarChart2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
    const [saved, setSaved] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle');
    const [aiSaved, setAiSaved] = useState(false);
    const [cmsSaved, setCmsSaved] = useState(false);
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        'New agent registration': true,
        'KYC submission': true,
        'Listing pending review': true,
        'Listing expiring soon': false,
        'New ad campaign': true
    });

    const handleTestConnection = () => {
        setTesting(true);
        setTestResult('idle');
        setTimeout(() => {
            setTesting(false);
            setTestResult('success');
            setTimeout(() => setTestResult('idle'), 3000);
        }, 1500);
    };
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
                            <div key={n} className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-white" style={{ background: 'var(--color-surface-50)' }}>
                                <span className="text-sm font-medium" style={{ color: 'var(--color-surface-700)' }}>{n}</span>
                                <button
                                    onClick={() => setToggles(p => ({ ...p, [n]: !p[n] }))}
                                    className="relative flex items-center w-[42px] h-[24px] rounded-full p-1 transition-colors duration-300"
                                    style={{ background: toggles[n] ? 'var(--color-brand-600)' : 'var(--color-surface-200)' }}
                                >
                                    <motion.div
                                        layout
                                        initial={false}
                                        animate={{ x: toggles[n] ? 18 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="w-[18px] h-[18px] bg-white rounded-full shadow-sm"
                                    />
                                </button>
                            </div>
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

                {/* AI Integration Hub */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2"><Cpu className="w-5 h-5 text-purple-600" /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>AI Integration Hub</h2></div>
                        <button onClick={() => { setAiSaved(true); setTimeout(() => setAiSaved(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"><Save className="w-3.5 h-3.5" />{aiSaved ? 'Saved API Keys' : 'Save AI Config'}</button>
                    </div>
                    <p className="text-sm mb-6 pb-4 border-b border-gray-100" style={{ color: 'var(--color-surface-500)' }}>Configure the Large Language Models and Bot infrastructure that powers NestKhmer's autonomous agent features.</p>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><Bot className="w-4 h-4 text-blue-500" /> Telegram Bot API Key</label>
                            <p className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>Used for pushing instant notifications to agents and managing leads directly via Telegram.</p>
                            <div className="relative">
                                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" placeholder="bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none font-mono" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><Cpu className="w-4 h-4 text-emerald-500" /> OpenRouter API Key <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase">Primary LLM</span></label>
                            <p className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>Connects the platform to models like Claude 3.5 Sonnet to autonomously draft property descriptions and summarize market trends.</p>
                            <div className="relative">
                                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxx" className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none font-mono" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><AlignLeft className="w-4 h-4 text-orange-500" /> Agent System Directives (MCP)</label>
                            <p className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>The core system prompt guiding how the integrated AI agents behave, format data, and respond to users.</p>
                            <textarea rows={4} placeholder="You are an expert real estate AI assistant for NestKhmer. Your goal is to maximize lead conversion and provide highly accurate market valuations based on Phnom Penh districts..." className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none font-mono" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>
                    </div>
                </div>

                {/* Global CMS Settings */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2"><Layout className="w-5 h-5 text-blue-600" /><h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Global Component CMS</h2></div>
                        <button onClick={() => { setCmsSaved(true); setTimeout(() => setCmsSaved(false), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"><Save className="w-3.5 h-3.5" />{cmsSaved ? 'Saved Content' : 'Save CMS Data'}</button>
                    </div>
                    <p className="text-sm mb-6 pb-4 border-b border-gray-100" style={{ color: 'var(--color-surface-500)' }}>Manage site-wide text strings, footer details, and default Artificial Intelligence Optimization (AIO) & SEO metadata.</p>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><BarChart2 className="w-4 h-4 text-green-600" /> Default SEO / AIO Title Format</label>
                            <p className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>The fallback title structure used to outrank competitors. AI tools will scrape this.</p>
                            <input defaultValue="NestKhmer - Premium Real Estate & Property in Cambodia" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1.5 flex items-center gap-2" style={{ color: 'var(--color-surface-800)' }}><AlignLeft className="w-4 h-4 text-gray-500" /> Global Footer Tagline</label>
                            <p className="text-xs mb-2" style={{ color: 'var(--color-surface-500)' }}>Appears on the bottom left of the global footer components.</p>
                            <textarea rows={2} defaultValue="Cambodia's premier real estate platform connecting expats and locals with verified, high-quality properties across the Kingdom." className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold mb-1.5 block" style={{ color: 'var(--color-surface-800)' }}>Global Contact Email</label>
                                <input defaultValue="hello@nestkhmer.com" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-1.5 block" style={{ color: 'var(--color-surface-800)' }}>Global Contact Phone</label>
                                <input defaultValue="+855 12 345 678" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold mb-1.5 block" style={{ color: 'var(--color-surface-800)' }}>Office Address</label>
                            <input defaultValue="Exchange Square, 19th Floor, Street 106, Phnom Penh" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button onClick={handleTestConnection} disabled={testing} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed" style={{ background: 'var(--color-surface-900)', color: 'white' }}>
                        {testing ? <><Database className="w-4 h-4 animate-spin" /> Connecting...</> : testResult === 'success' ? <><Database className="w-4 h-4 text-green-400" /> Connection Successful!</> : <><Database className="w-4 h-4" /> Test Database Connection</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
