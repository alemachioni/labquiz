import React from "react";

export default function PipetaVolumetrica({ size = 64, color = "#c6273f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Pipeta Volumétrica">
      {/* Upper thin stem */}
      <line x1="32" y1="4" x2="32" y2="20" />
      {/* Bulb */}
      <ellipse cx="32" cy="32" rx="10" ry="14" />
      {/* Lower thin stem */}
      <line x1="32" y1="46" x2="32" y2="62" />
    </svg>
  );
}
