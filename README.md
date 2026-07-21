# js_table — Sistema de Gerenciamento de Corridas

Sistema de cadastro e gerenciamento de corridas de automobilismo: pessoas, equipes, pilotos, carros, pistas, corridas e inscrições. Backend em Node.js/Express com Prisma ORM sobre PostgreSQL (Supabase); frontend em React ainda em estágio inicial.

## Tecnologias

**Backend**
- Node.js + Express 5
- Prisma ORM 7 (gerador `prisma-client-js`)
- PostgreSQL, hospedado no Supabase
- `@prisma/adapter-pg` + `pg` — driver adapter, obrigatório no Prisma 7 para instanciar o `PrismaClient`
- `zod` — validação de entrada (`createSchema`/`updateSchema` por módulo, aplicados via middleware `validate()`)
- `bcrypt` — hash de senha (Pessoa) e comparação no login
- `jsonwebtoken` — emissão do JWT assinado no login bem-sucedido
- `express-rate-limit` — limite de tentativas no `POST /login` (proteção contra força bruta)
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

O módulo `auth` foge um pouco desse padrão: não tem `repository` próprio, porque autenticação não tem tabela própria — ele reaproveita `pessoaRepository`/`pessoaService` (incluindo uma função nova, `getByEmail`, adicionada em `pessoa.repository.js`/`pessoa.service.js` especificamente pro login).

Estrutura de pastas:

```
backend/
├── prisma/
│   ├── schema.prisma        # generator + datasource (schema multi-arquivo)
│   ├── pessoa.prisma        # email agora é @unique (necessário pro login)
│   ├── equipe.prisma
│   ├── corrida.prisma
│   ├── piloto.prisma
│   ├── carro.prisma
│   ├── pista.prisma
│   ├── inscricao.prisma
│   └── migrations/
├── src/
│   ├── modules/
│   │   ├── <entidade>/               # pessoa, equipe, corrida, piloto, carro, pista, inscricoes
│   │   │   ├── <entidade>.routes.js
│   │   │   ├── <entidade>.controller.js
│   │   │   ├── <entidade>.service.js
│   │   │   ├── <entidade>.repository.js
│   │   │   └── <entidade>.schema.js  # validação Zod (createSchema/updateSchema)
│   │   └── auth/                     # login — sem repository próprio
│   │       ├── auth.routes.js        # POST /login (rate limit → validate → controller)
│   │       ├── auth.controller.js
│   │       ├── auth.service.js       # busca Pessoa por email, compara hash, emite JWT
│   │       └── auth.schema.js        # valida email + senha do corpo da requisição
│   ├── shared/
│   │   ├── prisma.js             # instância única do PrismaClient (adapter pg)
│   │   ├── validate.js           # middleware genérico de validação Zod
│   │   └── authentication.js     # middleware de verificação do JWT (em andamento)
│   ├── app.js                 # composition root: express(), middlewares, routers,
│   │                          # 2 middlewares de erro encadeados, error handler final
│   └── server.js              # ponto de entrada: app.listen()
└── prisma.config.ts            # localização do schema e da connection string

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

Requer um arquivo `.env` em `backend/` com `DATABASE_URL` apontando para a instância Postgres do Supabase. **Use a connection string do "Session pooler"**, não a "Direct connection" — a conexão direta do Supabase só funciona por IPv6, e falha com "Can't reach database server" em redes sem suporte a IPv6 (comum no Brasil). Se `npx prisma migrate dev` voltar a exigir conexão direta no futuro, pode ser necessário manter duas URLs separadas (`url` pooled pro runtime, `directUrl` só pra migrations).

## Status atual

- [x] Modelagem do banco (schema Prisma, relações e migrations aplicadas no Supabase)
- [x] Infraestrutura base: Prisma Client + driver adapter conectando, `app.js`/`server.js`, scripts `dev`/`start`
- [x] Os 7 módulos (`pessoa`, `equipe`, `corrida`, `piloto`, `carro`, `pista`, `inscricoes`) validados ponta a ponta via HTTP real: create, read, update e delete, incluindo os casos de erro (registro inexistente e violação de chave estrangeira)
- [x] Fluxo de cadastro completo testado respeitando a ordem de dependência entre entidades
- [x] Validação de entrada nos endpoints de criação/atualização — middleware `validate()` com Zod, um schema `createSchema`/`updateSchema` por módulo, aplicado nas 7 rotas de `POST`/`PUT`
- [x] Tratamento específico para erros de FK e "registro não encontrado" no `delete` — dois middlewares de erro encadeados em `app.js`: um classifica `err.code` do Prisma (`P2025` → 404, `P2003` → 409) via lookup em `mapErrosStatus`, outro responde. Validado via HTTP real: violação de FK retorna 409 com mensagem própria, e o 404 já existente (lançado manualmente nos services) continua intacto
  - [x] `await` corrigido em `corrida.service.js` — guard de 404 funcional
- [x] Nomenclatura de rotas padronizada — todos os 7 módulos usam plural (`/pessoas`, `/equipes`, `/corridas`, `/pilotos`, `/carros`, `/pistas`, `/inscricoes`)
- [ ] Testes automatizados (unitário de service + integração de rotas)
- [ ] Frontend — ainda no boilerplate padrão do Vite, não integrado com o backend
- [ ] Autenticação de Pessoa (decisão: JWT)
  - [x] Hash de senha (bcrypt) antes de gravar no `create` de Pessoa — validado via curl, `senha` sai como `$2b$10$...`
  - [x] `senha` removida das respostas da API (`list`, `getById`, `create`, `update` de Pessoa) — validado via curl, os 4 endpoints devolvem só `id`, `nome`, `email`
  - [x] Rota de login (`POST /login`, módulo `auth`): recebe email+senha, busca Pessoa por email (`@unique` no schema), confere hash com bcrypt, retorna 401 com mensagem idêntica pra "email não existe" e "senha errada" (proteção contra enumeração de usuário) — validado via curl
  - [x] Rate limit no `POST /login` (`express-rate-limit`) — 5 tentativas a cada 15 min por IP, 429 acima disso, aplicado antes da validação de schema — validado via script, bloqueio confirmado na 6ª tentativa
  - [x] Emissão de JWT assinado no login bem-sucedido — `auth.service.js` assina `jwt.sign({ id }, JWT_SECRET, { expiresIn: "3h" })` e o controller devolve `{ token, id, nome, email }` no corpo da resposta
  - [ ] Middleware que verifica o JWT e protege as rotas que exigirem autenticação **(em andamento)** — `src/shared/authentication.js` já existe, mas ainda não está funcional. Pendências: ler o token do header `Authorization: Bearer <token>` a cada requisição (hoje é recebido como parâmetro fixo); tratar corretamente a exceção que `jwt.verify()` lança em token inválido/expirado (a variável `tokenVerify` é checada dentro do `catch`, onde não existe); chamar `next()` no caminho de sucesso e anexar o payload em `req.user`
  - [ ] Aplicar o middleware nas rotas que exigirem autenticação (nenhuma rota está protegida ainda)
