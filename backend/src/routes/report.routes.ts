import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { autenticar } from '../middlewares/auth.middleware'
import { apenasProfessor } from '../middlewares/role.middleware'

const router = Router()
const prisma = new PrismaClient()

router.get('/:studentId', autenticar, apenasProfessor, async (req, res) => {
  const { studentId } = req.params

  const sessoes = await prisma.gameSession.findMany({
    where: { studentId },
    orderBy: { playedAt: 'desc' }
  })

  return res.json(sessoes)
})

export default router
