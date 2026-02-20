'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Building2, Users, Megaphone, BarChart3, FileText, MapPin, Settings, LogOut, Shield, Globe, BookOpen, TrendingUp } from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Building2, label: 'Listings', path: '/admin/listings' },
    { icon: Users, label: 'Agents', path: '/admin/agents' },
    { icon: Shield, label: 'Users', path: '/admin/users' },
    { icon: MapPin, label: 'Districts', path: '/admin/districts' },
    { icon: Megaphone, label: 'Ad Campaigns', path: '/admin/ads' },
    { icon: FileText, label: 'Blog', path: '/admin/blog' },
    { icon: BookOpen, label: 'Pages', path: '/admin/pages' },
    { icon: TrendingUp, label: 'Insights', path: '/insights', external: true },
    { icon: Globe, label: 'SEO', path: '/admin/seo' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const locale = pathname.split('/')[1] || 'en';

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push(`/${locale}/auth/login`);
        }
    }, [user, isLoading, locale, router]);

    if (isLoading || !user || user.role !== 'admin') {
        return <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '5rem' }}><div className="text-sm" style={{ color: 'var(--color-surface-400)' }}>Loading...</div></div>;
    }

    return (
        <div className="flex min-h-screen" style={{ paddingTop: '4.5rem' }}>
            <aside className="w-60 flex-shrink-0 border-r hidden lg:flex flex-col" style={{ borderColor: 'var(--color-surface-100)', background: 'var(--color-surface-950)' }}>
                <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-brand-600)' }}><Shield className="w-4 h-4 text-white" /></div>
                        <div><div className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Admin Panel</div><div className="text-[10px]" style={{ color: 'var(--color-surface-400)' }}>{user.email}</div></div>
                    </div>
                </div>
                <nav className="flex-1 py-4 px-3 space-y-0.5">
                    {navItems.map((item: { icon: typeof LayoutDashboard; label: string; path: string; external?: boolean }) => {
                        const Icon = item.icon;
                        const isActive = item.external ? pathname.includes(item.path) : pathname.includes(item.path);
                        return (
                            <a key={item.path} href={`/${locale}${item.path}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-all" style={{ background: isActive ? 'rgba(139,79,255,0.15)' : 'transparent', color: isActive ? 'var(--color-brand-300)' : 'var(--color-surface-400)', fontWeight: isActive ? 600 : 400 }}>
                                <Icon className="w-4 h-4" />{item.label}
                            </a>
                        );
                    })}
                </nav>
                <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <button onClick={() => { logout(); router.push(`/${locale}`); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm" style={{ color: 'var(--color-danger-400)' }}><LogOut className="w-4 h-4" />Sign Out</button>
                </div>
            </aside>
            <main className="flex-1 min-w-0" style={{ background: 'var(--color-surface-50)' }}>{children}</main>
        </div>
    );
}
