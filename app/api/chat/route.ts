import { chat, toServerSentEventsStream } from "@tanstack/ai";
import { createGeminiChat, geminiText } from "@tanstack/ai-gemini";

export async function POST(request: Request) {
    if (!process.env.GEMINI_API_KEY) {
        return new Response(
            JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
            { status: 500 }
        );
    }

    const { messages } = await request.json();
    console.log("Received messages:", messages);

    try {
        const stream = await chat({
            adapter: createGeminiChat("gemini-2.5-pro", process.env.GEMINI_API_KEY),
            messages,
            conversationId: Date.now().toString(),
        });

        const readableStream = toServerSentEventsStream(stream);

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
