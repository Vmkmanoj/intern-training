import { useEffect, useRef, useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState<"sessions" | "chat">("sessions");
  const [username, setUsername] = useState("Manoj");
  const [sessionId, setSessionId] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [message, setMessage] = useState("");
  const [sessions, setSessions] = useState<{ session_id: string; session_name: string; createdBy : string}[]>([]);
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useRef<WebSocket | null>(null);



  // Fetch all sessions
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/chat/get-all-session");
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
    setLoading(false);
  };

  // Create new session
  const createSession = async () => {
    if (!sessionName.trim()) {
      alert("Enter session name");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/chat/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_name: sessionName , createdby : username}),
      });
      const data = await response.json();
      setSessionId(data.session_id);
      setSessionName("");
      console.log("session id ",data.sessionId)
      await fetchSessions();
      setCurrentPage("chat");
      connectToChat(data.sessionId)
  
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session");
    }
    setLoading(false);
  };

  // Join existing session
  const joinSession = (sid: string) => {
    setSessionId(sid);
    setCurrentPage("chat");
    connectToChat(sid);
  };

  const connectToChat = (sid: string) => {
    socket.current = new WebSocket(
      `ws://localhost:8000/web/ws/${username}/${sid}`
    );

    socket.current.onopen = () => {
      console.log("Connected");
      setConnected(true);
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "message") {
        setMessages((prev) => [...prev, { user: data.user, message: data.message }]);
      }
    };

    socket.current.onclose = () => {
      console.log("Disconnected");
      setConnected(false);
    };

    socket.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  };

  // Send message
  const sendMessage = () => {
    if (!message.trim() || !socket.current) return;

    socket.current.send(JSON.stringify({ message: message }));
    setMessage("");
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  const eventSource = new EventSource("http://localhost:8000/sse/clock");

  eventSource.onmessage = (event) => {
    console.log(event.data);
    setTime(event.data);
  };

  eventSource.onerror = (err) => {
    console.error(err);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}, []);
 
  useEffect(() => {
    fetchSessions();
    return () => {
      socket.current?.close();
    };
  }, []);


  if (currentPage === "sessions") {
    return (
      <div style={styles.container}>
        <div style={styles.sessionContainer}>
          <div style={styles.header}>
            <h1 style={styles.title}>💬 Chat Sessions</h1>
            <p style={styles.subtitle}>Create or join a chat session</p>
             <div style={styles.subtitle}>{time}</div>
          </div>

          {/* Create Session */}
          <div style={styles.createSection}>
            <h2 style={styles.sectionTitle}>Create New Session</h2>
            <input
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input
              placeholder="Session name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              style={styles.input}
              onKeyPress={(e) => e.key === "Enter" && createSession()}
            />
            <button onClick={createSession} disabled={loading} style={styles.primaryButton}>
              {loading ? "Creating..." : "Create Session"}
            </button>
          </div>

          {/* Join Session */}
          <div style={styles.joinSection}>
            <h2 style={styles.sectionTitle}>Join Existing Session</h2>
            {loading ? (
              <p style={styles.loadingText}>Loading sessions...</p>
            ) : sessions.length === 0 ? (
              <p style={styles.noSessionText}>No sessions available yet</p>
            ) : (
              <div style={styles.sessionList}>
                {sessions.map((session) => (
                  <div key={session.session_id} style={styles.sessionCard}>
                    <div>
                      <h3 style={styles.sessionCardTitle}>{session.session_name}</h3>
                      <p style={styles.sessionCardId}>createdBy: {session.createdBy}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUsername(username); // Use existing username
                        joinSession(session.session_id);
                      }}
                      style={styles.joinButton}
                    >
                      Join
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

         
        </div>
      </div>
    );
  }

  // Chat Page
  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        {/* Header */}
        <div style={styles.chatHeader}>
          <div>
            <h1 style={styles.chatTitle}>💬 Chat</h1>
            <p style={styles.userInfo}>
              {username} • {connected ? "🟢 Connected" : "🔴 Disconnected"}
            </p>
          </div>
          <button
            onClick={() => {
              socket.current?.close();
              setCurrentPage("sessions");
              setMessages([]);
              setSessionId("");
            }}
            style={styles.backButton}
          >
            ← Back to Sessions
          </button>
        </div>

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageWrapper,
                  justifyContent: msg.user === username ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    backgroundColor:
                      msg.user === username ? "#007AFF" : "#E5E5EA",
                    color: msg.user === username ? "#fff" : "#000",
                  }}
                >
                  {msg.user !== username && (
                    <p style={styles.messageUser}>{msg.user}</p>
                  )}
                  <p style={styles.messageText}>{msg.message}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={styles.inputContainer}>
          <input
            value={message}
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            style={styles.messageInput}
            disabled={!connected}
          />
          <button
            onClick={sendMessage}
            disabled={!connected || !message.trim()}
            style={styles.sendButton}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F5F7FA",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  // Session Selection Styles
  sessionContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "50px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 10px 0",
  },

  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
  },

  createSection: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  joinSection: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: "0",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },

  primaryButton: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#007AFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },

  sessionList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },

  sessionCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    transition: "all 0.2s",
  },

  sessionCardTitle: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
  },

  sessionCardId: {
    margin: "0",
    fontSize: "12px",
    color: "#666",
  },

  joinButton: {
    padding: "8px 16px",
    backgroundColor: "#34C759",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },

  noSessionText: {
    textAlign: "center" as const,
    color: "#999",
    fontSize: "14px",
    padding: "20px",
  },

  loadingText: {
    textAlign: "center" as const,
    color: "#999",
    fontSize: "14px",
  },

  // Chat Page Styles
  chatContainer: {
    maxWidth: "800px",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#fff",
  },

  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
  },

  chatTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0",
  },

  userInfo: {
    fontSize: "12px",
    color: "#666",
    margin: "4px 0 0 0",
  },

  backButton: {
    padding: "8px 16px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
    color: "#1a1a1a",
  },

  messagesContainer: {
    flex: "1",
    overflowY: "auto" as const,
    padding: "20px",
    display: "flex",
    border : "2px solid #e7e7e",
    flexDirection: "column" as const,
    gap: "12px",
    backgroundColor: "#F5F7FA",
  },

  messageWrapper: {
    display: "flex",
    marginBottom: "4px",
  },

  messageBubble: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "16px",
    wordWrap: "break-word" as const,
  },

  messageUser: {
    fontSize: "12px",
    fontWeight: "600",
    margin: "0 0 4px 0",
    opacity: 0.8,
  },

  messageText: {
    fontSize: "14px",
    margin: "0",
  },

  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  emptyText: {
    color: "#999",
    fontSize: "16px",
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#fff",
  },

  messageInput: {
    flex: "1",
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "24px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  },

  sendButton: {
    padding: "12px 24px",
    backgroundColor: "#007AFF",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default App;