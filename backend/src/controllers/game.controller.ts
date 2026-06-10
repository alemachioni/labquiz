typescript
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const buscarQuestoes = async (req: Request, res: Response) => {
  try {
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

    // Exemplo de como expor o hint após a migration do Gustavo:
    // const questions = await prisma.question.findMany({ select: { id: true, text: true, hint: true } }); 
    // res.status(200).json(questions);
    
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const salvarResposta = async (req: Request, res: Response) => {
  try {
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
    
  } catch (error) {
    console.error("Erro ao responder questão:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

