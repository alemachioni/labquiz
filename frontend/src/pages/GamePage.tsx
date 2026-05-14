import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
// 🚧 MODO DESENVOLVIMENTO — usando mockData.ts
//
// Quando a API do Otavio estiver pronta, substitua o corpo desta função por:
//
//   const res = await fetch("/api/questions");
//   if (!res.ok) throw new Error("Erro ao buscar questões");
//   return res.json();
//
// Não é necessário mexer em nenhum outro arquivo.
// ─────────────────────────────────────────────────────────────────────────────

async function fetchQuestions(): Promise<Question[]> {
  // 🚧 Simulação de delay de rede (remova ao conectar na API real)
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_QUESTIONS;

  // ✅ Quando a API do Otavio estiver pronta, substitua tudo acima por:
  // const res = await fetch("/api/questions");
  // if (!res.ok) throw new Error("Erro ao buscar questões");
  // return res.json();
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function GamePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Busca as questões ao montar
  useEffect(() => {
    fetchQuestions()
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
      <h1
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "700",
          color: "#111",
          marginBottom: "20px",
        }}
      >
        Quiz — Ensino Médio
      </h1>

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