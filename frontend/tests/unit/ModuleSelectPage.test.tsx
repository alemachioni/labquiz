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
    expect(screen.getByText(/escolha um módulo/i)).toBeInTheDocument();
    expect(screen.getByText(/vidrarias/i)).toBeInTheDocument();
    expect(screen.getByText(/materiais metálicos/i)).toBeInTheDocument();
  });

  it("abre o modal ao clicar em um módulo", () => {
    render(<ModuleSelectPage />);

    const buttons = screen.getAllByRole("button", {
      name: /vidrarias/i,
    });

    const vidrariasButton = buttons[0];

    fireEvent.click(vidrariasButton);

    expect(
      screen.getByText(/escolha a dificuldade/i)
    ).toBeInTheDocument();
  });

  it("limpa localStorage ao clicar em sair e navega para home", () => {
    const removeSpy = vi.spyOn(Storage.prototype, "removeItem");

    render(<ModuleSelectPage />);

    const sairButtons = screen.getAllByRole("button", {
      name: /sair/i,
    });

    fireEvent.click(sairButtons[0]);

    expect(removeSpy).toHaveBeenCalledWith("token");
    expect(removeSpy).toHaveBeenCalledWith("usuario");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});