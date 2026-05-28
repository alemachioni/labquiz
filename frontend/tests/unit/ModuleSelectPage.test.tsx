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

    localStorage.setItem(
      "usuario",
      JSON.stringify({ name: "Bruno" })
    );
  });

  it("renderiza os módulos e botão sair", () => {
    render(<ModuleSelectPage />);

    expect(screen.getByText(/vidrarias/i)).toBeInTheDocument();
    expect(screen.getByText(/materiais metálicos/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /sair/i })).toBeInTheDocument();
  });

  it("abre modal de dificuldade ao clicar em um módulo", () => {
    render(<ModuleSelectPage />);

    const buttons = screen.getAllByRole("button");

    const vidrariasButton = buttons.find((btn) =>
      btn.textContent?.toLowerCase().includes("vidrarias")
    );

    expect(vidrariasButton).toBeTruthy();

    fireEvent.click(vidrariasButton!);

    expect(
      screen.getByText(/escolha a dificuldade/i)
    ).toBeInTheDocument();
  });

  it("limpa localStorage ao clicar em sair", () => {
    const removeSpy = vi.spyOn(Storage.prototype, "removeItem");

    render(<ModuleSelectPage />);

    const logoutButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.trim() === "Sair");

    expect(logoutButton).toBeTruthy();

    fireEvent.click(logoutButton!);

    expect(removeSpy).toHaveBeenCalledWith("token");
    expect(removeSpy).toHaveBeenCalledWith("usuario");

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});