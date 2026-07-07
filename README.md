# js_table — Sistema de Gerenciamento de Corridas

Sistema de cadastro e gerenciamento de corridas de automobilismo: pessoas, equipes, pilotos, carros, pistas, corridas e inscrições. Backend em Node.js/Express com Prisma ORM sobre PostgreSQL (Supabase); frontend em React ainda em estágio inicial.

## Tecnologias

**Backend**
- Node.js + Express 5
- Prisma ORM 7 (gerador `prisma-client-js`)
- PostgreSQL, hospedado no Supabase
- `@prisma/adapter-pg` + `pg` — driver adapter, obrigatório no Prisma 7 para instanciar o `PrismaClient`
- `cors`, `dotenv`
- `nodemon` (ambiente de desenvolvimento)

**Frontend**
- React 19
- Vite

## Arquitetura

O backend segue arquitetura em camadas, organizada por módulo de domínio (um por entidade), inspirada em Clean Architecture mas simplificada para o escopo do projeto:

```
Routes → Controller → Service → Repository → Prisma Client → PostgreSQL
```

- **Routes**: mapeia URL + verbo HTTP para uma função do controller. Não contém lógica.
- **Controller**: lê `req`, valida o que veio na requisição, chama o service, formata a resposta HTTP (`res.json`, status codes).
- **Service**: regra de negócio (equivalente a use-cases). Não sabe nada sobre HTTP.
- **Repository**: única camada que fala com o Prisma Client. Isola o resto da aplicação da API específica do ORM.

Estrutura de pastas:

```
backend/
├── prisma/
│   ├── schema.prisma        # generator + datasource (schema multi-arquivo)
│   ├── pessoa.prisma
│   ├── equipe.prisma
│   ├── corrida.prisma
│   ├── piloto.prisma
│   ├── carro.prisma
│   ├── pista.prisma
│   ├── inscricao.prisma
│   └── migrations/
├── src/
│   ├── modules/
│   │   └── <entidade>/
│   │       ├── <entidade>.routes.js
│   │       ├── <entidade>.controller.js
│   │       ├── <entidade>.service.js
│   │       └── <entidade>.repository.js
│   ├── shared/
│   │   └── prisma.js        # instância única do PrismaClient (adapter pg)
│   ├── app.js                # composition root: express(), middlewares, routers, error handler
│   └── server.js             # ponto de entrada: app.listen()
└── prisma.config.ts           # localização do schema e da connection string

frontend/
└── src/                        # React + Vite (boilerplate inicial, não desenvolvido ainda)
```

## Modelo de dados e fluxo de cadastro

As entidades têm dependências entre si via chave estrangeira obrigatória. A ordem abaixo respeita essas dependências — não é possível cadastrar um recurso antes dos que ele depende:

1. **Pessoa** — sem dependência
2. **Equipe** — sem dependência
3. **Corrida** — sem dependência
4. **Piloto** — precisa de Equipe
5. **Carro** — precisa de Equipe
6. **Pista** — precisa de Corrida
7. **Inscricao** — precisa de Piloto + Carro + Corrida

## Como rodar localmente

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

Requer um arquivo `.env` em `backend/` com `DATABASE_URL` apontando para a instância Postgres (conexão direta do Supabase, não a pooled).

## Status atual

- [x] Modelagem do banco (schema Prisma, relações e migrations aplicadas no Supabase)
- [x] Infraestrutura base: Prisma Client + driver adapter conectando, `app.js`/`server.js`, scripts `dev`/`start`
- [x] Os 7 módulos (`pessoa`, `equipe`, `corrida`, `piloto`, `carro`, `pista`, `inscricoes`) validados ponta a ponta via HTTP real: create, read, update e delete, incluindo os casos de erro (registro inexistente e violação de chave estrangeira)
- [x] Fluxo de cadastro completo testado respeitando a ordem de dependência entre entidades
- [ ] Validação de entrada nos endpoints de criação/atualização (hoje um `POST` com campo obrigatório faltando só é barrado pelo próprio Prisma, sem uma camada de validação antes)
- [ ] Tratamento específico para erros de FK e "registro não encontrado" no `delete` — hoje alguns módulos (`carro`, tratados durante os testes) vazavam o erro cru do Prisma em vez de uma resposta HTTP limpa
- [x] Nomenclatura de rotas padronizada — todos os 7 módulos usam plural (`/pessoas`, `/equipes`, `/corridas`, `/pilotos`, `/carros`, `/pistas`, `/inscricoes`)
- [ ] Testes automatizados (unitário de service + integração de rotas)
- [ ] Frontend — ainda no boilerplate padrão do Vite, não integrado com o backend
