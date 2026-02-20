'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Phone, ChevronLeft } from 'lucide-react';

/* ─── Google Logo SVG ─── */
function GoogleLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

type AuthMode = 'main' | 'phone' | 'otp';

export default function LoginPage() {
    const { login, loginWithGoogle, loginWithPhone, verifyOtp } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<AuthMode>('main');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);

    const redirectAfterLogin = () => {
        const stored = localStorage.getItem('nestkhmer_user');
        if (stored) {
            const user = JSON.parse(stored);
            if (user.role === 'admin') router.push(`/${locale}/admin/dashboard`);
            else if (user.role === 'agent') router.push(`/${locale}/portal/dashboard`);
            else router.push(`/${locale}`);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await login(email, password);
        if (success) redirectAfterLogin();
        else setError('Invalid email or password. Try the demo accounts below.');
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setError('');
        const success = await loginWithGoogle();
        if (success) redirectAfterLogin();
        else setError('Google login failed. Please try again.');
        setGoogleLoading(false);
    };

    const handlePhoneSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 6) {
            setError('Please enter a valid phone number');
            return;
        }
        setError('');
        setLoading(true);
        const result = await loginWithPhone(phoneNumber);
        if (result.requiresOtp) setMode('otp');
        else setError('Failed to send OTP. Please try again.');
        setLoading(false);
    };

    const handleOtpVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await verifyOtp(phoneNumber, otpCode);
        if (success) redirectAfterLogin();
        else setError('Invalid code. Demo code is 123456.');
        setLoading(false);
    };

    const quickLogin = async (email: string, password: string) => {
        setEmail(email);
        setPassword(password);
        setError('');
        setLoading(true);
        const success = await login(email, password);
        if (success) redirectAfterLogin();
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center hero-gradient grid-pattern" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
                <div className="glass-card p-8" style={{ borderRadius: 'var(--radius-2xl)' }}>
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <a href={`/${locale}`} className="inline-flex items-center gap-2 text-xl font-bold no-underline mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-600)' }}>
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            Nest<span style={{ color: 'var(--color-fresh-600)' }}>Khmer</span>
                        </a>
                        <p className="text-sm mt-2" style={{ color: 'var(--color-surface-500)' }}>
                            Sign in to your account
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'main' && (
                            <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                {/* Social Login Buttons */}
                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={handleGoogleLogin}
                                        disabled={googleLoading}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all"
                                        style={{
                                            background: 'white',
                                            border: '1px solid var(--color-surface-200)',
                                            color: 'var(--color-surface-700)',
                                            opacity: googleLoading ? 0.7 : 1,
                                        }}
                                    >
                                        {googleLoading ? (
                                            <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-surface-300)', borderTopColor: 'transparent' }} />
                                        ) : (
                                            <GoogleLogo className="w-5 h-5" />
                                        )}
                                        {googleLoading ? 'Connecting...' : 'Continue with Google'}
                                    </button>

                                    <button
                                        onClick={() => { setMode('phone'); setError(''); }}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all"
                                        style={{
                                            background: 'var(--color-surface-50)',
                                            border: '1px solid var(--color-surface-200)',
                                            color: 'var(--color-surface-700)',
                                        }}
                                    >
                                        <Phone className="w-4.5 h-4.5" />
                                        Continue with Phone Number
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-px" style={{ background: 'var(--color-surface-200)' }} />
                                    <span className="text-xs font-medium" style={{ color: 'var(--color-surface-400)' }}>or sign in with email</span>
                                    <div className="flex-1 h-px" style={{ background: 'var(--color-surface-200)' }} />
                                </div>

                                {/* Email/Password Form */}
                                <form onSubmit={handleEmailLogin} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }} placeholder="you@example.com" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }} placeholder="••••••••" required />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-surface-400)' }}>
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-danger-600)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', opacity: loading ? 0.7 : 1 }}>
                                        {loading ? 'Signing in...' : 'Sign In'}
                                        {!loading && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {mode === 'phone' && (
                            <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <button onClick={() => { setMode('main'); setError(''); }} className="flex items-center gap-1 text-sm mb-4" style={{ color: 'var(--color-brand-600)' }}>
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Phone Login</h3>
                                <p className="text-sm mb-4" style={{ color: 'var(--color-surface-500)' }}>We&apos;ll send a verification code to your number</p>

                                <form onSubmit={handlePhoneSend} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Phone Number</label>
                                        <div className="flex gap-2">
                                            <div className="flex items-center px-3 rounded-xl text-sm font-medium" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-600)' }}>
                                                🇰🇭 +855
                                            </div>
                                            <div className="relative flex-1">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                                                    style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }}
                                                    placeholder="12 345 678"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-danger-600)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                                        </div>
                                    )}

                                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', opacity: loading ? 0.7 : 1 }}>
                                        {loading ? 'Sending code...' : 'Send Verification Code'}
                                        {!loading && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {mode === 'otp' && (
                            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <button onClick={() => { setMode('phone'); setError(''); setOtpCode(''); }} className="flex items-center gap-1 text-sm mb-4" style={{ color: 'var(--color-brand-600)' }}>
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Enter Code</h3>
                                <p className="text-sm mb-4" style={{ color: 'var(--color-surface-500)' }}>Enter the 6-digit code sent to +855 {phoneNumber}</p>

                                <form onSubmit={handleOtpVerify} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                            className="w-full text-center text-2xl tracking-[0.5em] py-4 rounded-xl outline-none font-bold"
                                            style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)', fontFamily: 'var(--font-heading)' }}
                                            placeholder="000000"
                                            required
                                        />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs" style={{ color: 'var(--color-surface-400)' }}>
                                            Demo code: <span className="font-bold" style={{ color: 'var(--color-brand-600)' }}>123456</span>
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-danger-600)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                                        </div>
                                    )}

                                    <button type="submit" disabled={loading || otpCode.length < 6} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', opacity: (loading || otpCode.length < 6) ? 0.7 : 1 }}>
                                        {loading ? 'Verifying...' : 'Verify & Sign In'}
                                        {!loading && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {mode === 'main' && (
                        <div className="text-center mt-4">
                            <a href={`/${locale}/auth/register`} className="text-sm no-underline" style={{ color: 'var(--color-brand-600)' }}>
                                Don&apos;t have an account? <span className="font-semibold">Sign up</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Demo Accounts */}
                {mode === 'main' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 glass-card p-5" style={{ borderRadius: 'var(--radius-xl)' }}>
                        <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--color-surface-500)' }}>
                            Quick Demo Login
                        </p>
                        <div className="space-y-2">
                            {[
                                { label: 'Admin', email: 'admin@nestkhmer.com', password: 'admin123', color: 'var(--color-danger-500)' },
                                { label: 'Agent', email: 'agent@nestkhmer.com', password: 'agent123', color: 'var(--color-brand-500)' },
                                { label: 'Tenant', email: 'tenant@nestkhmer.com', password: 'tenant123', color: 'var(--color-fresh-500)' },
                            ].map((demo) => (
                                <button key={demo.email} onClick={() => quickLogin(demo.email, demo.password)} className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-100)', color: 'var(--color-surface-700)' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ background: demo.color }} />
                                        <span className="font-medium">{demo.label}</span>
                                        <span style={{ color: 'var(--color-surface-400)' }}>{demo.email}</span>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--color-surface-400)' }} />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
