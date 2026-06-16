# LabQuiz — Game Educacional de Equipamentos de Laboratório

Game educacional web feito para alunos do 1º ano do técnico em Química, desenvolvido em parceria com a ETEC Júlio de Mesquita. A ideia é simples: ajudar na identificação de materiais de laboratório, na associação de equipamentos com suas funções e no reconhecimento de sistemas experimentais completos.

**Orientadora:** Profa. Maria do Socorro Sousa da Silva
**Instituição parceira:** ETEC Júlio de Mesquita

**Autores:**
- [@Alexandre Andrade Machioni Pereira Dos Santos](https://github.com/alemachioni)
- [@Gustavo Itiro Nakaoka](https://github.com/gunkaokks)
- [@Bruno Fernando dos Santos](https://github.com/brunofernn)
- [@Otavio Sousa Dias Lopes](https://github.com/Otavio7opes)
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
---

## Recursos utilizados

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
| Otavio | Backend — API |
| Gustavo | Banco de Dados + Conteúdo e  Frontend — UI/UX|
| Bruno | QA / DevOps |

---

*Última atualização: Junho 2026*
