# StockManager

Aplicação web para gerenciamento de produtos em estoque. O sistema permite cadastrar, listar, editar e excluir produtos usando Node.js, Express, EJS, Prisma e PostgreSQL.

## Funcionalidades

- Cadastro de produtos com nome, preço e quantidade.
- Listagem de produtos em ordem decrescente.
- Edição de produtos cadastrados.
- Exclusão de produtos.
- Interface responsiva com suporte a tema claro e escuro.

## Tecnologias

- Node.js
- Express
- EJS
- Prisma ORM
- PostgreSQL
- Method Override

## Como Executar

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` com base no `.env.example`:

```env
DATABASE_URL="postgresql://usuario:senha@host:5432/nome_do_banco?sslmode=require"
```

3. Gere o Prisma Client:

```bash
npm run prisma:generate
```

4. Execute as migrations:

```bash
npm run prisma:migrate
```

5. Inicie o servidor:

```bash
npm start
```

A aplicação ficará disponível em `http://localhost:3000`.

## Estrutura

```txt
prisma/              Schema e migrations do banco de dados
public/              Arquivos estáticos, como CSS
src/controllers/     Regras de cadastro, edição, listagem e exclusão
src/lib/             Configuração do Prisma Client
src/routers/         Rotas da aplicação
views/               Templates EJS
```

## Observações

O arquivo `.env` não deve ser enviado para o GitHub, pois contém a URL de conexão com o banco de dados. Use `.env.example` apenas como modelo.
