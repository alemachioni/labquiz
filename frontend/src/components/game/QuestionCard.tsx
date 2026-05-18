import React, { useState } from "react";
import AnswerOption from "./AnswerOption";
import MatchingCard, { MatchingPair } from "./MatchingCard";

export type Alternative = {
  id: string;
  text?: string;
  imageUrl?: string;
  isCorrect: boolean;
};

export type QuestionType = "MULTIPLE_CHOICE" | "MATCHING";

export type QuestionCardProps = {
  statement: string;
  imageUrl?: string;
  type?: QuestionType;
  alternatives?: Alternative[];
  pairs?: MatchingPair[];
  onAnswer: (selectedId: string, isCorrect: boolean) => void;
};

export default function QuestionCard({
  statement,
  imageUrl,
  type = "MULTIPLE_CHOICE",
  alternatives = [],
  pairs = [],
  onAnswer,
}: QuestionCardProps) {
  if (type === "MATCHING") {
    return (
      <MatchingCard
        statement={statement}
        imageUrl={imageUrl}
        pairs={pairs}
        onAnswer={(correct) => onAnswer("matching", correct)}
      />
    );
  }

  return (
    <MultipleChoiceCard
      statement={statement}
      imageUrl={imageUrl}
      alternatives={alternatives}
      onAnswer={onAnswer}
    />
  );
}

// ─── Multiple Choice ──────────────────────────────────────────────────────────

function MultipleChoiceCard({
  statement,
  imageUrl,
  alternatives,
  onAnswer,
}: {
  statement: string;
  imageUrl?: string;
  alternatives: Alternative[];
  onAnswer: (selectedId: string, isCorrect: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isRevealed = selectedId !== null;

  function handleClick(alt: Alternative) {
    if (isRevealed) return;
    setSelectedId(alt.id);
    onAnswer(alt.id, alt.isCorrect);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Retângulo da pergunta — separado */}
      <div style={questionBoxStyle}>
        {imageUrl && (
          <img src={imageUrl} alt="imagem da questão"
            style={{ width: "100%", maxHeight: "220px", objectFit: "contain", borderRadius: "8px", marginBottom: "12px" }} />
        )}
        <p style={{ fontSize: "16px", fontWeight: "600", color: "#111", margin: 0, lineHeight: "1.6" }}>
          {statement}
        </p>
      </div>

      {/* Retângulo das alternativas — separado */}
      <div style={answersBoxStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {alternatives.map((alt, i) => (
            <AnswerOption
              key={alt.id}
              label={["A", "B", "C", "D"][i] ?? String(i + 1)}
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

    </div>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const questionBoxStyle: React.CSSProperties = {
  backgroundColor: "#e8e1e1",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  minHeight: "90px",
};

const answersBoxStyle: React.CSSProperties = {
  backgroundColor: "#e8e1e1",
  borderRadius: "16px",
  padding: "16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
};