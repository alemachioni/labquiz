import React from "react";

export default function FunilSimples({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Funil Simples">
      {/* Funnel top */}
      <path d="M8 8 L56 8 L38 38 L26 38 Z" />
      {/* Stem */}
      <line x1="26" y1="38" x2="26" y2="58" />
      <line x1="38" y1="38" x2="38" y2="58" />
    </svg>
  );
}
