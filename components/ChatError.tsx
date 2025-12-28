"use client"

import { XCircle, WifiOff, AlertTriangle } from "lucide-react"

interface ChatErrorProps {
    error: string | undefined
}

export function ChatError({ error }: ChatErrorProps) {
    if (!error) return null

    const getErrorIcon = () => {
        if (error.toLowerCase().includes("network")) return <WifiOff className="h-4 w-4" />
        if (error.toLowerCase().includes("403")) return <AlertTriangle className="h-4 w-4" />
        return <XCircle className="h-4 w-4" />
    }

    return (
        <div className=" bg-background px-3.5 pb-2 pt-3.5">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500">
                    {getErrorIcon()}
                    <span className="flex-1">{error}</span>
                </div>
            </div>
        </div>
    )
}
