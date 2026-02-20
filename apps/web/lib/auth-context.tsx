'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
    'admin@nestkhmer.com': {
        id: '1',
        email: 'admin@nestkhmer.com',
        name: 'Admin',
        role: 'admin',
        password: 'admin123',
        provider: 'email',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    'agent@nestkhmer.com': {
        id: '2',
        email: 'agent@nestkhmer.com',
        name: 'Sophea Chan',
        role: 'agent',
        password: 'agent123',
        provider: 'email',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
    'tenant@nestkhmer.com': {
        id: '3',
        email: 'tenant@nestkhmer.com',
        name: 'John Doe',
        role: 'tenant',
        password: 'tenant123',
        provider: 'email',
    },
};

export function AuthProviderComponent({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('nestkhmer_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch { }
        }
        setIsLoading(false);
    }, []);

    const persistUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem('nestkhmer_user', JSON.stringify(userData));
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        const mockUser = MOCK_USERS[email];
        if (mockUser && mockUser.password === password) {
            const { password: _, ...userData } = mockUser;
            persistUser(userData);
            return true;
        }
        return false;
    };

    const loginWithGoogle = async (): Promise<boolean> => {
        // Mock: In production, this would redirect to Google OAuth via NextAuth/Firebase/Supabase
        // Simulating a successful Google login
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        const googleUser: User = {
            id: 'google_' + Date.now().toString(),
            email: 'user@gmail.com',
            name: 'Google User',
            role: 'tenant',
            provider: 'google',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        };
        persistUser(googleUser);
        return true;
    };

    const loginWithPhone = async (phone: string): Promise<{ success: boolean; requiresOtp: boolean }> => {
        // Mock: In production, this would call SMS API (Twilio, Firebase Auth, etc.)
        // Simulate sending an OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`[NestKhmer Auth] OTP sent to ${phone} — mock code: 123456`);
        return { success: true, requiresOtp: true };
    };

    const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
        // Mock: Accept "123456" as the valid OTP
        await new Promise(resolve => setTimeout(resolve, 800));
        if (otp === '123456') {
            const phoneUser: User = {
                id: 'phone_' + Date.now().toString(),
                email: '',
                name: phone,
                role: 'tenant',
                phone,
                provider: 'phone',
            };
            persistUser(phoneUser);
            return true;
        }
        return false;
    };

    const register = async (name: string, email: string, _password: string, role: UserRole): Promise<boolean> => {
        const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role,
            provider: 'email',
        };
        persistUser(newUser);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nestkhmer_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, loginWithPhone, verifyOtp, register, logout }}>
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
