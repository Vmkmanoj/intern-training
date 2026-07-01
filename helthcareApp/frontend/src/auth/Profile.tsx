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

export default function Profile() {
  const navigate = useNavigate();

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
          maxWidth: 520,
          margin: "auto",
          background: palette.panelBg,
          border: `1px solid ${palette.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: palette.cardBg,
              border: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: palette.textStrong,
              fontWeight: 800,
            }}
          >
            👤
          </div>
          <div>
            <div style={{ color: palette.textStrong, fontWeight: 800, fontSize: 22 }}>
              Profile
            </div>
            <div style={{ color: palette.subtle, marginTop: 2 }}>
              Basic account info
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {/* <Link
            to="/"
            style={{
              color: palette.textStrong,
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 10,
              background: palette.cardBg,
              border: `1px solid ${palette.border}`,
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Back to chat
          </Link> */}
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 14,
            background: palette.cardBg,
            border: `1px solid ${palette.border}`,
          }}
        >
          <Row label="User Name" value={String(localStorage.getItem("userName"))} />
          <Row label="Email" value={String(localStorage.getItem("email"))} />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <Link
            to="/"
            style={{
              flex: 1,
              textAlign: "center",
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: palette.buttonBg,
              color: palette.textStrong,
              cursor: "pointer",
              fontWeight: 800,
              transition: "background 0.2s",
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = palette.buttonHover)}
            onMouseOut={(e) => (e.currentTarget.style.background = palette.buttonBg)}
          >
            Back to chat
          </Link>
          <Link
            to="/logout"
            style={{
              flex: 1,
              textAlign: "center",
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: palette.buttonBg,
              color: palette.textStrong,
              cursor: "pointer",
              fontWeight: 800,
              transition: "background 0.2s",
              textDecoration: "none",
            }}
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("token_type");
              localStorage.removeItem("userName");
              localStorage.removeItem("email");
              localStorage.removeItem("sessionId");
              navigate("/login");
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = palette.buttonHover)}
            onMouseOut={(e) => (e.currentTarget.style.background = palette.buttonBg)}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #262626",
        gap: 12,
      }}
    >
      <div style={{ color: "#a3a3a3", fontSize: 14 }}>{label}</div>
      <div
        style={{
          color: muted ? "#525252" : "#ffffff",
          fontSize: 14,
          fontWeight: 700,
          textAlign: "right",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

