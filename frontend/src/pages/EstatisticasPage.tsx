import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../components/shared/DecorativeDots";
import WaveFooter from "../components/shared/WaveFooter";
import { apiFetch } from "../utils/api";

type ApiSession = {
  id: string;
  score: number;
  totalQ: number;
  correctQ: number;
  category?: string | null;
  difficulty?: number | null;
  playedAt: string;
};

const NIVEL_LABEL: Record<number, string> = { 1: "Fácil", 2: "Médio", 3: "Difícil" };
const CATEGORIA_LABEL: Record<string, string> = {
  VIDRARIA: "Vidrarias", METALICO: "Metálicos", PLASTICO: "Plásticos",
  PORCELANA: "Porcelanas", SISTEMA: "Sistemas",
};

export default function EstatisticasPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/reports/me")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        setSessions(await res.json());
      })
      .catch(() => setError("Não foi possível carregar suas estatísticas."))
      .finally(() => setLoading(false));
  }, []);

  const totalPontos    = sessions.reduce((acc, s) => acc + s.score, 0);
  const partidas       = sessions.length;
  const questoesFeitas = sessions.reduce((acc, s) => acc + s.totalQ, 0);
  const acertos        = sessions.reduce((acc, s) => acc + s.correctQ, 0);
  const percentAcerto  = questoesFeitas > 0 ? Math.round((acertos / questoesFeitas) * 100) : 0;

  const stats = [
    { label: "Total de pontos",        value: totalPontos },
    { label: "Partidas jogadas",       value: partidas },
    { label: "Questões respondidas",   value: questoesFeitas },
    { label: "% de acertos",           value: `${percentAcerto}%` },
  ];

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-2xl px-6 py-8 relative z-10 flex-1">
        <button
          className="text-red-primary text-sm sm:text-base font-semibold font-gugi pb-4 block bg-transparent border-none cursor-pointer"
          onClick={() => navigate("/modulos")}
        >
          &lt; Voltar
        </button>

        <h1 className="font-gugi text-3xl sm:text-4xl text-gray-900 mb-2 text-center">Estatísticas</h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
          Acompanhe sua evolução no LabQuiz.
        </p>

        {loading && (
          <p className="font-gugi text-red-primary text-center">Carregando estatísticas…</p>
        )}
        {error && <p className="text-red-primary text-sm text-center mb-4">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-red-bg rounded-2xl p-4 text-center shadow-sm">
                  <p className="text-[11px] sm:text-xs text-gray-500 m-0 mb-1">{s.label}</p>
                  <p className="font-gugi text-xl sm:text-2xl text-red-primary m-0">{s.value}</p>
                </div>
              ))}
            </div>

            {sessions.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">Você ainda não jogou nenhuma partida.</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {sessions.map((s) => (
                  <div key={s.id} className="bg-red-bg rounded-2xl px-4 py-3 shadow-sm flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-xs text-gray-500">
                      {new Date(s.playedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </span>
                    <span className="font-gugi text-[11px] text-white bg-red-primary rounded-full px-2.5 py-0.5">
                      {s.category ? (CATEGORIA_LABEL[s.category] ?? s.category) : "—"}
                    </span>
                    <span className="text-xs text-gray-600">
                      {s.difficulty ? (NIVEL_LABEL[s.difficulty] ?? `Nível ${s.difficulty}`) : "—"}
                    </span>
                    <span className="text-xs text-gray-600 ml-auto">
                      <strong className="text-green-correct">{s.correctQ}</strong>/{s.totalQ} acertos
                    </span>
                    <span className="font-gugi text-sm text-red-primary">{s.score} pts</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <WaveFooter />
    </div>
  );
}
