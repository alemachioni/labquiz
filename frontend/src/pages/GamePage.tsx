import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScoreBoard from "../components/game/ScoreBoard";
import QuestionCard, { Alternative } from "../components/game/QuestionCard";
import ResultScreen from "../components/game/ResultScreen";

// ─── Tipos da API ─────────────────────────────────────────────────────────────

// Formato que a API retorna
type ApiOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type ApiQuestion = {
  id: string;
  prompt: string;
  imageUrl?: string | null;
  options: ApiOption[];
};

// Formato interno usado pelos componentes
export type Question = {
  id: string;
  statement: string;
  imageUrl?: string;
  alternatives: Alternative[];
};

// Mapa de dificuldade: string da URL → número da API
const DIFFICULTY_MAP: Record<string, number> = {
  FACIL: 1,
  MEDIO: 2,
  DIFICIL: 3,
};

// ─── Busca de questões ────────────────────────────────────────────────────────

async function fetchQuestions(
  category: string,
  difficulty: number
): Promise<Question[]> {
  const token = localStorage.getItem("token");
  const base = import.meta.env.VITE_API_URL ?? "";

  const res = await fetch(
    `${base}/game/session?category=${category}&difficulty=${difficulty}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar questões");

  const data: ApiQuestion[] = await res.json();

  // Converte do formato da API para o formato dos componentes
  return data.map((q) => ({
    id: q.id,
    statement: q.prompt,
    imageUrl: q.imageUrl ?? undefined,
    alternatives: q.options.map((o) => ({
      id: o.id,
      text: o.text,
      isCorrect: o.isCorrect,
    })),
  }));
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function GamePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Lê category e difficulty da URL
  const category = searchParams.get("category") ?? "VIDRARIA";
  const difficultyStr = searchParams.get("difficulty") ?? "FACIL";
  const difficulty = DIFFICULTY_MAP[difficultyStr] ?? 1;

  useEffect(() => {
    fetchQuestions(category, difficulty)
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Não foi possível carregar as questões. Tente novamente.");
        setLoading(false);
      });
  }, [category, difficulty]);

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
        <button onClick={() => navigate("/modulos")} style={btnStyle}>
          Voltar aos módulos
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
        Quiz — Laboratório
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

// ─── Estilos ──────────────────────────────────────────────────────────────────

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