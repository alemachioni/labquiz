import { PrismaClient, Role, QuestionType, Category } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  // ── Usuários ────────────────────────────────────────────────────────────────
  const senhaHash = await bcrypt.hash('labquiz123', 10)

  const professor = await prisma.user.upsert({
    where: { email: 'professor@labquiz.com' },
    update: {},
    create: {
      name: 'Professor Demo',
      email: 'professor@labquiz.com',
      password: senhaHash,
      role: Role.TEACHER,
    },
  })

  await prisma.user.upsert({
    where: { email: 'aluno@labquiz.com' },
    update: {},
    create: {
      name: 'Aluno Demo',
      email: 'aluno@labquiz.com',
      password: senhaHash,
      role: Role.STUDENT,
    },
  })

  console.log('Usuários criados')

  // ── Questões ────────────────────────────────────────────────────────────────
  const questoes = [
    {
      prompt: 'Qual vidraria é utilizada para medir volumes com alta precisão em experimentos volumétricos?',
      category: Category.VIDRARIA,
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Béquer', isCorrect: false },
        { text: 'Erlenmeyer', isCorrect: false },
        { text: 'Bureta', isCorrect: true },
        { text: 'Proveta', isCorrect: false },
      ],
    },
    {
      prompt: 'Qual é a principal diferença entre um béquer e um erlenmeyer?',
      category: Category.VIDRARIA,
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'O béquer tem tampa e o erlenmeyer não.', isCorrect: false },
        { text: 'O erlenmeyer tem gargalo estreito, reduzindo evaporação e respingos.', isCorrect: true },
        { text: 'O béquer é usado apenas para sólidos.', isCorrect: false },
        { text: 'O erlenmeyer não pode ser aquecido.', isCorrect: false },
      ],
    },
    {
      prompt: 'Para transferir um líquido de um recipiente largo para um de gargalo estreito sem derramar, qual vidraria auxiliar é usada?',
      category: Category.VIDRARIA,
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Pipeta', isCorrect: false },
        { text: 'Funil', isCorrect: true },
        { text: 'Bastão de vidro', isCorrect: false },
        { text: 'Condensador', isCorrect: false },
      ],
    },
    {
      prompt: 'Qual vidraria é utilizada especificamente para preparar soluções de concentração exata?',
      category: Category.VIDRARIA,
      difficulty: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Proveta', isCorrect: false },
        { text: 'Béquer', isCorrect: false },
        { text: 'Balão volumétrico', isCorrect: true },
        { text: 'Tubo de ensaio', isCorrect: false },
      ],
    },
    {
      prompt: 'Ao ler o volume em uma proveta, onde os olhos devem estar posicionados em relação ao menisco?',
      category: Category.VIDRARIA,
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Acima do menisco, olhando de cima para baixo.', isCorrect: false },
        { text: 'No mesmo nível do menisco, lendo na parte inferior da curva.', isCorrect: true },
        { text: 'Abaixo do menisco, olhando de baixo para cima.', isCorrect: false },
        { text: 'A posição dos olhos não interfere na leitura.', isCorrect: false },
      ],
    },
    {
      prompt: 'Qual das seguintes vidrarias NÃO deve ser aquecida diretamente na chama do bico de Bunsen?',
      category: Category.VIDRARIA,
      difficulty: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Tubo de ensaio', isCorrect: false },
        { text: 'Béquer de borosilicato', isCorrect: false },
        { text: 'Balão volumétrico', isCorrect: true },
        { text: 'Erlenmeyer', isCorrect: false },
      ],
    },
    {
      prompt: 'A pipeta volumétrica é usada para transferir:',
      category: Category.VIDRARIA,
      difficulty: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Qualquer volume dentro de sua capacidade máxima.', isCorrect: false },
        { text: 'Um único volume fixo com alta precisão.', isCorrect: true },
        { text: 'Somente soluções ácidas.', isCorrect: false },
        { text: 'Volumes aproximados sem precisão.', isCorrect: false },
      ],
    },
    {
      prompt: 'Ao aquecer um líquido em tubo de ensaio, para qual direção a boca do tubo deve estar apontada?',
      category: Category.VIDRARIA,
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Para cima, em direção ao teto.', isCorrect: false },
        { text: 'Para o próprio rosto, para observar melhor.', isCorrect: false },
        { text: 'Para uma direção onde não haja pessoas.', isCorrect: true },
        { text: 'Para baixo, para o calor subir melhor.', isCorrect: false },
      ],
    },
    {
      prompt: 'Qual material é mais indicado para vidrarias que precisam suportar variações bruscas de temperatura?',
      category: Category.VIDRARIA,
      difficulty: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Vidro comum (soda-cal)', isCorrect: false },
        { text: 'Vidro borosilicato', isCorrect: true },
        { text: 'Vidro de chumbo', isCorrect: false },
        { text: 'Acrílico transparente', isCorrect: false },
      ],
    },
    {
      prompt: 'Após o uso, como vidrarias contaminadas com reagentes químicos devem ser tratadas?',
      category: Category.VIDRARIA,
      difficulty: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Lavadas com água corrente e descartadas no lixo comum.', isCorrect: false },
        { text: 'Deixadas de molho em água até o próximo uso.', isCorrect: false },
        { text: 'Descontaminadas conforme o protocolo do laboratório e resíduos descartados adequadamente.', isCorrect: true },
        { text: 'Descartadas inteiras no lixo, independente do reagente.', isCorrect: false },
      ],
    },
  ]

  for (const q of questoes) {
    const { options, ...dados } = q
    await prisma.question.create({
      data: {
        ...dados,
        createdById: professor.id,
        options: { create: options },
      },
    })
  }

  console.log(`${questoes.length} questões criadas`)
  console.log('')
  console.log('Credenciais para teste:')
  console.log('   Professor → professor@labquiz.com / labquiz123')
  console.log('   Aluno     → aluno@labquiz.com    / labquiz123')
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
