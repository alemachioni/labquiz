import React, { useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type MatchingPair = {
  id: string;       // identificador único do par correto
  left: string;     // ex: "Béquer"
  right: string;    // ex: "Armazenar e aquecer líquidos"
};

export type MatchingCardProps = {
  statement: string;
  imageUrl?: string;
  pairs: MatchingPair[];
  onAnswer: (correct: boolean) => void;
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function MatchingCard({
  statement,
  imageUrl,
  pairs,
  onAnswer,
}: MatchingCardProps) {
  // Itens do lado direito embaralhados
  const [rightItems] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  // selectedLeft  → id do item da esquerda clicado aguardando par
  // matches       → { leftId: rightId } pares confirmados pelo aluno
  // revealed      → se já foi corrigido
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  const totalPairs = pairs.length;
  const matchedCount = Object.keys(matches).length;
  const allMatched = matchedCount === totalPairs;

  // ── Cliques ────────────────────────────────────────────────────────────────

  function handleLeftClick(pairId: string) {
    if (revealed) return;
    setSelectedLeft((prev) => (prev === pairId ? null : pairId));
  }

  function handleRightClick(rightPairId: string) {
    if (revealed || !selectedLeft) return;

    // Impede reutilizar um item do lado direito já associado
    const alreadyUsed = Object.values(matches).includes(rightPairId);
    if (alreadyUsed) return;

    setMatches((prev) => ({ ...prev, [selectedLeft]: rightPairId }));
    setSelectedLeft(null);
  }

  function handleConfirm() {
    if (!allMatched || revealed) return;
    const correct = pairs.every((p) => matches[p.id] === p.id);
    setRevealed(true);
    onAnswer(correct);
  }

  function handleReset() {
    if (revealed) return;
    setMatches({});
    setSelectedLeft(null);
  }

  // ── Helpers de estilo ──────────────────────────────────────────────────────

  function leftBorder(pairId: string): string {
    if (revealed) {
      return matches[pairId] === pairId ? "2px solid #28a745" : "2px solid #dc3545";
    }
    if (selectedLeft === pairId) return "2px solid #1a73e8";
    if (matches[pairId]) return "2px solid #aaa";
    return "2px solid #ddd";
  }

  function leftBg(pairId: string): string {
    if (revealed) {
      return matches[pairId] === pairId ? "#d4edda" : "#f8d7da";
    }
    if (selectedLeft === pairId) return "#e8f0fe";
    if (matches[pairId]) return "#f0f0f0";
    return "#fff";
  }

  function rightBorder(rightPairId: string): string {
    if (revealed) {
      const leftForThis = Object.entries(matches).find(([, r]) => r === rightPairId)?.[0];
      if (!leftForThis) return "2px solid #dc3545";
      return leftForThis === rightPairId ? "2px solid #28a745" : "2px solid #dc3545";
    }
    const isUsed = Object.values(matches).includes(rightPairId);
    return isUsed ? "2px solid #aaa" : "2px solid #ddd";
  }

  function rightBg(rightPairId: string): string {
    if (revealed) {
      const leftForThis = Object.entries(matches).find(([, r]) => r === rightPairId)?.[0];
      if (!leftForThis) return "#f8d7da";
      return leftForThis === rightPairId ? "#d4edda" : "#f8d7da";
    }
    const isUsed = Object.values(matches).includes(rightPairId);
    return isUsed ? "#f0f0f0" : "#fff";
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={cardStyle}>
      {/* Enunciado */}
      <p style={{ fontSize: "18px", fontWeight: "600", color: "#111", marginBottom: "8px", lineHeight: "1.5" }}>
        {statement}
      </p>
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
        Clique em um item da esquerda e depois no par correspondente da direita.
      </p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="imagem da questão"
          style={{ width: "100%", maxHeight: "260px", objectFit: "contain", borderRadius: "8px", marginBottom: "16px" }}
        />
      )}

      {/* Grade de associação */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
        {/* Coluna esquerda */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {pairs.map((p) => (
            <button
              key={p.id}
              onClick={() => handleLeftClick(p.id)}
              style={{
                padding: "10px 14px",
                border: leftBorder(p.id),
                borderRadius: "8px",
                backgroundColor: leftBg(p.id),
                fontSize: "14px",
                cursor: revealed ? "default" : "pointer",
                textAlign: "left",
                color: "#111",
              }}
            >
              {p.left}
              {matches[p.id] && !revealed && (
                <span style={{ fontSize: "11px", color: "#888", marginLeft: "6px" }}>✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Coluna direita (embaralhada) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {rightItems.map((p) => {
            const isUsed = Object.values(matches).includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => handleRightClick(p.id)}
                style={{
                  padding: "10px 14px",
                  border: rightBorder(p.id),
                  borderRadius: "8px",
                  backgroundColor: rightBg(p.id),
                  fontSize: "14px",
                  cursor: revealed || isUsed ? "default" : selectedLeft ? "pointer" : "default",
                  textAlign: "left",
                  color: "#111",
                  opacity: !revealed && isUsed ? 0.5 : 1,
                }}
              >
                {p.right}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gabarito após revelação */}
      {revealed && (
        <div style={{ marginBottom: "12px" }}>
          {pairs.map((p) => (
            <p key={p.id} style={{ fontSize: "13px", color: "#555", margin: "2px 0" }}>
              <strong>{p.left}</strong> → {p.right}
            </p>
          ))}
        </div>
      )}

      {/* Botões */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        {!revealed && (
          <button onClick={handleReset} style={resetBtnStyle}>
            Limpar
          </button>
        )}
        {!revealed && (
          <button
            onClick={handleConfirm}
            disabled={!allMatched}
            style={{ ...confirmBtnStyle, opacity: allMatched ? 1 : 0.4, cursor: allMatched ? "pointer" : "not-allowed" }}
          >
            Confirmar ({matchedCount}/{totalPairs})
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "24px",
  maxWidth: "680px",
  margin: "0 auto",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const confirmBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
};

const resetBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "transparent",
  color: "#888",
  border: "1.5px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};