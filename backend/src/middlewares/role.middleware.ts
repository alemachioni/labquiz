typescript
import { Request, Response, NextFunction } from 'express'

export const apenasProfesor = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.userRole !== 'TEACHER') {
    return res.status(403).json({ erro: 'Acesso restrito ao professor' })
  }
  next()
}
