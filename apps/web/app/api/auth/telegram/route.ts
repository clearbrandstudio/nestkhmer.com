import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db, schema, auth } from '@nestkhmer/shared';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

// Securely parse and validate the payload from the Telegram Widget
function verifyTelegramHash(data: any, botToken: string): boolean {
    if (!botToken) return false;

    const { hash, ...userData } = data;
    if (!hash) return false;

    // Check auth_date to prevent replay attacks (e.g. older than 24 hours)
    const authDate = parseInt(userData.auth_date);
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 86400) return false;

    // 1. Create Data Check String
    const dataCheckArr = Object.keys(userData)
        .sort()
        .map((key) => `${key}=${userData[key]}`);
    const dataCheckString = dataCheckArr.join('\n');

    // 2. Generate Secret Key
    const secretKey = crypto.createHash('sha256').update(botToken).digest();

    // 3. Compute HMAC-SHA256
    const computedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    return computedHash === hash;
}

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        if (!botToken) {
            console.error('TELEGRAM_BOT_TOKEN is missing in the environment context.');
            return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
        }

        // 1. Cryptographically verify the Telegram payload
        const isValid = verifyTelegramHash(payload, botToken);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid authentication payload' }, { status: 401 });
        }

        const telegramId = payload.id.toString();
        const email = `${telegramId}@telegram.nestkhmer.com`; // Dummy email for DB constraints
        const name = [payload.first_name, payload.last_name].filter(Boolean).join(' ') || 'Telegram User';

        // 2. Look for existing user
        let user = await db.query.users.findFirst({
            where: eq(schema.users.email, email)
        });

        // 3. Create user if they don't exist
        if (!user) {
            const newUser = await db.insert(schema.users).values({
                id: crypto.randomUUID(),
                email: email,
                name: name,
                image: payload.photo_url || null,
                emailVerified: true,
                role: 'tenant', // Default role for external signups
                createdAt: new Date(),
                updatedAt: new Date()
            }).returning();
            user = newUser[0];
        }

        // 4. Create Better Auth Session manually in the DB
        const sessionToken = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 Days

        await db.insert(schema.session).values({
            id: sessionToken,
            token: sessionToken,
            userId: user.id,
            expiresAt: expiresAt,
            createdAt: new Date(),
            updatedAt: new Date(),
            ipAddress: req.headers.get('x-forwarded-for') || null,
            userAgent: req.headers.get('user-agent') || null,
        });

        // 5. Build Response and set cookies exactly as Better Auth expects
        const res = NextResponse.json({ success: true, user });
        const cookieStore = await cookies();

        // Standard cookie
        cookieStore.set('better-auth.session_token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: expiresAt
        });

        // Production secure prefix cookie (CRITICAL for many hosting environments)
        if (process.env.NODE_ENV === 'production') {
            cookieStore.set('__Secure-better-auth.session_token', sessionToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
                expires: expiresAt
            });
        }

        return res;

    } catch (error: any) {
        console.error('API Error during Telegram OAuth:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
