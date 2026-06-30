import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const palette = {
  appBg: "#000000",
  panelBg: "#0a0a0a",
  cardBg: "#171717",
  border: "#262626",
  subtle: "#a3a3a3",
  text: "#e5e5e5",
  textStrong: "#ffffff",
};

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("sessionId");
    navigate("/login", { replace: true });
  }, [navigate]);

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
        <div style={{ color: palette.textStrong, fontWeight: 800, fontSize: 22 }}>
          Logging out…
        </div>
        <div style={{ color: palette.subtle, marginTop: 8 }}>
          Redirecting to login.
        </div>
        <div style={{ marginTop: 14 }}>
          <Link to="/login" style={{ color: palette.textStrong, textDecoration: "none" }}>
            Go to login now
          </Link>
        </div>
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 12,
            border: `1px solid ${palette.border}`,
            background: palette.cardBg,
            color: palette.subtle,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          Tip: if you need “logout” as a button, use the top-right Logout link in chat.
        </div>
      </div>
    </div>
  );
}

