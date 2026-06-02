# Jia Wei — Portfolio

Personal portfolio website built with React, TypeScript, and Vite. Features a floating AI chatbot powered by a LangChain backend.

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** — build tool & dev server
- **styled-components v6** — component styling
- **framer-motion** — animations
- **MUI v7** — icons and UI components
- **react-scroll-section** — scroll-based section navigation
- **react-markdown** — markdown rendering in chatbot
- **usehooks-ts** — `useSessionStorage` for chatbot session persistence
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

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_CHAT_API_URL` | URL of the LangChain chat API endpoint |

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

The floating chatbot (bottom-right) connects to a LangChain backend. It uses session-based memory via `sessionStorage` so conversation history persists across page refreshes within the same tab.

Set `VITE_CHAT_API_URL` in your `.env` for local development, and add it as an environment variable in your Vercel project settings for production.

## Deployment

Deployed on **Vercel**. Push to `master` to trigger a deployment.

Set the following in Vercel project settings under **Environment Variables**:

- `VITE_CHAT_API_URL` — production chat API URL
