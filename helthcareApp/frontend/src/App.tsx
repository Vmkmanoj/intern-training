import { useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./auth/Profile.tsx";
import Logout from "./auth/Logout.tsx";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
}

interface ChatSession {
  sessionId: string | null;
  title: string;
  messages: Message[];
}

interface ChatRequest {
  sessionId: string | null;
  userid: string;
  message: string;
  username: string;
  email: string;
}

interface ApiSessionMessage {
  role: "user" | "assistant";
  content: string;
  timeStamp?: string;
}

interface ApiSession {
  id: string;
  sessiontitle: string;
  message: ApiSessionMessage[];
  createdat?: string;
  updatedat?: string;
  createdby?: string;
  updatedby?: string;
  userid?: string;
}

interface AllSessionsResponse {
  message: ApiSession[];
  success: boolean;
}

function getUserIdFromToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const payload = JSON.parse(atob(padded)) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

function parseSseChunk(chunk: string): { event?: string; data?: string } {
  const lines = chunk.split("\n");
  let event: string | undefined;
  let data: string | undefined;
  for (const line of lines) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    if (line.startsWith("data:")) data = line.slice(5).trim();
  }
  return { event, data };
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <ChatApp />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("auth_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function mapApiSession(session: ApiSession, index: number): ChatSession {
  return {
    sessionId: session.id,
    title: session.sessiontitle || "Chat",
    messages: session.message.map((msg, msgIndex) => ({
      id: Date.now() + index * 1000 + msgIndex,
      role: msg.role,
      content: msg.content,
    })),
  };
}

