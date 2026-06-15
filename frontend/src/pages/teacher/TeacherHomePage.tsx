import React from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../../components/shared/DecorativeDots";
import WaveFooter from "../../components/shared/WaveFooter";

export default function TeacherHomePage() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-sm sm:max-w-md px-6 py-8 relative z-10">
        <h1 className="font-gugi text-4xl sm:text-5xl text-red-primary mb-1 text-center">LabQuiz</h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-8">Tela do professor</p>

        <div className="flex flex-col gap-3.5">
          <button
            className="w-full py-3.5 sm:py-4 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors"
            onClick={() => navigate("/professor/adicionar")}
          >
            Adicionar questão
          </button>

          <button
            className="w-full py-3.5 sm:py-4 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors"
            onClick={() => navigate("/professor/questoes")}
          >
            Gerenciar questões
          </button>

          <button
            className="w-full py-3.5 sm:py-4 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors"
            onClick={() => navigate("/professor/desempenho")}
          >
            Desempenho
          </button>

          <button
            className="w-full py-3.5 sm:py-4 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors"
            onClick={() => navigate("/professor/alunos")}
          >
            Gerenciar alunos
          </button>

          <button
            className="w-full py-3.5 sm:py-4 bg-red-primary border-none rounded-xl text-sm sm:text-base font-semibold text-white cursor-pointer text-center font-gugi hover:opacity-90 transition-opacity"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </main>

      <WaveFooter />
    </div>
  );
}
