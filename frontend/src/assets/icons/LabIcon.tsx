import React from "react";

export default function LabIcon({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Equipamento de laboratório">
      {/* Generic Erlenmeyer flask */}
      {/* Neck */}
      <rect x="26" y="6" width="12" height="14" rx="1" />
      {/* Lip */}
      <line x1="24" y1="6" x2="40" y2="6" />
      {/* Body */}
      <path d="M26 20 L10 52 L54 52 L38 20 Z" />
      {/* Liquid level line */}
      <path d="M18 44 Q32 40 46 44" />
    </svg>
  );
}
