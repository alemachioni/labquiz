import { Router } from 'express'
import { login } from '../controllers/auth.controller.js'

const router = Router()

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Autentica um usuário e retorna um token
 * tags: [Auth]
 * responses:
 * 200:
 * description: Login efetuado com sucesso
 * 500:
 * description: Erro interno do servidor
 */
router.post('/login', login)

export default router
