"use client"

import { forwardRef, useEffect, useRef } from "react"
import { ChatMessage } from "./chatMessage"
import { type UIMessage } from "@tanstack/ai-react"
import ThinkingIndicator from "./ThinkingIndicator"

interface ChatMessagesProps {
  messages: UIMessage[]
  isLoading?: boolean
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(({ messages, isLoading }, ref) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-hide">
      <div className="mx-auto max-w-3xl space-y-5">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <ThinkingIndicator />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
})

ChatMessages.displayName = "ChatMessages"
