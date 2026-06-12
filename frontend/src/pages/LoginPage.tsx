import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../components/shared/DecorativeDots";
import WaveFooter from "../components/shared/WaveFooter";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ""}/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.erro ?? "Erro ao fazer login");
      }

      const { token, usuario } = await res.json();
      localStorage.setItem("token",   token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate(usuario.role === "TEACHER" ? "/professor" : "/modulos");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center font-sans px-4 relative overflow-x-hidden">
      <DecorativeDots />

      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] p-8 sm:p-10 w-full max-w-sm sm:max-w-md relative z-10">

        <div className="text-center mb-7">
          <h1 className="font-gugi text-4xl sm:text-5xl text-red-primary m-0">LabQuiz</h1>
          <p className="text-gray-500 mt-1.5 text-sm sm:text-base">Insira seus dados!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5">
              Digite seu usuário:
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-base text-gray-400 pointer-events-none" aria-hidden="true">✉</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full py-3 pr-3 pl-10 border border-gray-300 rounded-lg text-sm sm:text-base outline-none focus:border-red-primary transition-colors box-border"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-600 mb-1.5">
              Digite sua senha:
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-base text-gray-400 pointer-events-none" aria-hidden="true">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full py-3 pr-3 pl-10 border border-gray-300 rounded-lg text-sm sm:text-base outline-none focus:border-red-primary transition-colors box-border"
              />
            </div>
          </div>

          <div className="text-right mb-5 -mt-2">
            <span className="text-xs sm:text-sm text-red-primary cursor-pointer">Esqueci a senha</span>
          </div>

          {error && (
            <p className="text-red-primary text-sm mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-3.5 bg-red-primary text-white font-bold text-base sm:text-lg rounded-lg mt-1 font-gugi disabled:opacity-60 transition-opacity cursor-pointer"
          >
            {loading ? "Entrando…" : "Entrar >"}
          </button>
        </form>

        <p className="text-center mt-5 text-xs text-gray-400">
          Demo: <strong>aluno@labquiz.com</strong> / <strong>labquiz123</strong>
        </p>
      </div>

      <WaveFooter />
    </div>
  );
}
