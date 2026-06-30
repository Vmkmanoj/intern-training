import { useMemo, useState } from "react";
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

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (loading) return false;
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) return false;
    if (password !== confirmPassword) return false;
    return true;
  }, [name, email, password, confirmPassword, loading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {

      const registerData = {
        name : name,
        email : email,
        password : password
      }

      console.log("login data",registerData)

      const responce = await fetch("http://localhost:8000/auth/register",
        {
          method : "POST",
         headers: {
        "Content-Type": "application/json",
       },
          body:JSON.stringify(registerData)
        } 
      )
      const data = await responce.json()
      if (data.success == true){
      await new Promise((r) => setTimeout(r, 700));
      navigate("/login");
      }

    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

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
            Create your account
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ color: palette.subtle, fontSize: 14 }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
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
              autoComplete="new-password"
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
            <label style={{ color: palette.subtle, fontSize: 14 }}>Confirm password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              style={{
                padding: 14,
                borderRadius: 12,
                border: `1px solid ${palette.inputBorder}`,
                background: palette.cardBg,
                color: palette.textStrong,
                outline: "none",
              }}
            />
            {passwordMismatch && (
              <div style={{ color: palette.subtle, fontSize: 12 }}>
                Passwords do not match.
              </div>
            )}
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
            {loading ? "Creating..." : "Register"}
          </button>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <Link to="/login" style={{ color: palette.textStrong, textDecoration: "none" }}>
              Already have an account?
            </Link>
            {/* <Link to="/" style={{ color: palette.subtle, textDecoration: "none" }}>
              Back to chat
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}

