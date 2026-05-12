import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const buscarQuestoes = async (req: Request, res: Response) => {
  const { category, difficulty } = req.query

  const questoes = await prisma.question.findMany({
    where: {
      ...(category ? { category: category as string } : {}),
      ...(difficulty ? { difficulty: Number(difficulty) } : {})
    },
    include: { options: true },
    take: 10
  })

  // Embaralha as questões antes de enviar
  const embaralhadas = questoes.sort(() => Math.random() - 0.5)

  return res.json(embaralhadas)
}

export const salvarResposta = async (req: Request, res: Response) => {
  const { userId, questionId, selectedOptionId, score, totalQ, correctQ, category, difficulty } = req.body

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
}

