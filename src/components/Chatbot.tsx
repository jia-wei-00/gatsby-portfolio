import { useState, useRef, useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import ReactMarkdown from "react-markdown";
import styled, { keyframes } from "styled-components";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";


interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_URL = import.meta.env.VITE_CHAT_API_URL as string;
const API_TOKEN = import.meta.env.VITE_CHAT_API_TOKEN as string;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useSessionStorage<string | null>(
    "chat_session_id",
    null,
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ message: text, sessionId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err instanceof Error ? err.message : "Failed to reach the API"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <Panel>
          <Header>
            <span>Chat with me</span>
            <CloseBtn onClick={() => setIsOpen(false)}>
              <CloseIcon fontSize="small" />
            </CloseBtn>
          </Header>

          <Messages>
            {messages.length === 0 && (
              <EmptyState>Ask me anything about Jia Wei!</EmptyState>
            )}
            {messages.map((msg, i) => (
              <Bubble key={i} $role={msg.role}>
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </Bubble>
            ))}
            {isLoading &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <Bubble $role="assistant">
                  <TypingDots>
                    <span />
                    <span />
                    <span />
                  </TypingDots>
                </Bubble>
              )}
            <div ref={messagesEndRef} />
          </Messages>

          <InputRow>
            <TextArea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message… (Enter to send)"
              rows={1}
              disabled={isLoading}
            />
            <SendBtn
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
            >
              <SendIcon fontSize="small" />
            </SendBtn>
          </InputRow>
        </Panel>
      )}

      <Fab onClick={() => setIsOpen((o) => !o)} $open={isOpen}>
        {isOpen ? <CloseIcon /> : <AutoAwesomeIcon />}
      </Fab>
    </>
  );
};

export default Chatbot;

/* ── Animations ── */
const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40%           { transform: translateY(-6px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Styled components ── */
const Fab = styled.button<{ $open: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: var(--transition);

  @media (max-width: 768px) {
    bottom: 8rem;
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(140, 50, 210, 1);
  }
`;

const Panel = styled.div`
  position: fixed;
  bottom: 6.5rem;
  right: 2rem;
  z-index: 99;
  width: 340px;
  max-height: 500px;
  border-radius: 16px;
  background: var(--color-bg-variant);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;

  @media (max-width: 768px) {
    bottom: 12rem;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 2rem);
    right: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;

  span {
    flex: 1;
    color: #fff;
  }
`;

const CloseBtn = styled.button`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  padding: 2px;
  border-radius: 50%;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: var(--color-dull);
  font-size: 0.85rem;
  margin: auto;
`;

const Bubble = styled.div<{ $role: "user" | "assistant" }>`
  max-width: 80%;
  padding: 10px 14px;
  border-radius: ${({ $role }) =>
    $role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  background: ${({ $role }) =>
    $role === "user" ? "var(--color-primary)" : "rgba(255,255,255,0.07)"};
  color: ${({ $role }) => ($role === "user" ? "#fff" : "var(--color-lighter)")};
  align-self: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
  font-size: 0.88rem;
  line-height: 1.5;
  word-break: break-word;

  p {
    margin: 0 0 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ul,
  ol {
    padding-left: 18px;
    margin: 4px 0;
  }
  li {
    margin-bottom: 2px;
  }
  strong {
    color: inherit;
    font-weight: 600;
  }
  em {
    color: inherit;
  }
  a {
    color: rgba(180, 130, 255, 1);
    text-decoration: underline;
  }
  code {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 0.82em;
    font-family: monospace;
    color: rgba(200, 220, 255, 0.95);
  }
  pre {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 10px 12px;
    overflow-x: auto;
    margin: 6px 0;
    code {
      background: none;
      padding: 0;
    }
  }
  h1,
  h2,
  h3 {
    margin: 6px 0 4px;
    font-weight: 600;
    color: inherit;
  }
`;

const TypingDots = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  height: 16px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-dull);
    animation: ${bounce} 1.2s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

const TextArea = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--color-white);
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 12px;
  resize: none;
  max-height: 120px;
  overflow-y: auto;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--color-dull);
  }

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const SendBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: var(--transition);

  &:hover:not(:disabled) {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
