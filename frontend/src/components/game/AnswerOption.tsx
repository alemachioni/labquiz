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

  // ── Circle color ──────────────────────────────────────────────────────────
  let circleBg = "#c6273f";
  if (isRevealed) {
    if (isCorrect) circleBg = "#0e9c0e";
    else if (isSelected) circleBg = "#910101";
  }

  // ── Card color ────────────────────────────────────────────────────────────
  let cardBg = "#e8e1e1";
  let cardBorder = "2px solid transparent";
  let textColor = "#111";

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

  // ── Animation variants ────────────────────────────────────────────────────
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
      style={{
        display:         "flex",
        alignItems:      "center",
        gap:             "10px",
        padding:         "10px 14px",
        backgroundColor: cardBg,
        border:          cardBorder,
        borderRadius:    "12px",
        cursor:          isRevealed ? "default" : "pointer",
        textAlign:       "left",
        width:           "100%",
        transition:      "background-color 0.15s, border-color 0.15s",
      }}
    >
      {/* Letter circle */}
      <span
        style={{
          minWidth:        "32px",
          height:          "32px",
          borderRadius:    "50%",
          backgroundColor: circleBg,
          color:           "#fff",
          fontWeight:      "700",
          fontSize:        "14px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
          transition:      "background-color 0.15s",
          fontFamily:      "'Gugi', sans-serif",
        }}
      >
        {label}
      </span>

      {/* Text */}
      <span style={{ fontSize: "14px", color: textColor, lineHeight: "1.4" }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            style={{ maxHeight: "60px", borderRadius: "4px", display: "block", marginBottom: "4px" }}
          />
        )}
        {text}
      </span>
    </motion.button>
  );
}
