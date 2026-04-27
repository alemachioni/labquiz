/**
 * mockData.ts
 *
 * Questões fictícias para desenvolvimento local.
 * Quando a API do Otavio estiver pronta, NÃO mexa aqui —
 * apenas troque a função fetchQuestions() no GamePage.tsx.
 */

import { Question } from "../pages/GamePage";

export const MOCK_QUESTIONS: Question[] = [
  // ── Matemática ─────────────────────────────────────────────────────────────
  {
    id: "mat-01",
    statement: "Qual é o valor de 2³ + √16?",
    hint: "Calcule cada parte separadamente: 2³ = 2×2×2 e √16 = ?",
    alternatives: [
      { id: "a", text: "10", isCorrect: false },
      { id: "b", text: "12", isCorrect: true },
      { id: "c", text: "14", isCorrect: false },
      { id: "d", text: "20", isCorrect: false },
    ],
  },
  {
    id: "mat-02",
    statement:
      "Uma função afim é definida por f(x) = 3x − 5. Qual é o valor de f(4)?",
    hint: "Substitua x por 4 na expressão.",
    alternatives: [
      { id: "a", text: "7", isCorrect: true },
      { id: "b", text: "9", isCorrect: false },
      { id: "c", text: "12", isCorrect: false },
      { id: "d", text: "17", isCorrect: false },
    ],
  },

  // ── Ciências / Química ─────────────────────────────────────────────────────
  {
    id: "qui-01",
    statement: "Qual é a fórmula química do dióxido de carbono?",
    hint: "É o gás liberado na respiração celular. Carbono + dois oxigênios.",
    alternatives: [
      { id: "a", text: "CO", isCorrect: false },
      { id: "b", text: "CO₂", isCorrect: true },
      { id: "c", text: "H₂O", isCorrect: false },
      { id: "d", text: "O₃", isCorrect: false },
    ],
  },
  {
    id: "qui-02",
    statement:
      "Na tabela periódica, qual é o símbolo do elemento com número atômico 26?",
    hint: "É o metal mais usado na construção civil e nas indústrias.",
    alternatives: [
      { id: "a", text: "Cu", isCorrect: false },
      { id: "b", text: "Au", isCorrect: false },
      { id: "c", text: "Fe", isCorrect: true },
      { id: "d", text: "Ag", isCorrect: false },
    ],
  },

  // ── Português / Literatura ─────────────────────────────────────────────────
  {
    id: "por-01",
    statement:
      "O movimento literário que valorizava o nacionalismo e a natureza brasileira, iniciado em 1822, é chamado de:",
    hint: "Coincide com a Independência do Brasil e rejeita os padrões europeus clássicos.",
    alternatives: [
      { id: "a", text: "Realismo", isCorrect: false },
      { id: "b", text: "Modernismo", isCorrect: false },
      { id: "c", text: "Romantismo", isCorrect: true },
      { id: "d", text: "Barroco", isCorrect: false },
    ],
  },
  {
    id: "por-02",
    statement: "Assinale a alternativa que contém um exemplo de metáfora:",
    alternatives: [
      { id: "a", text: "Ela corre como o vento.", isCorrect: false },
      { id: "b", text: "O céu está nublado.", isCorrect: false },
      { id: "c", text: "Seus olhos são estrelas.", isCorrect: true },
      { id: "d", text: "A casa tem três andares.", isCorrect: false },
    ],
    hint: "Metáfora identifica duas coisas diretamente, sem usar 'como' ou 'que nem'.",
  },

  // ── História ───────────────────────────────────────────────────────────────
  {
    id: "his-01",
    statement: "A Proclamação da República no Brasil ocorreu em:",
    alternatives: [
      { id: "a", text: "7 de setembro de 1822", isCorrect: false },
      { id: "b", text: "13 de maio de 1888", isCorrect: false },
      { id: "c", text: "15 de novembro de 1889", isCorrect: true },
      { id: "d", text: "22 de abril de 1500", isCorrect: false },
    ],
    hint: "Aconteceu no final do século XIX, liderada pelo Marechal Deodoro da Fonseca.",
  },
  {
    id: "his-02",
    statement:
      "Qual foi o principal documento que aboliu a escravidão no Brasil?",
    alternatives: [
      { id: "a", text: "Lei Saraiva", isCorrect: false },
      { id: "b", text: "Lei do Ventre Livre", isCorrect: false },
      { id: "c", text: "Lei Áurea", isCorrect: true },
      { id: "d", text: "Lei dos Sexagenários", isCorrect: false },
    ],
    hint: "Foi assinada pela Princesa Isabel em 13 de maio de 1888.",
  },

  // ── Geografia ──────────────────────────────────────────────────────────────
  {
    id: "geo-01",
    statement:
      "Qual é o maior bioma do Brasil em extensão territorial?",
    hint: "Ocupa mais de 40% do território brasileiro e está localizado principalmente no Norte.",
    alternatives: [
      { id: "a", text: "Cerrado", isCorrect: false },
      { id: "b", text: "Caatinga", isCorrect: false },
      { id: "c", text: "Amazônia", isCorrect: true },
      { id: "d", text: "Mata Atlântica", isCorrect: false },
    ],
  },
  {
    id: "geo-02",
    statement:
      "O Trópico de Capricórnio passa por qual estado brasileiro?",
    hint: "Pense no estado mais populoso do Brasil.",
    alternatives: [
      { id: "a", text: "Minas Gerais", isCorrect: false },
      { id: "b", text: "Rio de Janeiro", isCorrect: false },
      { id: "c", text: "São Paulo", isCorrect: true },
      { id: "d", text: "Paraná", isCorrect: false },
    ],
  },
];