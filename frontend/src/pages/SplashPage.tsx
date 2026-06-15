import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DecorativeDots from "../components/shared/DecorativeDots";
import WaveFooter from "../components/shared/WaveFooter";

export default function SplashPage() {
  const navigate = useNavigate();

  function handleStart() {
    const token = localStorage.getItem("token");
    navigate(token ? "/modulos" : "/login");
  }

  return (
    <div
      className="min-h-dvh bg-white flex flex-col items-center font-sans relative overflow-x-hidden cursor-pointer"
      onClick={handleStart}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleStart(); }}
    >
      <DecorativeDots />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 text-center px-6 flex-1 flex flex-col items-center justify-center"
      >
        <h1 className="font-gugi text-6xl sm:text-7xl text-gray-900 m-0">
          Lab<span className="text-red-primary">Q</span>uiz
        </h1>
        <motion.p
          animate={{ opacity: [1, 0.45, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-gugi text-base sm:text-lg text-gray-800 mt-4 underline underline-offset-4"
        >
          Toque aqui para começar
        </motion.p>
      </motion.main>

      <WaveFooter />
    </div>
  );
}
