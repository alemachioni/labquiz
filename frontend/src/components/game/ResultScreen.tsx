import React from "react";
import logoutIcon from "../../assets/logout_icon.png";
import etecLogo   from "../../assets/etec_logo.png";

export type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;    // Menu
  onPlayAgain: () => void;  // Jogar novamente
};

function getMessage(percentage: number): string {
  if (percentage === 100) return "Perfeito! Você arrasou!";
  if (percentage >= 80)   return "Excelente! Continue assim!";
  if (percentage >= 60)   return "Bom trabalho! Quase lá!";
  if (percentage >= 40)   return "Continue praticando!";
  if (percentage >= 20)   return "Não desista! Cada tentativa vale";
  return "Continue tentando! Com dedicação você chega lá!";
}

export default function ResultScreen({
  score,
  totalQuestions,
  correctAnswers,
  onRestart,
  onPlayAgain,
}: ResultScreenProps) {
  const percentage  = Math.round((correctAnswers / totalQuestions) * 100);
  const wrongAnswers = totalQuestions - correctAnswers;
  const message     = getMessage(percentage);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet" />

      <div style={pageStyle}>

        {/* Bolinhas decorativas */}
        <div style={{ ...circle, width: 64,  height: 64,  top: "12%", left: "4%"  }} />
        <div style={{ ...circle, width: 22,  height: 22,  top: "30%", left: "10%" }} />
        <div style={{ ...circle, width: 14,  height: 14,  top: "55%", left: "3%"  }} />
        <div style={{ ...circle, width: 56,  height: 56,  top: "10%", right: "5%" }} />
        <div style={{ ...circle, width: 16,  height: 16,  top: "40%", right: "3%" }} />
        <div style={{ ...circle, width: 10,  height: 10,  top: "62%", right: "8%" }} />

        {/* Card de resultado */}
        <div style={cardStyle}>

          {/* Topo vermelho */}
          <div style={cardTopStyle}>
            <p style={{ fontFamily: "'Gugi', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)", margin: "0 0 8px", textDecoration: "underline" }}>
              Resultado final:
            </p>
            <p style={{ fontFamily: "'Gugi', sans-serif", fontSize: "42px", fontWeight: "700", color: "#fff", margin: "0 0 6px", lineHeight: 1 }}>
              {percentage}%
            </p>
            <p style={{ fontFamily: "'Gugi', sans-serif", fontSize: "18px", color: "#fff", margin: 0, lineHeight: 1.3 }}>
              {message}
            </p>
          </div>

          {/* Seção de pontos */}
          <div style={pointsSectionStyle}>
            <p style={{ fontFamily: "'Gugi', sans-serif", fontSize: "18px", color: "#222", margin: 0 }}>
              {score} pontos nessa rodada
            </p>
          </div>

          {/* Divisor */}
          <div style={{ height: "1px", backgroundColor: "#ddd", margin: "0" }} />

          {/* Acertos e erros */}
          <div style={statsRowStyle}>
            <div style={statItemStyle}>
              <span style={{ fontFamily: "'Gugi', sans-serif", fontSize: "22px", fontWeight: "700", color: "#222" }}>
                {correctAnswers}
              </span>
              <span style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>acertos</span>
            </div>

            {/* Divisor vertical */}
            <div style={{ width: "1px", backgroundColor: "#ddd", alignSelf: "stretch" }} />

            <div style={statItemStyle}>
              <span style={{ fontFamily: "'Gugi', sans-serif", fontSize: "22px", fontWeight: "700", color: "#222" }}>
                {wrongAnswers}
              </span>
              <span style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}>erros</span>
            </div>
          </div>

          {/* Divisor */}
          <div style={{ height: "1px", backgroundColor: "#ddd" }} />

          {/* Botões */}
          <div style={btnRowStyle}>
            <button onClick={onRestart} style={menuBtnStyle}>
              <img src={logoutIcon} alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
              <span style={{ fontFamily: "'Gugi', sans-serif", fontSize: "15px", color: "#222" }}>Menu</span>
            </button>

            <button onClick={onPlayAgain} style={playAgainBtnStyle}>
              <span style={{ fontFamily: "'Gugi', sans-serif", fontSize: "15px" }}>Jogar novamente &gt;</span>
            </button>
          </div>

        </div>

        {/* Onda vermelha no rodapé — ocupa toda a largura da tela */}
        <div style={{
          marginTop: "auto",
          position: "relative",
          zIndex: 1,
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}>
          <svg viewBox="0 0 900 80" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "70px" }}>
            <path d="M0,60 C200,0 400,80 600,30 C750,0 850,50 900,40 L900,80 L0,80 Z" fill="#c6273f" />
          </svg>
          <div style={{ backgroundColor: "#c6273f", textAlign: "center", padding: "0 0 20px" }}>
            <img src={etecLogo} alt="Etec — Escola Técnica Estadual" style={{ height: "44px", objectFit: "contain" }} />
          </div>
        </div>

      </div>
    </>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight:       "100vh",
  backgroundColor: "#fff",
  display:         "flex",
  flexDirection:   "column",
  alignItems:      "center",
  justifyContent:  "center",
  fontFamily:      "sans-serif",
  position:        "relative",
  overflowX:       "hidden",
  padding:         "20px 16px 0",
  boxSizing:       "border-box",
};

const circle: React.CSSProperties = {
  position:        "fixed",
  borderRadius:    "50%",
  backgroundColor: "#c6273f",
  pointerEvents:   "none",
};

const cardStyle: React.CSSProperties = {
  width:           "100%",
  maxWidth:        "420px",
  borderRadius:    "16px",
  overflow:        "hidden",
  boxShadow:       "0 4px 24px rgba(0,0,0,0.12)",
  backgroundColor: "#f0ecec",
  zIndex:          1,
};

const cardTopStyle: React.CSSProperties = {
  backgroundColor: "#c6273f",
  padding:         "24px 24px 28px",
  textAlign:       "center",
};

const pointsSectionStyle: React.CSSProperties = {
  padding:    "20px 24px",
  textAlign:  "center",
  backgroundColor: "#f0ecec",
};

const statsRowStyle: React.CSSProperties = {
  display:         "flex",
  backgroundColor: "#f0ecec",
};

const statItemStyle: React.CSSProperties = {
  flex:           1,
  display:        "flex",
  flexDirection:  "column",
  alignItems:     "center",
  padding:        "14px 0",
};

const btnRowStyle: React.CSSProperties = {
  display:         "flex",
  alignItems:      "center",
  justifyContent:  "space-between",
  padding:         "14px 16px",
  backgroundColor: "#f0ecec",
  gap:             "12px",
};

const menuBtnStyle: React.CSSProperties = {
  display:         "flex",
  alignItems:      "center",
  gap:             "6px",
  padding:         "10px 16px",
  backgroundColor: "#e0d8d8",
  border:          "none",
  borderRadius:    "10px",
  cursor:          "pointer",
};

const playAgainBtnStyle: React.CSSProperties = {
  padding:         "10px 20px",
  backgroundColor: "#c6273f",
  color:           "#fff",
  border:          "none",
  borderRadius:    "10px",
  cursor:          "pointer",
};