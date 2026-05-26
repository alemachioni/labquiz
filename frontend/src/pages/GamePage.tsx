import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import QuestionCard, { Alternative } from "../components/game/QuestionCard";
import ResultScreen from "../components/game/ResultScreen";
import etecLogo   from "../assets/etec_logo.png";
import logoutIcon from "../assets/logout_icon.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type ApiOption   = { id: string; text: string; isCorrect: boolean };
type ApiQuestion = { id: string; prompt: string; imageUrl?: string | null; options: ApiOption[] };

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
    id:           q.id,
    statement:    q.prompt,
    imageUrl:     q.imageUrl ?? undefined,
    alternatives: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
  }));
}

// ─── Decorative circles (position:fixed, kept inline) ─────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function GamePage() {
  const [questions,      setQuestions]      = useState<Question[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState<string | null>(null);
  const navigate                            = useNavigate();
  const [searchParams]                      = useSearchParams();
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [score,          setScore]          = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered,       setAnswered]       = useState(false);
  const [gameOver,       setGameOver]       = useState(false);

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
    if (currentIndex + 1 >= questions.length) setGameOver(true);
    else { setCurrentIndex((i) => i + 1); setAnswered(false); }
  }

  function handleRestart()  { navigate("/modulos"); }

  function handlePlayAgain() {
    setCurrentIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setAnswered(false);
    setGameOver(false);
  }

  // ── Auxiliary screens ──────────────────────────────────────────────────────

  if (loading) return (
    <div className="min-h-dvh flex flex-col items-center justify-center">
      <p className="font-gugi text-xl text-red-primary">Carregando questões…</p>
    </div>
  );

  if (error) return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-red-primary text-center">{error}</p>
      <button
        onClick={() => navigate("/modulos")}
        className="px-6 py-2.5 bg-red-primary text-white border-none rounded-lg text-sm sm:text-base font-semibold font-gugi cursor-pointer"
      >
        Voltar
      </button>
    </div>
  );

  if (gameOver) return (
    <ResultScreen
      score={score}
      totalQuestions={questions.length}
      correctAnswers={correctAnswers}
      onRestart={handleRestart}
      onPlayAgain={handlePlayAgain}
    />
  );

  const q        = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="min-h-dvh bg-white flex flex-col font-sans relative overflow-x-hidden">

      {/* Decorative background circles */}
      {BG_CIRCLES.map((c, i) => (
        <div key={i} aria-hidden="true" style={{
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

      {/* Header */}
      <header className="relative bg-red-primary z-10 overflow-hidden">

        {/* Top row: back button + level badge */}
        <div className="relative z-10 px-4 sm:px-6 pt-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate("/modulos")}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center gap-2"
            title="Voltar"
          >
            <img src={logoutIcon} alt="Voltar" className="w-7 h-7 object-contain brightness-0 invert" />
            <span className="font-gugi text-sm text-white">Voltar</span>
          </button>

          <span className="bg-white/20 text-white font-gugi text-xs px-3 py-1 rounded-full">
            Nível: {DIFFICULTY_LABEL[difficultyStr] ?? difficultyStr}
          </span>
        </div>

        {/* Progress row */}
        <div className="relative z-10 px-4 sm:px-6 pt-2.5 flex items-end gap-4">
          <div className="flex-[0_0_45%]">
            <p className="font-gugi text-white text-xs m-0 mb-1">
              Questão {currentIndex + 1}/{questions.length}
            </p>
            <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center pb-0.5">
            <p className="font-gugi text-white text-xs m-0 mb-1 opacity-80">Pontos</p>
            <span className="font-gugi text-white text-lg font-bold leading-none">{score}</span>
          </div>
        </div>

        {/* Wave */}
        <svg
          viewBox="0 0 900 90"
          preserveAspectRatio="none"
          className="block w-full h-[75px] mt-2.5"
          aria-hidden="true"
        >
          <path d="M0,0 C80,70 200,80 380,30 C520,-10 680,75 900,20 L900,90 L0,90 Z" fill="#fff" />
        </svg>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 py-5 max-w-2xl w-full mx-auto box-border relative z-10 flex flex-col justify-center">
        <QuestionCard
          key={q.id}
          statement={q.statement}
          imageUrl={q.imageUrl}
          alternatives={q.alternatives}
          onAnswer={handleAnswer}
        />

        {answered && (
          <div className="text-right mt-4">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-red-primary text-white border-none rounded-lg text-sm sm:text-base font-semibold font-gugi cursor-pointer"
            >
              {currentIndex + 1 >= questions.length ? "Ver resultado" : "Próxima →"}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex justify-center items-center px-4 py-3 border-t border-rose-100 relative z-10">
        <img src={etecLogo} alt="Etec — Escola Técnica Estadual" className="h-11 object-contain" />
      </footer>

    </div>
  );
}
