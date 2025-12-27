import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

if (!process.env.ALLOWED_ORIGIN || !process.env.ALLOWED_PATH) {
    throw new Error("Missing ALLOWED_ORIGIN or ALLOWED_PATH environment variables");
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const ALLOWED_PATH = process.env.ALLOWED_PATH;

export default function middleware(req: NextRequest) {
    if (req.nextUrl.pathname !== "/api/chat") {
        return NextResponse.next();
    }

    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");

    // //  Block if origin is missing or wrong
    // if (!origin || origin !== ALLOWED_ORIGIN) {
    //     return new NextResponse(
    //         JSON.stringify({ error: "Unauthorized origin" }),
    //         { status: 403 }
    //     );
    // }

    // //  Block if referer is missing or wrong
    // if (!referer || !referer.startsWith(`${ALLOWED_ORIGIN}${ALLOWED_PATH}`)) {
    //     return new NextResponse(
    //         JSON.stringify({ error: "Invalid referer" }),
    //         { status: 403 }
    //     );
    // }

    return NextResponse.next();
}
