import { Request, Response } from 'express'
import { PrismaClient, Category } from '@prisma/client'

const prisma = new PrismaClient()

export const buscarQuestoes = async (req: Request, res: Response) => {
  try {
    const { category, difficulty } = req.query

    const questoes = await prisma.question.findMany({
      where: {
        ...(category ? { category: category as Category } : {}),
        ...(difficulty ? { difficulty: Number(difficulty) } : {})
      },
      // Alterado para select para incluir explicitamente o campo hint conforme a instrução
      select: {
        id: true,
        prompt: true,
        category: true,
        difficulty: true,
        hint: true,        // <-- Incluído aqui
        imageUrl: true,
        options: true      // <-- Traz a relação com as alternativas
      },
      take: 10
    })

    // Embaralha as questões antes de enviar
    const embaralhadas = questoes.sort(() => Math.random() - 0.5)

    return res.json(embaralhadas)
  } catch (error) {
    console.error("Erro ao buscar questões:", error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const salvarResposta = async (req: Request, res: Response) => {
  try {
    // TODO: salvar por questão quando o schema suportar
    // const { questionId, selectedOptionId } = req.body
    const { userId, score, totalQ, correctQ, category, difficulty } = req.body

    const sessao = await prisma.gameSession.create({
      data: {
        studentId: userId,
        score,
        totalQ,
        correctQ,
        category: category || null,
        difficulty: difficulty || null
      }
    })

    return res.status(201).json(sessao)
  } catch (error) {
    console.error("Erro ao salvar resposta:", error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
