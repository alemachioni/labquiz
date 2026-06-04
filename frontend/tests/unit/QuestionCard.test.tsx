import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuestionCard from "../../src/components/game/QuestionCard";

describe("QuestionCard", () => {
  const mockQuestion = {
    statement: "Qual vidraria é usada para medir volumes com precisão?",
    alternatives: [
      { id: "1", text: "Béquer", isCorrect: false },
      { id: "2", text: "Proveta", isCorrect: true },
      { id: "3", text: "Erlenmeyer", isCorrect: false },
    ],
  };

  const renderComponent = (onAnswer = vi.fn()) => {
    render(
      <QuestionCard
        statement={mockQuestion.statement}
        alternatives={mockQuestion.alternatives}
        onAnswer={onAnswer}
      />
    );
    return onAnswer;
  };

  const getClickableOption = (text: string) => {
    const buttons = screen.getAllByRole("button", { name: new RegExp(text, "i") });

    return buttons.find((btn) =>
      btn.className.includes("cursor-pointer")
    )!;
  };

  it("chama onAnswer quando clica em uma alternativa", () => {
    const onAnswer = renderComponent();

    const option = getClickableOption("proveta");

    fireEvent.click(option);

    expect(onAnswer).toHaveBeenCalledWith("2", true);
  });

  it("não permite clicar duas vezes", () => {
    const onAnswer = renderComponent();

    const option = getClickableOption("proveta");

    fireEvent.click(option);
    fireEvent.click(option);

    expect(onAnswer).toHaveBeenCalledTimes(1);
  });
});