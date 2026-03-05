import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@nestkhmer/shared';
import { headers } from 'next/headers';

/**
 * POST-OAuth callback handler.
 * Better Auth calls this after a successful social login (Google, etc.).
 * We read the session from the cookie and redirect the user to the correct page
 * based on their role — this is what makes the Navbar rehydrate correctly.
 */
export async function GET(req: NextRequest) {
    try {
        const headersList = await headers();
        const session = await auth.api.getSession({ headers: headersList });

        // Detect locale from referer or default to 'en'
        const referer = req.headers.get('referer') || '';
        const localeMatch = referer.match(/\/(en|km|zh)\//);
        const locale = localeMatch?.[1] || 'en';

        if (session?.user) {
            const role = (session.user as any).role || 'tenant';
            if (role === 'admin') {
                return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, req.url));
            } else if (role === 'agent') {
                return NextResponse.redirect(new URL(`/${locale}/portal/dashboard`, req.url));
            } else {
                return NextResponse.redirect(new URL(`/${locale}/profile`, req.url));
            }
        }

        // No session found — redirect to login with error
        return NextResponse.redirect(new URL(`/${locale}/auth/login?error=session_missing`, req.url));
    } catch (error) {
        console.error('[callback-redirect] Error reading session:', error);
        return NextResponse.redirect(new URL('/en/auth/login?error=callback_failed', req.url));
    }
}
