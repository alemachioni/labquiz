import { Router } from 'express'
import { buscarQuestoes, salvarResposta } from '../controllers/game.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * /game/session:
 * get:
 * summary: Busca as questões para a sessão atual do jogo
 * tags: [Game]
 * responses:
 * 200:
 * description: Lista de questões retornada (inclui o campo hint)
 * 500:
 * description: Erro interno do servidor
 */
router.get('/session', autenticar, buscarQuestoes)

/**
 * @swagger
 * /game/answer:
 * post:
 * summary: Envia a resposta de uma questão para validação
 * tags: [Game]
 * responses:
 * 200:
 * description: Resposta processada com sucesso
 * 500:
 * description: Erro interno do servidor
 */
router.post('/answer', autenticar, salvarResposta)

export default router
