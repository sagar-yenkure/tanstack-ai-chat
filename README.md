# TanStack AI Chat Application

A modern, real-time AI chat application built with Next.js, TanStack AI, and Gemini API. Features persistent chat history using IndexedDB and a beautiful dark/light mode UI.

## 🎯 Project Overview

This is a full-stack chat application that allows users to:
- Send messages to an AI assistant powered by Google's Gemini API
- View real-time streaming responses from the AI
- Toggle between dark and light themes
- See real-time message streaming with Server-Sent Events (SSE)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons
- **AI Integration**: TanStack AI (0.2.0), Google Gemini API
- **UI Components**: Radix UI, custom components

### Project Structure
```
tanstack-ai/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main chat page
│   └── globals.css               # Global styles
├── components/
│   ├── ChatHeader.tsx            # Header with theme toggle & clear chat
│   ├── ChatInput.tsx             # Message input component
│   ├── chatMessages.tsx          # Messages display container
│   ├── chatMessage.tsx           # Individual message component
│   ├── ChatError.tsx             # Error display component
│   ├── ThinkingIndicator.tsx     # AI thinking animation
│   └── ui/                       # UI primitives
│       ├── button.tsx
│       └── input.tsx
├── lib/
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

## 🔧 Core Systems

### 1. Main Chat Page (`app/page.tsx`)

The main page component that manages the chat interface and message handling.

**Key Features**:

```typescript
export default function ChatPage() {
    const [isDark, setIsDark] = useState(true)

    const { messages, sendMessage, isLoading, error } = useChat({
        connection: fetchServerSentEvents("/api/chat"),
    });
}
```

- **State Management**: 
  - `isDark` - Theme toggle state
  - `messages` - Array of all messages in conversation
  - `isLoading` - Loading state while AI responds
  - `error` - Error messages from API

- **useChat Hook**: 
  - Manages message state
  - Handles sending/receiving messages
  - Connects to `/api/chat` endpoint
  - Uses Server-Sent Events for streaming responses

### 2. AI Chat API (`app/api/chat/route.ts`)

**Endpoint**: `POST /api/chat`

Handles communication with Google Gemini API using server-sent events (SSE) for real-time streaming.

#### Request Format:
```json
{
  "messages": [
    {
      "id": "msg-123",
      "role": "user|assistant",
      "parts": [{ "type": "text", "content": "message text" }],
      "createdAt": "2026-02-01T..."
    }
  ]
}
```

#### Response Format:
Server-sent events stream with real-time token generation.

#### Key Configuration:
- **Model**: `gemini-2.5-flash-lite` (fast, lightweight)
- **Max Tokens**: 250 (response length limit)
- **API Key**: Read from `process.env.GEMINI_API_KEY`

### 4. UI Components

#### ChatHeader.tsx
- Toggle between dark/light themes
- Clear chat history button (trash icon)
- Displays app title and branding

#### ChatInput.tsx
- Text input field for user messages
- Send button with icon
- Enter key to submit
- Input validation

#### chatMessages.tsx
- Scrollable container for all messages
- Auto-scroll to latest message
- Shows loading indicator (thinking animation)
- Maps through messages array

#### chatMessage.tsx
- Displays individual message
- Renders thinking indicators or text content
- User messages: blue gradient background
- Assistant messages: gray background
- Shows message timestamp

#### ChatError.tsx
- Displays error messages
- Styled error container

#### ThinkingIndicator.tsx
- Animation showing AI is processing
- Displays when `isLoading` is true

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API Key

### Installation

1. **Clone the repository**
```bash
cd tanstack-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```bash
GEMINI_API_KEY=your_api_key_here
```

4. **Run development server**
``m run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Features

### ✅ Chat History Persistence
- MessReal-time Chat
- Send messages to AI assistant
- Real-time streaming responses via SSE
- See AI typing in real-time
- Instant feedback

### ✅ Theme Toggle
- Dark mode (default)
- Light mode

### ✅ Error Handling
- API error messages displayed
- Fallback error messages
- Console logging for debugging

### ✅ Responsive UI
- Mobile-friendly design
- Smooth animations
- Auto-scrolling to latest message
## 🔄 Data Flow

```
User Input
    ↓
ChatInput component
    ↓
sendMessage() → /api/chat API
    ↓
Gemini API (Google)
    ↓
Server-sent Events (streaming)
    ↓
useChat hook updates messages array
    ↓
ChatMessages render new message
    ↓
Display to user
```

## 🎨 Styling

- **Framework**: Tailwind CSS v4 with `@tailwindcss/postcss`
- **Color Scheme**: 
  - Primary: Blue to Cyan gradient
  - Background: White (light) / Dark (dark mode)
  - Text: Foreground/Muted colors
- **Components**: 
  - Rounded corners (rounded-xl)
  - Smooth animations (fade-in, slide-in)
  - Responsive design

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.1 | React framework |
| @tanstack/ai | 0.2.0 | AI integration |
| @tanstack/ai-gemini | 0.2.0 | Gemini adapter |
| @tanstack/ai-react | 0.2.0 | React hooks |
| tailwindcss | 4 | Styling |
| lucide-react | 0.562.0 | Icons |
| typescript | 5 | Type safety |

## 🐛 Debugging

Enable console logging to debug:
```typescript
console.log("Loaded saved messages:", savedMessages)
console.log("Converted messages:", convertedMessages)
console.log("Saved message:", msg.id)
```

Check browser DevTools → Application → IndexedDB → ChatHistoryDB to inspect stored data.

## 🎯 How It Works - User Journey

1. **Page Load**
   - Initialize chat interface
   - Load empty message array

2. **User Sends Message**
   - Message added to UI immediately
   - Sent to `/api/chat` endpoint
   - Displayed in chat window

3. **AI Responds**
   - Real-time streaming via SSE
   - Response displayed as it arrives
   - Stream completes and message finalized

4. **Theme Toggle**
   - Switch between dark/light mode
   - UI updates immediately
## 🚀 Production Build

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔗 Related Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [TanStack AI Docs](https://ai.tanstack.com/)
- [Google Gemini API](https://ai.google.dev/)
- [IndexedDB MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

Private project

## 🤝 Contributing

This is a personal project. Feel free to fork and customize!

---

**Last Updated**: February 2026
**Version**: 0.1.0

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
