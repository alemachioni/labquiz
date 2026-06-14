# ADR 001 — Seleção da Stack Tecnológica

# Contexto
O projeto LabQuiz tem como objetivo auxiliar alunos do 1º ano do curso técnico em Química da ETEC Júlio de Mesquita na identificação de materiais, vidrarias, utensílios e sistemas laboratoriais por meio de um jogo educacional digital.
Para atender aos requisitos de acessibilidade, facilidade de manutenção, baixo custo de infraestrutura e desenvolvimento ágil, foi necessário selecionar uma stack tecnológica moderna, amplamente utilizada e compatível com aplicações web.

# Decisão
Foi escolhido React com TypeScript para a construção da interface do usuário devido à sua arquitetura baseada em componentes reutilizáveis, facilidade de manutenção e ampla adoção no mercado.
O TypeScript fornece tipagem estática, reduzindo erros durante o desenvolvimento e aumentando a confiabilidade do sistema. O Vite foi adotado como ferramenta de build por oferecer inicialização rápida e melhor experiência de desenvolvimento.

# Interface e Estilização
O Tailwind CSS foi escolhido para acelerar a criação das interfaces através de classes utilitárias e da abordagem mobile-first.
O shadcn/ui foi utilizado para disponibilizar componentes acessíveis e com aparência moderna, reduzindo o tempo necessário para construção da interface.

# Backend
O backend foi desenvolvido utilizando Node.js com Express e TypeScript.
Essa escolha permite utilizar a mesma linguagem em toda a aplicação, reduzindo a curva de aprendizado da equipe e facilitando a manutenção do código. O Express oferece uma estrutura simples e eficiente para a criação da API REST utilizada pelo sistema.

# Banco de Dados
O PostgreSQL foi selecionado por ser um banco de dados relacional robusto, gratuito e amplamente utilizado em aplicações modernas.
O Prisma ORM foi adotado para simplificar o acesso ao banco de dados, aumentar a produtividade do desenvolvimento e garantir maior segurança na manipulação dos dados.

# Autenticação
Foi escolhido o uso de JSON Web Tokens (JWT) para autenticação dos usuários, permitindo controle de acesso simples, seguro e compatível com aplicações web modernas.

# Hospedagem e Infraestrutura
O frontend foi hospedado na Vercel devido à sua integração nativa com projetos React/Vite e suporte a deploy contínuo.
O backend e o banco de dados foram hospedados na Railway, que oferece implantação simplificada e integração direta com repositórios GitHub.
As imagens utilizadas pelo sistema são armazenadas no Cloudinary, permitindo gerenciamento eficiente de arquivos e acesso otimizado aos recursos visuais.

# Qualidade e Testes
Para garantir a qualidade do software foram adotadas as seguintes ferramentas:

* Vitest para testes unitários;
* Playwright para testes de fluxo da aplicação;
* Axe DevTools para auditorias de acessibilidade;
* GitHub Actions para execução automática de testes durante a integração contínua.

# Benefícios
* Utilização de tecnologias amplamente conhecidas e documentadas;
* Facilidade de manutenção e evolução do sistema;
* Código tipado tanto no frontend quanto no backend;
* Deploy automatizado por integração com GitHub;
* Boa experiência de usuário em dispositivos desktop e móveis;
* Infraestrutura adequada para fins acadêmicos e de demonstração.

# Limitações
* Dependência de serviços externos para hospedagem e armazenamento de imagens;
* Possíveis limitações dos planos gratuitos das plataformas utilizadas;
* Necessidade de conexão com a internet para acesso ao sistema.

## Conclusão
A combinação de React, TypeScript, Vite, Express, PostgreSQL, Prisma, Railway, Vercel e Cloudinary fornece uma solução moderna, escalável e adequada para os objetivos educacionais do LabQuiz, permitindo o desenvolvimento de uma aplicação web acessível, confiável e de fácil manutenção.
