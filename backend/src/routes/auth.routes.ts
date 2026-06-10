import { Router } from 'express'
import { registrar, login } from '../controllers/auth.controller.js'

const router = Router()

/**
 * @swagger
 * /auth/register:
 * post:
 * summary: Registra un novo usuário
 * tags: [Auth]
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 500:
 * description: Erro interno do servidor
 */
router.post('/register', registrar)

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
