import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ModuleSelectPage from "./pages/ModuleSelectPage";
import GamePage from "./pages/GamePage";


const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  if (response.status === 401) {
    window.dispatchEvent(new CustomEvent("auth:expired"));
  }
  return response;
};

function RotaProtegida({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/" replace />;
}


function AuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleExpired() {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      navigate("/", { replace: true });
    }

    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthGuard />

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}