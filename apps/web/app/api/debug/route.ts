import { db } from '@nestkhmer/shared';
import { users } from '@nestkhmer/shared/src/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const test = await db.select().from(users).limit(1);
        return NextResponse.json({
            success: true,
            message: "Database connection established successfully.",
            data: test
        });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message,
            stack: e.stack,
            env: process.env.DATABASE_URL ? "URL IS SET" : "URL IS MISSING"
        }, { status: 500 });
    }
}
