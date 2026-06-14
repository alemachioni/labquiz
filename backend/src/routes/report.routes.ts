import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { autenticar } from '../middlewares/auth.middleware.js'
import { apenasProfessor } from '../middlewares/role.middleware.js'

const router = Router()
const prisma = new PrismaClient()

/**
 * @swagger
 * /reports/me:
 * get:
 * summary: Busca o relatório de desempenho do aluno autenticado
 * tags: [Reports]
 * responses:
 * 200:
 * description: Dados do relatório retornados com sucesso
 * 403:
 * description: Acesso restrito ao aluno
 * 500:
 * description: Erro interno do servidor
 */
router.get('/me', autenticar, async (req, res) => {
  try {
    if (req.body.userRole !== 'STUDENT') {
      return res.status(403).json({ erro: 'Acesso restrito ao aluno' })
    }
    const studentId = req.body.userId as string
    const sessoes = await prisma.gameSession.findMany({
      where: { studentId },
      orderBy: { playedAt: 'desc' }
    })
    return res.json(sessoes)
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

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
    const studentId = req.params.studentId as string
    const sessoes = await prisma.gameSession.findMany({
      where: { studentId },
      orderBy: { playedAt: 'desc' }
    })
    return res.json(sessoes)
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})
export default router
