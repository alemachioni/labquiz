import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Modulo = {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
  category: string;
};

const MODULOS: Modulo[] = [
  {
    id: "vidraria",
    titulo: "Vidrarias",
    descricao: "Béqueres, buretas, pipetas e o uso correto de cada uma.",
    icon: "🧪",
    category: "VIDRARIA",
  },
  {
    id: "metalico",
    titulo: "Materiais Metálicos",
    descricao: "Identificação e uso de equipamentos metálicos no laboratório.",
    icon: "⚙️",
    category: "METALICO",
  },
  {
    id: "plastico",
    titulo: "Materiais Plásticos",
    descricao: "Tubos, pipetas plásticas e recipientes descartáveis.",
    icon: "🧴",
    category: "PLASTICO",
  },
  {
    id: "porcelana",
    titulo: "Porcelanas",
    descricao: "Cadinhos, almofarizes e demais utensílios de porcelana.",
    icon: "🏺",
    category: "PORCELANA",
  },
  {
    id: "sistema",
    titulo: "Sistemas e Montagens",
    descricao: "Aparatos completos: destilação, refluxo e filtragem.",
    icon: "🔬",
    category: "SISTEMA",
  },
];

type Dificuldade = "FACIL" | "MEDIO" | "DIFICIL";

const DIFICULDADES: { id: Dificuldade; label: string; desc: string; color: string }[] = [
  { id: "FACIL",   label: "Fácil",  desc: "Questões básicas de identificação.", color: "#28a745" },
  { id: "MEDIO",   label: "Médio",  desc: "Questões de uso e procedimentos.",   color: "#fd7e14" },
  { id: "DIFICIL", label: "Difícil",desc: "Questões avançadas e segurança.",    color: "#dc3545" },
];

export default function ModuleSelectPage() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");

  // Módulo aguardando escolha de dificuldade (null = nenhum selecionado)
  const [moduloPendente, setModuloPendente] = useState<Modulo | null>(null);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  function handleSelectModule(modulo: Modulo) {
    setModuloPendente(modulo);
  }

  function handleSelectDificuldade(dificuldade: Dificuldade) {
    if (!moduloPendente) return;
    navigate(`/quiz?category=${moduloPendente.category}&difficulty=${dificuldade}`);
  }

  function handleFecharModal() {
    setModuloPendente(null);
  }

  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1a73e8", margin: 0 }}>
          🧪 LabQuiz
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {usuario.name && (
            <span style={{ fontSize: "14px", color: "#555" }}>
              Olá, <strong>{usuario.name}</strong>
            </span>
          )}
          <button onClick={handleLogout} style={logoutBtnStyle}>
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main style={mainStyle}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>
          Escolha um módulo
        </h2>
        <p style={{ color: "#666", marginBottom: "32px", fontSize: "14px" }}>
          Selecione o tema que deseja praticar.
        </p>

        <div style={gridStyle}>
          {MODULOS.map((modulo) => (
            <button
              key={modulo.id}
              onClick={() => handleSelectModule(modulo)}
              style={cardStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a73e8";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 16px rgba(26,115,232,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8eaf0";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <span style={{ fontSize: "36px" }}>{modulo.icon}</span>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111", margin: "12px 0 4px" }}>
                {modulo.titulo}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: "1.4" }}>
                {modulo.descricao}
              </p>
            </button>
          ))}
        </div>
      </main>
      {/* Modal de dificuldade */}
      {moduloPendente && (
        <div style={overlayStyle} onClick={handleFecharModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
              {moduloPendente.icon} {moduloPendente.titulo}
            </h3>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
              Escolha a dificuldade:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {DIFICULDADES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelectDificuldade(d.id)}
                  style={{ ...difBtnStyle, borderColor: d.color, color: d.color }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.backgroundColor = d.color;
                    btn.style.color = "#fff";
                    const desc = btn.querySelector("span") as HTMLElement;
                    if (desc) desc.style.color = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.backgroundColor = "#fff";
                    btn.style.color = d.color;
                    const desc = btn.querySelector("span") as HTMLElement;
                    if (desc) desc.style.color = "#888";
                  }}
                >
                  <strong style={{ fontSize: "15px" }}>{d.label}</strong>
                  <span style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>{d.desc}</span>
                </button>
              ))}
            </div>

            <button onClick={handleFecharModal} style={cancelBtnStyle}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f0f4f8",
  fontFamily: "sans-serif",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderBottom: "1px solid #e8eaf0",
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const mainStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "40px 16px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "16px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  border: "2px solid #e8eaf0",
  borderRadius: "16px",
  padding: "28px 20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const logoutBtnStyle: React.CSSProperties = {
  padding: "6px 16px",
  backgroundColor: "transparent",
  border: "1.5px solid #ddd",
  borderRadius: "8px",
  fontSize: "13px",
  cursor: "pointer",
  color: "#555",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "32px 28px",
  width: "100%",
  maxWidth: "360px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
};

const difBtnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "12px 16px",
  backgroundColor: "#fff",
  border: "2px solid",
  borderRadius: "10px",
  cursor: "pointer",
  textAlign: "left",
};

const cancelBtnStyle: React.CSSProperties = {
  marginTop: "16px",
  width: "100%",
  padding: "10px",
  backgroundColor: "transparent",
  border: "1.5px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  color: "#888",
};