import React, { useState } from "react";
import { motion } from "framer-motion";

export type AnswerOptionProps = {
  label: string;
  text?: string;
  imageUrl?: string;
  isCorrect: boolean;
  isSelected: boolean;
  isRevealed: boolean;
  onClick: () => void;
};

export default function AnswerOption({
  label,
  text,
  imageUrl,
  isCorrect,
  isSelected,
  isRevealed,
  onClick,
}: AnswerOptionProps) {
  const [hovered, setHovered] = useState(false);

  // Dynamic colors — kept inline since they depend on runtime state
  let circleBg = "#c6273f";
  if (isRevealed) {
    if (isCorrect)        circleBg = "#0e9c0e";
    else if (isSelected)  circleBg = "#910101";
  }

  let cardBg     = "#e8e1e1";
  let cardBorder = "2px solid transparent";
  let textColor  = "#111";

  if (isRevealed) {
    if (isCorrect) {
      cardBg     = "#94e494";
      cardBorder = "2px solid #0e9c0e";
    } else if (isSelected) {
      cardBg     = "#d9374f";
      cardBorder = "2px solid #910101";
      textColor  = "#fff";
    } else {
      cardBg = "#ccc6c6";
    }
  } else if (hovered) {
    cardBg     = "#d6cccc";
    cardBorder = "2px solid #c6273f";
  }

  const animate =
    isRevealed && isCorrect
      ? { scale: [1, 1.04, 1], transition: { duration: 0.4 } }
      : isRevealed && isSelected && !isCorrect
      ? { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } }
      : {};

  return (
    <motion.button
      animate={animate}
      onClick={isRevealed ? undefined : onClick}
      onMouseEnter={() => { if (!isRevealed) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-2.5 p-2.5 sm:p-3.5 rounded-xl w-full text-left transition-all duration-150 ${
        isRevealed ? "cursor-default" : "cursor-pointer"
      }`}
      style={{ backgroundColor: cardBg, border: cardBorder }}
    >
      {/* Letter circle */}
      <span
        className="min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 rounded-full text-white font-bold text-sm sm:text-base flex items-center justify-center flex-shrink-0 font-gugi transition-colors duration-150"
        style={{ backgroundColor: circleBg }}
      >
        {label}
      </span>

      {/* Text */}
      <span className="text-sm sm:text-base leading-snug" style={{ color: textColor }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="max-h-14 sm:max-h-16 rounded mb-1 block"
          />
        )}
        {text}
      </span>
    </motion.button>
  );
}
