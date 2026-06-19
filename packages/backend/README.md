# Backend

A Node.js GraphQL API built with Express, GraphQL Yoga, and Pothos. It serves
Studio Ghibli film details from local seed data.

## Tech Stack

- [Express](https://expressjs.com/) v5 HTTP server
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) for the GraphQL server
- [Pothos](https://pothos-graphql.dev/) for code-first GraphQL schema building
- [Prisma](https://www.prisma.io/) is wired up for future persistence (the film
  data itself is served from local seed data and needs no database)
- [Zod](https://zod.dev/) for environment validation
- [Pino](https://getpino.io/) for logging
- [Vitest](https://vitest.dev/) + [supertest](https://github.com/ladjs/supertest) for testing

## Prerequisites

- Node.js >= 24.7.0
- `pnpm`
- Docker (only needed for Prisma migrations / the test database)

## Getting Started

1. Copy `.env.example` to `.env`.
2. From the repository root run `pnpm install`.
3. From `packages/backend` run `pnpm generate` to generate the Prisma client and
   emit `schema.graphql` (used by the frontend's codegen).
4. From `packages/backend` run `pnpm dev` to start the local dev server. The
   GraphQL endpoint is available at `http://localhost:8080/api/graphql`.

## Film data

Film data is **served from local seed data**, not proxied from an external API at
runtime. The ten films (the four featured titles plus six more) live in
`src/schemaModules/film/films.data.ts`, sourced from the public
[Studio Ghibli API](https://ghibliapi.vercel.app/) dataset.

The schema exposes:

- `films: [Film!]!` — list every film.
- `film(id: ID!): Film` — fetch a single film by id (nullable).

Each `Film` includes `id`, `title`, `description`, `director`, `releaseDate`,
`runtime`, `image`, `banner`, `score`, and `languages` (the locales a film is
translated into; all content served today is English).

### Adding a query module

Schema modules live under `src/schemaModules/<name>/` and are registered by
importing the folder from `src/schemaModules/index.ts`. Each module's `index.ts`
imports its `object-types.*` and `queries.*` files, which call `builder.*` to
register types and fields on import. See `src/schemaModules/film/` for the pattern.

## Available Scripts

| Command               | Description                                                          |
| --------------------- | ------------------------------------------------------------------- |
| `pnpm dev`            | Start the dev server with nodemon                                   |
| `pnpm generate`       | Generate the Prisma client and emit `schema.graphql`                |
| `pnpm generate:schema`| Emit `schema.graphql` (SDL) from the Pothos schema                  |
| `pnpm migrate`        | Run Prisma migrations and regenerate the client                     |
| `pnpm build`          | Install deps, generate, compile TypeScript, and deploy migrations   |
| `pnpm lint`           | Run Biome                                                           |
| `pnpm type`           | Run TypeScript type-checking                                        |
| `pnpm test`           | Run the test database migration and execute tests                   |
| `pnpm db:test:start`  | Start a fresh test database via Docker                              |

## Tests

[Vitest](https://vitest.dev/) drives the tests; queries are exercised through the
running Yoga server with supertest. The film queries need no database. To run the
full suite (which migrates a Dockerized test database first):

1. `pnpm db:test:start` — start a clean test database
2. `pnpm test` — run all tests
