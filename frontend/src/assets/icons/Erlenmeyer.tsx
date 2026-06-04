import React from "react";

export default function Erlenmeyer({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Erlenmeyer">
      {/* Neck */}
      <rect x="26" y="6" width="12" height="16" rx="1" />
      {/* Shoulder + body */}
      <path d="M26 22 L10 52 L54 52 L38 22 Z" />
      {/* Lip */}
      <line x1="24" y1="6" x2="40" y2="6" />
    </svg>
  );
}
