# ADR 001 — Escolha da Stack Tecnológica

**Data:** Março 2026  
**Status:** Aprovado  
**Autor:** Alexandre Machioni (PM)

---

## Contexto

Time de 6 pessoas com nível técnico misto, prazo de 14 semanas,
zero custo de infraestrutura disponível. Projeto avaliado por
professor que espera produto polido e multiplataforma.
Parceria com ETEC Júlio de Mesquita — usuários finais são
alunos de 14-15 anos e um professor não-técnico.

---

## Decisão

### Frontend
- **React + TypeScript** — componentes reutilizáveis para a
  engine de questões; TypeScript evita bugs silenciosos em
  time com múltiplos desenvolvedores
- **Tailwind CSS + shadcn/ui** — estilização mobile-first sem
  CSS manual; shadcn/ui entrega componentes acessíveis prontos
- **Framer Motion** — animações para tornar o quiz um game (Fase 3)
- **Vite PWA Plugin** — instalação na tela inicial do celular (Fase 3)

### Backend
- **Node.js + Express + TypeScript** — mesma linguagem no
  full stack reduz fricção no time
- **PostgreSQL + Prisma ORM** — modelo relacional adequado
  para questões, usuários e scores; Prisma elimina SQL manual
- **JWT** — autenticação stateless com dois perfis (aluno/professor)

### Infraestrutura
- **Vercel** — deploy frontend com Preview URL por PR automática
- **Railway** — backend e banco no mesmo lugar, free tier suficiente
- **Cloudinary** — upload de imagens sem infraestrutura própria

---

## Alternativas Consideradas

| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| Vue.js | Menor adoção no mercado; menos material de estudo disponível |
| MongoDB | Modelo de dados é relacional — questões têm opções, usuários têm sessões |
| Firebase | Lock-in no ecossistema Google; limitações do free tier para relatórios |
| Python/Django | Linguagem diferente do frontend aumenta fricção no time |
| Heroku | Encerrou o free tier em 2022 |

---

## Consequências

**Positivas:**
- Time aprende tecnologias com alta demanda no mercado
- TypeScript reduz bugs de integração entre frontend e backend
- Preview URLs no Vercel permitem revisão visual antes do merge
- Stack bem documentada com vasta quantidade de tutoriais

**Negativas:**
- Curva de aprendizado inicial no TypeScript para membros sem experiência
- Framer Motion e PWA adicionam complexidade — contidos na Fase 3

---

## Revisão

Este ADR deve ser revisado se houver mudança de plataforma de
deploy ou adição de tecnologias não previstas no escopo atual.