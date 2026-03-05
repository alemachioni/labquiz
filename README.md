# Klabin - Geração Automatizada de Scripts SAP com IA

Agente de IA que interpreta perguntas de negócio em linguagem natural, mapeia as tabelas SAP relevantes e gera automaticamente scripts de extração (SQL / ABAP CDS View) prontos para uso no Power BI.

> **Área:** TI | **Sponsor:** Abdul Latif | **Fluxo:** Record to Report

---

## 🎯 O Problema que Resolvemos

Gestores e analistas sabem *o que* querem ver, mas não sabem *como* extrair os dados do SAP. Isso cria um gargalo técnico: toda visualização nova depende de um especialista para escrever o script de extração.

**Impacto atual (sem o sistema):**
- Atrasos na criação de dashboards por falta de scripts prontos
- Baixa autonomia dos usuários de negócio na exploração de dados
- Sobrecarga da equipe técnica com demandas repetitivas de extração

---

## 💡 Como Funciona

```
Usuário digita:
"Quero ver o volume de produção por planta nos últimos 3 meses"
        │
        ▼
┌─────────────────────────┐
│  1. INTERPRETAÇÃO       │  LLM entende a intenção de negócio
│     DA INTENÇÃO         │  e extrai: métrica, dimensão, período
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  2. MAPEAMENTO          │  Consulta o dicionário de dados SAP
│     DE TABELAS SAP      │  Identifica tabelas relevantes:
│                         │  MSEG, VBRK, AFKO, EKPO...
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. GERAÇÃO DO SCRIPT   │  Gera SQL ou ABAP CDS View
│     DE EXTRAÇÃO         │  pronto para Power BI via
│                         │  SAP BW, HANA ou Data Lake
└────────────┬────────────┘
             │
             ▼
      Power BI recebe
      os dados direto
```

---

## 🛠️ Stack Tecnológica

**Agente de IA (núcleo):**
- Python 3.10+
- LLM via API (Claude / OpenAI) — interpretação de linguagem natural
- RAG com dicionário de dados SAP — mapeamento de tabelas
- `langchain` ou implementação própria — orquestração do agente

**Interface do Usuário:**
- `streamlit` — chat interface para o usuário digitar perguntas

**Integração SAP:**
- `pyodbc` / `requests` — conexão com SAP Datasphere
- SAP BW / HANA / Data Lake — caminho de saída para Power BI

**Dados & Processamento:**
- `pandas` — validação e preview dos dados extraídos
- Dicionário de dados SAP (JSON/CSV) — base de conhecimento do agente

**Controle de Versão:** GitHub

---

## 📁 Estrutura do Projeto

```
klabin-agente-sap/
│
├── src/
│   ├── agente/                    # Núcleo do agente de IA
│   │   ├── interpretador.py       # Interpreta intenção do usuário (LLM)
│   │   ├── mapeador_tabelas.py    # Mapeia tabelas SAP relevantes (RAG)
│   │   └── gerador_scripts.py     # Gera SQL / ABAP CDS View
│   │
│   ├── sap/                       # Integração com SAP Datasphere
│   │   ├── cliente_sap.py         # Conexão e autenticação
│   │   ├── executor_query.py      # Executa scripts gerados
│   │   └── validador_schema.py    # Valida estrutura das tabelas
│   │
│   ├── dicionario/                # Base de conhecimento SAP
│   │   ├── tabelas_sap.json       # Metadados das tabelas (MSEG, VBRK, etc.)
│   │   ├── glossario_negocio.json # Termos de negócio → campos SAP
│   │   └── construtor_dicionario.py
│   │
│   ├── interface/                 # Chat UI (Streamlit)
│   │   ├── app.py                 # Ponto de entrada principal
│   │   ├── chat.py                # Componente de chat
│   │   └── preview_dados.py       # Preview dos dados extraídos
│   │
│   └── utils/                     # Utilitários gerais
│       ├── logger.py
│       └── config.py
│
├── testes/                        # Testes automatizados
│   ├── test_interpretador.py
│   ├── test_mapeador.py
│   └── test_gerador_scripts.py
│
├── dados/
│   └── exemplos/                  # Perguntas e scripts de exemplo (sem dados reais)
│
├── docs/                          # Documentação técnica e notas de reuniões
├── apresentacoes/                 # Slides para Klabin e banca
│
├── .env.example                   # Template de variáveis de ambiente
├── .gitignore
├── requirements.txt
└── README.md
```

> ⚠️ **Nunca commitar o `.env`, credenciais SAP ou dados reais da Klabin.**

---

## 🚀 Como Começar

### Pré-requisitos
- Python 3.10+
- Git
- Chave de API (Claude ou OpenAI) — ver `.env.example`

### Instalação

