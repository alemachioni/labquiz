import React from "react";

export default function BalaoParedeFina({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Balão de Parede Fina">
      {/* Neck */}
      <line x1="29" y1="6" x2="29" y2="22" />
      <line x1="35" y1="6" x2="35" y2="22" />
      {/* Lip */}
      <line x1="27" y1="6" x2="37" y2="6" />
      {/* Round flask body */}
      <circle cx="32" cy="40" r="18" />
    </svg>
  );
}
