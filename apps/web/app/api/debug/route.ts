import { db, schema } from '@nestkhmer/shared';
import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Forcefully create the missing email_verified column required by Better Auth
        try {
            await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false NOT NULL;`);
        } catch (alterError) {
            console.error("Column already exists or alter failed:", alterError);
        }

        const tables = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);
        return NextResponse.json({
            success: true,
            message: "Database connection established successfully.",
            env: {
                database: process.env.DATABASE_URL ? "URL IS SET" : "URL IS MISSING",
                betterAuthUrl: process.env.BETTER_AUTH_URL || 'missing',
                nextPublicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'missing'
            },
            tables
        });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message,
            stack: e.stack,
            env: {
                database: process.env.DATABASE_URL ? "URL IS SET" : "URL IS MISSING",
                betterAuthUrl: process.env.BETTER_AUTH_URL || 'missing',
                nextPublicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'missing'
            }
        }, { status: 500 });
    }
}
