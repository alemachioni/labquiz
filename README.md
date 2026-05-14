# LabQuiz — Game Educacional de Equipamentos de Laboratório

Game educacional web feito para alunos do 1º ano do técnico em Química, desenvolvido em parceria com a ETEC Júlio de Mesquita. A ideia é simples: ajudar na identificação de materiais de laboratório, na associação de equipamentos com suas funções e no reconhecimento de sistemas experimentais completos.

**Orientadora:** Profa. Maria do Socorro Sousa da Silva
**Instituição parceira:** ETEC Júlio de Mesquita

**Autores:**
- [@Alexandre Andrade Machioni Pereira Dos Santos](https://github.com/alemachioni)
- [@Gustavo Itiro Nakaoka](https://github.com/gunkaokks)
- [@Bruno Fernando dos Santos](https://github.com/brunofernn)
- [@Otavio Sousa Dias Lopes](https://github.com/)
- [@Marco Freire Carlucci](https://github.com/henriquebarralocci)
- [@João Pedro Cirilo Parronchi](https://github.com/iFloren)


---

## O Problema

Quem entra no técnico em Química geralmente não conhece os materiais de laboratório — não sabe o nome das vidrarias, não diferencia os utensílios, não sabe em qual procedimento cada coisa é usada. Isso cria uma barreira logo de cara, nas primeiras aulas práticas.

**O que acontece sem o sistema:**

- Alunos chegam na aula prática sem saber nem nomear os equipamentos básicos
- O professor tem que usar tempo de aula para cobrir o que poderia ter sido praticado antes
- Não tem como acompanhar quem evoluiu e quem ainda está travado antes de ir para o laboratório

---

## Como funciona

```
Aluno acessa o game
        │
        ▼
┌─────────────────────────┐
│  1. SELEÇÃO DE MÓDULO   │  Vidrarias / Metálicos / Plásticos /
│                         │  Porcelanas / Sistemas Experimentais
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  2. RODADA DE QUESTÕES  │  Múltipla escolha com imagens
│                         │  Associação material ↔ função
│                         │  Associação material ↔ sistema experimental
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. FEEDBACK IMEDIATO   │  Resposta certa/errada com explicação
│                         │  Sistema de ajudas (dica / eliminar opção)
│                         │  Pontuação acumulada em tempo real
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  4. RESULTADO FINAL     │  Score da partida, acertos por categoria
│                         │  Dados salvos para relatório do professor
└─────────────────────────┘
```

---

## Stack

A escolha foi feita pensando em equilibrar qualidade de entrega com a curva de aprendizado do time, sem custo de infraestrutura.

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| Frontend | React + TypeScript | Componentes reutilizáveis para a engine de questões; o TypeScript evita bugs silenciosos que só aparecem em produção |
| Estilização | Tailwind CSS + shadcn/ui | Tailwind para layout mobile-first; shadcn/ui entrega modais, dropdowns e cards acessíveis com visual profissional |
| Animações | Framer Motion | Transições de questões, contagem de score — faz o quiz parecer um game de verdade (Fase 3) |
| Backend | Node.js + Express + TypeScript | Mesma linguagem no full stack, menos fricção no time |
| Documentação da API | Swagger / OpenAPI | API auto-documentada; facilita a integração entre front e back |
| Banco de dados | PostgreSQL + Prisma ORM | Relacional para questões/usuários/scores; Prisma elimina SQL manual |
| Autenticação | JWT (aluno / professor) | Simples, stateless, sem dependência externa |
| Upload de imagens | Cloudinary (free tier) | O professor faz upload das fotos dos equipamentos sem precisar de infraestrutura |
| Deploy frontend | Vercel | Deploy automático no push; gera Preview URL a cada PR automaticamente |
| Deploy backend + DB | Railway | PostgreSQL + Node.js no mesmo lugar; free tier suficiente |
| PWA | Vite PWA Plugin | Instalar o game na tela inicial do celular; cache de questões para uso offline (Fase 3) |
| Testes | Vitest (unit) + Playwright (e2e) | Cobertura suficiente sem overhead de configuração |
| Acessibilidade | Axe DevTools | Auditoria automatizada; relatório de score para apresentação à banca |
| Controle de versão | GitHub + GitHub Actions | CI automático: lint + testes a cada PR; bloqueia merge se o CI falhar |

> **Framer Motion e PWA são da Fase 3**, não da Fase 1. Estão documentados aqui pra não serem esquecidos, mas não entram antes do core loop estar funcionando.

---

## Papéis da equipe

> Abaixo estão sugestões de divisão. A distribuição final é do time — levem em conta habilidades e preferências de cada um.

| Papel | O que faz |
|-------|-----------|
| **PM / Arquitetura** | Gestão do projeto, decisões de escopo, revisão de PRs, ADRs, alinhamento com a orientadora, UX do painel do professor |
| **Frontend — Game Engine** | Engine de questões, fluxo de jogo, feedback visual, pontuação, Framer Motion (Fase 3) |
| **Frontend — UI/UX** | shadcn/ui, sistema de design, acessibilidade (WCAG + Axe), responsividade, PWA (Fase 3) |
| **Backend — API** | Rotas REST, lógica de negócio, autenticação JWT, integração Cloudinary, Swagger/OpenAPI |
| **Banco de Dados + Conteúdo** | Schema Prisma, migrations, **seed.ts com questões e imagens reais**, banco de questões, organização no Cloudinary |
| **QA / DevOps** | Vitest, Playwright, GitHub Actions CI, relatório de auditoria Axe, documentação técnica, slides de apresentação |

---

## Estrutura do projeto

```
labquiz/
│
├── frontend/                          # React + TypeScript (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── AnswerOption.tsx
│   │   │   │   ├── ScoreBoard.tsx
│   │   │   │   ├── HelpPanel.tsx
│   │   │   │   └── ResultScreen.tsx
│   │   │   ├── teacher/
│   │   │   │   ├── QuestionForm.tsx
│   │   │   │   ├── QuestionList.tsx
│   │   │   │   └── StudentReport.tsx
│   │   │   └── shared/
│   │   │       ├── Button.tsx
│   │   │       ├── ImageWithAlt.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── GamePage.tsx
│   │   │   ├── ModuleSelectPage.tsx
│   │   │   └── TeacherDashboard.tsx
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── tests/
│   │   ├── unit/
│   │   └── e2e/
│   ├── public/
│   │   └── sounds/                    # acerto.mp3, erro.mp3 (Fase 3)
│   ├── vite.config.ts
│   └── manifest.webmanifest           # Config PWA (Fase 3)
│
├── backend/                           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── question.routes.ts
│   │   │   ├── game.routes.ts
│   │   │   └── report.routes.ts
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   └── role.middleware.ts
│   │   ├── services/
│   │   │   ├── game.service.ts
│   │   │   └── cloudinary.service.ts
│   │   ├── swagger/
│   │   │   └── swagger.config.ts
│   │   └── app.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   └── tests/
│
├── docs/
│   ├── ADR/
│   │   └── 001-stack-selection.md
│   ├── api/
│   ├── accessibility/
│   └── reunioes/
│
├── apresentacoes/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Modelo de dados (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String   // hash bcrypt
  role      Role     // STUDENT | TEACHER
  sessions  GameSession[]
}

model Question {
  id           String         @id @default(uuid())
  type         QuestionType   // MULTIPLE_CHOICE | ASSOCIATION
  difficulty   Int            // 1 | 2 | 3
  category     Category       // VIDRARIA | METALICO | PLASTICO | PORCELANA | SISTEMA
  prompt       String
  imageUrl     String?
  options      Option[]
  createdBy    User           @relation(fields: [createdById], references: [id])
  createdById  String
}

model Option {
  id         String    @id @default(uuid())
  text       String?
  imageUrl   String?
  isCorrect  Boolean
  question   Question  @relation(fields: [questionId], references: [id])
  questionId String
}

model GameSession {
  id          String    @id @default(uuid())
  student     User      @relation(fields: [studentId], references: [id])
  studentId   String
  score       Int
  totalQ      Int
  correctQ    Int
  category    Category?
  difficulty  Int?
  playedAt    DateTime  @default(now())
}
```

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- Git
- Conta gratuita no [Cloudinary](https://cloudinary.com)
- Conta gratuita no [Railway](https://railway.app) ou PostgreSQL instalado localmente

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_ORG/labquiz.git
cd labquiz

# 2. Backend
cd backend
npm install
cp ../.env.example .env
# Preencha as variáveis no .env

# 3. Banco de dados
npx prisma migrate dev
npx prisma db seed  # carrega questões de exemplo

# 4. Rodar o backend
npm run dev

# 5. Frontend (em outro terminal)
cd ../frontend
npm install
npm run dev
```

### Variáveis de ambiente (.env.example)

```env
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/labquiz
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Frontend (Vite)
VITE_API_URL=http://localhost:3000
```

---

## Status atual

**Fase 0 — Fundações (Semanas 1-2)**

- [x] Tema e escopo definidos
- [x] Stack escolhida
- [ ] Papéis distribuídos no time
- [ ] Ambientes locais configurados
- [ ] Definition of Done alinhada com a orientadora
- [ ] Primeiras 10 questões de conteúdo definidas (mínimo para sair da Fase 1)

---


---

## Riscos

| Risco | Probabilidade | Como mitigar |
|-------|--------------|--------------|
| Imagens dos equipamentos não ficam prontas a tempo | **Alta** | Designar o responsável pelo conteúdo na Semana 1; mapear o que está disponível na ETEC; ter bancos de imagens livres como plano B |
| Painel do professor subestimado em complexidade | Média | Tratar como produto separado com seus próprios casos de uso; PM assume o UX desse módulo |
| Mobile quebrado descoberto tarde demais | Média | Testar em dispositivo real desde a Fase 1, não só no final |
| Escopo crescendo fora de controle | **Alta** | Qualquer feature nova passa pelo PM antes de entrar no backlog; Framer Motion e PWA só na Fase 3 |
| LGPD ignorada no schema | Baixa | Não guardar dados desnecessários; revisar schema na Fase 0; alunos menores — só nome, e-mail e scores |
| seed.ts nunca populado com conteúdo real | Média | 10 questões reais é critério de saída da Fase 1 — sem isso, não passa |

---

## Fluxo de contribuição

```bash
git checkout -b feat/nome-da-funcionalidade

git add .
git commit -m "feat: descrição clara da mudança"
git push origin feat/nome-da-funcionalidade

# Abrir PR — pelo menos 1 pessoa precisa revisar antes do merge na main
```

### Convenções de commit

```
feat:     nova funcionalidade
fix:      correção de bug
style:    ajuste visual sem mudança de lógica
refactor: refatoração sem mudança de comportamento
test:     adição ou correção de testes
docs:     documentação
chore:    configuração, dependências, CI
```

### Regras de PR

- Nenhum PR vai direto pra `main` sem revisão
- CI precisa passar (lint + testes) antes do merge
- Descreva **o que** foi feito e **por quê** — não só "ajustes"
- PRs que alteram UI precisam de screenshot ou Preview URL no corpo

---


## Recursos úteis

- [Documentação React](https://react.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [Cloudinary](https://cloudinary.com/documentation)
- [Railway](https://docs.railway.app)
- [Vercel](https://vercel.com/docs)
- [LGPD — Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)

---

## Equipe

| Nome | Papel |
|------|-------|
| Alexandre | PM / Arquitetura |
| João | Frontend — Game Engine |
| Marco | Frontend — UI/UX |
| Otavio | Backend — API |
| Gustavo | Banco de Dados + Conteúdo |
| Bruno | QA / DevOps |

---

*Última atualização: Março 2026*
