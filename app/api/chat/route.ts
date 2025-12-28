import { chat, toServerSentEventsStream } from "@tanstack/ai";
import { createGeminiChat } from "@tanstack/ai-gemini";

export async function POST(request: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return new Response(
                JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
                { status: 500 }
            );
        }

        const { messages } = await request.json();

        const stream = await chat({
            adapter: createGeminiChat("gemini-2.5-flash-lite", process.env.GEMINI_API_KEY),
            messages,
            conversationId: Date.now().toString(),
            maxTokens: 100,
        });

        const readableStream = toServerSentEventsStream(stream);

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
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
