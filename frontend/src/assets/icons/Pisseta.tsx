import React from "react";

export default function Pisseta({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Pisseta">
      {/* Bottle body */}
      <path d="M20 20 L20 52 Q20 58 32 58 Q44 58 44 52 L44 20 Q44 14 32 14 Q20 14 20 20 Z" />
      {/* Cap/neck */}
      <rect x="28" y="6" width="8" height="10" rx="2" />
      {/* Nozzle going sideways and down */}
      <path d="M44 26 L54 22 L54 38" />
      {/* Nozzle tip */}
      <line x1="54" y1="38" x2="52" y2="42" />
    </svg>
  );
}
