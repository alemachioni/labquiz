import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../components/shared/DecorativeDots";
import WaveFooter from "../components/shared/WaveFooter";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ""}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.erro ?? "Erro ao fazer login");
      }

      const { token, usuario } = await res.json();
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/modulos");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet" />

      <div style={pageStyle}>
        <DecorativeDots />

        {/* Card */}
        <div style={cardStyle}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ fontFamily: "'Gugi', sans-serif", fontSize: "32px", color: "#c6273f", margin: 0 }}>
              LabQuiz
            </h1>
            <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
              Insira seus dados!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Digite seu usuário:</label>
              <div style={inputWrapperStyle}>
                <span style={iconStyle} aria-hidden="true">✉</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Digite sua senha:</label>
              <div style={inputWrapperStyle}>
                <span style={iconStyle} aria-hidden="true">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: "20px", marginTop: "-8px" }}>
              <span style={{ fontSize: "12px", color: "#c6273f", cursor: "pointer" }}>
                Esqueci a senha
              </span>
            </div>

            {error && (
              <p style={{ color: "#c6273f", fontSize: "14px", marginBottom: "12px" }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Entrando…" : "Entrar >"}
            </button>
          </form>

          {/* Demo hint */}
          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#999" }}>
            Demo: <strong>aluno@labquiz.com</strong> / <strong>labquiz123</strong>
          </p>
        </div>

        <WaveFooter />
      </div>
    </>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight:       "100vh",
  backgroundColor: "#ffffff",
  display:         "flex",
  flexDirection:   "column",
  alignItems:      "center",
  justifyContent:  "center",
  fontFamily:      "sans-serif",
  padding:         "16px",
  position:        "relative",
  overflowX:       "hidden",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius:    "16px",
  padding:         "40px 36px",
  width:           "100%",
  maxWidth:        "400px",
  boxShadow:       "0 4px 24px rgba(0,0,0,0.12)",
  position:        "relative",
  zIndex:          1,
};

const fieldStyle: React.CSSProperties = {
  marginBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  display:      "block",
  fontSize:     "13px",
  fontWeight:   "600",
  color:        "#444",
  marginBottom: "6px",
};

const inputWrapperStyle: React.CSSProperties = {
  position:    "relative",
  display:     "flex",
  alignItems:  "center",
};

const iconStyle: React.CSSProperties = {
  position:  "absolute",
  left:      "12px",
  fontSize:  "16px",
  color:     "#888",
  pointerEvents: "none",
};

const inputStyle: React.CSSProperties = {
  width:        "100%",
  padding:      "10px 14px 10px 38px",
  border:       "1.5px solid #ddd",
  borderRadius: "8px",
  fontSize:     "15px",
  boxSizing:    "border-box",
  outline:      "none",
};

const btnStyle: React.CSSProperties = {
  width:           "100%",
  padding:         "12px",
  backgroundColor: "#c6273f",
  color:           "#fff",
  border:          "none",
  borderRadius:    "8px",
  fontSize:        "16px",
  fontWeight:      "700",
  cursor:          "pointer",
  marginTop:       "4px",
  fontFamily:      "'Gugi', sans-serif",
};
