import React from "react";

export type ScoreBoardProps = {
  score: number;
  currentQuestion: number; // começa em 1
  totalQuestions: number;
};

export default function ScoreBoard({
  score,
  currentQuestion,
  totalQuestions,
}: ScoreBoardProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1a73e8",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "8px",
        maxWidth: "680px",
        margin: "0 auto 20px auto",
        fontSize: "16px",
        fontWeight: "600",
      }}
    >
      <span>
        Questão {currentQuestion} / {totalQuestions}
      </span>
      <span>Pontuação: {score}</span>
    </div>
  );
}