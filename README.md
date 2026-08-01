# StockManager V2

Aplicação de gerenciamento de estoque com frontend React e API Express, ambos em TypeScript.

## Tecnologias

- React 19, React Router e Vite
- Node.js, Express e TypeScript
- Prisma ORM e PostgreSQL

## Configuração

Crie `BackEnd/.env` a partir de `BackEnd/.env.example` e informe `DATABASE_URL`.

```bash
npm install
npm run prisma:generate
```

## Desenvolvimento

Inicie frontend e backend juntos:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api

## Produção

```bash
npm start
```

O comando compila os dois workspaces e inicia o Express em http://localhost:3000. O Express também serve o build do React.

## Comandos úteis

```bash
npm run typecheck
npm run build
npm run prisma:migrate
npm run prisma:studio
```

## Endpoints

- `GET /api/health`
- `GET /api/produtos`
- `POST /api/produtos`
- `PUT /api/produtos/:id`
- `DELETE /api/produtos/:id`
