'use client';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-surface-50)' }}>
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-surface-200 border-t-brand-600 animate-spin" />
                <p className="text-sm font-medium animate-pulse" style={{ color: 'var(--color-surface-400)' }}>
                    Finding fresh listings...
                </p>
            </div>
        </div>
    );
}
