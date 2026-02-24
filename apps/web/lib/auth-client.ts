import { createAuthClient } from 'better-auth/react';
import type { auth } from '@nestkhmer/shared';

// We let Better Auth automatically infer the base URL from the browser origin
export const authClient = createAuthClient();

export const { useSession, signIn, signUp, signOut } = authClient;
