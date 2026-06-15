import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import ModuleSelectPage from "./pages/ModuleSelectPage";
import GamePage from "./pages/GamePage";
import EstatisticasPage from "./pages/EstatisticasPage";
import TeacherHomePage from "./pages/teacher/TeacherHomePage";
import AddQuestionPage from "./pages/teacher/AddQuestionPage";
import ManageQuestionsPage from "./pages/teacher/ManageQuestionsPage";
import TeacherReportPage from "./pages/teacher/TeacherReportPage";
import ManageStudentsPage from "./pages/teacher/ManageStudentsPage";


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
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function RotaProfessor({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}");
  return usuario.role === "TEACHER" ? <>{children}</> : <Navigate to="/modulos" replace />;
}


function AuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleExpired() {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      navigate("/login", { replace: true });
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
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route
          path="/estatisticas"
          element={
            <RotaProtegida>
              <EstatisticasPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/professor"
          element={
            <RotaProfessor>
              <TeacherHomePage />
            </RotaProfessor>
          }
        />
        <Route
          path="/professor/adicionar"
          element={
            <RotaProfessor>
              <AddQuestionPage />
            </RotaProfessor>
          }
        />
        <Route
          path="/professor/questoes"
          element={
            <RotaProfessor>
              <ManageQuestionsPage />
            </RotaProfessor>
          }
        />
        <Route
          path="/professor/desempenho"
          element={
            <RotaProfessor>
              <TeacherReportPage />
            </RotaProfessor>
          }
        />
        <Route
          path="/professor/alunos"
          element={
            <RotaProfessor>
              <ManageStudentsPage />
            </RotaProfessor>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
