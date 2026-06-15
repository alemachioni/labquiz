import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../../components/shared/DecorativeDots";
import WaveFooter from "../../components/shared/WaveFooter";
import { apiFetch } from "../../utils/api";

type ApiSession = {
  id: string;
  score: number;
  totalQ: number;
  correctQ: number;
  category?: string | null;
  difficulty?: number | null;
  playedAt: string;
};

type ApiStudent = {
  id: string;
  name: string;
  email: string;
  lastPlayedAt?: string | null;
  totalSessions?: number;
  totalScore?: number;
  totalQ?: number;
  correctQ?: number;
};

const NIVEL_LABEL: Record<number, string> = { 1: "Fácil", 2: "Médio", 3: "Difícil" };
const CATEGORIA_LABEL: Record<string, string> = {
  VIDRARIA: "Vidrarias", METALICO: "Metálicos", PLASTICO: "Plásticos",
  PORCELANA: "Porcelanas", SISTEMA: "Sistemas",
};

export default function TeacherReportPage() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [selected, setSelected] = useState<{ name: string; email: string } | null>(null);
  const [sessions, setSessions] = useState<ApiSession[] | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const [students,        setStudents]        = useState<ApiStudent[]>([]);
  const [loadingStudents,  setLoadingStudents]  = useState(true);
  const [studentsError,    setStudentsError]    = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/reports/students")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        setStudents(await res.json());
      })
      .catch(() => setStudentsError("Não foi possível carregar a lista de alunos."))
      .finally(() => setLoadingStudents(false));
  }, []);

  async function buscarPorEmail(targetEmail: string) {
    const trimmed = targetEmail.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setSessions(null);
    setSelected(null);
    try {
      const res = await apiFetch(`/reports/by-email/${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSelected(data.student);
      setSessions(data.sessions);
    } catch {
      setError("Não foi possível buscar o relatório. Confira o e-mail do aluno.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    buscarPorEmail(email);
  }

  function handleSelectStudent(student: ApiStudent) {
    setEmail(student.email);
    buscarPorEmail(student.email);
  }

  const totalPontos   = sessions?.reduce((acc, s) => acc + s.score, 0) ?? 0;
  const partidas      = sessions?.length ?? 0;
  const questoesFeitas = sessions?.reduce((acc, s) => acc + s.totalQ, 0) ?? 0;
  const acertos       = sessions?.reduce((acc, s) => acc + s.correctQ, 0) ?? 0;

  const stats = [
    { label: "Total de pontos",  value: totalPontos },
    { label: "Partidas jogadas", value: partidas },
    { label: "Questões feitas",  value: questoesFeitas },
    { label: "Acertos",          value: acertos },
  ];

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-2xl px-6 py-8 relative z-10 flex-1">
        <button
          className="text-red-primary text-sm sm:text-base font-semibold font-gugi pb-4 block bg-transparent border-none cursor-pointer"
          onClick={() => navigate("/professor")}
        >
          &lt; Voltar
        </button>

        <h1 className="font-gugi text-3xl sm:text-4xl text-gray-900 mb-2 text-center">Desempenho</h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
          Busque pelo e-mail do aluno para ver o histórico de partidas.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="🔍 E-mail do aluno"
            className="flex-1 py-3 px-3 border border-gray-300 rounded-lg text-sm sm:text-base outline-none focus:border-red-primary transition-colors box-border"
          />
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="px-5 py-3 bg-red-primary text-white font-semibold text-sm sm:text-base rounded-lg font-gugi border-none cursor-pointer disabled:opacity-60"
          >
            {loading ? "Buscando…" : "Buscar"}
          </button>
        </form>

        {error && <p className="text-red-primary text-sm text-center mb-4">{error}</p>}

        {!sessions && !loading && (
          <>
            <h2 className="font-gugi text-xl sm:text-2xl text-gray-900 mb-3">Alunos recentes</h2>
            {loadingStudents && (
              <p className="font-gugi text-red-primary text-center">Carregando alunos…</p>
            )}
            {studentsError && <p className="text-red-primary text-sm text-center mb-4">{studentsError}</p>}
            {!loadingStudents && !studentsError && students.length === 0 && (
              <p className="text-gray-500 text-sm text-center">Nenhum aluno cadastrado ainda.</p>
            )}
            <div className="flex flex-col gap-2.5">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectStudent(s)}
                  className="bg-red-bg rounded-2xl px-4 py-3 shadow-sm flex flex-wrap items-center gap-x-4 gap-y-1 text-left border-none cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="font-gugi text-sm text-gray-900">{s.name}</span>
                  <span className="text-xs text-gray-500">{s.email}</span>
                  <span className="text-xs text-gray-600 ml-auto">
                    {s.totalSessions ?? 0} partida{(s.totalSessions ?? 0) === 1 ? "" : "s"}
                  </span>
                  <span className="font-gugi text-sm text-red-primary">{s.totalScore ?? 0} pts</span>
                </button>
              ))}
            </div>
          </>
        )}

        {sessions && (
          <>
            {selected && (
              <h2 className="font-gugi text-xl sm:text-2xl text-gray-900 mb-3">
                {selected.name} <span className="text-gray-400 text-sm font-sans">({selected.email})</span>
              </h2>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-red-bg rounded-2xl p-4 text-center shadow-sm">
                  <p className="text-[11px] sm:text-xs text-gray-500 m-0 mb-1">{s.label}</p>
                  <p className="font-gugi text-xl sm:text-2xl text-red-primary m-0">{s.value}</p>
                </div>
              ))}
            </div>

            {sessions.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">Esse aluno ainda não jogou nenhuma partida.</p>
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
