typescript
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const listarQuestoes = async (req: Request, res: Response) => {
  const questoes = await prisma.question.findMany({
    include: { options: true },
    orderBy: { category: 'asc' }
  })
  return res.json(questoes)
}

export const criarQuestao = async (req: Request, res: Response) => {
  const { type, difficulty, category, prompt, imageUrl, options, userId } = req.body

  if (!prompt || !options || options.length < 2) {
    return res.status(400).json({ erro: 'Enunciado e ao menos 2 alternativas são obrigatórios' })
  }

  const questao = await prisma.question.create({
    data: {
      type,
      difficulty,
      category,
      prompt,
      imageUrl: imageUrl || null,
      createdById: userId,
      options: {
        create: options
      }
    },
    include: { options: true }
  })

  return res.status(201).json(questao)
}

export const atualizarQuestao = async (req: Request, res: Response) => {
  const { id } = req.params
  const { prompt, imageUrl, difficulty } = req.body

  const questao = await prisma.question.update({
    where: { id },
    data: { prompt, imageUrl, difficulty }
  })

  return res.json(questao)
}

export const deletarQuestao = async (req: Request, res: Response) => {
  const { id } = req.params

  await prisma.option.deleteMany({ where: { questionId: id } })
  await prisma.question.delete({ where: { id } })

  return res.status(204).send()
}
