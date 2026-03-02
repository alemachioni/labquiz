# Projeto Klabin - Automação SAP Datasphere

Sistema automatizado de visualização de dados integrando tabelas padrão e customizadas do SAP Datasphere para relatórios de sustentabilidade da Klabin.

## 📋 Visão Geral do Projeto

**Objetivo:** Construir um sistema automatizado que conecta ao SAP Datasphere da Klabin, extrai dados de tabelas padrão e customizadas, processa KPIs e gera dashboards interativos e relatórios automatizados.

**Cronograma:** Fevereiro 2026 - Junho 2026 (18 semanas)

**Equipe:**
- Alexandre Machioni (Coordenador do Projeto)
- Otávio [Sobrenome] ([Função])
- João Pedro [Sobrenome] ([Função])
- Marco [Sobrenome] ([Função])
- Bruno [Sobrenome] ([Função])
- Gustavo [Sobrenome] ([Função])

## 🎯 O Que Estamos Construindo

Um sistema automatizado que:
1. **Conecta** ao SAP Datasphere (API/ODBC)
2. **Extrai** dados de tabelas padrão SAP + tabelas customizadas Klabin
3. **Processa** e calcula KPIs de sustentabilidade automaticamente
4. **Visualiza** em dashboards interativos
5. **Automatiza** geração de relatórios (PDFs, notificações por email)

### Principais Métricas Rastreadas
- Intensidade de consumo de água (m³/ton)
- Taxa de reciclagem de resíduos (%)
- Emissões de CO₂ evitadas
- Uso de energia renovável
- Indicadores de biodiversidade

## 🛠️ Stack Tecnológica

**Backend:**
- Python 3.10+
- pandas (manipulação de dados)
- requests/pyodbc (conexão SAP Datasphere)

**Frontend/Visualização:**
- Streamlit (framework de dashboard)
- Plotly (gráficos interativos)

**Automação:**
- schedule (agendamento de tarefas)
- reportlab (geração de PDFs)
- smtplib (notificações por email)

**Controle de Versão:**
- GitHub

## 📁 Estrutura do Projeto
```text
klabin-automacao-sap/
├── docs/              # Documentação e notas de reuniões
├── src/               # Código fonte
│   ├── conexao/       # Módulos de conexão com Datasphere
│   ├── processamento/ # Processamento e transformação de dados
│   ├── visualizacao/  # Dashboards e gráficos
│   └── automacao/     # Scripts de automação
├── dados/             # Dados de exemplo (não dados reais da Klabin)
├── notebooks/         # Jupyter notebooks para exploração
├── apresentacoes/     # Slides para apresentações
├── assets/            # Imagens, logos, recursos visuais
└── requirements.txt   # Dependências Python
```

## 🚀 Como Começar

### Pré-requisitos
- Python 3.10 ou superior
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USERNAME/klabin-automacao-sap.git
cd klabin-automacao-sap
```

2. Crie e ative um ambiente virtual:
```bash
# Criar ambiente virtual
python -m venv venv

# Ativar no Windows:
venv\Scripts\activate
# Ativar no Linux/Mac:
source venv/bin/activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure as variáveis de ambiente:
> Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais do SAP (não comite o arquivo `.env`!).

5. Execute o dashboard protótipo:
```bash
streamlit run src/visualizacao/dashboard_prototipo.py
```

## 📊 Status Atual

**Fase:** Pré-Planejamento (Semanas 1-2)

- [x] Pesquisa inicial sobre SAP Datasphere
- [x] Leitura do Relatório de Sustentabilidade Klabin 2024
- [x] Construção do dashboard protótipo
- [ ] Aguardando brief completo do Canvas
- [ ] Primeira reunião com representante da Klabin
- [ ] Credenciais de acesso ao SAP Datasphere

## 📝 Fases de Desenvolvimento

### Fase 0: Pré-Planejamento (Semanas 1-2) - ATUAL
- Pesquisa e organização da equipe
- Setup do ambiente
- Protótipo inicial

### Fase 1: Descoberta & Setup (Semanas 3-4)
- Acesso ao SAP Datasphere
- Exploração de dados
- Arquitetura técnica

### Fase 2: Desenvolvimento Core (Semanas 5-8)
- Módulo de extração de dados
- Módulo de transformação de dados
- Módulo de visualização

### Fase 3: Polimento & Automação (Semanas 9-11)
- Funcionalidades de automação
- Testes de qualidade
- Documentação

### Fase 4: Entrega Final (Semanas 12-14)
- Polimento final
- Preparação de apresentação
- Demo final

## 🤝 Como Contribuir

### Fluxo de Trabalho
1. Crie uma branch para sua funcionalidade: `git checkout -b feature/nome-da-funcionalidade`
2. Faça suas alterações
3. Commit com mensagens claras: `git commit -m "Adiciona funcionalidade: descrição"`
4. Push para sua branch: `git push origin feature/nome-da-funcionalidade`
5. Crie um Pull Request para revisão

### Estilo de Código
- Siga PEP 8 para código Python
- Adicione docstrings em todas as funções
- Comente lógica complexa
- Mantenha funções pequenas e focadas

## 📞 Contato

**Coordenador do Projeto:** Alexandre Machioni (alemachioni@gmail.com)

**Comunicação da Equipe:**
- WhatsApp: [PI 3 semestre]
- Reuniões Semanais: Quintas-feiras (durante aula de PI)
- GitHub: Issues e Pull Requests

## 📚 Recursos

- [Documentação SAP Datasphere](https://learning.sap.com)
- [Documentação Streamlit](https://docs.streamlit.io)
- [Relatório de Sustentabilidade Klabin 2024](https://klabin.com.br/en/sustentabilidade/relatorios-e-performance)
- [Planejamento do Projeto (Notion)](link-para-notion)

## 📄 Licença

[A ser determinado pela equipe]

---

**Última Atualização:** 3 de Março de 2026
