import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import crypto from 'crypto';

// Use command line ENV or fallback to local
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nestkhmer';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

import { auth } from '../lib/auth';

// Simulated context for calling the Next.js API route internally
const seedContext = {
    headers: new Headers(),
    url: "http://localhost:3000/api/auth/sign-up/email",
    method: "POST" as const
};

export async function seed() {
    console.log('🌱 Starting Database Seeding by invoking Better Auth Internals...');

    const usersToCreate = [
        {
            email: 'admin@nestkhmer.com',
            password: 'nestkhmer2026',
            name: 'System Admin',
            role: 'admin'
        },
        {
            email: 'agent@nestkhmer.com',
            password: 'nestkhmer2026',
            name: 'Top Agent',
            role: 'agent'
        },
        {
            email: 'tenant@nestkhmer.com',
            password: 'nestkhmer2026',
            name: 'Standard Tenant',
            role: 'tenant'
        }
    ];

    for (const u of usersToCreate) {
        console.log(`👤 Registering ${u.role}: ${u.email}...`);
        try {
            await auth.api.signUpEmail({
                body: {
                    email: u.email,
                    password: u.password,
                    name: u.name,
                    role: u.role
                },
                ...seedContext
            });
            console.log(`✅ successfully provisioned ${u.email}`);
        } catch (e: any) {
            console.log(`⚠️ skipped ${u.email} (likely already exists) - error: ${e.message}`);
        }
    }

    console.log('🎉 Seeding Complete! Passwords for all accounts are set to: nestkhmer2026');
}

// Only run automatically if executed directly via CLI
if (require.main === module) {
    seed().then(() => {
        process.exit(0);
    }).catch((err) => {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    });
}
