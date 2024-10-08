# Sistema de Registro de Desenvolvimento Linguístico Infantil

## Descrição

Este projeto é um sistema backend para registrar e gerenciar o desenvolvimento linguístico de crianças, focado no
atendimento fonoaudiológico. O sistema permite que fonoaudiólogos registrem e acompanhem as avaliações e intervenções
realizadas nas crianças sob sua responsabilidade. Foi desenvolvido utilizando Node.js, Express, Prisma e PostgreSQL,
garantindo uma arquitetura bem definida e segurança nas operações.

## Funcionalidades

- **Registro de Fonoaudiólogos**: Criação e autenticação de fonoaudiólogos.
- **Registro de Crianças**: Criação, atualização, visualização e exclusão de crianças.
- **Avaliações**: Registro, atualização, visualização e exclusão de avaliações.
- **Intervenções**: Registro, atualização, visualização e exclusão de intervenções.
- **Autenticação JWT**: Autenticação segura usando JSON Web Tokens.
- **Validação de Dados**: Validação de dados de entrada utilizando `express-validator`.
- **Log de Requisições**: Logging de requisições HTTP utilizando `morgan`.
- **Segurança**: Middleware de segurança configurado com `helmet`.

## Requisitos

- Node.js v14 ou superior
- PostgreSQL

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/leoportogtr86/back-fono.git
   cd back-fono
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`:**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   JWT_SECRET="seu_segredo_jwt"
   ```

4. **Execute as migrações do Prisma:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Gere o cliente Prisma:**

   ```bash
   npx prisma generate
   ```

6. **Inicie o servidor:**

   ```bash
   npm start
   ```

## Estrutura do Projeto

```
.
├── src
│   ├── controllers
│   │   ├── authController.ts
│   │   ├── criancaController.ts
│   │   ├── avaliacaoController.ts
│   │   └── intervencaoController.ts
│   ├── interfaces
│   │   └── index.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   ├── criancaValidation.ts
│   │   ├── avaliacaoValidation.ts
│   │   └── intervencaoValidation.ts
│   ├── routes
│   │   ├── index.ts
│   │   ├── criancaRoutes.ts
│   │   ├── avaliacaoRoutes.ts
│   │   └── intervencaoRoutes.ts
│   ├── services
│   │   ├── authService.ts
│   │   ├── criancaService.ts
│   │   ├── avaliacaoService.ts
│   │   └── intervencaoService.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── prisma
│   ├── schema.prisma
│   └── migrations
└── README.md
```

## Rotas da API

### Autenticação

- **POST /api/auth/register**: Registra um novo fonoaudiólogo.
- **POST /api/auth/login**: Autentica um fonoaudiólogo e retorna um token JWT.

### Crianças

- **GET /api/criancas**: Retorna todas as crianças do fonoaudiólogo logado.
- **GET /api/criancas/:id**: Retorna uma criança específica.
- **POST /api/criancas**: Cria uma nova criança.
- **PUT /api/criancas/:id**: Atualiza uma criança existente.
- **DELETE /api/criancas/:id**: Exclui uma criança.

### Avaliações

- **GET /api/avaliacoes**: Retorna todas as avaliações do fonoaudiólogo logado.
- **GET /api/avaliacoes/:id**: Retorna uma avaliação específica.
- **POST /api/avaliacoes**: Cria uma nova avaliação.
- **PUT /api/avaliacoes/:id**: Atualiza uma avaliação existente.
- **DELETE /api/avaliacoes/:id**: Exclui uma avaliação.

### Intervenções

- **GET /api/intervencoes**: Retorna todas as intervenções do fonoaudiólogo logado.
- **GET /api/intervencoes/:id**: Retorna uma intervenção específica.
- **POST /api/intervencoes**: Cria uma nova intervenção.
- **PUT /api/intervencoes/:id**: Atualiza uma intervenção existente.
- **DELETE /api/intervencoes/:id**: Exclui uma intervenção.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato

Leonardo Porto - [@leoportogtr86](https://github.com/leoportogtr86) - leonardoreisporto@gmail.com

Link do
Projeto: [https://github.com/leoportogtr86/back-fono](https://github.com/leoportogtr86/back-fono)
