import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    // Exclude API routes, next internals, static files and images
    matcher: ['/', '/(en|km|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
