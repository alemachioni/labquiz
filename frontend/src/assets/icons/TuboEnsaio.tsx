import React from "react";

export default function TuboEnsaio({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Tubo de Ensaio">
      {/* Tube */}
      <path d="M24 6 L24 48 Q24 58 32 58 Q40 58 40 48 L40 6" />
      {/* Top lip */}
      <line x1="22" y1="6" x2="42" y2="6" />
    </svg>
  );
}
