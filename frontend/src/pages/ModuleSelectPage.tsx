import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorativeDots from "../components/shared/DecorativeDots";
import WaveFooter from "../components/shared/WaveFooter";

type Modulo = {
  id: string;
  titulo: string;
  descricao: string;
  icon: string;
  category: string;
};

const MODULOS: Modulo[] = [
  { id: "vidraria",  titulo: "Vidrarias",            descricao: "Béqueres, buretas, pipetas e o uso correto de cada uma.",               icon: "🧪", category: "VIDRARIA" },
  { id: "metalico",  titulo: "Materiais Metálicos",   descricao: "Identificação e uso de equipamentos metálicos no laboratório.",          icon: "⚙️", category: "METALICO" },
  { id: "plastico",  titulo: "Materiais Plásticos",   descricao: "Tubos, pipetas plásticas e recipientes descartáveis.",                  icon: "🧴", category: "PLASTICO" },
  { id: "porcelana", titulo: "Porcelanas",             descricao: "Cadinhos, almofarizes e demais utensílios de porcelana.",               icon: "🏺", category: "PORCELANA" },
  { id: "sistema",   titulo: "Sistemas e Montagens",  descricao: "Aparatos completos: destilação, refluxo e filtragem.",                  icon: "🔬", category: "SISTEMA" },
];

type Dificuldade = "FACIL" | "MEDIO" | "DIFICIL" | "ALEATORIO";

const DIFICULDADES: { id: Dificuldade; label: string }[] = [
  { id: "FACIL",     label: "Fácil"     },
  { id: "MEDIO",     label: "Médio"     },
  { id: "DIFICIL",   label: "Difícil"   },
  { id: "ALEATORIO", label: "Aleatório" },
];

const ACTIVE_CATEGORY = MODULOS[0];
type Screen = "main" | "difficulty";

export default function ModuleSelectPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("main");

  const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  function handleIniciar(dificuldade: string) {
    let resolved = dificuldade;
    if (dificuldade === "ALEATORIO") {
      const opcoes = ["FACIL", "MEDIO", "DIFICIL"] as const;
      // eslint-disable-next-line react-hooks/purity
      const idx = Math.floor(Math.random() * opcoes.length);
      resolved = opcoes[idx];
    }
    navigate(`/quiz?category=${ACTIVE_CATEGORY.category}&difficulty=${resolved}`);
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center font-sans relative overflow-x-hidden">
      <DecorativeDots />

      <main className="w-full max-w-sm sm:max-w-md px-6 py-8 relative z-10">

        <h1 className="font-gugi text-4xl sm:text-5xl text-red-primary mb-2 text-center">LabQuiz</h1>

        {screen === "main" ? (
          <>
            <p className="text-center text-gray-500 text-sm sm:text-base mb-8">Selecione uma opção</p>

            {usuario.name && (
              <p className="text-center text-gray-500 text-sm mb-2">
                Olá, <strong>{usuario.name}</strong>!
              </p>
            )}

            <div className="flex flex-col gap-3.5">
              <button
                className="w-full py-3.5 sm:py-4 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors"
                onClick={() => setScreen("difficulty")}
              >
                Iniciar jogo
              </button>

              <button className="w-full py-3.5 sm:py-4 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors">
                Estatísticas
              </button>

              <button
                className="w-full py-3.5 sm:py-4 bg-red-primary border-none rounded-xl text-sm sm:text-base font-semibold text-white cursor-pointer text-center font-gugi hover:opacity-90 transition-opacity"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="text-red-primary text-sm sm:text-base font-semibold font-gugi pb-4 block bg-transparent border-none cursor-pointer"
              onClick={() => setScreen("main")}
            >
              &lt; Voltar
            </button>

            <h2 className="font-gugi text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Modos</h2>
            <p className="text-center text-gray-500 text-sm sm:text-base mb-8">Selecione um modo de preferência</p>

            <div className="grid grid-cols-2 gap-3.5">
              {DIFICULDADES.map((d) => (
                <button
                  key={d.id}
                  className="py-5 sm:py-6 bg-white border-2 border-gray-800 rounded-xl text-sm sm:text-base font-semibold text-gray-900 cursor-pointer text-center hover:bg-gray-50 transition-colors"
                  onClick={() => handleIniciar(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      <WaveFooter />
    </div>
  );
}
