import React from "react";

export default function Proveta({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Proveta">
      {/* Tube */}
      <path d="M24 4 L24 46 Q24 56 32 56 Q40 56 40 46 L40 4" />
      {/* Lip */}
      <line x1="22" y1="4" x2="42" y2="4" />
      {/* Volume marks */}
      <line x1="36" y1="20" x2="40" y2="20" />
      <line x1="36" y1="30" x2="40" y2="30" />
      <line x1="36" y1="40" x2="40" y2="40" />
    </svg>
  );
}
