import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const palette = {
  appBg: "#000000",
  panelBg: "#0a0a0a",
  cardBg: "#171717",
  border: "#262626",
  inputBorder: "#404040",
  subtle: "#a3a3a3",
  text: "#e5e5e5",
  textStrong: "#ffffff",
  muted: "#525252",
  buttonBg: "#404040",
  buttonHover: "#525252",
};

interface UserDetails {
  userName: string;
  emailId: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) navigate("/", { replace: true });
  }, [navigate]);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0 && !loading;
  }, [email, password, loading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loginData = {
        email: email.trim(),
        password: password.trim(),
      }

      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: "POST",
         headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { detail?: string; message?: string }
          | null;
        throw new Error(data?.detail || data?.message || "Invalid credentials");
      }

      const data = (await res.json()) as { access_token: string; message?: string , token_type: string , userdetails: UserDetails };
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("userName", data.userdetails.userName);
      localStorage.setItem("email", data.userdetails.emailId);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: palette.appBg,
        color: palette.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          margin: "auto",
          background: palette.panelBg,
          border: `1px solid ${palette.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: palette.textStrong, fontWeight: 800, fontSize: 22 }}>
            🤖 MedAgent
          </div>
          <div style={{ color: palette.subtle, marginTop: 6 }}>
            Sign in to continue
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ color: palette.subtle, fontSize: 14 }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              style={{
                padding: 14,
                borderRadius: 12,
                border: `1px solid ${palette.inputBorder}`,
                background: palette.cardBg,
                color: palette.textStrong,
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ color: palette.subtle, fontSize: 14 }}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              style={{
                padding: 14,
                borderRadius: 12,
                border: `1px solid ${palette.inputBorder}`,
                background: palette.cardBg,
                color: palette.textStrong,
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                border: `1px solid ${palette.border}`,
                background: palette.cardBg,
                color: palette.text,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              marginTop: 4,
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: canSubmit ? palette.buttonBg : palette.border,
              color: palette.textStrong,
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontWeight: 800,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => {
              if (canSubmit) e.currentTarget.style.background = palette.buttonHover;
            }}
            onMouseOut={(e) => {
              if (canSubmit) e.currentTarget.style.background = palette.buttonBg;
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            {/* <Link to="/" style={{ color: palette.subtle, textDecoration: "none" }}>
              Back to chat
            </Link> */}
            <Link to="/register" style={{ color: palette.textStrong, textDecoration: "none" }}>
              Create account
            </Link>
          </div>
        </form>

        <div style={{ marginTop: 18, color: palette.muted, fontSize: 12, lineHeight: 1.5 }}>
          This page uses the same color theme as the chat UI. Hook up real authentication
          when the backend endpoint is ready.
        </div>
      </div>
    </div>
  );
}

