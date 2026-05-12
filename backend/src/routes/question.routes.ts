import { Router } from 'express'
import { listarQuestoes, criarQuestao, atualizarQuestao, deletarQuestao } from '../controllers/question.controller'
import { autenticar } from '../middlewares/auth.middleware'
import { apenasProfessor } from '../middlewares/role.middleware'

const router = Router()

router.get('/', autenticar, listarQuestoes)
router.post('/', autenticar, apenasProfessor, criarQuestao)
router.put('/:id', autenticar, apenasProfessor, atualizarQuestao)
router.delete('/:id', autenticar, apenasProfessor, deletarQuestao)

export default router
