# SHEY-GPT

SHEY-GPT is a lightweight chat UI built with Next.js that connects a browser client to AI backends and persists conversation history. It provides a responsive chat area, conversation list, Markdown rendering of AI responses, and basic copy/share actions — suitable as a starting point for building an assistant or prototype UI wired to OpenAI/Google AI providers and MongoDB.

## Key features
- Conversational UI with input box and streamed replies via the `ai` SDK.
- Conversation history: create, update and delete chats (persisted via Mongoose).
- Markdown rendering for AI responses (react-markdown).
- Copy and share actions for individual assistant messages.
- Mobile-friendly layout with a collapsible sidebar for chat selection.
- Zustand store for client-side chat state.

## Technology stack
- Language: TypeScript (Next.js app router + React)
- Framework / runtime: Next.js (App Router) — Next 16
- UI: React 19, Tailwind CSS, lucide-react icons, (antd present in deps)
- AI / LLM integration: @ai-sdk/react, @ai-sdk/openai, @ai-sdk/google, ai
- Persistence: Mongoose (MongoDB)
- State management: zustand
- Other: react-markdown, react-share

## High-level architecture
- Client (app/*): React client components implement the chat UI.
  - app/page.tsx — top-level client page that initializes user and layout.
  - app/_components/sidebar.tsx — conversation list and controls (new/delete).
  - app/_components/chat-area.tsx — main chat area, sends messages via the AI client transport.
  - app/_components/messages.tsx — renders messages and provides copy/share actions.
- API (server-side): client uses DefaultChatTransport with `api: '/api/chat'` — server route expected to forward chat requests to the configured AI provider(s) and return assistant responses.
- Persistence: Mongoose models (models/) and actions/ files implement CRUD for chats and users. Client calls action helpers (createNewChat, updateChat, getChatsByUserId, deleteChat).
- State: Zustand store (store/) holds selected chat and userChats in the browser.

How it fits together:
- The client sends messages using the `ai` SDK `DefaultChatTransport` to `/api/chat`.
- Server-side route (not shown here) is responsible for interacting with OpenAI/Google via the SDKs and for saving chat documents to MongoDB via Mongoose.
- Conversations are fetched and managed from the client using action helpers that call server endpoints.

## Repository layout (top-level)
