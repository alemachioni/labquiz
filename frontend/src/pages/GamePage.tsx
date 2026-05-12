import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScoreBoard from "../components/game/ScoreBoard";
import QuestionCard, { Alternative } from "../components/game/QuestionCard";
import HelpPanel from "../components/game/HelpPanel";
import ResultScreen from "../components/game/ResultScreen";
import { MOCK_QUESTIONS } from "../utils/mockData";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type Question = {
  id: string;
  statement: string;
  imageUrl?: string;
  hint?: string;
  alternatives: Alternative[];
};

// ─── Busca de questões ────────────────────────────────────────────────────────
//
// Tenta buscar da API. Se falhar (ex: sem deploy ainda), usa o mock local.
// Para trocar definitivamente para a API, basta garantir que VITE_API_URL
// esteja configurado no Vercel e que o backend esteja no ar.
// ─────────────────────────────────────────────────────────────────────────────

async function fetchQuestions(category?: string): Promise<Question[]> {
  try {
    const base = import.meta.env.VITE_API_URL ?? "";
    const url = category
      ? `${base}/game/session?category=${category}`
      : `${base}/game/session`;

    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) throw new Error("API indisponível");

    const data = await res.json();

    // Mapeia o formato da API para o formato do componente
    return data.map((q: {
      id: string;
      prompt: string;
      imageUrl?: string;
      options: { id: string; text: string; isCorrect: boolean }[];
    }) => ({
      id: q.id,
      statement: q.prompt,
      imageUrl: q.imageUrl,
      alternatives: q.options.map((o) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    }));
  } catch {
    // Fallback: usa mock local enquanto a API não está disponível
    console.warn("API indisponível — usando dados locais");
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_QUESTIONS;
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function GamePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Busca as questões ao montar
  useEffect(() => {
    fetchQuestions(category)
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Não foi possível carregar as questões. Tente novamente.");
        setLoading(false);
      });
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleAnswer(_selectedId: string, isCorrect: boolean) {
    setAnswered(true);
    if (isCorrect) {
      setScore((s) => s + 10);
      setCorrectAnswers((c) => c + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setGameOver(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setHintUsed(false);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setAnswered(false);
    setHintUsed(false);
    setGameOver(false);
  }

  function handleBackToModules() {
    navigate("/modulos");
  }

  // ── Estados de tela ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={centered}>
        <p style={{ fontSize: "18px", color: "#555" }}>Carregando questões…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={centered}>
        <p style={{ color: "#dc3545", fontSize: "16px" }}>{error}</p>
        <button onClick={() => window.location.reload()} style={btnStyle}>
          Tentar novamente
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div style={pageStyle}>
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", alignItems: "center", maxWidth: "680px", margin: "0 auto 20px auto" }}>
        <button onClick={handleBackToModules} style={backBtnStyle}>
          ← Módulos
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "700",
            color: "#111",
            margin: 0,
          }}
        >
          🧪 LabQuiz {category ? `— ${category.charAt(0) + category.slice(1).toLowerCase()}` : ""}
        </h1>
      </div>

      <ScoreBoard
        score={score}
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
      />

      <QuestionCard
        key={currentQuestion.id}
        statement={currentQuestion.statement}
        imageUrl={currentQuestion.imageUrl}
        alternatives={currentQuestion.alternatives}
        onAnswer={handleAnswer}
      />

      {currentQuestion.hint && (
        <HelpPanel
          key={`hint-${currentQuestion.id}`}
          hint={currentQuestion.hint}
          disabled={hintUsed}
          onUse={() => setHintUsed(true)}
        />
      )}

      {answered && (
        <div style={{ maxWidth: "680px", margin: "20px auto 0 auto", textAlign: "right" }}>
          <button onClick={handleNext} style={btnStyle}>
            {currentIndex + 1 >= questions.length ? "Ver resultado" : "Próxima questão →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Estilos utilitários ──────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#f0f4f8",
  padding: "32px 16px",
  fontFamily: "sans-serif",
};

const centered: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "sans-serif",
};

const btnStyle: React.CSSProperties = {
  padding: "10px 24px",
  backgroundColor: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};

const backBtnStyle: React.CSSProperties = {
  padding: "6px 14px",
  backgroundColor: "transparent",
  border: "1.5px solid #ccc",
  borderRadius: "8px",
  fontSize: "13px",
  cursor: "pointer",
  color: "#555",
};