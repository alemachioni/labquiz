import React from "react";
import logoutIcon from "../../assets/logout_icon.png";
import etecLogo   from "../../assets/etec_logo.png";

export type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
  onPlayAgain: () => void;
};

function getMessage(percentage: number): string {
  if (percentage === 100) return "Perfeito! Você arrasou!";
  if (percentage >= 80)   return "Excelente! Continue assim!";
  if (percentage >= 60)   return "Bom trabalho! Quase lá!";
  if (percentage >= 40)   return "Continue praticando!";
  if (percentage >= 20)   return "Não desista! Cada tentativa vale";
  return "Continue tentando! Com dedicação você chega lá!";
}

export default function ResultScreen({
  score,
  totalQuestions,
  correctAnswers,
  onRestart,
  onPlayAgain,
}: ResultScreenProps) {
  const percentage   = Math.round((correctAnswers / totalQuestions) * 100);
  const wrongAnswers = totalQuestions - correctAnswers;
  const message      = getMessage(percentage);

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center font-sans relative overflow-x-hidden px-4 pt-5 box-border">

      {/* Decorative circles */}
      {[
        { w: 64,  h: 64,  top: "12%", left:  "4%"  },
        { w: 22,  h: 22,  top: "30%", left:  "10%" },
        { w: 14,  h: 14,  top: "55%", left:  "3%"  },
        { w: 56,  h: 56,  top: "10%", right: "5%"  },
        { w: 16,  h: 16,  top: "40%", right: "3%"  },
        { w: 10,  h: 10,  top: "62%", right: "8%"  },
      ].map((c, i) => (
        <div key={i} aria-hidden="true" style={{
          position:        "fixed",
          width:           c.w,
          height:          c.h,
          top:             c.top,
          left:            c.left,
          right:           c.right,
          borderRadius:    "50%",
          backgroundColor: "#c6273f",
          pointerEvents:   "none",
        }} />
      ))}

      {/* Result card */}
      <div className="w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)] bg-red-bg relative z-10">

        {/* Red top */}
        <div className="bg-red-primary px-6 py-6 sm:py-8 text-center">
          <p className="font-gugi text-sm text-white/85 m-0 mb-2 underline">Resultado final:</p>
          <p className="font-gugi text-5xl sm:text-6xl font-bold text-white m-0 mb-1.5 leading-none">
            {percentage}%
          </p>
          <p className="font-gugi text-lg sm:text-xl text-white m-0 leading-snug">{message}</p>
        </div>

        {/* Score */}
        <div className="px-6 py-5 text-center bg-red-bg">
          <p className="font-gugi text-lg sm:text-xl text-gray-900 m-0">
            {score} pontos nessa rodada
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Stats */}
        <div className="flex bg-red-bg">
          <div className="flex-1 flex flex-col items-center py-3.5">
            <span className="font-gugi text-2xl sm:text-3xl font-bold text-gray-900">{correctAnswers}</span>
            <span className="text-xs sm:text-sm text-gray-500 mt-0.5">acertos</span>
          </div>
          <div className="w-px bg-gray-200 self-stretch" />
          <div className="flex-1 flex flex-col items-center py-3.5">
            <span className="font-gugi text-2xl sm:text-3xl font-bold text-gray-900">{wrongAnswers}</span>
            <span className="text-xs sm:text-sm text-gray-500 mt-0.5">erros</span>
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Buttons */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-red-bg gap-3">
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#e0d8d8] border-none rounded-xl cursor-pointer"
          >
            <img src={logoutIcon} alt="" className="w-5 sm:w-6 h-5 sm:h-6 object-contain" />
            <span className="font-gugi text-sm sm:text-base text-gray-900">Menu</span>
          </button>

          <button
            onClick={onPlayAgain}
            className="px-5 py-2.5 bg-red-primary text-white border-none rounded-xl cursor-pointer"
          >
            <span className="font-gugi text-sm sm:text-base">Jogar novamente &gt;</span>
          </button>
        </div>

      </div>

      {/* Wave footer */}
      <div
        className="mt-auto relative z-10"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <svg viewBox="0 0 900 80" preserveAspectRatio="none" className="block w-full h-[70px]" aria-hidden="true">
          <path d="M0,60 C200,0 400,80 600,30 C750,0 850,50 900,40 L900,80 L0,80 Z" fill="#c6273f" />
        </svg>
        <div className="bg-red-primary text-center pb-5">
          <img src={etecLogo} alt="Etec — Escola Técnica Estadual" className="h-11 object-contain" />
        </div>
      </div>

    </div>
  );
}
