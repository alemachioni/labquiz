/**
 * mockData.ts
 *
 * Questões fictícias para desenvolvimento local.
 * Quando a API estiver pronta, NÃO mexer —
 * apenas troque a função fetchQuestions() no GamePage.tsx.
 */

import { Question } from "../pages/GamePage";

export const MOCK_QUESTIONS: Question[] = [
  // ── Identificação de vidrarias ─────────────────────────────────────────────
  {
    id: "vid-01",
    statement:
      "Qual vidraria é utilizada para medir volumes com alta precisão em experimentos volumétricos?",
    hint: "Tem formato alongado com uma escala graduada e uma torneira na parte inferior.",
    alternatives: [
      { id: "a", text: "Béquer", isCorrect: false },
      { id: "b", text: "Erlenmeyer", isCorrect: false },
      { id: "c", text: "Bureta", isCorrect: true },
      { id: "d", text: "Proveta", isCorrect: false },
    ],
  },
  {
    id: "vid-02",
    statement:
      "Qual é a principal diferença entre um béquer e um erlenmeyer?",
    hint: "Pense na forma do corpo e no risco de respingos durante o aquecimento.",
    alternatives: [
      { id: "a", text: "O béquer tem tampa e o erlenmeyer não.", isCorrect: false },
      { id: "b", text: "O erlenmeyer tem gargalo estreito, reduzindo evaporação e respingos.", isCorrect: true },
      { id: "c", text: "O béquer é usado apenas para sólidos.", isCorrect: false },
      { id: "d", text: "O erlenmeyer não pode ser aquecido.", isCorrect: false },
    ],
  },
  {
    id: "vid-03",
    statement:
      "Para transferir um líquido de um recipiente largo para um de gargalo estreito sem derramar, qual vidraria auxiliar é usada?",
    hint: "Tem formato cônico e é muito usada junto com papel de filtro.",
    alternatives: [
      { id: "a", text: "Pipeta", isCorrect: false },
      { id: "b", text: "Funil", isCorrect: true },
      { id: "c", text: "Bastão de vidro", isCorrect: false },
      { id: "d", text: "Condensador", isCorrect: false },
    ],
  },
  {
    id: "vid-04",
    statement:
      "Qual vidraria é utilizada especificamente para preparar soluções de concentração exata?",
    hint: "Tem um traço de aferição no gargalo e fundo chato.",
    alternatives: [
      { id: "a", text: "Proveta", isCorrect: false },
      { id: "b", text: "Béquer", isCorrect: false },
      { id: "c", text: "Balão volumétrico", isCorrect: true },
      { id: "d", text: "Tubo de ensaio", isCorrect: false },
    ],
  },

  // ── Uso correto ────────────────────────────────────────────────────────────
  {
    id: "vid-05",
    statement:
      "Ao ler o volume em uma proveta, onde os olhos devem estar posicionados em relação ao menisco?",
    hint: "O menisco é a curvatura que o líquido forma nas bordas.",
    alternatives: [
      { id: "a", text: "Acima do menisco, olhando de cima para baixo.", isCorrect: false },
      { id: "b", text: "No mesmo nível do menisco, lendo na parte inferior da curva.", isCorrect: true },
      { id: "c", text: "Abaixo do menisco, olhando de baixo para cima.", isCorrect: false },
      { id: "d", text: "A posição dos olhos não interfere na leitura.", isCorrect: false },
    ],
  },
  {
    id: "vid-06",
    statement:
      "Qual das seguintes vidrarias NÃO deve ser aquecida diretamente na chama do bico de Bunsen?",
    hint: "Pense em qual delas é calibrada para temperatura ambiente e pode rachar com variações bruscas.",
    alternatives: [
      { id: "a", text: "Tubo de ensaio", isCorrect: false },
      { id: "b", text: "Béquer de borosilicato", isCorrect: false },
      { id: "c", text: "Balão volumétrico", isCorrect: true },
      { id: "d", text: "Erlenmeyer", isCorrect: false },
    ],
  },
  {
    id: "vid-07",
    statement:
      "A pipeta volumétrica é usada para transferir:",
    hint: "Diferente da pipeta graduada, ela possui apenas uma marcação.",
    alternatives: [
      { id: "a", text: "Qualquer volume dentro de sua capacidade máxima.", isCorrect: false },
      { id: "b", text: "Um único volume fixo com alta precisão.", isCorrect: true },
      { id: "c", text: "Somente soluções ácidas.", isCorrect: false },
      { id: "d", text: "Volumes aproximados sem precisão.", isCorrect: false },
    ],
  },

  // ── Segurança e boas práticas ──────────────────────────────────────────────
  {
    id: "vid-08",
    statement:
      "Ao aquecer um líquido em tubo de ensaio, para qual direção a boca do tubo deve estar apontada?",
    hint: "Pense na segurança de quem está ao redor.",
    alternatives: [
      { id: "a", text: "Para cima, em direção ao teto.", isCorrect: false },
      { id: "b", text: "Para o próprio rosto, para observar melhor.", isCorrect: false },
      { id: "c", text: "Para uma direção onde não haja pessoas.", isCorrect: true },
      { id: "d", text: "Para baixo, para o calor subir melhor.", isCorrect: false },
    ],
  },
  {
    id: "vid-09",
    statement:
      "Qual material é mais indicado para confeccionar vidrarias de laboratório que precisam suportar variações bruscas de temperatura?",
    hint: "É um tipo especial de vidro com baixo coeficiente de expansão térmica, comum em marcas como Pyrex.",
    alternatives: [
      { id: "a", text: "Vidro comum (soda-cal)", isCorrect: false },
      { id: "b", text: "Vidro borosilicato", isCorrect: true },
      { id: "c", text: "Vidro de chumbo", isCorrect: false },
      { id: "d", text: "Acrílico transparente", isCorrect: false },
    ],
  },
  {
    id: "vid-10",
    statement:
      "Após o uso, como vidrarias contaminadas com reagentes químicos devem ser descartadas ou tratadas?",
    hint: "Nunca misture resíduos sem antes verificar a compatibilidade.",
    alternatives: [
      { id: "a", text: "Lavadas com água corrente e descartadas no lixo comum.", isCorrect: false },
      { id: "b", text: "Deixadas de molho em água até o próximo uso.", isCorrect: false },
      { id: "c", text: "Descontaminadas conforme o protocolo do laboratório e resíduos descartados adequadamente.", isCorrect: true },
      { id: "d", text: "Descartadas inteiras no lixo, independente do reagente.", isCorrect: false },
    ],
  },
];