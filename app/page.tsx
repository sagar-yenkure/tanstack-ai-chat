"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { ChatInput } from "@/components/ChatInput"
import { ChatMessages } from "@/components/chatMessages"
import { useState } from "react"
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";

export default function ChatPage() {
    const [isDark, setIsDark] = useState(true)

    const { messages, sendMessage, isLoading, error } = useChat({
        connection: fetchServerSentEvents("/api/chat"),

    });

    console.log("Messages:", messages);

    return (
        <div className={isDark ? "dark" : ""}>
            <div className="flex h-screen flex-col bg-background text-foreground">
                <ChatHeader isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
                <ChatMessages error={error} messages={messages} isLoading={isLoading} />
                <ChatInput onSend={(content: string) => sendMessage(content)} />
            </div>
        </div>
    )
}
