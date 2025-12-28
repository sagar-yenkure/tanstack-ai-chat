import { cn } from "@/lib/utils";
import { UIMessage } from "@tanstack/ai-react";
import ThinkingIndicator from "./ThinkingIndicator";

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const containerClasses = cn(
    "flex gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-500",
    isUser ? "flex-row-reverse" : "flex-row"
  );

  const avatarClasses = cn(
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-medium",
    isUser
      ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
      : "bg-muted text-muted-foreground"
  );

  const messageClasses = (role: 'system' | 'user' | 'assistant') =>
    cn(
      "max-w-[80%] rounded-lg px-3.5 py-2",
      role === "user" ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white" : "bg-muted text-foreground"
    );


  return (
    <div className={containerClasses}>
      <div className={avatarClasses}>{isUser ? "U" : "AI"}</div>

      {message?.parts?.map((part, index) => (
        <div key={index} className={messageClasses(message.role)}>
          {part?.type === "thinking" ? (
            <ThinkingIndicator />
          ) : (
            <div>
              {part?.type === "text" ? <p className="text-sm">{part.content}</p> : <p className="text-sm">mera yeshu yeshu </p>}
              <p
                className={cn(
                  "mt-1.5 text-xs",
                  isUser ? "text-blue-100" : "text-muted-foreground"
                )}
              >
                {message?.createdAt?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ||
                  ""}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
