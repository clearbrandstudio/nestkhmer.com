'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LogIn } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

interface TelegramLoginButtonProps {
    botName?: string; // The username of your Telegram Bot (without the @)
    buttonSize?: 'large' | 'medium' | 'small';
    cornerRadius?: number;
    requestAccess?: boolean;
    usePic?: boolean;
    className?: string;
}

export function TelegramLoginButton({
    botName,
    buttonSize = 'large',
    cornerRadius = 12,
    requestAccess = true,
    usePic = true,
    className = ''
}: TelegramLoginButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';

    useEffect(() => {
        // Expose a global callback function for the Telegram widget to call
        if (typeof window !== 'undefined') {
            (window as any).onTelegramAuth = async (user: TelegramUser) => {
                setIsLoading(true);
                try {
                    // Send the validated user payload to our secure backend endpoint
                    const res = await fetch('/api/auth/telegram', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    });

                    if (res.ok) {
                        const data = await res.json();
                        // Crucial: Clear all local caches and refresh 
                        router.refresh();
                        // Redirect based on role
                        if (data.user?.role === 'agent' || data.user?.role === 'admin') {
                            window.location.href = `/${currentLocale}/portal/dashboard`;
                        } else {
                            window.location.href = `/${currentLocale}/profile`;
                        }
                    } else {
                        console.error('Failed to authenticate via Telegram');
                    }
                } catch (error) {
                    console.error('Error during Telegram auth:', error);
                } finally {
                    setIsLoading(false);
                }
            };
        }

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        if (botName) {
            script.setAttribute('data-telegram-login', botName);
        }
        script.setAttribute('data-size', buttonSize);
        if (cornerRadius !== undefined) {
            script.setAttribute('data-radius', cornerRadius.toString());
        }
        script.setAttribute('data-request-access', requestAccess ? 'write' : 'read');
        script.setAttribute('data-userpic', usePic.toString());
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.async = true;

        // Append the script to the container
        if (containerRef.current) {
            containerRef.current.innerHTML = ''; // Clear previous if any
            containerRef.current.appendChild(script);
        }

        return () => {
            // Cleanup global callback
            if (typeof window !== 'undefined') {
                delete (window as any).onTelegramAuth;
            }
        };
    }, [botName, buttonSize, cornerRadius, requestAccess, usePic, router]);

    if (!botName) {
        return (
            <div className={`flex flex-col items-center justify-center min-h-[48px] p-4 text-center ${className}`}>
                <div className="text-amber-600 font-medium text-sm mb-1">Telegram Bot Not Configured</div>
                <div className="text-xs text-amber-700 max-w-[250px]">
                    Please set <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_TELEGRAM_BOT_NAME</code> in your environment variables.
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center min-h-[48px] ${className}`}>
            {isLoading ? (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-brand-600)' }}>
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-brand-300)', borderTopColor: 'transparent' }} />
                    Authenticating with Telegram...
                </div>
            ) : (
                <div ref={containerRef} className="telegram-widget-container" />
            )}
        </div>
    );
}
