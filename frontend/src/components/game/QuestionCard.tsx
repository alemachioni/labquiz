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
  eliminatedIds?: string[];
  onAnswer: (selectedId: string, isCorrect: boolean) => void;
};

export default function QuestionCard({
  statement,
  imageUrl,
  type = "MULTIPLE_CHOICE",
  alternatives = [],
  pairs = [],
  eliminatedIds = [],
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
      eliminatedIds={eliminatedIds}
      onAnswer={onAnswer}
    />
  );
}

// ─── Multiple Choice ──────────────────────────────────────────────────────────

function MultipleChoiceCard({
  statement,
  imageUrl,
  alternatives,
  eliminatedIds = [],
  onAnswer,
}: {
  statement: string;
  imageUrl?: string;
  alternatives: Alternative[];
  eliminatedIds?: string[];
  onAnswer: (selectedId: string, isCorrect: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isRevealed = selectedId !== null;

  function handleClick(alt: Alternative) {
    if (isRevealed || eliminatedIds.includes(alt.id)) return;
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
        className="flex flex-col gap-3"
      >
        {/* Question box */}
        <div className="bg-red-bg rounded-2xl p-4 sm:p-5 shadow-sm">
          {imageUrl ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed m-0 text-center">
                {statement}
              </p>
              <img
                src={imageUrl}
                alt="imagem da questão"
                className="w-full max-w-[280px] h-auto object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="flex gap-4 items-start">
              <p className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed flex-1 m-0">
                {statement}
              </p>
              <div className="flex-shrink-0 flex items-center justify-center">
                <LabIcon size={80} color="#c6273f" />
              </div>
            </div>
          )}
        </div>

        {/* Answers box */}
        <div className="bg-red-bg rounded-2xl p-3 sm:p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {alternatives.map((alt, i) => (
              <AnswerOption
                key={alt.id}
                label={["A", "B", "C", "D"][i] ?? String(i + 1)}
                text={alt.text}
                imageUrl={alt.imageUrl}
                isCorrect={alt.isCorrect}
                isSelected={selectedId === alt.id}
                isRevealed={isRevealed}
                isEliminated={eliminatedIds.includes(alt.id)}
                onClick={() => handleClick(alt)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
