'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSession, signIn, signUp, signOut as betterSignOut, authClient } from './auth-client';
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
    login: (email: string, password: string) => Promise<{ success: boolean; user?: any; error?: string }>;
    loginWithGoogle: () => Promise<boolean>;
    loginWithPhone: (phone: string) => Promise<{ success: boolean; requiresOtp: boolean }>;
    verifyOtp: (phone: string, otp: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; user?: any; error?: string }>;
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

    const login = async (email: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> => {
        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });
            if (error) {
                console.error("Login failed:", error);
                return { success: false, error: error.message || "Invalid credentials." };
            }
            router.refresh();
            return { success: true, user: data?.user };
        } catch (err: any) {
            console.error(err);
            return { success: false, error: err?.message || "An unexpected error occurred." };
        }
    };

    const loginWithGoogle = async (): Promise<boolean> => {
        try {
            const { data, error } = await signIn.social({
                provider: "google",
                callbackURL: window.location.origin
            });
            if (error) {
                console.error("Google login failed:", error);
                return false;
            }
            router.refresh();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const loginWithPhone = async (phone: string): Promise<{ success: boolean; requiresOtp: boolean }> => {
        try {
            const { data, error } = await authClient.phoneNumber.sendOtp({
                phoneNumber: phone
            });
            if (error) {
                console.error("Phone login failed:", error);
                return { success: false, requiresOtp: false };
            }
            router.refresh();
            return { success: true, requiresOtp: true };
        } catch (err) {
            console.error(err);
            return { success: false, requiresOtp: false };
        }
    };

    const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
        try {
            const { data, error } = await authClient.phoneNumber.verify({
                phoneNumber: phone,
                code: otp
            });
            if (error) {
                console.error("OTP verification failed:", error);
                return false;
            }
            router.refresh();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const register = async (name: string, email: string, password: string, role: UserRole): Promise<{ success: boolean; user?: any; error?: string }> => {
        try {
            const { data, error } = await signUp.email({
                email,
                password,
                name,
                role: role || 'tenant'
            } as any);
            if (error) {
                console.error("Registration failed:", error);
                return { success: false, error: error.message || "Failed to create account." };
            }
            router.refresh();
            return { success: true, user: data?.user };
        } catch (err: any) {
            console.error(err);
            return { success: false, error: err?.message || "An unexpected error occurred." };
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
