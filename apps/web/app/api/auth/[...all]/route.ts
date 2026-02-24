import { auth } from '@nestkhmer/shared';
import { toNextJsHandler } from 'better-auth/next-js';

const handler = toNextJsHandler(auth.handler);

export const POST = async (req: Request) => {
    try {
        return await handler.POST(req);
    } catch (e: any) {
        console.error("/// BETTER AUTH POST ERROR ///", e);
        return new Response(e.message || "Internal Error", { status: 500 });
    }
};

export const GET = handler.GET;
