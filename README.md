# Jia Wei — Portfolio

Personal portfolio website built with React, TypeScript, and Vite. Features a floating streaming chatbot powered by an OpenAI Agents SDK backend.

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** — build tool & dev server
- **styled-components v6** — component styling
- **framer-motion** — animations
- **MUI v7** — icons and UI components
- **react-scroll-section** — scroll-based section navigation
- **react-markdown** — markdown rendering in chatbot
- **Vercel AI SDK** — streaming chat state and UI-message transport
- **Vercel Analytics** — usage analytics

## Getting Started

### Prerequisites

- Node.js >= 22.x
- npm

### Installation

```bash
npm install
```

### Environment Variables

The chatbot defaults to the local agent endpoint. Copy `.env.example` to `.env` when you want to override it:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_CHAT_API_URL` | Optional agent API URL; defaults to `http://127.0.0.1:8787/api/agent` |

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # UI components
│   ├── sections/       # Page sections (About, Work, Featured, Projects, Contact)
│   ├── Chatbot.tsx     # Floating AI chatbot
│   ├── Layout.tsx      # App layout (desktop/mobile)
│   ├── Navbar.tsx      # Desktop navigation
│   ├── NavMobile.tsx   # Mobile bottom navigation
│   └── ...
├── data/               # Static content as JSON + TS wrappers
│   ├── jobs.json
│   ├── projects.json
│   ├── featured.json
│   ├── about.json
│   └── siteMetadata.json
├── hooks/
│   └── useBreakpoint.ts  # Responsive breakpoint hook
├── styles/
│   └── global.css
└── App.tsx
```

## Chatbot

The floating chatbot (bottom-right) connects to an OpenAI Agents SDK backend through Vercel AI SDK's `useChat` transport. The API accepts the latest user text as `{ "message": string }` and returns a stream created with `createAiSdkUiMessageStreamResponse` from `@openai/agents-extensions/ai-sdk-ui`.

Assistant text is rendered as it streams. Conversation history is kept in memory for the current page; refreshing starts a new conversation.

The local endpoint is used automatically during development. Set `VITE_CHAT_API_URL` in your Vercel project settings when the production agent is deployed.

## Deployment

Deployed on **Vercel**. Push to `master` to trigger a deployment.

Set the following in Vercel project settings under **Environment Variables**:

- `VITE_CHAT_API_URL` — production chat API URL
