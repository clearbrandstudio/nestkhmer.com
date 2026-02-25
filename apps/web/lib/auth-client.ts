import { createAuthClient } from 'better-auth/react';
import { phoneNumberClient } from "better-auth/client/plugins";
import type { auth } from '@nestkhmer/shared';

// We let Better Auth automatically infer the base URL from the browser origin
export const authClient = createAuthClient({
    plugins: [
        phoneNumberClient()
    ]
});

export const { useSession, signIn, signUp, signOut } = authClient;
