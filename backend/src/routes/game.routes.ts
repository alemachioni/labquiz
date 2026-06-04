import { Router } from 'express'
import { buscarQuestoes, salvarResposta } from '../controllers/game.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/session', autenticar, buscarQuestoes)
router.post('/answer', autenticar, salvarResposta)

export default router
