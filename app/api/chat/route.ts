import { chat, toServerSentEventsStream } from "@tanstack/ai";
import { geminiText } from "@tanstack/ai-gemini";

export async function POST(request: Request) {
    if (!process.env.GEMINI_API_KEY) {
        return new Response(
            JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
            { status: 500 }
        );
    }

    const { messages, conversationId } = await request.json();

    try {
        const stream = await chat({
            adapter: geminiText("gemini-2.0-flash-lite"),
            messages,
            conversationId,
        });
        const readableStream = await toServerSentEventsStream(stream);

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "An error occurred",
            }),
            { status: 500 }
        );
    }
}
