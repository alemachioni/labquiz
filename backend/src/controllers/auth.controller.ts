import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' })
    }

    const usuario = await prisma.user.findUnique({ where: { email } })
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' })
    }

    // 2. Validação do padrão de e-mail institucional conforme a role
    if (usuario.role === 'STUDENT' && !email.endsWith('@aluno.cps.sp.gov.br')) {
      return res.status(401).json({ erro: 'Use seu e-mail institucional de aluno' })
    }
    if (usuario.role === 'TEACHER' && !email.endsWith('@cps.sp.gov.br')) {
      return res.status(401).json({ erro: 'Use seu e-mail institucional de professor' })
    }

    // 3. Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(password, usuario.password)
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' })
    }

    const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn']
    const token = jwt.sign(
      { userId: usuario.id, role: usuario.role },
      process.env.JWT_SECRET!,
      { expiresIn }
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
    console.error("Erro no login:", error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
