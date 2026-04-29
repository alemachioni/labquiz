typescript
import { Request, Response, NextFunction } from 'express'

export const apenasProfessor = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.userRole !== 'TEACHER') {
    return res.status(403).json({ erro: 'Acesso restrito ao professor' })
  }
  next()
}
