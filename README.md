# LabQuiz — Game Educacional de Equipamentos de Laboratório

Game educacional web para alunos do 1º ano do técnico em Química, desenvolvido em parceria com a ETEC Júlio de Mesquita. Permite praticar a identificação de materiais de laboratório, associar equipamentos às suas funções e reconhecer sistemas experimentais completos.

**Orientadora:** Profa. Maria do Socorro Sousa da Silva  
**Instituição parceira:** ETEC Júlio de Mesquita
**Autores:**
- [@Gustavo Itiro Nakaoka](https://github.com/gunkaokks)
- [@Bruno Fernando dos Santos](https://github.com/bruno-santosimt)
- [@Otavio Sousa Dias Lopes](https://github.com/)
- [@Marco Freire Carlucci](https://github.com/henriquebarralocci)
(COLOQUEM O NOME E O GIT HUB DE VOCÊS NESSE MODELO IGUAL O DE CIMA) 

---

## 🎯 O Problema que Resolvemos

Alunos ingressantes no técnico em Química chegam sem familiaridade com os materiais de laboratório — não sabem nomear vidrarias, diferenciar utensílios ou reconhecer em qual procedimento cada equipamento é utilizado. Isso cria uma barreira de entrada que compromete o aproveitamento das primeiras aulas práticas.

**Impacto atual (sem o sistema):**

- Alunos chegam às aulas práticas sem saber nomear ou usar os equipamentos básicos
- Professor precisa dedicar tempo de aula presencial a conteúdo que poderia ser praticado previamente
- Não há forma de o professor acompanhar o progresso individual de cada aluno antes da prática

---

## 💡 Como Funciona

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

## 🛠️ Stack Tecnológica

### Por que essa stack?

Escolhida para equilibrar **qualidade de entrega**, **curva de aprendizado do time** e **zero custo de infraestrutura**.

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | React + TypeScript | Componentes reutilizáveis para engine de questões; TS evita bugs silenciosos |
| Estilização | Tailwind CSS + shadcn/ui | Tailwind para layout mobile-first; shadcn/ui entrega componentes acessíveis (modais, dropdowns, cards) com visual profissional sem esforço |
| Animações | Framer Motion | Transições de questões, contagem de score, feedback visual — transforma um quiz em game (Fase 3) |
| Backend | Node.js + Express + TypeScript | Mesma linguagem no full stack — reduz fricção no time |
| Documentação da API | Swagger / OpenAPI (`swagger-jsdoc`) | API auto-documentada; impressiona avaliadores e facilita integração entre frontend e backend |
| Banco de dados | PostgreSQL + Prisma ORM | Relacional para questões/usuários/scores; Prisma elimina SQL manual |
| Autenticação | JWT (dois perfis: aluno / professor) | Simples, stateless, sem dependência externa |
| Upload de imagens | Cloudinary (free tier) | Professor faz upload de fotos de equipamentos; sem infra para gerenciar |
| Deploy frontend | Vercel | Deploy automático no push; **Preview URL gerada automaticamente a cada PR** |
| Deploy backend + DB | Railway | PostgreSQL + Node.js no mesmo lugar; free tier suficiente para o projeto |
| PWA | Vite PWA Plugin | Permite instalar o game na tela inicial do celular; cache de questões para uso offline (Fase 3) |
| Testes | Vitest (unit) + Playwright (e2e) | Cobertura suficiente para garantir qualidade sem overhead de configuração |
| Acessibilidade | Axe DevTools | Auditoria automatizada de acessibilidade; relatório de score para apresentação à banca |
| Controle de versão | GitHub + GitHub Actions | CI automático: lint + testes a cada PR; bloqueia merge se CI falhar |

> 💡 **Framer Motion e PWA são enhancements de Fase 3**, não de Fase 1. Estão na stack para não serem esquecidos, mas não devem ser implementados antes do core loop estar sólido.

---

## 👥 Papéis da Equipe

> Os papéis abaixo são sugestões baseadas nas áreas do projeto. A distribuição final deve ser feita pelo time considerando as habilidades e preferências de cada pessoa.

| Papel | Responsabilidades principais |
|-------|------------------------------|
| **PM / Arquitetura** | Gestão do projeto, decisões de escopo, revisão de PRs, ADRs, alinhamento com orientadora, UX do painel do professor |
| **Frontend — Game Engine** | Engine de questões, fluxo de jogo, feedback visual, pontuação, Framer Motion (Fase 3) |
| **Frontend — UI/UX** | shadcn/ui, sistema de design, acessibilidade (WCAG + Axe), responsividade, PWA (Fase 3) |
| **Backend — API** | Rotas REST, lógica de negócio, autenticação JWT, integração Cloudinary, Swagger/OpenAPI |
| **Banco de Dados + Conteúdo** | Schema Prisma, migrations, **seed.ts com questões e imagens reais**, banco de questões, organização do Cloudinary |
| **QA / DevOps** | Vitest, Playwright, GitHub Actions CI, relatório de auditoria Axe, documentação técnica, slides de apresentação |

> ⚠️ **O papel de Banco de Dados + Conteúdo é crítico e frequentemente subestimado.** Quem ocupa essa função é responsável pelo conteúdo pedagógico real do produto — sem questões e imagens de qualidade, não existe game. Deve ser alguém com interesse no tema ou disposição para fotografar/organizar os materiais de laboratório.

---

## 📁 Estrutura do Projeto

```
labquiz/
│
├── frontend/                          # React + TypeScript (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/                  # Engine do jogo
│   │   │   │   ├── QuestionCard.tsx   # Renderiza questão (imagem + alternativas)
│   │   │   │   ├── AnswerOption.tsx   # Alternativa individual com animação (Framer Motion)
│   │   │   │   ├── ScoreBoard.tsx     # Placar em tempo real com contador animado
│   │   │   │   ├── HelpPanel.tsx      # Sistema de ajudas
│   │   │   │   └── ResultScreen.tsx   # Tela de resultado final
│   │   │   ├── teacher/               # Painel do professor
│   │   │   │   ├── QuestionForm.tsx   # Cadastro / edição de questão
│   │   │   │   ├── QuestionList.tsx   # Listagem com filtros
│   │   │   │   └── StudentReport.tsx  # Relatório de desempenho
│   │   │   └── shared/                # Componentes reutilizáveis (shadcn/ui + custom)
│   │   │       ├── Button.tsx
│   │   │       ├── ImageWithAlt.tsx   # Imagem com alt text (acessibilidade)
│   │   │       └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── GamePage.tsx
│   │   │   ├── ModuleSelectPage.tsx
│   │   │   └── TeacherDashboard.tsx
│   │   ├── hooks/                     # Custom hooks (useGame, useAuth, useSound, etc.)
│   │   ├── services/                  # Chamadas à API (axios)
│   │   ├── types/                     # Interfaces TypeScript compartilhadas
│   │   └── utils/
│   ├── tests/
│   │   ├── unit/                      # Vitest
│   │   └── e2e/                       # Playwright
│   ├── public/
│   │   └── sounds/                    # Áudio: acerto.mp3, erro.mp3 (Fase 3)
│   ├── vite.config.ts                 # Inclui vite-plugin-pwa (Fase 3)
│   └── manifest.webmanifest           # Config PWA (Fase 3)
│
├── backend/                           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts         # POST /login, POST /register
│   │   │   ├── question.routes.ts     # CRUD de questões (professor)
│   │   │   ├── game.routes.ts         # GET /session, POST /answer
│   │   │   └── report.routes.ts       # GET /reports/:studentId
│   │   ├── controllers/               # Lógica de cada rota
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts     # Valida JWT
│   │   │   └── role.middleware.ts     # Verifica perfil (aluno/professor)
│   │   ├── services/                  # Regras de negócio
│   │   │   ├── game.service.ts        # Seleção de questões, cálculo de score
│   │   │   └── cloudinary.service.ts  # Upload de imagens
│   │   ├── swagger/
│   │   │   └── swagger.config.ts      # Setup Swagger / OpenAPI — docs em /api-docs
│   │   └── app.ts                     # Setup do Express
│   ├── prisma/
│   │   ├── schema.prisma              # Modelo de dados
│   │   ├── migrations/
│   │   └── seed.ts                    # Questões + imagens reais (owner: BD + Conteúdo)
│   └── tests/
│
├── docs/                              # Documentação do projeto
│   ├── ADR/                           # Architecture Decision Records
│   │   └── 001-stack-selection.md
│   ├── api/                           # Exportação do Swagger (gerada automaticamente)
│   ├── accessibility/                 # Relatório de auditoria Axe DevTools
│   └── reunioes/                      # Atas de reunião
│
├── apresentacoes/                     # Slides para banca e orientadora
│
├── .github/
│   └── workflows/
│       └── ci.yml                     # Lint + testes automáticos; bloqueia merge se falhar
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🗃️ Modelo de Dados (Prisma — visão resumida)

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
  prompt       String         // Enunciado
  imageUrl     String?        // URL Cloudinary
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

## 🚀 Como Começar

### Pré-requisitos

- Node.js 20+
- Git
- Conta gratuita no [Cloudinary](https://cloudinary.com) — para upload de imagens
- Conta gratuita no [Railway](https://railway.app) — para banco de dados local de dev (ou PostgreSQL instalado localmente)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_ORG/labquiz.git
cd labquiz

# 2. Instalar dependências do backend
cd backend
npm install
cp ../.env.example .env
# Preencha as variáveis no .env

# 3. Subir o banco e rodar migrations
npx prisma migrate dev
npx prisma db seed  # carrega questões de exemplo

# 4. Iniciar o backend
npm run dev

# 5. Em outro terminal — instalar e iniciar o frontend
cd ../frontend
npm install
npm run dev
```

### Variáveis de Ambiente (.env.example)

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

> ⚠️ **Nunca commitar o `.env` com credenciais reais.** O `.gitignore` já o exclui por padrão.

---

## 📊 Status Atual

**Fase: 0 — Fundações (Semanas 1-2)**

- [x] Definição do tema e escopo
- [x] Escolha da stack tecnológica
- [ ] Distribuição de papéis no time
- [ ] Setup dos repositórios e ambientes locais
- [ ] Definition of Done alinhada com a orientadora
- [ ] Primeiras questões de conteúdo definidas (mínimo 10 para Fase 1)

---

## 📅 Fases de Desenvolvimento

| Fase | Período | Foco | Entregável |
|------|---------|------|-----------|
| **0 — Fundações** | Sem. 1-2 | Stack, papéis, setup, Definition of Done | Repositório configurado, ambientes rodando |
| **1 — Core Loop** | Sem. 3-6 | Auth básico + múltipla escolha + score | Jogo jogável com 10 questões reais |
| **2 — Feature Complete** | Sem. 7-10 | Associações, dificuldade, ajudas, painel professor | Todos os requisitos funcionais implementados |
| **3 — Polish & QA** | Sem. 11-13 | Mobile, acessibilidade, LGPD, edge cases, testes | Produto pronto para avaliação |
| **4 — Entrega** | Sem. 14 | Deploy final, documentação, apresentação | Produto em produção + slides |

> **Fase 1 intencionalmente pequena.** O objetivo é ter algo funcionando com conteúdo real antes de expandir. Builds com dados fictícios revelam problemas de layout e modelo de dados tarde demais.

---

## 🚨 Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| Imagens dos equipamentos não disponíveis a tempo | **Alta** | Designar responsável pelo conteúdo na Semana 1; mapear equipamentos disponíveis na ETEC; ter bancos de imagens livres como fallback |
| Interface do professor subestimada em complexidade | Média | Tratar o painel do professor como produto separado com seus próprios casos de uso e validações; PM assume UX desse módulo |
| Mobile quebrado descoberto tarde | Média | Testar em dispositivo real a partir da Fase 1, não só no fim |
| Escopo cresce fora do controle | **Alta** | Qualquer nova feature passa pelo PM antes de entrar no backlog; Framer Motion e PWA só entram na Fase 3 |
| LGPD não considerada no schema | Baixa | Não armazenar dados desnecessários; revisar schema na Fase 0; alunos menores — coletar apenas nome, e-mail e scores |
| seed.ts nunca populado com conteúdo real | Média | Definir mínimo de 10 questões reais como critério de saída da Fase 1 |

---

## 🤝 Fluxo de Contribuição

```bash
# Criar branch para sua funcionalidade
git checkout -b feat/nome-da-funcionalidade

# Após suas alterações
git add .
git commit -m "feat: descrição clara da mudança"
git push origin feat/nome-da-funcionalidade

# Abrir Pull Request — obrigatório revisão de ao menos 1 pessoa antes de mergear na main
```

### Convenções de Commit

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

- Nenhum PR vai direto para `main` sem revisão
- CI deve passar (lint + testes) antes do merge
- Descrição do PR deve explicar **o que** foi feito e **por quê**
- Screenshots obrigatórios em PRs que alteram UI

---

## ✅ Definition of Done

Uma funcionalidade está **pronta** quando:

- [ ] Funciona no Chrome, Firefox e Safari (desktop)
- [ ] Funciona em tela de celular (375px de largura mínima)
- [ ] Tem alt text em todas as imagens
- [ ] Passou no lint sem erros
- [ ] Tem ao menos um teste unitário para a lógica principal
- [ ] Foi revisada por outro membro do time via PR
- [ ] Não quebra nenhum teste existente
- [ ] Rotas novas no backend estão documentadas no Swagger
- [ ] PRs com alteração de UI incluem screenshot ou Preview URL no corpo do PR

---

## 📚 Recursos

- [Documentação React](https://react.dev)
- [shadcn/ui — Componentes acessíveis](https://ui.shadcn.com)
- [Framer Motion — Animações](https://www.framer.com/motion/)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [swagger-jsdoc — Documentação de API](https://github.com/Surnet/swagger-jsdoc)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Axe DevTools — Acessibilidade](https://www.deque.com/axe/devtools/)
- [Cloudinary — Upload de imagens](https://cloudinary.com/documentation)
- [Railway — Deploy](https://docs.railway.app)
- [Vercel — Deploy frontend + Preview URLs](https://vercel.com/docs)
- [LGPD — Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [WCAG 2.1 — Acessibilidade](https://www.w3.org/TR/WCAG21/)

---

## 👥 Equipe

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
