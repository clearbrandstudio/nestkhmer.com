import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth-context';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <OrganizationJsonLd />
            </head>
            <body className="min-h-screen flex flex-col">
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
