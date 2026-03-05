'use client';

import { useEffect } from 'react';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('NestKhmer Runtime Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--color-surface-50)' }}>
            <div className="glass-card max-w-md w-full p-8 text-center" style={{ borderRadius: 'var(--radius-2xl)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--color-danger-50)' }}>
                    <AlertCircle className="w-8 h-8 text-rose-600" />
                </div>

                <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>
                    Something went wrong
                </h1>

                <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--color-surface-500)' }}>
                    We encountered a temporary server error. This usually happens when the database is restarting or under heavy load.
                </p>

                {error.digest && (
                    <div className="mb-8 p-3 rounded-lg bg-surface-100 text-[10px] font-mono" style={{ color: 'var(--color-surface-400)' }}>
                        Error ID: {error.digest}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all text-white"
                        style={{ background: 'var(--color-brand-600)' }}
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>

                    <a
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all no-underline"
                        style={{ background: 'var(--color-surface-100)', color: 'var(--color-surface-700)' }}
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
