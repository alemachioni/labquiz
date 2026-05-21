import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnswerOption from "./AnswerOption";
import MatchingCard, { MatchingPair } from "./MatchingCard";
import { LabIcon } from "../../assets/icons";

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
    <AnimatePresence mode="wait">
      <motion.div
        key={statement}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {/* Question box */}
        <div style={questionBoxStyle}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#111", margin: 0, lineHeight: "1.6", flex: 1 }}>
              {statement}
            </p>

            {/* Image or SVG icon placeholder */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="imagem da questão"
                  style={{ width: "96px", height: "96px", objectFit: "contain", borderRadius: "8px" }}
                />
              ) : (
                <LabIcon size={96} color="#c6273f" />
              )}
            </div>
          </div>
        </div>

        {/* Answers box */}
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
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const questionBoxStyle: React.CSSProperties = {
  backgroundColor: "#f0ecec",
  borderRadius:    "16px",
  padding:         "20px",
  boxShadow:       "0 2px 8px rgba(0,0,0,0.07)",
  minHeight:       "90px",
};

const answersBoxStyle: React.CSSProperties = {
  backgroundColor: "#f0ecec",
  borderRadius:    "16px",
  padding:         "16px",
  boxShadow:       "0 2px 8px rgba(0,0,0,0.07)",
};
