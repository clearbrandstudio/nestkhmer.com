'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSession, signIn, signUp, signOut as betterSignOut } from './auth-client';
import { useRouter } from 'next/navigation';

export type UserRole = 'tenant' | 'agent' | 'admin';
export type AuthProvider = 'email' | 'google' | 'phone';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    provider?: AuthProvider;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
    loginWithPhone: (phone: string) => Promise<{ success: boolean; requiresOtp: boolean }>;
    verifyOtp: (phone: string, otp: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProviderComponent({ children }: { children: ReactNode }) {
    const { data: sessionData, isPending: isSessionLoading } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (sessionData && sessionData.user) {
            setUser({
                id: sessionData.user.id,
                email: sessionData.user.email,
                name: sessionData.user.name,
                role: (sessionData.user as any).role || 'tenant',
                avatar: sessionData.user.image || undefined,
            });
        } else {
            setUser(null);
        }
    }, [sessionData]);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });
            if (error) {
                console.error("Login failed:", error);
                return false;
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const loginWithGoogle = async (): Promise<boolean> => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: window.location.origin
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const loginWithPhone = async (phone: string): Promise<{ success: boolean; requiresOtp: boolean }> => {
        // Phone Auth not supported out-of-the-box by basic better-auth email plugin without OTP plugin
        // Leaving as mock for now or implement OTP plugin later
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`[NestKhmer Auth] OTP sent to ${phone} — mock code: 123456`);
        return { success: true, requiresOtp: true };
    };

    const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
        // Mock fallback
        await new Promise(resolve => setTimeout(resolve, 800));
        if (otp === '123456') {
            setUser({
                id: 'phone_' + Date.now().toString(),
                email: '',
                name: phone,
                role: 'tenant',
                phone,
                provider: 'phone',
            });
            return true;
        }
        return false;
    };

    const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
        try {
            const { data, error } = await signUp.email({
                email,
                password,
                name,
                role: role
            } as any);
            if (error) {
                console.error("Registration failed:", error);
                return false;
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const logout = async () => {
        await betterSignOut();
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading: isSessionLoading, login, loginWithGoogle, loginWithPhone, verifyOtp, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Keep backward-compatible export name
export { AuthProviderComponent as AuthProvider };

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
