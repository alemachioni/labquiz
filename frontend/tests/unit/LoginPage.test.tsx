import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "../../src/pages/LoginPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renderiza o formulário de login", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText(/seu@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("exibe erro quando login falha", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({
          erro: "Credenciais inválidas",
        }),
      } as Response)
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/seu@email.com/i), {
      target: { value: "teste@email.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });

  it("redireciona para /modulos quando login funciona", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          token: "fake-token",
          usuario: {
            name: "Bruno",
          },
        }),
      } as Response)
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/seu@email.com/i), {
      target: { value: "teste@email.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/modulos");
    });

    expect(localStorage.getItem("token")).toBe("fake-token");
  });
});