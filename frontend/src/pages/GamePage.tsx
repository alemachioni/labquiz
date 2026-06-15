import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuestionCard, { Alternative } from "../components/game/QuestionCard";
import ResultScreen from "../components/game/ResultScreen";
import etecLogo   from "../assets/etec_logo.png";
import logoutIcon from "../assets/logout_icon.png";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ApiOption   = { id: string; text: string; isCorrect: boolean };
type ApiQuestion = { id: string; prompt: string; imageUrl?: string | null; hint?: string | null; options: ApiOption[] };

export type Question = {
  id: string;
  statement: string;
  imageUrl?: string;
  hint?: string;
  alternatives: Alternative[];
};

const DIFFICULTY_MAP:   Record<string, number> = { FACIL: 1, MEDIO: 2, DIFICIL: 3 };
const DIFFICULTY_LABEL: Record<string, string> = { FACIL: "Fácil", MEDIO: "Médio", DIFICIL: "Difícil" };

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchQuestions(category: string, difficulty: number): Promise<Question[]> {
  const token = localStorage.getItem("token");
  const base  = import.meta.env.VITE_API_URL ?? "";
  const res   = await fetch(`${base}/game/session?category=${category}&difficulty=${difficulty}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erro ao buscar questões");
  const data: ApiQuestion[] = await res.json();
  return data.map((q) => ({
    id: q.id,
    statement: q.prompt,
    imageUrl:  q.imageUrl ?? undefined,
    hint:      q.hint ?? undefined,
    alternatives: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
  }));
}

// ─── Bolinhas fixas no fundo ──────────────────────────────────────────────────

const BG_CIRCLES: { size: number; top: string; left?: string; right?: string; opacity: number }[] = [
  { size: 64, top: "18%", left:  "3%",  opacity: 1   },
  { size: 20, top: "32%", left:  "7%",  opacity: 1   },
  { size: 44, top: "55%", left:  "1%",  opacity: 1   },
  { size: 10, top: "70%", left:  "12%", opacity: 1   },
  { size: 10, top: "80%", left:  "4%",  opacity: 1   },
  { size: 56, top: "15%", right: "4%",  opacity: 1   },
  { size: 14, top: "38%", right: "2%",  opacity: 1   },
  { size: 22, top: "52%", right: "6%",  opacity: 1   },
  { size:  8, top: "65%", right: "14%", opacity: 1   },
  { size: 10, top: "78%", right: "3%",  opacity: 1   },
  { size: 36, top: "42%", right: "12%", opacity: 0.5 },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function GamePage() {
  const [questions, setQuestions]           = useState<Question[]>([]);
  const [loading,   setLoading]             = useState(true);
  const [error,     setError]               = useState<string | null>(null);
  const navigate                            = useNavigate();
  const [searchParams]                      = useSearchParams();
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [score,        setScore]            = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered,     setAnswered]         = useState(false);
  const [gameOver,     setGameOver]         = useState(false);
  const [showHint,     setShowHint]         = useState(false);

  const category      = searchParams.get("category")   ?? "VIDRARIA";
  const difficultyStr = searchParams.get("difficulty") ?? "FACIL";
  const difficulty    = DIFFICULTY_MAP[difficultyStr]  ?? 1;

  useEffect(() => {
    fetchQuestions(category, difficulty)
      .then((data) => { setQuestions(data); setLoading(false); })
      .catch(()    => { setError("Não foi possível carregar as questões."); setLoading(false); });
  }, [category, difficulty]);

  function handleAnswer(_id: string, isCorrect: boolean) {
    setAnswered(true);
    if (isCorrect) { setScore((s) => s + 10); setCorrectAnswers((c) => c + 1); }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      saveResult();
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setShowHint(false);
    }
  }

  async function saveResult() {
    try {
      const token   = localStorage.getItem("token");
      const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");
      const base    = import.meta.env.VITE_API_URL ?? "";

      await fetch(`${base}/game/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId:     usuario.id,
          score:      score,
          totalQ:     questions.length,
          correctQ:   correctAnswers,
          category:   category,
          difficulty: difficulty,
        }),
      });
    } catch {
      // Falha silenciosa — não impede o aluno de ver o resultado
    } finally {
      setGameOver(true);
    }
  }

  function handleRestart() { navigate("/modulos"); }

  function handlePlayAgain() {
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setAnswered(false);
    setShowHint(false);
    setGameOver(false);
  }

  // ── Telas auxiliares ───────────────────────────────────────────────────────

  if (loading) return (
    <div style={fullCenter}>
      <p style={{ fontFamily: "'Gugi', sans-serif", fontSize: "20px", color: "#c6273f" }}>
        Carregando questões…
      </p>
    </div>
  );

  if (error) return (
    <div style={fullCenter}>
      <p style={{ color: "#c6273f", marginBottom: "16px" }}>{error}</p>
      <button onClick={() => navigate("/modulos")} style={navBtnStyle}>Voltar</button>
    </div>
  );

  if (gameOver) return (
    <div style={pageStyle}>
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
        onRestart={handleRestart}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );

  const q        = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet" />

      <div style={pageStyle}>

        {/* ── Bolinhas vermelhas no fundo ─────────────────────────────────── */}
        {BG_CIRCLES.map((c, i) => (
          <div key={i} style={{
            position:        "fixed",
            width:           c.size,
            height:          c.size,
            top:             c.top,
            left:            c.left,
            right:           c.right,
            borderRadius:    "50%",
            backgroundColor: "#c6273f",
            opacity:         c.opacity,
            pointerEvents:   "none",
            zIndex:          0,
          }} />
        ))}

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header style={headerStyle}>

          {/* Linha superior: ícone voltar */}
          <div style={{ position: "relative", zIndex: 1, padding: "14px 20px 0", display: "flex", alignItems: "center" }}>
            <button onClick={() => navigate("/modulos")} style={voltarBtnStyle} title="Voltar">
              {/* Ícone de saída — posicionado como no CSS fornecido */}
              <img
                src={logoutIcon}
                alt="Voltar"
                style={{ width: 35, height: 35, objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
              <span style={{ fontFamily: "'Gugi', sans-serif", fontSize: "15px", color: "#fff" }}>
                Voltar
              </span>
            </button>
          </div>

          {/* Linha inferior: questão + barra + nível */}
          <div style={{ position: "relative", zIndex: 1, padding: "10px 20px 0", display: "flex", alignItems: "flex-end", gap: "16px" }}>
            {/* Barra de progresso — lado esquerdo, compacta */}
            <div style={{ flex: "0 0 40%" }}>
              <p style={{ fontFamily: "'Gugi', sans-serif", color: "#fff", fontSize: "12px", margin: "0 0 4px" }}>
                Questão {currentIndex + 1}/{questions.length}
              </p>
              <div style={progressTrackStyle}>
                <div style={{ ...progressFillStyle, width: `${progress}%` }} />
              </div>
            </div>

            {/* Pontuação */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2px" }}>
              <p style={{ fontFamily: "'Gugi', sans-serif", color: "#fff", fontSize: "12px", margin: "0 0 4px", opacity: 0.8 }}>
                Pontos
              </p>
              <span style={{ fontFamily: "'Gugi', sans-serif", color: "#fff", fontSize: "18px", fontWeight: "700", lineHeight: 1 }}>
                {score}
              </span>
            </div>

            {/* Nível — lado direito */}
            <span style={{
              fontFamily: "'Gugi', sans-serif",
              color: "#fff",
              fontSize: "12px",
              opacity: 0.95,
              marginLeft: "auto",
              paddingBottom: "2px",
            }}>
              Nível: {DIFFICULTY_LABEL[difficultyStr]}
            </span>
          </div>

          {/* Onda SVG — pronunciada, igual à imagem de referência:
              começa alta à esquerda, desce no terço inicial,
              sobe no centro-direita, e termina mais baixa à direita */}
          <svg
            viewBox="0 0 900 90"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "75px", marginTop: "10px" }}
          >
            <path
              d="M0,0 C80,70 200,80 380,30 C520,-10 680,75 900,20 L900,90 L0,90 Z"
              fill="#fff"
            />
          </svg>
        </header>

        {/* ── Questão ─────────────────────────────────────────────────────── */}
        <main style={mainStyle}>
          <QuestionCard
            key={q.id}
            statement={q.statement}
            imageUrl={q.imageUrl}
            alternatives={q.alternatives}
            onAnswer={handleAnswer}
          />

          {/* Botão de dica — só aparece se a questão tiver hint cadastrado */}
          {q.hint && !answered && (
            <div style={{ marginTop: "12px" }}>
              {!showHint ? (
                <button onClick={() => setShowHint(true)} style={hintBtnStyle}>
                  💡 Ver dica
                </button>
              ) : (
                <p style={hintTextStyle}>
                  {q.hint}
                </p>
              )}
            </div>
          )}

          {answered && (
            <div style={{ textAlign: "right", marginTop: "16px" }}>
              <button onClick={handleNext} style={navBtnStyle}>
                {currentIndex + 1 >= questions.length ? "Ver resultado" : "Próxima →"}
              </button>
            </div>
          )}
        </main>

        {/* ── Rodapé ──────────────────────────────────────────────────────── */}
        <footer style={footerStyle}>
          <img src={etecLogo} alt="Etec — Escola Técnica Estadual" style={{ height: "44px", objectFit: "contain" }} />
        </footer>

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
  fontFamily:      "sans-serif",
  position:        "relative",
  overflowX:       "hidden",
};

