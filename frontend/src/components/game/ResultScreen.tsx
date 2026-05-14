import React from "react";

export type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
};

export default function ResultScreen({
  score,
  totalQuestions,
  correctAnswers,
  onRestart,
}: ResultScreenProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  let message: string;
  if (percentage >= 80) message = "Excelente!";
  else if (percentage >= 60) message = "Bom trabalho!";
  else if (percentage >= 40) message = "Continue praticando!";
  else message = "Não desista! Tente novamente.";

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "60px auto",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "40px 32px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "8px", color: "#111" }}>
        Resultado Final
      </h2>

      <p style={{ fontSize: "48px", fontWeight: "700", color: "#1a73e8", margin: "16px 0" }}>
        {percentage}%
      </p>

      <p style={{ fontSize: "18px", color: "#444", marginBottom: "8px" }}>
        {correctAnswers} de {totalQuestions} questões corretas
      </p>

      <p style={{ fontSize: "16px", color: "#666", marginBottom: "8px" }}>
        Pontuação: <strong>{score}</strong>
      </p>

      <p style={{ fontSize: "20px", marginBottom: "32px", color: "#222" }}>
        {message}
      </p>

      <button
        onClick={onRestart}
        style={{
          padding: "12px 32px",
          backgroundColor: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Jogar novamente
      </button>
    </div>
  );
}