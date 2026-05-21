import React from "react";

export default function Bureta({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Bureta">
      {/* Long tube */}
      <line x1="32" y1="4" x2="32" y2="50" />
      {/* Tube walls */}
      <line x1="28" y1="4" x2="28" y2="50" />
      <line x1="36" y1="4" x2="36" y2="50" />
      {/* Top lip */}
      <line x1="26" y1="4" x2="38" y2="4" />
      {/* Stopcock body */}
      <rect x="24" y="50" width="16" height="6" rx="2" />
      {/* Stopcock handle */}
      <line x1="20" y1="53" x2="44" y2="53" />
      {/* Tip */}
      <line x1="32" y1="56" x2="32" y2="62" />
      {/* Volume marks */}
      <line x1="30" y1="15" x2="28" y2="15" />
      <line x1="30" y1="25" x2="28" y2="25" />
      <line x1="30" y1="35" x2="28" y2="35" />
    </svg>
  );
}
