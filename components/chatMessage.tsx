import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-500",
        message.role === "user" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-medium",
          message.role === "user"
            ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
            : "bg-muted text-muted-foreground",
        )}
      >
        {message.role === "user" ? "U" : "AI"}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2",
          message.role === "user"
            ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
            : "bg-muted text-foreground",
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={cn("mt-1.5 text-xs", message.role === "user" ? "text-blue-100" : "text-muted-foreground")}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}
