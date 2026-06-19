# Backend

A Node.js GraphQL API built with Express, GraphQL Yoga, and Pothos. It serves
Studio Ghibli film details from a PostgreSQL database (via Prisma).

## Tech Stack

- [Express](https://expressjs.com/) v5 HTTP server
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) for the GraphQL server
- [Pothos](https://pothos-graphql.dev/) for code-first GraphQL schema building
- [Prisma](https://www.prisma.io/) ORM with **PostgreSQL** — film data is stored
  in the database and loaded by a seed script
- [Zod](https://zod.dev/) for environment validation
- [Pino](https://getpino.io/) for logging
- [Vitest](https://vitest.dev/) + [supertest](https://github.com/ladjs/supertest) for testing

## Prerequisites

- Node.js >= 24.7.0
- `pnpm`
- Docker (runs the PostgreSQL database via `docker-compose.yaml`)

## Getting Started

1. From the repository root, run `pnpm install`.
2. Start PostgreSQL from the repository root: `docker compose up -d`.
3. Copy `.env.example` to `.env`.
4. From `packages/backend`:
   - `pnpm generate` — generate the Prisma client and emit `schema.graphql`
     (used by the frontend's codegen).
   - `pnpm migrate` — create the database tables.
   - `pnpm seed` — load the ten films into the database.
   - `pnpm dev` — start the dev server. The GraphQL endpoint is available at
     `http://localhost:8080/api/graphql`.

## Film data

Film data is stored in **PostgreSQL** (the `film` table) and read through Prisma.
The ten films are a static dataset in `prisma/seed/films.data.ts`, loaded into the
database by `pnpm seed` — no external API is called at runtime. To change the data,
edit that file and re-run `pnpm seed` (the seed upserts by id, so it is safe to
re-run).

The schema exposes:

- `films: [Film!]!` — list every film (ordered by title).
- `film(id: ID!): Film` — fetch a single film by id (nullable).

Each `Film` includes `id`, `title`, `description`, `tagline`, `trivia`,
`director`, `releaseDate`, `runtime`, `image`, `banner`, `score`, and `languages`
(the locales a film is translated into; all content served today is English).

### Adding a query module

Schema modules live under `src/schemaModules/<name>/` and are registered by
importing the folder from `src/schemaModules/index.ts`. Each module's `index.ts`
imports its `object-types.*` and `queries.*` files, which call `builder.*` to
register types and fields on import. See `src/schemaModules/film/` for the pattern.

## Available Scripts

| Command                | Description                                                          |
| ---------------------- | ------------------------------------------------------------------- |
| `pnpm dev`             | Start the dev server with nodemon                                   |
| `pnpm generate`        | Generate the Prisma client and emit `schema.graphql`                |
| `pnpm generate:schema` | Emit `schema.graphql` (SDL) from the Pothos schema                  |
| `pnpm migrate`         | Run Prisma migrations and regenerate the client                     |
| `pnpm seed`            | Load the films into the database                                    |
| `pnpm build`           | Install deps, generate, compile TypeScript, and deploy migrations   |
| `pnpm lint`            | Run Biome                                                           |
| `pnpm type`            | Run TypeScript type-checking                                        |
| `pnpm test`            | Migrate the test database and run the tests                         |
| `pnpm db:test:start`   | Start a fresh test database via Docker                              |

## Tests

[Vitest](https://vitest.dev/) drives the tests; queries are exercised through the
running Yoga server with supertest. The film tests seed the `film` table and read
it back. To run the full suite (which migrates a Dockerized test database first):

1. `pnpm db:test:start` — start a clean test database
2. `pnpm test` — run all tests
