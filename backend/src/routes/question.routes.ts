typescript
import { Router } from 'express'
import { listarQuestoes, criarQuestao, atualizarQuestao, deletarQuestao } from '../controllers/question.controller'
import { autenticar } from '../middlewares/auth.middleware'
import { apenasProfessor } from '../middlewares/role.middleware'

const router = Router()

/**
 * @swagger
 * /questions:
 * get:
 * summary: Lista todas as questões (CRUD)
 * tags: [Questions]
 * responses:
 * 200:
 * description: Lista de questões
 * 500:
 * description: Erro interno do servidor
 * post:
 * summary: Cria uma nova questão (CRUD)
 * tags: [Questions]
 * responses:
 * 201:
 * description: Questão criada
 * 500:
 * description: Erro interno do servidor
 */
router.get('/', autenticar, listarQuestoes)
router.post('/', autenticar, apenasProfessor, criarQuestao)

/**
 * @swagger
 * /questions/{id}:
 * put:
 * summary: Atualiza uma questão existente (CRUD)
 * tags: [Questions]
 * responses:
 * 200:
 * description: Questão atualizada
 * 500:
 * description: Erro interno do servidor
 * delete:
 * summary: Exclui uma questão (CRUD)
 * tags: [Questions]
 * responses:
 * 200:
 * description: Questão deletada
 * 500:
 * description: Erro interno do servidor
 */
router.put('/:id', autenticar, apenasProfessor, atualizarQuestao)
router.delete('/:id', autenticar, apenasProfessor, deletarQuestao)

export default router
