import React, { useState } from "react";
import AnswerOption from "./AnswerOption";

export type Alternative = {
  id: string;
  text?: string;
  imageUrl?: string;
  isCorrect: boolean;
};

export type QuestionCardProps = {
  statement: string;
  imageUrl?: string;
  alternatives: Alternative[];
  onAnswer: (selectedId: string, isCorrect: boolean) => void;
};

export default function QuestionCard({
  statement,
  imageUrl,
  alternatives,
  onAnswer,
}: QuestionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isRevealed = selectedId !== null;

  function handleClick(alt: Alternative) {
    if (isRevealed) return;
    setSelectedId(alt.id);
    onAnswer(alt.id, alt.isCorrect);
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        maxWidth: "680px",
        margin: "0 auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#111",
          marginBottom: "16px",
          lineHeight: "1.5",
        }}
      >
        {statement}
      </p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="imagem da questão"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />
      )}

      <div>
        {alternatives.map((alt) => (
          <AnswerOption
            key={alt.id}
            text={alt.text}
            imageUrl={alt.imageUrl}
            isCorrect={alt.isCorrect}
            isSelected={selectedId === alt.id}
            isRevealed={isRevealed}
            onClick={() => handleClick(alt)}
          />
        ))}
      </div>
    </div>
  );
}