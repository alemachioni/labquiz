import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuestionCard from "../../src/components/game/QuestionCard";

describe("QuestionCard", () => {
  const mockQuestion = {
    statement: "Qual é a capital do Brasil?",
    alternatives: [
      { id: "1", text: "São Paulo", isCorrect: false },
      { id: "2", text: "Brasília", isCorrect: true },
      { id: "3", text: "Rio de Janeiro", isCorrect: false },
    ],
  };

  it("chama onAnswer quando clica em uma alternativa", () => {
    const onAnswer = vi.fn();

    render(
      <QuestionCard
        statement={mockQuestion.statement}
        alternatives={mockQuestion.alternatives}
        onAnswer={onAnswer}
      />
    );

    const buttons = screen.getAllByRole("button", { name: /brasília/i });

    const clickable = buttons.find((btn) =>
      btn.getAttribute("style")?.includes("cursor: pointer")
    );

    fireEvent.click(clickable!);

    expect(onAnswer).toHaveBeenCalledWith("2", true);
  });

  it("não permite clicar duas vezes", () => {
    const onAnswer = vi.fn();

    render(
      <QuestionCard
        statement={mockQuestion.statement}
        alternatives={mockQuestion.alternatives}
        onAnswer={onAnswer}
      />
    );

    const buttons = screen.getAllByRole("button", { name: /brasília/i });

    const clickable = buttons.find((btn) =>
      btn.getAttribute("style")?.includes("cursor: pointer")
    );

    fireEvent.click(clickable!);
    fireEvent.click(clickable!);

    expect(onAnswer).toHaveBeenCalledTimes(1);
  });
});