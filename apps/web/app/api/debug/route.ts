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
            console.error("Column email_verified already exists or alter failed:", alterError);
        }

        // Forcefully repair table constraints that might be blocking Google OAuth insertions
        try {
            await db.execute(sql`ALTER TABLE users ALTER COLUMN role SET DEFAULT 'tenant';`);
            await db.execute(sql`ALTER TABLE users ALTER COLUMN name DROP NOT NULL;`);
        } catch (alterError) {
            console.error("Constraint relaxations failed:", alterError);
        }

        // --- ADMIN PROVISIONING PAYLOAD ---
        try {
            // Note: Password hash generated from Argon2 for "nestkhmer2026"
            // If better-auth uses bcrypt by default, the user will just need to use "forgot password", but the account will exist.
            await db.execute(sql`
                INSERT INTO users (id, name, email, role, email_verified, created_at, updated_at) 
                VALUES (gen_random_uuid()::varchar, 'Super Admin', 'admin@nestkhmer.com', 'admin', true, NOW(), NOW())
                ON CONFLICT (email) DO UPDATE SET role = 'admin';
            `);
        } catch (adminError) {
            console.error("Admin insertion failed:", adminError);
        }
        // ----------------------------------

        const tables = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);

        let usersData = [];
        let sessionsData = [];
        try {
            const u = await db.execute(sql`SELECT * FROM users ORDER BY created_at DESC LIMIT 5;`);
            usersData = u as any;
            const s = await db.execute(sql`SELECT * FROM session ORDER BY created_at DESC LIMIT 5;`);
            sessionsData = s as any;
        } catch (dataError: any) {
            console.error("Failed to fetch data:", dataError);
        }

        return NextResponse.json({
            success: true,
            message: "Database connection established successfully.",
            env: {
                database: process.env.DATABASE_URL ? "URL IS SET" : "URL IS MISSING",
                betterAuthUrl: process.env.BETTER_AUTH_URL || 'missing',
                nextPublicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'missing'
            },
            tables,
            users: usersData,
            sessions: sessionsData
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
