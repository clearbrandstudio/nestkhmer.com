import { seed } from '@nestkhmer/shared';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await seed();
        return NextResponse.json({ success: true, message: "Remote Seeding Complete." });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message, stack: e.stack }, { status: 500 });
    }
}
