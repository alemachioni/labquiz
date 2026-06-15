import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const listarAlunos = async (req: Request, res: Response) => {
  try {
    const alunos = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' }
    })
    return res.json(alunos)
  } catch (error) {
    console.error("Erro ao listar alunos:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const criarAluno = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios' })
    }

    const existe = await prisma.user.findUnique({ where: { email } })
    if (existe) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' })
    }

    const senhaHash = await bcrypt.hash(password, 10)
    const aluno = await prisma.user.create({
      data: { name, email, password: senhaHash, role: 'STUDENT' }
    })

    return res.status(201).json({ id: aluno.id, name: aluno.name, email: aluno.email })
  } catch (error) {
    console.error("Erro ao criar aluno:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const atualizarAluno = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const { name, email, password } = req.body

    const aluno = await prisma.user.findUnique({ where: { id } })
    if (!aluno || aluno.role !== 'STUDENT') {
      return res.status(404).json({ erro: 'Aluno não encontrado' })
    }

    if (email && email !== aluno.email) {
      const existe = await prisma.user.findUnique({ where: { email } })
      if (existe) {
        return res.status(400).json({ erro: 'E-mail já cadastrado' })
      }
    }

    const data: { name?: string; email?: string; password?: string } = {}
    if (name) data.name = name
    if (email) data.email = email
    if (password) data.password = await bcrypt.hash(password, 10)

    const atualizado = await prisma.user.update({ where: { id }, data })
    return res.json({ id: atualizado.id, name: atualizado.name, email: atualizado.email })
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export const deletarAluno = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const aluno = await prisma.user.findUnique({ where: { id } })
    if (!aluno || aluno.role !== 'STUDENT') {
      return res.status(404).json({ erro: 'Aluno não encontrado' })
    }

    await prisma.gameSession.deleteMany({ where: { studentId: id } })
    await prisma.user.delete({ where: { id } })
    return res.status(204).send()
  } catch (error) {
    console.error("Erro ao excluir aluno:", error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
