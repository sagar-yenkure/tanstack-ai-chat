import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

if (!process.env.ALLOWED_ORIGIN) throw new Error("Missing ALLOWED_ORIGIN environment variable");

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

export default function middleware(req: NextRequest) {
    if (req.nextUrl.pathname !== "/api/chat") {
        return NextResponse.next();
    }

    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");

    //  Block if origin is missing or wrong
    if (!origin || origin !== ALLOWED_ORIGIN) {
        return NextResponse.json(
            { error: "Unauthorized origin" },
            { status: 403 }
        );
    }

    //  Block if referer is missing or wrong
    if (!referer || !referer.startsWith(ALLOWED_ORIGIN)) {
        return NextResponse.json(
            { error: "Unauthorized origin" },
            { status: 403 }
        );
    }

    return NextResponse.next();
}
