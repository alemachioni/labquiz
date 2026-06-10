import React from "react";

export default function Bequer({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Béquer">
      {/* Body */}
      <rect x="16" y="10" width="32" height="40" rx="2" />
      {/* Lip */}
      <line x1="14" y1="10" x2="50" y2="10" />
      {/* Volume lines */}
      <line x1="22" y1="26" x2="30" y2="26" />
      <line x1="22" y1="36" x2="30" y2="36" />
      <line x1="22" y1="42" x2="30" y2="42" />
      {/* Spout */}
      <path d="M44 10 L50 4" />
    </svg>
  );
}
