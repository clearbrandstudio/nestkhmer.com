'use client';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';
import { Camera, Globe, Phone as PhoneIcon, Mail, Save } from 'lucide-react';
import { useState } from 'react';

export default function PortalProfile() {
    const { user } = useAuth();
    const [saved, setSaved] = useState(false);
    return (
        <div className="p-6 md:p-8 max-w-3xl">
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Profile Settings</h1>
            <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="space-y-6">
                {/* Avatar */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Photo</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: 'var(--color-brand-100)', color: 'var(--color-brand-600)' }}>{user?.name?.[0] || 'A'}</div>
                        <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-600)' }}><Camera className="w-4 h-4" />Upload Photo</button>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="glass-card p-6" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Full Name</label><input defaultValue={user?.name} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Agency</label><input defaultValue="IPS Cambodia" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Email</label><input defaultValue={user?.email} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Phone</label><input defaultValue="+855 12 345 678" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Telegram</label><input defaultValue="@sopheachan" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                        <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Languages</label><input defaultValue="English, Khmer, Mandarin" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                    </div>
                    <div className="mt-4"><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Bio</label><textarea rows={4} defaultValue="With over 8 years of experience in Cambodia real estate..." className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)' }} /></div>
                </div>

                <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)' }}>
                    <Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
