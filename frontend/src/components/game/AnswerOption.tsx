import React, { useState } from "react";

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

  // ── Cores do círculo ──────────────────────────────────────────────────────
  let circleBg = "#b1001b";
  if (isRevealed) {
    if (isCorrect) circleBg = "#0e9c0e";
    else if (isSelected) circleBg = "#910101";
  }

  // ── Cores do card ─────────────────────────────────────────────────────────
  let cardBg = "#e8e1e1";
  let cardBorder = "2px solid transparent";

  if (isRevealed) {
    if (isCorrect)       { cardBg = "#94e494"; cardBorder = "2px solid #0e9c0e"; }
    else if (isSelected) { cardBg = "#d9374f"; cardBorder = "2px solid #910101"; }
  } else if (hovered) {
    cardBg = "#d6cccc";
    cardBorder = "2px solid #b1001b";
  }

  const textColor = isRevealed && isSelected && !isCorrect ? "#fff" : "#111";

  return (
    <button
      onClick={isRevealed ? undefined : onClick}
      onMouseEnter={() => { if (!isRevealed) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        backgroundColor: cardBg,
        border: cardBorder,
        borderRadius: "12px",
        cursor: isRevealed ? "default" : "pointer",
        textAlign: "left",
        width: "100%",
        transition: "background-color 0.15s, border-color 0.15s",
      }}
    >
      {/* Círculo com letra */}
      <span style={{
        minWidth: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: circleBg,
        color: "#fff",
        fontWeight: "700",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background-color 0.15s",
      }}>
        {label}
      </span>

      {/* Texto */}
      <span style={{ fontSize: "14px", color: textColor, lineHeight: "1.4" }}>
        {imageUrl && (
          <img src={imageUrl} alt="" style={{ maxHeight: "60px", borderRadius: "4px", display: "block", marginBottom: "4px" }} />
        )}
        {text}
      </span>
    </button>
  );
}