import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = 'https://nestkhmer.com';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: 'NestKhmer — Only Fresh Listings. Only Real Results.',
        template: '%s | NestKhmer',
    },
    description:
        'Cambodia\'s rental intelligence platform. Every listing is maximum 14 days old. Search apartments in Phnom Penh with full transparency.',
    keywords: [
        'Phnom Penh apartments',
        'Cambodia rental',
        'BKK1 apartment',
        'Toul Kork rental',
        'Cambodia real estate',
        'expat housing Cambodia',
        'rent apartment Cambodia',
        'Phnom Penh condo',
        'Cambodia property',
        'apartment for rent Phnom Penh',
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        siteName: 'NestKhmer',
        title: 'NestKhmer — Only Fresh Listings. Only Real Results.',
        description:
            'Cambodia\'s rental intelligence platform. Every listing is live, fresh, and fully detailed.',
        locale: 'en_US',
        alternateLocale: ['km_KH', 'zh_CN'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NestKhmer — Only Fresh Listings. Only Real Results.',
        description: 'Cambodia\'s rental intelligence platform. Fresh listings, transparent data, verified agents.',
    },
    alternates: {
        canonical: BASE_URL,
        languages: {
            'en': `${BASE_URL}/en`,
            'km': `${BASE_URL}/km`,
            'zh': `${BASE_URL}/zh`,
        },
    },
    other: {
        'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