```powershell
# 1. Clonar o repositório
git clone https://github.com/SEU_USERNAME/klabin-agente-sap.git
cd klabin-agente-sap

# 2. Criar e ativar ambiente virtual (Windows/PowerShell)
python -m venv venv
venv\Scripts\activate

# 3. Instalar dependências
pip install -r requirements.txt

# 4. Configurar variáveis de ambiente
copy .env.example .env
# Edite o .env com sua chave de API e credenciais SAP

# 5. Rodar a interface
streamlit run src/interface/app.py
```

### Exemplo de uso

```
Usuário: "Quero ver o faturamento por cliente nos últimos 6 meses"

Agente:  Tabelas identificadas: VBRK (cabeçalho fatura), VBRP (itens fatura)
         Campos: VBRK.FKDAT, VBRK.KUNAG, VBRP.NETWR

         Script gerado:
         SELECT k.KUNAG, SUM(p.NETWR) AS faturamento_total
         FROM VBRK k
         JOIN VBRP p ON k.VBELN = p.VBELN
         WHERE k.FKDAT >= ADD_MONTHS(CURRENT_DATE, -6)
         GROUP BY k.KUNAG
         ORDER BY faturamento_total DESC
```

---

## 📊 Status Atual

**Fase:** Pré-Planejamento (Semanas 1-2)

- [x] Leitura e análise do brief da Klabin
- [x] Pesquisa inicial sobre SAP Datasphere
- [ ] Aguardando acesso ao dicionário de dados SAP da Klabin
- [ ] Primeira reunião com representante da Klabin (Abdul Latif / Marlon Silva)
- [ ] Credenciais de acesso ao SAP Datasphere
- [ ] Definição de funções da equipe

---

## 📅 Fases de Desenvolvimento

| Fase | Período | Foco |
|------|---------|------|
| 0 - Pré-Planejamento | Sem. 1-2 | Brief, pesquisa, setup, protótipo de chat |
| 1 - Descoberta & Setup | Sem. 3-4 | Acesso SAP, construção do dicionário de tabelas, arquitetura |
| 2 - Agente MVP | Sem. 5-8 | Interpretador LLM + mapeamento de tabelas + geração de script básico |
| 3 - Integração & Validação | Sem. 9-11 | Conexão real SAP, testes com queries reais, controle de permissões |
| 4 - Entrega Final | Sem. 12-14 | UI polida, documentação, apresentação |

---

## 🚨 Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Scripts gerados com lógica incorreta | Suite de testes com queries conhecidas; validação humana antes de executar |
| Acesso indevido a dados sensíveis | Modo somente-leitura; controle de permissões por perfil de usuário |
| Sem acesso real ao SAP Datasphere | Desenvolver com schema mockado; validar lógica do agente independentemente |
| LLM gera tabelas SAP inexistentes | RAG forçado — agente só usa tabelas presentes no dicionário validado |
| Escopo maior que o estimado | MVP focado em 5-10 perguntas de negócio bem definidas |

---

## 🤝 Fluxo de Contribuição

```powershell
# Criar branch para sua funcionalidade
git checkout -b feature/nome-da-funcionalidade

# Após suas alterações
git add .
git commit -m "feat: descrição clara da mudança"
git push origin feature/nome-da-funcionalidade

# Abrir Pull Request — obrigatório revisão antes de mergear na main
```

**Convenções:**
- PEP 8 para estilo de código
- Docstrings em todas as funções
- Variáveis e comentários em português
- Funções pequenas e com responsabilidade única

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Alexandre Machioni | Coordenador do Projeto |
| Otávio [Sobrenome] | [Função] |
| João Pedro [Sobrenome] | [Função] |
| Marco [Sobrenome] | [Função] |
| Bruno [Sobrenome] | [Função] |
| Gustavo [Sobrenome] | [Função] |

**Contato:** Alexandre Machioni — alemachioni@gmail.com

| Canal | Uso |
|-------|-----|
| WhatsApp (PI 3 semestre) | Comunicação rápida |
| Reuniões semanais (quintas, aula PI) | Alinhamento de progresso |
| GitHub Issues / Pull Requests | Tarefas técnicas e revisão |
| Notion | Planejamento e documentação |

---

## 📚 Recursos

- [Documentação SAP Datasphere](https://help.sap.com/docs/SAP_DATASPHERE)
- [SAP Table Reference (MSEG, VBRK, AFKO...)](https://www.se80.co.uk/saptables/)
- [Documentação Streamlit](https://docs.streamlit.io)
- [LangChain Docs](https://python.langchain.com)
- [Relatório de Sustentabilidade Klabin 2024](https://ri.klabin.com.br)
- [Planejamento do Projeto (Notion)](https://notion.so)

---

*Última atualização: Março 2026*
