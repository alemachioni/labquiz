import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Logo / título */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1a73e8", margin: 0 }}>
            🧪 LabQuiz
          </h1>
          <p style={{ color: "#666", marginTop: "6px", fontSize: "14px" }}>
            Quiz interativo de laboratório
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: "#dc3545", fontSize: "14px", marginBottom: "12px" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        {/* Atalho de demonstração — remove antes da entrega final */}
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#888" }}>
          Demo: <strong>aluno@labquiz.com</strong> / <strong>labquiz123</strong>
        </p>
      </div>
    </div>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f0f4f8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "sans-serif",
  padding: "16px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "40px 36px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
};

const fieldStyle: React.CSSProperties = {
  marginBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#444",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #ddd",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "4px",
};
