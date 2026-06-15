import { Router } from 'express'
import { listarAlunos, criarAluno, atualizarAluno, deletarAluno } from '../controllers/student.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'
import { apenasProfessor } from '../middlewares/role.middleware.js'

const router = Router()

/**
 * @swagger
 * /students:
 * get:
 * summary: Lista todos os alunos (CRUD)
 * tags: [Students]
 * responses:
 * 200:
 * description: Lista de alunos
 * 500:
 * description: Erro interno do servidor
 * post:
 * summary: Cria um novo aluno (CRUD)
 * tags: [Students]
 * responses:
 * 201:
 * description: Aluno criado
 * 400:
 * description: Dados inválidos ou e-mail já cadastrado
 * 500:
 * description: Erro interno do servidor
 */
router.get('/', autenticar, apenasProfessor, listarAlunos)
router.post('/', autenticar, apenasProfessor, criarAluno)

/**
 * @swagger
 * /students/{id}:
 * put:
 * summary: Atualiza um aluno existente (CRUD)
 * tags: [Students]
 * responses:
 * 200:
 * description: Aluno atualizado
 * 404:
 * description: Aluno não encontrado
 * 500:
 * description: Erro interno do servidor
 * delete:
 * summary: Exclui um aluno (CRUD)
 * tags: [Students]
 * responses:
 * 204:
 * description: Aluno excluído
 * 404:
 * description: Aluno não encontrado
 * 500:
 * description: Erro interno do servidor
 */
router.put('/:id', autenticar, apenasProfessor, atualizarAluno)
router.delete('/:id', autenticar, apenasProfessor, deletarAluno)

export default router
