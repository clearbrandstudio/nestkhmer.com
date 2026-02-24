import { createAuthClient } from 'better-auth/react';
import type { auth } from '@nestkhmer/shared';

// We just don't pass the generic since the basic email/social plugins are included automatically
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
});

export const { useSession, signIn, signUp, signOut } = authClient;
