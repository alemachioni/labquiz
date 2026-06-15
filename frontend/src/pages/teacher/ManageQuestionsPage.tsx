import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../../components/shared/DecorativeDots";
import WaveFooter from "../../components/shared/WaveFooter";
import { apiFetch } from "../../utils/api";

type ApiOption = {
  id: string;
  text: string | null;
  imageUrl?: string | null;
  isCorrect: boolean;
};

type ApiQuestion = {
  id: string;
  type: string;
  difficulty: number;
  category: string;
  prompt: string;
  imageUrl?: string | null;
  hint?: string | null;
  options: ApiOption[];
};

const NIVEL_LABEL: Record<number, string> = { 1: "Fácil", 2: "Médio", 3: "Difícil" };
const TIPO_LABEL: Record<string, string> = { MULTIPLE_CHOICE: "Múltipla escolha", ASSOCIATION: "Associação" };
const CATEGORIA_LABEL: Record<string, string> = {
  VIDRARIA: "Vidrarias", METALICO: "Metálicos", PLASTICO: "Plásticos",
  PORCELANA: "Porcelanas", SISTEMA: "Sistemas",
};

const inputClass =
  "w-full py-2.5 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-primary transition-colors box-border bg-white";

export default function ManageQuestionsPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [search,    setSearch]    = useState("");

  const [editingId,      setEditingId]      = useState<string | null>(null);
  const [editPrompt,     setEditPrompt]     = useState("");
  const [editHint,       setEditHint]       = useState("");
  const [editDifficulty, setEditDifficulty] = useState(1);
  const [editOptions,    setEditOptions]    = useState(["", "", "", ""]);
  const [editOptionImages, setEditOptionImages] = useState(["", "", "", ""]);
  const [editCorrect,    setEditCorrect]    = useState(0);
  const [saving,         setSaving]         = useState(false);

  useEffect(() => {
    apiFetch("/questions")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        setQuestions(await res.json());
      })
      .catch(() => setError("Não foi possível carregar as questões."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = questions.filter((q) => {
    const termo = search.trim().toLowerCase();
    if (!termo) return true;
    return (
      q.prompt.toLowerCase().includes(termo) ||
      (CATEGORIA_LABEL[q.category] ?? q.category).toLowerCase().includes(termo) ||
      (NIVEL_LABEL[q.difficulty] ?? "").toLowerCase().includes(termo)
    );
  });

  function startEdit(q: ApiQuestion) {
    setEditingId(q.id);
    setEditPrompt(q.prompt);
    setEditHint(q.hint ?? "");
    setEditDifficulty(q.difficulty);
    const opts = q.options ?? [];
    setEditOptions([0, 1, 2, 3].map((i) => opts[i]?.text ?? ""));
    setEditOptionImages([0, 1, 2, 3].map((i) => opts[i]?.imageUrl ?? ""));
    const correctIdx = opts.findIndex((o) => o.isCorrect);
    setEditCorrect(correctIdx >= 0 ? correctIdx : 0);
  }

  function setEditOption(i: number, value: string) {
    setEditOptions((prev) => prev.map((o, idx) => (idx === i ? value : o)));
  }

  function setEditOptionImage(i: number, value: string) {
    setEditOptionImages((prev) => prev.map((o, idx) => (idx === i ? value : o)));
  }

  async function handleSave(id: string) {
    const filled = editOptions.map((text, i) => ({ text: text.trim(), index: i })).filter((o) => o.text);
    if (filled.length < 2) {
      setError("É necessário ao menos 2 alternativas preenchidas.");
      return;
    }
    if (!editOptions[editCorrect]?.trim()) {
      setError("A alternativa correta precisa estar preenchida.");
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch(`/questions/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          prompt: editPrompt.trim(),
          hint: editHint.trim() || null,
          difficulty: editDifficulty,
          options: filled.map((o) => ({
            text: o.text,
            imageUrl: editOptionImages[o.index]?.trim() || null,
            isCorrect: o.index === editCorrect,
          })),
        }),
      });
      if (!res.ok) throw new Error();
      const updated: ApiQuestion = await res.json();
      setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updated } : q)));
      setEditingId(null);
    } catch {
      setError("Não foi possível salvar a alteração.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(q: ApiQuestion) {
    const ok = window.confirm(`Excluir a questão "${q.prompt.slice(0, 60)}…"? Essa ação não pode ser desfeita.`);
    if (!ok) return;
    try {
      const res = await apiFetch(`/questions/${q.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setQuestions((prev) => prev.filter((x) => x.id !== q.id));
    } catch {
      setError("Não foi possível excluir a questão.");
    }
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-3xl px-6 py-8 relative z-10 flex-1">
        <button
          className="text-red-primary text-sm sm:text-base font-semibold font-gugi pb-4 block bg-transparent border-none cursor-pointer"
          onClick={() => navigate("/professor")}
        >
          &lt; Voltar
        </button>

        <h1 className="font-gugi text-3xl sm:text-4xl text-gray-900 mb-2 text-center">Gerenciar questões</h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
          Edite ou exclua as questões do banco de dados.
        </p>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Procurar por enunciado, categoria ou nível…"
          className={`${inputClass} mb-5 py-3`}
        />

        {loading && (
          <p className="font-gugi text-red-primary text-center">Carregando questões…</p>
        )}
        {error && <p className="text-red-primary text-sm text-center mb-4">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-500 text-sm text-center">Nenhuma questão encontrada.</p>
        )}

        <div className="flex flex-col gap-3">
          {filtered.map((q) => (
            <div key={q.id} className="bg-red-bg rounded-2xl p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-gugi text-[11px] text-white bg-red-primary rounded-full px-2.5 py-0.5">
                  {CATEGORIA_LABEL[q.category] ?? q.category}
                </span>
                <span className="font-gugi text-[11px] text-red-dark bg-white rounded-full px-2.5 py-0.5">
                  {NIVEL_LABEL[q.difficulty] ?? `Nível ${q.difficulty}`}
                </span>
                <span className="text-[11px] text-gray-500">
                  {TIPO_LABEL[q.type] ?? q.type}
                </span>
              </div>

              {editingId === q.id ? (
                <div className="flex flex-col gap-2.5">
                  <textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    rows={2}
                    className={`${inputClass} resize-y`}
                  />
                  <select
                    value={editDifficulty}
                    onChange={(e) => setEditDifficulty(Number(e.target.value))}
                    className={`${inputClass} sm:w-40`}
                  >
                    <option value={1}>Fácil</option>
                    <option value={2}>Médio</option>
                    <option value={3}>Difícil</option>
                  </select>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {["A", "B", "C", "D"].map((letra, i) => (
                      <div key={letra} className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editOptions[i]}
                            onChange={(e) => setEditOption(i, e.target.value)}
                            placeholder={`Alternativa ${letra}`}
                            className={inputClass}
                          />
                          <input
                            type="radio"
                            name={`correta-${q.id}`}
                            title="Marcar como correta"
                            checked={editCorrect === i}
                            onChange={() => setEditCorrect(i)}
                            className="w-5 h-5 accent-green-correct cursor-pointer flex-shrink-0"
                          />
                        </div>
                        <input
                          type="url"
                          value={editOptionImages[i]}
                          onChange={(e) => setEditOptionImage(i, e.target.value)}
                          placeholder={`Imagem da alternativa ${letra} (URL, opcional)`}
                          className={inputClass}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 -mt-1">Marque o círculo da alternativa correta.</p>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5">Dica (opcional)</label>
                    <input
                      type="text"
                      value={editHint}
                      onChange={(e) => setEditHint(e.target.value)}
                      placeholder="Ex.: Pense no formato do gargalo…"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(q.id)}
                      disabled={saving || !editPrompt.trim()}
                      className="px-4 py-2 bg-green-correct text-white text-sm font-semibold rounded-lg border-none cursor-pointer disabled:opacity-60"
                    >
                      {saving ? "Salvando…" : "Salvar"}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm sm:text-base text-gray-900 m-0 flex-1">{q.prompt}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(q)}
                      className="px-3 py-1.5 bg-white text-red-primary text-xs sm:text-sm font-semibold rounded-lg border border-red-primary cursor-pointer hover:bg-red-primary hover:text-white transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(q)}
                      className="px-3 py-1.5 bg-red-primary text-white text-xs sm:text-sm font-semibold rounded-lg border-none cursor-pointer hover:bg-red-dark transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <WaveFooter />
    </div>
  );
}