function ChatApp() {
  const [input, setInput] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const token = localStorage.getItem("auth_token") ?? "";

  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      sessionId: null,
      title: "New Chat",
      messages: [],
    },
  ]);

  const [currentSession, setCurrentSession] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    const loadAllSessions = async () => {
      const authToken = localStorage.getItem("auth_token");
      if (!authToken) return;

      setLoadingHistory(true);
      const tokenType = localStorage.getItem("token_type") ?? "bearer";

      try {
        const res = await fetch("http://localhost:8000/chat/get-all-session", {
          headers: {
            Authorization: `${tokenType} ${authToken}`,
          },
        });

        if (!res.ok) return;

        const data = (await res.json()) as AllSessionsResponse;
        if (!data.success || !data.message.length) {
          setSessions([{ sessionId: null, title: "New Chat", messages: [] }]);
          localStorage.removeItem("sessionId");
          return;
        }

        const loadedSessions = data.message.map(mapApiSession);
        setSessions(loadedSessions);
        setCurrentSession(0);

        if (loadedSessions[0].sessionId) {
          localStorage.setItem("sessionId", loadedSessions[0].sessionId);
        }
      } catch {
        // keep default empty chat
      } finally {
        setLoadingHistory(false);
      }
    };

    loadAllSessions();
  }, []);

  const newChat = () => {
    localStorage.removeItem("sessionId");
    setSessions((prev) => [
      { sessionId: null, title: "New Chat", messages: [] },
      ...prev,
    ]);
    setCurrentSession(0);
  };

  const selectSession = (index: number) => {
    setCurrentSession(index);
    setSessions((prev) => {
      const sessionId = prev[index]?.sessionId;
      if (sessionId) {
        localStorage.setItem("sessionId", sessionId);
      } else {
        localStorage.removeItem("sessionId");
      }
      return prev;
    });
  };

  const appendAssistantText = (assistantId: number, text: string) => {
    setSessions((prev) =>
      prev.map((session, index) => {
        if (index !== currentSession) return session;
        return {
          ...session,
          messages: session.messages.map((msg) =>
            msg.id === assistantId ? { ...msg, content: text } : msg
          ),
        };
      })
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const question = input;
    setInput("");

    abortRef.current?.abort();
    const abortController = new AbortController();
    abortRef.current = abortController;

    const userId = Date.now();
    const assistantId = userId + 1;

    setSessions((prev) =>
      prev.map((session, index) =>
        index === currentSession
          ? {
              ...session,
              messages: [
                ...session.messages,
                { id: userId, role: "user", content: question },
                { id: assistantId, role: "assistant", content: "" },
              ],
            }
          : session
      )
    );

    const userid = getUserIdFromToken(token);
    if (!userid) {
      appendAssistantText(assistantId, "Session expired. Please login again.");
      return;
    }

    const body: ChatRequest = {
      sessionId: sessions[currentSession]?.sessionId ?? localStorage.getItem("sessionId"),
      userid,
      message: question,
      username: localStorage.getItem("userName") ?? "",
      email: localStorage.getItem("email") ?? "",
    };

    const tokenType = localStorage.getItem("token_type") ?? "bearer";

    try {
      const res = await fetch("http://localhost:8000/chat/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify(body),
        signal: abortController.signal,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { detail?: string; message?: string }
          | null;
        throw new Error(data?.detail || data?.message || "Failed to send message");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          if (!part.trim()) continue;
          const { event, data } = parseSseChunk(part);

          if (event === "message" && data) {
            setSessions((prev) =>
              prev.map((session, index) => {
                if (index !== currentSession) return session;
                return {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: msg.content + data + " " }
                      : msg
                  ),
                };
              })
            );
          }

          if (event === "session" && data) {
            localStorage.setItem("sessionId", data);
            setSessions((prev) =>
              prev.map((session, index) =>
                index === currentSession
                  ? {
                      ...session,
                      sessionId: data,
                      title:
                        session.title === "New Chat"
                          ? question.slice(0, 30)
                          : session.title,
                    }
                  : session
              )
            );
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      appendAssistantText(
        assistantId,
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  const messages = sessions[currentSession].messages;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#000000",
        color: "#e5e5e5",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Sidebar */}
      {/* <div
        style={{
          width: 260,
          background: "#0a0a0a",
          borderRight: "1px solid #262626",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          flexShrink: 0,
        }}
      >
        <button
          onClick={newChat}
          style={{
            margin: 15,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #262626",
            background: "#171717",
            color: "#e5e5e5",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#262626")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#171717")}
        >
          + New Chat
        </button>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {sessions.map((session, index) => (
            <div
              key={session.sessionId ?? `new-${index}`}
              onClick={() => selectSession(index)}
              style={{
                padding: 15,
                cursor: "pointer",
                background:
                  currentSession === index ? "#262626" : "transparent",
                margin: "5px 10px",
                borderRadius: 8,
                color: currentSession === index ? "#ffffff" : "#a3a3a3",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {session.title}
            </div>
          ))}
        </div>
      </div> */}

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 20,
            borderBottom: "1px solid #262626",
            fontWeight: "bold",
            fontSize: 22,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          {/* <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: 24,
              cursor: "pointer",
              padding: 0,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#a3a3a3")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            ☰
          </button> */}
          🤖 MedAgent
          <div style={{ flex: 1 }} />
          <Link
            to="/profile"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#e5e5e5",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 10,
              background: "#171717",
              border: "1px solid #262626",
            }}
          >
            Profile
          </Link>
          <Link
            to="/logout"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#e5e5e5",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 10,
              background: "#404040",
              border: "1px solid #262626",
            }}
          >
            Logout
          </Link>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: 20,
            scrollBehavior: "smooth",
          }}
        >
          {loadingHistory && (
            <div
              style={{
                textAlign: "center",
                marginTop: 120,
                color: "#525252",
              }}
            >
              Loading chat history...
            </div>
          )}

          {!loadingHistory && messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: 120,
                color: "#525252",
              }}
            >
              Ask me anything...
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                marginBottom: 20,
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: msg.role === "user" ? "#404040" : "#171717",
                  border: "1px solid #262626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: msg.role === "user" ? 10 : 0,
                  marginRight: msg.role === "assistant" ? 10 : 0,
                }}
              >
                {msg.role === "user" ? "👤" : "🤖"}
              </div>

              {/* Message Bubble */}
              <div
                style={{
                  background: msg.role === "user" ? "#262626" : "#171717",
                  border: msg.role === "assistant" ? "1px solid #262626" : "none",
                  padding: 15,
                  borderRadius: 12,
                  maxWidth: "75%",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.5",
                }}
              >
                {msg.content || (
                  <span style={{ color: "#737373" }}>Typing...</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: 20,
            borderTop: "1px solid #262626",
            background: "#0a0a0a"
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message AI..."
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 25,
              border: "1px solid #404040",
              background: "#171717",
              color: "#ffffff",
              outline: "none",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              width: 55,
              borderRadius: "50%",
              border: "none",
              background: "#404040",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#525252")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#404040")}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
