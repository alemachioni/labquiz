import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ScoreBoard from "../../src/components/game/ScoreBoard"

describe("ScoreBoard", () => {

  it("exibe questão atual e total", () => {
    render(<ScoreBoard score={0} currentQuestion={2} totalQuestions={10} />)

    expect(screen.getByText("Questão 2 / 10")).toBeTruthy()
  })

  it("exibe pontuação", () => {
    render(<ScoreBoard score={30} currentQuestion={1} totalQuestions={5} />)

    expect(screen.getByText("Pontuação: 30")).toBeTruthy()
  })

})