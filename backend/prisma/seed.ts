import { PrismaClient, Role, QuestionType, Category } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed...')

  // ── Usuários ────────────────────────────────────────────────────────────────
  const senhaHash = await bcrypt.hash('labquiz123', 10)

  const professor = await prisma.user.upsert({
    where: { email: 'teste@cps.sp.gov.br' }, // Atualizado aqui
    update: {},
    create: {
      name: 'Professor Demo',
      email: 'teste@cps.sp.gov.br',          // Atualizado aqui
      password: senhaHash,
      role: Role.TEACHER,
    },
  })

  await prisma.user.upsert({
    where: { email: 'teste@aluno.cps.sp.gov.br' }, // Atualizado aqui
    update: {},
    create: {
      name: 'Aluno Demo',
      email: 'teste@aluno.cps.sp.gov.br',          // Atualizado aqui
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
      hint: 'É muito utilizada em titulações.',
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
      hint: 'Observe o formato do gargalo.',
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
      hint: 'Possui formato cônico.',
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
      hint: 'Possui uma marca de aferição.',
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
       hint: 'Evite erro de paralaxe.',
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
      hint: 'É utilizada para medições precisas.',
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
      hint: 'Ela possui apenas uma marca de calibração.',
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
      hint: 'Questão de segurança laboratorial.',
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
      hint: 'É o material usado na maioria das vidrarias laboratoriais modernas.',
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
      hint: 'Pense nas normas de segurança.',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Lavadas com água corrente e descartadas no lixo comum.', isCorrect: false },
        { text: 'Deixadas de molho em água até o próximo uso.', isCorrect: false },
        { text: 'Descontaminadas conforme o protocolo do laboratório e resíduos descartados adequadamente.', isCorrect: true },
        { text: 'Descartadas inteiras no lixo, independente do reagente.', isCorrect: false },
      ],
    },

    {
      prompt: 'Qual o nome do material usado nos laborátorios de quimica abaixo?',
      category: Category.VIDRARIA,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Beaker_hg.jpg/500px-Beaker_hg.jpg',
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Béquer', isCorrect: true },
        { text: 'Tubo de ensaio', isCorrect: false },
        { text: 'Balão volumétrico', isCorrect: false },
        { text: 'Erlenmeyer', isCorrect: false },
      ],
    },

    {
      prompt: 'Qual o nome do material usado nos laborátorios de quimica abaixo?',
      category: Category.VIDRARIA,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Baffled_Erlenmeyer_Flask_2.jpg/960px-Baffled_Erlenmeyer_Flask_2.jpg',
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Funíl de separação', isCorrect: false },
        { text: 'Erlenmeyer', isCorrect: true},
        { text: 'Proveta', isCorrect: false },
        { text: 'Cadinho', isCorrect: false },
      ],
    },
  
    {
      prompt: 'Qual o nome do material usado nos laborátorios de quimica abaixo?',
      category: Category.VIDRARIA,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Different_types_of_graduated_cylinder.jpg',
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Proveta', isCorrect: true },
        { text: 'Capsula', isCorrect: false},
        { text: 'Pisseta', isCorrect: false },
        { text: 'Tubo de ensaio', isCorrect: false },
      ],
    },

    {
      prompt: 'Qual o nome do material usado nos laborátorios de quimica abaixo?',
      category: Category.VIDRARIA,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/50_mL_Buret.jpg/330px-50_mL_Buret.jpg',
      difficulty: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { text: 'Béker', isCorrect: false },
        { text: 'Funíl de separação', isCorrect: false},
        { text: 'Bureta', isCorrect: true },
        { text: 'Almofariz', isCorrect: false },
      ],
    },
    {
    prompt: 'Qual o nome do material abaixo?',
    category: Category.METALICO,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dreifu%C3%9F.png/500px-Dreifu%C3%9F.png',
    difficulty: 1,
    hint: 'É utilizado para sustentar recipientes durante aquecimentos.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Tripé', isCorrect: true },
      { text: 'Suporte universal', isCorrect: false },
      { text: 'Pinça metálica', isCorrect: false },
      { text: 'Tela de amianto', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a principal função do material abaixo?',
    category: Category.METALICO,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Keramikdrahtnetz.png/960px-Keramikdrahtnetz.png',
    difficulty: 2,
    hint: 'É utilizado junto ao tripé.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Distribuir o calor durante o aquecimento', isCorrect: true },
      { text: 'Filtrar líquidos', isCorrect: false },
      { text: 'Medir volumes', isCorrect: false },
      { text: 'Transferir líquidos', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual o nome do equipamento abaixo?',
    category: Category.METALICO,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ringstand_with_a_ring_clamp.jpg/960px-Ringstand_with_a_ring_clamp.jpg',
    difficulty: 1,
    hint: 'Serve como base para diversos experimentos.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Tripé', isCorrect: false },
      { text: 'Pinça metálica', isCorrect: false },
      { text: 'Suporte universal', isCorrect: true },
      { text: 'Bureta', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a função principal da pinça metálica?',
    category: Category.METALICO,
    imageUrl: 'https://www.lojaroster.com.br/media/catalog/product/cache/13/image/1000x1231/4648e8fa899f1575903b33dc39eb6705/R/I/RIC045_201541395842.jpg',
    difficulty: 2,
    hint: 'Muito usada durante aquecimentos.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Segurar materiais aquecidos', isCorrect: true },
      { text: 'Medir temperatura', isCorrect: false },
      { text: 'Transferir líquidos', isCorrect: false },
      { text: 'Preparar soluções', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual equipamento é normalmente acoplado ao suporte universal para sustentar uma bureta?',
    category: Category.METALICO,
    difficulty: 2,
    hint: 'É muito usado em titulações.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Pinça metálica', isCorrect: true },
      { text: 'Tela de amianto', isCorrect: false },
      { text: 'Tripé', isCorrect: false },
      { text: 'Pisseta', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual o nome do material abaixo?',
    category: Category.PLASTICO,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Washing_bottle.jpg/960px-Washing_bottle.jpg',
    difficulty: 1,
    hint: 'Muito utilizada para lavagem de vidrarias.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Pisseta', isCorrect: true },
      { text: 'Pipeta', isCorrect: false },
      { text: 'Proveta', isCorrect: false },
      { text: 'Funil', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a função principal da pisseta?',
    category: Category.PLASTICO,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Washing_bottle.jpg/960px-Washing_bottle.jpg',
    difficulty: 2,
    hint: 'Normalmente contém água destilada.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Lavar materiais e adicionar pequenas quantidades de líquido', isCorrect: true },
      { text: 'Medir volumes exatos', isCorrect: false },
      { text: 'Aquecer soluções', isCorrect: false },
      { text: 'Filtrar líquidos', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a principal função da espátula plástica?',
    category: Category.PLASTICO,
    difficulty: 2,
    hint: 'Muito utilizada com reagentes sólidos.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Transferir pequenas quantidades de sólidos', isCorrect: true },
      { text: 'Medir volume', isCorrect: false },
      { text: 'Aquecer substâncias', isCorrect: false },
      { text: 'Filtrar misturas', isCorrect: false },
    ],
  },

  {
    prompt: 'A espátula plástica é utilizada principalmente para manipular:',
    category: Category.PLASTICO,
    difficulty: 1,
    hint: 'Pense em reagentes em pó.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Sólidos', isCorrect: true },
      { text: 'Gases', isCorrect: false },
      { text: 'Líquidos voláteis', isCorrect: false },
      { text: 'Somente água', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual o nome do material abaixo?',
    category: Category.PORCELANA,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mortar_and_pestle-laboratory1.jpg/960px-Mortar_and_pestle-laboratory1.jpg',
    difficulty: 1,
    hint: 'Possui duas peças.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Almofariz e pistilo', isCorrect: true },
      { text: 'Cadinho', isCorrect: false },
      { text: 'Cápsula de porcelana', isCorrect: false },
      { text: 'Funil de separação', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a principal função do almofariz e pistilo?',
    category: Category.PORCELANA,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mortar_and_pestle-laboratory1.jpg/960px-Mortar_and_pestle-laboratory1.jpg',
    difficulty: 2,
    hint: 'Muito utilizado com substâncias sólidas.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Triturar sólidos', isCorrect: true },
      { text: 'Medir volume', isCorrect: false },
      { text: 'Filtrar líquidos', isCorrect: false },
      { text: 'Preparar soluções volumétricas', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a função principal da cápsula de porcelana?',
    category: Category.PORCELANA,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Abdampfschalen_verschiedene_Groessen.jpg/1280px-Abdampfschalen_verschiedene_Groessen.jpg',
    difficulty: 2,
    hint: 'Utilizada em aquecimentos.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Evaporar líquidos', isCorrect: true },
      { text: 'Medir volume', isCorrect: false },
      { text: 'Transferir sólidos', isCorrect: false },
      { text: 'Filtrar soluções', isCorrect: false },
    ],
  },

  {
    prompt: 'Qual a principal função do cadinho?',
    category: Category.PORCELANA,
    difficulty: 2,
    hint: 'Suporta temperaturas muito elevadas.',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { text: 'Aquecimento intenso de substâncias', isCorrect: true },
      { text: 'Medição de volumes', isCorrect: false },
      { text: 'Filtração', isCorrect: false },
      { text: 'Armazenamento de líquidos', isCorrect: false },
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
  console.log('📋 Credenciais para teste:')
  console.log('   Professor → teste@cps.sp.gov.br / labquiz123')       // Atualizado no console
  console.log('   Aluno     → teste@aluno.cps.sp.gov.br / labquiz123') // Atualizado no console
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
