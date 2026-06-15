import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../../components/shared/DecorativeDots";
import WaveFooter from "../../components/shared/WaveFooter";
import { apiFetch } from "../../utils/api";

const CATEGORIAS = [
  { value: "VIDRARIA",  label: "Vidrarias" },
  { value: "METALICO",  label: "Materiais Metálicos" },
  { value: "PLASTICO",  label: "Materiais Plásticos" },
  { value: "PORCELANA", label: "Porcelanas" },
  { value: "SISTEMA",   label: "Sistemas e Montagens" },
];

const NIVEIS = [
  { value: 1, label: "Fácil" },
  { value: 2, label: "Médio" },
  { value: 3, label: "Difícil" },
];

const inputClass =
  "w-full py-2.5 px-3 border border-gray-300 rounded-lg text-sm sm:text-base outline-none focus:border-red-primary transition-colors box-border bg-white";
const labelClass = "block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5";

export default function AddQuestionPage() {
  const navigate = useNavigate();

  const [category,   setCategory]   = useState("VIDRARIA");
  const [difficulty, setDifficulty] = useState(1);
  const [prompt,     setPrompt]     = useState("");
  const [hint,       setHint]       = useState("");
  const [imageUrl,   setImageUrl]   = useState("");
  const [alts,       setAlts]       = useState(["", "", "", ""]);
  const [correct,    setCorrect]    = useState(0);
  const [saving,     setSaving]     = useState(false);
  const [feedback,   setFeedback]   = useState<{ ok: boolean; msg: string } | null>(null);

  function setAlt(i: number, value: string) {
    setAlts((prev) => prev.map((a, idx) => (idx === i ? value : a)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    const filled = alts.map((text, i) => ({ text: text.trim(), index: i })).filter((a) => a.text);
    if (!prompt.trim() || filled.length < 2) {
      setFeedback({ ok: false, msg: "Preencha o enunciado e ao menos 2 alternativas." });
      return;
    }
    if (!alts[correct]?.trim()) {
      setFeedback({ ok: false, msg: "A alternativa correta precisa estar preenchida." });
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");
    setSaving(true);
    try {
      const res = await apiFetch("/questions", {
        method: "POST",
        body: JSON.stringify({
          type: "MULTIPLE_CHOICE",
          difficulty,
          category,
          prompt: prompt.trim(),
          hint: hint.trim() || null,
          imageUrl: imageUrl.trim() || null,
          userId: usuario.id,
          options: filled.map((a) => ({ text: a.text, isCorrect: a.index === correct })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.erro ?? data.error ?? "Erro ao salvar questão");
      }
      setFeedback({ ok: true, msg: "Questão salva com sucesso!" });
      setPrompt("");
      setHint("");
      setImageUrl("");
      setAlts(["", "", "", ""]);
      setCorrect(0);
    } catch (err: unknown) {
      setFeedback({ ok: false, msg: err instanceof Error ? err.message : "Erro ao salvar questão" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-2xl px-6 py-8 relative z-10">
        <button
          className="text-red-primary text-sm sm:text-base font-semibold font-gugi pb-4 block bg-transparent border-none cursor-pointer"
          onClick={() => navigate("/professor")}
        >
          &lt; Voltar
        </button>

        <h1 className="font-gugi text-3xl sm:text-4xl text-gray-900 mb-2 text-center">Adicionar questão</h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
          Preencha os campos para adicionar uma questão ao banco de dados.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-6 sm:p-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Nível</label>
              <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} className={inputClass}>
                {NIVEIS.map((n) => <option key={n.value} value={n.value}>{n.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Enunciado</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Ex.: Qual é o nome do material a seguir?"
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["A", "B", "C", "D"].map((letra, i) => (
              <div key={letra}>
                <label className={labelClass}>Alternativa {letra}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={alts[i]}
                    onChange={(e) => setAlt(i, e.target.value)}
                    placeholder={`Texto da alternativa ${letra}`}
                    className={inputClass}
                  />
                  <input
                    type="radio"
                    name="correta"
                    title="Marcar como correta"
                    checked={correct === i}
                    onChange={() => setCorrect(i)}
                    className="w-5 h-5 accent-green-correct cursor-pointer flex-shrink-0"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 -mt-2">Marque o círculo da alternativa correta.</p>

          <div>
            <label className={labelClass}>Dica (opcional)</label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Ex.: Pense no formato do gargalo…"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Imagem (URL, opcional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </div>

          {feedback && (
            <p className={`text-sm m-0 ${feedback.ok ? "text-green-correct" : "text-red-primary"}`}>
              {feedback.msg}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto sm:self-center sm:px-10 py-3 bg-red-primary text-white font-bold text-base rounded-lg font-gugi disabled:opacity-60 transition-opacity cursor-pointer border-none"
          >
            {saving ? "Salvando…" : "Salvar questão"}
          </button>
        </form>
      </main>

      <WaveFooter />
    </div>
  );
}
