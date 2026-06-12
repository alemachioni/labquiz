import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const registrar = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios' })
    }

    const usuarioExiste = await prisma.user.findUnique({ where: { email } })
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' })
    }

    const senhaHash = await bcrypt.hash(password, 10)

    const usuario = await prisma.user.create({
      data: {
        name,
        email,
        password: senhaHash,
        role: role || 'STUDENT'
      }
    })

    return res.status(201).json({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role
    })
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' })
    }

  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn']
  const token = jwt.sign(
    { userId: usuario.id, role: usuario.role },
    process.env.JWT_SECRET!,
    { expiresIn }
  )

    const senhaCorreta = await bcrypt.compare(password, usuario.password)
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' })
    }

    const token = jwt.sign(
      { userId: usuario.id, role: usuario.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        role: usuario.role
      }
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
