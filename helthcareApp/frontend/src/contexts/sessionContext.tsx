import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
}

export interface ChatSession {
  sessionId: string | null;
  title: string;
  messages: Message[];
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
  createduserid?: string;
  updateduserid?: string;
  userid?: string;
}

interface AllSessionsResponse {
  message: ApiSession[];
  success: boolean;
}

export interface ChatSessionContextValue {
  sessions: ChatSession[];
  setSessions: Dispatch<SetStateAction<ChatSession[]>>;
  currentSession: number;
  setCurrentSession: Dispatch<SetStateAction<number>>;
  loadingHistory: boolean;
  setLoadingHistory: Dispatch<SetStateAction<boolean>>;
  loadAllSessions: () => Promise<void>;
}

const ChatSessionContext = createContext<ChatSessionContextValue | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
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

export function ChatSessionProvider({ children }: ChatProviderProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      sessionId: null,
      title: "New Chat",
      messages: [],
    },
  ]);
  const [currentSession, setCurrentSession] = useState(0);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const loadAllSessions = useCallback(async () => {
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

      if (!data.success || data.message.length === 0) {
        setSessions([{ sessionId: null, title: "New Chat", messages: [] }]);
        localStorage.removeItem("sessionId");
        sessionStorage.setItem(`chat_sessions_loaded:${authToken}`, "1");
        return;
      }

      const loadedSessions = data.message.map(mapApiSession);
      setSessions(loadedSessions);
      setCurrentSession(0);

      if (loadedSessions[0]?.sessionId) {
        localStorage.setItem("sessionId", loadedSessions[0].sessionId);
      }

      // Prevent repeated auto-fetch on route changes / StrictMode remounts.
      sessionStorage.setItem(`chat_sessions_loaded:${authToken}`, "1");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) return;

    const key = `chat_sessions_loaded:${authToken}`;
    if (sessionStorage.getItem(key) === "1") return;

    void loadAllSessions();
  }, [loadAllSessions]);

  const value = useMemo<ChatSessionContextValue>(
    () => ({
      sessions,
      setSessions,
      currentSession,
      setCurrentSession,
      loadingHistory,
      setLoadingHistory,
      loadAllSessions,
    }),
    [sessions, currentSession, loadingHistory, loadAllSessions]
  );

  return <ChatSessionContext.Provider value={value}>{children}</ChatSessionContext.Provider>;
}

export const ChatSessoinProvider = ChatSessionProvider;

export function useChatSession() {
  const context = useContext(ChatSessionContext);
  if (!context) {
    throw new Error("useChatSession must be used inside ChatSessionProvider");
  }
  return context;
}