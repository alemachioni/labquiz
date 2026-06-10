typescript
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { autenticar } from '../middlewares/auth.middleware'
import { apenasProfessor } from '../middlewares/role.middleware'

const router = Router()
const prisma = new PrismaClient()

/**
 * @swagger
 * /reports/{studentId}:
 * get:
 * summary: Busca o relatório de desempenho de um estudante específico
 * tags: [Reports]
 * parameters:
 * - in: path
 * name: studentId
 * required: true
 * schema:
 * type: string
 * description: ID do estudante
 * responses:
 * 200:
 * description: Dados do relatório retornados com sucesso
 * 500:
 * description: Erro interno do servidor
 */
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
