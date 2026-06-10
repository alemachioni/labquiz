typescript
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { autenticar } from '../middlewares/auth.middleware'
import { apenasProfessor } from '../middlewares/role.middleware'

const router = Router()
const prisma = new PrismaClient()

router.get('/:studentId', autenticar, apenasProfessor, async (req, res) => {
  try {
    const { studentId } = req.params

    const sessoes = await prisma.gameSession.findMany({
      where: { studentId },
      orderBy: { playedAt: 'desc' }
    })

    return res.json(sessoes)
    
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router
