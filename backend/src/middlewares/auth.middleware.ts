typescript
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface TokenPayload {
  userId: string
  role: 'STUDENT' | 'TEACHER'
}

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
    req.body.userId = payload.userId
    req.body.userRole = payload.role
    next()
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}
