"use client"

import { ChatHeader } from "@/components/ChatHeader"
import { ChatInput } from "@/components/ChatInput"
import { ChatMessages } from "@/components/chatMessages"
import { useState } from "react"


interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

const mockMessages: Message[] = [
    {
        id: "1",
        role: "assistant",
        content: "Hello! How can I assist you today?",
        timestamp: new Date(Date.now() - 300000),
    },
    {
        id: "2",
        role: "user",
        content: "Can you help me understand TanStack AI?",
        timestamp: new Date(Date.now() - 240000),
    },
    {
        id: "3",
        role: "assistant",
        content:
            "Of course! TanStack AI is a powerful library for building AI-powered applications. It provides a comprehensive set of tools for managing AI interactions, state management, and data fetching. What specific aspect would you like to know more about?",
        timestamp: new Date(Date.now() - 180000),
    },
    {
        id: "4",
        role: "user",
        content: "How does it handle streaming responses?",
        timestamp: new Date(Date.now() - 120000),
    },
    {
        id: "5",
        role: "assistant",
        content:
            "TanStack AI handles streaming responses elegantly by providing real-time updates as the AI generates content. This creates a more interactive and responsive user experience, similar to what you see in modern chat interfaces.",
        timestamp: new Date(Date.now() - 60000),
    },
]

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(mockMessages)
    const [isDark, setIsDark] = useState(true)
    const [isThinking, setIsThinking] = useState(false)

    const handleSend = (content: string) => {
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newUserMessage])

        setIsThinking(true)

        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "This is a mock response. Integrate TanStack AI to get real AI-powered responses!",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiResponse])
            setIsThinking(false)
        }, 2000)
    }

    return (
        <div className={isDark ? "dark" : ""}>
            <div className="flex h-screen flex-col bg-background text-foreground">
                <ChatHeader isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
                <ChatMessages messages={messages} isThinking={isThinking} />
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    )
}
