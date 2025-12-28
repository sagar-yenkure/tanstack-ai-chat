"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { ChatInput } from "@/components/ChatInput"
import { ChatMessages } from "@/components/chatMessages"
import { useState } from "react"
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { ChatError } from "@/components/ChatError"

export default function ChatPage() {
    const [isDark, setIsDark] = useState(true)

    const { messages, sendMessage, isLoading, error } = useChat({
        connection: fetchServerSentEvents("/api/chat"),
    });

    console.log("Messages:", messages);
    console.log("error:", error);

    return (
        <div className={isDark ? "dark" : ""}>
            <div className="flex h-screen flex-col bg-background text-foreground">
                <ChatHeader isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
                <ChatMessages messages={messages} isLoading={isLoading} />

                {/* error msg display */}
                {error && <ChatError error={error.message} />}
                <ChatInput onSend={(content: string) => sendMessage(content)} />
            </div>
        </div>
    )
}
