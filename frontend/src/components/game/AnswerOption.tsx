import React from "react";

export type AnswerOptionProps = {
  text?: string;
  imageUrl?: string;
  isCorrect: boolean;
  isSelected: boolean;
  isRevealed: boolean; // true após qualquer clique na questão
  onClick: () => void;
};

export default function AnswerOption({
  text,
  imageUrl,
  isCorrect,
  isSelected,
  isRevealed,
  onClick,
}: AnswerOptionProps) {
  let bgColor = "#f5f5f5";
  let border = "2px solid #ccc";
  let color = "#222";
  let cursor = "pointer";

  if (isRevealed) {
    cursor = "default";
    if (isCorrect) {
      bgColor = "#d4edda";
      border = "2px solid #28a745";
      color = "#155724";
    } else if (isSelected && !isCorrect) {
      bgColor = "#f8d7da";
      border = "2px solid #dc3545";
      color = "#721c24";
    } else {
      bgColor = "#f5f5f5";
      border = "2px solid #ccc";
      color = "#888";
    }
  }

  return (
    <button
      onClick={isRevealed ? undefined : onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding: "12px 16px",
        marginBottom: "10px",
        backgroundColor: bgColor,
        border,
        borderRadius: "8px",
        color,
        fontSize: "16px",
        textAlign: "left",
        cursor,
        transition: "none",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="alternativa"
          style={{ maxHeight: "80px", borderRadius: "4px" }}
        />
      )}
      {text && <span>{text}</span>}
      {isRevealed && isCorrect && (
        <span style={{ marginLeft: "auto", fontWeight: "bold" }}>✓ Correta</span>
      )}
      {isRevealed && isSelected && !isCorrect && (
        <span style={{ marginLeft: "auto", fontWeight: "bold" }}>✗ Errada</span>
      )}
    </button>
  );
}