import React, { useState } from "react";

export type HelpPanelProps = {
  hint?: string;        // dica textual opcional
  disabled?: boolean;   // se a ajuda já foi usada
  onUse?: () => void;   // callback ao usar a ajuda
};

export default function HelpPanel({ hint, disabled = false, onUse }: HelpPanelProps) {
  const [revealed, setRevealed] = useState(false);

  function handleClick() {
    if (disabled || revealed) return;
    setRevealed(true);
    onUse?.();
  }

  return (
    <div
      style={{
        maxWidth:        "680px",
        margin:          "16px auto 0 auto",
        padding:         "12px 16px",
        backgroundColor: "#fff8e1",
        border:          "1.5px solid #ffc107",
        borderRadius:    "12px",
        boxShadow:       "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "20px" }} aria-hidden="true">💡</span>
        <strong style={{ color: "#795548", fontFamily: "'Gugi', sans-serif", fontSize: "14px" }}>Dica</strong>
        {!revealed && (
          <button
            onClick={handleClick}
            disabled={disabled}
            style={{
              marginLeft:      "auto",
              padding:         "6px 14px",
              backgroundColor: disabled ? "#ccc" : "#ffc107",
              border:          "none",
              borderRadius:    "6px",
              cursor:          disabled ? "not-allowed" : "pointer",
              fontWeight:      "600",
              color:           "#333",
              fontSize:        "13px",
            }}
          >
            {disabled ? "Usada" : "Ver dica"}
          </button>
        )}
      </div>

      {revealed && hint && (
        <p style={{ marginTop: "10px", color: "#4e342e", fontSize: "15px" }}>
          {hint}
        </p>
      )}

      {revealed && !hint && (
        <p style={{ marginTop: "10px", color: "#888", fontSize: "14px" }}>
          Nenhuma dica disponível para esta questão.
        </p>
      )}
    </div>
  );
}
