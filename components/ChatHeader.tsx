"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface ChatHeaderProps {
    isDark: boolean
    onToggleTheme: () => void
}

export function ChatHeader({ isDark, onToggleTheme }: ChatHeaderProps) {
    return (
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </div>
                <div>
                    <h1 className="text-base font-semibold">AI Assistant</h1>
                    <p className="text-xs text-muted-foreground">Powered by TanStack AI</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onToggleTheme} className="h-9 w-9 rounded-xl">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
        </header>
    )
}