const fullCenter: React.CSSProperties = {
  minHeight:      "100vh",
  display:        "flex",
  flexDirection:  "column",
  alignItems:     "center",
  justifyContent: "center",
};

const headerStyle: React.CSSProperties = {
  position:        "relative",
  backgroundColor: "#c6273f",
  zIndex:          1,
  overflow:        "hidden",
};

const voltarBtnStyle: React.CSSProperties = {
  background:  "transparent",
  border:      "none",
  cursor:      "pointer",
  padding:     0,
  display:     "flex",
  alignItems:  "center",
  gap:         "8px",
};

const progressTrackStyle: React.CSSProperties = {
  width:           "100%",
  height:          "5px",
  backgroundColor: "rgba(255,255,255,0.3)",
  borderRadius:    "99px",
  overflow:        "hidden",
};

const progressFillStyle: React.CSSProperties = {
  height:          "100%",
  backgroundColor: "#ff5252",
  borderRadius:    "99px",
  transition:      "width 0.4s ease",
};

const mainStyle: React.CSSProperties = {
  flex:      1,
  padding:   "20px 16px",
  maxWidth:  "720px",
  width:     "100%",
  margin:    "0 auto",
  boxSizing: "border-box",
  position:  "relative",
  zIndex:    1,
};

const footerStyle: React.CSSProperties = {
  display:        "flex",
  justifyContent: "center",
  alignItems:     "center",
  padding:        "12px 16px",
  borderTop:      "1px solid #e8e0e0",
  position:       "relative",
  zIndex:         1,
};

const navBtnStyle: React.CSSProperties = {
  padding:         "10px 24px",
  backgroundColor: "#c6273f",
  color:           "#fff",
  border:          "none",
  borderRadius:    "8px",
  fontSize:        "15px",
  fontWeight:      "600",
  cursor:          "pointer",
  fontFamily:      "'Gugi', sans-serif",
};

const hintBtnStyle: React.CSSProperties = {
  padding:         "8px 18px",
  backgroundColor: "#fff3cd",
  color:           "#856404",
  border:          "1.5px solid #ffe69c",
  borderRadius:    "8px",
  fontSize:        "14px",
  fontWeight:      "600",
  cursor:          "pointer",
};

const hintTextStyle: React.CSSProperties = {
  backgroundColor: "#fff3cd",
  color:           "#664d03",
  border:          "1.5px solid #ffe69c",
  borderRadius:    "8px",
  padding:         "10px 14px",
  fontSize:        "14px",
  lineHeight:      "1.5",
  margin:          0,
};