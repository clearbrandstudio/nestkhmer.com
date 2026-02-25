'use client';

import { useState } from 'react';
import { useAuth, type UserRole } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Mail, Lock, User, ArrowRight, Building2, Phone, ChevronLeft, AlertCircle, MessageCircle } from 'lucide-react';
import { TelegramLoginButton } from '@/components/auth/TelegramLoginButton';

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

type RegisterMode = 'main' | 'phone' | 'otp' | 'telegram';

export default function RegisterPage() {
    const { register, loginWithGoogle, loginWithPhone, verifyOtp } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('tenant');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<RegisterMode>('main');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);

    const redirectAfterRegister = (userRole?: UserRole) => {
        const r = userRole || role;
        if (r === 'agent') router.push(`/${locale}/portal/dashboard`);
        else router.push(`/${locale}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await register(name, email, password, role);
        if (success) redirectAfterRegister();
        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        setGoogleLoading(true);
        setError('');
        const success = await loginWithGoogle();
        if (success) redirectAfterRegister('tenant');
        else setError('Google signup failed. Please try again.');
        setGoogleLoading(false);
    };

    const handlePhoneSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 6) { setError('Please enter a valid phone number'); return; }
        setError('');
        setLoading(true);
        const result = await loginWithPhone(phoneNumber);
        if (result.requiresOtp) setMode('otp');
        else setError('Failed to send OTP.');
        setLoading(false);
    };

    const handleOtpVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await verifyOtp(phoneNumber, otpCode);
        if (success) redirectAfterRegister('tenant');
        else setError('Invalid code. Demo code is 123456.');
        setLoading(false);
    };

    const roles: { value: UserRole; label: string; desc: string; icon: React.ElementType }[] = [
        { value: 'tenant', label: 'Tenant', desc: 'Looking for a place', icon: User },
        { value: 'agent', label: 'Agent', desc: 'I list properties', icon: Building2 },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center hero-gradient grid-pattern" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
                <div className="glass-card p-8" style={{ borderRadius: 'var(--radius-2xl)' }}>
                    <div className="text-center mb-8">
                        <a href={`/${locale}`} className="inline-flex items-center gap-2 text-xl font-bold no-underline mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-700)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-brand-600)' }}>
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            Nest<span style={{ color: 'var(--color-fresh-600)' }}>Khmer</span>
                        </a>
                        <p className="text-sm mt-2" style={{ color: 'var(--color-surface-500)' }}>Create your account</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'main' && (
                            <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                {/* Social Signup */}
                                <div className="space-y-3 mb-6">
                                    <button onClick={handleGoogleSignup} disabled={googleLoading} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all" style={{ background: 'white', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)', opacity: googleLoading ? 0.7 : 1 }}>
                                        {googleLoading ? <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-surface-300)', borderTopColor: 'transparent' }} /> : <GoogleLogo className="w-5 h-5" />}
                                        {googleLoading ? 'Connecting...' : 'Sign up with Google'}
                                    </button>
                                    <button onClick={() => { setMode('phone'); setError(''); }} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-700)' }}>
                                        <Phone className="w-4.5 h-4.5" />
                                        Sign up with Phone Number
                                    </button>
                                    <button onClick={() => { setMode('telegram'); setError(''); }} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-[#2CA5E0] hover:text-white" style={{ background: '#0088CC', color: 'white', border: '1px solid #00adef' }}>
                                        <MessageCircle className="w-4.5 h-4.5" fill="currentColor" />
                                        Sign up with Telegram (Free)
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-px" style={{ background: 'var(--color-surface-200)' }} />
                                    <span className="text-xs font-medium" style={{ color: 'var(--color-surface-400)' }}>or use email</span>
                                    <div className="flex-1 h-px" style={{ background: 'var(--color-surface-200)' }} />
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Role Selection */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-surface-700)' }}>I am a...</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {roles.map((r) => {
                                                const Icon = r.icon;
                                                const selected = role === r.value;
                                                return (
                                                    <button key={r.value} type="button" onClick={() => setRole(r.value)} className="flex flex-col items-center gap-1.5 p-4 rounded-xl transition-all text-center" style={{ background: selected ? 'var(--color-brand-50)' : 'var(--color-surface-50)', border: `2px solid ${selected ? 'var(--color-brand-500)' : 'var(--color-surface-200)'}`, color: selected ? 'var(--color-brand-700)' : 'var(--color-surface-600)' }}>
                                                        <Icon className="w-5 h-5" />
                                                        <span className="text-sm font-semibold">{r.label}</span>
                                                        <span className="text-xs" style={{ color: 'var(--color-surface-400)' }}>{r.desc}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }} placeholder="Your full name" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }} placeholder="you@example.com" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-surface-700)' }}>Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }} placeholder="Minimum 8 characters" required minLength={8} />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-danger-600)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                                        </div>
                                    )}

                                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', opacity: loading ? 0.7 : 1 }}>
                                        {loading ? 'Creating account...' : 'Create Account'}
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
                                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Phone Signup</h3>
                                <p className="text-sm mb-4" style={{ color: 'var(--color-surface-500)' }}>We&apos;ll send a verification code to your number</p>
                                <form onSubmit={handlePhoneSend} className="space-y-4">
                                    <div className="flex gap-2">
                                        <div className="flex items-center px-3 rounded-xl text-sm font-medium" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-600)' }}>🇰🇭 +855</div>
                                        <div className="relative flex-1">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-surface-400)' }} />
                                            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)' }} placeholder="12 345 678" required />
                                        </div>
                                    </div>
                                    {error && <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-danger-600)', border: '1px solid rgba(239, 68, 68, 0.15)' }}><AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}</div>}
                                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', opacity: loading ? 0.7 : 1 }}>
                                        {loading ? 'Sending code...' : 'Send Verification Code'} {!loading && <ArrowRight className="w-4 h-4" />}
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
                                <p className="text-sm mb-4" style={{ color: 'var(--color-surface-500)' }}>6-digit code sent to +855 {phoneNumber}</p>
                                <form onSubmit={handleOtpVerify} className="space-y-4">
                                    <input type="text" maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} className="w-full text-center text-2xl tracking-[0.5em] py-4 rounded-xl outline-none font-bold" style={{ background: 'var(--color-surface-50)', border: '1px solid var(--color-surface-200)', color: 'var(--color-surface-900)', fontFamily: 'var(--font-heading)' }} placeholder="000000" required />
                                    <p className="text-xs text-center" style={{ color: 'var(--color-surface-400)' }}>Demo code: <span className="font-bold" style={{ color: 'var(--color-brand-600)' }}>123456</span></p>
                                    {error && <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-danger-600)', border: '1px solid rgba(239, 68, 68, 0.15)' }}><AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}</div>}
                                    <button type="submit" disabled={loading || otpCode.length < 6} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ background: 'var(--color-brand-600)', color: 'white', fontFamily: 'var(--font-heading)', opacity: (loading || otpCode.length < 6) ? 0.7 : 1 }}>
                                        {loading ? 'Verifying...' : 'Verify & Create Account'} {!loading && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {mode === 'telegram' && (
                            <motion.div key="telegram" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <button onClick={() => { setMode('main'); setError(''); }} className="flex items-center gap-1 text-sm mb-4" style={{ color: 'var(--color-brand-600)' }}>
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: 'rgba(0, 136, 204, 0.1)' }}>
                                        <MessageCircle className="w-8 h-8" style={{ color: '#0088CC' }} fill="currentColor" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Fast & Secure Login</h3>
                                    <p className="text-sm px-4 mb-6 leading-relaxed" style={{ color: 'var(--color-surface-600)' }}>
                                        No passwords or SMS codes required! Use your existing Telegram account to register instantly.
                                    </p>
                                    <div className="bg-[#f0f9ff] py-6 px-4 rounded-xl border border-[#bae6fd]">
                                        <TelegramLoginButton botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'NestKhmerBot'} />
                                    </div>
                                    <p className="text-xs mt-6 px-6" style={{ color: 'var(--color-surface-400)' }}>
                                        By signing up via Telegram, you agree to NestKhmer's Terms & Conditions and acknowledge our Privacy Policy.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {mode === 'main' && (
                        <div className="text-center mt-4">
                            <a href={`/${locale}/auth/login`} className="text-sm no-underline" style={{ color: 'var(--color-brand-600)' }}>
                                Already have an account? <span className="font-semibold">Sign in</span>
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
