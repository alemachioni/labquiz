typescript
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const listarQuestoes = async (req: Request, res: Response) => {
  try {
    const questoes = await prisma.question.findMany({
      include: { options: true },
      orderBy: { category: 'asc' }
    })
    return res.json(questoes)
    
  } catch (error) {
    console.error("Erro ao criar questão:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const criarQuestao = async (req: Request, res: Response) => {
  try {
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
    
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const atualizarQuestao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { prompt, imageUrl, difficulty } = req.body

    const questao = await prisma.question.update({
      where: { id },
      data: { prompt, imageUrl, difficulty }
    })

    return res.json(questao)
    
  } catch (error) {
    console.error("Erro ao atualizar questão:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deletarQuestao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await prisma.option.deleteMany({ where: { questionId: id } })
    await prisma.question.delete({ where: { id } })

    return res.status(204).send()
    
  } catch (error) {
    console.error("Erro ao deletar questão:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
