typescript
import { Router } from 'express'
import { listarQuestoes, criarQuestao, atualizarQuestao, deletarQuestao } from '../controllers/question.controller'
import { autenticar } from '../middlewares/auth.middleware'
import { apenasProfesor } from '../middlewares/role.middleware'

const router = Router()

router.get('/', autenticar, listarQuestoes)
router.post('/', autenticar, apenasProfesor, criarQuestao)
router.put('/:id', autenticar, apenasProfesor, atualizarQuestao)
router.delete('/:id', autenticar, apenasProfesor, deletarQuestao)

export default router
