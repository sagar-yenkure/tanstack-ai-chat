"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatInputProps {
    onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
    const [input, setInput] = useState("")

    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput("")
    }

    return (
        <div className="border-t border-border bg-background p-3.5">
            <div className="mx-auto max-w-3xl">
                <div className="flex gap-2.5">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                        className="h-11 flex-1 rounded-xl border-border bg-muted px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                    This is a demo interface. Integrate TanStack AI for real responses.
                </p>
            </div>
        </div>
    )
}
