'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Users, BarChart3, User, CreditCard, LogOut, Bell, Plus, ChevronRight } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/portal/dashboard' },
    { icon: Building2, label: 'My Listings', path: '/portal/listings' },
    { icon: Users, label: 'Leads', path: '/portal/leads' },
    { icon: BarChart3, label: 'Analytics', path: '/portal/analytics' },
    { icon: User, label: 'Profile', path: '/portal/profile' },
    { icon: CreditCard, label: 'Subscription', path: '/portal/subscription' },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const locale = pathname.split('/')[1] || 'en';

    useEffect(() => {
        if (!isLoading && (!user || (user.role !== 'agent' && user.role !== 'admin'))) {
            router.push(`/${locale}/auth/login`);
        }
    }, [user, isLoading, locale, router]);

    if (isLoading || !user) {
        return <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '5rem' }}><div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>Loading...</div></div>;
    }

    return (
        <div className="flex min-h-screen" style={{ paddingTop: '4.5rem' }}>
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r hidden lg:flex flex-col" style={{ borderColor: 'var(--color-surface-100)', background: 'white' }}>
                <div className="p-5 border-b" style={{ borderColor: 'var(--color-surface-100)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: user.avatar ? `url(${user.avatar})` : undefined, background: user.avatar ? undefined : 'var(--color-brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {!user.avatar && <span className="text-sm font-bold" style={{ color: 'var(--color-brand-600)' }}>{user.name[0]}</span>}
                        </div>
                        <div>
                            <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{user.name}</div>
                            <div className="text-xs capitalize" style={{ color: 'var(--color-surface-400)' }}>{user.role} Account</div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = pathname.includes(item.path);
                        return (
                            <a key={item.path} href={`/${locale}${item.path}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-all" style={{ background: isActive ? 'var(--color-brand-50)' : 'transparent', color: isActive ? 'var(--color-brand-700)' : 'var(--color-surface-600)', fontWeight: isActive ? 600 : 400 }}>
                                <Icon className="w-4 h-4" />{item.label}
                            </a>
                        );
                    })}
                </nav>

                <div className="p-3 border-t" style={{ borderColor: 'var(--color-surface-100)' }}>
                    <button onClick={() => { logout(); router.push(`/${locale}`); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all" style={{ color: 'var(--color-danger-600)' }}>
                        <LogOut className="w-4 h-4" />Sign Out
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0" style={{ background: 'var(--color-surface-50)' }}>
                {children}
            </main>
        </div>
    );
}
