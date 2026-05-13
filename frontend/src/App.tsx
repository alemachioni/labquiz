import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ModuleSelectPage from "./pages/ModuleSelectPage";
import GamePage from "./pages/GamePage";

function RotaProtegida({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/modulos"
          element={
            <RotaProtegida>
              <ModuleSelectPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/quiz"
          element={
            <RotaProtegida>
              <GamePage />
            </RotaProtegida>
          }
        />
        {/* Redireciona qualquer rota desconhecida para o login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
