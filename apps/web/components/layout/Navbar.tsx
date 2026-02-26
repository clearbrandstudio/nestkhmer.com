'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Menu,
    X,
    Globe,
    Home,
    LogOut,
    LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const localeLabels: Record<string, string> = {
    en: 'EN',
    km: 'ខ្មែរ',
    zh: '中文',
};

export function Navbar() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, isLoading, logout } = useAuth();

    const currentLocale = pathname.split('/')[1] || 'en';

    const switchLocale = (locale: string) => {
        const pathWithoutLocale = pathname.replace(/^\/(en|km|zh)/, '');
        router.push(`/${locale}${pathWithoutLocale || '/'}`);
        setLangOpen(false);
    };

    const navLinks = [
        { label: t('listings'), href: `/${currentLocale}/listings` },
        { label: t('districts'), href: `/${currentLocale}/districts` },
        { label: t('agents'), href: `/${currentLocale}/agents` },
        { label: t('blog'), href: `/${currentLocale}/blog` },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="glass-card mx-3 mt-3 sm:mx-4 sm:mt-4" style={{ borderRadius: 'var(--radius-xl)' }}>
                <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                    {/* Logo */}
                    <a
                        href={`/${currentLocale}`}
                        className="flex items-center gap-2 text-lg font-bold no-underline"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--color-brand-600)' }}
                        >
                            <Home className="w-4 h-4 text-white" />
                        </div>
                        <span>
                            Nest<span style={{ color: 'var(--color-fresh-600)' }}>Khmer</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors"
                                style={{
                                    color: 'var(--color-surface-600)',
                                    fontFamily: 'var(--font-body)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.background = 'var(--color-surface-100)';
                                    (e.target as HTMLElement).style.color = 'var(--color-brand-700)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.background = 'transparent';
                                    (e.target as HTMLElement).style.color = 'var(--color-surface-600)';
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                                style={{
                                    background: 'var(--color-surface-100)',
                                    color: 'var(--color-surface-700)',
                                    border: '1px solid var(--color-surface-200)',
                                }}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                {localeLabels[currentLocale]}
                            </button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-2 glass-card overflow-hidden"
                                        style={{ minWidth: '120px' }}
                                    >
                                        {Object.entries(localeLabels).map(([code, label]) => (
                                            <button
                                                key={code}
                                                onClick={() => switchLocale(code)}
                                                className="w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2"
                                                style={{
                                                    color:
                                                        code === currentLocale
                                                            ? 'var(--color-brand-600)'
                                                            : 'var(--color-surface-700)',
                                                    background:
                                                        code === currentLocale
                                                            ? 'var(--color-brand-50)'
                                                            : 'transparent',
                                                }}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Auth State / Profile */}
                        {!isLoading && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full transition-all border outline-none cursor-pointer"
                                    style={{
                                        background: 'var(--color-surface-50)',
                                        borderColor: 'var(--color-surface-200)',
                                    }}
                                >
                                    {user.avatar ? (
                                        <div className="w-7 h-7 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${user.avatar})` }} />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0" style={{ background: 'var(--color-brand-100)', color: 'var(--color-brand-700)' }}>
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <div className="hidden sm:flex flex-col items-start leading-tight pl-1">
                                        <span className="text-sm font-medium max-w-[100px] truncate" style={{ color: 'var(--color-surface-700)' }}>{user.name}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: user.role === 'agent' ? 'var(--color-brand-600)' : 'var(--color-fresh-600)' }}>
                                            {user.role === 'tenant' ? 'Tenant Profile' : user.role === 'agent' ? 'Agent Profile' : user.role}
                                        </span>
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 glass-card overflow-hidden z-50 py-1"
                                            style={{ minWidth: '200px' }}
                                        >
                                            <div className="px-4 py-2 border-b border-surface-100 mb-1">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <p className="text-sm font-bold truncate" style={{ color: 'var(--color-surface-900)' }}>{user.name}</p>
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase" style={{ background: user.role === 'agent' ? 'var(--color-brand-50)' : 'var(--color-fresh-50)', color: user.role === 'agent' ? 'var(--color-brand-700)' : 'var(--color-fresh-700)' }}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                                <p className="text-xs truncate" style={{ color: 'var(--color-surface-500)' }}>{user.email}</p>
                                            </div>
                                            <a
                                                href={`/${currentLocale}/portal/dashboard`}
                                                className="w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 no-underline hover:bg-surface-50"
                                                style={{ color: 'var(--color-surface-700)' }}
                                            >
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </a>
                                            <button
                                                onClick={() => { setProfileOpen(false); logout(); }}
                                                className="w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 text-rose-600 hover:bg-rose-50"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : !isLoading ? (
                            <a
                                href={`/${currentLocale}/auth/login`}
                                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all no-underline"
                                style={{ color: 'var(--color-surface-700)' }}
                                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--color-surface-100)' }}
                                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent' }}
                            >
                                Sign In
                            </a>
                        ) : null}

                        {/* CTA */}
                        {(!user || user.role !== 'tenant') && (
                            <a
                                href={`/${currentLocale}/for-agents`}
                                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold no-underline transition-all"
                                style={{
                                    background: 'var(--color-brand-600)',
                                    color: 'white',
                                    fontFamily: 'var(--font-heading)',
                                    boxShadow: '0 2px 12px rgba(139, 79, 255, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.background = 'var(--color-brand-700)';
                                    (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.background = 'var(--color-brand-600)';
                                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                                }}
                            >
                                {t('listProperty')}
                            </a>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 rounded-lg"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{ color: 'var(--color-surface-700)' }}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden border-t"
                            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <nav className="flex flex-col p-3 gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-3 rounded-lg text-sm font-medium no-underline"
                                        style={{ color: 'var(--color-surface-700)' }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                {!isLoading && user ? (
                                    <>
                                        <a href={`/${currentLocale}/portal/dashboard`} className="px-4 py-3 rounded-lg text-sm font-medium no-underline flex items-center gap-2" style={{ color: 'var(--color-surface-700)' }}>
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </a>
                                        <button onClick={() => logout()} className="px-4 py-3 text-left rounded-lg text-sm font-medium flex items-center gap-2" style={{ color: 'var(--color-rose-600)' }}>
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <a href={`/${currentLocale}/auth/login`} className="px-4 py-3 rounded-lg text-sm font-medium no-underline" style={{ color: 'var(--color-surface-700)' }}>
                                        Sign In
                                    </a>
                                )}
                                {(!user || user.role !== 'tenant') && (
                                    <a
                                        href={`/${currentLocale}/for-agents`}
                                        className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center no-underline"
                                        style={{
                                            background: 'var(--color-brand-600)',
                                            color: 'white',
                                        }}
                                    >
                                        {t('listProperty')}
                                    </a>
                                )}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
