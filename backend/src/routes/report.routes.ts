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
 * /reports/students:
 * get:
 * summary: Lista alunos relevantes (mais recentes) para o professor
 * tags: [Reports]
 * responses:
 * 200:
 * description: Lista de alunos com resumo de desempenho
 * 500:
 * description: Erro interno do servidor
 */
router.get('/students', autenticar, apenasProfessor, async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true }
    })

    const resumo = await Promise.all(students.map(async (student) => {
      const [ultima, agregado] = await Promise.all([
        prisma.gameSession.findFirst({
          where: { studentId: student.id },
          orderBy: { playedAt: 'desc' }
        }),
        prisma.gameSession.aggregate({
          where: { studentId: student.id },
          _count: { _all: true },
          _sum: { score: true, totalQ: true, correctQ: true }
        })
      ])
      return {
        id: student.id,
        name: student.name,
        email: student.email,
        lastPlayedAt: ultima?.playedAt ?? null,
        totalSessions: agregado._count._all,
        totalScore: agregado._sum.score ?? 0,
        totalQ: agregado._sum.totalQ ?? 0,
        correctQ: agregado._sum.correctQ ?? 0,
      }
    }))

    resumo.sort((a, b) => {
      if (!a.lastPlayedAt && !b.lastPlayedAt) return 0
      if (!a.lastPlayedAt) return 1
      if (!b.lastPlayedAt) return -1
      return new Date(b.lastPlayedAt).getTime() - new Date(a.lastPlayedAt).getTime()
    })

    return res.json(resumo.slice(0, 10))
  } catch (error) {
    console.error("Erro ao listar alunos:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

/**
 * @swagger
 * /reports/by-email/{email}:
 * get:
 * summary: Busca o relatório de desempenho de um estudante pelo e-mail
 * tags: [Reports]
 * parameters:
 * - in: path
 * name: email
 * required: true
 * schema:
 * type: string
 * description: E-mail do estudante
 * responses:
 * 200:
 * description: Dados do relatório retornados com sucesso
 * 404:
 * description: Aluno não encontrado
 * 500:
 * description: Erro interno do servidor
 */
router.get('/by-email/:email', autenticar, apenasProfessor, async (req, res) => {
  try {
    const email = req.params.email as string
    const student = await prisma.user.findUnique({ where: { email } })
    if (!student || student.role !== 'STUDENT') {
      return res.status(404).json({ erro: 'Aluno não encontrado' })
    }
    const sessoes = await prisma.gameSession.findMany({
      where: { studentId: student.id },
      orderBy: { playedAt: 'desc' }
    })
    return res.json({
      student: { id: student.id, name: student.name, email: student.email },
      sessions: sessoes
    })
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
