import { Router } from 'express'
import { listarQuestoes, criarQuestao, atualizarQuestao, deletarQuestao } from '../controllers/question.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'
import { apenasProfessor } from '../middlewares/role.middleware.js'

const router = Router()

router.get('/', autenticar, listarQuestoes)
router.post('/', autenticar, apenasProfessor, criarQuestao)
router.put('/:id', autenticar, apenasProfessor, atualizarQuestao)
router.delete('/:id', autenticar, apenasProfessor, deletarQuestao)

export default router
