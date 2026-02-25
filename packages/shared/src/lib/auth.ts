import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as schema from '../db/schema';
import { phoneNumber } from 'better-auth/plugins';

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || 'super-secret-development-string-for-nestkhmer',
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    trustedOrigins: ['https://nestkhmer.com', 'https://www.nestkhmer.com'],
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user: schema.users,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        }
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        },
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                defaultValue: 'tenant',
            },
            avatar: {
                type: 'string',
                required: false,
            },
            locale: {
                type: 'string',
                defaultValue: 'en',
            },
        },
    },
    plugins: [
        phoneNumber({
            sendOTP: async ({ phoneNumber, code }: { phoneNumber: string, code: string }) => {
                console.log(`[NestKhmer Auth] Sending OTP ${code} to ${phoneNumber}`);
            }
        })
    ],
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    if (user.role === 'agent') {
                        await db.insert(schema.agents).values({
                            userId: user.id,
                        });
                    }
                }
            }
        }
    }
});
