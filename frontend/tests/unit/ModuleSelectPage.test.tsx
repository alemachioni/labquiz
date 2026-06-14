import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ModuleSelectPage from "../../src/pages/ModuleSelectPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ModuleSelectPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    localStorage.setItem(
      "usuario",
      JSON.stringify({ name: "Bruno" })
    );
  });

  it("renderiza a página inicial corretamente", () => {
    render(<ModuleSelectPage />);

    expect(screen.getByText(/labquiz/i)).toBeInTheDocument();
    expect(screen.getByText(/selecione uma opção/i)).toBeInTheDocument();
    expect(screen.getByText(/iniciar jogo/i)).toBeInTheDocument();
    expect(screen.getByText(/estatísticas/i)).toBeInTheDocument();
  });

  it("abre a tela de módulos ao clicar em iniciar jogo", () => {
    render(<ModuleSelectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /iniciar jogo/i,
      })
    );

    expect(screen.getByText(/selecione um módulo/i)).toBeInTheDocument();
  });

  it("abre a tela de dificuldade ao selecionar um módulo", () => {
    render(<ModuleSelectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /iniciar jogo/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /vidrarias/i,
      })
    );

    expect(
      screen.getByText(/selecione um modo de preferência/i)
    ).toBeInTheDocument();
  });

  it("limpa localStorage ao clicar em sair e navega para home", () => {
    const removeSpy = vi.spyOn(Storage.prototype, "removeItem");

    render(<ModuleSelectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /sair/i,
      })
    );

    expect(removeSpy).toHaveBeenCalledWith("token");
    expect(removeSpy).toHaveBeenCalledWith("usuario");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});