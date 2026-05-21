import React from "react";

export default function BicoBunsen({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Bico de Bunsen">
      {/* Tube */}
      <rect x="26" y="18" width="12" height="34" rx="1" />
      {/* Base */}
      <rect x="18" y="52" width="28" height="8" rx="2" />
      {/* Flame */}
      <path d="M32 18 C28 10 36 4 32 0 C36 6 40 10 36 16 C38 10 34 6 32 10 C30 6 26 10 28 16 Z" />
      {/* Air inlet hole */}
      <circle cx="32" cy="38" r="3" />
    </svg>
  );
}
