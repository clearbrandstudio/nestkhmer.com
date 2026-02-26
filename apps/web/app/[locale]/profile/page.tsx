'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Heart, Shield, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TenantProfilePage() {
    const { user, isLoading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const locale = pathname.split('/')[1] || 'en';

    useEffect(() => {
        if (!isLoading && !user) {
            router.push(`/${locale}/auth/login`);
        } else if (!isLoading && user && (user.role === 'agent' || user.role === 'admin')) {
            // Agents/Admins should use the portal dashboard
            router.push(`/${locale}/portal/dashboard`);
        }
    }, [user, isLoading, locale, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ paddingTop: '8rem' }}>
                <div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen hero-gradient grid-pattern p-4 sm:p-6 md:p-8" style={{ paddingTop: '8rem' }}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 rounded-2xl flex-shrink-0 bg-cover bg-center shadow-lg border-4 border-white"
                        style={{
                            backgroundImage: user.avatar ? `url(${user.avatar})` : undefined,
                            background: user.avatar ? undefined : 'var(--color-brand-100)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        {!user.avatar && <span className="text-3xl font-bold" style={{ color: 'var(--color-brand-600)' }}>{user.name[0]}</span>}
                    </motion.div>

                    <div className="flex-1">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold mb-2"
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}
                        >
                            {user.name}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap items-center gap-3 text-sm"
                            style={{ color: 'var(--color-surface-600)' }}
                        >
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-700)' }}>
                                <Shield className="w-3.5 h-3.5" /> Normal User (Tenant)
                            </span>
                            {user.email && !user.email.includes('@telegram.nestkhmer.com') && (
                                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user.email}</span>
                            )}
                            {user.phone && (
                                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {user.phone}</span>
                            )}
                        </motion.div>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => { logout(); router.push(`/${locale}`); }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow"
                        style={{ background: 'white', color: 'var(--color-danger-600)', border: '1px solid var(--color-surface-200)' }}
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {/* Main Content Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Saved Properties Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 md:p-8"
                            style={{ borderRadius: 'var(--radius-xl)' }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-fresh-50)' }}>
                                    <Heart className="w-5 h-5" style={{ color: 'var(--color-fresh-600)' }} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Saved Properties</h2>
                                    <p className="text-sm" style={{ color: 'var(--color-surface-500)' }}>Listings you've favourited</p>
                                </div>
                            </div>

                            <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed" style={{ borderColor: 'var(--color-surface-200)' }}>
                                <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-surface-300)' }} />
                                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-surface-700)' }}>No saved properties yet</h3>
                                <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--color-surface-500)' }}>
                                    Browse our listings and click the heart icon to save properties you're interested in for later.
                                </p>
                                <a
                                    href={`/${locale}/listings`}
                                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold transition-all no-underline"
                                    style={{ background: 'var(--color-brand-600)', color: 'white' }}
                                >
                                    Browse Listings
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Account Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-6"
                            style={{ borderRadius: 'var(--radius-xl)' }}
                        >
                            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                <User className="w-4 h-4" /> Account Details
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div style={{ color: 'var(--color-surface-500)' }} className="mb-1 text-xs uppercase tracking-wider font-semibold">Full Name</div>
                                    <div className="font-medium" style={{ color: 'var(--color-surface-900)' }}>{user.name}</div>
                                </div>
                                {user.email && !user.email.includes('@telegram.nestkhmer.com') && (
                                    <div>
                                        <div style={{ color: 'var(--color-surface-500)' }} className="mb-1 text-xs uppercase tracking-wider font-semibold">Email Address</div>
                                        <div className="font-medium" style={{ color: 'var(--color-surface-900)' }}>{user.email}</div>
                                    </div>
                                )}
                                {user.phone && (
                                    <div>
                                        <div style={{ color: 'var(--color-surface-500)' }} className="mb-1 text-xs uppercase tracking-wider font-semibold">Phone Number</div>
                                        <div className="font-medium" style={{ color: 'var(--color-surface-900)' }}>{user.phone}</div>
                                    </div>
                                )}
                                <div>
                                    <div style={{ color: 'var(--color-surface-500)' }} className="mb-1 text-xs uppercase tracking-wider font-semibold">Status</div>
                                    <div className="font-medium text-emerald-600 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
