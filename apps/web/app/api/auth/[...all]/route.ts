import { auth } from '@nestkhmer/shared';
import { toNextJsHandler } from 'better-auth/next-js';
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth.handler);

export async function GET(req: NextRequest) {
    try {
        return await authGET(req);
    } catch (e: any) {
        return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        return await authPOST(req);
    } catch (e: any) {
        return NextResponse.json({ error: e.message, stack: e.stack, name: e.name }, { status: 500 });
    }
}
