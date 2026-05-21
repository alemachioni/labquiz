import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../components/shared/DecorativeDots";
import WaveFooter from "../components/shared/WaveFooter";

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

type Dificuldade = "FACIL" | "MEDIO" | "DIFICIL" | "ALEATORIO";

const DIFICULDADES: { id: Dificuldade; label: string }[] = [
  { id: "FACIL",     label: "Fácil"     },
  { id: "MEDIO",     label: "Médio"     },
  { id: "DIFICIL",   label: "Difícil"   },
  { id: "ALEATORIO", label: "Aleatório" },
];

// The active category — currently only VIDRARIA is available
const ACTIVE_CATEGORY = MODULOS[0];

type Screen = "main" | "difficulty";

export default function ModuleSelectPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("main");

  const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

 const handleIniciar = (dificuldade: string) => {
  let resolved = dificuldade;
  if (dificuldade === "ALEATORIO") {
    const opcoes = ["FACIL", "MEDIO", "DIFICIL"] as const;
    // eslint-disable-next-line react-hooks/purity
    const idx = Math.floor(Math.random() * opcoes.length);
    resolved = opcoes[idx];
  }
  navigate(`/quiz?category=${ACTIVE_CATEGORY.category}&difficulty=${resolved}`);
};

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet" />

      <div style={pageStyle}>
        <DecorativeDots />

        {/* Main content area */}
        <main style={mainStyle}>

          {/* Header logo */}
          <h1 style={{ fontFamily: "'Gugi', sans-serif", fontSize: "36px", color: "#c6273f", marginBottom: "8px", textAlign: "center" }}>
            LabQuiz
          </h1>

          {screen === "main" ? (
            <>
              <p style={subtitleStyle}>Selecione uma opção</p>

              {/* Welcome */}
              {usuario.name && (
                <p style={{ textAlign: "center", color: "#666", fontSize: "14px", marginBottom: "8px" }}>
                  Olá, <strong>{usuario.name}</strong>!
                </p>
              )}

              {/* Main buttons */}
              <div style={btnListStyle}>
                <button
                  style={outlineBtnStyle}
                  onClick={() => setScreen("difficulty")}
                >
                  Iniciar jogo
                </button>
                <button style={outlineBtnStyle}>
                  Estatísticas
                </button>
                <button style={redBtnStyle} onClick={handleLogout}>
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Back button */}
              <button
                style={backBtnStyle}
                onClick={() => setScreen("main")}
              >
                &lt; Voltar
              </button>

              <h2 style={{ fontFamily: "'Gugi', sans-serif", fontSize: "26px", color: "#111", marginBottom: "8px", textAlign: "center" }}>
                Modos
              </h2>
              <p style={subtitleStyle}>Selecione um modo de preferência</p>

              {/* 2x2 grid of difficulties */}
              <div style={diffGridStyle}>
                {DIFICULDADES.map((d) => (
                  <button
                    key={d.id}
                    style={diffBtnStyle}
                    onClick={() => handleIniciar(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </main>

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
  position:        "relative",
  overflowX:       "hidden",
};

const mainStyle: React.CSSProperties = {
  width:    "100%",
  maxWidth: "380px",
  padding:  "32px 24px",
  position: "relative",
  zIndex:   1,
};

const subtitleStyle: React.CSSProperties = {
  textAlign:    "center",
  color:        "#666",
  fontSize:     "15px",
  marginBottom: "32px",
};

const btnListStyle: React.CSSProperties = {
  display:       "flex",
  flexDirection: "column",
  gap:           "14px",
};

const outlineBtnStyle: React.CSSProperties = {
  width:           "100%",
  padding:         "14px",
  backgroundColor: "#fff",
  border:          "2px solid #333",
  borderRadius:    "10px",
  fontSize:        "16px",
  fontWeight:      "600",
  cursor:          "pointer",
  color:           "#111",
  textAlign:       "center",
};

const redBtnStyle: React.CSSProperties = {
  width:           "100%",
  padding:         "14px",
  backgroundColor: "#c6273f",
  border:          "none",
  borderRadius:    "10px",
  fontSize:        "16px",
  fontWeight:      "600",
  cursor:          "pointer",
  color:           "#fff",
  textAlign:       "center",
  fontFamily:      "'Gugi', sans-serif",
};

const backBtnStyle: React.CSSProperties = {
  background:   "transparent",
  border:       "none",
  cursor:       "pointer",
  color:        "#c6273f",
  fontSize:     "15px",
  fontWeight:   "600",
  padding:      "0 0 16px",
  display:      "block",
  fontFamily:   "'Gugi', sans-serif",
};

const diffGridStyle: React.CSSProperties = {
  display:             "grid",
  gridTemplateColumns: "1fr 1fr",
  gap:                 "14px",
};

const diffBtnStyle: React.CSSProperties = {
  padding:         "20px 10px",
  backgroundColor: "#fff",
  border:          "2px solid #333",
  borderRadius:    "10px",
  fontSize:        "15px",
  fontWeight:      "600",
  cursor:          "pointer",
  color:           "#111",
  textAlign:       "center",
};
