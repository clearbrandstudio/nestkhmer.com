'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
    botName: string; // The username of your Telegram Bot (without the @)
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
    const { loginWithPhone } = useAuth(); // We'll adapt our backend to accept Telegram payload
    const router = useRouter();

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
                        router.refresh();
                        // Redirect logic depending on role, we can just push to home for now 
                        // as the Navbar will instantly update due to the refreshing!
                        window.location.href = '/en/portal/dashboard'; // Default locale redirect
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
        script.setAttribute('data-telegram-login', botName);
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
