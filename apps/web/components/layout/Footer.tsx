'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Home, Mail, MapPin, Phone, Send } from 'lucide-react';
import { StatsBanner } from '../home/StatsBanner';

/* ─── Social Icon SVGs ─── */
function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    );
}

export function Footer() {
    const t = useTranslations('footer');
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';

    const companyLinks = [
        { label: t('about'), href: `/${currentLocale}/about` },
        { label: t('blog'), href: `/${currentLocale}/blog` },
        { label: t('contact'), href: `/${currentLocale}/contact` },
        { label: t('forAgents'), href: `/${currentLocale}/for-agents` },
        { label: '🔥 Pioneer 100', href: `/${currentLocale}/for-agents/pioneer` },
    ];

    const resourceLinks = [
        { label: t('advertise'), href: `/${currentLocale}/advertise` },
        { label: 'Insights', href: `/${currentLocale}/insights` },
        { label: t('privacy'), href: '#' },
        { label: t('terms'), href: '#' },
    ];

    const socialLinks = [
        { icon: Send, label: 'Telegram', href: 'https://t.me/nestkhmer', color: '#0088cc' },
        { Icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com/nestkhmer', color: '#1877F2' },
        { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/nestkhmer', color: '#E4405F' },
    ];

    return (
        <>
            <StatsBanner />
            <footer
                className="relative overflow-hidden"
                style={{
                    background: 'var(--color-surface-950)',
                    color: 'var(--color-surface-300)',
                }}
            >
                {/* Top edge gradient */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background: 'linear-gradient(90deg, transparent, var(--color-brand-500)/30, var(--color-fresh-500)/20, transparent)',
                    }}
                />

                {/* Ambient glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(139,79,255,0.06) 0%, transparent 70%)',
                    }}
                />

                <div className="section-container relative z-10 pt-20 pb-12">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <a
                                href={`/${currentLocale}`}
                                className="flex items-center gap-2.5 text-xl font-bold no-underline mb-5"
                                style={{ fontFamily: 'var(--font-heading)', color: 'white' }}
                            >
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                                    style={{ background: 'var(--color-brand-600)' }}
                                >
                                    <Home className="w-4.5 h-4.5 text-white" />
                                </div>
                                Nest<span style={{ color: 'var(--color-fresh-400)' }}>Khmer</span>
                            </a>
                            <p
                                className="text-sm leading-relaxed mb-5"
                                style={{ color: 'var(--color-surface-400)', maxWidth: '280px' }}
                            >
                                {t('tagline')}
                            </p>
                            <div
                                className="flex items-center gap-2 text-sm mb-6"
                                style={{ color: 'var(--color-surface-500)' }}
                            >
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                Phnom Penh, Cambodia
                            </div>

                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => {
                                    const IconComp = ('icon' in social ? social.icon : social.Icon) as React.ElementType;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all no-underline"
                                            style={{
                                                background: 'var(--color-surface-800)',
                                                color: 'var(--color-surface-400)',
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = social.color;
                                                (e.currentTarget as HTMLElement).style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-800)';
                                                (e.currentTarget as HTMLElement).style.color = 'var(--color-surface-400)';
                                            }}
                                        >
                                            <IconComp className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4
                                className="text-sm font-semibold mb-5 uppercase tracking-wider"
                                style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.75rem' }}
                            >
                                {t('company')}
                            </h4>
                            <ul className="space-y-3.5 list-none p-0 m-0">
                                {companyLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm no-underline transition-colors"
                                            style={{ color: 'var(--color-surface-400)' }}
                                            onMouseEnter={(e) =>
                                                ((e.target as HTMLElement).style.color = 'var(--color-brand-400)')
                                            }
                                            onMouseLeave={(e) =>
                                                ((e.target as HTMLElement).style.color = 'var(--color-surface-400)')
                                            }
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div>
                            <h4
                                className="text-sm font-semibold mb-5 uppercase tracking-wider"
                                style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.75rem' }}
                            >
                                {t('resources')}
                            </h4>
                            <ul className="space-y-3.5 list-none p-0 m-0">
                                {resourceLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm no-underline transition-colors"
                                            style={{ color: 'var(--color-surface-400)' }}
                                            onMouseEnter={(e) =>
                                                ((e.target as HTMLElement).style.color = 'var(--color-brand-400)')
                                            }
                                            onMouseLeave={(e) =>
                                                ((e.target as HTMLElement).style.color = 'var(--color-surface-400)')
                                            }
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4
                                className="text-sm font-semibold mb-5 uppercase tracking-wider"
                                style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.75rem' }}
                            >
                                {t('contact')}
                            </h4>
                            <div className="space-y-4">
                                <a
                                    href="mailto:hello@nestkhmer.com"
                                    className="flex items-center gap-3 text-sm no-underline transition-colors"
                                    style={{ color: 'var(--color-surface-400)' }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-surface-400)')}
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--color-surface-800)' }}>
                                        <Mail className="w-3.5 h-3.5" />
                                    </div>
                                    hello@nestkhmer.com
                                </a>
                                <a
                                    href="tel:+85512345678"
                                    className="flex items-center gap-3 text-sm no-underline transition-colors"
                                    style={{ color: 'var(--color-surface-400)' }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-surface-400)')}
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--color-surface-800)' }}>
                                        <Phone className="w-3.5 h-3.5" />
                                    </div>
                                    +855 12 345 678
                                </a>
                                <a
                                    href="https://t.me/nestkhmer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm no-underline transition-colors"
                                    style={{ color: 'var(--color-surface-400)' }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#0088cc')}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-surface-400)')}
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--color-surface-800)' }}>
                                        <Send className="w-3.5 h-3.5" />
                                    </div>
                                    @nestkhmer
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div
                        className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                        style={{ borderTop: '1px solid var(--color-surface-800)' }}
                    >
                        <p className="text-xs" style={{ color: 'var(--color-surface-500)' }}>
                            {t('copyright')}
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs no-underline transition-colors" style={{ color: 'var(--color-surface-600)' }}
                                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-surface-300)')}
                                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-surface-600)')}>
                                {t('privacy')}
                            </a>
                            <a href="#" className="text-xs no-underline transition-colors" style={{ color: 'var(--color-surface-600)' }}
                                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-surface-300)')}
                                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-surface-600)')}>
                                {t('terms')}
                            </a>
                            <span className="text-xs" style={{ color: 'var(--color-surface-600)' }}>
                                Built for Cambodia 🇰🇭
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
